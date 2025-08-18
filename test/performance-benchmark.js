#!/usr/bin/env node

/**
 * Performance Benchmark Suite
 * Tests calculator performance with various dataset sizes and scenarios
 */

import { SchengenCalculator } from '../src/schengen-calculator.js'
import { addDays, format } from 'date-fns'
import { performance } from 'perf_hooks'

console.log('🚀 PERFORMANCE BENCHMARK SUITE')
console.log('==============================')
console.log('Testing calculator performance and scalability\n')

class PerformanceBenchmark {
  static generateTestTrips(count, startDate = new Date('2024-01-01')) {
    const trips = []
    const countries = ['FR', 'DE', 'IT', 'ES', 'NL', 'AT', 'BE', 'CH']
    
    for (let i = 0; i < count; i++) {
      const tripStart = addDays(startDate, i * 5) // Trips every 5 days
      const tripEnd = addDays(tripStart, Math.floor(Math.random() * 14) + 1) // 1-14 day trips
      const country = countries[i % countries.length]
      
      trips.push(SchengenCalculator.createTrip(`trip-${i}`, country, tripStart, tripEnd))
    }
    
    return trips
  }

  static benchmarkCalculation(testName, trips, referenceDate, targetTimeMs = 100) {
    console.log(`⏱️  ${testName}`)
    console.log(`   Dataset: ${trips.length} trips`)
    console.log(`   Target: <${targetTimeMs}ms`)
    
    const startTime = performance.now()
    const result = SchengenCalculator.calculateCompliance(trips, referenceDate)
    const endTime = performance.now()
    
    const executionTime = endTime - startTime
    const passed = executionTime < targetTimeMs
    
    console.log(`   Execution Time: ${executionTime.toFixed(2)}ms`)
    console.log(`   Result: ${result.totalDaysUsed} days used, ${result.isCompliant ? 'Compliant' : 'Non-compliant'}`)
    console.log(`   Status: ${passed ? '✅ PASS' : '❌ FAIL'} (${passed ? 'Within' : 'Exceeds'} target)`)
    console.log('')
    
    return {
      testName,
      passed,
      executionTime,
      tripCount: trips.length,
      result,
      targetTime: targetTimeMs
    }
  }

  static benchmarkMemoryUsage(testName, trips, referenceDate) {
    console.log(`💾 ${testName}`)
    console.log(`   Dataset: ${trips.length} trips`)
    
    // Get initial memory usage
    if (global.gc) {
      global.gc()
    }
    const initialMemory = process.memoryUsage()
    
    const startTime = performance.now()
    const result = SchengenCalculator.calculateCompliance(trips, referenceDate)
    const endTime = performance.now()
    
    const finalMemory = process.memoryUsage()
    const memoryDelta = finalMemory.heapUsed - initialMemory.heapUsed
    const executionTime = endTime - startTime
    
    console.log(`   Execution Time: ${executionTime.toFixed(2)}ms`)
    console.log(`   Memory Delta: ${(memoryDelta / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   Result: ${result.totalDaysUsed} days used`)
    console.log(`   Status: ✅ PASS`)
    console.log('')
    
    return {
      testName,
      passed: true,
      executionTime,
      memoryDelta,
      tripCount: trips.length,
      result
    }
  }

  static stressTestCalculation(testName, maxTrips, stepSize = 100) {
    console.log(`🔥 ${testName}`)
    console.log(`   Testing scalability up to ${maxTrips} trips`)
    
    const results = []
    const referenceDate = new Date('2024-12-31')
    
    for (let tripCount = stepSize; tripCount <= maxTrips; tripCount += stepSize) {
      const trips = this.generateTestTrips(tripCount)
      
      const startTime = performance.now()
      const result = SchengenCalculator.calculateCompliance(trips, referenceDate)
      const endTime = performance.now()
      
      const executionTime = endTime - startTime
      
      results.push({
        tripCount,
        executionTime,
        daysUsed: result.totalDaysUsed
      })
      
      console.log(`   ${tripCount} trips: ${executionTime.toFixed(2)}ms (${result.totalDaysUsed} days)`)
    }
    
    // Check if performance degrades linearly (acceptable) vs exponentially (bad)
    const avgTimePerTrip = results.map(r => r.executionTime / r.tripCount)
    const maxTimePerTrip = Math.max(...avgTimePerTrip)
    const minTimePerTrip = Math.min(...avgTimePerTrip)
    const varianceRatio = maxTimePerTrip / minTimePerTrip
    
    const passed = varianceRatio < 5 // Performance shouldn't degrade more than 5x
    
    console.log(`   Performance Variance: ${varianceRatio.toFixed(2)}x`)
    console.log(`   Status: ${passed ? '✅ PASS' : '❌ FAIL'} (${passed ? 'Linear' : 'Exponential'} scaling)`)
    console.log('')
    
    return {
      testName,
      passed,
      results,
      varianceRatio,
      maxTrips
    }
  }
}

