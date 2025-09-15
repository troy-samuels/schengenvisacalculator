/**
 * Display Advertising Component for B2C Monetization
 * Shows ads to Anonymous and Free Account users, hidden for Premium users
 * Part of B2C revenue strategy defined in CLAUDE.md
 */

'use client'

import React, { useEffect, useState } from 'react'
import { UserStatus } from '../types/user-status'

interface DisplayAdProps {
  userStatus: UserStatus
  adSlot?: string
  adFormat?: 'banner' | 'rectangle' | 'leaderboard' | 'mobile-banner'
  className?: string
  placeholder?: boolean // For development/testing
}

// Ad dimensions based on format
const AD_DIMENSIONS = {
  'banner': { width: 728, height: 90 },
  'rectangle': { width: 300, height: 250 },
  'leaderboard': { width: 728, height: 90 },
  'mobile-banner': { width: 320, height: 50 }
}

export function DisplayAd({ 
  userStatus, 
  adSlot = 'default-ad-slot',
  adFormat = 'rectangle',
  className = '',
  placeholder = process.env.NODE_ENV === 'development'
}: DisplayAdProps) {
  const [isAdLoaded, setIsAdLoaded] = useState(false)
  const [adError, setAdError] = useState<string | null>(null)

  // Don't show ads to premium users
  if (userStatus !== UserStatus.FREE) {
    return null
  }

  // Don't show ads if user has premium features
  const shouldShowAds = userStatus === UserStatus.FREE || userStatus === UserStatus.FREE

  if (!shouldShowAds) {
    return null
  }

  const dimensions = AD_DIMENSIONS[adFormat]
  const adId = `ad-${adSlot}-${Date.now()}`

  useEffect(() => {
    // Only load Google AdSense in production
    if (placeholder || process.env.NODE_ENV === 'development') {
      setIsAdLoaded(true)
      return
    }

    // Load Google AdSense script
    const loadGoogleAds = async () => {
      try {
        // Check if AdSense script is already loaded
        if (!window.adsbygoogle) {
          const script = document.createElement('script')
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
          script.async = true
          script.crossOrigin = 'anonymous'
          script.setAttribute('data-ad-client', process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || '')
          
          document.head.appendChild(script)
          
          // Wait for script to load
          await new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
          })
        }

        // Initialize the ad
        if (window.adsbygoogle) {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          setIsAdLoaded(true)
        }
      } catch (error) {
        console.error('Failed to load Google AdSense:', error)
        setAdError('Failed to load ad')
      }
    }

    loadGoogleAds()
  }, [placeholder, adSlot])

  // Development placeholder
  if (placeholder) {
    return (
      <div className={`bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center ${className}`}
           style={{ width: dimensions.width, height: dimensions.height }}>
        <div className="text-center p-4">
          <div className="text-sm text-gray-500 mb-1">Advertisement</div>
          <div className="text-xs text-gray-400">
            {adFormat} ({dimensions.width}×{dimensions.height})
          </div>
          <div className="text-xs text-gray-400 mt-1">
            User: {userStatus}
          </div>
        </div>
      </div>
    )
  }

  // Production ad
  return (
    <div className={`ad-container ${className}`}>
      {adError ? (
        <div className="text-xs text-gray-500 p-2">
          Ad failed to load
        </div>
      ) : (
        <ins 
          id={adId}
          className="adsbygoogle"
          style={{ 
            display: 'inline-block', 
            width: `${dimensions.width}px`, 
            height: `${dimensions.height}px` 
          }}
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
          data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID || adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}

/**
 * Strategic Ad Placement Component
 * Places ads in optimal locations based on user engagement
 */
interface StrategyAdPlacementProps {
  userStatus: UserStatus
  location: 'header' | 'sidebar' | 'footer' | 'inline' | 'mobile-sticky'
  className?: string
}

export function StrategicAdPlacement({ 
  userStatus, 
  location, 
  className = '' 
}: StrategyAdPlacementProps) {
  // Don't show ads to premium users
  if (userStatus !== UserStatus.FREE) {
    return null
  }

  const getAdConfig = () => {
    switch (location) {
      case 'header':
        return { 
          adFormat: 'leaderboard' as const, 
          adSlot: 'header-leaderboard',
          className: 'w-full max-w-4xl mx-auto' 
        }
      case 'sidebar':
        return { 
          adFormat: 'rectangle' as const, 
          adSlot: 'sidebar-rectangle',
          className: 'sticky top-4' 
        }
      case 'footer':
        return { 
          adFormat: 'banner' as const, 
          adSlot: 'footer-banner',
          className: 'w-full max-w-4xl mx-auto' 
        }
      case 'inline':
        return { 
          adFormat: 'rectangle' as const, 
          adSlot: 'content-inline',
          className: 'my-8 mx-auto' 
        }
      case 'mobile-sticky':
        return { 
          adFormat: 'mobile-banner' as const, 
          adSlot: 'mobile-sticky-banner',
          className: 'fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg md:hidden' 
        }
      default:
        return { 
          adFormat: 'rectangle' as const, 
          adSlot: 'default',
          className: '' 
        }
    }
  }

  const config = getAdConfig()

  return (
    <div className={`ad-placement ad-placement-${location} ${className}`}>
      {/* Enhanced ads for free account users */}
      {userStatus === UserStatus.FREE && (
        <div className="text-xs text-gray-500 text-center mb-2">
          <span>💡 Remove ads with </span>
          <button className="text-blue-600 hover:text-blue-800 underline">
            Premium - £9.99/year
          </button>
        </div>
      )}
      
      <DisplayAd
        userStatus={userStatus}
        adFormat={config.adFormat}
        adSlot={config.adSlot}
        className={config.className}
        placeholder={process.env.NODE_ENV === 'development'}
      />
    </div>
  )
}

/**
 * Ad-Free Premium Badge
 * Shows premium users that ads are disabled
 */
export function AdFreeBadge({ userStatus }: { userStatus: UserStatus }) {
  if (userStatus === UserStatus.FREE) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-3 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-xs">✓</span>
        </div>
        <div>
          <span className="text-sm font-medium text-blue-900">Ad-Free Experience Active</span>
          <p className="text-xs text-blue-700">Thank you for being a Premium subscriber!</p>
        </div>
      </div>
    </div>
  )
}

// TypeScript declarations for Google AdSense
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}