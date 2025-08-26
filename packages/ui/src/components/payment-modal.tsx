"use client"

import React, { useState } from 'react'
import { Loader2, CreditCard, Shield, Check, X, Star, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  BillingCycle, 
  formatPrice, 
  calculateYearlySavings,
  getStripe 
} from '@schengen/payments'
import type { SubscriptionTier } from '@schengen/payments'

export interface PaymentModalProps {
  // Modal state
  isOpen: boolean
  onClose: () => void
  
  // Subscription details
  selectedTier: SubscriptionTier
  billingCycle?: BillingCycle
  
  // User context
  userId?: string
  userEmail?: string
  currentTier?: SubscriptionTier
  
  // Customization
  title?: string
  subtitle?: string
  showFeatureComparison?: boolean
  showSecurityBadges?: boolean
  
  // Event handlers
  onSuccess?: (subscriptionId: string) => void
  onError?: (error: Error) => void
  onCancel?: () => void
  
  // Stripe configuration
  stripePublishableKey?: string
  priceId?: string
  
  className?: string
}

const TIER_FEATURES = {
  [SubscriptionTier.PREMIUM]: [
    'Smart alerts for compliance tracking',
    'Unlimited trip lists',
    'PDF export functionality',
    'Dark mode theme',
    'Ad-free experience',
    'Email reports and summaries'
  ],
  [SubscriptionTier.PRO]: [
    'Everything in Premium',
    'AI-powered trip optimization',
    'Secure document vault',
    'Multi-person tracking',
    'Basic API access',
    'Priority email support'
  ],
  [SubscriptionTier.BUSINESS]: [
    'Everything in Pro',
    'Team management dashboard',
    'White-label customization',
    'Full API access',
    'Dedicated account manager',
    'Custom integrations'
  ]
}

const TIER_PRICING = {
  [SubscriptionTier.PREMIUM]: { monthly: 999, yearly: 9999 },
  [SubscriptionTier.PRO]: { monthly: 1999, yearly: 19999 },
  [SubscriptionTier.BUSINESS]: { monthly: 4999, yearly: 49999 }
}

export function PaymentModal({
  isOpen,
  onClose,
  selectedTier,
  billingCycle = BillingCycle.MONTHLY,
  userId,
  userEmail,
  currentTier = SubscriptionTier.FREE,
  title,
  subtitle,
  showFeatureComparison = true,
  showSecurityBadges = true,
  onSuccess,
  onError,
  onCancel,
  stripePublishableKey,
  priceId,
  className
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState(billingCycle)
  const [step, setStep] = useState<'plan' | 'checkout' | 'processing'>('plan')
  
  if (!isOpen) return null
  
  const pricing = TIER_PRICING[selectedTier]
  const monthlyPrice = formatPrice(pricing.monthly)
  const yearlyPrice = formatPrice(pricing.yearly)
  const savings = calculateYearlySavings(pricing.monthly, pricing.yearly)
  
  const features = TIER_FEATURES[selectedTier] || []
  
  // Handle Stripe checkout
  const handleCheckout = async () => {
    setIsProcessing(true)
    setStep('processing')
    
    try {
      // Initialize Stripe
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId || `${selectedTier}_${selectedBilling}`,
          tier: selectedTier,
          billingCycle: selectedBilling,
          userId,
          userEmail,
          currentTier,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create checkout session')
      }
      
      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId
      })
      
      if (error) {
        throw error
      }
      
    } catch (error) {
      console.error('Checkout error:', error)
      setIsProcessing(false)
      setStep('checkout')
      onError?.(error as Error)
    }
  }
  
  const renderPlanSelection = () => (
    <div className="space-y-6">
      {/* Billing cycle toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setSelectedBilling(BillingCycle.MONTHLY)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              selectedBilling === BillingCycle.MONTHLY
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedBilling(BillingCycle.YEARLY)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors relative",
              selectedBilling === BillingCycle.YEARLY
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Yearly
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5">
              Save {savings.savingsPercentage}%
            </Badge>
          </button>
        </div>
      </div>
      
      {/* Selected plan summary */}
      <Card className="border-primary bg-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">{selectedTier} Plan</CardTitle>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-primary">
              {selectedBilling === BillingCycle.YEARLY ? yearlyPrice : monthlyPrice}
              <span className="text-lg font-normal text-gray-600">
                /{selectedBilling === BillingCycle.YEARLY ? 'year' : 'month'}
              </span>
            </div>
            
            {selectedBilling === BillingCycle.YEARLY && (
              <div className="text-sm text-green-600 font-medium">
                Save {formatPrice(savings.savingsAmount)} compared to monthly
              </div>
            )}
          </div>
        </CardHeader>
        
        {showFeatureComparison && (
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">What's included:</h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Security badges */}
      {showSecurityBadges && (
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="w-4 h-4" />
            <span>Stripe powered</span>
          </div>
          <div className="flex items-center gap-1">
            <X className="w-4 h-4" />
            <span>Cancel anytime</span>
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            onCancel?.()
            onClose()
          }}
        >
          Cancel
        </Button>
        
        <Button
          className="flex-1"
          onClick={() => setStep('checkout')}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Continue to Checkout
        </Button>
      </div>
    </div>
  )
  
  const renderCheckout = () => (
    <div className="space-y-6">
      {/* Order summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{selectedTier} Plan ({selectedBilling})</span>
            <span className="font-medium">
              {selectedBilling === BillingCycle.YEARLY ? yearlyPrice : monthlyPrice}
            </span>
          </div>
          
          {selectedBilling === BillingCycle.YEARLY && (
            <div className="flex justify-between text-green-600">
              <span>Annual discount</span>
              <span>-{formatPrice(savings.savingsAmount)}</span>
            </div>
          )}
          
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>{selectedBilling === BillingCycle.YEARLY ? yearlyPrice : monthlyPrice}</span>
          </div>
        </div>
      </div>
      
      {/* Payment form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-600 mb-4">
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>You'll be redirected to Stripe's secure checkout</p>
            <p className="text-sm">Your payment information is never stored on our servers</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setStep('plan')}
          disabled={isProcessing}
        >
          Back
        </Button>
        
        <Button
          className="flex-1"
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Secure Checkout
            </>
          )}
        </Button>
      </div>
    </div>
  )
  
  const renderProcessing = () => (
    <div className="text-center py-8">
      <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
      <h3 className="text-lg font-medium mb-2">Processing your subscription...</h3>
      <p className="text-gray-600 mb-4">
        Please wait while we set up your {selectedTier} subscription.
      </p>
      <p className="text-sm text-gray-500">
        This may take a few moments. Please do not close this window.
      </p>
    </div>
  )
  
  return (
    <div className={cn("fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", className)}>
      <Card className="w-full max-w-lg max-h-[90vh] overflow-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl">
                {title || `Subscribe to ${selectedTier}`}
              </CardTitle>
              {subtitle && (
                <p className="text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isProcessing}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {step === 'plan' && renderPlanSelection()}
          {step === 'checkout' && renderCheckout()}
          {step === 'processing' && renderProcessing()}
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for payment modal management
export function usePaymentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(SubscriptionTier.PREMIUM)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY)
  
  const openModal = (tier: SubscriptionTier, cycle: BillingCycle = BillingCycle.MONTHLY) => {
    setSelectedTier(tier)
    setBillingCycle(cycle)
    setIsOpen(true)
  }
  
  const closeModal = () => {
    setIsOpen(false)
  }
  
  return {
    isOpen,
    selectedTier,
    billingCycle,
    openModal,
    closeModal,
    setSelectedTier,
    setBillingCycle
  }
}