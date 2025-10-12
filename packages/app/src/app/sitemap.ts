import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generation for euborder.com
 * Includes all static routes, EES pages, country pages, and blog content
 * Optimized for October 12, 2025 EES launch
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://euborder.com'
  const currentDate = new Date()
  const eesLaunchDate = new Date('2025-10-12')

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/schengen-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // EES Authority Hub - HIGH PRIORITY for October 12 launch
  const eesPages = [
    {
      url: `${baseUrl}/ees`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95, // High priority - main EES hub
    },
    {
      url: `${baseUrl}/ees/complete-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ees/guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Product page
    },
    // NEW: Core EES Landing Pages (51K+ combined monthly searches)
    {
      url: `${baseUrl}/ees/what-is-ees`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95, // 15K+ monthly searches
    },
    {
      url: `${baseUrl}/ees/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // 10K+ monthly searches
    },
    {
      url: `${baseUrl}/ees/requirements`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // 10K+ monthly searches
    },
    {
      url: `${baseUrl}/ees/biometrics`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // 8K+ monthly searches
    },
    {
      url: `${baseUrl}/ees/launch-date`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9, // 5K+ monthly searches, time-sensitive
    },
    {
      url: `${baseUrl}/ees/for-uk-travelers`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // 3K+ monthly searches, UK-specific
    },
    {
      url: `${baseUrl}/ees/airports`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // Airport-specific procedures
    },
    {
      url: `${baseUrl}/ees/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85, // 50+ comprehensive FAQs
    },
    {
      url: `${baseUrl}/ees/preparation`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ees/preparation-kit`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ees/vs-etias`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ees/family`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ees/digital-nomads`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ees/countries`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ]

  // EES Country-Specific Pages
  const eesCountryPages = [
    'france',
    'germany',
    'spain',
    'italy',
    'netherlands',
  ].map((country) => ({
    url: `${baseUrl}/ees/countries/${country}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Blog pages (high priority for SEO)
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    // Individual blog posts - dynamically generated
    {
      url: `${baseUrl}/blog/schengen-90-180-rule-explained-2026`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // High priority - targets 4,400 monthly searches
    },
    {
      url: `${baseUrl}/blog/digital-nomad-europe-visa-guide-2026`,
      lastModified: new Date('2026-01-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.85, // High priority - targets 1,800 monthly searches
    },
    {
      url: `${baseUrl}/blog/etias-2025-complete-guide-europe-travel-authorization`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Batch 2: Additional High-Priority Posts (14,200+ combined monthly searches)
    {
      url: `${baseUrl}/blog/how-long-can-i-stay-in-europe-without-visa-2026`,
      lastModified: new Date('2026-01-14'),
      changeFrequency: 'monthly' as const,
      priority: 0.92, // Very high priority - targets 8,900 monthly searches
    },
    {
      url: `${baseUrl}/blog/brexit-travel-rules-europe-2026`,
      lastModified: new Date('2026-01-16'),
      changeFrequency: 'monthly' as const,
      priority: 0.88, // High priority - targets 3,200 monthly searches
    },
    {
      url: `${baseUrl}/blog/schengen-overstay-consequences-penalties-2026`,
      lastModified: new Date('2026-01-18'),
      changeFrequency: 'monthly' as const,
      priority: 0.87, // High priority - targets 2,100 monthly searches
    },
  ]

  // Authentication pages (lower priority, no index)
  const authPages = [
    {
      url: `${baseUrl}/sign-in`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  return [...corePages, ...eesPages, ...eesCountryPages, ...blogPages, ...authPages]
}
