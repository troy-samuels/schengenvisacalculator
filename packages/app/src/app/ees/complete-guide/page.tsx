import { Metadata } from 'next'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, FileText, Share2, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Complete EES Guide 2025: Everything You Need to Know About the EU Entry/Exit System | EU Border Authority',
  description: 'The definitive 15,000+ word guide to the EU Entry/Exit System launching October 2025. Biometric registration, preparation requirements, family coordination, and business compliance.',
  keywords: [
    'EES complete guide',
    'Entry Exit System guide',
    'EU biometric system',
    'EES requirements 2025',
    'EU border control guide',
    'EES preparation guide',
    'biometric registration EU',
    'EES vs passport stamps',
    'EU travel authorization',
    'EES family preparation'
  ],
  openGraph: {
    title: 'Complete EES Guide 2025: The Definitive EU Entry/Exit System Resource',
    description: 'Master the EU Entry/Exit System with our comprehensive 15,000+ word authority guide. From biometric registration to family coordination.',
    url: 'https://euborder.com/ees/complete-guide',
    siteName: 'EU Border Authority',
    images: [
      {
        url: '/images/ees-complete-guide-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Complete EES System Guide 2025'
      }
    ],
    type: 'article'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/complete-guide'
  }
}

async function getMarkdownContent() {
  try {
    const filePath = join(process.cwd(), 'content/ees/complete-ees-guide-2025.md')
    const source = await readFile(filePath, 'utf8')
    return source
  } catch (error) {
    console.error('Error reading markdown file:', error)
    return null
  }
}

export default async function CompleteEESGuidePage() {
  const markdownContent = await getMarkdownContent()

  if (!markdownContent) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Loading...</h1>
          <p className="text-gray-600">The complete EES guide is being prepared. Please check back soon.</p>
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
            <span className="text-gray-600">Complete Guide</span>
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
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Authority Guide
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              15,000+ Words
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              Updated January 2025
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Complete EES Guide 2025: Everything You Need to Know About the EU Entry/Exit System
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The definitive guide to the European Union's Entry/Exit System launching October 2025.
            Master biometric registration, understand compliance requirements, and prepare your family
            or business for the most significant EU border change since the Schengen Agreement.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>45 min read</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Family & Business Coverage</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Government Sourced</span>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Takeaways from this Guide:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-blue-800">Complete EES preparation requirements</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-blue-800">Biometric registration process step-by-step</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-blue-800">Family travel coordination strategies</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-blue-800">Business compliance implementation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-blue-800">Country-specific implementation timeline</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-blue-800">Integration with Schengen 90/180 rule</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents Preview */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Guide Contents:</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="text-gray-700">• What is the EES System?</div>
                <div className="text-gray-700">• EES Launch Timeline & Rollout</div>
                <div className="text-gray-700">• Biometric Registration Process</div>
                <div className="text-gray-700">• EES vs Current Border Control</div>
                <div className="text-gray-700">• Family Travel Requirements</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-700">• Business & Corporate Compliance</div>
                <div className="text-gray-700">• Privacy & Data Protection</div>
                <div className="text-gray-700">• Country Implementation Schedules</div>
                <div className="text-gray-700">• Troubleshooting & Common Issues</div>
                <div className="text-gray-700">• Future Developments & ETIAS Integration</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Important Notice</h4>
              <p className="text-amber-800 text-sm">
                The EES system launches October 2025. Information in this guide is based on current EU regulations
                and may be updated as implementation progresses. This guide represents our expert analysis and should
                not replace official government guidance.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related EES Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/ees/vs-etias"
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2">EES vs ETIAS: Complete Comparison</h4>
              <p className="text-gray-600 text-sm">
                Understand how EES and ETIAS work together for complete EU border compliance
              </p>
            </Link>
            <Link
              href="/ees/family"
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Family EES Preparation Guide</h4>
              <p className="text-gray-600 text-sm">
                Specialized guidance for coordinating EES registration across family members
              </p>
            </Link>
          </div>
        </aside>

        {/* Newsletter CTA */}
        <section className="mt-12 p-8 bg-blue-600 rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated on EES Developments</h3>
          <p className="text-blue-100 mb-6">
            Get exclusive EES updates, implementation news, and expert analysis delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </article>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Complete EES Guide 2025: Everything You Need to Know About the EU Entry/Exit System",
            "description": "The definitive guide to the European Union's Entry/Exit System launching October 2025. Master biometric registration, understand compliance requirements, and prepare for the new EU border system.",
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
              "@id": "https://euborder.com/ees/complete-guide"
            },
            "image": "https://euborder.com/images/ees-complete-guide-og.jpg",
            "articleSection": "EU Border Control",
            "keywords": ["EES system", "Entry Exit System", "EU biometric registration", "EU border control", "biometric travel"],
            "wordCount": "15000",
            "inLanguage": "en-US"
          })
        }}
      />
    </div>
  )
}