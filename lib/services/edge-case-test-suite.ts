import { RobustSchengenCalculator, Trip } from './robust-schengen-calculator'
import { addDays, subDays, startOfDay, format, isLeapYear, parseISO } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime, format as formatTz } from 'date-fns-tz'

/**
 * Comprehensive Edge Case Test Suite for Schengen Calculator
 * 
 * Tests handling of:
 * - Leap years and February 29th
 * - Timezone considerations and DST transitions
 * - Date boundary conditions
 * - Cross-year calculations
 * - Extreme date ranges
 */
export class EdgeCaseTestSuite {
  
  /**
   * Run all edge case tests
   */
  static runAllEdgeCaseTests(): EdgeCaseTestResult {
    const results: EdgeCaseTestResult[] = []
    
    // Leap year tests
    results.push(...this.testLeapYearScenarios())
    
    // Timezone tests
    results.push(...this.testTimezoneScenarios())
    
    // Date boundary tests
    results.push(...this.testDateBoundaryScenarios())
    
    // Cross-year tests
    results.push(...this.testCrossYearScenarios())
    
    // Extreme range tests
    results.push(...this.testExtremeRangeScenarios())
    
    const passed = results.filter(r => r.passed).length
    const failed = results.filter(r => !r.passed).length
    
    return {
      testSuite: 'Edge Case Comprehensive Test Suite',
      totalTests: results.length,
      passed,
      failed,
      passRate: (passed / results.length) * 100,
      results,
      summary: this.generateEdgeCaseSummary(results)
    } as EdgeCaseTestResult
  }
  
  /**
   * Test leap year scenarios including February 29th
   */
  private static testLeapYearScenarios(): EdgeCaseTestResult[] {
    const results: EdgeCaseTestResult[] = []
    
    // Test 1: Trip including February 29th in leap year
    results.push(this.runEdgeCaseTest(
      'LEAP-1: Trip spanning February 29th (2024)',
      [this.createTrip('leap-trip', 'FR', '2024-02-28', '2024-03-01')],
      new Date('2024-03-15'),
      {
        description: 'Trip spanning leap day February 29th, 2024',
        expectedDuration: 3, // Feb 28, 29, Mar 1
        shouldBeCompliant: true,
        notes: 'Validates leap year day counting'
      }
    ))
    
    // Test 2: 180-day window crossing leap year boundary
    results.push(this.runEdgeCaseTest(
      'LEAP-2: 180-day window crossing leap year boundary',
      [this.createTrip('cross-leap', 'DE', '2023-09-01', '2023-09-30')],
      new Date('2024-02-29'), // Leap day as reference
      {
        description: '180-day window from leap day going back to previous year',
        expectedDuration: 30,
        shouldBeCompliant: true,
        notes: 'Validates window calculation across leap year boundary'
      }
    ))
    
    // Test 3: Non-leap year February (2023)
    results.push(this.runEdgeCaseTest(
      'LEAP-3: Non-leap year February validation',
      [this.createTrip('non-leap', 'IT', '2023-02-27', '2023-03-01')],
      new Date('2023-03-15'),
      {
        description: 'Trip spanning Feb 28 to Mar 1 in non-leap year',
        expectedDuration: 3, // Feb 27, 28, Mar 1 (no Feb 29)
        shouldBeCompliant: true,
        notes: 'Validates correct behavior in non-leap years'
      }
    ))
    
    // Test 4: Leap year with 366-day period
    results.push(this.runEdgeCaseTest(
      'LEAP-4: Full leap year impact on 180-day window',
      [
        this.createTrip('leap-start', 'ES', '2024-01-01', '2024-01-31'),
        this.createTrip('leap-end', 'PT', '2024-07-01', '2024-07-31')
      ],
      new Date('2024-07-31'),
      {
        description: 'Two trips in leap year testing window calculation',
        expectedDuration: 62, // 31 + 31 days
        shouldBeCompliant: true,
        notes: 'Validates leap year does not affect 180-day window calculation'
      }
    ))
    
    return results
  }
  
