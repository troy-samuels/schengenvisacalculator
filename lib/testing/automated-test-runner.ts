import { RobustSchengenCalculator, Trip, ComplianceResult } from '../services/robust-schengen-calculator'
import { EUOfficialTestCases } from '../services/eu-official-test-cases'
import { format, addDays, subDays, startOfDay, parseISO, differenceInDays } from 'date-fns'

/**
 * Automated Test Runner for Schengen Calculator Accuracy
 * 
 * Provides comprehensive testing capabilities including:
 * - Calculation accuracy verification
 * - Performance benchmarking
 * - Regression testing
 * - CI/CD integration support
 * - Detailed reporting and metrics
 */
export class AutomatedTestRunner {
  private static readonly TEST_CATEGORIES = {
    EU_COMPLIANCE: 'EU Official Compliance',
    CALCULATION_ACCURACY: 'Calculation Accuracy',
    EDGE_CASES: 'Edge Cases',
    PERFORMANCE: 'Performance',
    REGRESSION: 'Regression',
    BOUNDARY_CONDITIONS: 'Boundary Conditions',
    REAL_WORLD: 'Real World Scenarios'
  }

  /**
   * Run complete automated test suite
   */
  static async runCompleteTestSuite(options: TestSuiteOptions = {}): Promise<TestSuiteResult> {
    const startTime = performance.now()
    
    console.log('🤖 AUTOMATED SCHENGEN CALCULATOR TEST SUITE')
    console.log('==========================================')
    console.log(`Started: ${new Date().toISOString()}`)
    console.log(`Options: ${JSON.stringify(options, null, 2)}\n`)

    const results: CategoryResult[] = []

    try {
      // 1. EU Compliance Tests
      if (!options.skipEUCompliance) {
        results.push(await this.runEUComplianceTests())
      }

      // 2. Calculation Accuracy Tests
      if (!options.skipAccuracy) {
        results.push(await this.runCalculationAccuracyTests())
      }

      // 3. Edge Case Tests
      if (!options.skipEdgeCases) {
        results.push(await this.runEdgeCaseTests())
      }

      // 4. Performance Tests
      if (!options.skipPerformance) {
        results.push(await this.runPerformanceTests())
      }

      // 5. Boundary Condition Tests
      if (!options.skipBoundary) {
        results.push(await this.runBoundaryConditionTests())
      }

      // 6. Real World Scenario Tests
      if (!options.skipRealWorld) {
        results.push(await this.runRealWorldScenarioTests())
      }

      // 7. Regression Tests (if baseline provided)
      if (options.regressionBaseline) {
        results.push(await this.runRegressionTests(options.regressionBaseline))
      }

      const endTime = performance.now()
      const totalTime = endTime - startTime

      const summary = this.generateTestSummary(results, totalTime)
      
      if (options.outputFile) {
        await this.saveTestReport(summary, options.outputFile)
      }

      return summary

    } catch (error) {
      console.error('❌ Test suite execution failed:', error)
      throw error
    }
  }

  /**
   * Run EU compliance tests
   */
  private static async runEUComplianceTests(): Promise<CategoryResult> {
    console.log('📋 Running EU Compliance Tests...')
    
    const startTime = performance.now()
    const results = EUOfficialTestCases.validateAgainstOfficialCases()
    const endTime = performance.now()

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.EU_COMPLIANCE,
      totalTests: results.totalTests,
      passed: results.passed,
      failed: results.failed,
      passRate: results.passRate,
      executionTime: endTime - startTime,
      tests: results.results.map(r => ({
        name: r.testCase,
        passed: r.passed,
        description: r.description,
        executionTime: 0,
        details: r.passed ? 'PASS' : `Failed validation`,
        category: 'EU_COMPLIANCE'
      })),
      metrics: {
        averageExecutionTime: (endTime - startTime) / results.totalTests,
        euComplianceRate: results.passRate
      }
    }

