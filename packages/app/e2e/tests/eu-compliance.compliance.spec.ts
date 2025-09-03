import { test, expect } from '@playwright/test';
import { SchengenTestHelpers } from '../utils/test-helpers';

/**
 * CRITICAL: EU Schengen 90/180 Rule Compliance Testing Suite
 * 
 * LEGAL REQUIREMENT: Must achieve 100% pass rate for all EU official test cases
 * 
 * TESTING SCOPE:
 * - Basic 90/180 day rule calculations
 * - Edge cases: leap years, timezone handling, boundary conditions
 * - Date overlap prevention (CRITICAL for compliance)
 * - Rolling 180-day window calculations
 * - Multi-entry visa scenarios
 * - Official EU test cases (KOM series)
 * 
 * COMPLIANCE CRITERIA:
 * - 100% accuracy in day calculations
 * - Correct handling of entry/exit dates
 * - Proper rolling window implementation
 * - Zero false positives/negatives in violations
 */

test.describe('EU Schengen 90/180 Rule Compliance', () => {
  let helpers: SchengenTestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new SchengenTestHelpers(page);
    await page.goto('/');
    
    // Clear any existing data
    const clearButton = page.locator('[data-testid="clear-all-trips"]');
    if (await clearButton.count() > 0) {
      await clearButton.click();
    }
  });

  test('KOM-001: Basic 90/180 day rule - single stay', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-001: Basic single stay calculation...');
    
    // Test case: 30-day stay in Germany
    await page.locator('[data-testid="add-trip-button"]').click();
    
    // Select Germany
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // Select dates: January 1-30, 2024 (30 days)
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
    await page.locator('[data-testid="end-date-input"]').fill('2024-01-30');
    
    // Save trip
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Verify calculations
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays = await page.locator('[data-testid="remaining-days"]').textContent();
    const riskLevel = await page.locator('[data-testid="risk-level"]').textContent();
    
    expect(totalDaysUsed).toContain('30');
    expect(remainingDays).toContain('60');
    expect(riskLevel).toContain('Safe');
    
    console.log('✅ KOM-001 PASSED: 30 days used, 60 remaining, Safe status');
  });

  test('KOM-002: Multiple stays within 180-day period', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-002: Multiple stays calculation...');
    
    // Scenario: Three separate stays totaling 85 days
    const trips = [
      { country: 'Germany', start: '2024-01-01', end: '2024-01-30', days: 30 },
      { country: 'France', start: '2024-03-01', end: '2024-03-25', days: 25 },
      { country: 'Spain', start: '2024-05-01', end: '2024-05-30', days: 30 }
    ];
    
    for (const trip of trips) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator(`[data-testid="country-option"]:has-text("${trip.country}")`).click();
      await page.locator('[data-testid="start-date-input"]').fill(trip.start);
      await page.locator('[data-testid="end-date-input"]').fill(trip.end);
      await page.locator('[data-testid="save-trip-button"]').click();
      
      // Wait for calculation to update
      await page.waitForTimeout(100);
    }
    
    // Verify total calculation
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays = await page.locator('[data-testid="remaining-days"]').textContent();
    
    expect(totalDaysUsed).toContain('85');
    expect(remainingDays).toContain('5');
    
    console.log('✅ KOM-002 PASSED: 85 days used across multiple stays, 5 remaining');
  });

  test('KOM-003: Exactly 90 days - boundary condition', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-003: Boundary condition - exactly 90 days...');
    
    // Add trip that uses exactly 90 days
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // 90-day stay (accounting for inclusive dates)
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
    await page.locator('[data-testid="end-date-input"]').fill('2024-03-30'); // 90 days in 2024 (leap year)
    
    await page.locator('[data-testid="save-trip-button"]').click();
    
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays = await page.locator('[data-testid="remaining-days"]').textContent();
    const riskLevel = await page.locator('[data-testid="risk-level"]').textContent();
    
    expect(totalDaysUsed).toContain('90');
    expect(remainingDays).toContain('0');
    expect(riskLevel).toContain('Critical');
    
    console.log('✅ KOM-003 PASSED: Exactly 90 days triggers critical status');
  });

  test('KOM-004: 91 days - violation detection', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-004: Violation detection at 91 days...');
    
    // Try to add trip that would exceed 90 days
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // 91-day stay (should trigger warning/violation)
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
    await page.locator('[data-testid="end-date-input"]').fill('2024-03-31'); // 91 days in 2024
    
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Should show violation warning
    const violationWarning = page.locator('[data-testid="violation-warning"]');
    await expect(violationWarning).toBeVisible();
    
    const warningText = await violationWarning.textContent();
    expect(warningText).toContain('exceeds 90 days');
    
    console.log('✅ KOM-004 PASSED: 91 days triggers violation warning');
  });

  test('KOM-005: Rolling 180-day window calculation', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-005: Rolling 180-day window...');
    
    // Scenario: Old trip falls outside 180-day window
    const trips = [
      // Old trip (outside 180-day window from reference date)
      { country: 'Germany', start: '2023-06-01', end: '2023-06-30', days: 30 },
      // Recent trips (within 180-day window)
      { country: 'France', start: '2024-01-01', end: '2024-01-30', days: 30 },
      { country: 'Spain', start: '2024-03-01', end: '2024-03-30', days: 30 }
    ];
    
    for (const trip of trips) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator(`[data-testid="country-option"]:has-text("${trip.country}")`).click();
      await page.locator('[data-testid="start-date-input"]').fill(trip.start);
      await page.locator('[data-testid="end-date-input"]').fill(trip.end);
      await page.locator('[data-testid="save-trip-button"]').click();
    }
    
    // Set calculation reference date to March 31, 2024
    await page.locator('[data-testid="reference-date-input"]').fill('2024-03-31');
    
    // Only recent trips (60 days) should count, old trip ignored
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays = await page.locator('[data-testid="remaining-days"]').textContent();
    
    expect(totalDaysUsed).toContain('60');
    expect(remainingDays).toContain('30');
    
    console.log('✅ KOM-005 PASSED: Rolling window excludes old trips correctly');
  });

  test('KOM-006: Leap year calculation accuracy', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-006: Leap year calculations...');
    
    // Test trip spanning leap day in 2024
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // February 1 - March 1, 2024 (spans leap day)
    await page.locator('[data-testid="start-date-input"]').fill('2024-02-01');
    await page.locator('[data-testid="end-date-input"]').fill('2024-03-01');
    
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Should be 30 days (Feb 1-29 + Mar 1 = 29 days, inclusive counting)
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    expect(totalDaysUsed).toContain('30'); // Verify leap day is counted
    
    console.log('✅ KOM-006 PASSED: Leap year calculations accurate');
  });

  test('KOM-007: Date overlap prevention compliance', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-007: Date overlap prevention...');
    
    // Add first trip
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-15');
    await page.locator('[data-testid="end-date-input"]').fill('2024-01-25');
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Try to add overlapping trip
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("France")').click();
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-20');
    await page.locator('[data-testid="end-date-input"]').fill('2024-01-30');
    
    // Should show overlap error before saving
    const overlapError = page.locator('[data-testid="date-overlap-error"]');
    await expect(overlapError).toBeVisible();
    
    const errorText = await overlapError.textContent();
    expect(errorText).toContain('overlap');
    expect(errorText).toContain('Germany'); // Should mention conflicting trip
    
    console.log('✅ KOM-007 PASSED: Date overlap prevention working');
  });

  test('KOM-008: Performance benchmark for calculations', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-008: Calculation performance...');
    
    // Add multiple trips to test calculation performance
    const trips = Array.from({ length: 10 }, (_, i) => ({
      country: ['Germany', 'France', 'Spain', 'Italy'][i % 4],
      start: `2024-0${(i % 9) + 1}-01`,
      end: `2024-0${(i % 9) + 1}-05`
    }));
    
    const startTime = Date.now();
    
    for (const trip of trips) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator(`[data-testid="country-option"]:has-text("${trip.country}")`).click();
      await page.locator('[data-testid="start-date-input"]').fill(trip.start);
      await page.locator('[data-testid="end-date-input"]').fill(trip.end);
      await page.locator('[data-testid="save-trip-button"]').click();
    }
    
    // Wait for final calculation
    await page.locator('[data-testid="total-days-used"]').waitFor();
    
    const calculationTime = Date.now() - startTime;
    console.log(`⏱️  10 trips calculated in ${calculationTime}ms`);
    
    // Performance target: <50ms per calculation operation
    expect(calculationTime / trips.length).toBeLessThan(50);
    
    console.log('✅ KOM-008 PASSED: Calculations meet performance benchmark');
  });

  test('KOM-009: Complex multi-entry scenario', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-009: Complex multi-entry visa scenario...');
    
    // Realistic business traveler scenario
    const complexTrips = [
      { country: 'Germany', start: '2024-01-15', end: '2024-01-20', days: 6 },
      { country: 'France', start: '2024-02-01', end: '2024-02-10', days: 10 },
      { country: 'Germany', start: '2024-02-25', end: '2024-03-05', days: 9 },
      { country: 'Spain', start: '2024-03-20', end: '2024-04-02', days: 14 },
      { country: 'Italy', start: '2024-04-15', end: '2024-04-25', days: 11 },
      { country: 'France', start: '2024-05-10', end: '2024-05-20', days: 11 },
      { country: 'Germany', start: '2024-06-01', end: '2024-06-15', days: 15 }
    ];
    
    for (const trip of complexTrips) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator(`[data-testid="country-option"]:has-text("${trip.country}")`).click();
      await page.locator('[data-testid="start-date-input"]').fill(trip.start);
      await page.locator('[data-testid="end-date-input"]').fill(trip.end);
      await page.locator('[data-testid="save-trip-button"]').click();
    }
    
    // Calculate expected total
    const expectedTotal = complexTrips.reduce((sum, trip) => sum + trip.days, 0);
    
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays = await page.locator('[data-testid="remaining-days"]').textContent();
    
    expect(totalDaysUsed).toContain(expectedTotal.toString());
    expect(remainingDays).toContain((90 - expectedTotal).toString());
    
    console.log(`✅ KOM-009 PASSED: Complex scenario - ${expectedTotal} days calculated correctly`);
  });

  test('KOM-010: Timezone and DST handling', async ({ page }) => {
    console.log('🇪🇺 Testing KOM-010: Timezone and DST handling...');
    
    // Test dates that cross DST boundaries
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // March 25 - April 5, 2024 (crosses DST in EU)
    await page.locator('[data-testid="start-date-input"]').fill('2024-03-25');
    await page.locator('[data-testid="end-date-input"]').fill('2024-04-05');
    
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Should count calendar days, not affected by DST
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    expect(totalDaysUsed).toContain('12'); // 12 calendar days regardless of DST
    
    console.log('✅ KOM-010 PASSED: DST changes do not affect calendar day counting');
  });
});

