import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Clock, Users, MapPin, CheckCircle, AlertCircle, ArrowRight, Info, Zap, Globe } from 'lucide-react';
import { EESGuideCTA } from '@/components/ees/EESGuideCTA';
import { EnhancedSchema } from '@/components/enhanced-schema';

export const metadata: Metadata = {
  title: 'EES at European Airports: Complete Guide to Airport Registration | 2025',
  description: 'How EES works at major European airports. Complete guide to biometric registration at Paris CDG, Amsterdam Schiphol, Frankfurt, Madrid, Rome, and Barcelona airports.',
  keywords: [
    'ees at airports',
    'ees airport registration',
    'airport biometric scanning',
    'ees kiosks airports',
    'paris cdg ees',
    'amsterdam schiphol ees',
    'frankfurt airport ees',
    'madrid airport ees',
    'eu airport entry requirements',
    'ees self service kiosks'
  ],
  openGraph: {
    title: 'EES at European Airports: Airport Registration Guide',
    description: 'Complete guide to EES registration at major European airports including queue times, kiosk locations, and procedures.',
    type: 'website',
    url: 'https://euborder.com/ees/airports'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EES at Airports: Complete Registration Guide',
    description: 'How to complete EES biometric registration at major European airports.'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/airports'
  }
};

export default function EESAirportsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/ees" className="text-gray-600 hover:text-blue-600 transition-colors">EES</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Airports</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            ✈️ Airport Procedures
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EES at European Airports
            <span className="block text-blue-600 mt-2">Complete Airport Registration Guide</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Navigate EES biometric registration at major European airports with confidence. Airport-specific procedures, kiosk locations, and queue time estimates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Airport Guide (£7.99)
            </Link>
            <Link
              href="/ees/how-it-works"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 transition-colors inline-flex items-center justify-center tap-target"
            >
              How EES Works
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* What to Expect Overview */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              What to Expect at Airport EES Kiosks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <MapPin className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-3">Kiosk Locations</h3>
                <p className="text-blue-800">
                  EES self-service kiosks are located in the <strong>arrivals area</strong> after you exit the aircraft. Look for signs reading:
                </p>
                <ul className="mt-3 space-y-1 text-blue-800 text-sm">
                  <li>• "EES Registration"</li>
                  <li>• "Non-EU Nationals"</li>
                  <li>• "Third-Country Nationals"</li>
                  <li>• "Biometric Registration"</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <Clock className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-indigo-900 mb-3">Time Estimates</h3>
                <div className="space-y-2 text-indigo-800">
                  <p className="flex items-center justify-between">
                    <span className="font-medium">First Registration:</span>
                    <span className="text-lg font-bold">5-10 min</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="font-medium">Return Visits:</span>
                    <span className="text-lg font-bold">&lt;1 min</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="font-medium">Launch Week (Oct 2025):</span>
                    <span className="text-lg font-bold">30-45 min</span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <Users className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-purple-900 mb-3">Staffed Assistance</h3>
                <p className="text-purple-800">
                  All major airports have <strong>border staff on duty</strong> to help with EES registration. Don't hesitate to ask for assistance - there's no penalty for requesting help.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <Globe className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-3">Multilingual Support</h3>
                <p className="text-green-800">
                  Kiosks support 24+ languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Polish, and more. Choose your language at the start.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900 font-medium mb-2">
                    Launch Week Advisory (October 12-25, 2025)
                  </p>
                  <p className="text-yellow-800 text-sm">
                    During the first two weeks after EES launch, <strong>arrive at least 3 hours before your flight</strong>. Airports will experience significant congestion as millions of travelers complete first-time registration. By November 2025, processing times will normalize.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* First CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Major Airports Breakdown */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Major European Airports: EES Implementation
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Here's what to expect at the busiest European airports serving international flights:
            </p>

            {/* Paris CDG */}
            <details className="bg-white border-2 border-gray-200 rounded-xl mb-4 group open:border-blue-300">
              <summary className="p-6 cursor-pointer flex items-center justify-between tap-target">
                <div className="flex items-center gap-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Paris Charles de Gaulle (CDG) 🇫🇷</h3>
                    <p className="text-sm text-gray-600">Europe's second-busiest airport</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>

              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">EES Infrastructure</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>120 self-service kiosks</strong> across all terminals (T1, T2A-F, T3)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>40 staffed registration desks</strong> for assistance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Dedicated EES areas</strong> in Terminal 2E (long-haul arrivals)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Multilingual staff</strong> fluent in English, French, Spanish, German</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Estimates & Tips</h4>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-900 mb-2"><strong>Launch Week (Oct 2025):</strong></p>
                      <p className="text-blue-800 text-sm">30-40 minutes additional time</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-2"><strong>Post-Stabilization (Nov 2025+):</strong></p>
                      <p className="text-green-800 text-sm">5-10 minutes for first registration<br/>Less than 1 minute for returns</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>CDG Tip:</strong> Terminal 2E handles most long-haul flights. Use kiosks in the satellite terminals (K, L, M) for shorter queues.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            {/* Amsterdam Schiphol */}
            <details className="bg-white border-2 border-gray-200 rounded-xl mb-4 group open:border-blue-300">
              <summary className="p-6 cursor-pointer flex items-center justify-between tap-target">
                <div className="flex items-center gap-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Amsterdam Schiphol (AMS) 🇳🇱</h3>
                    <p className="text-sm text-gray-600">Europe's third-busiest airport</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>

              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">EES Infrastructure</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>90 automated gates</strong> with biometric verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>25 registration desks</strong> with multilingual staff</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Integrated with SmartGate system</strong> for faster processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Centralized EES hub</strong> in arrivals hall (after baggage claim)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Estimates & Tips</h4>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-900 mb-2"><strong>Launch Week (Oct 2025):</strong></p>
                      <p className="text-blue-800 text-sm">25-35 minutes additional time</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-2"><strong>Post-Stabilization (Nov 2025+):</strong></p>
                      <p className="text-green-800 text-sm">3-8 minutes for first registration<br/>Automated gates: &lt;30 seconds</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>Schiphol Tip:</strong> Amsterdam is known for efficient border processing. SmartGate integration makes Schiphol one of the fastest EES airports.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            {/* Frankfurt */}
            <details className="bg-white border-2 border-gray-200 rounded-xl mb-4 group open:border-blue-300">
              <summary className="p-6 cursor-pointer flex items-center justify-between tap-target">
                <div className="flex items-center gap-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Frankfurt Airport (FRA) 🇩🇪</h3>
                    <p className="text-sm text-gray-600">Germany's largest airport</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>

              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">EES Infrastructure</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>110 EES kiosks</strong> in Terminal 1 & 2</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Automated passport control integration</strong> (EasyPASS compatible)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>30 staffed counters</strong> for complex cases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Dedicated zones</strong> in both Schengen and non-Schengen areas</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Estimates & Tips</h4>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-900 mb-2"><strong>Launch Week (Oct 2025):</strong></p>
                      <p className="text-blue-800 text-sm">30-40 minutes additional time</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-2"><strong>Post-Stabilization (Nov 2025+):</strong></p>
                      <p className="text-green-800 text-sm">5-10 minutes for first registration<br/>EasyPASS gates: &lt;1 minute</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>Frankfurt Tip:</strong> Terminal 1 handles most non-EU arrivals. Zone C has the most kiosks for long-haul flights.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            {/* Madrid Barajas */}
            <details className="bg-white border-2 border-gray-200 rounded-xl mb-4 group open:border-blue-300">
              <summary className="p-6 cursor-pointer flex items-center justify-between tap-target">
                <div className="flex items-center gap-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Madrid Barajas (MAD) 🇪🇸</h3>
                    <p className="text-sm text-gray-600">Spain's busiest airport</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>

              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">EES Infrastructure</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>85 registration kiosks</strong> in Terminal 4 & 4S</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Multilingual staff</strong> (Spanish, English, French, German, Portuguese)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Separate EES lanes</strong> for families with children</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>20 assistance desks</strong> throughout arrivals area</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Estimates & Tips</h4>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-900 mb-2"><strong>Launch Week (Oct 2025):</strong></p>
                      <p className="text-blue-800 text-sm">25-35 minutes additional time</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-2"><strong>Post-Stabilization (Nov 2025+):</strong></p>
                      <p className="text-green-800 text-sm">5-10 minutes for first registration<br/>Return visits: &lt;1 minute</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>Madrid Tip:</strong> Terminal 4S handles most long-haul arrivals. Use the shuttle train to T4 main for faster EES processing.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            {/* Rome Fiumicino */}
            <details className="bg-white border-2 border-gray-200 rounded-xl mb-4 group open:border-blue-300">
              <summary className="p-6 cursor-pointer flex items-center justify-between tap-target">
                <div className="flex items-center gap-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Rome Fiumicino (FCO) 🇮🇹</h3>
                    <p className="text-sm text-gray-600">Italy's largest airport</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>

              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">EES Infrastructure</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>75 self-service terminals</strong> across Terminal 1, 3, 5</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Dedicated EES registration area</strong> in Terminal 3 (non-Schengen arrivals)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Multilingual support</strong> (Italian, English, Spanish, French)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>18 staffed help desks</strong> for registration assistance</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Estimates & Tips</h4>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-900 mb-2"><strong>Launch Week (Oct 2025):</strong></p>
                      <p className="text-blue-800 text-sm">30-45 minutes additional time</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-2"><strong>Post-Stabilization (Nov 2025+):</strong></p>
                      <p className="text-green-800 text-sm">8-12 minutes for first registration<br/>Return visits: &lt;2 minutes</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>Rome Tip:</strong> Fiumicino can be congested during peak summer months. Register early morning for shorter queues.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            {/* Barcelona El Prat */}
            <details className="bg-white border-2 border-gray-200 rounded-xl mb-4 group open:border-blue-300">
              <summary className="p-6 cursor-pointer flex items-center justify-between tap-target">
                <div className="flex items-center gap-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Barcelona El Prat (BCN) 🇪🇸</h3>
                    <p className="text-sm text-gray-600">Popular tourist destination</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>

              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">EES Infrastructure</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>70 kiosks</strong> in Terminal 1 & 2</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Fast-track lanes</strong> for already-registered travelers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Peak season capacity</strong> (summer tourist season optimized)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>15 staffed counters</strong> with multilingual assistance</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Estimates & Tips</h4>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-900 mb-2"><strong>Launch Week (Oct 2025):</strong></p>
                      <p className="text-blue-800 text-sm">25-35 minutes additional time</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-2"><strong>Post-Stabilization (Nov 2025+):</strong></p>
                      <p className="text-green-800 text-sm">5-10 minutes for first registration<br/>Fast-track: &lt;1 minute</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <strong>Barcelona Tip:</strong> T1 is newer with more kiosks. Summer peak season (Jun-Sep) has extended staffing hours.
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </section>

          {/* Second CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Queue Time Tips */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Tips to Minimize Queue Times
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Travel During Off-Peak Times</h3>
                <p className="text-gray-600 mb-3">
                  Avoid peak arrival times (7-9 AM, 12-2 PM, 5-7 PM) when multiple long-haul flights land simultaneously.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Best Times:</strong> Early morning (6-7 AM) or late evening (9-11 PM) flights have shorter EES queues.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Use Self-Service Kiosks</h3>
                <p className="text-gray-600 mb-3">
                  Self-service kiosks are typically faster than staffed counters. Follow on-screen instructions - they're user-friendly.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>If Unsure:</strong> Border staff are nearby to assist. Don't wait in the staffed queue unnecessarily.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Avoid Launch Week If Possible</h3>
                <p className="text-gray-600 mb-3">
                  If your travel is flexible, consider avoiding October 12-25, 2025 when EES launch delays will be highest.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Alternative:</strong> Travel before October 12 (no EES required) or wait until November (normalized processing).
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Have Documents Ready</h3>
                <p className="text-gray-600 mb-3">
                  Keep passport, proof of accommodation, and return ticket easily accessible before arriving at the kiosk.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Speed Tip:</strong> Digital copies on your phone work. Have them open before reaching the kiosk.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Smaller Airports</h3>
                <p className="text-gray-600 mb-3">
                  Smaller regional airports (Nice, Porto, Málaga) often have shorter EES queues than mega-hubs.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Example:</strong> Flying into Porto vs Lisbon, or Nice vs Paris CDG can save 15-20 minutes.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Register on First Entry</h3>
                <p className="text-gray-600 mb-3">
                  Complete your EES registration as soon as possible. After first registration, all future entries take less than 1 minute.
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Valid For:</strong> 3 years from first registration date across all Schengen countries.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Airport EES FAQs
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if I miss my connecting flight due to EES delays?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Airlines are aware of EES launch and have extended minimum connection times (MCT) for October-November 2025. If you miss a connection due to EES delays, the airline must rebook you on the next available flight at no cost. Document the EES queue time with photos/timestamps as proof.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do I register at the airport of my first EU entry or final destination?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  You register at your first EU entry point. Example: Flying New York → Paris → Barcelona - register in Paris. Flying London → Rome (direct) - register in Rome. If your first entry is a Schengen country, subsequent flights within Schengen don't require additional EES checks.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I register with EES at departure from my home country?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. EES registration must be completed at the EU border upon arrival. Some major transit hubs (e.g., UK airports with Eurostar terminals) may have EES registration areas for Eurostar passengers departing to France/Belgium, but general flights require registration at the EU arrival airport.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Are there priority EES lanes for business class or frequent flyers?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Currently, no official priority EES lanes exist. However, some airports (Barcelona, Munich) have "fast-track" lanes for already-registered travelers. First-time registration is the same process regardless of ticket class. After registration, automated gates serve as the "fast-track" option.
                </p>
              </details>
            </div>
          </section>

          {/* Final CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Related Pages */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related EES Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/ees/how-it-works" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How EES Works</h3>
                <p className="text-gray-600 text-sm mb-4">Step-by-step walkthrough of the EES border registration process.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>

              <Link href="/ees/launch-date" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Launch Date</h3>
                <p className="text-gray-600 text-sm mb-4">October 12, 2025 launch details and what to expect at airports.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>

              <Link href="/ees/requirements" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Requirements</h3>
                <p className="text-gray-600 text-sm mb-4">Complete document checklist and eligibility guide for airport registration.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Enhanced Schema Markup */}
      <EnhancedSchema
        page="ees-airports"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES', url: 'https://euborder.com/ees' },
          { name: 'Airports', url: 'https://euborder.com/ees/airports' }
        ]}
        faqItems={[
          {
            question: 'What if I miss my connecting flight due to EES delays?',
            answer: 'Airlines are aware of EES launch and have extended minimum connection times for October-November 2025. If you miss a connection due to EES delays, the airline must rebook you on the next available flight at no cost.'
          },
          {
            question: 'Do I register at the airport of my first EU entry or final destination?',
            answer: 'You register at your first EU entry point. If your first entry is a Schengen country, subsequent flights within Schengen don\'t require additional EES checks.'
          },
          {
            question: 'Can I register with EES at departure from my home country?',
            answer: 'No. EES registration must be completed at the EU border upon arrival.'
          },
          {
            question: 'Are there priority EES lanes for business class or frequent flyers?',
            answer: 'Currently, no official priority EES lanes exist. However, some airports have "fast-track" lanes for already-registered travelers.'
          }
        ]}
      />
    </div>
  );
}
