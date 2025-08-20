import { GeneratedPage, ContentType } from './types'

/**
 * Schema markup generator for different content types
 */
export class SchemaMarkupGenerator {
  
  /**
   * Generate comprehensive schema markup for a page
   */
  static generateSchemaMarkup(page: GeneratedPage, baseUrl: string = 'https://schengenvisacalculator.com'): any {
    const schemas: any[] = []
    
    // Base WebPage schema
    schemas.push(this.generateWebPageSchema(page, baseUrl))
    
    // Content-type specific schemas
    switch (page.templateId) {
      case 'country-to-schengen':
        schemas.push(this.generateTravelActionSchema(page, baseUrl))
        schemas.push(this.generateGovernmentServiceSchema(page, baseUrl))
        break
        
      case 'digital-nomad-guide':
        schemas.push(this.generateTravelActionSchema(page, baseUrl))
        schemas.push(this.generateHowToSchema(page, baseUrl))
        break
        
      case 'visa-comparison':
        schemas.push(this.generateComparisonSchema(page, baseUrl))
        break
        
      case 'faq-page':
        schemas.push(this.generateFAQPageSchema(page, baseUrl))
        break
    }
    
    // Article schema for content-rich pages
    if (this.hasRichContent(page)) {
      schemas.push(this.generateArticleSchema(page, baseUrl))
    }
    
    // Breadcrumb schema
    schemas.push(this.generateBreadcrumbSchema(page, baseUrl))
    
    return {
      '@context': 'https://schema.org',
      '@graph': schemas
    }
  }

  /**
   * Generate WebPage schema
   */
  private static generateWebPageSchema(page: GeneratedPage, baseUrl: string): any {
    return {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${page.slug}#webpage`,
      'url': `${baseUrl}/${page.slug}`,
      'name': page.title,
      'description': page.metaDescription,
      'datePublished': page.createdAt,
      'dateModified': page.updatedAt,
      'inLanguage': 'en-US',
      'potentialAction': {
        '@type': 'ReadAction',
        'target': `${baseUrl}/${page.slug}`
      },
      'mainEntity': {
        '@id': `${baseUrl}/${page.slug}#main-content`
      }
    }
  }

  /**
   * Generate TravelAction schema for visa-related content
   */
  private static generateTravelActionSchema(page: GeneratedPage, baseUrl: string): any {
    const variables = page.variables
    
    const schema: any = {
      '@type': 'TravelAction',
      '@id': `${baseUrl}/${page.slug}#travel-action`,
      'name': `Travel from ${variables.fromCountry || variables.countryName} to Schengen Area`,
      'description': page.metaDescription,
      'agent': {
        '@type': 'Organization',
        'name': 'Schengen Visa Calculator',
        'url': baseUrl
      }
    }

    // Add specific travel details if available
    if (variables.fromCountry) {
      schema.fromLocation = {
        '@type': 'Country',
        'name': variables.fromCountry
      }
      
      schema.toLocation = {
        '@type': 'Place',
        'name': 'Schengen Area',
        'description': 'European Schengen Area countries'
      }
    }

    if (variables.visaRequired !== undefined) {
      schema.result = {
        '@type': 'GovernmentService',
        'name': variables.visaRequired ? 'Schengen Visa Required' : 'Visa-free Travel',
        'description': variables.visaRequired 
          ? `Visa required for ${variables.fromCountry} citizens` 
          : `Visa-free travel for ${variables.fromCountry} citizens`
      }
    }

    return schema
  }

  /**
   * Generate GovernmentService schema for visa information
   */
  private static generateGovernmentServiceSchema(page: GeneratedPage, baseUrl: string): any {
    const variables = page.variables
    
    const schema: any = {
      '@type': 'GovernmentService',
      '@id': `${baseUrl}/${page.slug}#government-service`,
      'name': 'Schengen Visa Information',
      'description': 'Official visa requirements and application information',
      'serviceType': 'Visa Information Service',
      'provider': {
        '@type': 'GovernmentOrganization',
        'name': 'European Union',
        'description': 'Schengen Area member states'
      }
    }

    // Add service details if available
    if (variables.cost && variables.visaRequired) {
      schema.offers = {
        '@type': 'Offer',
        'name': 'Schengen Visa',
        'price': variables.cost,
        'priceCurrency': 'EUR',
        'description': `Schengen visa for ${variables.fromCountry} citizens`
      }
    }

    if (variables.processingTime) {
      schema.hoursAvailable = variables.processingTime
    }

    return schema
  }

