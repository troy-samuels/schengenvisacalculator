"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Badge } from './badge'
import { useConversionAnalytics } from '../../hooks/useConversionAnalytics'
import { X, Crown, FileText, List, Bell, Palette, ZapOff, Check, CreditCard, Sparkles, CheckCircle } from 'lucide-react'
import { SubscriptionTier } from '../../hooks/useFeatureAccess'

export interface PremiumUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: string // Which feature triggered the modal
  currentTier: SubscriptionTier
  onUpgrade: (tier: 'lifetime' | 'annual', billingCycle: 'lifetime' | 'yearly') => Promise<void>
  loading?: boolean
  error?: string | null
}

// Feature-specific upgrade content
const getUpgradeContent = (feature?: string, currentTier?: SubscriptionTier) => {
  const content = {
    pdf_export: {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Upgrade for Professional PDF Reports",
      currentLimitation: "Screenshot exports only",
      premiumBenefit: "Beautiful PDF reports with company branding",
      description: "Get professional travel reports perfect for visa applications, expense reimbursements, and business documentation."
    },
    unlimited_lists: {
      icon: <List className="w-8 h-8 text-purple-600" />,
      title: "Create Unlimited Trip Lists",
      currentLimitation: "1 trip list maximum",
      premiumBenefit: "Organize trips by project, client, or purpose",
      description: "Perfect for consultants, business travelers, and anyone managing complex travel schedules."
    },
    smart_alerts: {
      icon: <Bell className="w-8 h-8 text-amber-600" />,
      title: "Never Miss Important Visa Deadlines",
      currentLimitation: "Basic alerts only",
      premiumBenefit: "Smart alerts • Email notifications • Policy updates",
      description: "Advanced AI-powered alerts that predict compliance issues before they happen."
    },
    dark_mode: {
      icon: <Palette className="w-8 h-8 text-indigo-600" />,
      title: "Premium Dark Mode Experience",
      currentLimitation: "Light mode only",
      premiumBenefit: "Easy on the eyes • Professional appearance",
      description: "Reduce eye strain and enjoy a premium interface designed for extended use."
    },
    no_ads: {
      icon: <ZapOff className="w-8 h-8 text-red-600" />,
      title: "Enjoy an Ad-Free Experience",
      currentLimitation: "Ads present throughout interface",
      premiumBenefit: "Clean, distraction-free interface",
      description: "Focus on your travel planning without interruptions or distractions."
    },
    default: {
      icon: <Crown className="w-8 h-8 text-amber-500" />,
      title: "Upgrade to Premium",
      currentLimitation: "Limited features",
      premiumBenefit: "Unlock all premium features",
      description: "Get the complete travel compliance experience with professional tools."
    }
  }

  return content[feature as keyof typeof content] || content.default
}

const premiumFeatures = [
  { icon: <List className="w-5 h-5" />, text: "Unlimited trips tracking" },
  { icon: <Bell className="w-5 h-5" />, text: "Smart overstay alerts" },
  { icon: <FileText className="w-5 h-5" />, text: "Professional PDF reports" },
  { icon: <Sparkles className="w-5 h-5" />, text: "Family member tracking (up to 4)" },
  { icon: <ZapOff className="w-5 h-5" />, text: "Date overlap prevention" },
  { icon: <CheckCircle className="w-5 h-5" />, text: "Lifetime updates included" }
]

export function PremiumUpgradeModal({
  isOpen,
  onClose,
  feature,
  currentTier,
  onUpgrade,
  loading = false,
  error = null
}: PremiumUpgradeModalProps) {
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'lifetime' | 'yearly'>('lifetime')
  const analytics = useConversionAnalytics()
  
  const upgradeContent = getUpgradeContent(feature, currentTier)

  const handleUpgrade = async (tier: 'lifetime' | 'annual' = 'lifetime') => {
    if (loading || isUpgrading) return

    try {
      setIsUpgrading(true)
      await onUpgrade(tier, billingCycle)
      // Track successful premium subscription
      const amount = billingCycle === 'lifetime' ? 5.99 : 2.99
      analytics.trackPremiumSubscribed(feature || 'default', billingCycle, amount)
    } catch (error) {
      console.error('Upgrade error:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleClose = (reason: 'close_button' | 'overlay_click' | 'escape_key') => {
    analytics.trackModalDismissed('premium', feature || 'default', reason)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => handleClose('overlay_click')}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-6 py-8">
              <button
                onClick={() => handleClose('close_button')}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {upgradeContent.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {upgradeContent.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {upgradeContent.description}
                </p>

                {/* Current vs Premium comparison */}
                <div className="bg-white/50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current tier */}
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">Your Current Plan</Badge>
                      <p className="text-sm text-gray-600">{upgradeContent.currentLimitation}</p>
                    </div>
                    
                    {/* Premium tier */}
                    <div className="text-center">
                      <Badge className="mb-2 bg-gradient-to-r from-amber-500 to-orange-500">Premium</Badge>
                      <p className="text-sm text-gray-900 font-medium">{upgradeContent.premiumBenefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                >
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Premium Features List */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Crown className="w-5 h-5 text-amber-500 mr-2" />
                  Everything in Premium:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Cycle Selection */}
              <div className="mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => setBillingCycle('lifetime')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all relative ${
                      billingCycle === 'lifetime'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Lifetime
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      Best Value
                    </span>
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Annual
                  </button>
                </div>
                
                {/* Pricing Display */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      £{billingCycle === 'lifetime' ? '5.99' : '2.99'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {billingCycle === 'lifetime' ? 'one-time payment' : 'per year'}
                    </div>
                    {billingCycle === 'lifetime' && (
                      <div className="text-xs text-green-600 mt-1">
                        🎯 Pay once, use forever
                      </div>
                    )}
                    {billingCycle === 'yearly' && (
                      <div className="text-xs text-green-600 mt-1">
                        💰 Includes all future updates
                      </div>
                    )}
                    <div className="text-xs text-green-600 mt-1">✓ 30-day money-back guarantee</div>
                  </div>
                </div>
              </div>

              {/* Upgrade Button */}
              <Button
                onClick={() => handleUpgrade(billingCycle === 'lifetime' ? 'lifetime' : 'annual')}
                disabled={loading || isUpgrading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg mb-4"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {isUpgrading
                  ? 'Redirecting to Payment...'
                  : `${billingCycle === 'lifetime' ? 'Get Lifetime Access' : 'Subscribe Annual'} - £${billingCycle === 'lifetime' ? '5.99' : '2.99'}${billingCycle === 'yearly' ? '/year' : ''}`
                }
              </Button>

              {/* Money back guarantee */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  <span className="text-green-600 font-medium">30-day money-back guarantee</span>
                  <br />
                  No questions asked if you're not satisfied
                </p>
              </div>

              {/* Social proof */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Join <span className="font-medium text-blue-600">3,000+ travelers</span> who trust us with their Schengen compliance
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PremiumUpgradeModal