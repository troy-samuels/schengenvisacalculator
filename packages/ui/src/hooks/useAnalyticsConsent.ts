/**
 * Analytics Consent Hook
 * Manages user consent for anonymized travel analytics
 *
 * GDPR-compliant consent management with soft opt-in approach
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

export type ConsentStatus = 'granted' | 'withdrawn' | 'never_asked' | 'loading'

export interface ConsentData {
  consent_given: boolean
  consent_version: string
  consented_at?: string | null
  withdrawn_at?: string | null
}

export interface UseAnalyticsConsentReturn {
  consentStatus: ConsentStatus
  consentData: ConsentData | null
  isLoading: boolean
  error: string | null
  grantConsent: (incentiveShown?: string) => Promise<boolean>
  withdrawConsent: () => Promise<boolean>
  dismissBanner: () => void
  shouldShowBanner: boolean
  refetch: () => Promise<void>
}

const CONSENT_BANNER_DISMISSED_KEY = 'analytics_consent_banner_dismissed'
const CONSENT_VERSION = 'v1.0'

/**
 * Hook for managing analytics consent
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const {
 *     consentStatus,
 *     shouldShowBanner,
 *     grantConsent,
 *     dismissBanner
 *   } = useAnalyticsConsent()
 *
 *   if (shouldShowBanner) {
 *     return <PrivacyConsentBanner onAccept={grantConsent} onDismiss={dismissBanner} />
 *   }
 * }
 * ```
 */
export function useAnalyticsConsent(): UseAnalyticsConsentReturn {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('loading')
  const [consentData, setConsentData] = useState<ConsentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  // Check if banner was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(CONSENT_BANNER_DISMISSED_KEY)
    if (dismissed === 'true') {
      setBannerDismissed(true)
    }
  }, [])

  // Fetch current consent status
  const fetchConsentStatus = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/analytics/consent', {
        method: 'GET',
        credentials: 'include'
      })

      if (response.status === 401) {
        // User not authenticated - don't show banner
        setConsentStatus('never_asked')
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch consent status')
      }

      const data = await response.json()

      if (data.success) {
        setConsentStatus(data.consent_status)
        setConsentData({
          consent_given: data.consent_given,
          consent_version: data.consent_version,
          consented_at: data.consented_at,
          withdrawn_at: data.withdrawn_at
        })
      }
    } catch (err) {
      console.error('[Consent Hook] Error fetching status:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setConsentStatus('never_asked')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchConsentStatus()
  }, [fetchConsentStatus])

  // Grant consent
  const grantConsent = useCallback(async (incentiveShown?: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/analytics/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          consent_given: true,
          consent_version: CONSENT_VERSION,
          incentive_shown: incentiveShown
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to grant consent')
      }

      const data = await response.json()

      if (data.success) {
        setConsentStatus('granted')
        setConsentData({
          consent_given: true,
          consent_version: CONSENT_VERSION,
          consented_at: data.consented_at
        })

        // Track consent in PostHog
        if (typeof window !== 'undefined' && (window as any).posthog) {
          (window as any).posthog.capture('analytics_consent_granted', {
            consent_version: CONSENT_VERSION,
            incentive_shown: incentiveShown
          })
        }

        return true
      }

      return false
    } catch (err) {
      console.error('[Consent Hook] Error granting consent:', err)
      setError(err instanceof Error ? err.message : 'Failed to grant consent')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Withdraw consent
  const withdrawConsent = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/analytics/consent', {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to withdraw consent')
      }

      const data = await response.json()

      if (data.success) {
        setConsentStatus('withdrawn')
        setConsentData({
          consent_given: false,
          consent_version: CONSENT_VERSION,
          withdrawn_at: new Date().toISOString()
        })

        // Track withdrawal in PostHog
        if (typeof window !== 'undefined' && (window as any).posthog) {
          (window as any).posthog.capture('analytics_consent_withdrawn', {
            consent_version: CONSENT_VERSION
          })
        }

        return true
      }

      return false
    } catch (err) {
      console.error('[Consent Hook] Error withdrawing consent:', err)
      setError(err instanceof Error ? err.message : 'Failed to withdraw consent')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Dismiss banner without granting consent
  const dismissBanner = useCallback(() => {
    localStorage.setItem(CONSENT_BANNER_DISMISSED_KEY, 'true')
    setBannerDismissed(true)

    // Track dismissal in PostHog
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('analytics_consent_banner_dismissed', {
        consent_version: CONSENT_VERSION
      })
    }
  }, [])

  // Determine if banner should be shown
  const shouldShowBanner =
    !isLoading &&
    !bannerDismissed &&
    consentStatus === 'never_asked' &&
    !error

  return {
    consentStatus,
    consentData,
    isLoading,
    error,
    grantConsent,
    withdrawConsent,
    dismissBanner,
    shouldShowBanner,
    refetch: fetchConsentStatus
  }
}
