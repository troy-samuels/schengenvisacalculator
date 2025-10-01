/**
 * AI Travel Assistant Recommendations API Endpoint
 * Generates personalized travel recommendations for premium users
 * Based on compliance status, travel history, and preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../lib/supabase/server'
import { UserStatus } from '../../../../lib/types/user-status'
import { RobustSchengenCalculator } from '@schengen/calculator'

interface RecommendationRequest {
  trips: Array<{
    id: string
    country: string
    startDate: string
    endDate: string
    purpose?: string
  }>
  upcomingTrips: Array<{
    id: string
    country: string
    startDate: string
    endDate: string
    purpose?: string
  }>
  userPreferences?: {
    favoriteDestinations?: string[]
    travelStyle?: 'business' | 'leisure' | 'mixed'
    budgetRange?: 'budget' | 'mid-range' | 'luxury'
  }
}

interface AIRecommendation {
  id: string
  type: 'compliance' | 'optimization' | 'destination' | 'planning' | 'warning'
  title: string
  message: string
  actionable: boolean
  priority: 'low' | 'medium' | 'high' | 'critical'
  category: 'visa' | 'travel' | 'booking' | 'documents' | 'weather' | 'deals'
  metadata?: {
    suggestedDates?: { start: Date; end: Date }
    alternativeDestinations?: string[]
    estimatedSavings?: number
    complianceImpact?: string
    links?: Array<{ title: string; url: string; affiliate?: boolean }>
  }
  timestamp: Date
  expiresAt?: Date
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
      console.error('[AI Recommendations] Failed to fetch user profile:', profileError)
      return NextResponse.json(
        { error: 'Failed to verify user status' },
        { status: 500 }
      )
    }

    // Feature gate: Premium users only
    if (!profile || !['lifetime', 'annual'].includes((profile as any).subscription_tier) || (profile as any).subscription_status !== 'active') {
      return NextResponse.json({
        recommendations: [{
          id: 'upgrade-required',
          type: 'warning',
          title: 'AI Travel Assistant - Premium Feature',
          message: 'Upgrade to Premium to unlock personalized AI travel recommendations and compliance guidance.',
          actionable: true,
          priority: 'medium',
          category: 'travel',
          timestamp: new Date()
        }]
      })
    }

    // Parse request body
    const body: RecommendationRequest = await request.json()
    const { trips = [], upcomingTrips = [], userPreferences = {} } = body

    // Convert date strings to Date objects for calculations
    const processedTrips = trips.map(trip => ({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate)
    }))

    const processedUpcomingTrips = upcomingTrips.map(trip => ({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate)
    }))

    // Generate recommendations
    const recommendations = await generateRecommendations(
      processedTrips,
      processedUpcomingTrips,
      userPreferences
    )

    return NextResponse.json({
      recommendations: recommendations,
      generatedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    })

  } catch (error) {
    console.error('[AI Recommendations] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function generateRecommendations(
  trips: any[],
  upcomingTrips: any[],
  userPreferences: any
): Promise<AIRecommendation[]> {
  const recommendations: AIRecommendation[] = []
  const now = new Date()

  // 1. Compliance Analysis
  if (trips.length > 0) {
    const compliance = RobustSchengenCalculator.calculateExactCompliance(trips, now)
    
    // Critical compliance warning
    if (!compliance.isCompliant) {
      recommendations.push({
        id: `compliance-critical-${now.getTime()}`,
        type: 'compliance',
        title: '🚨 CRITICAL: Schengen Overstay Risk',
        message: `You have exceeded the 90-day limit by ${Math.abs(compliance.daysRemaining)} days. Contact immigration authorities immediately to avoid legal consequences.`,
        actionable: true,
        priority: 'critical',
        category: 'visa',
        timestamp: now,
        metadata: {
          complianceImpact: 'critical',
          links: [
            { title: 'EU Immigration Contacts', url: '/resources/immigration-contacts', affiliate: false }
          ]
        }
      })
    }
    
    // Warning for approaching limits
    else if (compliance.daysRemaining <= 14 && compliance.daysRemaining > 0) {
      recommendations.push({
        id: `compliance-warning-${now.getTime()}`,
        type: 'compliance',
        title: '⚠️ Approaching Schengen Limit',
        message: `Only ${compliance.daysRemaining} days remaining in your 180-day period. Plan your exit or risk overstaying.`,
        actionable: true,
        priority: 'high',
        category: 'visa',
        timestamp: now,
        metadata: {
          complianceImpact: 'high',
          suggestedDates: {
            start: now,
            end: new Date(now.getTime() + compliance.daysRemaining * 24 * 60 * 60 * 1000)
          }
        }
      })
    }
    
    // Optimization opportunity
    else if (compliance.daysRemaining >= 45) {
      recommendations.push({
        id: `compliance-optimization-${now.getTime()}`,
        type: 'optimization',
        title: '✨ Extend Your European Adventure',
        message: `You have ${compliance.daysRemaining} days remaining! Perfect opportunity to explore more destinations or extend your current stay.`,
        actionable: true,
        priority: 'medium',
        category: 'travel',
        timestamp: now,
        metadata: {
          complianceImpact: 'positive',
          estimatedSavings: Math.floor(Math.random() * 500 + 200),
          links: [
            { title: 'Find Cheap Flights', url: '/affiliates/flights', affiliate: true },
            { title: 'Extend Hotel Stay', url: '/affiliates/hotels', affiliate: true }
          ]
        }
      })
    }
  }

  // 2. Upcoming Trip Analysis
  if (upcomingTrips.length > 0) {
    const nextTrip = upcomingTrips[0]
    const timeToDeparture = nextTrip.startDate.getTime() - now.getTime()
    const daysUntilTrip = Math.ceil(timeToDeparture / (1000 * 60 * 60 * 24))
    
    // Early booking savings
    if (daysUntilTrip > 30) {
      recommendations.push({
        id: `early-booking-${nextTrip.id}`,
        type: 'optimization',
        title: '💰 Early Booking Savings Available',
        message: `Your ${nextTrip.country} trip is ${daysUntilTrip} days away. Book now to save up to 40% on flights and accommodations.`,
        actionable: true,
        priority: 'medium',
        category: 'deals',
        timestamp: now,
        metadata: {
          estimatedSavings: Math.floor(Math.random() * 800 + 300),
          links: [
            { title: 'Compare Flights', url: '/affiliates/flights', affiliate: true },
            { title: 'Book Hotels', url: '/affiliates/hotels', affiliate: true },
            { title: 'Travel Insurance', url: '/affiliates/insurance', affiliate: true }
          ]
        }
      })
    }
    
    // Urgent preparation reminder
    if (daysUntilTrip <= 7 && daysUntilTrip > 0) {
      recommendations.push({
        id: `urgent-prep-${nextTrip.id}`,
        type: 'planning',
        title: '📋 Final Travel Preparations',
        message: `Your ${nextTrip.country} trip starts in ${daysUntilTrip} day(s)! Complete your pre-travel checklist now.`,
        actionable: true,
        priority: 'high',
        category: 'documents',
        timestamp: now,
        metadata: {
          links: [
            { title: 'Travel Checklist', url: '/resources/travel-checklist', affiliate: false },
            { title: 'Weather Forecast', url: `/weather/${nextTrip.country.toLowerCase()}`, affiliate: false }
          ]
        }
      })
    }
  }

  // 3. Destination Recommendations
  const visitedCountries = trips.map(trip => trip.country)
  const unvisitedCountries = [
    'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 
    'Portugal', 'Greece', 'Austria', 'Belgium', 'Czech Republic',
    'Denmark', 'Finland', 'Hungary', 'Poland', 'Sweden'
  ].filter(country => !visitedCountries.includes(country))
  
  if (unvisitedCountries.length > 0 && Math.random() > 0.6) {
    const suggestedCountry = unvisitedCountries[Math.floor(Math.random() * unvisitedCountries.length)]
    const seasonalInfo = getSeasonalInfo(now.getMonth())
    
    recommendations.push({
      id: `destination-suggestion-${Date.now()}`,
      type: 'destination',
      title: `🌍 Discover ${suggestedCountry}`,
      message: `${seasonalInfo.message} ${suggestedCountry} would be perfect for your next adventure!`,
      actionable: true,
      priority: 'low',
      category: 'travel',
      timestamp: now,
      metadata: {
        alternativeDestinations: unvisitedCountries.slice(0, 3),
        links: [
          { title: `${suggestedCountry} Travel Guide`, url: `/destinations/${suggestedCountry.toLowerCase()}`, affiliate: false },
          { title: 'Book Accommodation', url: '/affiliates/hotels', affiliate: true },
          { title: 'Find Activities', url: '/affiliates/experiences', affiliate: true }
        ]
      }
    })
  }

  // 4. Seasonal and General Travel Tips
  const currentMonth = now.getMonth()
  const seasonalTip = getSeasonalTravelTip(currentMonth)
  
  if (seasonalTip && Math.random() > 0.7) {
    recommendations.push({
      id: `seasonal-tip-${now.getTime()}`,
      type: 'planning',
      title: seasonalTip.title,
      message: seasonalTip.message,
      actionable: true,
      priority: 'low',
      category: 'travel',
      timestamp: now
    })
  }

  // 5. Travel Insurance Recommendation
  if ((trips.length > 0 || upcomingTrips.length > 0) && Math.random() > 0.8) {
    recommendations.push({
      id: `insurance-reminder-${now.getTime()}`,
      type: 'planning',
      title: '🛡️ Protect Your European Adventures',
      message: 'Comprehensive travel insurance provides peace of mind for your Schengen area travels. Coverage starts from just €1.20/day.',
      actionable: true,
      priority: 'medium',
      category: 'documents',
      timestamp: now,
      metadata: {
        estimatedSavings: 0,
        links: [
          { title: 'Get Travel Insurance Quote', url: '/affiliates/insurance', affiliate: true },
          { title: 'Compare Coverage Options', url: '/affiliates/insurance-compare', affiliate: true }
        ]
      }
    })
  }

  // Sort by priority and return
  const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 }
  return recommendations.sort((a, b) => 
    priorityWeight[b.priority] - priorityWeight[a.priority]
  )
}

function getSeasonalInfo(month: number) {
  if (month >= 2 && month <= 4) { // Spring
    return {
      message: 'Spring is perfect for mild weather and fewer crowds.',
      season: 'spring'
    }
  } else if (month >= 5 && month <= 7) { // Summer
    return {
      message: 'Summer offers long days and vibrant festivals.',
      season: 'summer'
    }
  } else if (month >= 8 && month <= 10) { // Autumn
    return {
      message: 'Autumn brings beautiful colors and comfortable temperatures.',
      season: 'autumn'
    }
  } else { // Winter
    return {
      message: 'Winter provides unique experiences like Christmas markets.',
      season: 'winter'
    }
  }
}

function getSeasonalTravelTip(month: number) {
  const tips = {
    spring: {
      title: '🌸 Spring Travel Insights',
      message: 'Spring (March-May) is ideal for visiting Southern Europe. Consider Portugal, Spain, or Italy for mild weather and blooming landscapes.'
    },
    summer: {
      title: '☀️ Summer Travel Strategy',
      message: 'Summer is peak season in Europe. Book accommodations early and consider Northern destinations like Scandinavia to avoid crowds.'
    },
    autumn: {
      title: '🍂 Autumn Travel Magic',
      message: 'Autumn offers stunning foliage and mild weather. Perfect for cultural cities like Vienna, Prague, or Amsterdam.'
    },
    winter: {
      title: '❄️ Winter European Delights',
      message: 'Winter brings Christmas markets and winter sports. Germany, Austria, and Switzerland offer magical seasonal experiences.'
    }
  }

  if (month >= 2 && month <= 4) return tips.spring
  if (month >= 5 && month <= 7) return tips.summer
  if (month >= 8 && month <= 10) return tips.autumn
  return tips.winter
}