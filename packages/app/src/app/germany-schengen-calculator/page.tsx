import type { Metadata } from 'next'
import { CheckCircle, AlertTriangle, Info, MapPin, FileText, Users, Plane, Clock } from 'lucide-react'
import Link from 'next/link'
import { EnhancedSchema } from '@/components/enhanced-schema'

export const metadata: Metadata = {
  title: 'Germany Schengen Calculator 2025: 90/180 Day Rule Tracker | Free Tool',
  description: 'Free Germany Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your German travels with our precise calculator tool.',
  keywords: [
    'Germany Schengen calculator',
    'Germany 90/180 rule',
    'Germany visa calculator',
    'Germany travel calculator',
    'Schengen visa Germany',
    'Germany tourist visa',
    'Germany visa-free travel',
    'Germany entry requirements',
    'Germany immigration calculator',
    'Germany border control',
    'EES Germany',
    'Entry Exit System Germany'
  ],
  openGraph: {
    title: 'Germany Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free Germany Schengen calculator for 90/180 day rule compliance. Plan your German travels and avoid overstays.',
    url: 'https://schengentracker.com/germany-schengen-calculator',
    siteName: 'Schengen Tracker',
    images: [
      {
        url: '/images/germany-schengen-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Germany Schengen Calculator - 90/180 Day Rule Tracker'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Germany Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free Germany Schengen calculator for 90/180 day rule compliance. Plan your German travels and avoid overstays.',
    images: ['/images/germany-schengen-calculator-twitter.jpg']
  },
  alternates: {
    canonical: 'https://schengentracker.com/germany-schengen-calculator'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function GermanySchengenCalculatorPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-black-50">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">🇩🇪</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                  Most Popular Destination
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Germany Schengen Calculator
                <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-600 mt-2">
                  90/180 Day Rule Tracker
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Plan your German adventures with confidence. Our free calculator ensures you stay compliant
                with the Schengen 90/180 day rule while exploring Germany's rich culture and business opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  100% Free & Accurate
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  EES System Ready (2025)
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Mobile Optimized
                </div>
              </div>
            </div>

            {/* Calculator CTA */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Use Our Free Germany Schengen Calculator
                </h2>
                <p className="text-gray-600 mb-6">
                  Calculate your exact compliance with the 90/180 day rule for Germany and all Schengen countries.
                </p>
                <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Start Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Germany Travel Guide Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete Germany Travel Guide 2025
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about traveling to Germany under the Schengen agreement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Entry Requirements */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Entry Requirements</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    What you need to enter Germany in 2025
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Valid passport (6+ months remaining)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">EES registration starting 2025</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Proof of accommodation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Return ticket or onward travel</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">€45-55/day proof of funds</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t mt-4">
                    <p className="text-xs text-gray-500">
                      <Info className="h-3 w-3 inline mr-1" />
                      ETIAS will be required from 2026 onwards
                    </p>
                  </div>
                </div>
              </div>

              {/* Popular German Cities */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Top German Destinations</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Must-visit cities and regions in Germany
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Berlin</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Capital</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Munich</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Bavaria</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Frankfurt</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Financial Hub</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Hamburg</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Port City</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cologne</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Cultural</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business & Work */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Business & Work</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Working and doing business in Germany
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">EU Blue Card for skilled workers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Freelance visa available</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Business meetings (90 days)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Strong startup ecosystem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Plan Your German Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Use our free calculator to ensure perfect compliance with German immigration rules
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-base font-medium">
                Calculate My Germany Stays
              </Link>
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-base font-medium">
                Full Schengen Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Schema Markup */}
        <EnhancedSchema
          page="country"
          country="Germany"
          title="Germany Schengen Calculator 2025: 90/180 Day Rule Tracker"
          description="Free Germany Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your German travels with our precise calculator tool."
          url="https://schengentracker.com/germany-schengen-calculator"
          breadcrumbs={[
            { name: 'Home', url: 'https://schengentracker.com' },
            { name: 'Schengen Calculator', url: 'https://schengentracker.com/schengen-calculator' },
            { name: 'Germany Calculator', url: 'https://schengentracker.com/germany-schengen-calculator' }
          ]}
          faqItems={[
            {
              question: 'How long can I stay in Germany without a visa?',
              answer: 'Citizens of visa-exempt countries can stay in Germany for up to 90 days within any 180-day period under the Schengen agreement.'
            },
            {
              question: 'What is the EES system starting in 2025?',
              answer: 'The Entry/Exit System (EES) launching in 2025 will automatically record entry and exit dates using biometric data, replacing manual passport stamping.'
            }
          ]}
        />
      </div>
    </>
  )
}