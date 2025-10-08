import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Shield, Clock, AlertCircle, CheckCircle, ArrowRight, Users, Calendar, Globe, FileText, Info } from 'lucide-react';
import { EESGuideCTA } from '@/components/ees/EESGuideCTA';
import { EnhancedSchema } from '@/components/enhanced-schema';

export const metadata: Metadata = {
  title: 'EES for UK Travelers: Complete Guide for British Citizens | Post-Brexit Requirements',
  description: 'UK citizens must register with the EU Entry/Exit System (EES) starting October 12, 2025. Complete guide for British travelers after Brexit: requirements, registration, and what to expect.',
  keywords: [
    'ees for uk citizens',
    'uk travelers ees',
    'ees brexit',
    'british citizens ees',
    'uk passport holders ees',
    'post brexit eu travel',
    'uk to eu entry requirements',
    'british travelers eu registration',
    'ees for british passport',
    'uk ees guide'
  ],
  openGraph: {
    title: 'EES for UK Travelers: Post-Brexit EU Entry Requirements',
    description: 'UK citizens need EES registration starting October 12, 2025. Complete guide for British travelers entering the EU after Brexit.',
    type: 'website',
    url: 'https://euborder.com/ees/for-uk-travelers'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EES for UK Travelers: Brexit & EU Entry Requirements',
    description: 'British citizens must register with EES starting October 2025. Complete guide for UK travelers.'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/for-uk-travelers'
  }
};

