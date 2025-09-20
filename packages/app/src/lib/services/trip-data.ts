/**
 * Trip Data Service - Supabase Integration
 * Handles saving and loading user trip data to/from the database
 */

import { createClient } from '../supabase/client'
import type { Database } from '../types/database'

// Database types
type VisaEntryRow = Database['public']['Tables']['visa_entries']['Row']
type VisaEntryInsert = Database['public']['Tables']['visa_entries']['Insert']
type VisaEntryUpdate = Database['public']['Tables']['visa_entries']['Update']

// Frontend trip data types
export interface TripData {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  entry_type?: 'schengen' | 'non_schengen'
  notes?: string
}

// Conversion helpers between frontend and database formats
export function tripToDbFormat(trip: TripData, userId: string): VisaEntryInsert {
  return {
    id: trip.id === 'new' ? undefined : trip.id, // Let DB generate ID for new trips
    user_id: userId,
    country: trip.country,
    start_date: trip.startDate ? trip.startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    end_date: trip.endDate ? trip.endDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    entry_type: trip.entry_type || 'schengen',
    notes: trip.notes || null
  }
}

export function dbToTripFormat(dbEntry: VisaEntryRow): TripData {
  return {
    id: dbEntry.id,
    country: dbEntry.country,
    startDate: dbEntry.start_date ? new Date(dbEntry.start_date) : null,
    endDate: dbEntry.end_date ? new Date(dbEntry.end_date) : null,
    entry_type: dbEntry.entry_type,
    notes: dbEntry.notes || undefined
  }
}

/**
 * Trip Data Service Class
 */
export class TripDataService {
  private supabase = createClient()

  /**
   * Save a trip to the database
   */
  async saveTrip(trip: TripData, userId: string): Promise<TripData> {
    console.log('💾 Saving trip to database:', { tripId: trip.id, country: trip.country, userId })

    // Validate required fields
    if (!trip.country || !trip.startDate || !trip.endDate) {
      throw new Error('Trip must have country, start date, and end date')
    }

    const dbData = tripToDbFormat(trip, userId)

    try {
      if (trip.id && trip.id !== 'new') {
        // Update existing trip - exclude id from update data
        const updateData: VisaEntryUpdate = {
          user_id: userId,
          country: trip.country,
          start_date: trip.startDate ? trip.startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          end_date: trip.endDate ? trip.endDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          entry_type: trip.entry_type || 'schengen',
          notes: trip.notes || null
        }

        // @ts-ignore - Supabase type generation issue with update method
        const { data, error } = await (this.supabase as any)
          .from('visa_entries')
          .update(updateData)
          .eq('id', trip.id)
          .eq('user_id', userId)
          .select()
          .single()

        if (error) {
          console.error('❌ Error updating trip:', error)
          throw error
        }

        console.log('✅ Trip updated successfully:', data)
        return dbToTripFormat(data)
      } else {
        // Insert new trip
        // @ts-ignore - Supabase type generation issue
        const { data, error } = await (this.supabase as any)
          .from('visa_entries')
          .insert(dbData)
          .select()
          .single()

        if (error) {
          console.error('❌ Error inserting trip:', error)
          throw error
        }

        console.log('✅ Trip saved successfully:', data)
        return dbToTripFormat(data)
      }
    } catch (error) {
      console.error('🚨 Database error in saveTrip:', error)
      throw error
    }
  }

  /**
   * Load all trips for a user
   */
  async loadUserTrips(userId: string): Promise<TripData[]> {
    console.log('📥 Loading trips for user:', userId)

    try {
      const { data, error } = await this.supabase
        .from('visa_entries')
        .select('*')
        .eq('user_id', userId)
        .order('start_date', { ascending: false })

      if (error) {
        console.error('❌ Error loading trips:', error)
        throw error
      }

      const trips = data?.map(dbToTripFormat) || []
      console.log(`✅ Loaded ${trips.length} trips for user`)
      return trips
    } catch (error) {
      console.error('🚨 Database error in loadUserTrips:', error)
      throw error
    }
  }

  /**
   * Delete a trip
   */
  async deleteTrip(tripId: string, userId: string): Promise<void> {
    console.log('🗑️ Deleting trip:', tripId)

    try {
      // @ts-ignore - Supabase type generation issue
      const { error } = await (this.supabase as any)
        .from('visa_entries')
        .delete()
        .eq('id', tripId)
        .eq('user_id', userId)

      if (error) {
        console.error('❌ Error deleting trip:', error)
        throw error
      }

      console.log('✅ Trip deleted successfully')
    } catch (error) {
      console.error('🚨 Database error in deleteTrip:', error)
      throw error
    }
  }

  /**
   * Create default trip collection for new users
   */
  async createDefaultCollection(userId: string): Promise<void> {
    console.log('📁 Creating default trip collection for user:', userId)

    try {
      // @ts-ignore - Supabase type generation issue
      const { error } = await (this.supabase as any)
        .from('trip_collections')
        .insert({
          user_id: userId,
          name: 'My Schengen Trips',
          description: 'Default collection for tracking Schengen visa compliance',
          is_default: true
        })

      if (error) {
        // If collection already exists, that's fine
        if (error.code !== '23505') { // unique_violation
          console.error('❌ Error creating default collection:', error)
          throw error
        }
      }

      console.log('✅ Default collection ready')
    } catch (error) {
      console.error('🚨 Database error in createDefaultCollection:', error)
      throw error
    }
  }

  /**
   * Batch save multiple trips (useful for migration)
   */
  async batchSaveTrips(trips: TripData[], userId: string): Promise<TripData[]> {
    console.log(`📦 Batch saving ${trips.length} trips for user:`, userId)

    // Filter out invalid trips
    const validTrips = trips.filter(trip =>
      trip.country && trip.startDate && trip.endDate
    )

    if (validTrips.length === 0) {
      console.log('⚠️ No valid trips to save')
      return []
    }

    try {
      const dbData = validTrips.map(trip => tripToDbFormat(trip, userId))

      // @ts-ignore - Supabase type generation issue
      const { data, error } = await (this.supabase as any)
        .from('visa_entries')
        .insert(dbData)
        .select()

      if (error) {
        console.error('❌ Error batch saving trips:', error)
        throw error
      }

      const savedTrips = data?.map(dbToTripFormat) || []
      console.log(`✅ Batch saved ${savedTrips.length} trips`)
      return savedTrips
    } catch (error) {
      console.error('🚨 Database error in batchSaveTrips:', error)
      throw error
    }
  }
}

// Export singleton instance
export const tripDataService = new TripDataService()