// Payments module
const PaymentProvider = {
    init: ()=>{}
};
var SubscriptionTier = /*#__PURE__*/ function(SubscriptionTier) {
    SubscriptionTier["FREE"] = "free";
    SubscriptionTier["PREMIUM"] = "premium";
    SubscriptionTier["PRO"] = "pro";
    SubscriptionTier["BUSINESS"] = "business";
    return SubscriptionTier;
}({});
const SUBSCRIPTION_TIERS = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
            'basic_calculator'
        ]
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 9.99,
        features: [
            'basic_calculator',
            'unlimited_lists',
            'pdf_export'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 19.99,
        features: [
            'basic_calculator',
            'unlimited_lists',
            'pdf_export',
            'api_access'
        ]
    }
];
function checkFeatureAccess(userTier, feature) {
    const tier = SUBSCRIPTION_TIERS.find((t)=>t.id === userTier);
    return tier ? tier.features.includes(feature) : false;
}
function getTierComparison(currentTier, targetTier) {
    const current = SUBSCRIPTION_TIERS.find((t)=>t.id === currentTier);
    const target = SUBSCRIPTION_TIERS.find((t)=>t.id === targetTier);
    if (!current || !target) return null;
    return {
        current,
        target,
        savings: target.price - current.price,
        newFeatures: target.features.filter((f)=>!current.features.includes(f))
    };
}
function formatPrice(price) {
    return price === 0 ? 'Free' : `$${price}/month`;
}
// Real Stripe integration functions
async function createCheckoutSession(request) {
    try {
        const response = await fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create checkout session');
        }
        const data = await response.json();
        return {
            sessionId: data.sessionId,
            url: data.url,
            tier: data.tier,
            billingCycle: data.billingCycle,
            amount: data.amount
        };
    } catch (error) {
        console.error('❌ Failed to create Stripe checkout session:', error);
        throw error;
    }
}
async function getSubscriptionStatus(userId) {
    try {
        // TODO: Implement actual subscription status check via API
        // This would query your database for the user's current subscription
        const response = await fetch(`/api/subscription/status?userId=${userId}`);
        if (!response.ok) {
            console.warn('Failed to fetch subscription status, defaulting to free');
            return 'free';
        }
        const data = await response.json();
        return data.status || 'free';
    } catch (error) {
        console.error('Error fetching subscription status:', error);
        return 'free';
    }
}
// Additional types and functions for payment modal
var BillingCycle = /*#__PURE__*/ function(BillingCycle) {
    BillingCycle["MONTHLY"] = "monthly";
    BillingCycle["YEARLY"] = "yearly";
    return BillingCycle;
}({});
function calculateYearlySavings(monthlyPrice) {
    const yearlyPrice = monthlyPrice * 10 // 20% discount
    ;
    const monthlyCost = monthlyPrice * 12;
    return monthlyCost - yearlyPrice;
}
function getStripe() {
    // Client-side Stripe initialization
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        try {
            // Dynamic import for client-side only
            const { loadStripe } = require('@stripe/stripe-js');
            return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        } catch (error) {
            console.error('Failed to load Stripe:', error);
            return null;
        }
    }
    return null;
}
function getTierFeatures(tierId) {
    const tier = SUBSCRIPTION_TIERS.find((t)=>t.id === tierId);
    return tier ? tier.features : [];
}
const TIER_PRICING = {
    free: {
        monthly: 0,
        yearly: 0
    },
    premium: {
        monthly: 9.99,
        yearly: 99
    },
    pro: {
        monthly: 19.99,
        yearly: 199
    },
    business: {
        monthly: 49.99,
        yearly: 499
    }
};
function redirectToStripeCheckout(sessionUrl) {
    if (typeof window !== 'undefined') {
        window.location.href = sessionUrl;
    }
}
function formatSubscriptionPrice(tier, billingCycle) {
    const pricing = TIER_PRICING[tier];
    if (!pricing) return 'Free';
    const price = billingCycle === "yearly" ? pricing.yearly : pricing.monthly;
    const period = billingCycle === "yearly" ? 'year' : 'month';
    return price === 0 ? 'Free' : `$${price}/${period}`;
}
function getUpgradeDiscount(tier) {
    // 20% discount for yearly subscriptions
    const pricing = TIER_PRICING[tier];
    if (!pricing) return 0;
    const monthlyTotal = pricing.monthly * 12;
    const yearlyPrice = pricing.yearly;
    return monthlyTotal - yearlyPrice;
}
function getTierDisplayName(tier) {
    switch(tier.toLowerCase()){
        case 'premium':
            return 'Premium';
        case 'pro':
            return 'Pro';
        case 'business':
            return 'Business';
        case 'free':
        default:
            return 'Free';
    }
}

export { BillingCycle, PaymentProvider, SUBSCRIPTION_TIERS, SubscriptionTier, TIER_PRICING, calculateYearlySavings, checkFeatureAccess, createCheckoutSession, formatPrice, formatSubscriptionPrice, getStripe, getSubscriptionStatus, getTierComparison, getTierDisplayName, getTierFeatures, getUpgradeDiscount, redirectToStripeCheckout };
//# sourceMappingURL=index.esm.js.map
