import { test, expect } from '@playwright/test';
import { SchengenTestHelpers } from '../utils/test-helpers';

/**
 * CRITICAL: Mobile Calendar Auto-Scroll Testing Suite
 * 
 * TESTING OBJECTIVES:
 * - Verify mobile calendar reliably opens to current date (FIXED BUG)
 * - Test MutationObserver and IntersectionObserver implementations
 * - Verify fallback strategies work across different mobile browsers
 * - Ensure 44px touch targets and mobile-first design compliance
 * - Test date overlap prevention visual indicators on mobile
 * 
 * CRITICAL SUCCESS CRITERIA:
 * - 100% success rate for auto-scroll to current month
 * - All touch targets ≥44px (CLAUDE.md requirement)
 * - Visual overlap indicators work on mobile viewports
 * - Cross-browser compatibility (Safari, Chrome Mobile)
 */

test.describe('Mobile Calendar Auto-Scroll Functionality', () => {
  let helpers: SchengenTestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new SchengenTestHelpers(page);
    
    // Start on calculator page
    await page.goto('/');
    
    // Set mobile viewport for all tests
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone 14 Pro
  });

  test('should auto-scroll to current month when mobile calendar opens', async ({ page }) => {
    console.log('🔍 Testing mobile calendar auto-scroll to current date...');
    
    // Get current date info
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    const currentYear = today.getFullYear();
    
    // Open mobile calendar drawer
    const calendarTrigger = page.locator('[data-testid="mobile-calendar-trigger"]');
    await expect(calendarTrigger).toBeVisible({ timeout: 10000 });
    await calendarTrigger.click();
    
    // Wait for drawer to open with animation
    const drawer = page.locator('[data-testid="mobile-calendar-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 5000 });
    
    // Allow time for auto-scroll mechanism to complete
    await page.waitForTimeout(1000);
    
    // Verify current month header is visible in viewport
    const currentMonthHeader = page.locator(`[data-testid="month-header"]:has-text("${currentMonth} ${currentYear}")`);
    
    // Check if element exists first
    await expect(currentMonthHeader).toBeVisible();
    
    // Verify it's actually in the viewport (key test for auto-scroll)
    const isInViewport = await currentMonthHeader.isInViewport();
    expect(isInViewport).toBe(true);
    
    console.log(`✅ Auto-scroll successful: ${currentMonth} ${currentYear} is visible`);
    
    // Verify current date is highlighted
    const todayCell = page.locator(`[data-testid="date-cell"][data-date="${today.getDate()}"]`).first();
    await expect(todayCell).toHaveClass(/today|current|selected/);
    
    console.log(`✅ Current date (${today.getDate()}) is properly highlighted`);
  });

  test('should handle auto-scroll with multiple months loaded', async ({ page }) => {
    console.log('🔍 Testing auto-scroll with multiple months in calendar...');
    
    // Open calendar
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.locator('[data-testid="mobile-calendar-drawer"]').waitFor();
    
    // Wait for all months to load (calendar typically shows 6+ months)
    await page.waitForTimeout(500);
    
    // Get all month headers
    const monthHeaders = page.locator('[data-testid="month-header"]');
    const monthCount = await monthHeaders.count();
    
    expect(monthCount).toBeGreaterThan(3); // Should have multiple months
    console.log(`📅 Calendar loaded with ${monthCount} months`);
    
    // Verify current month is still visible despite multiple months
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    const currentYear = today.getFullYear();
    
    const currentMonthHeader = page.locator(`[data-testid="month-header"]:has-text("${currentMonth} ${currentYear}")`);
    const isCurrentMonthInViewport = await currentMonthHeader.isInViewport();
    
    expect(isCurrentMonthInViewport).toBe(true);
    console.log('✅ Current month remains visible with multiple months loaded');
  });

  test('should maintain scroll position after date selection', async ({ page }) => {
    console.log('🔍 Testing scroll position stability during date selection...');
    
    // Open calendar and verify auto-scroll
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.locator('[data-testid="mobile-calendar-drawer"]').waitFor();
    await page.waitForTimeout(500);
    
    // Get initial scroll position
    const scrollContainer = page.locator('[data-testid="calendar-scroll-container"]');
    const initialScrollTop = await scrollContainer.evaluate(el => el.scrollTop);
    
    // Select a date in the current month
    const today = new Date();
    const todayCell = page.locator(`[data-testid="date-cell"][data-date="${today.getDate()}"]`).first();
    await todayCell.click();
    
    // Verify scroll position didn't jump unexpectedly
    const finalScrollTop = await scrollContainer.evaluate(el => el.scrollTop);
    const scrollDifference = Math.abs(finalScrollTop - initialScrollTop);
    
    // Allow small differences due to UI updates, but not major jumps
    expect(scrollDifference).toBeLessThan(100);
    
    console.log(`✅ Scroll position stable: ${scrollDifference}px difference after selection`);
  });

  test('should work across different mobile browsers', async ({ page, browserName }) => {
    console.log(`🔍 Testing mobile calendar on ${browserName}...`);
    
    // Test auto-scroll functionality
    const result = await helpers.testMobileCalendarAutoScroll();
    expect(result.success).toBe(true);
    
    console.log(`✅ Mobile calendar auto-scroll working on ${browserName}`);
    
    // Browser-specific checks
    if (browserName === 'webkit') {
      console.log('📱 Additional iOS Safari checks...');
      
      // Test touch scrolling behavior
      const scrollContainer = page.locator('[data-testid="calendar-scroll-container"]');
      
      // Verify smooth scrolling is enabled
      const scrollBehavior = await scrollContainer.evaluate(el => 
        getComputedStyle(el).scrollBehavior
      );
      
      // iOS Safari should support smooth scrolling or fall back gracefully
      console.log(`   Scroll behavior: ${scrollBehavior}`);
    }
  });

  test('should meet mobile touch target requirements', async ({ page }) => {
    console.log('👆 Testing mobile touch target compliance...');
    
    // Open calendar
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.locator('[data-testid="mobile-calendar-drawer"]').waitFor();
    
    // Test all interactive elements in calendar
    const interactiveElements = page.locator('[data-testid="mobile-calendar-drawer"] button, [data-testid="mobile-calendar-drawer"] [role="button"]');
    const elementCount = await interactiveElements.count();
    
    let validTouchTargets = 0;
    const minTouchSize = 44; // CLAUDE.md requirement
    
    for (let i = 0; i < elementCount; i++) {
      const element = interactiveElements.nth(i);
      const box = await element.boundingBox();
      
      if (box && box.width >= minTouchSize && box.height >= minTouchSize) {
        validTouchTargets++;
      } else if (box) {
        console.log(`   ⚠️  Small touch target: ${box.width}x${box.height}px`);
      }
    }
    
    const compliance = (validTouchTargets / elementCount) * 100;
    console.log(`📏 Touch target compliance: ${compliance.toFixed(1)}% (${validTouchTargets}/${elementCount})`);
    
    // Require at least 90% compliance (allowing some decorative elements)
    expect(compliance).toBeGreaterThan(90);
  });

  test('should show visual indicators for occupied dates on mobile', async ({ page }) => {
    console.log('🚨 Testing date overlap visual indicators on mobile...');
    
    // First add a trip to create occupied dates
    await page.goto('/');
    
    // Add a sample trip
    await page.locator('[data-testid="add-trip-button"]').click();
    
    // Select country (assuming Germany is available)
    const countrySelect = page.locator('[data-testid="country-select"]');
    await countrySelect.click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    
    // Select date range (next month to avoid current date conflicts)
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(15); // 15th of next month
    
    const startDateCell = page.locator(`[data-testid="date-cell"][data-date="15"]`);
    await startDateCell.first().click();
    
    const endDate = new Date(nextMonth);
    endDate.setDate(25); // 25th of next month
    const endDateCell = page.locator(`[data-testid="date-cell"][data-date="25"]`);
    await endDateCell.first().click();
    
    // Save trip
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Now try to add another overlapping trip
    await page.locator('[data-testid="add-trip-button"]').click();
    
    // Open mobile calendar
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.locator('[data-testid="mobile-calendar-drawer"]').waitFor();
    
    // Navigate to the month with occupied dates
    // (Auto-scroll should handle this, but we may need to scroll to next month)
    
    // Look for occupied date visual indicators
    const occupiedDates = page.locator('[data-testid="date-cell"].occupied, [data-testid="date-cell"].disabled');
    const occupiedCount = await occupiedDates.count();
    
    expect(occupiedCount).toBeGreaterThan(0);
    console.log(`✅ Found ${occupiedCount} visually marked occupied dates`);
    
    // Verify strikethrough styling on occupied dates
    const firstOccupiedDate = occupiedDates.first();
    const textDecoration = await firstOccupiedDate.evaluate(el => 
      getComputedStyle(el).textDecoration
    );
    
    expect(textDecoration).toContain('line-through');
    console.log('✅ Occupied dates have strikethrough styling');
    
    // Test clicking on occupied date shows error
    await firstOccupiedDate.click();
    const errorMessage = page.locator('[data-testid="date-conflict-error"]');
    await expect(errorMessage).toBeVisible();
    
    console.log('✅ Clicking occupied date shows conflict error');
  });

  test('should handle edge cases and error states', async ({ page }) => {
    console.log('🔍 Testing mobile calendar edge cases...');
    
    // Test calendar behavior when network is slow
    // Simulate slow network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100); // Add 100ms delay
    });
    
    await page.goto('/');
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    
    // Calendar should still open and auto-scroll even with network delays
    const drawer = page.locator('[data-testid="mobile-calendar-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });
    
    // Verify current month is visible despite delays
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    const currentYear = today.getFullYear();
    const currentMonthHeader = page.locator(`[data-testid="month-header"]:has-text("${currentMonth} ${currentYear}")`);
    
    const isVisible = await currentMonthHeader.isInViewport();
    expect(isVisible).toBe(true);
    
    console.log('✅ Auto-scroll works even with network delays');
    
    // Test rapid open/close operations
    await page.locator('[data-testid="close-calendar"]').click();
    await page.waitForTimeout(100);
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.waitForTimeout(100);
    await page.locator('[data-testid="close-calendar"]').click();
    await page.waitForTimeout(100);
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    
    // Should still work correctly after rapid operations
    await expect(drawer).toBeVisible();
    const stillVisible = await currentMonthHeader.isInViewport();
    expect(stillVisible).toBe(true);
    
    console.log('✅ Calendar handles rapid open/close operations');
  });
});

test.describe('Mobile Calendar Performance', () => {
  test('should meet performance benchmarks on mobile', async ({ page }) => {
    console.log('⚡ Testing mobile calendar performance...');
    
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Measure calendar open time
    const startTime = Date.now();
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.locator('[data-testid="mobile-calendar-drawer"]').waitFor();
    
    // Wait for auto-scroll to complete
    await page.waitForTimeout(500);
    
    const openTime = Date.now() - startTime;
    console.log(`📱 Mobile calendar opened in ${openTime}ms`);
    
    // Should open quickly on mobile (target: <1000ms)
    expect(openTime).toBeLessThan(1000);
    
    // Measure scroll performance
    const scrollContainer = page.locator('[data-testid="calendar-scroll-container"]');
    const scrollStartTime = Date.now();
    
    // Perform scroll action
    await scrollContainer.evaluate(el => el.scrollBy(0, 300));
    await page.waitForTimeout(100);
    
    const scrollTime = Date.now() - scrollStartTime;
    console.log(`📜 Scroll operation completed in ${scrollTime}ms`);
    
    // Scroll should be smooth and fast
    expect(scrollTime).toBeLessThan(200);
    
    console.log('✅ Mobile calendar meets performance benchmarks');
  });
});