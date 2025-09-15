"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Badge } from './badge'
import { Input } from './input'
import { Label } from './label'
import { Trip, RobustSchengenCalculator, FutureTripValidation, TripRecommendation } from '@schengen/calculator'
import {
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CalendarDays
} from 'lucide-react'
import { format, addDays, isValid } from 'date-fns'
import { cn } from '../../lib/utils'

export interface FutureTripValidatorProps {
  existingTrips: Trip[]
  onTripValidated?: (validation: FutureTripValidation) => void
  className?: string
  autoValidate?: boolean
}

interface PlannerState {
  country: string
  startDate: string
  endDate: string
  duration: number
}

export function FutureTripValidator({
  existingTrips,
  onTripValidated,
  className,
  autoValidate = true
}: FutureTripValidatorProps) {
  const [plannerState, setPlannerState] = useState<PlannerState>({
    country: '',
    startDate: '',
    endDate: '',
    duration: 7
  })
  const [validation, setValidation] = useState<FutureTripValidation | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)

  // Real-time validation as user types
  const validatedTrip = useMemo(() => {
    if (!plannerState.country) return null

    let startDate: Date | undefined
    let endDate: Date | undefined

    if (plannerState.startDate) {
      startDate = new Date(plannerState.startDate)
      if (!isValid(startDate)) startDate = undefined
    }

    if (plannerState.endDate) {
      endDate = new Date(plannerState.endDate)
      if (!isValid(endDate)) endDate = undefined
    }

    // If only start date and duration, calculate end date
    if (startDate && !endDate && plannerState.duration > 0) {
      endDate = addDays(startDate, plannerState.duration - 1)
    }

    // If only end date and duration, calculate start date
    if (endDate && !startDate && plannerState.duration > 0) {
      startDate = addDays(endDate, -(plannerState.duration - 1))
    }

    const plannedTrip = {
      id: 'planned',
      country: plannerState.country,
      startDate,
      endDate,
      days: plannerState.duration
    }

    return RobustSchengenCalculator.validateFutureTrip(existingTrips, plannedTrip)
  }, [existingTrips, plannerState])

  // Update validation when trip changes
  useEffect(() => {
    if (validatedTrip && autoValidate) {
      setValidation(validatedTrip)
      onTripValidated?.(validatedTrip)
    }
  }, [validatedTrip, autoValidate, onTripValidated])

  const handleInputChange = (field: keyof PlannerState, value: string | number) => {
    setPlannerState(prev => ({ ...prev, [field]: value }))
  }

  const applySuggestion = (recommendation: TripRecommendation) => {
    if (recommendation.suggestedStartDate && recommendation.suggestedEndDate) {
      setPlannerState(prev => ({
        ...prev,
        startDate: format(recommendation.suggestedStartDate!, 'yyyy-MM-dd'),
        endDate: format(recommendation.suggestedEndDate!, 'yyyy-MM-dd'),
        duration: recommendation.maxDuration || prev.duration
      }))
    }
  }

  const getSeverityColor = (severity: 'info' | 'warning' | 'error') => {
    switch (severity) {
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'info':
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getSeverityIcon = (severity: 'info' | 'warning' | 'error') => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="w-4 h-4" />
      case 'warning':
        return <Clock className="w-4 h-4" />
      case 'info':
      default:
        return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className={cn("bg-white rounded-xl shadow-lg border p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
          Future Trip Validator
        </h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          Smart Planning
        </Badge>
      </div>

      {/* Trip Planning Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Country Input */}
        <div>
          <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Destination Country
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="e.g., France, Germany, Spain"
            value={plannerState.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Duration Input */}
        <div>
          <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Trip Duration (days)
          </Label>
          <Input
            id="duration"
            type="number"
            min="1"
            max="90"
            value={plannerState.duration}
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        {/* Start Date Input */}
        <div>
          <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={plannerState.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full"
          />
        </div>

        {/* End Date Input */}
        <div>
          <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={plannerState.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Real-time Validation Results */}
      <AnimatePresence>
        {validation && plannerState.country && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Validation Status */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center">
                {validation.validation.isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                )}
                <div>
                  <div className="font-medium">
                    {validation.validation.isValid
                      ? 'Trip is Compliant!'
                      : `Violation: ${validation.validation.violationDays} days over limit`
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    You can travel for up to {validation.maxTripDuration} consecutive days
                  </div>
                </div>
              </div>

              {validation.smartSuggestions.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRecommendations(!showRecommendations)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showRecommendations ? 'Hide' : 'Show'} Suggestions
                </Button>
              )}
            </div>

            {/* Smart Recommendations */}
            <AnimatePresence>
              {showRecommendations && validation.smartSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                    Smart Recommendations
                  </h4>

                  {validation.smartSuggestions.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-4 rounded-lg border",
                        getSeverityColor(recommendation.severity)
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          {getSeverityIcon(recommendation.severity)}
                          <div className="ml-3 flex-1">
                            <div className="font-medium">{recommendation.message}</div>

                            {/* Alternative Options */}
                            {recommendation.alternativeOptions && (
                              <div className="mt-2 space-y-2">
                                {recommendation.alternativeOptions.map((option, optionIndex) => (
                                  <div key={optionIndex} className="text-sm">
                                    Trip {optionIndex + 1}: {format(option.startDate, 'MMM d')} - {format(option.endDate, 'MMM d, yyyy')}
                                    ({option.duration} days, {option.daysRemaining} days remaining after)
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Suggested Dates */}
                            {recommendation.suggestedStartDate && recommendation.suggestedEndDate && (
                              <div className="mt-2 text-sm">
                                <strong>Suggested:</strong> {format(recommendation.suggestedStartDate, 'MMM d')} - {format(recommendation.suggestedEndDate, 'MMM d, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Apply Suggestion Button */}
                        {recommendation.suggestedStartDate && recommendation.suggestedEndDate && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applySuggestion(recommendation)}
                            className="ml-2 flex items-center gap-1"
                          >
                            Apply
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Safe Travel Periods Preview */}
            {validation.safeTravelPeriods.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Upcoming Safe Travel Periods
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {validation.safeTravelPeriods.slice(0, 4).map((period, index) => (
                    <div key={index} className="text-green-700">
                      {format(period.start, 'MMM d')} - {format(period.end, 'MMM d, yyyy')}
                      <span className="text-green-600 ml-2">
                        (up to {period.maxDuration} days)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Text */}
      {!plannerState.country && (
        <div className="text-center text-gray-500 py-8">
          <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-sm">
            Enter your destination to get instant validation and smart travel recommendations
          </p>
        </div>
      )}
    </div>
  )
}

export default FutureTripValidator