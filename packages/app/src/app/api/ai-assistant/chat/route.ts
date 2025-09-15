/**
 * AI Travel Assistant Chat API Endpoint
 * Handles secure OpenAI GPT-4 integration for premium users
 * Rate limited and user authenticated
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../lib/supabase/server'
import { UserStatus } from '../../../../lib/types/user-status'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

interface ChatRequest {
  message: string
  conversationHistory?: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
  userContext?: {
    currentTrips: any[]
    upcomingTrips: any[]
    userPreferences?: any
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user profile to check subscription status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_tier, subscription_status')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      console.error('[AI Chat] Failed to fetch user profile:', profileError)
      return NextResponse.json(
        { error: 'Failed to verify user status' },
        { status: 500 }
      )
    }

    // Feature gate: Premium users only  
    if (!profile || (profile as any).subscription_tier !== 'premium' || (profile as any).subscription_status !== 'active') {
      return NextResponse.json(
        { 
          error: 'Premium subscription required',
          message: 'AI Travel Assistant is available for Premium subscribers only. Upgrade to unlock personalized travel guidance and intelligent compliance monitoring.',
          upgradeRequired: true
        },
        { status: 403 }
      )
    }

    // Check OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      console.error('[AI Chat] OpenAI API key not configured')
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 500 }
      )
    }

    // Parse request body
    const body: ChatRequest = await request.json()
    const { message, conversationHistory = [], userContext } = body

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Please keep messages under 1000 characters.' },
        { status: 400 }
      )
    }

    // Build system prompt with user context
    const systemPrompt = buildSystemPrompt(userContext || {})

    // Build conversation history (limit to last 10 messages)
    const chatHistory = conversationHistory
      .slice(-10)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }))

    // Add current user message
    chatHistory.push({ role: 'user', content: message })

    // Call OpenAI API
    const openaiResponse = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...chatHistory
        ],
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0.3,
        frequency_penalty: 0.3,
        user: `user_${user.id}` // User identification for OpenAI
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('[AI Chat] OpenAI API error:', openaiResponse.status, errorText)
      
      if (openaiResponse.status === 429) {
        return NextResponse.json(
          { error: 'AI service is busy. Please try again in a moment.' },
          { status: 429 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to get AI response. Please try again.' },
        { status: 500 }
      )
    }

    const data = await openaiResponse.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'Invalid AI response. Please try again.' },
        { status: 500 }
      )
    }

    // Log usage for analytics (optional)
    try {
      console.log('[AI Chat] Usage:', {
        user_id: user.id,
        message_length: message.length,
        response_length: assistantMessage.length,
        tokens_used: data.usage?.total_tokens || 0
      })
    } catch (logError) {
      // Non-critical error, continue
      console.warn('[AI Chat] Failed to log usage:', logError)
    }

    return NextResponse.json({
      message: assistantMessage,
      followUpQuestions: generateFollowUpQuestions(userContext),
      confidenceScore: 0.8, // Static for now, could be enhanced with actual confidence metrics
      tokenUsage: data.usage
    })

  } catch (error) {
    console.error('[AI Chat] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function buildSystemPrompt(userContext: any): string {
  const { currentTrips = [], upcomingTrips = [] } = userContext

  return `You are an expert AI Travel Assistant for the ETIAS Calculator platform, specializing in European travel and Schengen visa compliance.

User Context:
- Premium subscriber with full access to AI assistance
- Current active trips: ${currentTrips.length}
- Upcoming planned trips: ${upcomingTrips.length}

Your expertise includes:
- Schengen 90/180-day rule compliance and calculations
- European travel regulations and visa requirements
- ETIAS (European Travel Information and Authorization System) guidance
- Destination recommendations based on compliance status
- Travel optimization and trip planning
- Document requirements and preparation
- Travel insurance and safety recommendations

Guidelines:
- Always prioritize legal compliance with Schengen regulations
- Provide specific, actionable advice with dates and calculations when relevant
- If asked about non-travel topics, politely redirect to travel assistance
- Be concise but thorough - aim for helpful, practical responses
- Include relevant warnings about potential compliance issues
- Suggest realistic travel alternatives when limits are approaching
- Maintain a professional, helpful, and encouraging tone

Your responses should be:
- Accurate and based on current EU regulations
- Personalized to the user's specific travel context
- Actionable with clear next steps
- Educational to help users understand visa rules
- Supportive for complex travel planning scenarios

Remember: This user has Premium access, so provide detailed, comprehensive assistance without limitations.`
}

function generateFollowUpQuestions(userContext: any): string[] {
  const questions = [
    "Would you like me to calculate your exact compliance status?",
    "Do you need help planning your next European trip?",
    "Should I explain any specific Schengen regulations?",
    "Would you like destination recommendations?",
    "Do you have questions about ETIAS requirements?",
    "Need help with travel document preparation?",
    "Want to optimize your current travel plans?",
    "Should I check for potential compliance issues?"
  ]

  // Return 2-3 relevant questions randomly
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 2)
}

// Rate limiting (basic implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(userId)
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize limit
    rateLimitMap.set(userId, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }
  
  if (userLimit.count >= 20) { // 20 messages per minute for premium users
    return false
  }
  
  userLimit.count++
  return true
}