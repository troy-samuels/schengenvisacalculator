import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, FileText, Fingerprint, Shield, ArrowRight } from 'lucide-react'
import { EnhancedSchema } from '@/components/enhanced-schema'
import { EESGuidePurchaseCard } from '@/components/ees/EESGuidePurchase'

export const metadata: Metadata = {
  title: 'EES Readiness Guide 2025: Step-by-Step Biometrics Preparation | EU Border',
  description:
    'Definitive EES Readiness Guide: biometrics, documents, border flow, and country nuances. One-time £7.99. Be fully prepared for the EU Entry/Exit System.',
  keywords: [
    'EES Readiness Guide',
    'Entry Exit System guide',
    'EU biometrics preparation',
    'EES documents checklist',
    'how EES works',
    'EES at border',
  ],
  openGraph: {
    title: 'EES Readiness Guide 2025: Biometrics & Border Preparation',
    description:
      'Everything you need for the EU Entry/Exit System: biometrics, documents, queuing, and country specifics. £7.99 one-time.',
    url: 'https://euborder.com/ees/guide',
    siteName: 'EU Border',
    images: [
      { url: '/images/ees-guide-og.jpg', width: 1200, height: 630, alt: 'EES Readiness Guide' },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EES Readiness Guide 2025: Biometrics & Border Prep',
    description: 'Step-by-step EES preparation. £7.99 one-time.',
    images: ['/images/ees-guide-twitter.jpg'],
  },
  alternates: { canonical: 'https://euborder.com/ees/guide' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function EESGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full mb-3">
              One‑time • £7.99
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              EES Readiness Guide
              <span className="block text-blue-600 mt-2 text-2xl md:text-3xl">Biometrics & Border Preparation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Be fully prepared for the EU Entry/Exit System. Step‑by‑step biometrics, documents, queue flow, and
              country nuances to make your first entry smooth and fast.
            </p>
            <div className="mt-8 flex justify-center">
              <EESGuidePurchaseCard />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What’s inside</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex"><Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" /> First‑entry biometrics: fingerprints + facial image</li>
              <li className="flex"><Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" /> Documents checklist and queue strategy</li>
              <li className="flex"><Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" /> Country‑specific tips for busy borders</li>
              <li className="flex"><Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" /> Offline quick card (PDF) for border desk</li>
              <li className="flex"><Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" /> 90/180 reminders integrated with your trips</li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-sm">
              <Fingerprint className="inline h-4 w-4 mr-2" />
              EES stores biometrics for 3 years to speed future entries. This guide shows exactly how the first
              registration works so you’re confident on day one.
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">At the border: what to expect</h2>
            <div className="space-y-3 text-gray-800">
              <p className="flex"><Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" /> Security screening then biometrics capture with an officer</p>
              <p className="flex"><FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" /> Documents verification and travel purpose questions</p>
              <p className="flex"><ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5" /> Exit with a digital record replacing passport stamps</p>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              Looking for country nuances? See our <Link href="/ees/countries" className="text-blue-600 hover:underline">27 country implementation hub</Link>.
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-800">
            <div>
              <h3 className="font-semibold">Is this a subscription?</h3>
              <p className="text-gray-600">No. It’s a one‑time purchase (£7.99) with ongoing updates as EES rolls out.</p>
            </div>
            <div>
              <h3 className="font-semibold">Do I need the calculator too?</h3>
              <p className="text-gray-600">Yes—the guide complements the calculator by preparing you for the first EES entry while tracking 90/180 compliance.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I access it offline at the border?</h3>
              <p className="text-gray-600">Yes. Use the downloadable PDF quick card for offline access.</p>
            </div>
            <div>
              <h3 className="font-semibold">Refunds?</h3>
              <p className="text-gray-600">30‑day money‑back guarantee if you’re not satisfied.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Schema Markup */}
      <EnhancedSchema
        page="guide"
        title="EES Readiness Guide"
        description="Definitive EES preparation: biometrics, documents, queue flow, and country tips. £7.99 one‑time."
        url="https://euborder.com/ees/guide"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES Authority Hub', url: 'https://euborder.com/ees' },
          { name: 'EES Readiness Guide', url: 'https://euborder.com/ees/guide' },
        ]}
        howToSteps={[
          { name: 'Prepare documents', text: 'Have passport and travel details ready for officer review.' },
          { name: 'Enroll biometrics', text: 'Provide fingerprints and facial image for your EES record.' },
          { name: 'Confirm entry', text: 'Officer validates your details; digital record replaces stamping.' },
          { name: 'Plan future trips', text: 'Use the calculator to respect the 90/180 rule.' },
        ]}
        faqItems={[
          { question: 'Is EES the same as ETIAS?', answer: 'No. EES is biometric registration (2025); ETIAS is travel authorization (2026). They work together.' },
          { question: 'How long are biometrics stored?', answer: 'Typically 3 years to streamline subsequent EU entries.' },
        ]}
      />
    </div>
  )
}


