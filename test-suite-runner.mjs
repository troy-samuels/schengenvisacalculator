#!/usr/bin/env node

/**
 * CI/CD Compatible Automated Test Suite Runner
 * 
 * Usage:
 *   node test-suite-runner.mjs [options]
 * 
 * Options:
 *   --fast                 Run fast tests only (skip performance)
 *   --full                 Run complete test suite
 *   --output <file>        Save results to file
 *   --format <json|junit>  Output format
 *   --baseline <file>      Regression baseline file
 *   --verbose              Verbose output
 *   --fail-fast            Stop on first failure
 */

import { addDays, subDays, startOfDay, format, differenceInDays, parseISO } from 'date-fns'
import { performance } from 'perf_hooks'
import { writeFileSync } from 'fs'
import { argv } from 'process'

// Simplified calculator for testing
class RobustSchengenCalculator {
  static MAX_DAYS_IN_PERIOD = 90
  static ROLLING_PERIOD_DAYS = 180

  static calculateExactCompliance(trips, referenceDate = new Date()) {
    const normalizedRefDate = startOfDay(referenceDate)
    const periodStart = subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1)
    
    if (trips.length === 0) {
      return {
        totalDaysUsed: 0,
        daysRemaining: this.MAX_DAYS_IN_PERIOD,
        isCompliant: true,
        overstayDays: 0
      }
    }
    
    const daysInWindow = this.calculateDaysInWindow(trips, normalizedRefDate)
    const overstayDays = Math.max(0, daysInWindow - this.MAX_DAYS_IN_PERIOD)
    
    return {
      totalDaysUsed: daysInWindow,
      daysRemaining: Math.max(0, this.MAX_DAYS_IN_PERIOD - daysInWindow),
      isCompliant: overstayDays === 0,
      overstayDays
    }
  }

  static calculateDaysInWindow(trips, endDate) {
    const normalizedEndDate = startOfDay(endDate)
    const windowStart = subDays(normalizedEndDate, this.ROLLING_PERIOD_DAYS - 1)
    
    let totalDays = 0
    
    for (const trip of trips) {
      const tripStart = startOfDay(trip.startDate)
      const tripEnd = startOfDay(trip.endDate)
      
      const overlapStart = tripStart > windowStart ? tripStart : windowStart
      const overlapEnd = tripEnd < normalizedEndDate ? tripEnd : normalizedEndDate
      
      if (overlapStart <= overlapEnd) {
        totalDays += differenceInDays(overlapEnd, overlapStart) + 1
      }
    }
    
    return totalDays
  }
}

class AutomatedTestSuite {
  static async run(options = {}) {
    const startTime = performance.now()
    
    console.log('🤖 AUTOMATED SCHENGEN CALCULATOR TEST SUITE')
    console.log('==========================================')
    console.log(`Started: ${new Date().toISOString()}`)
    console.log(`Mode: ${options.fast ? 'FAST' : 'FULL'}`)
    if (options.verbose) {
      console.log(`Options: ${JSON.stringify(options, null, 2)}`)
    }
    console.log('')

    const results = []
    let totalTests = 0
    let totalPassed = 0
    let totalFailed = 0

    try {
      // 1. EU Compliance Tests
      if (!options.skipEU) {
        const euResult = await this.runEUComplianceTests(options)
        results.push(euResult)
        totalTests += euResult.totalTests
        totalPassed += euResult.passed
        totalFailed += euResult.failed
      }

      // 2. Calculation Accuracy Tests
      if (!options.skipAccuracy) {
        const accuracyResult = await this.runAccuracyTests(options)
        results.push(accuracyResult)
        totalTests += accuracyResult.totalTests
        totalPassed += accuracyResult.passed
        totalFailed += accuracyResult.failed
      }

      // 3. Edge Case Tests
      if (!options.skipEdge) {
        const edgeResult = await this.runEdgeCaseTests(options)
        results.push(edgeResult)
        totalTests += edgeResult.totalTests
        totalPassed += edgeResult.passed
        totalFailed += edgeResult.failed
      }

      // 4. Performance Tests (skip in fast mode)
      if (!options.fast && !options.skipPerformance) {
        const perfResult = await this.runPerformanceTests(options)
        results.push(perfResult)
        totalTests += perfResult.totalTests
        totalPassed += perfResult.passed
        totalFailed += perfResult.failed
      }

      // 5. Boundary Tests
      if (!options.skipBoundary) {
        const boundaryResult = await this.runBoundaryTests(options)
        results.push(boundaryResult)
        totalTests += boundaryResult.totalTests
        totalPassed += boundaryResult.passed
        totalFailed += boundaryResult.failed
      }

      const endTime = performance.now()
      const totalTime = endTime - startTime

      // Generate summary
      const summary = {
        timestamp: new Date().toISOString(),
        totalTests,
        totalPassed,
        totalFailed,
        passRate: totalTests > 0 ? (totalPassed / totalTests) * 100 : 0,
        totalTime: totalTime,
        status: totalFailed === 0 ? 'PASS' : 'FAIL',
        categories: results
      }

      // Output results
      this.outputResults(summary, options)

      // Save to file if requested
      if (options.output) {
        this.saveResults(summary, options.output, options.format || 'json')
      }

      // Exit with appropriate code
      const exitCode = totalFailed === 0 ? 0 : 1
      if (options.verbose) {
        console.log(`\\nExiting with code: ${exitCode}`)
      }
      
      return { summary, exitCode }

    } catch (error) {
      console.error('❌ Test suite execution failed:', error.message)
      if (options.verbose) {
        console.error(error.stack)
      }
      return { error: error.message, exitCode: 2 }
    }
  }

