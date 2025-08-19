import { addDays, subDays, differenceInDays, isAfter, isBefore, format, startOfDay } from 'date-fns'

export interface Trip {
  id: string
  startDate: Date
  endDate: Date
  countries: string[]
  purpose?: string
  notes?: string
  isOptimized?: boolean
  originalStartDate?: Date
  originalEndDate?: Date
}

export interface OptimizationResult {
  originalTrips: Trip[]
  optimizedTrips: Trip[]
  totalDaysSaved: number
  originalTotalDays: number
  optimizedTotalDays: number
  explanations: OptimizationExplanation[]
  compliance: {
    beforeOptimization: ComplianceInfo
    afterOptimization: ComplianceInfo
  }
}

export interface OptimizationExplanation {
  tripId: string
  type: 'moved' | 'shortened' | 'split' | 'reordered' | 'no_change'
  description: string
  daysSaved: number
  oldDates: { start: Date; end: Date }
  newDates: { start: Date; end: Date }
}

export interface ComplianceInfo {
  isCompliant: boolean
  daysUsed: number
  remainingDays: number
  windowStart: Date
  windowEnd: Date
  riskLevel: 'low' | 'medium' | 'high'
  warnings: string[]
}

export class TripOptimizer {
  private readonly SCHENGEN_LIMIT = 90
  private readonly ROLLING_PERIOD = 180
  private readonly MIN_TRIP_DURATION = 1
  private readonly MAX_TRIP_DURATION = 89 // Leave at least 1 day buffer
  private readonly BUFFER_DAYS = 2 // Minimum days between trips

  constructor() {}

  /**
   * Optimize trips to maximize available days within Schengen rules
   */
  optimizeTrips(trips: Trip[]): OptimizationResult {
    const today = startOfDay(new Date())
    
    // Separate past and future trips
    const pastTrips = trips.filter(trip => isBefore(trip.endDate, today))
    const futureTrips = trips.filter(trip => isAfter(trip.startDate, today) || isAfter(trip.endDate, today))

    // Only optimize future trips
    const originalFutureTrips = futureTrips.map(trip => ({
      ...trip,
      originalStartDate: trip.startDate,
      originalEndDate: trip.endDate
    }))

    const optimizedFutureTrips = this.performOptimization(originalFutureTrips, pastTrips, today)
    const allOptimizedTrips = [...pastTrips, ...optimizedFutureTrips]

    // Calculate results
    const originalTotalDays = this.calculateTotalDays(trips, today)
    const optimizedTotalDays = this.calculateTotalDays(allOptimizedTrips, today)
    const totalDaysSaved = optimizedTotalDays - originalTotalDays

    // Generate explanations
    const explanations = this.generateExplanations(originalFutureTrips, optimizedFutureTrips)

    // Check compliance
    const beforeCompliance = this.checkCompliance([...pastTrips, ...originalFutureTrips], today)
    const afterCompliance = this.checkCompliance(allOptimizedTrips, today)

    return {
      originalTrips: trips,
      optimizedTrips: allOptimizedTrips,
      totalDaysSaved,
      originalTotalDays,
      optimizedTotalDays,
      explanations,
      compliance: {
        beforeOptimization: beforeCompliance,
        afterOptimization: afterCompliance
      }
    }
  }

  private performOptimization(futureTrips: Trip[], pastTrips: Trip[], today: Date): Trip[] {
    if (futureTrips.length === 0) return futureTrips

    // Sort trips by start date
    const sortedTrips = [...futureTrips].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    let optimizedTrips = [...sortedTrips]

    // Apply optimization strategies in order
    optimizedTrips = this.optimizeForWindowRolling(optimizedTrips, pastTrips, today)
    optimizedTrips = this.optimizeSpacing(optimizedTrips, today)
    optimizedTrips = this.optimizeSequencing(optimizedTrips, pastTrips, today)
    optimizedTrips = this.ensureCompliance(optimizedTrips, pastTrips, today)

    return optimizedTrips
  }

