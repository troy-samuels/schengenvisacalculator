import { chromium, FullConfig } from '@playwright/test';

/**
 * Global Playwright Setup
 * Prepares the testing environment for comprehensive E2E testing
 * 
 * CRITICAL SETUP TASKS:
 * - Verify application is running and responsive
 * - Pre-warm critical pages for faster test execution
 * - Initialize performance monitoring baseline
 * - Set up mobile device simulation
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Schengen Calculator E2E Test Setup...');
  
  // Get base URL from config
  const baseURL = config.projects[0].use?.baseURL || 'http://localhost:3000';
  
  // Launch browser for setup verification
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log(`📡 Verifying application availability at ${baseURL}`);
    
    // Verify main application is responsive
    const response = await page.goto(baseURL, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    if (!response?.ok()) {
      throw new Error(`Application not available: ${response?.status()}`);
    }
    
    console.log('✅ Application is responsive');
    
    // Pre-warm critical pages to improve test performance
    const criticalPages = [
      '/',
      '/save-progress',
      '/dashboard',
    ];
    
    console.log('🔥 Pre-warming critical pages...');
    for (const path of criticalPages) {
      try {
        await page.goto(`${baseURL}${path}`, { 
          waitUntil: 'domcontentloaded',
          timeout: 15000 
        });
        console.log(`   ✅ Pre-warmed: ${path}`);
      } catch (error) {
        console.log(`   ⚠️  Failed to pre-warm ${path}: ${error}`);
      }
    }
    
    // Verify critical components are loading
    console.log('🧪 Verifying critical components...');
    
    // Check homepage loads calculator
    await page.goto(baseURL);
    const calculatorExists = await page.locator('[data-testid="schengen-calculator"]').count() > 0;
    console.log(`   Calculator component: ${calculatorExists ? '✅' : '❌'}`);
    
    // Test mobile calendar drawer functionality
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone 14 Pro
    const mobileDrawer = await page.locator('[data-testid="mobile-calendar-drawer"]').count() > 0;
    console.log(`   Mobile calendar drawer: ${mobileDrawer ? '✅' : '❌'}`);
    
    // Verify save progress page
    await page.goto(`${baseURL}/save-progress`);
    const savePageLoaded = await page.locator('h1').textContent();
    console.log(`   Save progress page: ${savePageLoaded?.includes('Save') ? '✅' : '❌'}`);
    
    // Performance baseline check
    console.log('⚡ Establishing performance baseline...');
    const navigationTiming = await page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      // Use startTime as the baseline instead of deprecated navigationStart
      const baselineTime = timing.startTime;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - baselineTime,
        loadComplete: timing.loadEventEnd - baselineTime,
      };
    });
    
    console.log(`   DOM Content Loaded: ${navigationTiming.domContentLoaded}ms`);
    console.log(`   Load Complete: ${navigationTiming.loadComplete}ms`);
    
    // Target performance thresholds from CLAUDE.md
    if (navigationTiming.domContentLoaded > 2000) {
      console.log('   ⚠️  DOM Content Loaded exceeds 2s threshold');
    }
    if (navigationTiming.loadComplete > 5000) {
      console.log('   ⚠️  Load Complete exceeds 5s threshold');
    }
    
    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;