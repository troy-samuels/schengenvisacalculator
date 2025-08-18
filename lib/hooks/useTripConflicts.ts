"use client"

import { useMemo, useCallback } from "react"
import { TripConflictDetector, type ConflictDetectionResult, type TripConflict } from "@/lib/services/trip-conflict-detector"
import type { Trip } from "@/lib/types/enhanced-calculator"

export interface UseTripConflictsOptions {
  autoDetect?: boolean
  realTimeValidation?: boolean
}

export function useTripConflicts(trips: Trip[], options: UseTripConflictsOptions = {}) {
  const { autoDetect = true, realTimeValidation = true } = options

  const conflicts = useMemo<ConflictDetectionResult>(() => {
    if (!autoDetect || trips.length === 0) {
      return {
        hasConflicts: false,
        hasErrors: false,
        hasWarnings: false,
        conflicts: [],
        totalConflicts: 0
      }
    }

    return TripConflictDetector.detectAllConflicts(trips)
  }, [trips, autoDetect])

  const validateTrip = useCallback((trip: Trip, existingTrips: Trip[]): ConflictDetectionResult => {
    if (!realTimeValidation) {
      return {
        hasConflicts: false,
        hasErrors: false,
        hasWarnings: false,
        conflicts: [],
        totalConflicts: 0
      }
    }

    const allTrips = [...existingTrips, trip]
    return TripConflictDetector.detectAllConflicts(allTrips)
  }, [realTimeValidation])

  const validateTripUpdate = useCallback((
    updatedTrip: Trip, 
    existingTrips: Trip[]
  ): ConflictDetectionResult => {
    if (!realTimeValidation) {
      return {
        hasConflicts: false,
        hasErrors: false,
        hasWarnings: false,
        conflicts: [],
        totalConflicts: 0
      }
    }

    const otherTrips = existingTrips.filter(t => t.id !== updatedTrip.id)
    const allTrips = [...otherTrips, updatedTrip]
    return TripConflictDetector.detectAllConflicts(allTrips)
  }, [realTimeValidation])

  const getConflictsForTrip = useCallback((tripId: string): TripConflict[] => {
    return conflicts.conflicts.filter(conflict => 
      conflict.tripIds.includes(tripId)
    )
  }, [conflicts])

  const hasErrorsForTrip = useCallback((tripId: string): boolean => {
    return getConflictsForTrip(tripId).some(c => c.severity === "ERROR")
  }, [getConflictsForTrip])

  const hasWarningsForTrip = useCallback((tripId: string): boolean => {
    return getConflictsForTrip(tripId).some(c => c.severity === "WARNING")
  }, [getConflictsForTrip])

  const getSummary = useCallback((): string => {
    return TripConflictDetector.getConflictSummary(conflicts)
  }, [conflicts])

  const canAddTrip = useCallback((newTrip: Trip): boolean => {
    const validation = validateTrip(newTrip, trips)
    return !validation.hasErrors
  }, [trips, validateTrip])

  const getSuggestedFixes = useCallback((): Array<{
    conflict: TripConflict
    canAutoFix: boolean
    fixAction: () => void
  }> => {
    return conflicts.conflicts
      .filter(c => c.suggestedFix)
      .map(conflict => ({
        conflict,
        canAutoFix: false,
        fixAction: () => {
          console.log(`Manual fix required for: ${conflict.message}`)
        }
      }))
  }, [conflicts])

  return {
    conflicts,
    validateTrip,
    validateTripUpdate,
    getConflictsForTrip,
    hasErrorsForTrip,
    hasWarningsForTrip,
    getSummary,
    canAddTrip,
    getSuggestedFixes,
    hasConflicts: conflicts.hasConflicts,
    hasErrors: conflicts.hasErrors,
    hasWarnings: conflicts.hasWarnings,
    totalConflicts: conflicts.totalConflicts,
    errorCount: conflicts.conflicts.filter(c => c.severity === "ERROR").length,
    warningCount: conflicts.conflicts.filter(c => c.severity === "WARNING").length,
    infoCount: conflicts.conflicts.filter(c => c.severity === "INFO").length
  }
}