"use client"

import { useCallback, useMemo } from "react"
import { EnhancedSchengenCalculator } from "@/lib/services/enhanced-schengen-calculator"
import type {
  Trip,
  ComplianceResult,
  SingleEntryComplianceResult,
  TravelForecastResult,
  MaximumStayResult,
  OptimalDateOption,
  ScenarioTestResult,
  EmergencyExtensionResult,
  TravelStatistics,
  CalendarEvent,
  ValidationError,
} from "@/lib/types/enhanced-calculator"

/**
 * React hook for enhanced Schengen calculations
 * Provides memoized calculation functions with proper React optimization
 */
export function useEnhancedSchengenCalculator() {
  /**
   * Calculate compliance for multiple trips
   */
  const calculateCompliance = useCallback((trips: Trip[], referenceDate?: Date): ComplianceResult => {
    return EnhancedSchengenCalculator.calculateCompliance(trips, referenceDate)
  }, [])

  /**
   * Calculate compliance for a single trip
   */
  const calculateSingleEntryCompliance = useCallback(
    (trip: Trip, referenceDate?: Date): SingleEntryComplianceResult => {
      return EnhancedSchengenCalculator.calculateSingleEntryCompliance(trip, referenceDate)
    },
    [],
  )

  /**
   * Forecast travel possibilities
   */
  const forecastTravel = useCallback(
    (existingTrips: Trip[], plannedStartDate: Date, plannedDuration: number): TravelForecastResult => {
      return EnhancedSchengenCalculator.forecastTravel(existingTrips, plannedStartDate, plannedDuration)
    },
    [],
  )

  /**
   * Calculate maximum consecutive days from a start date
   */
  const calculateMaxConsecutiveDays = useCallback((trips: Trip[], startDate: Date): MaximumStayResult => {
    return EnhancedSchengenCalculator.calculateMaxConsecutiveDays(trips, startDate)
  }, [])

  /**
   * Find optimal travel dates for desired duration
   */
  const findOptimalTravelDates = useCallback(
    (trips: Trip[], desiredDays: number, earliestStart: Date, latestEnd: Date): OptimalDateOption[] => {
      return EnhancedSchengenCalculator.findOptimalTravelDates(trips, desiredDays, earliestStart, latestEnd)
    },
    [],
  )

  /**
   * Test multiple trip scenarios
   */
  const testScenarios = useCallback(
    (currentTrips: Trip[], scenarios: Array<Array<Omit<Trip, "id">>>): ScenarioTestResult[] => {
      return EnhancedSchengenCalculator.testScenarios(currentTrips, scenarios)
    },
    [],
  )

  /**
   * Calculate emergency extension possibilities
   */
  const calculateEmergencyExtension = useCallback(
    (trips: Trip[], currentTripId: string, additionalDays: number): EmergencyExtensionResult | null => {
      return EnhancedSchengenCalculator.calculateEmergencyExtension(trips, currentTripId, additionalDays)
    },
    [],
  )

  /**
   * Get travel statistics
   */
  const getTravelStatistics = useCallback((trips: Trip[]): TravelStatistics => {
    return EnhancedSchengenCalculator.getTravelStatistics(trips)
  }, [])

  /**
   * Generate calendar events
   */
  const generateCalendarEvents = useCallback((trips: Trip[]): CalendarEvent[] => {
    return EnhancedSchengenCalculator.generateCalendarEvents(trips)
  }, [])

  /**
   * Export trip data
   */
  const exportData = useCallback((trips: Trip[], format: "json" | "csv" | "ical" = "json"): string => {
    return EnhancedSchengenCalculator.exportData(trips, format)
  }, [])

  /**
   * Add exit periods to a trip
   */
  const addTripExits = useCallback(
    (trips: Trip[], tripId: string, exitPeriods: Array<{ exitDate: Date; reentryDate: Date }>): Trip[] => {
      return EnhancedSchengenCalculator.addTripExits(trips, tripId, exitPeriods)
    },
    [],
  )

  /**
   * Calculate safe travel with buffer
   */
  const calculateSafeTravel = useCallback(
    (
      trips: Trip[],
      desiredDays: number,
      bufferDays = 5,
    ): {
      isSafe: boolean
      actualDaysAvailable: number
      recommendedMaxStay: number
      bufferExplanation: string
    } => {
      return EnhancedSchengenCalculator.calculateSafeTravel(trips, desiredDays, bufferDays)
    },
    [],
  )

  /**
   * Validate trip data
   */
  const validateTrip = useCallback((trip: Partial<Trip>): ValidationError[] => {
    return EnhancedSchengenCalculator.validateTrip(trip)
  }, [])

  /**
   * Generate trip ID
   */
  const generateTripId = useCallback((): string => {
    return EnhancedSchengenCalculator.generateTripId()
  }, [])

  /**
   * Calculate days between dates
   */
  const daysBetween = useCallback((startDate: Date, endDate: Date): number => {
    return EnhancedSchengenCalculator.daysBetween(startDate, endDate)
  }, [])

  /**
   * Calculate trip days (inclusive)
   */
  const calculateTripDays = useCallback((startDate: Date, endDate: Date): number => {
    return EnhancedSchengenCalculator.calculateTripDays(startDate, endDate)
  }, [])

  // Utility functions for UI integration
  const getRiskColor = useCallback((riskLevel: ComplianceResult["riskAssessment"]["riskLevel"]): string => {
    switch (riskLevel) {
      case "MINIMAL":
        return "#10B981" // Green
      case "LOW":
        return "#059669" // Dark Green
      case "MODERATE":
        return "#F59E0B" // Yellow
      case "HIGH":
        return "#EF4444" // Red
      case "CRITICAL":
        return "#DC2626" // Dark Red
      default:
        return "#6B7280" // Gray
    }
  }, [])

  const getRiskMessage = useCallback((riskLevel: ComplianceResult["riskAssessment"]["riskLevel"]): string => {
    switch (riskLevel) {
      case "MINIMAL":
        return "Excellent compliance - travel freely!"
      case "LOW":
        return "Good compliance - continue monitoring"
      case "MODERATE":
        return "Moderate risk - plan carefully"
      case "HIGH":
        return "High risk - consider spacing out travels"
      case "CRITICAL":
        return "Critical risk - avoid travel until reset"
      default:
        return "Unable to assess risk"
    }
  }, [])

  // Return all functions in a memoized object
  return useMemo(
    () => ({
      // Core functions matching basic calculator
      calculateCompliance,
      calculateSingleEntryCompliance,
      forecastTravel,
      calculateMaxConsecutiveDays,

      // Enhanced functions
      findOptimalTravelDates,
      testScenarios,
      calculateEmergencyExtension,
      getTravelStatistics,
      generateCalendarEvents,
      exportData,
      addTripExits,
      calculateSafeTravel,

      // Utility functions
      validateTrip,
      generateTripId,
      daysBetween,
      calculateTripDays,
      getRiskColor,
      getRiskMessage,

      // Feature flag
      isEnhancedCalculatorAvailable: true,
    }),
    [
      calculateCompliance,
      calculateSingleEntryCompliance,
      forecastTravel,
      calculateMaxConsecutiveDays,
      findOptimalTravelDates,
      testScenarios,
      calculateEmergencyExtension,
      getTravelStatistics,
      generateCalendarEvents,
      exportData,
      addTripExits,
      calculateSafeTravel,
      validateTrip,
      generateTripId,
      daysBetween,
      calculateTripDays,
      getRiskColor,
      getRiskMessage,
    ],
  )
}

// Export types for convenience
export type {
  Trip,
  ComplianceResult,
  SingleEntryComplianceResult,
  TravelForecastResult,
  MaximumStayResult,
  RiskAssessment,
  OptimalDateOption,
  ScenarioTestResult,
  EmergencyExtensionResult,
  TravelStatistics,
  CalendarEvent,
  ValidationError,
} from "@/lib/types/enhanced-calculator"
