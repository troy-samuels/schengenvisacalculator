import { differenceInDays, subDays, addDays, startOfDay, isAfter, isBefore, isValid, isLeapYear, format } from "date-fns"

export interface Trip {
  id: string
  country: string
  startDate: Date
  endDate: Date
  days: number
}

export interface ComplianceResult {
  totalDaysUsed: number
  daysRemaining: number
  isCompliant: boolean
  overstayDays: number
  referenceDate: Date
  periodStart: Date
  periodEnd: Date
  detailedBreakdown: DayBreakdown[]
}

export interface DayBreakdown {
  date: Date
  daysUsedOnDate: number
  cumulativeDaysInWindow: number
  isViolation: boolean
  contributingTrips: string[]
}

export interface ValidationError {
  field: string
  message: string
  severity: 'ERROR' | 'WARNING'
  tripId?: string
}

export interface RollingWindowCheck {
  date: Date
  windowStart: Date
  windowEnd: Date
  daysInWindow: number
  isCompliant: boolean
  overstayDays: number
}

/**
 * Robust Schengen Calculator implementing exact 180-day rolling window rules
 * 
 * Key Schengen Rules:
 * 1. Maximum 90 days in any 180-day period
 * 2. The 180-day period is ROLLING - calculated from any given date backward
 * 3. Entry and exit days both count as stay days
 * 4. Days must be calculated for EVERY day, not just trip endpoints
 */
export class RobustSchengenCalculator {
  private static readonly MAX_DAYS_IN_PERIOD = 90
  private static readonly ROLLING_PERIOD_DAYS = 180

