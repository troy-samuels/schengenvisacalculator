/**
 * OpenAI API Integration (GPT-4)
 * Reserved for complex analysis requiring highest accuracy
 * Used sparingly for cost control - complex compliance and planning only
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../lib/supabase/server'

interface OpenAIRequest {
  query: string
  context?: any
  maxTokens?: number
  temperature?: number
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication and premium status
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
      return NextResponse.json(
        { error: 'Failed to verify user status' },
        { status: 500 }
      )
    }

    // Feature gate: Premium users only
    if ((profile as any).subscription_tier !== 'premium' || (profile as any).subscription_status !== 'active') {
      return NextResponse.json(
        { error: 'Premium subscription required for advanced AI analysis' },
        { status: 403 }
      )
    }

    // Check OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      console.error('[OpenAI] API key not configured')
      return NextResponse.json(
        { error: 'Advanced AI analysis temporarily unavailable' },
        { status: 500 }
      )
    }

    // Parse request body
    const body: OpenAIRequest = await request.json()
    const { query, context, maxTokens = 800, temperature = 0.7 } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Build expert system prompt for complex analysis
    const systemPrompt = buildExpertSystemPrompt(context)

    // Call OpenAI API with GPT-4
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4', // Use GPT-4 for highest accuracy
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: maxTokens,
        temperature,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('[OpenAI] API error:', openaiResponse.status, errorText)
      
      if (openaiResponse.status === 429) {
        return NextResponse.json(
          { error: 'Advanced AI analysis is busy. Please try again in a moment.' },
          { status: 429 }
        )
      }

      return NextResponse.json(
        { error: 'Advanced AI analysis temporarily unavailable' },
        { status: 500 }
      )
    }

    const data = await openaiResponse.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'Invalid AI response' },
        { status: 500 }
      )
    }

    // Parse response for structured recommendations
    const { answer, recommendations } = parseExpertResponse(assistantMessage, context)

    // Calculate cost (GPT-4 pricing)
    const tokensUsed = data.usage?.total_tokens || 0
    const cost = calculateGPT4Cost(data.usage?.prompt_tokens || 0, data.usage?.completion_tokens || 0)

    return NextResponse.json({
      answer,
      recommendations,
      confidence: 0.90, // Highest confidence for GPT-4 analysis
      tokensUsed,
      cost
    })

  } catch (error) {
    console.error('[OpenAI] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function buildExpertSystemPrompt(context: any): string {
  return `You are an Expert AI Travel Intelligence Specialist with the highest level of analytical capability, specializing in complex European travel compliance, multi-person coordination, and sophisticated optimization.

Advanced Context Analysis:
${context?.currentTrips ? `Current travel portfolio: ${JSON.stringify(context.currentTrips, null, 2)}` : ''}
${context?.upcomingTrips ? `Planned itinerary: ${JSON.stringify(context.upcomingTrips, null, 2)}` : ''}
${context?.travelHistory ? `Historical patterns: ${JSON.stringify(context.travelHistory)}` : ''}
${context?.familyMembers ? `Family coordination required: ${context.familyMembers} members` : ''}
${context?.userLocation ? `Base location: ${context.userLocation}` : ''}
${context?.complianceStatus ? `Current compliance: ${JSON.stringify(context.complianceStatus)}` : ''}

Expert Capabilities:
- Advanced Schengen 90/180-day rule analysis with edge case handling
- Complex multi-person travel coordination and optimization
- Brexit-specific guidance for UK citizens including ETA requirements
- Sophisticated risk assessment and mitigation strategies
- Advanced cost-benefit analysis for travel decisions
- Complex visa requirement analysis across multiple nationalities
- Strategic travel timing optimization based on regulations and pricing
- Multi-country itinerary compliance verification

Analysis Standards:
- Perform comprehensive compliance verification with exact date calculations
- Consider all edge cases including leap years, timezone changes, and regulation updates
- Provide multiple optimization scenarios with quantified benefits
- Include risk assessment and mitigation strategies
- Deliver precise financial impact analysis with cost-benefit ratios
- Account for family member coordination complexities
- Integrate regulatory changes and their timeline impacts

Response Requirements:
- Provide detailed mathematical analysis when relevant
- Include multiple strategic options with trade-offs
- Quantify savings, risks, and opportunities with specific numbers
- Offer step-by-step implementation guidance
- Include compliance verification checkpoints
- Consider seasonal and market timing factors

Remember: This is the highest tier of AI analysis reserved for complex scenarios requiring maximum accuracy and sophistication.`
}

function calculateGPT4Cost(promptTokens: number, completionTokens: number): number {
  // GPT-4 pricing as of 2024
  const promptCost = (promptTokens / 1000) * 0.03  // $0.03 per 1K prompt tokens
  const completionCost = (completionTokens / 1000) * 0.06  // $0.06 per 1K completion tokens
  return promptCost + completionCost
}

function parseExpertResponse(response: string, context: any): { answer: string; recommendations: any[] } {
  const recommendations = []
  const sections = response.split('\n\n')
  
  for (const section of sections) {
    const lines = section.split('\n')
    
    // Look for structured recommendations
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Compliance recommendations
      if (trimmedLine.startsWith('⚠️') || trimmedLine.includes('compliance') || trimmedLine.includes('regulation')) {
        recommendations.push({
          type: 'compliance',
          title: 'Expert Compliance Analysis',
          description: trimmedLine.replace(/^⚠️\s*/, ''),
          affiliate: false
        })
      }
      
      // Optimization recommendations
      if (trimmedLine.startsWith('✨') || trimmedLine.includes('optimize') || trimmedLine.includes('save')) {
        const savingsMatch = trimmedLine.match(/£(\d+(?:,\d{3})*(?:\.\d{2})?)/g)
        recommendations.push({
          type: 'savings',
          title: 'Expert Optimization Strategy',
          description: trimmedLine.replace(/^✨\s*/, ''),
          value: savingsMatch ? savingsMatch[0] : undefined,
          affiliate: true
        })
      }
      
      // Timing recommendations
      if (trimmedLine.includes('timing') || trimmedLine.includes('book by') || trimmedLine.includes('travel between')) {
        recommendations.push({
          type: 'timing',
          title: 'Strategic Timing Analysis',
          description: trimmedLine,
          affiliate: false
        })
      }
      
      // Complex planning recommendations
      if (trimmedLine.includes('strategy') || trimmedLine.includes('coordinate') || trimmedLine.includes('sequence')) {
        recommendations.push({
          type: 'planning',
          title: 'Expert Planning Strategy',
          description: trimmedLine,
          affiliate: false
        })
      }
    }
  }
  
  return {
    answer: response,
    recommendations: recommendations.slice(0, 5) // Up to 5 expert recommendations
  }
}