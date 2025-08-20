import { GeneratedPage, InternalLink } from './types'
import { countries, Country } from '../data/countries'
import { createClient } from '../supabase/client'

/**
 * Automatic internal linking system for SEO optimization
 */
export class InternalLinkingService {
  private supabase = createClient()
  private baseUrl: string

  constructor(baseUrl: string = 'https://schengenvisacalculator.com') {
    this.baseUrl = baseUrl
  }

  /**
   * Generate contextual internal links for a page
   */
  async generateInternalLinks(page: GeneratedPage, allPages?: GeneratedPage[]): Promise<InternalLink[]> {
    // Get all pages if not provided
    if (!allPages) {
      allPages = await this.getAllPages()
    }

    const links: InternalLink[] = []
    const maxLinksPerPage = 15
    
    // Get content-based links
    const contentLinks = this.generateContentBasedLinks(page, allPages)
    links.push(...contentLinks)
    
    // Get semantic links
    const semanticLinks = this.generateSemanticLinks(page, allPages)
    links.push(...semanticLinks)
    
    // Get category-based links
    const categoryLinks = this.generateCategoryLinks(page, allPages)
    links.push(...categoryLinks)
    
    // Get related country links
    const countryLinks = this.generateCountryRelatedLinks(page, allPages)
    links.push(...countryLinks)
    
    // Remove duplicates and sort by relevance
    const uniqueLinks = this.deduplicateLinks(links)
    const sortedLinks = uniqueLinks.sort((a, b) => b.contextRelevance - a.contextRelevance)
    
    // Return top links within limit
    return sortedLinks.slice(0, maxLinksPerPage)
  }

  /**
   * Generate links based on content analysis
   */
  private generateContentBasedLinks(page: GeneratedPage, allPages: GeneratedPage[]): InternalLink[] {
    const links: InternalLink[] = []
    const content = page.content.toLowerCase()
    const pageVariables = page.variables
    
    for (const targetPage of allPages) {
      if (targetPage.id === page.id || targetPage.status !== 'published') continue
      
      const relevance = this.calculateContentRelevance(page, targetPage)
      if (relevance < 0.3) continue
      
      // Generate appropriate anchor text
      const anchorText = this.generateAnchorText(targetPage, pageVariables)
      if (!anchorText) continue
      
      links.push({
        text: anchorText,
        url: `/${targetPage.slug}`,
        contextRelevance: relevance
      })
    }
    
    return links
  }

  /**
   * Generate semantic links based on page relationships
   */
  private generateSemanticLinks(page: GeneratedPage, allPages: GeneratedPage[]): InternalLink[] {
    const links: InternalLink[] = []
    const pageCountry = this.extractCountryFromPage(page)
    
    if (!pageCountry) return links
    
    // Find complementary content
    for (const targetPage of allPages) {
      if (targetPage.id === page.id || targetPage.status !== 'published') continue
      
      const targetCountry = this.extractCountryFromPage(targetPage)
      const semanticRelevance = this.calculateSemanticRelevance(page, targetPage, pageCountry, targetCountry)
      
      if (semanticRelevance > 0.4) {
        const anchorText = this.generateSemanticAnchorText(page, targetPage, pageCountry, targetCountry)
        if (anchorText) {
          links.push({
            text: anchorText,
            url: `/${targetPage.slug}`,
            contextRelevance: semanticRelevance
          })
        }
      }
    }
    
    return links
  }

  /**
   * Generate category-based links (same template type)
   */
  private generateCategoryLinks(page: GeneratedPage, allPages: GeneratedPage[]): InternalLink[] {
    const links: InternalLink[] = []
    
    // Find pages with same template but different subjects
    const sameTemplatePages = allPages.filter(p => 
      p.templateId === page.templateId && 
      p.id !== page.id && 
      p.status === 'published'
    )
    
    // Select top related pages from same category
    const topRelated = sameTemplatePages
      .map(p => ({
        page: p,
        relevance: this.calculateCategoryRelevance(page, p)
      }))
      .filter(r => r.relevance > 0.3)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5)
    
