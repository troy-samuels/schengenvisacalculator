/**
 * Privacy Settings Component
 * User dashboard for managing analytics consent
 *
 * Features:
 * - View current consent status
 * - Grant/withdraw consent
 * - View data usage statistics
 * - Download data export
 */

'use client'

import React, { useState } from 'react'
import {
  Shield,
  Check,
  X,
  Info,
  TrendingUp,
  Users,
  Globe,
  AlertCircle,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import { useAnalyticsConsent, type ConsentStatus } from '../hooks/useAnalyticsConsent'

export interface PrivacySettingsProps {
  className?: string
}

/**
 * Privacy Settings Component
 *
 * Comprehensive dashboard for users to manage analytics consent and privacy settings
 *
 * @example
 * ```tsx
 * <PrivacySettings className="max-w-4xl mx-auto" />
 * ```
 */
export function PrivacySettings({ className = '' }: PrivacySettingsProps) {
  const {
    consentStatus,
    consentData,
    isLoading,
    error,
    grantConsent,
    withdrawConsent
  } = useAnalyticsConsent()

  const [isChanging, setIsChanging] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleToggleConsent = async () => {
    setIsChanging(true)
    try {
      if (consentStatus === 'granted') {
        await withdrawConsent()
      } else {
        await grantConsent('settings_page')
      }
    } finally {
      setIsChanging(false)
    }
  }

  const getStatusBadge = (status: ConsentStatus) => {
    switch (status) {
      case 'granted':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case 'withdrawn':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <X className="h-3 w-3 mr-1" />
            Withdrawn
          </Badge>
        )
      case 'never_asked':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Info className="h-3 w-3 mr-1" />
            Not Set
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="p-12">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span className="ml-3 text-gray-600">Loading privacy settings...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Consent Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Anonymized Travel Analytics
              </CardTitle>
              <CardDescription className="mt-2">
                Help improve Schengen compliance tools by sharing anonymized travel patterns
              </CardDescription>
            </div>
            {getStatusBadge(consentStatus)}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Status Information */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Data Collection</span>
              <span className="text-sm text-gray-900 font-semibold">
                {consentStatus === 'granted' ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            {consentData?.consented_at && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Consented On</span>
                <span className="text-sm text-gray-900">
                  {new Date(consentData.consented_at).toLocaleDateString()}
                </span>
              </div>
            )}

            {consentData?.withdrawn_at && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Withdrawn On</span>
                <span className="text-sm text-gray-900">
                  {new Date(consentData.withdrawn_at).toLocaleDateString()}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Privacy Version</span>
              <span className="text-sm text-gray-900">
                {consentData?.consent_version || 'v1.0'}
              </span>
            </div>
          </div>

          {/* Benefits Grid - Mobile Optimized */}
          {consentStatus !== 'granted' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Community Insights
                </h4>
                <p className="text-xs text-gray-600">
                  Access aggregated travel patterns from thousands of travelers
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <Globe className="h-6 w-6 text-green-600 mb-2" />
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Better Recommendations
                </h4>
                <p className="text-xs text-gray-600">
                  Improve trip planning with data-driven suggestions
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Enhanced Accuracy
                </h4>
                <p className="text-xs text-gray-600">
                  Help us build more accurate compliance tools
                </p>
              </div>
            </div>
          )}

          {/* Privacy Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {showDetails ? (
              <>
                <EyeOff className="h-4 w-4" />
                Hide privacy details
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Show privacy details
              </>
            )}
          </button>

          {/* Expandable Privacy Details */}
          {showDetails && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3 animate-in slide-in-from-top duration-200">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                How We Protect Your Privacy
              </h4>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>K-anonymity (k≥20):</strong> Your data is only included in aggregations
                    with at least 20 other travelers, preventing individual identification
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Monthly hash rotation:</strong> Your anonymous ID changes every month,
                    making cross-time tracking impossible
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Differential privacy:</strong> Statistical noise is added to all aggregations
                    to protect individual patterns
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>No personal identifiers:</strong> We never store your name, email, passport
                    number, or exact dates
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Temporal generalization:</strong> Dates are converted to months/quarters,
                    trip durations to ranges (e.g., "15-30 days")
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Automatic deletion:</strong> All anonymized data is automatically deleted
                    after 24 months
                  </div>
                </li>
              </ul>

              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs text-blue-900">
                  <strong>GDPR Compliant:</strong> This system is designed in compliance with GDPR
                  Article 6(1)(a) (explicit consent) and implements privacy by design and default.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 bg-gray-50">
          <Button
            onClick={handleToggleConsent}
            disabled={isChanging}
            variant={consentStatus === 'granted' ? 'destructive' : 'default'}
            className="w-full sm:w-auto min-h-[44px] touch-target"
          >
            {isChanging ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                Processing...
              </>
            ) : consentStatus === 'granted' ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Withdraw Consent
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Grant Consent
              </>
            )}
          </Button>

          <div className="flex-1 text-xs text-gray-600 sm:text-right flex items-center justify-center sm:justify-end">
            <Info className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>
              {consentStatus === 'granted'
                ? 'You can withdraw consent anytime. Historical data will be deleted within 30 days.'
                : 'You can grant consent to help improve tools for all travelers.'}
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Data Export Card (for granted consent) */}
      {consentStatus === 'granted' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Data Rights</CardTitle>
            <CardDescription>
              GDPR Article 15: Right of access and data portability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              While your data is fully anonymized and cannot be directly linked back to you,
              you have the right to:
            </p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Download className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Request information about how your data contributes to aggregated insights
                </span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>
                  Withdraw consent and stop future data collection (historical data deleted within 30 days)
                </span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button variant="outline" className="w-full sm:w-auto min-h-[44px]">
              <Download className="h-4 w-4 mr-2" />
              Request Data Export
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Additional Resources */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Learn More</h4>
          <div className="space-y-2 text-sm">
            <a
              href="/privacy"
              className="block text-primary hover:underline flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              Full Privacy Policy
            </a>
            <a
              href="/faq#analytics"
              className="block text-primary hover:underline flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              Analytics FAQ
            </a>
            <a
              href="mailto:privacy@euborder.com"
              className="block text-primary hover:underline flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              Contact Privacy Team
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
