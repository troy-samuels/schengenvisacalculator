'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, CheckCircle, ArrowRight, Star, Crown, Heart, Shield } from 'lucide-react'
import { useConversionTracking } from '@/hooks/use-conversion-tracking'

interface FamilyFeaturePromoProps {
  country?: string
  page?: string
  position?: 'sidebar' | 'inline' | 'modal' | 'banner'
  className?: string
}

export function FamilyFeaturePromo({
  country,
  page = 'calculator',
  position = 'sidebar',
  className = ''
}: FamilyFeaturePromoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const { trackFamilyFeature, trackCTAClick } = useConversionTracking()

  useEffect(() => {
    // Show family feature promo after user has been on page for 30 seconds
    const timer = setTimeout(() => {
      const hasSeenPromo = localStorage.getItem('family_promo_seen')
      if (!hasSeenPromo) {
        setIsVisible(true)
        localStorage.setItem('family_promo_seen', 'true')
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleFeatureClick = (action: 'learn_more' | 'try_free' | 'dismiss') => {
    setHasInteracted(true)
    trackFamilyFeature('view_dashboard', country)

    if (action !== 'dismiss') {
      trackCTAClick('family_feature', action === 'try_free' ? 'primary' : 'secondary', page, country)
    }

    if (action === 'dismiss') {
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  // Different layouts based on position
  const getLayout = () => {
    switch (position) {
      case 'banner':
        return (
          <div className={`bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 rounded-full p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Family Coordination Available</h3>
                  <p className="text-sm text-gray-600">Track up to 4 family members together</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFeatureClick('try_free')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                >
                  Try Free
                </button>
                <button
                  onClick={() => handleFeatureClick('dismiss')}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )

      case 'modal':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Coordinate Family Travel
                </h3>
                <p className="text-gray-600 mb-6">
                  Track multiple family members' Schengen compliance together.
                  Never worry about overlapping dates or overstays again.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Up to 4 family members
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Shared calendar view
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Conflict prevention
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFeatureClick('try_free')}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Try Free
                  </button>
                  <button
                    onClick={() => handleFeatureClick('dismiss')}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'inline':
        return (
          <div className={`bg-white border border-purple-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">PREMIUM FEATURE</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Family Travel Coordination
              </h3>
              <p className="text-sm text-gray-600">
                Perfect for families traveling together to {country || 'Europe'}
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Family Dashboard</div>
                    <div className="text-xs text-gray-600">See everyone's compliance at once</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Conflict Prevention</div>
                    <div className="text-xs text-gray-600">Avoid booking overlapping dates</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Shared Reports</div>
                    <div className="text-xs text-gray-600">PDF reports for the whole family</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href="/schengen-calculator?upgrade=family"
                  onClick={() => handleFeatureClick('try_free')}
                  className="block w-full bg-purple-600 text-white py-2 px-3 rounded-md text-sm text-center hover:bg-purple-700 transition-colors"
                >
                  Try Family Features Free
                </Link>
                <button
                  onClick={() => handleFeatureClick('learn_more')}
                  className="block w-full text-purple-600 text-sm text-center hover:text-purple-700"
                >
                  Learn more about family coordination
                </button>
              </div>
            </div>
          </div>
        )

      default: // sidebar
        return (
          <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-4 ${className}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Family Tracker</h3>
                <p className="text-xs text-gray-600">Coordinate family travel</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>4 family members</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Shared calendar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>PDF reports</span>
              </div>
            </div>
            <button
              onClick={() => handleFeatureClick('try_free')}
              className="w-full bg-purple-600 text-white py-2 px-3 rounded-md text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              Try Free
              <ArrowRight className="h-3 w-3" />
            </button>
            <button
              onClick={() => handleFeatureClick('dismiss')}
              className="w-full text-gray-500 text-xs mt-2 hover:text-gray-700"
            >
              Not interested
            </button>
          </div>
        )
    }
  }

  return getLayout()
}