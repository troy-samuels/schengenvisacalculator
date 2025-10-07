'use client'

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@schengen/ui'
import {
  MapPin,
  Calendar,
  Plane,
  Train,
  Ship,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Building,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react'

const metadata: Metadata = {
  title: 'Italy EES Implementation 2025: Complete Border Requirements Guide | EU Border Authority',
  description: 'Complete guide to EES implementation in Italy. Border requirements, airport procedures, cruise terminals, and Alpine crossings for international travelers.',
  keywords: [
    'Italy EES implementation',
    'Italy EES requirements',
    'Italy EU border control',
    'Italy airport EES',
    'Italy border biometrics',
    'Italy cruise EES',
    'Italy EES schedule',
    'Italy travel EES',
    'Italy entry exit system',
    'Rome airport EES',
    'Milan airport EES'
  ],
  openGraph: {
    title: 'Italy EES Implementation 2025: Complete Border Requirements Guide',
    description: 'Everything travelers need to know about EES implementation in Italy. Airports, cruise terminals, and Alpine border procedures.',
    type: 'article',
    url: '/ees/countries/italy'
  }
}

export default function ItalyEESPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/ees" className="hover:text-blue-600">EES System</Link>
            <span>/</span>
            <Link href="/ees/countries" className="hover:text-blue-600">Countries</Link>
            <span>/</span>
            <span className="text-gray-900">Italy</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-red-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🇮🇹</span>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                ✅ Ready for October 19, 2025
              </span>
              <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                🚢 Cruise Hub Leader
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Italy EES Implementation
              <span className="block text-blue-600">Complete Border Guide</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything travelers need to know about EES implementation in Italy.
              Airports, cruise terminals, Alpine crossings, and border procedures.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">Oct 19</div>
              <div className="text-gray-600">Launch Date</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">88%</div>
              <div className="text-gray-600">Readiness</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">175</div>
              <div className="text-gray-600">Border Points</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">65M</div>
              <div className="text-gray-600">Annual Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Status */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Implementation Status & Timeline
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-50 rounded-xl p-8">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-4">Current Status: Ready</h3>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Major airports equipped (Rome FCO, Milan MXP, Venice)
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Cruise terminals in Civitavecchia and Venice ready
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Alpine border crossings with Switzerland prepared
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Staff training completed at 88% of locations
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-8">
              <Calendar className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-4">Rollout Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">October 19, 2025</div>
                    <div className="text-blue-700 text-sm">Major airports go live (FCO, MXP, VCE)</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">October 26, 2025</div>
                    <div className="text-blue-700 text-sm">Cruise terminals and regional airports</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">November 9, 2025</div>
                    <div className="text-blue-700 text-sm">All border crossings operational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Entry Points */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Entry Points for International Travelers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Airports */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Plane className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Major Airports</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✈️ Rome Fiumicino (FCO)</h4>
                  <p className="text-blue-800 text-sm">
                    Italy's busiest airport, dedicated EES halls in Terminal 1 & 3
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">What to Expect:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Self-service EES kiosks in arrival halls</li>
                    <li>• Multilingual staff assistance available</li>
                    <li>• Additional 10-15 minutes for first-time users</li>
                    <li>• Fast-track lanes for EU citizens</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Use mobile pre-registration before arrival
                  </span>
                </div>
              </div>
            </div>

            {/* Cruise Terminals */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Ship className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Cruise Terminals</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">🚢 Civitavecchia & Venice</h4>
                  <p className="text-green-800 text-sm">
                    Major cruise hubs with dedicated EES processing areas
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Process:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• EES registration upon disembarkation</li>
                    <li>• Group processing for tour excursions</li>
                    <li>• Mobile EES units for large ships</li>
                    <li>• Coordination with cruise line staff</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Allow extra 45 minutes for large ships
                  </span>
                </div>
              </div>
            </div>

            {/* Land Borders */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Train className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Alpine Crossings</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">🚗 Switzerland Border</h4>
                  <p className="text-purple-800 text-sm">
                    Como, Chiasso, and major Alpine passes
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Border Process:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Drive-through EES stations</li>
                    <li>• Passengers exit vehicles for registration</li>
                    <li>• Separate processing for non-EU nationals</li>
                    <li>• Coordination with Swiss authorities</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Check both Swiss and Italian requirements
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specific Requirements */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Italy-Specific Requirements
          </h2>

          <div className="space-y-8">
            {/* Tourism Focus */}
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Tourist Travel Considerations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">High-Season Considerations</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Summer months: expect longer processing times</li>
                    <li>• Cruise season: coordinate with ship schedules</li>
                    <li>• Holiday periods: allow extra time at borders</li>
                    <li>• Tour groups: group registration available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Required Documents</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Valid passport (6+ months remaining)</li>
                    <li>• Proof of accommodation in Italy</li>
                    <li>• Return/onward travel documentation</li>
                    <li>• Travel insurance (recommended)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Travelers */}
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3" />
                Business Travel to Italy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Business Documentation</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Italian company invitation letter</li>
                    <li>• Trade fair or conference registration</li>
                    <li>• Employer confirmation of business purpose</li>
                    <li>• Meeting schedules and venue confirmations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Industry Hubs</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Milan: Fashion, finance, manufacturing</li>
                    <li>• Rome: Government, international organizations</li>
                    <li>• Bologna: Trade fairs and logistics</li>
                    <li>• Turin: Automotive and technology</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cruise Passengers */}
            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
                <Ship className="w-6 h-6 mr-3" />
                Cruise Passenger Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Pre-Boarding Requirements</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Complete EES registration before shore excursions</li>
                    <li>• Coordinate with cruise line EES coordinators</li>
                    <li>• Carry passport for all shore excursions</li>
                    <li>• Understand multi-port EES implications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Shore Excursion Process</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Group EES processing for organized tours</li>
                    <li>• Individual registration for independent travel</li>
                    <li>• Re-boarding verification via EES system</li>
                    <li>• Emergency contact with ship representatives</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Emergency Contacts & Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Embassy Rome</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-600">+39 06 4674 1</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-600">24/7 Emergency Service</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-blue-600 mr-3 mt-1" />
                  <span className="text-gray-600 text-sm">
                    Check with your embassy for specific location
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Italian Border Police</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-600">+39 800 098 707</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-600">24/7 EES Support</span>
                </div>
                <div className="text-gray-600 text-sm">
                  Dedicated helpline for EES-related issues and technical problems
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Airport & Port Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">Rome FCO</div>
                  <div className="text-gray-600 text-sm">+39 06 65951</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Milan Malpensa</div>
                  <div className="text-gray-600 text-sm">+39 02 232323</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Venice Airport</div>
                  <div className="text-gray-600 text-sm">+39 041 2609240</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Items */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prepare for Italy EES Implementation
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get ready for smooth border crossings with our comprehensive preparation resources.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/ees/preparation"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              EES Preparation Guide
            </Link>
            <Link
              href="/ees/vs-etias"
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              EES vs ETIAS Guide
            </Link>
            <Link
              href="/schengen"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Schengen Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Italy EES Implementation 2025: Complete Border Requirements Guide",
            "description": "Comprehensive guide to EES implementation in Italy including airport procedures, cruise terminals, Alpine crossings, and specific requirements for international travelers.",
            "author": {
              "@type": "Organization",
              "name": "EU Border Authority"
            },
            "publisher": {
              "@type": "Organization",
              "name": "EU Border Authority",
              "logo": {
                "@type": "ImageObject",
                "url": "https://euborder.com/logo.png"
              }
            },
            "datePublished": "2025-01-01",
            "dateModified": "2025-01-01",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://euborder.com/ees/countries/italy"
            },
            "about": {
              "@type": "Place",
              "name": "Italy",
              "description": "EES implementation guide for Italy"
            },
            "articleSection": "EES Country Guides",
            "keywords": ["Italy EES", "Italy border requirements", "Rome airport EES", "Italy cruise EES"],
            "locationCreated": {
              "@type": "Country",
              "name": "Italy"
            }
          })
        }}
      />
    </div>
  )
}