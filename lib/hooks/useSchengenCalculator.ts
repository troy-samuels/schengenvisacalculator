"use client"

import { useCallback } from "react"
import { differenceInDays, subDays, startOfDay, isAfter, isBefore } from "date-fns"

interface Trip {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
}

interface ComplianceResult {
  totalDaysUsed: number
  daysRemaining: number
  isCompliant: boolean
  overstayDays: number
}

/**
 * Basic Schengen Calculator Hook
 * Provides simple visa compliance calculations
 */
export function useSchengenCalculator(useEnhanced = false) {
  const MAX_DAYS_IN_PERIOD = 90
  const ROLLING_PERIOD_DAYS = 180

  /**
   * Calculate days used within the 180-day rolling period
   */
  const calculateDaysInPeriod = useCallback((trips: Trip[], referenceDate: Date): number => {
    const normalizedRefDate = startOfDay(referenceDate)
    const periodStart = subDays(normalizedRefDate, ROLLING_PERIOD_DAYS - 1)
    let totalDays = 0

    for (const trip of trips) {
      if (!trip.startDate || !trip.endDate || !trip.country) continue

      const tripStart = startOfDay(trip.startDate)
      const tripEnd = startOfDay(trip.endDate)

      // Calculate overlap with the 180-day period
      const overlapStart = isAfter(tripStart, periodStart) ? tripStart : periodStart
      const overlapEnd = isBefore(tripEnd, normalizedRefDate) ? tripEnd : normalizedRefDate

      if (overlapStart <= overlapEnd) {
        totalDays += differenceInDays(overlapEnd, overlapStart) + 1
      }
    }

    return totalDays
  }, [])

  /**
   * Calculate compliance for all trips
   */
  const calculateCompliance = useCallback(
    (trips: Trip[], referenceDate: Date = new Date()): ComplianceResult => {
      const validTrips = trips.filter((trip) => {
        // Basic validation
        if (!trip.startDate || !trip.endDate || !trip.country) return false
        if (trip.startDate > trip.endDate) return false
        return true
      })

      const daysUsed = calculateDaysInPeriod(validTrips, referenceDate)
      const daysRemaining = Math.max(0, MAX_DAYS_IN_PERIOD - daysUsed)
      const isCompliant = daysUsed <= MAX_DAYS_IN_PERIOD
      const overstayDays = Math.max(0, daysUsed - MAX_DAYS_IN_PERIOD)

      return {
        totalDaysUsed: daysUsed,
        daysRemaining,
        isCompliant,
        overstayDays,
      }
    },
    [calculateDaysInPeriod],
  )

  /**
   * Calculate compliance for a single trip (how many days it contributes to the 180-day period)
   */
  const calculateSingleEntryCompliance = useCallback((trip: Trip, referenceDate: Date = new Date()): number => {
    if (!trip.startDate || !trip.endDate || !trip.country) return 0

    const normalizedRefDate = startOfDay(referenceDate)
    const periodStart = subDays(normalizedRefDate, ROLLING_PERIOD_DAYS - 1)

    const tripStart = startOfDay(trip.startDate)
    const tripEnd = startOfDay(trip.endDate)

    // Calculate overlap with the 180-day period
    const overlapStart = isAfter(tripStart, periodStart) ? tripStart : periodStart
    const overlapEnd = isBefore(tripEnd, normalizedRefDate) ? tripEnd : normalizedRefDate

    if (overlapStart <= overlapEnd) {
      return differenceInDays(overlapEnd, overlapStart) + 1
    }

    return 0
  }, [])

  return {
    calculateCompliance,
    calculateSingleEntryCompliance,
    isEnhancedCalculatorAvailable: useEnhanced,
  }
}
