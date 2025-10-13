'use client'

// Metadata moved to metadata.ts in this route directory
import React from 'react'
import Link from 'next/link'
import { Badge } from '@schengen/ui'
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Fingerprint,
  Camera,
  FileText,
  Plane,
  ArrowRight,
  Download,
  Star,
  Users,
  Shield
} from 'lucide-react'

export default function EESPreparationPage() {
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
            <span className="text-gray-900">Preparation Guide</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            🎯 Complete Preparation Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            EES Preparation Guide 2025
            <span className="block text-blue-600">Master Biometric Registration</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete step-by-step preparation for the EU Entry/Exit System launching October 12, 2025.
            Everything you need for smooth biometric registration at EU borders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#checklist"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Get Preparation Checklist
            </Link>
            <Link
              href="/ees/countries"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              View Implementation Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">5-10 Minutes</h3>
              <p className="text-gray-600">Initial registration time at border</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3 Years</h3>
              <p className="text-gray-600">Data stored, faster subsequent entries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">29 Countries</h3>
              <p className="text-gray-600">Full Schengen area implementation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">

          {/* What to Expect */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What to Expect at EES Registration</h2>

            <div className="bg-blue-50 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <Fingerprint className="w-6 h-6 mr-3" />
                Biometric Data Collection Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Fingerprint Scanning</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• All 10 fingerprints scanned</li>
                    <li>• Clean, dry hands required</li>
                    <li>• Multiple attempts if needed</li>
                    <li>• Stored for 3 years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Facial Image Capture</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Live photo taken at border</li>
                    <li>• Remove glasses/hats</li>
                    <li>• Neutral facial expression</li>
                    <li>• Matched with passport photo</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Camera className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">First-Time Registration</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    Document scanning and verification
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    Biometric data collection (5-10 minutes)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    Travel purpose and duration questions
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    Digital record creation
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Star className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Return Visits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    Quick fingerprint or facial verification
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    Automatic compliance checking
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    Faster border processing (2-3 minutes)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    Self-service kiosks available
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Preparation Checklist */}
          <section id="checklist" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">EES Preparation Checklist</h2>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-green-600" />
                Essential Preparation Steps
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Before You Travel</h4>
                  <div className="space-y-3">
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Passport valid for 6+ months</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Check country implementation status</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Plan extra time for border crossing</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Understand 90/180 day compliance</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Review EES country-specific requirements</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">At the Border</h4>
                  <div className="space-y-3">
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Have passport ready for scanning</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Clean hands for fingerprint scanning</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Remove glasses/hat for photo</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Prepare travel purpose statement</span>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span className="text-gray-700">Follow border officer instructions</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Documents Required */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Required Documents</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <FileText className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Essential Documents</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Valid passport (6+ months)</li>
                  <li>• Return/onward ticket</li>
                  <li>• Proof of accommodation</li>
                  <li>• Travel insurance (recommended)</li>
                </ul>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-6">
                <Plane className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Travel Purpose</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tourism: Itinerary</li>
                  <li>• Business: Invitation letter</li>
                  <li>• Family: Relationship proof</li>
                  <li>• Transit: Onward ticket</li>
                </ul>
              </div>

              <div className="bg-white border border-purple-200 rounded-xl p-6">
                <Users className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Special Cases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Children: Birth certificate</li>
                  <li>• Minors: Parental consent</li>
                  <li>• Students: Enrollment proof</li>
                  <li>• Workers: Work permit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Issues & Solutions</h2>

            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-orange-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-orange-900 mb-2">Fingerprint Scanning Issues</h3>
                    <p className="text-orange-800 mb-3">
                      If fingerprints can't be read due to injury, age, or medical condition:
                    </p>
                    <ul className="text-orange-700 space-y-1">
                      <li>• Inform border officer immediately</li>
                      <li>• Medical documentation may be required</li>
                      <li>• Alternative verification methods will be used</li>
                      <li>• Process may take longer but entry won't be denied</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">System Delays or Failures</h3>
                    <p className="text-blue-800 mb-3">
                      During the initial rollout period, technical issues may occur:
                    </p>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Manual processing will continue during system downtime</li>
                      <li>• Allow extra time, especially in first 6 months</li>
                      <li>• Your right to enter won't be affected by technical issues</li>
                      <li>• Border staff will assist with alternative procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-red-900 mb-2">Refusal to Provide Biometric Data</h3>
                    <p className="text-red-800 mb-3">
                      <strong>Important:</strong> Providing biometric data is mandatory for entry:
                    </p>
                    <ul className="text-red-700 space-y-1">
                      <li>• Refusal will result in entry denial</li>
                      <li>• No exceptions except medical impossibility</li>
                      <li>• Data protection rights are guaranteed under EU law</li>
                      <li>• Data is automatically deleted after 3 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Next Steps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/ees/countries" className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-700">
                  Check Country Implementation Status
                </h3>
                <p className="text-blue-800 mb-4">
                  See which countries are ready for EES and plan your travel accordingly.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  View Country Schedules <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/ees/vs-etias" className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-green-900 mb-3 group-hover:text-green-700">
                  Understand EES vs ETIAS
                </h3>
                <p className="text-green-800 mb-4">
                  Learn how EES works with ETIAS and prepare for both systems.
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  Compare Systems <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Prepare for EU Entry/Exit System (EES) Biometric Registration",
            "description": "Complete step-by-step guide to prepare for EES biometric registration at EU borders starting October 2025",
            "image": "https://euborder.com/ees-preparation-guide.jpg",
            "totalTime": "PT10M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "EUR",
              "value": "0"
            },
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "Valid passport (minimum 6 months validity)"
              },
              {
                "@type": "HowToSupply",
                "name": "Travel documents (tickets, accommodation proof)"
              }
            ],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "EES biometric scanning kiosks at EU borders"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Document Preparation",
                "text": "Ensure passport has 6+ months validity and gather required travel documents",
                "image": "https://euborder.com/ees-documents.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Border Arrival",
                "text": "Present yourself at EES registration kiosks or border control officers",
                "image": "https://euborder.com/ees-border.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Biometric Registration",
                "text": "Provide fingerprints and facial image for biometric registration",
                "image": "https://euborder.com/ees-biometrics.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Data Storage",
                "text": "Your biometric data is stored for 3 years for future quick processing",
                "image": "https://euborder.com/ees-storage.jpg"
              }
            ],
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
            }
          })
        }}
      />
    </div>
  )
}