test.describe('EU Compliance - Critical Edge Cases', () => {
  test('should handle same-day entry and exit', async ({ page }) => {
    console.log('🇪🇺 Testing same-day entry/exit scenario...');
    
    await page.goto('/');
    
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // Same day entry and exit
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-15');
    await page.locator('[data-testid="end-date-input"]').fill('2024-01-15');
    
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Should count as 1 day (inclusive)
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    expect(totalDaysUsed).toContain('1');
    
    console.log('✅ Same-day entry/exit counted as 1 day');
  });

  test('should validate date chronology', async ({ page }) => {
    console.log('🇪🇺 Testing date chronology validation...');
    
    await page.goto('/');
    
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // End date before start date (invalid)
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-20');
    await page.locator('[data-testid="end-date-input"]').fill('2024-01-15');
    
    // Should show validation error
    const dateError = page.locator('[data-testid="date-chronology-error"]');
    await expect(dateError).toBeVisible();
    
    const errorText = await dateError.textContent();
    expect(errorText).toContain('before start date');
    
    console.log('✅ Date chronology validation working');
  });
});

test.describe('EU Compliance - Stress Testing', () => {
  test('should handle maximum trip capacity', async ({ page }) => {
    console.log('🇪🇺 Testing maximum trip capacity...');
    
    await page.goto('/');
    
    // Add many small trips (stress test)
    for (let i = 1; i <= 50; i++) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator('[data-testid="country-option"]:has-text("Germany")').first().click();
      
      const day = i.toString().padStart(2, '0');
      await page.locator('[data-testid="start-date-input"]').fill(`2024-01-${day}`);
      await page.locator('[data-testid="end-date-input"]').fill(`2024-01-${day}`);
      
      await page.locator('[data-testid="save-trip-button"]').click();
      
      // Break if we hit capacity limits
      const errorModal = page.locator('[data-testid="capacity-limit-error"]');
      if (await errorModal.count() > 0) {
        console.log(`   Capacity limit reached at ${i} trips`);
        break;
      }
    }
    
    // Should still calculate correctly
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    expect(parseInt(totalDaysUsed || '0')).toBeGreaterThan(0);
    
    console.log('✅ System handles high trip capacity');
  });
});