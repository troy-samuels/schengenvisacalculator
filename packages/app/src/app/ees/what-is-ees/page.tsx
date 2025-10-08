import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Fingerprint,
  Camera,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Globe,
  Users,
  FileText,
  AlertCircle,
  Zap
} from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { EESGuideCTA } from '@/components/ees/EESGuideCTA'

export const metadata: Metadata = {
  title: 'What is the EES System? Complete EU Entry/Exit System Guide 2025',
  description:
    'Comprehensive guide to the EU Entry/Exit System (EES) launching October 2025. Learn about biometric registration, requirements, how it works, and what you need to know.',
  keywords: [
    'what is ees',
    'what is ees system',
    'ees system explained',
    'entry exit system',
    'EU biometric system',
    'ees definition',
    'what does ees mean',
    'ees system eu',
    'entry exit system explained',
    'ees biometric registration'
  ],
  openGraph: {
    title: 'What is the EES System? Complete EU Entry/Exit System Guide 2025',
    description:
      'Everything you need to know about the EU Entry/Exit System launching October 2025. Biometric registration, requirements, and preparation guide.',
    url: 'https://euborder.com/ees/what-is-ees',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/what-is-ees-og.jpg',
        width: 1200,
        height: 630,
        alt: 'What is the EES System - Complete Guide'
      }
    ],
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is the EES System? Complete Guide',
    description: 'Everything you need to know about the EU Entry/Exit System launching October 2025.',
    images: ['/images/what-is-ees-twitter.jpg']
  },
  alternates: {
    canonical: 'https://euborder.com/ees/what-is-ees'
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

export default function WhatIsEESPage() {
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
            <span className="text-gray-900">What is EES</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            🚀 Launching October 12, 2025
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What is the EES System?
            <span className="block text-blue-600 mt-2">Complete Entry/Exit System Guide</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            The EU Entry/Exit System (EES) is a revolutionary digital border control system that replaces passport stamps with biometric registration. Here's everything you need to know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/preparation"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target"
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              Get Prepared for EES
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/ees/guide"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors tap-target"
            >
              Get the Complete Guide (£7.99)
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Definition */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">EES in 30 Seconds</h2>
            <p className="text-lg text-gray-700 mb-6">
              The <strong>Entry/Exit System (EES)</strong> is an EU-wide digital border system that will register non-EU travelers entering or leaving the Schengen Area. Instead of passport stamps, the system will record your biometric data (fingerprints and facial image) and track your stay duration automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <Calendar className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Launch Date</div>
                  <div className="text-gray-600">October 12, 2025</div>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Coverage</div>
                  <div className="text-gray-600">29 Schengen countries</div>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Who's Affected</div>
                  <div className="text-gray-600">All non-EU travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">

          {/* How EES Works */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How the EES System Works</h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">First Entry: Biometric Registration</h3>
                    <p className="text-gray-600 mb-3">
                      On your first entry to the Schengen Area after October 2025, you'll register your biometrics at the border. This includes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">All 10 fingerprints scanned</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Facial image captured</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Passport details recorded</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Entry/exit dates automatically logged</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                      <Clock className="w-4 h-4 inline mr-2" />
                      <strong>Time required:</strong> 5-10 minutes for initial registration
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Data Storage & Security</h3>
                    <p className="text-gray-600 mb-3">
                      Your biometric data is stored securely in the EU's central database for 3 years:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Encrypted with EU data protection standards</span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Automatic deletion after 3 years</span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Only accessible by authorized border officials</span>
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">GDPR compliant with full privacy rights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Return Visits: Faster Processing</h3>
                    <p className="text-gray-600 mb-3">
                      On subsequent visits within 3 years, border crossings become much faster:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Quick fingerprint or facial verification (2-3 minutes)</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Automatic 90/180 compliance checking</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Self-service kiosks available</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">No more passport stamp ink delays</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why EES is Being Introduced */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why is the EU Introducing EES?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <FileText className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Replace Passport Stamps</h3>
                <p className="text-gray-600">
                  Manual passport stamps are outdated, prone to errors, and can be illegible. EES provides a reliable digital record that's accurate, traceable, and verifiable.
                </p>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-6">
                <Shield className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced Security</h3>
                <p className="text-gray-600">
                  Biometric data makes it nearly impossible to use fraudulent travel documents. The system helps detect overstays and prevent unauthorized entry.
                </p>
              </div>

              <div className="bg-white border border-purple-200 rounded-xl p-6">
                <Zap className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Faster Border Processing</h3>
                <p className="text-gray-600">
                  Once registered, travelers move through borders more quickly. Self-service kiosks and automated gates reduce queuing times significantly.
                </p>
              </div>

              <div className="bg-white border border-orange-200 rounded-xl p-6">
                <Globe className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Better Compliance Tracking</h3>
                <p className="text-gray-600">
                  Automatic tracking of the 90/180 day rule prevents accidental overstays. Both travelers and border officials have clear, real-time compliance status.
                </p>
              </div>
            </div>
          </section>

          {/* Key Differences */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">EES vs. Traditional Passport Stamps</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                    <th className="px-6 py-4 text-left font-semibold">Passport Stamps (Old)</th>
                    <th className="px-6 py-4 text-left font-semibold">EES System (New)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Registration</td>
                    <td className="px-6 py-4 text-gray-600">Manual ink stamps</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Biometric digital record</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Accuracy</td>
                    <td className="px-6 py-4 text-gray-600">Illegible, can fade/smudge</td>
                    <td className="px-6 py-4 text-green-600 font-medium">100% accurate digital data</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Compliance Tracking</td>
                    <td className="px-6 py-4 text-gray-600">Manual calculation required</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Automatic 90/180 tracking</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Processing Time (First Entry)</td>
                    <td className="px-6 py-4 text-gray-600">2-3 minutes</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">5-10 minutes (one-time)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Return Visits</td>
                    <td className="px-6 py-4 text-gray-600">Same 2-3 minutes each time</td>
                    <td className="px-6 py-4 text-green-600 font-medium">1-2 minutes with kiosks</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Security</td>
                    <td className="px-6 py-4 text-gray-600">Can be forged</td>
                    <td className="px-6 py-4 text-green-600 font-medium">Biometric verification</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Who Needs to Register */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Who Needs to Register for EES?</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                Must Register (All Non-EU Travelers)
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>• UK citizens (post-Brexit)</li>
                <li>• US, Canadian, and Australian citizens</li>
                <li>• All visa-exempt third-country nationals</li>
                <li>• Anyone with a Schengen short-stay visa</li>
                <li>• Children of all ages (with parental consent)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                Exempt from EES
              </h3>
              <ul className="space-y-2 text-green-800">
                <li>• EU/EEA/Swiss citizens</li>
                <li>• EU long-term residents</li>
                <li>• Holders of EU long-stay visas or residence permits</li>
                <li>• Diplomats with official passports</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Prepare for EES?</h2>
              <p className="text-lg mb-6 text-blue-100">
                Get our comprehensive EES Readiness Guide with step-by-step preparation, country-specific tips, and downloadable checklists.
              </p>
              <Link
                href="/ees/guide"
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors tap-target"
              >
                Get the Complete EES Guide - £7.99
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Common Questions About EES</h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>When does EES start?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  The EU Entry/Exit System officially launches on October 12, 2025. All Schengen area border crossings will implement the system from this date, though some countries may phase in self-service kiosks gradually over the following months.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Is EES the same as ETIAS?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No, they are different systems that work together. EES is the biometric registration system at borders. ETIAS is a pre-travel authorization system (launching 2026) that travelers must apply for before arrival, similar to the US ESTA. Both will be required for visa-exempt travelers.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>How much does EES registration cost?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EES registration is completely free. There is no fee to register your biometric data or use the system. However, ETIAS (when it launches in 2026) will cost €7 for travelers aged 18-70.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Can I refuse to provide biometric data?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No, providing biometric data is mandatory for entry to the Schengen Area. Refusal will result in entry being denied. The only exceptions are for physical impossibility (e.g., missing fingers due to injury) with medical documentation.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>What happens if I overstay with EES?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EES makes overstays much easier to detect. The system automatically tracks your 90/180 day compliance and will alert border officials if you attempt to overstay. Penalties include fines (€500-1000+), entry bans (1-5 years), and deportation.
                </p>
              </details>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Next Steps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/ees/preparation"
                className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-700">
                  EES Preparation Checklist
                </h3>
                <p className="text-blue-800 mb-4">
                  Everything you need to do before your first EES registration at the border.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  Get Prepared <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/ees/vs-etias"
                className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-green-900 mb-3 group-hover:text-green-700">
                  EES vs ETIAS: What's the Difference?
                </h3>
                <p className="text-green-800 mb-4">
                  Understand how EES and ETIAS work together for complete EU border compliance.
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  Compare Systems <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
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
        page="what-is-ees"
        title="What is the EES System? Complete EU Entry/Exit System Guide 2025"
        description="Comprehensive guide to the EU Entry/Exit System (EES) launching October 2025. Learn about biometric registration, requirements, how it works, and preparation."
        url="https://euborder.com/ees/what-is-ees"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES System', url: 'https://euborder.com/ees' },
          { name: 'What is EES', url: 'https://euborder.com/ees/what-is-ees' },
        ]}
        faqItems={[
          {
            question: 'When does EES start?',
            answer: 'The EU Entry/Exit System officially launches on October 12, 2025.'
          },
          {
            question: 'Is EES the same as ETIAS?',
            answer: 'No, they are different systems. EES is biometric registration at borders, while ETIAS is pre-travel authorization (2026).'
          },
          {
            question: 'How much does EES cost?',
            answer: 'EES registration is completely free. There is no fee to register your biometric data.'
          },
          {
            question: 'Who needs to register for EES?',
            answer: 'All non-EU travelers including UK citizens, US, Canadian, Australian citizens, and anyone with a short-stay visa.'
          }
        ]}
      />
    </div>
  )
}