  /**
   * Optimize trips to take advantage of rolling window periods
   */
  private optimizeForWindowRolling(trips: Trip[], pastTrips: Trip[], today: Date): Trip[] {
    const optimized = [...trips]

    for (let i = 0; i < optimized.length; i++) {
      const trip = optimized[i]
      const tripDuration = differenceInDays(trip.endDate, trip.startDate) + 1

      // Find the optimal start date for this trip
      const optimalStartDate = this.findOptimalStartDate(trip, optimized, pastTrips, today, i)
      
      if (optimalStartDate && !this.isSameDate(optimalStartDate, trip.startDate)) {
        optimized[i] = {
          ...trip,
          startDate: optimalStartDate,
          endDate: addDays(optimalStartDate, tripDuration - 1),
          isOptimized: true
        }
      }
    }

    return optimized
  }

  /**
   * Find the optimal start date for a trip to maximize available days
   */
  private findOptimalStartDate(
    trip: Trip, 
    otherTrips: Trip[], 
    pastTrips: Trip[], 
    today: Date, 
    skipIndex: number
  ): Date | null {
    const tripDuration = differenceInDays(trip.endDate, trip.startDate) + 1
    const maxSearchDays = 365 // Search up to 1 year ahead
    let bestStartDate = trip.startDate
    let bestAvailableDays = 0

    // Don't optimize trips that start in the past
    if (isBefore(trip.startDate, today)) {
      return null
    }

    for (let offset = 0; offset < maxSearchDays; offset += 7) { // Check weekly intervals for performance
      const candidateStart = addDays(trip.startDate, offset)
      const candidateEnd = addDays(candidateStart, tripDuration - 1)

      // Skip if would conflict with other trips
      if (this.wouldConflictWithTrips(candidateStart, candidateEnd, otherTrips, skipIndex)) {
        continue
      }

      // Calculate available days with this position
      const availableDays = this.calculateAvailableDaysAfterTrip(
        candidateEnd,
        [...pastTrips, ...otherTrips.filter((_, i) => i !== skipIndex), {
          ...trip,
          startDate: candidateStart,
          endDate: candidateEnd
        }]
      )

      if (availableDays > bestAvailableDays) {
        bestAvailableDays = availableDays
        bestStartDate = candidateStart
      }
    }

    return this.isSameDate(bestStartDate, trip.startDate) ? null : bestStartDate
  }

  /**
   * Optimize spacing between trips to avoid unnecessary restrictions
   */
  private optimizeSpacing(trips: Trip[], today: Date): Trip[] {
    const optimized = [...trips].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    for (let i = 1; i < optimized.length; i++) {
      const prevTrip = optimized[i - 1]
      const currentTrip = optimized[i]
      
      const daysBetween = differenceInDays(currentTrip.startDate, prevTrip.endDate)
      
      // If trips are too close, try to space them out
      if (daysBetween < this.BUFFER_DAYS) {
        const newStartDate = addDays(prevTrip.endDate, this.BUFFER_DAYS + 1)
        const tripDuration = differenceInDays(currentTrip.endDate, currentTrip.startDate) + 1
        
        optimized[i] = {
          ...currentTrip,
          startDate: newStartDate,
          endDate: addDays(newStartDate, tripDuration - 1),
          isOptimized: true
        }
      }
    }

    return optimized
  }

  /**
   * Optimize the sequence of trips for better window utilization
   */
  private optimizeSequencing(trips: Trip[], pastTrips: Trip[], today: Date): Trip[] {
    // Sort by priority: shorter trips first (easier to fit in gaps)
    const prioritized = [...trips].sort((a, b) => {
      const aDuration = differenceInDays(a.endDate, a.startDate) + 1
      const bDuration = differenceInDays(b.endDate, b.startDate) + 1
      return aDuration - bDuration
    })

    return prioritized
  }

  /**
   * Ensure all trips comply with Schengen rules
   */
  private ensureCompliance(trips: Trip[], pastTrips: Trip[], today: Date): Trip[] {
    const compliantTrips = []

    for (const trip of trips) {
      // Check if this trip would violate the 90/180 rule
      const allTrips = [...pastTrips, ...compliantTrips, trip]
      const compliance = this.checkComplianceForDate(trip.endDate, allTrips)

      if (compliance.isCompliant) {
        compliantTrips.push(trip)
      } else {
        // Try to adjust the trip to make it compliant
        const adjustedTrip = this.adjustTripForCompliance(trip, [...pastTrips, ...compliantTrips])
        if (adjustedTrip) {
          compliantTrips.push(adjustedTrip)
        }
      }
    }

    return compliantTrips
  }

