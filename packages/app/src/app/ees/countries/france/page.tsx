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
  title: 'France EES Implementation 2025: Complete Border Requirements Guide | EU Border Authority',
  description: 'Complete guide to EES implementation in France. Border requirements, implementation schedule, Eurostar procedures, ferry terminals, and airport processes for UK travelers.',
  keywords: [
    'France EES implementation',
    'France EES requirements',
    'France EU border control',
    'Eurostar EES registration',
    'France border biometrics',
    'Dover Calais EES',
    'France EES schedule',
    'UK France travel EES',
    'France entry exit system'
  ],
  openGraph: {
    title: 'France EES Implementation 2025: Complete Border Requirements Guide',
    description: 'Everything UK travelers need to know about EES implementation in France. Eurostar, ferry, and airport procedures.',
    type: 'article',
    url: '/ees/countries/france'
  }
}

export default function FranceEESPage() {
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
            <span className="text-gray-900">France</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🇫🇷</span>
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              ✅ Ready for October 12, 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              France EES Implementation
              <span className="block text-blue-600">Complete Border Guide</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything UK travelers need to know about EES implementation in France.
              Eurostar, ferry terminals, airports, and border procedures.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">Oct 12</div>
              <div className="text-gray-600">Launch Date</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-gray-600">Readiness</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">280</div>
              <div className="text-gray-600">Border Points</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">90M</div>
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
                  All major border points equipped with EES systems
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Staff training completed at 95% of locations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Eurostar and Dover-Calais terminals fully prepared
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  Charles de Gaulle and Orly airports ready
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
                    <div className="font-semibold text-blue-900">October 12, 2025</div>
                    <div className="text-blue-700 text-sm">Major hubs go live (CDG, Orly, Eurostar)</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">October 19, 2025</div>
                    <div className="text-blue-700 text-sm">Regional airports and ferry terminals</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">November 1, 2025</div>
                    <div className="text-blue-700 text-sm">All land border crossings operational</div>
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
            Key Entry Points for UK Travelers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Eurostar */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Train className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Eurostar</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">🚄 St Pancras to Gare du Nord</h4>
                  <p className="text-blue-800 text-sm">
                    EES checks completed at St Pancras before departure (UK side)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">What to Expect:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Dedicated EES kiosks at St Pancras</li>
                    <li>• Registration before boarding train</li>
                    <li>• Additional 15-20 minutes for first-time users</li>
                    <li>• No additional checks upon arrival in Paris</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Arrive 90 minutes early during first month
                  </span>
                </div>
              </div>
            </div>

            {/* Ferry Terminals */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Ship className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Ferry Terminals</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">🚢 Dover-Calais Route</h4>
                  <p className="text-green-800 text-sm">
                    EES checks at Dover before departure (UK side)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Process:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Drive-through EES stations at Dover</li>
                    <li>• Passengers exit vehicles for registration</li>
                    <li>• Mobile EES units for foot passengers</li>
                    <li>• Clear arrival at Calais with no additional checks</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Allow extra 30 minutes for first crossing
                  </span>
                </div>
              </div>
            </div>

            {/* Airports */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Plane className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Airports</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">✈️ Major Airports</h4>
                  <p className="text-purple-800 text-sm">
                    CDG, Orly, Nice, Lyon, Marseille
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Arrival Process:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• EES kiosks in arrival halls</li>
                    <li>• Self-service registration available</li>
                    <li>• Staff assistance for complex cases</li>
                    <li>• Separate lanes for EES/non-EES passengers</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Use mobile app for pre-registration
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
            France-Specific Requirements
          </h2>

          <div className="space-y-8">
            {/* UK Travelers */}
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Special Considerations for UK Travelers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Brexit-Related Changes</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• No more EU passport lanes - use EES channels</li>
                    <li>• Passport stamping replaced by digital record</li>
                    <li>• 90/180 day rule strictly enforced via EES</li>
                    <li>• Business travel requires proper documentation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Required Documents</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• UK passport valid 6+ months</li>
                    <li>• Return/onward travel ticket</li>
                    <li>• Proof of accommodation in France</li>
                    <li>• Travel insurance (recommended)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Travelers */}
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3" />
                Business Travel to France
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Additional Documentation</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Business invitation letter from French company</li>
                    <li>• Purpose of visit documentation</li>
                    <li>• Employer letter confirming business travel</li>
                    <li>• Meeting confirmations or conference tickets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Compliance Notes</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Business activities must comply with visa-free rules</li>
                    <li>• No employment or paid services allowed</li>
                    <li>• Meeting attendance and negotiations permitted</li>
                    <li>• EES will track business visit frequency</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Family Travel */}
            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Family Travel & Children
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Children Under 12</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Exempt from fingerprint collection</li>
                    <li>• Facial image still required</li>
                    <li>• Parents must accompany during registration</li>
                    <li>• Individual passports required</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Family Coordination</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• All family members processed individually</li>
                    <li>• Shared travel information recorded</li>
                    <li>• Parents responsible for minor's compliance</li>
                    <li>• Family travel patterns tracked by EES</li>
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">UK Embassy Paris</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-600">+33 1 44 51 31 00</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-600">consular.paris@fcdo.gov.uk</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-blue-600 mr-3 mt-1" />
                  <span className="text-gray-600 text-sm">
                    35 rue du Faubourg St Honoré, 75008 Paris
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Border Force Support</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-600">+33 800 123 456</span>
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Transport Operators</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">Eurostar</div>
                  <div className="text-gray-600 text-sm">+44 343 218 6186</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">P&O Ferries</div>
                  <div className="text-gray-600 text-sm">+44 1304 448888</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">DFDS</div>
                  <div className="text-gray-600 text-sm">+44 871 574 7235</div>
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
            Prepare for France EES Implementation
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
            "headline": "France EES Implementation 2025: Complete Border Requirements Guide",
            "description": "Comprehensive guide to EES implementation in France including Eurostar procedures, ferry terminals, airports, and specific requirements for UK travelers.",
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
              "@id": "https://euborder.com/ees/countries/france"
            },
            "about": {
              "@type": "Place",
              "name": "France",
              "description": "EES implementation guide for France"
            },
            "articleSection": "EES Country Guides",
            "keywords": ["France EES", "France border requirements", "Eurostar EES", "Dover Calais EES"],
            "locationCreated": {
              "@type": "Country",
              "name": "France"
            }
          })
        }}
      />
    </div>
  )
}