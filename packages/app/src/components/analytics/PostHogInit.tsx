'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'

export default function PostHogInit() {
  const pathname = usePathname()

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

    const enabled = typeof window !== 'undefined' && !!key && !key.includes('placeholder')
    if (!enabled) return

    // Initialize once per session
    if (!(window as any).__posthog_initialized) {
      posthog.init(key as string, {
        api_host: host,
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      })
      ;(window as any).__posthog_initialized = true

      // Identify basic app context
      posthog.register_once({ app: 'eu-border-authority', version: '2.0.0' })
    }

    // Capture a pageview on mount and on route change
    posthog.capture('$pageview')
  }, [pathname])

  return null
}