  static async runEUComplianceTests(options) {
    if (options.verbose) console.log('📋 Running EU Compliance Tests...')
    
    const tests = this.getEUComplianceTests()
    const startTime = performance.now()
    let passed = 0
    let failed = 0
    const testResults = []

    for (const test of tests) {
      const result = await this.executeTest(test, options)
      testResults.push(result)
      
      if (result.passed) {
        passed++
        if (options.verbose) console.log(`   ✅ ${test.name}`)
      } else {
        failed++
        console.log(`   ❌ ${test.name}: ${result.error}`)
        if (options.failFast) {
          throw new Error(`Test failed: ${test.name}`)
        }
      }
    }

    const endTime = performance.now()
    
    console.log(`📋 EU Compliance: ${passed}/${tests.length} passed (${((passed/tests.length)*100).toFixed(1)}%)`)
    
    return {
      category: 'EU Compliance',
      totalTests: tests.length,
      passed,
      failed,
      executionTime: endTime - startTime,
      tests: testResults
    }
  }

  static async runAccuracyTests(options) {
    if (options.verbose) console.log('🔢 Running Calculation Accuracy Tests...')
    
    const tests = this.getAccuracyTests()
    const startTime = performance.now()
    let passed = 0
    let failed = 0
    const testResults = []

    for (const test of tests) {
      const result = await this.executeTest(test, options)
      testResults.push(result)
      
      if (result.passed) {
        passed++
        if (options.verbose) console.log(`   ✅ ${test.name}`)
      } else {
        failed++
        console.log(`   ❌ ${test.name}: ${result.error}`)
        if (options.failFast) {
          throw new Error(`Test failed: ${test.name}`)
        }
      }
    }

    const endTime = performance.now()
    
    console.log(`🔢 Accuracy: ${passed}/${tests.length} passed (${((passed/tests.length)*100).toFixed(1)}%)`)
    
    return {
      category: 'Calculation Accuracy',
      totalTests: tests.length,
      passed,
      failed,
      executionTime: endTime - startTime,
      tests: testResults
    }
  }

  static async runEdgeCaseTests(options) {
    if (options.verbose) console.log('⚡ Running Edge Case Tests...')
    
    const tests = this.getEdgeCaseTests()
    const startTime = performance.now()
    let passed = 0
    let failed = 0
    const testResults = []

    for (const test of tests) {
      const result = await this.executeTest(test, options)
      testResults.push(result)
      
      if (result.passed) {
        passed++
        if (options.verbose) console.log(`   ✅ ${test.name}`)
      } else {
        failed++
        console.log(`   ❌ ${test.name}: ${result.error}`)
        if (options.failFast) {
          throw new Error(`Test failed: ${test.name}`)
        }
      }
    }

    const endTime = performance.now()
    
    console.log(`⚡ Edge Cases: ${passed}/${tests.length} passed (${((passed/tests.length)*100).toFixed(1)}%)`)
    
    return {
      category: 'Edge Cases',
      totalTests: tests.length,
      passed,
      failed,
      executionTime: endTime - startTime,
      tests: testResults
    }
  }

