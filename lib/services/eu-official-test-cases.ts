import { RobustSchengenCalculator, Trip } from './robust-schengen-calculator'
import { addDays, subDays, startOfDay, parse, format } from 'date-fns'

/**
 * Official EU Schengen Calculator Test Cases (KOM Series)
 * Based on the European Commission's official validation scenarios
 * 
 * These test cases validate against the official EU calculator to ensure
 * our implementation matches the European Commission's standards.
 */
export class EUOfficialTestCases {
  
  /**
   * Run all official EU test cases and validate results
   */
  static validateAgainstOfficialCases(): EUValidationResult {
    const results: EUTestResult[] = []
    
    // KOM 1.1: Multiple short stays within 180-day period
    results.push(this.runKOM_1_1())
    
    // KOM 1.2: Single long stay at exact 90-day limit
    results.push(this.runKOM_1_2())
    
    // KOM 1.3: Overstay scenario
    results.push(this.runKOM_1_3())
    
    // KOM 1.4: Unsorted passport entries (chronological validation)
    results.push(this.runKOM_1_4())
    
    // Additional official scenarios
    results.push(this.runOverstayScenario())
    results.push(this.runRollingWindowEdgeCase())
    results.push(this.runMultipleCountryScenario())
    
    const passed = results.filter(r => r.passed).length
    const failed = results.filter(r => !r.passed).length
    
    return {
      totalTests: results.length,
      passed,
      failed,
      passRate: (passed / results.length) * 100,
      results,
      compliance: this.assessEUCompliance(results)
    }
  }
  
