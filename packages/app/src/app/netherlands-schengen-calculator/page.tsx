import type { Metadata } from 'next'
import { CheckCircle, AlertTriangle, Info, MapPin, FileText, Users, Plane, Clock } from 'lucide-react'
import Link from 'next/link'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { ABTestCTA } from '@/components/ab-test-cta'

export const metadata: Metadata = {
  title: 'Netherlands Schengen Calculator 2025: 90/180 Day Rule Tracker | Free Tool',
  description: 'Free Netherlands Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your Dutch travels with our precise calculator tool.',
  keywords: [
    'Netherlands Schengen calculator',
    'Netherlands 90/180 rule',
    'Netherlands visa calculator',
    'Netherlands travel calculator',
    'Schengen visa Netherlands',
    'Netherlands tourist visa',
    'Netherlands visa-free travel',
    'Netherlands entry requirements',
    'Netherlands immigration calculator',
    'Netherlands border control',
    'EES Netherlands',
    'Entry Exit System Netherlands',
    'Holland visa calculator'
  ],
  openGraph: {
    title: 'Netherlands Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free Netherlands Schengen calculator for 90/180 day rule compliance. Plan your Dutch travels and avoid overstays.',
    url: 'https://schengentracker.com/netherlands-schengen-calculator',
    siteName: 'Schengen Tracker',
    images: [
      {
        url: '/images/netherlands-schengen-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Netherlands Schengen Calculator - 90/180 Day Rule Tracker'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Netherlands Schengen Calculator 2025: 90/180 Day Rule Tracker',
    description: 'Free Netherlands Schengen calculator for 90/180 day rule compliance. Plan your Dutch travels and avoid overstays.',
    images: ['/images/netherlands-schengen-calculator-twitter.jpg']
  },
  alternates: {
    canonical: 'https://schengentracker.com/netherlands-schengen-calculator'
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

export default function NetherlandsSchengenCalculatorPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">🇳🇱</span>
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                  Innovation Hub
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Netherlands Schengen Calculator
                <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-600 mt-2">
                  90/180 Day Rule Tracker
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover the Netherlands' progressive culture, stunning landscapes, and business opportunities with confidence. Our free calculator ensures you stay compliant
                with the Schengen 90/180 day rule while exploring all that Holland has to offer.
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
            <ABTestCTA country="Netherlands" page="netherlands-calculator" />
          </div>
        </section>

        {/* Netherlands Travel Guide Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete Netherlands Travel Guide 2025
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about traveling to the Netherlands under the Schengen agreement
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
                    What you need to enter the Netherlands in 2025
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
                      <span className="text-sm">€34/day proof of funds minimum</span>
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

              {/* Popular Dutch Cities */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Top Dutch Destinations</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Must-visit cities and regions in the Netherlands
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Amsterdam</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Capital</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Rotterdam</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Architecture</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">The Hague</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Political Center</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Utrecht</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Historic</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Keukenhof</span>
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">Tulip Gardens</span>
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
                    Working and doing business in the Netherlands
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">EU Blue Card for skilled workers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Startup visa program available</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Business meetings (90 days)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Strong tech ecosystem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dutch Culture Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Experience Dutch Culture
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make the most of your Schengen allowance exploring Dutch innovation and tradition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌷</div>
                <h3 className="font-semibold mb-2">Tulip Season</h3>
                <p className="text-sm text-gray-600">Spring blooms, Keukenhof, flower fields</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="font-semibold mb-2">Art & Museums</h3>
                <p className="text-sm text-gray-600">Van Gogh, Rijksmuseum, Stedelijk</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚲</div>
                <h3 className="font-semibold mb-2">Cycling Culture</h3>
                <p className="text-sm text-gray-600">Bike tours, canal rides, countryside</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏘️</div>
                <h3 className="font-semibold mb-2">Architecture</h3>
                <p className="text-sm text-gray-600">Canal houses, modern design, historic sites</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Innovation */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Netherlands Innovation Hubs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic business locations within your Schengen time allowance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-3">Amsterdam</h3>
                <p className="text-gray-600 text-sm mb-4">Financial hub, tech startups, major corporations</p>
                <div className="text-xs text-gray-500">Schiphol Airport • Tech Sector • Finance</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-3">Eindhoven</h3>
                <p className="text-gray-600 text-sm mb-4">Technology capital, Philips headquarters, design hub</p>
                <div className="text-xs text-gray-500">High Tech Campus • Design • Innovation</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-3">Rotterdam</h3>
                <p className="text-gray-600 text-sm mb-4">Europe's largest port, logistics, maritime industry</p>
                <div className="text-xs text-gray-500">Port of Rotterdam • Logistics • Trade</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Explore the Netherlands?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Use our free calculator to ensure perfect compliance with Dutch immigration rules
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-base font-medium">
                Calculate My Netherlands Stays
              </Link>
              <Link href="/schengen-calculator" className="inline-flex items-center justify-center rounded-md border border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-base font-medium">
                Full Schengen Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Schema Markup */}
        <EnhancedSchema
          page="country"
          country="Netherlands"
          title="Netherlands Schengen Calculator 2025: 90/180 Day Rule Tracker"
          description="Free Netherlands Schengen calculator for 90/180 day rule compliance. Track visa-free stays, avoid overstays, and plan your Dutch travels with our precise calculator tool."
          url="https://schengentracker.com/netherlands-schengen-calculator"
          breadcrumbs={[
            { name: 'Home', url: 'https://schengentracker.com' },
            { name: 'Schengen Calculator', url: 'https://schengentracker.com/schengen-calculator' },
            { name: 'Netherlands Calculator', url: 'https://schengentracker.com/netherlands-schengen-calculator' }
          ]}
          faqItems={[
            {
              question: 'How long can I stay in the Netherlands without a visa?',
              answer: 'Citizens of visa-exempt countries can stay in the Netherlands for up to 90 days within any 180-day period under the Schengen agreement.'
            },
            {
              question: 'What are the financial requirements for entering the Netherlands?',
              answer: 'You need to demonstrate proof of €34/day minimum funds for your stay in the Netherlands, along with proof of accommodation and return ticket.'
            },
            {
              question: 'Can I work in the Netherlands on a tourist visa?',
              answer: 'No, tourist visas do not permit work. You need specific work authorization like an EU Blue Card or startup visa for employment in the Netherlands.'
            }
          ]}
        />
      </div>
    </>
  )
}