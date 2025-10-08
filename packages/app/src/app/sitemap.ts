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

  return [...corePages, ...eesPages, ...eesCountryPages, ...authPages]
}
