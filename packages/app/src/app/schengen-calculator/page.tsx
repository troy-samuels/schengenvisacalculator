import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Users, AlertTriangle, CheckCircle2, ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Schengen Calculator - 90/180 Day Rule Compliance Tracker',
  description: 'The most accurate free Schengen calculator for tracking 90/180-day rule compliance. Calculate remaining days, prevent overstays, and plan perfect European trips.',
  keywords: [
    'schengen calculator',
    'schengen visa calculator',
    '90 180 day rule calculator',
    'schengen area calculator',
    'europe visa calculator',
    'schengen compliance',
    'free schengen calculator',
    'accurate schengen calculator'
  ],
  alternates: {
    canonical: '/schengen-calculator'
  },
  openGraph: {
    title: 'Free Schengen Calculator - 90/180 Day Rule Tracker',
    description: 'Calculate your Schengen compliance instantly. Free, accurate, and trusted by thousands of travelers.',
    url: '/schengen-calculator',
    type: 'website'
  }
}

export default function SchengenCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Free Schengen Calculator
              <span className="block text-blue-600">90/180 Day Rule Tracker</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              The most accurate and trusted Schengen calculator. Track your 90/180-day rule compliance,
              prevent overstays, and plan perfect European adventures with confidence.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span>4.8/5 rating (1,247 reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>EU law compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>50,000+ travelers</span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Calculator className="h-6 w-6" />
              Start Calculating Now - Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Calculator Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Schengen Calculator?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% EU Law Compliant</h3>
              <p className="text-gray-600">
                Our calculator follows the exact European Union regulations for the 90/180-day rule.
                No guesswork, just precise legal compliance.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Family Tracking Available</h3>
              <p className="text-gray-600">
                Track up to 4 family members with coordinated trip planning.
                Perfect for families traveling together to Europe.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Overstay Prevention</h3>
              <p className="text-gray-600">
                Automatic date overlap prevention and compliance alerts.
                Never accidentally overstay your Schengen visa again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How Our Schengen Calculator Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your Trips",
                description: "Add each trip to the Schengen area with exact entry and exit dates"
              },
              {
                step: "2",
                title: "Select Countries",
                description: "Choose the specific Schengen countries you visited during each trip"
              },
              {
                step: "3",
                title: "Get Results",
                description: "Instantly see your remaining days and compliance status"
              },
              {
                step: "4",
                title: "Plan Ahead",
                description: "Use insights to plan future trips without overstaying"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About Schengen Calculator
          </h2>

          <div className="space-y-8">
            {[
              {
                question: "Is this Schengen calculator really free?",
                answer: "Yes! Our basic Schengen calculator is completely free with up to 5 trips. For unlimited trips and family tracking, premium plans start at just £4.99 lifetime."
              },
              {
                question: "How accurate is your Schengen calculator?",
                answer: "Our calculator is 100% compliant with EU law and uses the official 90/180-day rolling period calculation method used by border officials."
              },
              {
                question: "Can I use this calculator for all Schengen countries?",
                answer: "Yes! Our calculator covers all 29 Schengen area countries including popular destinations like France, Germany, Spain, Italy, and more."
              },
              {
                question: "What makes this different from other Schengen calculators?",
                answer: "We offer family tracking, date overlap prevention, PDF reports for border officials, and the most accurate compliance calculations available online."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Using the Best Schengen Calculator Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers who trust our calculator for perfect EU compliance
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <Calculator className="h-6 w-6" />
            Calculate Your Schengen Compliance
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Structured Data for this specific page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Free Schengen Calculator - 90/180 Day Rule Compliance Tracker",
            "description": "The most accurate free Schengen calculator for tracking 90/180-day rule compliance.",
            "url": "https://euborder.com/schengen-calculator",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Schengen Calculator",
              "applicationCategory": "TravelApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247"
              }
            }
          })
        }}
      />
    </div>
  )
}