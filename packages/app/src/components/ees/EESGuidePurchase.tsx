'use client'

import React, { useState } from 'react'
import { Button } from '@schengen/ui'
import { useRouter } from 'next/navigation'
import { createCheckoutSession, redirectToStripeCheckout } from '@schengen/payments'
import { useUserStatus } from '@/lib/hooks/useUserStatus'
import { useConversionTracking } from '@/hooks/use-conversion-tracking'

export function EESGuidePurchaseCard() {
  const router = useRouter()
  const { user, loading } = useUserStatus()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { trackConversion, trackCTAClick } = useConversionTracking()

  // Track view on mount
  React.useEffect(() => {
    trackConversion({ event: 'ees_guide_view', page: 'ees_guide' })
  }, [trackConversion])

  const purchase = async () => {
    if (!user?.email) {
      router.push('/save-progress')
      return
    }
    try {
      trackCTAClick('ees_guide_buy', 'primary', 'ees_guide')
      setIsProcessing(true)
      setError(null)
      const session = await createCheckoutSession({
        tier: 'ees_guide' as any,
        billingCycle: 'one_time',
        userId: user.id,
        userEmail: user.email!,
        metadata: { feature: 'ees_page', product: 'ees_guide' }
      })
      trackConversion({ event: 'ees_guide_checkout_started', page: 'ees_guide', value: 7.99, currency: 'GBP' })
      redirectToStripeCheckout(session.url)
    } catch (e: any) {
      setError(e?.message || 'Failed to start checkout (EES Guide)')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900">EES Readiness Guide</h2>
      <p className="text-2xl font-bold mt-1">£7.99</p>
      <p className="text-sm text-gray-500">One‑time add‑on</p>
      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 p-2 rounded text-sm">{error}</div>
      )}
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        <li>Step‑by‑step first‑entry biometrics</li>
        <li>What to bring and how to queue</li>
        <li>Country‑specific tips</li>
        <li>Offline quick card (PDF)</li>
      </ul>
      <Button className="w-full mt-6" onClick={purchase} disabled={loading || isProcessing}>
        {isProcessing ? 'Processing…' : 'Get EES Guide'}
      </Button>
    </div>
  )
}


