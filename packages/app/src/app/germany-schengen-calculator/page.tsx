import type { Metadata } from 'next'
import { SchengenCalculator } from '@/components/schengen-calculator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, Info, Calendar, MapPin, FileText, Users, Plane, Clock } from 'lucide-react'
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Germany Schengen Calculator",
  "description": "Free Germany Schengen calculator for 90/180 day rule compliance",
  "url": "https://schengentracker.com/germany-schengen-calculator",
  "applicationCategory": "Travel",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "90/180 day rule calculation",
    "Germany travel tracking",
    "Visa compliance monitoring",
    "Entry/exit date management"
  ]
}

export default function GermanySchengenCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-black-50">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl">🇩🇪</span>
                <Badge variant="secondary" className="text-sm font-medium">
                  Most Popular Destination
                </Badge>
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

            {/* Calculator Component */}
            <div className="max-w-4xl mx-auto">
              <SchengenCalculator />
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
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <CardTitle>Entry Requirements</CardTitle>
                  </div>
                  <CardDescription>
                    What you need to enter Germany in 2025
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      <Info className="h-3 w-3 inline mr-1" />
                      ETIAS will be required from 2026 onwards
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Popular German Cities */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <CardTitle>Top German Destinations</CardTitle>
                  </div>
                  <CardDescription>
                    Must-visit cities and regions in Germany
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Berlin</span>
                      <Badge variant="outline">Capital</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Munich</span>
                      <Badge variant="outline">Bavaria</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Frankfurt</span>
                      <Badge variant="outline">Financial Hub</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Hamburg</span>
                      <Badge variant="outline">Port City</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cologne</span>
                      <Badge variant="outline">Cultural</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dresden</span>
                      <Badge variant="outline">Historic</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business & Work */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <CardTitle>Business & Work</CardTitle>
                  </div>
                  <CardDescription>
                    Working and doing business in Germany
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Berlin as tech hub</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Germany-Specific Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Germany-Specific Travel Information
              </h2>
              <p className="text-xl text-gray-600">
                Important details for your German adventure
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Border Controls & EES
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Entry/Exit System (EES) - Starting 2025</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li>• Biometric data collection at borders</li>
                        <li>• Automated tracking of entry/exit dates</li>
                        <li>• Enhanced security and compliance monitoring</li>
                        <li>• Applies to all non-EU visitors</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Major Entry Points:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Frankfurt Airport (FRA) - Largest hub</li>
                        <li>• Munich Airport (MUC) - Southern gateway</li>
                        <li>• Berlin Brandenburg (BER) - Capital access</li>
                        <li>• Hamburg Airport (HAM) - Northern entry</li>
                        <li>• Land borders with 9 countries</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cultural Tips & Etiquette</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Essential German Phrases:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• "Guten Tag" - Good day (formal greeting)</li>
                        <li>• "Danke schön" - Thank you very much</li>
                        <li>• "Entschuldigung" - Excuse me/Sorry</li>
                        <li>• "Sprechen Sie Englisch?" - Do you speak English?</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Cultural Notes:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Punctuality is highly valued</li>
                        <li>• Direct communication style</li>
                        <li>• Quiet hours: 10 PM - 6 AM</li>
                        <li>• Sunday shop closures (except restaurants)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      Travel Costs & Budget
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-green-700">€70-100</p>
                        <p className="text-xs text-green-600">Daily Budget</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-blue-700">€25-45</p>
                        <p className="text-xs text-blue-600">Accommodation</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-orange-700">€20-35</p>
                        <p className="text-xs text-orange-600">Meals</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-purple-700">€15-25</p>
                        <p className="text-xs text-purple-600">Transport</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Money-Saving Tips:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Deutschland-Ticket: €49/month public transport</li>
                        <li>• Museum passes in major cities</li>
                        <li>• Free walking tours available</li>
                        <li>• Student discounts widely accepted</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transportation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Public Transport:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• DB (Deutsche Bahn) - National rail network</li>
                        <li>• ICE high-speed trains between cities</li>
                        <li>• Excellent urban public transport systems</li>
                        <li>• BlaBlaCar for ride-sharing</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">Pro Tip:</p>
                      <p className="text-xs text-yellow-700">
                        Book train tickets in advance for significant savings, especially for long-distance travel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Germany Schengen Calculator FAQ
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about traveling to Germany under Schengen rules
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long can I stay in Germany without a visa?
                </h3>
                <p className="text-gray-600">
                  Citizens of visa-exempt countries can stay in Germany for up to 90 days within any 180-day period
                  under the Schengen agreement. This applies to tourism, business meetings, and short-term visits.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Does time spent in other Schengen countries count towards my Germany limit?
                </h3>
                <p className="text-gray-600">
                  Yes, the 90/180 day rule applies to the entire Schengen area, not individual countries.
                  Time spent in France, Italy, or any other Schengen country counts towards your total allowance.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is the Entry/Exit System (EES) starting in 2025?
                </h3>
                <p className="text-gray-600">
                  The EES is a new digital border management system launching in 2025 that will automatically
                  record entry and exit dates using biometric data. This will replace manual passport stamping
                  and help ensure accurate tracking of your Schengen stays.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I work in Germany on a tourist visa?
                </h3>
                <p className="text-gray-600">
                  No, tourist visas (or visa-free stays) do not permit employment in Germany. You can attend
                  business meetings, conferences, or negotiate contracts, but any paid work requires a proper work visa.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What happens if I overstay my 90 days in Germany?
                </h3>
                <p className="text-gray-600">
                  Overstaying can result in fines, deportation, and bans from entering the Schengen area for
                  several years. Use our calculator to track your stays and ensure compliance with German immigration law.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is this calculator accurate for Germany immigration purposes?
                </h3>
                <p className="text-gray-600">
                  Our calculator follows the official EU regulations for the 90/180 day rule. However, always verify
                  your specific situation with German immigration authorities, especially for complex travel patterns
                  or special circumstances.
                </p>
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
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="#calculator">Calculate My Germany Stays</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/schengen-calculator">Full Schengen Calculator</Link>
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Join thousands of travelers who trust our calculator for their European adventures
            </p>
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