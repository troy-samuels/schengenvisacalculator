// Server Component - Homepage
// Instant HTML load with progressive enhancement

import { Suspense } from 'react'
import HeroSection from '../components/HeroSection'
import CalculatorClient from '../components/CalculatorClient'
import CalculatorSkeleton from '../components/CalculatorSkeleton'
import { Metadata } from 'next'

// Metadata for SEO (Server-side)
export const metadata: Metadata = {
  title: 'EU Border Authority | Free Schengen 90/180 Calculator & EES Preparation',
  description: 'Master the Schengen 90/180 day rule with our free calculator. Track your EU travel compliance, prepare for EES biometric registration, and avoid overstays. 100% accurate, used by 15,000+ travelers.',
  keywords: [
    'schengen calculator',
    '90 180 day rule',
    'schengen visa calculator',
    'EU travel calculator',
    'EES preparation',
    'Entry Exit System',
    'EU border compliance',
    'schengen area calculator',
    'europe travel tracker',
    'visa free travel calculator'
  ],
  openGraph: {
    title: 'Free Schengen Calculator | EU Border Authority',
    description: '100% accurate Schengen 90/180 calculator. Never overstay your EU visa-free allowance. Free tool used by 15,000+ travelers.',
    type: 'website',
    url: '/',
  },
  alternates: {
    canonical: '/'
  }
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Static SSR (loads instantly) */}
      <HeroSection />

      {/* Calculator Section - Lazy loaded via client wrapper (deferred for performance) */}
      <Suspense fallback={<CalculatorSkeleton />}>
        <CalculatorClient />
      </Suspense>
    </>
  )
}
