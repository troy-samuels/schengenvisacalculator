import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'EU Border Authority Blog | EES, ETIAS & Schengen Insights',
  description:
    'Expert articles on the Schengen 90/180 rule, Entry/Exit System (EES), ETIAS preparation, and visa compliance strategies for travelers.',
  alternates: {
    canonical: '/blog'
  },
  openGraph: {
    title: 'EU Border Authority Blog',
    description:
      'Stay current with EES, ETIAS, and Schengen visa insights from the EU Border Authority editorial team.',
    url: '/blog',
    type: 'website'
  }
}

export default function BlogPage() {
  return <BlogPageClient />
}
