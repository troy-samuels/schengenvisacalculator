import { isAfter, isBefore, isWithinInterval, areIntervalsOverlapping, differenceInDays, format, addDays } from "date-fns"
import type { Trip } from "@/lib/types/enhanced-calculator"

export type ConflictType = 
  | "OVERLAPPING_TRIPS"
  | "DATE_OVERLAP"
  | "INSUFFICIENT_GAP"
  | "EXCEEDS_90_DAYS"
  | "EXCEEDS_180_DAY_PERIOD"
  | "CONSECUTIVE_STAY_VIOLATION"
  | "INVALID_DATE_ORDER"
  | "FUTURE_VIOLATION_RISK"

export type ConflictSeverity = "ERROR" | "WARNING" | "INFO"

export interface TripConflict {
  type: ConflictType
  severity: ConflictSeverity
  tripIds: string[]
  message: string
  details: string
  suggestedFix?: string
  affectedDates?: {
    start: Date
    end: Date
  }
}

export interface ConflictDetectionResult {
  hasConflicts: boolean
  hasErrors: boolean
  hasWarnings: boolean
  conflicts: TripConflict[]
  totalConflicts: number
}

export class TripConflictDetector {
  private static readonly MAX_DAYS_IN_PERIOD = 90
  private static readonly ROLLING_PERIOD_DAYS = 180
  private static readonly MIN_GAP_DAYS_WARNING = 3

  static detectAllConflicts(trips: Trip[]): ConflictDetectionResult {
    const conflicts: TripConflict[] = []
    
    conflicts.push(...this.detectDateOrderConflicts(trips))
    conflicts.push(...this.detectOverlappingTrips(trips))
    conflicts.push(...this.detectDateOverlapConflicts(trips))
    conflicts.push(...this.detectInsufficientGaps(trips))
    conflicts.push(...this.detect90DayViolations(trips))
    conflicts.push(...this.detect180DayPeriodViolations(trips))
    conflicts.push(...this.detectConsecutiveStayViolations(trips))
    conflicts.push(...this.detectFutureViolationRisks(trips))

    const hasErrors = conflicts.some(c => c.severity === "ERROR")
    const hasWarnings = conflicts.some(c => c.severity === "WARNING")

    return {
      hasConflicts: conflicts.length > 0,
      hasErrors,
      hasWarnings,
      conflicts,
      totalConflicts: conflicts.length
    }
  }

  private static detectDateOrderConflicts(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []

    for (const trip of trips) {
      if (trip.startDate && trip.endDate && isAfter(trip.startDate, trip.endDate)) {
        conflicts.push({
          type: "INVALID_DATE_ORDER",
          severity: "ERROR",
          tripIds: [trip.id],
          message: `Invalid date order for ${trip.country} trip`,
          details: `End date (${format(trip.endDate, "MMM d, yyyy")}) is before start date (${format(trip.startDate, "MMM d, yyyy")})`,
          suggestedFix: "Swap the start and end dates",
          affectedDates: {
            start: trip.startDate,
            end: trip.endDate
          }
        })
      }
    }

    return conflicts
  }

  private static detectOverlappingTrips(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []
    const validTrips = trips.filter(t => t.startDate && t.endDate)

    for (let i = 0; i < validTrips.length; i++) {
      for (let j = i + 1; j < validTrips.length; j++) {
        const trip1 = validTrips[i]
        const trip2 = validTrips[j]

        if (trip1.startDate && trip1.endDate && trip2.startDate && trip2.endDate) {
          const interval1 = { start: trip1.startDate, end: trip1.endDate }
          const interval2 = { start: trip2.startDate, end: trip2.endDate }

          if (areIntervalsOverlapping(interval1, interval2)) {
            conflicts.push({
              type: "OVERLAPPING_TRIPS",
              severity: "ERROR",
              tripIds: [trip1.id, trip2.id],
              message: `Overlapping trips to ${trip1.country} and ${trip2.country}`,
              details: `${trip1.country}: ${format(trip1.startDate, "MMM d")} - ${format(trip1.endDate, "MMM d, yyyy")} overlaps with ${trip2.country}: ${format(trip2.startDate, "MMM d")} - ${format(trip2.endDate, "MMM d, yyyy")}`,
              suggestedFix: "Adjust dates to avoid overlap or combine into a single trip",
              affectedDates: {
                start: isAfter(trip1.startDate, trip2.startDate) ? trip1.startDate : trip2.startDate,
                end: isBefore(trip1.endDate, trip2.endDate) ? trip1.endDate : trip2.endDate
              }
            })
          }
        }
      }
    }

    return conflicts
  }

