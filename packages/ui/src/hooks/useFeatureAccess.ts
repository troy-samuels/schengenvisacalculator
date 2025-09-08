"use client"

import { User } from '@supabase/supabase-js'

// Subscription tiers from CLAUDE.md
export enum SubscriptionTier {
  ANONYMOUS = 'anonymous',
  FREE = 'free',
  PREMIUM = 'premium',
  PRO = 'pro',
  BUSINESS = 'business'
}

// Feature flags by tier (from CLAUDE.md)
export const FEATURES = {
  [SubscriptionTier.ANONYMOUS]: [
    'basic_calculator_only'  // Only basic calculation, no saving/export/lists
  ],
  [SubscriptionTier.FREE]: [
    'basic_calculator',
    'single_trip_list',
    'screenshot_export',
    'basic_alerts',
    'trip_history'
  ],
  [SubscriptionTier.PREMIUM]: [
    'smart_alerts',
    'unlimited_lists', 
    'pdf_export',
    'dark_mode',
    'no_ads',
    'email_reports'
  ],
  [SubscriptionTier.PRO]: [
    'trip_optimizer_pro',
    'document_vault',
    'multi_person_tracking',
    'api_access_basic',
    'priority_support'
  ],
  [SubscriptionTier.BUSINESS]: [
    'team_management',
    'white_label',
    'api_access_full',
    'dedicated_support',
    'custom_integrations'
  ]
} as const

// Free tier artificial limitations (from CLAUDE.md)
export const FREE_TIER_LIMITS = {
  calculationDelay: 2000,      // 2-second delay
  exportFormats: ['screenshot'], // No PDF/Excel
  tripLists: 1,               // Single list only
  adsEnabled: true,           // Show subtle ads
  priorityCalculation: false,  // Queue behind paid users
  alertsLimited: true         // Only basic alerts
}

export interface FeatureAccessResult {
  hasAccess: boolean
  requiresAccount: boolean
  requiresPremium: boolean
  currentTier: SubscriptionTier
  nextTier?: SubscriptionTier
  conversionAction: 'create_account' | 'upgrade_premium' | 'upgrade_pro' | 'upgrade_business' | null
}

export interface UseFeatureAccessProps {
  user: User | null
  subscriptionTier?: SubscriptionTier
}

export function useFeatureAccess({ user, subscriptionTier }: UseFeatureAccessProps) {
  // Determine current tier
  const getCurrentTier = (): SubscriptionTier => {
    if (!user) return SubscriptionTier.ANONYMOUS
    return subscriptionTier || SubscriptionTier.FREE
  }

  const currentTier = getCurrentTier()

  // Check if user has access to a specific feature
  const hasFeature = (feature: string): boolean => {
    // Check current tier features
    if (FEATURES[currentTier]?.includes(feature as any)) {
      return true
    }

    // Check inherited features from lower tiers
    switch (currentTier) {
      case SubscriptionTier.BUSINESS:
        if (FEATURES[SubscriptionTier.PRO]?.includes(feature as any)) return true
      case SubscriptionTier.PRO:
        if (FEATURES[SubscriptionTier.PREMIUM]?.includes(feature as any)) return true
      case SubscriptionTier.PREMIUM:
        if (FEATURES[SubscriptionTier.FREE]?.includes(feature as any)) return true
        break
    }

    return false
  }

  // Get feature access details
  const getFeatureAccess = (feature: string): FeatureAccessResult => {
    const hasAccess = hasFeature(feature)

    if (hasAccess) {
      return {
        hasAccess: true,
        requiresAccount: false,
        requiresPremium: false,
        currentTier,
        conversionAction: null
      }
    }

    // Check what tier is needed for this feature
    let requiredTier: SubscriptionTier | null = null
    
    if (FEATURES[SubscriptionTier.FREE]?.includes(feature as any)) {
      requiredTier = SubscriptionTier.FREE
    } else if (FEATURES[SubscriptionTier.PREMIUM]?.includes(feature as any)) {
      requiredTier = SubscriptionTier.PREMIUM
    } else if (FEATURES[SubscriptionTier.PRO]?.includes(feature as any)) {
      requiredTier = SubscriptionTier.PRO
    } else if (FEATURES[SubscriptionTier.BUSINESS]?.includes(feature as any)) {
      requiredTier = SubscriptionTier.BUSINESS
    }

    if (!requiredTier) {
      return {
        hasAccess: false,
        requiresAccount: false,
        requiresPremium: false,
        currentTier,
        conversionAction: null
      }
    }

    // Determine conversion action needed
    let conversionAction: FeatureAccessResult['conversionAction'] = null
    
    if (currentTier === SubscriptionTier.ANONYMOUS) {
      conversionAction = 'create_account'
    } else if (requiredTier === SubscriptionTier.PREMIUM && currentTier === SubscriptionTier.FREE) {
      conversionAction = 'upgrade_premium'
    } else if (requiredTier === SubscriptionTier.PRO) {
      conversionAction = 'upgrade_pro'
    } else if (requiredTier === SubscriptionTier.BUSINESS) {
      conversionAction = 'upgrade_business'
    }

    return {
      hasAccess: false,
      requiresAccount: currentTier === SubscriptionTier.ANONYMOUS,
      requiresPremium: requiredTier !== SubscriptionTier.FREE,
      currentTier,
      nextTier: requiredTier,
      conversionAction
    }
  }

  // Get limitations for current tier
  const getLimitations = () => {
    if (currentTier === SubscriptionTier.FREE) {
      return FREE_TIER_LIMITS
    }
    
    return {
      calculationDelay: 0,
      exportFormats: ['screenshot', 'pdf', 'excel'],
      tripLists: Infinity,
      adsEnabled: false,
      priorityCalculation: true,
      alertsLimited: false
    }
  }

  // Analytics helper
  const trackFeatureAttempt = (feature: string, context?: Record<string, any>) => {
    const access = getFeatureAccess(feature)
    
    // This would integrate with analytics service
    console.log('Feature Access Attempt:', {
      feature,
      currentTier,
      hasAccess: access.hasAccess,
      conversionAction: access.conversionAction,
      userId: user?.id || 'anonymous',
      timestamp: new Date(),
      context
    })

    return access
  }

  return {
    currentTier,
    hasFeature,
    getFeatureAccess,
    getLimitations,
    trackFeatureAttempt,
    isAnonymous: currentTier === SubscriptionTier.ANONYMOUS,
    isFreeUser: currentTier === SubscriptionTier.FREE,
    isPremiumUser: [SubscriptionTier.PREMIUM, SubscriptionTier.PRO, SubscriptionTier.BUSINESS].includes(currentTier)
  }
}

// Utility function to get all features available to a tier
export function getAvailableFeatures(tier: SubscriptionTier): string[] {
  let features: string[] = []
  
  switch (tier) {
    case SubscriptionTier.BUSINESS:
      features.push(...FEATURES[SubscriptionTier.BUSINESS])
    case SubscriptionTier.PRO:
      features.push(...FEATURES[SubscriptionTier.PRO])
    case SubscriptionTier.PREMIUM:
      features.push(...FEATURES[SubscriptionTier.PREMIUM])
    case SubscriptionTier.FREE:
      features.push(...FEATURES[SubscriptionTier.FREE])
      break
    case SubscriptionTier.ANONYMOUS:
      features.push(...FEATURES[SubscriptionTier.ANONYMOUS])
      break
  }
  
  return [...new Set(features)] // Remove duplicates
}

export default useFeatureAccess