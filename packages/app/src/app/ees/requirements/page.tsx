import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Plane,
  Home,
  CreditCard,
  Calendar,
  Users,
  Briefcase,
  Shield,
  Clock
} from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { EESGuideCTA } from '@/components/ees/EESGuideCTA'

export const metadata: Metadata = {
  title: 'EES Requirements 2025: Complete Documents & Eligibility Guide',
  description:
    'Complete guide to EES requirements: documents needed, passport validity, eligibility criteria, exemptions, and what to prepare for EU Entry/Exit System registration.',
  keywords: [
    'ees requirements',
    'ees documents needed',
    'ees eligibility',
    'what do i need for ees',
    'ees document checklist',
    'ees passport requirements',
    'ees entry requirements',
    'who needs ees',
    'ees exemptions',
    'ees registration requirements'
  ],
  openGraph: {
    title: 'EES Requirements 2025: Complete Documents & Eligibility Guide',
    description:
      'Everything you need for EES registration: required documents, passport validity, eligibility, and exemptions explained.',
    url: 'https://euborder.com/ees/requirements',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-requirements-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EES Requirements Guide'
      }
    ],
    type: 'article'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/requirements'
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

export default function EESRequirementsPage() {
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
            <span className="text-gray-900">Requirements</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            📋 Essential Requirements
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EES Requirements & Documents
            <span className="block text-blue-600 mt-2">Complete Eligibility Guide</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Everything you need for EES registration: required documents, passport validity, eligibility criteria, and exemptions explained.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target"
            >
              <FileText className="w-5 h-5 mr-2" />
              Get Requirements Checklist (£7.99)
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Checklist */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Quick Requirements Checklist</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Before You Travel
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Valid passport (6+ months remaining)</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Return/onward ticket booked</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Accommodation details confirmed</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Travel insurance purchased (recommended)</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Sufficient funds for trip</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  At the Border
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Passport ready for scanning</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Clean, dry hands for fingerprints</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Remove glasses/hat for photo</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Travel documents accessible</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <input type="checkbox" className="mt-1 mr-3 w-5 h-5" />
                    <span className="text-gray-700">Know your accommodation address</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">

          {/* Essential Documents */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Essential Documents for EES</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <FileText className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Valid Passport</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Minimum 6 months validity</li>
                  <li>• Issued within last 10 years</li>
                  <li>• At least 2 blank pages</li>
                  <li>• Machine-readable</li>
                  <li>• Not damaged</li>
                </ul>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-6">
                <Plane className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Travel Proof</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Return/onward ticket</li>
                  <li>• Flight itinerary</li>
                  <li>• Travel booking confirmation</li>
                  <li>• Proof of departure date</li>
                </ul>
              </div>

              <div className="bg-white border border-purple-200 rounded-xl p-6">
                <Home className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Accommodation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Hotel booking</li>
                  <li>• Airbnb confirmation</li>
                  <li>• Invitation letter (if staying with friends/family)</li>
                  <li>• Address details</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Passport Validity Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Minimum Validity</h4>
                  <p className="text-blue-700">
                    Your passport must be valid for at least <strong>6 months beyond your planned departure date</strong> from the Schengen Area.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Issue Date</h4>
                  <p className="text-blue-700">
                    Passport must have been issued <strong>within the last 10 years</strong>. Older passports are not accepted even if still technically valid.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements by Travel Type */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Requirements by Travel Purpose</h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <Plane className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Tourism / Leisure Travel</h3>
                    <p className="text-gray-600 mb-4">For holiday and sightseeing trips:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Valid passport (6+ months)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Return ticket</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Hotel bookings or accommodation proof</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Travel itinerary (optional but helpful)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Proof of sufficient funds (€50-100 per day recommended)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Travel insurance (strongly recommended)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <Briefcase className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Business Travel</h3>
                    <p className="text-gray-600 mb-4">For conferences, meetings, or business activities:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>All tourism requirements above, plus:</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Business invitation letter from EU company</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Conference registration or meeting agenda</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Employer letter confirming business purpose</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Previous business ties (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Family Visit</h3>
                    <p className="text-gray-600 mb-4">Visiting family members in Schengen Area:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>All tourism requirements above, plus:</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Invitation letter from family member</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Proof of relationship (birth certificates, marriage certificates)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Host's proof of residence in EU</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Host's ID/residence permit copy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who Needs EES */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Who Needs to Register for EES?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Must Register (Required)
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• UK citizens (post-Brexit)</li>
                  <li>• US, Canadian, Australian citizens</li>
                  <li>• All visa-exempt third-country nationals</li>
                  <li>• Holders of short-stay Schengen visas</li>
                  <li>• Children of all ages (with parental consent)</li>
                  <li>• Transit passengers passing through Schengen</li>
                  <li>• Anyone entering for tourism, business, or family visits</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Exempt from EES
                </h3>
                <ul className="space-y-2 text-green-800">
                  <li>• EU/EEA/Swiss citizens</li>
                  <li>• EU long-term residents</li>
                  <li>• Holders of EU long-stay visas (Type D)</li>
                  <li>• Holders of EU residence permits</li>
                  <li>• Diplomats with official/diplomatic passports</li>
                  <li>• Certain heads of state and government</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Special Note for UK Citizens</h4>
                  <p className="text-yellow-800">
                    Post-Brexit, UK passport holders are treated as third-country nationals and <strong>must register for EES</strong>. This includes British citizens, British Overseas citizens, and British protected persons.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Requirements */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Proof of Sufficient Funds</h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <CreditCard className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">How Much Money Do You Need?</h3>
              <p className="text-gray-600 mb-4">
                While not always requested, you should be prepared to show proof of sufficient funds for your stay. Requirements vary by country:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Minimum (Budget Travel)</p>
                  <p className="text-2xl font-bold text-blue-600">€50/day</p>
                  <p className="text-sm text-blue-700 mt-1">Basic accommodation + expenses</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-1">Recommended</p>
                  <p className="text-2xl font-bold text-green-600">€75-100/day</p>
                  <p className="text-sm text-green-700 mt-1">Comfortable travel budget</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="font-semibold text-purple-900 mb-1">Safe Amount</p>
                  <p className="text-2xl font-bold text-purple-600">€120+/day</p>
                  <p className="text-sm text-purple-700 mt-1">Rarely questioned</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Acceptable Proof of Funds</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Bank statements (last 3-6 months)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Credit cards with available balance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Traveler's cheques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Cash declaration (if carrying large amounts)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Sponsorship letter (if someone else is paying)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Proof of employment & income</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Additional Requirements */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Additional Considerations</h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do I need travel insurance for EES?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-600 space-y-2">
                  <p>
                    While not mandatory for EES registration, travel insurance is <strong>strongly recommended</strong> and may be checked at the border:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Minimum coverage: €30,000 medical expenses</li>
                    <li>Valid for entire Schengen Area</li>
                    <li>Covers emergency medical treatment and repatriation</li>
                    <li>Many airlines and countries effectively require it</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What about ETIAS? Is it the same as EES?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-600 space-y-2">
                  <p>
                    No, ETIAS and EES are separate systems:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>EES:</strong> Biometric registration at border (October 2025)</li>
                    <li><strong>ETIAS:</strong> Pre-travel authorization (2026, costs €7)</li>
                    <li>Both will be required for visa-exempt travelers</li>
                    <li>ETIAS applied for online before travel</li>
                    <li>EES happens automatically at border</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Special requirements for children?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-600 space-y-2">
                  <p>
                    Children have additional requirements:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Valid passport (same 6-month rule applies)</li>
                    <li>Birth certificate (original or certified copy)</li>
                    <li>Parental consent if traveling with one parent or alone</li>
                    <li>Proof of relationship to accompanying adults</li>
                    <li>Biometrics: Facial image all ages, fingerprints age 12+</li>
                  </ul>
                </div>
              </details>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Your Complete Requirements Checklist</h2>
              <p className="text-lg mb-6 text-blue-100">
                Our comprehensive EES guide includes downloadable checklists, country-specific requirements, and detailed preparation guides.
              </p>
              <Link
                href="/ees/guide"
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors tap-target"
              >
                Get the Complete EES Guide - £7.99
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Final CTA */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <EESGuideCTA />
        </div>
      </section>

      {/* Enhanced Schema Markup */}
      <EnhancedSchema
        page="ees-requirements"
        title="EES Requirements 2025: Complete Documents & Eligibility Guide"
        description="Complete guide to EES requirements: documents needed, passport validity, eligibility, exemptions, and financial requirements."
        url="https://euborder.com/ees/requirements"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES System', url: 'https://euborder.com/ees' },
          { name: 'Requirements', url: 'https://euborder.com/ees/requirements' },
        ]}
        faqItems={[
          {
            question: 'What documents do I need for EES?',
            answer: 'Essential documents: Valid passport (6+ months), return/onward ticket, accommodation proof, and proof of sufficient funds (€50-100/day recommended).'
          },
          {
            question: 'Do I need travel insurance for EES?',
            answer: 'While not mandatory for EES registration, travel insurance is strongly recommended with minimum €30,000 medical coverage valid for the entire Schengen Area.'
          },
          {
            question: 'Who needs to register for EES?',
            answer: 'All non-EU travelers including UK citizens, US, Canadian, Australian citizens, and anyone with a short-stay visa must register for EES.'
          },
          {
            question: 'How much money do I need to show?',
            answer: 'Recommended: €75-100 per day for comfortable travel. Minimum €50/day for budget travel. Proof may include bank statements, credit cards, or cash declaration.'
          }
        ]}
      />
    </div>
  )
}
