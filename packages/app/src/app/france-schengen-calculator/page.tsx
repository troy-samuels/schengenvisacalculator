import type { Metadata } from 'next'
import { CheckCircle, AlertTriangle, Info, MapPin, FileText, Users, Plane, Clock } from 'lucide-react'
import Link from 'next/link'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { ABTestCTA } from '@/components/ab-test-cta'

export const metadata: Metadata = {
  title: 'France Schengen Calculator 2025: 90/180 Day Rule Tracker | Free Tool',
  description: 'Free France Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your French travels with our precise calculator tool.',
  keywords: [
    'France Schengen calculator',
    'France 90/180 rule',
    'France visa calculator',
    'France travel calculator',
    'Schengen visa France',
    'France tourist visa',
    'France visa-free travel',
    'France entry requirements',
    'France immigration calculator',
    'France border control',
    'EES France',
    'Entry Exit System France'
  ],
  openGraph: {
    title: 'France Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free France Schengen calculator for 90/180 day rule compliance. Plan your French travels and avoid overstays.',
    url: 'https://schengentracker.com/france-schengen-calculator',
    siteName: 'Schengen Tracker',
    images: [
      {
        url: '/images/france-schengen-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'France Schengen Calculator - 90/180 Day Rule Tracker'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'France Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free France Schengen calculator for 90/180 day rule compliance. Plan your French travels and avoid overstays.',
    images: ['/images/france-schengen-calculator-twitter.jpg']
  },
  alternates: {
    canonical: 'https://schengentracker.com/france-schengen-calculator'
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

export default function FranceSchengenCalculatorPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">🇫🇷</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                  #1 Tourist Destination
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                France Schengen Calculator
                <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-600 mt-2">
                  90/180 Day Rule Tracker
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Experience France's romance, culture, and cuisine with confidence. Our free calculator ensures you stay compliant
                with the Schengen 90/180 day rule while exploring all that France has to offer.
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

            {/* A/B Testing Calculator CTA */}
            <ABTestCTA country="France" page="france-calculator" />
          </div>
        </section>

        {/* France Travel Guide Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete France Travel Guide 2025
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about traveling to France under the Schengen agreement
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
                    What you need to enter France in 2025
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
                      <span className="text-sm">€65/day proof of funds minimum</span>
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

              {/* Popular French Cities */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Top French Destinations</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Must-visit cities and regions in France
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Paris</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Capital</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Nice</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Côte d'Azur</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lyon</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Gastronomy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bordeaux</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Wine Region</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Marseille</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Mediterranean</span>
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
                    Working and doing business in France
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Talent Passport for skilled workers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">French Tech Visa available</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Business meetings (90 days)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Station F startup hub</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* French Culture Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Experience French Culture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make the most of your Schengen allowance exploring France's rich heritage
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🍷</div>
                <h3 className="font-semibold mb-2">Wine Regions</h3>
                <p className="text-sm text-gray-600">Bordeaux, Burgundy, Champagne tours</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="font-semibold mb-2">Art & Museums</h3>
                <p className="text-sm text-gray-600">Louvre, Musée d'Orsay, local galleries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🥐</div>
                <h3 className="font-semibold mb-2">Cuisine</h3>
                <p className="text-sm text-gray-600">Michelin stars, local bistros, markets</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏰</div>
                <h3 className="font-semibold mb-2">Châteaux</h3>
                <p className="text-sm text-gray-600">Loire Valley, Versailles, historic sites</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Experience La Belle France?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Use our free calculator to ensure perfect compliance with French immigration rules
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-base font-medium">
                Calculate My France Stays
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
          country="France"
          title="France Schengen Calculator 2025: 90/180 Day Rule Tracker"
          description="Free France Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your French travels with our precise calculator tool."
          url="https://schengentracker.com/france-schengen-calculator"
          breadcrumbs={[
            { name: 'Home', url: 'https://schengentracker.com' },
            { name: 'Schengen Calculator', url: 'https://schengentracker.com/schengen-calculator' },
            { name: 'France Calculator', url: 'https://schengentracker.com/france-schengen-calculator' }
          ]}
          faqItems={[
            {
              question: 'How long can I stay in France without a visa?',
              answer: 'Citizens of visa-exempt countries can stay in France for up to 90 days within any 180-day period under the Schengen agreement.'
            },
            {
              question: 'What documents do I need to enter France in 2025?',
              answer: 'You need a valid passport with at least 6 months validity, proof of accommodation, return ticket, and proof of €65/day minimum funds. EES registration will be required from 2025.'
            },
            {
              question: 'Can I work in France on a tourist visa?',
              answer: 'No, tourist visas do not permit work. You need a specific work visa like the Talent Passport or French Tech Visa for employment in France.'
            }
          ]}
        />
      </div>
    </>
  )
}