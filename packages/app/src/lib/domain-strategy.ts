/**
 * EU Border Authority Domain Strategy Configuration
 *
 * Manages the transition from multiple domain strategy to unified EU Border Authority platform
 * Primary domain: euborder.com with strategic redirects from legacy domains
 */

export interface DomainConfig {
  primary: string
  legacy: string[]
  redirects: DomainRedirect[]
  seo: SEOConfig
}

export interface DomainRedirect {
  source: string
  destination: string
  permanent: boolean
  statusCode?: number
}

export interface SEOConfig {
  canonicalBase: string
  hreflang: Record<string, string>
  sitemap: string[]
}

/**
 * EU Border Authority Domain Strategy
 *
 * Strategic consolidation:
 * - euborder.com: Primary authority hub
 * - schengenvisacalculator.com → euborder.com/calculator (proven traffic)
 * - eessystem.com → euborder.com/ees (first-mover advantage)
 */
export const DOMAIN_STRATEGY: DomainConfig = {
  primary: 'euborder.com',
  legacy: [
    'schengenvisacalculator.com',
    'eessystem.com'
  ],
  redirects: [
    // Schengen Calculator Domain Redirects
    {
      source: 'schengenvisacalculator.com',
      destination: 'euborder.com/calculator',
      permanent: false // 302 to preserve legacy SEO during transition
    },
    {
      source: 'www.schengenvisacalculator.com',
      destination: 'euborder.com/calculator',
      permanent: false
    },

    // EES System Domain Redirects
    {
      source: 'eessystem.com',
      destination: 'euborder.com/ees',
      permanent: false
    },
    {
      source: 'www.eessystem.com',
      destination: 'euborder.com/ees',
      permanent: false
    },

    // Internal URL Redirects for Legacy URLs
    {
      source: '/schengen-calculator',
      destination: '/calculator',
      permanent: true
    },
    {
      source: '/schengen-visa-calculator',
      destination: '/calculator',
      permanent: true
    },
    {
      source: '/ees-calculator',
      destination: '/ees',
      permanent: true
    },
    {
      source: '/etias-calculator',
      destination: '/etias',
      permanent: true
    }
  ],
  seo: {
    canonicalBase: 'https://euborder.com',
    hreflang: {
      'en': 'https://euborder.com',
      'en-US': 'https://euborder.com',
      'en-GB': 'https://euborder.com',
      'x-default': 'https://euborder.com'
    },
    sitemap: [
      'https://euborder.com/sitemap.xml',
      'https://euborder.com/sitemap-calculator.xml',
      'https://euborder.com/sitemap-ees.xml',
      'https://euborder.com/sitemap-etias.xml',
      'https://euborder.com/sitemap-countries.xml'
    ]
  }
}

/**
 * Get canonical URL for any given path
 */
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${DOMAIN_STRATEGY.seo.canonicalBase}${cleanPath}`
}

/**
 * Check if a domain is a legacy domain that should redirect
 */
export function isLegacyDomain(domain: string): boolean {
  return DOMAIN_STRATEGY.legacy.includes(domain.replace('www.', ''))
}

/**
 * Get redirect destination for a legacy domain
 */
export function getLegacyRedirect(domain: string, path: string = ''): string | null {
  const cleanDomain = domain.replace('www.', '')

  switch (cleanDomain) {
    case 'schengenvisacalculator.com':
      return `${DOMAIN_STRATEGY.seo.canonicalBase}/calculator${path}`
    case 'eessystem.com':
      return `${DOMAIN_STRATEGY.seo.canonicalBase}/ees${path}`
    default:
      return null
  }
}

/**
 * Domain migration configuration for different environments
 */
export const MIGRATION_CONFIG = {
  // Phase 1: Soft redirects (302) to preserve SEO during transition
  phase1: {
    redirectType: 302,
    preserveQuery: true,
    analytics: {
      trackLegacyTraffic: true,
      conversionGoals: ['calculator_usage', 'subscription_signup']
    }
  },

  // Phase 2: Hard redirects (301) after traffic migration confirmed
  phase2: {
    redirectType: 301,
    preserveQuery: true,
    analytics: {
      trackConversion: true,
      abandonLegacyTracking: true
    }
  },

  // Production deployment configuration
  production: {
    enableRedirects: process.env.NODE_ENV === 'production',
    trackingEnabled: true,
    fallbackBehavior: 'redirect_to_home'
  }
}

/**
 * URL path mapping for content migration
 */
export const PATH_MIGRATION_MAP = {
  // Legacy Schengen Calculator paths
  '/': '/calculator',
  '/calculator': '/calculator',
  '/family': '/family',
  '/pricing': '/pricing',

  // EES system paths
  '/ees-guide': '/ees',
  '/ees-preparation': '/ees/preparation',
  '/ees-biometrics': '/ees/biometrics',
  '/ees-family': '/ees/family',

  // ETIAS paths
  '/etias-guide': '/etias',
  '/etias-application': '/etias/application',
  '/etias-countries': '/etias/countries',

  // Country-specific paths
  '/countries': '/countries',
  '/countries/:country': '/countries/:country',

  // Business paths
  '/business': '/business',
  '/enterprise': '/business/enterprise',
  '/api': '/business/api'
}

/**
 * Generate Next.js rewrites for domain strategy
 */
export function generateNextJSRewrites() {
  return DOMAIN_STRATEGY.redirects
    .filter(redirect => redirect.source.startsWith('/'))
    .map(redirect => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: redirect.permanent
    }))
}

/**
 * Generate Vercel redirects configuration
 */
export function generateVercelRedirects() {
  return DOMAIN_STRATEGY.redirects.map(redirect => ({
    source: redirect.source,
    destination: redirect.destination,
    permanent: redirect.permanent,
    statusCode: redirect.permanent ? 301 : 302
  }))
}