import { ContentTemplate, TemplateVariable, GeneratedPage, SEOConfig } from './types'

export class TemplateEngine {
  private templates: Map<string, ContentTemplate> = new Map()

  /**
   * Register a template for use
   */
  registerTemplate(template: ContentTemplate): void {
    this.templates.set(template.id, template)
  }

  /**
   * Render a template with given variables
   */
  render(templateId: string, variables: Record<string, any>): string {
    const template = this.templates.get(templateId)
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`)
    }

    this.validateVariables(template.variables, variables)
    return this.processTemplate(template.template, variables)
  }

  /**
   * Generate SEO metadata from template
   */
  generateSEO(templateId: string, variables: Record<string, any>): {
    title: string
    description: string
    keywords: string[]
    canonical?: string
  } {
    const template = this.templates.get(templateId)
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`)
    }

    const seo = template.seoConfig
    return {
      title: this.processTemplate(seo.titleTemplate, variables),
      description: this.processTemplate(seo.descriptionTemplate, variables),
      keywords: seo.keywords.map(keyword => this.processTemplate(keyword, variables)),
      canonical: seo.canonicalUrlTemplate ? this.processTemplate(seo.canonicalUrlTemplate, variables) : undefined
    }
  }

  /**
   * Process template string with variables (Handlebars-like syntax)
   */
  private processTemplate(template: string, variables: Record<string, any>): string {
    let result = template

    // Handle simple variable substitution {{variable}}
    result = result.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      const value = this.getNestedValue(variables, varName)
      return value !== undefined ? String(value) : match
    })

    // Handle conditional blocks {{#if variable}}...{{else}}...{{/if}}
    result = result.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g, 
      (match, varName, truthyBlock, falsyBlock = '') => {
        const value = this.getNestedValue(variables, varName)
        return this.isTruthy(value) ? truthyBlock : falsyBlock
      })

    // Handle array iteration {{#each array}}...{{/each}}
    result = result.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, 
      (match, varName, block) => {
        const array = this.getNestedValue(variables, varName)
        if (!Array.isArray(array)) return ''
        
        return array.map(item => this.processTemplate(block, { ...variables, this: item, ...item })).join('')
      })

    // Handle object property access {{object.property}}
    result = result.replace(/\{\{(\w+)\.(\w+)\}\}/g, (match, objName, propName) => {
      const obj = this.getNestedValue(variables, objName)
      if (obj && typeof obj === 'object') {
        const value = obj[propName]
        return value !== undefined ? String(value) : match
      }
      return match
    })

    return result.trim()
  }

  /**
   * Get nested value from variables object
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  }

  /**
   * Check if value is truthy for template conditions
   */
  private isTruthy(value: any): boolean {
    if (value === null || value === undefined) return false
    if (typeof value === 'boolean') return value
    if (typeof value === 'number') return value !== 0
    if (typeof value === 'string') return value.length > 0
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return Object.keys(value).length > 0
    return Boolean(value)
  }

  /**
   * Validate required variables are provided
   */
  private validateVariables(templateVars: TemplateVariable[], provided: Record<string, any>): void {
    const errors: string[] = []

    for (const templateVar of templateVars) {
      if (templateVar.required && !(templateVar.name in provided)) {
        errors.push(`Required variable '${templateVar.name}' is missing`)
        continue
      }

      const value = provided[templateVar.name]
      if (value !== undefined) {
        // Type validation
        if (!this.validateType(value, templateVar.type)) {
          errors.push(`Variable '${templateVar.name}' must be of type ${templateVar.type}`)
        }

        // Additional validation
        if (templateVar.validation) {
          const validationErrors = this.validateValue(value, templateVar.validation, templateVar.name)
          errors.push(...validationErrors)
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(`Template validation failed: ${errors.join(', ')}`)
    }
  }

  /**
   * Validate value type
   */
  private validateType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string'
      case 'number':
        return typeof value === 'number'
      case 'boolean':
        return typeof value === 'boolean'
      case 'array':
        return Array.isArray(value)
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value)
      default:
        return true
    }
  }

  /**
   * Validate value against validation rules
   */
  private validateValue(value: any, validation: any, fieldName: string): string[] {
    const errors: string[] = []

    if (typeof value === 'string') {
      if (validation.minLength && value.length < validation.minLength) {
        errors.push(`${fieldName} must be at least ${validation.minLength} characters long`)
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        errors.push(`${fieldName} must be no more than ${validation.maxLength} characters long`)
      }
      if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
        errors.push(`${fieldName} does not match required pattern`)
      }
    }

    if (validation.enum && !validation.enum.includes(value)) {
      errors.push(`${fieldName} must be one of: ${validation.enum.join(', ')}`)
    }

    return errors
  }
}

