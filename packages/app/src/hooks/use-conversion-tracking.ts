'use client'

import { useEffect, useCallback } from 'react'

export interface ConversionEvent {
  event: string
  value?: number
  currency?: string
  variant?: string
  page?: string
  country?: string
  user_id?: string
  session_id?: string
  metadata?: Record<string, any>
}

export function useConversionTracking() {
  // Generate or retrieve session ID
  const getSessionId = useCallback(() => {
    if (typeof window === 'undefined') return null

    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }, [])

  // Track conversion events
  const trackConversion = useCallback((event: ConversionEvent) => {
    if (typeof window === 'undefined') return

    const sessionId = getSessionId()
    const timestamp = new Date().toISOString()

    // Enhanced event data
    const enhancedEvent = {
      ...event,
      session_id: sessionId,
      timestamp,
      url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    // Send to Google Analytics 4
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', event.event, {
        event_category: 'conversion',
        event_label: event.country || event.page,
        value: event.value || 0,
        currency: event.currency || 'EUR',
        custom_parameters: {
          variant: event.variant,
          page: event.page,
          country: event.country,
          session_id: sessionId,
          ...event.metadata
        }
      })
    }

    // Send to PostHog
    if (typeof (window as any).posthog?.capture === 'function') {
      (window as any).posthog.capture(event.event, enhancedEvent)
    }

    // Store locally for offline analysis
    try {
      const conversions = JSON.parse(localStorage.getItem('conversions') || '[]')
      conversions.push(enhancedEvent)

      // Keep only last 100 conversions to prevent storage bloat
      if (conversions.length > 100) {
        conversions.splice(0, conversions.length - 100)
      }

      localStorage.setItem('conversions', JSON.stringify(conversions))
    } catch (error) {
      console.warn('Failed to store conversion locally:', error)
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Conversion tracked:', enhancedEvent)
    }
  }, [getSessionId])

  // Track page views with enhanced data
  const trackPageView = useCallback((page: string, country?: string) => {
    trackConversion({
      event: 'page_view',
      page,
      country,
      value: 1
    })
  }, [trackConversion])

  // Track calculator usage
  const trackCalculatorStart = useCallback((country?: string, variant?: string) => {
    trackConversion({
      event: 'calculator_start',
      page: 'calculator',
      country,
      variant,
      value: 5
    })
  }, [trackConversion])

  // Track premium upgrades
  const trackPremiumUpgrade = useCallback((tier: 'lifetime' | 'annual', amount: number, country?: string) => {
    trackConversion({
      event: 'purchase',
      page: 'checkout',
      country,
      value: amount,
      currency: 'GBP',
      metadata: {
        subscription_tier: tier
      }
    })
  }, [trackConversion])

  // Track email signups
  const trackEmailSignup = useCallback((source: string, country?: string) => {
    trackConversion({
      event: 'lead_generation',
      page: source,
      country,
      value: 2,
      metadata: {
        lead_type: 'email_signup'
      }
    })
  }, [trackConversion])

  // Track CTA clicks with A/B test data
  const trackCTAClick = useCallback((
    variant: string,
    buttonType: 'primary' | 'secondary',
    page: string,
    country?: string
  ) => {
    trackConversion({
      event: 'cta_click',
      variant,
      page,
      country,
      value: buttonType === 'primary' ? 10 : 5,
      metadata: {
        button_type: buttonType,
        cta_variant: variant
      }
    })
  }, [trackConversion])

  // Track family feature usage
  const trackFamilyFeature = useCallback((action: 'add_member' | 'view_dashboard' | 'coordinate_trips', country?: string) => {
    trackConversion({
      event: 'family_feature_usage',
      page: 'calculator',
      country,
      value: 8,
      metadata: {
        family_action: action
      }
    })
  }, [trackConversion])

  // Track compliance alerts
  const trackComplianceAlert = useCallback((alertType: 'warning' | 'critical', daysRemaining: number, country?: string) => {
    trackConversion({
      event: 'compliance_alert',
      page: 'calculator',
      country,
      value: alertType === 'critical' ? 15 : 10,
      metadata: {
        alert_type: alertType,
        days_remaining: daysRemaining
      }
    })
  }, [trackConversion])

  // Track PDF exports
  const trackPDFExport = useCallback((reportType: 'basic' | 'premium', country?: string) => {
    trackConversion({
      event: 'pdf_export',
      page: 'calculator',
      country,
      value: reportType === 'premium' ? 12 : 8,
      metadata: {
        report_type: reportType
      }
    })
  }, [trackConversion])

  // Get conversion funnel metrics
  const getConversionMetrics = useCallback(() => {
    if (typeof window === 'undefined') return null

    try {
      const conversions = JSON.parse(localStorage.getItem('conversions') || '[]')
      const sessionId = getSessionId()

      const sessionConversions = conversions.filter((c: any) => c.session_id === sessionId)

      return {
        totalConversions: conversions.length,
        sessionConversions: sessionConversions.length,
        lastConversion: conversions[conversions.length - 1],
        conversionsByEvent: conversions.reduce((acc: any, conv: any) => {
          acc[conv.event] = (acc[conv.event] || 0) + 1
          return acc
        }, {}),
        sessionEvents: sessionConversions.map((c: any) => c.event)
      }
    } catch (error) {
      console.warn('Failed to get conversion metrics:', error)
      return null
    }
  }, [getSessionId])

  return {
    trackConversion,
    trackPageView,
    trackCalculatorStart,
    trackPremiumUpgrade,
    trackEmailSignup,
    trackCTAClick,
    trackFamilyFeature,
    trackComplianceAlert,
    trackPDFExport,
    getConversionMetrics,
    sessionId: getSessionId()
  }
}