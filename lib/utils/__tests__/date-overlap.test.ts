import { describe, expect, test, beforeEach } from '@jest/globals'
import { 
  calculateOccupiedDates, 
  isDateRangeOverlapping,
  getConflictingTrips,
  calculateOccupiedDatesCached,
  clearOccupiedDatesCache,
  isDateOccupied,
  getTripForDate
} from '../date-overlap'
import type { Trip } from '@/lib/types/enhanced-calculator'

describe('Date Overlap Prevention', () => {
  const createTrip = (
    id: string,
    country: string,
    startDate: string | Date,
    endDate: string | Date,
    days: number = 1
  ): Trip => ({
    id,
    country,
    startDate: typeof startDate === 'string' ? new Date(startDate) : startDate,
    endDate: typeof endDate === 'string' ? new Date(endDate) : endDate,
    days
  })

  beforeEach(() => {
    clearOccupiedDatesCache()
  })

  describe('calculateOccupiedDates', () => {
    test('should return empty array for empty trips', () => {
      const result = calculateOccupiedDates([])
      expect(result).toEqual([])
    })

    test('should calculate occupied dates for single trip', () => {
      const trips = [createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3)]
      const result = calculateOccupiedDates(trips)
      
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual(new Date('2024-01-01'))
      expect(result[1]).toEqual(new Date('2024-01-02'))
      expect(result[2]).toEqual(new Date('2024-01-03'))
    })

    test('should calculate occupied dates for multiple trips', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-02', 2),
        createTrip('2', 'DE', '2024-01-05', '2024-01-06', 2)
      ]
      const result = calculateOccupiedDates(trips)
      
      expect(result).toHaveLength(4)
      expect(result.map(d => d.toISOString().split('T')[0]).sort()).toEqual([
        '2024-01-01', '2024-01-02', '2024-01-05', '2024-01-06'
      ])
    })

    test('should handle overlapping trips correctly', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3),
        createTrip('2', 'DE', '2024-01-02', '2024-01-04', 3)
      ]
      const result = calculateOccupiedDates(trips)
      
      // Should not duplicate dates
      expect(result).toHaveLength(4)
      expect(result.map(d => d.toISOString().split('T')[0]).sort()).toEqual([
        '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'
      ])
    })

    test('should handle trips with null dates', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-02', 2),
        { id: '2', country: 'DE', startDate: null, endDate: null, days: 0 } as Trip
      ]
      const result = calculateOccupiedDates(trips)
      
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(new Date('2024-01-01'))
      expect(result[1]).toEqual(new Date('2024-01-02'))
    })

    test('should handle invalid date strings gracefully', () => {
      const trips = [
        createTrip('1', 'FR', 'invalid-date', '2024-01-02', 2)
      ]
      const result = calculateOccupiedDates(trips)
      
      expect(result).toHaveLength(0)
    })

    test('should sort dates in chronological order', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-05', '2024-01-05', 1),
        createTrip('2', 'DE', '2024-01-01', '2024-01-01', 1),
        createTrip('3', 'IT', '2024-01-03', '2024-01-03', 1)
      ]
      const result = calculateOccupiedDates(trips)
      
      expect(result.map(d => d.toISOString().split('T')[0])).toEqual([
        '2024-01-01', '2024-01-03', '2024-01-05'
      ])
    })
  })

  describe('isDateRangeOverlapping', () => {
    const existingTrips = [
      createTrip('1', 'FR', '2024-01-01', '2024-01-05', 5),
      createTrip('2', 'DE', '2024-01-10', '2024-01-15', 6)
    ]

    test('should return false for non-overlapping ranges', () => {
      const result = isDateRangeOverlapping(
        new Date('2024-01-06'),
        new Date('2024-01-09'),
        existingTrips
      )
      expect(result).toBe(false)
    })

    test('should return true for overlapping ranges', () => {
      const result = isDateRangeOverlapping(
        new Date('2024-01-03'),
        new Date('2024-01-07'),
        existingTrips
      )
      expect(result).toBe(true)
    })

    test('should return true for exact date matches', () => {
      const result = isDateRangeOverlapping(
        new Date('2024-01-01'),
        new Date('2024-01-01'),
        existingTrips
      )
      expect(result).toBe(true)
    })

    test('should return true for ranges that encompass existing trips', () => {
      const result = isDateRangeOverlapping(
        new Date('2023-12-31'),
        new Date('2024-01-20'),
        existingTrips
      )
      expect(result).toBe(true)
    })

    test('should handle invalid dates', () => {
      const result = isDateRangeOverlapping(
        new Date('invalid'),
        new Date('2024-01-01'),
        existingTrips
      )
      expect(result).toBe(false)
    })
  })

  describe('getConflictingTrips', () => {
    const existingTrips = [
      createTrip('1', 'FR', '2024-01-01', '2024-01-05', 5),
      createTrip('2', 'DE', '2024-01-10', '2024-01-15', 6),
      createTrip('3', 'IT', '2024-01-20', '2024-01-25', 6)
    ]

    test('should return empty array for non-overlapping ranges', () => {
      const result = getConflictingTrips(
        new Date('2024-01-06'),
        new Date('2024-01-09'),
        existingTrips
      )
      expect(result).toHaveLength(0)
    })

    test('should return conflicting trips', () => {
      const result = getConflictingTrips(
        new Date('2024-01-03'),
        new Date('2024-01-12'),
        existingTrips
      )
      expect(result).toHaveLength(2)
      expect(result.map(t => t.id)).toEqual(['1', '2'])
    })

    test('should return single conflicting trip', () => {
      const result = getConflictingTrips(
        new Date('2024-01-22'),
        new Date('2024-01-23'),
        existingTrips
      )
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('3')
    })
  })

  describe('calculateOccupiedDatesCached', () => {
    test('should cache results for identical trip sets', () => {
      const trips = [createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3)]
      
      const result1 = calculateOccupiedDatesCached(trips)
      const result2 = calculateOccupiedDatesCached(trips)
      
      // Should return identical objects (cached)
      expect(result1).toBe(result2)
    })

    test('should return different results for different trip sets', () => {
      const trips1 = [createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3)]
      const trips2 = [createTrip('2', 'DE', '2024-01-05', '2024-01-07', 3)]
      
      const result1 = calculateOccupiedDatesCached(trips1)
      const result2 = calculateOccupiedDatesCached(trips2)
      
      expect(result1).not.toBe(result2)
      expect(result1).toHaveLength(3)
      expect(result2).toHaveLength(3)
    })

    test('should clear cache when requested', () => {
      const trips = [createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3)]
      
      const result1 = calculateOccupiedDatesCached(trips)
      clearOccupiedDatesCache()
      const result2 = calculateOccupiedDatesCached(trips)
      
      // Should be different objects after cache clear
      expect(result1).not.toBe(result2)
      expect(result1).toEqual(result2)
    })
  })

  describe('isDateOccupied', () => {
    const existingTrips = [
      createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3),
      createTrip('2', 'DE', '2024-01-10', '2024-01-12', 3)
    ]

    test('should return true for occupied dates', () => {
      expect(isDateOccupied(new Date('2024-01-01'), existingTrips)).toBe(true)
      expect(isDateOccupied(new Date('2024-01-02'), existingTrips)).toBe(true)
      expect(isDateOccupied(new Date('2024-01-03'), existingTrips)).toBe(true)
      expect(isDateOccupied(new Date('2024-01-11'), existingTrips)).toBe(true)
    })

    test('should return false for unoccupied dates', () => {
      expect(isDateOccupied(new Date('2024-01-04'), existingTrips)).toBe(false)
      expect(isDateOccupied(new Date('2024-01-09'), existingTrips)).toBe(false)
      expect(isDateOccupied(new Date('2024-01-13'), existingTrips)).toBe(false)
    })

    test('should handle invalid dates', () => {
      expect(isDateOccupied(new Date('invalid'), existingTrips)).toBe(false)
    })
  })

  describe('getTripForDate', () => {
    const existingTrips = [
      createTrip('1', 'FR', '2024-01-01', '2024-01-03', 3),
      createTrip('2', 'DE', '2024-01-10', '2024-01-12', 3)
    ]

    test('should return correct trip for occupied dates', () => {
      const trip1 = getTripForDate(new Date('2024-01-02'), existingTrips)
      expect(trip1?.id).toBe('1')
      expect(trip1?.country).toBe('FR')

      const trip2 = getTripForDate(new Date('2024-01-11'), existingTrips)
      expect(trip2?.id).toBe('2')
      expect(trip2?.country).toBe('DE')
    })

    test('should return null for unoccupied dates', () => {
      const trip = getTripForDate(new Date('2024-01-05'), existingTrips)
      expect(trip).toBeNull()
    })

    test('should handle edge cases (start and end dates)', () => {
      const startTrip = getTripForDate(new Date('2024-01-01'), existingTrips)
      expect(startTrip?.id).toBe('1')

      const endTrip = getTripForDate(new Date('2024-01-03'), existingTrips)
      expect(endTrip?.id).toBe('1')
    })

    test('should handle invalid dates', () => {
      const trip = getTripForDate(new Date('invalid'), existingTrips)
      expect(trip).toBeNull()
    })
  })

  describe('Edge Cases and Performance', () => {
    test('should handle leap year dates correctly', () => {
      const trips = [createTrip('1', 'FR', '2024-02-28', '2024-03-01', 3)]
      const result = calculateOccupiedDates(trips)
      
      expect(result).toHaveLength(3)
      expect(result.map(d => d.toISOString().split('T')[0])).toEqual([
        '2024-02-28', '2024-02-29', '2024-03-01'
      ])
    })

    test('should handle same-day entry/exit', () => {
      const trips = [createTrip('1', 'FR', '2024-01-01', '2024-01-01', 1)]
      const result = calculateOccupiedDates(trips)
      
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(new Date('2024-01-01'))
    })

    test('should handle large number of trips efficiently', () => {
      const trips: Trip[] = []
      for (let i = 0; i < 100; i++) {
        const startDate = new Date('2024-01-01')
        startDate.setDate(startDate.getDate() + i * 5) // Every 5 days
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 2) // 3-day trips
        
        trips.push(createTrip(`trip-${i}`, 'FR', startDate, endDate, 3))
      }
      
      const startTime = Date.now()
      const result = calculateOccupiedDatesCached(trips)
      const endTime = Date.now()
      
      expect(result.length).toBeGreaterThan(0)
      expect(endTime - startTime).toBeLessThan(50) // Should be under 50ms
    })

    test('should handle timezone boundary conditions', () => {
      // Test with UTC dates to avoid timezone issues
      const utcTrip = createTrip('1', 'FR', new Date('2024-01-01T00:00:00Z'), new Date('2024-01-02T23:59:59Z'), 2)
      const result = calculateOccupiedDates([utcTrip])
      
      expect(result).toHaveLength(2)
    })
  })

  describe('Integration with EU Compliance', () => {
    test('should not interfere with valid Schengen calculations', () => {
      // Create a valid 90-day trip that should not trigger date overlap
      const validTrip = createTrip('1', 'FR', '2024-01-01', '2024-03-30', 89) // 89 days (under 90-day limit)
      const result = calculateOccupiedDates([validTrip])
      
      expect(result).toHaveLength(89)
      expect(isDateOccupied(new Date('2024-01-01'), [validTrip])).toBe(true)
      expect(isDateOccupied(new Date('2024-03-30'), [validTrip])).toBe(true)
      expect(isDateOccupied(new Date('2024-03-31'), [validTrip])).toBe(false)
    })

    test('should work with sequential trips (no overlap)', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-30', 30),
        createTrip('2', 'DE', '2024-02-01', '2024-02-28', 28),
        createTrip('3', 'IT', '2024-03-01', '2024-03-15', 15)
      ]
      
      expect(isDateRangeOverlapping(new Date('2024-01-31'), new Date('2024-01-31'), trips)).toBe(false)
      expect(isDateRangeOverlapping(new Date('2024-01-15'), new Date('2024-01-20'), trips)).toBe(true)
    })
  })
})