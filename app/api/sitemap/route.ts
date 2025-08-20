import { NextRequest, NextResponse } from 'next/server'
import { SitemapGenerator } from '@/lib/content-generation/sitemap-generator'

/**
 * Dynamic sitemap generation API
 * GET /api/sitemap
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'main'
    
    const sitemapGenerator = new SitemapGenerator()
    let sitemapXml: string

    switch (type) {
      case 'main':
        sitemapXml = await sitemapGenerator.generateSitemap()
        break
      
      case 'countries':
        sitemapXml = await sitemapGenerator.generateCountrySitemap()
        break
      
      case 'nomad-guides':
        sitemapXml = await sitemapGenerator.generateNomadGuidesSitemap()
        break
      
      case 'comparisons':
        sitemapXml = await sitemapGenerator.generateComparisonsSitemap()
        break
      
      case 'news':
        sitemapXml = await sitemapGenerator.generateNewsSitemap()
        break
      
      case 'mobile':
        sitemapXml = await sitemapGenerator.generateMobileSitemap()
        break
      
      case 'index':
        sitemapXml = await sitemapGenerator.generateSitemapIndex()
        break
      
      default:
        return NextResponse.json(
          { error: `Unknown sitemap type: ${type}` },
          { status: 400 }
        )
    }

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })

  } catch (error) {
    console.error('Sitemap generation failed:', error)
    return NextResponse.json(
      { error: 'Sitemap generation failed' },
      { status: 500 }
    )
  }
}

/**
 * Regenerate all sitemaps
 * POST /api/sitemap
 */
export async function POST(request: NextRequest) {
  try {
    const sitemapGenerator = new SitemapGenerator()
    await sitemapGenerator.regenerateAllSitemaps()

    return NextResponse.json({
      success: true,
      message: 'All sitemaps regenerated successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Sitemap regeneration failed:', error)
    return NextResponse.json(
      { error: 'Sitemap regeneration failed' },
      { status: 500 }
    )
  }
}