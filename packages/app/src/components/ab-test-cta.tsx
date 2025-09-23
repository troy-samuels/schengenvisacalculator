'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Calculator, Users } from 'lucide-react'

// A/B Test Variants for CTAs
const CTA_VARIANTS = {
  control: {
    id: 'control',
    primaryText: 'Start Calculator',
    secondaryText: 'Full Schengen Calculator',
    style: 'bg-blue-600 hover:bg-blue-700 text-white',
    icon: null,
    description: 'Calculate your exact compliance with the 90/180 day rule'
  },
  urgency: {
    id: 'urgency',
    primaryText: 'Check Compliance Now',
    secondaryText: 'Avoid Overstay Penalties',
    style: 'bg-red-600 hover:bg-red-700 text-white',
    icon: CheckCircle,
    description: 'Ensure you don\'t overstay and face €500+ fines'
  },
  benefit: {
    id: 'benefit',
    primaryText: 'Get Free Schengen Report',
    secondaryText: 'Plan Perfect Trips',
    style: 'bg-green-600 hover:bg-green-700 text-white',
    icon: ArrowRight,
    description: 'Get instant PDF report for border officials'
  },
  social: {
    id: 'social',
    primaryText: 'Join 50K+ Travelers',
    secondaryText: 'Trusted Calculator',
    style: 'bg-purple-600 hover:bg-purple-700 text-white',
    icon: Users,
    description: 'Used by thousands of successful Schengen travelers'
  },
  premium: {
    id: 'premium',
    primaryText: 'Try Family Tracker Free',
    secondaryText: 'Upgrade Available',
    style: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
    icon: Calculator,
    description: 'Track multiple family members with premium features'
  }
} as const

type VariantKey = keyof typeof CTA_VARIANTS

interface ABTestCTAProps {
  country?: string
  page?: string
  className?: string
}

export function ABTestCTA({ country, page = 'calculator', className = '' }: ABTestCTAProps) {
  const [variant, setVariant] = useState<VariantKey>('control')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    // Client-side variant assignment using cookies
    const getOrSetVariant = (): VariantKey => {
      // Check for existing variant in localStorage
      const stored = localStorage.getItem('cta_variant')
      if (stored && stored in CTA_VARIANTS) {
        return stored as VariantKey
      }

      // Assign new variant using deterministic hash
      const variants: VariantKey[] = ['control', 'urgency', 'benefit', 'social', 'premium']
      const userAgent = navigator.userAgent
      const timestamp = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) // Daily rotation
      const hash = userAgent.length + timestamp
      const selectedVariant = variants[hash % variants.length]

      // Store for consistency
      localStorage.setItem('cta_variant', selectedVariant)

      // Track assignment for analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ab_test_assignment', {
          variant: selectedVariant,
          page: page,
          country: country || 'general'
        })
      }

      return selectedVariant
    }

    const assignedVariant = getOrSetVariant()
    setVariant(assignedVariant)
    setHasLoaded(true)
  }, [country, page])

  const handleCTAClick = (buttonType: 'primary' | 'secondary') => {
    // Track conversion for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        variant: variant,
        button_type: buttonType,
        page: page,
        country: country || 'general',
        value: buttonType === 'primary' ? 10 : 5 // Weighted value for primary vs secondary
      })
    }

    // Track conversion in PostHog if available
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('cta_conversion', {
        variant: variant,
        button_type: buttonType,
        page: page,
        country: country
      })
    }
  }

  // Don't render until client-side hydration is complete
  if (!hasLoaded) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 max-w-md mx-auto"></div>
            <div className="h-12 bg-gray-200 rounded max-w-xs mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  const currentVariant = CTA_VARIANTS[variant]
  const IconComponent = currentVariant.icon

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {country
            ? `Use Our Free ${country} Schengen Calculator`
            : 'Use Our Free Schengen Calculator'
          }
        </h2>
        <p className="text-gray-600 mb-6">
          {currentVariant.description}
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="/schengen-calculator"
            className={`inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${currentVariant.style}`}
            onClick={() => handleCTAClick('primary')}
          >
            {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
            {currentVariant.primaryText}
          </Link>

          <Link
            href="/schengen-calculator"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
            onClick={() => handleCTAClick('secondary')}
          >
            {currentVariant.secondaryText}
          </Link>
        </div>

        {/* Feature highlights based on variant */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {variant === 'urgency' && (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-red-500" />
                Avoid €500+ Fines
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-red-500" />
                Instant Compliance Check
              </div>
            </>
          )}
          {variant === 'benefit' && (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free PDF Report
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Border Official Ready
              </div>
            </>
          )}
          {variant === 'social' && (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                50K+ Users Trust Us
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                4.9★ Rating
              </div>
            </>
          )}
          {variant === 'premium' && (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                Family Coordination
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                Premium Features
              </div>
            </>
          )}
          {variant === 'control' && (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                100% Free & Accurate
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                Mobile Optimized
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}