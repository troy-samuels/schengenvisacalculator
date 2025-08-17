import { RobustSchengenCalculator, Trip } from './robust-schengen-calculator'
import { addDays, subDays, startOfDay, format } from 'date-fns'

/**
 * Comprehensive test runner for Schengen algorithm validation
 * Tests real-world scenarios to ensure exact compliance with Schengen rules
 */
export class SchengenTestRunner {
  private static readonly TODAY = startOfDay(new Date())

  /**
   * Run all validation tests and return detailed results
   */
  static runAllTests(): TestSuiteResult {
    const results: TestResult[] = []

    // Test Suite 1: Basic Scenarios
    results.push(...this.testBasicScenarios())
    
    // Test Suite 2: Edge Cases
    results.push(...this.testEdgeCases())
    
    // Test Suite 3: Real-World Scenarios
    results.push(...this.testRealWorldScenarios())
    
    // Test Suite 4: Stress Tests
    results.push(...this.testStressScenarios())

    const passed = results.filter(r => r.passed).length
    const failed = results.filter(r => !r.passed).length

    return {
      totalTests: results.length,
      passed,
      failed,
      passRate: (passed / results.length) * 100,
      results,
      summary: this.generateSummary(results)
    }
  }

  /**
   * Test basic scenarios
   */
  private static testBasicScenarios(): TestResult[] {
    const results: TestResult[] = []

    // Test 1: Single 30-day trip
    results.push(this.runTest(
      'Single 30-day trip in France',
      [this.createTrip('fr-30', 'FR', -40, 30)],
      {
        totalDaysUsed: 30,
        daysRemaining: 60,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Test 2: Exact 90-day limit
    results.push(this.runTest(
      'Exact 90-day limit (single trip)',
      [this.createTrip('fr-90', 'FR', -100, 90)],
      {
        totalDaysUsed: 90,
        daysRemaining: 0,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Test 3: One day overstay
    results.push(this.runTest(
      'Single day overstay',
      [this.createTrip('fr-91', 'FR', -100, 91)],
      {
        totalDaysUsed: 91,
        daysRemaining: 0,
        isCompliant: false,
        overstayDays: 1
      }
    ))

    // Test 4: Multiple short trips totaling under 90
    results.push(this.runTest(
      'Multiple short trips (total 60 days)',
      [
        this.createTrip('fr-1', 'FR', -150, 20),
        this.createTrip('de-1', 'DE', -100, 15),
        this.createTrip('it-1', 'IT', -50, 10),
        this.createTrip('es-1', 'ES', -20, 15)
      ],
      {
        totalDaysUsed: 60,
        daysRemaining: 30,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    return results
  }

  /**
   * Test edge cases and boundary conditions
   */
  private static testEdgeCases(): TestResult[] {
    const results: TestResult[] = []

    // Test 1: Trip exactly at 180-day boundary
    const tripAt179Days = this.createTrip('boundary', 'FR', -179, 1)
    results.push(this.runTest(
      'Trip at 179-day boundary (should count)',
      [tripAt179Days],
      {
        totalDaysUsed: 1,
        daysRemaining: 89,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Test 2: Trip just outside 180-day window
    const tripAt180Days = this.createTrip('outside', 'FR', -180, 1)
    results.push(this.runTest(
      'Trip at 180-day boundary (should not count)',
      [tripAt180Days],
      {
        totalDaysUsed: 0,
        daysRemaining: 90,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Test 3: Rolling window effect
    results.push(this.runTest(
      'Rolling window: 45 days + 46 days = exactly 90',
      [
        this.createTrip('roll-1', 'FR', -179, 45), // Starts 179 days ago, 45 days
        this.createTrip('roll-2', 'DE', -45, 46)   // Starts 45 days ago, 46 days (ends today)
      ],
      {
        totalDaysUsed: 90,
        daysRemaining: 0,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Test 4: Overlapping trips (same dates)
    results.push(this.runTest(
      'Overlapping trips on same dates',
      [
        this.createTrip('overlap-1', 'FR', -20, 10),
        this.createTrip('overlap-2', 'DE', -18, 10) // Overlaps by 8 days
      ],
      {
        totalDaysUsed: 12, // Should count unique days only
        daysRemaining: 78,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    return results
  }

  /**
   * Test real-world travel scenarios
   */
  private static testRealWorldScenarios(): TestResult[] {
    const results: TestResult[] = []

    // Scenario 1: Digital nomad with multiple short stays
    results.push(this.runTest(
      'Digital nomad: Multiple 2-week stays',
      [
        this.createTrip('nomad-1', 'PT', -170, 14),
        this.createTrip('nomad-2', 'ES', -150, 14),
        this.createTrip('nomad-3', 'FR', -130, 14),
        this.createTrip('nomad-4', 'IT', -110, 14),
        this.createTrip('nomad-5', 'DE', -90, 14),
        this.createTrip('nomad-6', 'NL', -70, 14),
        this.createTrip('nomad-7', 'AT', -50, 2) // Total: 86 days
      ],
      {
        totalDaysUsed: 86,
        daysRemaining: 4,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Scenario 2: Business traveler with regular trips
    results.push(this.runTest(
      'Business traveler: Regular 1-week trips',
      Array.from({ length: 12 }, (_, i) => 
        this.createTrip(`business-${i + 1}`, 'DE', -170 + (i * 14), 7)
      ), // 12 trips of 7 days each = 84 days
      {
        totalDaysUsed: 84,
        daysRemaining: 6,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Scenario 3: Student exchange (potential overstay)
    results.push(this.runTest(
      'Student exchange: 4-month stay (overstay)',
      [this.createTrip('student', 'FR', -120, 120)], // 120 days = 4 months
      {
        totalDaysUsed: 120,
        daysRemaining: 0,
        isCompliant: false,
        overstayDays: 30 // 120 - 90 = 30 days overstay
      }
    ))

    return results
  }

  /**
   * Test stress scenarios and performance
   */
  private static testStressScenarios(): TestResult[] {
    const results: TestResult[] = []

    // Stress test 1: Many single-day trips
    const singleDayTrips = Array.from({ length: 90 }, (_, i) => 
      this.createTrip(`single-${i}`, 'FR', -179 + (i * 2), 1)
    )
    results.push(this.runTest(
      'Stress test: 90 single-day trips (exactly at limit)',
      singleDayTrips,
      {
        totalDaysUsed: 90,
        daysRemaining: 0,
        isCompliant: true,
        overstayDays: 0
      }
    ))

    // Stress test 2: Complex overlapping scenario
    results.push(this.runTest(
      'Complex scenario: Overlapping long trips',
      [
        this.createTrip('complex-1', 'FR', -179, 60),
        this.createTrip('complex-2', 'DE', -150, 40),
        this.createTrip('complex-3', 'IT', -120, 30)
      ],
      {
        isCompliant: false // Should definitely be overstay
      }
    ))

    return results
  }

  /**
   * Create a test trip
   */
  private static createTrip(id: string, country: string, startOffset: number, duration: number): Trip {
    const startDate = addDays(this.TODAY, startOffset)
    const endDate = addDays(startDate, duration - 1)
    return {
      id,
      country,
      startDate,
      endDate,
      days: duration
    }
  }

  /**
   * Run a single test
   */
  private static runTest(name: string, trips: Trip[], expected: Partial<ExpectedResult>): TestResult {
    try {
      const startTime = performance.now()
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, this.TODAY)
      const endTime = performance.now()

      const checks = this.validateResult(result, expected)
      const passed = checks.every(check => check.passed)

      return {
        name,
        passed,
        executionTime: endTime - startTime,
        result,
        expected,
        checks,
        trips: trips.length,
        details: passed ? 'All checks passed' : checks.filter(c => !c.passed).map(c => c.message).join('; ')
      }
    } catch (error) {
      return {
        name,
        passed: false,
        executionTime: 0,
        result: null,
        expected,
        checks: [],
        trips: trips.length,
        details: `Error: ${error instanceof Error ? error.message : String(error)}`
      }
    }
  }

  /**
   * Validate test result against expected values
   */
  private static validateResult(result: any, expected: Partial<ExpectedResult>): ValidationCheck[] {
    const checks: ValidationCheck[] = []

    if (expected.totalDaysUsed !== undefined) {
      checks.push({
        field: 'totalDaysUsed',
        expected: expected.totalDaysUsed,
        actual: result.totalDaysUsed,
        passed: result.totalDaysUsed === expected.totalDaysUsed,
        message: `Expected ${expected.totalDaysUsed} days used, got ${result.totalDaysUsed}`
      })
    }

    if (expected.daysRemaining !== undefined) {
      checks.push({
        field: 'daysRemaining',
        expected: expected.daysRemaining,
        actual: result.daysRemaining,
        passed: result.daysRemaining === expected.daysRemaining,
        message: `Expected ${expected.daysRemaining} days remaining, got ${result.daysRemaining}`
      })
    }

    if (expected.isCompliant !== undefined) {
      checks.push({
        field: 'isCompliant',
        expected: expected.isCompliant,
        actual: result.isCompliant,
        passed: result.isCompliant === expected.isCompliant,
        message: `Expected compliant: ${expected.isCompliant}, got: ${result.isCompliant}`
      })
    }

    if (expected.overstayDays !== undefined) {
      checks.push({
        field: 'overstayDays',
        expected: expected.overstayDays,
        actual: result.overstayDays,
        passed: result.overstayDays === expected.overstayDays,
        message: `Expected ${expected.overstayDays} overstay days, got ${result.overstayDays}`
      })
    }

    return checks
  }

  /**
   * Generate test summary
   */
  private static generateSummary(results: TestResult[]): string {
    const categories = {
      'Basic Scenarios': results.filter(r => r.name.includes('30-day') || r.name.includes('90-day') || r.name.includes('overstay') || r.name.includes('Multiple')),
      'Edge Cases': results.filter(r => r.name.includes('boundary') || r.name.includes('Rolling') || r.name.includes('Overlapping')),
      'Real-World': results.filter(r => r.name.includes('nomad') || r.name.includes('Business') || r.name.includes('Student')),
      'Stress Tests': results.filter(r => r.name.includes('Stress') || r.name.includes('Complex'))
    }

    let summary = 'Test Summary:\n'
    for (const [category, tests] of Object.entries(categories)) {
      const passed = tests.filter(t => t.passed).length
      const total = tests.length
      summary += `${category}: ${passed}/${total} passed\n`
    }

    const failedTests = results.filter(r => !r.passed)
    if (failedTests.length > 0) {
      summary += '\nFailed Tests:\n'
      failedTests.forEach(test => {
        summary += `- ${test.name}: ${test.details}\n`
      })
    }

    const avgTime = results.reduce((sum, r) => sum + r.executionTime, 0) / results.length
    summary += `\nAverage execution time: ${avgTime.toFixed(2)}ms`

    return summary
  }
}

// Type definitions
interface TestSuiteResult {
  totalTests: number
  passed: number
  failed: number
  passRate: number
  results: TestResult[]
  summary: string
}

interface TestResult {
  name: string
  passed: boolean
  executionTime: number
  result: any
  expected: Partial<ExpectedResult>
  checks: ValidationCheck[]
  trips: number
  details: string
}

interface ExpectedResult {
  totalDaysUsed: number
  daysRemaining: number
  isCompliant: boolean
  overstayDays: number
}

interface ValidationCheck {
  field: string
  expected: any
  actual: any
  passed: boolean
  message: string
}