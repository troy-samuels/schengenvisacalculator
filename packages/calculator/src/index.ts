// Main exports for the calculator package
export { RobustSchengenCalculator } from './calculator/robust-schengen-calculator'
export { DateOverlapValidator } from './validators/date-overlap-validator'

// Country data
export * from './data/countries'

// Type exports
export type {
  Trip,
  ComplianceResult,
  DayBreakdown,
  ValidationError,
  RollingWindowCheck,
  PlannedTripValidation,
  TripValidationResult,
  EnhancedTrip
} from './types'

export type {
  DateSpan,
  ValidationResult,
  ConflictDetail,
  OverlapPreventionConfig
} from './validators/date-overlap-validator'