import { NextResponse } from 'next/server'
import { SitemapGenerator } from '@/lib/content-generation/sitemap-generator'

/**
 * Dynamic robots.txt generation
 * GET /api/robots
 */
export async function GET() {
  try {
    const sitemapGenerator = new SitemapGenerator()
    const robotsTxt = sitemapGenerator.generateRobotsTxt()

    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    })

  } catch (error) {
    console.error('Robots.txt generation failed:', error)
    
    // Fallback robots.txt
    const fallbackRobots = `User-agent: *
Allow: /

Sitemap: https://schengenvisacalculator.com/sitemap.xml`

    return new NextResponse(fallbackRobots, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
}