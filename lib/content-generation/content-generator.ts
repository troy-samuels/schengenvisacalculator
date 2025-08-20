import { countries, Country } from '../data/countries'
import { TemplateEngine, TemplateHelpers, ContentTemplateFactory } from './template-engine'
import { getVisaRequirement, getDigitalNomadInfo, getFAQs, getPopularDestinations } from './visa-data'
import { GeneratedPage, ContentType, ContentGenerationJob, InternalLink, SitemapEntry } from './types'
import { createClient } from '../supabase/client'

export class ContentGeneratorService {
  private templateEngine: TemplateEngine
  private supabase = createClient()

  constructor() {
    this.templateEngine = new TemplateEngine()
    this.initializeTemplates()
  }

  private initializeTemplates() {
    // Register built-in templates
    const countryTemplate = ContentTemplateFactory.createCountryToSchengenTemplate()
    const nomadTemplate = ContentTemplateFactory.createDigitalNomadTemplate()
    
    this.templateEngine.registerTemplate(countryTemplate)
    this.templateEngine.registerTemplate(nomadTemplate)
  }

  /**
   * Generate all country-to-Schengen visa pages
   */
  async generateCountryToSchengenPages(): Promise<GeneratedPage[]> {
    const pages: GeneratedPage[] = []
    const nonSchengenCountries = countries.filter(c => !c.schengenStatus.includes('schengen'))

    console.log(`Generating ${nonSchengenCountries.length} country-to-Schengen pages...`)

    for (const country of nonSchengenCountries) {
      try {
        const page = await this.generateCountryToSchengenPage(country)
        pages.push(page)
        
        // Add a small delay to avoid overwhelming the system
        await this.delay(100)
      } catch (error) {
        console.error(`Failed to generate page for ${country.name}:`, error)
      }
    }

    return pages
  }

