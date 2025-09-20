'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Plane, Train, Car, MapPin, Clock, Users, AlertTriangle, Phone, Mail, ExternalLink, CheckCircle, XCircle, Calendar, Fingerprint, Camera, Shield } from 'lucide-react'
import { Button } from '@schengen/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@schengen/ui'
import { Badge } from '@schengen/ui'

const metadata: Metadata = {
  title: 'Germany EES Implementation 2025: Complete Airport & Border Guide | EU Border Authority',
  description: 'Essential guide to Germany\'s EES implementation at Frankfurt, Munich, Berlin airports and all border crossings. Updated procedures, timelines, and preparation tips for October 2025 launch.',
  keywords: 'Germany EES implementation, Frankfurt airport EES, Munich airport biometric, Berlin EES registration, German border control 2025, EU entry exit system Germany, Schengen border Germany',
  authors: [{ name: 'EU Border Authority' }],
  openGraph: {
    title: 'Germany EES Implementation 2025: Complete Border Guide',
    description: 'Official guide to Germany\'s EES biometric registration at all airports and borders. Frankfurt, Munich, Berlin procedures for October 2025.',
    type: 'article',
    url: 'https://euborderauthority.com/ees/countries/germany',
    siteName: 'EU Border Authority',
    locale: 'en_US',
    images: [
      {
        url: '/images/germany-ees-implementation.jpg',
        width: 1200,
        height: 630,
        alt: 'Germany EES Implementation Guide 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Germany EES Implementation 2025: Complete Border Guide',
    description: 'Essential guide to Germany\'s EES biometric registration. Frankfurt, Munich, Berlin airport procedures for October 2025 launch.',
    images: ['/images/germany-ees-implementation.jpg']
  },
  alternates: {
    canonical: 'https://euborderauthority.com/ees/countries/germany'
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Germany EES Implementation 2025: Complete Airport & Border Guide',
  description: 'Comprehensive guide to Germany\'s Entry/Exit System implementation across all airports and border crossings for October 2025 launch.',
  author: {
    '@type': 'Organization',
    name: 'EU Border Authority',
    url: 'https://euborderauthority.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'EU Border Authority',
    logo: {
      '@type': 'ImageObject',
      url: 'https://euborderauthority.com/logo.png'
    }
  },
  datePublished: '2024-12-20',
  dateModified: '2024-12-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://euborderauthority.com/ees/countries/germany'
  },
  about: [
    {
      '@type': 'Thing',
      name: 'Entry/Exit System',
      description: 'EU biometric border control system launching October 2025'
    },
    {
      '@type': 'Place',
      name: 'Germany',
      description: 'Federal Republic of Germany EES implementation'
    }
  ]
}

const airports = [
  {
    name: 'Frankfurt Airport (FRA)',
    city: 'Frankfurt am Main',
    readiness: 98,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2'],
    dailyPassengers: '180,000+',
    eesLanes: 45,
    specialFeatures: [
      'Largest EES installation in Germany',
      'Dedicated non-EU processing area',
      'Multilingual support (15 languages)',
      'Fast-track for frequent travelers'
    ],
    tips: [
      'Arrive 90 minutes early for first EES registration',
      'Terminal 1: EES kiosks located in Zones A, B, C',
      'Terminal 2: Centralized EES processing area',
      'Express lanes available for annual pass holders'
    ]
  },
  {
    name: 'Munich Airport (MUC)',
    city: 'Munich',
    readiness: 95,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2'],
    dailyPassengers: '130,000+',
    eesLanes: 32,
    specialFeatures: [
      'Alpine tourism hub integration',
      'Ski season optimization',
      'Bavarian cultural information displays',
      'Direct connections to Austria/Switzerland'
    ],
    tips: [
      'Peak season (Dec-Mar): Extra 30 minutes required',
      'Satellite terminals: Shuttle to main EES area',
      'Austrian border coordination for ski travelers',
      'Octoberfest period: Extended processing times'
    ]
  },
  {
    name: 'Berlin Brandenburg (BER)',
    city: 'Berlin',
    readiness: 92,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2', 'Terminal 5'],
    dailyPassengers: '85,000+',
    eesLanes: 28,
    specialFeatures: [
      'Capital city gateway',
      'Business traveler optimization',
      'Historical documentation center',
      'EU headquarters connectivity'
    ],
    tips: [
      'Terminal 1: Main EES processing hub',
      'Political events may cause delays',
      'Business fast-track available weekdays',
      'Cultural exchange programs expedited'
    ]
  },
  {
    name: 'Hamburg Airport (HAM)',
    city: 'Hamburg',
    readiness: 88,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2'],
    dailyPassengers: '45,000+',
    eesLanes: 18,
    specialFeatures: [
      'Northern Europe hub',
      'Maritime industry focus',
      'Scandinavian connections',
      'Port coordination'
    ],
    tips: [
      'Smaller airport: Faster processing',
      'Nordic passport holder priority',
      'Weather delays common in winter',
      'Maritime worker exemptions available'
    ]
  }
]

const landBorders = [
  {
    country: 'Austria',
    crossings: [
      {
        name: 'Salzburg-Freilassing',
        type: 'Highway A8',
        readiness: 90,
        features: ['24/7 operation', 'Tourist route', 'Ski traffic optimization']
      },
      {
        name: 'Passau-Neuhaus',
        type: 'Highway A3',
        readiness: 85,
        features: ['Danube crossing', 'Commercial traffic', 'Cultural tourism']
      }
    ]
  },
  {
    country: 'Czech Republic',
    crossings: [
      {
        name: 'Rozvadov-Waidhaus',
        type: 'Highway A6',
        readiness: 88,
        features: ['Major commercial route', 'Prague connection', 'Frequent traveler lanes']
      },
      {
        name: 'Furth im Wald',
        type: 'Federal Road',
        readiness: 82,
        features: ['Regional crossing', 'Tourism focus', 'Seasonal variations']
      }
    ]
  },
  {
    country: 'Poland',
    crossings: [
      {
        name: 'Frankfurt (Oder)',
        type: 'Highway A12',
        readiness: 87,
        features: ['Berlin-Warsaw corridor', 'Business travel', 'EU coordination']
      },
      {
        name: 'Görlitz-Zgorzelec',
        type: 'Federal Road',
        readiness: 80,
        features: ['Cultural tourism', 'Twin city crossing', 'Heritage route']
      }
    ]
  }
]

const trainStations = [
  {
    name: 'Frankfurt (Main) Hauptbahnhof',
    international: ['Paris (TGV)', 'Amsterdam (ICE)', 'Brussels (Thalys)'],
    eesProcessing: 'Dedicated international arrival area',
    readiness: 93,
    tips: [
      'Platform 1-3: International arrivals',
      'EES kiosks in main concourse',
      'Connection to airport shuttle'
    ]
  },
  {
    name: 'Munich Hauptbahnhof',
    international: ['Vienna (Railjet)', 'Zurich (EC)', 'Prague (EC)'],
    eesProcessing: 'South wing international terminal',
    readiness: 89,
    tips: [
      'Track 11-16: International platforms',
      'Alpine route documentation required',
      'Ski equipment processing area'
    ]
  },
  {
    name: 'Berlin Hauptbahnhof',
    international: ['Warsaw (EC)', 'Prague (EC)', 'Amsterdam (ICE)'],
    eesProcessing: 'Underground level EES center',
    readiness: 91,
    tips: [
      'Lower level: International arrivals',
      'Government travel fast-track',
      'EU official documentation desk'
    ]
  }
]

export default function GermanyEESPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/ees/countries"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Countries Overview
              </Link>

              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  🟢 Ready for Launch
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  🇩🇪 Germany
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="text-8xl">🇩🇪</div>
            </div>

            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              🚀 Launch Ready: October 12, 2025
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Germany EES Implementation
              <span className="block text-blue-600">Complete Airport & Border Guide</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive guide to Germany's Entry/Exit System implementation across all major airports,
              land borders, and train stations. Updated procedures for October 2025 launch.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 text-sm">Implementation Readiness</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">123</div>
                <div className="text-gray-600 text-sm">EES Processing Lanes</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
                <div className="text-gray-600 text-sm">Major Border Points</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">450K+</div>
                <div className="text-gray-600 text-sm">Daily Travelers</div>
              </div>
            </div>
          </div>

          {/* Quick Status Alert */}
          <Card className="mb-12 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Germany EES Status: Fully Ready</h3>
                  <p className="text-green-700">
                    All major airports and border crossings are prepared for October 12, 2025 launch.
                    Staff training completed, technical systems tested, multilingual support active.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Major Airports */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Plane className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Major Airports EES Implementation</h2>
            </div>

            <div className="grid gap-8">
              {airports.map((airport, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-900 mb-2">
                          {airport.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {airport.city} • {airport.dailyPassengers} daily passengers
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-2 ${
                          airport.readiness >= 95 ? 'bg-green-100 text-green-800' :
                          airport.readiness >= 90 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {airport.readiness}% Ready
                        </Badge>
                        <div className="text-sm text-gray-500">{airport.eesLanes} EES Lanes</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">🏢 Terminals & Features</h4>
                        <ul className="space-y-2">
                          {airport.terminals.map((terminal, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {terminal}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4">
                          <h5 className="font-medium text-gray-800 mb-2">Special Features:</h5>
                          <ul className="space-y-1">
                            {airport.specialFeatures.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 pl-3">
                                • {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">💡 Traveler Tips</h4>
                        <ul className="space-y-2">
                          {airport.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Land Border Crossings */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Car className="w-8 h-8 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Land Border Crossings</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landBorders.map((border, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 text-green-600 mr-2" />
                      Border with {border.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {border.crossings.map((crossing, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{crossing.name}</h4>
                            <Badge className={`text-xs ${
                              crossing.readiness >= 90 ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {crossing.readiness}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{crossing.type}</p>
                          <ul className="space-y-1">
                            {crossing.features.map((feature, featureIdx) => (
                              <li key={featureIdx} className="text-xs text-gray-500 flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* International Train Stations */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Train className="w-8 h-8 text-purple-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">International Train Stations</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainStations.map((station, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{station.name}</CardTitle>
                    <Badge className={`w-fit ${
                      station.readiness >= 90 ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {station.readiness}% Ready
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">🚄 International Routes</h4>
                        <ul className="space-y-1">
                          {station.international.map((route, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <Train className="w-3 h-3 text-purple-500 mr-2" />
                              {route}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">📍 EES Processing</h4>
                        <p className="text-sm text-gray-600 mb-3">{station.eesProcessing}</p>

                        <h5 className="font-medium text-gray-800 mb-2">Tips:</h5>
                        <ul className="space-y-1">
                          {station.tips.map((tip, idx) => (
                            <li key={idx} className="text-xs text-gray-500">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* EES Process for Germany */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Fingerprint className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">EES Process in Germany</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Clock className="w-6 h-6 text-blue-600 mr-3" />
                    First-Time Registration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">📋 Required Documents</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          Valid passport (6+ months remaining)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          Purpose of visit documentation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          Return ticket or onward travel proof
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">⏱️ Processing Steps</h4>
                      <ol className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                          Document scan and verification (2-3 minutes)
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                          Biometric capture: photo and all 10 fingerprints (3-4 minutes)
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                          System processing and verification (1-2 minutes)
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                          Entry authorization and completion (30 seconds)
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Users className="w-6 h-6 text-green-600 mr-3" />
                    Return Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">🚀 Fast Processing</h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Passport scan only (30 seconds)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Facial recognition verification
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Automatic compliance checking
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Immediate entry authorization
                        </li>
                      </ul>
                    </div>

                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-1">German Efficiency</h4>
                            <p className="text-yellow-700">
                              Germany's EES implementation focuses on rapid processing.
                              Most return visits processed in under 60 seconds.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Special Considerations for Germany */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Shield className="w-8 h-8 text-yellow-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Germany-Specific Considerations</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">🏢 Business Travelers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Fast-track lanes available at Frankfurt, Munich, Berlin airports
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Corporate pre-registration programs for frequent visitors
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Integration with German visa application systems
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      EU Blue Card holders: Expedited processing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">🎿 Tourism Considerations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Alpine tourism: Coordination with Austria/Switzerland borders
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Oktoberfest period: Extended processing times at Munich
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Cultural exchange programs: Special documentation available
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      Berlin historical tours: Educational exemptions possible
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Emergency Contacts & Support */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Phone className="w-8 h-8 text-red-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Emergency Contacts & Support</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">🚨 Emergency Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-900">Police Emergency</span>
                      <a href="tel:110" className="text-red-600 font-bold hover:underline">110</a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-900">Border Police</span>
                      <a href="tel:+49 331 97997-0" className="text-blue-600 font-bold hover:underline">+49 331 97997-0</a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900">Tourist Hotline</span>
                      <a href="tel:+49 30 25002333" className="text-green-600 font-bold hover:underline">+49 30 25002333</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">📧 EES Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-900 mb-1">Technical Issues</div>
                      <a
                        href="mailto:ees-support@bpol.bund.de"
                        className="text-blue-600 text-sm hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        ees-support@bpol.bund.de
                      </a>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">General Information</div>
                      <a
                        href="mailto:info@bpol.bund.de"
                        className="text-gray-600 text-sm hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        info@bpol.bund.de
                      </a>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-900 mb-1">Complaints</div>
                      <a
                        href="mailto:beschwerden@bpol.bund.de"
                        className="text-yellow-600 text-sm hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        beschwerden@bpol.bund.de
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">🌐 Online Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a
                      href="https://www.bundespolizei.de/ees"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="font-medium text-green-900 mb-1 flex items-center">
                        Official EES Guide
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                      <div className="text-green-700 text-sm">bundespolizei.de/ees</div>
                    </a>
                    <a
                      href="https://www.germany.travel/ees"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium text-blue-900 mb-1 flex items-center">
                        Tourism Information
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                      <div className="text-blue-700 text-sm">germany.travel/ees</div>
                    </a>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">24/7 Helpline</div>
                      <div className="text-gray-600 text-sm">+49 800 GERMANY</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Preparation Checklist */}
          <section className="mb-16">
            <Card className="border-l-4 border-l-blue-500 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center">
                  <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
                  Germany EES Preparation Checklist
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Complete this checklist before traveling to Germany after October 12, 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4">📋 Before You Travel</h4>
                    <ul className="space-y-3">
                      {[
                        'Passport valid for 6+ months',
                        'Purpose of visit documentation ready',
                        'Return/onward travel tickets booked',
                        'Accommodation confirmations printed',
                        'Travel insurance valid for Germany',
                        'EES preparation guide downloaded'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-blue-800">
                          <div className="w-5 h-5 border-2 border-blue-300 rounded mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4">🛬 At German Border</h4>
                    <ul className="space-y-3">
                      {[
                        'Arrive 90 minutes early (first-time)',
                        'Have all documents easily accessible',
                        'Clean, dry hands for fingerprinting',
                        'Remove glasses/hat for photo',
                        'Follow EES signage and staff directions',
                        'Keep EES receipt for records'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-blue-800">
                          <div className="w-5 h-5 border-2 border-blue-300 rounded mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips for Germany</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Business travelers: Apply for corporate fast-track at major airports</li>
                    <li>• Alpine tourists: Coordinate with Austria/Switzerland if crossing multiple borders</li>
                    <li>• Festival visitors: Expect longer processing during Oktoberfest (September-October)</li>
                    <li>• Cultural exchange: Carry program documentation for expedited processing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Related Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related EES Resources</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/ees/preparation" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      📚 EES Preparation Guide
                    </CardTitle>
                    <CardDescription>
                      Complete preparation guide for EES registration across all EU countries
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ees/vs-etias" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      ⚖️ EES vs ETIAS
                    </CardTitle>
                    <CardDescription>
                      Understand the differences between EES and ETIAS systems
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ees/countries" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      🗺️ All Countries
                    </CardTitle>
                    <CardDescription>
                      EES implementation status across all 29 EU countries
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated on Germany's EES Implementation
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the latest updates on EES procedures, border processing times, and traveler alerts for Germany.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Subscribe to EES Updates
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Download Germany Guide
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}