  /**
   * Generate HowTo schema for digital nomad guides
   */
  private static generateHowToSchema(page: GeneratedPage, baseUrl: string): any {
    const variables = page.variables
    
    return {
      '@type': 'HowTo',
      '@id': `${baseUrl}/${page.slug}#howto`,
      'name': `How to become a digital nomad in ${variables.countryName}`,
      'description': `Step-by-step guide to becoming a digital nomad in ${variables.countryName}`,
      'totalTime': 'PT1M',
      'estimatedCost': {
        '@type': 'MonetaryAmount',
        'currency': 'EUR',
        'value': variables.totalMonthlyCost || 1000
      },
      'supply': [
        {
          '@type': 'HowToSupply',
          'name': 'Valid Passport'
        },
        {
          '@type': 'HowToSupply',
          'name': 'Proof of Income'
        },
        {
          '@type': 'HowToSupply',
          'name': 'Travel Insurance'
        }
      ],
      'step': this.generateNomadSteps(variables)
    }
  }

  /**
   * Generate comparison schema
   */
  private static generateComparisonSchema(page: GeneratedPage, baseUrl: string): any {
    const variables = page.variables
    
    return {
      '@type': 'Product',
      '@id': `${baseUrl}/${page.slug}#comparison`,
      'name': `${variables.country1} vs ${variables.country2} Visa Comparison`,
      'description': page.metaDescription,
      'category': 'Travel Information',
      'offers': [
        {
          '@type': 'Offer',
          'name': `${variables.country1} Visa`,
          'price': variables.cost1 || 0,
          'priceCurrency': 'EUR'
        },
        {
          '@type': 'Offer',
          'name': `${variables.country2} Visa`,
          'price': variables.cost2 || 0,
          'priceCurrency': 'EUR'
        }
      ]
    }
  }

