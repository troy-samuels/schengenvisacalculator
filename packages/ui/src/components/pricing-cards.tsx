"use client"

import React, { useState } from 'react'
import { Check, Crown, Zap, Building2, Star, ArrowRight, Users, Shield, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  BillingCycle, 
  formatPrice, 
  calculateYearlySavings,
  getTierFeatures,
  TIER_PRICING 
} from '@schengen/payments'
import { SubscriptionTier } from '@schengen/payments'

export interface PricingCardsProps {
  // Current user context
  currentTier?: SubscriptionTier
  currentUsage?: {
    calculations?: number
    exportCount?: number
    storageUsed?: number
  }
  
  // Display options
  showComparison?: boolean
  showPopularBadge?: boolean
  showAnnualToggle?: boolean
  highlightTier?: SubscriptionTier
  compact?: boolean
  
  // Event handlers
  onSelectPlan?: (tier: SubscriptionTier, billingCycle: BillingCycle) => void
  onStartTrial?: (tier: SubscriptionTier) => void
  
  // Customization
  title?: string
  subtitle?: string
  className?: string
}

const TIER_CONFIG = {
  [SubscriptionTier.FREE]: {
    name: 'Free',
    icon: null,
    description: 'Perfect for trying out basic Schengen calculations',
    color: 'bg-gray-50 border-gray-200 text-gray-700',
    buttonColor: 'bg-gray-600 hover:bg-gray-700',
    popular: false,
    limitations: [
      'Limited to 100 calculations per month',
      'Single trip list only',
      'Screenshot export only',
      'Community support',
      'Ads enabled'
    ]
  },
  [SubscriptionTier.PREMIUM]: {
    name: 'Premium',
    icon: <Crown className="w-5 h-5" />,
    description: 'Best for individual travelers who need advanced features',
    color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 text-yellow-800',
    buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    popular: true,
    features: [
      'Unlimited calculations',
      'Smart compliance alerts',
      'Unlimited trip lists',
      'PDF export & reporting',
      'Dark mode theme',
      'Ad-free experience',
      'Email notifications',
      'Priority calculation queue'
    ]
  },
  [SubscriptionTier.PRO]: {
    name: 'Pro',
    icon: <Zap className="w-5 h-5" />,
    description: 'Ideal for frequent travelers and travel professionals',
    color: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 text-blue-800',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    popular: false,
    features: [
      'Everything in Premium',
      'AI-powered trip optimizer',
      'Secure document vault (10GB)',
      'Multi-person tracking',
      'Advanced analytics dashboard',
      'API access (1,000 requests/month)',
      'Priority email support',
      'Excel/CSV export formats'
    ]
  },
  [SubscriptionTier.BUSINESS]: {
    name: 'Business',
    icon: <Building2 className="w-5 h-5" />,
    description: 'Enterprise solution for teams and organizations',
    color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 text-purple-800',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    popular: false,
    features: [
      'Everything in Pro',
      'Team management dashboard',
      'White-label customization',
      'Unlimited API access',
      'Custom integrations',
      'Dedicated account manager',
      'Phone & priority support',
      'Custom compliance rules'
    ]
  }
}