  static async runPerformanceTests(options) {
    if (options.verbose) console.log('🚀 Running Performance Tests...')
    
    const tests = this.getPerformanceTests()
    const startTime = performance.now()
    let passed = 0
    let failed = 0
    const testResults = []

    for (const test of tests) {
      const result = await this.executePerformanceTest(test, options)
      testResults.push(result)
      
      if (result.passed) {
        passed++
        if (options.verbose) console.log(`   ✅ ${test.name} (${result.executionTime.toFixed(2)}ms)`)
      } else {
        failed++
        console.log(`   ❌ ${test.name}: ${result.error} (${result.executionTime.toFixed(2)}ms)`)
        if (options.failFast) {
          throw new Error(`Test failed: ${test.name}`)
        }
      }
    }

    const endTime = performance.now()
    
    console.log(`🚀 Performance: ${passed}/${tests.length} passed (${((passed/tests.length)*100).toFixed(1)}%)`)
    
    return {
      category: 'Performance',
      totalTests: tests.length,
      passed,
      failed,
      executionTime: endTime - startTime,
      tests: testResults
    }
  }

  static async runBoundaryTests(options) {
    if (options.verbose) console.log('🎯 Running Boundary Tests...')
    
    const tests = this.getBoundaryTests()
    const startTime = performance.now()
    let passed = 0
    let failed = 0
    const testResults = []

    for (const test of tests) {
      const result = await this.executeTest(test, options)
      testResults.push(result)
      
      if (result.passed) {
        passed++
        if (options.verbose) console.log(`   ✅ ${test.name}`)
      } else {
        failed++
        console.log(`   ❌ ${test.name}: ${result.error}`)
        if (options.failFast) {
          throw new Error(`Test failed: ${test.name}`)
        }
      }
    }

    const endTime = performance.now()
    
    console.log(`🎯 Boundary: ${passed}/${tests.length} passed (${((passed/tests.length)*100).toFixed(1)}%)`)
    
    return {
      category: 'Boundary Conditions',
      totalTests: tests.length,
      passed,
      failed,
      executionTime: endTime - startTime,
      tests: testResults
    }
  }

  static async executeTest(test, options) {
    const startTime = performance.now()
    
    try {
      const result = RobustSchengenCalculator.calculateExactCompliance(
        test.trips,
        test.referenceDate
      )
      
      const endTime = performance.now()
      const executionTime = endTime - startTime

      const passed = this.validateResult(result, test.expected)
      
      return {
        name: test.name,
        passed,
        executionTime,
        error: passed ? null : this.getErrorMessage(result, test.expected)
      }
    } catch (error) {
      const endTime = performance.now()
      
      return {
        name: test.name,
        passed: false,
        executionTime: endTime - startTime,
        error: error.message
      }
    }
  }

  static async executePerformanceTest(test, options) {
    const startTime = performance.now()
    
    try {
      const result = RobustSchengenCalculator.calculateExactCompliance(
        test.trips,
        test.referenceDate
      )
      
      const endTime = performance.now()
      const executionTime = endTime - startTime

      const passed = executionTime <= test.maxTime
      
      return {
        name: test.name,
        passed,
        executionTime,
        error: passed ? null : `Execution time ${executionTime.toFixed(2)}ms exceeds limit ${test.maxTime}ms`
      }
    } catch (error) {
      const endTime = performance.now()
      
      return {
        name: test.name,
        passed: false,
        executionTime: endTime - startTime,
        error: error.message
      }
    }
  }

  static validateResult(actual, expected) {
    return (
      actual.totalDaysUsed === expected.totalDaysUsed &&
      actual.isCompliant === expected.isCompliant &&
      actual.overstayDays === expected.overstayDays
    )
  }