  /**
   * Test timezone considerations
   */
  private static testTimezoneScenarios(): EdgeCaseTestResult[] {
    const results: EdgeCaseTestResult[] = []
    
    // Test 1: UTC vs local timezone consistency
    results.push(this.runEdgeCaseTest(
      'TZ-1: UTC date consistency',
      [this.createTrip('utc-trip', 'FR', '2024-03-31', '2024-04-30')], // DST transition in EU
      new Date('2024-05-15'),
      {
        description: 'Trip during EU DST transition (March 31, 2024)',
        expectedDuration: 31, // March 31 to April 30
        shouldBeCompliant: true,
        notes: 'Validates UTC date handling during DST transition'
      }
    ))
    
    // Test 2: Cross-timezone travel simulation
    results.push(this.runEdgeCaseTest(
      'TZ-2: Cross-timezone date boundaries',
      [
        this.createTrip('tz-west', 'FR', '2024-01-01', '2024-01-15'),
        this.createTrip('tz-east', 'FI', '2024-01-15', '2024-01-30')
      ],
      new Date('2024-02-15'),
      {
        description: 'Trips in different EU timezones with overlapping dates',
        expectedDuration: 30, // Should count Jan 15 only once despite overlap
        shouldBeCompliant: true,
        notes: 'Validates timezone-agnostic date calculation'
      }
    ))
    
    // Test 3: New Year's Eve timezone edge case
    results.push(this.runEdgeCaseTest(
      'TZ-3: New Year timezone boundary',
      [this.createTrip('nye-trip', 'DE', '2023-12-31', '2024-01-01')],
      new Date('2024-01-15'),
      {
        description: 'Trip spanning New Year across timezones',
        expectedDuration: 2, // Dec 31 + Jan 1
        shouldBeCompliant: true,
        notes: 'Validates year boundary handling regardless of timezone'
      }
    ))
    
    return results
  }
  
  /**
   * Test date boundary edge cases
   */
  private static testDateBoundaryScenarios(): EdgeCaseTestResult[] {
    const results: EdgeCaseTestResult[] = []
    
    // Test 1: Exact 180-day boundary
    const today = startOfDay(new Date())
    const exactBoundary = subDays(today, 179) // Exactly at boundary
    const outsideBoundary = subDays(today, 180) // Just outside boundary
    
    results.push(this.runEdgeCaseTest(
      'BOUNDARY-1: Exact 180-day boundary inclusion',
      [this.createTripFromDate('boundary-in', 'FR', exactBoundary, exactBoundary)],
      today,
      {
        description: 'Trip exactly at 180-day boundary (should be included)',
        expectedDuration: 1,
        shouldBeCompliant: true,
        notes: 'Validates inclusive boundary calculation'
      }
    ))
    
    results.push(this.runEdgeCaseTest(
      'BOUNDARY-2: Just outside 180-day boundary exclusion',
      [this.createTripFromDate('boundary-out', 'FR', outsideBoundary, outsideBoundary)],
      today,
      {
        description: 'Trip just outside 180-day boundary (should be excluded)',
        expectedDuration: 0,
        shouldBeCompliant: true,
        notes: 'Validates exclusive boundary calculation'
      }
    ))
    
    // Test 3: Same-day entry and exit
    results.push(this.runEdgeCaseTest(
      'BOUNDARY-3: Same-day entry and exit',
      [this.createTrip('same-day', 'IT', '2024-06-15', '2024-06-15')],
      new Date('2024-06-30'),
      {
        description: 'Single-day trip (entry and exit same day)',
        expectedDuration: 1,
        shouldBeCompliant: true,
        notes: 'Validates single-day trip counting'
      }
    ))
    
    // Test 4: Trip ending on reference date
    results.push(this.runEdgeCaseTest(
      'BOUNDARY-4: Trip ending on reference date',
      [this.createTrip('ends-today', 'ES', '2024-06-01', '2024-06-30')],
      new Date('2024-06-30'),
      {
        description: 'Trip ending exactly on reference date',
        expectedDuration: 30,
        shouldBeCompliant: true,
        notes: 'Validates reference date inclusion'
      }
    ))
    
    return results
  }
  
