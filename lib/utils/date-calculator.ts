import { addDays, format, isAfter, isBefore, startOfDay } from 'date-fns'

export interface CalculatedTrip {
  id: string
  countryCode: string
  countryName: string
  startDate: Date
  endDate: Date
  duration: number
  purpose: string
  notes?: string
}

export interface DateCalculationResult {
  trips: CalculatedTrip[]
  totalDays: number
  compliance: {
    status: 'compliant' | 'warning' | 'violation'
    message: string
    daysUsed: number
    daysRemaining: number
  }
  warnings: string[]
}

export class TripDateCalculator {
  private baseDate: Date

  constructor(baseDate: Date = new Date()) {
    this.baseDate = startOfDay(baseDate)
  }

  calculateTemplateTrips(
    templateTrips: Array<{
      countryCode: string
      countryName: string
      duration: number
      purpose: string
      spacing?: number
      notes?: string
    }>,
    preferredStartMonth?: number,
    seasonalityMonths?: number[]
  ): DateCalculationResult {
    const trips: CalculatedTrip[] = []
    const warnings: string[] = []
    let currentDate = this.getOptimalStartDate(preferredStartMonth, seasonalityMonths)
    
    templateTrips.forEach((trip, index) => {
      const startDate = new Date(currentDate)
      const endDate = addDays(startDate, trip.duration - 1)
      
      const calculatedTrip: CalculatedTrip = {
        id: `trip-${index + 1}`,
        countryCode: trip.countryCode,
        countryName: trip.countryName,
        startDate,
        endDate,
        duration: trip.duration,
        purpose: trip.purpose,
        notes: trip.notes
      }
      
      trips.push(calculatedTrip)
      
      // Calculate next trip start date
      if (index < templateTrips.length - 1) {
        const spacing = trip.spacing || 7 // Default 1 week spacing
        currentDate = addDays(endDate, spacing + 1)
        
        // Warn if spacing is very tight
        if (spacing < 3) {
          warnings.push(
            `Very tight spacing (${spacing} days) between ${trip.countryName} and next destination`
          )
        }
      }
    })

    const totalDays = trips.reduce((sum, trip) => sum + trip.duration, 0)
    const compliance = this.checkCompliance(trips, totalDays)
    
    return {
      trips,
      totalDays,
      compliance,
      warnings
    }
  }

  private getOptimalStartDate(preferredMonth?: number, seasonalityMonths?: number[]): Date {
    const currentMonth = this.baseDate.getMonth() + 1 // 1-12
    const currentYear = this.baseDate.getFullYear()
    
    // If we have a preferred month, use it
    if (preferredMonth) {
      const targetMonth = preferredMonth - 1 // Convert to 0-11
      let targetYear = currentYear
      
      // If preferred month has passed this year, use next year
      if (preferredMonth < currentMonth || 
          (preferredMonth === currentMonth && this.baseDate.getDate() > 15)) {
        targetYear++
      }
      
      return new Date(targetYear, targetMonth, 1)
    }
    
    // If we have seasonality preferences, find the next available month
    if (seasonalityMonths && seasonalityMonths.length > 0) {
      const sortedMonths = [...seasonalityMonths].sort((a, b) => a - b)
      
      // Find next available month in the preferred list
      for (const month of sortedMonths) {
        if (month > currentMonth || 
            (month === currentMonth && this.baseDate.getDate() <= 15)) {
          return new Date(currentYear, month - 1, 1)
        }
      }
      
      // If no months left this year, use first preferred month next year
      return new Date(currentYear + 1, sortedMonths[0] - 1, 1)
    }
    
    // Default: start next month
    let nextMonth = this.baseDate.getMonth() + 1
    let year = currentYear
    if (nextMonth > 11) {
      nextMonth = 0
      year++
    }
    
    return new Date(year, nextMonth, 1)
  }

  private checkCompliance(trips: CalculatedTrip[], totalDays: number): DateCalculationResult['compliance'] {
    const maxDays = 90
    const daysRemaining = maxDays - totalDays
    
    // Check if trips violate 90-day rule within 180-day period
    const violations = this.check90DayRule(trips)
    
    if (violations.length > 0) {
      return {
        status: 'violation',
        message: `Violates 90-day rule: ${violations[0]}`,
        daysUsed: totalDays,
        daysRemaining: 0
      }
    }
    
    if (totalDays > maxDays) {
      return {
        status: 'violation',
        message: `Exceeds 90-day limit by ${totalDays - maxDays} days`,
        daysUsed: totalDays,
        daysRemaining: 0
      }
    }
    
    if (daysRemaining < 5) {
      return {
        status: 'warning',
        message: `Very tight on limits - only ${daysRemaining} days remaining`,
        daysUsed: totalDays,
        daysRemaining
      }
    }
    
    return {
      status: 'compliant',
      message: `Uses ${totalDays}/90 days with ${daysRemaining} days buffer`,
      daysUsed: totalDays,
      daysRemaining
    }
  }

