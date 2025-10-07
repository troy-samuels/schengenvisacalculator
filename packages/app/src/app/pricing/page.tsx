'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@schengen/ui'
import { createCheckoutSession, redirectToStripeCheckout } from '@schengen/payments'
import { useUserStatus } from '../../lib/hooks/useUserStatus'

export default function PricingPage() {
  const router = useRouter()
  const { user, loading } = useUserStatus()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requireLoginOr = async (fn: () => Promise<void>) => {
    if (!user?.email) {
      router.push('/save-progress')
      return
    }
    await fn()
  }

  const purchaseLifetime = async () => {
    await requireLoginOr(async () => {
      try {
        setIsProcessing(true)
        setError(null)
        const session = await createCheckoutSession({
          tier: 'lifetime',
          billingCycle: 'one_time',
          userId: user!.id,
          userEmail: user!.email!,
          metadata: { feature: 'pricing_page' }
        })
        redirectToStripeCheckout(session.url)
      } catch (e: any) {
        setError(e?.message || 'Failed to start checkout')
      } finally {
        setIsProcessing(false)
      }
    })
  }

  const purchaseAnnual = async () => {
    await requireLoginOr(async () => {
      try {
        setIsProcessing(true)
        setError(null)
        const session = await createCheckoutSession({
          tier: 'annual',
          billingCycle: 'yearly',
          userId: user!.id,
          userEmail: user!.email!,
          metadata: { feature: 'pricing_page' }
        })
        redirectToStripeCheckout(session.url)
      } catch (e: any) {
        setError(e?.message || 'Failed to start checkout')
      } finally {
        setIsProcessing(false)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Choose Your Plan</h1>
          <p className="text-gray-600 text-center mt-2">Accurate Schengen compliance, EES-ready guidance, and premium tools.</p>

          {error && (
            <div className="mt-6 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Free</h2>
              <p className="text-3xl font-bold mt-2">£0</p>
              <p className="text-sm text-gray-500">Basic calculator • 5 trips</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>Accurate 90/180 calculator</li>
                <li>Date overlap prevention</li>
                <li>Screenshot export</li>
              </ul>
              <Button className="w-full mt-6" onClick={() => router.push('/')}>Use Free</Button>
            </div>

            {/* Lifetime */}
            <div className="bg-white border-2 border-amber-300 rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Lifetime</h2>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Best Value</span>
              </div>
              <p className="text-3xl font-bold mt-2">£5.99</p>
              <p className="text-sm text-gray-500">One-time payment</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>Everything in Free</li>
                <li>Unlimited trips</li>
                <li>Family tracking (up to 4)</li>
                <li>PDF reports & email alerts</li>
                <li>Ad‑free experience</li>
              </ul>
              <Button className="w-full mt-6" onClick={purchaseLifetime} disabled={loading || isProcessing}>
                {isProcessing ? 'Processing…' : 'Get Lifetime'}
              </Button>
            </div>

            {/* Annual */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Annual</h2>
              <p className="text-3xl font-bold mt-2">£2.99</p>
              <p className="text-sm text-gray-500">Per year</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>Everything in Lifetime</li>
                <li>SMS alerts</li>
                <li>Priority support</li>
                <li>Regulatory updates</li>
              </ul>
              <Button className="w-full mt-6" onClick={purchaseAnnual} disabled={loading || isProcessing}>
                {isProcessing ? 'Processing…' : 'Subscribe Annual'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