  /**
   * Test cross-year calculations
   */
  private static testCrossYearScenarios(): EdgeCaseTestResult[] {
    const results: EdgeCaseTestResult[] = []
    
    // Test 1: 180-day window spanning two years
    results.push(this.runEdgeCaseTest(
      'CROSS-YEAR-1: Window spanning two calendar years',
      [
        this.createTrip('dec-trip', 'AT', '2023-12-01', '2023-12-31'),
        this.createTrip('jan-trip', 'CH', '2024-01-01', '2024-01-31')
      ],
      new Date('2024-02-15'),
      {
        description: 'Trips in December and January across year boundary',
        expectedDuration: 62, // 31 + 31 days
        shouldBeCompliant: true,
        notes: 'Validates cross-year calculation'
      }
    ))
    
    // Test 2: Long trip spanning year boundary
    results.push(this.runEdgeCaseTest(
      'CROSS-YEAR-2: Single trip spanning year boundary',
      [this.createTrip('year-span', 'NL', '2023-11-15', '2024-02-15')],
      new Date('2024-03-01'),
      {
        description: 'Single trip spanning from November to February',
        expectedDuration: 93, // Should be non-compliant (overstay)
        shouldBeCompliant: false,
        notes: 'Validates long cross-year trip overstay detection'
      }
    ))
    
    // Test 3: Multiple years in 180-day window
    results.push(this.runEdgeCaseTest(
      'CROSS-YEAR-3: 180-day window touching three calendar years',
      [this.createTrip('multi-year', 'BE', '2022-12-31', '2023-01-01')],
      new Date('2023-06-30'),
      {
        description: 'Trip at year boundary with reference 6 months later',
        expectedDuration: 2, // Both days should count
        shouldBeCompliant: true,
        notes: 'Validates multi-year window calculation'
      }
    ))
    
    return results
  }
  
  /**
   * Test extreme date ranges
   */
  private static testExtremeRangeScenarios(): EdgeCaseTestResult[] {
    const results: EdgeCaseTestResult[] = []
    
    // Test 1: Very old trip (outside any reasonable window)
    results.push(this.runEdgeCaseTest(
      'EXTREME-1: Very old trip (10 years ago)',
      [this.createTrip('ancient-trip', 'FR', '2014-01-01', '2014-01-31')],
      new Date('2024-01-01'),
      {
        description: 'Trip from 10 years ago (should not affect calculation)',
        expectedDuration: 0,
        shouldBeCompliant: true,
        notes: 'Validates handling of very old trips'
      }
    ))
    
    // Test 2: Future trip (edge case for planned trips)
    results.push(this.runEdgeCaseTest(
      'EXTREME-2: Future trip beyond reference date',
      [this.createTrip('future-trip', 'DE', '2024-12-01', '2024-12-31')],
      new Date('2024-06-01'),
      {
        description: 'Trip scheduled for the future',
        expectedDuration: 0,
        shouldBeCompliant: true,
        notes: 'Validates future trip exclusion from current calculation'
      }
    ))
    
    // Test 3: Maximum possible 90-day trip
    results.push(this.runEdgeCaseTest(
      'EXTREME-3: Exactly 90-day trip at window boundary',
      [this.createTrip('max-trip', 'IT', '2024-01-01', '2024-03-30')], // Exactly 90 days
      new Date('2024-06-30'),
      {
        description: 'Exactly 90-day trip within 180-day window',
        expectedDuration: 90,
        shouldBeCompliant: true,
        notes: 'Validates maximum compliant trip duration'
      }
    ))
    
    // Test 4: 91-day trip (minimum overstay)
    results.push(this.runEdgeCaseTest(
      'EXTREME-4: Minimum overstay (91 days)',
      [this.createTrip('overstay-min', 'ES', '2024-01-01', '2024-03-31')], // 91 days
      new Date('2024-06-30'),
      {
        description: 'Minimum overstay scenario (91 days)',
        expectedDuration: 91,
        shouldBeCompliant: false,
        notes: 'Validates minimum overstay detection'
      }
    ))
    
    return results
  }
  
  /**
   * Helper method to create a trip from string dates
   */
  private static createTrip(id: string, country: string, startDate: string, endDate: string): Trip {
    const start = startOfDay(parseISO(startDate))
    const end = startOfDay(parseISO(endDate))
    return {
      id,
      country,
      startDate: start,
      endDate: end,
      days: Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }
  }
  
