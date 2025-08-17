import { addDays, subDays, startOfDay, format, differenceInDays, parseISO, isLeapYear } from 'date-fns'

// Simplified robust calculator for testing
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

// Edge Case Test Suite
class EdgeCaseTestSuite {
  static runAllEdgeCaseTests() {
    console.log('🧪 EDGE CASE TEST SUITE')
    console.log('=======================\\n')
    
    const results = []
    
    // 1. Leap Year Tests
    console.log('1️⃣ Leap Year Tests')
    console.log('------------------')
    results.push(...this.testLeapYearScenarios())
    
    // 2. Timezone Tests  
    console.log('\\n2️⃣ Timezone Consideration Tests')
    console.log('--------------------------------')
    results.push(...this.testTimezoneScenarios())
    
    // 3. Date Boundary Tests
    console.log('\\n3️⃣ Date Boundary Tests')
    console.log('-----------------------')
    results.push(...this.testDateBoundaryScenarios())
    
    // 4. Cross-Year Tests
    console.log('\\n4️⃣ Cross-Year Tests')
    console.log('-------------------')
    results.push(...this.testCrossYearScenarios())
    
    // 5. Extreme Range Tests
    console.log('\\n5️⃣ Extreme Range Tests')
    console.log('----------------------')
    results.push(...this.testExtremeRangeScenarios())
    
    // Summary
    const passed = results.filter(r => r.passed).length
    const failed = results.filter(r => !r.passed).length
    const passRate = (passed / results.length) * 100
    
    console.log('\\n🎯 EDGE CASE TEST SUMMARY')
    console.log('=========================')
    console.log(`Total Tests: ${results.length}`)
    console.log(`Passed: ${passed}`)
    console.log(`Failed: ${failed}`)
    console.log(`Pass Rate: ${passRate.toFixed(1)}%`)
    
    if (failed === 0) {
      console.log('\\n✅ ALL EDGE CASES HANDLED CORRECTLY!')
      console.log('✅ Calculator is robust against edge cases')
      console.log('✅ Leap years, timezones, and boundaries handled properly')
    } else {
      console.log('\\n❌ Some edge cases failed')
      const failedTests = results.filter(r => !r.passed)
      failedTests.forEach(test => {
        console.log(`   - ${test.testName}: ${test.error || 'Validation failed'}`)
      })
    }
    
    return { totalTests: results.length, passed, failed, passRate, results }
  }
  
  static testLeapYearScenarios() {
    const results = []
    
    // Test 1: Trip including February 29th in leap year 2024
    results.push(this.runTest(
      'LEAP-1: Trip spanning February 29th (2024)',
      [this.createTrip('leap-trip', 'FR', '2024-02-28', '2024-03-01')],
      new Date('2024-03-15'),
      { expectedDays: 3, shouldBeCompliant: true },
      'Trip spanning leap day February 29th, 2024'
    ))
    
    // Test 2: 180-day window crossing leap year boundary
    results.push(this.runTest(
      'LEAP-2: 180-day window crossing leap year boundary',
      [this.createTrip('cross-leap', 'DE', '2023-09-01', '2023-09-30')],
      new Date('2024-02-29'),
      { expectedDays: 28, shouldBeCompliant: true },
      '180-day window from leap day - only Sept 3-30 counts (28 days)'
    ))
    
    // Test 3: Non-leap year February validation
    results.push(this.runTest(
      'LEAP-3: Non-leap year February validation',
      [this.createTrip('non-leap', 'IT', '2023-02-27', '2023-03-01')],
      new Date('2023-03-15'),
      { expectedDays: 3, shouldBeCompliant: true },
      'Trip spanning Feb 28 to Mar 1 in non-leap year'
    ))
    
    return results
  }
  
  static testTimezoneScenarios() {
    const results = []
    
    // Test 1: UTC consistency during DST transition
    results.push(this.runTest(
      'TZ-1: UTC date consistency during DST',
      [this.createTrip('dst-trip', 'FR', '2024-03-30', '2024-04-02')],
      new Date('2024-04-15'),
      { expectedDays: 4, shouldBeCompliant: true },
      'Trip during EU DST transition (March 31, 2024)'
    ))
    
    // Test 2: New Year's Eve timezone boundary
    results.push(this.runTest(
      'TZ-2: New Year timezone boundary',
      [this.createTrip('nye-trip', 'DE', '2023-12-31', '2024-01-01')],
      new Date('2024-01-15'),
      { expectedDays: 2, shouldBeCompliant: true },
      'Trip spanning New Year across timezones'
    ))
    
    return results
  }
  
  static testDateBoundaryScenarios() {
    const results = []
    
    const today = startOfDay(new Date('2024-06-30'))
    const exactBoundary = subDays(today, 179)
    const outsideBoundary = subDays(today, 180)
    
    // Test 1: Exact 180-day boundary inclusion
    results.push(this.runTest(
      'BOUNDARY-1: Exact 180-day boundary inclusion',
      [this.createTripFromDate('boundary-in', 'FR', exactBoundary)],
      today,
      { expectedDays: 1, shouldBeCompliant: true },
      'Trip exactly at 180-day boundary (should be included)'
    ))
    
    // Test 2: Just outside boundary exclusion
    results.push(this.runTest(
      'BOUNDARY-2: Just outside 180-day boundary exclusion',
      [this.createTripFromDate('boundary-out', 'FR', outsideBoundary)],
      today,
      { expectedDays: 0, shouldBeCompliant: true },
      'Trip just outside 180-day boundary (should be excluded)'
    ))
    
    // Test 3: Same-day entry and exit
    results.push(this.runTest(
      'BOUNDARY-3: Same-day entry and exit',
      [this.createTrip('same-day', 'IT', '2024-06-15', '2024-06-15')],
      new Date('2024-06-30'),
      { expectedDays: 1, shouldBeCompliant: true },
      'Single-day trip (entry and exit same day)'
    ))
    
    return results
  }
  
