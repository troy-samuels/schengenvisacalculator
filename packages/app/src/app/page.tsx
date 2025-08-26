'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { type Trip, getCountriesForSelect, SCHENGEN_COUNTRIES, RobustSchengenCalculator } from '@schengen/calculator'
import { Select, Button, Card, CardContent, CardHeader, CircularProgress, CalendarModal, AnimatedCounter } from '@schengen/ui'
import { Calculator, Calendar, MapPin, Clock, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

// Progressive form states
type FormStage = 'country' | 'dates' | 'complete'

// Date range type for app state
type AppDateRange = { startDate: Date | null; endDate: Date | null }

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDateRange, setSelectedDateRange] = useState<AppDateRange>({ startDate: null, endDate: null })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [trips, setTrips] = useState<Trip[]>([])
  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [currentFormStage, setCurrentFormStage] = useState<FormStage>('country')

  // Real-time calculation states
  const [currentTripDays, setCurrentTripDays] = useState<number>(0)
  const [totalDaysInPeriod, setTotalDaysInPeriod] = useState<number>(0)
  const [remainingDays, setRemainingDays] = useState<number>(90)

  // Get countries for dropdown
  const countryOptions = getCountriesForSelect()

  // Determine current form stage
  const getFormStage = useCallback((): FormStage => {
    if (!selectedCountry) return 'country'
    if (!selectedDateRange.startDate || !selectedDateRange.endDate) return 'dates'
    return 'complete'
  }, [selectedCountry, selectedDateRange])

  // Update form stage when dependencies change
  useEffect(() => {
    setCurrentFormStage(getFormStage())
  }, [getFormStage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Schengen Visa Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your 90/180-day compliance with intelligent date overlap prevention
          </p>
        </div>

        {/* Test content */}
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p>Test page - basic functionality only</p>
        </div>
      </div>
    </div>
  )
}