"use client"

import { useCallback } from "react"
import { RobustSchengenCalculator } from "@/lib/services/robust-schengen-calculator"
import type { Trip as RobustTrip } from "@/lib/services/robust-schengen-calculator"

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
 * Schengen Calculator Hook with Robust 180-Day Rolling Window Algorithm
 * Implements exact compliance with Schengen visa rules
 */
export function useSchengenCalculator(useEnhanced = false) {
  /**
   * Convert app trip format to robust calculator format
   */
  const convertToRobustTrip = useCallback((trip: Trip): RobustTrip | null => {
    if (!trip.startDate || !trip.endDate || !trip.country) return null
    
    return {
      id: trip.id,
      country: trip.country,
      startDate: trip.startDate,
      endDate: trip.endDate,
      days: trip.days
    }
  }, [])

  /**
   * Convert robust calculator result to app format
   */
  const convertFromRobustResult = useCallback((robustResult: any): ComplianceResult => {
    return {
      totalDaysUsed: robustResult.totalDaysUsed,
      daysRemaining: robustResult.daysRemaining,
      isCompliant: robustResult.isCompliant,
      overstayDays: robustResult.overstayDays,
    }
  }, [])

  /**
   * Calculate compliance using the robust rolling window algorithm
   */
  const calculateCompliance = useCallback(
    (trips: Trip[], referenceDate: Date = new Date()): ComplianceResult => {
      // Convert trips to robust format and filter out invalid ones
      const robustTrips = trips
        .map(convertToRobustTrip)
        .filter((trip): trip is RobustTrip => trip !== null)

      // Use the robust calculator
      const robustResult = RobustSchengenCalculator.calculateExactCompliance(robustTrips, referenceDate)
      
      return convertFromRobustResult(robustResult)
    },
    [convertToRobustTrip, convertFromRobustResult],
  )

  /**
   * Calculate compliance for a single trip (how many days it contributes to the 180-day period)
   */
  const calculateSingleEntryCompliance = useCallback((trip: Trip, referenceDate: Date = new Date()): number => {
    const robustTrip = convertToRobustTrip(trip)
    if (!robustTrip) return 0

    // Calculate days for just this trip using the robust algorithm
    const daysInWindow = RobustSchengenCalculator.calculateDaysInWindow([robustTrip], referenceDate)
    
    return daysInWindow
  }, [convertToRobustTrip])

  /**
   * Validate a planned trip using robust algorithm
   */
  const validatePlannedTrip = useCallback((
    existingTrips: Trip[], 
    plannedTrip: Trip
  ): { isValid: boolean; violationDays: number; violationDate: Date | null } => {
    const existingRobustTrips = existingTrips
      .map(convertToRobustTrip)
      .filter((trip): trip is RobustTrip => trip !== null)
    
    const plannedRobustTrip = convertToRobustTrip(plannedTrip)
    if (!plannedRobustTrip) {
      return { isValid: false, violationDays: 0, violationDate: null }
    }

    return RobustSchengenCalculator.validatePlannedTrip(existingRobustTrips, plannedRobustTrip)
  }, [convertToRobustTrip])

  /**
   * Calculate maximum consecutive days available from a start date
   */
  const calculateMaxConsecutiveDays = useCallback((trips: Trip[], startDate: Date): number => {
    const robustTrips = trips
      .map(convertToRobustTrip)
      .filter((trip): trip is RobustTrip => trip !== null)

    return RobustSchengenCalculator.calculateMaxConsecutiveDays(robustTrips, startDate)
  }, [convertToRobustTrip])

  /**
   * Get the next date when days will "roll off" the 180-day window
   */
  const getNextResetDate = useCallback((trips: Trip[], referenceDate: Date = new Date()): Date | null => {
    const robustTrips = trips
      .map(convertToRobustTrip)
      .filter((trip): trip is RobustTrip => trip !== null)

    return RobustSchengenCalculator.getNextResetDate(robustTrips, referenceDate)
  }, [convertToRobustTrip])

  /**
   * Debug function for development/testing
   */
  const debugRollingWindow = useCallback((trips: Trip[], referenceDate: Date = new Date()) => {
    const robustTrips = trips
      .map(convertToRobustTrip)
      .filter((trip): trip is RobustTrip => trip !== null)

    return RobustSchengenCalculator.debugRollingWindow(robustTrips, referenceDate)
  }, [convertToRobustTrip])

  return {
    calculateCompliance,
    calculateSingleEntryCompliance,
    validatePlannedTrip,
    calculateMaxConsecutiveDays,
    getNextResetDate,
    debugRollingWindow,
    isEnhancedCalculatorAvailable: useEnhanced,
  }
}
