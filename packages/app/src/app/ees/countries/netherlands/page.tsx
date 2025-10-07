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
  title: 'Netherlands EES Implementation 2025: Schiphol Airport & Border Guide | EU Border Authority',
  description: 'Complete guide to EES implementation in Netherlands. Schiphol Airport procedures, seaport entries, and border requirements for international travelers.',
  keywords: [
    'Netherlands EES implementation',
    'Netherlands EES requirements',
    'Schiphol airport EES',
    'Netherlands border control',
    'Netherlands border biometrics',
    'Amsterdam airport EES',
    'Netherlands EES schedule',
    'Netherlands travel EES',
    'Netherlands entry exit system',
    'Schiphol EES registration'
  ],
  openGraph: {
    title: 'Netherlands EES Implementation 2025: Schiphol Airport & Border Guide',
    description: 'Everything travelers need to know about EES implementation in Netherlands. Schiphol Airport procedures and border requirements.',
    type: 'article',
    url: '/ees/countries/netherlands'
  }
}

export default function NetherlandsEESPage() {
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
            <span className="text-gray-900">Netherlands</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🇳🇱</span>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-800 rounded-full">
                🧪 Testing Phase Complete
              </span>
              <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                ✈️ Major European Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Netherlands EES Implementation
              <span className="block text-blue-600">Schiphol & Border Guide</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything travelers need to know about EES implementation in the Netherlands.
              Schiphol Airport procedures, seaports, and border requirements.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">Oct 26</div>
              <div className="text-gray-600">Launch Date</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-gray-600">Readiness</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-gray-600">Border Points</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">20M</div>
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
            <div className="bg-orange-50 rounded-xl p-8">
              <Clock className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-orange-900 mb-4">Current Status: Final Testing</h3>
              <ul className="space-y-3 text-orange-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                  Schiphol Airport EES systems fully installed
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                  Staff training completed at major entry points
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                  Rotterdam and Amsterdam seaports prepared
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                  Final system integration testing in progress
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
                    <div className="font-semibold text-blue-900">October 26, 2025</div>
                    <div className="text-blue-700 text-sm">Schiphol Airport launches EES</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">November 2, 2025</div>
                    <div className="text-blue-700 text-sm">Seaports and regional airports</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-blue-900">November 16, 2025</div>
                    <div className="text-blue-700 text-sm">Land borders fully operational</div>
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

            {/* Schiphol Airport */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Plane className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Schiphol Airport</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✈️ Europe's 4th Busiest Airport</h4>
                  <p className="text-blue-800 text-sm">
                    Major European hub with dedicated EES processing areas
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">What to Expect:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Advanced EES kiosks in all arrival halls</li>
                    <li>• Multilingual staff support available</li>
                    <li>• Fast-track processing for frequent travelers</li>
                    <li>• Integration with existing airport systems</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Allow extra 15-20 minutes during launch month
                  </span>
                </div>
              </div>
            </div>

            {/* Seaports */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Ship className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Major Seaports</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">🚢 Rotterdam & Amsterdam</h4>
                  <p className="text-green-800 text-sm">
                    Europe's largest port and cruise terminals
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Process:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• EES kiosks at passenger terminals</li>
                    <li>• Cargo vessel crew processing areas</li>
                    <li>• Cruise passenger group registration</li>
                    <li>• Integration with port security systems</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Check with port operator for specific procedures
                  </span>
                </div>
              </div>
            </div>

            {/* Land Borders */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Train className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Land Borders</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">🚗 Germany & Belgium</h4>
                  <p className="text-purple-800 text-sm">
                    Major highway crossings and rail connections
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Border Process:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Limited checks due to Schengen agreement</li>
                    <li>• Spot checks may include EES verification</li>
                    <li>• Non-EU nationals subject to entry checks</li>
                    <li>• Enhanced controls during high-risk periods</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-2" />
                  <span className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Carry passport for potential checks
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
            Netherlands-Specific Requirements
          </h2>

          <div className="space-y-8">
            {/* Business Hub */}
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3" />
                Business Travel Hub
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Major Business Sectors</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• International trade and logistics</li>
                    <li>• Financial services and fintech</li>
                    <li>• Technology and innovation</li>
                    <li>• Energy and sustainability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Required Documents</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Valid passport (6+ months remaining)</li>
                    <li>• Dutch company invitation letter</li>
                    <li>• Business meeting confirmations</li>
                    <li>• Return/onward travel documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transit Passengers */}
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center">
                <Plane className="w-6 h-6 mr-3" />
                Transit Passengers at Schiphol
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">EES Requirements</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Transit passengers may need EES registration</li>
                    <li>• Depends on nationality and final destination</li>
                    <li>• Airport transit visas may still apply</li>
                    <li>• Check with airline for specific requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Transit Process</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Separate EES area for transit passengers</li>
                    <li>• Quick registration for eligible travelers</li>
                    <li>• No need to collect luggage</li>
                    <li>• Direct connection to departure gates</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Digital Services */}
            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Digital Services & Innovation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">EES Digital Integration</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Advanced mobile app pre-registration</li>
                    <li>• QR code system for faster processing</li>
                    <li>• Integration with Dutch digital identity</li>
                    <li>• Real-time border wait time updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Smart Border Features</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Biometric corridor technology</li>
                    <li>• Automated passport control gates</li>
                    <li>• AI-assisted risk assessment</li>
                    <li>• Contactless processing options</li>
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Embassy The Hague</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-600">+31 70 427 0427</span>
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Dutch Border Police</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-600">+31 900 8844</span>
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Transport Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">Schiphol Airport</div>
                  <div className="text-gray-600 text-sm">+31 20 794 0800</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rotterdam Port</div>
                  <div className="text-gray-600 text-sm">+31 10 252 1010</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">NS Railway</div>
                  <div className="text-gray-600 text-sm">+31 30 751 5155</div>
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
            Prepare for Netherlands EES Implementation
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
            "headline": "Netherlands EES Implementation 2025: Schiphol Airport & Border Guide",
            "description": "Comprehensive guide to EES implementation in Netherlands including Schiphol Airport procedures, seaports, and border requirements for international travelers.",
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
              "@id": "https://euborder.com/ees/countries/netherlands"
            },
            "about": {
              "@type": "Place",
              "name": "Netherlands",
              "description": "EES implementation guide for Netherlands"
            },
            "articleSection": "EES Country Guides",
            "keywords": ["Netherlands EES", "Schiphol airport EES", "Netherlands border requirements"],
            "locationCreated": {
              "@type": "Country",
              "name": "Netherlands"
            }
          })
        }}
      />
    </div>
  )
}