    console.log(`   ✅ ${results.passed}/${results.totalTests} EU tests passed (${results.passRate.toFixed(1)}%)\n`)
    
    return categoryResult
  }

  /**
   * Run calculation accuracy tests
   */
  private static async runCalculationAccuracyTests(): Promise<CategoryResult> {
    console.log('🔢 Running Calculation Accuracy Tests...')
    
    const tests = this.generateCalculationAccuracyTests()
    const results: TestResult[] = []
    let passed = 0

    for (const test of tests) {
      const testResult = await this.runSingleTest(test)
      results.push(testResult)
      if (testResult.passed) passed++
    }

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.CALCULATION_ACCURACY,
      totalTests: tests.length,
      passed,
      failed: tests.length - passed,
      passRate: (passed / tests.length) * 100,
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      tests: results,
      metrics: {
        averageExecutionTime: results.reduce((sum, r) => sum + r.executionTime, 0) / results.length,
        accuracyScore: (passed / tests.length) * 100
      }
    }

    console.log(`   ✅ ${passed}/${tests.length} accuracy tests passed (${categoryResult.passRate.toFixed(1)}%)\n`)
    
    return categoryResult
  }

  /**
   * Run edge case tests
   */
  private static async runEdgeCaseTests(): Promise<CategoryResult> {
    console.log('⚡ Running Edge Case Tests...')
    
    const tests = this.generateEdgeCaseTests()
    const results: TestResult[] = []
    let passed = 0

    for (const test of tests) {
      const testResult = await this.runSingleTest(test)
      results.push(testResult)
      if (testResult.passed) passed++
    }

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.EDGE_CASES,
      totalTests: tests.length,
      passed,
      failed: tests.length - passed,
      passRate: (passed / tests.length) * 100,
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      tests: results,
      metrics: {
        averageExecutionTime: results.reduce((sum, r) => sum + r.executionTime, 0) / results.length,
        edgeCaseHandling: (passed / tests.length) * 100
      }
    }

    console.log(`   ✅ ${passed}/${tests.length} edge case tests passed (${categoryResult.passRate.toFixed(1)}%)\n`)
    
    return categoryResult
  }

  /**
   * Run performance tests
   */
  private static async runPerformanceTests(): Promise<CategoryResult> {
    console.log('🚀 Running Performance Tests...')
    
    const tests = this.generatePerformanceTests()
    const results: TestResult[] = []
    let passed = 0

    for (const test of tests) {
      const testResult = await this.runPerformanceTest(test)
      results.push(testResult)
      if (testResult.passed) passed++
    }

    const avgExecutionTime = results.reduce((sum, r) => sum + r.executionTime, 0) / results.length
    const maxExecutionTime = Math.max(...results.map(r => r.executionTime))

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.PERFORMANCE,
      totalTests: tests.length,
      passed,
      failed: tests.length - passed,
      passRate: (passed / tests.length) * 100,
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      tests: results,
      metrics: {
        averageExecutionTime: avgExecutionTime,
        maxExecutionTime: maxExecutionTime,
        performanceScore: avgExecutionTime < 10 ? 100 : Math.max(0, 100 - (avgExecutionTime - 10) * 5)
      }
    }

    console.log(`   ✅ ${passed}/${tests.length} performance tests passed (avg: ${avgExecutionTime.toFixed(2)}ms)\n`)
    
    return categoryResult
  }

  /**
   * Run boundary condition tests
   */
  private static async runBoundaryConditionTests(): Promise<CategoryResult> {
    console.log('🎯 Running Boundary Condition Tests...')
    
    const tests = this.generateBoundaryConditionTests()
    const results: TestResult[] = []
    let passed = 0

    for (const test of tests) {
      const testResult = await this.runSingleTest(test)
      results.push(testResult)
      if (testResult.passed) passed++
    }

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.BOUNDARY_CONDITIONS,
      totalTests: tests.length,
      passed,
      failed: tests.length - passed,
      passRate: (passed / tests.length) * 100,
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      tests: results,
      metrics: {
        averageExecutionTime: results.reduce((sum, r) => sum + r.executionTime, 0) / results.length,
        boundaryAccuracy: (passed / tests.length) * 100
      }
    }

    console.log(`   ✅ ${passed}/${tests.length} boundary tests passed (${categoryResult.passRate.toFixed(1)}%)\n`)
    
    return categoryResult
  }

  /**
   * Run real world scenario tests
   */
  private static async runRealWorldScenarioTests(): Promise<CategoryResult> {
    console.log('🌍 Running Real World Scenario Tests...')
    
    const tests = this.generateRealWorldTests()
    const results: TestResult[] = []
    let passed = 0

    for (const test of tests) {
      const testResult = await this.runSingleTest(test)
      results.push(testResult)
      if (testResult.passed) passed++
    }

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.REAL_WORLD,
      totalTests: tests.length,
      passed,
      failed: tests.length - passed,
      passRate: (passed / tests.length) * 100,
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      tests: results,
      metrics: {
        averageExecutionTime: results.reduce((sum, r) => sum + r.executionTime, 0) / results.length,
        realWorldAccuracy: (passed / tests.length) * 100
      }
    }

    console.log(`   ✅ ${passed}/${tests.length} real world tests passed (${categoryResult.passRate.toFixed(1)}%)\n`)
    
    return categoryResult
  }

  /**
   * Run regression tests against baseline
   */
  private static async runRegressionTests(baseline: RegressionBaseline): Promise<CategoryResult> {
    console.log('🔄 Running Regression Tests...')
    
    const tests = baseline.testCases
    const results: TestResult[] = []
    let passed = 0
    let regressions = 0

    for (const baselineTest of tests) {
      const currentResult = await this.runBaselineTest(baselineTest)
      const hasRegression = this.detectRegression(baselineTest.expectedResult, currentResult.result)
      
      if (hasRegression) {
        regressions++
      }

      results.push({
        name: baselineTest.name,
        passed: !hasRegression,
        description: baselineTest.description,
        executionTime: currentResult.executionTime,
        details: hasRegression ? 'REGRESSION DETECTED' : 'PASS',
        category: 'REGRESSION'
      })

      if (!hasRegression) passed++
    }

    const categoryResult: CategoryResult = {
      category: this.TEST_CATEGORIES.REGRESSION,
      totalTests: tests.length,
      passed,
      failed: regressions,
      passRate: (passed / tests.length) * 100,
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      tests: results,
      metrics: {
        averageExecutionTime: results.reduce((sum, r) => sum + r.executionTime, 0) / results.length,
        regressionCount: regressions,
        stabilityScore: (passed / tests.length) * 100
      }
    }

    console.log(`   ✅ ${passed}/${tests.length} regression tests passed (${regressions} regressions detected)\n`)
    
    return categoryResult
  }

  /**
   * Generate calculation accuracy test cases
   */
  private static generateCalculationAccuracyTests(): TestCase[] {
    return [
      // Precision tests
      {
        name: 'Single day calculation precision',
        description: 'Verify single-day trip calculation accuracy',
        trips: [this.createTrip('single', 'FR', '2024-06-15', '2024-06-15')],
        referenceDate: new Date('2024-06-30'),
        expectedResult: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 },
        category: 'ACCURACY'
      },
      {
        name: 'Exact 90-day boundary precision',
        description: 'Verify exact 90-day calculation accuracy',
        trips: [this.createTrip('exact90', 'DE', '2024-01-01', '2024-03-30')],
        referenceDate: new Date('2024-06-30'),
        expectedResult: { totalDaysUsed: 88, isCompliant: true, overstayDays: 0 }, // Only 88 days in window
        category: 'ACCURACY'
      },
      {
        name: 'Multiple trip aggregation accuracy',
        description: 'Verify accurate aggregation of multiple trips',
        trips: [
          this.createTrip('trip1', 'IT', '2024-01-01', '2024-01-15'), // 15 days
          this.createTrip('trip2', 'ES', '2024-02-01', '2024-02-20'), // 20 days
          this.createTrip('trip3', 'FR', '2024-03-01', '2024-03-25')  // 25 days
        ],
        referenceDate: new Date('2024-04-01'),
        expectedResult: { totalDaysUsed: 60, isCompliant: true, overstayDays: 0 },
        category: 'ACCURACY'
      },
      {
        name: 'Partial window overlap accuracy',
        description: 'Verify accurate calculation with partial window overlap',
        trips: [this.createTrip('partial', 'AT', '2023-12-15', '2024-01-15')],
        referenceDate: new Date('2024-07-01'),
        expectedResult: { totalDaysUsed: 14, isCompliant: true, overstayDays: 0 }, // Only Jan 1-14 in window
        category: 'ACCURACY'
      }
    ]
  }

  /**
   * Generate edge case test cases
   */
  private static generateEdgeCaseTests(): TestCase[] {
    return [
      {
        name: 'Leap year February 29th',
        description: 'Handle leap year February 29th correctly',
        trips: [this.createTrip('leap', 'FR', '2024-02-28', '2024-03-01')],
        referenceDate: new Date('2024-03-15'),
        expectedResult: { totalDaysUsed: 3, isCompliant: true, overstayDays: 0 },
        category: 'EDGE_CASE'
      },
      {
        name: 'Same date start and end',
        description: 'Handle same-day entry and exit',
        trips: [this.createTrip('same', 'DE', '2024-06-15', '2024-06-15')],
        referenceDate: new Date('2024-06-30'),
        expectedResult: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 },
        category: 'EDGE_CASE'
      },
      {
        name: 'Trip ending on reference date',
        description: 'Handle trip ending exactly on reference date',
        trips: [this.createTrip('endref', 'IT', '2024-06-01', '2024-06-30')],
        referenceDate: new Date('2024-06-30'),
        expectedResult: { totalDaysUsed: 30, isCompliant: true, overstayDays: 0 },
        category: 'EDGE_CASE'
      }
    ]
  }

  /**
   * Generate performance test cases
   */
  private static generatePerformanceTests(): PerformanceTestCase[] {
    return [
      {
        name: 'Large trip dataset performance',
        description: 'Performance with 100 trips',
        trips: Array.from({ length: 100 }, (_, i) => 
          this.createTrip(`perf${i}`, 'FR', 
            format(addDays(new Date('2024-01-01'), i * 2), 'yyyy-MM-dd'),
            format(addDays(new Date('2024-01-01'), i * 2 + 1), 'yyyy-MM-dd')
          )
        ),
        referenceDate: new Date('2024-12-31'),
        maxExecutionTime: 50, // 50ms maximum
        category: 'PERFORMANCE'
      },
      {
        name: 'Complex overlapping trips performance',
        description: 'Performance with overlapping trips',
        trips: Array.from({ length: 50 }, (_, i) => 
          this.createTrip(`overlap${i}`, 'DE',
            format(addDays(new Date('2024-01-01'), i), 'yyyy-MM-dd'),
            format(addDays(new Date('2024-01-01'), i + 10), 'yyyy-MM-dd')
          )
        ),
        referenceDate: new Date('2024-12-31'),
        maxExecutionTime: 30,
        category: 'PERFORMANCE'
      }
    ]
  }

  /**
   * Generate boundary condition test cases
   */
  private static generateBoundaryConditionTests(): TestCase[] {
    const today = startOfDay(new Date('2024-06-30'))
    const exactBoundary = subDays(today, 179)
    const outsideBoundary = subDays(today, 180)

    return [
      {
        name: 'Exact 180-day boundary inclusion',
        description: 'Trip exactly at 180-day boundary should be included',
        trips: [this.createTripFromDate('boundary', 'FR', exactBoundary, exactBoundary)],
        referenceDate: today,
        expectedResult: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 },
        category: 'BOUNDARY'
      },
      {
        name: 'Outside 180-day boundary exclusion',
        description: 'Trip outside 180-day boundary should be excluded',
        trips: [this.createTripFromDate('outside', 'FR', outsideBoundary, outsideBoundary)],
        referenceDate: today,
        expectedResult: { totalDaysUsed: 0, isCompliant: true, overstayDays: 0 },
        category: 'BOUNDARY'
      }
    ]
  }

  /**
   * Generate real world scenario test cases
   */
  private static generateRealWorldTests(): TestCase[] {
    return [
      {
        name: 'Digital nomad pattern',
        description: 'Typical digital nomad travel pattern',
        trips: [
          this.createTrip('nomad1', 'PT', '2024-01-15', '2024-02-14'), // 31 days
          this.createTrip('nomad2', 'ES', '2024-03-01', '2024-03-21'), // 21 days
          this.createTrip('nomad3', 'FR', '2024-04-05', '2024-04-25'), // 21 days
          this.createTrip('nomad4', 'IT', '2024-05-10', '2024-05-25')  // 16 days
        ],
        referenceDate: new Date('2024-06-30'),
        expectedResult: { totalDaysUsed: 89, isCompliant: true, overstayDays: 0 },
        category: 'REAL_WORLD'
      },
      {
        name: 'Business traveler pattern',
        description: 'Regular business trips',
        trips: Array.from({ length: 12 }, (_, i) => 
          this.createTrip(`business${i}`, 'DE',
            format(addDays(new Date('2024-01-01'), i * 14), 'yyyy-MM-dd'),
            format(addDays(new Date('2024-01-05'), i * 14), 'yyyy-MM-dd')
          )
        ),
        referenceDate: new Date('2024-06-30'),
        expectedResult: { totalDaysUsed: 60, isCompliant: true, overstayDays: 0 }, // 12 * 5 days each
        category: 'REAL_WORLD'
      }
    ]
  }

  /**
   * Helper methods
   */
  private static createTrip(id: string, country: string, startDate: string, endDate: string): Trip {
    const start = startOfDay(parseISO(startDate))
    const end = startOfDay(parseISO(endDate))
    return {
      id,
      country,
      startDate: start,
      endDate: end,
      days: differenceInDays(end, start) + 1
    }
  }

  private static createTripFromDate(id: string, country: string, startDate: Date, endDate: Date): Trip {
    return {
      id,
      country,
      startDate: startOfDay(startDate),
      endDate: startOfDay(endDate),
      days: differenceInDays(endDate, startDate) + 1
    }
  }

  /**
   * Run a single test case
   */
  private static async runSingleTest(testCase: TestCase): Promise<TestResult> {
    const startTime = performance.now()
    
    try {
      const result = RobustSchengenCalculator.calculateExactCompliance(
        testCase.trips,
        testCase.referenceDate
      )
      
      const endTime = performance.now()
      const executionTime = endTime - startTime

      const passed = this.validateTestResult(result, testCase.expectedResult)
      
      return {
        name: testCase.name,
        passed,
        description: testCase.description,
        executionTime,
        details: passed ? 'PASS' : this.getFailureDetails(result, testCase.expectedResult),
        category: testCase.category
      }
    } catch (error) {
      const endTime = performance.now()
      
      return {
        name: testCase.name,
        passed: false,
        description: testCase.description,
        executionTime: endTime - startTime,
        details: `ERROR: ${error instanceof Error ? error.message : String(error)}`,
        category: testCase.category
      }
    }
  }

  /**
   * Run a performance test case
   */
  private static async runPerformanceTest(testCase: PerformanceTestCase): Promise<TestResult> {
    const startTime = performance.now()
    
    try {
      const result = RobustSchengenCalculator.calculateExactCompliance(
        testCase.trips,
        testCase.referenceDate
      )
      
      const endTime = performance.now()
      const executionTime = endTime - startTime

      const passed = executionTime <= testCase.maxExecutionTime
      
      return {
        name: testCase.name,
        passed,
        description: testCase.description,
        executionTime,
        details: passed ? 
          `PASS (${executionTime.toFixed(2)}ms)` : 
          `SLOW (${executionTime.toFixed(2)}ms > ${testCase.maxExecutionTime}ms)`,
        category: testCase.category
      }
    } catch (error) {
      const endTime = performance.now()
      
      return {
        name: testCase.name,
        passed: false,
        description: testCase.description,
        executionTime: endTime - startTime,
        details: `ERROR: ${error instanceof Error ? error.message : String(error)}`,
        category: testCase.category
      }
    }
  }

  /**
   * Run baseline test for regression testing
   */
  private static async runBaselineTest(baselineTest: BaselineTestCase): Promise<{ result: ComplianceResult; executionTime: number }> {
    const startTime = performance.now()
    
    const result = RobustSchengenCalculator.calculateExactCompliance(
      baselineTest.trips,
      baselineTest.referenceDate
    )
    
    const endTime = performance.now()
    
    return {
      result,
      executionTime: endTime - startTime
    }
  }

  /**
   * Validate test result against expected result
   */
  private static validateTestResult(actual: ComplianceResult, expected: ExpectedResult): boolean {
    return (
      actual.totalDaysUsed === expected.totalDaysUsed &&
      actual.isCompliant === expected.isCompliant &&
      actual.overstayDays === expected.overstayDays
    )
  }

  /**
   * Get failure details for debugging
   */
  private static getFailureDetails(actual: ComplianceResult, expected: ExpectedResult): string {
    const details: string[] = []
    
    if (actual.totalDaysUsed !== expected.totalDaysUsed) {
      details.push(`Days: expected ${expected.totalDaysUsed}, got ${actual.totalDaysUsed}`)
    }
    
    if (actual.isCompliant !== expected.isCompliant) {
      details.push(`Compliance: expected ${expected.isCompliant}, got ${actual.isCompliant}`)
    }
    
    if (actual.overstayDays !== expected.overstayDays) {
      details.push(`Overstay: expected ${expected.overstayDays}, got ${actual.overstayDays}`)
    }
    
    return `FAIL - ${details.join(', ')}`
  }

  /**
   * Detect regression between baseline and current result
   */
  private static detectRegression(baseline: ExpectedResult, current: ComplianceResult): boolean {
    return (
      baseline.totalDaysUsed !== current.totalDaysUsed ||
      baseline.isCompliant !== current.isCompliant ||
      baseline.overstayDays !== current.overstayDays
    )
  }

  /**
   * Generate comprehensive test summary
   */
  private static generateTestSummary(results: CategoryResult[], totalTime: number): TestSuiteResult {
    const totalTests = results.reduce((sum, r) => sum + r.totalTests, 0)
    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0)
    const totalFailed = results.reduce((sum, r) => sum + r.failed, 0)
    const overallPassRate = totalTests > 0 ? (totalPassed / totalTests) * 100 : 0

    return {
      summary: {
        timestamp: new Date().toISOString(),
        totalTests,
        totalPassed,
        totalFailed,
        overallPassRate,
        totalExecutionTime: totalTime,
        status: totalFailed === 0 ? 'PASS' : 'FAIL'
      },
      categories: results,
      metrics: {
        averageTestTime: totalTests > 0 ? totalTime / totalTests : 0,
        testCoverage: this.calculateTestCoverage(results),
        qualityScore: this.calculateQualityScore(results)
      },
      recommendations: this.generateRecommendations(results)
    }
  }

  /**
   * Calculate test coverage score
   */
  private static calculateTestCoverage(results: CategoryResult[]): number {
    const expectedCategories = Object.keys(this.TEST_CATEGORIES).length
    const actualCategories = results.length
    return (actualCategories / expectedCategories) * 100
  }

  /**
   * Calculate overall quality score
   */
  private static calculateQualityScore(results: CategoryResult[]): number {
    const weights = {
      [this.TEST_CATEGORIES.EU_COMPLIANCE]: 0.25,
      [this.TEST_CATEGORIES.CALCULATION_ACCURACY]: 0.25,
      [this.TEST_CATEGORIES.EDGE_CASES]: 0.2,
      [this.TEST_CATEGORIES.PERFORMANCE]: 0.15,
      [this.TEST_CATEGORIES.BOUNDARY_CONDITIONS]: 0.1,
      [this.TEST_CATEGORIES.REAL_WORLD]: 0.05
    }

    let weightedScore = 0
    let totalWeight = 0

    for (const result of results) {
      const weight = weights[result.category] || 0.1
      weightedScore += result.passRate * weight
      totalWeight += weight
    }

    return totalWeight > 0 ? weightedScore / totalWeight : 0
  }

  /**
   * Generate recommendations based on test results
   */
  private static generateRecommendations(results: CategoryResult[]): string[] {
    const recommendations: string[] = []
    
    for (const result of results) {
      if (result.passRate < 100) {
        recommendations.push(`⚠️  ${result.category}: ${result.failed} tests failed - review implementation`)
      }
      
      if (result.metrics?.averageExecutionTime && result.metrics.averageExecutionTime > 20) {
        recommendations.push(`🐌 ${result.category}: Average execution time (${result.metrics.averageExecutionTime.toFixed(2)}ms) exceeds 20ms - optimize performance`)
      }
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ All tests passing - calculator is production ready')
      recommendations.push('✅ Performance within acceptable limits')
      recommendations.push('✅ EU compliance maintained')
    }
    
    return recommendations
  }

  /**
   * Save test report to file
   */
  private static async saveTestReport(summary: TestSuiteResult, outputFile: string): Promise<void> {
    const report = {
      ...summary,
      generatedBy: 'Automated Schengen Calculator Test Suite',
      version: '1.0.0'
    }
    
    // In a real implementation, this would write to file
    console.log(`📄 Test report would be saved to: ${outputFile}`)
    console.log(JSON.stringify(report, null, 2))
  }
}

