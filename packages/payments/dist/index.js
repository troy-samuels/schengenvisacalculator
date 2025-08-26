'use strict';

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
// Stub functions for Stripe integration
async function createCheckoutSession(request) {
    throw new Error('Stripe integration not implemented');
}
async function getSubscriptionStatus(userId) {
    return 'free';
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
    // Stripe instance placeholder
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

exports.BillingCycle = BillingCycle;
exports.PaymentProvider = PaymentProvider;
exports.SUBSCRIPTION_TIERS = SUBSCRIPTION_TIERS;
exports.SubscriptionTier = SubscriptionTier;
exports.TIER_PRICING = TIER_PRICING;
exports.calculateYearlySavings = calculateYearlySavings;
exports.checkFeatureAccess = checkFeatureAccess;
exports.createCheckoutSession = createCheckoutSession;
exports.formatPrice = formatPrice;
exports.getStripe = getStripe;
exports.getSubscriptionStatus = getSubscriptionStatus;
exports.getTierComparison = getTierComparison;
exports.getTierFeatures = getTierFeatures;
//# sourceMappingURL=index.js.map
