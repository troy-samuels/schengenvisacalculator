import { NextRequest, NextResponse } from 'next/server'
import { ContentGeneratorService } from '@/lib/content-generation/content-generator'
import { InternalLinkingService } from '@/lib/content-generation/internal-linking'
import { SitemapGenerator } from '@/lib/content-generation/sitemap-generator'
import { SchemaMarkupGenerator } from '@/lib/content-generation/schema-generator'

/**
 * Content generation API endpoint
 * POST /api/content/generate
 */
export async function POST(request: NextRequest) {
  try {
    const { type, options = {} } = await request.json()

    if (!type) {
      return NextResponse.json(
        { error: 'Content type is required' },
        { status: 400 }
      )
    }

    const generator = new ContentGeneratorService()
    const linkingService = new InternalLinkingService()
    const sitemapGenerator = new SitemapGenerator()

    let result
    let generatedPages = []

    console.log(`Starting content generation for type: ${type}`)

    switch (type) {
      case 'country-to-schengen':
        generatedPages = await generator.generateCountryToSchengenPages()
        break

      case 'digital-nomad':
        generatedPages = await generator.generateDigitalNomadPages()
        break

      case 'visa-comparison':
        generatedPages = await generator.generateVisaComparisonPages()
        break

      case 'faq-pages':
        generatedPages = await generator.generateFAQPages()
        break

      case 'all':
        result = await generator.generateAllContent()
        generatedPages = [
          ...result.countryPages,
          ...result.nomadPages,
          ...result.comparisonPages,
          ...result.faqPages
        ]
        break

      default:
        return NextResponse.json(
          { error: `Unknown content type: ${type}` },
          { status: 400 }
        )
    }

    console.log(`Generated ${generatedPages.length} pages`)

    // Add schema markup to all pages
    for (const page of generatedPages) {
      if (!page.schemaMarkup) {
        page.schemaMarkup = SchemaMarkupGenerator.generateSchemaMarkup(page)
      }
    }

    // Save pages to database
    if (options.saveToDatabase !== false) {
      await generator.savePages(generatedPages)
    }

    // Update internal links
    if (options.updateInternalLinks !== false) {
      await linkingService.updateAllInternalLinks(generatedPages)
    }

    // Update sitemap
    if (options.updateSitemap !== false) {
      await sitemapGenerator.updateSitemapAfterGeneration(generatedPages)
    }

    const response = {
      success: true,
      generated: generatedPages.length,
      pages: options.includeContent ? generatedPages : generatedPages.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        templateId: p.templateId,
        status: p.status,
        seoScore: p.seoScore
      })),
      breakdown: result ? {
        countryPages: result.countryPages.length,
        nomadPages: result.nomadPages.length,
        comparisonPages: result.comparisonPages.length,
        faqPages: result.faqPages.length
      } : undefined,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Content generation failed:', error)
    return NextResponse.json(
      { 
        error: 'Content generation failed', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Get generation status
 * GET /api/content/generate
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')

    if (jobId) {
      // Return specific job status
      // This would query the database for the job status
      return NextResponse.json({
        jobId,
        status: 'completed', // Mock status
        progress: 100,
        result: {
          generated: 150,
          success: true
        }
      })
    }

    // Return general statistics
    const stats = {
      totalPages: 1247,
      publishedPages: 892,
      draftPages: 355,
      recentGeneration: {
        timestamp: new Date().toISOString(),
        pagesGenerated: 50
      },
      templates: {
        'country-to-schengen': 45,
        'digital-nomad-guide': 28,
        'visa-comparison': 156,
        'faq-page': 12
      }
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Failed to get generation status:', error)
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    )
  }
}