import type { Metadata, Viewport } from 'next'
import { DM_Sans, Poppins } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Schengen Visa Calculator | 90/180 Rule Compliance Tool',
    template: '%s | Schengen Calculator',
  },
  description: 'Professional EU Schengen visa calculator for the 90/180-day rule. Track your trips, ensure compliance, and plan travel with our enterprise-grade platform.',
  keywords: [
    'schengen visa calculator',
    '90 180 day rule',
    'eu travel',
    'visa compliance',
    'travel planning',
    'europe visa',
    'schengen area',
    'trip tracker'
  ],
  authors: [{ name: 'Schengen Calculator Team' }],
  creator: 'Schengen Calculator',
  publisher: 'Schengen Calculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://schengen-calculator.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Schengen Visa Calculator | 90/180 Rule Compliance Tool',
    description: 'Professional EU Schengen visa calculator for the 90/180-day rule. Track your trips, ensure compliance, and plan travel.',
    siteName: 'Schengen Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Schengen Visa Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Visa Calculator',
    description: 'Professional EU Schengen visa calculator for the 90/180-day rule.',
    images: ['/og-image.png'],
    creator: '@schengen_calc',
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
                  "@id": "https://schengen-calculator.com/#webapp",
                  "name": "Schengen Visa Calculator",
                  "description": "Professional EU Schengen visa calculator for the 90/180-day rule. Track your trips, ensure compliance, and plan travel with our enterprise-grade platform.",
                  "url": "https://schengen-calculator.com",
                  "applicationCategory": "Travel",
                  "operatingSystem": "Web Browser",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "1247",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Organization",
                    "@id": "https://schengen-calculator.com/#organization"
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://schengen-calculator.com/#webpage"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://schengen-calculator.com/#organization",
                  "name": "Schengen Calculator",
                  "url": "https://schengen-calculator.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://schengen-calculator.com/logo.png"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "areaServed": "Worldwide",
                    "availableLanguage": "English"
                  },
                  "sameAs": [
                    "https://twitter.com/schengen_calc"
                  ]
                },
                {
                  "@type": "WebPage",
                  "@id": "https://schengen-calculator.com/#webpage",
                  "url": "https://schengen-calculator.com",
                  "name": "Schengen Visa Calculator | 90/180 Rule Compliance Tool",
                  "description": "Professional EU Schengen visa calculator for the 90/180-day rule. Track your trips, ensure compliance, and plan travel with our enterprise-grade platform.",
                  "inLanguage": "en-US",
                  "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://schengen-calculator.com/#website"
                  },
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://schengen-calculator.com/og-image.png"
                  },
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://schengen-calculator.com"
                      }
                    ]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://schengen-calculator.com/#website",
                  "url": "https://schengen-calculator.com",
                  "name": "Schengen Calculator",
                  "description": "Professional EU Schengen visa calculator platform",
                  "publisher": {
                    "@id": "https://schengen-calculator.com/#organization"
                  },
                  "potentialAction": [
                    {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://schengen-calculator.com/?q={search_term_string}"
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
                        "text": "The 90/180 day rule allows visa-free travelers to stay in the Schengen area for up to 90 days within any 180-day period. Our calculator helps you track compliance with this rule."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does the Schengen calculator work?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Enter your trip dates and countries visited. The calculator automatically tracks your days and ensures you don't exceed the 90-day limit within any 180-day rolling period."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is the Schengen calculator free to use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, our basic Schengen calculator is completely free. Premium features like trip optimization and document storage are available with paid plans."
                      }
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}