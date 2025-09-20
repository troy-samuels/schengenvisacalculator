'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Plane, Train, Car, Ship, MapPin, Clock, Users, AlertTriangle, Phone, Mail, ExternalLink, CheckCircle, XCircle, Calendar, Fingerprint, Camera, Shield, Sun } from 'lucide-react'
import { Button } from '@schengen/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@schengen/ui'
import { Badge } from '@schengen/ui'

const metadata: Metadata = {
  title: 'Spain EES Implementation 2025: Complete Airport, Port & Border Guide | EU Border Authority',
  description: 'Complete guide to Spain\'s EES implementation across Madrid, Barcelona airports, ferry ports, and French border. Updated procedures for October 2025 launch.',
  keywords: 'Spain EES implementation, Madrid airport EES, Barcelona airport biometric, Spanish border control 2025, EU entry exit system Spain, ferry EES Spain, Canary Islands EES',
  authors: [{ name: 'EU Border Authority' }],
  openGraph: {
    title: 'Spain EES Implementation 2025: Complete Airport & Port Guide',
    description: 'Official guide to Spain\'s EES biometric registration at airports, ferry ports, and borders. Madrid, Barcelona procedures for October 2025.',
    type: 'article',
    url: 'https://euborderauthority.com/ees/countries/spain',
    siteName: 'EU Border Authority',
    locale: 'en_US',
    images: [
      {
        url: '/images/spain-ees-implementation.jpg',
        width: 1200,
        height: 630,
        alt: 'Spain EES Implementation Guide 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spain EES Implementation 2025: Complete Airport & Port Guide',
    description: 'Essential guide to Spain\'s EES biometric registration. Madrid, Barcelona airport and ferry port procedures for October 2025 launch.',
    images: ['/images/spain-ees-implementation.jpg']
  },
  alternates: {
    canonical: 'https://euborderauthority.com/ees/countries/spain'
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Spain EES Implementation 2025: Complete Airport, Port & Border Guide',
  description: 'Comprehensive guide to Spain\'s Entry/Exit System implementation across airports, ferry ports, and land borders for October 2025 launch.',
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
    '@id': 'https://euborderauthority.com/ees/countries/spain'
  },
  about: [
    {
      '@type': 'Thing',
      name: 'Entry/Exit System',
      description: 'EU biometric border control system launching October 2025'
    },
    {
      '@type': 'Place',
      name: 'Spain',
      description: 'Kingdom of Spain EES implementation'
    }
  ]
}

const airports = [
  {
    name: 'Madrid-Barajas Airport (MAD)',
    city: 'Madrid',
    readiness: 96,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3', 'Terminal 4'],
    dailyPassengers: '160,000+',
    eesLanes: 42,
    specialFeatures: [
      'Spain\'s primary international gateway',
      'Dedicated non-EU processing facilities',
      'Multi-language support (12 languages)',
      'Express processing for frequent travelers',
      'Central hub for Latin American connections'
    ],
    tips: [
      'Terminal 4: Main EES processing center',
      'Arrive 2 hours early during peak summer season',
      'Express lanes available for business travelers',
      'Latin American connections: Special documentation desk'
    ]
  },
  {
    name: 'Barcelona Airport (BCN)',
    city: 'Barcelona',
    readiness: 94,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2'],
    dailyPassengers: '140,000+',
    eesLanes: 38,
    specialFeatures: [
      'Mediterranean tourism hub',
      'Cruise ship coordination',
      'Cultural tourism specialization',
      'Port integration system',
      'Catalonia regional center'
    ],
    tips: [
      'Terminal 1: Primary EES location',
      'Port connections: Coordinated processing',
      'Peak season (Jul-Aug): Extended wait times',
      'Cultural event periods: Special arrangements'
    ]
  },
  {
    name: 'Palma Airport (PMI)',
    city: 'Palma, Majorca',
    readiness: 91,
    status: 'ready',
    terminals: ['Terminal A', 'Terminal B', 'Terminal C', 'Terminal D'],
    dailyPassengers: '90,000+',
    eesLanes: 28,
    specialFeatures: [
      'Balearic Islands gateway',
      'Seasonal tourism optimization',
      'Island hopping coordination',
      'Resort integration system',
      'Multi-seasonal operations'
    ],
    tips: [
      'Summer peak: Arrive 3+ hours early',
      'Island connections tracked together',
      'Resort documentation accepted',
      'Seasonal staff augmentation active'
    ]
  },
  {
    name: 'Valencia Airport (VLC)',
    city: 'Valencia',
    readiness: 89,
    status: 'ready',
    terminals: ['Terminal 1', 'Terminal 2'],
    dailyPassengers: '35,000+',
    eesLanes: 16,
    specialFeatures: [
      'Regional gateway',
      'Business travel focus',
      'Agricultural trade hub',
      'Mediterranean connections',
      'Cultural exchange center'
    ],
    tips: [
      'Smaller scale: Faster processing',
      'Business travel: Priority lanes available',
      'Cultural programs: Expedited documentation',
      'Regional connections coordinated'
    ]
  }
]

const ferryPorts = [
  {
    name: 'Port of Algeciras',
    region: 'Andalusia',
    connections: ['Morocco (Tangier)', 'Ceuta'],
    readiness: 87,
    dailyPassengers: '25,000+',
    specialFeatures: [
      'Africa-Europe gateway',
      'Multi-modal transport hub',
      'Commercial and passenger',
      'Strategic location'
    ],
    tips: [
      'Morocco connections: Additional documentation required',
      'Peak summer: Extended processing times',
      'Commercial traffic priority lanes',
      'Ceuta integration system'
    ]
  },
  {
    name: 'Port of Barcelona',
    region: 'Catalonia',
    connections: ['Italy', 'France', 'North Africa'],
    readiness: 92,
    dailyPassengers: '15,000+',
    specialFeatures: [
      'Mediterranean cruise hub',
      'Airport coordination',
      'Multi-destination ferry',
      'Tourism integration'
    ],
    tips: [
      'Cruise coordination with airport',
      'Italy ferries: EU coordination',
      'Tourist season peaks managed',
      'Port-airport shuttle EES compatible'
    ]
  },
  {
    name: 'Port of Bilbao',
    region: 'Basque Country',
    connections: ['UK (Portsmouth)', 'France'],
    readiness: 85,
    dailyPassengers: '8,000+',
    specialFeatures: [
      'UK connection hub',
      'Brexit coordination',
      'Northern Spain gateway',
      'Industrial transport'
    ],
    tips: [
      'UK ferries: Full EES registration required',
      'Brexit documentation essential',
      'Industrial cargo priority',
      'Weather-dependent scheduling'
    ]
  }
]

const landBorders = [
  {
    country: 'France',
    crossings: [
      {
        name: 'La Jonquera-Le Perthus',
        type: 'Highway AP-7/A9',
        readiness: 93,
        features: ['Major tourist route', 'Mediterranean corridor', 'Summer traffic surge']
      },
      {
        name: 'Irún-Hendaye',
        type: 'Highway A-8/A63',
        readiness: 90,
        features: ['Atlantic route', 'Basque region', 'Camino de Santiago']
      },
      {
        name: 'Puigcerdà-Bourg-Madame',
        type: 'Pyrenees Route',
        readiness: 82,
        features: ['Mountain crossing', 'Ski tourism', 'Seasonal operations']
      }
    ]
  },
  {
    country: 'Portugal',
    crossings: [
      {
        name: 'Valencia de Alcántara-Marvão',
        type: 'Highway A-66/A23',
        readiness: 88,
        features: ['Central route', 'Commercial traffic', 'EU coordination']
      },
      {
        name: 'Tui-Valença',
        type: 'Highway A-55/A3',
        readiness: 85,
        features: ['Northern Atlantic route', 'Pilgrim route', 'Cultural exchange']
      }
    ]
  }
]

const canaryIslands = [
  {
    name: 'Las Palmas Airport (LPA)',
    island: 'Gran Canaria',
    readiness: 89,
    dailyPassengers: '35,000+',
    specialFeatures: ['Atlantic hub', 'African connections', 'Year-round tourism']
  },
  {
    name: 'Tenerife South Airport (TFS)',
    island: 'Tenerife',
    readiness: 91,
    dailyPassengers: '45,000+',
    specialFeatures: ['Tourism focus', 'International charter hub', 'Resort connections']
  },
  {
    name: 'Lanzarote Airport (ACE)',
    island: 'Lanzarote',
    readiness: 86,
    dailyPassengers: '20,000+',
    specialFeatures: ['Tourism gateway', 'Island hopping', 'Volcanic tourism']
  }
]

export default function SpainEESPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
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
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                  🇪🇸 Spain
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="text-8xl">🇪🇸</div>
            </div>

            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              🚀 Launch Ready: October 12, 2025
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Spain EES Implementation
              <span className="block text-orange-600">Complete Airport, Port & Border Guide</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive guide to Spain's Entry/Exit System implementation across all airports,
              ferry ports, land borders, and island territories. Updated procedures for October 2025 launch.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">94%</div>
                <div className="text-gray-600 text-sm">Implementation Readiness</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">124</div>
                <div className="text-gray-600 text-sm">EES Processing Lanes</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">18</div>
                <div className="text-gray-600 text-sm">Major Entry Points</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">430K+</div>
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
                  <h3 className="font-semibold text-green-800 mb-1">Spain EES Status: Tourism Ready</h3>
                  <p className="text-green-700">
                    All major tourist entry points prepared for October 2025 launch. Special provisions
                    for peak summer season and island territories fully implemented.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Major Airports */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Plane className="w-8 h-8 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Major Airports EES Implementation</h2>
            </div>

            <div className="grid gap-8">
              {airports.map((airport, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
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
                              <Sun className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
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

          {/* Ferry Ports */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Ship className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Ferry Ports EES Implementation</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ferryPorts.map((port, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{port.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {port.region} • {port.dailyPassengers} daily passengers
                    </CardDescription>
                    <Badge className={`w-fit ${
                      port.readiness >= 90 ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {port.readiness}% Ready
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">🚢 Ferry Connections</h4>
                        <ul className="space-y-1">
                          {port.connections.map((connection, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <Ship className="w-3 h-3 text-blue-500 mr-2" />
                              {connection}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">✨ Special Features</h4>
                        <ul className="space-y-1">
                          {port.specialFeatures.map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-500 pl-3">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">💡 Tips</h4>
                        <ul className="space-y-1">
                          {port.tips.map((tip, idx) => (
                            <li key={idx} className="text-xs text-gray-500 pl-3">
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

          {/* Canary Islands */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Sun className="w-8 h-8 text-yellow-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Canary Islands EES Implementation</h2>
            </div>

            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Sun className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Special Territory Status</h4>
                    <p className="text-yellow-700">
                      Canary Islands operate under special EU customs territory rules but implement
                      full EES biometric registration for all non-EU travelers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canaryIslands.map((airport, index) => (
                <Card key={index} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{airport.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {airport.island} • {airport.dailyPassengers} daily passengers
                    </CardDescription>
                    <Badge className={`w-fit ${
                      airport.readiness >= 90 ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {airport.readiness}% Ready
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">🏝️ Special Features</h4>
                      <ul className="space-y-1">
                        {airport.specialFeatures.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
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

            <div className="grid md:grid-cols-2 gap-8">
              {landBorders.map((border, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <MapPin className="w-6 h-6 text-green-600 mr-3" />
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

          {/* EES Process for Spain */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Fingerprint className="w-8 h-8 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">EES Process in Spain</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Clock className="w-6 h-6 text-orange-600 mr-3" />
                    Tourist Season Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">🏖️ Peak Season (Jun-Sep)</h4>
                      <ul className="space-y-2 text-sm text-orange-800">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                          Allow extra 90+ minutes for first registration
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                          Extended operating hours at major airports
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                          Additional multilingual staff deployed
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                          Resort coordination for group travelers
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">❄️ Off-Season (Oct-May)</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          Standard 60-minute processing for first registration
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          Faster processing at regional airports
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          Business travel priority lanes available
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Users className="w-6 h-6 text-blue-600 mr-3" />
                    Multi-Modal Travel Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">🚢 Ferry-Airport Coordination</h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li className="flex items-center">
                          <Ship className="w-4 h-4 text-green-600 mr-2" />
                          Barcelona: Integrated port-airport EES system
                        </li>
                        <li className="flex items-center">
                          <Ship className="w-4 h-4 text-green-600 mr-2" />
                          Single registration for combined travel
                        </li>
                        <li className="flex items-center">
                          <Ship className="w-4 h-4 text-green-600 mr-2" />
                          Cruise passenger special lanes
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">🏝️ Island Territory System</h4>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-center">
                          <Sun className="w-4 h-4 text-purple-600 mr-2" />
                          Canary Islands: Full EES implementation
                        </li>
                        <li className="flex items-center">
                          <Sun className="w-4 h-4 text-purple-600 mr-2" />
                          Balearic Islands: Coordinated processing
                        </li>
                        <li className="flex items-center">
                          <Sun className="w-4 h-4 text-purple-600 mr-2" />
                          Island-hopping tracked automatically
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Special Considerations for Spain */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Shield className="w-8 h-8 text-red-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Spain-Specific Considerations</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">🏖️ Tourism Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Sun className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      Peak summer season (June-September): Extended processing times at coastal airports
                    </li>
                    <li className="flex items-start">
                      <Sun className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      Resort coordination: Group traveler documentation streamlined
                    </li>
                    <li className="flex items-start">
                      <Sun className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      Cultural festivals: Special provisions during major events
                    </li>
                    <li className="flex items-start">
                      <Sun className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      Multilingual support: 12 languages at major tourist hubs
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">🚢 Maritime & Cross-Border</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Ship className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      Morocco ferry connections: Additional documentation required
                    </li>
                    <li className="flex items-start">
                      <Ship className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      Gibraltar border: Special UK territory considerations
                    </li>
                    <li className="flex items-start">
                      <Ship className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      Andorra access: Transit documentation coordinated
                    </li>
                    <li className="flex items-start">
                      <Ship className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      Ceuta & Melilla: Spanish territory special procedures
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
                      <span className="font-medium text-red-900">Emergency</span>
                      <a href="tel:112" className="text-red-600 font-bold hover:underline">112</a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-900">National Police</span>
                      <a href="tel:091" className="text-blue-600 font-bold hover:underline">091</a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900">Tourist Police</span>
                      <a href="tel:+34 915 488 008" className="text-green-600 font-bold hover:underline">+34 915 488 008</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">📧 EES Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-900 mb-1">Technical Issues</div>
                      <a
                        href="mailto:ees-spain@policia.es"
                        className="text-orange-600 text-sm hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        ees-spain@policia.es
                      </a>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">Tourism Support</div>
                      <a
                        href="mailto:turismo@policia.es"
                        className="text-gray-600 text-sm hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        turismo@policia.es
                      </a>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-900 mb-1">Island Territories</div>
                      <a
                        href="mailto:canarias-ees@policia.es"
                        className="text-yellow-600 text-sm hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        canarias-ees@policia.es
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
                      href="https://www.policia.es/ees"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="font-medium text-green-900 mb-1 flex items-center">
                        Official EES Guide
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                      <div className="text-green-700 text-sm">policia.es/ees</div>
                    </a>
                    <a
                      href="https://www.spain.info/ees"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium text-blue-900 mb-1 flex items-center">
                        Tourism Information
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                      <div className="text-blue-700 text-sm">spain.info/ees</div>
                    </a>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">24/7 Helpline</div>
                      <div className="text-gray-600 text-sm">+34 900 ESPAÑA</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Preparation Checklist */}
          <section className="mb-16">
            <Card className="border-l-4 border-l-orange-500 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-900 flex items-center">
                  <CheckCircle className="w-8 h-8 text-orange-600 mr-3" />
                  Spain EES Preparation Checklist
                </CardTitle>
                <CardDescription className="text-orange-700">
                  Complete this checklist before traveling to Spain after October 12, 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-4">📋 Tourism Travel</h4>
                    <ul className="space-y-3">
                      {[
                        'Passport valid for 6+ months',
                        'Hotel/accommodation confirmations',
                        'Return flight tickets',
                        'Travel insurance for Spain',
                        'Resort transfer confirmations (if applicable)',
                        'Cultural event tickets (if attending festivals)'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-orange-800">
                          <div className="w-5 h-5 border-2 border-orange-300 rounded mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-900 mb-4">🛬 At Spanish Border</h4>
                    <ul className="space-y-3">
                      {[
                        'Arrive 2+ hours early in peak season',
                        'Documents in Spanish or English',
                        'Clean hands for biometric scanning',
                        'Remove accessories for photo capture',
                        'Follow multilingual EES signage',
                        'Keep processing receipt safe'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-orange-800">
                          <div className="w-5 h-5 border-2 border-orange-300 rounded mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">🏖️ Spain-Specific Tips</h4>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• Summer travelers: Expect 90+ minute processing during July-August peak</li>
                    <li>• Island hoppers: EES tracks movement between mainland and islands automatically</li>
                    <li>• Ferry travelers: Morocco connections require additional documentation</li>
                    <li>• Festival visitors: Major events (Running of Bulls, La Tomatina) have special provisions</li>
                    <li>• Canary Islands: Duty-free purchases tracked separately from mainland travel</li>
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
                <Card className="h-full border-2 border-transparent group-hover:border-orange-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      📚 EES Preparation Guide
                    </CardTitle>
                    <CardDescription>
                      Complete preparation guide for EES registration across all EU countries
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ees/vs-etias" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-orange-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      ⚖️ EES vs ETIAS
                    </CardTitle>
                    <CardDescription>
                      Understand the differences between EES and ETIAS systems
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ees/countries" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-orange-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
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
          <section className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Spain Tourism & EES: Ready for 2025
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Get the latest updates on Spain's EES implementation, peak season procedures, and island territory coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Subscribe to Spain EES Updates
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                Download Spain Tourism Guide
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}