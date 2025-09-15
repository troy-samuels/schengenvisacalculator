"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Badge } from './badge'
import { Trip, ComplianceResult, RobustSchengenCalculator } from '@schengen/calculator'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  TrendingUp,
  X,
  RotateCcw,
  Clock
} from 'lucide-react'
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday } from 'date-fns'
import { cn } from '../../lib/utils'

export interface RollingCalendarViewProps {
  trips: Trip[]
  compliance: ComplianceResult
  className?: string
  onDateClick?: (date: Date) => void
  showConfidenceScore?: boolean
}

interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  hasTrip: boolean
  tripCountries: string[]
  isInRollingWindow: boolean
  daysFromReference: number
  confidence: number
}

export function RollingCalendarView({
  trips,
  compliance,
  className,
  onDateClick,
  showConfidenceScore = true
}: RollingCalendarViewProps) {
  const [currentViewDate, setCurrentViewDate] = useState(new Date())
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Calculate rolling window bounds
  const referenceDate = compliance.referenceDate || new Date()
  const windowStart = subDays(referenceDate, 179) // 180-day window
  const windowEnd = referenceDate

  // Generate calendar days for current month view
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentViewDate)
    const monthEnd = endOfMonth(currentViewDate)
    const calendarStart = subDays(monthStart, monthStart.getDay()) // Start from Sunday
    const calendarEnd = addDays(monthEnd, 6 - monthEnd.getDay()) // End on Saturday

    const days = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd
    })

    return days.map(date => {
      const dayNumber = date.getDate()
      const isCurrentMonth = isSameMonth(date, currentViewDate)
      const isCurrentDay = isToday(date)

      // Check if this date has any trips
      const tripsOnDate = trips.filter(trip =>
        date >= trip.startDate && date <= trip.endDate
      )

      // Check if date is within the rolling window
      const isInWindow = date >= windowStart && date <= windowEnd

      // Calculate days from reference date
      const daysFromRef = Math.abs(Math.ceil((date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)))

      // Calculate confidence score for this date (based on data quality)
      let confidence = 100
      if (tripsOnDate.length > 0) {
        // Lower confidence if trip data seems incomplete
        const hasIncompleteTrips = tripsOnDate.some(trip =>
          !trip.country || !trip.startDate || !trip.endDate
        )
        if (hasIncompleteTrips) confidence = 70
      }

      return {
        date,
        dayNumber,
        isCurrentMonth,
        isToday: isCurrentDay,
        hasTrip: tripsOnDate.length > 0,
        tripCountries: tripsOnDate.map(t => t.country),
        isInRollingWindow: isInWindow,
        daysFromReference: daysFromRef,
        confidence
      } as CalendarDay
    })
  }, [currentViewDate, trips, windowStart, windowEnd, referenceDate])

  // Calculate overall confidence score
  const overallConfidence = useMemo(() => {
    if (compliance.verification) {
      return compliance.verification.confidenceScore
    }

    // Fallback calculation
    const totalTrips = trips.length
    const completeTrips = trips.filter(trip =>
      trip.country && trip.startDate && trip.endDate
    ).length

    return totalTrips > 0 ? Math.round((completeTrips / totalTrips) * 100) : 100
  }, [trips, compliance.verification])

  const handleDateClick = (day: CalendarDay) => {
    setSelectedDate(day.date)
    setShowDetailModal(true)
    onDateClick?.(day.date)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentViewDate(prev =>
      direction === 'prev'
        ? subDays(startOfMonth(prev), 1)
        : addDays(endOfMonth(prev), 1)
    )
  }

  const goToToday = () => {
    setCurrentViewDate(new Date())
  }

  const getDateCellStyle = (day: CalendarDay) => {
    let baseClasses = "relative p-2 text-center cursor-pointer transition-all duration-200 rounded-lg"

    if (!day.isCurrentMonth) {
      baseClasses += " text-gray-300"
    } else {
      baseClasses += " text-gray-900"
    }

    if (day.isToday) {
      baseClasses += " bg-blue-100 border-2 border-blue-500 font-bold"
    } else if (day.hasTrip) {
      baseClasses += " bg-green-100 border border-green-300 font-medium"
    } else if (day.isInRollingWindow) {
      baseClasses += " bg-gray-50 border border-gray-200"
    } else {
      baseClasses += " hover:bg-gray-50"
    }

    return baseClasses
  }

  return (
    <>
      <div className={cn("bg-white rounded-xl shadow-lg border p-6", className)}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Rolling Window Calendar
          </h3>

          {showConfidenceScore && (
            <Badge
              variant={overallConfidence >= 90 ? 'default' : overallConfidence >= 70 ? 'secondary' : 'destructive'}
              className="flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3" />
              {overallConfidence}% Confidence
            </Badge>
          )}
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold">
              {format(currentViewDate, 'MMMM yyyy')}
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-xs px-2 py-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Today
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => (
            <motion.div
              key={index}
              className={getDateCellStyle(day)}
              onClick={() => handleDateClick(day)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-sm">{day.dayNumber}</div>

              {/* Trip indicator dots */}
              {day.hasTrip && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                  {day.tripCountries.slice(0, 3).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-green-500 rounded-full"
                    />
                  ))}
                  {day.tripCountries.length > 3 && (
                    <div className="text-xs text-green-600 font-bold">+</div>
                  )}
                </div>
              )}

              {/* Rolling window indicator */}
              {day.isInRollingWindow && !day.hasTrip && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full opacity-50" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Trip Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            <span>180-Day Window</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
            <span>Outside Period</span>
          </div>
        </div>

        {/* Rolling Window Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-900">
            <strong>Current 180-day window:</strong>{' '}
            {format(windowStart, 'MMM d, yyyy')} → {format(windowEnd, 'MMM d, yyyy')}
          </div>
          <div className="text-xs text-blue-700 mt-1">
            Days used in this period: {compliance.totalDaysUsed} / 90
          </div>
        </div>
      </div>

      {/* Detailed Date Modal */}
      <AnimatePresence>
        {showDetailModal && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 relative">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                <h3 className="text-lg font-bold text-gray-900">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </h3>
              </div>

              <div className="p-6">
                {/* Date analysis */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">In 180-day window:</span>
                    <Badge variant={selectedDate >= windowStart && selectedDate <= windowEnd ? 'default' : 'secondary'}>
                      {selectedDate >= windowStart && selectedDate <= windowEnd ? 'Yes' : 'No'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Days from today:</span>
                    <span className="text-sm font-medium">
                      {Math.abs(Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                      {selectedDate < new Date() ? ' ago' : ' from now'}
                    </span>
                  </div>

                  {/* Trip information */}
                  {(() => {
                    const tripsOnDate = trips.filter(trip =>
                      selectedDate >= trip.startDate && selectedDate <= trip.endDate
                    )

                    if (tripsOnDate.length > 0) {
                      return (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Trips on this date:</h4>
                          <div className="space-y-2">
                            {tripsOnDate.map((trip, index) => (
                              <div key={index} className="bg-green-50 p-3 rounded-lg">
                                <div className="font-medium text-green-900">{trip.country}</div>
                                <div className="text-sm text-green-700">
                                  {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d, yyyy')}
                                  ({trip.days} days)
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="text-sm text-gray-500 italic">
                          No trips recorded for this date
                        </div>
                      )
                    }
                  })()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default RollingCalendarView