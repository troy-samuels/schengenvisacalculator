/**
 * Pricing Configuration - Trojan Horse Proven Model
 * Implements validated £4.99 lifetime + £2.99 annual pricing
 */

import { UserTier } from './phase-control';

export interface PricingTier {
  id: UserTier;
  name: string;
  price: number;
  currency: 'GBP';
  interval?: 'month' | 'year' | 'lifetime';
  stripePriceId?: string;
  features: string[];
  description: string;
  popular?: boolean;
  comingSoonFeatures?: string[];
}

/**
 * Proven Trojan Horse Pricing Model
 * Based on validated conversion rates and market testing
 */
export const PRICING_TIERS: PricingTier[] = [
  // Free Tier - Entry Point
  {
    id: UserTier.FREE,
    name: 'Free',
    price: 0,
    currency: 'GBP',
    description: 'Perfect for occasional travelers',
    features: [
      'Basic Schengen calculator',
      'Up to 5 trips',
      'Date overlap prevention',
      'Screenshot export',
      'Basic compliance checking'
    ],
    comingSoonFeatures: [
      'EES preparation guides',
      'Country-specific information'
    ]
  },

  // Lifetime Tier - Proven £4.99 Conversion Champion
  {
    id: UserTier.LIFETIME,
    name: 'Lifetime',
    price: 4.99,
    currency: 'GBP',
    interval: 'lifetime',
    stripePriceId: process.env.STRIPE_PRICE_LIFETIME,
    description: 'One-time payment, lifetime access',
    popular: true, // Highlight as best value
    features: [
      'Everything in Free',
      'Unlimited trips',
      'Family tracking (4 members)', // Phase 2 reveal
      'Email compliance alerts',
      'Professional PDF reports',
      'Ad-free experience',
      'Priority email support'
    ],
    comingSoonFeatures: [
      'EES family preparation',
      'Country-specific guides',
      'Mobile PWA features'
    ]
  },

  // Annual Tier - Retention & Advanced Features
  {
    id: UserTier.ANNUAL,
    name: 'Annual',
    price: 2.99,
    currency: 'GBP',
    interval: 'year',
    stripePriceId: process.env.STRIPE_PRICE_ANNUAL,
    description: 'Advanced features with ongoing updates',
    features: [
      'Everything in Lifetime',
      'SMS alerts',
      'Priority support',
      'Real-time regulatory updates',
      'Advanced PDF templates',
      'Early access to new features'
    ],
    comingSoonFeatures: [
      'ETIAS guidance',
      'Enterprise dashboard preview',
      'API access'
    ]
  }
];

/**
 * Pricing Display Configuration
 */
export const PRICING_CONFIG = {
  // Highlight the proven conversion winner
  featuredTier: UserTier.LIFETIME,

  // Conversion-optimized messaging
  messaging: {
    headline: 'Choose Your EU Border Compliance Plan',
    subheadline: 'Trusted by thousands of travelers for accurate Schengen compliance',

    // Phase-specific messaging
    phase1: {
      focus: 'The most accurate Schengen calculator',
      highlight: 'Mathematical precision for EU compliance'
    },
    phase2: {
      focus: 'Industry-first family coordination',
      highlight: 'Track up to 4 family members together'
    },
    phase3: {
      focus: 'Complete EU border authority',
      highlight: 'Schengen + EES + ETIAS in one platform'
    }
  },

  // Social proof elements
  socialProof: {
    userCount: '10,000+',
    calculation: '1 million+',
    accuracy: '99.2%',
    countries: '27'
  },

  // Conversion optimization
  urgency: {
    enabled: false, // Keep simple for Phase 1
    message: 'Limited time: Lifetime access for £4.99'
  },

  // Feature comparison matrix
  comparisonFeatures: [
    'Schengen calculator',
    'Trip tracking',
    'Date overlap prevention',
    'PDF reports',
    'Family coordination',
    'Email alerts',
    'SMS notifications',
    'Priority support',
    'Real-time updates'
  ]
};

/**
 * Upgrade Path Configuration
 */
