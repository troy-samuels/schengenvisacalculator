export interface Trip {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
  exitPeriods?: ExitPeriod[]
  actualSchengenDays?: number
}

export interface ExitPeriod {
  exitDate: Date
  reentryDate: Date
}

export interface ComplianceResult {
  totalDaysUsed: number
  daysRemaining: number
  isCompliant: boolean
  overstayDays: number
  riskAssessment: RiskAssessment
  nextResetDate: Date | null
  recommendations: string[]
  complianceHistory: ComplianceHistoryEntry[]
  futureWarnings: FutureComplianceWarning[]
}

export interface SingleEntryComplianceResult {
  daysUsed: number
  isWithinLimit: boolean
  contributesToViolation: boolean
  details: TripDetail[]
}

export interface TripDetail {
  date: Date
  daysUsedOnDate: number
  isViolation: boolean
  tripId: string
}

export interface RiskAssessment {
  overallRisk: number // 0-100 scale
  riskLevel: "MINIMAL" | "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
  riskFactors: RiskFactor[]
  recommendations: string[]
  confidenceScore: number
  utilizationRate: number
}

export interface RiskFactor {
  type: "USAGE_HIGH" | "PATTERN_FREQUENT" | "TIMING_POOR" | "BUFFER_LOW" | "CONSECUTIVE_LONG"
  severity: "LOW" | "MEDIUM" | "HIGH"
  description: string
  impact: number
  suggestion: string
}

export interface FutureComplianceWarning {
  date: Date
  violatingTrips: ViolatingTrip[]
  totalOverstay: number
  severity: "WARNING" | "CRITICAL"
  recommendation: string
}

export interface ViolatingTrip {
  tripId: string
  country: string
  startDate: Date
  endDate: Date
  overstayDays: number
}

export interface TravelForecastResult {
  canTravel: boolean
  maxStayDays: number
  suggestedStartDate: Date | null
  alternativeStartDates: Date[]
  riskProjection: RiskAssessment
  warnings: string[]
}

export interface MaximumStayResult {
  maxConsecutiveDays: number
  immediatelyAvailable: number
  requiresWaiting: boolean
  nextAvailableDate: Date | null
  explanation: string
}

export interface OptimalDateOption {
  startDate: Date
  endDate: Date
  immediatelyAvailable: number
  totalAvailable: number
  utilizationAfter: number
  requiresNoBreak: boolean
  score: number
}

export interface ScenarioTestResult {
  scenarioIndex: number
  trips?: Array<Omit<Trip, "id">>
  isValid: boolean
  isViable?: boolean
  violations?: Array<{ date: Date; compliance: ComplianceResult }>
  maxUtilization?: number
  maxUtilizationRate?: number
  totalPlannedDays?: number
  recommendation?: string
  error?: string
}

export interface EmergencyExtensionResult {
  isPossible: boolean
  newEndDate: Date
  originalEndDate: Date
  additionalDays: number
  totalDaysAfterExtension: number
  overstayRisk: number
  daysAvailableForExtension: number
  alternatives: EmergencyAlternative[]
}

export interface EmergencyAlternative {
  type: "SPLIT_TRIP" | "REDUCE_OTHER" | "DELAY_FUTURE"
  description: string
  viability: boolean
  adjustments: Array<{
    tripId: string
    originalEndDate: Date
    newEndDate: Date
    daysSaved: number
  }>
}

export interface TravelStatistics {
  totalTrips: number
  totalDaysPlanned: number
  averageTripLength: number
  longestTrip: number | null
  shortestTrip: number | null
}

export interface CalendarEvent {
  type: "TRIP" | "WARNING"
  title: string
  start?: Date
  end?: Date
  date?: Date
  allDay: boolean
  severity?: "low" | "medium" | "high"
}

export interface ExportMetadata {
  exportDate: string
  version: string
  statistics: TravelStatistics
}

export interface ValidationError {
  field: string
  message: string
  severity: "ERROR" | "WARNING"
}

export interface ComplianceHistoryEntry {
  date: Date
  daysUsed: number
  daysRemaining: number
  riskLevel: RiskAssessment["riskLevel"]
}
