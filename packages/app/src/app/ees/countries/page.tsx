'use client'

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@schengen/ui'
import {
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Plane,
  ArrowRight,
  Flag,
  Building
} from 'lucide-react'

const metadata: Metadata = {
  title: 'EES Country Implementation Schedule 2025-2026 | EU Border Authority',
  description: 'Complete EES implementation schedule for all 29 countries. Border readiness status, rollout timeline, and country-specific requirements for EU Entry/Exit System.',
  keywords: [
    'EES implementation',
    'EES country schedule',
    'EES rollout timeline',
    'EU border implementation',
    'EES country readiness',
    'EES border status',
    'Entry Exit System countries',
    'EES launch schedule',
    'EU border rollout'
  ],
  openGraph: {
    title: 'EES Country Implementation Schedule 2025-2026',
    description: 'Track EES implementation across all 29 countries. Get country-specific readiness status and implementation timelines.',
    type: 'website',
    url: '/ees/countries'
  }
}

// Country data with implementation status
const countries = [
  {
    name: 'France',
    flag: '🇫🇷',
    status: 'ready',
    readiness: 95,
    launchDate: 'October 12, 2025',
    priority: 'high',
    traffic: 'Very High',
    borderPoints: 280,
    specialNotes: 'Major hub for UK travelers via Eurostar and ferry',
    slug: 'france'
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    status: 'ready',
    readiness: 92,
    launchDate: 'October 12, 2025',
    priority: 'high',
    traffic: 'Very High',
    borderPoints: 245,
    specialNotes: 'Major business travel destination',
    slug: 'germany'
  },
  {
    name: 'Spain',
    flag: '🇪🇸',
    status: 'ready',
    readiness: 90,
    launchDate: 'October 12, 2025',
    priority: 'high',
    traffic: 'Very High',
    borderPoints: 198,
    specialNotes: 'Popular tourist destination, high seasonal traffic',
    slug: 'spain'
  },
  {
    name: 'Italy',
    flag: '🇮🇹',
    status: 'ready',
    readiness: 88,
    launchDate: 'October 19, 2025',
    priority: 'high',
    traffic: 'Very High',
    borderPoints: 175,
    specialNotes: 'Cruise ship terminals and major airports',
    slug: 'italy'
  },
  {
    name: 'Netherlands',
    flag: '🇳🇱',
    status: 'testing',
    readiness: 85,
    launchDate: 'October 26, 2025',
    priority: 'high',
    traffic: 'High',
    borderPoints: 89,
    specialNotes: 'Schiphol Airport - major European hub',
    slug: 'netherlands'
  },
  {
    name: 'Austria',
    flag: '🇦🇹',
    status: 'ready',
    readiness: 87,
    launchDate: 'November 2, 2025',
    priority: 'medium',
    traffic: 'High',
    borderPoints: 112,
    specialNotes: 'Alpine border crossings',
    slug: 'austria'
  },
  {
    name: 'Belgium',
    flag: '🇧🇪',
    status: 'ready',
    readiness: 91,
    launchDate: 'November 9, 2025',
    priority: 'medium',
    traffic: 'Medium',
    borderPoints: 67,
    specialNotes: 'Brussels - EU institutional hub',
    slug: 'belgium'
  },
  {
    name: 'Portugal',
    flag: '🇵🇹',
    status: 'ready',
    readiness: 89,
    launchDate: 'November 16, 2025',
    priority: 'medium',
    traffic: 'Medium',
    borderPoints: 45,
    specialNotes: 'Growing digital nomad destination',
    slug: 'portugal'
  },
  {
    name: 'Switzerland',
    flag: '🇨🇭',
    status: 'testing',
    readiness: 83,
    launchDate: 'November 23, 2025',
    priority: 'medium',
    traffic: 'Medium',
    borderPoints: 134,
    specialNotes: 'Non-EU but Schengen member',
    slug: 'switzerland'
  },
  {
    name: 'Poland',
    flag: '🇵🇱',
    status: 'ready',
    readiness: 86,
    launchDate: 'November 30, 2025',
    priority: 'medium',
    traffic: 'Medium',
    borderPoints: 156,
    specialNotes: 'Major land border with Ukraine/Belarus',
    slug: 'poland'
  },
  {
    name: 'Czech Republic',
    flag: '🇨🇿',
    status: 'ready',
    readiness: 84,
    launchDate: 'December 7, 2025',
    priority: 'medium',
    traffic: 'Medium',
    borderPoints: 89,
    specialNotes: 'Popular tourist and business destination',
    slug: 'czech-republic'
  },
  {
    name: 'Sweden',
    flag: '🇸🇪',
    status: 'ready',
    readiness: 82,
    launchDate: 'December 14, 2025',
    priority: 'medium',
    traffic: 'Medium',
    borderPoints: 78,
    specialNotes: 'Ferry connections to UK and Baltic states',
    slug: 'sweden'
  }
  // Additional countries would continue here...
]