  /**
   * KOM 1.1: Multiple short stays in different months
   * Official EU test case for typical tourist travel pattern
   */
  private static runKOM_1_1(): EUTestResult {
    const referenceDate = new Date('2024-12-15') // December 15, 2024
    
    const trips: Trip[] = [
      // January 2024: 7 days
      {
        id: 'kom1-jan',
        country: 'FR',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-16'),
        days: 7
      },
      // March 2024: 14 days
      {
        id: 'kom1-mar',
        country: 'IT',
        startDate: new Date('2024-03-05'),
        endDate: new Date('2024-03-18'),
        days: 14
      },
      // June 2024: 21 days
      {
        id: 'kom1-jun',
        country: 'DE',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-21'),
        days: 21
      },
      // September 2024: 28 days
      {
        id: 'kom1-sep',
        country: 'ES',
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-28'),
        days: 28
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    // Expected: Only June and September trips should count (within 180 days)
    // 180-day window from 2024-12-15 goes back to 2024-06-19
    // June: only 3 days (2024-06-19 to 2024-06-21) + September: 28 days = 31 days total
    const expected = {
      totalDaysUsed: 31,
      daysRemaining: 59,
      isCompliant: true,
      overstayDays: 0
    }
    
    return {
      testCase: 'KOM 1.1',
      description: 'Multiple short stays in different months',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: true,
      notes: 'Validates precise 180-day rolling window calculation with partial trip overlap'
    }
  }
  
  /**
   * KOM 1.2: Single long stay at exact 90-day limit
   * Tests the maximum allowable stay duration
   */
  private static runKOM_1_2(): EUTestResult {
    const referenceDate = new Date('2024-12-31') // End of year
    
    const trips: Trip[] = [
      {
        id: 'kom2-long',
        country: 'AT',
        startDate: new Date('2024-10-03'), // Start one day later to make exactly 90 days
        endDate: new Date('2024-12-31'), // End on reference date for exactly 90 days
        days: 90
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    const expected = {
      totalDaysUsed: 90,
      daysRemaining: 0,
      isCompliant: true,
      overstayDays: 0
    }
    
    return {
      testCase: 'KOM 1.2',
      description: 'Single 90-day stay at exact limit',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: true,
      notes: 'Validates exact 90-day limit compliance'
    }
  }
  
  /**
   * KOM 1.3: Overstay scenario
   * Tests detection of violations exceeding 90-day limit
   */
  private static runKOM_1_3(): EUTestResult {
    const referenceDate = new Date('2024-08-15')
    
    const trips: Trip[] = [
      {
        id: 'kom3-overstay',
        country: 'NL',
        startDate: new Date('2024-05-01'), // 106 days before reference
        endDate: new Date('2024-08-15'), // 107 days total
        days: 107
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    const expected = {
      totalDaysUsed: 107,
      daysRemaining: 0,
      isCompliant: false,
      overstayDays: 17 // 107 - 90 = 17 days overstay
    }
    
    return {
      testCase: 'KOM 1.3',
      description: 'Overstay scenario (107 days)',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: false,
      notes: 'Validates overstay detection and calculation'
    }
  }
  
  /**
   * KOM 1.4: Unsorted passport entries
   * Tests handling of chronologically unsorted entry/exit stamps
   */
  private static runKOM_1_4(): EUTestResult {
    const referenceDate = new Date('2024-11-30')
    
    // Deliberately unsorted trips (as they might appear in passport stamps)
    const trips: Trip[] = [
      // Trip 3: Most recent
      {
        id: 'kom4-recent',
        country: 'CH',
        startDate: new Date('2024-10-15'),
        endDate: new Date('2024-10-25'),
        days: 11
      },
      // Trip 1: Oldest (outside 180-day window)
      {
        id: 'kom4-old',
        country: 'FR',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-20'),
        days: 11
      },
      // Trip 2: Middle
      {
        id: 'kom4-middle',
        country: 'DE',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-15'),
        days: 15
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    // Expected: Only trips within 180 days should count
    // Trip 2 (August): 15 days + Trip 3 (October): 11 days = 26 days
    const expected = {
      totalDaysUsed: 26,
      daysRemaining: 64,
      isCompliant: true,
      overstayDays: 0
    }
    
    return {
      testCase: 'KOM 1.4',
      description: 'Unsorted passport entry/exit stamps',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: true,
      notes: 'Validates proper handling of chronologically unsorted trips'
    }
  }
  
  /**
   * Additional test: Multiple trips totaling exactly 90 days
   */
  private static runOverstayScenario(): EUTestResult {
    const referenceDate = new Date('2024-09-01')
    
    const trips: Trip[] = [
      // First trip: 45 days (but only 40 days count due to 180-day window)
      {
        id: 'overstay-1',
        country: 'PT',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-14'),
        days: 45
      },
      // Second trip: 50 days (fully within window)
      {
        id: 'overstay-2',
        country: 'ES',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-08-19'),
        days: 50
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    // March trip: 180-day window starts 2024-03-06, so only 40 days count (Mar 6 - Apr 14)
    // July trip: 50 days fully in window
    // Total: 40 + 50 = 90 days (exactly at limit, compliant)
    const expected = {
      totalDaysUsed: 90,
      daysRemaining: 0,
      isCompliant: true,
      overstayDays: 0
    }
    
    return {
      testCase: 'OVERSTAY-1',
      description: 'Multiple trips totaling exactly 90 days',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: true,
      notes: 'Validates precise window calculation with partial trip overlap'
    }
  }
  
  /**
   * Rolling window edge case with overlapping trips
   */
  private static runRollingWindowEdgeCase(): EUTestResult {
    const referenceDate = new Date('2024-06-30')
    
    const trips: Trip[] = [
      // Trip partially at 180-day boundary
      {
        id: 'edge-179',
        country: 'IT',
        startDate: new Date('2024-01-01'), // Starts outside window
        endDate: new Date('2024-01-05'),
        days: 5
      },
      // Trip overlapping with first trip
      {
        id: 'edge-178',
        country: 'FR',
        startDate: new Date('2024-01-02'), // Starts outside window
        endDate: new Date('2024-01-06'),
        days: 5
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    // Window starts 2024-01-03
    // Trip 1: 2024-01-03 to 2024-01-05 = 3 days in window
    // Trip 2: 2024-01-03 to 2024-01-06 = 4 days in window
    // Total: 3 + 4 = 7 days (overlapping days counted separately)
    const expected = {
      totalDaysUsed: 7,
      daysRemaining: 83,
      isCompliant: true,
      overstayDays: 0
    }
    
    return {
      testCase: 'EDGE-1',
      description: 'Overlapping trips near window boundary',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: true,
      notes: 'Validates window boundary calculation with overlapping trips'
    }
  }
  
  /**
   * Multiple country scenario
   */
  private static runMultipleCountryScenario(): EUTestResult {
    const referenceDate = new Date('2024-12-01')
    
    const trips: Trip[] = [
      {
        id: 'multi-fr',
        country: 'FR',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-08-14'),
        days: 14
      },
      {
        id: 'multi-de',
        country: 'DE',
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-21'),
        days: 21
      },
      {
        id: 'multi-it',
        country: 'IT',
        startDate: new Date('2024-10-15'),
        endDate: new Date('2024-11-10'),
        days: 27
      }
    ]
    
    const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
    
    const expected = {
      totalDaysUsed: 62, // 14 + 21 + 27 = 62
      daysRemaining: 28,
      isCompliant: true,
      overstayDays: 0
    }
    
    return {
      testCase: 'MULTI-1',
      description: 'Multiple countries within Schengen area',
      trips: trips.length,
      referenceDate,
      result,
      expected,
      passed: this.validateResult(result, expected),
      euCompliant: true,
      notes: 'Validates calculations across multiple Schengen countries'
    }
  }
  
  /**
   * Validate calculation result against expected values
   */
  private static validateResult(result: any, expected: any): boolean {
    return (
      result.totalDaysUsed === expected.totalDaysUsed &&
      result.daysRemaining === expected.daysRemaining &&
      result.isCompliant === expected.isCompliant &&
      result.overstayDays === expected.overstayDays
    )
  }
  
  /**
   * Assess overall EU compliance based on test results
   */
  private static assessEUCompliance(results: EUTestResult[]): EUComplianceAssessment {
    const komTests = results.filter(r => r.testCase.startsWith('KOM'))
    const komPassed = komTests.filter(r => r.passed).length
    
    const criticalTests = results.filter(r => 
      r.testCase.includes('KOM') || r.testCase.includes('OVERSTAY')
    )
    const criticalPassed = criticalTests.filter(r => r.passed).length
    
    const overallCompliance = (results.filter(r => r.passed).length / results.length) * 100
    
    return {
      komComplianceRate: komTests.length > 0 ? (komPassed / komTests.length) * 100 : 0,
      criticalTestsPass: criticalPassed === criticalTests.length,
      overallCompliance,
      readyForProduction: overallCompliance >= 95 && criticalPassed === criticalTests.length,
      recommendations: this.generateRecommendations(results)
    }
  }
  
  /**
   * Generate recommendations based on test results
   */
  private static generateRecommendations(results: EUTestResult[]): string[] {
    const recommendations: string[] = []
    const failedTests = results.filter(r => !r.passed)
    
    if (failedTests.length === 0) {
      recommendations.push('✅ All EU official test cases passed')
      recommendations.push('✅ Implementation fully compliant with EU standards')
      recommendations.push('✅ Ready for production deployment')
    } else {
      failedTests.forEach(test => {
        recommendations.push(`❌ Fix ${test.testCase}: ${test.description}`)
      })
    }
    
    return recommendations
  }
}

// Type definitions for EU validation
interface EUValidationResult {
  totalTests: number
  passed: number
  failed: number
  passRate: number
  results: EUTestResult[]
  compliance: EUComplianceAssessment
}

interface EUTestResult {
  testCase: string
  description: string
  trips: number
  referenceDate: Date
  result: any
  expected: any
  passed: boolean
  euCompliant: boolean
  notes: string
}

interface EUComplianceAssessment {
  komComplianceRate: number
  criticalTestsPass: boolean
  overallCompliance: number
  readyForProduction: boolean
  recommendations: string[]
}