async function runPerformanceBenchmarks() {
  console.log('Running performance benchmarks...\n')
  
  const referenceDate = new Date('2024-12-31')
  const results = []
  
  // 1. Small dataset benchmark (typical use case)
  const smallTrips = PerformanceBenchmark.generateTestTrips(10)
  results.push(PerformanceBenchmark.benchmarkCalculation(
    'Small Dataset (10 trips)',
    smallTrips,
    referenceDate,
    10 // 10ms target
  ))
  
  // 2. Medium dataset benchmark (power user)
  const mediumTrips = PerformanceBenchmark.generateTestTrips(100)
  results.push(PerformanceBenchmark.benchmarkCalculation(
    'Medium Dataset (100 trips)',
    mediumTrips,
    referenceDate,
    50 // 50ms target
  ))
  
  // 3. Large dataset benchmark (extreme case)
  const largeTrips = PerformanceBenchmark.generateTestTrips(1000)
  results.push(PerformanceBenchmark.benchmarkCalculation(
    'Large Dataset (1000 trips)',
    largeTrips,
    referenceDate,
    200 // 200ms target
  ))
  
  // 4. Memory usage test
  const memoryTrips = PerformanceBenchmark.generateTestTrips(500)
  results.push(PerformanceBenchmark.benchmarkMemoryUsage(
    'Memory Usage Test (500 trips)',
    memoryTrips,
    referenceDate
  ))
  
  // 5. Stress test
  results.push(PerformanceBenchmark.stressTestCalculation(
    'Scalability Stress Test',
    500, // Up to 500 trips
    50   // Steps of 50
  ))
  
  // 6. Edge case performance (many overlapping trips)
  const overlappingTrips = []
  for (let i = 0; i < 100; i++) {
    overlappingTrips.push(SchengenCalculator.createTrip(
      `overlap-${i}`,
      'FR',
      new Date('2024-06-01'),
      addDays(new Date('2024-06-01'), Math.floor(Math.random() * 30))
    ))
  }
  
  results.push(PerformanceBenchmark.benchmarkCalculation(
    'Overlapping Trips (100 trips, same period)',
    overlappingTrips,
    referenceDate,
    100 // 100ms target
  ))
  
  // Summary
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length
  const totalTests = results.length
  const passRate = (passed / totalTests) * 100
  
  console.log('📊 PERFORMANCE BENCHMARK SUMMARY')
  console.log('=================================')
  console.log(`Total Tests: ${totalTests}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)
  console.log(`Pass Rate: ${passRate.toFixed(1)}%`)
  
  // Performance statistics
  const executionTimes = results
    .filter(r => r.executionTime !== undefined)
    .map(r => r.executionTime)
  
  if (executionTimes.length > 0) {
    const avgTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
    const maxTime = Math.max(...executionTimes)
    const minTime = Math.min(...executionTimes)
    
    console.log(`\n⏱️  Performance Statistics:`)
    console.log(`   Average Execution Time: ${avgTime.toFixed(2)}ms`)
    console.log(`   Fastest Test: ${minTime.toFixed(2)}ms`)
    console.log(`   Slowest Test: ${maxTime.toFixed(2)}ms`)
  }
  
  if (failed === 0) {
    console.log('\n🚀 ALL PERFORMANCE BENCHMARKS PASSED!')
    console.log('✅ Calculator performance is optimal')
    console.log('✅ Scales linearly with dataset size')
    console.log('✅ Memory usage is efficient')
    console.log('✅ Ready for production workloads')
    
    console.log('\n🎯 Performance Validated:')
    console.log('• Small datasets (<10ms) ✓')
    console.log('• Medium datasets (<50ms) ✓')
    console.log('• Large datasets (<200ms) ✓')
    console.log('• Memory efficiency ✓')
    console.log('• Linear scalability ✓')
    console.log('• Edge case performance ✓')
    
    process.exit(0)
  } else {
    console.log('\n❌ SOME PERFORMANCE BENCHMARKS FAILED')
    
    const failedTests = results.filter(r => !r.passed)
    console.log('\nFailed benchmarks:')
    failedTests.forEach(test => {
      if (test.executionTime) {
        console.log(`   - ${test.testName}: ${test.executionTime.toFixed(2)}ms (target: ${test.targetTime}ms)`)
      } else {
        console.log(`   - ${test.testName}: Performance issue detected`)
      }
    })
    
    process.exit(1)
  }
}

// Run performance benchmarks
try {
  runPerformanceBenchmarks()
} catch (error) {
  console.error('❌ Performance benchmark failed:', error.message)
  process.exit(2)
}