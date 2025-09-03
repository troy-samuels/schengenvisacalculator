import { test, expect } from '@playwright/test';

/**
 * CRITICAL: Performance Testing Suite for Schengen Calculator V2
 * 
 * PERFORMANCE TARGETS (from CLAUDE.md):
 * - Calculations: <50ms per operation
 * - Bundle Size: <200KB initial load
 * - Page Load: <2s DOM content loaded, <5s complete
 * - Mobile Performance: 44px touch targets, smooth scrolling
 * - Memory Usage: Efficient memory management for long sessions
 * 
 * SUCCESS CRITERIA:
 * - All performance benchmarks must be met
 * - No memory leaks in extended usage
 * - Smooth animations on mobile devices
 * - Bundle size optimization maintained
 */

test.describe('Performance Benchmarks', () => {
  test('should meet calculation performance targets', async ({ page }) => {
    console.log('⚡ Testing calculation performance benchmarks...');
    
    await page.goto('/');
    
    // Warm up the calculator
    await page.locator('[data-testid="add-trip-button"]').click();
    await page.locator('[data-testid="country-select"]').click();
    await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
    await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
    await page.locator('[data-testid="end-date-input"]').fill('2024-01-10');
    await page.locator('[data-testid="save-trip-button"]').click();
    
    // Clear for actual test
    await page.locator('[data-testid="clear-all-trips"]').click();
    
    // Measure single calculation performance
    const singleCalcTimes = [];
    
    for (let i = 0; i < 5; i++) {
      const startTime = performance.now();
      
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
      await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
      await page.locator('[data-testid="end-date-input"]').fill('2024-01-10');
      await page.locator('[data-testid="save-trip-button"]').click();
      
      // Wait for calculation to complete
      await page.locator('[data-testid="total-days-used"]').waitFor();
      
      const endTime = performance.now();
      const calcTime = endTime - startTime;
      singleCalcTimes.push(calcTime);
      
      // Clean up for next iteration
      await page.locator('[data-testid="delete-trip-button"]').first().click();
      await page.locator('[data-testid="confirm-delete"]').click();
    }
    
    const avgCalcTime = singleCalcTimes.reduce((a, b) => a + b, 0) / singleCalcTimes.length;
    console.log(`📊 Average single calculation time: ${avgCalcTime.toFixed(2)}ms`);
    
    // Target: <50ms per calculation
    expect(avgCalcTime).toBeLessThan(50);
    console.log('✅ Single calculation performance target met');
    
    // Test bulk calculation performance
    const bulkStartTime = performance.now();
    
    const trips = [
      { start: '2024-01-01', end: '2024-01-10' },
      { start: '2024-02-01', end: '2024-02-15' },
      { start: '2024-03-01', end: '2024-03-20' },
      { start: '2024-04-01', end: '2024-04-10' },
      { start: '2024-05-01', end: '2024-05-25' }
    ];
    
    for (const trip of trips) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
      await page.locator('[data-testid="start-date-input"]').fill(trip.start);
      await page.locator('[data-testid="end-date-input"]').fill(trip.end);
      await page.locator('[data-testid="save-trip-button"]').click();
    }
    
    const bulkEndTime = performance.now();
    const bulkCalcTime = bulkEndTime - bulkStartTime;
    const avgBulkTime = bulkCalcTime / trips.length;
    
    console.log(`📊 Bulk calculation (5 trips): ${bulkCalcTime.toFixed(2)}ms total, ${avgBulkTime.toFixed(2)}ms average`);
    expect(avgBulkTime).toBeLessThan(50);
    
    console.log('✅ Bulk calculation performance target met');
  });

  test('should meet page load performance targets', async ({ page }) => {
    console.log('⚡ Testing page load performance...');
    
    // Clear any caches to get accurate measurements
    await page.context().clearCookies();
    
    const startTime = performance.now();
    
    // Navigate and measure load time
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const domLoadTime = performance.now() - startTime;
    console.log(`📄 DOM content loaded in: ${domLoadTime.toFixed(2)}ms`);
    
    // Target: <2000ms for DOM content loaded
    expect(domLoadTime).toBeLessThan(2000);
    
    // Wait for complete page load
    await page.waitForLoadState('networkidle');
    const completeLoadTime = performance.now() - startTime;
    
    console.log(`📄 Complete page load: ${completeLoadTime.toFixed(2)}ms`);
    
    // Target: <5000ms for complete load
    expect(completeLoadTime).toBeLessThan(5000);
    
    // Get detailed performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
        firstPaint: navigation.responseEnd - navigation.navigationStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart
      };
    });
    
    console.log('📊 Detailed Performance Metrics:');
    console.log(`   DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
    console.log(`   Load Complete: ${performanceMetrics.loadComplete}ms`);
    console.log(`   First Paint: ${performanceMetrics.firstPaint}ms`);
    console.log(`   DOM Interactive: ${performanceMetrics.domInteractive}ms`);
    
    // All metrics should be reasonable
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000);
    expect(performanceMetrics.domInteractive).toBeLessThan(1500);
    
    console.log('✅ Page load performance targets met');
  });

  test('should maintain bundle size targets', async ({ page }) => {
    console.log('📦 Testing bundle size performance...');
    
    await page.goto('/');
    
    // Get resource sizes
    const resourceSizes = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      let totalJS = 0;
      let totalCSS = 0;
      let totalImages = 0;
      let mainBundle = 0;
      
      resources.forEach(resource => {
        const size = (resource as PerformanceResourceTiming).transferSize || 0;
        
        if (resource.name.includes('.js')) {
          totalJS += size;
          if (resource.name.includes('_app') || resource.name.includes('index')) {
            mainBundle += size;
          }
        } else if (resource.name.includes('.css')) {
          totalCSS += size;
        } else if (resource.name.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
          totalImages += size;
        }
      });
      
      return {
        totalJS: Math.round(totalJS / 1024), // KB
        totalCSS: Math.round(totalCSS / 1024), // KB
        totalImages: Math.round(totalImages / 1024), // KB
        mainBundle: Math.round(mainBundle / 1024), // KB
        total: Math.round((totalJS + totalCSS + totalImages) / 1024) // KB
      };
    });
    
    console.log('📊 Bundle Size Analysis:');
    console.log(`   Main JS Bundle: ${resourceSizes.mainBundle}KB`);
    console.log(`   Total JS: ${resourceSizes.totalJS}KB`);
    console.log(`   Total CSS: ${resourceSizes.totalCSS}KB`);
    console.log(`   Total Images: ${resourceSizes.totalImages}KB`);
    console.log(`   Total Assets: ${resourceSizes.total}KB`);
    
    // Target: <200KB for main bundle
    expect(resourceSizes.mainBundle).toBeLessThan(200);
    
    // Total JavaScript should be reasonable
    expect(resourceSizes.totalJS).toBeLessThan(500);
    
    console.log('✅ Bundle size targets met');
  });

  test('should maintain mobile performance standards', async ({ page }) => {
    console.log('📱 Testing mobile performance standards...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    const startTime = performance.now();
    await page.goto('/');
    
    const mobileLoadTime = performance.now() - startTime;
    console.log(`📱 Mobile page load: ${mobileLoadTime.toFixed(2)}ms`);
    
    // Mobile should load reasonably fast
    expect(mobileLoadTime).toBeLessThan(3000);
    
    // Test mobile calendar performance
    const calendarStartTime = performance.now();
    await page.locator('[data-testid="mobile-calendar-trigger"]').click();
    await page.locator('[data-testid="mobile-calendar-drawer"]').waitFor();
    
    const calendarLoadTime = performance.now() - calendarStartTime;
    console.log(`📱 Mobile calendar open: ${calendarLoadTime.toFixed(2)}ms`);
    
    // Calendar should open quickly on mobile
    expect(calendarLoadTime).toBeLessThan(1000);
    
    // Test scroll performance
    const scrollContainer = page.locator('[data-testid="calendar-scroll-container"]');
    const scrollStartTime = performance.now();
    
    await scrollContainer.evaluate(el => {
      el.scrollBy(0, 300);
    });
    
    // Wait for scroll to settle
    await page.waitForTimeout(100);
    
    const scrollTime = performance.now() - scrollStartTime;
    console.log(`📱 Mobile scroll performance: ${scrollTime.toFixed(2)}ms`);
    
    // Scroll should be smooth and fast
    expect(scrollTime).toBeLessThan(200);
    
    console.log('✅ Mobile performance standards met');
  });

  test('should handle memory usage efficiently', async ({ page }) => {
    console.log('🧠 Testing memory usage efficiency...');
    
    await page.goto('/');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return null;
    });
    
    if (initialMemory === null) {
      console.log('⚠️  Memory API not available, skipping memory test');
      return;
    }
    
    console.log(`🧠 Initial memory usage: ${Math.round(initialMemory / 1024 / 1024)}MB`);
    
    // Perform memory-intensive operations
    for (let i = 0; i < 20; i++) {
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
      await page.locator('[data-testid="start-date-input"]').fill(`2024-01-${i + 1}`);
      await page.locator('[data-testid="end-date-input"]').fill(`2024-01-${i + 2}`);
      await page.locator('[data-testid="save-trip-button"]').click();
    }
    
    // Get memory usage after operations
    const postOperationMemory = await page.evaluate(() => {
      return (performance as any).memory.usedJSHeapSize;
    });
    
    console.log(`🧠 Post-operation memory: ${Math.round(postOperationMemory / 1024 / 1024)}MB`);
    
    // Clear all trips
    await page.locator('[data-testid="clear-all-trips"]').click();
    
    // Force garbage collection if possible and wait
    await page.evaluate(() => {
      if ('gc' in window) {
        (window as any).gc();
      }
    });
    
    await page.waitForTimeout(1000);
    
    const postCleanupMemory = await page.evaluate(() => {
      return (performance as any).memory.usedJSHeapSize;
    });
    
    console.log(`🧠 Post-cleanup memory: ${Math.round(postCleanupMemory / 1024 / 1024)}MB`);
    
    const memoryGrowth = postCleanupMemory - initialMemory;
    const memoryGrowthMB = memoryGrowth / 1024 / 1024;
    
    console.log(`🧠 Net memory growth: ${memoryGrowthMB.toFixed(2)}MB`);
    
    // Memory growth should be reasonable (<10MB for this test)
    expect(memoryGrowthMB).toBeLessThan(10);
    
    console.log('✅ Memory usage efficiency maintained');
  });

  test('should handle concurrent operations efficiently', async ({ page }) => {
    console.log('⚡ Testing concurrent operation performance...');
    
    await page.goto('/');
    
    const startTime = performance.now();
    
    // Simulate concurrent user actions
    const concurrentPromises = [];
    
    for (let i = 0; i < 5; i++) {
      const promise = (async () => {
        await page.locator('[data-testid="add-trip-button"]').click();
        await page.locator('[data-testid="country-select"]').click();
        await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
        await page.locator('[data-testid="start-date-input"]').fill(`2024-0${i + 1}-01`);
        await page.locator('[data-testid="end-date-input"]').fill(`2024-0${i + 1}-05`);
        await page.locator('[data-testid="save-trip-button"]').click();
      })();
      
      concurrentPromises.push(promise);
    }
    
    // Wait for all operations to complete
    await Promise.all(concurrentPromises);
    
    const concurrentTime = performance.now() - startTime;
    console.log(`⚡ 5 concurrent operations completed in: ${concurrentTime.toFixed(2)}ms`);
    
    // Should complete reasonably quickly even with concurrent operations
    expect(concurrentTime).toBeLessThan(2000);
    
    // Verify all calculations are correct
    const totalDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    expect(totalDaysUsed).toContain('25'); // 5 trips × 5 days each
    
    console.log('✅ Concurrent operations handled efficiently');
  });
});

test.describe('Performance Regression Detection', () => {
  test('should maintain baseline performance metrics', async ({ page }) => {
    console.log('📈 Running performance regression detection...');
    
    const metrics = {
      pageLoad: [],
      calculationTime: [],
      memoryUsage: [],
    };
    
    // Run multiple iterations to get stable metrics
    for (let iteration = 0; iteration < 3; iteration++) {
      console.log(`   Iteration ${iteration + 1}/3`);
      
      // Clear state
      await page.context().clearCookies();
      
      // Measure page load
      const loadStartTime = performance.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = performance.now() - loadStartTime;
      metrics.pageLoad.push(loadTime);
      
      // Measure calculation time
      const calcStartTime = performance.now();
      await page.locator('[data-testid="add-trip-button"]').click();
      await page.locator('[data-testid="country-select"]').click();
      await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
      await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
      await page.locator('[data-testid="end-date-input"]').fill('2024-01-10');
      await page.locator('[data-testid="save-trip-button"]').click();
      await page.locator('[data-testid="total-days-used"]').waitFor();
      const calcTime = performance.now() - calcStartTime;
      metrics.calculationTime.push(calcTime);
      
      // Measure memory if available
      const memory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory.usedJSHeapSize;
        }
        return null;
      });
      
      if (memory) {
        metrics.memoryUsage.push(memory);
      }
      
      // Clean up
      await page.locator('[data-testid="clear-all-trips"]').click();
    }
    
    // Calculate averages
    const avgPageLoad = metrics.pageLoad.reduce((a, b) => a + b, 0) / metrics.pageLoad.length;
    const avgCalcTime = metrics.calculationTime.reduce((a, b) => a + b, 0) / metrics.calculationTime.length;
    const avgMemory = metrics.memoryUsage.length > 0 
      ? metrics.memoryUsage.reduce((a, b) => a + b, 0) / metrics.memoryUsage.length
      : null;
    
    console.log('📊 Performance Baseline Metrics:');
    console.log(`   Average Page Load: ${avgPageLoad.toFixed(2)}ms`);
    console.log(`   Average Calculation: ${avgCalcTime.toFixed(2)}ms`);
    if (avgMemory) {
      console.log(`   Average Memory Usage: ${Math.round(avgMemory / 1024 / 1024)}MB`);
    }
    
    // Performance regression thresholds
    expect(avgPageLoad).toBeLessThan(2000);
    expect(avgCalcTime).toBeLessThan(50);
    if (avgMemory) {
      expect(avgMemory / 1024 / 1024).toBeLessThan(50); // <50MB
    }
    
    // Store baseline metrics for future regression detection
    const baselineReport = {
      timestamp: new Date().toISOString(),
      metrics: {
        avgPageLoad,
        avgCalcTime,
        avgMemory: avgMemory ? avgMemory / 1024 / 1024 : null
      },
      thresholds: {
        pageLoad: 2000,
        calculation: 50,
        memory: 50
      },
      status: 'PASSED'
    };
    
    console.log('✅ Performance baseline established and maintained');
    
    // In a real implementation, this would be saved to a file or database
    // for tracking performance over time
  });
});