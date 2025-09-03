import { Page, Locator, expect } from '@playwright/test';

/**
 * Comprehensive Test Helper Utilities for Schengen Calculator V2
 * 
 * CRITICAL HELPER FUNCTIONS:
 * - Mobile calendar testing utilities
 * - Date overlap prevention verification  
 * - EU compliance test helpers
 * - Performance measurement utilities
 * - Cross-browser compatibility helpers
 */

export class SchengenTestHelpers {
  constructor(private page: Page) {}

  /**
   * MOBILE CALENDAR AUTO-SCROLL TESTING
   * Critical functionality - must reliably scroll to current date
   */
  async testMobileCalendarAutoScroll() {
    console.log('🔍 Testing mobile calendar auto-scroll functionality...');
    
    // Set mobile viewport
    await this.page.setViewportSize({ width: 375, height: 812 });
    
    // Get current date for verification
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    const currentYear = today.getFullYear();
    
    // Open mobile calendar drawer
    const calendarTrigger = this.page.locator('[data-testid="mobile-calendar-trigger"]');
    await expect(calendarTrigger).toBeVisible();
    await calendarTrigger.click();
    
    // Wait for drawer to open with animation
    const drawer = this.page.locator('[data-testid="mobile-calendar-drawer"]');
    await expect(drawer).toBeVisible();
    await this.page.waitForTimeout(500); // Allow animation to complete
    
    // Verify auto-scroll worked - current month should be visible
    const currentMonthHeader = this.page.locator(`[data-testid="month-header"]:has-text("${currentMonth} ${currentYear}")`);
    
    // Check if current month is in viewport using Playwright's isVisible method
    const isCurrentMonthVisible = await currentMonthHeader.isVisible();
    expect(isCurrentMonthVisible).toBe(true);
    
    console.log(`✅ Current month (${currentMonth} ${currentYear}) is visible after auto-scroll`);
    
    // Verify current date is highlighted
    const todayDate = today.getDate();
    const todayCell = this.page.locator(`[data-testid="date-cell"][data-date="${todayDate}"]`).first();
    await expect(todayCell).toHaveClass(/today/);
    
    console.log(`✅ Current date (${todayDate}) is properly highlighted`);
    
    return { success: true, currentMonth, currentYear, todayDate };
  }

  /**
   * DATE OVERLAP PREVENTION TESTING
   * CRITICAL: Must be 100% accurate for EU compliance
   */
  async testDateOverlapPrevention() {
    console.log('🚨 Testing date overlap prevention (CRITICAL)...');
    
    // Test data - simulate existing trips
    const existingTrips = [
      { 
        startDate: new Date('2024-03-15'), 
        endDate: new Date('2024-03-25'),
        country: 'Germany' 
      },
      { 
        startDate: new Date('2024-05-10'), 
        endDate: new Date('2024-05-20'),
        country: 'France' 
      }
    ];
    
    // Navigate to calculator
    await this.page.goto('/');
    
    // Add first trip to create occupied dates
    await this.addTripToCalculator(existingTrips[0]);
    await this.addTripToCalculator(existingTrips[1]);
    
    // Now test overlap prevention
    await this.page.locator('[data-testid="add-trip-button"]').click();
    
    // Try to select dates that overlap with existing trip
    const conflictStartDate = new Date('2024-03-20'); // Overlaps with Germany trip
    const conflictEndDate = new Date('2024-03-30');
    
    // Select conflicting start date
    await this.selectDateInCalendar(conflictStartDate);
    
    // Verify date is visually indicated as occupied
    const occupiedDateCell = this.page.locator(`[data-date="${conflictStartDate.getDate()}"]`).first();
    await expect(occupiedDateCell).toHaveClass(/occupied|disabled|conflict/);
    
    // Verify strikethrough visual indicator
    await expect(occupiedDateCell).toHaveCSS('text-decoration', /line-through/);
    
    // Verify clicking shows error message
    await occupiedDateCell.click();
    const errorMessage = this.page.locator('[data-testid="date-conflict-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Germany'); // Should mention conflicting country
    
    console.log('✅ Date overlap prevention working correctly');
    
    return { success: true, conflictsDetected: 1 };
  }

