import { RobustSchengenCalculator, Trip } from '../robust-schengen-calculator'
import { addDays, subDays, startOfDay } from 'date-fns'

describe('RobustSchengenCalculator', () => {
  const today = startOfDay(new Date('2024-01-15'))

  const createTrip = (
    id: string,
    country: string,
    startOffset: number,
    duration: number
  ): Trip => {
    const startDate = addDays(today, startOffset)
    const endDate = addDays(startDate, duration - 1)
    return {
      id,
      country,
      startDate,
      endDate,
      days: duration
    }
  }

  describe('Basic rolling window compliance', () => {
    test('should handle empty trips', () => {
      const result = RobustSchengenCalculator.calculateExactCompliance([], today)
      
      expect(result.totalDaysUsed).toBe(0)
      expect(result.daysRemaining).toBe(90)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    test('should calculate single trip correctly', () => {
      const trips = [createTrip('1', 'FR', -10, 7)] // 7 days, ending 4 days ago
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.totalDaysUsed).toBe(7)
      expect(result.daysRemaining).toBe(83)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    test('should handle trip ending today', () => {
      const trips = [createTrip('1', 'FR', -6, 7)] // 7 days, ending today
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.totalDaysUsed).toBe(7)
      expect(result.daysRemaining).toBe(83)
      expect(result.isCompliant).toBe(true)
    })

    test('should exclude trips outside 180-day window', () => {
      const trips = [
        createTrip('1', 'FR', -190, 7), // Outside window
        createTrip('2', 'DE', -10, 5)   // Inside window
      ]
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.totalDaysUsed).toBe(5)
      expect(result.daysRemaining).toBe(85)
    })
  })

  describe('Rolling window edge cases', () => {
    test('should handle exact 90-day usage', () => {
      const trips = [createTrip('1', 'FR', -100, 90)]
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.totalDaysUsed).toBe(90)
      expect(result.daysRemaining).toBe(0)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    test('should detect overstay by 1 day', () => {
      const trips = [createTrip('1', 'FR', -100, 91)]
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.totalDaysUsed).toBe(91)
      expect(result.daysRemaining).toBe(0)
      expect(result.isCompliant).toBe(false)
      expect(result.overstayDays).toBe(1)
    })

    test('should handle overlapping trips on same days', () => {
      const trips = [
        createTrip('1', 'FR', -10, 5),
        createTrip('2', 'DE', -8, 5) // Overlaps by 3 days
      ]
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      // Total unique days should be 7 (not 10)
      expect(result.totalDaysUsed).toBe(7)
      expect(result.daysRemaining).toBe(83)
    })
  })

  describe('Exact rolling window calculation', () => {
    test('should properly calculate 180-day rolling window', () => {
      // Trip 1: 45 days ending 100 days ago
      // Trip 2: 46 days ending today
      // Total in current window should be exactly 90 days (edge case)
      const trip1End = subDays(today, 100)
      const trip1Start = subDays(trip1End, 44)
      const trip2End = today
      const trip2Start = subDays(trip2End, 45)

      const trips: Trip[] = [
        {
          id: '1',
          country: 'FR',
          startDate: trip1Start,
          endDate: trip1End,
          days: 45
        },
        {
          id: '2',
          country: 'DE',
          startDate: trip2Start,
          endDate: trip2End,
          days: 46
        }
      ]

      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      // Should be exactly on the limit
      expect(result.totalDaysUsed).toBe(90)
      expect(result.isCompliant).toBe(true)
      expect(result.overstayDays).toBe(0)
    })

    test('should detect violation in middle of long trip', () => {
      // 120-day trip that violates in the middle
      const trips = [createTrip('1', 'FR', -119, 120)]
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.isCompliant).toBe(false)
      expect(result.overstayDays).toBe(30) // 120 - 90 = 30 days overstay
    })
  })

  describe('Planned trip validation', () => {
    test('should validate safe planned trip', () => {
      const existingTrips = [createTrip('1', 'FR', -100, 30)]
      const plannedTrip = createTrip('2', 'DE', 10, 30)
      
      const validation = RobustSchengenCalculator.validatePlannedTrip(
        existingTrips,
        plannedTrip
      )
      
      expect(validation.isValid).toBe(true)
      expect(validation.violationDays).toBe(0)
      expect(validation.violationDate).toBeNull()
    })

    test('should detect planned trip violation', () => {
      const existingTrips = [createTrip('1', 'FR', -100, 70)]
      const plannedTrip = createTrip('2', 'DE', 10, 30) // Would total 100 days
      
      const validation = RobustSchengenCalculator.validatePlannedTrip(
        existingTrips,
        plannedTrip
      )
      
      expect(validation.isValid).toBe(false)
      expect(validation.violationDays).toBe(10) // 100 - 90 = 10
      expect(validation.violationDate).toBeDefined()
    })
  })

  describe('Maximum consecutive days calculation', () => {
    test('should calculate max days with no existing trips', () => {
      const maxDays = RobustSchengenCalculator.calculateMaxConsecutiveDays([], today)
      expect(maxDays).toBe(90)
    })

    test('should calculate max days with existing usage', () => {
      const existingTrips = [createTrip('1', 'FR', -100, 30)]
      const maxDays = RobustSchengenCalculator.calculateMaxConsecutiveDays(
        existingTrips,
        addDays(today, 10)
      )
      
      expect(maxDays).toBe(60) // 90 - 30 = 60 days available
    })

    test('should handle complex scenarios with multiple trips', () => {
      const existingTrips = [
        createTrip('1', 'FR', -150, 20),
        createTrip('2', 'DE', -100, 15),
        createTrip('3', 'IT', -50, 10)
      ]
      
      const maxDays = RobustSchengenCalculator.calculateMaxConsecutiveDays(
        existingTrips,
        addDays(today, 30)
      )
      
      // Should account for rolling window effects
      expect(maxDays).toBeGreaterThan(0)
      expect(maxDays).toBeLessThanOrEqual(90)
    })
  })

  describe('Date boundary handling', () => {
    test('should handle leap year correctly', () => {
      const leapYearDate = new Date('2024-02-29')
      const trips = [createTrip('1', 'FR', 0, 30)]
      
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, leapYearDate)
      expect(result.totalDaysUsed).toBe(30)
    })

    test('should handle year boundaries', () => {
      const yearEnd = new Date('2023-12-31')
      const trips = [
        {
          id: '1',
          country: 'FR',
          startDate: new Date('2023-12-20'),
          endDate: new Date('2024-01-10'),
          days: 22
        }
      ]
      
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, yearEnd)
      expect(result.totalDaysUsed).toBe(12) // Only days up to year end
    })
  })

  describe('Next reset date calculation', () => {
    test('should calculate next reset date correctly', () => {
      const trips = [createTrip('1', 'FR', -100, 30)]
      const resetDate = RobustSchengenCalculator.getNextResetDate(trips, today)
      
      expect(resetDate).toBeDefined()
      if (resetDate) {
        const daysDiff = Math.abs(
          resetDate.getTime() - addDays(trips[0].startDate, 180).getTime()
        ) / (1000 * 60 * 60 * 24)
        expect(daysDiff).toBeLessThan(1) // Should be within 1 day
      }
    })

    test('should return null for no relevant trips', () => {
      const resetDate = RobustSchengenCalculator.getNextResetDate([], today)
      expect(resetDate).toBeNull()
    })
  })

  describe('Debug and visualization', () => {
    test('should provide detailed debug information', () => {
      const trips = [
        createTrip('1', 'FR', -50, 20),
        createTrip('2', 'DE', -20, 15)
      ]
      
      const debug = RobustSchengenCalculator.debugRollingWindow(trips, today)
      
      expect(debug.summary).toBeDefined()
      expect(debug.tripsInPeriod).toHaveLength(2)
      expect(debug.dailyBreakdown).toBeDefined()
      expect(debug.violations).toBeDefined()
      expect(debug.nextResetDate).toBeDefined()
    })
  })

  describe('Edge cases and stress tests', () => {
    test('should handle many short trips', () => {
      const trips = Array.from({ length: 45 }, (_, i) =>
        createTrip(`trip-${i}`, 'FR', -180 + i * 4, 2)
      )
      
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      expect(result.totalDaysUsed).toBe(90) // 45 trips * 2 days = 90
      expect(result.isCompliant).toBe(true)
    })

    test('should handle single very long trip', () => {
      const trips = [createTrip('1', 'FR', -179, 180)]
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.isCompliant).toBe(false)
      expect(result.overstayDays).toBe(90) // 180 - 90 = 90 days overstay
    })

    test('should handle trips with same start/end date', () => {
      const trips = [createTrip('1', 'FR', -10, 1)] // Single day trip
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, today)
      
      expect(result.totalDaysUsed).toBe(1)
      expect(result.daysRemaining).toBe(89)
    })
  })
})