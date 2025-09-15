/**
 * AI Travel Assistant Service
 * Premium feature providing personalized travel guidance and compliance recommendations
 * Integrates with OpenAI GPT-4 for intelligent travel planning assistance
 */

'use client'

import { RobustSchengenCalculator } from '@schengen/calculator'
import { UserStatus } from '../types/user-status'

export interface TravelAssistantContext {
  userStatus: UserStatus
  currentTrips: Trip[]
  upcomingTrips: Trip[]
  userPreferences?: UserTravelPreferences
  currentLocation?: string
  travelHistory?: TravelHistoryItem[]
}

export interface UserTravelPreferences {
  favoriteDestinations: string[]
  travelStyle: 'business' | 'leisure' | 'mixed'
  budgetRange: 'budget' | 'mid-range' | 'luxury'
  accommodationPreference: 'hotel' | 'airbnb' | 'hostel' | 'mixed'
  transportPreference: 'flight' | 'train' | 'car' | 'mixed'
  notifications: {
    complianceWarnings: boolean
    travelDeals: boolean
    weatherUpdates: boolean
    documentReminders: boolean
  }
}

export interface TravelHistoryItem {
  country: string
  startDate: Date
  endDate: Date
  satisfaction: 1 | 2 | 3 | 4 | 5
  notes?: string
}

export interface Trip {
  id: string
  country: string
  startDate: Date
  endDate: Date
  purpose: string
}

export interface AIRecommendation {
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

export interface AIConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  recommendations?: AIRecommendation[]
}

export interface AIAssistantResponse {
  message: string
  recommendations: AIRecommendation[]
  followUpQuestions?: string[]
  confidenceScore: number
}

export class AITravelAssistant {
  private static baseUrl = '/api/ai-assistant'
  
  /**
   * Initialize AI assistant (no API key needed - handled server-side)
   */
  static initialize(): void {
    // API key handling moved to server-side for security
  }

  /**
   * Generate personalized travel recommendations
   * Premium feature only
   */
  static async generateRecommendations(context: TravelAssistantContext): Promise<AIRecommendation[]> {
    // Feature gate: Premium only
    if (context.userStatus === UserStatus.FREE) {
      return [{
        id: 'upgrade-required',
        type: 'warning',
        title: 'AI Travel Assistant - Premium Feature',
        message: 'Upgrade to Premium to unlock personalized AI travel recommendations and compliance guidance.',
        actionable: true,
        priority: 'medium',
        category: 'travel',
        timestamp: new Date()
      }]
    }

    try {
      const response = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trips: context.currentTrips.map(trip => ({
            id: trip.id,
            country: trip.country,
            startDate: trip.startDate.toISOString(),
            endDate: trip.endDate.toISOString(),
            purpose: trip.purpose || 'Tourism'
          })),
          upcomingTrips: context.upcomingTrips.map(trip => ({
            id: trip.id,
            country: trip.country,
            startDate: trip.startDate.toISOString(),
            endDate: trip.endDate.toISOString(),
            purpose: trip.purpose || 'Tourism'
          })),
          userPreferences: context.userPreferences || {}
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('[AITravelAssistant] API error:', errorData)
        return []
      }

      const data = await response.json()
      return data.recommendations || []
      
    } catch (error) {
      console.error('[AITravelAssistant] Failed to generate recommendations:', error)
      return []
    }
  }

  /**
   * Interactive chat with AI assistant
   * Premium feature only
   */
  static async chatWithAssistant(
    message: string, 
    context: TravelAssistantContext,
    conversationHistory: AIConversationMessage[] = []
  ): Promise<AIAssistantResponse> {
    // Feature gate: Premium only
    if (context.userStatus === UserStatus.FREE) {
      return {
        message: "I'm your AI Travel Assistant! Upgrade to Premium to unlock personalized travel guidance, compliance monitoring, and intelligent trip planning assistance.",
        recommendations: [{
          id: 'chat-upgrade',
          type: 'warning',
          title: 'Premium Feature Required',
          message: 'AI chat assistance is available for Premium subscribers only.',
          actionable: true,
          priority: 'medium',
          category: 'travel',
          timestamp: new Date()
        }],
        confidenceScore: 1.0
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          userContext: {
            currentTrips: context.currentTrips.map(trip => ({
              id: trip.id,
              country: trip.country,
              startDate: trip.startDate.toISOString(),
              endDate: trip.endDate.toISOString(),
              purpose: trip.purpose || 'Tourism'
            })),
            upcomingTrips: context.upcomingTrips.map(trip => ({
              id: trip.id,
              country: trip.country,
              startDate: trip.startDate.toISOString(),
              endDate: trip.endDate.toISOString(),
              purpose: trip.purpose || 'Tourism'
            })),
            userPreferences: context.userPreferences || {}
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 403 && errorData.upgradeRequired) {
          return {
            message: errorData.message,
            recommendations: [{
              id: 'upgrade-required',
              type: 'warning',
              title: 'Premium Feature Required',
              message: errorData.message,
              actionable: true,
              priority: 'medium',
              category: 'travel',
              timestamp: new Date()
            }],
            confidenceScore: 1.0
          }
        }
        throw new Error(`API error: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      
      return {
        message: data.message,
        recommendations: [], // Recommendations handled separately
        followUpQuestions: data.followUpQuestions || [],
        confidenceScore: data.confidenceScore || 0.8
      }
      
    } catch (error) {
      console.error('[AITravelAssistant] Chat error:', error)
      throw error
    }
  }


  /**
   * Save conversation history to localStorage (premium users)
   */
  static saveConversationHistory(messages: AIConversationMessage[]): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('etias-ai-chat-history', JSON.stringify(messages))
      }
    } catch (error) {
      console.warn('[AITravelAssistant] Failed to save conversation history:', error)
    }
  }

  /**
   * Load conversation history from localStorage
   */
  static loadConversationHistory(): AIConversationMessage[] {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('etias-ai-chat-history')
        return stored ? JSON.parse(stored) : []
      }
    } catch (error) {
      console.warn('[AITravelAssistant] Failed to load conversation history:', error)
    }
    return []
  }

  /**
   * Clear conversation history
   */
  static clearConversationHistory(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('etias-ai-chat-history')
      }
    } catch (error) {
      console.warn('[AITravelAssistant] Failed to clear conversation history:', error)
    }
  }
}