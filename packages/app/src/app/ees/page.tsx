'use client'

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@schengen/ui'
import {
  Calendar,
  MapPin,
  Users,
  Building2,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Fingerprint,
  Shield,
  Clock
} from 'lucide-react'

const metadata: Metadata = {
  title: 'EES System 2025: Complete Entry/Exit System Authority Guide | EU Border Authority',
  description: 'The definitive guide to EU Entry/Exit System (EES) launching October 2025. Biometric registration, preparation guides, country implementation schedules, and expert compliance advice.',
  keywords: [
    'EES system',
    'Entry Exit System',
    'EU biometric registration',
    'EES requirements',
    'EU border biometrics',
    'EES vs ETIAS',
    'EES implementation',
    'EES preparation',
    'EU border control 2025'
  ],
  openGraph: {
    title: 'EES System 2025: Complete Authority Guide',
    description: 'Master the EU Entry/Exit System launching October 2025. Complete preparation guides, implementation schedules, and expert compliance advice.',
    type: 'website',
    url: '/ees'
  }
}

export default function EESPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🚀 Launching October 12, 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              EU Entry/Exit System
              <span className="block text-blue-600">Complete Authority Guide</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master the revolutionary EU biometric border system launching October 2025.
              Get expert preparation guides, implementation schedules, and compliance strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ees/preparation"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Fingerprint className="w-5 h-5 mr-2" />
                Start EES Preparation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/ees/countries"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                View Country Schedules
              </Link>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">Oct 12, 2025</div>
              <div className="text-gray-600">Launch Date</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">29 Countries</div>
              <div className="text-gray-600">Implementation</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">1.4 Billion</div>
              <div className="text-gray-600">Travelers Affected</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">6 Months</div>
              <div className="text-gray-600">Rollout Period</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is EES Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is the EU Entry/Exit System?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The EES is a revolutionary digital border management system that will replace manual passport stamping
                for non-EU travelers. Starting October 12, 2025, all third-country nationals will register biometric
                data when crossing EU external borders.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Biometric Registration</h3>
                    <p className="text-gray-600">Fingerprints and facial images stored for 3 years</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Automated Tracking</h3>
                    <p className="text-gray-600">Digital record of all entries and exits</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Overstay Prevention</h3>
                    <p className="text-gray-600">Automatic compliance monitoring with 90/180 rule</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Enhanced Security</h3>
                </div>
                <p className="text-gray-700">
                  EES strengthens EU border security while streamlining legitimate travel through
                  advanced biometric technology and automated processing.
                </p>
                <Link
                  href="/ees/preparation"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Learn how to prepare →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Hub Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Complete EES Authority Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Preparation Guide */}
            <Link href="/ees/preparation" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <Fingerprint className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  EES Preparation Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete step-by-step preparation guide for biometric registration,
                  documents needed, and what to expect at the border.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  Start Preparing <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Country Schedules */}
            <Link href="/ees/countries" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <MapPin className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Country Implementation
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed implementation schedules for all 29 countries,
                  border readiness status, and country-specific requirements.
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  View Schedules <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* FAQ & Troubleshooting */}
            <Link href="/ees/faq" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <AlertCircle className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  FAQ & Troubleshooting
                </h3>
                <p className="text-gray-600 mb-4">
                  Common questions, troubleshooting guides, and expert solutions
                  for EES registration issues and border complications.
                </p>
                <div className="flex items-center text-orange-600 font-semibold">
                  Get Answers <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Business Solutions */}
            <Link href="/ees/business" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <Building2 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Business Solutions
                </h3>
                <p className="text-gray-600 mb-4">
                  Corporate compliance strategies, employee management,
                  and enterprise solutions for business travelers.
                </p>
                <div className="flex items-center text-purple-600 font-semibold">
                  Explore Solutions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* News & Updates */}
            <Link href="/ees/news" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <Calendar className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  News & Updates
                </h3>
                <p className="text-gray-600 mb-4">
                  Latest EES developments, implementation updates,
                  regulatory changes, and expert analysis.
                </p>
                <div className="flex items-center text-red-600 font-semibold">
                  Stay Updated <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* vs ETIAS */}
            <Link href="/ees/vs-etias" className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  EES vs ETIAS
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete comparison between EES and ETIAS systems,
                  implementation timelines, and how they work together.
                </p>
                <div className="flex items-center text-indigo-600 font-semibold">
                  Compare Systems <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay Ahead of EU Border Changes
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get expert EES preparation guides, implementation updates, and compliance strategies
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/preparation"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Start EES Preparation
            </Link>
            <Link
              href="#newsletter"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Subscribe to Updates
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
            "name": "EU Entry/Exit System (EES) Complete Authority Guide",
            "description": "Comprehensive guide to the EU Entry/Exit System launching October 2025, including preparation guides, implementation schedules, and compliance strategies.",
            "url": "https://euborder.com/ees",
            "mainEntity": {
              "@type": "GovernmentService",
              "name": "EU Entry/Exit System (EES)",
              "description": "Digital border management system for biometric registration of non-EU travelers",
              "serviceType": "Border Control System",
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://euborder.com/ees",
                "serviceLocation": {
                  "@type": "AdministrativeArea",
                  "name": "European Union Schengen Area"
                }
              },
              "audience": {
                "@type": "Audience",
                "name": "Non-EU Travelers to Schengen Area"
              }
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
                  "name": "EES System Guide",
                  "item": "https://euborder.com/ees"
                }
              ]
            }
          })
        }}
      />
    </div>
  )
}