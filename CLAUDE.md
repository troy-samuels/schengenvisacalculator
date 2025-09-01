# CLAUDE.md - Schengen Calculator V2 Platform Guide (Enhanced)

This file provides comprehensive guidance to Claude Code for building the Schengen Visa Calculator as a monetized platform with enterprise-grade security.

## 🎯 Primary Objective
Build a revenue-generating travel compliance platform with multiple monetization streams, launching with paid features from Day 1 while maintaining free tier for basic calculator.

## 💰 Monetization Implementation

### Subscription Tiers
```typescript
enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',     // $9.99/month
  PRO = 'pro',            // $19.99/month  
  BUSINESS = 'business'   // $49.99/month
}

// Feature flags by tier
const FEATURES = {
  [SubscriptionTier.FREE]: [
    'basic_calculator',
    'single_trip_list',
    'screenshot_export'
  ],
  [SubscriptionTier.PREMIUM]: [
    ...FEATURES[SubscriptionTier.FREE],
    'smart_alerts',
    'unlimited_lists',
    'pdf_export',
    'dark_mode',
    'no_ads',
    'email_reports'
  ],
  [SubscriptionTier.PRO]: [
    ...FEATURES[SubscriptionTier.PREMIUM],
    'trip_optimizer_pro',
    'document_vault',
    'multi_person_tracking',
    'api_access_basic',
    'priority_support'
  ],
  [SubscriptionTier.BUSINESS]: [
    ...FEATURES[SubscriptionTier.PRO],
    'team_management',
    'white_label',
    'api_access_full',
    'dedicated_support',
    'custom_integrations'
  ]
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
npm run test:eu       # EU compliance tests only
npm run test:edge     # Edge case tests only
npm run validate      # Run all validation tests
npm run benchmark     # Performance benchmarking
```

#### Testing & Quality Assurance
```bash
npm run test:coverage   # Run tests with coverage report  
npm run test:e2e       # End-to-end testing with Playwright
npm run test:mobile    # Mobile-specific testing
npm run test:security  # Security vulnerability scanning (ZERO vulnerabilities ✅)
npm run lighthouse     # Performance and accessibility audit
```

## 🔒 **Enterprise Security Stack (ZERO Vulnerabilities)**

This platform uses an enterprise-grade toolchain with **ZERO security vulnerabilities**:

### **Core Security Architecture**
- **Testing**: Jest + @swc/jest (Rust-based, memory-safe)
- **Building**: Rollup + @rollup/plugin-swc (20x faster, secure)
- **Runtime**: Node.js + Next.js 15 (Vercel-optimized)
- **Dependencies**: Minimal attack surface (eliminated 1000+ vulnerable deps)

### **Security Validation**
```bash
npm audit                    # Returns: found 0 vulnerabilities ✅
npm run test:eu-compliance   # Returns: 100% pass rate ✅  
npm run build               # Returns: Zero warnings ✅
```

## Architecture Overview

This is a **monetized Next.js platform** for calculating Schengen visa compliance using the 90/180-day rule, architected as a scalable travel platform with enterprise security. The application includes:

### Core Architecture
- **Frontend**: Next.js App Router with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes, Supabase (PostgreSQL + Auth)
- **Payments**: Stripe integration with subscription management
- **Authentication**: Supabase Auth with MFA and enterprise security
- **Security**: Document vault, audit logging, rate limiting by tier
- **PWA**: Configured with service worker and offline functionality

### Key Components & Services

#### Schengen Calculator Core (`packages/calculator/`)
- **`robust-schengen-calculator.ts`**: Main calculation engine implementing exact 90/180-day rule
- **`date-overlap-validator.ts`**: Prevents date conflicts with visual indicators (CRITICAL)
- **Enhanced calculator**: Premium features with tier-based access
- **Trip optimizer Pro**: AI-powered optimization (PRO tier)

#### Monetization Packages
- **`packages/payments/`**: Stripe integration, subscription management
- **`packages/security/`**: MFA, document vault, audit logging
- **`packages/analytics/`**: Revenue tracking, conversion metrics
- **`packages/affiliates/`**: Partner integrations, commission tracking

