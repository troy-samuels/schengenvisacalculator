/**
 * Date Overlap Prevention System
 * CRITICAL: Prevents users from selecting dates that conflict with existing trips
 * Requirement: A person cannot be in two different locations simultaneously
 */

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface TripEntry {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
}

export interface ValidationResult {
  isValid: boolean
  conflicts: TripEntry[]
  message: string
  conflictDates: Date[]
}

export interface OccupiedDateInfo {
  date: Date
  tripId: string
  country: string
  tripName: string
}

export class DateOverlapValidator {
  /**
   * CRITICAL: Validates if new date range conflicts with existing trips
   * Must be 100% accurate for EU Schengen compliance
   */
  static validateDateRange(
    newRange: DateRange,
    existingTrips: TripEntry[],
    excludeTripId?: string
  ): ValidationResult {
    if (!newRange.startDate || !newRange.endDate) {
      return {
        isValid: true,
        conflicts: [],
        message: 'Dates are available',
        conflictDates: []
      }
    }

    // Filter out the trip being edited (if any)
    const tripsToCheck = existingTrips.filter(
      trip => trip.id !== excludeTripId && trip.startDate && trip.endDate
    )

    const conflicts = tripsToCheck.filter(trip =>
      this.rangesOverlap(newRange, {
        startDate: trip.startDate,
        endDate: trip.endDate
      })
    )

    const conflictDates = conflicts.length > 0 
      ? this.getOverlapDates(newRange, conflicts)
      : []

    return {
      isValid: conflicts.length === 0,
      conflicts: conflicts,
      message: conflicts.length > 0 
        ? `Dates overlap with existing trip: ${conflicts[0].country}`
        : 'Dates are available',
      conflictDates
    }
  }

  /**
   * Returns array of dates that should be disabled in date picker
   * These dates MUST be visually greyed out with strikethrough
   */
  static getDisabledDates(existingTrips: TripEntry[], excludeTripId?: string): Date[] {
    const disabledDates: Date[] = []
    
    const tripsToCheck = existingTrips.filter(
      trip => trip.id !== excludeTripId && trip.startDate && trip.endDate
    )

    tripsToCheck.forEach(trip => {
      if (!trip.startDate || !trip.endDate) return
      
      let currentDate = new Date(trip.startDate)
      const endDate = new Date(trip.endDate)
      
      while (currentDate <= endDate) {
        disabledDates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }
    })
    
    return disabledDates
  }

  /**
   * Returns detailed information about occupied dates for tooltips
   */
  static getOccupiedDateInfo(existingTrips: TripEntry[], excludeTripId?: string): OccupiedDateInfo[] {
    const occupiedInfo: OccupiedDateInfo[] = []
    
    const tripsToCheck = existingTrips.filter(
      trip => trip.id !== excludeTripId && trip.startDate && trip.endDate
    )

    tripsToCheck.forEach(trip => {
      if (!trip.startDate || !trip.endDate) return
      
      let currentDate = new Date(trip.startDate)
      const endDate = new Date(trip.endDate)
      
      while (currentDate <= endDate) {
        occupiedInfo.push({
          date: new Date(currentDate),
          tripId: trip.id,
          country: trip.country,
          tripName: `${trip.country} Trip`
        })
        currentDate.setDate(currentDate.getDate() + 1)
      }
    })
    
    return occupiedInfo
  }

  /**
   * Check if two date ranges overlap
   */
  private static rangesOverlap(range1: DateRange, range2: DateRange): boolean {
    if (!range1.startDate || !range1.endDate || !range2.startDate || !range2.endDate) {
      return false
    }

    // Convert to timestamps for accurate comparison
    const start1 = range1.startDate.getTime()
    const end1 = range1.endDate.getTime()
    const start2 = range2.startDate.getTime()
    const end2 = range2.endDate.getTime()

    // Check for overlap: ranges overlap if start1 <= end2 AND end1 >= start2
    return start1 <= end2 && end1 >= start2
  }

  /**
   * Get specific dates where overlap occurs
   */
  private static getOverlapDates(newRange: DateRange, conflicts: TripEntry[]): Date[] {
    if (!newRange.startDate || !newRange.endDate) return []

    const overlapDates: Date[] = []
    const newStart = new Date(newRange.startDate)
    const newEnd = new Date(newRange.endDate)

    let currentDate = new Date(newStart)
    while (currentDate <= newEnd) {
      // Check if this date is occupied by any conflicting trip
      const isOccupied = conflicts.some(trip => {
        if (!trip.startDate || !trip.endDate) return false
        const tripStart = new Date(trip.startDate)
        const tripEnd = new Date(trip.endDate)
        return currentDate >= tripStart && currentDate <= tripEnd
      })

      if (isOccupied) {
        overlapDates.push(new Date(currentDate))
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return overlapDates
  }

  /**
   * Helper to format date for user messages
   */
  static formatDateForMessage(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  /**
   * Get user-friendly error message for date conflicts
   */
  static getConflictMessage(conflicts: TripEntry[], conflictDates: Date[]): string {
    if (conflicts.length === 0) return 'Dates are available'
    
    if (conflicts.length === 1) {
      const conflict = conflicts[0]
      const startStr = conflict.startDate ? this.formatDateForMessage(conflict.startDate) : 'Unknown'
      const endStr = conflict.endDate ? this.formatDateForMessage(conflict.endDate) : 'Unknown'
      return `Cannot select these dates. You already have a trip to ${conflict.country} from ${startStr} to ${endStr}.`
    }

    return `Cannot select these dates. You have ${conflicts.length} overlapping trips.`
  }
}

/**
 * React hook for date overlap prevention
 * Integrates with existing state management without UI changes
 */
export interface UseDateOverlapPreventionProps {
  existingTrips: TripEntry[]
  excludeTripId?: string
}

export interface UseDateOverlapPreventionReturn {
  validateDateRange: (range: DateRange) => ValidationResult
  getDisabledDates: () => Date[]
  getOccupiedDateInfo: () => OccupiedDateInfo[]
  isDateOccupied: (date: Date) => boolean
}

export function useDateOverlapPrevention({
  existingTrips,
  excludeTripId
}: UseDateOverlapPreventionProps): UseDateOverlapPreventionReturn {
  const validateDateRange = (range: DateRange): ValidationResult => {
    return DateOverlapValidator.validateDateRange(range, existingTrips, excludeTripId)
  }

  const getDisabledDates = (): Date[] => {
    return DateOverlapValidator.getDisabledDates(existingTrips, excludeTripId)
  }

  const getOccupiedDateInfo = (): OccupiedDateInfo[] => {
    return DateOverlapValidator.getOccupiedDateInfo(existingTrips, excludeTripId)
  }

  const isDateOccupied = (date: Date): boolean => {
    const disabledDates = getDisabledDates()
    return disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    )
  }

  return {
    validateDateRange,
    getDisabledDates,
    getOccupiedDateInfo,
    isDateOccupied
  }
}