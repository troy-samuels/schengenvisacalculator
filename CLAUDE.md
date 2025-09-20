# CLAUDE.md - EU Border Authority Platform Guide

This file provides comprehensive guidance for building the definitive EU Border Authority platform at euborder.com. The platform combines Schengen 90/180 compliance, EES preparation, and ETIAS guidance into one authoritative resource. **Domain Strategy**: euborder.com with strategic redirects from schengenvisacalculator.com and eessystem.com.

## 🎯 Primary Vision: Complete EU Border Authority
Build the definitive EU Border Authority platform where comprehensive compliance tools, EES preparation, and ETIAS guidance justify premium pricing through genuine regulatory value. The core philosophy: **Authority first, compliance excellence, market leadership**.

### Core Design Principles
- **Authority Leadership**: Become THE definitive EU border information source
- **Calculation Accuracy**: 100% EU compliance, zero tolerance for errors
- **EES Preparation Excellence**: First-mover advantage in biometric system guidance
- **ETIAS Authority**: Comprehensive travel authorization expertise
- **Family-First Design**: Multi-person tracking with visual coordination
- **Mobile Excellence**: Touch-friendly with 44px minimum targets
- **Professional Polish**: Enterprise-grade reliability and security
- **Market Domination**: Capture entire EU border compliance market

## 💰 Focused Monetization Strategy

### Simplified Tier System (Compliance-Focused)
```typescript
// Schengen Compliance Tool Tiers
enum UserStatus {
  FREE = 'free',                  // Basic calculator, 5 trip limit
  LIFETIME = 'lifetime',          // £4.99 one-time - Family tracking + alerts
  ANNUAL = 'annual'               // £2.99/year - SMS alerts + priority support
}

// Compliance-First Feature Access Control
const COMPLIANCE_FEATURES = {
  [UserStatus.FREE]: [
    'basic_schengen_calculator',
    'trip_limit_5',
    'date_overlap_prevention',
    'screenshot_export'
  ],
  [UserStatus.LIFETIME]: [
    'unlimited_trips',
    'family_tracking_4_members',    // UNIQUE: Core competitive advantage
    'email_alerts',
    'pdf_compliance_reports',
    'ad_free_experience'
  ],
  [UserStatus.ANNUAL]: [
    'all_lifetime_features',
    'sms_alerts',                   // Premium communication
    'priority_support',
    'regulatory_updates',
    'advanced_pdf_templates'
  ]
};

// Future B2B Expansion (Post-Success)
const B2B_FEATURES = {
  CORPORATE: {
    price: 25,
    currency: 'GBP',
    interval: 'month',
    features: [
      'employee_management',
      'corporate_dashboard',
      'compliance_reporting',
      'team_coordination',
      'audit_trails'
    ]
  }
};
```

### Revenue Model
```typescript
// Target Revenue Composition (Month 12)
const REVENUE_TARGETS = {
  lifetime_purchases: {
    users: 800,
    price: 4.99,
    revenue: 3992,  // One-time revenue amortized
    percentage: 60
  },
  annual_subscriptions: {
    users: 200,
    price: 2.99,
    revenue: 598,   // Monthly recurring
    percentage: 25
  },
  b2b_corporate: {
    accounts: 15,
    price: 25,
    revenue: 375,   // Monthly recurring
    percentage: 15
  },
  total_monthly: 2500  // £2.5K MRR target
};
```

### Common Development Commands

#### Development
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

#### Testing
```bash
npm test              # Run fast test suite
npm run test:full     # Complete test suite with performance tests
npm run test:eu       # EU compliance tests only (MANDATORY 100% pass)
npm run test:edge     # Edge case tests only
npm run validate      # Run all validation tests
npm run benchmark     # Performance benchmarking
```

## Architecture Overview

This is a **focused Next.js compliance platform** for calculating Schengen visa compliance using the 90/180-day rule, architected for sustainable growth with enterprise security.

### Core Architecture
- **Frontend**: Next.js App Router with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes, Supabase (PostgreSQL + Auth)
- **Payments**: Stripe integration with lifetime + annual subscriptions
- **Authentication**: Supabase Auth with enterprise security
- **Security**: Zero vulnerabilities, audit logging, rate limiting by tier
- **PWA**: Configured with service worker and offline functionality

### Key Components & Services

#### Schengen Calculator Core (`packages/calculator/`)
- **`robust-schengen-calculator.ts`**: Main calculation engine implementing exact 90/180-day rule
- **`date-overlap-validator.ts`**: Prevents date conflicts with visual indicators (CRITICAL)
- **Family tracking system**: Multi-person compliance coordination
- **Alert system**: Email/SMS notifications for compliance deadlines

