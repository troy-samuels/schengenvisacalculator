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
  verification?: AccuracyVerification
}

/**
 * Real-time accuracy verification for building user trust
 */
export interface AccuracyVerification {
  confidenceScore: number // 0-100, based on data completeness and validation
  verificationStatus: 'verified' | 'partial' | 'unverified'
  euCompliant: boolean // Validated against official EU test cases
  lastValidated: Date
  validationSources: string[] // e.g., ['EU_OFFICIAL', 'CROSS_VALIDATION', 'TEST_CASES']
  dataQuality: {
    completeness: number // 0-100, based on missing data
    consistency: number // 0-100, based on data conflicts
    recency: number // 0-100, based on how recent the data is
  }
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
  recommendations?: TripRecommendation[]
}

/**
 * Smart recommendations for trip planning
 */
export interface TripRecommendation {
  type: 'date_adjustment' | 'duration_reduction' | 'split_trip' | 'delay_trip'
  severity: 'info' | 'warning' | 'error'
  message: string
  suggestedStartDate?: Date
  suggestedEndDate?: Date
  maxDuration?: number
  alternativeOptions?: {
    startDate: Date
    endDate: Date
    duration: number
    daysRemaining: number
  }[]
}

/**
 * Real-time future trip validation for intelligent planning
 */
export interface FutureTripValidation {
  plannedTrip: Partial<Trip>
  validation: PlannedTripValidation
  currentCompliance: ComplianceResult
  smartSuggestions: TripRecommendation[]
  optimalStartDate?: Date
  maxTripDuration: number
  safeTravelPeriods: {
    start: Date
    end: Date
    maxDuration: number
  }[]
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