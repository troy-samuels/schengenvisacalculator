'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Calendar, ArrowRight, Check, AlertCircle, TrendingUp, Clock, MapPin } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner, LoadingButton } from './loading-states'
import { TripOptimizer, Trip, OptimizationResult, OptimizationExplanation } from '@/lib/services/trip-optimizer'
import { cn } from '@/lib/utils'

export interface TripOptimizationProps {
  trips: Trip[]
  onTripsUpdated: (optimizedTrips: Trip[]) => void
  className?: string
}

export function TripOptimization({ trips, onTripsUpdated, className }: TripOptimizationProps) {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
  const [showResults, setShowResults] = useState(false)

  const optimizer = new TripOptimizer()

  const handleOptimize = useCallback(async () => {
    setIsOptimizing(true)
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const result = optimizer.optimizeTrips(trips)
      setOptimizationResult(result)
      setShowResults(true)
    } catch (error) {
      console.error('Optimization failed:', error)
    } finally {
      setIsOptimizing(false)
    }
  }, [trips, optimizer])

  const handleApplyOptimization = useCallback(() => {
    if (optimizationResult) {
      onTripsUpdated(optimizationResult.optimizedTrips)
      setShowResults(false)
      setOptimizationResult(null)
    }
  }, [optimizationResult, onTripsUpdated])

  const handleDismissOptimization = useCallback(() => {
    setShowResults(false)
    setOptimizationResult(null)
  }, [])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Auto-optimize Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingButton
          isLoading={isOptimizing}
          loadingText="Optimizing trips..."
          onClick={handleOptimize}
          disabled={trips.length === 0}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium py-3 rounded-xl shadow-lg"
        >
          <Zap className="h-5 w-5 mr-2" />
          Auto-optimize my trips
        </LoadingButton>
      </motion.div>

      {/* Optimization Loading State */}
      <AnimatePresence>
        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex flex-col items-center space-y-4">
                <LoadingSpinner size="lg" />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Analyzing Your Trips</h3>
                  <p className="text-sm text-gray-600">
                    Finding the best arrangement to maximize your available days...
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimization Results */}
      <AnimatePresence>
        {showResults && optimizationResult && (
          <OptimizationResults
            result={optimizationResult}
            onApply={handleApplyOptimization}
            onDismiss={handleDismissOptimization}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

interface OptimizationResultsProps {
  result: OptimizationResult
  onApply: () => void
  onDismiss: () => void
}

function OptimizationResults({ result, onApply, onDismiss }: OptimizationResultsProps) {
  const [showDetails, setShowDetails] = useState(false)

  const hasImprovements = result.totalDaysSaved > 0 || result.compliance.afterOptimization.isCompliant

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
    >
      <Card className={cn(
        'p-6 border-2',
        hasImprovements 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
          : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
      )}>
        {/* Results Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              hasImprovements ? 'bg-green-100' : 'bg-gray-100'
            )}>
              {hasImprovements ? (
                <TrendingUp className="h-6 w-6 text-green-600" />
              ) : (
                <Check className="h-6 w-6 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {hasImprovements ? 'Optimization Found!' : 'Trips Already Optimal'}
              </h3>
              <p className="text-sm text-gray-600">
                {hasImprovements 
                  ? 'We found ways to improve your trip arrangement'
                  : 'Your current trip arrangement is already well optimized'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className={cn(
              'text-2xl font-bold',
              result.totalDaysSaved > 0 ? 'text-green-600' : 'text-gray-600'
            )}>
              {result.totalDaysSaved > 0 ? '+' : ''}{result.totalDaysSaved}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Days Saved</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {result.optimizedTotalDays}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Days</div>
          </div>

          <div className="text-center">
            <div className={cn(
              'text-2xl font-bold',
              result.compliance.afterOptimization.isCompliant ? 'text-green-600' : 'text-red-600'
            )}>
              {result.compliance.afterOptimization.remainingDays}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Days Left</div>
          </div>

          <div className="text-center">
            <Badge
              variant={result.compliance.afterOptimization.riskLevel === 'low' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {result.compliance.afterOptimization.riskLevel} Risk
            </Badge>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Compliance</div>
          </div>
        </div>

        {/* Before/After Comparison */}
        {hasImprovements && (
          <BeforeAfterComparison
            original={result.originalTrips}
            optimized={result.optimizedTrips}
            explanations={result.explanations}
          />
        )}

        {/* Detailed Explanations */}
        {result.explanations.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <span>View detailed explanations</span>
              <motion.div
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  {result.explanations.map((explanation, index) => (
                    <ExplanationCard key={explanation.tripId} explanation={explanation} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {hasImprovements && (
            <Button
              onClick={onApply}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply Changes
            </Button>
          )}
          <Button
            onClick={onDismiss}
            variant={hasImprovements ? 'outline' : 'default'}
            className="flex-1"
          >
            {hasImprovements ? 'Keep Current' : 'Close'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

interface BeforeAfterComparisonProps {
  original: Trip[]
  optimized: Trip[]
  explanations: OptimizationExplanation[]
}

function BeforeAfterComparison({ original, optimized, explanations }: BeforeAfterComparisonProps) {
  const today = new Date()
  const futureOriginal = original.filter(trip => trip.endDate >= today)
  const futureOptimized = optimized.filter(trip => trip.endDate >= today)

  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 mb-4 flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        Before & After Comparison
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Before */}
        <div>
          <div className="text-sm font-medium text-gray-600 mb-2">Before (Current)</div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {futureOriginal.map((trip, index) => (
              <TripComparisonCard
                key={`original-${trip.id}`}
                trip={trip}
                type="original"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* After */}
        <div>
          <div className="text-sm font-medium text-gray-600 mb-2">After (Optimized)</div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {futureOptimized.map((trip, index) => (
              <TripComparisonCard
                key={`optimized-${trip.id}`}
                trip={trip}
                type="optimized"
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TripComparisonCardProps {
  trip: Trip
  type: 'original' | 'optimized'
  index: number
}

function TripComparisonCard({ trip, type, index }: TripComparisonCardProps) {
  const duration = differenceInDays(trip.endDate, trip.startDate) + 1
  const isOptimized = trip.isOptimized
  
  return (
    <motion.div
      initial={{ opacity: 0, x: type === 'original' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        'p-3 rounded-lg border text-sm',
        type === 'original' 
          ? 'bg-gray-50 border-gray-200'
          : isOptimized
            ? 'bg-green-50 border-green-200'
            : 'bg-blue-50 border-blue-200'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="font-medium">{trip.countries.join(', ')}</span>
          {isOptimized && type === 'optimized' && (
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
              Optimized
            </Badge>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {duration} day{duration !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="text-xs text-gray-600 mt-1">
        {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d, yyyy')}
      </div>
    </motion.div>
  )
}

interface ExplanationCardProps {
  explanation: OptimizationExplanation
  index: number
}

function ExplanationCard({ explanation, index }: ExplanationCardProps) {
  const getTypeIcon = (type: OptimizationExplanation['type']) => {
    switch (type) {
      case 'moved':
        return <ArrowRight className="h-4 w-4 text-blue-600" />
      case 'shortened':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'split':
        return <MapPin className="h-4 w-4 text-purple-600" />
      case 'reordered':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      default:
        return <Check className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: OptimizationExplanation['type']) => {
    switch (type) {
      case 'moved':
        return 'bg-blue-50 border-blue-200'
      case 'shortened':
        return 'bg-orange-50 border-orange-200'
      case 'split':
        return 'bg-purple-50 border-purple-200'
      case 'reordered':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn(
        'p-4 rounded-lg border',
        getTypeColor(explanation.type)
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {getTypeIcon(explanation.type)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 mb-1">
            {explanation.description}
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <div>
              Before: {format(explanation.oldDates.start, 'MMM d')} - {format(explanation.oldDates.end, 'MMM d, yyyy')}
            </div>
            <div>
              After: {format(explanation.newDates.start, 'MMM d')} - {format(explanation.newDates.end, 'MMM d, yyyy')}
            </div>
          </div>
          {explanation.daysSaved !== 0 && (
            <div className={cn(
              'text-xs font-medium mt-1',
              explanation.daysSaved > 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {explanation.daysSaved > 0 ? '+' : ''}{explanation.daysSaved} days
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}