#### Monetization Packages
- **`packages/payments/`**: Stripe integration, lifetime + annual subscriptions
- **`packages/ui/`**: Family tracking components, premium features
- **`packages/calculator/`**: Core compliance engine with 100% EU accuracy

#### Database Schema (`lib/types/database.ts`)
- **`profiles`**: User profiles with subscription tier and family settings
- **`subscriptions`**: Stripe subscription management for lifetime/annual tiers
- **`countries`**: Schengen area country data with flags
- **`visa_entries`**: Individual travel entries with date conflict prevention
- **`family_members`**: Family tracking with shared compliance coordination
- **`alerts`**: Smart notification system for overstay prevention

#### Custom Hooks (`packages/ui/hooks/`)
- **`useSchengenCalculator.ts`**: Basic calculator hook (FREE tier)
- **`useFamilyTracking.ts`**: Family member management (LIFETIME tier)
- **`useDateOverlapPrevention.ts`**: Date conflict prevention (ALL tiers)
- **`useSubscriptionTier.ts`**: Feature flag management
- **`useComplianceAlerts.ts`**: Smart alert system

#### UI Components (`packages/ui/components/`)
- **SchengenCalendar**: Date overlap prevention with visual indicators
- **FamilyTracker**: Multi-person compliance coordination
- **TripCard**: Premium features based on subscription tier
- **PaymentModal**: Stripe integration for upgrades
- **ComplianceReports**: PDF generation for border officials

## Development Guidelines

### Core Development Philosophy (Compliance-Focused Strategy)
- **Accuracy-First**: 100% EU compliance is non-negotiable
- **Family-Centric**: Multi-person tracking is primary competitive advantage
- **Mobile-First**: Every feature must work flawlessly on mobile
- **Sustainable Growth**: Focus on profitable features, avoid complexity
- **B2B Ready**: Architecture supports future corporate expansion
- **Zero Vulnerabilities**: Enterprise-grade security throughout

### 🚨 **MANDATORY: MOBILE-FIRST + COMPLIANCE ACCURACY (NON-NEGOTIABLE)**
**ALL CHANGES MUST INCLUDE MOBILE IMPLEMENTATION WITH 100% EU COMPLIANCE**
- Every UI change MUST work flawlessly on mobile with iOS-like smoothness
- Every calculation MUST pass 100% of EU compliance tests
- Every family feature MUST work seamlessly on mobile browsers
- Every date picker MUST prevent overlaps with visual indicators
- **Touch Targets**: Minimum 44px with generous spacing
- **Performance**: <50ms for calculations, <200KB bundle
- **Compliance**: 100% pass rate on EU test cases (legal requirement)

### Testing Requirements (NON-NEGOTIABLE)
- Always run tests before committing: `npm run validate`
- **EU compliance tests must pass 100%** (legal requirement)
- **Date overlap prevention must be 100% accurate** (core feature)
- **Family coordination must work across all devices** (competitive advantage)
- **Performance benchmarks**: <50ms calculations, <200KB bundle
- **Mobile experience**: Touch-friendly with proper spacing

### Calculator Development
- **`RobustSchengenCalculator`** class is the source of truth (packages/calculator/)
- **Date Overlap Prevention** is CRITICAL - no date conflicts allowed
- Always validate against EU official test cases - 100% pass rate required
- Handle edge cases: leap years, timezone transitions, boundary conditions
- **Visual indicators**: Occupied dates must be greyed out with strikethrough
- **Family coordination**: Multiple family members with shared compliance

## 🚫 CRITICAL: Date Overlap Prevention (Core Feature - All Tiers)

### Visual Implementation Requirements
```typescript
// Date picker visual states (MANDATORY)
const DATE_VISUAL_STATES = {
  occupied: 'bg-gray-200 text-gray-600 line-through cursor-not-allowed opacity-60',
  available: 'bg-gray-50 hover:bg-primary/10 cursor-pointer transition-colors',
  selected: 'bg-primary text-primary-foreground cursor-pointer',
  conflict: 'bg-red-100 text-red-700 cursor-not-allowed border border-red-200'
};
```

