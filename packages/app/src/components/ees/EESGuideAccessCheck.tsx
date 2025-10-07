/**
 * EES Guide Access Check Component
 * Example of using usePurchases hook to control access to EES Guide content
 * Part of EES October 2025 launch monetization
 */

'use client'

import React from 'react'
import { usePurchases } from '@/lib/hooks/usePurchases'
import { useUserStatus } from '@/lib/hooks/useUserStatus'
import { Loader2, CheckCircle2, Lock } from 'lucide-react'
import { EESGuidePurchaseCard } from './EESGuidePurchase'

interface EESGuideAccessCheckProps {
  children: React.ReactNode
}

/**
 * Wrapper component that shows content only if user has purchased EES Guide
 * Shows purchase prompt if not purchased
 * Shows loading state while checking
 */
export function EESGuideAccessCheck({ children }: EESGuideAccessCheckProps) {
  const { user, loading: userLoading } = useUserStatus()
  const { hasPaidEESGuide, loading: purchasesLoading, error } = usePurchases()

  // Loading state
  if (userLoading || purchasesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Checking access...</span>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">
              Sign in to access the EES Readiness Guide
            </h3>
            <p className="text-sm text-yellow-800 mb-4">
              Create a free account to purchase and access the complete EES preparation materials.
            </p>
            <a
              href="/save-progress"
              className="inline-block bg-yellow-600 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-700 transition-colors"
            >
              Sign In / Create Account
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Error loading purchases
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-2">
              Error loading access status
            </h3>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Has purchased - show content
  if (hasPaidEESGuide) {
    return (
      <>
        {/* Success badge */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-900">
              EES Readiness Guide Active
            </p>
            <p className="text-xs text-green-700">
              You have full access to all EES preparation materials
            </p>
          </div>
        </div>

        {/* Protected content */}
        {children}
      </>
    )
  }

  // Not purchased - show purchase prompt
  return (
    <div className="my-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Premium Content: EES Readiness Guide
            </h3>
            <p className="text-sm text-blue-800 mb-4">
              Get complete biometric registration preparation, country-specific tips,
              and offline quick cards for just £7.99 one-time.
            </p>
          </div>
        </div>
      </div>

      {/* Purchase card */}
      <EESGuidePurchaseCard />
    </div>
  )
}

/**
 * Inline access indicator - shows lock icon if content requires purchase
 */
export function EESGuideAccessIndicator() {
  const { hasPaidEESGuide, loading } = usePurchases()

  if (loading) {
    return <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
  }

  if (hasPaidEESGuide) {
    return <CheckCircle2 className="h-4 w-4 text-green-600" />
  }

  return <Lock className="h-4 w-4 text-gray-400" />
}
