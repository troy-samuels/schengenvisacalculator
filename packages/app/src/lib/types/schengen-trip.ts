/**
 * Schengen Trip Types for PDF Export and Compliance Tracking
 * Aligned with database schema and trip data service
 */

export interface SchengenTrip {
  id: string
  country: string
  startDate: Date
  endDate: Date
  days: number
  purpose?: string
  entry_type?: 'schengen' | 'non_schengen'
  notes?: string
}

export interface TripEntry {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  entry_type?: 'schengen' | 'non_schengen'
  notes?: string
}

// Enhanced interface for calculator UI with database persistence support
export interface VisaEntryWithPersistence {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
  daysInLast180: number
  daysRemaining: number
  activeColumn: "country" | "dates" | "complete" | null
  entry_type: 'schengen' | 'non_schengen'
  notes?: string
  // Database sync status
  isSaved?: boolean
  isLoading?: boolean
  lastSaved?: Date
}

// Helper type for local storage migration
export interface LocalStorageTrip {
  id: string
  country: string
  startDate: string | null // ISO string format
  endDate: string | null
  entry_type?: 'schengen' | 'non_schengen'
  notes?: string
}

// Conversion utilities
export function convertLocalStorageTrip(localTrip: LocalStorageTrip): TripEntry {
  return {
    id: localTrip.id,
    country: localTrip.country,
    startDate: localTrip.startDate ? new Date(localTrip.startDate) : null,
    endDate: localTrip.endDate ? new Date(localTrip.endDate) : null,
    entry_type: localTrip.entry_type || 'schengen',
    notes: localTrip.notes
  }
}

export function convertTripToLocalStorage(trip: TripEntry): LocalStorageTrip {
  return {
    id: trip.id,
    country: trip.country,
    startDate: trip.startDate ? trip.startDate.toISOString() : null,
    endDate: trip.endDate ? trip.endDate.toISOString() : null,
    entry_type: trip.entry_type || 'schengen',
    notes: trip.notes
  }
}