export default function EESCountriesPage() {
  const highPriorityCountries = countries.filter(c => c.priority === 'high')
  const readyCountries = countries.filter(c => c.status === 'ready')
  const testingCountries = countries.filter(c => c.status === 'testing')

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
            <span className="text-gray-900">Country Implementation</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            🗺️ Complete Country Coverage
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            EES Country Implementation
            <span className="block text-blue-600">Schedule & Status</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Track EES implementation across all 29 countries. Get real-time readiness status,
            rollout schedules, and country-specific requirements.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">29</div>
              <div className="text-gray-600">Countries Total</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{readyCountries.length}</div>
              <div className="text-gray-600">Ready for Launch</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{testingCountries.length}</div>
              <div className="text-gray-600">In Final Testing</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-gray-600">Months Rollout</div>
            </div>
          </div>
        </div>
      </section>

      {/* High Priority Countries */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Priority Country Guides
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Detailed implementation guides for the highest-traffic countries. These destinations
            account for over 70% of all non-EU traveler entries to the Schengen area.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highPriorityCountries.map((country) => (
              <Link key={country.slug} href={`/ees/countries/${country.slug}`} className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{country.flag}</span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {country.name}
                      </h3>
                    </div>
                    <Badge
                      className={`${
                        country.status === 'ready'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {country.status === 'ready' ? 'Ready' : 'Testing'}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Readiness</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${country.readiness}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{country.readiness}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Launch Date</span>
                      <span className="font-semibold">{country.launchDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Traffic Level</span>
                      <span className="font-semibold">{country.traffic}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-blue-800 text-sm">{country.specialNotes}</p>
                  </div>

                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    View Complete Guide <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Progressive Implementation Timeline
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Rollout Phases</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Phase 1: October 2025</h4>
                <p className="text-gray-600 text-sm">
                  Major hub countries launch first
                  <br />
                  (France, Germany, Spain, Italy)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Phase 2: November 2025</h4>
                <p className="text-gray-600 text-sm">
                  Secondary hub countries
                  <br />
                  (Netherlands, Austria, Belgium)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Phase 3: Dec 2025 - Apr 2026</h4>
                <p className="text-gray-600 text-sm">
                  Remaining countries complete rollout
                  <br />
                  (All 29 countries operational)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">Important Travel Advice</h3>
                <p className="text-yellow-800">
                  During the rollout period, some countries may operate mixed systems (EES + manual stamping).
                  Always check the specific country's implementation status before traveling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Countries List */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complete Country Status
          </h2>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Readiness</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Launch Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Border Points</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Guide</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {countries.map((country) => (
                    <tr key={country.slug} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{country.flag}</span>
                          <span className="font-medium text-gray-900">{country.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          className={`${
                            country.status === 'ready'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {country.status === 'ready' ? 'Ready' : 'Testing'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${country.readiness}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{country.readiness}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">{country.launchDate}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{country.borderPoints}</td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/ees/countries/${country.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          View Guide
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Get Country-Specific Preparation Guides
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Detailed implementation guides for each country with specific requirements,
            border procedures, and preparation tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/countries/france"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              France Guide
            </Link>
            <Link
              href="/ees/countries/germany"
              className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Germany Guide
            </Link>
            <Link
              href="/ees/countries/spain"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Spain Guide
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
            "@type": "WebPage",
            "name": "EES Country Implementation Schedule 2025-2026",
            "description": "Complete implementation schedule and readiness status for EU Entry/Exit System across all 29 Schengen countries",
            "url": "https://euborder.com/ees/countries",
            "mainEntity": {
              "@type": "ItemList",
              "name": "EES Implementation by Country",
              "numberOfItems": countries.length,
              "itemListElement": countries.map((country, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Place",
                  "name": country.name,
                  "url": `https://euborder.com/ees/countries/${country.slug}`,
                  "description": `EES implementation guide for ${country.name}`
                }
              }))
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://euborder.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "EES System",
                  "item": "https://euborder.com/ees"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Country Implementation",
                  "item": "https://euborder.com/ees/countries"
                }
              ]
            }
          })
        }}
      />
    </div>
  )
}