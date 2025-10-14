/**
 * Shared calendar types to prevent circular imports
 */

export interface CalendarDateRange {
  startDate: Date | null
  endDate: Date | null
}

export type CalendarDateStatus =
  | 'used'
  | 'available'
  | 'partial'
  | 'blocked'
  | 'past'

export interface CalendarDateInsight {
  date: Date
  status: CalendarDateStatus
  daysRemaining: number
  maxStay: number
  windowStart: Date
  windowEnd: Date
  message?: string
}