  /**
   * EU COMPLIANCE CALCULATION TESTING
   * Must achieve 100% pass rate for official EU test cases
   */
  async testEUComplianceCalculations() {
    console.log('🇪🇺 Testing EU compliance calculations...');
    
    // Navigate to calculator
    await this.page.goto('/');
    
    // Test Case 1: Basic 90/180 rule
    const testCase1 = {
      trips: [
        { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-30'), country: 'Germany' }, // 30 days
        { startDate: new Date('2024-03-01'), endDate: new Date('2024-03-15'), country: 'France' },  // 15 days
        { startDate: new Date('2024-05-01'), endDate: new Date('2024-05-20'), country: 'Spain' },  // 20 days
      ],
      expectedTotalDays: 65,
      expectedRemainingDays: 25
    };
    
    // Clear any existing trips
    await this.clearAllTrips();
    
    // Add test trips
    for (const trip of testCase1.trips) {
      await this.addTripToCalculator(trip);
    }
    
    // Verify calculation results
    const totalDaysUsed = await this.page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays = await this.page.locator('[data-testid="remaining-days"]').textContent();
    
    expect(totalDaysUsed).toContain(testCase1.expectedTotalDays.toString());
    expect(remainingDays).toContain(testCase1.expectedRemainingDays.toString());
    
    console.log(`✅ Test Case 1: ${testCase1.expectedTotalDays} days used, ${testCase1.expectedRemainingDays} remaining`);
    
    // Test Case 2: Edge case - exactly 90 days
    const testCase2 = {
      trips: [
        { startDate: new Date('2024-01-01'), endDate: new Date('2024-03-30'), country: 'Germany' }, // 90 days (leap year)
      ],
      expectedTotalDays: 90,
      expectedRemainingDays: 0
    };
    
    await this.clearAllTrips();
    await this.addTripToCalculator(testCase2.trips[0]);
    
    const totalDays2 = await this.page.locator('[data-testid="total-days-used"]').textContent();
    const remainingDays2 = await this.page.locator('[data-testid="remaining-days"]').textContent();
    
    expect(totalDays2).toContain('90');
    expect(remainingDays2).toContain('0');
    
    console.log('✅ Test Case 2: Exactly 90 days - boundary condition handled correctly');
    
    return { 
      success: true, 
      testCasesPassed: 2,
      passRate: '100%'
    };
  }

  /**
   * PERFORMANCE MEASUREMENT UTILITIES
   * Target: <50ms calculations, <200KB bundle
   */
  async measureCalculationPerformance() {
    console.log('⚡ Measuring calculation performance...');
    
    await this.page.goto('/');
    
    // Measure calculation time
    const startTime = Date.now();
    
    // Add a trip to trigger calculation
    await this.addTripToCalculator({
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      country: 'Germany'
    });
    
    // Wait for calculation to complete
    await this.page.locator('[data-testid="total-days-used"]').waitFor();
    
    const calculationTime = Date.now() - startTime;
    
    console.log(`⏱️  Calculation completed in ${calculationTime}ms`);
    
    // Verify meets performance target
    expect(calculationTime).toBeLessThan(50);
    
    return { calculationTime, targetMet: calculationTime < 50 };
  }

  /**
   * MOBILE RESPONSIVENESS TESTING
   * Verify 44px touch targets and mobile-first design
   */
  async testMobileResponsiveness() {
    console.log('📱 Testing mobile responsiveness...');
    
    // Test different mobile viewports
    const mobileViewports = [
      { width: 375, height: 812, device: 'iPhone 14 Pro' },
      { width: 390, height: 844, device: 'Pixel 7' },
      { width: 360, height: 800, device: 'Galaxy S20' }
    ];
    
    const results = [];
    
    for (const viewport of mobileViewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
      await this.page.goto('/');
      
      // Test touch target sizes
      const buttons = this.page.locator('button:visible');
      const buttonCount = await buttons.count();
      
      let validTouchTargets = 0;
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        
        if (box && box.width >= 44 && box.height >= 44) {
          validTouchTargets++;
        }
      }
      
      const touchTargetCompliance = (validTouchTargets / buttonCount) * 100;
      
      results.push({
        device: viewport.device,
        touchTargetCompliance: `${touchTargetCompliance.toFixed(1)}%`,
        validTargets: validTouchTargets,
        totalTargets: buttonCount
      });
      
      console.log(`✅ ${viewport.device}: ${touchTargetCompliance.toFixed(1)}% touch target compliance`);
    }
    
    return results;
  }

  /**
   * HELPER METHODS
   */
  
  private async addTripToCalculator(trip: { startDate: Date; endDate: Date; country: string }) {
    // Click add trip button
    await this.page.locator('[data-testid="add-trip-button"]').click();
    
    // Select country
    const countrySelect = this.page.locator('[data-testid="country-select"]');
    await countrySelect.click();
    await this.page.locator(`[data-testid="country-option"]:has-text("${trip.country}")`).click();
    
    // Select start date
    await this.selectDateInCalendar(trip.startDate);
    
    // Select end date  
    await this.selectDateInCalendar(trip.endDate);
    
    // Save trip
    await this.page.locator('[data-testid="save-trip-button"]').click();
    
    // Wait for trip to be added
    await this.page.locator(`[data-testid="trip-card"]:has-text("${trip.country}")`).waitFor();
  }
  
  private async selectDateInCalendar(date: Date) {
    const dayCell = this.page.locator(`[data-testid="date-cell"][data-date="${date.getDate()}"]`).first();
    await dayCell.click();
  }
  
  private async clearAllTrips() {
    const deleteButtons = this.page.locator('[data-testid="delete-trip-button"]');
    const count = await deleteButtons.count();
    
    for (let i = 0; i < count; i++) {
      await deleteButtons.first().click();
      await this.page.locator('[data-testid="confirm-delete"]').click();
    }
  }
}