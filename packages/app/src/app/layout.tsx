import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
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
                  "name": "EU Border Authority",
                  "description": "Complete EU border compliance authority for EES preparation, ETIAS applications, and Schengen 90/180-day rule tracking. Master EU travel with confidence and authority.",
                  "url": "https://euborder.com",
                  "applicationCategory": "Travel",
                  "operatingSystem": "Web Browser",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "author": {
                    "@type": "Organization",
                    "@id": "https://euborder.com/#organization"
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://euborder.com/#webpage"
                  }
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