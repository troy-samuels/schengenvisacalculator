import { isValid, startOfDay, endOfDay, areIntervalsOverlapping, differenceInDays } from "date-fns"
import type { Trip, ValidationError } from '../types'

export interface DateRange {
  start: Date
  end: Date
}

export interface ValidationResult {
  isValid: boolean
  conflicts: ConflictDetail[]
  message: string
  occupiedDates: Date[]
}

export interface ConflictDetail {
  tripId: string
  tripCountry: string
  conflictStart: Date
  conflictEnd: Date
  overlapDays: number
}

export interface OverlapPreventionConfig {
  allowSameDayTravel: boolean
  allowBorderTransitions: boolean
  strictMode: boolean
}

/**
 * Date Overlap Validator - Prevents selection of already occupied dates
 * 
 * Core Features:
 * 1. Detects date conflicts between new and existing trips
 * 2. Provides visual indicators for occupied dates (grey + strikethrough)
 * 3. Returns specific conflict details for user feedback
 * 4. Handles edge cases: same-day travel, border transitions
 * 5. Mobile-optimized with larger touch targets
 */
export class DateOverlapValidator {
  private config: OverlapPreventionConfig

  constructor(config: Partial<OverlapPreventionConfig> = {}) {
    this.config = {
      allowSameDayTravel: true,
      allowBorderTransitions: true,
      strictMode: false,
      ...config
    }
  }

  /**
   * Validate if a date range conflicts with existing trips (alias for validateDateSpan)
   */
  validateDateRange(newRange: DateRange, existingTrips: Trip[]): ValidationResult {
    return this.validateDateSpan(newRange, existingTrips)
  }

  /**
   * Validate if a date range conflicts with existing trips
   */
  validateDateSpan(newRange: DateRange, existingTrips: Trip[]): ValidationResult {
    // Input validation
    if (!this.isValidDateRange(newRange)) {
      return {
        isValid: false,
        conflicts: [],
        message: 'Invalid date range provided',
        occupiedDates: []
      }
    }

    // Normalize dates to start/end of day for consistent comparison
    const normalizedNewRange = {
      start: startOfDay(newRange.start),
      end: endOfDay(newRange.end)
    }

    const conflicts: ConflictDetail[] = []
    const occupiedDates: Date[] = []

    // Check each existing trip for conflicts
    for (const trip of existingTrips) {
      if (!this.isValidTrip(trip)) continue

      const tripRange = {
        start: startOfDay(trip.startDate),
        end: endOfDay(trip.endDate)
      }

      // Check for overlap
      const hasOverlap = this.rangesOverlap(normalizedNewRange, tripRange)
      
      if (hasOverlap) {
        const conflictDetail = this.calculateConflictDetail(
          normalizedNewRange,
          tripRange,
          trip
        )

        // Apply configuration rules
        if (this.shouldReportConflict(conflictDetail, normalizedNewRange, tripRange)) {
          conflicts.push(conflictDetail)
        }

        // Add occupied dates for visual indicators
        this.addOccupiedDatesFromTrip(trip, occupiedDates)
      }
    }

    // Get all occupied dates for calendar marking (regardless of conflicts)
    const allOccupiedDates = this.getAllOccupiedDates(existingTrips)

    return {
      isValid: conflicts.length === 0,
      conflicts,
      message: this.generateValidationMessage(conflicts),
      occupiedDates: allOccupiedDates
    }
  }

  /**
   * Get all occupied dates from existing trips for calendar display
   */
  getAllOccupiedDates(trips: Trip[]): Date[] {
    const occupiedDates: Date[] = []

    for (const trip of trips) {
      if (!this.isValidTrip(trip)) continue
      this.addOccupiedDatesFromTrip(trip, occupiedDates)
    }

    // Remove duplicates and sort
    return [...new Set(occupiedDates.map(d => d.getTime()))]
      .map(time => new Date(time))
      .sort((a, b) => a.getTime() - b.getTime())
  }

  /**
   * Check if a specific date is occupied by existing trips
   */
  isDateOccupied(date: Date, existingTrips: Trip[]): boolean {
    const normalizedDate = startOfDay(date)
    
    return existingTrips.some(trip => {
      if (!this.isValidTrip(trip)) return false
      
      const tripStart = startOfDay(trip.startDate)
      const tripEnd = startOfDay(trip.endDate)
      
      return normalizedDate >= tripStart && normalizedDate <= tripEnd
    })
  }