  /**
   * Helper method to create a trip from Date objects
   */
  private static createTripFromDate(id: string, country: string, startDate: Date, endDate: Date): Trip {
    const start = startOfDay(startDate)
    const end = startOfDay(endDate)
    return {
      id,
      country,
      startDate: start,
      endDate: end,
      days: Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }
  }
  
  /**
   * Run a single edge case test
   */
  private static runEdgeCaseTest(
    testName: string,
    trips: Trip[],
    referenceDate: Date,
    testConfig: EdgeCaseTestConfig
  ): EdgeCaseTestResult {
    try {
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
      
      const validations: EdgeCaseValidation[] = []
      
      // Validate expected duration if specified
      if (testConfig.expectedDuration !== undefined) {
        validations.push({
          check: 'duration',
          expected: testConfig.expectedDuration,
          actual: result.totalDaysUsed,
          passed: result.totalDaysUsed === testConfig.expectedDuration,
          message: `Expected ${testConfig.expectedDuration} days, got ${result.totalDaysUsed}`
        })
      }
      
      // Validate compliance expectation
      if (testConfig.shouldBeCompliant !== undefined) {
        validations.push({
          check: 'compliance',
          expected: testConfig.shouldBeCompliant,
          actual: result.isCompliant,
          passed: result.isCompliant === testConfig.shouldBeCompliant,
          message: `Expected ${testConfig.shouldBeCompliant ? 'compliant' : 'non-compliant'}, got ${result.isCompliant ? 'compliant' : 'non-compliant'}`
        })
      }
      
      const passed = validations.every(v => v.passed)
      
      return {
        testName,
        testType: 'edge-case',
        passed,
        result,
        validations,
        config: testConfig,
        trips: trips.length,
        referenceDate,
        executionTime: 0, // Could add timing if needed
        notes: testConfig.notes
      }
    } catch (error) {
      return {
        testName,
        testType: 'edge-case',
        passed: false,
        result: null,
        validations: [],
        config: testConfig,
        trips: trips.length,
        referenceDate,
        executionTime: 0,
        notes: `Error: ${error instanceof Error ? error.message : String(error)}`
      }
    }
  }
  
  /**
   * Generate summary of edge case test results
   */
  private static generateEdgeCaseSummary(results: EdgeCaseTestResult[]): string {
    const categories = {
      'Leap Year Tests': results.filter(r => r.testName.startsWith('LEAP')),
      'Timezone Tests': results.filter(r => r.testName.startsWith('TZ')),
      'Boundary Tests': results.filter(r => r.testName.startsWith('BOUNDARY')),
      'Cross-Year Tests': results.filter(r => r.testName.startsWith('CROSS-YEAR')),
      'Extreme Range Tests': results.filter(r => r.testName.startsWith('EXTREME'))
    }
    
    let summary = 'Edge Case Test Summary:\n'
    
    for (const [category, tests] of Object.entries(categories)) {
      const passed = tests.filter(t => t.passed).length
      const total = tests.length
      summary += `${category}: ${passed}/${total} passed\n`
    }
    
    const failedTests = results.filter(r => !r.passed)
    if (failedTests.length > 0) {
      summary += '\nFailed Edge Case Tests:\n'
      failedTests.forEach(test => {
        summary += `- ${test.testName}: ${test.notes}\n`
      })
    } else {
      summary += '\n✅ All edge cases handled correctly!'
    }
    
    return summary
  }
}

// Type definitions for edge case testing
interface EdgeCaseTestResult {
  testSuite?: string
  totalTests?: number
  passed?: number
  failed?: number
  passRate?: number
  results?: EdgeCaseTestResult[]
  summary?: string
  
  // Individual test properties
  testName?: string
  testType?: string
  result?: any
  validations?: EdgeCaseValidation[]
  config?: EdgeCaseTestConfig
  trips?: number
  referenceDate?: Date
  executionTime?: number
  notes?: string
}

interface EdgeCaseTestConfig {
  description: string
  expectedDuration?: number
  shouldBeCompliant?: boolean
  notes: string
}

interface EdgeCaseValidation {
  check: string
  expected: any
  actual: any
  passed: boolean
  message: string
}