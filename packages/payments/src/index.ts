// Payments module
export const PaymentProvider = {
  init: () => {},
}

export enum SubscriptionTier {
  FREE = 'free',
  LIFETIME = 'lifetime',
  ANNUAL = 'annual'
}

export interface SubscriptionTierData {
  id: string
  name: string
  price: number
  features: string[]
}

export const SUBSCRIPTION_TIERS: SubscriptionTierData[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: ['basic_calculator', '5_trip_limit', 'date_overlap_prevention', 'screenshot_export']
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 5.99,
    features: ['unlimited_trips', 'family_tracking_4_members', 'email_alerts', 'pdf_reports', 'ad_free']
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 2.99,
    features: ['all_lifetime_features', 'sms_alerts', 'priority_support', 'regulatory_updates', 'advanced_pdf']
  },
]

export function checkFeatureAccess(userTier: string, feature: string): boolean {
  const tier = SUBSCRIPTION_TIERS.find(t => t.id === userTier)
  return tier ? tier.features.includes(feature) : false
}

export function getTierComparison(currentTier: string, targetTier: string) {
  const current = SUBSCRIPTION_TIERS.find(t => t.id === currentTier)
  const target = SUBSCRIPTION_TIERS.find(t => t.id === targetTier)
  
  if (!current || !target) return null
  
  return {
    current,
    target,
    savings: target.price - current.price,
    newFeatures: target.features.filter(f => !current.features.includes(f))
  }
}

export function formatPrice(price: number): string {
  return price === 0 ? 'Free' : `$${price}/month`
}

// Stripe integration types
export interface StripeSession {
  sessionId: string
  url: string
  tier: string
  billingCycle: string
  amount: number
}

export interface CreateCheckoutSessionRequest {
  tier: 'lifetime' | 'annual'
  billingCycle?: 'one_time' | 'yearly'
  userId: string
  userEmail: string
  successUrl?: string
  cancelUrl?: string
  metadata?: Record<string, string>
}

// Real Stripe integration functions
export async function createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<StripeSession> {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create checkout session')
    }

    const data = await response.json()
    return {
      sessionId: data.sessionId,
      url: data.url,
      tier: data.tier,
      billingCycle: data.billingCycle,
      amount: data.amount
    }
  } catch (error) {
    console.error('❌ Failed to create Stripe checkout session:', error)
    throw error
  }
}

export async function getSubscriptionStatus(userId: string): Promise<string> {
  try {
    // TODO: Implement actual subscription status check via API
    // This would query your database for the user's current subscription
    const response = await fetch(`/api/subscription/status?userId=${userId}`)
    
    if (!response.ok) {
      console.warn('Failed to fetch subscription status, defaulting to free')
      return 'free'
    }
    
    const data = await response.json()
    return data.status || 'free'
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    return 'free'
  }
}

// Additional types and functions for payment modal
export enum BillingCycle {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export function calculateYearlySavings(monthlyPrice: number): number {
  const yearlyPrice = monthlyPrice * 10 // 20% discount
  const monthlyCost = monthlyPrice * 12
  return monthlyCost - yearlyPrice
}

export function getStripe() {
  // Client-side Stripe initialization
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    try {
      // Dynamic import for client-side only
      const { loadStripe } = require('@stripe/stripe-js')
      return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    } catch (error) {
      console.error('Failed to load Stripe:', error)
      return null
    }
  }
  return null
}

export function getTierFeatures(tierId: string): string[] {
  const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId)
  return tier ? tier.features : []
}

export const TIER_PRICING = {
  free: { one_time: 0, yearly: 0 },
  lifetime: { one_time: 5.99, yearly: 0 },
  annual: { one_time: 0, yearly: 2.99 }
}

// Additional subscription management functions
export interface SubscriptionData {
  id: string
  status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  tier: SubscriptionTier
  billingCycle: BillingCycle
  currentPeriodEnd: Date
  customerId: string
  priceId?: string
}

export function redirectToStripeCheckout(sessionUrl: string) {
  if (typeof window !== 'undefined') {
    window.location.href = sessionUrl
  }
}

export function formatSubscriptionPrice(tier: string, billingCycle: BillingCycle): string {
  const pricing = TIER_PRICING[tier as keyof typeof TIER_PRICING]
  if (!pricing) return 'Free'

  if (tier === 'lifetime') {
    return pricing.one_time === 0 ? 'Free' : `£${pricing.one_time} one-time`
  }

  if (tier === 'annual') {
    return pricing.yearly === 0 ? 'Free' : `£${pricing.yearly}/year`
  }

  return 'Free'
}

export function getUpgradeDiscount(tier: string): number {
  // 20% discount for yearly subscriptions
  const pricing = TIER_PRICING[tier as keyof typeof TIER_PRICING]
  if (!pricing) return 0
  
  const monthlyTotal = pricing.monthly * 12
  const yearlyPrice = pricing.yearly
  
  return monthlyTotal - yearlyPrice
}

export function getTierDisplayName(tier: string): string {
  switch (tier.toLowerCase()) {
    case 'premium':
      return 'Premium'
    case 'pro':
      return 'Pro'
    case 'business':
      return 'Business'
    case 'free':
    default:
      return 'Free'
  }
}