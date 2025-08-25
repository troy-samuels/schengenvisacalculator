import { describe, expect, test } from '@jest/globals'
import { TripConflictDetector } from '../trip-conflict-detector'
import type { Trip } from '@/lib/types/enhanced-calculator'

describe('TripConflictDetector - Date Overlap Prevention', () => {
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

  describe('detectDateOverlapConflicts', () => {
    test('should detect no conflicts for non-overlapping trips', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-05', 5),
        createTrip('2', 'DE', '2024-01-10', '2024-01-15', 6),
        createTrip('3', 'IT', '2024-01-20', '2024-01-25', 6)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      
      expect(dateOverlapConflicts).toHaveLength(0)
      expect(result.hasErrors).toBe(false)
    })

    test('should detect conflicts for overlapping trips', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10),
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      
      expect(dateOverlapConflicts).toHaveLength(1)
      expect(dateOverlapConflicts[0].severity).toBe('ERROR')
      expect(dateOverlapConflicts[0].message).toBe('Cannot be in two places at once')
      expect(dateOverlapConflicts[0].tripIds).toEqual(['1', '2'])
    })

    test('should provide detailed overlap information', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10),
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const conflict = result.conflicts.find(c => c.type === 'DATE_OVERLAP')!
      
      expect(conflict.details).toContain('Your trip to FR')
      expect(conflict.details).toContain('overlaps with your trip to DE')
      expect(conflict.details).toContain('6 days') // Jan 5-10 = 6 days overlap
      expect(conflict.suggestedFix).toContain('cannot be in two different countries simultaneously')
    })

    test('should handle multiple overlapping trip pairs', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10),
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11),
        createTrip('3', 'IT', '2024-01-12', '2024-01-20', 9)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      
      expect(dateOverlapConflicts).toHaveLength(2)
      
      // Should detect FR-DE overlap and DE-IT overlap
      const tripPairs = dateOverlapConflicts.map(c => c.tripIds.sort().join('-'))
      expect(tripPairs).toContain('1-2') // FR-DE
      expect(tripPairs).toContain('2-3') // DE-IT
    })

    test('should handle exact same dates (complete overlap)', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-05', 5),
        createTrip('2', 'DE', '2024-01-01', '2024-01-05', 5)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const conflict = result.conflicts.find(c => c.type === 'DATE_OVERLAP')!
      
      expect(conflict).toBeDefined()
      expect(conflict.details).toContain('5 days')
      expect(conflict.affectedDates?.start).toEqual(new Date('2024-01-01'))
      expect(conflict.affectedDates?.end).toEqual(new Date('2024-01-05'))
    })

    test('should handle single day overlap correctly', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-05', 5),
        createTrip('2', 'DE', '2024-01-05', '2024-01-10', 6)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const conflict = result.conflicts.find(c => c.type === 'DATE_OVERLAP')!
      
      expect(conflict).toBeDefined()
      expect(conflict.details).toContain('1 day') // Singular form
      expect(conflict.affectedDates?.start).toEqual(new Date('2024-01-05'))
      expect(conflict.affectedDates?.end).toEqual(new Date('2024-01-05'))
    })

    test('should ignore trips with null dates', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-05', 5),
        { id: '2', country: 'DE', startDate: null, endDate: null, days: 0 } as Trip,
        createTrip('3', 'IT', '2024-01-10', '2024-01-15', 6)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      
      expect(dateOverlapConflicts).toHaveLength(0)
    })

    test('should set correct affected dates for partial overlaps', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10), // Jan 1-10
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11)  // Jan 5-15, overlap is Jan 5-10
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const conflict = result.conflicts.find(c => c.type === 'DATE_OVERLAP')!
      
      expect(conflict.affectedDates?.start).toEqual(new Date('2024-01-05'))
      expect(conflict.affectedDates?.end).toEqual(new Date('2024-01-10'))
    })

    test('should work with trips in different order', () => {
      const trips = [
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11),  // Later trip first
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10)   // Earlier trip second
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const conflict = result.conflicts.find(c => c.type === 'DATE_OVERLAP')!
      
      expect(conflict).toBeDefined()
      expect(conflict.tripIds).toContain('1')
      expect(conflict.tripIds).toContain('2')
    })
  })

  describe('Integration with existing conflict types', () => {
    test('should detect both DATE_OVERLAP and OVERLAPPING_TRIPS for same scenario', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10),
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      const overlappingTripConflicts = result.conflicts.filter(c => c.type === 'OVERLAPPING_TRIPS')
      
      expect(dateOverlapConflicts).toHaveLength(1)
      expect(overlappingTripConflicts).toHaveLength(1)
      
      // Both should reference the same trips
      expect(dateOverlapConflicts[0].tripIds.sort()).toEqual(['1', '2'])
      expect(overlappingTripConflicts[0].tripIds.sort()).toEqual(['1', '2'])
    })

    test('should maintain all existing conflict detection', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10),
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11),
        createTrip('3', 'IT', '2024-02-01', '2024-06-01', 120) // Exceeds 90 days
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      // Should detect date overlap
      expect(result.conflicts.filter(c => c.type === 'DATE_OVERLAP')).toHaveLength(1)
      
      // Should also detect other types of conflicts (90-day violations, etc.)
      expect(result.conflicts.length).toBeGreaterThan(1)
      expect(result.hasErrors).toBe(true)
    })

    test('should provide user-friendly messages distinct from OVERLAPPING_TRIPS', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-01-10', 10),
        createTrip('2', 'DE', '2024-01-05', '2024-01-15', 11)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const dateOverlapConflict = result.conflicts.find(c => c.type === 'DATE_OVERLAP')!
      const overlappingTripConflict = result.conflicts.find(c => c.type === 'OVERLAPPING_TRIPS')!
      
      // Messages should be different and user-focused
      expect(dateOverlapConflict.message).toBe('Cannot be in two places at once')
      expect(overlappingTripConflict.message).toContain('Overlapping trips')
      
      // DATE_OVERLAP should emphasize the impossibility
      expect(dateOverlapConflict.suggestedFix).toContain('cannot be in two different countries simultaneously')
    })
  })

  describe('Performance with large datasets', () => {
    test('should handle 100+ trips efficiently', () => {
      const trips: Trip[] = []
      
      // Create 100 non-overlapping trips
      for (let i = 0; i < 100; i++) {
        const startDate = new Date('2024-01-01')
        startDate.setDate(startDate.getDate() + i * 5) // Every 5 days
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 2) // 3-day trips
        
        trips.push(createTrip(`trip-${i}`, 'FR', startDate, endDate, 3))
      }

      const startTime = Date.now()
      const result = TripConflictDetector.detectAllConflicts(trips)
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeLessThan(50) // Should be under 50ms
      expect(result.conflicts.filter(c => c.type === 'DATE_OVERLAP')).toHaveLength(0)
    })

    test('should detect conflicts efficiently in large overlapping dataset', () => {
      const trips: Trip[] = []
      
      // Create 50 overlapping trips (all overlap with first trip)
      const baseTrip = createTrip('base', 'FR', '2024-01-01', '2024-01-31', 31)
      trips.push(baseTrip)
      
      for (let i = 1; i < 50; i++) {
        const startDate = new Date('2024-01-15') // Overlaps with base trip
        startDate.setDate(startDate.getDate() + i) 
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 5)
        
        trips.push(createTrip(`trip-${i}`, `C${i}`, startDate, endDate, 6))
      }

      const startTime = Date.now()
      const result = TripConflictDetector.detectAllConflicts(trips)
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeLessThan(200) // Should be under 200ms even with many conflicts
      expect(result.conflicts.filter(c => c.type === 'DATE_OVERLAP')).toHaveLength(49) // Base trip overlaps with all others
    })
  })

  describe('Edge cases for EU compliance', () => {
    test('should not prevent valid sequential trips within Schengen rules', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-03-30', 89), // 89 days (valid)
        createTrip('2', 'DE', '2024-07-01', '2024-09-28', 89)  // 89 days, 3 months later (valid)
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      
      expect(dateOverlapConflicts).toHaveLength(0)
      expect(result.hasErrors).toBe(false) // Should not have any errors
    })

    test('should detect conflicts that would violate both overlap and Schengen rules', () => {
      const trips = [
        createTrip('1', 'FR', '2024-01-01', '2024-03-30', 89), // 89 days
        createTrip('2', 'DE', '2024-03-01', '2024-05-29', 90)  // 90 days, overlaps with first trip
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      const dateOverlapConflicts = result.conflicts.filter(c => c.type === 'DATE_OVERLAP')
      
      expect(dateOverlapConflicts).toHaveLength(1)
      expect(result.hasErrors).toBe(true)
      
      // Should also detect other Schengen violations
      expect(result.conflicts.length).toBeGreaterThan(1)
    })
  })
})