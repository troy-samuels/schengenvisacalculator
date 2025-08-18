/**
 * Schengen Visa Calculator
 * Implements the 90/180-day rule for Schengen visa compliance
 */

import { addDays, subDays, startOfDay, differenceInDays, parseISO, format } from 'date-fns'

export class SchengenCalculator {
  static MAX_DAYS_IN_PERIOD = 90
  static ROLLING_PERIOD_DAYS = 180

  /**
   * Calculate exact Schengen visa compliance
   * @param {Array} trips - Array of trip objects with startDate, endDate, country
   * @param {Date} referenceDate - Date to calculate from (default: today)
   * @returns {Object} Compliance result with days used, remaining, and compliance status
   */
  static calculateCompliance(trips, referenceDate = new Date()) {
    const normalizedRefDate = startOfDay(referenceDate)
    
    if (!trips || trips.length === 0) {
      return {
        totalDaysUsed: 0,
        daysRemaining: this.MAX_DAYS_IN_PERIOD,
        isCompliant: true,
        overstayDays: 0,
        referenceDate: normalizedRefDate,
        windowStart: subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1)
      }
    }

    const daysInWindow = this.calculateDaysInWindow(trips, normalizedRefDate)
    const overstayDays = Math.max(0, daysInWindow - this.MAX_DAYS_IN_PERIOD)
    
    return {
      totalDaysUsed: daysInWindow,
      daysRemaining: Math.max(0, this.MAX_DAYS_IN_PERIOD - daysInWindow),
      isCompliant: overstayDays === 0,
      overstayDays,
      referenceDate: normalizedRefDate,
      windowStart: subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1)
    }
  }

  /**
   * Calculate days spent in Schengen area within the 180-day rolling window
   * @param {Array} trips - Array of trip objects
   * @param {Date} endDate - End date of the rolling window
   * @returns {number} Total days spent in the window
   */
  static calculateDaysInWindow(trips, endDate) {
    const normalizedEndDate = startOfDay(endDate)
    const windowStart = subDays(normalizedEndDate, this.ROLLING_PERIOD_DAYS - 1)
    
    let totalDays = 0
    
    for (const trip of trips) {
      if (!trip.startDate || !trip.endDate) continue
      
      const tripStart = startOfDay(new Date(trip.startDate))
      const tripEnd = startOfDay(new Date(trip.endDate))
      
      // Calculate overlap between trip and 180-day window
      const overlapStart = tripStart > windowStart ? tripStart : windowStart
      const overlapEnd = tripEnd < normalizedEndDate ? tripEnd : normalizedEndDate
      
      if (overlapStart <= overlapEnd) {
        // Both start and end days count (inclusive)
        totalDays += differenceInDays(overlapEnd, overlapStart) + 1
      }
    }
    
    return totalDays
  }

  /**
   * Create a trip object with proper date handling
   * @param {string} id - Unique trip identifier
   * @param {string} country - Country code (e.g., 'FR', 'DE')
   * @param {string|Date} startDate - Trip start date
   * @param {string|Date} endDate - Trip end date
   * @returns {Object} Trip object
   */
  static createTrip(id, country, startDate, endDate) {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
    
    const normalizedStart = startOfDay(start)
    const normalizedEnd = startOfDay(end)
    
    return {
      id,
      country,
      startDate: normalizedStart,
      endDate: normalizedEnd,
      days: differenceInDays(normalizedEnd, normalizedStart) + 1
    }
  }

  /**
   * Validate if a planned trip would be compliant
   * @param {Array} existingTrips - Existing trips
   * @param {Object} plannedTrip - Planned trip to validate
   * @returns {Object} Validation result
   */
  static validatePlannedTrip(existingTrips, plannedTrip) {
    const allTrips = [...existingTrips, plannedTrip]
    const result = this.calculateCompliance(allTrips, plannedTrip.endDate)
    
    return {
      ...result,
      wouldBeCompliant: result.isCompliant,
      additionalDays: plannedTrip.days
    }
  }

  /**
   * Get next available entry date (when days fall off the 180-day window)
   * @param {Array} trips - Existing trips
   * @param {number} desiredStayDays - Number of days for next trip
   * @param {Date} fromDate - Calculate from this date (default: today)
   * @returns {Date} Next available entry date
   */
  static getNextAvailableDate(trips, desiredStayDays, fromDate = new Date()) {
    let checkDate = startOfDay(fromDate)
    const maxChecks = 365 // Prevent infinite loops
    let checks = 0
    
    while (checks < maxChecks) {
      const result = this.calculateCompliance(trips, checkDate)
      
      if (result.daysRemaining >= desiredStayDays) {
        return checkDate
      }
      
      checkDate = addDays(checkDate, 1)
      checks++
    }
    
    return addDays(fromDate, 180) // Fallback: full reset after 180 days
  }

  /**
   * Format calculation result for display
   * @param {Object} result - Result from calculateCompliance
   * @returns {Object} Formatted result
   */
  static formatResult(result) {
    return {
      summary: `${result.totalDaysUsed}/${this.MAX_DAYS_IN_PERIOD} days used`,
      status: result.isCompliant ? 'Compliant' : 'Non-compliant',
      daysRemaining: result.daysRemaining,
      overstayDays: result.overstayDays,
      windowPeriod: `${format(result.windowStart, 'yyyy-MM-dd')} to ${format(result.referenceDate, 'yyyy-MM-dd')}`,
      isCompliant: result.isCompliant
    }
  }
}