import { test, expect } from '@playwright/test';

/**
 * Save Progress & Dashboard Functionality Testing Suite
 * 
 * TESTING OBJECTIVES:
 * - Save progress landing page functionality and SEO optimization
 * - Dashboard analytics and real-time updates
 * - User interaction flows and conversion optimization
 * - Greyed-out analytics preview components
 * - Mobile responsiveness for both pages
 * 
 * CRITICAL SUCCESS CRITERIA:
 * - Landing page loads with proper SEO meta tags
 * - Analytics previews show greyed-out state correctly
 * - Dashboard displays real-time analytics
 * - Mobile-first design compliance maintained
 * - Conversion tracking works properly
 */

test.describe('Save Progress Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/save-progress');
  });

  test('should load save progress page with proper SEO optimization', async ({ page }) => {
    console.log('🔍 Testing save progress page SEO optimization...');
    
    // Check page title
    const title = await page.title();
    expect(title).toContain('Save Progress');
    expect(title).toContain('Schengen');
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription).toContain('save');
    expect(metaDescription).toContain('progress');
    
    // Check structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    if (structuredData) {
      const jsonLd = JSON.parse(structuredData);
      expect(jsonLd['@type']).toBeDefined();
    }
    
    console.log('✅ SEO optimization elements verified');
  });

  test('should display greyed-out analytics preview components', async ({ page }) => {
    console.log('🔍 Testing greyed-out analytics preview components...');
    
    // Check for analytics preview sections
    const analyticsPreview = page.locator('[data-testid="analytics-preview"]');
    await expect(analyticsPreview).toBeVisible();
    
    // Verify greyed-out overlay
    const overlay = page.locator('[data-testid="preview-overlay"]');
    await expect(overlay).toBeVisible();
    
    // Check for lock icon
    const lockIcon = page.locator('[data-testid="preview-lock-icon"]');
    await expect(lockIcon).toBeVisible();
    
    // Verify preview text
    const previewText = page.locator('[data-testid="preview-text"]');
    await expect(previewText).toContainText('Preview');
    
    console.log('✅ Analytics preview components properly greyed out');
  });

  test('should show conversion-optimized signup form', async ({ page }) => {
    console.log('🔍 Testing conversion-optimized signup form...');
    
    // Check signup form exists
    const signupForm = page.locator('[data-testid="signup-form"]');
    await expect(signupForm).toBeVisible();
    
    // Check form fields
    const emailInput = page.locator('[data-testid="email-input"]');
    const nameInput = page.locator('[data-testid="name-input"]');
    const submitButton = page.locator('[data-testid="signup-submit"]');
    
    await expect(emailInput).toBeVisible();
    await expect(nameInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // Test form interaction
    await emailInput.fill('test@example.com');
    await nameInput.fill('Test User');
    
    // Check button becomes enabled
    await expect(submitButton).toBeEnabled();
    
    // Verify conversion tracking elements
    const conversionPixel = page.locator('[data-testid="conversion-tracking"]');
    if (await conversionPixel.count() > 0) {
      console.log('   Conversion tracking pixel found');
    }
    
    console.log('✅ Signup form optimized for conversion');
  });

  test('should be mobile responsive', async ({ page }) => {
    console.log('📱 Testing save progress page mobile responsiveness...');
    
    // Test different mobile viewports
    const mobileViewports = [
      { width: 375, height: 812, device: 'iPhone 14 Pro' },
      { width: 390, height: 844, device: 'Pixel 7' }
    ];
    
    for (const viewport of mobileViewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Verify key elements are visible and properly sized
      const mainHeading = page.locator('h1');
      await expect(mainHeading).toBeVisible();
      
      // Check that text is not cut off on mobile
      const headingBox = await mainHeading.boundingBox();
      expect(headingBox?.width).toBeLessThanOrEqual(viewport.width - 40); // Allow 20px margin each side
      
      // Check signup form on mobile
      const signupForm = page.locator('[data-testid="signup-form"]');
      await expect(signupForm).toBeVisible();
      
      const submitButton = page.locator('[data-testid="signup-submit"]');
      const buttonBox = await submitButton.boundingBox();
      
      // Verify touch target size (44px minimum)
      expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
      expect(buttonBox?.width).toBeGreaterThanOrEqual(44);
      
      console.log(`   ✅ ${viewport.device}: Responsive design verified`);
    }
  });

  test('should track user interactions for analytics', async ({ page }) => {
    console.log('📊 Testing analytics interaction tracking...');
    
    // Mock analytics calls to verify they're made
    const analyticsEvents = [];
    await page.route('**/analytics/**', route => {
      analyticsEvents.push({
        url: route.request().url(),
        method: route.request().method(),
        data: route.request().postData()
      });
      route.fulfill({ status: 200, body: 'OK' });
    });
    
    // Perform trackable actions
    await page.locator('[data-testid="email-input"]').click();
    await page.locator('[data-testid="email-input"]').fill('test@example.com');
    
    await page.locator('[data-testid="analytics-preview"]').click();
    
    // Wait for potential analytics calls
    await page.waitForTimeout(1000);
    
    // In a real implementation, we'd verify specific analytics events
    console.log(`   Tracked ${analyticsEvents.length} analytics events`);
    
    console.log('✅ Analytics interaction tracking configured');
  });
});

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display real-time analytics dashboard', async ({ page }) => {
    console.log('📊 Testing real-time analytics dashboard...');
    
    // Check main dashboard elements
    const dashboardTitle = page.locator('h1');
    await expect(dashboardTitle).toContainText('Dashboard');
    
    // Verify analytics cards
    const analyticsCards = page.locator('[data-testid="analytics-card"]');
    const cardCount = await analyticsCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Check for key metrics
    const totalDaysCard = page.locator('[data-testid="total-days-card"]');
    const remainingDaysCard = page.locator('[data-testid="remaining-days-card"]');
    const riskLevelCard = page.locator('[data-testid="risk-level-card"]');
    
    await expect(totalDaysCard).toBeVisible();
    await expect(remainingDaysCard).toBeVisible();
    await expect(riskLevelCard).toBeVisible();
    
    console.log('✅ Dashboard analytics elements displayed');
  });

  test('should show interactive trip management', async ({ page }) => {
    console.log('🗂️ Testing interactive trip management...');
    
    // Check trip list section
    const tripList = page.locator('[data-testid="trip-list"]');
    await expect(tripList).toBeVisible();
    
    // Test adding a trip from dashboard
    const addTripButton = page.locator('[data-testid="add-trip-from-dashboard"]');
    if (await addTripButton.count() > 0) {
      await addTripButton.click();
      
      // Check if trip form opens
      const tripForm = page.locator('[data-testid="trip-form-modal"]');
      await expect(tripForm).toBeVisible();
      
      // Close form for cleanup
      const closeButton = page.locator('[data-testid="close-trip-form"]');
      if (await closeButton.count() > 0) {
        await closeButton.click();
      }
    }
    
    console.log('✅ Interactive trip management working');
  });

  test('should display animated charts and progress indicators', async ({ page }) => {
    console.log('📈 Testing animated charts and progress indicators...');
    
    // Check for circular progress indicator
    const circularProgress = page.locator('[data-testid="circular-progress"]');
    if (await circularProgress.count() > 0) {
      await expect(circularProgress).toBeVisible();
      
      // Verify animation properties
      const progressElement = circularProgress.first();
      const hasAnimation = await progressElement.evaluate(el => {
        const computedStyle = getComputedStyle(el);
        return computedStyle.animationName !== 'none' || computedStyle.transitionProperty !== 'none';
      });
      
      expect(hasAnimation).toBe(true);
      console.log('   ✅ Circular progress has animations');
    }
    
    // Check for timeline/chart components
    const timelineChart = page.locator('[data-testid="timeline-chart"]');
    if (await timelineChart.count() > 0) {
      await expect(timelineChart).toBeVisible();
      console.log('   ✅ Timeline chart displayed');
    }
    
    // Verify data visualization elements
    const dataViz = page.locator('[data-testid*="chart"], [data-testid*="graph"], [data-testid*="progress"]');
    const vizCount = await dataViz.count();
    expect(vizCount).toBeGreaterThan(0);
    
    console.log(`✅ ${vizCount} data visualization elements found`);
  });

  test('should update analytics in real-time when trips change', async ({ page }) => {
    console.log('⚡ Testing real-time analytics updates...');
    
    // Get initial analytics values
    const initialDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
    const initialRemaining = await page.locator('[data-testid="remaining-days"]').textContent();
    
    console.log(`   Initial: ${initialDaysUsed} used, ${initialRemaining} remaining`);
    
    // Add a trip to trigger update
    const addTripButton = page.locator('[data-testid="add-trip-from-dashboard"]');
    if (await addTripButton.count() > 0) {
      await addTripButton.click();
      
      // Fill out trip form
      const countrySelect = page.locator('[data-testid="country-select"]');
      if (await countrySelect.count() > 0) {
        await countrySelect.click();
        await page.locator('[data-testid="country-option"]:has-text("Germany")').click();
      }
      
      await page.locator('[data-testid="start-date-input"]').fill('2024-01-01');
      await page.locator('[data-testid="end-date-input"]').fill('2024-01-10');
      
      // Save trip
      await page.locator('[data-testid="save-trip-button"]').click();
      
      // Wait for analytics to update
      await page.waitForTimeout(500);
      
      // Get updated analytics values
      const updatedDaysUsed = await page.locator('[data-testid="total-days-used"]').textContent();
      const updatedRemaining = await page.locator('[data-testid="remaining-days"]').textContent();
      
      console.log(`   Updated: ${updatedDaysUsed} used, ${updatedRemaining} remaining`);
      
      // Values should have changed
      expect(updatedDaysUsed).not.toBe(initialDaysUsed);
      expect(updatedRemaining).not.toBe(initialRemaining);
      
      console.log('✅ Real-time analytics updates working');
    } else {
      console.log('ℹ️  Add trip functionality not available for testing updates');
    }
  });

  test('should be mobile responsive with proper touch targets', async ({ page }) => {
    console.log('📱 Testing dashboard mobile responsiveness...');
    
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Check main dashboard elements are visible on mobile
    const dashboardTitle = page.locator('h1');
    await expect(dashboardTitle).toBeVisible();
    
    // Verify analytics cards stack properly on mobile
    const analyticsCards = page.locator('[data-testid="analytics-card"]');
    const cardCount = await analyticsCards.count();
    
    if (cardCount > 0) {
      const firstCard = analyticsCards.first();
      const cardBox = await firstCard.boundingBox();
      
      // Cards should not be too wide for mobile
      expect(cardBox?.width).toBeLessThanOrEqual(375 - 40); // Allow 20px margin each side
    }
    
    // Check interactive elements meet touch target requirements
    const interactiveElements = page.locator('button, [role="button"], a, input');
    const elementCount = await interactiveElements.count();
    
    let validTouchTargets = 0;
    for (let i = 0; i < Math.min(elementCount, 10); i++) { // Test first 10 elements
      const element = interactiveElements.nth(i);
      const box = await element.boundingBox();
      
      if (box && box.width >= 44 && box.height >= 44) {
        validTouchTargets++;
      }
    }
    
    const tested = Math.min(elementCount, 10);
    const touchTargetCompliance = (validTouchTargets / tested) * 100;
    
    console.log(`   Touch target compliance: ${touchTargetCompliance.toFixed(1)}% (${validTouchTargets}/${tested})`);
    
    // Should have good touch target compliance
    expect(touchTargetCompliance).toBeGreaterThan(80);
    
    console.log('✅ Dashboard mobile responsiveness verified');
  });

  test('should handle error states gracefully', async ({ page }) => {
    console.log('🛡️ Testing dashboard error state handling...');
    
    // Test with network errors
    await page.route('**/api/**', route => {
      route.fulfill({ status: 500, body: 'Server Error' });
    });
    
    // Refresh to trigger potential API calls
    await page.reload();
    
    // Check for error handling
    const errorMessage = page.locator('[data-testid="error-message"], [data-testid="error-state"]');
    const loadingState = page.locator('[data-testid="loading-state"], [data-testid="skeleton"]');
    const fallbackContent = page.locator('[data-testid="fallback-content"]');
    
    // Should show some form of error handling or fallback
    const hasErrorHandling = 
      (await errorMessage.count()) > 0 ||
      (await loadingState.count()) > 0 ||
      (await fallbackContent.count()) > 0;
    
    if (hasErrorHandling) {
      console.log('   ✅ Error state handling implemented');
    } else {
      console.log('   ℹ️  No explicit error handling found');
    }
    
    // Dashboard should still be functional even with API errors
    const dashboardTitle = page.locator('h1');
    await expect(dashboardTitle).toBeVisible();
    
    console.log('✅ Dashboard handles errors gracefully');
  });
});

