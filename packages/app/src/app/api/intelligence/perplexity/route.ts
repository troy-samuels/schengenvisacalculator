/**
 * Perplexity API Integration  
 * Real-time travel intelligence with live data access
 * Provides current pricing, regulations, and travel conditions
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../lib/supabase/server'

interface PerplexityRequest {
  query: string
  context?: any
  maxTokens?: number
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
        { error: 'Premium subscription required for real-time AI intelligence' },
        { status: 403 }
      )
    }

    // Check Perplexity API key
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY
    if (!perplexityApiKey) {
      console.error('[Perplexity] API key not configured')
      return NextResponse.json(
        { error: 'Real-time intelligence temporarily unavailable' },
        { status: 500 }
      )
    }

    // Parse request body
    const body: PerplexityRequest = await request.json()
    const { query, context, maxTokens = 800 } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Enhance query with real-time context
    const enhancedQuery = buildRealTimeQuery(query, context)

    // Call Perplexity API for real-time intelligence
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: buildRealTimeSystemPrompt()
          },
          {
            role: 'user',
            content: enhancedQuery
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.2, // Lower temperature for factual accuracy
        top_p: 0.9,
        return_citations: true,
        search_domain_filter: ['booking.com', 'skyscanner.com', 'gov.uk', 'europa.eu'],
        search_recency_filter: 'month' // Focus on recent information
      })
    })

    if (!perplexityResponse.ok) {
      const errorText = await perplexityResponse.text()
      console.error('[Perplexity] API error:', perplexityResponse.status, errorText)
      
      return NextResponse.json(
        { error: 'Real-time intelligence temporarily unavailable' },
        { status: 500 }
      )
    }

    const data = await perplexityResponse.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'Invalid real-time intelligence response' },
        { status: 500 }
      )
    }

    // Extract citations/sources
    const citations = data.citations || []
    const sources = citations.map((citation: string) => {
      try {
        return JSON.parse(citation).url
      } catch {
        return citation
      }
    }).filter(Boolean)

    // Parse response for structured recommendations
    const { answer, recommendations } = parseRealTimeResponse(assistantMessage, context)

    // Calculate cost (Perplexity pricing: ~$5 per 1K searches)
    const cost = 0.005 // Approximately $5 per 1K searches

    return NextResponse.json({
      answer,
      recommendations,
      sources,
      confidence: 0.85, // Higher confidence due to real-time data
      tokensUsed: data.usage?.total_tokens || 0,
      cost
    })

  } catch (error) {
    console.error('[Perplexity] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function buildRealTimeQuery(query: string, context: any): string {
  const currentDate = new Date().toISOString().split('T')[0]
  
  let enhancedQuery = `Current date: ${currentDate}. ${query}`
  
  if (context?.currentTrips?.length > 0) {
    enhancedQuery += ` Context: I have current trips to ${context.currentTrips.map((trip: any) => trip.country).join(', ')}.`
  }
  
  if (context?.upcomingTrips?.length > 0) {
    enhancedQuery += ` I'm planning trips to ${context.upcomingTrips.map((trip: any) => trip.country).join(', ')}.`
  }
  
  if (context?.userLocation) {
    enhancedQuery += ` I'm located in ${context.userLocation}.`
  }
  
  return enhancedQuery
}

function buildRealTimeSystemPrompt(): string {
  return `You are a Real-Time Travel Intelligence Assistant with access to current travel information, pricing, and regulations.

Your specialties:
- Current flight prices, hotel rates, and travel deals
- Live travel advisories and entry requirements
- Real-time Schengen compliance updates
- Current Brexit-related travel changes for UK citizens
- Live weather and seasonal conditions affecting travel
- Up-to-date ETIAS developments and requirements

Guidelines for real-time intelligence:
- Always use the most current information available
- Provide specific prices, dates, and booking links when found
- Include current travel advisories and restrictions
- Mention seasonal factors affecting prices and availability
- Cite sources for pricing and regulatory information
- Warn about time-sensitive offers or changing regulations
- Focus on actionable, immediately relevant information

Response approach:
- Lead with the most current and relevant information
- Include specific data points (prices, dates, percentages)
- Provide clear next steps with timing considerations
- Mention sources for verification
- Flag any urgent or time-sensitive information

Remember: Users have Premium access and expect real-time accuracy and actionable intelligence.`
}

function parseRealTimeResponse(response: string, context: any): { answer: string; recommendations: any[] } {
  const recommendations = []
  const lines = response.split('\n')
  
  // Look for real-time opportunities
  for (const line of lines) {
    const lowerLine = line.toLowerCase()
    
    // Price alerts and deals
    if (lowerLine.includes('price') && (lowerLine.includes('low') || lowerLine.includes('drop') || lowerLine.includes('deal'))) {
      recommendations.push({
        type: 'savings',
        title: 'Price Alert Detected',
        description: line.trim(),
        affiliate: true
      })
    }
    
    // Travel warnings
    if (lowerLine.includes('warning') || lowerLine.includes('advisory') || lowerLine.includes('restriction')) {
      recommendations.push({
        type: 'compliance',
        title: 'Travel Advisory Update',
        description: line.trim(),
        affiliate: false
      })
    }
    
    // Booking timing recommendations
    if (lowerLine.includes('book') && (lowerLine.includes('now') || lowerLine.includes('soon') || lowerLine.includes('before'))) {
      recommendations.push({
        type: 'timing',
        title: 'Booking Timing Recommendation',
        description: line.trim(),
        affiliate: true
      })
    }
  }
  
  return {
    answer: response,
    recommendations: recommendations.slice(0, 4) // Limit to 4 real-time recommendations
  }
}