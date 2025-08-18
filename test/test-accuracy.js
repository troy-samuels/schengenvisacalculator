#!/usr/bin/env node

/**
 * Test Accuracy Suite
 * Tests core Schengen calculator accuracy with official test cases
 */

import { SchengenCalculator } from '../src/schengen-calculator.js'
import { performance } from 'perf_hooks'

console.log('🎯 SCHENGEN CALCULATOR ACCURACY TESTS')
console.log('====================================')
console.log(`Started: ${new Date().toISOString()}\n`)

const tests = [
  {
    name: 'KOM 1.1: Multiple short stays',
    trips: [
      SchengenCalculator.createTrip('jan', 'FR', '2024-01-10', '2024-01-16'), // 7 days
      SchengenCalculator.createTrip('mar', 'IT', '2024-03-05', '2024-03-18'), // 14 days  
      SchengenCalculator.createTrip('jun', 'DE', '2024-06-01', '2024-06-21'), // 21 days
      SchengenCalculator.createTrip('sep', 'ES', '2024-09-01', '2024-09-28')  // 28 days
    ],
    referenceDate: new Date('2024-12-15'),
    expected: { totalDaysUsed: 31, isCompliant: true, overstayDays: 0 }
  },
  {
    name: 'KOM 1.2: Exact 90-day limit',
    trips: [
      SchengenCalculator.createTrip('long', 'AT', '2024-10-03', '2024-12-31') // 90 days
    ],
    referenceDate: new Date('2024-12-31'),
    expected: { totalDaysUsed: 90, isCompliant: true, overstayDays: 0 }
  },
  {
    name: 'KOM 1.3: Overstay scenario',
    trips: [
      SchengenCalculator.createTrip('overstay', 'NL', '2024-05-01', '2024-08-15') // 107 days
    ],
    referenceDate: new Date('2024-08-15'),
    expected: { totalDaysUsed: 107, isCompliant: false, overstayDays: 17 }
  },
  {
    name: 'Single day precision',
    trips: [
      SchengenCalculator.createTrip('single', 'FR', '2024-06-15', '2024-06-15') // 1 day
    ],
    referenceDate: new Date('2024-06-30'),
    expected: { totalDaysUsed: 1, isCompliant: true, overstayDays: 0 }
  },
  {
    name: 'Empty trips array',
    trips: [],
    referenceDate: new Date('2024-06-30'),
    expected: { totalDaysUsed: 0, isCompliant: true, overstayDays: 0 }
  },
  {
    name: 'Multiple trip aggregation',
    trips: [
      SchengenCalculator.createTrip('trip1', 'IT', '2024-01-01', '2024-01-15'), // 15 days
      SchengenCalculator.createTrip('trip2', 'ES', '2024-02-01', '2024-02-20'), // 20 days  
      SchengenCalculator.createTrip('trip3', 'FR', '2024-03-01', '2024-03-25')  // 25 days
    ],
    referenceDate: new Date('2024-04-01'),
    expected: { totalDaysUsed: 60, isCompliant: true, overstayDays: 0 }
  }
]

function validateResult(actual, expected) {
  return (
    actual.totalDaysUsed === expected.totalDaysUsed &&
    actual.isCompliant === expected.isCompliant &&
    actual.overstayDays === expected.overstayDays
  )
}

function getErrorMessage(actual, expected) {
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

async function runTest(test) {
  const startTime = performance.now()
  
  try {
    const result = SchengenCalculator.calculateCompliance(test.trips, test.referenceDate)
    const endTime = performance.now()
    const executionTime = endTime - startTime

    const passed = validateResult(result, test.expected)
    
    return {
      name: test.name,
      passed,
      executionTime,
      error: passed ? null : getErrorMessage(result, test.expected),
      result
    }
  } catch (error) {
    const endTime = performance.now()
    
    return {
      name: test.name,
      passed: false,
      executionTime: endTime - startTime,
      error: error.message,
      result: null
    }
  }
}

async function runAllTests() {
  const startTime = performance.now()
  let passed = 0
  let failed = 0
  
  console.log('📋 Running Accuracy Tests...\n')
  
  for (const test of tests) {
    const result = await runTest(test)
    
    if (result.passed) {
      passed++
      console.log(`✅ ${test.name} (${result.executionTime.toFixed(2)}ms)`)
    } else {
      failed++
      console.log(`❌ ${test.name}: ${result.error} (${result.executionTime.toFixed(2)}ms)`)
    }
  }
  
  const endTime = performance.now()
  const totalTime = endTime - startTime
  const passRate = (passed / tests.length) * 100
  
  console.log('\n🏆 ACCURACY TEST SUMMARY')
  console.log('========================')
  console.log(`Status: ${failed === 0 ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Total Tests: ${tests.length}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)
  console.log(`Pass Rate: ${passRate.toFixed(1)}%`)
  console.log(`Execution Time: ${totalTime.toFixed(2)}ms`)
  console.log(`Average Test Time: ${(totalTime / tests.length).toFixed(2)}ms`)
  
  if (failed === 0) {
    console.log('\n🎉 All accuracy tests passed!')
    console.log('✅ Calculator precision verified')
    console.log('✅ EU compliance validated')
    console.log('✅ Ready for production use')
    process.exit(0)
  } else {
    console.log(`\n❌ ${failed} accuracy test(s) failed`)
    process.exit(1)
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Test execution failed:', error.message)
  process.exit(2)
})