export default function EESForUKTravelersPage() {
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
            <span className="text-gray-900 font-medium">For UK Travelers</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            🇬🇧 Post-Brexit Travel Requirements
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EES for UK Travelers
            <span className="block text-blue-600 mt-2">Complete Guide for British Citizens</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Starting October 12, 2025, all UK passport holders must register with the EU Entry/Exit System (EES) when entering the Schengen Area. Here's everything British travelers need to know.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target shadow-lg"
            >
              Get UK Traveler Guide (£7.99)
            </Link>
            <Link
              href="/ees/requirements"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 transition-colors inline-flex items-center justify-center tap-target"
            >
              View Requirements
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Brexit Context */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              How Brexit Changed EU Entry for UK Citizens
            </h2>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border border-red-200 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-red-900 mb-3">UK Passport Holders Are Now Third-Country Nationals</h3>
                  <p className="text-lg text-red-800 mb-4">
                    After Brexit, British citizens are no longer EU nationals. This means UK passport holders are now subject to the same entry requirements as other third-country nationals (US, Canadian, Australian citizens, etc.).
                  </p>
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="text-red-900 font-medium mb-2">Key Changes for UK Travelers:</p>
                    <ul className="space-y-2 text-red-800 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span><strong>Biometric registration</strong> required starting October 12, 2025 (EES)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span><strong>90/180 day rule</strong> applies: maximum 90 days in any 180-day period</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span><strong>Travel authorization</strong> required starting 2025 (ETIAS - separate from EES)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span><strong>No EU/EEA lanes</strong> - use "All Passports" or "Non-EU" lanes at borders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇪🇺</span>
                  Before Brexit (Pre-2021)
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>EU/EEA fast-track lanes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>No entry/exit checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unlimited stay duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>No biometric registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Freedom of movement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🇬🇧</span>
                  After Brexit (2025+)
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Non-EU lanes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>EES biometric registration required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>90/180 day limit enforced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>ETIAS authorization needed (2025)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Border checks at every entry/exit</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* First CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* UK Passport Holders' EES Obligations */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              What UK Passport Holders Must Do
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Register with EES on First Entry (October 12, 2025+)</h3>
                    <p className="text-gray-600 mb-4">
                      All UK citizens entering the Schengen Area on or after October 12, 2025 must complete EES biometric registration at the border.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-blue-900 mb-2">What You'll Provide:</p>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Fingerprints (4 fingers scanned)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Facial photograph</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Passport details</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>Travel information (destination, purpose, duration)</span>
                        </li>
                      </ul>
                      <p className="text-sm text-blue-700 mt-3">
                        <strong>Time Required:</strong> 5-10 minutes for first registration, less than 1 minute for return visits
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white border-l-4 border-indigo-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-indigo-600">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Follow 90/180 Day Rule</h3>
                    <p className="text-gray-600 mb-4">
                      UK citizens can stay in the Schengen Area for a maximum of <strong>90 days within any 180-day period</strong>. The EES system automatically tracks your entry/exit dates to enforce this rule.
                    </p>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="font-semibold text-indigo-900 mb-2">Example:</p>
                      <p className="text-indigo-800 text-sm">
                        If you spend 45 days in Spain (Jan 1 - Feb 14), you have 45 days remaining for the next 180 days. You could return for another 45-day trip starting March 1, but cannot stay longer than 90 total days until July 1 (when the 180-day window resets).
                      </p>
                      <p className="text-sm text-indigo-700 mt-3">
                        <strong>Tool:</strong> Use our <Link href="/schengen-calculator" className="underline font-semibold hover:text-indigo-600">Schengen Calculator</Link> to track your days accurately
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Apply for ETIAS (2025 - Separate Requirement)</h3>
                    <p className="text-gray-600 mb-4">
                      In addition to EES, UK citizens will need an <strong>ETIAS travel authorization</strong> starting 2025 (exact date TBA). This is a pre-travel online application, similar to the US ESTA.
                    </p>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="font-semibold text-purple-900 mb-2">ETIAS vs EES:</p>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">ETIAS:</span>
                          <span>Pre-travel authorization (apply online before trip)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">EES:</span>
                          <span>Border biometric registration (done at entry point)</span>
                        </li>
                      </ul>
                      <p className="text-sm text-purple-700 mt-3">
                        <strong>Both required:</strong> UK travelers will need ETIAS approval AND EES registration to enter the EU
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline for UK Travelers */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Timeline: When UK Travelers Need EES
            </h2>

            <div className="relative">
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

              <div className="space-y-8">
                {/* Pre-Launch */}
                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-0 md:left-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Before October 12, 2025</h3>
                    <p className="text-gray-600 mb-3">
                      <strong>EES Not Required</strong> - UK passport holders can enter the EU without EES registration
                    </p>
                    <p className="text-sm text-gray-500">
                      However, 90/180 day rule still applies. Track your days manually or use our Schengen Calculator.
                    </p>
                  </div>
                </div>

                {/* Launch Day */}
                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-0 md:left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">October 12, 2025 - EES Launch</h3>
                    <p className="text-red-800 mb-3">
                      <strong>EES Becomes Mandatory</strong> - All UK citizens entering the Schengen Area must register
                    </p>
                    <p className="text-sm text-red-700">
                      Expect 30-45 minute delays at borders during launch week as millions of travelers complete first-time registration.
                    </p>
                  </div>
                </div>

                {/* Post-Launch */}
                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-0 md:left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">After First Registration</h3>
                    <p className="text-gray-600 mb-3">
                      <strong>Fast-Track Entry</strong> - Return visits take less than 1 minute with automated verification
                    </p>
                    <p className="text-sm text-gray-500">
                      Your EES registration is valid for 3 years. Biometric data is linked to your passport for quick border crossing.
                    </p>
                  </div>
                </div>

                {/* ETIAS */}
                <div className="relative pl-12 md:pl-20">
                  <div className="absolute left-0 md:left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-purple-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2025 (Date TBA) - ETIAS Required</h3>
                    <p className="text-gray-600 mb-3">
                      <strong>Additional Authorization Needed</strong> - UK travelers must apply for ETIAS online before travel
                    </p>
                    <p className="text-sm text-gray-500">
                      ETIAS costs €7 (approx £6), valid for 3 years. Application takes 10-15 minutes online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Second CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Popular UK to EU Routes */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Popular UK to EU Routes
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              EES registration will be required at all entry points from the UK to the Schengen Area. Here's what to expect on the most popular routes:
            </p>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🇬🇧 UK → 🇫🇷 France (Flights, Eurostar, Ferries)</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Most popular UK-EU route. Paris CDG has 120+ EES kiosks ready. Eurostar terminals have dedicated EES registration areas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="font-semibold text-blue-900 mb-1">Flights</p>
                        <p className="text-blue-800">Register at French airport upon arrival</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="font-semibold text-blue-900 mb-1">Eurostar</p>
                        <p className="text-blue-800">Register at St Pancras before departure</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="font-semibold text-blue-900 mb-1">Ferries</p>
                        <p className="text-blue-800">Register at French port upon arrival</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🇬🇧 UK → 🇪🇸 Spain (Flights)</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Second most popular destination for UK travelers. Barcelona and Madrid airports have 70-85 EES kiosks installed.
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Tip:</strong> Expect 25-35 min additional time at Spanish airports during October 2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🇬🇧 UK → 🇵🇹 Portugal (Flights)</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Increasingly popular for UK expats and holidaymakers. Lisbon and Faro airports have EES infrastructure ready.
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Note:</strong> Portugal is in Schengen. Days spent in Portugal count toward your 90/180 limit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🇬🇧 UK → 🇬🇷 Greece (Flights)</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Athens and island airports ready for EES. Expect higher demand during summer 2026 season.
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Summer 2026:</strong> EES will be normalized by peak Greek holiday season. Border times back to normal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">🇬🇧 UK → 🇮🇹 Italy (Flights)</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Rome, Milan, Venice airports have 50-75 EES kiosks each. Popular for city breaks and business travel.
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Business Travelers:</strong> After first registration, Italian border crossing takes less than 1 minute
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-medium mb-2">
                    Register Once, Travel Everywhere
                  </p>
                  <p className="text-blue-800 text-sm">
                    You only need to complete EES registration once. If you register when entering France, your biometric data is valid for all subsequent Schengen entries through any country (Spain, Italy, Germany, etc.) for 3 years.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* UK-Specific FAQs */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              UK Traveler FAQs
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do UK citizens need a visa to enter the EU after Brexit?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. UK citizens do not need a visa for short stays (up to 90 days in 180 days) in the Schengen Area. However, you must register with EES (starting October 2025) and will need ETIAS authorization (starting 2025, date TBA). For stays longer than 90 days, you need a visa or residence permit.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I use the EU lanes at airports with my UK passport?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. After Brexit, UK passport holders must use "All Passports" or "Non-EU/Third-Country Nationals" lanes. You can no longer use EU/EEA/Swiss citizen fast-track lanes, even if you previously used them before Brexit.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I have dual UK/EU citizenship. Do I need EES registration?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. If you have dual citizenship (UK + EU country), travel on your EU passport. EU citizens are exempt from EES and ETIAS requirements. Use your EU passport at all EU borders to maintain freedom of movement rights.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Does EES apply to UK travelers going to Ireland?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. Ireland is not part of the Schengen Area and has a separate Common Travel Area (CTA) agreement with the UK. UK citizens do not need EES registration, ETIAS, or passport checks to travel to Ireland. The border remains open under the CTA.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I have a UK residence permit. Am I exempt from EES?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. EES is based on your passport/nationality, not your residence. If you hold a non-EU passport and live in the UK, you still need EES registration when entering the Schengen Area. EU residence permits (not UK) may provide exemptions - check your specific permit type.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I avoid EES by traveling via non-Schengen countries?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. You cannot avoid EES registration if you want to enter the Schengen Area. Even if you fly UK → Switzerland → France, you must register with EES at the first Schengen border crossing. There's no workaround for non-EU nationals entering Schengen.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What happens if I overstay the 90/180 day limit?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Overstaying is a serious violation with consequences: entry ban (1-5 years), fines (up to €10,000), deportation, and difficulty obtaining future Schengen visas or ETIAS authorization. The EES system automatically tracks your days and flags overstays. Always monitor your 90/180 limit using our <Link href="/schengen-calculator" className="underline font-semibold text-blue-600 hover:text-blue-700">Schengen Calculator</Link>.
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
              <Link href="/ees/requirements" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Requirements</h3>
                <p className="text-gray-600 text-sm mb-4">Complete document checklist for UK passport holders entering the EU.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>

              <Link href="/ees/launch-date" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Launch Date</h3>
                <p className="text-gray-600 text-sm mb-4">October 12, 2025 launch details and what UK travelers can expect.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>

              <Link href="/schengen-calculator" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Schengen Calculator</h3>
                <p className="text-gray-600 text-sm mb-4">Track your 90/180 days as a UK citizen traveling in the Schengen Area.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Use Calculator <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Enhanced Schema Markup */}
      <EnhancedSchema
        page="ees-for-uk-travelers"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES', url: 'https://euborder.com/ees' },
          { name: 'For UK Travelers', url: 'https://euborder.com/ees/for-uk-travelers' }
        ]}
        faqItems={[
          {
            question: 'Do UK citizens need a visa to enter the EU after Brexit?',
            answer: 'No. UK citizens do not need a visa for short stays (up to 90 days in 180 days) in the Schengen Area. However, you must register with EES (starting October 2025) and will need ETIAS authorization (starting 2025).'
          },
          {
            question: 'Can I use the EU lanes at airports with my UK passport?',
            answer: 'No. After Brexit, UK passport holders must use "All Passports" or "Non-EU/Third-Country Nationals" lanes. You can no longer use EU/EEA/Swiss citizen fast-track lanes.'
          },
          {
            question: 'I have dual UK/EU citizenship. Do I need EES registration?',
            answer: 'No. If you have dual citizenship (UK + EU country), travel on your EU passport. EU citizens are exempt from EES and ETIAS requirements.'
          },
          {
            question: 'Does EES apply to UK travelers going to Ireland?',
            answer: 'No. Ireland is not part of the Schengen Area and has a Common Travel Area agreement with the UK. UK citizens do not need EES registration or passport checks to travel to Ireland.'
          }
        ]}
      />
    </div>
  );
}
