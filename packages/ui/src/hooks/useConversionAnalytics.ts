import { useCallback } from 'react'
import { SubscriptionTier } from './useFeatureAccess'

interface ConversionEvent {
  userId?: string
  sessionId: string
  event: string
  feature?: string
  currentTier: SubscriptionTier
  targetTier?: SubscriptionTier
  timestamp: Date
  metadata?: Record<string, any>
}

interface ConversionFunnelStep {
  step: 'feature_attempt' | 'account_prompt' | 'account_created' | 'premium_prompt' | 'premium_subscribed'
  feature: string
  previousStep?: string
  conversionRate?: number
}

export function useConversionAnalytics() {
  const trackEvent = useCallback((event: ConversionEvent) => {
    // Analytics implementation - PostHog, GA4, or custom analytics
    if (typeof window !== 'undefined') {
      // Track to PostHog (when configured)
      if (window.posthog) {
        window.posthog.capture(event.event, {
          feature: event.feature,
          currentTier: event.currentTier,
          targetTier: event.targetTier,
          timestamp: event.timestamp,
          ...event.metadata
        })
      }

      // Track to Google Analytics (when configured)
      if (window.gtag) {
        window.gtag('event', event.event, {
          event_category: 'conversion_funnel',
          event_label: event.feature,
          custom_parameter_tier: event.currentTier,
          custom_parameter_target: event.targetTier
        })
      }

      // Console tracking for development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔥 Conversion Event:', event)
      }
    }
  }, [])

  const trackFeatureAttempt = useCallback((feature: string, currentTier: SubscriptionTier) => {
    trackEvent({
      sessionId: generateSessionId(),
      event: 'feature_attempt_blocked',
      feature,
      currentTier,
      timestamp: new Date(),
      metadata: {
        conversionFunnelStep: 'feature_attempt',
        blockedReason: currentTier === SubscriptionTier.ANONYMOUS ? 'needs_account' : 'needs_upgrade'
      }
    })
  }, [trackEvent])

  const trackAccountCreationPrompt = useCallback((feature: string, currentTier: SubscriptionTier) => {
    trackEvent({
      sessionId: generateSessionId(),
      event: 'account_creation_prompt_shown',
      feature,
      currentTier,
      targetTier: SubscriptionTier.FREE,
      timestamp: new Date(),
      metadata: {
        conversionFunnelStep: 'account_prompt',
        triggerFeature: feature
      }
    })
  }, [trackEvent])

  const trackAccountCreated = useCallback((feature: string, method: 'email' | 'google') => {
    trackEvent({
      sessionId: generateSessionId(),
      event: 'account_created_success',
      feature,
      currentTier: SubscriptionTier.FREE,
      timestamp: new Date(),
      metadata: {
        conversionFunnelStep: 'account_created',
        signupMethod: method,
        triggerFeature: feature
      }
    })
  }, [trackEvent])

  const trackPremiumPrompt = useCallback((feature: string, currentTier: SubscriptionTier) => {
    trackEvent({
      sessionId: generateSessionId(),
      event: 'premium_upgrade_prompt_shown',
      feature,
      currentTier,
      targetTier: SubscriptionTier.PREMIUM,
      timestamp: new Date(),
      metadata: {
        conversionFunnelStep: 'premium_prompt',
        triggerFeature: feature
      }
    })
  }, [trackEvent])

  const trackPremiumSubscribed = useCallback((feature: string, plan: 'monthly' | 'yearly', amount: number) => {
    trackEvent({
      sessionId: generateSessionId(),
      event: 'premium_subscribed_success',
      feature,
      currentTier: SubscriptionTier.PREMIUM,
      timestamp: new Date(),
      metadata: {
        conversionFunnelStep: 'premium_subscribed',
        subscriptionPlan: plan,
        revenue: amount,
        triggerFeature: feature
      }
    })
  }, [trackEvent])

  const trackModalDismissed = useCallback((modalType: 'account' | 'premium', feature: string, reason: 'close_button' | 'overlay_click' | 'escape_key') => {
    trackEvent({
      sessionId: generateSessionId(),
      event: `${modalType}_modal_dismissed`,
      feature,
      currentTier: modalType === 'account' ? SubscriptionTier.ANONYMOUS : SubscriptionTier.FREE,
      timestamp: new Date(),
      metadata: {
        dismissalReason: reason,
        conversionLoss: true
      }
    })
  }, [trackEvent])

  const trackRevenue = useCallback((amount: number, feature: string, tier: SubscriptionTier) => {
    trackEvent({
      sessionId: generateSessionId(),
      event: 'revenue_generated',
      feature,
      currentTier: tier,
      timestamp: new Date(),
      metadata: {
        revenue: amount,
        currency: 'USD',
        revenueType: tier === SubscriptionTier.PREMIUM ? 'subscription' : 'one_time'
      }
    })
  }, [trackEvent])

  return {
    trackFeatureAttempt,
    trackAccountCreationPrompt,
    trackAccountCreated,
    trackPremiumPrompt,
    trackPremiumSubscribed,
    trackModalDismissed,
    trackRevenue
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
}

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties: Record<string, any>) => void
    }
    gtag?: (command: string, action: string, parameters: Record<string, any>) => void
  }
}