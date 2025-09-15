/**
 * Apple-Style Interface Component
 * Minimalist, progressive disclosure design with invisible AI intelligence
 * Focus on essential actions with contextual feature discovery
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@schengen/ui'
import { Button } from '@schengen/ui'
import { Badge } from '@schengen/ui'
import { UserStatus } from '../types/user-status'
import { InvisibleAI, getInvisibleInsights, markInsightsViewed, InvisibleInsight, initializeAIContext } from '../services/invisible-ai-engine'

interface AppleStyleInterfaceProps {
  userStatus: UserStatus
  trips: any[]
  upcomingTrips: any[]
  onTripAdd?: () => void
  onPremiumUpgrade?: () => void
  className?: string
}

export function AppleStyleInterface({
  userStatus,
  trips = [],
  upcomingTrips = [],
  onTripAdd,
  onPremiumUpgrade,
  className = ''
}: AppleStyleInterfaceProps) {
  const [insights, setInsights] = useState<InvisibleInsight[]>([])
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null)
  const [showingAdvanced, setShowingAdvanced] = useState(false)
  const [currentIntent, setCurrentIntent] = useState<'exploring' | 'planning' | 'booking' | 'compliance_checking'>('exploring')

  // Initialize AI context on mount
  useEffect(() => {
    if (userStatus !== UserStatus.FREE) {
      initializeAIContext({
        userStatus,
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
        sessionData: {
          currentTrips: trips,
          upcomingTrips,
          calculationHistory: [],
          lastActivity: new Date(),
          sessionDuration: 0
        },
        behaviorPatterns: {
          frequentDestinations: [],
          travelStyle: 'leisure',
          bookingPatterns: [],
          complianceHistory: []
        },
        currentIntent
      })

      // Set up insight monitoring
      InvisibleAI.onContextUpdate((newInsights) => {
        setInsights(newInsights)
      })

      // Get initial insights
      setInsights(getInvisibleInsights())
    }
  }, [userStatus, trips, upcomingTrips, currentIntent])

  const handleInsightView = useCallback((insightId: string) => {
    markInsightsViewed([insightId])
    setInsights(prev => prev.filter(i => i.id !== insightId))
  }, [])

  const handleIntentChange = useCallback((newIntent: typeof currentIntent) => {
    setCurrentIntent(newIntent)
  }, [])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Action Area - Clean and Focused */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-3xl font-light text-gray-900 mb-3">
                Travel Intelligence
              </h1>
              <p className="text-gray-600 font-light max-w-md mx-auto leading-relaxed">
                {userStatus !== UserStatus.FREE
                  ? "AI working behind the scenes to optimize your European travel"
                  : "Check Schengen compliance with intelligent guidance"
                }
              </p>
            </motion.div>

            {/* Smart Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={onTripAdd}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                         text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl
                         transition-all duration-300 transform hover:scale-105"
              >
                {trips.length === 0 
                  ? "Add Your First Trip" 
                  : upcomingTrips.length > 0 
                    ? "Plan Next Journey"
                    : "Add Another Trip"
                }
              </Button>
            </motion.div>

            {/* Progressive Disclosure Hint */}
            {trips.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-gray-500"
              >
                {userStatus !== UserStatus.FREE ? "AI insights appear as you plan" : "Upgrade for AI travel intelligence"}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights - Only Show When Relevant */}
      <AnimatePresence>
        {userStatus !== UserStatus.FREE && insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-3"
          >
            {insights.map((insight) => (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group"
              >
                <Card className="border-0 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 
                               transition-all duration-300 cursor-pointer"
                      onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          insight.type === 'savings' ? 'bg-green-500' :
                          insight.type === 'warning' ? 'bg-yellow-500' :
                          insight.type === 'compliance' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {insight.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            {insight.message}
                          </p>
                          
                          {/* Value Display */}
                          {insight.value?.savings && (
                            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                              Save £{insight.value.savings}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Confidence Indicator */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-1 h-8 rounded-full ${
                          insight.confidence > 0.8 ? 'bg-green-500' :
                          insight.confidence > 0.6 ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleInsightView(insight.id)
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                          ×
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedInsight === insight.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          {insight.action && (
                            <Button
                              size="sm"
                              className="bg-white/80 hover:bg-white text-gray-900 border border-gray-200"
                            >
                              {insight.action.type === 'suggestion' ? 'View Details' : 
                               insight.action.type === 'notification' ? 'Learn More' :
                               'Take Action'}
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anonymous User Premium Hint */}
      {userStatus === UserStatus.FREE && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Unlock AI Travel Intelligence</h3>
                  <p className="text-gray-600 text-sm mt-1 max-w-sm mx-auto">
                    Get personalized savings, compliance monitoring, and optimization
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Smart Deal Hunter</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Compliance Autopilot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Real-time Intelligence</span>
                  </div>
                </div>

                <Button
                  onClick={onPremiumUpgrade}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                           text-white px-6 py-2 rounded-xl font-medium transition-all duration-300"
                >
                  Unlock Intelligence - £24.99/month
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Progressive Feature Discovery */}
      {userStatus !== UserStatus.FREE && trips.length > 2 && !showingAdvanced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <Button
            variant="ghost"
            onClick={() => setShowingAdvanced(true)}
            className="text-gray-500 hover:text-gray-700 text-sm font-light"
          >
            Discover Advanced Features
          </Button>
        </motion.div>
      )}

      {/* Advanced Features - Progressive Disclosure */}
      <AnimatePresence>
        {showingAdvanced && userStatus !== UserStatus.FREE && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Intelligence Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard
                    icon="🎯"
                    title="Smart Deal Hunter"
                    description="AI scans for personalized savings"
                    onClick={() => handleIntentChange('booking')}
                  />
                  <FeatureCard
                    icon="⚡"
                    title="Compliance Autopilot"
                    description="Automatic rule enforcement"
                    onClick={() => handleIntentChange('compliance_checking')}
                  />
                  <FeatureCard
                    icon="👨‍👩‍👧‍👦"
                    title="Family Coordinator"
                    description="Multi-person optimization"
                    onClick={() => handleIntentChange('planning')}
                  />
                  <FeatureCard
                    icon="🇬🇧"
                    title="Brexit Assistant"
                    description="UK-specific guidance"
                    onClick={() => handleIntentChange('compliance_checking')}
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setShowingAdvanced(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    Hide Advanced Features
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  onClick?: () => void
}

function FeatureCard({ icon, title, description, onClick }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 rounded-xl bg-white border border-gray-100 cursor-pointer
                 hover:border-gray-200 hover:shadow-sm transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default AppleStyleInterface