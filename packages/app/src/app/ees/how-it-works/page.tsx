import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Fingerprint,
  Camera,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Plane,
  FileCheck,
  Zap,
  UserCheck,
  MapPin
} from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { EESGuideCTA } from '@/components/ees/EESGuideCTA'

export const metadata: Metadata = {
  title: 'How EES Works: Complete EU Border Process Guide 2025',
  description:
    'Step-by-step guide to how the EU Entry/Exit System works at borders. First entry registration, return visits, self-service kiosks, and complete border process explained.',
  keywords: [
    'how ees works',
    'ees process',
    'ees border procedure',
    'how does ees work',
    'ees step by step',
    'ees border process',
    'ees registration process',
    'ees at border',
    'ees entry process',
    'ees system process'
  ],
  openGraph: {
    title: 'How EES Works: Complete EU Border Process Guide',
    description:
      'Complete step-by-step guide to the EU Entry/Exit System border process. First entry, return visits, and self-service kiosks explained.',
    url: 'https://euborder.com/ees/how-it-works',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/how-ees-works-og.jpg',
        width: 1200,
        height: 630,
        alt: 'How EES Works - Border Process Guide'
      }
    ],
    type: 'article'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/how-it-works'
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

export default function HowEESWorksPage() {
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
            <span className="text-gray-900">How It Works</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            📋 Complete Process Guide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How EES Works at EU Borders
            <span className="block text-blue-600 mt-2">Step-by-Step Process</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Complete walkthrough of the EU Entry/Exit System border process. From arrival to exit, understand exactly what happens at each step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target"
            >
              <FileCheck className="w-5 h-5 mr-2" />
              Get Complete Guide (£7.99)
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Arrival</h3>
              <p className="text-gray-600">Approach EES desk or kiosk</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fingerprint className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Biometrics</h3>
              <p className="text-gray-600">Fingerprints + facial image</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Verification</h3>
              <p className="text-gray-600">Officer reviews & approves</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Entry</h3>
              <p className="text-gray-600">Proceed to destination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">

          {/* First Entry Process */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">First Entry: Complete Registration</h2>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold text-blue-900 mb-2">Total Time: 5-10 minutes</p>
                  <p className="text-blue-800">
                    Your first EES entry requires full biometric registration. Subsequent visits will be much faster (1-2 minutes with kiosks).
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Arrival at Border</h3>
                    <p className="text-gray-600 mb-4">
                      After landing and collecting baggage (if applicable), proceed to passport control. Look for signs directing you to:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong>"Non-EU/EEA/Swiss Nationals"</strong> line</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong>"EES Registration"</strong> desks or kiosks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700"><strong>"Third-Country Nationals"</strong> (same as above)</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                      <strong>Tip:</strong> Follow signs carefully. Do NOT join the EU/EEA citizens line as you'll need EES registration.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Document Presentation</h3>
                    <p className="text-gray-600 mb-4">
                      Present your documents to the border officer or at a self-service kiosk:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FileCheck className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Valid passport (6+ months remaining validity)</span>
                      </li>
                      <li className="flex items-start">
                        <FileCheck className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Return/onward ticket (if required)</span>
                      </li>
                      <li className="flex items-start">
                        <FileCheck className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Proof of accommodation (if requested)</span>
                      </li>
                      <li className="flex items-start">
                        <FileCheck className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">ETIAS authorization (from 2026)</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-600">
                      <strong>What happens:</strong> Your passport is scanned automatically. The system extracts your personal details and checks them against security databases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Biometric Data Collection</h3>
                    <p className="text-gray-600 mb-4">
                      The most important step - registering your biometric data:
                    </p>

                    <div className="bg-purple-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                        <Fingerprint className="w-5 h-5 mr-2" />
                        Fingerprint Scanning (2-3 minutes)
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 text-purple-800">
                        <li>Place 4 right fingers on scanner (index to pinky)</li>
                        <li>Place right thumb separately</li>
                        <li>Repeat with left hand (4 fingers, then thumb)</li>
                        <li>Officer verifies all prints are clear</li>
                      </ol>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                        <Camera className="w-5 h-5 mr-2" />
                        Facial Image Capture (1 minute)
                      </h4>
                      <ul className="space-y-2 text-purple-800">
                        <li>• Look directly at camera</li>
                        <li>• Remove glasses, hats, face coverings</li>
                        <li>• Neutral expression (no smiling)</li>
                        <li>• Photo matched with passport image</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-orange-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-orange-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Questions & Verification</h3>
                    <p className="text-gray-600 mb-4">
                      The border officer may ask you questions about your trip:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Purpose of visit:</strong> Tourism, business, family visit, etc.</li>
                      <li><strong>Duration of stay:</strong> How many days you plan to stay</li>
                      <li><strong>Accommodation:</strong> Where you'll be staying</li>
                      <li><strong>Means of support:</strong> How you'll fund your trip</li>
                      <li><strong>Return plans:</strong> Evidence you'll leave before 90 days</li>
                    </ul>
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm text-orange-800">
                      <strong>Be prepared to answer honestly and concisely.</strong> Have documentation ready if needed.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-green-600">5</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Entry Approval & Record Creation</h3>
                    <p className="text-gray-600 mb-4">
                      Once everything is verified:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Your EES entry record is created with all biometric data</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Entry date is logged automatically (no stamp needed)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">You receive verbal confirmation of entry</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Your 90/180 day counter starts automatically</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-600">
                      <strong>You're in!</strong> Proceed to collect baggage (if you haven't already) and exit the terminal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Return Visits */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Return Visits: Faster Processing</h2>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold text-green-900 mb-2">Total Time: 1-2 minutes</p>
                  <p className="text-green-800">
                    Once you're registered in EES, future entries are much faster using self-service kiosks or quick verification at officer desks.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <Fingerprint className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Self-Service Kiosks</h3>
                <p className="text-gray-600 mb-4">
                  Most major airports will have EES self-service kiosks:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Scan your passport</li>
                  <li>Quick fingerprint verification (1-2 fingers)</li>
                  <li>Facial recognition scan</li>
                  <li>Automatic gate opens if verified</li>
                </ol>
                <div className="mt-4 text-sm text-blue-700">
                  <strong>Speed:</strong> 60-90 seconds typical
                </div>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-6">
                <UserCheck className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Officer Desk (Quick Lane)</h3>
                <p className="text-gray-600 mb-4">
                  If kiosks aren't available or you prefer human interaction:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Present passport to officer</li>
                  <li>Quick fingerprint or facial scan</li>
                  <li>System confirms your existing record</li>
                  <li>Entry approved in seconds</li>
                </ol>
                <div className="mt-4 text-sm text-green-700">
                  <strong>Speed:</strong> 2-3 minutes typical
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">What EES Checks on Return Visits</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Your biometric data matches existing record</li>
                <li>• Your 90/180 day compliance status (automatic calculation)</li>
                <li>• No security alerts or entry bans</li>
                <li>• Passport is still valid</li>
                <li>• ETIAS authorization is active (from 2026)</li>
              </ul>
            </div>
          </section>

          {/* Exit Process */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Leaving the Schengen Area</h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exit Registration Process</h3>
              <p className="text-gray-600 mb-4">
                When you leave the Schengen Area, your exit must also be registered with EES:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-blue-600">1</div>
                  <p className="text-gray-700 pt-1">Quick passport scan at exit control</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-blue-600">2</div>
                  <p className="text-gray-700 pt-1">Fingerprint or facial verification (very quick)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-blue-600">3</div>
                  <p className="text-gray-700 pt-1">Exit date automatically logged in system</p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-blue-600">4</div>
                  <p className="text-gray-700 pt-1">Your 90/180 day counter updated</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Why Exit Registration is Important
              </h3>
              <p className="text-green-800 mb-3">
                <strong>Critical:</strong> Always ensure your exit is properly registered. Without exit registration:
              </p>
              <ul className="space-y-1 text-green-700">
                <li>• The system thinks you're still in Schengen (overstay)</li>
                <li>• You may face entry problems on future visits</li>
                <li>• Your 90/180 day count will be incorrect</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Master the Complete EES Process</h2>
              <p className="text-lg mb-6 text-blue-100">
                Get our comprehensive guide with detailed procedures, country-specific tips, troubleshooting, and downloadable checklists.
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
        page="how-ees-works"
        title="How EES Works: Complete EU Border Process Guide"
        description="Complete step-by-step guide to how the EU Entry/Exit System works at borders. First entry registration, return visits, and exit process explained."
        url="https://euborder.com/ees/how-it-works"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES System', url: 'https://euborder.com/ees' },
          { name: 'How It Works', url: 'https://euborder.com/ees/how-it-works' },
        ]}
        howToSteps={[
          { name: 'Arrival at Border', text: 'Proceed to Non-EU nationals line and locate EES registration desk or kiosk' },
          { name: 'Document Presentation', text: 'Present passport and required travel documents for scanning and verification' },
          { name: 'Biometric Collection', text: 'Provide all 10 fingerprints and facial image for registration (5-10 minutes first time)' },
          { name: 'Questions & Verification', text: 'Answer officer questions about travel purpose, accommodation, and duration' },
          { name: 'Entry Approval', text: 'Receive confirmation and proceed with digital entry record (no stamp needed)' }
        ]}
        faqItems={[
          {
            question: 'How long does EES registration take?',
            answer: 'First-time registration takes 5-10 minutes. Subsequent entries take only 1-2 minutes with self-service kiosks.'
          },
          {
            question: 'What happens on return visits?',
            answer: 'Return visits are much faster (1-2 minutes) using self-service kiosks or quick verification at officer desks.'
          },
          {
            question: 'Do I need to register my exit?',
            answer: 'Yes, your exit must be registered at departure. This ensures accurate 90/180 day tracking and prevents future entry problems.'
          }
        ]}
      />
    </div>
  )
}
