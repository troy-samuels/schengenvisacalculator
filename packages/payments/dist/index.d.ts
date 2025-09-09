declare const PaymentProvider: {
    init: () => void;
};
declare enum SubscriptionTier {
    FREE = "free",
    PREMIUM = "premium",
    PRO = "pro",
    BUSINESS = "business"
}
interface SubscriptionTierData {
    id: string;
    name: string;
    price: number;
    features: string[];
}
declare const SUBSCRIPTION_TIERS: SubscriptionTierData[];
declare function checkFeatureAccess(userTier: string, feature: string): boolean;
declare function getTierComparison(currentTier: string, targetTier: string): {
    current: SubscriptionTierData;
    target: SubscriptionTierData;
    savings: number;
    newFeatures: string[];
} | null;
declare function formatPrice(price: number): string;
interface StripeSession {
    sessionId: string;
    url: string;
    tier: string;
    billingCycle: string;
    amount: number;
}
interface CreateCheckoutSessionRequest {
    tier: 'premium' | 'pro' | 'business';
    billingCycle?: 'monthly' | 'yearly';
    userId: string;
    userEmail: string;
    successUrl?: string;
    cancelUrl?: string;
    metadata?: Record<string, string>;
}
declare function createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<StripeSession>;
declare function getSubscriptionStatus(userId: string): Promise<string>;
declare enum BillingCycle {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}
declare function calculateYearlySavings(monthlyPrice: number): number;
declare function getStripe(): any;
declare function getTierFeatures(tierId: string): string[];
declare const TIER_PRICING: {
    free: {
        monthly: number;
        yearly: number;
    };
    premium: {
        monthly: number;
        yearly: number;
    };
    pro: {
        monthly: number;
        yearly: number;
    };
    business: {
        monthly: number;
        yearly: number;
    };
};
interface SubscriptionData {
    id: string;
    status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    tier: SubscriptionTier;
    billingCycle: BillingCycle;
    currentPeriodEnd: Date;
    customerId: string;
    priceId?: string;
}
declare function redirectToStripeCheckout(sessionUrl: string): void;
declare function formatSubscriptionPrice(tier: string, billingCycle: BillingCycle): string;
declare function getUpgradeDiscount(tier: string): number;
declare function getTierDisplayName(tier: string): string;

export { BillingCycle, PaymentProvider, SUBSCRIPTION_TIERS, SubscriptionTier, TIER_PRICING, calculateYearlySavings, checkFeatureAccess, createCheckoutSession, formatPrice, formatSubscriptionPrice, getStripe, getSubscriptionStatus, getTierComparison, getTierDisplayName, getTierFeatures, getUpgradeDiscount, redirectToStripeCheckout };
export type { CreateCheckoutSessionRequest, StripeSession, SubscriptionData, SubscriptionTierData };
