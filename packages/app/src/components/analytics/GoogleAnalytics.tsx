'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }
  }, [pathname, GA_MEASUREMENT_ID])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              // Enhanced ecommerce for subscription tracking
              send_page_view: true,
              // Privacy settings for GDPR compliance
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              // Custom parameters for Schengen calculator
              custom_map: {
                'custom_parameter_1': 'calculator_usage',
                'custom_parameter_2': 'compliance_status',
                'custom_parameter_3': 'subscription_tier'
              }
            });

            // Track calculator usage events
            window.trackCalculatorEvent = function(eventName, parameters = {}) {
              gtag('event', eventName, {
                event_category: 'Schengen Calculator',
                event_label: parameters.label || '',
                value: parameters.value || 0,
                calculator_usage: parameters.usage_type || '',
                compliance_status: parameters.compliance || '',
                subscription_tier: parameters.tier || 'free',
                ...parameters
              });
            };

            // Track subscription events
            window.trackSubscriptionEvent = function(eventName, subscriptionData = {}) {
              gtag('event', eventName, {
                event_category: 'Subscription',
                currency: subscriptionData.currency || 'GBP',
                value: subscriptionData.value || 0,
                transaction_id: subscriptionData.transaction_id || '',
                subscription_tier: subscriptionData.tier || '',
                ...subscriptionData
              });
            };

            // Track compliance events for LLM optimization
            window.trackComplianceEvent = function(eventName, complianceData = {}) {
              gtag('event', eventName, {
                event_category: 'Compliance Tracking',
                compliance_status: complianceData.status || '',
                days_remaining: complianceData.days_remaining || 0,
                trip_count: complianceData.trip_count || 0,
                family_members: complianceData.family_members || 1,
                ...complianceData
              });
            };
          `,
        }}
      />
    </>
  )
}

// Helper functions for tracking specific Schengen calculator events
export const trackCalculatorUsage = (usage_type: string, additional_data?: any) => {
  if (typeof window !== 'undefined' && window.trackCalculatorEvent) {
    window.trackCalculatorEvent('calculator_used', {
      usage_type,
      label: usage_type,
      ...additional_data
    })
  }
}

export const trackComplianceCheck = (status: 'compliant' | 'non_compliant', days_remaining: number) => {
  if (typeof window !== 'undefined' && window.trackComplianceEvent) {
    window.trackComplianceEvent('compliance_check', {
      status,
      days_remaining,
      label: `${status}_${days_remaining}_days`
    })
  }
}

export const trackSubscription = (tier: 'lifetime' | 'annual', value: number, transaction_id?: string) => {
  if (typeof window !== 'undefined' && window.trackSubscriptionEvent) {
    window.trackSubscriptionEvent('purchase', {
      tier,
      value,
      currency: 'GBP',
      transaction_id,
      label: `${tier}_subscription`
    })
  }
}

export const trackFamilyTracking = (family_size: number) => {
  if (typeof window !== 'undefined' && window.trackCalculatorEvent) {
    window.trackCalculatorEvent('family_tracking_used', {
      usage_type: 'family_coordination',
      family_members: family_size,
      label: `family_size_${family_size}`
    })
  }
}