  /**
   * Adjust a trip to make it compliant with Schengen rules
   */
  private adjustTripForCompliance(trip: Trip, existingTrips: Trip[]): Trip | null {
    const tripDuration = differenceInDays(trip.endDate, trip.startDate) + 1
    
    // Try shortening the trip
    for (let reduction = 1; reduction <= tripDuration - this.MIN_TRIP_DURATION; reduction++) {
      const adjustedTrip = {
        ...trip,
        endDate: subDays(trip.endDate, reduction),
        isOptimized: true
      }

      const compliance = this.checkComplianceForDate(adjustedTrip.endDate, [...existingTrips, adjustedTrip])
      if (compliance.isCompliant) {
        return adjustedTrip
      }
    }

    // Try moving the trip later
    for (let delay = 1; delay <= 90; delay++) {
      const adjustedTrip = {
        ...trip,
        startDate: addDays(trip.startDate, delay),
        endDate: addDays(trip.endDate, delay),
        isOptimized: true
      }

      const compliance = this.checkComplianceForDate(adjustedTrip.endDate, [...existingTrips, adjustedTrip])
      if (compliance.isCompliant) {
        return adjustedTrip
      }
    }

    return null
  }

  /**
   * Check if date ranges would conflict
   */
  private wouldConflictWithTrips(
    startDate: Date, 
    endDate: Date, 
    trips: Trip[], 
    skipIndex?: number
  ): boolean {
    return trips.some((trip, index) => {
      if (skipIndex !== undefined && index === skipIndex) return false
      
      return !(isBefore(endDate, trip.startDate) || isAfter(startDate, trip.endDate))
    })
  }

  /**
   * Calculate available days after a given trip
   */
  private calculateAvailableDaysAfterTrip(afterDate: Date, allTrips: Trip[]): number {
    const windowStart = subDays(afterDate, this.ROLLING_PERIOD - 1)
    
    let daysUsed = 0
    for (const trip of allTrips) {
      const overlapStart = isAfter(trip.startDate, windowStart) ? trip.startDate : windowStart
      const overlapEnd = isBefore(trip.endDate, afterDate) ? trip.endDate : afterDate
      
      if (!isAfter(overlapStart, overlapEnd)) {
        daysUsed += differenceInDays(overlapEnd, overlapStart) + 1
      }
    }

    return Math.max(0, this.SCHENGEN_LIMIT - daysUsed)
  }

  /**
   * Calculate total days for trips from a given date
   */
  private calculateTotalDays(trips: Trip[], fromDate: Date): number {
    return trips
      .filter(trip => isAfter(trip.endDate, fromDate))
      .reduce((total, trip) => {
        const start = isAfter(trip.startDate, fromDate) ? trip.startDate : fromDate
        return total + differenceInDays(trip.endDate, start) + 1
      }, 0)
  }

  /**
   * Check compliance for all trips
   */
  private checkCompliance(trips: Trip[], fromDate: Date): ComplianceInfo {
    const relevantTrips = trips.filter(trip => isAfter(trip.endDate, fromDate))
    if (relevantTrips.length === 0) {
      return {
        isCompliant: true,
        daysUsed: 0,
        remainingDays: this.SCHENGEN_LIMIT,
        windowStart: fromDate,
        windowEnd: addDays(fromDate, this.ROLLING_PERIOD - 1),
        riskLevel: 'low',
        warnings: []
      }
    }

    // Find the most restrictive 180-day period
    const lastTripEnd = relevantTrips.reduce((latest, trip) => 
      isAfter(trip.endDate, latest) ? trip.endDate : latest, relevantTrips[0].endDate)
    
    const windowEnd = lastTripEnd
    const windowStart = subDays(windowEnd, this.ROLLING_PERIOD - 1)

    let daysUsed = 0
    const warnings: string[] = []

    for (const trip of relevantTrips) {
      const overlapStart = isAfter(trip.startDate, windowStart) ? trip.startDate : windowStart
      const overlapEnd = isBefore(trip.endDate, windowEnd) ? trip.endDate : windowEnd
      
      if (!isAfter(overlapStart, overlapEnd)) {
        const overlapDays = differenceInDays(overlapEnd, overlapStart) + 1
        daysUsed += overlapDays
      }
    }

    const remainingDays = Math.max(0, this.SCHENGEN_LIMIT - daysUsed)
    const isCompliant = daysUsed <= this.SCHENGEN_LIMIT

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low'
    if (remainingDays <= 10) riskLevel = 'high'
    else if (remainingDays <= 30) riskLevel = 'medium'

    // Add warnings
    if (!isCompliant) {
      warnings.push(`Exceeds 90-day limit by ${daysUsed - this.SCHENGEN_LIMIT} days`)
    } else if (remainingDays <= 10) {
      warnings.push(`Only ${remainingDays} days remaining in current period`)
    }

    return {
      isCompliant,
      daysUsed,
      remainingDays,
      windowStart,
      windowEnd,
      riskLevel,
      warnings
    }
  }