export function PricingCards({
  currentTier = SubscriptionTier.FREE,
  currentUsage = {},
  showComparison = true,
  showPopularBadge = true,
  showAnnualToggle = true,
  highlightTier,
  compact = false,
  onSelectPlan,
  onStartTrial,
  title = "Choose Your Plan",
  subtitle = "Upgrade anytime. Cancel anytime. Start your journey to smarter travel planning.",
  className
}: PricingCardsProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY)
  const [hoveredTier, setHoveredTier] = useState<SubscriptionTier | null>(null)
  
  const handleSelectPlan = (tier: SubscriptionTier) => {
    onSelectPlan?.(tier, billingCycle)
  }
  
  const handleStartTrial = (tier: SubscriptionTier) => {
    onStartTrial?.(tier)
  }
  
  const renderUsageLimits = () => {
    if (currentTier !== SubscriptionTier.FREE || !Object.keys(currentUsage).length) return null
    
    return (
      <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="font-medium text-amber-800 mb-3 flex items-center gap-2">
          <Crown className="w-4 h-4" />
          Your Current Usage (Free Plan)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {currentUsage.calculations !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span>Calculations</span>
                <span className="font-medium">{currentUsage.calculations}/100</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((currentUsage.calculations / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          
          {currentUsage.exportCount !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span>Exports</span>
                <span className="font-medium">{currentUsage.exportCount}/5</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min((currentUsage.exportCount / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          
          {currentUsage.storageUsed !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span>Storage</span>
                <span className="font-medium">{Math.round(currentUsage.storageUsed / 1024 / 1024)}MB/0MB</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full w-full" />
              </div>
            </div>
          )}
        </div>
        
        <p className="text-amber-700 text-sm mt-3">
          Upgrade to remove limits and unlock premium features
        </p>
      </div>
    )
  }
  
  const renderPricingCard = (tier: SubscriptionTier) => {
    const config = TIER_CONFIG[tier]
    const pricing = TIER_PRICING[tier]
    const isCurrentTier = tier === currentTier
    const isHighlighted = tier === (highlightTier || SubscriptionTier.PREMIUM)
    const isHovered = tier === hoveredTier
    
    // Calculate pricing
    let displayPrice = "Free"
    let billingText = ""
    let savings = null
    
    if (tier !== SubscriptionTier.FREE) {
      const monthlyPrice = formatPrice(pricing.monthly)
      const yearlyPrice = formatPrice(pricing.yearly)
      
      if (billingCycle === BillingCycle.YEARLY) {
        displayPrice = yearlyPrice
        billingText = "/year"
        savings = calculateYearlySavings(pricing.monthly, pricing.yearly)
      } else {
        displayPrice = monthlyPrice
        billingText = "/month"
      }
    }
    
    return (
      <Card
        key={tier}
        className={cn(
          "relative transition-all duration-300 hover:shadow-lg",
          config.color,
          isHighlighted && "border-2 border-primary shadow-lg scale-105",
          isHovered && "transform -translate-y-1",
          isCurrentTier && "ring-2 ring-green-500 ring-offset-2",
          compact ? "p-4" : "p-6"
        )}
        onMouseEnter={() => setHoveredTier(tier)}
        onMouseLeave={() => setHoveredTier(null)}
      >
        {/* Popular badge */}
        {config.popular && showPopularBadge && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground px-3 py-1 font-medium">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}
        
        {/* Current plan indicator */}
        {isCurrentTier && (
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-green-500 text-white">
              Current Plan
            </Badge>
          </div>
        )}
        
        <CardHeader className={compact ? "pb-3" : "pb-4"}>
          <CardTitle className="flex items-center gap-2 text-xl">
            {config.icon}
            <span>{config.name}</span>
          </CardTitle>
          
          {!compact && (
            <p className="text-sm opacity-80">{config.description}</p>
          )}
          
          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{displayPrice}</span>
              {billingText && <span className="text-lg opacity-70">{billingText}</span>}
            </div>
            
            {savings && billingCycle === BillingCycle.YEARLY && (
              <div className="text-sm text-green-600 font-medium">
                Save {formatPrice(savings.savingsAmount)} annually ({savings.savingsPercentage}% off)
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Features or limitations */}
          <div className="space-y-2">
            {tier === SubscriptionTier.FREE ? (
              <>
                {/* Free tier limitations */}
                {config.limitations?.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="opacity-80">{limitation}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Paid tier features */}
                {config.features?.slice(0, compact ? 4 : 8).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
                
                {config.features && config.features.length > (compact ? 4 : 8) && (
                  <div className="text-sm opacity-70 italic">
                    +{config.features.length - (compact ? 4 : 8)} more features
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Action button */}
          <div className="pt-4 space-y-2">
            {isCurrentTier ? (
              <Button 
                variant="outline" 
                className="w-full" 
                disabled
              >
                Current Plan
              </Button>
            ) : tier === SubscriptionTier.FREE ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSelectPlan(tier)}
              >
                Your Current Plan
              </Button>
            ) : (
              <>
                <Button
                  className={cn("w-full text-white", config.buttonColor)}
                  onClick={() => handleSelectPlan(tier)}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Upgrade to {config.name}
                </Button>
                
                {tier !== SubscriptionTier.BUSINESS && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleStartTrial(tier)}
                  >
                    Start 7-day free trial
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
        
        {/* Annual toggle */}
        {showAnnualToggle && (
          <div className="flex items-center justify-center mt-6">
            <div className="bg-gray-100 p-1 rounded-lg flex relative">
              <button
                onClick={() => setBillingCycle(BillingCycle.MONTHLY)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors relative z-10",
                  billingCycle === BillingCycle.MONTHLY
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle(BillingCycle.YEARLY)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors relative z-10",
                  billingCycle === BillingCycle.YEARLY
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Yearly
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5">
                  Save 17%
                </Badge>
              </button>
              
              {/* Sliding indicator */}
              <div
                className={cn(
                  "absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-transform duration-200 z-0",
                  "w-[calc(50%-4px)]",
                  billingCycle === BillingCycle.YEARLY 
                    ? "transform translate-x-[calc(100%+8px)]" 
                    : "transform translate-x-1"
                )}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Usage limits for free tier */}
      {renderUsageLimits()}
      
      {/* Pricing cards */}
      <div className={cn(
        "grid gap-6",
        compact 
          ? "grid-cols-1 md:grid-cols-4" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        showComparison && "lg:grid-cols-4"
      )}>
        {Object.values(SubscriptionTier).map(tier => renderPricingCard(tier))}
      </div>
      
      {/* Feature comparison table */}
      {showComparison && !compact && (
        <div className="mt-12 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold">Compare Plans</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 font-medium">Features</th>
                  {Object.values(SubscriptionTier).map(tier => (
                    <th key={tier} className="text-center py-3 px-6 font-medium">
                      {TIER_CONFIG[tier].name}
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3 px-6">Monthly calculations</td>
                  <td className="text-center py-3 px-6">100</td>
                  <td className="text-center py-3 px-6">Unlimited</td>
                  <td className="text-center py-3 px-6">Unlimited</td>
                  <td className="text-center py-3 px-6">Unlimited</td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-3 px-6">Trip lists</td>
                  <td className="text-center py-3 px-6">1</td>
                  <td className="text-center py-3 px-6">Unlimited</td>
                  <td className="text-center py-3 px-6">Unlimited</td>
                  <td className="text-center py-3 px-6">Unlimited</td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-3 px-6">Export formats</td>
                  <td className="text-center py-3 px-6">Screenshot</td>
                  <td className="text-center py-3 px-6">PDF</td>
                  <td className="text-center py-3 px-6">PDF, Excel</td>
                  <td className="text-center py-3 px-6">All formats</td>
                </tr>
                
                <tr className="border-b">
                  <td className="py-3 px-6">Support</td>
                  <td className="text-center py-3 px-6">Community</td>
                  <td className="text-center py-3 px-6">Email</td>
                  <td className="text-center py-3 px-6">Priority</td>
                  <td className="text-center py-3 px-6">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Trust indicators */}
      <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>30-day money back</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>10,000+ travelers trust us</span>
        </div>
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4" />
          <span>24/7 support</span>
        </div>
      </div>
    </div>
  )
}