### Family Coordination System
```typescript
// Family member management (LIFETIME tier)
interface FamilyMember {
  id: string;
  name: string;
  nationality: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent';
  trips: Trip[];
  complianceStatus: ComplianceResult;
  alerts: AlertPreference[];
}

// Shared family compliance
interface FamilyCompliance {
  familyId: string;
  members: FamilyMember[];
  sharedTrips: SharedTrip[];
  coordinatedAlerts: boolean;
  complianceOverview: FamilyComplianceResult;
}
```

## Environment Variables

Required environment variables for Schengen Compliance Platform:
```bash
# Supabase Database & Auth
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Payment Processing (Simplified Tiers)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Focused Pricing (No AI Premium)
STRIPE_PRICE_LIFETIME=price_lifetime_4_99
STRIPE_PRICE_ANNUAL=price_annual_2_99

# Email & SMS Alerts
FROM_EMAIL=info@euborder.com
SUPPORT_EMAIL=support@euborder.com
CONTACT_EMAIL=info@euborder.com
ADMIN_EMAIL=info@euborder.com
SENDGRID_API_KEY=your_sendgrid_key
SMS_API_KEY=your_sms_provider_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://euborder.com

# Analytics (Simple)
POSTHOG_API_KEY=your_posthog_key
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Security & Encryption
ENCRYPTION_KEY=your_aes_256_key
JWT_SECRET=your_jwt_secret
```

## Important Files & Directories

### Core Compliance
- `packages/calculator/src/calculator/robust-schengen-calculator.ts` - Main calculation engine
- `packages/calculator/src/validators/date-overlap-validator.ts` - Date conflict prevention
- `packages/calculator/src/__tests__/` - Comprehensive test suites (100% pass required)

### Family Tracking
- `packages/ui/src/components/family-tracker.tsx` - Family member management
- `packages/ui/src/components/family-coordination.tsx` - Multi-person trip planning
- `packages/ui/src/hooks/useFamilyTracking.ts` - Family state management

### Premium Features
- `packages/ui/src/components/compliance-reports.tsx` - PDF generation
- `packages/ui/src/components/alert-system.tsx` - Email/SMS notifications
- `packages/payments/` - Stripe integration for lifetime/annual tiers

### Configuration
- `turbo.json` - Monorepo build configuration
- `packages/app/next.config.mjs` - Next.js config with security headers
- `packages/*/tailwind.config.ts` - Tailwind CSS configurations

## Critical Requirements (NON-NEGOTIABLE)
- **EU compliance tests must always pass 100%** - Legal requirement
- **Date overlap prevention must be 100% accurate** - Core feature for all tiers
- **Family tracking must work flawlessly** - Primary competitive advantage
- **Mobile-first design principles must be preserved** (44px touch targets)
- **Performance benchmarks must be maintained** (<50ms calculations, <200KB bundle)
- **🚨 MOBILE IMPLEMENTATION IS MANDATORY FOR ALL CHANGES** - Desktop + Mobile simultaneously

## Success Metrics

### Business Metrics (Realistic Targets)
- **Month 6**: £800 MRR (break-even)
- **Month 12**: £2,500 MRR (sustainable business)
- **Lifetime Conversion**: 3% of free users
- **Family Feature Adoption**: 35% of premium users
- **Annual Retention**: >60% for premium users

### Technical Metrics
- **EU Compliance**: 100% test pass rate (NON-NEGOTIABLE)
- **Performance**: <50ms calculation time, <200KB bundle
- **Mobile Experience**: >95% mobile usability score
- **Family Coordination**: Zero date conflicts across family members

---

**This is the definitive EU Border Authority platform that combines Schengen compliance, EES preparation, and ETIAS guidance. Every development decision must maintain regulatory excellence while building unassailable market leadership across all EU border topics.**

## 🚀 EU Border Authority Strategy

### Domain Portfolio Management
- **Primary Domain**: euborder.com (Authority Hub)
- **Strategic Redirects**:
  - schengenvisacalculator.com → euborder.com/schengen-calculator
  - eessystem.com → euborder.com/ees
- **Email Identity**: info@euborder.com

### Market Opportunity Analysis
- **Schengen Calculator**: 3K monthly searches (current)
- **EES System**: 50K+ monthly searches (launching October 2025)
- **ETIAS Information**: 40K+ monthly searches
- **EU Border Topics**: 100K+ combined monthly opportunity

### Content Authority Framework
```
euborder.com (Authority Hub)
├── /schengen-calculator (Current proven tool)
├── /ees (EES biometric system center)
├── /etias (Travel authorization hub)
├── /countries/* (27 EU country guides)
├── /business (Corporate compliance)
└── /updates (Border news & regulations)
```