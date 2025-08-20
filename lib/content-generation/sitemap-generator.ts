import { GeneratedPage, SitemapEntry } from './types'
import { createClient } from '../supabase/client'

/**
 * Sitemap generator for SEO optimization
 */
export class SitemapGenerator {
  private supabase = createClient()
  private baseUrl: string

  constructor(baseUrl: string = 'https://schengenvisacalculator.com') {
    this.baseUrl = baseUrl
  }

  /**
   * Generate complete sitemap XML
   */
  async generateSitemap(): Promise<string> {
    const entries = await this.getAllSitemapEntries()
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(entry => this.generateUrlEntry(entry)).join('\n')}
</urlset>`

    return xml
  }

  /**
   * Generate sitemap entries for pages
   */
  async generateSitemapEntries(pages: GeneratedPage[]): Promise<SitemapEntry[]> {
    const entries: SitemapEntry[] = []

    for (const page of pages) {
      if (page.status === 'published') {
        entries.push({
          url: `${this.baseUrl}/${page.slug}`,
          lastModified: new Date(page.updatedAt),
          changeFrequency: this.getChangeFrequency(page.templateId),
          priority: this.getPriority(page.templateId, page.variables)
        })
      }
    }

    return entries
  }

  /**
   * Save sitemap entries to database
   */
  async saveSitemapEntries(entries: SitemapEntry[]): Promise<void> {
    console.log(`Saving ${entries.length} sitemap entries...`)

    for (const entry of entries) {
      try {
        const { error } = await this.supabase
          .from('sitemap_entries')
          .upsert({
            url: entry.url,
            last_modified: entry.lastModified,
            change_frequency: entry.changeFrequency,
            priority: entry.priority,
            included: true
          })

        if (error) {
          console.error(`Failed to save sitemap entry ${entry.url}:`, error)
        }
      } catch (error) {
        console.error(`Error saving sitemap entry ${entry.url}:`, error)
      }
    }
  }

  /**
   * Get all sitemap entries from database
   */
  async getAllSitemapEntries(): Promise<SitemapEntry[]> {
    try {
      const { data, error } = await this.supabase
        .from('sitemap_entries')
        .select('*')
        .eq('included', true)
        .order('priority', { ascending: false })

      if (error) {
        console.error('Error fetching sitemap entries:', error)
        return []
      }

      return data.map(entry => ({
        url: entry.url,
        lastModified: new Date(entry.last_modified),
        changeFrequency: entry.change_frequency,
        priority: entry.priority
      }))
    } catch (error) {
      console.error('Error fetching sitemap entries:', error)
      return []
    }
  }

  /**
   * Generate sitemap index for multiple sitemaps
   */
  async generateSitemapIndex(): Promise<string> {
    const sitemaps = [
      {
        url: `${this.baseUrl}/sitemap-pages.xml`,
        lastModified: new Date()
      },
      {
        url: `${this.baseUrl}/sitemap-countries.xml`,
        lastModified: new Date()
      },
      {
        url: `${this.baseUrl}/sitemap-nomad-guides.xml`,
        lastModified: new Date()
      },
      {
        url: `${this.baseUrl}/sitemap-comparisons.xml`,
        lastModified: new Date()
      }
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

    return xml
  }

  /**
   * Generate country-specific sitemap
   */
  async generateCountrySitemap(): Promise<string> {
    const { data: pages } = await this.supabase
      .from('generated_pages')
      .select('*')
      .eq('template_id', 'country-to-schengen')
      .eq('status', 'published')

    if (!pages) return this.generateEmptySitemap()

    const entries = pages.map(page => ({
      url: `${this.baseUrl}/${page.slug}`,
      lastModified: new Date(page.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))

    return this.generateSitemapFromEntries(entries)
  }

  /**
   * Generate digital nomad guides sitemap
   */
  async generateNomadGuidesSitemap(): Promise<string> {
    const { data: pages } = await this.supabase
      .from('generated_pages')
      .select('*')
      .eq('template_id', 'digital-nomad-guide')
      .eq('status', 'published')

    if (!pages) return this.generateEmptySitemap()

    const entries = pages.map(page => ({
      url: `${this.baseUrl}/${page.slug}`,
      lastModified: new Date(page.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))

    return this.generateSitemapFromEntries(entries)
  }

  /**
   * Generate visa comparison sitemap
   */
  async generateComparisonsSitemap(): Promise<string> {
    const { data: pages } = await this.supabase
      .from('generated_pages')
      .select('*')
      .eq('template_id', 'visa-comparison')
      .eq('status', 'published')

    if (!pages) return this.generateEmptySitemap()

    const entries = pages.map(page => ({
      url: `${this.baseUrl}/${page.slug}`,
      lastModified: new Date(page.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))

    return this.generateSitemapFromEntries(entries)
  }

  /**
   * Generate news sitemap for recent content
   */
  async generateNewsSitemap(): Promise<string> {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    
    const { data: recentPages } = await this.supabase
      .from('generated_pages')
      .select('*')
      .eq('status', 'published')
      .gte('created_at', twoDaysAgo.toISOString())
      .order('created_at', { ascending: false })

    if (!recentPages || recentPages.length === 0) {
      return this.generateEmptyNewsSitemap()
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentPages.map(page => `  <url>
    <loc>${this.baseUrl}/${page.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Schengen Visa Calculator</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(page.created_at).toISOString()}</news:publication_date>
      <news:title><![CDATA[${page.title}]]></news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>`

    return xml
  }

  /**
   * Generate mobile-specific sitemap annotations
   */
  async generateMobileSitemap(): Promise<string> {
    const entries = await this.getAllSitemapEntries()
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <mobile:mobile/>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return xml
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-index.xml

# Crawl-delay for specific bots
User-agent: Bingbot
Crawl-delay: 1

User-agent: Slurp
Crawl-delay: 1

# Block admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow images and CSS
Allow: /images/
Allow: /css/
Allow: /_next/static/

# Common bot patterns to block
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`
  }

  /**
   * Update sitemap after content changes
   */
  async updateSitemapAfterGeneration(newPages: GeneratedPage[]): Promise<void> {
    console.log('Updating sitemap with new content...')
    
    const newEntries = await this.generateSitemapEntries(newPages)
    await this.saveSitemapEntries(newEntries)
    
    // Trigger sitemap regeneration
    await this.regenerateAllSitemaps()
  }

  /**
   * Regenerate all sitemap files
   */
  async regenerateAllSitemaps(): Promise<void> {
    try {
      // Generate all sitemaps
      const [
        mainSitemap,
        countrySitemap,
        nomadSitemap,
        comparisonsSitemap,
        sitemapIndex
      ] = await Promise.all([
        this.generateSitemap(),
        this.generateCountrySitemap(),
        this.generateNomadGuidesSitemap(),
        this.generateComparisonsSitemap(),
        this.generateSitemapIndex()
      ])

      // In a real implementation, you would save these files to your static directory
      console.log('Generated sitemaps:')
      console.log('- Main sitemap:', mainSitemap.length, 'characters')
      console.log('- Country sitemap:', countrySitemap.length, 'characters')
      console.log('- Nomad guides sitemap:', nomadSitemap.length, 'characters')
      console.log('- Comparisons sitemap:', comparisonsSitemap.length, 'characters')
      console.log('- Sitemap index:', sitemapIndex.length, 'characters')

    } catch (error) {
      console.error('Error regenerating sitemaps:', error)
    }
  }

  // Private helper methods

  private generateUrlEntry(entry: SitemapEntry): string {
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  }

  private generateSitemapFromEntries(entries: SitemapEntry[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => this.generateUrlEntry(entry)).join('\n')}