  static getErrorMessage(actual, expected) {
    const errors = []
    
    if (actual.totalDaysUsed !== expected.totalDaysUsed) {
      errors.push(`Days: expected ${expected.totalDaysUsed}, got ${actual.totalDaysUsed}`)
    }
    
    if (actual.isCompliant !== expected.isCompliant) {
      errors.push(`Compliance: expected ${expected.isCompliant}, got ${actual.isCompliant}`)
    }
    
    if (actual.overstayDays !== expected.overstayDays) {
      errors.push(`Overstay: expected ${expected.overstayDays}, got ${actual.overstayDays}`)
    }
    
    return errors.join(', ')
  }

  static createTrip(id, country, startDate, endDate) {
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

  static getEUComplianceTests() {
    return [
      {
        name: 'KOM 1.1: Multiple short stays',
        trips: [
          this.createTrip('jan', 'FR', '2024-01-10', '2024-01-16'),
          this.createTrip('mar', 'IT', '2024-03-05', '2024-03-18'),
          this.createTrip('jun', 'DE', '2024-06-01', '2024-06-21'),
          this.createTrip('sep', 'ES', '2024-09-01', '2024-09-28')
        ],
        referenceDate: new Date('2024-12-15'),
        expected: { totalDaysUsed: 31, isCompliant: true, overstayDays: 0 }
      },
      {
        name: 'KOM 1.2: Exact 90-day limit',
        trips: [this.createTrip('long', 'AT', '2024-10-03', '2024-12-31')],
        referenceDate: new Date('2024-12-31'),
        expected: { totalDaysUsed: 90, isCompliant: true, overstayDays: 0 }
      },
      {
        name: 'KOM 1.3: Overstay scenario',
        trips: [this.createTrip('overstay', 'NL', '2024-05-01', '2024-08-15')],
        referenceDate: new Date('2024-08-15'),
        expected: { totalDaysUsed: 107, isCompliant: false, overstayDays: 17 }
      },
      {
        name: 'KOM 1.4: Unsorted entries',
        trips: [
          this.createTrip('recent', 'CH', '2024-10-15', '2024-10-25'),
          this.createTrip('old', 'FR', '2024-01-10', '2024-01-20'),
          this.createTrip('middle', 'DE', '2024-08-01', '2024-08-15')
        ],
        referenceDate: new Date('2024-11-30'),
        expected: { totalDaysUsed: 26, isCompliant: true, overstayDays: 0 }
      }
    ]
  }

  static getAccuracyTests() {
    return [
      {
        name: 'Single day precision',
        trips: [this.createTrip('single', 'FR', '2024-06-15', '2024-06-15')],
        referenceDate: new Date('2024-06-30'),
        expected: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 }
      },
      {
        name: 'Multiple trip aggregation',
        trips: [
          this.createTrip('trip1', 'IT', '2024-01-01', '2024-01-15'),
          this.createTrip('trip2', 'ES', '2024-02-01', '2024-02-20'),
          this.createTrip('trip3', 'FR', '2024-03-01', '2024-03-25')
        ],
        referenceDate: new Date('2024-04-01'),
        expected: { totalDaysUsed: 60, isCompliant: true, overstayDays: 0 }
      }
    ]
  }