    for (const { page: relatedPage, relevance } of topRelated) {
      const anchorText = this.generateCategoryAnchorText(relatedPage)
      if (anchorText) {
        links.push({
          text: anchorText,
          url: `/${relatedPage.slug}`,
          contextRelevance: relevance
        })
      }
    }
    
    return links
  }

  /**
   * Generate links to related countries
   */
  private generateCountryRelatedLinks(page: GeneratedPage, allPages: GeneratedPage[]): InternalLink[] {
    const links: InternalLink[] = []
    const pageCountry = this.extractCountryFromPage(page)
    
    if (!pageCountry) return links
    
    // Find geographically/culturally related countries
    const relatedCountries = this.getRelatedCountries(pageCountry)
    
    for (const relatedCountry of relatedCountries) {
      // Find pages for this related country
      const relatedPages = allPages.filter(p => 
        p.status === 'published' &&
        this.pageContainsCountry(p, relatedCountry.code)
      )
      
      // Add most relevant page for each related country
      const bestPage = relatedPages
        .map(p => ({ page: p, relevance: this.calculateContentRelevance(page, p) }))
        .sort((a, b) => b.relevance - a.relevance)[0]
      
      if (bestPage && bestPage.relevance > 0.3) {
        links.push({
          text: `${relatedCountry.name} visa guide`,
          url: `/${bestPage.page.slug}`,
          contextRelevance: bestPage.relevance * 0.8 // Slightly lower relevance for related countries
        })
      }
    }
    
    return links
  }

  /**
   * Update internal links for all pages after content generation
   */
  async updateAllInternalLinks(newPages: GeneratedPage[]): Promise<void> {
    console.log('Updating internal links for all pages...')
    
    const allPages = await this.getAllPages()
    const updatedPages: GeneratedPage[] = []
    
    // Update links for new pages
    for (const page of newPages) {
      const links = await this.generateInternalLinks(page, allPages)
      page.internalLinks = links
      updatedPages.push(page)
      
      // Save to database
      await this.saveInternalLinks(page.id, links)
    }
    
    // Update existing pages that might now link to new content
    const existingPages = allPages.filter(p => !newPages.some(np => np.id === p.id))
    
    for (const existingPage of existingPages) {
      // Check if this page should link to any of the new pages
      const additionalLinks = await this.generateInternalLinks(existingPage, [...allPages, ...newPages])
      const newLinks = additionalLinks.filter(link => 
        newPages.some(np => `/${np.slug}` === link.url)
      )
      
      if (newLinks.length > 0) {
        existingPage.internalLinks = [...(existingPage.internalLinks || []), ...newLinks]
        await this.saveInternalLinks(existingPage.id, existingPage.internalLinks)
      }
    }
    
    console.log(`Updated internal links for ${updatedPages.length} new pages and ${existingPages.length} existing pages`)
  }

  /**
   * Save internal links to database
   */
  private async saveInternalLinks(pageId: string, links: InternalLink[]): Promise<void> {
    try {
      // First, delete existing links
      await this.supabase
        .from('internal_links')
        .delete()
        .eq('from_page_id', pageId)

      // Insert new links
      if (links.length > 0) {
        const linkData = links.map((link, index) => ({
          from_page_id: pageId,
          to_page_id: this.extractPageIdFromUrl(link.url), // This would need implementation
          anchor_text: link.text,
          context_relevance: link.contextRelevance,
          position_in_content: index
        }))

        const { error } = await this.supabase
          .from('internal_links')
          .insert(linkData)

        if (error) {
          console.error(`Failed to save internal links for page ${pageId}:`, error)
        }
      }
    } catch (error) {
      console.error(`Error saving internal links for page ${pageId}:`, error)
    }
  }

  /**
   * Get all published pages from database
   */
  private async getAllPages(): Promise<GeneratedPage[]> {
    try {
      const { data, error } = await this.supabase
        .from('generated_pages')
        .select('*')
        .eq('status', 'published')

      if (error) {
        console.error('Error fetching pages:', error)
        return []
      }

      return data.map(page => ({
        id: page.id,
        templateId: page.template_id,
        slug: page.slug,
        title: page.title,
        content: page.content,
        metaDescription: page.meta_description,
        variables: page.variables,
        internalLinks: page.internal_links || [],
        schemaMarkup: page.schema_markup,
        seoScore: page.seo_score,
        status: page.status,
        createdAt: page.created_at,
        updatedAt: page.updated_at
      }))
    } catch (error) {
      console.error('Error fetching pages:', error)
      return []
    }
  }

  // Helper methods for relevance calculation

  private calculateContentRelevance(page1: GeneratedPage, page2: GeneratedPage): number {
    let relevance = 0
    
    // Template similarity
    if (page1.templateId === page2.templateId) {
      relevance += 0.2
    }
    
    // Country similarity
    const country1 = this.extractCountryFromPage(page1)
    const country2 = this.extractCountryFromPage(page2)
    
    if (country1 && country2) {
      if (country1.code === country2.code) {
        relevance += 0.6 // Same country, high relevance
      } else if (this.areCountriesRelated(country1, country2)) {
        relevance += 0.3 // Related countries
      }
    }
    
    // Content keyword overlap
    const keywords1 = this.extractKeywords(page1)
    const keywords2 = this.extractKeywords(page2)
    const overlap = this.calculateKeywordOverlap(keywords1, keywords2)
    relevance += overlap * 0.4
    
    // Title similarity
    const titleSimilarity = this.calculateTitleSimilarity(page1.title, page2.title)
    relevance += titleSimilarity * 0.2
    
    return Math.min(relevance, 1.0)
  }

  private calculateSemanticRelevance(page1: GeneratedPage, page2: GeneratedPage, country1?: Country, country2?: Country): number {
    let relevance = 0
    
    // Cross-template relevance (e.g., country guide + nomad guide for same country)
    if (page1.templateId !== page2.templateId && country1 && country2 && country1.code === country2.code) {
      relevance += 0.7
    }
    
    // Visa-related content linking
    if ((page1.templateId === 'country-to-schengen' && page2.templateId === 'visa-comparison') ||
        (page1.templateId === 'visa-comparison' && page2.templateId === 'country-to-schengen')) {
      relevance += 0.4
    }
    
    // FAQ pages link to specific country guides
    if ((page1.templateId === 'faq-page' && page2.templateId === 'country-to-schengen') ||
        (page1.templateId === 'country-to-schengen' && page2.templateId === 'faq-page')) {
      relevance += 0.3
    }
    
    return Math.min(relevance, 1.0)
  }

  private calculateCategoryRelevance(page1: GeneratedPage, page2: GeneratedPage): number {
    // For pages in the same category, rank by popularity and freshness
    let relevance = 0.5 // Base relevance for same category
    
    // Boost popular countries
    const country2 = this.extractCountryFromPage(page2)
    if (country2?.popular) {
      relevance += 0.2
    }
    
    // Boost recent content
    const daysSinceCreated = (Date.now() - new Date(page2.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceCreated < 30) {
      relevance += 0.1
    }
    
    return Math.min(relevance, 1.0)
  }

  private generateAnchorText(targetPage: GeneratedPage, pageVariables: any): string {
    const targetCountry = this.extractCountryFromPage(targetPage)
    
    switch (targetPage.templateId) {
      case 'country-to-schengen':
        return targetCountry ? `${targetCountry.name} to Schengen visa guide` : 'Visa requirements guide'
      
      case 'digital-nomad-guide':
        return targetCountry ? `Digital nomad guide for ${targetCountry.name}` : 'Digital nomad guide'
      
      case 'visa-comparison':
        const vars = targetPage.variables
        if (vars.country1 && vars.country2) {
          return `${vars.country1} vs ${vars.country2} visa comparison`
        }
        return 'Visa comparison guide'
      
      case 'faq-page':
        return targetPage.variables.topic || 'Frequently asked questions'
      
      default:
        return targetPage.title
    }
  }

  private generateSemanticAnchorText(sourcePage: GeneratedPage, targetPage: GeneratedPage, sourceCountry?: Country, targetCountry?: Country): string {
    if (sourcePage.templateId === 'country-to-schengen' && targetPage.templateId === 'digital-nomad-guide' && sourceCountry && targetCountry && sourceCountry.code === targetCountry.code) {
      return `working remotely in ${targetCountry.name}`
    }
    
    if (sourcePage.templateId === 'digital-nomad-guide' && targetPage.templateId === 'country-to-schengen' && sourceCountry && targetCountry && sourceCountry.code === targetCountry.code) {
      return `visa requirements for ${targetCountry.name}`
    }
    
    return this.generateAnchorText(targetPage, sourcePage.variables)
  }

  private generateCategoryAnchorText(targetPage: GeneratedPage): string {
    const country = this.extractCountryFromPage(targetPage)
    return country ? `${country.name} guide` : targetPage.title
  }

  private extractCountryFromPage(page: GeneratedPage): Country | undefined {
    const variables = page.variables
    
    // Try different variable names
    const countryName = variables.fromCountry || variables.countryName || variables.country1
    if (!countryName) return undefined
    
    return countries.find(c => 
      c.name === countryName || 
      c.alternativeNames?.includes(countryName)
    )
  }

  private pageContainsCountry(page: GeneratedPage, countryCode: string): boolean {
    const country = countries.find(c => c.code === countryCode)
    if (!country) return false
    
    const variables = page.variables
    const countryNames = [
      variables.fromCountry,
      variables.countryName,
      variables.country1,
      variables.country2
    ].filter(Boolean)
    
    return countryNames.some(name => 
      name === country.name || 
      country.alternativeNames?.includes(name)
    )
  }

  private getRelatedCountries(country: Country): Country[] {
    // Simple geographic/cultural relationships
    const relationships: Record<string, string[]> = {
      'US': ['CA', 'MX'],
      'CA': ['US'],
      'GB': ['IE'],
      'IE': ['GB'],
      'FR': ['ES', 'IT', 'DE'],
      'DE': ['FR', 'AT', 'NL'],
      'ES': ['PT', 'FR'],
      'PT': ['ES'],
      'IT': ['FR', 'ES'],
      'IN': ['CN', 'TH', 'SG'],
      'CN': ['IN', 'JP', 'KR'],
      'BR': ['AR', 'CL', 'MX'],
      'AU': ['NZ'],
      'NZ': ['AU']
    }
    
    const relatedCodes = relationships[country.code] || []
    return countries.filter(c => relatedCodes.includes(c.code))
  }

  private areCountriesRelated(country1: Country, country2: Country): boolean {
    const related = this.getRelatedCountries(country1)
    return related.some(c => c.code === country2.code)
  }

  private extractKeywords(page: GeneratedPage): string[] {
    const keywords: string[] = []
    const content = page.content.toLowerCase()
    
    // Extract common visa-related terms
    const visaTerms = ['visa', 'schengen', 'travel', 'passport', 'requirements', 'application', 'nomad', 'remote work']
    keywords.push(...visaTerms.filter(term => content.includes(term)))
    
    // Extract country names
    const country = this.extractCountryFromPage(page)
    if (country) {
      keywords.push(country.name.toLowerCase())
      if (country.alternativeNames) {
        keywords.push(...country.alternativeNames.map(name => name.toLowerCase()))
      }
    }
    
    return [...new Set(keywords)] // Remove duplicates
  }

  private calculateKeywordOverlap(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0
    
    const set1 = new Set(keywords1)
    const set2 = new Set(keywords2)
    const intersection = new Set([...set1].filter(x => set2.has(x)))
    
    return intersection.size / Math.max(set1.size, set2.size)
  }

  private calculateTitleSimilarity(title1: string, title2: string): number {
    const words1 = title1.toLowerCase().split(/\s+/)
    const words2 = title2.toLowerCase().split(/\s+/)
    
    const commonWords = words1.filter(word => 
      words2.includes(word) && 
      word.length > 3 // Ignore short words
    )
    
    return commonWords.length / Math.max(words1.length, words2.length)
  }

  private deduplicateLinks(links: InternalLink[]): InternalLink[] {
    const seen = new Set<string>()
    const unique: InternalLink[] = []
    
    for (const link of links) {
      const key = `${link.url}-${link.text}`
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(link)
      }
    }
    
    return unique
  }

  private extractPageIdFromUrl(url: string): string | null {
    // This would need to be implemented based on your URL structure
    // For now, return null as we'd need to look up the page by slug
    return null
  }
}