#### Database Schema (`lib/types/database.ts`)
- **`profiles`**: User profiles with subscription tier and billing
- **`subscriptions`**: Stripe subscription management and feature flags
- **`countries`**: Schengen area country data with flags
- **`visa_entries`**: Individual travel entries with date conflict prevention
- **`trip_collections`**: Grouped trips with team management (BUSINESS tier)
- **`documents`**: Encrypted document vault (PRO tier)
- **`audit_logs`**: Security and compliance tracking

#### Custom Hooks (`packages/ui/hooks/`)
- **`useSchengenCalculator.ts`**: Basic calculator hook (FREE tier)
- **`useEnhancedSchengenCalculator.ts`**: Enhanced calculator with premium features
- **`useDateOverlapPrevention.ts`**: Date conflict prevention (ALL tiers)
- **`useSubscriptionTier.ts`**: Feature flag management
- **`useTripExport.ts`**: PDF export (PREMIUM), Excel (PRO)
- **`usePaymentFlow.ts`**: Stripe checkout integration

#### UI Components (`packages/ui/components/`)
- **SchengenCalendar**: Date overlap prevention with visual indicators
- **TripCard**: Premium features based on subscription tier
- **PaymentModal**: Stripe integration for upgrades
- **DocumentVault**: Encrypted file storage (PRO tier)
- **TripOptimizer**: AI-powered planning (PRO tier)
- **TeamDashboard**: Multi-user management (BUSINESS tier)
- **PWA components**: Offline status, install prompt

### Monetization Architecture
Revenue-first platform designed for immediate monetization:

- **Subscription Tiers**: FREE ($0), PREMIUM ($9.99), PRO ($19.99), BUSINESS ($49.99)
- **Feature Flags**: Tier-based access control with artificial limitations
- **Payment Integration**: Stripe for subscriptions, one-time payments, trials
- **Affiliate Revenue**: Insurance, eSIM, booking commissions (15-30% margins)
- **API Monetization**: Usage-based pricing for enterprise customers
- **Freemium Model**: Basic calculator free, advanced features paid

### Day 1 Launch Strategy
```typescript
// Free tier artificial limitations
const FREE_TIER_LIMITS = {
  calculationDelay: 2000,      // 2-second delay
  exportFormats: ['screenshot'], // No PDF/Excel
  tripLists: 1,               // Single list only
  adsEnabled: true,           // Show subtle ads
  priorityCalculation: false  // Queue behind paid users
};
```

## Development Guidelines

### Revenue-First Development
- **Every feature** must have tier-based access control
- **Payment integration** required for all premium features
- **Analytics tracking** on all user interactions
- **A/B testing** for pricing and conversion optimization

### 🚨 **MANDATORY: MOBILE-FIRST DEVELOPMENT (NON-NEGOTIABLE)**
**ALL CHANGES MUST INCLUDE MOBILE IMPLEMENTATION AUTOMATICALLY**
- Every UI change MUST work on mobile (separate responsive layouts)
- Every state update MUST work on mobile browsers  
- Every new feature MUST include mobile considerations
- Every component MUST have mobile-specific testing
- Every calculation display MUST work on mobile viewports
- NEVER implement desktop-only features

### Testing Requirements (NON-NEGOTIABLE)
- Always run tests before committing: `npm run validate`
- **EU compliance tests must pass 100%** (legal requirement)
- **Date overlap prevention must be 100% accurate** (core feature)
- Performance benchmarks: <50ms calculations, <200KB bundle
- Payment flow testing: subscription lifecycle, webhooks, refunds

### Calculator Development
- **`RobustSchengenCalculator`** class is the source of truth (packages/calculator/)
- **Date Overlap Prevention** is CRITICAL - no date conflicts allowed
- Always validate against EU official test cases (KOM series) - 100% pass rate
- Handle edge cases: leap years, timezone transitions, boundary conditions
- **Visual indicators**: Occupied dates must be greyed out with strikethrough
- **Interaction prevention**: Clicking occupied dates shows helpful error message
- Maintain backward compatibility with existing trip data

### Database Operations
- Use Supabase client from `lib/supabase/client.ts` for browser-side operations
- Use server client from `lib/supabase/server.ts` for API routes
- **Row Level Security (RLS)** enforces subscription tier access
- **Audit logging** for all premium feature usage
- **Encrypted storage** for document vault (AES-256)
- **Payment webhooks** update subscription status immediately