  /**
   * Check compliance for a specific date
   */
  private checkComplianceForDate(checkDate: Date, trips: Trip[]): ComplianceInfo {
    const windowEnd = checkDate
    const windowStart = subDays(windowEnd, this.ROLLING_PERIOD - 1)

    let daysUsed = 0
    for (const trip of trips) {
      const overlapStart = isAfter(trip.startDate, windowStart) ? trip.startDate : windowStart
      const overlapEnd = isBefore(trip.endDate, windowEnd) ? trip.endDate : windowEnd
      
      if (!isAfter(overlapStart, overlapEnd)) {
        daysUsed += differenceInDays(overlapEnd, overlapStart) + 1
      }
    }

    const remainingDays = Math.max(0, this.SCHENGEN_LIMIT - daysUsed)
    const isCompliant = daysUsed <= this.SCHENGEN_LIMIT

    return {
      isCompliant,
      daysUsed,
      remainingDays,
      windowStart,
      windowEnd,
      riskLevel: remainingDays <= 10 ? 'high' : remainingDays <= 30 ? 'medium' : 'low',
      warnings: []
    }
  }

  /**
   * Generate explanations for optimizations
   */
  private generateExplanations(original: Trip[], optimized: Trip[]): OptimizationExplanation[] {
    const explanations: OptimizationExplanation[] = []

    for (let i = 0; i < original.length; i++) {
      const originalTrip = original[i]
      const optimizedTrip = optimized.find(t => t.id === originalTrip.id)

      if (!optimizedTrip) continue

      const oldDates = { start: originalTrip.startDate, end: originalTrip.endDate }
      const newDates = { start: optimizedTrip.startDate, end: optimizedTrip.endDate }

      if (this.isSameDate(oldDates.start, newDates.start) && 
          this.isSameDate(oldDates.end, newDates.end)) {
        explanations.push({
          tripId: originalTrip.id,
          type: 'no_change',
          description: 'Trip dates were already optimal',
          daysSaved: 0,
          oldDates,
          newDates
        })
        continue
      }

      const originalDuration = differenceInDays(oldDates.end, oldDates.start) + 1
      const newDuration = differenceInDays(newDates.end, newDates.start) + 1
      const daysSaved = newDuration - originalDuration

      let type: OptimizationExplanation['type'] = 'moved'
      let description = ''

      if (daysSaved > 0) {
        type = 'shortened'
        description = `Trip shortened by ${Math.abs(daysSaved)} days to improve compliance`
      } else if (daysSaved < 0) {
        type = 'shortened'
        description = `Trip shortened by ${Math.abs(daysSaved)} days to avoid overstay`
      } else if (!this.isSameDate(oldDates.start, newDates.start)) {
        type = 'moved'
        const daysMoved = differenceInDays(newDates.start, oldDates.start)
        if (daysMoved > 0) {
          description = `Trip moved ${daysMoved} days later to maximize remaining days in rolling window`
        } else {
          description = `Trip moved ${Math.abs(daysMoved)} days earlier for better window utilization`
        }
      }

      explanations.push({
        tripId: originalTrip.id,
        type,
        description,
        daysSaved,
        oldDates,
        newDates
      })
    }

    return explanations
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return startOfDay(date1).getTime() === startOfDay(date2).getTime()
  }
}