// Type definitions
interface TestSuiteOptions {
  skipEUCompliance?: boolean
  skipAccuracy?: boolean
  skipEdgeCases?: boolean
  skipPerformance?: boolean
  skipBoundary?: boolean
  skipRealWorld?: boolean
  outputFile?: string
  regressionBaseline?: RegressionBaseline
}

interface TestCase {
  name: string
  description: string
  trips: Trip[]
  referenceDate: Date
  expectedResult: ExpectedResult
  category: string
}

interface PerformanceTestCase extends Omit<TestCase, 'expectedResult'> {
  maxExecutionTime: number
}

interface ExpectedResult {
  totalDaysUsed: number
  isCompliant: boolean
  overstayDays: number
}

interface TestResult {
  name: string
  passed: boolean
  description: string
  executionTime: number
  details: string
  category: string
}

interface CategoryResult {
  category: string
  totalTests: number
  passed: number
  failed: number
  passRate: number
  executionTime: number
  tests: TestResult[]
  metrics?: Record<string, number>
}

interface TestSuiteResult {
  summary: {
    timestamp: string
    totalTests: number
    totalPassed: number
    totalFailed: number
    overallPassRate: number
    totalExecutionTime: number
    status: 'PASS' | 'FAIL'
  }
  categories: CategoryResult[]
  metrics: {
    averageTestTime: number
    testCoverage: number
    qualityScore: number
  }
  recommendations: string[]
}

interface RegressionBaseline {
  version: string
  testCases: BaselineTestCase[]
}

interface BaselineTestCase {
  name: string
  description: string
  trips: Trip[]
  referenceDate: Date
  expectedResult: ExpectedResult
}