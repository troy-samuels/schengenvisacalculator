/**
 * EES Guide Download Page
 * Accessible only to users who have purchased the EES Readiness Guide
 */

import type { Metadata } from 'next'
import { EESGuideDownloadClient } from './client'

export const metadata: Metadata = {
  title: 'Download Your EES Readiness Guide | EU Border',
  description: 'Access your EES Quick Card PDF and complete preparation materials.',
  robots: {
    index: false, // Don't index this page
    follow: false,
  },
}

export default function EESGuideDownloadPage() {
  return <EESGuideDownloadClient />
}
