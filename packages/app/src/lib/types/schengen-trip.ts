/**
 * Schengen Trip Types for PDF Export and Compliance Tracking
 */

export interface SchengenTrip {
  id: string
  country: string
  startDate: Date
  endDate: Date
  days: number
  purpose?: string
}

export interface TripEntry {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
}