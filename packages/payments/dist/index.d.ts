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
    id: string;
    url: string;
}
interface CreateCheckoutSessionRequest {
    priceId: string;
    userId: string;
    successUrl: string;
    cancelUrl: string;
}
declare function createCheckoutSession(request: CreateCheckoutSessionRequest): Promise<StripeSession>;
declare function getSubscriptionStatus(userId: string): Promise<string>;
declare enum BillingCycle {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}
declare function calculateYearlySavings(monthlyPrice: number): number;
declare function getStripe(): null;
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

export { BillingCycle, PaymentProvider, SUBSCRIPTION_TIERS, SubscriptionTier, TIER_PRICING, calculateYearlySavings, checkFeatureAccess, createCheckoutSession, formatPrice, getStripe, getSubscriptionStatus, getTierComparison, getTierFeatures };
export type { CreateCheckoutSessionRequest, StripeSession, SubscriptionTierData };