  private check90DayRule(trips: CalculatedTrip[]): string[] {
    const violations: string[] = []
    const sortedTrips = [...trips].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    
    // Check each 180-day rolling period
    for (let i = 0; i < sortedTrips.length; i++) {
      const periodStart = sortedTrips[i].startDate
      const periodEnd = addDays(periodStart, 180)
      
      // Find all trips that overlap with this 180-day period
      const overlappingTrips = sortedTrips.filter(trip => 
        !isAfter(trip.startDate, periodEnd) && !isBefore(trip.endDate, periodStart)
      )
      
      // Calculate total days in this period
      let totalDaysInPeriod = 0
      overlappingTrips.forEach(trip => {
        const effectiveStart = isAfter(trip.startDate, periodStart) ? trip.startDate : periodStart
        const effectiveEnd = isBefore(trip.endDate, periodEnd) ? trip.endDate : periodEnd
        
        if (!isAfter(effectiveStart, effectiveEnd)) {
          const daysInPeriod = Math.ceil((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
          totalDaysInPeriod += daysInPeriod
        }
      })
      
      if (totalDaysInPeriod > 90) {
        violations.push(
          `Period starting ${format(periodStart, 'MMM dd, yyyy')}: ${totalDaysInPeriod} days (exceeds 90-day limit)`
        )
      }
    }
    
    return violations
  }

  adjustForSeasonality(
    trips: CalculatedTrip[],
    category: string
  ): CalculatedTrip[] {
    const adjustments = {
      'summer': this.adjustForSummer,
      'family': this.adjustForSchoolHolidays,
      'business': this.adjustForBusinessCycle,
      'student': this.adjustForAcademicYear
    }
    
    const adjustmentFn = adjustments[category as keyof typeof adjustments]
    if (adjustmentFn) {
      return adjustmentFn.call(this, trips)
    }
    
    return trips
  }

  private adjustForSummer(trips: CalculatedTrip[]): CalculatedTrip[] {
    return trips.map(trip => {
      const month = trip.startDate.getMonth()
      
      // Ensure summer trips are in June-August
      if (month < 5) { // Before June
        const newStart = new Date(trip.startDate.getFullYear(), 5, 1) // June 1st
        return {
          ...trip,
          startDate: newStart,
          endDate: addDays(newStart, trip.duration - 1)
        }
      }
      
      if (month > 7) { // After August
        const newStart = new Date(trip.startDate.getFullYear() + 1, 5, 1) // Next June
        return {
          ...trip,
          startDate: newStart,
          endDate: addDays(newStart, trip.duration - 1)
        }
      }
      
      return trip
    })
  }

  private adjustForSchoolHolidays(trips: CalculatedTrip[]): CalculatedTrip[] {
    const schoolHolidays = [
      { start: 3, end: 4, name: 'Easter' }, // April-May
      { start: 6, end: 8, name: 'Summer' }, // July-September
      { start: 9, end: 10, name: 'October' }, // October-November
      { start: 11, end: 0, name: 'Christmas' } // December-January
    ]
    
    return trips.map((trip, index) => {
      const holiday = schoolHolidays[index % schoolHolidays.length]
      const month = holiday.start
      const year = trip.startDate.getFullYear()
      
      const newStart = new Date(year, month, 1)
      return {
        ...trip,
        startDate: newStart,
        endDate: addDays(newStart, trip.duration - 1)
      }
    })
  }

  private adjustForBusinessCycle(trips: CalculatedTrip[]): CalculatedTrip[] {
    // Avoid major holiday periods for business trips
    return trips.map(trip => {
      const month = trip.startDate.getMonth()
      
      // Avoid December/January and August
      if (month === 11 || month === 0 || month === 7) {
        let newMonth = month
        if (month === 11 || month === 0) newMonth = 1 // February
        if (month === 7) newMonth = 8 // September
        
        const newStart = new Date(trip.startDate.getFullYear(), newMonth, 1)
        return {
          ...trip,
          startDate: newStart,
          endDate: addDays(newStart, trip.duration - 1)
        }
      }
      
      return trip
    })
  }

  private adjustForAcademicYear(trips: CalculatedTrip[]): CalculatedTrip[] {
    // Align with academic calendar (September-June)
    return trips.map(trip => {
      const month = trip.startDate.getMonth()
      
      // Ensure trips fall within academic year
      if (month >= 6 && month < 8) { // July-August, move to September
        const newStart = new Date(trip.startDate.getFullYear(), 8, 1)
        return {
          ...trip,
          startDate: newStart,
          endDate: addDays(newStart, trip.duration - 1)
        }
      }
      
      return trip
    })
  }

  generateOptimizedSchedule(trips: CalculatedTrip[]): {
    optimizedTrips: CalculatedTrip[]
    improvements: string[]
    savings: { days: number; compliance: string }
  } {
    const improvements: string[] = []
    let optimizedTrips = [...trips]
    
    // Sort by start date
    optimizedTrips.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    
    // Optimize spacing
    for (let i = 0; i < optimizedTrips.length - 1; i++) {
      const currentTrip = optimizedTrips[i]
      const nextTrip = optimizedTrips[i + 1]
      
      const daysBetween = Math.ceil(
        (nextTrip.startDate.getTime() - currentTrip.endDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      // If spacing is too tight, adjust
      if (daysBetween < 2) {
        const newStartDate = addDays(currentTrip.endDate, 3)
        optimizedTrips[i + 1] = {
          ...nextTrip,
          startDate: newStartDate,
          endDate: addDays(newStartDate, nextTrip.duration - 1)
        }
        improvements.push(`Added buffer days between ${currentTrip.countryName} and ${nextTrip.countryName}`)
      }
    }
    
    const originalDays = trips.reduce((sum, trip) => sum + trip.duration, 0)
    const optimizedDays = optimizedTrips.reduce((sum, trip) => sum + trip.duration, 0)
    
    return {
      optimizedTrips,
      improvements,
      savings: {
        days: originalDays - optimizedDays,
        compliance: optimizedDays <= 90 ? 'compliant' : 'violation'
      }
    }
  }
}