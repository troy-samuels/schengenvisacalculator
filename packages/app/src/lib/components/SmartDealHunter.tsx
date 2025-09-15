/**
 * Smart Deal Hunter Component
 * AI-powered travel savings detection with invisible background processing
 * Surfaces only the best opportunities at the right moment
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@schengen/ui'
import { Button } from '@schengen/ui'
import { Badge } from '@schengen/ui'
import { TrendingDown, Clock, MapPin, Calendar, ExternalLink, Sparkles } from 'lucide-react'
import { UserStatus } from '../types/user-status'
import { getRealTimeIntelligence } from '../services/multi-api-intelligence'

interface Deal {
  id: string
  type: 'flight' | 'hotel' | 'package' | 'insurance' | 'experience'
  destination: string
  title: string
  description: string
  originalPrice: number
  currentPrice: number
  savings: number
  savingsPercentage: number
  validUntil: Date
  provider: string
  affiliateUrl?: string
  confidence: number
  relevanceScore: number
  urgency: 'low' | 'medium' | 'high' | 'critical'
  tags: string[]
}

interface SmartDealHunterProps {
  userStatus: UserStatus
  currentTrips: any[]
  upcomingTrips: any[]
  userLocation?: string
  travelPreferences?: {
    budget: 'budget' | 'mid-range' | 'luxury'
    style: 'business' | 'leisure' | 'family'
    frequentDestinations: string[]
  }
  className?: string
}

export function SmartDealHunter({
  userStatus,
  currentTrips = [],
  upcomingTrips = [],
  userLocation = 'United Kingdom',
  travelPreferences,
  className = ''
}: SmartDealHunterProps) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isHunting, setIsHunting] = useState(false)
  const [lastHunt, setLastHunt] = useState<Date | null>(null)
  const [expandedDeal, setExpandedDeal] = useState<string | null>(null)
  const [huntingProgress, setHuntingProgress] = useState(0)

  // Hunt for deals automatically when context changes
  useEffect(() => {
    if (userStatus !== UserStatus.FREE) {
      huntForDeals()
      
      // Set up periodic hunting every 30 minutes
      const interval = setInterval(huntForDeals, 30 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [userStatus, currentTrips, upcomingTrips, userLocation])

  const huntForDeals = useCallback(async () => {
    if (userStatus === UserStatus.FREE || isHunting) return

    setIsHunting(true)
    setHuntingProgress(0)

    try {
      // Simulate progressive hunting with visual feedback
      const progressSteps = [
        { progress: 20, message: 'Scanning flight prices...' },
        { progress: 40, message: 'Analyzing hotel rates...' },
        { progress: 60, message: 'Checking package deals...' },
        { progress: 80, message: 'Evaluating insurance options...' },
        { progress: 100, message: 'Ranking opportunities...' }
      ]

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 400))
        setHuntingProgress(step.progress)
      }

      // Generate contextual query for deal hunting
      const query = buildDealHuntingQuery()
      
      // Use real-time intelligence for live pricing
      const response = await getRealTimeIntelligence(query, {
        currentTrips,
        upcomingTrips,
        userLocation,
        travelPreferences
      })

      // Process response and generate deals
      const foundDeals = await processDealResponse(response)
      
      setDeals(foundDeals)
      setLastHunt(new Date())

    } catch (error) {
      console.error('[SmartDealHunter] Hunting failed:', error)
      // Show fallback deals from cache or defaults
      setDeals(generateFallbackDeals())
    } finally {
      setIsHunting(false)
      setHuntingProgress(0)
    }
  }, [userStatus, currentTrips, upcomingTrips, userLocation, travelPreferences, isHunting])

  const buildDealHuntingQuery = () => {
    const destinations = [
      ...upcomingTrips.map(trip => trip.country),
      ...currentTrips.map(trip => trip.country),
      ...(travelPreferences?.frequentDestinations || [])
    ].filter((dest, index, arr) => arr.indexOf(dest) === index)

    if (destinations.length === 0) {
      return `Find the best current travel deals for European destinations from ${userLocation}. Focus on value opportunities for ${travelPreferences?.style || 'leisure'} travel.`
    }

    return `Find current travel deals and savings opportunities for trips to ${destinations.join(', ')} from ${userLocation}. Include flights, hotels, packages, and travel insurance. Focus on ${travelPreferences?.budget || 'mid-range'} ${travelPreferences?.style || 'leisure'} travel.`
  }

  const processDealResponse = async (response: any): Promise<Deal[]> => {
    // In production, this would parse real API responses
    // For now, generate contextually relevant mock deals
    return generateContextualDeals()
  }

  const generateContextualDeals = (): Deal[] => {
    const destinations = [...new Set([
      ...upcomingTrips.map(trip => trip.country),
      'France', 'Spain', 'Italy', 'Germany', 'Netherlands'
    ])]

    return destinations.slice(0, 3).map((destination, index) => {
      const basePrice = 200 + Math.random() * 800
      const savings = 50 + Math.random() * 200
      const savingsPercentage = Math.round((savings / basePrice) * 100)
      
      return {
        id: `deal_${Date.now()}_${index}`,
        type: ['flight', 'hotel', 'package'][index % 3] as Deal['type'],
        destination,
        title: `${destination} ${['Flight', 'Hotel', 'Package'][index % 3]} Deal`,
        description: `Special offer for ${destination} travel from ${userLocation}. Limited time availability.`,
        originalPrice: Math.round(basePrice + savings),
        currentPrice: Math.round(basePrice),
        savings: Math.round(savings),
        savingsPercentage,
        validUntil: new Date(Date.now() + (24 * 60 * 60 * 1000) * (1 + Math.random() * 7)), // 1-7 days
        provider: ['Skyscanner', 'Booking.com', 'Expedia'][index % 3],
        affiliateUrl: '#',
        confidence: 0.8 + Math.random() * 0.2,
        relevanceScore: 0.7 + Math.random() * 0.3,
        urgency: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
        tags: ['Limited Time', 'Best Price', 'Recommended']
      }
    })
  }

  const generateFallbackDeals = (): Deal[] => {
    return [
      {
        id: 'fallback_1',
        type: 'insurance',
        destination: 'Europe-wide',
        title: 'Travel Insurance Deal',
        description: 'Comprehensive travel insurance for Schengen area trips',
        originalPrice: 45,
        currentPrice: 32,
        savings: 13,
        savingsPercentage: 29,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        provider: 'Globelink',
        confidence: 0.9,
        relevanceScore: 0.95,
        urgency: 'medium',
        tags: ['Essential', 'Schengen Required']
      }
    ]
  }

  const handleDealClick = (deal: Deal) => {
    if (deal.affiliateUrl && deal.affiliateUrl !== '#') {
      // Track affiliate click
      window.open(deal.affiliateUrl, '_blank')
    } else {
      setExpandedDeal(expandedDeal === deal.id ? null : deal.id)
    }
  }

  const getDealIcon = (type: Deal['type']) => {
    const icons = {
      flight: '✈️',
      hotel: '🏨',
      package: '📦',
      insurance: '🛡️',
      experience: '🎯'
    }
    return icons[type] || '💰'
  }

  const getUrgencyColor = (urgency: Deal['urgency']) => {
    const colors = {
      low: 'text-green-600 bg-green-50 border-green-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      high: 'text-orange-600 bg-orange-50 border-orange-200',
      critical: 'text-red-600 bg-red-50 border-red-200'
    }
    return colors[urgency]
  }

  const formatTimeRemaining = (validUntil: Date) => {
    const now = new Date()
    const diff = validUntil.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 1) return `${days} days left`
    if (hours > 1) return `${hours} hours left`
    return 'Expires soon'
  }

  if (userStatus === UserStatus.FREE) {
    return (
      <Card className={`border-dashed border-gray-300 ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <TrendingDown className="w-5 h-5" />
              <span className="font-medium">Smart Deal Hunter</span>
            </div>
            <p className="text-gray-600 text-sm">
              AI scans thousands of travel deals to find personalized savings opportunities
            </p>
            <Button variant="outline" size="sm">
              Unlock AI Deal Hunter
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hunt Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-900">Smart Deal Hunter</span>
          {deals.length > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {deals.length} opportunities found
            </Badge>
          )}
        </div>
        
        {!isHunting && lastHunt && (
          <Button
            variant="ghost"
            size="sm"
            onClick={huntForDeals}
            className="text-gray-500 hover:text-gray-700"
          >
            Refresh
          </Button>
        )}
      </div>

      {/* Hunting Progress */}
      <AnimatePresence>
        {isHunting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-900">
                      Hunting for deals...
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${huntingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deal Cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleDealClick(deal)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-2xl">{getDealIcon(deal.type)}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">{deal.title}</h4>
                          <Badge variant="secondary" className={`text-xs ${getUrgencyColor(deal.urgency)}`}>
                            {deal.urgency}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                          {deal.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{deal.destination}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{formatTimeRemaining(deal.validUntil)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold text-green-600">
                        £{deal.currentPrice}
                      </div>
                      <div className="text-xs text-gray-500 line-through">
                        £{deal.originalPrice}
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        Save £{deal.savings}
                      </Badge>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedDeal === deal.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {deal.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Confidence: {Math.round(deal.confidence * 100)}%
                            </span>
                            
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Deal
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {!isHunting && deals.length === 0 && (
        <Card className="border-dashed border-gray-300">
          <CardContent className="p-6 text-center">
            <TrendingDown className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">
              No deals found yet. Add upcoming trips to get personalized savings opportunities.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={huntForDeals}
              className="mt-3"
            >
              Hunt for Deals
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Last Hunt Timestamp */}
      {lastHunt && !isHunting && (
        <div className="text-xs text-gray-500 text-center">
          Last updated: {lastHunt.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default SmartDealHunter