  private static detectDateOverlapConflicts(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []
    const validTrips = trips.filter(t => t.startDate && t.endDate)

    for (let i = 0; i < validTrips.length; i++) {
      for (let j = i + 1; j < validTrips.length; j++) {
        const trip1 = validTrips[i]
        const trip2 = validTrips[j]

        if (trip1.startDate && trip1.endDate && trip2.startDate && trip2.endDate) {
          const interval1 = { start: trip1.startDate, end: trip1.endDate }
          const interval2 = { start: trip2.startDate, end: trip2.endDate }

          if (areIntervalsOverlapping(interval1, interval2)) {
            const overlapStart = isAfter(trip1.startDate, trip2.startDate) ? trip1.startDate : trip2.startDate
            const overlapEnd = isBefore(trip1.endDate, trip2.endDate) ? trip1.endDate : trip2.endDate
            const overlapDays = differenceInDays(overlapEnd, overlapStart) + 1

            conflicts.push({
              type: "DATE_OVERLAP",
              severity: "ERROR",
              tripIds: [trip1.id, trip2.id],
              message: `Cannot be in two places at once`,
              details: `Your trip to ${trip1.country} (${format(trip1.startDate, "MMM d")} - ${format(trip1.endDate, "MMM d, yyyy")}) overlaps with your trip to ${trip2.country} (${format(trip2.startDate, "MMM d")} - ${format(trip2.endDate, "MMM d, yyyy")}) for ${overlapDays} day${overlapDays === 1 ? '' : 's'}.`,
              suggestedFix: "Adjust travel dates to avoid overlap. You cannot be in two different countries simultaneously.",
              affectedDates: {
                start: overlapStart,
                end: overlapEnd
              }
            })
          }
        }
      }
    }

    return conflicts
  }

  private static detectInsufficientGaps(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []
    const sortedTrips = trips
      .filter(t => t.startDate && t.endDate)
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())

    for (let i = 0; i < sortedTrips.length - 1; i++) {
      const currentTrip = sortedTrips[i]
      const nextTrip = sortedTrips[i + 1]

      if (currentTrip.endDate && nextTrip.startDate) {
        const gapDays = differenceInDays(nextTrip.startDate, currentTrip.endDate) - 1

        if (gapDays < 0) {
          continue
        }

        if (gapDays < this.MIN_GAP_DAYS_WARNING) {
          conflicts.push({
            type: "INSUFFICIENT_GAP",
            severity: "WARNING",
            tripIds: [currentTrip.id, nextTrip.id],
            message: `Short gap between ${currentTrip.country} and ${nextTrip.country} trips`,
            details: `Only ${gapDays} day${gapDays !== 1 ? 's' : ''} between trips (${format(currentTrip.endDate, "MMM d")} to ${format(nextTrip.startDate, "MMM d, yyyy")})`,
            suggestedFix: `Consider adding more buffer time between trips for travel logistics`,
            affectedDates: {
              start: currentTrip.endDate,
              end: nextTrip.startDate
            }
          })
        }
      }
    }

