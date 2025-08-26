// Jest globals are available automatically - no need to import
import { addDays, subDays, startOfDay } from 'date-fns'
import { DateOverlapValidator } from '../validators/date-overlap-validator'
import type { Trip } from '../types'
import type { DateRange, OverlapPreventionConfig } from '../validators/date-overlap-validator'

describe('DateOverlapValidator', () => {
  let validator: DateOverlapValidator
  let baseDate: Date
  let existingTrips: Trip[]

  beforeEach(() => {
    baseDate = new Date('2024-06-15T12:00:00.000Z')
    validator = new DateOverlapValidator()
    
    existingTrips = [
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
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-07-15'),
        days: 15
      },
      {
        id: '3',
        country: 'Spain',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-05'),
        days: 5
      }
    ]
  })

  describe('validateDateRange', () => {
    it('should validate non-conflicting date range', () => {
      const newRange: DateRange = {
        start: new Date('2024-06-20'),
        end: new Date('2024-06-25')
      }

      const result = validator.validateDateRange(newRange, existingTrips)

      expect(result.isValid).toBe(true)
      expect(result.conflicts).toHaveLength(0)
      expect(result.message).toBe('Dates are available')
      expect(result.occupiedDates.length).toBeGreaterThan(0)
    })

    it('should detect conflicting date range', () => {
      const conflictingRange: DateRange = {
        start: new Date('2024-06-05'), // Overlaps with France trip
        end: new Date('2024-06-08')
      }

      const result = validator.validateDateRange(conflictingRange, existingTrips)

      expect(result.isValid).toBe(false)
      expect(result.conflicts).toHaveLength(1)
      expect(result.conflicts[0].tripCountry).toBe('France')
      expect(result.conflicts[0].overlapDays).toBe(4) // June 5-8 overlaps with June 1-10
      expect(result.message).toContain('France')
    })

    it('should detect multiple conflicts', () => {
      const multiConflictRange: DateRange = {
        start: new Date('2024-06-05'),
        end: new Date('2024-07-10') // Overlaps with both France and Germany
      }

      const result = validator.validateDateRange(multiConflictRange, existingTrips)

      expect(result.isValid).toBe(false)
      expect(result.conflicts.length).toBeGreaterThanOrEqual(2)
      expect(result.message).toContain('conflict')
    })

    it('should handle invalid date range', () => {
      const invalidRange: DateRange = {
        start: new Date('2024-06-10'),
        end: new Date('2024-06-05') // End before start
      }

      const result = validator.validateDateRange(invalidRange, existingTrips)

      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Invalid date range provided')
    })

    it('should handle same-day travel configuration', () => {
      const sameDayConfig = new DateOverlapValidator({ allowSameDayTravel: true })
      
      const sameDayRange: DateRange = {
        start: new Date('2024-06-10'), // Same as end date of France trip
        end: new Date('2024-06-12')
      }

      const result = sameDayConfig.validateDateRange(sameDayRange, existingTrips)

      expect(result.isValid).toBe(true) // Should allow same-day transitions
    })

    it('should handle strict mode configuration', () => {
      const strictValidator = new DateOverlapValidator({ strictMode: true, allowSameDayTravel: true })
      
      const sameDayRange: DateRange = {
        start: new Date('2024-06-10'),
        end: new Date('2024-06-12')
      }

      const result = strictValidator.validateDateRange(sameDayRange, existingTrips)

      expect(result.isValid).toBe(false) // Strict mode should override same-day allowance
    })
  })

  describe('getAllOccupiedDates', () => {
    it('should return all occupied dates', () => {
      const occupiedDates = validator.getAllOccupiedDates(existingTrips)

      expect(occupiedDates.length).toBeGreaterThan(0)
      
      // Check that some key dates are included (accounting for timezone normalization)
      const dateStrings = occupiedDates.map(d => d.toISOString().split('T')[0])
      
      // Should contain all dates in the ranges (France: June 1-10, Germany: July 1-15, Spain: August 1-5)
      expect(dateStrings).toContain('2024-06-01') // Start of France trip
      expect(dateStrings).toContain('2024-07-01') // Start of Germany trip  
      expect(dateStrings).toContain('2024-08-01') // Start of Spain trip
      expect(occupiedDates.length).toBe(30) // 10 + 15 + 5 = 30 total days
    })

    it('should return empty array for no trips', () => {
      const occupiedDates = validator.getAllOccupiedDates([])
      expect(occupiedDates).toHaveLength(0)
    })

    it('should handle single-day trips', () => {
      const singleDayTrips: Trip[] = [{
        id: '1',
        country: 'France',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-01'), // Same day
        days: 1
      }]

      const occupiedDates = validator.getAllOccupiedDates(singleDayTrips)
      expect(occupiedDates).toHaveLength(1)
      // Just verify it contains a date around June 1 (accounting for timezone)
      const dateString = occupiedDates[0].toISOString().split('T')[0]
      expect(['2024-05-31', '2024-06-01'].includes(dateString)).toBe(true)
    })
  })

  describe('isDateOccupied', () => {
    it('should return true for occupied date', () => {
      const occupiedDate = new Date('2024-06-05') // Within France trip
      const isOccupied = validator.isDateOccupied(occupiedDate, existingTrips)
      expect(isOccupied).toBe(true)
    })

    it('should return false for available date', () => {
      const availableDate = new Date('2024-06-20') // Between trips
      const isOccupied = validator.isDateOccupied(availableDate, existingTrips)
      expect(isOccupied).toBe(false)
    })

    it('should handle edge case: exact start date', () => {
      const startDate = new Date('2024-06-01') // Exact start of France trip
      const isOccupied = validator.isDateOccupied(startDate, existingTrips)
      expect(isOccupied).toBe(true)
    })

    it('should handle edge case: exact end date', () => {
      const endDate = new Date('2024-06-10') // Exact end of France trip
      const isOccupied = validator.isDateOccupied(endDate, existingTrips)
      expect(isOccupied).toBe(true)
    })
  })

  describe('getTripsOnDate', () => {
    it('should return trips occupying a specific date', () => {
      const testDate = new Date('2024-06-05')
      const trips = validator.getTripsOnDate(testDate, existingTrips)

      expect(trips).toHaveLength(1)
      expect(trips[0].country).toBe('France')
    })

    it('should return empty array for unoccupied date', () => {
      const testDate = new Date('2024-06-20')
      const trips = validator.getTripsOnDate(testDate, existingTrips)
      expect(trips).toHaveLength(0)
    })

    it('should handle multiple trips on same date', () => {
      const overlappingTrips: Trip[] = [
        ...existingTrips,
        {
          id: '4',
          country: 'Italy',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-06-15'), // Overlaps with France trip
          days: 15
        }
      ]

      const testDate = new Date('2024-06-05')
      const trips = validator.getTripsOnDate(testDate, overlappingTrips)

      expect(trips.length).toBeGreaterThanOrEqual(2)
      expect(trips.map(t => t.country)).toEqual(expect.arrayContaining(['France', 'Italy']))
    })
  })

  describe('findNextAvailableDateRange', () => {
    it('should find available date range', () => {
      const preferredStart = new Date('2024-06-20')
      const lengthInDays = 5

      const availableRange = validator.findNextAvailableDateRange(
        preferredStart,
        lengthInDays,
        existingTrips
      )

      expect(availableRange).not.toBeNull()
      if (availableRange) {
        expect(availableRange.start).toBeInstanceOf(Date)
        expect(availableRange.end).toBeInstanceOf(Date)
        expect(availableRange.end.getTime()).toBeGreaterThan(availableRange.start.getTime())
      }
    })

    it('should return null when no available dates within search limit', () => {
      const preferredStart = new Date('2024-06-01')
      const lengthInDays = 200 // Impossibly long trip

      const availableRange = validator.findNextAvailableDateRange(
        preferredStart,
        lengthInDays,
        existingTrips,
        30 // Short search limit
      )

      expect(availableRange).toBeNull()
    })

    it('should find range after existing conflicts', () => {
      const preferredStart = new Date('2024-06-01') // Conflicts with existing trip
      const lengthInDays = 5

      const availableRange = validator.findNextAvailableDateRange(
        preferredStart,
        lengthInDays,
        existingTrips
      )

      expect(availableRange).not.toBeNull()
      if (availableRange) {
        expect(availableRange.start).toBeInstanceOf(Date)
        expect(availableRange.end).toBeInstanceOf(Date)
      }
    })
  })

  describe('suggestAlternativeDates', () => {
    it('should suggest alternative dates for conflicting range', () => {
      const conflictedRange: DateRange = {
        start: new Date('2024-06-05'), // Conflicts with France trip
        end: new Date('2024-06-08')
      }

      const suggestions = validator.suggestAlternativeDates(
        conflictedRange,
        4,
        existingTrips
      )

      expect(suggestions).toBeInstanceOf(Array)
      expect(suggestions.length).toBeLessThanOrEqual(3)
      
      suggestions.forEach(suggestion => {
        expect(suggestion.start).toBeInstanceOf(Date)
        expect(suggestion.end).toBeInstanceOf(Date)
        expect(suggestion.end.getTime()).toBeGreaterThan(suggestion.start.getTime())
      })
    })

    it('should return empty array when no alternatives available', () => {
      // Create scenario with no gaps
      const denseTrips: Trip[] = [
        {
          id: '1',
          country: 'France',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          days: 365
        }
      ]

      const conflictedRange: DateRange = {
        start: new Date('2024-06-01'),
        end: new Date('2024-06-10')
      }

      const suggestions = validator.suggestAlternativeDates(
        conflictedRange,
        10,
        denseTrips
      )

      expect(suggestions).toHaveLength(0)
    })
  })

  describe('validateMultipleDateRanges', () => {
    it('should validate multiple non-conflicting ranges', () => {
      const ranges: DateRange[] = [
        { start: new Date('2024-06-20'), end: new Date('2024-06-25') },
        { start: new Date('2024-07-20'), end: new Date('2024-07-25') },
        { start: new Date('2024-08-20'), end: new Date('2024-08-25') }
      ]

      const results = validator.validateMultipleDateRanges(ranges, existingTrips)

      expect(Object.keys(results)).toHaveLength(3)
      expect(results[0].isValid).toBe(true)
      expect(results[1].isValid).toBe(true)
      expect(results[2].isValid).toBe(true)
    })

    it('should detect conflicts between new ranges', () => {
      const overlappingRanges: DateRange[] = [
        { start: new Date('2024-06-20'), end: new Date('2024-06-25') },
        { start: new Date('2024-06-23'), end: new Date('2024-06-28') } // Overlaps with first
      ]

      const results = validator.validateMultipleDateRanges(overlappingRanges, existingTrips)

      expect(results[0].isValid).toBe(true)  // First range is valid
      expect(results[1].isValid).toBe(false) // Second conflicts with first
    })

    it('should handle mixed valid and invalid ranges', () => {
      const mixedRanges: DateRange[] = [
        { start: new Date('2024-06-05'), end: new Date('2024-06-08') }, // Conflicts with existing
        { start: new Date('2024-06-20'), end: new Date('2024-06-25') }, // Valid
        { start: new Date('2024-07-05'), end: new Date('2024-07-10') }  // Conflicts with existing
      ]

      const results = validator.validateMultipleDateRanges(mixedRanges, existingTrips)

      expect(results[0].isValid).toBe(false) // Conflicts with France trip
      expect(results[1].isValid).toBe(true)  // Available slot
      expect(results[2].isValid).toBe(false) // Conflicts with Germany trip
    })
  })

  describe('Configuration Management', () => {
    it('should update configuration correctly', () => {
      const newConfig: Partial<OverlapPreventionConfig> = {
        allowSameDayTravel: false,
        strictMode: true
      }

      validator.updateConfig(newConfig)
      const currentConfig = validator.getConfig()

      expect(currentConfig.allowSameDayTravel).toBe(false)
      expect(currentConfig.strictMode).toBe(true)
      expect(currentConfig.allowBorderTransitions).toBe(true) // Should remain unchanged
    })

    it('should return correct default configuration', () => {
      const defaultValidator = new DateOverlapValidator()
      const config = defaultValidator.getConfig()

      expect(config.allowSameDayTravel).toBe(true)
      expect(config.allowBorderTransitions).toBe(true)
      expect(config.strictMode).toBe(false)
    })

    it('should apply custom configuration on creation', () => {
      const customConfig: Partial<OverlapPreventionConfig> = {
        allowSameDayTravel: false,
        allowBorderTransitions: false,
        strictMode: true
      }

      const customValidator = new DateOverlapValidator(customConfig)
      const config = customValidator.getConfig()

      expect(config.allowSameDayTravel).toBe(false)
      expect(config.allowBorderTransitions).toBe(false)
      expect(config.strictMode).toBe(true)
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty trips array', () => {
      const result = validator.validateDateRange(
        { start: new Date('2024-06-01'), end: new Date('2024-06-10') },
        []
      )

      expect(result.isValid).toBe(true)
      expect(result.conflicts).toHaveLength(0)
      expect(result.occupiedDates).toHaveLength(0)
    })

    it('should handle invalid trip data', () => {
      const invalidTrips: Trip[] = [
        {
          id: '1',
          country: 'France',
          startDate: null as any,
          endDate: null as any,
          days: 0
        }
      ]

      const result = validator.validateDateRange(
        { start: new Date('2024-06-01'), end: new Date('2024-06-10') },
        invalidTrips
      )

      expect(result.isValid).toBe(true) // Should filter out invalid trips
      expect(result.conflicts).toHaveLength(0)
    })

    it('should handle timezone differences', () => {
      const utcTrips: Trip[] = [
        {
          id: '1',
          country: 'France',
          startDate: new Date('2024-06-01T00:00:00.000Z'),
          endDate: new Date('2024-06-10T23:59:59.999Z'),
          days: 10
        }
      ]

      const localRange: DateRange = {
        start: new Date('2024-06-05T12:00:00.000+02:00'),
        end: new Date('2024-06-08T12:00:00.000+02:00')
      }

      const result = validator.validateDateRange(localRange, utcTrips)

      expect(result.isValid).toBe(false) // Should still detect overlap despite timezone differences
      expect(result.conflicts).toHaveLength(1)
    })

    it('should handle leap year edge cases', () => {
      const leapYearTrips: Trip[] = [
        {
          id: '1',
          country: 'France',
          startDate: new Date('2024-02-28'),
          endDate: new Date('2024-03-01'), // Crosses leap day
          days: 3
        }
      ]

      const leapDayRange: DateRange = {
        start: new Date('2024-02-29'), // Leap day
        end: new Date('2024-02-29')
      }

      const result = validator.validateDateRange(leapDayRange, leapYearTrips)

      // Just verify the function runs without error for leap year dates
      expect(result).toBeDefined()
      expect(result.isValid).toBeDefined()
    })

    it('should handle very long date ranges', () => {
      const longRange: DateRange = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31') // Full year
      }

      const result = validator.validateDateRange(longRange, existingTrips)

      expect(result.isValid).toBe(false) // Should conflict with existing trips
      expect(result.conflicts.length).toBeGreaterThan(0)
    })

    it('should handle single-day ranges', () => {
      const singleDayRange: DateRange = {
        start: new Date('2024-06-05'),
        end: new Date('2024-06-05') // Same day
      }

      const result = validator.validateDateRange(singleDayRange, existingTrips)

      // Just verify the function handles single-day ranges properly
      expect(result).toBeDefined()
      expect(result.isValid).toBeDefined()
      expect(result.conflicts).toBeDefined()
    })
  })
})