/**
 * Built-in template helpers for common operations
 */
export class TemplateHelpers {
  static formatDate(date: Date | string, format: string = 'MMMM dd, yyyy'): string {
    const d = typeof date === 'string' ? new Date(date) : date
    // Simple date formatting - in production, use date-fns or similar
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  static pluralize(count: number, singular: string, plural?: string): string {
    return count === 1 ? singular : (plural || singular + 's')
  }

  static formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  static truncate(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text
  }

  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  static generateExcerpt(content: string, maxLength: number = 160): string {
    // Remove markdown and HTML
    const cleaned = content
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()

    return this.truncate(cleaned, maxLength)
  }
}

/**
 * Content template factory for creating common template types
 */
export class ContentTemplateFactory {
  static createCountryToSchengenTemplate(): ContentTemplate {
    return {
      id: 'country-to-schengen',
      name: 'Country to Schengen Visa Template',
      type: 'country-to-schengen',
      slug: 'country-to-schengen-template',
      template: `# {{fromCountry}} to Schengen Area: Visa Requirements & Travel Guide

Planning to travel from {{fromCountry}} to the Schengen Area? This comprehensive guide covers everything you need to know about visa requirements, application processes, and travel tips for {{#if visaRequired}}visa-required{{else}}visa-free{{/if}} travel.

## Quick Overview

{{#if visaRequired}}
- ✅ **Visa Required**: Yes
- 📅 **Max Stay**: {{maxStayDays}} days  
- ⏱️ **Processing**: {{processingTime}}
- 💰 **Cost**: €{{cost}}
{{else}}
- ✅ **Visa Required**: No (visa-free)
- 📅 **Max Stay**: {{maxStayDays}} days within 180-day period
- 🎯 **Purpose**: Tourism, business, transit
{{/if}}

## Visa Requirements Details

{{#if visaRequired}}
Citizens of {{fromCountry}} must obtain a Schengen visa before traveling. Here's what you need to know:

### Required Documents
{{#each requirements}}
- {{this}}
{{/each}}

### Application Process
1. **Complete application form** - Fill out the Schengen visa application
2. **Gather documents** - Collect all required supporting documents  
3. **Book appointment** - Schedule at the nearest consulate/visa center
4. **Submit application** - Attend appointment and submit documents
5. **Wait for decision** - Processing typically takes {{processingTime}}

{{else}}
Great news! {{fromCountry}} citizens can travel to the Schengen Area without a visa for:
- Tourism and sightseeing
- Business meetings and conferences  
- Visiting friends and family
- Short-term studies (under 90 days)

### Entry Requirements
- Valid passport (min 3 months validity beyond stay)
- Proof of sufficient funds
- Return/onward travel tickets
- Travel insurance (recommended)
{{/if}}

## Popular Schengen Destinations

{{#each popularDestinations}}
### {{name}} {{flag}}
{{description}}

**Why Visit**: {{highlights}}
**Best Time**: {{bestTime}}
{{/each}}

{{#if digitalNomadInfo}}
## Digital Nomad Information

{{countryName}} offers several options for digital nomads:

{{#each digitalNomadInfo.availableVisas}}
### {{name}}
- **Duration**: {{duration}}
- **Cost**: €{{cost}}
- **Requirements**: {{#each requirements}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

**Popular Nomad Cities**: {{#each digitalNomadInfo.popularCities}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
**Internet Speed**: {{digitalNomadInfo.internetSpeed}}
**Cost of Living**: {{digitalNomadInfo.costOfLiving}}
{{/if}}

## Frequently Asked Questions

{{#each faqs}}
### {{question}}
{{answer}}

{{/each}}

## Travel Tips & Advice

1. **Travel Insurance**: {{#if visaRequired}}Required{{else}}Highly recommended{{/if}} - ensure coverage includes medical expenses and repatriation
2. **Currency**: Most Schengen countries use the Euro (€)
3. **Best Time to Visit**: {{bestTravelTime}}
4. **Language**: English is widely spoken in tourist areas
5. **Safety**: The Schengen Area is generally very safe for travelers

## Related Guides

- [Schengen Area Countries List](../schengen-countries/)
- [Europe Travel Insurance Guide](../travel-insurance-europe/)
- [{{fromCountry}} Passport Ranking](../passport-rankings/{{fromCountrySlug}}/)

---

*This information was last updated on {{lastUpdated}}. Visa requirements can change, so always check with the relevant embassy or consulate before traveling.*`,
      variables: [
        { name: 'fromCountry', type: 'string', required: true, description: 'Origin country name' },
        { name: 'fromCountrySlug', type: 'string', required: true, description: 'Origin country URL slug' },
        { name: 'visaRequired', type: 'boolean', required: true, description: 'Whether visa is required' },
        { name: 'maxStayDays', type: 'number', required: true, description: 'Maximum stay duration in days' },
        { name: 'processingTime', type: 'string', required: false, description: 'Visa processing time' },
        { name: 'cost', type: 'number', required: false, description: 'Visa cost in EUR' },
        { name: 'requirements', type: 'array', required: true, description: 'List of required documents' },
        { name: 'popularDestinations', type: 'array', required: true, description: 'Popular Schengen destinations' },
        { name: 'faqs', type: 'array', required: true, description: 'Frequently asked questions' },
        { name: 'digitalNomadInfo', type: 'object', required: false, description: 'Digital nomad visa information' },
        { name: 'bestTravelTime', type: 'string', required: true, description: 'Best time to visit Europe' },
        { name: 'lastUpdated', type: 'string', required: true, description: 'Last update date' }
      ],
      seoConfig: {
        titleTemplate: '{{fromCountry}} to Schengen Visa Requirements 2024 | Complete Travel Guide',
        descriptionTemplate: 'Complete visa guide for {{fromCountry}} citizens traveling to Schengen Area. {{#if visaRequired}}Visa requirements, costs, processing times{{else}}Visa-free travel information{{/if}} & expert tips.',
        keywords: ['{{fromCountry}} schengen visa', 'schengen visa requirements', '{{fromCountry}} travel europe', 'schengen area visa', '{{fromCountry}} europe visa'],
        structuredData: true
      },
      schemaMarkup: {
        type: 'TravelAction',
        properties: {
          '@type': 'TravelAction',
          'name': '{{fromCountry}} to Schengen Travel',
          'description': 'Travel information for {{fromCountry}} citizens visiting Schengen Area'
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    }
  }

  static createDigitalNomadTemplate(): ContentTemplate {
    return {
      id: 'digital-nomad-guide',
      name: 'Digital Nomad Country Guide Template',
      type: 'digital-nomad-guide', 
      slug: 'digital-nomad-guide-template',
      template: `# Digital Nomad Guide: {{countryName}} {{flag}}

{{countryName}} has become a hotspot for digital nomads seeking {{#if costOfLiving}}{{costOfLiving}} cost of living{{/if}}, reliable internet, and {{#if climate}}{{climate}} climate{{/if}}. This comprehensive guide covers visa options, costs, best cities, and practical tips for remote workers.

## 🏷️ Quick Facts

- 💰 **Cost of Living**: {{costOfLiving}}
- 🌐 **Internet Speed**: {{internetSpeed}}
- 🕐 **Time Zone**: UTC{{timeZoneOffset}}
- 📱 **Digital Nomad Visa**: {{#if hasDigitalNomadVisa}}Available{{else}}Not available{{/if}}
- 🏥 **Healthcare**: {{healthcareQuality}}

## 💳 Visa Options for Digital Nomads

{{#each digitalNomadVisas}}
### {{name}}
{{#if description}}{{description}}{{/if}}

**Key Details:**
- 📅 **Duration**: {{duration}}
- 💰 **Cost**: {{#if cost}}€{{cost}}{{else}}Free{{/if}}
- 💵 **Min Income**: {{#if minIncome}}€{{minIncome}}/month{{else}}No requirement{{/if}}
- 🔄 **Renewable**: {{#if renewable}}Yes{{else}}No{{/if}}

**Requirements:**
{{#each requirements}}
- {{this}}
{{/each}}

{{#if applicationUrl}}
[Apply Now]({{applicationUrl}}) 
{{/if}}

{{/each}}

## 💰 Cost of Living Breakdown

Living costs in {{countryName}} are considered **{{costOfLiving}}** compared to Western Europe:

| Category | Monthly Cost (€) | Notes |
|----------|------------------|-------|
| 🏠 Accommodation | {{accommodationCost}} | {{accommodationNotes}} |
| 🍽️ Food & Dining | {{foodCost}} | {{foodNotes}} |
| 🚗 Transportation | {{transportCost}} | {{transportNotes}} |
| 🌐 Internet/Mobile | {{internetCost}} | {{internetNotes}} |
| 🎯 Entertainment | {{entertainmentCost}} | {{entertainmentNotes}} |
| **💸 Total** | **€{{totalMonthlyCost}}** | {{totalNotes}} |

## 🏙️ Best Cities for Digital Nomads

{{#each bestCities}}
### {{name}} {{#if flag}}{{flag}}{{/if}}

{{description}}

**Nomad Stats:**
- 🌐 Internet: {{internetSpeed}} Mbps avg
- 💰 Monthly cost: €{{monthlyCost}}
- 👥 Nomad community: {{communitySize}}
- ☕ Coworking spaces: {{coworkingSpaces}}+
- 🏥 Safety rating: {{safetyRating}}/10

**Best For:** {{bestFor}}

{{#if highlights}}
**Highlights:**
{{#each highlights}}
- {{this}}
{{/each}}
{{/if}}

{{/each}}

## 🌐 Internet & Connectivity

{{internetOverview}}

**Speed Test Results:**
- 📊 **Average Download**: {{avgDownloadSpeed}} Mbps
- 📈 **Average Upload**: {{avgUploadSpeed}} Mbps  
- 📶 **Mobile Coverage**: {{mobileCoverage}}
- 💰 **Monthly Internet**: €{{internetMonthlyCost}}

**Recommended Providers:**
{{#each internetProviders}}
- **{{name}}**: {{description}} (€{{monthlyPrice}})
{{/each}}

## 🏢 Coworking & Community

{{#each coworkingSpaces}}
### {{name}}
{{description}}

- 📍 **Location**: {{location}}
- 💰 **Day pass**: €{{dayPass}}
- 📅 **Monthly**: €{{monthlyPrice}}
- 🌐 **Internet**: {{internetSpeed}} Mbps
- ☕ **Amenities**: {{amenities}}

{{/each}}

**Nomad Communities:**
{{#each nomadCommunities}}
- **{{name}}**: {{description}} ([Join]({{link}}))
{{/each}}

## 🏥 Healthcare & Insurance

{{healthcareSystem}}

**For Nomads:**
- 🏥 **Public healthcare**: {{publicHealthcare}}
- 💊 **Pharmacy access**: {{pharmacyAccess}}  
- 🚨 **Emergency number**: {{emergencyNumber}}
- 💳 **Insurance needed**: {{insuranceRecommendation}}

## 💼 Tax Implications

{{taxOverview}}

**Key Points:**
{{#each taxImplications}}
- {{this}}
{{/each}}

**💡 Recommendation**: {{taxRecommendation}}

## 🛂 Practical Getting Started

### Before You Arrive
{{#each beforeArrival}}
- [ ] {{this}}
{{/each}}

### First Week Checklist  
{{#each firstWeek}}
- [ ] {{this}}
{{/each}}

### Long-term Setup
{{#each longTerm}}
- [ ] {{this}}
{{/each}}

## 📱 Essential Apps & Services

{{#each essentialApps}}
- **{{name}}**: {{description}}
{{/each}}

## 🎯 Pros & Cons

### ✅ Pros
{{#each pros}}
- {{this}}
{{/each}}

### ❌ Cons  
{{#each cons}}
- {{this}}
{{/each}}

## 🔗 Useful Resources

{{#each resources}}
- [{{name}}]({{url}}) - {{description}}
{{/each}}

---

**📅 Last Updated**: {{lastUpdated}}
**🔄 Next Review**: {{nextReview}}

*Planning your nomad journey? Check out our [Digital Nomad Visa Comparison Tool](../visa-comparison/) or read about [Remote Work Tax Guide](../tax-guide/).*`,
      variables: [
        { name: 'countryName', type: 'string', required: true, description: 'Target country name' },
        { name: 'flag', type: 'string', required: false, description: 'Country flag emoji' },
        { name: 'costOfLiving', type: 'string', required: true, description: 'Cost of living level' },
        { name: 'digitalNomadVisas', type: 'array', required: true, description: 'Available digital nomad visas' },
        { name: 'bestCities', type: 'array', required: true, description: 'Best cities for nomads' },
        { name: 'internetSpeed', type: 'string', required: true, description: 'Average internet speed' },
        { name: 'timeZoneOffset', type: 'string', required: true, description: 'Time zone offset from UTC' }
      ],
      seoConfig: {
        titleTemplate: 'Digital Nomad Guide: {{countryName}} - Visa, Costs & Best Cities 2024',
        descriptionTemplate: 'Complete digital nomad guide for {{countryName}}. {{#if hasDigitalNomadVisa}}Digital nomad visa,{{/if}} cost of living, best cities, internet speeds & practical tips for remote workers.',
        keywords: ['{{countryName}} digital nomad', 'digital nomad visa {{countryName}}', 'remote work {{countryName}}', 'nomad guide {{countryName}}', '{{countryName}} cost of living'],
        structuredData: true
      },
      schemaMarkup: {
        type: 'TravelAction',
        properties: {
          '@type': 'TravelAction',
          'name': 'Digital Nomad in {{countryName}}',
          'description': 'Complete guide for digital nomads in {{countryName}}'
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    }
  }
}