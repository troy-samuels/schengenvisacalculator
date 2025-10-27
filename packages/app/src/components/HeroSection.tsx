// Server Component - Static SSR Hero Section
// No client-side JavaScript required, instant HTML load

import Link from 'next/link'
import styles from './HeroSection.module.css'

// Authority Statement Component
function AuthorityStatement({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center space-x-3 bg-green-50 border border-green-200 rounded-lg px-6 py-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-dm-sans font-semibold text-green-800">
          EU Regulation Compliant
        </span>
      </div>
      <div className="text-gray-400">•</div>
      <span className="text-sm font-dm-sans font-medium text-gray-700">
        Official Schengen & EES Rules
      </span>
    </div>
  )
}

// Hero Section Component - Server Side Rendered
export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className={`${styles.heroFadeIn} text-4xl md:text-5xl lg:text-6xl font-poppins font-bold tracking-tight leading-none text-gray-900 mb-6`}>
            Master EU Border Compliance{' '}
            <span
              className={`inline-block origin-bottom ${styles.flagWiggle}`}
              aria-label="European Union flag"
            >
              🇪🇺
            </span>
            <span className="block text-blue-600">with Complete Authority & Confidence</span>
          </h1>

          <h2 className={`${styles.heroFadeInDelay1} text-xl font-dm-sans font-semibold text-blue-600 mb-4 max-w-3xl mx-auto leading-relaxed text-balance`}>
            100% accurate calculations based on official rules
          </h2>

          <p className={`${styles.heroFadeInDelay2} text-lg font-dm-sans font-normal text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed text-balance`}>
            The only platform combining EES preparation and comprehensive Schengen compliance tracking for complete EU border authority confidence.
          </p>

          {/* Test DM Sans ExtraLight 200 weight */}
          <div className={`${styles.heroFadeInDelay3} mb-6`}>
            <p className="text-lg font-dm-sans font-extralight text-gray-500 max-w-2xl mx-auto">
              EES Ready • Schengen Authority • EU Border Compliance
            </p>
          </div>

          <div className={`${styles.heroFadeInDelay4} flex justify-center mb-8`}>
            <AuthorityStatement />
          </div>

          {/* CTA Button - Scroll to calculator */}
          <div className={`${styles.heroFadeInDelay5} flex flex-col sm:flex-row items-center justify-center gap-4 mb-8`}>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-poppins font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
            >
              Start Free Calculator
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-poppins font-semibold text-lg transition-colors duration-200 border-2 border-blue-600 min-h-[44px]"
            >
              View Plans
            </Link>
          </div>

          {/* Trust Signals */}
          <div className={`${styles.heroFadeInDelay6} flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>15,000+ travelers trust us</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% EU compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebApplication", "TravelApplication"],
            "name": "EU Border Authority",
            "description": "The definitive EU border compliance platform combining EES preparation, ETIAS guidance, and Schengen tracking",
            "url": "https://euborder.com",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "All",
            "browserRequirements": "Modern browsers",
            "publisher": {
              "@type": "Organization",
              "name": "EU Border Authority"
            },
            "featureList": [
              "90/180 day rule tracking",
              "27 Schengen countries supported",
              "Real-time compliance checking",
              "Travel date optimization",
              "EU regulation compliant"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1247",
              "bestRating": "5"
            }
          })
        }}
      />
    </section>
  )
}
