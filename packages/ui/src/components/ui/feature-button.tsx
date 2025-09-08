"use client"

import React, { useState } from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { User } from '@supabase/supabase-js'
import useFeatureAccess, { SubscriptionTier } from '../../hooks/useFeatureAccess'
import { useConversionAnalytics } from '../../hooks/useConversionAnalytics'
import { cn } from '../../lib/utils'
import { Crown, Lock, Sparkles } from 'lucide-react'

export interface FeatureButtonProps {
  feature: string
  children: React.ReactNode
  user: User | null
  subscriptionTier?: SubscriptionTier
  onClick?: () => void
  onAccountCreationRequired?: (feature: string) => void
  onPremiumUpgradeRequired?: (feature: string, currentTier: SubscriptionTier) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showUpgradeHint?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export function FeatureButton({
  feature,
  children,
  user,
  subscriptionTier,
  onClick,
  onAccountCreationRequired,
  onPremiumUpgradeRequired,
  variant = 'default',
  size = 'default',
  className,
  showUpgradeHint = true,
  disabled = false,
  fullWidth = false
}: FeatureButtonProps) {
  const { getFeatureAccess, trackFeatureAttempt, currentTier } = useFeatureAccess({ user, subscriptionTier })
  const analytics = useConversionAnalytics()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (disabled || isLoading) return

    setIsLoading(true)
    
    try {
      const access = trackFeatureAttempt(feature)

      if (access.hasAccess) {
        // User has access - execute the feature
        await onClick?.()
      } else {
        // Track feature attempt blocked for analytics
        analytics.trackFeatureAttempt(feature, currentTier)
        
        // User needs to upgrade or create account
        if (access.conversionAction === 'create_account') {
          analytics.trackAccountCreationPrompt(feature, currentTier)
          onAccountCreationRequired?.(feature)
        } else if (access.conversionAction?.includes('upgrade')) {
          analytics.trackPremiumPrompt(feature, currentTier)
          onPremiumUpgradeRequired?.(feature, access.currentTier)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const access = getFeatureAccess(feature)
  
  // Get appropriate styling and content based on access level
  const getButtonAppearance = () => {
    if (access.hasAccess) {
      // Full access - normal button
      return {
        variant: variant,
        icon: null,
        badge: null,
        hint: null
      }
    }

    if (access.requiresAccount) {
      // Anonymous user - needs account
      return {
        variant: 'outline' as const,
        icon: <Lock className="w-4 h-4 ml-2" />,
        badge: showUpgradeHint ? <Badge variant="secondary" className="ml-2 text-xs">Sign Up Required</Badge> : null,
        hint: "Create account to unlock"
      }
    }

    if (access.requiresPremium) {
      // Account holder - needs premium
      return {
        variant: 'outline' as const,
        icon: <Crown className="w-4 h-4 ml-2 text-amber-500" />,
        badge: showUpgradeHint ? <Badge className="ml-2 text-xs bg-gradient-to-r from-amber-500 to-orange-500">Premium</Badge> : null,
        hint: `Upgrade to ${access.nextTier} to unlock`
      }
    }

    return {
      variant: 'outline' as const,
      icon: <Sparkles className="w-4 h-4 ml-2" />,
      badge: null,
      hint: "Feature not available"
    }
  }

  const appearance = getButtonAppearance()

  return (
    <div className="relative group">
      <Button
        onClick={handleClick}
        variant={appearance.variant}
        size={size}
        disabled={disabled || isLoading}
        className={cn(
          "transition-all duration-200",
          // Mobile-first design (CLAUDE.md requirement)
          "min-h-[44px] touch-manipulation",
          fullWidth && "w-full sm:w-auto",
          // Premium styling hints
          !access.hasAccess && "border-dashed hover:border-solid",
          access.requiresPremium && "hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50",
          className
        )}
      >
        <div className="flex items-center justify-center">
          {children}
          {appearance.icon}
        </div>
        {appearance.badge}
      </Button>

      {/* Tooltip hint on hover */}
      {appearance.hint && showUpgradeHint && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {appearance.hint}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-md flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

// Specialized button variants for common use cases

export function ExportButton({ user, subscriptionTier, onExportClick, onAccountRequired, onUpgradeRequired }: {
  user: User | null
  subscriptionTier?: SubscriptionTier
  onExportClick?: () => void
  onAccountRequired?: (feature: string) => void
  onUpgradeRequired?: (feature: string, tier: SubscriptionTier) => void
}) {
  const { hasFeature } = useFeatureAccess({ user, subscriptionTier })
  
  if (!user) {
    return (
      <FeatureButton
        feature="screenshot_export"
        user={user}
        subscriptionTier={subscriptionTier}
        onClick={onExportClick}
        onAccountCreationRequired={onAccountRequired}
        onPremiumUpgradeRequired={onUpgradeRequired}
        fullWidth
      >
        Export Results
      </FeatureButton>
    )
  }

  // Account holder - show both screenshot and PDF options
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <FeatureButton
        feature="screenshot_export"
        user={user}
        subscriptionTier={subscriptionTier}
        onClick={onExportClick}
        onAccountCreationRequired={onAccountRequired}
        onPremiumUpgradeRequired={onUpgradeRequired}
        variant={hasFeature('screenshot_export') ? 'default' : 'outline'}
        className="flex-1"
      >
        Export Screenshot
      </FeatureButton>
      
      <FeatureButton
        feature="pdf_export"
        user={user}
        subscriptionTier={subscriptionTier}
        onClick={onExportClick}
        onAccountCreationRequired={onAccountRequired}
        onPremiumUpgradeRequired={onUpgradeRequired}
        variant={hasFeature('pdf_export') ? 'default' : 'outline'}
        className="flex-1"
      >
        Export PDF
      </FeatureButton>
    </div>
  )
}

export function SaveTripButton({ user, subscriptionTier, onSaveClick, onAccountRequired, onUpgradeRequired }: {
  user: User | null
  subscriptionTier?: SubscriptionTier
  onSaveClick?: () => void
  onAccountRequired?: (feature: string) => void
  onUpgradeRequired?: (feature: string, tier: SubscriptionTier) => void
}) {
  return (
    <FeatureButton
      feature="single_trip_list"
      user={user}
      subscriptionTier={subscriptionTier}
      onClick={onSaveClick}
      onAccountCreationRequired={onAccountRequired}
      onPremiumUpgradeRequired={onUpgradeRequired}
      fullWidth
    >
      Save This Trip
    </FeatureButton>
  )
}

export function CreateListButton({ user, subscriptionTier, currentListCount = 0, onCreateList, onAccountRequired, onUpgradeRequired }: {
  user: User | null
  subscriptionTier?: SubscriptionTier
  currentListCount?: number
  onCreateList?: () => void
  onAccountRequired?: (feature: string) => void
  onUpgradeRequired?: (feature: string, tier: SubscriptionTier) => void
}) {
  const { currentTier, getLimitations } = useFeatureAccess({ user, subscriptionTier })
  const limitations = getLimitations()
  
  // Check if user has hit the list limit
  const hasHitLimit = currentListCount >= limitations.tripLists
  const feature = hasHitLimit ? 'unlimited_lists' : 'single_trip_list'
  
  return (
    <FeatureButton
      feature={feature}
      user={user}
      subscriptionTier={subscriptionTier}
      onClick={onCreateList}
      onAccountCreationRequired={onAccountRequired}
      onPremiumUpgradeRequired={onUpgradeRequired}
      fullWidth
    >
      {hasHitLimit ? `Create Another List (${currentListCount}/∞)` : 'Create Trip List'}
    </FeatureButton>
  )
}

export function SmartAlertsButton({ user, subscriptionTier, onSetupAlerts, onAccountRequired, onUpgradeRequired }: {
  user: User | null
  subscriptionTier?: SubscriptionTier
  onSetupAlerts?: () => void
  onAccountRequired?: (feature: string) => void
  onUpgradeRequired?: (feature: string, tier: SubscriptionTier) => void
}) {
  const { hasFeature } = useFeatureAccess({ user, subscriptionTier })
  
  if (hasFeature('basic_alerts') && !hasFeature('smart_alerts')) {
    // Free user with basic alerts - show upgrade option
    return (
      <div className="space-y-2 w-full">
        <Button variant="outline" className="w-full" disabled>
          Basic Alerts Enabled ✓
        </Button>
        <FeatureButton
          feature="smart_alerts"
          user={user}
          subscriptionTier={subscriptionTier}
          onClick={onSetupAlerts}
          onAccountCreationRequired={onAccountRequired}
          onPremiumUpgradeRequired={onUpgradeRequired}
          fullWidth
        >
          Upgrade to Smart Alerts
        </FeatureButton>
      </div>
    )
  }

  return (
    <FeatureButton
      feature={hasFeature('smart_alerts') ? 'smart_alerts' : 'basic_alerts'}
      user={user}
      subscriptionTier={subscriptionTier}
      onClick={onSetupAlerts}
      onAccountCreationRequired={onAccountRequired}
      onPremiumUpgradeRequired={onUpgradeRequired}
      fullWidth
    >
      {hasFeature('smart_alerts') ? 'Smart Alerts' : 'Enable Alerts'}
    </FeatureButton>
  )
}

export default FeatureButton