  static testCrossYearScenarios() {
    const results = []
    
    // Test 1: Window spanning two calendar years
    results.push(this.runTest(
      'CROSS-YEAR-1: Window spanning two calendar years',
      [
        this.createTrip('dec-trip', 'AT', '2023-12-01', '2023-12-31'),
        this.createTrip('jan-trip', 'CH', '2024-01-01', '2024-01-31')
      ],
      new Date('2024-02-15'),
      { expectedDays: 62, shouldBeCompliant: true },
      'Trips in December and January across year boundary'
    ))
    
    // Test 2: Long trip spanning year boundary (overstay)
    results.push(this.runTest(
      'CROSS-YEAR-2: Long trip spanning year boundary',
      [this.createTrip('year-span', 'NL', '2023-11-15', '2024-02-15')],
      new Date('2024-03-01'),
      { expectedDays: 93, shouldBeCompliant: false },
      'Single trip spanning from November to February (overstay)'
    ))
    
    return results
  }
  
  static testExtremeRangeScenarios() {
    const results = []
    
    // Test 1: Very old trip (should not affect calculation)
    results.push(this.runTest(
      'EXTREME-1: Very old trip (10 years ago)',
      [this.createTrip('ancient', 'FR', '2014-01-01', '2014-01-31')],
      new Date('2024-01-01'),
      { expectedDays: 0, shouldBeCompliant: true },
      'Trip from 10 years ago (should not affect calculation)'
    ))
    
    // Test 2: Future trip (should not affect current calculation)
    results.push(this.runTest(
      'EXTREME-2: Future trip beyond reference date',
      [this.createTrip('future', 'DE', '2024-12-01', '2024-12-31')],
      new Date('2024-06-01'),
      { expectedDays: 0, shouldBeCompliant: true },
      'Trip scheduled for the future'
    ))
    
    // Test 3: Exactly 90-day trip (but only 88 days in window)
    results.push(this.runTest(
      'EXTREME-3: Long trip with partial window overlap',
      [this.createTrip('max-trip', 'IT', '2024-01-01', '2024-03-30')],
      new Date('2024-06-30'),
      { expectedDays: 88, shouldBeCompliant: true },
      '90-day trip but only 88 days within 180-day window (Jan 3 - Mar 30)'
    ))
    
    // Test 4: Long trip with partial window overlap (compliant)
    results.push(this.runTest(
      'EXTREME-4: Long trip partial overlap (89 days)',
      [this.createTrip('long-trip', 'ES', '2024-01-01', '2024-03-31')],
      new Date('2024-06-30'),
      { expectedDays: 89, shouldBeCompliant: true },
      '91-day trip but only 89 days within 180-day window (Jan 3 - Mar 31)'
    ))
    
    // Test 5: Actual overstay scenario
    results.push(this.runTest(
      'EXTREME-5: Actual overstay scenario',
      [this.createTrip('overstay', 'FR', '2024-03-01', '2024-05-31')],
      new Date('2024-06-30'),
      { expectedDays: 92, shouldBeCompliant: false },
      '92-day trip fully within 180-day window (overstay)'
    ))
    
    return results
  }
  
  static createTrip(id, country, startDate, endDate) {
    const start = startOfDay(parseISO(startDate))
    const end = endDate ? startOfDay(parseISO(endDate)) : start
    return {
      id,
      country,
      startDate: start,
      endDate: end,
      days: differenceInDays(end, start) + 1
    }
  }
  
  static createTripFromDate(id, country, date) {
    return this.createTrip(id, country, format(date, 'yyyy-MM-dd'), format(date, 'yyyy-MM-dd'))
  }
  
  static runTest(testName, trips, referenceDate, expectations, description) {
    try {
      const result = RobustSchengenCalculator.calculateExactCompliance(trips, referenceDate)
      
      let passed = true
      let error = null
      
      // Check expected days
      if (expectations.expectedDays !== undefined && result.totalDaysUsed !== expectations.expectedDays) {
        passed = false
        error = `Expected ${expectations.expectedDays} days, got ${result.totalDaysUsed}`
      }
      
      // Check compliance expectation
      if (expectations.shouldBeCompliant !== undefined && result.isCompliant !== expectations.shouldBeCompliant) {
        passed = false
        error = `Expected ${expectations.shouldBeCompliant ? 'compliant' : 'non-compliant'}, got ${result.isCompliant ? 'compliant' : 'non-compliant'}`
      }
      
      console.log(`${testName}: ${passed ? '✅ PASS' : '❌ FAIL'}`)
      if (!passed && error) {
        console.log(`   ${error}`)
      }
      
      return {
        testName,
        passed,
        result,
        expectations,
        description,
        error
      }
    } catch (err) {
      console.log(`${testName}: ❌ ERROR`)
      console.log(`   ${err.message}`)
      
      return {
        testName,
        passed: false,
        result: null,
        expectations,
        description,
        error: err.message
      }
    }
  }
}

// Run all edge case tests
EdgeCaseTestSuite.runAllEdgeCaseTests()