  /**
   * Get trips that occupy a specific date
   */
  getTripsOnDate(date: Date, existingTrips: Trip[]): Trip[] {
    const normalizedDate = startOfDay(date)
    
    return existingTrips.filter(trip => {
      if (!this.isValidTrip(trip)) return false
      
      const tripStart = startOfDay(trip.startDate)
      const tripEnd = startOfDay(trip.endDate)
      
      return normalizedDate >= tripStart && normalizedDate <= tripEnd
    })
  }

  /**
   * Find next available date range of specified length
   */
  findNextAvailableDateSpan(
    preferredStart: Date,
    lengthInDays: number,
    existingTrips: Trip[],
    searchLimit: number = 365
  ): DateRange | null {
    let testDate = startOfDay(preferredStart)
    const maxSearchDate = new Date(testDate.getTime() + (searchLimit * 24 * 60 * 60 * 1000))

    while (testDate <= maxSearchDate) {
      const testRange: DateRange = {
        start: testDate,
        end: new Date(testDate.getTime() + ((lengthInDays - 1) * 24 * 60 * 60 * 1000))
      }

      const validation = this.validateDateSpan(testRange, existingTrips)
      if (validation.isValid) {
        return testRange
      }

      // Move to next day
      testDate = new Date(testDate.getTime() + (24 * 60 * 60 * 1000))
    }

    return null
  }

  /**
   * Suggest alternative dates when conflicts exist
   */
  suggestAlternativeDates(
    conflictedRange: DateRange,
    lengthInDays: number,
    existingTrips: Trip[]
  ): DateRange[] {
    const suggestions: DateRange[] = []
    const duration = lengthInDays || differenceInDays(conflictedRange.end, conflictedRange.start) + 1

    // Try earlier dates
    const earlierDate = new Date(conflictedRange.start.getTime() - (30 * 24 * 60 * 60 * 1000))
    const earlierRange = this.findNextAvailableDateSpan(earlierDate, duration, existingTrips, 60)
    if (earlierRange && earlierRange.start < conflictedRange.start) {
      suggestions.push(earlierRange)
    }

    // Try later dates
    const laterDate = new Date(conflictedRange.end.getTime() + (24 * 60 * 60 * 1000))
    const laterRange = this.findNextAvailableDateSpan(laterDate, duration, existingTrips, 60)
    if (laterRange) {
      suggestions.push(laterRange)
    }

    return suggestions.slice(0, 3) // Return max 3 suggestions
  }

  /**
   * Batch validation for multiple date ranges
   */
  validateMultipleDateSpans(
    newRanges: DateRange[],
    existingTrips: Trip[]
  ): { [index: number]: ValidationResult } {
    const results: { [index: number]: ValidationResult } = {}

    // Create a combined list of existing trips plus validated new trips
    let combinedTrips = [...existingTrips]

    newRanges.forEach((range, index) => {
      // Validate against existing trips and previously validated new trips
      const result = this.validateDateSpan(range, combinedTrips)
      results[index] = result

      // If valid, add to combined trips for next validations
      if (result.isValid) {
        combinedTrips.push({
          id: `temp-${index}`,
          country: 'TEMP',
          startDate: range.start,
          endDate: range.end,
          days: differenceInDays(range.end, range.start) + 1
        })
      }
    })

    return results
  }

  /**
   * Private: Check if two date ranges overlap
   */
  private rangesOverlap(range1: DateRange, range2: DateRange): boolean {
    return areIntervalsOverlapping(
      { start: range1.start, end: range1.end },
      { start: range2.start, end: range2.end }
    )
  }

  /**
   * Private: Calculate detailed conflict information
   */
  private calculateConflictDetail(
    newRange: DateRange,
    tripRange: DateRange,
    trip: Trip
  ): ConflictDetail {
    // Calculate the actual overlap period
    const conflictStart = newRange.start > tripRange.start ? newRange.start : tripRange.start
    const conflictEnd = newRange.end < tripRange.end ? newRange.end : tripRange.end
    const overlapDays = differenceInDays(conflictEnd, conflictStart) + 1

    return {
      tripId: trip.id,
      tripCountry: trip.country,
      conflictStart,
      conflictEnd,
      overlapDays: Math.max(0, overlapDays)
    }
  }

