import { Trip } from "@/lib/types/enhanced-calculator"
import { eachDayOfInterval, isValid, parseISO } from "date-fns"

/**
 * Date Overlap Prevention Utilities
 * 
 * These utilities prevent users from selecting dates that are already
 * occupied by existing trips, enforcing the business rule that a person
 * cannot be in two different locations simultaneously.
 */

/**
 * Calculates all occupied dates from existing trips
 * @param trips Array of existing trips
 * @returns Array of Date objects that are already occupied
 */
export function calculateOccupiedDates(trips: Trip[]): Date[] {
  const occupiedDates: Date[] = []
  
  for (const trip of trips) {
    if (!trip.startDate || !trip.endDate) continue
    
    // Handle both Date objects and ISO strings
    const startDate = trip.startDate instanceof Date ? trip.startDate : parseISO(trip.startDate.toString())
    const endDate = trip.endDate instanceof Date ? trip.endDate : parseISO(trip.endDate.toString())
    
    if (!isValid(startDate) || !isValid(endDate)) continue
    
    try {
      // Get all dates in the range (inclusive)
      const datesInRange = eachDayOfInterval({ start: startDate, end: endDate })
      occupiedDates.push(...datesInRange)
    } catch (error) {
      console.warn(`Error calculating dates for trip ${trip.id}:`, error)
      continue
    }
  }
  
  // Remove duplicates and sort
  const uniqueDates = Array.from(
    new Set(occupiedDates.map(date => date.getTime()))
  ).map(time => new Date(time))
  
  return uniqueDates.sort((a, b) => a.getTime() - b.getTime())
}

/**
 * Checks if a date range overlaps with existing trips
 * @param newStart Start date of new trip
 * @param newEnd End date of new trip  
 * @param existingTrips Array of existing trips to check against
 * @returns true if there's an overlap, false otherwise
 */
export function isDateRangeOverlapping(
  newStart: Date,
  newEnd: Date,
  existingTrips: Trip[]
): boolean {
  if (!isValid(newStart) || !isValid(newEnd)) return false
  
  for (const trip of existingTrips) {
    if (!trip.startDate || !trip.endDate) continue
    
    const tripStart = trip.startDate instanceof Date ? trip.startDate : parseISO(trip.startDate.toString())
    const tripEnd = trip.endDate instanceof Date ? trip.endDate : parseISO(trip.endDate.toString())
    
    if (!isValid(tripStart) || !isValid(tripEnd)) continue
    
    // Check for overlap: new range starts before existing ends AND new range ends after existing starts
    if (newStart <= tripEnd && newEnd >= tripStart) {
      return true
    }
  }
  
  return false
}

/**
 * Gets all trips that conflict with a given date range
 * @param newStart Start date of new trip
 * @param newEnd End date of new trip
 * @param existingTrips Array of existing trips to check against
 * @returns Array of conflicting trips
 */
export function getConflictingTrips(
  newStart: Date,
  newEnd: Date,
  existingTrips: Trip[]
): Trip[] {
  if (!isValid(newStart) || !isValid(newEnd)) return []
  
  const conflictingTrips: Trip[] = []
  
  for (const trip of existingTrips) {
    if (!trip.startDate || !trip.endDate) continue
    
    const tripStart = trip.startDate instanceof Date ? trip.startDate : parseISO(trip.startDate.toString())
    const tripEnd = trip.endDate instanceof Date ? trip.endDate : parseISO(trip.endDate.toString())
    
    if (!isValid(tripStart) || !isValid(tripEnd)) continue
    
    // Check for overlap
    if (newStart <= tripEnd && newEnd >= tripStart) {
      conflictingTrips.push(trip)
    }
  }
  
  return conflictingTrips
}

/**
 * Optimized version using memoization for large trip datasets
 * Performance optimization for 100+ trips
 */
const occupiedDatesCache = new Map<string, Date[]>()

export function calculateOccupiedDatesCached(trips: Trip[]): Date[] {
  // Create cache key from trip IDs and dates
  const cacheKey = trips
    .map(t => `${t.id}-${t.startDate?.toString()}-${t.endDate?.toString()}`)
    .sort()
    .join('|')
  
  // Return cached result if available
  if (occupiedDatesCache.has(cacheKey)) {
    return occupiedDatesCache.get(cacheKey)!
  }
  
  // Calculate and cache result
  const occupiedDates = calculateOccupiedDates(trips)
  occupiedDatesCache.set(cacheKey, occupiedDates)
  
  // Limit cache size to prevent memory leaks
  if (occupiedDatesCache.size > 50) {
    const firstKey = occupiedDatesCache.keys().next().value
    occupiedDatesCache.delete(firstKey)
  }
  
  return occupiedDates
}

/**
 * Clear the occupied dates cache
 * Useful when trips are modified
 */
export function clearOccupiedDatesCache(): void {
  occupiedDatesCache.clear()
}

/**
 * Check if a specific date is occupied by any existing trip
 * @param date Date to check
 * @param existingTrips Array of existing trips
 * @returns true if date is occupied, false otherwise
 */
export function isDateOccupied(date: Date, existingTrips: Trip[]): boolean {
  if (!isValid(date)) return false
  
  for (const trip of existingTrips) {
    if (!trip.startDate || !trip.endDate) continue
    
    const tripStart = trip.startDate instanceof Date ? trip.startDate : parseISO(trip.startDate.toString())
    const tripEnd = trip.endDate instanceof Date ? trip.endDate : parseISO(trip.endDate.toString())
    
    if (!isValid(tripStart) || !isValid(tripEnd)) continue
    
    // Check if date falls within trip range (inclusive)
    if (date >= tripStart && date <= tripEnd) {
      return true
    }
  }
  
  return false
}

/**
 * Get trip information for a specific occupied date
 * @param date Date to get info for
 * @param existingTrips Array of existing trips
 * @returns Trip that occupies this date, or null if not occupied
 */
export function getTripForDate(date: Date, existingTrips: Trip[]): Trip | null {
  if (!isValid(date)) return null
  
  for (const trip of existingTrips) {
    if (!trip.startDate || !trip.endDate) continue
    
    const tripStart = trip.startDate instanceof Date ? trip.startDate : parseISO(trip.startDate.toString())
    const tripEnd = trip.endDate instanceof Date ? trip.endDate : parseISO(trip.endDate.toString())
    
    if (!isValid(tripStart) || !isValid(tripEnd)) continue
    
    // Check if date falls within trip range (inclusive)
    if (date >= tripStart && date <= tripEnd) {
      return trip
    }
  }
  
  return null
}