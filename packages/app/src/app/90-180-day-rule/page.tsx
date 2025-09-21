import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, AlertCircle, CheckCircle2, Users, ArrowRight, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: '90/180 Day Rule Explained - Complete Schengen Visa Guide 2024',
  description: 'Master the 90/180 day rule for Schengen visas. Complete guide with examples, calculator, and expert tips to avoid overstays in Europe.',
  keywords: [
    '90 180 day rule',
    '90/180 day rule schengen',
    'schengen 90 180',
    '90 day rule europe',
    'schengen visa 90 days',
    '180 day rule europe',
    'schengen area 90 days',
    'europe visa rules'
  ],
  alternates: {
    canonical: '/90-180-day-rule'
  },
  openGraph: {
    title: '90/180 Day Rule - Complete Schengen Guide',
    description: 'Everything you need to know about the 90/180 day rule for European travel.',
    url: '/90-180-day-rule',
    type: 'article'
  }
}

export default function Rule90180Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              90/180 Day Rule
              <span className="block text-green-600">Complete Guide for Europe Travel</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Master the 90/180 day rule for Schengen visas. Understand the calculations,
              avoid overstays, and travel Europe with complete confidence.
            </p>

            <div className="bg-green-100 border border-green-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-green-800 mb-2">Quick Summary</h3>
                  <p className="text-green-700">
                    The 90/180 day rule allows visa-free travelers to stay in the Schengen area
                    for up to 90 days within any 180-day period. It's a rolling calculation.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Calendar className="h-6 w-6" />
              Calculate Your 90/180 Days - Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is 90/180 Rule Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What is the 90/180 Day Rule?
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                The 90/180 day rule is the foundation of Schengen area visa policy. It determines
                how long you can stay in Europe without a visa or residence permit.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">90 Days Maximum Stay</h4>
                    <p className="text-gray-600">You can stay up to 90 days total in the Schengen area</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">180 Day Rolling Period</h4>
                    <p className="text-gray-600">The 90 days must be within any 180-day period</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">All Schengen Countries</h4>
                    <p className="text-gray-600">Applies to all 29 countries in the Schengen area</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Continuous Calculation</h4>
                    <p className="text-gray-600">The calculation is ongoing, not calendar-based</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Key Numbers to Remember</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">90</div>
                  <div className="text-sm text-gray-600">Maximum days you can stay</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">180</div>
                  <div className="text-sm text-gray-600">Day rolling calculation period</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">29</div>
                  <div className="text-sm text-gray-600">Countries in Schengen area</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">90</div>
                  <div className="text-sm text-gray-600">Days minimum gap if you max out</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How the 90/180 Day Rule Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rolling Calculation</h3>
              <p className="text-gray-600">
                The 180-day period is calculated backwards from any given day.
                It's not a fixed calendar period but continuously rolling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Entry & Exit Days Count</h3>
              <p className="text-gray-600">
                Both your entry day and exit day count as days spent in the Schengen area.
                Partial days are counted as full days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">All Schengen Movement</h3>
              <p className="text-gray-600">
                Moving between Schengen countries doesn't reset your count.
                All time in any Schengen country counts toward your 90 days.
              </p>
            </div>
          </div>

          {/* Example Calculation */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6">Example: How to Calculate Your 90/180 Days</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Sample Travel Pattern:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Trip 1: March 1-15</span>
                    <span className="font-semibold">15 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Trip 2: May 10-25</span>
                    <span className="font-semibold">16 days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Trip 3: July 5-20</span>
                    <span className="font-semibold">16 days</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Days Used:</span>
                      <span>47 days</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Remaining Days:</span>
                      <span>43 days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Key Points:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Each trip counts toward your 90-day limit</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">Time outside Schengen doesn't count</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">The 180-day window rolls continuously</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">You can still travel 43 more days before hitting the limit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Common 90/180 Day Rule Mistakes to Avoid
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                mistake: "Thinking it's a calendar year rule",
                reality: "It's a rolling 180-day period, not January to December",
                icon: Calendar
              },
              {
                mistake: "Not counting entry and exit days",
                reality: "Both arrival and departure days count as full days",
                icon: Clock
              },
              {
                mistake: "Believing time resets between Schengen countries",
                reality: "All time in any Schengen country counts toward your 90 days",
                icon: MapPin
              },
              {
                mistake: "Assuming you get 90 new days after 90 days outside",
                reality: "You only get back the days that fall outside the 180-day window",
                icon: AlertCircle
              }
            ].map((item, index) => (
              <div key={index} className="bg-red-50 border border-red-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">❌ {item.mistake}</h3>
                    <p className="text-red-700">✅ {item.reality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 px-4 bg-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Calculate Your 90/180 Days Automatically
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Stop guessing and start calculating. Our free tool does all the complex math for you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors duration-200"
          >
            <Calendar className="h-6 w-6" />
            Use Our Free 90/180 Calculator
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "90/180 Day Rule Explained - Complete Schengen Visa Guide 2024",
            "description": "Master the 90/180 day rule for Schengen visas. Complete guide with examples, calculator, and expert tips.",
            "author": {
              "@type": "Organization",
              "name": "EU Border Authority"
            },
            "publisher": {
              "@type": "Organization",
              "name": "EU Border Authority"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://euborder.com/90-180-day-rule"
            }
          })
        }}
      />
    </div>
  )
}