    return conflicts
  }

  private static detect90DayViolations(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []

    for (const trip of trips) {
      if (trip.startDate && trip.endDate) {
        const tripDays = differenceInDays(trip.endDate, trip.startDate) + 1

        if (tripDays > this.MAX_DAYS_IN_PERIOD) {
          conflicts.push({
            type: "CONSECUTIVE_STAY_VIOLATION",
            severity: "ERROR",
            tripIds: [trip.id],
            message: `Single trip to ${trip.country} exceeds 90-day limit`,
            details: `Trip duration is ${tripDays} days (${format(trip.startDate, "MMM d")} - ${format(trip.endDate, "MMM d, yyyy")}), which exceeds the maximum consecutive stay of 90 days`,
            suggestedFix: "Split the trip with an exit from Schengen area or reduce the duration",
            affectedDates: {
              start: trip.startDate,
              end: trip.endDate
            }
          })
        }
      }
    }

    return conflicts
  }

  private static detect180DayPeriodViolations(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []
    const sortedTrips = trips
      .filter(t => t.startDate && t.endDate)
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())

    for (let i = 0; i < sortedTrips.length; i++) {
      const currentTrip = sortedTrips[i]
      if (!currentTrip.startDate || !currentTrip.endDate) continue

      const periodEnd = currentTrip.endDate
      const periodStart = addDays(periodEnd, -this.ROLLING_PERIOD_DAYS + 1)
      
      let totalDaysInPeriod = 0
      const tripsInPeriod: Trip[] = []

      for (const trip of sortedTrips) {
        if (!trip.startDate || !trip.endDate) continue

        const overlapStart = isAfter(trip.startDate, periodStart) ? trip.startDate : periodStart
        const overlapEnd = isBefore(trip.endDate, periodEnd) ? trip.endDate : periodEnd

        if (overlapStart <= overlapEnd) {
          const daysInPeriod = differenceInDays(overlapEnd, overlapStart) + 1
          totalDaysInPeriod += daysInPeriod
          tripsInPeriod.push(trip)
        }
      }

      if (totalDaysInPeriod > this.MAX_DAYS_IN_PERIOD) {
        const tripIds = [...new Set(tripsInPeriod.map(t => t.id))]
        
        const existingConflict = conflicts.find(c => 
          c.type === "EXCEEDS_180_DAY_PERIOD" && 
          c.tripIds.length === tripIds.length &&
          c.tripIds.every(id => tripIds.includes(id))
        )

        if (!existingConflict) {
          conflicts.push({
            type: "EXCEEDS_180_DAY_PERIOD",
            severity: "ERROR",
            tripIds,
            message: `Exceeds 90-day limit in 180-day period`,
            details: `${totalDaysInPeriod} days used in the 180-day period ending ${format(periodEnd, "MMM d, yyyy")} (limit is 90 days)`,
            suggestedFix: `Reduce trip durations or postpone trips to comply with the 90/180 rule`,
            affectedDates: {
              start: periodStart,
              end: periodEnd
            }
          })
        }
      }
    }

    return conflicts
  }

  private static detectConsecutiveStayViolations(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []
    const sortedTrips = trips
      .filter(t => t.startDate && t.endDate)
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())

    let consecutiveStart: Date | null = null
    let consecutiveEnd: Date | null = null
    let consecutiveTripIds: string[] = []

    for (let i = 0; i < sortedTrips.length; i++) {
      const trip = sortedTrips[i]
      if (!trip.startDate || !trip.endDate) continue

      if (!consecutiveStart) {
        consecutiveStart = trip.startDate
        consecutiveEnd = trip.endDate
        consecutiveTripIds = [trip.id]
      } else if (consecutiveEnd && differenceInDays(trip.startDate, consecutiveEnd) <= 1) {
        consecutiveEnd = trip.endDate
        consecutiveTripIds.push(trip.id)
      } else {
        if (consecutiveStart && consecutiveEnd) {
          const consecutiveDays = differenceInDays(consecutiveEnd, consecutiveStart) + 1
          if (consecutiveDays > this.MAX_DAYS_IN_PERIOD && consecutiveTripIds.length > 1) {
            conflicts.push({
              type: "CONSECUTIVE_STAY_VIOLATION",
              severity: "ERROR",
              tripIds: consecutiveTripIds,
              message: `Combined consecutive stays exceed 90-day limit`,
              details: `${consecutiveDays} consecutive days across ${consecutiveTripIds.length} trips (${format(consecutiveStart, "MMM d")} - ${format(consecutiveEnd, "MMM d, yyyy")})`,
              suggestedFix: "Add a gap between trips by leaving the Schengen area",
              affectedDates: {
                start: consecutiveStart,
                end: consecutiveEnd
              }
            })
          }
        }
        
        consecutiveStart = trip.startDate
        consecutiveEnd = trip.endDate
        consecutiveTripIds = [trip.id]
      }
    }

    if (consecutiveStart && consecutiveEnd && consecutiveTripIds.length > 1) {
      const consecutiveDays = differenceInDays(consecutiveEnd, consecutiveStart) + 1
      if (consecutiveDays > this.MAX_DAYS_IN_PERIOD) {
        conflicts.push({
          type: "CONSECUTIVE_STAY_VIOLATION",
          severity: "ERROR",
          tripIds: consecutiveTripIds,
          message: `Combined consecutive stays exceed 90-day limit`,
          details: `${consecutiveDays} consecutive days across ${consecutiveTripIds.length} trips (${format(consecutiveStart, "MMM d")} - ${format(consecutiveEnd, "MMM d, yyyy")})`,
          suggestedFix: "Add a gap between trips by leaving the Schengen area",
          affectedDates: {
            start: consecutiveStart,
            end: consecutiveEnd
          }
        })
      }
    }

    return conflicts
  }

  private static detectFutureViolationRisks(trips: Trip[]): TripConflict[] {
    const conflicts: TripConflict[] = []
    const today = new Date()
    const futureTrips = trips.filter(t => t.startDate && isAfter(t.startDate, today))
    
    if (futureTrips.length === 0) return conflicts

    const pastAndCurrentTrips = trips.filter(t => 
      t.startDate && (isBefore(t.startDate, today) || t.startDate.getTime() === today.getTime())
    )

    for (const futureTrip of futureTrips) {
      if (!futureTrip.startDate || !futureTrip.endDate) continue

      const allTripsUpToFuture = [
        ...pastAndCurrentTrips,
        ...futureTrips.filter(t => 
          t.startDate && t.startDate.getTime() <= futureTrip.endDate!.getTime()
        )
      ]

      const periodEnd = futureTrip.endDate
      const periodStart = addDays(periodEnd, -this.ROLLING_PERIOD_DAYS + 1)
      
      let projectedDays = 0
      const contributingTrips: Trip[] = []

      for (const trip of allTripsUpToFuture) {
        if (!trip.startDate || !trip.endDate) continue

        const overlapStart = isAfter(trip.startDate, periodStart) ? trip.startDate : periodStart
        const overlapEnd = isBefore(trip.endDate, periodEnd) ? trip.endDate : periodEnd

        if (overlapStart <= overlapEnd) {
          const daysInPeriod = differenceInDays(overlapEnd, overlapStart) + 1
          projectedDays += daysInPeriod
          contributingTrips.push(trip)
        }
      }

      if (projectedDays > this.MAX_DAYS_IN_PERIOD - 10 && projectedDays <= this.MAX_DAYS_IN_PERIOD) {
        conflicts.push({
          type: "FUTURE_VIOLATION_RISK",
          severity: "WARNING",
          tripIds: [futureTrip.id],
          message: `High risk of violation with ${futureTrip.country} trip`,
          details: `This trip will use ${projectedDays} of 90 allowed days by ${format(futureTrip.endDate, "MMM d, yyyy")}`,
          suggestedFix: "Consider shortening this trip or postponing it to maintain compliance buffer"
        })
      } else if (projectedDays > this.MAX_DAYS_IN_PERIOD) {
        conflicts.push({
          type: "FUTURE_VIOLATION_RISK",
          severity: "ERROR",
          tripIds: contributingTrips.map(t => t.id),
          message: `Future violation predicted`,
          details: `Will exceed 90-day limit (${projectedDays} days) by ${format(futureTrip.endDate, "MMM d, yyyy")}`,
          suggestedFix: "Cancel or reschedule trips to avoid visa violation"
        })
      }
    }

    return conflicts
  }

  static getConflictSummary(result: ConflictDetectionResult): string {
    if (!result.hasConflicts) {
      return "✅ No conflicts detected - all trips are compliant"
    }

    const errors = result.conflicts.filter(c => c.severity === "ERROR").length
    const warnings = result.conflicts.filter(c => c.severity === "WARNING").length
    const infos = result.conflicts.filter(c => c.severity === "INFO").length

    const parts = []
    if (errors > 0) parts.push(`${errors} error${errors !== 1 ? 's' : ''}`)
    if (warnings > 0) parts.push(`${warnings} warning${warnings !== 1 ? 's' : ''}`)
    if (infos > 0) parts.push(`${infos} info${infos !== 1 ? 's' : ''}`)

    return `⚠️ ${parts.join(", ")} detected`
  }
}