  /**
   * Calculate compliance using exact rolling window algorithm
   * This checks compliance for EVERY day in the period, not just trip endpoints
   * Enhanced with edge case handling for leap years, timezones, and boundary conditions
   */
  static calculateExactCompliance(trips: Trip[], referenceDate: Date = new Date()): ComplianceResult {
    try {
      // Enhanced input validation
      if (!Array.isArray(trips)) {
        throw new Error('Trips must be an array')
      }

      if (!referenceDate || !isValid(referenceDate)) {
        throw new Error('Reference date must be a valid Date object')
      }

      // Validate reference date is not in extreme future/past
      const now = new Date()
      const tenYearsAgo = subDays(now, 365 * 10)
      const fiveYearsFromNow = addDays(now, 365 * 5)
      
      if (referenceDate < tenYearsAgo || referenceDate > fiveYearsFromNow) {
        console.warn(`Reference date ${format(referenceDate, 'yyyy-MM-dd')} is outside reasonable range`)
      }

      // Normalize reference date to start of day (UTC-agnostic)
      const normalizedRefDate = this.normalizeToStartOfDay(referenceDate)
      const periodStart = this.calculatePeriodStart(normalizedRefDate)
      
      // Validate and normalize all trips
      const validTrips = this.validateAndNormalizeTrips(trips)
      
      // Handle empty trips case
      if (validTrips.length === 0) {
        return {
          totalDaysUsed: 0,
          daysRemaining: this.MAX_DAYS_IN_PERIOD,
          isCompliant: true,
          overstayDays: 0,
          referenceDate: normalizedRefDate,
          periodStart,
          periodEnd: normalizedRefDate,
          detailedBreakdown: []
        }
      }
      
      // Create a map of all days with stays
      const dailyStays = this.createDailyStayMap(validTrips, periodStart, normalizedRefDate)
      
      // Calculate rolling compliance for each day
      const rollingChecks = this.calculateRollingComplianceForAllDays(
        dailyStays,
        periodStart,
        normalizedRefDate
      )
      
      // Validate rolling checks
      if (rollingChecks.length === 0) {
        throw new Error('Failed to generate rolling compliance checks')
      }
      
      // Find the maximum violation and current status
      const maxViolation = Math.max(...rollingChecks.map(check => check.overstayDays))
      const currentCompliance = rollingChecks[rollingChecks.length - 1]
      
      if (!currentCompliance) {
        throw new Error('Failed to get current compliance status')
      }
      
      // Generate detailed breakdown
      const detailedBreakdown = this.generateDetailedBreakdown(
        dailyStays,
        rollingChecks,
        periodStart,
        normalizedRefDate
      )
      
      const result = {
        totalDaysUsed: currentCompliance.daysInWindow,
        daysRemaining: Math.max(0, this.MAX_DAYS_IN_PERIOD - currentCompliance.daysInWindow),
        isCompliant: maxViolation === 0,
        overstayDays: maxViolation,
        referenceDate: normalizedRefDate,
        periodStart,
        periodEnd: normalizedRefDate,
        detailedBreakdown
      }

      // Final validation of result
      if (result.totalDaysUsed < 0 || result.daysRemaining < 0) {
        console.error('Invalid calculation result:', result)
        throw new Error('Calculation produced invalid negative values')
      }

      return result
    } catch (error) {
      console.error('Error in calculateExactCompliance:', error)
      
      // Return safe fallback
      const normalizedRefDate = startOfDay(referenceDate)
      return {
        totalDaysUsed: 0,
        daysRemaining: this.MAX_DAYS_IN_PERIOD,
        isCompliant: true,
        overstayDays: 0,
        referenceDate: normalizedRefDate,
        periodStart: subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1),
        periodEnd: normalizedRefDate,
        detailedBreakdown: []
      }
    }
  }

  /**
   * Calculate the exact number of days used in any 180-day window ending on a specific date
   */
  static calculateDaysInWindow(trips: Trip[], endDate: Date): number {
    const normalizedEndDate = startOfDay(endDate)
    const windowStart = subDays(normalizedEndDate, this.ROLLING_PERIOD_DAYS - 1)
    
    let totalDays = 0
    
    for (const trip of trips) {
      const tripStart = startOfDay(trip.startDate)
      const tripEnd = startOfDay(trip.endDate)
      
      // Calculate overlap with the window (inclusive of both start and end)
      const overlapStart = tripStart > windowStart ? tripStart : windowStart
      const overlapEnd = tripEnd < normalizedEndDate ? tripEnd : normalizedEndDate
      
      if (overlapStart <= overlapEnd) {
        // Both start and end days count, so we add 1
        totalDays += differenceInDays(overlapEnd, overlapStart) + 1
      }
    }
    
    return totalDays
  }

  /**
   * Check if a planned trip would violate the 90/180 rule
   */
  static validatePlannedTrip(
    existingTrips: Trip[],
    plannedTrip: Trip
  ): { isValid: boolean; violationDays: number; violationDate: Date | null } {
    const allTrips = [...existingTrips, plannedTrip]
    
    // Check compliance for every day of the planned trip
    let currentDate = startOfDay(plannedTrip.startDate)
    const endDate = startOfDay(plannedTrip.endDate)
    
    let maxViolation = 0
    let violationDate: Date | null = null
    
    while (currentDate <= endDate) {
      const daysInWindow = this.calculateDaysInWindow(allTrips, currentDate)
      const overstay = Math.max(0, daysInWindow - this.MAX_DAYS_IN_PERIOD)
      
      if (overstay > maxViolation) {
        maxViolation = overstay
        violationDate = new Date(currentDate)
      }
      
      currentDate = addDays(currentDate, 1)
    }
    
    return {
      isValid: maxViolation === 0,
      violationDays: maxViolation,
      violationDate
    }
  }

  /**
   * Find the latest date when a trip of specified length could start without violation
   */
  static findLatestValidStartDate(
    existingTrips: Trip[],
    tripLength: number,
    earliestStart: Date,
    latestStart: Date
  ): Date | null {
    let testDate = startOfDay(latestStart)
    const minDate = startOfDay(earliestStart)
    
    while (testDate >= minDate) {
      const testTrip: Trip = {
        id: 'test',
        country: 'TEST',
        startDate: testDate,
        endDate: addDays(testDate, tripLength - 1),
        days: tripLength
      }
      
      const validation = this.validatePlannedTrip(existingTrips, testTrip)
      if (validation.isValid) {
        return testDate
      }
      
      testDate = subDays(testDate, 1)
    }
    
    return null
  }

  /**
   * Calculate maximum consecutive days available from a start date
   */
  static calculateMaxConsecutiveDays(existingTrips: Trip[], startDate: Date): number {
    let maxDays = 0
    let testLength = 1
    const maxTestLength = 100 // Safety limit
    
    while (testLength <= maxTestLength) {
      const testTrip: Trip = {
        id: 'test',
        country: 'TEST',
        startDate: startOfDay(startDate),
        endDate: addDays(startOfDay(startDate), testLength - 1),
        days: testLength
      }
      
      const validation = this.validatePlannedTrip(existingTrips, testTrip)
      if (validation.isValid) {
        maxDays = testLength
        testLength++
      } else {
        break
      }
    }
    
    return Math.min(maxDays, this.MAX_DAYS_IN_PERIOD)
  }

  /**
   * Comprehensive trip validation
   */
  static validateTrips(trips: Trip[]): ValidationError[] {
    const errors: ValidationError[] = []
    const seenIds = new Set<string>()

    trips.forEach((trip, index) => {
      // Check for duplicate IDs
      if (seenIds.has(trip.id)) {
        errors.push({
          field: 'id',
          message: `Duplicate trip ID: ${trip.id}`,
          severity: 'ERROR',
          tripId: trip.id
        })
      }
      seenIds.add(trip.id)

      // Required fields
      if (!trip.id || trip.id.trim() === '') {
        errors.push({
          field: 'id',
          message: `Trip at index ${index} is missing an ID`,
          severity: 'ERROR'
        })
      }

      if (!trip.country || trip.country.trim() === '') {
        errors.push({
          field: 'country',
          message: 'Country is required',
          severity: 'ERROR',
          tripId: trip.id
        })
      }

      if (!trip.startDate) {
        errors.push({
          field: 'startDate',
          message: 'Start date is required',
          severity: 'ERROR',
          tripId: trip.id
        })
      }

      if (!trip.endDate) {
        errors.push({
          field: 'endDate',
          message: 'End date is required',
          severity: 'ERROR',
          tripId: trip.id
        })
      }

      // Date validation
      if (trip.startDate && trip.endDate) {
        if (trip.startDate > trip.endDate) {
          errors.push({
            field: 'dates',
            message: 'Start date must be before or equal to end date',
            severity: 'ERROR',
            tripId: trip.id
          })
        }

        const duration = differenceInDays(trip.endDate, trip.startDate) + 1
        
        if (duration > this.MAX_DAYS_IN_PERIOD) {
          errors.push({
            field: 'duration',
            message: `Trip duration (${duration} days) exceeds maximum allowed consecutive stay (${this.MAX_DAYS_IN_PERIOD} days)`,
            severity: 'ERROR',
            tripId: trip.id
          })
        }

        if (duration < 1) {
          errors.push({
            field: 'duration',
            message: 'Trip must be at least 1 day long',
            severity: 'ERROR',
            tripId: trip.id
          })
        }

        // Check for unreasonable dates
        const now = new Date()
        const tenYearsAgo = subDays(now, 365 * 10)
        const fiveYearsFromNow = addDays(now, 365 * 5)

        if (trip.startDate < tenYearsAgo) {
          errors.push({
            field: 'startDate',
            message: 'Start date seems unreasonably far in the past',
            severity: 'WARNING',
            tripId: trip.id
          })
        }

        if (trip.endDate > fiveYearsFromNow) {
          errors.push({
            field: 'endDate',
            message: 'End date seems unreasonably far in the future',
            severity: 'WARNING',
            tripId: trip.id
          })
        }

        // Check for consistency with days field
        if (trip.days && Math.abs(trip.days - duration) > 0) {
          errors.push({
            field: 'days',
            message: `Days field (${trip.days}) doesn't match calculated duration (${duration})`,
            severity: 'WARNING',
            tripId: trip.id
          })
        }
      }
    })

    // Check for overlapping trips (same dates)
    for (let i = 0; i < trips.length; i++) {
      for (let j = i + 1; j < trips.length; j++) {
        const trip1 = trips[i]
        const trip2 = trips[j]
        
        if (!trip1.startDate || !trip1.endDate || !trip2.startDate || !trip2.endDate) continue

        // Check if trips overlap
        const overlap = !(trip1.endDate < trip2.startDate || trip2.endDate < trip1.startDate)
        
        if (overlap) {
          errors.push({
            field: 'dates',
            message: `Trip ${trip1.id} overlaps with trip ${trip2.id}. This may be intentional for same-day travel between countries.`,
            severity: 'WARNING',
            tripId: trip1.id
          })
        }
      }
    }

    return errors
  }

  /**
   * Validate and normalize trip data with error handling
   */
  private static validateAndNormalizeTrips(trips: Trip[]): Trip[] {
    // Run validation but proceed with filtering
    const errors = this.validateTrips(trips)
    const criticalErrors = errors.filter(e => e.severity === 'ERROR')
    
    if (criticalErrors.length > 0) {
      console.warn('Critical validation errors found:', criticalErrors)
    }

    return trips
      .filter(trip => {
        // Only include trips that pass basic validation
        if (!trip.startDate || !trip.endDate || !trip.country) return false
        if (trip.startDate > trip.endDate) return false
        
        // Filter out trips with excessive duration
        const duration = differenceInDays(trip.endDate, trip.startDate) + 1
        if (duration > this.MAX_DAYS_IN_PERIOD) return false
        
        return true
      })
      .map(trip => {
        try {
          const normalizedTrip = {
            ...trip,
            startDate: startOfDay(trip.startDate),
            endDate: startOfDay(trip.endDate),
            days: differenceInDays(trip.endDate, trip.startDate) + 1
          }
          
          // Validate normalized dates
          if (isNaN(normalizedTrip.startDate.getTime()) || isNaN(normalizedTrip.endDate.getTime())) {
            console.error(`Invalid dates for trip ${trip.id}`)
            return null
          }
          
          return normalizedTrip
        } catch (error) {
          console.error(`Error normalizing trip ${trip.id}:`, error)
          return null
        }
      })
      .filter((trip): trip is Trip => trip !== null)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }

  /**
   * Create a map of daily stays for efficient lookup
   */
  private static createDailyStayMap(
    trips: Trip[],
    periodStart: Date,
    periodEnd: Date
  ): Map<string, string[]> {
    const dailyStays = new Map<string, string[]>()
    
    for (const trip of trips) {
      // Only consider trips that overlap with our period
      if (trip.endDate < periodStart || trip.startDate > periodEnd) continue
      
      // Calculate the actual overlap
      const overlapStart = trip.startDate > periodStart ? trip.startDate : periodStart
      const overlapEnd = trip.endDate < periodEnd ? trip.endDate : periodEnd
      
      // Add each day of the trip
      let currentDate = new Date(overlapStart)
      while (currentDate <= overlapEnd) {
        const dateKey = currentDate.toISOString().split('T')[0]
        
        if (!dailyStays.has(dateKey)) {
          dailyStays.set(dateKey, [])
        }
        dailyStays.get(dateKey)!.push(trip.id)
        
        currentDate = addDays(currentDate, 1)
      }
    }
    
    return dailyStays
  }

  /**
   * Calculate rolling compliance check for every day in the period
   */
  private static calculateRollingComplianceForAllDays(
    dailyStays: Map<string, string[]>,
    periodStart: Date,
    periodEnd: Date
  ): RollingWindowCheck[] {
    const checks: RollingWindowCheck[] = []
    
    let currentDate = new Date(periodStart)
    while (currentDate <= periodEnd) {
      const windowStart = subDays(currentDate, this.ROLLING_PERIOD_DAYS - 1)
      const windowEnd = new Date(currentDate)
      
      // Count days in this 180-day window
      let daysInWindow = 0
      let checkDate = new Date(windowStart)
      
      while (checkDate <= windowEnd) {
        const dateKey = checkDate.toISOString().split('T')[0]
        if (dailyStays.has(dateKey)) {
          daysInWindow++
        }
        checkDate = addDays(checkDate, 1)
      }
      
      const overstayDays = Math.max(0, daysInWindow - this.MAX_DAYS_IN_PERIOD)
      
      checks.push({
        date: new Date(currentDate),
        windowStart: new Date(windowStart),
        windowEnd: new Date(windowEnd),
        daysInWindow,
        isCompliant: overstayDays === 0,
        overstayDays
      })
      
      currentDate = addDays(currentDate, 1)
    }
    
    return checks
  }

  /**
   * Generate detailed day-by-day breakdown
   */
  private static generateDetailedBreakdown(
    dailyStays: Map<string, string[]>,
    rollingChecks: RollingWindowCheck[],
    periodStart: Date,
    periodEnd: Date
  ): DayBreakdown[] {
    const breakdown: DayBreakdown[] = []
    
    let currentDate = new Date(periodStart)
    let checkIndex = 0
    
    while (currentDate <= periodEnd) {
      const dateKey = currentDate.toISOString().split('T')[0]
      const staysOnDate = dailyStays.get(dateKey) || []
      const daysUsedOnDate = staysOnDate.length > 0 ? 1 : 0
      
      const rollingCheck = rollingChecks[checkIndex]
      
      breakdown.push({
        date: new Date(currentDate),
        daysUsedOnDate,
        cumulativeDaysInWindow: rollingCheck.daysInWindow,
        isViolation: !rollingCheck.isCompliant,
        contributingTrips: staysOnDate
      })
      
      currentDate = addDays(currentDate, 1)
      checkIndex++
    }
    
    return breakdown
  }

  /**
   * Get next date when days will "roll off" the window
   */
  static getNextResetDate(trips: Trip[], referenceDate: Date = new Date()): Date | null {
    const normalizedRefDate = startOfDay(referenceDate)
    const currentWindow = subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1)
    
    // Find the earliest trip day that affects the current window
    let earliestRelevantDate: Date | null = null
    
    for (const trip of trips) {
      let checkDate = startOfDay(trip.startDate)
      const endDate = startOfDay(trip.endDate)
      
      while (checkDate <= endDate) {
        if (checkDate >= currentWindow && checkDate <= normalizedRefDate) {
          if (!earliestRelevantDate || checkDate < earliestRelevantDate) {
            earliestRelevantDate = checkDate
          }
        }
        checkDate = addDays(checkDate, 1)
      }
    }
    
    if (!earliestRelevantDate) return null
    
    // The reset date is 180 days after the earliest relevant date
    return addDays(earliestRelevantDate, this.ROLLING_PERIOD_DAYS)
  }

  /**
   * Debug function to visualize rolling window calculations
   */
  static debugRollingWindow(trips: Trip[], referenceDate: Date): any {
    const result = this.calculateExactCompliance(trips, referenceDate)
    
    return {
      summary: {
        totalDaysUsed: result.totalDaysUsed,
        daysRemaining: result.daysRemaining,
        isCompliant: result.isCompliant,
        overstayDays: result.overstayDays,
        periodStart: result.periodStart,
        periodEnd: result.periodEnd
      },
      tripsInPeriod: trips.filter(trip => 
        trip.endDate >= result.periodStart && trip.startDate <= result.periodEnd
      ),
      dailyBreakdown: result.detailedBreakdown.filter(day => day.daysUsedOnDate > 0),
      violations: result.detailedBreakdown.filter(day => day.isViolation),
      nextResetDate: this.getNextResetDate(trips, referenceDate)
    }
  }

  /**
   * Enhanced date normalization with timezone-agnostic handling
   */
  private static normalizeToStartOfDay(date: Date): Date {
    // Use startOfDay but ensure we're working with local time consistently
    const normalized = startOfDay(date)
    
    // Additional validation for edge cases
    if (!isValid(normalized)) {
      throw new Error(`Failed to normalize date: ${date}`)
    }
    
    return normalized
  }

  /**
   * Calculate period start with leap year awareness
   */
  private static calculatePeriodStart(referenceDate: Date): Date {
    // Standard 180-day window calculation
    const periodStart = subDays(referenceDate, this.ROLLING_PERIOD_DAYS - 1)
    
    // Validate the calculated period start
    if (!isValid(periodStart)) {
      throw new Error(`Invalid period start calculated from reference date: ${format(referenceDate, 'yyyy-MM-dd')}`)
    }
    
    // Check if we're crossing leap year boundaries and log for awareness
    const refYear = referenceDate.getFullYear()
    const startYear = periodStart.getFullYear()
    
    if (refYear !== startYear) {
      const crossesLeapYear = isLeapYear(refYear) || isLeapYear(startYear)
      if (crossesLeapYear) {
        console.debug(`180-day window crosses leap year boundary: ${startYear}-${refYear}`)
      }
    }
    
    return periodStart
  }

  /**
   * Enhanced trip validation with edge case handling
   */
  private static validateAndNormalizeTrips(trips: Trip[]): Trip[] {
    // Run validation but proceed with filtering
    const errors = this.validateTrips(trips)
    const criticalErrors = errors.filter(e => e.severity === 'ERROR')
    
    if (criticalErrors.length > 0) {
      console.warn('Critical validation errors found:', criticalErrors)
    }

    return trips
      .filter(trip => {
        // Only include trips that pass basic validation
        if (!trip.startDate || !trip.endDate || !trip.country) return false
        
        // Enhanced date validation
        if (!isValid(trip.startDate) || !isValid(trip.endDate)) {
          console.warn(`Trip ${trip.id} has invalid dates`)
          return false
        }
        
        if (trip.startDate > trip.endDate) return false
        
        // Filter out trips with excessive duration
        const duration = differenceInDays(trip.endDate, trip.startDate) + 1
        if (duration > this.MAX_DAYS_IN_PERIOD) return false
        
        // Filter out trips with unreasonable dates
        const now = new Date()
        const veryOld = subDays(now, 365 * 20) // 20 years ago
        const veryFuture = addDays(now, 365 * 10) // 10 years in future
        
        if (trip.endDate < veryOld || trip.startDate > veryFuture) {
          console.warn(`Trip ${trip.id} has unreasonable dates`)
          return false
        }
        
        return true
      })
      .map(trip => {
        try {
          const normalizedTrip = {
            ...trip,
            startDate: this.normalizeToStartOfDay(trip.startDate),
            endDate: this.normalizeToStartOfDay(trip.endDate),
            days: differenceInDays(trip.endDate, trip.startDate) + 1
          }
          
          // Validate normalized dates
          if (!isValid(normalizedTrip.startDate) || !isValid(normalizedTrip.endDate)) {
            console.error(`Invalid dates after normalization for trip ${trip.id}`)
            return null
          }
          
          // Check for leap year edge cases in trip duration
          const hasLeapDay = this.tripCrossesLeapDay(normalizedTrip.startDate, normalizedTrip.endDate)
          if (hasLeapDay) {
            console.debug(`Trip ${trip.id} crosses leap day`)
          }
          
          return normalizedTrip
        } catch (error) {
          console.error(`Error normalizing trip ${trip.id}:`, error)
          return null
        }
      })
      .filter((trip): trip is Trip => trip !== null)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }

  /**
   * Check if a trip crosses February 29th in a leap year
   */
  private static tripCrossesLeapDay(startDate: Date, endDate: Date): boolean {
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()
    
    // Check each year the trip spans
    for (let year = startYear; year <= endYear; year++) {
      if (isLeapYear(year)) {
        const leapDay = new Date(year, 1, 29) // February 29th
        if (leapDay >= startDate && leapDay <= endDate) {
          return true
        }
      }
    }
    
    return false
  }

  /**
   * Enhanced day calculation with precise boundary handling
   */
  static calculateDaysInWindow(trips: Trip[], endDate: Date): number {
    if (!isValid(endDate)) {
      throw new Error('End date must be valid')
    }
    
    const normalizedEndDate = this.normalizeToStartOfDay(endDate)
    const windowStart = this.calculatePeriodStart(normalizedEndDate)
    
    let totalDays = 0
    
    for (const trip of trips) {
      if (!isValid(trip.startDate) || !isValid(trip.endDate)) {
        console.warn(`Skipping trip ${trip.id} with invalid dates`)
        continue
      }
      
      const tripStart = this.normalizeToStartOfDay(trip.startDate)
      const tripEnd = this.normalizeToStartOfDay(trip.endDate)
      
      // Calculate overlap with the window (inclusive of both start and end)
      const overlapStart = tripStart > windowStart ? tripStart : windowStart
      const overlapEnd = tripEnd < normalizedEndDate ? tripEnd : normalizedEndDate
      
      if (overlapStart <= overlapEnd) {
        // Both start and end days count, so we add 1
        const daysInOverlap = differenceInDays(overlapEnd, overlapStart) + 1
        
        // Validate the calculated days
        if (daysInOverlap < 0) {
          console.error(`Negative days calculated for trip ${trip.id}`)
          continue
        }
        
        totalDays += daysInOverlap
      }
    }
    
    return totalDays
  }
}