import { NextResponse } from 'next/server'
import { blogPosts } from '@/lib/blog-data'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://euborder.com'
  const currentDate = new Date().toISOString()

  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: '',
      priority: '1.0',
      changefreq: 'daily',
      lastmod: currentDate
    },
    {
      url: '/ees',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/ees/countries',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/ees/countries/germany',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/ees/countries/france',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/ees/countries/spain',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/ees/preparation',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/ees/preparation-kit',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/ees/digital-nomads',
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/ees/vs-etias',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/blog',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: currentDate
    },
    {
      url: '/dashboard',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/save-progress',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/schengen-calculator',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/90-180-day-rule',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: currentDate
    }
  ]

  // Blog posts with dynamic content
  const blogSitemapEntries = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: post.featured ? '0.8' : '0.7',
    changefreq: 'monthly',
    lastmod: post.updatedAt || post.publishDate
  }))

  // Combine all pages
  const allPages = [...staticPages, ...blogSitemapEntries]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}