  /**
   * Private: Determine if conflict should be reported based on configuration
   */
  private shouldReportConflict(
    conflict: ConflictDetail,
    newRange: DateRange,
    tripRange: DateRange
  ): boolean {
    // In strict mode, report all conflicts
    if (this.config.strictMode) return true

    // Same-day travel exception
    if (this.config.allowSameDayTravel) {
      const isSameDayTransition = 
        (newRange.start.getTime() === tripRange.end.getTime()) ||
        (newRange.end.getTime() === tripRange.start.getTime())
      
      if (isSameDayTransition) return false
    }

    // Border transition exception
    if (this.config.allowBorderTransitions && conflict.overlapDays <= 1) {
      return false
    }

    return true
  }

  /**
   * Private: Add occupied dates from a trip to the occupied dates array
   */
  private addOccupiedDatesFromTrip(trip: Trip, occupiedDates: Date[]): void {
    const start = startOfDay(trip.startDate)
    const end = startOfDay(trip.endDate)
    
    let currentDate = new Date(start)
    while (currentDate <= end) {
      occupiedDates.push(new Date(currentDate))
      currentDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000))
    }
  }

  /**
   * Private: Generate human-readable validation message
   */
  private generateValidationMessage(conflicts: ConflictDetail[]): string {
    if (conflicts.length === 0) {
      return 'Dates are available'
    }

    if (conflicts.length === 1) {
      const conflict = conflicts[0]
      return `Dates overlap with existing trip to ${conflict.tripCountry} (${conflict.overlapDays} day${conflict.overlapDays !== 1 ? 's' : ''})`
    }

    return `Dates conflict with ${conflicts.length} existing trips`
  }

  /**
   * Private: Validate date range input
   */
  private isValidDateRange(range: DateRange): boolean {
    if (!range || !range.start || !range.end) return false
    if (!isValid(range.start) || !isValid(range.end)) return false
    if (range.start > range.end) return false
    return true
  }

  /**
   * Private: Validate trip data
   */
  private isValidTrip(trip: Trip): boolean {
    if (!trip || !trip.startDate || !trip.endDate) return false
    if (!isValid(trip.startDate) || !isValid(trip.endDate)) return false
    if (trip.startDate > trip.endDate) return false
    return true
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<OverlapPreventionConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Get current configuration
   */
  getConfig(): OverlapPreventionConfig {
    return { ...this.config }
  }

  /**
   * Find the next available date range starting from a preferred date
   */
  findNextAvailableDateRange(
    preferredStart: Date,
    lengthInDays: number,
    existingTrips: Trip[],
    searchLimitDays: number = 365
  ): DateRange | null {
    const searchLimit = new Date(preferredStart.getTime() + searchLimitDays * 24 * 60 * 60 * 1000)
    
    for (let searchDate = new Date(preferredStart); searchDate <= searchLimit; searchDate.setDate(searchDate.getDate() + 1)) {
      const proposedRange: DateRange = {
        start: new Date(searchDate),
        end: new Date(searchDate.getTime() + (lengthInDays - 1) * 24 * 60 * 60 * 1000)
      }
      
      const validation = this.validateDateRange(proposedRange, existingTrips)
      if (validation.isValid) {
        return proposedRange
      }
    }
    
    return null
  }

  /**
   * Validate multiple date ranges at once
   */
  validateMultipleDateRanges(
    dateRanges: DateRange[],
    existingTrips: Trip[]
  ): { [index: number]: ValidationResult } {
    const results: { [index: number]: ValidationResult } = {}
    const allProposedTrips: Trip[] = [...existingTrips]
    
    dateRanges.forEach((range, index) => {
      const validation = this.validateDateRange(range, allProposedTrips)
      results[index] = validation
      
      // If this range is valid, add it to the list for subsequent validations
      if (validation.isValid) {
        allProposedTrips.push({
          id: `temp-${index}`,
          country: `temp-${index}`,
          startDate: range.start,
          endDate: range.end,
          days: Math.ceil((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24)) + 1
        })
      }
    })
    
    return results
  }
}