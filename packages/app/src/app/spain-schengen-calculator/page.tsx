import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, MapPin, Clock, Users, CheckCircle, AlertTriangle, Phone, Mail, ExternalLink } from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'

export const metadata: Metadata = {
  title: 'Spain Schengen Calculator 2025: 90/180 Day Rule Tracker | Free Tool',
  description: 'Free Spain Schengen calculator for 90/180 day rule compliance. Track your stay in Spain and EU, avoid overstay penalties. Essential for digital nomads and travelers.',
  keywords: ['Spain Schengen calculator', 'Spain 90/180 rule', 'Spain visa calculator', 'Spain travel days', 'Schengen Spain tracker', 'Spain visitor visa', 'Barcelona Schengen', 'Madrid visa rules'],
  openGraph: {
    title: 'Spain Schengen Calculator 2025: Track Your 90/180 Days',
    description: 'Essential tool for Spain travelers: Calculate your Schengen days, avoid overstay penalties, ensure compliance.',
    images: [
      {
        url: '/spain-schengen-og.png',
        width: 1200,
        height: 630,
        alt: 'Spain Schengen Calculator - 90/180 Day Rule Tracker',
      },
    ],
  },
}

export default function SpainSchengenCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-8 bg-red-600 mr-2"></div>
            <div className="w-12 h-8 bg-yellow-400 mr-2"></div>
            <div className="w-12 h-8 bg-red-600"></div>
            <Calculator className="ml-4 w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Spain Schengen Calculator
            <span className="block text-2xl md:text-3xl text-red-600 mt-2">
              Track Your 90/180 Day Rule Compliance
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Essential tool for travelers to Spain and the Schengen Area. Calculate your stay days,
            avoid overstay penalties, and ensure perfect compliance with EU immigration rules.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schengen-calculator"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Calculator className="mr-2 w-5 h-5" />
              Start Calculator
            </Link>
            <Link
              href="#spain-guide"
              className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Spain Travel Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-white/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <MapPin className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">29 Countries</div>
              <div className="text-gray-600">Schengen Area</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">90 Days</div>
              <div className="text-gray-600">Maximum Stay</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">60+ Countries</div>
              <div className="text-gray-600">Visa-Free Access</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">€500-1000+</div>
              <div className="text-gray-600">Overstay Penalties</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spain-Specific Information */}
      <section id="spain-guide" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Spain Schengen Travel Guide 2025
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Entry Requirements</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Valid passport (6+ months remaining)
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  EES registration (biometric system, 2025)
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Return/onward ticket
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Proof of accommodation
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Sufficient funds (€100/day recommended)
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">90/180 Rule for Spain</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  90 days maximum in ANY 180-day period
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  Applies to ENTIRE Schengen Area
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  Rolling calculation (not calendar-based)
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  Entry and exit days both count
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  Must track ALL Schengen countries
                </li>
              </ul>
            </div>
          </div>

          {/* Popular Spanish Destinations */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Popular Spanish Destinations</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-red-600 mb-2">Barcelona</h4>
                <p className="text-gray-700 mb-3">
                  Catalonia's vibrant capital with stunning architecture, beaches, and nightlife.
                </p>
                <div className="text-sm text-gray-600">
                  <div>• Sagrada Família</div>
                  <div>• Park Güell</div>
                  <div>• Gothic Quarter</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-red-600 mb-2">Madrid</h4>
                <p className="text-gray-700 mb-3">
                  Spain's capital with world-class museums, parks, and Spanish culture.
                </p>
                <div className="text-sm text-gray-600">
                  <div>• Prado Museum</div>
                  <div>• Retiro Park</div>
                  <div>• Royal Palace</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-red-600 mb-2">Seville</h4>
                <p className="text-gray-700 mb-3">
                  Andalusian charm with flamenco, historic architecture, and authentic cuisine.
                </p>
                <div className="text-sm text-gray-600">
                  <div>• Alcázar Palace</div>
                  <div>• Seville Cathedral</div>
                  <div>• Barrio Santa Cruz</div>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Nomad Information */}
          <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Spain for Digital Nomads</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">Why Choose Spain?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Excellent work-life balance culture</li>
                  <li>• Fast internet (average 100+ Mbps)</li>
                  <li>• Vibrant co-working scene</li>
                  <li>• Affordable cost of living</li>
                  <li>• Perfect climate year-round</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-3">New Digital Nomad Visa</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 1-5 year renewable visa</li>
                  <li>• €2,000-3,000/month income requirement</li>
                  <li>• 15% tax rate (first 4 years)</li>
                  <li>• Family inclusion available</li>
                  <li>• EU mobility benefits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Spain Travel Info</h3>
              <div className="space-y-3 text-gray-700">
                <div><strong>Currency:</strong> Euro (EUR)</div>
                <div><strong>Language:</strong> Spanish (Castilian)</div>
                <div><strong>Time Zone:</strong> CET (UTC+1)</div>
                <div><strong>Emergency Number:</strong> 112</div>
                <div><strong>Electricity:</strong> 230V, Type C/F plugs</div>
                <div><strong>Tipping:</strong> 5-10% in restaurants</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Border Control & Immigration</h3>
              <div className="space-y-3 text-gray-700">
                <div><strong>Main Airports:</strong> Madrid (MAD), Barcelona (BCN)</div>
                <div><strong>Border Checks:</strong> EU/Schengen citizens - ID only</div>
                <div><strong>Passport Control:</strong> Non-EU citizens</div>
                <div><strong>Customs:</strong> Green/Red channel system</div>
                <div className="flex items-center text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Always carry passport for official identification
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-12 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Track Your Spain Travel Days?</h3>
          <p className="text-lg mb-6 opacity-90">
            Use our free calculator to ensure perfect Schengen compliance and avoid costly overstay penalties.
          </p>
          <Link
            href="/schengen-calculator"
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <Calculator className="mr-2 w-5 h-5" />
            Calculate Your Days Now
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Spain Schengen FAQ
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I stay in Spain for 90 days then move to another Schengen country?
              </h3>
              <p className="text-gray-700">
                No. The 90/180 rule applies to the entire Schengen Area collectively, not individual countries.
                If you spend 90 days in Spain, you've used your full Schengen allowance and must exit the entire area.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I overstay in Spain?
              </h3>
              <p className="text-gray-700">
                Overstaying can result in fines (€500-1,000+), deportation, and entry bans (1-5 years) from all Schengen countries.
                Spanish authorities take violations seriously and share information with other EU countries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the EES system launching in 2025?
              </h3>
              <p className="text-gray-700">
                The Entry/Exit System (EES) launches in 2025 to digitally record all border crossings.
                Non-EU travelers will provide biometric data (fingerprints, facial scan) at first entry,
                creating a digital record that tracks compliance with the 90/180 rule automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I work remotely in Spain on a tourist visa?
              </h3>
              <p className="text-gray-700">
                Generally yes, if you're working for a non-EU company and not providing services to Spanish clients.
                However, Spain now offers a dedicated Digital Nomad Visa for longer stays with better tax benefits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the Spain Schengen calculator?
              </h3>
              <p className="text-gray-700">
                Our calculator uses the official EU methodology for 90/180 day calculations and is updated regularly
                to reflect current immigration rules. It's used by thousands of travelers for accurate compliance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Help with Spain Travel Planning?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-3">Official Resources</h4>
              <div className="space-y-2 text-gray-700">
                <a href="https://www.sanidad.gob.es/" className="flex items-center justify-center hover:text-red-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Spanish Ministry of Health
                </a>
                <a href="https://www.policia.es/" className="flex items-center justify-center hover:text-red-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Spanish National Police
                </a>
                <a href="https://www.exteriores.gob.es/" className="flex items-center justify-center hover:text-red-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Spanish Ministry of Foreign Affairs
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-3">Our Tools</h4>
              <div className="space-y-2">
                <Link href="/schengen-calculator" className="block text-gray-700 hover:text-red-600">
                  Free Schengen Calculator
                </Link>
                <Link href="/90-180-day-rule" className="block text-gray-700 hover:text-red-600">
                  90/180 Rule Explained
                </Link>
                <Link href="/blog" className="block text-gray-700 hover:text-red-600">
                  Travel Compliance Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Schema Markup */}
      <EnhancedSchema
        page="country"
        country="Spain"
        title="Spain Schengen Calculator 2025: 90/180 Day Rule Tracker"
        description="Free Spain Schengen calculator for 90/180 day rule compliance. Track your stay in Spain and EU, avoid overstay penalties. Essential for digital nomads and travelers."
        url="https://schengentracker.com/spain-schengen-calculator"
        breadcrumbs={[
          { name: 'Home', url: 'https://schengentracker.com' },
          { name: 'Schengen Calculator', url: 'https://schengentracker.com/schengen-calculator' },
          { name: 'Spain Calculator', url: 'https://schengentracker.com/spain-schengen-calculator' }
        ]}
        howToSteps={[
          {
            name: 'Select your first Spain entry date',
            text: 'Choose the date you first entered Spain or any Schengen country to start tracking your 180-day rolling period.',
            url: 'https://schengentracker.com/spain-schengen-calculator#step1'
          },
          {
            name: 'Add all your Spain and Schengen trips',
            text: 'Input every entry and exit date for Spain and other Schengen countries. The calculator will track your cumulative stay.',
            url: 'https://schengentracker.com/spain-schengen-calculator#step2'
          },
          {
            name: 'Check your Spain compliance status',
            text: 'Review how many days you have left in Spain and the entire Schengen area based on the 90/180 day rule.',
            url: 'https://schengentracker.com/spain-schengen-calculator#step3'
          },
          {
            name: 'Plan your return to Spain',
            text: 'Use the results to plan when you can safely return to Spain without violating the Schengen visa rules.',
            url: 'https://schengentracker.com/spain-schengen-calculator#step4'
          }
        ]}
        faqItems={[
          {
            question: 'How long can I stay in Spain without a visa?',
            answer: 'Citizens of visa-exempt countries can stay in Spain for up to 90 days within any 180-day period under the Schengen agreement.'
          },
          {
            question: 'Does time in other Schengen countries count towards my Spain limit?',
            answer: 'Yes, the 90/180 day rule applies to the entire Schengen area. Time spent in France, Germany, or other Schengen countries counts towards your total.'
          },
          {
            question: 'What is the EES system starting in 2025?',
            answer: 'The Entry/Exit System (EES) launching in 2025 will automatically record your entry and exit dates using biometric data, replacing manual passport stamping.'
          }
        ]}
      />
    </div>
  )
}