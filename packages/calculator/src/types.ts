/**
 * Core types for the Schengen Calculator package
 * These types are used throughout the calculator and validation systems
 */

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

export interface PlannedTripValidation {
  isValid: boolean
  violationDays: number
  violationDate: Date | null
}

export interface TripValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

/**
 * Enhanced trip interface for future features
 */
export interface EnhancedTrip extends Trip {
  purpose?: 'business' | 'tourism' | 'family' | 'other'
  notes?: string
  documents?: string[]
  createdAt?: Date
  updatedAt?: Date
}