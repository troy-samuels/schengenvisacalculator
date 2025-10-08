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
  Eye,
  Lock,
  FileText,
  Info
} from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { EESGuideCTA } from '@/components/ees/EESGuideCTA'

export const metadata: Metadata = {
  title: 'EES Biometric Registration: Complete EU Fingerprint & Facial Image Guide 2025',
  description:
    'Everything about EES biometric registration: fingerprint scanning, facial image capture, data storage, privacy protection, and what to expect at EU borders.',
  keywords: [
    'ees biometrics',
    'eu biometric registration',
    'ees fingerprints',
    'ees facial recognition',
    'biometric border control',
    'ees biometric data',
    'eu fingerprint scanning',
    'ees facial image',
    'biometric data privacy',
    'ees data protection'
  ],
  openGraph: {
    title: 'EES Biometric Registration: Complete Fingerprint & Facial Image Guide',
    description:
      'Comprehensive guide to EES biometric registration process, data privacy, and what happens to your fingerprints and facial image.',
    url: 'https://euborder.com/ees/biometrics',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-biometrics-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EES Biometric Registration Guide'
      }
    ],
    type: 'article'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/biometrics'
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

export default function EESBiometricsPage() {
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
            <span className="text-gray-900">Biometric Registration</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            🔐 Secure Biometric Registration
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EES Biometric Registration
            <span className="block text-blue-600 mt-2">Fingerprints & Facial Recognition</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Complete guide to the biometric data collection process for the EU Entry/Exit System. Learn what data is collected, how it's used, and your privacy rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target"
            >
              <FileText className="w-5 h-5 mr-2" />
              Get Complete Preparation Guide
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">

          {/* What Data is Collected */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">What Biometric Data is Collected?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
                <Fingerprint className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Fingerprint Scanning</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>All 10 fingerprints</strong> scanned digitally</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Flat fingerprint scan</strong> of all fingers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Multiple attempts</strong> if initial scan fails</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>No ink or mess</strong> - completely digital</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
                <Camera className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Facial Image Capture</h3>
                <ul className="space-y-3 text-purple-800">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Live photo taken</strong> at border control</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Neutral expression required</strong> (no smiling)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Glasses/hats removed</strong> for clear image</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Matched with passport photo</strong> for verification</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Additional Data Collected</h4>
                  <p className="text-green-800 mb-3">
                    In addition to biometrics, EES records:
                  </p>
                  <ul className="text-green-700 space-y-1">
                    <li>• Full passport/travel document details</li>
                    <li>• Entry and exit dates</li>
                    <li>• Border crossing location</li>
                    <li>• Travel purpose (tourism, business, family, etc.)</li>
                    <li>• Accommodation details (if requested)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Registration Process */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">The Registration Process</h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Passport Scanning</h3>
                    <p className="text-gray-600">
                      Your passport is scanned to extract your personal details. This includes name, nationality, date of birth, and passport number.
                    </p>
                    <div className="mt-3 text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: 30 seconds
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fingerprint Collection</h3>
                    <p className="text-gray-600 mb-3">
                      All 10 fingerprints are scanned on a digital reader. The process is:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Place your 4 right fingers on the scanner (index to pinky)</li>
                      <li>Place your right thumb separately</li>
                      <li>Repeat with left hand (4 fingers, then thumb)</li>
                      <li>Officer verifies all prints are clear</li>
                    </ol>
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                      <strong>Tip:</strong> Ensure hands are clean and dry. Lotion, sweat, or dirt can interfere with scanning.
                    </div>
                    <div className="mt-3 text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: 2-3 minutes
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Facial Image Capture</h3>
                    <p className="text-gray-600 mb-3">
                      A high-resolution photo of your face is taken using a camera at the border desk:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Look directly at the camera</span>
                      </li>
                      <li className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Remove glasses, hats, or face coverings</span>
                      </li>
                      <li className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Maintain neutral expression (no smiling)</span>
                      </li>
                      <li className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Photo is automatically compared to passport image</span>
                      </li>
                    </ul>
                    <div className="mt-3 text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: 1 minute
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Data Verification & Storage</h3>
                    <p className="text-gray-600">
                      The border officer reviews all collected data, asks a few questions about your travel purpose, and finalizes your entry record. Your biometric data is then securely stored in the central EES database.
                    </p>
                    <div className="mt-3 text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: 1-2 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="text-lg font-semibold text-blue-900 mb-2">Total First-Time Registration</p>
              <p className="text-3xl font-bold text-blue-600 mb-2">5-10 minutes</p>
              <p className="text-sm text-blue-700">Subsequent entries: 1-2 minutes with self-service kiosks</p>
            </div>
          </section>

          {/* Data Storage & Privacy */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Data Storage & Privacy Protection</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-green-200 rounded-xl p-6">
                <Shield className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">How Long is Data Stored?</h3>
                <p className="text-gray-600 mb-4">
                  Your biometric data is stored for <strong>3 years</strong> from your last exit from the Schengen Area.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Automatic deletion after 3 years</li>
                  <li>• Used to speed up future entries</li>
                  <li>• Updated if you re-enter within 3 years</li>
                  <li>• Cannot be accessed after deletion</li>
                </ul>
              </div>

              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <Lock className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Who Can Access Your Data?</h3>
                <p className="text-gray-600 mb-4">
                  Access to EES data is strictly controlled and limited to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Authorized border control officials only</li>
                  <li>• Law enforcement (with legal authorization)</li>
                  <li>• EU data protection authorities</li>
                  <li>• <strong>Not</strong> shared with third countries</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                GDPR Compliance & Your Rights
              </h3>
              <p className="text-purple-800 mb-4">
                EES fully complies with EU General Data Protection Regulation (GDPR). You have the right to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                <div>
                  <strong>✓ Access:</strong> View your stored data
                </div>
                <div>
                  <strong>✓ Rectification:</strong> Correct inaccurate data
                </div>
                <div>
                  <strong>✓ Erasure:</strong> Request deletion after 3 years
                </div>
                <div>
                  <strong>✓ Redress:</strong> File complaints with authorities
                </div>
              </div>
            </div>
          </section>

          {/* Special Cases */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Special Cases & Exceptions</h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if my fingerprints can't be scanned?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>
                    If fingerprints cannot be captured due to injury, medical condition, or age, alternative procedures apply:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Inform border officers immediately</li>
                    <li>Medical documentation may be required</li>
                    <li>Facial recognition will be primary verification</li>
                    <li>Manual entry verification as backup</li>
                    <li>Entry will not be denied due to technical impossibility</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Are children's biometrics collected?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>
                    Yes, but with special considerations:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>All ages:</strong> Facial image captured</li>
                    <li><strong>Age 12+:</strong> Full fingerprint collection</li>
                    <li><strong>Under 12:</strong> No fingerprints required</li>
                    <li>Parental consent and presence required</li>
                    <li>Gentle, child-friendly process</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I refuse biometric registration?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-gray-600 space-y-3">
                  <p className="font-semibold text-red-600">
                    No. Providing biometric data is mandatory for entry to the Schengen Area.
                  </p>
                  <p>
                    Refusal to provide biometric data will result in entry being denied. The only exceptions are cases of physical impossibility with proper medical documentation.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Fully Prepared for EES Biometric Registration</h2>
              <p className="text-lg mb-6 text-blue-100">
                Our comprehensive guide includes detailed biometric preparation, privacy tips, troubleshooting, and country-specific procedures.
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
        page="ees-biometrics"
        title="EES Biometric Registration: Complete Fingerprint & Facial Image Guide"
        description="Complete guide to EES biometric registration including fingerprint scanning, facial image capture, data storage, and privacy protection."
        url="https://euborder.com/ees/biometrics"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES System', url: 'https://euborder.com/ees' },
          { name: 'Biometric Registration', url: 'https://euborder.com/ees/biometrics' },
        ]}
        howToSteps={[
          { name: 'Passport Scanning', text: 'Your passport is scanned to extract personal details (30 seconds)' },
          { name: 'Fingerprint Collection', text: 'All 10 fingerprints are scanned digitally (2-3 minutes)' },
          { name: 'Facial Image Capture', text: 'High-resolution photo taken for biometric verification (1 minute)' },
          { name: 'Data Verification', text: 'Officer reviews data and finalizes your entry record (1-2 minutes)' }
        ]}
        faqItems={[
          {
            question: 'How long does biometric registration take?',
            answer: 'First-time registration takes 5-10 minutes. Subsequent entries take only 1-2 minutes with self-service kiosks.'
          },
          {
            question: 'How long is my biometric data stored?',
            answer: 'Your biometric data is stored for 3 years from your last exit from the Schengen Area, then automatically deleted.'
          },
          {
            question: 'What if my fingerprints cannot be scanned?',
            answer: 'Alternative verification methods will be used. Entry will not be denied due to technical impossibility with proper documentation.'
          }
        ]}
      />
    </div>
  )
}