  static getEdgeCaseTests() {
    return [
      {
        name: 'Leap year February 29th',
        trips: [this.createTrip('leap', 'FR', '2024-02-28', '2024-03-01')],
        referenceDate: new Date('2024-03-15'),
        expected: { totalDaysUsed: 3, isCompliant: true, overstayDays: 0 }
      },
      {
        name: 'Same date start and end',
        trips: [this.createTrip('same', 'DE', '2024-06-15', '2024-06-15')],
        referenceDate: new Date('2024-06-30'),
        expected: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 }
      }
    ]
  }

  static getPerformanceTests() {
    return [
      {
        name: 'Large dataset performance',
        trips: Array.from({ length: 100 }, (_, i) => 
          this.createTrip(`perf${i}`, 'FR', 
            format(addDays(new Date('2024-01-01'), i * 2), 'yyyy-MM-dd'),
            format(addDays(new Date('2024-01-01'), i * 2 + 1), 'yyyy-MM-dd')
          )
        ),
        referenceDate: new Date('2024-12-31'),
        maxTime: 50
      }
    ]
  }

  static getBoundaryTests() {
    const today = startOfDay(new Date('2024-06-30'))
    const exactBoundary = subDays(today, 179)
    const outsideBoundary = subDays(today, 180)

    return [
      {
        name: 'Exact 180-day boundary inclusion',
        trips: [{
          id: 'boundary',
          country: 'FR',
          startDate: exactBoundary,
          endDate: exactBoundary,
          days: 1
        }],
        referenceDate: today,
        expected: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 }
      },
      {
        name: 'Outside 180-day boundary exclusion',
        trips: [{
          id: 'outside',
          country: 'FR',
          startDate: outsideBoundary,
          endDate: outsideBoundary,
          days: 1
        }],
        referenceDate: today,
        expected: { totalDaysUsed: 0, isCompliant: true, overstayDays: 0 }
      }
    ]
  }

  static outputResults(summary, options) {
    console.log('\\n🏆 TEST SUITE SUMMARY')
    console.log('=====================')
    console.log(`Status: ${summary.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`)
    console.log(`Total Tests: ${summary.totalTests}`)
    console.log(`Passed: ${summary.totalPassed}`)
    console.log(`Failed: ${summary.totalFailed}`)
    console.log(`Pass Rate: ${summary.passRate.toFixed(1)}%`)
    console.log(`Execution Time: ${summary.totalTime.toFixed(2)}ms`)
    
    if (options.verbose && summary.totalFailed > 0) {
      console.log('\\n❌ Failed Tests:')
      summary.categories.forEach(category => {
        category.tests.forEach(test => {
          if (!test.passed) {
            console.log(`   - ${category.category}: ${test.name} - ${test.error}`)
          }
        })
      })
    }
    
    console.log('')
  }

  static saveResults(summary, outputFile, format) {
    try {
      let content
      
      if (format === 'junit') {
        content = this.generateJUnitXML(summary)
      } else {
        content = JSON.stringify(summary, null, 2)
      }
      
      writeFileSync(outputFile, content)
      console.log(`📄 Results saved to: ${outputFile}`)
    } catch (error) {
      console.error(`❌ Failed to save results: ${error.message}`)
    }
  }

  static generateJUnitXML(summary) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += `<testsuites tests="${summary.totalTests}" failures="${summary.totalFailed}" time="${(summary.totalTime/1000).toFixed(3)}">\n`
    
    summary.categories.forEach(category => {
      xml += `  <testsuite name="${category.category}" tests="${category.totalTests}" failures="${category.failed}" time="${(category.executionTime/1000).toFixed(3)}">\n`
      
      category.tests.forEach(test => {
        xml += `    <testcase name="${test.name}" time="${(test.executionTime/1000).toFixed(3)}">`
        
        if (!test.passed) {
          xml += `\n      <failure message="${test.error}"></failure>\n    `
        }
        
        xml += `</testcase>\n`
      })
      
      xml += `  </testsuite>\n`
    })
    
    xml += `</testsuites>\n`
    return xml
  }
}

// Parse command line arguments
function parseArgs() {
  const options = {
    fast: false,
    full: true,
    verbose: false,
    failFast: false
  }

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]
    
    switch (arg) {
      case '--fast':
        options.fast = true
        break
      case '--full':
        options.full = true
        break
      case '--verbose':
        options.verbose = true
        break
      case '--fail-fast':
        options.failFast = true
        break
      case '--output':
        options.output = argv[++i]
        break
      case '--format':
        options.format = argv[++i]
        break
      case '--baseline':
        options.baseline = argv[++i]
        break
      case '--help':
        console.log(`
Usage: node test-suite-runner.mjs [options]

Options:
  --fast                 Run fast tests only (skip performance)
  --full                 Run complete test suite
  --output <file>        Save results to file
  --format <json|junit>  Output format (default: json)
  --baseline <file>      Regression baseline file
  --verbose              Verbose output
  --fail-fast            Stop on first failure
  --help                 Show this help
`)
        process.exit(0)
        break
    }
  }

  return options
}

// Main execution
async function main() {
  const options = parseArgs()
  
  try {
    const { summary, exitCode } = await AutomatedTestSuite.run(options)
    process.exit(exitCode)
  } catch (error) {
    console.error('❌ Fatal error:', error.message)
    process.exit(2)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { AutomatedTestSuite }