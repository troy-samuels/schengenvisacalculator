/**
 * Cross-Validation Helper for Cumulative Rolling Calculations
 * 
 * CLAUDE.md Compliant: Ensures cumulative calculations maintain
 * 100% accuracy against RobustSchengenCalculator source of truth
 */

import { RobustSchengenCalculator } from '../calculator/robust-schengen-calculator'
import type { Trip, ComplianceResult } from '../types'

export interface CumulativeValidationResult {
  isValid: boolean
  expectedResult: ComplianceResult
  actualResult?: ComplianceResult
  errorMessage?: string
  validationDetails: {
    rowIndex: number
    tripsCount: number
    referenceDate: string
    totalDaysUsed: number
    daysRemaining: number
  }
}

/**
 * Validates that cumulative calculation matches RobustSchengenCalculator
 * This is the CRITICAL cross-validation function for EU compliance
 */
export function validateCumulativeCalculation(
  chronologicalTrips: Trip[],
  rowIndex: number,
  actualResult?: ComplianceResult
): CumulativeValidationResult {
  try {
    // Input validation
    if (rowIndex < 0 || rowIndex >= chronologicalTrips.length) {
      return {
        isValid: false,
        expectedResult: createFallbackResult(),
        errorMessage: `Invalid row index: ${rowIndex}. Must be between 0 and ${chronologicalTrips.length - 1}`,
        validationDetails: {
          rowIndex,
          tripsCount: chronologicalTrips.length,
          referenceDate: 'invalid',
          totalDaysUsed: 0,
          daysRemaining: 90
        }
      }
    }

    // Get cumulative trips up to this row (chronologically)
    const tripsUpToRow = chronologicalTrips.slice(0, rowIndex + 1)
    const referenceDate = chronologicalTrips[rowIndex].endDate

    // Calculate expected result using RobustSchengenCalculator (source of truth)
    const expectedResult = RobustSchengenCalculator.calculateExactCompliance(
      tripsUpToRow,
      referenceDate
    )

    const validationDetails = {
      rowIndex,
      tripsCount: tripsUpToRow.length,
      referenceDate: referenceDate.toISOString(),
      totalDaysUsed: expectedResult.totalDaysUsed,
      daysRemaining: expectedResult.daysRemaining
    }

    // If no actual result provided, just return expected (for preview/debug)
    if (!actualResult) {
      return {
        isValid: true,
        expectedResult,
        validationDetails
      }
    }

    // Cross-validate actual vs expected results
    const isValid = (
      actualResult.totalDaysUsed === expectedResult.totalDaysUsed &&
      actualResult.daysRemaining === expectedResult.daysRemaining &&
      actualResult.isCompliant === expectedResult.isCompliant &&
      actualResult.overstayDays === expectedResult.overstayDays
    )

    if (!isValid) {
      return {
        isValid: false,
        expectedResult,
        actualResult,
        errorMessage: `Cumulative calculation mismatch at row ${rowIndex}. Expected: ${expectedResult.totalDaysUsed} used, ${expectedResult.daysRemaining} remaining. Actual: ${actualResult.totalDaysUsed} used, ${actualResult.daysRemaining} remaining.`,
        validationDetails
      }
    }

    return {
      isValid: true,
      expectedResult,
      actualResult,
      validationDetails
    }

  } catch (error) {
    return {
      isValid: false,
      expectedResult: createFallbackResult(),
      errorMessage: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      validationDetails: {
        rowIndex,
        tripsCount: chronologicalTrips.length,
        referenceDate: 'error',
        totalDaysUsed: 0,
        daysRemaining: 90
      }
    }
  }
}

/**
 * Validates the entire chronological sequence for consistency
 * Ensures cumulative totals never decrease unexpectedly within same 180-day period
 */
export function validateChronologicalSequence(
  chronologicalTrips: Trip[]
): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  if (chronologicalTrips.length === 0) {
    return { isValid: true, errors, warnings }
  }

  let previousResult: ComplianceResult | null = null

  for (let i = 0; i < chronologicalTrips.length; i++) {
    const validation = validateCumulativeCalculation(chronologicalTrips, i)
    
    if (!validation.isValid) {
      errors.push(`Row ${i}: ${validation.errorMessage}`)
      continue
    }

    const currentResult = validation.expectedResult

    // Check for unexpected decreases in cumulative totals
    if (previousResult && currentResult) {
      const daysBetweenReferences = Math.abs(
        previousResult.referenceDate.getTime() - currentResult.referenceDate.getTime()
      ) / (1000 * 60 * 60 * 24)

      // If within same 180-day period, totals should generally not decrease
      if (daysBetweenReferences < 180 && currentResult.totalDaysUsed < previousResult.totalDaysUsed) {
        warnings.push(
          `Row ${i}: Cumulative total decreased from ${previousResult.totalDaysUsed} to ${currentResult.totalDaysUsed} ` +
          `within ${Math.round(daysBetweenReferences)} days. This may indicate trips falling outside rolling window.`
        )
      }
    }

    previousResult = currentResult
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Mobile-specific validation helper
 * Adds mobile debugging context for CLAUDE.md compliance
 */
export function validateMobileCumulativeCalculation(
  chronologicalTrips: Trip[],
  rowIndex: number,
  actualResult?: ComplianceResult
): CumulativeValidationResult {
  const validation = validateCumulativeCalculation(chronologicalTrips, rowIndex, actualResult)
  
  // Mobile-specific debugging (CLAUDE.md requirement)
  console.log(`📱 Mobile validation for row ${rowIndex}:`, {
    isValid: validation.isValid,
    tripsCount: validation.validationDetails.tripsCount,
    totalDaysUsed: validation.validationDetails.totalDaysUsed,
    daysRemaining: validation.validationDetails.daysRemaining,
    errorMessage: validation.errorMessage || 'No errors'
  })

  return validation
}

/**
 * Performance benchmark for cumulative calculations
 * CLAUDE.md requirement: <50ms per calculation
 */
export function benchmarkCumulativePerformance(
  chronologicalTrips: Trip[]
): { avgTimePerCalculation: number; maxTime: number; isWithinBenchmark: boolean } {
  if (chronologicalTrips.length === 0) {
    return { avgTimePerCalculation: 0, maxTime: 0, isWithinBenchmark: true }
  }

  const times: number[] = []

  chronologicalTrips.forEach((_, index) => {
    const startTime = performance.now()
    validateCumulativeCalculation(chronologicalTrips, index)
    const endTime = performance.now()
    times.push(endTime - startTime)
  })

  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length
  const maxTime = Math.max(...times)

  return {
    avgTimePerCalculation: avgTime,
    maxTime,
    isWithinBenchmark: avgTime < 50 && maxTime < 100 // <50ms avg, <100ms max
  }
}

/**
 * Helper to create fallback compliance result
 */
function createFallbackResult(): ComplianceResult {
  const now = new Date()
  return {
    totalDaysUsed: 0,
    daysRemaining: 90,
    isCompliant: true,
    overstayDays: 0,
    referenceDate: now,
    periodStart: new Date(now.getTime() - 179 * 24 * 60 * 60 * 1000),
    periodEnd: now,
    detailedBreakdown: []
  }
}

/**
 * Export validation functions for use in production code
 * These can be integrated into the UI for real-time validation
 */
export {
  validateCumulativeCalculation as validateCumulative,
  validateChronologicalSequence as validateSequence,
  validateMobileCumulativeCalculation as validateMobile,
  benchmarkCumulativePerformance as benchmarkPerformance
}