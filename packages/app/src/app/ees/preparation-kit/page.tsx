import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle,
  AlertTriangle,
  Fingerprint,
  FileText,
  Clock,
  Shield,
  Camera,
  Smartphone,
  Globe,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  Download,
  Star,
  Zap,
  AlertCircle,
  Info
} from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { ABTestCTA } from '@/components/ab-test-cta'

export const metadata: Metadata = {
  title: 'EES Preparation Kit 2025: Complete Biometric Registration Toolkit | EU Border Authority',
  description: 'Master EES biometric registration with our complete preparation kit. Step-by-step guides, document checklists, border procedures, and expert preparation strategies for October 2025 launch.',
  keywords: [
    'EES preparation kit',
    'EES biometric registration',
    'EU border preparation',
    'EES requirements checklist',
    'biometric border system prep',
    'EES document requirements',
    'EU entry exit preparation',
    'EES registration guide',
    'biometric travel preparation',
    'EES implementation prep'
  ],
  openGraph: {
    title: 'EES Preparation Kit 2025: Complete Biometric Registration Toolkit',
    description: 'Master EES biometric registration with our complete preparation kit. Expert guides for smooth border crossing starting October 2025.',
    url: 'https://euborder.com/ees/preparation-kit',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-preparation-kit-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EES Preparation Kit - Complete Biometric Registration Toolkit'
      }
    ],
    type: 'website'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/preparation-kit'
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

