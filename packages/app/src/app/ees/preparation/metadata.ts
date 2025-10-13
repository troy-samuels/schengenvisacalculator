import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EES Preparation 2025: Biometric Registration Checklist | EU Border',
  description: 'Master EES preparation for October 12, 2025 launch. Complete biometric registration guide, documents needed, border process, and expert tips for smooth EU entry.',
  keywords: [
    'EES preparation',
    'EU biometric registration',
    'EES requirements',
    'EES biometric data',
    'EU border preparation',
    'EES registration guide',
    'Entry Exit System preparation',
    'EU travel 2025',
    'EES implementation'
  ],
  openGraph: {
    title: 'EES Preparation 2025: Complete Biometric Registration Checklist',
    description: 'Master EES preparation before October 12, 2025 launch. Step-by-step biometric registration guide, requirements, and expert tips.',
    type: 'article',
    url: 'https://euborder.com/ees/preparation',
    siteName: 'EU Border Authority',
    images: [
      { url: '/images/ees-preparation-og.jpg', width: 1200, height: 630, alt: 'EES Preparation Guide 2025' }
    ]
  },
  alternates: { canonical: 'https://euborder.com/ees/preparation' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
  }
}

export default metadata


