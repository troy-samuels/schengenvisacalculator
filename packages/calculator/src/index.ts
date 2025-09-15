// Main exports for the calculator package
export { RobustSchengenCalculator } from './calculator/robust-schengen-calculator'
export { DateOverlapValidator } from './validators/date-overlap-validator'

// Cumulative validation exports (CLAUDE.md cross-validation requirement)
export {
  validateCumulative,
  validateSequence,
  validateMobile,
  benchmarkPerformance
} from './validators/cumulative-validation'

// Country data
export * from './data/countries'
export * from './data/affected-countries'

// Type exports
export type {
  Trip,
  ComplianceResult,
  DayBreakdown,
  ValidationError,
  RollingWindowCheck,
  PlannedTripValidation,
  TripValidationResult,
  EnhancedTrip,
  AccuracyVerification,
  FutureTripValidation,
  TripRecommendation
} from './types'

export type {
  DateRange,
  ValidationResult,
  ConflictDetail,
  OverlapPreventionConfig
} from './validators/date-overlap-validator'

export type {
  CumulativeValidationResult
} from './validators/cumulative-validation'