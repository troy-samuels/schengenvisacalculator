/**
 * Privacy Consent Banner
 * Soft opt-in banner for anonymized travel analytics
 *
 * Design: Bottom banner with clear value proposition
 * Approach: Balanced (soft opt-in with clear value)
 * GDPR: Compliant with Art. 6(1)(a) explicit consent
 */

'use client'

import React, { useState } from 'react'
import { X, TrendingUp, Users, Globe, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

export interface PrivacyConsentBannerProps {
  onAccept: (incentiveShown?: string) => Promise<boolean>
  onDismiss: () => void
  className?: string
}

/**
 * Privacy Consent Banner Component
 *
 * Displays a bottom banner asking for consent to collect anonymized travel data
 * Emphasizes value proposition and privacy guarantees
 *
 * @example
 * ```tsx
 * <PrivacyConsentBanner
 *   onAccept={async () => { ... }}
 *   onDismiss={() => { ... }}
 * />
 * ```
 */
export function PrivacyConsentBanner({
  onAccept,
  onDismiss,
  className = ''
}: PrivacyConsentBannerProps) {
  const [isAccepting, setIsAccepting] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleAccept = async () => {
    setIsAccepting(true)
    try {
      const success = await onAccept('bottom_banner_v1')
      if (!success) {
        // Show error if needed
        console.error('[Banner] Failed to grant consent')
      }
    } finally {
      setIsAccepting(false)
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500 ${className}`}
      role="dialog"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-description"
    >
      <Card className="m-0 rounded-none border-x-0 border-b-0 bg-white/95 backdrop-blur-sm shadow-2xl md:m-4 md:rounded-lg md:border">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                id="consent-banner-title"
                className="text-lg font-semibold text-gray-900 flex items-center gap-2"
              >
                <TrendingUp className="h-5 w-5 text-primary" />
                Help Improve Travel Compliance for Everyone
              </h3>
              <p
                id="consent-banner-description"
                className="mt-2 text-sm text-gray-600 leading-relaxed"
              >
                Share anonymized travel patterns to help build better tools for the Schengen community.
                Your data is <strong>100% anonymous</strong> and helps improve compliance for all travelers.
              </p>
            </div>

            <button
              onClick={onDismiss}
              className="flex-shrink-0 rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Value Propositions - Mobile Optimized Grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50">
              <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Community Insights</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  See how others plan trips
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50">
              <Globe className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Better Tools</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Improve accuracy for all
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50">
              <Shield className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">100% Private</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  No personal data stored
                </p>
              </div>
            </div>
          </div>

          {/* Expandable Privacy Details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide privacy details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                How we protect your privacy
              </>
            )}
          </button>

          {showDetails && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-2 animate-in slide-in-from-top duration-200">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>K-anonymity:</strong> Your data is only used if at least 20 other travelers share similar patterns
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Monthly rotation:</strong> Your ID changes every month, preventing cross-time tracking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>No personal data:</strong> We never store names, emails, or exact dates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>GDPR compliant:</strong> You can withdraw consent anytime in settings
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-gray-600">
                <a href="/privacy" className="underline hover:text-primary">
                  Read full privacy policy
                </a>
              </p>
            </div>
          )}

          {/* Action Buttons - Mobile Optimized */}
          <div className="mt-4 flex flex-col-reverse sm:flex-row gap-3 sm:gap-2 sm:justify-end">
            <Button
              variant="ghost"
              onClick={onDismiss}
              className="w-full sm:w-auto min-h-[44px] touch-target"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleAccept}
              disabled={isAccepting}
              className="w-full sm:w-auto min-h-[44px] touch-target bg-primary hover:bg-primary/90"
            >
              {isAccepting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Enabling...
                </>
              ) : (
                'Yes, Help Improve Tools'
              )}
            </Button>
          </div>

          {/* Legal Notice */}
          <p className="mt-3 text-xs text-gray-500 text-center sm:text-left">
            By accepting, you consent to anonymized data collection as described in our{' '}
            <a href="/privacy" className="underline hover:text-primary">
              privacy policy
            </a>
            . You can withdraw consent anytime.
          </p>
        </div>
      </Card>
    </div>
  )
}

/**
 * Compact version of consent banner (for mobile or space-constrained layouts)
 */
export function CompactPrivacyConsentBanner({
  onAccept,
  onDismiss,
  className = ''
}: PrivacyConsentBannerProps) {
  const [isAccepting, setIsAccepting] = useState(false)

  const handleAccept = async () => {
    setIsAccepting(true)
    try {
      await onAccept('compact_banner_v1')
    } finally {
      setIsAccepting(false)
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t shadow-lg p-3 animate-in slide-in-from-bottom duration-300 ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            Help improve Schengen tools?
          </p>
          <p className="text-xs text-gray-600 truncate">
            Share anonymized data (100% private)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-9 px-3"
          >
            Later
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            disabled={isAccepting}
            className="h-9 px-4 bg-primary"
          >
            {isAccepting ? 'Enabling...' : 'Yes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