export default function EESPreparationKitPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  🛡️ Authority Preparation Kit
                </span>
                <span className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                  100% EES Compliant
                </span>
                <span className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                  October 2025 Ready
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                EES Preparation Kit
                <span className="block text-blue-600 mt-2">Complete Biometric Toolkit</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Master EU biometric border registration with the definitive preparation toolkit.
                Expert guides, document checklists, and step-by-step procedures for smooth EES compliance.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>Authority Expert Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  <span>Zero Border Delays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>100% Compliance Guaranteed</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#preparation-checklist"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Get Preparation Checklist
                </Link>
                <Link
                  href="#biometric-guide"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <Fingerprint className="w-5 h-5 mr-2" />
                  Biometric Requirements
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Alert */}
        <section className="py-8 px-4 bg-orange-100 border-l-4 border-orange-500">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Critical: EES Launches October 2025
                </h3>
                <p className="text-orange-700 mb-4">
                  Unprepared travelers will face significant delays at EU borders. Start your preparation now
                  to ensure smooth biometric registration when the system launches.
                </p>
                <Link
                  href="#quick-start"
                  className="inline-flex items-center text-orange-800 hover:text-orange-900 font-semibold"
                >
                  Get Quick Start Guide <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Checklist */}
        <section id="preparation-checklist" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete EES Preparation Checklist
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Authority-verified checklist ensuring 100% EES compliance and zero border delays
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Before Travel */}
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Clock className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Before You Travel</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Valid Passport Check</h4>
                      <p className="text-gray-600 text-sm">Ensure passport validity exceeds 6 months from travel date</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Digital Photos Ready</h4>
                      <p className="text-gray-600 text-sm">Backup digital copies of passport and travel documents</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Accommodation Proof</h4>
                      <p className="text-gray-600 text-sm">Hotel bookings, rental agreements, or host invitations</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Return Flight Tickets</h4>
                      <p className="text-gray-600 text-sm">Proof of onward travel from Schengen area</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Travel Insurance</h4>
                      <p className="text-gray-600 text-sm">Minimum €30,000 coverage valid across Schengen area</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Financial Proof</h4>
                      <p className="text-gray-600 text-sm">Bank statements showing sufficient funds for stay</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* At the Border */}
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Fingerprint className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">At the Border</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Clean Fingerprints</h4>
                      <p className="text-gray-600 text-sm">Remove hand cream, ensure clean, dry fingers for scanning</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Face Scan Ready</h4>
                      <p className="text-gray-600 text-sm">Remove glasses, hat, and face coverings for facial recognition</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Follow Instructions</h4>
                      <p className="text-gray-600 text-sm">Listen carefully to border official guidance during registration</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Allow Extra Time</h4>
                      <p className="text-gray-600 text-sm">First-time registration may take 3-5 minutes longer</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Keep Documents Ready</h4>
                      <p className="text-gray-600 text-sm">Have all supporting documents easily accessible</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Stay Patient</h4>
                      <p className="text-gray-600 text-sm">EES registration is mandatory - cooperation ensures smooth process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biometric Requirements */}
        <section id="biometric-guide" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Biometric Requirements Guide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Detailed guide to EES biometric data collection and registration process
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Fingerprint Requirements */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <Fingerprint className="h-10 w-10 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Fingerprint Collection</h3>
                    <p className="text-gray-600">All 10 fingerprints required</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Collection Process:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Digital scanning of all 10 fingerprints</li>
                      <li>• Flat fingerprint capture method</li>
                      <li>• Quality verification by system</li>
                      <li>• Retake if image quality insufficient</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-green-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Preparation Tips:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Clean hands thoroughly before travel</li>
                      <li>• Avoid hand cream 2 hours before</li>
                      <li>• Inform officers of injuries/bandages</li>
                      <li>• Remove rings that interfere with scanning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Facial Recognition */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <Camera className="h-10 w-10 text-green-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Facial Recognition</h3>
                    <p className="text-gray-600">High-quality facial image capture</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Capture Requirements:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Direct face-on positioning</li>
                      <li>• Remove glasses and headwear</li>
                      <li>• Neutral facial expression</li>
                      <li>• Eyes open, looking at camera</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">What to Avoid:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Sunglasses or tinted glasses</li>
                      <li>• Hair covering face or eyes</li>
                      <li>• Heavy makeup or face paint</li>
                      <li>• Smiling or facial expressions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Storage Information */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Data Storage & Privacy</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">3-Year Storage</h4>
                  <p className="text-gray-600 text-sm">Biometric data stored for exactly 3 years, then automatically deleted</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secure System</h4>
                  <p className="text-gray-600 text-sm">EU-LISA managed database with highest security standards</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cross-Border Access</h4>
                  <p className="text-gray-600 text-sm">Data accessible at all EU external border crossing points</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Document Requirements */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Essential Document Requirements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete documentation checklist for smooth EES registration and border crossing
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Primary Documents */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Primary Documents</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Valid passport (machine-readable)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">National ID card (EU citizens)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Valid visa (if required)</span>
                  </div>
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Supporting Documents</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Accommodation proof</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Return/onward flight tickets</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Travel insurance certificate</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Financial means proof</span>
                  </div>
                </div>
              </div>

              {/* Special Cases */}
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Special Cases</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Business invitation letter</span>
                  </div>
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Medical documentation (if applicable)</span>
                  </div>
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Student enrollment certificates</span>
                  </div>
                  <div className="flex items-start">
                    <Info className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Family relationship proof</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline & Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                EES Registration Timeline
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Step-by-step process flow for your first EES border crossing
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Arrival at Border</h3>
                  <p className="text-gray-600">Present your passport and supporting documents to border officials. Allow extra time for first-time EES registration.</p>
                </div>
                <div className="text-blue-600 font-semibold ml-4">~2-3 minutes</div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start">
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Biometric Data Collection</h3>
                  <p className="text-gray-600">Fingerprint scanning of all 10 fingers and facial image capture. Follow officer instructions for optimal data quality.</p>
                </div>
                <div className="text-green-600 font-semibold ml-4">~3-5 minutes</div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Data Processing & Verification</h3>
                  <p className="text-gray-600">System processes biometric data, creates your EES profile, and links it to your passport for future automated crossings.</p>
                </div>
                <div className="text-purple-600 font-semibold ml-4">~1-2 minutes</div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start">
                <div className="bg-orange-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-6 flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Entry Authorization</h3>
                  <p className="text-gray-600">Entry granted with digital record created. Your biometric profile is now active for 3 years across all EU external borders.</p>
                </div>
                <div className="text-orange-600 font-semibold ml-4">~1 minute</div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Total Time: 7-11 minutes (first-time registration)</h3>
              </div>
              <p className="text-gray-600">
                Subsequent crossings will be much faster (~1-2 minutes) as your biometric data is already in the system.
                The investment in proper preparation ensures smooth processing from day one.
              </p>
            </div>
          </div>
        </section>

        {/* A/B Testing CTA */}
        <section className="py-16 px-4 bg-white">
          <ABTestCTA country="EU" page="ees-preparation" />
        </section>

        {/* Download Resources */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Download Complete EES Toolkit
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get our comprehensive preparation materials for offline reference and sharing with travel companions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ees/toolkit-download"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF Toolkit
              </Link>
              <Link
                href="/ees/countries"
                className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                View Country Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Schema Markup */}
        <EnhancedSchema
          page="guide"
          title="EES Preparation Kit 2025: Complete Biometric Registration Toolkit"
          description="Master EES biometric registration with our complete preparation kit. Step-by-step guides, document checklists, border procedures, and expert preparation strategies for October 2025 launch."
          url="https://euborder.com/ees/preparation-kit"
          breadcrumbs={[
            { name: 'Home', url: 'https://euborder.com' },
            { name: 'EES System', url: 'https://euborder.com/ees' },
            { name: 'Preparation Kit', url: 'https://euborder.com/ees/preparation-kit' }
          ]}
          howToSteps={[
            {
              name: "Prepare Required Documents",
              text: "Gather passport, accommodation proof, return tickets, travel insurance, and financial documentation"
            },
            {
              name: "Prepare for Biometric Collection",
              text: "Clean hands, remove glasses and headwear, follow facial recognition requirements"
            },
            {
              name: "Arrive at Border Control",
              text: "Allow extra time for first-time EES registration and present all documents"
            },
            {
              name: "Complete Biometric Registration",
              text: "Follow officer instructions for fingerprint scanning and facial image capture"
            }
          ]}
          faqItems={[
            {
              question: "What documents do I need for EES registration?",
              answer: "You need a valid passport, accommodation proof, return tickets, travel insurance, and proof of sufficient funds for your stay."
            },
            {
              question: "How long does EES registration take?",
              answer: "First-time registration takes 7-11 minutes total. Subsequent crossings are much faster at 1-2 minutes as your data is already registered."
            },
            {
              question: "What biometric data does EES collect?",
              answer: "EES collects all 10 fingerprints and a facial image. This data is stored securely for 3 years and used for automated border crossings."
            }
          ]}
        />
      </div>
    </>
  )
}