### Component Development
- Use shadcn/ui components for consistency
- **Mobile-first responsive design** with 44px minimum touch targets
- **Tier-based feature rendering** - check subscription before showing features
- **Payment modals** integrated into premium feature interactions
- **Loading states** for payment processing and subscription checks
- **Error handling** for payment failures and subscription issues
- Use TypeScript interfaces from `packages/*/types/`

## 🚫 CRITICAL: Date Overlap Prevention (Core Feature - All Tiers)

### Visual Implementation Requirements
```typescript
// Date picker visual states (MANDATORY)
const DATE_VISUAL_STATES = {
  occupied: 'bg-gray-200 text-gray-600 line-through cursor-not-allowed opacity-60',
  available: 'bg-gray-50 hover:bg-primary/10 cursor-pointer transition-colors',
  selected: 'bg-primary text-primary-foreground cursor-pointer',
  conflict: 'bg-red-100 text-red-700 cursor-not-allowed border border-red-200',
  suggestion: 'bg-green-100 text-green-700 border border-green-200'
};
```

### Validation Logic (100% Accuracy Required)
```typescript
class DateOverlapValidator {
  /**
   * CRITICAL: Validates if new date range conflicts with existing trips
   * Must be 100% accurate for EU Schengen compliance
   */
  validateDateRange(newRange: DateRange, existingTrips: Trip[]): ValidationResult {
    const conflicts = existingTrips.filter(trip => 
      this.rangesOverlap(newRange, {
        start: trip.startDate,
        end: trip.endDate
      })
    );
    
    return {
      isValid: conflicts.length === 0,
      conflicts: conflicts,
      message: conflicts.length > 0 
        ? `Dates overlap with existing trip: ${conflicts[0].country}`
        : 'Dates are available'
    };
  }
  
  /**
   * Returns array of dates that should be disabled in date picker
   * These dates MUST be visually greyed out with strikethrough
   */
  getDisabledDates(existingTrips: Trip[]): Date[] {
    const disabledDates: Date[] = [];
    
    existingTrips.forEach(trip => {
      let currentDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      
      while (currentDate <= endDate) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    return disabledDates;
  }
}
```

### User Experience Requirements
1. **Visual Feedback**: Occupied dates MUST be greyed out with strikethrough
2. **Interaction Prevention**: Clicking occupied dates shows helpful error message  
3. **Tooltip Information**: Hover shows which trip occupies the date
4. **Mobile Optimization**: Touch-friendly with clear visual indicators
5. **Accessibility**: Screen reader compatible with proper ARIA labels

### Testing Requirements (100% Coverage)
```typescript
// MANDATORY test cases
describe('DateOverlapPrevention', () => {
  it('should grey out and strikethrough occupied dates', () => {
    // Visual indicator test
  });
  
  it('should prevent clicking on occupied dates', () => {
    // Interaction prevention test  
  });
  
  it('should detect exact date overlaps', () => {
    // Validation logic test
  });
  
  it('should show helpful error messages', () => {
    // User experience test
  });
});
```

### Mobile Development Standards (MANDATORY FOR ALL CHANGES)
- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Responsive Design**: Mobile-first approach with breakpoints at 640px, 768px, 1024px
- **Performance**: Target <50ms for calculations, <200KB initial bundle size
- **PWA Requirements**: Offline functionality, service worker, app manifest
- **Accessibility**: WCAG AA compliance, screen reader support, keyboard navigation

### 📱 **CRITICAL: MOBILE-FIRST DEVELOPMENT RULE**
**ANY CHANGES TO THE APPLICATION MUST AUTOMATICALLY INCLUDE MOBILE IMPLEMENTATION**

When making ANY changes to the app, you MUST:
1. **Implement changes for BOTH desktop AND mobile layouts simultaneously**
2. **Test mobile responsiveness and touch interactions**
3. **Verify state updates work correctly on mobile browsers**
4. **Ensure conditional rendering works on both desktop and mobile**
5. **Add mobile-specific debug logging when implementing new features**
6. **Check that new UI components have proper mobile styling**

### Mobile Implementation Checklist (REQUIRED)
- [ ] Desktop implementation complete
- [ ] Mobile responsive design applied (separate mobile layout in code)  
- [ ] Touch event handling tested
- [ ] State management works on mobile browsers
- [ ] Display conditions work for mobile viewport
- [ ] Debug logging added for mobile troubleshooting
- [ ] Mobile-specific edge cases considered
- [ ] Cross-device testing completed

