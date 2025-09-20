'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Laptop, Globe, Calendar, Clock, Users, AlertTriangle, CheckCircle, TrendingUp, MapPin, Plane, Shield, Target, Lightbulb, ExternalLink } from 'lucide-react'
import { Button } from '@schengen/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@schengen/ui'
import { Badge } from '@schengen/ui'

const metadata: Metadata = {
  title: 'Digital Nomad EES Compliance 2025: Complete EU Strategy Guide | EU Border Authority',
  description: 'Essential EES compliance guide for digital nomads. New strategies for EU 90/180 rule under automatic tracking. Updated nomad visa strategies for October 2025.',
  keywords: 'digital nomad EES, nomad Schengen compliance, EU 90/180 rule digital nomads, nomad visa strategy 2025, EES digital nomad guide, Schengen nomad tracking',
  authors: [{ name: 'EU Border Authority' }],
  openGraph: {
    title: 'Digital Nomad EES Compliance 2025: Complete EU Strategy Guide',
    description: 'How EES changes everything for digital nomads. New compliance strategies, visa options, and country rotation under automatic tracking.',
    type: 'article',
    url: 'https://euborderauthority.com/ees/digital-nomads',
    siteName: 'EU Border Authority',
    locale: 'en_US',
    images: [
      {
        url: '/images/digital-nomad-ees-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Nomad EES Compliance Guide 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Nomad EES Compliance 2025: Complete EU Strategy Guide',
    description: 'How EES changes the nomad game. New strategies for EU compliance under automatic tracking. Essential guide for 2025.',
    images: ['/images/digital-nomad-ees-guide.jpg']
  },
  alternates: {
    canonical: 'https://euborderauthority.com/ees/digital-nomads'
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Digital Nomad EES Compliance 2025: Complete EU Strategy Guide',
  description: 'Comprehensive guide for digital nomads navigating EU Entry/Exit System implementation and new compliance strategies.',
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
    '@id': 'https://euborderauthority.com/ees/digital-nomads'
  },
  about: [
    {
      '@type': 'Thing',
      name: 'Digital Nomad Compliance',
      description: 'EU border compliance strategies for digital nomads'
    },
    {
      '@type': 'Thing',
      name: 'Entry/Exit System',
      description: 'EU biometric border control system'
    }
  ]
}

const eesChanges = [
  {
    aspect: 'Entry/Exit Tracking',
    before: 'Manual passport stamps, easy to lose track',
    after: 'Automatic biometric tracking across all 29 countries',
    impact: '🔴 High',
    strategy: 'Perfect compliance tracking required'
  },
  {
    aspect: 'Border Crossings',
    before: 'Passport scan, manual checking',
    after: 'Biometric verification, instant compliance check',
    impact: '🟡 Medium',
    strategy: 'Faster subsequent entries, first-time setup required'
  },
  {
    aspect: 'Overstay Detection',
    before: 'Manual calculation, often missed',
    after: 'Automatic detection, immediate alerts',
    impact: '🔴 High',
    strategy: 'Zero tolerance, perfect planning essential'
  },
  {
    aspect: 'Multi-Country Travel',
    before: 'Independent country tracking',
    after: 'Unified system across all Schengen countries',
    impact: '🔴 High',
    strategy: 'Country rotation strategies obsolete'
  }
]

const newStrategies = [
  {
    title: 'Perfect 90/180 Compliance',
    description: 'Mathematical precision required for all EU travel',
    tactics: [
      'Use automated compliance calculators',
      'Set alerts 7 days before day 90',
      'Track entries/exits to the exact day',
      'Maintain digital travel diary'
    ],
    difficulty: 'Essential',
    priority: '🔴 Critical'
  },
  {
    title: 'Non-Schengen Base Strategy',
    description: 'Establish primary residence outside Schengen zone',
    tactics: [
      'Consider UK, Romania, Bulgaria as bases',
      'Develop strong ties to non-Schengen country',
      'Utilize 90-day tourism allowances strategically',
      'Maintain rental agreements and local connections'
    ],
    difficulty: 'Moderate',
    priority: '🟡 Important'
  },
  {
    title: 'EU Residency Pathway',
    description: 'Obtain legal EU residency for unlimited access',
    tactics: [
      'Digital Nomad Visas (Estonia, Portugal, Spain)',
      'Freelancer visas (Germany, Czech Republic)',
      'Investment residency programs',
      'EU Blue Card for skilled professionals'
    ],
    difficulty: 'Complex',
    priority: '🟢 Long-term'
  },
  {
    title: 'Rotation with Non-EU Countries',
    description: 'Strategic travel to reset 180-day periods',
    tactics: [
      'Spend 90+ days in Turkey, Serbia, Albania',
      'Utilize working holiday visas globally',
      'Asia/Americas rotation periods',
      'Time zones and seasonal optimization'
    ],
    difficulty: 'Moderate',
    priority: '🟡 Important'
  }
]

const visaOptions = [
  {
    country: 'Estonia',
    visa: 'Digital Nomad Visa',
    duration: '12 months (renewable)',
    requirements: [
      'Minimum €3,500/month income',
      'Remote work contract',
      'Health insurance',
      'Clean criminal record'
    ],
    benefits: [
      'EU/Schengen access',
      'Tax advantages',
      'Path to residency',
      'E-Residency integration'
    ],
    processing: '30 days',
    cost: '€80 + fees'
  },
  {
    country: 'Portugal',
    visa: 'D7 Visa (Temporary Stay)',
    duration: '12 months (renewable)',
    requirements: [
      'Minimum €700/month income',
      'Accommodation proof',
      'Health insurance',
      'Background check'
    ],
    benefits: [
      'Path to permanent residency',
      'EU travel rights',
      'Healthcare access',
      'Family reunification'
    ],
    processing: '60-90 days',
    cost: '€83 + fees'
  },
  {
    country: 'Spain',
    visa: 'Digital Nomad Visa',
    duration: '12 months (renewable)',
    requirements: [
      'Minimum €2,000/month income',
      'Remote work proof',
      'University degree or 3+ years experience',
      'Health insurance'
    ],
    benefits: [
      'EU access',
      'Family inclusion',
      'Tax benefits (24% rate)',
      'Residency pathway'
    ],
    processing: '45-60 days',
    cost: '€60 + fees'
  }
]

const complianceTools = [
  {
    tool: 'EU Border Authority Calculator',
    description: 'Track exact Schengen compliance with EES integration',
    features: ['Real-time tracking', 'EES compatibility', 'Alert system', 'Multi-device sync'],
    pricing: 'Free basic / £4.99 premium',
    link: '/calculator'
  },
  {
    tool: 'SchengenTracker Pro',
    description: 'Advanced nomad compliance with visa integration',
    features: ['Visa tracking', 'Country recommendations', 'Tax planning', 'Document management'],
    pricing: '€19/month',
    link: 'https://schengentracker.com'
  },
  {
    tool: 'Nomad Visa Tracker',
    description: 'Comprehensive visa and residence permit management',
    features: ['Global visa database', 'Application tracking', 'Renewal alerts', 'Document storage'],
    pricing: '$29/month',
    link: 'https://nomadvisa.com'
  }
]

export default function DigitalNomadEESPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/ees"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to EES Overview
              </Link>

              <div className="flex items-center space-x-4">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  💻 Digital Nomad Guide
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                  🚨 Game Changer
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-6">
                <Laptop className="w-16 h-16 text-white" />
              </div>
            </div>

            <Badge className="mb-6 bg-red-100 text-red-800 hover:bg-red-200">
              🚨 EES Changes Everything: October 12, 2025
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Digital Nomad EES Guide
              <span className="block text-blue-600">EU Compliance Strategy 2025</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              How the EU Entry/Exit System fundamentally changes digital nomad travel.
              New compliance strategies, visa pathways, and survival tactics for the automated tracking era.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-gray-600 text-sm">Compliance Required</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">29</div>
                <div className="text-gray-600 text-sm">Connected Countries</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                <div className="text-gray-600 text-sm">Margin for Error</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">New</div>
                <div className="text-gray-600 text-sm">Strategies Needed</div>
              </div>
            </div>
          </div>

          {/* Critical Alert */}
          <Card className="mb-12 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-800 text-lg mb-2">Critical: The Nomad Game Has Changed</h3>
                  <p className="text-red-700 text-base">
                    <strong>EES makes traditional nomad strategies obsolete.</strong> Manual passport stamp tracking,
                    "forgotten" overstays, and unofficial border crossings are no longer possible.
                    Every entry and exit across 29 EU countries will be automatically tracked with biometric precision.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How EES Changes Everything */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="w-8 h-8 text-red-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">How EES Changes Everything for Nomads</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Aspect</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Before EES</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-900">After EES (2025+)</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-red-900">Impact</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-900">New Strategy Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {eesChanges.map((change, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{change.aspect}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{change.before}</td>
                      <td className="px-6 py-4 text-sm text-blue-700 text-center font-medium">{change.after}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium">{change.impact}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-purple-700 text-center">{change.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* New Strategies Required */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Target className="w-8 h-8 text-purple-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">New Nomad Strategies for the EES Era</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {newStrategies.map((strategy, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-gray-900">{strategy.title}</CardTitle>
                      <Badge className={`${
                        strategy.priority.includes('Critical') ? 'bg-red-100 text-red-800' :
                        strategy.priority.includes('Important') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {strategy.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-600">
                      {strategy.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Implementation:</span>
                        <Badge variant="outline">{strategy.difficulty}</Badge>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
                        <ul className="space-y-2">
                          {strategy.tactics.map((tactic, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              {tactic}
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

          {/* EU Visa Options for Nomads */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Globe className="w-8 h-8 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">EU Visa Options for Digital Nomads</h2>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
              The most sustainable solution: Obtain legal EU residency to bypass 90/180 restrictions entirely.
              Here are the most nomad-friendly visa programs launching in 2024-2025:
            </p>

            <div className="grid gap-8">
              {visaOptions.map((visa, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-900 flex items-center">
                          <MapPin className="w-5 h-5 text-green-600 mr-2" />
                          {visa.country} - {visa.visa}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          Duration: {visa.duration} • Processing: {visa.processing} • Cost: {visa.cost}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">📋 Requirements</h4>
                        <ul className="space-y-2">
                          {visa.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">🎯 Benefits</h4>
                        <ul className="space-y-2">
                          {visa.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              {benefit}
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

          {/* Compliance Tools */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Shield className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Essential Compliance Tools for Nomads</h2>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
              Perfect compliance requires the right tools. These platforms integrate with EES requirements
              to ensure you never accidentally overstay in the EU.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceTools.map((tool, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{tool.tool}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">✨ Features</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="font-medium text-gray-900">{tool.pricing}</span>
                        {tool.link.startsWith('/') ? (
                          <Link href={tool.link}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Try Now
                            </Button>
                          </Link>
                        ) : (
                          <a href={tool.link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                              Visit Site <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Country Rotation Strategies */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Plane className="w-8 h-8 text-purple-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Strategic Country Rotation Under EES</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Non-Schengen EU Countries</CardTitle>
                  <CardDescription>
                    EU countries outside Schengen zone - separate 90/180 quotas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">🇷🇴 Romania</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• 90 days per 180 (separate from Schengen)</li>
                        <li>• Growing nomad community</li>
                        <li>• Low cost of living</li>
                        <li>• Strong internet infrastructure</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">🇧🇬 Bulgaria</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Independent 90/180 allocation</li>
                        <li>• Beach and mountain destinations</li>
                        <li>• EU benefits without Schengen limits</li>
                        <li>• Growing tech scene</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">🇮🇪 Ireland</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Separate immigration system</li>
                        <li>• English-speaking</li>
                        <li>• Common Travel Area with UK</li>
                        <li>• Tech hub (Dublin)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Strategic Non-EU Destinations</CardTitle>
                  <CardDescription>
                    Countries to reset your Schengen 180-day period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">🇹🇷 Turkey</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• 90 days visa-free</li>
                        <li>• Bridge between Europe and Asia</li>
                        <li>• Excellent nomad infrastructure</li>
                        <li>• Affordable cost of living</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">🇷🇸 Serbia</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• 90 days visa-free</li>
                        <li>• Central Balkan location</li>
                        <li>• Growing nomad scene (Belgrade)</li>
                        <li>• Easy access to EU borders</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">🇬🇧 United Kingdom</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• 6 months visa-free</li>
                        <li>• English-speaking</li>
                        <li>• Major business hub</li>
                        <li>• Post-Brexit separate system</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Action Plan Checklist */}
          <section className="mb-16">
            <Card className="border-l-4 border-l-blue-500 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center">
                  <Lightbulb className="w-8 h-8 text-blue-600 mr-3" />
                  Your EES-Ready Nomad Action Plan
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Complete this checklist before October 12, 2025 to ensure seamless EU travel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4">🎯 Immediate Actions (Next 30 Days)</h4>
                    <ul className="space-y-3">
                      {[
                        'Calculate your exact Schengen compliance status',
                        'Set up automated compliance tracking',
                        'Research visa options for your situation',
                        'Establish non-Schengen base options',
                        'Update passport if expiring within 6 months',
                        'Join nomad communities for EES updates'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-blue-800">
                          <div className="w-5 h-5 border-2 border-blue-300 rounded mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4">📋 Strategic Planning (Next 90 Days)</h4>
                    <ul className="space-y-3">
                      {[
                        'Apply for digital nomad visa if eligible',
                        'Secure accommodation in non-Schengen country',
                        'Plan 2025 travel itinerary with EES compliance',
                        'Prepare emergency exit strategy',
                        'Set up business structure for visa applications',
                        'Create comprehensive travel documentation system'
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
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips for EES Era Nomadism</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• EES biometric data expires after 3 years - plan long-term accordingly</li>
                    <li>• Consider tax residency implications when choosing nomad visa programs</li>
                    <li>• Build relationships in non-Schengen countries for emergency accommodation</li>
                    <li>• Maintain perfect compliance records for future visa applications</li>
                    <li>• Join nomad groups focused on legal compliance and visa strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Related Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Resources for EES-Ready Nomads</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/calculator" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                      🧮 Compliance Calculator
                    </CardTitle>
                    <CardDescription>
                      Track your exact Schengen compliance with EES-ready features
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ees/preparation" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                      📚 EES Preparation Guide
                    </CardTitle>
                    <CardDescription>
                      Complete preparation guide for EES biometric registration
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ees/vs-etias" className="group">
                <Card className="h-full border-2 border-transparent group-hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                      ⚖️ EES vs ETIAS
                    </CardTitle>
                    <CardDescription>
                      Understand both systems and how they affect nomad travel
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Stay Ahead of the EES Game
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of nomads preparing for the EES era. Get exclusive compliance strategies,
              visa updates, and early access to nomad-focused tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Join Nomad EES Updates
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Download Nomad Compliance Kit
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}