import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://euborder.com'

  const robots = `# EU Border Authority - Schengen Compliance Calculator
# Robots.txt for optimal SEO crawling

User-agent: *
Allow: /

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Block admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /dashboard/
Disallow: /payment-success/
Disallow: /payment-cancelled/

# Block sensitive files
Disallow: /*.json$
Disallow: /*?*
Disallow: /save-progress/

# Block development and internal files
Disallow: *.log
Disallow: *.txt$
Disallow: /*.env*

# Allow important directories
Allow: /blog/
Allow: /ees/
Allow: /static/

# Crawl delay for politeness (1 second)
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Additional sitemaps (if we create them later)
# Sitemap: ${baseUrl}/blog-sitemap.xml
# Sitemap: ${baseUrl}/ees-sitemap.xml`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
}