**NEVER implement features for desktop only - mobile must be included automatically.**

### API Development Guidelines
- **Versioning**: Use `/api/v1/` prefix for all new endpoints
- **Authentication**: JWT tokens with Supabase Auth
- **Rate Limiting**: Implement rate limits for all public endpoints
- **Error Handling**: Consistent error response format across all APIs
- **Documentation**: OpenAPI/Swagger documentation for all endpoints

## Environment Variables

Required environment variables:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (REQUIRED for monetization)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Pricing (Day 1 Launch)
STRIPE_PRICE_PREMIUM_MONTHLY=price_premium_monthly
STRIPE_PRICE_PREMIUM_YEARLY=price_premium_yearly
STRIPE_PRICE_PRO_MONTHLY=price_pro_monthly
STRIPE_PRICE_PRO_YEARLY=price_pro_yearly
STRIPE_PRICE_BUSINESS_MONTHLY=price_business_monthly
STRIPE_PRICE_BUSINESS_YEARLY=price_business_yearly

# Security Features
ENCRYPTION_KEY=your_aes_256_key
MFA_SECRET=your_mfa_secret

# Analytics & Tracking
POSTHOG_API_KEY=your_posthog_key
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Affiliate Revenue
SAFETYWING_API_KEY=your_safetywing_key
WORLDNOMADS_API_KEY=your_worldnomads_key
AIRALO_API_KEY=your_airalo_key
AFFILIATE_ID=your_affiliate_id
```

## Important Files & Directories

### Monetization Core
- `packages/payments/` - Stripe integration, subscription management
- `packages/security/` - MFA, document vault, audit logging
- `packages/analytics/` - Revenue tracking, conversion metrics
- `packages/affiliates/` - Partner integrations, commission tracking

### Calculator Core
- `packages/calculator/src/calculator/robust-schengen-calculator.ts` - Main calculation engine
- `packages/calculator/src/validators/date-overlap-validator.ts` - Date conflict prevention
- `packages/calculator/src/__tests__/` - Comprehensive test suites

### UI Components
- `packages/ui/src/components/schengen-calendar.tsx` - Date picker with overlap prevention
- `packages/ui/src/components/trip-card.tsx` - Trip display with tier-based features
- `packages/ui/src/components/ui/` - shadcn/ui component library

### Configuration
- `turbo.json` - Monorepo build configuration
- `packages/app/next.config.mjs` - Next.js config with security headers
- `packages/*/tailwind.config.ts` - Tailwind CSS configurations

## Critical Requirements (NON-NEGOTIABLE)
- **EU compliance tests must always pass 100%** - This is the single most important requirement
- **Date overlap prevention must be 100% accurate** - Core feature for all tiers
- **Payment integration must work flawlessly** - Revenue depends on this
- **Performance benchmarks must be maintained** (<50ms calculations, <200KB bundle)
- **Mobile-first design principles must be preserved** (44px touch targets)
- **Security features must be enterprise-grade** (MFA, encryption, audit logs)
- **🚨 MOBILE IMPLEMENTATION IS MANDATORY FOR ALL CHANGES** - Desktop + Mobile simultaneously

## Revenue Architecture

### Subscription Tiers Implementation
```typescript
// Feature access control
function hasFeature(tier: SubscriptionTier, feature: string): boolean {
  return FEATURES[tier].includes(feature);
}

// Payment enforcement
function requiresPayment(feature: string): boolean {
  return !FEATURES[SubscriptionTier.FREE].includes(feature);
}

// Usage tracking for analytics
function trackFeatureUsage(userId: string, feature: string, tier: SubscriptionTier) {
  analytics.track('feature_used', {
    userId,
    feature,
    tier,
    timestamp: new Date(),
    revenue: TIER_PRICES[tier]
  });
}
```

## Launch Day Checklist

### Day 1 Launch Requirements
- [ ] Stripe products configured with correct pricing
- [ ] Payment flow tested end-to-end
- [ ] Feature flags properly restrict free tier
- [ ] Date overlap prevention working 100%
- [ ] Mobile responsiveness verified
- [ ] Security features enabled (MFA, encryption)
- [ ] Analytics tracking implemented
- [ ] Affiliate partnerships activated
- [ ] Email campaigns ready
- [ ] Support documentation complete

### Success Metrics
- **Revenue**: Target $10K MRR by month 3
- **Conversion**: 5% free-to-paid conversion rate
- **Performance**: <50ms calculation, <200KB bundle
- **Compliance**: 100% EU test pass rate
- **Security**: Zero high/critical vulnerabilities

## 🚀 Deployment Guide

### Vercel Deployment Process

This Next.js monorepo is configured for automatic Vercel deployment with the following architecture:

#### Pre-Deployment Checklist
```bash
# 1. Build all packages locally to catch TypeScript issues
npm run build

# 2. Run full test suite to ensure 100% EU compliance
npm run test

# 3. Verify all monorepo dependencies build correctly
turbo build

# 4. Check for TypeScript export conflicts (critical for Vercel)
cd packages/ui && npm run build   # Should complete without "Duplicate export" errors
cd packages/calculator && npm run build
```

#### Common Deployment Issues & Solutions

**1. TypeScript Export Conflicts**
- **Problem**: `Module '"@schengen/ui"' has no exported member 'DateOverlapValidator'`
- **Root Cause**: Conflicting exports between packages or duplicate type names
- **Solution**: Use specific exports in `types-only.ts` to avoid conflicts
```typescript
// ❌ Problematic - causes conflicts
export * from "./components/ui/calendar-modal"
export * from "./validators/date-overlap-validator" 

// ✅ Correct - specific exports prevent conflicts
export type { CalendarDateRange, CalendarModalProps } from "./components/ui/calendar-modal"
export { CalendarModal } from "./components/ui/calendar-modal"
export * from "./validators/date-overlap-validator"
```

**2. Monorepo Build Order Issues**
- **Problem**: Dependencies not building in correct order
- **Solution**: Vercel automatically handles this with `turbo.json` configuration
- **Verification**: Check `turbo.json` has proper dependency graph

**3. Environment Variables Missing**
- **Problem**: Build succeeds but runtime failures occur
- **Solution**: Ensure all required environment variables are set in Vercel dashboard
```bash
# Required for monetization features
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Required for database operations  
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

#### Deployment Commands & Workflow

```bash
# Local development and testing
npm run dev                    # Start development server
npm run build                  # Test production build locally
npm run test                   # Run full test suite

# Git workflow for deployment  
git add -A                     # Stage all changes
git commit -m "feat: description"   # Commit with conventional format
git push origin main           # Push to trigger Vercel deployment

# Manual Vercel deployment (if needed)
vercel                         # Deploy current directory
vercel --prod                  # Deploy to production domain
```

#### TypeScript Build Configuration

The monorepo uses a specific TypeScript build setup to prevent conflicts:

**packages/ui/rollup.config.js**
- Type declarations built from `src/types-only.ts` (not `src/index.ts`)
- This separates runtime code from type exports for cleaner builds
- Prevents "Conflicting re-exports" issues in production

**Critical Files for Deployment**
- `packages/ui/src/types-only.ts` - Controls TypeScript exports for production
- `packages/ui/src/index.ts` - Controls runtime exports for development
- `turbo.json` - Monorepo build configuration and dependency order
- `vercel.json` - Vercel-specific deployment configuration (if present)

#### Monitoring Deployment

**Build Logs Analysis**
- Rollup warnings are acceptable (e.g., "use client" directives ignored)
- TypeScript errors are deployment blockers and must be resolved
- Build time should be <2 minutes for the entire monorepo

**Post-Deployment Verification**
```bash
# Test critical features after deployment
curl -I https://your-domain.vercel.app                    # Check homepage loads
curl https://your-domain.vercel.app/api/health           # Check API routes (if implemented)

# Manual testing checklist
- [ ] Date overlap prevention works correctly (CRITICAL)
- [ ] Payment flow functions (for monetized features)  
- [ ] Mobile responsiveness maintained
- [ ] All EU compliance tests pass in production
```

#### Rollback Strategy

```bash
# Quick rollback to previous version
vercel rollback [deployment-url]

# Or revert Git commit and push
git revert HEAD
git push origin main
```

---

**This is a revenue-generating platform with enterprise security, not a basic calculator. Every development decision must consider monetization impact.**
