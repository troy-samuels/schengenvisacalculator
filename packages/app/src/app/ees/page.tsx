import type { Metadata } from 'next'
import Link from 'next/link'
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
  Clock,
  FileText,
  Zap,
  Globe,
  TrendingUp,
  AlertTriangle,
  Star,
  Target
} from 'lucide-react'
import { ABTestCTA } from '@/components/ab-test-cta'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { EESPhaseGate } from '@/components/EESPhaseGate'

export const metadata: Metadata = {
  title: 'EES System 2025: Complete EU Entry/Exit Authority Hub | First-Mover Advantage',
  description: 'THE definitive EU Entry/Exit System authority. Master biometric registration, country implementation schedules, corporate compliance, and expert preparation guides for October 2025 launch.',
  keywords: [
    'EES system',
    'Entry Exit System',
    'EU biometric registration',
    'EES requirements',
    'EU border biometrics',
    'EES vs ETIAS',
    'EES implementation',
    'EES preparation',
    'EU border control 2025',
    'biometric border system',
    'EES compliance',
    'EU travel authorization'
  ],
  openGraph: {
    title: 'EES System 2025: Complete EU Entry/Exit Authority Hub',
    description: 'Master the revolutionary EU biometric system launching October 2025. First-mover advantage in 50K+ monthly searches.',
    url: 'https://euborder.com/ees',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-system-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EU Entry/Exit System Complete Authority Guide'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EES System 2025: Complete EU Authority Hub',
    description: 'Master the revolutionary EU biometric system launching October 2025.',
    images: ['/images/ees-system-twitter.jpg']
  },
  alternates: {
    canonical: 'https://euborder.com/ees'
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

export default function EESPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Authority Badge & Hero */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Authority Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  🚀 Launching October 2025
                </span>
                <span className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  #1 EES Authority
                </span>
                <span className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                  50K+ Monthly Searches
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                EU Entry/Exit System
                <span className="block text-blue-600 mt-2">Complete Authority Hub</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                THE definitive resource for EU biometric border systems. Master EES preparation,
                country implementation, corporate compliance, and regulatory updates from the recognized authority.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Authority Leader</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span>First-Mover Advantage</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span>50K+ Monthly Opportunity</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/ees/preparation-kit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <Fingerprint className="w-5 h-5 mr-2" />
                  Master EES Preparation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/ees/countries"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  View All 27 Countries
                </Link>
              </div>
            </div>

            {/* Market Opportunity Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">Oct 2025</div>
                <div className="text-gray-600">Launch Date</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">27 Countries</div>
                <div className="text-gray-600">EU Implementation</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">1.4B</div>
                <div className="text-gray-600">Travelers Affected</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-600">Monthly Searches</div>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Positioning */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why We're the EES Authority
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                First-mover advantage in the largest EU border system change since Schengen Agreement
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Regulatory Expertise</h3>
                <p className="text-gray-600">Deep understanding of EU border regulations, implementation challenges, and compliance requirements from years of Schengen authority leadership.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">First-Mover Advantage</h3>
                <p className="text-gray-600">Capturing 50K+ monthly EES searches before competitors. Positioning as THE authority before system launch creates unassailable market dominance.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Coverage</h3>
                <p className="text-gray-600">Only platform covering Schengen + EES + ETIAS together. Complete EU border authority from calculation to biometric registration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EES System Explanation */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Master the EU Entry/Exit System
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  The EES revolutionizes EU border control by replacing manual passport stamping with biometric registration.
                  Starting October 2025, all non-EU travelers must register fingerprints and facial images for automated tracking.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Biometric Registration</h3>
                      <p className="text-gray-600">One-time fingerprint and facial scan, stored for 3 years</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Automated Tracking</h3>
                      <p className="text-gray-600">Digital record prevents overstays and streamlines future entries</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">90/180 Compliance</h3>
                      <p className="text-gray-600">Automatic monitoring integrated with Schengen rule enforcement</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Corporate Integration</h3>
                      <p className="text-gray-600">Business travel tracking and employee compliance management</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Shield className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Enhanced Border Security</h3>
                  </div>
                  <p className="text-gray-700">
                    EES creates the world's most advanced border management system, combining security with efficiency
                    through cutting-edge biometric technology and AI-powered processing.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-gray-900">Critical Preparation Needed</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Unprepared travelers face significant delays. Start your EES preparation now with our authority guides.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Authority Hub Navigation */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete EES Authority Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to master the EU Entry/Exit System from the recognized authority
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* EES Preparation Kit */}
              <Link href="/ees/preparation-kit" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Fingerprint className="w-10 h-10 text-blue-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">NEW</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    EES Preparation Kit
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete step-by-step preparation toolkit with biometric requirements,
                    document checklists, and border procedure guides.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    Master EES Prep <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Country Implementation Hub */}
              <Link href="/ees/countries" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-10 h-10 text-green-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">27 COUNTRIES</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    Country Implementation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete coverage of all 27 EU countries: implementation schedules,
                    border readiness status, and country-specific requirements.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold">
                    View All Countries <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Corporate Solutions */}
              <Link href="/ees/business" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-10 h-10 text-purple-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">ENTERPRISE</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    Corporate EES Solutions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enterprise compliance strategies, employee management systems,
                    and business travel coordination for EES implementation.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold">
                    Explore Enterprise <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* EES Timeline Calculator */}
              <Link href="/ees/timeline" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-10 h-10 text-orange-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">CALCULATOR</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    EES Timeline Calculator
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Calculate when EES affects your travel plans, border readiness dates,
                    and optimal registration timing for your routes.
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold">
                    Calculate Timeline <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* EES vs ETIAS Authority */}
              <Link href="/ees/vs-etias" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-10 h-10 text-indigo-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">COMPARISON</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    EES vs ETIAS Authority
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete expert comparison: EES (2025) vs ETIAS (2026),
                    how they work together, and comprehensive compliance strategies.
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold">
                    Compare Systems <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Regulatory Updates Hub */}
              <Link href="/ees/updates" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-10 h-10 text-red-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">LIVE UPDATES</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    EES Regulatory Updates
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Latest EES developments, implementation changes, regulatory updates,
                    and expert analysis from the authority source.
                  </p>
                  <div className="flex items-center text-red-600 font-semibold">
                    Stay Updated <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* A/B Testing CTA */}
        <section className="py-16 px-4 bg-gray-50">
          <ABTestCTA country="EU" page="ees-authority" />
        </section>

        {/* Final Authority CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Become an EES Authority Expert
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands who trust our expertise for EU border compliance.
              Get first-mover advantage in the largest border system change since Schengen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ees/preparation-kit"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Start EES Mastery
              </Link>
              <Link
                href="/ees/business"
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Explore Enterprise Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Schema Markup */}
        <EnhancedSchema
          page="guide"
          title="EU Entry/Exit System (EES) Complete Authority Hub"
          description="THE definitive EU Entry/Exit System authority. Master biometric registration, country implementation schedules, corporate compliance, and expert preparation guides for October 2025 launch."
          url="https://euborder.com/ees"
          breadcrumbs={[
            { name: 'Home', url: 'https://euborder.com' },
            { name: 'EES Authority Hub', url: 'https://euborder.com/ees' }
          ]}
          howToSteps={[
            {
              name: "Understand EES Requirements",
              text: "Learn what documents and biometric data you need for EES registration"
            },
            {
              name: "Check Country Implementation",
              text: "Verify when EES launches in your destination countries"
            },
            {
              name: "Prepare for Registration",
              text: "Complete our EES preparation kit and document checklist"
            },
            {
              name: "Navigate Border Process",
              text: "Follow our step-by-step guide for smooth EES registration"
            }
          ]}
          faqItems={[
            {
              question: "When does the EU Entry/Exit System launch?",
              answer: "The EES launches October 2025 across all EU Schengen countries, replacing manual passport stamping with biometric registration."
            },
            {
              question: "What biometric data does EES collect?",
              answer: "EES collects fingerprints and facial images from all non-EU travelers, storing this data for 3 years for automatic entry/exit tracking."
            },
            {
              question: "How does EES work with the 90/180 rule?",
              answer: "EES automatically tracks your days in the Schengen area, preventing overstays by monitoring compliance with the 90/180 day rule."
            },
            {
              question: "Do I need both EES and ETIAS?",
              answer: "Yes, EES (2025) handles biometric registration while ETIAS (2026) provides travel authorization. Both systems will work together."
            }
          ]}
        />
      </div>
    </>
  )
}