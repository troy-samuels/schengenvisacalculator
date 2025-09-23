import type { Metadata } from 'next'
import { CheckCircle, AlertTriangle, Info, MapPin, FileText, Users, Plane, Clock } from 'lucide-react'
import Link from 'next/link'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { ABTestCTA } from '@/components/ab-test-cta'

export const metadata: Metadata = {
  title: 'Italy Schengen Calculator 2025: 90/180 Day Rule Tracker | Free Tool',
  description: 'Free Italy Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your Italian travels with our precise calculator tool.',
  keywords: [
    'Italy Schengen calculator',
    'Italy 90/180 rule',
    'Italy visa calculator',
    'Italy travel calculator',
    'Schengen visa Italy',
    'Italy tourist visa',
    'Italy visa-free travel',
    'Italy entry requirements',
    'Italy immigration calculator',
    'Italy border control',
    'EES Italy',
    'Entry Exit System Italy'
  ],
  openGraph: {
    title: 'Italy Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free Italy Schengen calculator for 90/180 day rule compliance. Plan your Italian travels and avoid overstays.',
    url: 'https://schengentracker.com/italy-schengen-calculator',
    siteName: 'Schengen Tracker',
    images: [
      {
        url: '/images/italy-schengen-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Italy Schengen Calculator - 90/180 Day Rule Tracker'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italy Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free Italy Schengen calculator for 90/180 day rule compliance. Plan your Italian travels and avoid overstays.',
    images: ['/images/italy-schengen-calculator-twitter.jpg']
  },
  alternates: {
    canonical: 'https://schengentracker.com/italy-schengen-calculator'
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

export default function ItalySchengenCalculatorPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">🇮🇹</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                  Art & Culture Capital
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Italy Schengen Calculator
                <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-600 mt-2">
                  90/180 Day Rule Tracker
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Immerse yourself in Italy's art, history, and culinary excellence with confidence. Our free calculator ensures you stay compliant
                with the Schengen 90/180 day rule while exploring the treasures of Italy.
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
            <ABTestCTA country="Italy" page="italy-calculator" />
          </div>
        </section>

        {/* Italy Travel Guide Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete Italy Travel Guide 2025
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about traveling to Italy under the Schengen agreement
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
                    What you need to enter Italy in 2025
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
                      <span className="text-sm">€26.87/day proof of funds minimum</span>
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

              {/* Popular Italian Cities */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Top Italian Destinations</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Must-visit cities and regions in Italy
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Rome</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Capital</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Venice</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Romantic</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Florence</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Renaissance</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Milan</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Fashion Hub</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Amalfi Coast</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Coastal</span>
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
                    Working and doing business in Italy
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">EU Blue Card for skilled workers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Investor visa program available</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Business meetings (90 days)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Growing startup ecosystem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Italian Culture Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Experience Italian Culture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make the most of your Schengen allowance exploring Italy's timeless beauty
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🍝</div>
                <h3 className="font-semibold mb-2">Cuisine</h3>
                <p className="text-sm text-gray-600">Authentic pasta, pizza, gelato tours</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="font-semibold mb-2">Art & History</h3>
                <p className="text-sm text-gray-600">Vatican, Uffizi, Colosseum visits</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="font-semibold mb-2">Architecture</h3>
                <p className="text-sm text-gray-600">Roman ruins, Renaissance palaces</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚤</div>
                <h3 className="font-semibold mb-2">Coastlines</h3>
                <p className="text-sm text-gray-600">Cinque Terre, Sicily, Lake Como</p>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Highlights */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Italian Regions to Explore
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each region offers unique experiences within your Schengen time limit
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-3">Tuscany</h3>
                <p className="text-gray-600 text-sm mb-4">Wine country, rolling hills, Renaissance cities</p>
                <div className="text-xs text-gray-500">Florence • Siena • Chianti • Pisa</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-3">Lombardy</h3>
                <p className="text-gray-600 text-sm mb-4">Fashion capital, Alpine lakes, business hub</p>
                <div className="text-xs text-gray-500">Milan • Lake Como • Bergamo • Brescia</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-3">Campania</h3>
                <p className="text-gray-600 text-sm mb-4">Ancient history, dramatic coastlines, pizza birthplace</p>
                <div className="text-xs text-gray-500">Naples • Pompeii • Amalfi • Capri</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-red-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Fall in Love with Italy?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Use our free calculator to ensure perfect compliance with Italian immigration rules
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-base font-medium">
                Calculate My Italy Stays
              </Link>
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md border border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-base font-medium">
                Full Schengen Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Schema Markup */}
        <EnhancedSchema
          page="country"
          country="Italy"
          title="Italy Schengen Calculator 2025: 90/180 Day Rule Tracker"
          description="Free Italy Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your Italian travels with our precise calculator tool."
          url="https://schengentracker.com/italy-schengen-calculator"
          breadcrumbs={[
            { name: 'Home', url: 'https://schengentracker.com' },
            { name: 'Schengen Calculator', url: 'https://schengentracker.com/schengen-calculator' },
            { name: 'Italy Calculator', url: 'https://schengentracker.com/italy-schengen-calculator' }
          ]}
          faqItems={[
            {
              question: 'How long can I stay in Italy without a visa?',
              answer: 'Citizens of visa-exempt countries can stay in Italy for up to 90 days within any 180-day period under the Schengen agreement.'
            },
            {
              question: 'What are the entry requirements for Italy in 2025?',
              answer: 'You need a valid passport with at least 6 months validity, proof of accommodation, return ticket, and proof of €26.87/day minimum funds. EES registration will be required from 2025.'
            },
            {
              question: 'Can I travel to other Schengen countries from Italy?',
              answer: 'Yes, once you enter Italy, you can travel freely to all other Schengen countries. Your 90-day limit applies to the entire Schengen area, not individual countries.'
            }
          ]}
        />
      </div>
    </>
  )
}