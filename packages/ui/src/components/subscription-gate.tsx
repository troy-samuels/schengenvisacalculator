"use client"

import React, { useState } from 'react'
import { AlertTriangle, Crown, Zap, Building2, Check, Star, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { checkFeatureAccess, getTierComparison, formatPrice } from '@schengen/payments'
import { SubscriptionTier } from '@schengen/payments'

export interface SubscriptionGateProps {
  // Feature gating
  feature: string
  currentTier: SubscriptionTier
  userUsage?: {
    calculations?: number
    exportCount?: number
    storageUsed?: number
    apiRequests?: number
  }
  
  // UI customization
  mode?: 'modal' | 'inline' | 'banner'
  showComparison?: boolean
  showTrialOffer?: boolean
  
  // Callbacks
  onUpgrade?: (targetTier: SubscriptionTier) => void
  onClose?: () => void
  
  // Custom messaging
  customMessage?: string
  customTitle?: string
  
  className?: string
}

const TIER_ICONS = {
  [SubscriptionTier.FREE]: null,
  [SubscriptionTier.PREMIUM]: <Crown className="w-5 h-5" />,
  [SubscriptionTier.PRO]: <Zap className="w-5 h-5" />,
  [SubscriptionTier.BUSINESS]: <Building2 className="w-5 h-5" />
}

const TIER_COLORS = {
  [SubscriptionTier.FREE]: 'bg-gray-50 border-gray-200 text-gray-700',
  [SubscriptionTier.PREMIUM]: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 text-yellow-800',
  [SubscriptionTier.PRO]: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 text-blue-800',
  [SubscriptionTier.BUSINESS]: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-purple-800'
}

const FEATURE_DESCRIPTIONS = {
  'smart_alerts': 'Get notified when you\'re approaching your 90-day limit',
  'unlimited_lists': 'Create unlimited trip lists for better organization',
  'pdf_export': 'Export your trip calculations as professional PDF reports',
  'dark_mode': 'Easy-on-the-eyes dark theme for night planning',
  'no_ads': 'Ad-free experience for focused trip planning',
  'email_reports': 'Automated email reports with trip summaries',
  'trip_optimizer_pro': 'AI-powered trip optimization for maximum days',
  'document_vault': 'Secure storage for travel documents and receipts',
  'multi_person_tracking': 'Track Schengen compliance for multiple travelers',
  'api_access_basic': 'Basic API access for custom integrations',
  'priority_support': 'Priority customer support via email',
  'team_management': 'Manage team access and permissions',
  'white_label': 'White-label the calculator for your business',
  'api_access_full': 'Full API access with higher rate limits',
  'dedicated_support': 'Dedicated account manager and phone support',
  'custom_integrations': 'Custom API integrations and partnerships'
}

export function SubscriptionGate({
  feature,
  currentTier,
  userUsage = {},
  mode = 'modal',
  showComparison = true,
  showTrialOffer = false,
  onUpgrade,
  onClose,
  customMessage,
  customTitle,
  className
}: SubscriptionGateProps) {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  
  // Check feature access
  const accessResult = checkFeatureAccess(currentTier, feature, userUsage)
  
  // If user already has access, don't show the gate
  if (accessResult.allowed) {
    return null
  }
  
  const tierComparison = getTierComparison()
  const recommendedTier = accessResult.recommendedTier || SubscriptionTier.PREMIUM
  const featureDescription = FEATURE_DESCRIPTIONS[feature] || 'Upgrade to unlock this premium feature'
  
  // Pricing information
  const tierPricing = {
    [SubscriptionTier.PREMIUM]: { monthly: 999, yearly: 9999 },
    [SubscriptionTier.PRO]: { monthly: 1999, yearly: 19999 },
    [SubscriptionTier.BUSINESS]: { monthly: 4999, yearly: 49999 }
  }
  
  const handleUpgrade = (tier: SubscriptionTier) => {
    onUpgrade?.(tier)
  }
  
  const renderTierCard = (tier: SubscriptionTier, isRecommended: boolean = false) => {
    if (tier === SubscriptionTier.FREE) return null
    
    const pricing = tierPricing[tier]
    const monthlyPrice = formatPrice(pricing.monthly)
    const yearlyPrice = formatPrice(pricing.yearly)
    const tierInfo = tierComparison[tier]
    
    return (
      <Card
        key={tier}
        className={cn(
          "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
          TIER_COLORS[tier],
          selectedTier === tier && "ring-2 ring-primary ring-offset-2",
          isRecommended && "border-2 border-primary shadow-lg scale-105"
        )}
        onClick={() => setSelectedTier(tier)}
      >
        {isRecommended && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground px-3 py-1">
              <Star className="w-3 h-3 mr-1" />
              Recommended
            </Badge>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            {TIER_ICONS[tier]}
            <span>{tierInfo.name}</span>
          </CardTitle>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{monthlyPrice}/month</div>
            <div className="text-sm opacity-70">or {yearlyPrice}/year (save 17%)</div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {/* Key features for this tier */}
            <div className="space-y-2">
              {tierInfo.features.slice(0, 4).map((featureName: string) => (
                <div key={featureName} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>{FEATURE_DESCRIPTIONS[featureName] || featureName.replace('_', ' ')}</span>
                </div>
              ))}
              
              {tierInfo.features.length > 4 && (
                <div className="text-sm opacity-70">
                  +{tierInfo.features.length - 4} more features
                </div>
              )}
            </div>
            
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleUpgrade(tier)
              }}
              className={cn(
                "w-full",
                isRecommended ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
              )}
              size="sm"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Upgrade to {tierInfo.name}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  const renderInlineMode = () => (
    <div className={cn("border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg p-4", className)}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-1">
            {customTitle || `${feature.replace('_', ' ')} requires ${recommendedTier} subscription`}
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            {customMessage || featureDescription}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleUpgrade(recommendedTier)}
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Upgrade Now
            </Button>
            
            {showTrialOffer && (
              <Button variant="outline" size="sm">
                Start Free Trial
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  
  const renderBannerMode = () => (
    <div className={cn(
      "bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-3",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-primary" />
          <div>
            <span className="font-medium text-primary">
              {customTitle || 'Premium Feature'}
            </span>
            <p className="text-sm text-gray-600">
              {customMessage || featureDescription}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleUpgrade(recommendedTier)}
            size="sm"
          >
            Upgrade
          </Button>
          
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              ×
            </Button>
          )}
        </div>
      </div>
    </div>
  )
  
  const renderModalMode = () => (
    <div className={cn("fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", className)}>
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
          </div>
          
          <CardTitle className="text-2xl mb-2">
            {customTitle || 'Upgrade Required'}
          </CardTitle>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            {customMessage || `${featureDescription}. Choose a subscription plan to unlock this feature and many more.`}
          </p>
        </CardHeader>
        
        <CardContent>
          {showComparison && (
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[SubscriptionTier.PREMIUM, SubscriptionTier.PRO, SubscriptionTier.BUSINESS].map(tier =>
                renderTierCard(tier, tier === recommendedTier)
              )}
            </div>
          )}
          
          {/* Usage limits for free tier */}
          {currentTier === SubscriptionTier.FREE && userUsage && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Your current usage (Free tier)</h4>
              <div className="space-y-2 text-sm">
                {userUsage.calculations !== undefined && (
                  <div className="flex justify-between">
                    <span>Calculations this month:</span>
                    <span className="font-medium">{userUsage.calculations}/100</span>
                  </div>
                )}
                {userUsage.exportCount !== undefined && (
                  <div className="flex justify-between">
                    <span>Exports this month:</span>
                    <span className="font-medium">{userUsage.exportCount}/5</span>
                  </div>
                )}
                {userUsage.storageUsed !== undefined && (
                  <div className="flex justify-between">
                    <span>Storage used:</span>
                    <span className="font-medium">{Math.round(userUsage.storageUsed / 1024 / 1024)}MB/10MB</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Not now
              </Button>
            )}
            
            <div className="flex items-center gap-2 ml-auto">
              {showTrialOffer && (
                <Button variant="outline">
                  Start Free Trial
                </Button>
              )}
              
              <Button onClick={() => handleUpgrade(recommendedTier)}>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to {recommendedTier}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
  
  // Render based on mode
  switch (mode) {
    case 'inline':
      return renderInlineMode()
    case 'banner':
      return renderBannerMode()
    case 'modal':
    default:
      return renderModalMode()
  }
}

// Hook for easy subscription gating
export function useSubscriptionGate(feature: string, currentTier: SubscriptionTier, userUsage?: any) {
  const [showGate, setShowGate] = useState(false)
  
  const accessResult = checkFeatureAccess(currentTier, feature, userUsage)
  
  const requireFeature = () => {
    if (!accessResult.allowed) {
      setShowGate(true)
      return false
    }
    return true
  }
  
  const closeGate = () => setShowGate(false)
  
  return {
    hasAccess: accessResult.allowed,
    showGate,
    requireFeature,
    closeGate,
    accessResult
  }
}