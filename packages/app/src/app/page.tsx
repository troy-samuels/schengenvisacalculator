'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { type Trip, getCountriesForSelect, SCHENGEN_COUNTRIES, RobustSchengenCalculator } from '@schengen/calculator'
import { Select, Button, Card, CardContent, CardHeader, CircularProgress, CalendarModal, AnimatedCounter, type DateRange } from '@schengen/ui'
import { Calculator, Calendar, MapPin, Clock, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

// Progressive form states
type FormStage = 'country' | 'dates' | 'complete'

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ startDate: null, endDate: null })
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

  // Get column styling based on current stage
  const getColumnStyle = (columnStage: FormStage) => {
    const stage = getFormStage()
    
    if (columnStage === stage) {
      return 'border-2 border-blue-400 bg-blue-50 shadow-md transition-all duration-300'
    }
    
    if ((columnStage === 'country' && (stage === 'dates' || stage === 'complete')) ||
        (columnStage === 'dates' && stage === 'complete')) {
      return 'border-2 border-green-400 bg-green-50 transition-all duration-300'
    }
    
    return 'border-2 border-gray-200 bg-gray-50 transition-all duration-300'
  }

  // Get progress dot styling
  const getProgressDotStyle = (dotStage: FormStage) => {
    const stage = getFormStage()
    
    if (dotStage === stage) {
      return 'w-3 h-3 rounded-full bg-primary animate-pulse transition-all duration-300 shadow-sm'
    }
    
    if ((dotStage === 'country' && (stage === 'dates' || stage === 'complete')) ||
        (dotStage === 'dates' && stage === 'complete')) {
      return 'w-3 h-3 rounded-full bg-calendar-valid transition-all duration-300 shadow-sm'
    }
    
    return 'w-3 h-3 rounded-full bg-gray-300 transition-all duration-300'
  }

  const handleCalculate = useCallback(async () => {
    console.log('handleCalculate called', { selectedCountry, selectedDateRange, trips: trips.length })
    
    if (!selectedCountry || !selectedDateRange.startDate || !selectedDateRange.endDate) {
      toast.error('Please select country and travel dates')
      return
    }

    const start = selectedDateRange.startDate
    const end = selectedDateRange.endDate

    if (start >= end) {
      toast.error('End date must be after start date')
      return
    }

    setIsCalculating(true)
    
    try {
      const selectedCountryData = SCHENGEN_COUNTRIES.find(c => c.code === selectedCountry)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

      const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        country: selectedCountryData?.name || selectedCountry,
        startDate: start,
        endDate: end,
        days,
      }

      const updatedTrips = [...trips, newTrip]
      console.log('Adding trip:', newTrip)
      console.log('Updated trips:', updatedTrips)
      
      // Calculate compliance using RobustSchengenCalculator
      const result = RobustSchengenCalculator.calculateExactCompliance(updatedTrips, new Date())

      setTrips(updatedTrips)
      setCalculationResult(result)
      
      // Update real-time calculations
      setTotalDaysInPeriod(result.totalDaysUsed)
      setRemainingDays(result.daysRemaining)
      
      toast.success(`Trip to ${selectedCountryData?.name || selectedCountry} added successfully!`)
      
      // Clear form after a short delay to show the trip was added
      setTimeout(() => {
        setSelectedCountry('')
        setSelectedDateRange({ startDate: null, endDate: null })
      }, 100)
      
    } catch (error) {
      console.error('Calculation error:', error)
      toast.error(`Error adding trip: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCalculating(false)
    }
  }, [selectedCountry, selectedDateRange, trips])

  const handleClearTrips = useCallback(() => {
    setTrips([])
    setCalculationResult(null)
    toast.success('Cleared all trips')
  }, [])

  const handleDeleteTrip = useCallback((tripId: string) => {
    const updatedTrips = trips.filter(t => t.id !== tripId)
    setTrips(updatedTrips)
    
    if (updatedTrips.length === 0) {
      setCalculationResult(null)
    } else {
      // Recalculate with remaining trips
      const result = RobustSchengenCalculator.calculateExactCompliance(updatedTrips, new Date())
      setCalculationResult(result)
    }
    
    toast.success('Trip removed and compliance recalculated')
  }, [trips])

  // Calendar modal handlers
  const handleOpenCalendar = useCallback(() => {
    setIsCalendarOpen(true)
  }, [])

  const handleCloseCalendar = useCallback(() => {
    setIsCalendarOpen(false)
  }, [])

  const handleDateRangeSelect = useCallback((range: DateRange) => {
    setSelectedDateRange(range)
  }, [])

  // Real-time calculation effect
  useEffect(() => {
    // Calculate current trip days
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const days = Math.ceil((selectedDateRange.endDate.getTime() - selectedDateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      setCurrentTripDays(days)
    } else {
      setCurrentTripDays(0)
    }

    // Calculate 180-day rolling window total
    const today = new Date()
    const oneEightyDaysAgo = new Date(today.getTime() - (180 * 24 * 60 * 60 * 1000))

    let totalDaysUsed = 0

    // Add days from existing trips that fall within the 180-day window
    trips.forEach(trip => {
      const tripStart = new Date(trip.startDate)
      const tripEnd = new Date(trip.endDate)
      
      // Check if trip overlaps with 180-day window
      if (tripEnd >= oneEightyDaysAgo && tripStart <= today) {
        // Calculate overlapping days
        const windowStart = new Date(Math.max(tripStart.getTime(), oneEightyDaysAgo.getTime()))
        const windowEnd = new Date(Math.min(tripEnd.getTime(), today.getTime()))
        const daysInWindow = Math.ceil((windowEnd.getTime() - windowStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
        totalDaysUsed += Math.max(0, daysInWindow)
      }
    })

    // Add current trip days if they would fall within the window
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const currentTripStart = selectedDateRange.startDate
      const currentTripEnd = selectedDateRange.endDate
      
      // Check if current trip overlaps with 180-day window
      if (currentTripEnd >= oneEightyDaysAgo && currentTripStart <= today) {
        const windowStart = new Date(Math.max(currentTripStart.getTime(), oneEightyDaysAgo.getTime()))
        const windowEnd = new Date(Math.min(currentTripEnd.getTime(), today.getTime()))
        const daysInWindow = Math.ceil((windowEnd.getTime() - windowStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
        totalDaysUsed += Math.max(0, daysInWindow)
      }
    }

    setTotalDaysInPeriod(totalDaysUsed)
    setRemainingDays(Math.max(0, 90 - totalDaysUsed))
  }, [selectedDateRange, trips])

  return (
    <main id="main-content" className="min-h-screen bg-cream">
      <div className="container mx-auto p-4 mobile:p-6 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-8 mobile:mb-12">
        <h1 className="text-4xl mobile:text-5xl font-bold mb-4 text-balance">
          Schengen Visa Calculator
        </h1>
        <h2 className="text-xl mobile:text-2xl text-muted-foreground font-medium mb-6 text-balance">
          Check Your 90/180 Day Rule Compliance - Avoid Overstay Penalties
        </h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto text-balance leading-relaxed">
          The Schengen Area allows visitors to stay for up to <strong>90 days within any 180-day period</strong>. 
          Overstaying can result in <strong>entry bans, fines up to €5,000, and deportation</strong>. 
          Our calculator ensures your European travel stays compliant and penalty-free.
        </p>
        
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto shadow-schengen-card">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-primary-900">Why This Matters</span>
          </div>
          <p className="text-sm text-primary-800">
            Visa violations can ban you from Europe for 3+ years. Our tool calculates your exact compliance status 
            and helps you plan safe travel within the 27 Schengen countries.
          </p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className={getProgressDotStyle('country')}></div>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            currentFormStage === 'country' ? 'text-primary-600' :
            (currentFormStage === 'dates' || currentFormStage === 'complete') ? 'text-calendar-valid' :
            'text-gray-400'
          }`}>
            Country
          </span>
        </div>
        
        <div className={`h-px w-8 transition-colors duration-300 ${
          currentFormStage === 'dates' || currentFormStage === 'complete' ? 'bg-calendar-valid' : 'bg-gray-300'
        }`}></div>
        
        <div className="flex items-center gap-2">
          <div className={getProgressDotStyle('dates')}></div>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            currentFormStage === 'dates' ? 'text-primary-600' :
            currentFormStage === 'complete' ? 'text-calendar-valid' :
            'text-gray-400'
          }`}>
            Dates
          </span>
        </div>
        
        <div className={`h-px w-8 transition-colors duration-300 ${
          currentFormStage === 'complete' ? 'bg-calendar-valid' : 'bg-gray-300'
        }`}></div>
        
        <div className="flex items-center gap-2">
          <div className={getProgressDotStyle('complete')}></div>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            currentFormStage === 'complete' ? 'text-calendar-valid' : 'text-gray-400'
          }`}>
            Complete
          </span>
        </div>
      </div>

        {/* Trip Calculator Interface - Desktop */}
        <Card className="mb-8 p-6 bg-white shadow-schengen-card border-0 rounded-2xl hidden tablet:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="mb-4">
                  <th className="text-left p-2 font-semibold text-gray-700">Country</th>
                  <th className="text-left p-2 font-semibold text-gray-700">Date Range</th>
                  <th className="text-left p-2 font-semibold text-gray-700">Days of Stay</th>
                  <th className="text-left p-2 font-semibold text-gray-700">Days of Stay in the last 180 days</th>
                  <th className="text-left p-2 font-semibold text-gray-700">Days Remaining</th>
                </tr>
              </thead>
              <tbody>
                {/* Existing Trips */}
                {trips.map((trip, index) => {
                  const tripDays = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
                  // Calculate cumulative compliance up to this trip (including this trip)
                  const tripsUpToThis = trips.slice(0, index + 1)
                  const cumulativeCompliance = RobustSchengenCalculator.calculateExactCompliance(tripsUpToThis, new Date())
                  
                  return (
                    <tr key={trip.id} className="border-b border-gray-100">
                      {/* Progress Dots */}
                      <td className="p-2">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-calendar-valid"></div>
                          <div className="w-3 h-3 rounded-full bg-calendar-valid"></div>
                          <div className="w-3 h-3 rounded-full bg-calendar-valid"></div>
                        </div>
                        <div className="rounded-lg p-4 min-w-[200px] border-2 border-green-300 bg-green-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{SCHENGEN_COUNTRIES.find(c => c.name === trip.country)?.flag || '🇪🇺'}</span>
                              <span className="font-semibold text-gray-800">{trip.country}</span>
                            </div>
                            <Button
                              onClick={() => handleDeleteTrip(trip.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </td>

                      {/* Date Range */}
                      <td className="p-2">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-calendar-valid"></div>
                          <div className="w-3 h-3 rounded-full bg-calendar-valid"></div>
                          <div className="w-3 h-3 rounded-full bg-calendar-valid"></div>
                        </div>
                        <div className="rounded-lg p-4 min-w-[220px] border-2 border-blue-300 bg-blue-50">
                          <div className="flex flex-col items-center text-center">
                            <Calendar className="w-5 h-5 mb-2 text-blue-600" />
                            <div className="font-semibold text-gray-800">
                              {format(trip.startDate, 'MMM dd')} - {format(trip.endDate, 'MMM dd')}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Days of Stay */}
                      <td className="p-2">
                        <div className="rounded-lg p-4 min-w-[120px] text-center bg-gray-50 border-2 border-gray-200">
                          <div className="text-xl font-bold text-gray-800">
                            <AnimatedCounter value={tripDays} suffix=" days" />
                          </div>
                        </div>
                      </td>

                      {/* Cumulative Days in Last 180 Days */}
                      <td className="p-2">
                        <div className={`rounded-lg p-4 min-w-[140px] text-center border-2 ${
                          cumulativeCompliance.totalDaysUsed > 90 ? 'bg-red-50 border-red-300' :
                          cumulativeCompliance.totalDaysUsed > 70 ? 'bg-orange-50 border-orange-300' :
                          'bg-gray-50 border-gray-200'
                        }`}>
                          <div className={`text-xl font-bold ${
                            cumulativeCompliance.totalDaysUsed > 90 ? 'text-red-700' :
                            cumulativeCompliance.totalDaysUsed > 70 ? 'text-orange-700' :
                            'text-gray-800'
                          }`}>
                            <AnimatedCounter value={cumulativeCompliance.totalDaysUsed} suffix=" days" />
                          </div>
                          {cumulativeCompliance.totalDaysUsed > 90 && (
                            <div className="text-xs text-red-600 mt-1 font-medium">
                              Over Limit!
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Days Remaining */}
                      <td className="p-2">
                        <div className="flex flex-col items-center justify-center min-w-[120px]">
                          <CircularProgress
                            value={Math.max(0, cumulativeCompliance.daysRemaining)}
                            max={90}
                            size={80}
                            strokeWidth={6}
                            progressColor={
                              cumulativeCompliance.daysRemaining > 60 ? "#10b981" :
                              cumulativeCompliance.daysRemaining > 30 ? "#f59e0b" :
                              cumulativeCompliance.daysRemaining > 10 ? "#ef4444" :
                              "#dc2626"
                            }
                          />
                          <div className="text-center mt-1">
                            <div className={`text-xs font-medium ${
                              cumulativeCompliance.daysRemaining > 60 ? 'text-green-600' :
                              cumulativeCompliance.daysRemaining > 30 ? 'text-orange-600' :
                              cumulativeCompliance.daysRemaining > 10 ? 'text-red-600' :
                              'text-red-700'
                            }`}>
                              <AnimatedCounter value={Math.max(0, cumulativeCompliance.daysRemaining)} />
                            </div>
                            <div className={`text-xs ${
                              cumulativeCompliance.daysRemaining > 60 ? 'text-green-500' :
                              cumulativeCompliance.daysRemaining > 30 ? 'text-orange-500' :
                              cumulativeCompliance.daysRemaining > 10 ? 'text-red-500' :
                              'text-red-600'
                            }`}>
                              {cumulativeCompliance.daysRemaining <= 0 ? 'Violated' :
                               cumulativeCompliance.daysRemaining > 60 ? 'Safe' :
                               cumulativeCompliance.daysRemaining > 30 ? 'Caution' :
                               'Warning'}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}

                {/* New Trip Input Row */}
                <tr>
                  {/* Progress Dots */}
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className={getProgressDotStyle('country')}></div>
                      <div className={getProgressDotStyle('dates')}></div>
                      <div className={getProgressDotStyle('complete')}></div>
                    </div>
                    <div className={`rounded-lg p-4 min-w-[200px] ${getColumnStyle('country')}`}>
                      <Select
                        options={countryOptions}
                        value={selectedCountry}
                        onValueChange={setSelectedCountry}
                        placeholder="🇪🇺 Select a Country"
                        searchable={true}
                        className="w-full border-none"
                      />
                    </div>
                  </td>

                  {/* Date Range Column */}
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className={getProgressDotStyle('country')}></div>
                      <div className={getProgressDotStyle('dates')}></div>
                      <div className={getProgressDotStyle('complete')}></div>
                    </div>
                    <div className={`rounded-lg p-4 min-w-[220px] ${getColumnStyle('dates')}`}>
                      <Button
                        onClick={handleOpenCalendar}
                        variant="ghost"
                        disabled={!selectedCountry}
                        className="w-full h-auto p-4 flex items-center justify-center"
                      >
                        {selectedDateRange.startDate && selectedDateRange.endDate ? (
                          <div className="flex flex-col items-center justify-center text-center">
                            <Calendar className="w-5 h-5 mb-2 text-blue-600" />
                            <div className="font-semibold text-gray-800">
                              {format(selectedDateRange.startDate, 'MMM dd')} - {format(selectedDateRange.endDate, 'MMM dd')}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Calendar className="w-6 h-6 text-gray-400" />
                            <span className="font-medium text-black">Select Travel Dates</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </td>

                  {/* Days of Stay Column */}
                  <td className="p-2">
                    <div className={`rounded-lg p-4 min-w-[120px] text-center ${getColumnStyle('complete')}`}>
                      {currentTripDays > 0 ? (
                        <div className="text-xl font-bold text-gray-800">
                          <AnimatedCounter value={currentTripDays} suffix=" days" />
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-gray-400">—</div>
                      )}
                    </div>
                  </td>

                  {/* Days in Last 180 Days Column */}
                  <td className="p-2">
                    <div className={`rounded-lg p-4 min-w-[140px] text-center ${getColumnStyle('complete')}`}>
                      <div className="text-xl font-bold text-gray-800">
                        {calculationResult ? (
                          <AnimatedCounter value={calculationResult.totalDaysUsed} suffix=" days" />
                        ) : (
                          <span className="text-2xl font-bold text-gray-400">—</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Days Remaining Column */}
                  <td className="p-2">
                    <div className="flex flex-col items-center justify-center min-w-[120px]">
                      <CircularProgress
                        value={calculationResult ? calculationResult.daysRemaining : remainingDays}
                        max={90}
                        size={80}
                        strokeWidth={6}
                        progressColor={
                          (calculationResult ? calculationResult.daysRemaining : remainingDays) > 60 ? "#10b981" :
                          (calculationResult ? calculationResult.daysRemaining : remainingDays) > 30 ? "#f59e0b" :
                          "#ef4444"
                        }
                      />
                      <div className="text-center mt-1">
                        <div className="text-xs font-medium text-gray-600">
                          <AnimatedCounter value={calculationResult ? calculationResult.daysRemaining : remainingDays} />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={handleCalculate}
              variant="outline"
              disabled={isCalculating || !selectedCountry || !selectedDateRange.startDate || !selectedDateRange.endDate}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                (selectedCountry && selectedDateRange.startDate && selectedDateRange.endDate)
                  ? 'border-primary hover:border-primary-600 hover:bg-primary-50 text-primary'
                  : 'border-gray-300 hover:border-gray-400 text-gray-500'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                (selectedCountry && selectedDateRange.startDate && selectedDateRange.endDate)
                  ? 'border-primary'
                  : 'border-gray-400'
              }`}>
                <span className="text-lg">+</span>
              </div>
              <span className="font-medium">
                {isCalculating ? 'Adding Trip...' : trips.length > 0 ? 'Add Another Trip' : 'Add This Trip'}
              </span>
            </Button>

            {trips.length > 0 && (
              <Button
                variant="default"
                className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-600 text-white font-medium shadow-schengen-button transition-all duration-200 hover:scale-105"
              >
                Save Progress
              </Button>
            )}
          </div>
        </Card>

        {/* Mobile Calculator Interface */}
        <div className="tablet:hidden mb-8 space-y-6">
          {/* Mobile Progress Summary Card */}
          <Card className="p-6 bg-white shadow-schengen-card border-0 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Status</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">
                  <AnimatedCounter value={currentTripDays} />
                </div>
                <div className="text-xs text-gray-600">Current Trip</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-calendar-warning mb-1">
                  <AnimatedCounter value={totalDaysInPeriod} />
                </div>
                <div className="text-xs text-gray-600">Days Used</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-calendar-valid mb-1">
                  <AnimatedCounter value={remainingDays} />
                </div>
                <div className="text-xs text-gray-600">Remaining</div>
              </div>
            </div>
          </Card>

          {/* Mobile Form Steps */}
          <Card className="p-6 bg-white shadow-schengen-card border-0 rounded-2xl">
            <div className="space-y-6">
              {/* Step 1: Country Selection */}
              <div className={`p-4 rounded-xl transition-all duration-300 ${
                currentFormStage === 'country' ? 'bg-primary-50 border-2 border-primary-300' :
                selectedCountry ? 'bg-green-50 border-2 border-green-300' :
                'bg-gray-50 border-2 border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentFormStage === 'country' ? 'bg-primary text-white' :
                    selectedCountry ? 'bg-calendar-valid text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-semibold">Select Country</h4>
                  {selectedCountry && (
                    <CheckCircle className="w-5 h-5 text-calendar-valid ml-auto" />
                  )}
                </div>
                <Select
                  options={countryOptions}
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                  placeholder="🇪🇺 Choose a Schengen Country"
                  searchable={true}
                  className="w-full"
                />
              </div>

              {/* Step 2: Date Selection */}
              <div className={`p-4 rounded-xl transition-all duration-300 ${
                currentFormStage === 'dates' ? 'bg-primary-50 border-2 border-primary-300' :
                (selectedDateRange.startDate && selectedDateRange.endDate) ? 'bg-green-50 border-2 border-green-300' :
                selectedCountry ? 'bg-gray-50 border-2 border-gray-300' :
                'bg-gray-50 border-2 border-gray-200'
              }`}>
                {(selectedDateRange.startDate && selectedDateRange.endDate) && (
                  <div className="flex justify-end mb-2">
                    <CheckCircle className="w-5 h-5 text-calendar-valid" />
                  </div>
                )}
                <Button
                  onClick={handleOpenCalendar}
                  variant="ghost"
                  disabled={!selectedCountry}
                  className={`w-full p-6 h-auto min-h-touch border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
                    !selectedCountry ? 'opacity-50 cursor-not-allowed border-gray-200' :
                    currentFormStage === 'dates' ? 'border-primary-300 hover:border-primary-400' :
                    'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    {(selectedDateRange.startDate && selectedDateRange.endDate) ? (
                      <div>
                        <div className="font-semibold text-black text-lg">
                          {format(selectedDateRange.startDate, 'MMM dd, yyyy')} → {format(selectedDateRange.endDate, 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-calendar-valid mt-1">
                          {currentTripDays} days selected
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calendar className="w-8 h-8 mb-3 text-gray-400" />
                        <span className="font-medium text-black text-base">
                          Select Travel Dates
                        </span>
                      </div>
                    )}
                  </div>
                </Button>
              </div>

              {/* Step 3: Results */}
              {currentFormStage === 'complete' && (
                <div className="p-4 rounded-xl bg-green-50 border-2 border-green-300 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-calendar-valid text-white flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-semibold">Trip Summary</h4>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <CircularProgress
                      value={remainingDays}
                      max={90}
                      size={100}
                      strokeWidth={8}
                      progressColor={
                        remainingDays > 60 ? "#10b981" :
                        remainingDays > 30 ? "#f59e0b" :
                        remainingDays > 10 ? "#ef4444" :
                        "#dc2626"
                      }
                      className="scale-105 shadow-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-calendar-warning">
                        <AnimatedCounter value={totalDaysInPeriod} suffix=" days" />
                      </div>
                      <div className="text-xs text-gray-600">Used in 180 days</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className={`text-lg font-bold ${
                        remainingDays > 60 ? 'text-calendar-valid' :
                        remainingDays > 30 ? 'text-calendar-warning' :
                        'text-red-600'
                      }`}>
                        <AnimatedCounter value={remainingDays} suffix=" days" />
                      </div>
                      <div className="text-xs text-gray-600">Remaining</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                onClick={handleCalculate}
                disabled={isCalculating || !selectedCountry || !selectedDateRange.startDate || !selectedDateRange.endDate}
                className={`w-full py-4 min-h-touch text-base font-medium transition-all duration-200 ${
                  (selectedCountry && selectedDateRange.startDate && selectedDateRange.endDate)
                    ? 'bg-primary hover:bg-primary-600 text-white shadow-schengen-button hover:scale-105'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCalculating ? 'Calculating...' : 'Add This Trip'}
              </Button>
              
              {(currentTripDays > 0 || trips.length > 0) && (
                <Button
                  variant="outline"
                  className="w-full py-4 min-h-touch text-base font-medium border-2 border-primary-300 text-primary hover:bg-primary-50 transition-all duration-200"
                >
                  Save Progress
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Results and Trip List */}
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6 mobile:gap-8">
          {/* Trip List */}
          <Card className="bg-white shadow-schengen-card border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Your Trips
                {trips.length > 0 && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {trips.length}
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                Schengen area travel history
              </p>
            </div>
            {trips.length > 0 && (
              <Button
                onClick={handleClearTrips}
                variant="outline"
                size="sm"
              >
                Clear All
              </Button>
            )}
          </CardHeader>
          
          <CardContent>
            {trips.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h4 className="font-medium mb-2">No trips added yet</h4>
                <p className="text-sm text-muted-foreground">
                  Use the calculator above to add your first trip
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{trip.country}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(trip.startDate, 'MMM dd, yyyy')} → {format(trip.endDate, 'MMM dd, yyyy')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trip.days} days
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteTrip(trip.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          </Card>

          {/* Compliance Results */}
          <Card className="bg-white shadow-schengen-card border-0 rounded-2xl">
          <CardHeader>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Compliance Status
            </h3>
            <p className="text-sm text-muted-foreground">
              90/180-day rule analysis
            </p>
          </CardHeader>
          
          <CardContent>
            {!calculationResult ? (
              <div className="text-center py-8">
                <Calculator className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h4 className="font-medium mb-2">No calculations yet</h4>
                <p className="text-sm text-muted-foreground">
                  Add a trip to see your compliance status
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Compliance Status */}
                <div className={`p-4 rounded-lg border ${
                  calculationResult.isCompliant
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {calculationResult.isCompliant ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      calculationResult.isCompliant ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {calculationResult.isCompliant ? 'Compliant' : 'Overstay Risk'}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    calculationResult.isCompliant ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {calculationResult.isCompliant
                      ? 'Your travel plans comply with the 90/180-day rule'
                      : `You may exceed the 90-day limit by ${calculationResult.overstayDays} days`
                    }
                  </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {calculationResult.totalDaysUsed}
                    </div>
                    <div className="text-xs text-muted-foreground">Days Used</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {calculationResult.daysRemaining}
                    </div>
                    <div className="text-xs text-muted-foreground">Days Remaining</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Calculation period: {format(calculationResult.periodStart, 'MMM dd, yyyy')} - {format(calculationResult.periodEnd, 'MMM dd, yyyy')}
                </div>
              </div>
            )}
          </CardContent>
          </Card>
        </div>

        {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={handleCloseCalendar}
        onDateRangeSelect={handleDateRangeSelect}
        initialRange={selectedDateRange}
        />
      </div>
    </main>
  )
}