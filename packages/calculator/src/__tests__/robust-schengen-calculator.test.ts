// Jest globals are available automatically - no need to import
import { addDays, subDays } from 'date-fns'
import { RobustSchengenCalculator } from '../calculator/robust-schengen-calculator'
import type { Trip } from '../types'

describe('RobustSchengenCalculator', () => {
  let baseDate: Date
  let testTrips: Trip[]

  beforeEach(() => {
    baseDate = new Date('2024-06-15T12:00:00.000Z')
    testTrips = [
      {
        id: '1',
        country: 'France',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-15'),
        days: 15
      },
      {
        id: '2', 
        country: 'Germany',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-20'),
        days: 20
      }
    ]
  })

  describe('calculateExactCompliance', () => {
    it('should calculate compliance for empty trips array', () => {
      const result = RobustSchengenCalculator.calculateExactCompliance([], baseDate)
      
      expect(result.totalDaysUsed).toBe(0)
      expect(result.daysRemaining).toBe(90)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    it('should calculate compliance for simple trip scenario', () => {
      const trips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-10'),
        days: 10
      }]

      const result = RobustSchengenCalculator.calculateExactCompliance(trips, baseDate)
      
      expect(result.totalDaysUsed).toBe(10)
      expect(result.daysRemaining).toBe(80)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    it('should detect compliance violation', () => {
      // Create a scenario that will actually cause violation within the 180-day window
      const trips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: subDays(baseDate, 89), // 90 days before reference
        endDate: baseDate, // Up to reference date
        days: 90
      }, {
        id: '2',
        country: 'Germany',
        startDate: addDays(baseDate, 1), // Day after reference - exceeds limit
        endDate: addDays(baseDate, 1),
        days: 1
      }]

      const result = RobustSchengenCalculator.calculateExactCompliance(trips, addDays(baseDate, 1))
      
      expect(result.totalDaysUsed).toBeGreaterThan(90)
      expect(result.isCompliant).toBe(false)
      expect(result.overstayDays).toBeGreaterThan(0)
    })

    it('should handle multiple trips within compliance', () => {
      const result = RobustSchengenCalculator.calculateExactCompliance(testTrips, baseDate)
      
      // These trips are within different 180-day windows
      expect(result.isCompliant).toBe(true)
      expect(result.totalDaysUsed).toBeGreaterThan(0)
      expect(result.daysRemaining).toBeGreaterThan(0)
    })

    it('should handle edge case: exactly 90 days', () => {
      const trips: Trip[] = [{
        id: '1',
        country: 'Spain',
        startDate: subDays(baseDate, 89),
        endDate: baseDate,
        days: 90
      }]

      const result = RobustSchengenCalculator.calculateExactCompliance(trips, baseDate)
      
      expect(result.totalDaysUsed).toBe(90)
      expect(result.daysRemaining).toBe(0)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    it('should handle invalid input gracefully', () => {
      const result = RobustSchengenCalculator.calculateExactCompliance([] as any, baseDate)
      
      expect(result.totalDaysUsed).toBe(0)
      expect(result.daysRemaining).toBe(90)
      expect(result.isCompliant).toBe(true)
    })
  })

  describe('calculateDaysInWindow', () => {
    it('should calculate days correctly for single trip', () => {
      const trips: Trip[] = [{
        id: '1',
        country: 'Italy',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-10'),
        days: 10
      }]

      const days = RobustSchengenCalculator.calculateDaysInWindow(trips, baseDate)
      expect(days).toBe(10)
    })

    it('should handle trip partially in window', () => {
      const trips: Trip[] = [{
        id: '1',
        country: 'Netherlands',
        startDate: subDays(baseDate, 200), // Outside window
        endDate: subDays(baseDate, 170),   // Partially in window
        days: 31
      }]

      const days = RobustSchengenCalculator.calculateDaysInWindow(trips, baseDate)
      expect(days).toBe(10) // Only days within 180-day window
    })

    it('should return 0 for trips outside window', () => {
      const trips: Trip[] = [{
        id: '1',
        country: 'Belgium',
        startDate: subDays(baseDate, 300),
        endDate: subDays(baseDate, 250),
        days: 51
      }]

      const days = RobustSchengenCalculator.calculateDaysInWindow(trips, baseDate)
      expect(days).toBe(0)
    })
  })

  describe('validatePlannedTrip', () => {
    it('should validate non-conflicting planned trip', () => {
      const plannedTrip: Trip = {
        id: 'planned',
        country: 'Austria',
        startDate: addDays(baseDate, 30),
        endDate: addDays(baseDate, 40),
        days: 11
      }

      const validation = RobustSchengenCalculator.validatePlannedTrip(testTrips, plannedTrip)
      
      expect(validation.isValid).toBe(true)
      expect(validation.violationDays).toBe(0)
      expect(validation.violationDate).toBeNull()
    })

    it('should detect conflicting planned trip', () => {
      const plannedTrip: Trip = {
        id: 'planned',
        country: 'Portugal',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-15'), // Excessive duration
        days: 166
      }

      const validation = RobustSchengenCalculator.validatePlannedTrip([], plannedTrip)
      
      expect(validation.isValid).toBe(false)
      expect(validation.violationDays).toBeGreaterThan(0)
      expect(validation.violationDate).not.toBeNull()
    })
  })

  describe('findLatestValidStartDate', () => {
    it('should find valid start date for short trip', () => {
      const earliestStart = new Date('2024-07-01')
      const latestStart = new Date('2024-07-31')
      
      const validDate = RobustSchengenCalculator.findLatestValidStartDate(
        testTrips,
        10, // 10-day trip
        earliestStart,
        latestStart
      )

      expect(validDate).not.toBeNull()
      expect(validDate).toBeInstanceOf(Date)
      if (validDate) {
        expect(validDate.getTime()).toBeGreaterThanOrEqual(earliestStart.getTime())
        expect(validDate.getTime()).toBeLessThanOrEqual(latestStart.getTime())
      }
    })

    it('should return null when no valid date exists', () => {
      const earliestStart = new Date('2024-01-01')
      const latestStart = new Date('2024-01-01')
      
      const validDate = RobustSchengenCalculator.findLatestValidStartDate(
        testTrips,
        100, // Impossible 100-day trip
        earliestStart,
        latestStart
      )

      expect(validDate).toBeNull()
    })
  })

  describe('calculateMaxConsecutiveDays', () => {
    it('should calculate max consecutive days from clean start', () => {
      const startDate = addDays(baseDate, 90) // Well after existing trips
      
      const maxDays = RobustSchengenCalculator.calculateMaxConsecutiveDays(testTrips, startDate)
      
      expect(maxDays).toBeGreaterThan(0)
      expect(maxDays).toBeLessThanOrEqual(90)
    })

    it('should return 0 when no days available', () => {
      // Create scenario where 90 days are already used
      const heavyTrips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: subDays(baseDate, 89),
        endDate: baseDate,
        days: 90
      }]

      const maxDays = RobustSchengenCalculator.calculateMaxConsecutiveDays(
        heavyTrips,
        addDays(baseDate, 1)
      )
      
      expect(maxDays).toBe(0)
    })
  })

  describe('validateTrips', () => {
    it('should pass validation for valid trips', () => {
      const validationResult = RobustSchengenCalculator.validateTrips(testTrips)
      
      expect(validationResult.isValid).toBe(true)
      expect(validationResult.errors).toHaveLength(0)
    })

    it('should detect missing required fields', () => {
      const invalidTrips: Trip[] = [{
        id: '',
        country: '',
        startDate: null as any,
        endDate: null as any,
        days: 0
      }]

      const validationResult = RobustSchengenCalculator.validateTrips(invalidTrips)
      
      expect(validationResult.isValid).toBe(false)
      expect(validationResult.errors.length).toBeGreaterThan(0)
    })

    it('should detect invalid date ranges', () => {
      const invalidTrips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: new Date('2024-06-15'),
        endDate: new Date('2024-06-01'), // End before start
        days: -14
      }]

      const validationResult = RobustSchengenCalculator.validateTrips(invalidTrips)
      
      expect(validationResult.isValid).toBe(false)
      expect(validationResult.errors.some(e => e.field === 'dates')).toBe(true)
    })

    it('should detect duplicate IDs', () => {
      const duplicateTrips: Trip[] = [
        {
          id: '1',
          country: 'France', 
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-01-10'),
          days: 10
        },
        {
          id: '1', // Duplicate ID
          country: 'Germany',
          startDate: new Date('2024-02-01'), 
          endDate: new Date('2024-02-10'),
          days: 10
        }
      ]

      const validationResult = RobustSchengenCalculator.validateTrips(duplicateTrips)
      
      expect(validationResult.isValid).toBe(false)
      expect(validationResult.errors.some(e => e.field === 'id' && e.message.includes('Duplicate'))).toBe(true)
    })

    it('should detect excessive trip duration', () => {
      const longTrips: Trip[] = [{
        id: '1',
        country: 'Spain',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'), // 365 days - exceeds 90 day limit
        days: 365
      }]

      const validationResult = RobustSchengenCalculator.validateTrips(longTrips)
      
      expect(validationResult.isValid).toBe(false)
      expect(validationResult.errors.some(e => e.field === 'duration')).toBe(true)
    })

    it('should warn about overlapping trips', () => {
      const overlappingTrips: Trip[] = [
        {
          id: '1',
          country: 'France',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-06-10'), 
          days: 10
        },
        {
          id: '2',
          country: 'Germany',
          startDate: new Date('2024-06-05'), // Overlaps with first trip
          endDate: new Date('2024-06-15'),
          days: 11
        }
      ]

      const validationResult = RobustSchengenCalculator.validateTrips(overlappingTrips)
      
      expect(validationResult.isValid).toBe(true) // Overlaps are warnings, not errors
      expect(validationResult.warnings.length).toBeGreaterThan(0)
      expect(validationResult.warnings.some(w => w.message.includes('overlaps'))).toBe(true)
    })
  })

  describe('getNextResetDate', () => {
    it('should calculate next reset date correctly', () => {
      const resetDate = RobustSchengenCalculator.getNextResetDate(testTrips, baseDate)
      
      if (resetDate) {
        expect(resetDate).toBeInstanceOf(Date)
        expect(resetDate.getTime()).toBeGreaterThan(baseDate.getTime())
      }
    })

    it('should return null when no reset needed', () => {
      const resetDate = RobustSchengenCalculator.getNextResetDate([], baseDate)
      expect(resetDate).toBeNull()
    })
  })

  describe('debugRollingWindow', () => {
    it('should return debug information', () => {
      const debug = RobustSchengenCalculator.debugRollingWindow(testTrips, baseDate)
      
      expect(debug).toHaveProperty('summary')
      expect(debug).toHaveProperty('tripsInPeriod') 
      expect(debug).toHaveProperty('dailyBreakdown')
      expect(debug).toHaveProperty('violations')
      expect(debug).toHaveProperty('nextResetDate')
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle leap year scenarios', () => {
      const leapYearDate = new Date('2024-02-29') // 2024 is a leap year
      const trips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: new Date('2024-02-28'),
        endDate: new Date('2024-03-01'),
        days: 3
      }]

      const result = RobustSchengenCalculator.calculateExactCompliance(trips, leapYearDate)
      expect(result).toBeDefined()
      expect(result.isCompliant).toBe(true)
    })

    it('should handle timezone edge cases', () => {
      const utcDate = new Date('2024-06-15T00:00:00.000Z')
      const localDate = new Date('2024-06-16T00:00:00.000Z') // Different day to test normalization
      
      const trips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: utcDate,
        endDate: utcDate, // Same day trip
        days: 1
      }]

      const result1 = RobustSchengenCalculator.calculateExactCompliance(trips, utcDate)
      const result2 = RobustSchengenCalculator.calculateExactCompliance(trips, localDate)
      
      // Results should be consistent for same-day calculations
      expect(result1.totalDaysUsed).toBe(1)
      expect(result2.totalDaysUsed).toBe(1) // Both should see the 1-day trip
    })

    it('should handle very old dates', () => {
      const oldDate = new Date('2000-01-01')
      const trips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: oldDate,
        endDate: addDays(oldDate, 10),
        days: 11
      }]

      const result = RobustSchengenCalculator.calculateExactCompliance(trips, baseDate)
      
      // Old trips should not affect current calculations
      expect(result.totalDaysUsed).toBe(0)
      expect(result.isCompliant).toBe(true)
    })

    it('should handle invalid reference dates', () => {
      const invalidDate = new Date('invalid')
      
      const result = RobustSchengenCalculator.calculateExactCompliance(testTrips, invalidDate)
      
      // Should return safe fallback
      expect(result.totalDaysUsed).toBe(0)
      expect(result.daysRemaining).toBe(90)
      expect(result.isCompliant).toBe(true)
    })
  })
})