</urlset>`
  }

  private generateEmptySitemap(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
  }

  private generateEmptyNewsSitemap(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`
  }

  private getChangeFrequency(templateId: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
    const frequencyMap: Record<string, any> = {
      'country-to-schengen': 'monthly',
      'digital-nomad-guide': 'weekly',
      'visa-comparison': 'monthly',
      'faq-page': 'weekly'
    }

    return frequencyMap[templateId] || 'monthly'
  }

  private getPriority(templateId: string, variables?: any): number {
    let basePriority = 0.5

    // Template-based priority
    switch (templateId) {
      case 'country-to-schengen':
        basePriority = 0.8
        break
      case 'digital-nomad-guide':
        basePriority = 0.7
        break
      case 'visa-comparison':
        basePriority = 0.6
        break
      case 'faq-page':
        basePriority = 0.5
        break
    }

    // Boost priority for popular countries
    if (variables?.popular) {
      basePriority = Math.min(basePriority + 0.1, 1.0)
    }

    // Boost priority for visa-free countries (more popular searches)
    if (variables?.visaRequired === false) {
      basePriority = Math.min(basePriority + 0.05, 1.0)
    }

    return Math.round(basePriority * 10) / 10 // Round to 1 decimal place
  }
}

/**
 * Utility functions for sitemap management
 */
export class SitemapUtils {
  
  /**
   * Validate sitemap URL format
   */
  static isValidSitemapUrl(url: string): boolean {
    try {
      new URL(url)
      return !url.includes(' ') && url.length <= 2048
    } catch {
      return false
    }
  }

  /**
   * Calculate sitemap file size
   */
  static calculateSitemapSize(xml: string): number {
    return new Blob([xml]).size
  }

  /**
   * Check if sitemap exceeds limits
   */
  static validateSitemapLimits(xml: string): { valid: boolean; issues: string[] } {
    const issues: string[] = []
    const size = this.calculateSitemapSize(xml)
    const urlCount = (xml.match(/<url>/g) || []).length

    // Check file size (50MB limit)
    if (size > 50 * 1024 * 1024) {
      issues.push(`Sitemap file size (${(size / 1024 / 1024).toFixed(2)}MB) exceeds 50MB limit`)
    }

    // Check URL count (50,000 limit)
    if (urlCount > 50000) {
      issues.push(`Sitemap contains ${urlCount} URLs, exceeding 50,000 limit`)
    }

    return {
      valid: issues.length === 0,
      issues
    }
  }

  /**
   * Split large sitemap into multiple files
   */
  static splitSitemap(entries: SitemapEntry[], maxUrlsPerSitemap: number = 45000): SitemapEntry[][] {
    const chunks: SitemapEntry[][] = []
    
    for (let i = 0; i < entries.length; i += maxUrlsPerSitemap) {
      chunks.push(entries.slice(i, i + maxUrlsPerSitemap))
    }
    
    return chunks
  }

  /**
   * Generate sitemap filename with timestamp
   */
  static generateSitemapFilename(type: string = 'main'): string {
    const timestamp = new Date().toISOString().split('T')[0]
    return `sitemap-${type}-${timestamp}.xml`
  }
}