  /**
   * Generate FAQ page schema
   */
  private static generateFAQPageSchema(page: GeneratedPage, baseUrl: string): any {
    const variables = page.variables
    const faqs = variables.faqs || []
    
    return {
      '@type': 'FAQPage',
      '@id': `${baseUrl}/${page.slug}#faqpage`,
      'name': page.title,
      'description': page.metaDescription,
      'mainEntity': faqs.map((faq: any, index: number) => ({
        '@type': 'Question',
        '@id': `${baseUrl}/${page.slug}#faq-${index}`,
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer,
          'dateCreated': page.createdAt,
          'upvoteCount': 0
        }
      }))
    }
  }

  /**
   * Generate Article schema for content-rich pages
   */
  private static generateArticleSchema(page: GeneratedPage, baseUrl: string): any {
    return {
      '@type': 'Article',
      '@id': `${baseUrl}/${page.slug}#article`,
      'headline': page.title,
      'description': page.metaDescription,
      'datePublished': page.createdAt,
      'dateModified': page.updatedAt,
      'author': {
        '@type': 'Organization',
        'name': 'Schengen Visa Calculator',
        'url': baseUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/images/visa-calculator-logo.png`,
          'width': 512,
          'height': 512
        }
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Schengen Visa Calculator',
        'url': baseUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/images/visa-calculator-logo.png`,
          'width': 512,
          'height': 512
        }
      },
      'mainEntityOfPage': `${baseUrl}/${page.slug}`,
      'articleSection': 'Travel Guides',
      'keywords': this.extractKeywords(page),
      'wordCount': this.estimateWordCount(page.content)
    }
  }

  /**
   * Generate Breadcrumb schema
   */
  private static generateBreadcrumbSchema(page: GeneratedPage, baseUrl: string): any {
    const breadcrumbs = this.generateBreadcrumbs(page, baseUrl)
    
    return {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/${page.slug}#breadcrumb`,
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    }
  }

  /**
   * Generate LocalBusiness schema for nomad coworking spaces
   */
  static generateCoworkingSpaceSchema(space: any, baseUrl: string): any {
    return {
      '@type': 'LocalBusiness',
      'name': space.name,
      'description': space.description,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': space.location,
        'addressCountry': space.country
      },
      'priceRange': `€${space.dayPass}-${space.monthlyPrice}`,
      'amenityFeature': space.amenities?.split(', ').map((amenity: string) => ({
        '@type': 'LocationFeatureSpecification',
        'name': amenity
      })),
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Coworking Packages',
        'itemListElement': [
          {
            '@type': 'Offer',
            'name': 'Day Pass',
            'price': space.dayPass,
            'priceCurrency': 'EUR'
          },
          {
            '@type': 'Offer',
            'name': 'Monthly Pass',
            'price': space.monthlyPrice,
            'priceCurrency': 'EUR'
          }
        ]
      }
    }
  }

  /**
   * Generate Trip schema for travel planning
   */
  static generateTripSchema(variables: any, baseUrl: string): any {
    return {
      '@type': 'Trip',
      'name': `Trip from ${variables.fromCountry} to Schengen Area`,
      'description': `Travel planning for ${variables.fromCountry} citizens`,
      'partOfTrip': {
        '@type': 'Flight',
        'departureAirport': {
          '@type': 'Airport',
          'addressCountry': variables.fromCountry
        },
        'arrivalAirport': {
          '@type': 'Airport',
          'addressRegion': 'Schengen Area'
        }
      },
      'offers': variables.visaRequired ? {
        '@type': 'Offer',
        'name': 'Visa Requirement',
        'price': variables.cost || 0,
        'priceCurrency': 'EUR'
      } : undefined
    }
  }

  // Helper methods

  private static generateNomadSteps(variables: any): any[] {
    const steps = []
    
    if (variables.beforeArrival) {
      steps.push({
        '@type': 'HowToStep',
        'name': 'Before Arrival',
        'text': 'Prepare documentation and requirements',
        'itemListElement': variables.beforeArrival.map((item: string, index: number) => ({
          '@type': 'HowToDirection',
          'position': index + 1,
          'text': item
        }))
      })
    }

    if (variables.firstWeek) {
      steps.push({
        '@type': 'HowToStep',
        'name': 'First Week',
        'text': 'Essential tasks upon arrival',
        'itemListElement': variables.firstWeek.map((item: string, index: number) => ({
          '@type': 'HowToDirection',
          'position': index + 1,
          'text': item
        }))
      })
    }

    if (variables.longTerm) {
      steps.push({
        '@type': 'HowToStep',
        'name': 'Long-term Setup',
        'text': 'Establish yourself for extended stay',
        'itemListElement': variables.longTerm.map((item: string, index: number) => ({
          '@type': 'HowToDirection',
          'position': index + 1,
          'text': item
        }))
      })
    }

    return steps
  }

  private static generateBreadcrumbs(page: GeneratedPage, baseUrl: string): Array<{name: string, url: string}> {
    const breadcrumbs = [
      { name: 'Home', url: baseUrl }
    ]

    // Add category-specific breadcrumbs
    switch (page.templateId) {
      case 'country-to-schengen':
        breadcrumbs.push({ name: 'Visa Requirements', url: `${baseUrl}/visa-requirements` })
        break
      case 'digital-nomad-guide':
        breadcrumbs.push({ name: 'Digital Nomad Guides', url: `${baseUrl}/digital-nomad-guides` })
        break
      case 'visa-comparison':
        breadcrumbs.push({ name: 'Visa Comparisons', url: `${baseUrl}/visa-comparisons` })
        break
      case 'faq-page':
        breadcrumbs.push({ name: 'FAQ', url: `${baseUrl}/faq` })
        break
    }

    // Add current page
    breadcrumbs.push({ name: page.title, url: `${baseUrl}/${page.slug}` })

    return breadcrumbs
  }

  private static hasRichContent(page: GeneratedPage): boolean {
    return page.content.length > 1000 && 
           (page.content.includes('##') || page.content.includes('###'))
  }

  private static extractKeywords(page: GeneratedPage): string {
    const variables = page.variables
    const keywords = []

    // Extract from variables
    if (variables.fromCountry) keywords.push(`${variables.fromCountry} visa`)
    if (variables.countryName) keywords.push(`${variables.countryName} digital nomad`)
    
    keywords.push('schengen area', 'travel guide', 'visa requirements')

    return keywords.join(', ')
  }

  private static estimateWordCount(content: string): number {
    return content.split(/\s+/).length
  }
}