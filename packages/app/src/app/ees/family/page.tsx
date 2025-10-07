import { Metadata } from 'next'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, CheckCircle, AlertTriangle, Heart, Shield, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EES Family Preparation Guide 2025: Coordinate Biometric Registration for Families | EU Border Authority',
  description: 'Complete guide for preparing families for EU Entry/Exit System registration. Learn how to coordinate EES biometric registration, timing strategies, and family travel planning.',
  keywords: [
    'EES family preparation',
    'EES family guide',
    'family biometric registration',
    'EES children requirements',
    'family EU border control',
    'EES family coordination',
    'children EES registration',
    'family travel EES',
    'EES family planning',
    'biometric family travel'
  ],
  openGraph: {
    title: 'EES Family Preparation Guide 2025: Complete Family Coordination Strategy',
    description: 'Master EES family preparation with our comprehensive guide. Coordinate biometric registration, plan timing, and ensure smooth family travel through the new EU system.',
    url: 'https://euborder.com/ees/family',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-family-guide-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EES Family Preparation Guide 2025'
      }
    ],
    type: 'article'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/family'
  }
}

async function getMarkdownContent() {
  try {
    const filePath = join(process.cwd(), 'content/ees/family-ees-preparation-guide.md')
    const source = await readFile(filePath, 'utf8')
    return source
  } catch (error) {
    console.error('Error reading markdown file:', error)
    return null
  }
}

export default async function EESFamilyPage() {
  const markdownContent = await getMarkdownContent()

  if (!markdownContent) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Loading...</h1>
          <p className="text-gray-600">The EES family preparation guide is being prepared. Please check back soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/ees" className="text-blue-600 hover:text-blue-800">EES System</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Family Guide</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <Link
              href="/ees"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to EES Hub
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm font-medium rounded-full">
              Family Guide
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Coordination Strategy
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Updated January 2025
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            EES Family Preparation Guide 2025: Complete Family Coordination Strategy
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The definitive guide for preparing families for EU Entry/Exit System biometric registration.
            Learn how to coordinate timing, prepare children, and ensure smooth family travel through
            the new EU border control system launching October 2025.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>35 min read</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Family Focused</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              <span>All Ages Covered</span>
            </div>
          </div>

          {/* Family Preparation Checklist */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Family Preparation Checklist:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-pink-800">Understand EES requirements for each family member</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-pink-800">Plan coordination strategies for border registration</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-pink-800">Prepare children for biometric registration process</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-pink-800">Coordinate travel timing across family schedules</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-pink-800">Understand special considerations for different ages</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-pink-800">Plan for ongoing compliance management</span>
                </div>
              </div>
            </div>
          </div>

          {/* Age-Specific Requirements Quick Reference */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Age-Specific EES Requirements:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">👶 Under 12 Years</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Facial photo only</li>
                  <li>• No fingerprints required</li>
                  <li>• Parent/guardian assistance</li>
                  <li>• Faster processing time</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🧑 12-17 Years</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Full biometric registration</li>
                  <li>• Fingerprints + facial photo</li>
                  <li>• Parent/guardian present</li>
                  <li>• Standard processing time</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">👨‍👩‍👧‍👦 18+ Years</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Full biometric registration</li>
                  <li>• Independent processing</li>
                  <li>• All 10 fingerprints</li>
                  <li>• Complete data capture</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Family Coordination Advantages */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Why Family Coordination Matters:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-800">Synchronized 90/180-day compliance tracking</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-800">Coordinated travel planning to maximize stays</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-800">Reduced border processing time for families</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-800">Shared understanding of compliance requirements</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-800">Prevention of family separation due to overstays</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-800">Simplified documentation and record keeping</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Important Family Notice</h4>
              <p className="text-amber-800 text-sm">
                EES requirements vary by age and family structure. This guide provides comprehensive preparation
                strategies but should complement official government guidance. Plan family travel coordination
                well in advance of the October 2025 launch.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <MDXRemote
              source={markdownContent}
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  rehypePlugins: [],
                }
              }}
            />
          </div>
        </div>

        {/* Related Resources */}
        <aside className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Family Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/family"
              className="block p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2 text-pink-600" />
                Family Schengen Calculator
              </h4>
              <p className="text-gray-600 text-sm">
                Track 90/180-day compliance for up to 4 family members with visual coordination
              </p>
            </Link>
            <Link
              href="/ees/complete-guide"
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Complete EES Guide 2025</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive 15,000+ word guide to the EU Entry/Exit System for all travelers
              </p>
            </Link>
          </div>
        </aside>

        {/* Family Newsletter CTA */}
        <section className="mt-12 p-8 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
            <Heart className="h-6 w-6 mr-2" />
            Family Travel Updates
          </h3>
          <p className="text-pink-100 mb-6">
            Get family-specific EES updates, coordination tips, and preparation guides delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter family email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-pink-200 mt-3">
            Join 5,000+ families preparing for EU border changes
          </p>
        </section>
      </article>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "EES Family Preparation Guide 2025: Complete Family Coordination Strategy",
            "description": "Complete guide for preparing families for EU Entry/Exit System biometric registration. Learn coordination strategies, age-specific requirements, and family travel planning.",
            "author": {
              "@type": "Organization",
              "name": "EU Border Authority"
            },
            "publisher": {
              "@type": "Organization",
              "name": "EU Border Authority",
              "logo": {
                "@type": "ImageObject",
                "url": "https://euborder.com/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://euborder.com/ees/family"
            },
            "image": "https://euborder.com/images/ees-family-guide-og.jpg",
            "articleSection": "Family Travel",
            "keywords": ["EES family preparation", "family biometric registration", "EES children", "family EU travel", "EES coordination"],
            "audience": {
              "@type": "Audience",
              "audienceType": "Families traveling to EU"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Family Travel Coordination",
                "description": "Strategies for coordinating EU Entry/Exit System registration across family members"
              },
              {
                "@type": "Thing",
                "name": "EES Biometric Registration",
                "description": "Age-specific requirements for EU Entry/Exit System biometric registration"
              }
            ],
            "inLanguage": "en-US"
          })
        }}
      />
    </div>
  )
}