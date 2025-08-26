// Payments module
export const PaymentProvider = {
  init: () => {},
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  PRO = 'pro',
  BUSINESS = 'business'
}

export interface SubscriptionTierData {
  id: string
  name: string
  price: number
  features: string[]
}

export const SUBSCRIPTION_TIERS: SubscriptionTierData[] = [
  { id: 'free', name: 'Free', price: 0, features: ['basic_calculator'] },
  { id: 'premium', name: 'Premium', price: 9.99, features: ['basic_calculator', 'unlimited_lists', 'pdf_export'] },
  { id: 'pro', name: 'Pro', price: 19.99, features: ['basic_calculator', 'unlimited_lists', 'pdf_export', 'api_access'] },
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

// Stripe types stub
export interface StripeSession {
  id: string
  url: string
}

export interface CreateCheckoutSessionRequest {
  priceId: string
  userId: string
  successUrl: string
  cancelUrl: string
}

// Stub functions for Stripe integration
export async function createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<StripeSession> {
  throw new Error('Stripe integration not implemented')
}

export async function getSubscriptionStatus(userId: string): Promise<string> {
  return 'free'
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
  // Stripe instance placeholder
  return null
}

export function getTierFeatures(tierId: string): string[] {
  const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId)
  return tier ? tier.features : []
}

export const TIER_PRICING = {
  free: { monthly: 0, yearly: 0 },
  premium: { monthly: 9.99, yearly: 99 },
  pro: { monthly: 19.99, yearly: 199 },
  business: { monthly: 49.99, yearly: 499 }
}