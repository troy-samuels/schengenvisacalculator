import { defineConfig, devices } from '@playwright/test';

/**
 * Comprehensive Playwright Configuration for Schengen Calculator V2
 * 
 * CRITICAL TESTING REQUIREMENTS:
 * - EU Compliance: 100% pass rate for Schengen 90/180 calculations
 * - Date Overlap Prevention: 100% accuracy in conflict detection
 * - Mobile Calendar Auto-scroll: Must open to current date reliably
 * - Performance: <50ms calculations, <200KB bundle
 * - Security: Zero vulnerabilities, enterprise-grade testing
 */
export default defineConfig({
  // Test directory structure
  testDir: './e2e',
  
  // Global timeout settings
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 10 * 1000, // 10 seconds for assertions
  },
  
  // Test execution configuration
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: process.env.CI ? [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['github'],
  ] : [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  
  // Global test settings
  use: {
    // Base URL for tests
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    
    // Trace recording for debugging
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Browser context settings
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Performance monitoring
    actionTimeout: 5000,
    navigationTimeout: 10000,
  },

  // Test projects for different scenarios
  projects: [
    // Desktop Chrome - Primary testing
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    // Mobile Safari - Critical for mobile-first design
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 14 Pro'],
        // Override viewport for mobile testing
        viewport: { width: 375, height: 812 },
      },
    },
    
    // Mobile Chrome - Android testing
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 7'],
        viewport: { width: 390, height: 844 },
      },
    },
    
    // Tablet testing
    {
      name: 'iPad',
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 },
      },
    },
    
    // Desktop Firefox for cross-browser compatibility
    {
      name: 'Desktop Firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    // Desktop Safari
    {
      name: 'Desktop Safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    // Performance testing project
    {
      name: 'Performance Tests',
      testMatch: /.*\.perf\.spec\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      timeout: 60 * 1000, // Longer timeout for performance tests
    },
    
    // EU Compliance testing - CRITICAL
    {
      name: 'EU Compliance',
      testMatch: /.*\.compliance\.spec\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      timeout: 120 * 1000, // Extra time for comprehensive compliance tests
    },
  ],

  // Web server configuration for local testing
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes to start dev server
  },
  
  // Global setup and teardown
  globalSetup: require.resolve('./e2e/global-setup.ts'),
  globalTeardown: require.resolve('./e2e/global-teardown.ts'),
  
  // Test metadata
  metadata: {
    'test-suite': 'Schengen Calculator V2 E2E Tests',
    'version': '2.0.0',
    'compliance': 'EU Schengen 90/180 Rule',
    'security-level': 'Enterprise Grade',
  },
});