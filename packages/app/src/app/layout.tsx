import type { Metadata, Viewport } from 'next'
import { Inter, Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
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
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
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