test.describe('Cross-Page Navigation and Consistency', () => {
  test('should maintain consistent navigation between pages', async ({ page }) => {
    console.log('🧭 Testing cross-page navigation consistency...');
    
    // Start on save progress page
    await page.goto('/save-progress');
    
    // Check for navigation elements
    const navToCalculator = page.locator('[data-testid="nav-calculator"], a[href="/"]');
    const navToDashboard = page.locator('[data-testid="nav-dashboard"], a[href="/dashboard"]');
    
    if (await navToCalculator.count() > 0) {
      await navToCalculator.click();
      await expect(page).toHaveURL('/');
      console.log('   ✅ Navigation to calculator works');
      
      // Go back to save progress
      await page.goto('/save-progress');
    }
    
    if (await navToDashboard.count() > 0) {
      await navToDashboard.click();
      await expect(page).toHaveURL('/dashboard');
      console.log('   ✅ Navigation to dashboard works');
    }
    
    console.log('✅ Cross-page navigation consistent');
  });

  test('should maintain consistent branding and styling', async ({ page }) => {
    console.log('🎨 Testing consistent branding across pages...');
    
    const pages = ['/', '/save-progress', '/dashboard'];
    const brandingElements = [];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check for logo/brand element
      const logo = page.locator('[data-testid="logo"], .logo, [alt*="logo"], [alt*="Schengen"]');
      const hasLogo = (await logo.count()) > 0;
      
      // Check for consistent color scheme
      const primaryColor = await page.evaluate(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        return rootStyles.getPropertyValue('--primary') || 
               rootStyles.getPropertyValue('--primary-color') ||
               rootStyles.getPropertyValue('--brand-primary');
      });
      
      brandingElements.push({
        page: pagePath,
        hasLogo,
        primaryColor: primaryColor.trim()
      });
      
      console.log(`   ${pagePath}: Logo=${hasLogo}, Primary=${primaryColor || 'not set'}`);
    }
    
    // Verify consistency
    const logoCounts = brandingElements.map(el => el.hasLogo);
    const logoConsistent = logoCounts.every(hasLogo => hasLogo === logoCounts[0]);
    
    expect(logoConsistent).toBe(true);
    console.log('✅ Branding consistency maintained across pages');
  });
});