import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EES vs ETIAS 2025: Complete Differences Explained | EU Border',
  description: 'Complete comparison of EES vs ETIAS systems launching in 2025-2026. Understand key differences, implementation timelines, requirements, and how both EU border systems work together.',
  keywords: [
    'EES vs ETIAS',
    'EES ETIAS difference',
    'Entry Exit System vs ETIAS',
    'EU border systems',
    'EES ETIAS comparison',
    'ETIAS EES requirements',
    'EU travel authorization',
    'biometric registration vs travel authorization',
    'EES ETIAS timeline'
  ],
  openGraph: {
    title: 'EES vs ETIAS 2025: Complete Differences Explained',
    description: 'Master the differences between EES (Oct 2025) and ETIAS (2026). Complete comparison of requirements, timelines, and how both systems work together.',
    type: 'article',
    url: 'https://euborder.com/ees/vs-etias',
    siteName: 'EU Border Authority',
    images: [{ url: '/images/ees-vs-etias-og.jpg', width: 1200, height: 630, alt: 'EES vs ETIAS Comparison 2025' }]
  },
  alternates: { canonical: 'https://euborder.com/ees/vs-etias' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
  }
}

export default metadata


