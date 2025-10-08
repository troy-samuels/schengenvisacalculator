'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@schengen/ui'
import { Download, Lock } from 'lucide-react'
import { useUserStatus } from '@/lib/hooks/useUserStatus'
import { usePurchases } from '@/lib/hooks/usePurchases'
import { EESGuidePurchaseCard } from './EESGuidePurchase'
import { useConversionTracking } from '@/hooks/use-conversion-tracking'

export function EESGuideCTA() {
  const { user, loading: userLoading } = useUserStatus()
  const { hasPaidEESGuide, loading: purchasesLoading } = usePurchases()
  const { trackConversion } = useConversionTracking()

  React.useEffect(() => {
    trackConversion({ event: 'ees_guide_view', page: 'ees_guide' })
  }, [trackConversion])

  if (userLoading || purchasesLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-600">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
          <Lock className="h-5 w-5 text-yellow-700" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Sign in to get the EES Guide</h3>
        <p className="text-sm text-gray-600 mt-1">Create a free account, then purchase to unlock download access.</p>
        <Link href="/save-progress" className="inline-block mt-4">
          <Button>Sign in / Create account</Button>
        </Link>
      </div>
    )
  }

  if (hasPaidEESGuide) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900">You own the EES Readiness Guide</h3>
        <p className="text-sm text-gray-600 mt-1">Download your Quick Card PDF for offline use at the border.</p>
        <Link href="/ees/guide/download" className="inline-block mt-4">
          <Button className="inline-flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Quick Card
          </Button>
        </Link>
      </div>
    )
  }

  return <EESGuidePurchaseCard />
}