  /**
   * Generate a single country-to-Schengen page
   */
  async generateCountryToSchengenPage(country: Country): Promise<GeneratedPage> {
    const visaReq = getVisaRequirement(country.code)
    const faqs = getFAQs(country.code)
    const destinations = getPopularDestinations(country.code)
    const digitalNomadInfo = getDigitalNomadInfo(country.code)

    const variables = {
      fromCountry: country.name,
      fromCountrySlug: TemplateHelpers.slugify(country.name),
      flag: country.flag,
      visaRequired: visaReq?.visaRequired ?? true,
      maxStayDays: visaReq?.maxStayDays ?? 90,
      processingTime: visaReq?.processingTime ?? 'Contact consulate',
      cost: visaReq?.cost ?? 'Varies',
      requirements: visaReq?.requirements ?? ['Contact embassy for requirements'],
      popularDestinations: destinations,
      faqs: faqs,
      digitalNomadInfo: digitalNomadInfo,
      bestTravelTime: this.getBestTravelTime(country.code),
      lastUpdated: TemplateHelpers.formatDate(new Date())
    }

    const content = this.templateEngine.render('country-to-schengen', variables)
    const seo = this.templateEngine.generateSEO('country-to-schengen', variables)
    const slug = `${TemplateHelpers.slugify(country.name)}-to-schengen-visa-requirements`

    // Generate internal links
    const internalLinks = this.generateInternalLinks(content, 'country-to-schengen', country)

    const page: GeneratedPage = {
      id: `${country.code}-schengen-${Date.now()}`,
      templateId: 'country-to-schengen',
      slug: slug,
      title: seo.title,
      content: content,
      metaDescription: seo.description,
      variables: variables,
      internalLinks: internalLinks,
      schemaMarkup: this.generateSchemaMarkup('TravelAction', variables),
      seoScore: this.calculateSEOScore(seo.title, seo.description, content),
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return page
  }

  /**
   * Generate digital nomad guide pages
   */
  async generateDigitalNomadPages(): Promise<GeneratedPage[]> {
    const pages: GeneratedPage[] = []
    const nomadFriendlyCountries = countries.filter(c => 
      getDigitalNomadInfo(c.code) || c.popular
    )

    console.log(`Generating ${nomadFriendlyCountries.length} digital nomad guide pages...`)

    for (const country of nomadFriendlyCountries) {
      try {
        const page = await this.generateDigitalNomadPage(country)
        pages.push(page)
        await this.delay(100)
      } catch (error) {
        console.error(`Failed to generate nomad page for ${country.name}:`, error)
      }
    }

    return pages
  }

  /**
   * Generate a digital nomad guide page
   */
  async generateDigitalNomadPage(country: Country): Promise<GeneratedPage> {
    const nomadInfo = getDigitalNomadInfo(country.code)
    const mockNomadData = this.generateMockNomadData(country)

    const variables = {
      countryName: country.name,
      flag: country.flag,
      costOfLiving: nomadInfo?.costOfLiving || mockNomadData.costOfLiving,
      hasDigitalNomadVisa: !!nomadInfo,
      digitalNomadVisas: nomadInfo?.availableVisas || [],
      internetSpeed: nomadInfo?.internetSpeed || mockNomadData.internetSpeed,
      timeZoneOffset: this.formatTimeZone(nomadInfo?.timeZoneOffset || 0),
      bestCities: mockNomadData.bestCities,
      avgDownloadSpeed: mockNomadData.avgDownloadSpeed,
      avgUploadSpeed: mockNomadData.avgUploadSpeed,
      mobileCoverage: mockNomadData.mobileCoverage,
      internetMonthlyCost: mockNomadData.internetMonthlyCost,
      internetProviders: mockNomadData.internetProviders,
      coworkingSpaces: mockNomadData.coworkingSpaces,
      nomadCommunities: mockNomadData.nomadCommunities,
      healthcareSystem: mockNomadData.healthcareSystem,
      publicHealthcare: mockNomadData.publicHealthcare,
      pharmacyAccess: mockNomadData.pharmacyAccess,
      emergencyNumber: mockNomadData.emergencyNumber,
      insuranceRecommendation: mockNomadData.insuranceRecommendation,
      taxOverview: mockNomadData.taxOverview,
      taxImplications: nomadInfo?.taxImplications || mockNomadData.taxImplications,
      taxRecommendation: mockNomadData.taxRecommendation,
      beforeArrival: mockNomadData.beforeArrival,
      firstWeek: mockNomadData.firstWeek,
      longTerm: mockNomadData.longTerm,
      essentialApps: mockNomadData.essentialApps,
      pros: mockNomadData.pros,
      cons: mockNomadData.cons,
      resources: mockNomadData.resources,
      lastUpdated: TemplateHelpers.formatDate(new Date()),
      nextReview: TemplateHelpers.formatDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
    }

    const content = this.templateEngine.render('digital-nomad-guide', variables)
    const seo = this.templateEngine.generateSEO('digital-nomad-guide', variables)
    const slug = `digital-nomad-guide-${TemplateHelpers.slugify(country.name)}`

    const page: GeneratedPage = {
      id: `${country.code}-nomad-${Date.now()}`,
      templateId: 'digital-nomad-guide',
      slug: slug,
      title: seo.title,
      content: content,
      metaDescription: seo.description,
      variables: variables,
      internalLinks: this.generateInternalLinks(content, 'digital-nomad-guide', country),
      schemaMarkup: this.generateSchemaMarkup('TravelAction', variables),
      seoScore: this.calculateSEOScore(seo.title, seo.description, content),
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return page
  }

  /**
   * Generate visa comparison pages
   */
  async generateVisaComparisonPages(): Promise<GeneratedPage[]> {
    const pages: GeneratedPage[] = []
    const popularCountries = countries.filter(c => c.popular && !c.schengenStatus.includes('schengen'))
    
    // Generate pairwise comparisons
    for (let i = 0; i < popularCountries.length; i++) {
      for (let j = i + 1; j < popularCountries.length; j++) {
        const country1 = popularCountries[i]
        const country2 = popularCountries[j]
        
        try {
          const page = await this.generateVisaComparisonPage(country1, country2)
          pages.push(page)
          await this.delay(50)
        } catch (error) {
          console.error(`Failed to generate comparison for ${country1.name} vs ${country2.name}:`, error)
        }
      }
    }

    return pages
  }

  /**
   * Generate FAQ pages
   */
  async generateFAQPages(): Promise<GeneratedPage[]> {
    const pages: GeneratedPage[] = []
    const faqTopics = [
      'schengen-visa-general',
      'digital-nomad-visas',
      'visa-free-travel',
      'visa-application-process',
      'travel-insurance-requirements'
    ]

    for (const topic of faqTopics) {
      try {
        const page = await this.generateFAQPage(topic)
        pages.push(page)
      } catch (error) {
        console.error(`Failed to generate FAQ page for ${topic}:`, error)
      }
    }

    return pages
  }

  /**
   * Generate all content in bulk
   */
  async generateAllContent(): Promise<{
    countryPages: GeneratedPage[]
    nomadPages: GeneratedPage[]
    comparisonPages: GeneratedPage[]
    faqPages: GeneratedPage[]
    total: number
  }> {
    console.log('Starting bulk content generation...')

    const [countryPages, nomadPages, comparisonPages, faqPages] = await Promise.all([
      this.generateCountryToSchengenPages(),
      this.generateDigitalNomadPages(),
      this.generateVisaComparisonPages(),
      this.generateFAQPages()
    ])

    const allPages = [...countryPages, ...nomadPages, ...comparisonPages, ...faqPages]

    console.log(`Generated ${allPages.length} pages total:`)
    console.log(`- Country-to-Schengen: ${countryPages.length}`)
    console.log(`- Digital Nomad: ${nomadPages.length}`)
    console.log(`- Visa Comparisons: ${comparisonPages.length}`)
    console.log(`- FAQ Pages: ${faqPages.length}`)

    return {
      countryPages,
      nomadPages,
      comparisonPages,
      faqPages,
      total: allPages.length
    }
  }

  /**
   * Save generated pages to database
   */
  async savePages(pages: GeneratedPage[]): Promise<void> {
    console.log(`Saving ${pages.length} pages to database...`)

    for (const page of pages) {
      try {
        const { error } = await this.supabase
          .from('generated_pages')
          .upsert({
            id: page.id,
            template_id: page.templateId,
            slug: page.slug,
            title: page.title,
            content: page.content,
            meta_description: page.metaDescription,
            variables: page.variables,
            internal_links: page.internalLinks,
            schema_markup: page.schemaMarkup,
            seo_score: page.seoScore,
            status: page.status,
            created_at: page.createdAt,
            updated_at: page.updatedAt
          })

        if (error) {
          console.error(`Failed to save page ${page.slug}:`, error)
        }
      } catch (error) {
        console.error(`Error saving page ${page.slug}:`, error)
      }
    }

    console.log('Finished saving pages to database')
  }

  /**
   * Generate sitemap entries for pages
   */
  generateSitemap(pages: GeneratedPage[]): SitemapEntry[] {
    return pages.map(page => ({
      url: `/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: this.getChangeFrequency(page.templateId),
      priority: this.getSitemapPriority(page.templateId)
    }))
  }

  // Private helper methods

  private async generateVisaComparisonPage(country1: Country, country2: Country): Promise<GeneratedPage> {
    const visa1 = getVisaRequirement(country1.code)
    const visa2 = getVisaRequirement(country2.code)

    const variables = {
      country1: country1.name,
      country2: country2.name,
      flag1: country1.flag,
      flag2: country2.flag,
      visa1Required: visa1?.visaRequired ?? true,
      visa2Required: visa2?.visaRequired ?? true,
      cost1: visa1?.cost ?? 0,
      cost2: visa2?.cost ?? 0,
      processing1: visa1?.processingTime ?? 'N/A',
      processing2: visa2?.processingTime ?? 'N/A',
      lastUpdated: TemplateHelpers.formatDate(new Date())
    }

    // Create comparison template on the fly
    const template = `# ${country1.name} vs ${country2.name}: Schengen Visa Comparison

Compare visa requirements for ${country1.name} and ${country2.name} citizens traveling to the Schengen Area.

## Quick Comparison

| Aspect | ${country1.name} ${country1.flag} | ${country2.name} ${country2.flag} |
|--------|------------|------------|
| Visa Required | {{#if visa1Required}}Yes{{else}}No{{/if}} | {{#if visa2Required}}Yes{{else}}No{{/if}} |
| Cost | €{{cost1}} | €{{cost2}} |
| Processing Time | {{processing1}} | {{processing2}} |

*Last updated: {{lastUpdated}}*`

    const content = this.templateEngine.processTemplate(template, variables)
    const slug = `${TemplateHelpers.slugify(country1.name)}-vs-${TemplateHelpers.slugify(country2.name)}-schengen-visa`

    return {
      id: `comparison-${country1.code}-${country2.code}-${Date.now()}`,
      templateId: 'visa-comparison',
      slug: slug,
      title: `${country1.name} vs ${country2.name}: Schengen Visa Requirements Comparison`,
      content: content,
      metaDescription: `Compare Schengen visa requirements for ${country1.name} and ${country2.name} citizens. Costs, processing times, and requirements.`,
      variables: variables,
      internalLinks: [],
      seoScore: 75,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  private async generateFAQPage(topic: string): Promise<GeneratedPage> {
    const faqData = this.getFAQDataByTopic(topic)
    
    const variables = {
      topic: faqData.title,
      description: faqData.description,
      faqs: faqData.questions,
      lastUpdated: TemplateHelpers.formatDate(new Date())
    }

    const template = `# {{topic}}

{{description}}

{{#each faqs}}
## {{question}}

{{answer}}

{{/each}}

*Last updated: {{lastUpdated}}*`

    const content = this.templateEngine.processTemplate(template, variables)
    const slug = `faq-${TemplateHelpers.slugify(topic)}`

    return {
      id: `faq-${topic}-${Date.now()}`,
      templateId: 'faq-page',
      slug: slug,
      title: `${faqData.title} - Frequently Asked Questions`,
      content: content,
      metaDescription: faqData.description,
      variables: variables,
      internalLinks: [],
      schemaMarkup: this.generateFAQSchemaMarkup(faqData.questions),
      seoScore: 80,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  private generateInternalLinks(content: string, type: ContentType, country: Country): InternalLink[] {
    const links: InternalLink[] = []

    // Add relevant internal links based on content type and country
    if (type === 'country-to-schengen') {
      links.push(
        {
          text: 'Schengen Calculator',
          url: '/',
          contextRelevance: 0.9
        },
        {
          text: `Digital Nomad Guide: ${country.name}`,
          url: `/digital-nomad-guide-${TemplateHelpers.slugify(country.name)}`,
          contextRelevance: 0.7
        }
      )
    }

    return links
  }

  private generateSchemaMarkup(type: string, variables: any): any {
    if (type === 'TravelAction') {
      return {
        '@context': 'https://schema.org',
        '@type': 'TravelAction',
        'name': variables.fromCountry ? `${variables.fromCountry} to Schengen Travel` : `${variables.countryName} Travel Guide`,
        'description': `Travel information and visa requirements`
      }
    }

    return null
  }

  private generateFAQSchemaMarkup(faqs: Array<{question: string, answer: string}>): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    }
  }

  private calculateSEOScore(title: string, description: string, content: string): number {
    let score = 50 // Base score

    // Title length check
    if (title.length >= 30 && title.length <= 60) score += 15
    else if (title.length <= 80) score += 10

    // Description length check
    if (description.length >= 120 && description.length <= 160) score += 15
    else if (description.length <= 180) score += 10

    // Content length check
    if (content.length >= 1000) score += 10
    if (content.length >= 2000) score += 10

    // Header structure check
    const headerCount = (content.match(/^#+\s/gm) || []).length
    if (headerCount >= 3) score += 10

    return Math.min(score, 100)
  }

  private getBestTravelTime(countryCode: string): string {
    // Simple mapping - in production, this would be more sophisticated
    const timeMap: Record<string, string> = {
      'US': 'Spring (April-June) and Fall (September-November)',
      'IN': 'October to March (avoiding monsoon season)',
      'CN': 'Spring (April-May) and Autumn (September-October)',
      'BR': 'April-September (dry season)',
      'AU': 'March-May and September-November',
      'default': 'April-June and September-October'
    }

    return timeMap[countryCode] || timeMap['default']
  }

  private formatTimeZone(offset: number): string {
    if (offset === 0) return '+0'
    return offset > 0 ? `+${offset}` : `${offset}`
  }

  private generateMockNomadData(country: Country): any {
    // Generate realistic mock data for digital nomad information
    return {
      costOfLiving: country.schengenStatus.includes('schengen') ? 'medium' : 'low',
      internetSpeed: '50+ Mbps',
      avgDownloadSpeed: 75,
      avgUploadSpeed: 25,
      mobileCoverage: 'Excellent',
      internetMonthlyCost: 30,
      internetProviders: [
        { name: 'Local ISP', description: 'Reliable fiber connection', monthlyPrice: 25 },
        { name: 'Mobile Data', description: 'Unlimited mobile internet', monthlyPrice: 35 }
      ],
      bestCities: [
        {
          name: `Capital City`,
          description: `The vibrant capital offers excellent infrastructure for remote workers.`,
          internetSpeed: 100,
          monthlyCost: 1200,
          communitySize: 'Large (500+)',
          coworkingSpaces: 15,
          safetyRating: 8.5,
          bestFor: 'First-time visitors, networking'
        }
      ],
      coworkingSpaces: [
        {
          name: 'Central Coworking',
          description: 'Modern space in the city center',
          location: 'Downtown',
          dayPass: 15,
          monthlyPrice: 200,
          internetSpeed: '100+ Mbps',
          amenities: 'Coffee, printing, meeting rooms'
        }
      ],
      nomadCommunities: [
        { name: 'Digital Nomads Community', description: 'Active WhatsApp and Telegram groups', link: '#' }
      ],
      healthcareSystem: `${country.name} has a ${country.schengenStatus.includes('schengen') ? 'well-developed' : 'developing'} healthcare system.`,
      publicHealthcare: 'Available but travel insurance recommended',
      pharmacyAccess: 'Widely available in urban areas',
      emergencyNumber: '112',
      insuranceRecommendation: 'Comprehensive travel insurance strongly recommended',
      taxOverview: `Tax obligations depend on residency status and income source.`,
      taxImplications: ['Consult local tax advisor', 'Consider tax treaty benefits'],
      taxRecommendation: 'Seek professional tax advice before establishing tax residency',
      beforeArrival: [
        'Research visa requirements',
        'Get travel insurance',
        'Set up banking if staying long-term',
        'Learn basic local phrases'
      ],
      firstWeek: [
        'Register with local authorities (if required)',
        'Get local SIM card',
        'Find accommodation',
        'Join nomad communities'
      ],
      longTerm: [
        'Consider tax implications',
        'Build local network',
        'Explore other cities',
        'Learn the language'
      ],
      essentialApps: [
        { name: 'Maps App', description: 'Local navigation and transit' },
        { name: 'Banking App', description: 'Local banking services' },
        { name: 'Food Delivery', description: 'Local food delivery service' }
      ],
      pros: [
        'Good value for money',
        'Friendly locals',
        'Reliable internet',
        'Growing nomad community'
      ],
      cons: [
        'Language barrier',
        'Weather variations',
        'Limited international food options'
      ],
      resources: [
        { name: 'Official Tourism Website', url: '#', description: 'Official travel information' },
        { name: 'Nomad Community Forum', url: '#', description: 'Connect with other nomads' }
      ]
    }
  }

  private getFAQDataByTopic(topic: string): {title: string, description: string, questions: Array<{question: string, answer: string}>} {
    const faqTopics: Record<string, any> = {
      'schengen-visa-general': {
        title: 'Schengen Visa FAQ',
        description: 'Common questions about Schengen Area travel and visa requirements',
        questions: [
          {
            question: 'What is the Schengen Area?',
            answer: 'The Schengen Area is a zone of 27 European countries that have abolished passport and other border controls at their mutual borders.'
          },
          {
            question: 'How long can I stay in the Schengen Area?',
            answer: 'Visitors can stay up to 90 days within any 180-day period for tourism, business, or transit purposes.'
          },
          {
            question: 'Do I need travel insurance for Schengen?',
            answer: 'Travel insurance covering at least €30,000 for medical expenses is required for visa applications and highly recommended for visa-free travelers.'
          }
        ]
      },
      'digital-nomad-visas': {
        title: 'Digital Nomad Visas FAQ',
        description: 'Everything you need to know about digital nomad visas in Europe',
        questions: [
          {
            question: 'Which European countries offer digital nomad visas?',
            answer: 'Portugal, Spain, Estonia, Croatia, Germany, and several other EU countries now offer digital nomad visas with varying requirements.'
          },
          {
            question: 'What income do I need for a digital nomad visa?',
            answer: 'Income requirements vary by country, typically ranging from €2,000 to €3,500 per month depending on the destination.'
          }
        ]
      }
    }

    return faqTopics[topic] || {
      title: 'FAQ',
      description: 'Frequently asked questions',
      questions: []
    }
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

  private getSitemapPriority(templateId: string): number {
    const priorityMap: Record<string, number> = {
      'country-to-schengen': 0.8,
      'digital-nomad-guide': 0.7,
      'visa-comparison': 0.6,
      'faq-page': 0.5
    }

    return priorityMap[templateId] || 0.5
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private processTemplate(template: string, variables: Record<string, any>): string {
    return this.templateEngine.render('temp', { ...{ template }, ...variables })
  }
}