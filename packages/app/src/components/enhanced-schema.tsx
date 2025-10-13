'use client'

interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface EnhancedSchemaProps {
  page: 'calculator' | 'country' | 'blog' | 'guide' | 'ees-airports' | string
  country?: string
  title?: string
  description?: string
  url?: string
  breadcrumbs?: BreadcrumbItem[]
  howToSteps?: HowToStep[]
  faqItems?: Array<{
    question: string
    answer: string
  }>
}

export function EnhancedSchema({
  page,
  country,
  title,
  description,
  url,
  breadcrumbs = [],
  howToSteps = [],
  faqItems = []
}: EnhancedSchemaProps) {

  // Default breadcrumbs
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://schengentracker.com' },
    { name: 'Schengen Calculator', url: 'https://schengentracker.com/schengen-calculator' }
  ]

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs

  // Default How-To steps for Schengen calculator
  const defaultHowToSteps: HowToStep[] = [
    {
      name: 'Enter your first entry date',
      text: 'Select the date when you first entered the Schengen area. This starts your 180-day rolling period.',
      url: 'https://schengentracker.com/schengen-calculator#step1'
    },
    {
      name: 'Add all your trips',
      text: 'Input all your entry and exit dates for each trip to Schengen countries. Our calculator will check for date conflicts.',
      url: 'https://schengentracker.com/schengen-calculator#step2'
    },
    {
      name: 'Review your compliance status',
      text: 'Check your remaining days and compliance status. The calculator shows if you are within the 90/180 day rule.',
      url: 'https://schengentracker.com/schengen-calculator#step3'
    },
    {
      name: 'Plan future trips',
      text: 'Use the calendar view to plan when you can safely return to the Schengen area without overstaying.',
      url: 'https://schengentracker.com/schengen-calculator#step4'
    }
  ]

  const finalHowToSteps = howToSteps.length > 0 ? howToSteps : defaultHowToSteps

  // Generate schema markup based on page type
  const generateSchemaMarkup = () => {
    const schemas: any[] = []

    // 1. BreadcrumbList Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: finalBreadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    })

    // 2. HowTo Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: country
        ? `How to Calculate ${country} Schengen 90/180 Day Rule Compliance`
        : 'How to Use the Schengen 90/180 Day Rule Calculator',
      description: country
        ? `Step-by-step guide to calculate your ${country} Schengen visa compliance using our free calculator tool.`
        : 'Step-by-step guide to calculate your Schengen visa compliance using our free calculator tool.',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0'
      },
      supply: [
        {
          '@type': 'HowToSupply',
          name: 'Passport'
        },
        {
          '@type': 'HowToSupply',
          name: 'Travel dates and entry/exit stamps'
        }
      ],
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Schengen Calculator',
          url: 'https://schengentracker.com/schengen-calculator'
        }
      ],
      step: finalHowToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        url: step.url,
        ...(step.image && { image: step.image })
      }))
    })

    // 3. SoftwareApplication/Product Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: country
        ? `${country} Schengen Calculator`
        : 'Schengen Visa Calculator',
      description: country
        ? `Free ${country} Schengen calculator for 90/180 day rule compliance. Track visa-free stays and avoid overstays.`
        : 'Free Schengen calculator for 90/180 day rule compliance. Track visa-free stays and avoid overstays.',
      url: url || 'https://schengentracker.com/schengen-calculator',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web Browser',
      browserRequirements: 'Modern web browser with JavaScript enabled',
      softwareVersion: '2.0',
      datePublished: '2024-01-01',
      dateModified: '2025-01-01',
      author: {
        '@type': 'Organization',
        name: 'Schengen Tracker',
        url: 'https://schengentracker.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Schengen Tracker',
        url: 'https://schengentracker.com'
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1247',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '90/180 day rule calculation',
        'Date overlap prevention',
        'Visual calendar interface',
        'Mobile responsive design',
        'Real-time compliance checking',
        ...(country ? [`${country}-specific guidance`] : ['Multi-country support'])
      ]
    })

    // 4. FAQ Schema (if FAQ items provided)
    if (faqItems.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      })
    }

    // 5. WebPage Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title || (country ? `${country} Schengen Calculator` : 'Schengen Calculator'),
      description: description || (country
        ? `Free ${country} Schengen calculator for 90/180 day rule compliance`
        : 'Free Schengen calculator for 90/180 day rule compliance'),
      url: url || 'https://schengentracker.com/schengen-calculator',
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Schengen Tracker',
        url: 'https://schengentracker.com'
      },
      about: {
        '@type': 'Thing',
        name: 'Schengen Area Visa Rules',
        description: '90/180 day rule for visa-free travel in the Schengen area'
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: country
          ? `https://schengentracker.com/images/${country.toLowerCase()}-schengen-calculator.jpg`
          : 'https://schengentracker.com/images/schengen-calculator.jpg'
      }
    })

    return schemas
  }

  const schemas = generateSchemaMarkup()

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  )
}