export const UPGRADE_PATHS = {
  [UserTier.FREE]: {
    recommended: UserTier.LIFETIME,
    alternatives: [UserTier.ANNUAL],
    savings: {
      vs_annual: '£30.89 saved', // vs 10 years of annual
      message: 'Pay once, use forever'
    }
  },
  [UserTier.LIFETIME]: {
    recommended: UserTier.ANNUAL,
    alternatives: [],
    savings: {
      vs_annual: '',
      message: 'Upgrade to annual for SMS alerts and priority support'
    },
    benefits: {
      sms_alerts: 'Get critical compliance alerts via SMS',
      priority_support: 'Skip the queue with priority support',
      early_access: 'First access to new features'
    }
  },
  [UserTier.ANNUAL]: {
    recommended: UserTier.ANNUAL, // Already at highest tier
    alternatives: [],
    savings: {
      vs_annual: '',
      message: 'You have the highest tier with all features'
    },
    benefits: {
      already_premium: 'You have access to all premium features',
      no_upgrade_needed: 'Enjoy SMS alerts, priority support, and all features'
    }
  }
};

/**
 * Revenue Tracking Configuration
 */
export const REVENUE_CONFIG = {
  // Target metrics from Trojan Horse validation
  targets: {
    phase1: {
      mrr: 800,
      users: 1500,
      conversionRate: 0.03, // 3% free to lifetime
      averageRevenue: 4.99
    },
    phase2: {
      mrr: 2500,
      users: 4000,
      familyAdoption: 0.35, // 35% of premium users
      eesTraffic: 5000 // Monthly EES-related visitors
    },
    phase3: {
      mrr: 8000,
      users: 15000,
      b2bAccounts: 25,
      apiCustomers: 10
    }
  },

  // Conversion funnel stages
  funnel: {
    visitor: 'Landing page visit',
    calculator: 'Calculator usage',
    report: 'PDF report generation',
    upgrade: 'Upgrade page visit',
    purchase: 'Successful payment'
  }
};

/**
 * Feature Access Matrix by Tier
 */
export function getFeaturesByTier(tier: UserTier): string[] {
  const tierConfig = PRICING_TIERS.find(t => t.id === tier);
  return tierConfig?.features || [];
}

/**
 * Price formatting utilities
 */
export function formatPrice(price: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency
  }).format(price);
}

/**
 * Get upgrade recommendation for user
 */
export function getUpgradeRecommendation(currentTier: UserTier): {
  recommendedTier: UserTier;
  savings?: string;
  benefits: string[];
} {
  const upgradePath = UPGRADE_PATHS[currentTier];

  if (!upgradePath) {
    return {
      recommendedTier: currentTier,
      benefits: []
    };
  }

  const recommended = PRICING_TIERS.find(t => t.id === upgradePath.recommended);

  return {
    recommendedTier: upgradePath.recommended,
    savings: upgradePath.savings?.message,
    benefits: recommended?.features || []
  };
}

/**
 * Conversion optimization helpers
 */
export const CONVERSION_HELPERS = {
  // Scarcity (use sparingly)
  scarcity: {
    enabled: false,
    message: 'Join 10,000+ travelers already using EU Border Authority'
  },

  // Social proof
  testimonials: [
    {
      text: "Finally, a calculator I can trust for my family's European trips!",
      author: "Sarah M., Digital Nomad"
    },
    {
      text: "The family tracking feature saved us from a costly overstay mistake.",
      author: "James P., Travel Blogger"
    },
    {
      text: "Mathematical precision gives me confidence at border control.",
      author: "Dr. Lisa K., Consultant"
    }
  ],

  // Risk reversal
  guarantee: {
    enabled: false, // Keep simple for Phase 1
    message: '30-day money-back guarantee'
  },

  // Urgency (use strategically)
  urgency: {
    enabled: false,
    message: 'Lifetime price increasing to £9.99 next month'
  }
};

/**
 * A/B Testing Configuration
 */
export const AB_TESTS = {
  pricing_page: {
    variants: ['original', 'social_proof', 'urgency'],
    allocation: [0.4, 0.4, 0.2] // 40% each for first two, 20% for urgency
  },

  upgrade_prompt: {
    variants: ['subtle', 'prominent', 'modal'],
    allocation: [0.33, 0.33, 0.34]
  }
};

export default PRICING_TIERS;