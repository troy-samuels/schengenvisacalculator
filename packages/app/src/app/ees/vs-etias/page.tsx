import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@schengen/ui'
import {
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  Fingerprint,
  FileText,
  CreditCard,
  Shield,
  Users,
  AlertCircle,
  ArrowRight,
  Zap,
  Database
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'EES vs ETIAS 2025: Complete Differences Explained | EU Border',
  description: 'Complete comparison of EES vs ETIAS systems launching in 2025-2026. Understand key differences, implementation timelines, requirements, and how both EU border systems work together.',
  keywords: [
    'EES vs ETIAS',
    'EES ETIAS difference',
    'Entry Exit System vs ETIAS',
    'EU border systems',
    'EES ETIAS comparison',
    'ETIAS EES requirements',
    'EU travel authorization',
    'biometric registration vs travel authorization',
    'EES ETIAS timeline'
  ],
  openGraph: {
    title: 'EES vs ETIAS 2025: Complete Differences Explained',
    description: 'Master the differences between EES (Oct 2025) and ETIAS (2026). Complete comparison of requirements, timelines, and how both systems work together.',
    type: 'article',
    url: 'https://euborder.com/ees/vs-etias',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-vs-etias-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EES vs ETIAS Comparison 2025'
      }
    ]
  },
  alternates: {
    canonical: 'https://euborder.com/ees/vs-etias'
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

export default function EESvsETIASPage() {
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
            <span className="text-gray-900">EES vs ETIAS</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            📊 Complete System Comparison
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            EES vs ETIAS
            <span className="block text-blue-600">Complete Differences Explained</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Understand the key differences between EU's Entry/Exit System (EES) and European Travel Information
            and Authorization System (ETIAS). Two different systems, two different purposes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-blue-100 rounded-lg p-4">
              <h3 className="font-bold text-blue-900">EES Launches</h3>
              <p className="text-blue-800">October 12, 2025</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <h3 className="font-bold text-green-900">ETIAS Launches</h3>
              <p className="text-green-800">Mid-2026 (6 months after EES)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Quick Comparison Overview</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-900">EES (Entry/Exit System)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-900">ETIAS (Travel Authorization)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Primary Purpose</td>
                  <td className="px-6 py-4 text-center text-blue-700">Border entry/exit recording</td>
                  <td className="px-6 py-4 text-center text-green-700">Pre-travel authorization</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Launch Date</td>
                  <td className="px-6 py-4 text-center text-blue-700">October 12, 2025</td>
                  <td className="px-6 py-4 text-center text-green-700">Mid-2026</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Application Required</td>
                  <td className="px-6 py-4 text-center">
                    <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    <span className="text-blue-700 text-sm">No - automatic at border</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    <span className="text-green-700 text-sm">Yes - before travel</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Cost</td>
                  <td className="px-6 py-4 text-center text-blue-700">Free</td>
                  <td className="px-6 py-4 text-center text-green-700">€20</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Biometric Data</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    <span className="text-blue-700 text-sm">Fingerprints + photo</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    <span className="text-green-700 text-sm">No biometrics</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Validity Period</td>
                  <td className="px-6 py-4 text-center text-blue-700">3 years</td>
                  <td className="px-6 py-4 text-center text-green-700">3 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* EES Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Fingerprint className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">EES</h3>
                  <p className="text-blue-600">Entry/Exit System</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    What It Does
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Records your entry and exit from Schengen area</li>
                    <li>• Replaces manual passport stamping</li>
                    <li>• Stores biometric data for identification</li>
                    <li>• Automatically tracks 90/180-day compliance</li>
                    <li>• Detects overstays and unauthorized entries</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    When It Happens
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• At the border when entering/exiting EU</li>
                    <li>• First time: 5-10 minute registration</li>
                    <li>• Return visits: 2-3 minute verification</li>
                    <li>• Mandatory for all non-EU travelers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Database className="w-5 h-5 text-blue-600 mr-2" />
                    Data Collected
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• All 10 fingerprints</li>
                    <li>• Facial photograph</li>
                    <li>• Passport information</li>
                    <li>• Entry/exit dates and locations</li>
                    <li>• Travel purpose and duration</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Key Point</h4>
                  <p className="text-blue-800 text-sm">
                    EES is automatic and happens at the border. You don't need to do anything
                    beforehand except ensure your passport is valid.
                  </p>
                </div>
              </div>
            </div>

            {/* ETIAS Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">ETIAS</h3>
                  <p className="text-green-600">Travel Authorization System</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    What It Does
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Pre-screens travelers before they travel</li>
                    <li>• Checks against security databases</li>
                    <li>• Issues travel authorization or denial</li>
                    <li>• Similar to US ESTA or Canadian eTA</li>
                    <li>• Required for visa-exempt travelers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    When It Happens
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Online application before travel</li>
                    <li>• Processing: minutes to 30 days</li>
                    <li>• Apply at least 96 hours before travel</li>
                    <li>• Must be approved before boarding</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    Information Required
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Personal information (name, DOB, etc.)</li>
                    <li>• Passport details</li>
                    <li>• Travel plans (destination, duration)</li>
                    <li>• Security questions (criminal history)</li>
                    <li>• Contact information and address</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Key Point</h4>
                  <p className="text-green-800 text-sm">
                    ETIAS must be obtained before traveling. It's a pre-travel authorization
                    that costs €20 and takes just minutes to apply online.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How They Work Together */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How EES and ETIAS Work Together
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Complete Travel Process (2026 onwards)
            </h3>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Before Travel: Apply for ETIAS</h4>
                  <p className="text-gray-600">
                    Submit online application, pay €20 fee, receive authorization (usually within minutes)
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">At Border: EES Registration</h4>
                  <p className="text-gray-600">
                    Present ETIAS authorization, undergo biometric registration (fingerprints + photo)
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">During Stay: Automatic Tracking</h4>
                  <p className="text-gray-600">
                    EES automatically tracks your stay duration and compliance with 90/180-day rule
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Exit: Quick Verification</h4>
                  <p className="text-gray-600">
                    Quick biometric verification when leaving, automatically updating your travel record
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">Important Timeline Note</h3>
                <p className="text-yellow-800">
                  <strong>2025 (Oct-Dec):</strong> Only EES will be operational. ETIAS launches 6 months later in mid-2026.
                  During this period, you'll only need to complete EES registration at the border.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Misconceptions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Common Misconceptions Clarified
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <XCircle className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Common Myths</h3>
              <ul className="space-y-3 text-red-800">
                <li>• "EES and ETIAS are the same thing"</li>
                <li>• "You need to apply for EES in advance"</li>
                <li>• "ETIAS replaces the EES system"</li>
                <li>• "EES costs money like ETIAS"</li>
                <li>• "Both systems launch at the same time"</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-green-900 mb-3">✅ The Reality</h3>
              <ul className="space-y-3 text-green-800">
                <li>• They are completely different systems</li>
                <li>• EES happens automatically at the border</li>
                <li>• Both systems work together, not replace each other</li>
                <li>• EES is free, ETIAS costs €20</li>
                <li>• EES launches first, ETIAS follows 6 months later</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Implementation Timeline
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>

            <div className="space-y-12">
              {/* October 2025 */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <div className="bg-blue-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">October 12, 2025</h3>
                    <h4 className="font-semibold text-blue-800 mb-3">EES Launch</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Biometric registration begins</li>
                      <li>• 10% of border crossings initially</li>
                      <li>• Progressive rollout over 6 months</li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="w-5/12"></div>
              </div>

              {/* April 2026 */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full"></div>
                <div className="w-5/12 pl-8">
                  <div className="bg-green-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-2">April 10, 2026</h3>
                    <h4 className="font-semibold text-green-800 mb-3">EES Full Implementation</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 100% border coverage achieved</li>
                      <li>• All travelers registered via EES</li>
                      <li>• System fully operational</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mid 2026 */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <div className="bg-purple-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Mid-2026</h3>
                    <h4 className="font-semibold text-purple-800 mb-3">ETIAS Launch</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Online applications begin</li>
                      <li>• 6-month transitional period</li>
                      <li>• €20 fee per authorization</li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full"></div>
                <div className="w-5/12"></div>
              </div>

              {/* Late 2026 */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full"></div>
                <div className="w-5/12 pl-8">
                  <div className="bg-orange-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-orange-900 mb-2">Late 2026</h3>
                    <h4 className="font-semibold text-orange-800 mb-3">ETIAS Mandatory</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• ETIAS becomes mandatory</li>
                      <li>• Both systems fully operational</li>
                      <li>• Complete digital border system</li>
                    </ul>
                  </div>
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
            Prepare for Both Systems
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Stay ahead of EU border changes by understanding both EES and ETIAS requirements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/ees/preparation"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              <Fingerprint className="w-5 h-5 mx-auto mb-2" />
              EES Preparation Guide
            </Link>
            <Link
              href="/etias"
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              <FileText className="w-5 h-5 mx-auto mb-2" />
              ETIAS Information
            </Link>
            <Link
              href="/ees/countries"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              <Calendar className="w-5 h-5 mx-auto mb-2" />
              Implementation Timeline
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
            "headline": "EES vs ETIAS: Complete Differences Explained 2025",
            "description": "Comprehensive comparison of the EU Entry/Exit System (EES) and European Travel Information and Authorization System (ETIAS), including implementation timelines and requirements.",
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
              "@id": "https://euborder.com/ees/vs-etias"
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://euborder.com/ees-vs-etias-comparison.jpg",
              "width": 1200,
              "height": 630
            },
            "articleSection": "EU Border Systems",
            "keywords": ["EES vs ETIAS", "EU border systems", "Entry Exit System", "ETIAS", "EU travel authorization"],
            "about": [
              {
                "@type": "Thing",
                "name": "EU Entry/Exit System (EES)"
              },
              {
                "@type": "Thing",
                "name": "European Travel Information and Authorization System (ETIAS)"
              }
            ]
          })
        }}
      />
    </div>
  )
}