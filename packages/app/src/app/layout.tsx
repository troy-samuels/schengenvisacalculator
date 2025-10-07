import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import ClientProviders from '@/components/ClientProviders'
import './globals.css'

const dmSans = localFont({
  src: [
    {
      path: './../../public/fonts/dm-sans/DMSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './../../public/fonts/dm-sans/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../public/fonts/dm-sans/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../../public/fonts/dm-sans/DMSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './../../public/fonts/dm-sans/DMSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'EU Border Authority | EES, ETIAS & Schengen Compliance',
    template: '%s | EU Border Authority',
  },
  description: 'Complete EU border compliance authority with secure user accounts for EES preparation, ETIAS applications, and persistent Schengen 90/180-day rule tracking. Save your travel history securely and access from anywhere.',
  keywords: [
    'EES system',
    'Entry Exit System',
    'ETIAS application',
    'schengen calculator',
    '90 180 day rule',
    'EU border control',
    'eu travel compliance',
    'biometric registration',
    'EU travel authority',
    'secure travel history',
    'travel data persistence',
    'user account travel tracking',
    'cross-device schengen tracking'
  ],
  authors: [{ name: 'EU Border Authority Team' }],
  creator: 'EU Border Authority',
  publisher: 'EU Border Authority',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://euborder.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'EU Border Authority | Complete EES, ETIAS & Schengen Guide',
    description: 'The definitive EU border compliance authority with secure user accounts. EES preparation, ETIAS applications, persistent Schengen tracking - save your travel data and access from anywhere.',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EU Border Authority',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EU Border Authority',
    description: 'Complete EU border compliance authority with secure user accounts for EES, ETIAS, and persistent Schengen travel tracking.',
    images: ['/og-image.png'],
    creator: '@euborder',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data for Enterprise SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": "https://euborder.com/#webapp",
                  "name": "EU Border Authority - Schengen Calculator",
                  "alternateName": ["Schengen Visa Calculator", "90/180 Day Rule Calculator", "EES Calculator", "ETIAS Calculator"],
                  "description": "The definitive Schengen 90/180-day rule calculator with family tracking, EES preparation, and ETIAS compliance. Trusted by travelers worldwide for EU border compliance.",
                  "url": "https://euborder.com",
                  "applicationCategory": ["Travel", "TravelCalculator", "LegalCompliance"],
                  "operatingSystem": "Web Browser",
                  "browserRequirements": "Requires JavaScript. Supports all modern browsers.",
                  "softwareVersion": "2.0.0",
                  "releaseNotes": "Enhanced family tracking, EES integration, and AI-optimized compliance guidance",
                  "featureList": [
                    "90/180-day rule calculation",
                    "Family member tracking",
                    "EES preparation guides",
                    "ETIAS application support",
                    "PDF compliance reports",
                    "Email/SMS alerts",
                    "Multi-country tracking",
                    "Date overlap prevention"
                  ],
                  "screenshot": "https://euborder.com/og-image.png",
                  "offers": [
                    {
                      "@type": "Offer",
                      "name": "Free Schengen Calculator",
                      "description": "Basic 90/180-day rule calculator with 5 trip limit",
                      "price": "0",
                      "priceCurrency": "GBP",
                      "availability": "https://schema.org/InStock",
                      "category": "Free Tier"
                    },
                    {
                      "@type": "Offer",
                      "name": "Lifetime Family Tracking",
                      "description": "Unlimited trips, family tracking for 4 members, PDF reports",
                      "price": "5.99",
                      "priceCurrency": "GBP",
                      "availability": "https://schema.org/InStock",
                      "category": "Premium"
                    },
                    {
                      "@type": "Offer",
                      "name": "Annual Premium",
                      "description": "All features plus SMS alerts and priority support",
                      "price": "2.99",
                      "priceCurrency": "GBP",
                      "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": "2.99",
                        "priceCurrency": "GBP",
                        "unitText": "per year"
                      },
                      "availability": "https://schema.org/InStock",
                      "category": "Premium Annual"
                    }
                  ],
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "1247",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "author": {
                    "@type": "Organization",
                    "@id": "https://euborder.com/#organization"
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://euborder.com/#webpage"
                  },
                  "potentialAction": [
                    {
                      "@type": "UseAction",
                      "name": "Calculate Schengen Compliance",
                      "description": "Calculate your remaining days in the Schengen area",
                      "target": "https://euborder.com/"
                    },
                    {
                      "@type": "SearchAction",
                      "name": "Search Travel Guides",
                      "target": "https://euborder.com/blog?q={search_term}",
                      "query-input": "required name=search_term"
                    }
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://euborder.com/#organization",
                  "name": "EU Border Authority",
                  "url": "https://euborder.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://euborder.com/logo.png"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "email": "info@euborder.com",
                    "areaServed": "Worldwide",
                    "availableLanguage": "English"
                  },
                  "sameAs": [
                    "https://twitter.com/euborder"
                  ]
                },
                {
                  "@type": "WebPage",
                  "@id": "https://euborder.com/#webpage",
                  "url": "https://euborder.com",
                  "name": "EU Border Authority | Complete EES, ETIAS & Schengen Guide",
                  "description": "Complete EU border compliance authority for EES preparation, ETIAS applications, and Schengen 90/180-day rule tracking. Master EU travel with confidence and authority.",
                  "inLanguage": "en-US",
                  "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://euborder.com/#website"
                  },
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://euborder.com/og-image.png"
                  },
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://euborder.com"
                      }
                    ]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://euborder.com/#website",
                  "url": "https://euborder.com",
                  "name": "EU Border Authority",
                  "description": "Complete EU border compliance authority platform",
                  "publisher": {
                    "@id": "https://euborder.com/#organization"
                  },
                  "potentialAction": [
                    {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://euborder.com/?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is the 90/180 day rule for Schengen visas?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The 90/180 day rule allows visa-free travelers to stay in the Schengen area for up to 90 days within any 180-day period. This rule applies to all 29 Schengen countries and is strictly enforced at border controls. Our calculator helps you track compliance with this rule automatically."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does the Schengen calculator work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Simply enter your trip dates and countries visited. The calculator automatically tracks your days and ensures you don't exceed the 90-day limit within any 180-day rolling period. It prevents date overlaps and provides real-time compliance status for you and your family members."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is the Schengen calculator free to use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, our basic Schengen calculator is completely free with up to 5 trips. Premium features like unlimited trips, family tracking for 4 members, PDF reports, and compliance alerts are available from £5.99 lifetime or £2.99 annually."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is EES and how does it affect Schengen travel?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Entry/Exit System (EES) is the EU's new biometric border control system launching in 2024. It will automatically track entries and exits, making precise compliance calculation even more critical. Our calculator prepares you for EES implementation."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I track multiple family members?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! Our premium plans allow family tracking for up to 4 members with coordinated trip planning, shared compliance monitoring, and family-specific alerts. Perfect for families traveling together to Europe."
                      }
                    }
                  ]
                },
                {
                  "@type": "HowTo",
                  "name": "How to Calculate Schengen 90/180 Day Rule Compliance",
                  "description": "Step-by-step guide to using our Schengen calculator for perfect EU travel compliance",
                  "totalTime": "PT5M",
                  "estimatedCost": {
                    "@type": "MonetaryAmount",
                    "currency": "GBP",
                    "value": "0"
                  },
                  "supply": [
                    {
                      "@type": "HowToSupply",
                      "name": "Passport with travel dates"
                    },
                    {
                      "@type": "HowToSupply",
                      "name": "List of countries visited in Schengen area"
                    }
                  ],
                  "tool": [
                    {
                      "@type": "HowToTool",
                      "name": "EU Border Authority Schengen Calculator",
                      "url": "https://euborder.com"
                    }
                  ],
                  "step": [
                    {
                      "@type": "HowToStep",
                      "name": "Enter Your Travel Dates",
                      "text": "Add each trip to the Schengen area with exact entry and exit dates",
                      "url": "https://euborder.com/#step-1"
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Select Countries Visited",
                      "text": "Choose the specific Schengen countries you visited during each trip",
                      "url": "https://euborder.com/#step-2"
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Review Compliance Status",
                      "text": "Check your remaining days and compliance status for future travel planning",
                      "url": "https://euborder.com/#step-3"
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Generate Compliance Report",
                      "text": "Download PDF reports for border officials or upgrade for family tracking",
                      "url": "https://euborder.com/#step-4"
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${poppins.variable} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Analytics */}
        <GoogleAnalytics GA_MEASUREMENT_ID="G-DPC560854T" />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}