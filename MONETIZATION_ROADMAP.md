# Schengen Calculator - Three-Tier Monetization Roadmap

A comprehensive implementation plan to transform the Schengen Calculator into a revenue-generating platform with strategic feature distribution across Free, Premium, and Enterprise tiers.

## Executive Summary

This roadmap outlines the systematic implementation of a simplified three-tier monetization strategy, building upon the existing technical foundation documented in CLAUDE.md. The approach focuses on converting our 50,000+ user base while establishing sustainable B2B revenue streams.

### Target Revenue Structure
- **Free Tier**: Customer acquisition and retention
- **Premium Tier**: £9.99/month - Primary revenue driver
- **Enterprise Tier**: £99/month - High-value B2B market

## 🎯 Tier Definitions & Feature Distribution

### FREE TIER - Customer Acquisition
**Strategic Purpose**: Convert visitors to users, demonstrate value

#### Core Features
- ✅ Basic 90/180-day calculator (existing)
- ✅ Date overlap prevention (existing)
- ✅ Up to 5 total trips (modified from current unlimited)
- ✅ Basic compliance checking
- ✅ Mobile-responsive design (existing)
- ✅ Screenshot export only

#### Artificial Limitations (Revenue Drivers)
- 5-trip lifetime limit (not per month)
- No PDF/CSV export
- No analytics dashboard
- No email alerts
- Basic support only

---

### PREMIUM TIER - £9.99/month
**Strategic Purpose**: Primary revenue generator, advanced individual users

#### Premium Features
- ✅ **Unlimited trip tracking**
- 🔨 **90/180 Timeline visualization** - Interactive timeline showing compliance over time
- 🔨 **Country usage analytics** - Visual breakdown of days spent per country
- 🔨 **Travel heatmap** - Geographic visualization of travel patterns
- 🔨 **Risk assessment engine** - Predictive compliance warnings
- 🔨 **Email alerts** - Notifications before approaching limits
- 🔨 **PDF/CSV export** - Professional travel history reports
- 🔨 **Multiple passport support** - Track different citizenship statuses
- 🔨 **Priority support** - Faster response times
- 🔨 **Dark mode** - Enhanced user experience

#### Target Market
- Digital nomads and frequent travelers
- Business travelers
- Individuals with complex travel patterns
- Users seeking professional documentation

---

### ENTERPRISE TIER - £99/month
**Strategic Purpose**: B2B revenue, high-value corporate clients

#### Enterprise Features
- ✅ **All Premium features included**
- 🔨 **Team/family management** - Unlimited user accounts
- 🔨 **API access** - Integration capabilities for travel agencies
- 🔨 **White-label embedding** - Customizable calculator for client websites
- 🔨 **Custom compliance rules** - Support for different visa types
- 🔨 **Dedicated account manager** - Personalized support
- 🔨 **SLA guarantees** - Uptime and response commitments
- 🔨 **Bulk user management** - Admin controls for organizations
- 🔨 **Custom reporting** - Tailored analytics and exports
- 🔨 **Advanced integrations** - CRM and HR system connections

#### Target Market
- Travel agencies and tour operators
- Corporate HR departments
- Immigration law firms
- Relocation services companies

## 📋 Implementation Task List

### Phase 1: Foundation & Premium Features (Month 1)

#### Task 1.1: Subscription Management System
- [ ] **Update subscription tiers in CLAUDE.md structure**
  ```typescript
  enum SubscriptionTier {
    FREE = 'free',
    PREMIUM = 'premium',     // £9.99/month
    ENTERPRISE = 'enterprise' // £99/month
  }
  ```
- [ ] **Implement feature flags system**
  - Update `packages/payments/` with new tier structure
  - Create feature validation middleware
  - Add tier checking to UI components
- [ ] **Configure Stripe products**
  - Set up Premium monthly/yearly pricing
  - Set up Enterprise monthly/yearly pricing
  - Implement subscription webhooks
- [ ] **Testing Requirements**
  - Payment flow end-to-end testing
  - Subscription upgrade/downgrade flows
  - Webhook handling validation

#### Task 1.2: Trip Limit Enforcement (Free Tier)
- [ ] **Implement 5-trip limit for free users**
  - Modify trip creation logic in `packages/app/src/app/page.tsx`
  - Add visual indicators when approaching limit
  - Create upgrade prompts at limit
- [ ] **Update database schema**
  - Add trip count tracking to profiles table
  - Implement trip limit validation
- [ ] **UI/UX Implementation**
  - Progress indicators showing trip usage
  - Upgrade modal when limit reached
  - Clear messaging about tier benefits

#### Task 1.3: Analytics Dashboard (Premium Feature)
- [ ] **Create analytics components** in `packages/ui/src/components/`
  - `AnalyticsDashboard.tsx` - Main dashboard layout
  - `TimelineVisualization.tsx` - 90/180 compliance timeline
  - `CountryUsageChart.tsx` - Days per country breakdown
  - `TravelHeatmap.tsx` - Geographic travel patterns
  - `RiskAssessment.tsx` - Compliance warnings
- [ ] **Implement data processing**
  - Calculate compliance trends over time
  - Process country-specific statistics
  - Generate risk scores and recommendations
- [ ] **Integration with calculator engine**
  - Extend `RobustSchengenCalculator` for analytics data
  - Add historical compliance tracking
  - Performance optimization for large datasets

#### Task 1.4: Export Functionality
- [ ] **PDF Export (Premium)**
  - Install and configure PDF generation library
  - Design professional travel history templates
  - Implement download functionality
- [ ] **CSV Export (Premium)**
  - Create structured data export
  - Include all trip details and compliance data
  - Add date range filtering options
- [ ] **Tier-based export restrictions**
  - Disable for free users with upgrade prompts
  - Add watermarks indicating tier

### Phase 2: Enhanced Features & B2B Preparation (Month 2)

#### Task 2.1: Email Alert System
- [ ] **Email service integration**
  - Configure email provider (SendGrid/AWS SES)
  - Create email templates for alerts
  - Implement subscription preferences
- [ ] **Alert logic implementation**
  - Monitor compliance thresholds
  - Send proactive warnings before violations
  - Weekly/monthly summary reports
- [ ] **User preferences**
  - Email notification settings
  - Alert timing customization
  - Frequency controls

#### Task 2.2: Multiple Passport Support
- [ ] **Database schema updates**
  - Add passport/citizenship tracking
  - Update trip calculations for different nationalities
  - Handle complex visa scenarios
- [ ] **UI components**
  - Passport management interface
  - Citizenship-specific compliance calculations
  - Visual indicators for different passport benefits
- [ ] **Calculator engine updates**
  - Extend calculations for multiple citizenships
  - Handle different Schengen rules per nationality
  - Maintain accuracy for edge cases

#### Task 2.3: Team Management Foundation
- [ ] **User role system**
  - Admin, manager, member role definitions
  - Permission-based access control
  - Invitation and onboarding flows
- [ ] **Team dashboard components**
  - Team member overview
  - Bulk compliance monitoring
  - Admin controls and settings
- [ ] **Database architecture**
  - Team/organization data structure
  - User relationship management
  - Role-based data access

### Phase 3: Enterprise Features & API Development (Month 3)

#### Task 3.1: API Development
- [ ] **RESTful API creation** in `packages/app/src/app/api/v1/`
  - Authentication endpoints
  - Trip management endpoints
  - Compliance calculation endpoints
  - Analytics data endpoints
- [ ] **API documentation**
  - OpenAPI/Swagger specification
  - Integration guides and examples
  - Rate limiting documentation
- [ ] **Security implementation**
  - API key management
  - Rate limiting by tier
  - Request validation and sanitization

#### Task 3.2: White-label Solution
- [ ] **Embeddable calculator component**
  - Standalone widget version
  - Customizable branding options
  - Lightweight, performant implementation
- [ ] **Configuration system**
  - Brand customization (colors, logos)
  - Feature subset selection
  - Domain restrictions and security
- [ ] **Documentation and onboarding**
  - Integration instructions
  - Customization options
  - Support resources

#### Task 3.3: Advanced Enterprise Features
- [ ] **Bulk user management**
  - CSV import/export for users
  - Batch operations interface
  - Advanced admin controls
- [ ] **Custom reporting**
  - Report builder interface
  - Scheduled report generation
  - Custom data exports
- [ ] **SLA monitoring**
  - Uptime tracking
  - Performance metrics
  - Service level reporting

## 💰 Revenue Diversification Strategy

### Affiliate Partnership Integration

#### Task A1: Travel Insurance Partnership
- [ ] **SafetyWing integration** (targeting 20% commission)
  - Add insurance recommendations in compliance warnings
  - Contextual offers based on travel patterns
  - Seamless purchase integration
- [ ] **World Nomads partnership** (targeting 15% commission)
  - Alternative insurance options
  - Country-specific recommendations
- [ ] **Implementation requirements**
  - Affiliate tracking system
  - Revenue attribution
  - Performance analytics

#### Task A2: Travel Booking Integrations
- [ ] **Hotel booking partnerships**
  - Booking.com or Airbnb affiliate program
  - Contextual recommendations based on travel dates
  - Integration with compliance planning
- [ ] **Flight booking integration**
  - Skyscanner or similar affiliate partnership
  - Smart suggestions for compliance-friendly routing
  - Price comparison features
- [ ] **Car rental partnerships**
  - Enterprise, Hertz, or similar affiliations
  - Location-based recommendations
  - Duration optimization for compliance

### B2B Service Offerings

#### Task B1: Corporate Compliance Services
- [ ] **Enterprise consulting package**
  - Compliance auditing services
  - Custom rule implementation
  - Training and onboarding support
- [ ] **Pricing structure**
  - Tiered consulting rates
  - Project-based engagements
  - Retainer agreements

#### Task B2: Immigration Law Firm Partnerships
- [ ] **Referral program development**
  - Partner law firm network
  - Qualified lead generation
  - Revenue sharing agreements
- [ ] **Integration requirements**
  - Lead capture and routing
  - Partner dashboard development
  - Performance tracking

## 🚀 Implementation Timeline

### Month 1: Foundation (Revenue Target: £8,000)
**Week 1-2:**
- [ ] Implement subscription management system
- [ ] Configure Stripe products and webhooks
- [ ] Add 5-trip limit for free users

**Week 3-4:**
- [ ] Build analytics dashboard components
- [ ] Implement PDF/CSV export functionality
- [ ] Launch Premium tier marketing

**Success Metrics:**
- 1,000 Premium subscribers (£9,990 MRR)
- 2% conversion rate from free users
- Zero payment processing errors

### Month 2: Enhancement (Revenue Target: £15,000)
**Week 1-2:**
- [ ] Deploy email alert system
- [ ] Add multiple passport support
- [ ] Begin team management development

**Week 3-4:**
- [ ] Launch travel insurance affiliate program
- [ ] Implement hotel booking integration
- [ ] Prepare Enterprise tier features

**Success Metrics:**
- 1,500 Premium subscribers (£14,985 MRR)
- £3,000 affiliate revenue
- 50+ enterprise leads generated

### Month 3: Scale (Revenue Target: £25,000+)
**Week 1-2:**
- [ ] Launch API for enterprise clients
- [ ] Deploy white-label solution
- [ ] Complete team management features

**Week 3-4:**
- [ ] Launch Enterprise tier
- [ ] Expand affiliate partnerships
- [ ] Begin B2B consultation services

**Success Metrics:**
- 1,800 Premium subscribers (£17,982 MRR)
- 100 Enterprise subscribers (£9,999 MRR)
- £5,000+ affiliate revenue
- £2,000+ B2B service revenue

## 🎯 Success Metrics & KPIs

### Revenue Metrics
- **Monthly Recurring Revenue (MRR)**
- **Average Revenue Per User (ARPU)**
- **Customer Lifetime Value (CLV)**
- **Churn rate by tier**

### Conversion Metrics
- **Free to Premium conversion rate** (Target: 2-3%)
- **Premium to Enterprise conversion rate** (Target: 5-10%)
- **Affiliate conversion rates**
- **Time to conversion**

### Product Metrics
- **Feature usage by tier**
- **User engagement scores**
- **Support ticket volume**
- **Performance benchmarks** (<50ms calculations, <200KB bundle)

### Technical Requirements
- **EU compliance test pass rate: 100%**
- **Date overlap prevention accuracy: 100%**
- **Mobile responsiveness: All features**
- **Security vulnerabilities: Zero**

## 🔧 Technical Implementation Notes

### Database Schema Updates
```sql
-- Add to existing profiles table
ALTER TABLE profiles ADD COLUMN subscription_tier text DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN trip_count integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN created_at timestamp DEFAULT now();

-- New tables for team management
CREATE TABLE organizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  subscription_tier text DEFAULT 'enterprise',
  created_at timestamp DEFAULT now()
);

CREATE TABLE organization_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid REFERENCES organizations(id),
  user_id uuid REFERENCES profiles(id),
  role text DEFAULT 'member',
  created_at timestamp DEFAULT now()
);
```

### Environment Variables to Add
```bash
# Email service
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=info@etiascalculator.com
CONTACT_EMAIL=info@etiascalculator.com
SUPPORT_EMAIL=info@etiascalculator.com

# Affiliate tracking
SAFETYWING_API_KEY=your_safetywing_key
BOOKING_AFFILIATE_ID=your_booking_id
ANALYTICS_API_KEY=your_analytics_key
```

### Feature Flag Implementation
```typescript
// Feature flag checking utility
export function hasFeature(tier: SubscriptionTier, feature: string): boolean {
  const FEATURES = {
    [SubscriptionTier.FREE]: [
      'basic_calculator',
      'date_overlap_prevention',
      'screenshot_export'
    ],
    [SubscriptionTier.PREMIUM]: [
      'unlimited_trips',
      'analytics_dashboard',
      'pdf_export',
      'email_alerts',
      'multiple_passports'
    ],
    [SubscriptionTier.ENTERPRISE]: [
      'team_management',
      'api_access',
      'white_label',
      'custom_reporting',
      'dedicated_support'
    ]
  };
  
  return FEATURES[tier]?.includes(feature) || false;
}
```

## 🚨 Critical Success Factors

### Non-Negotiable Requirements
1. **Maintain 100% EU compliance** - All features must pass official test cases
2. **Preserve date overlap prevention accuracy** - Core functionality integrity
3. **Mobile-first implementation** - Every feature must work on mobile
4. **Zero security vulnerabilities** - Enterprise-grade security standards
5. **Performance benchmarks** - <50ms calculations, <200KB bundle size

### Risk Mitigation
- **Gradual feature rollout** - Test with small user groups first
- **A/B testing** - Validate pricing and feature combinations
- **Fallback mechanisms** - Ensure free tier always works
- **Customer support scaling** - Prepare for increased support volume
- **Competition monitoring** - Track competitor responses and adaptations

## 📞 Support & Resources

### Documentation Updates Required
- [ ] Update TECHNICAL_OVERVIEW.md with new features
- [ ] Create API documentation
- [ ] Build user guides for Premium/Enterprise features
- [ ] Develop partner integration guides

### Team Scaling Considerations
- Customer support team expansion
- Technical documentation maintenance
- Partner relationship management
- Financial reporting and analytics

---

**This roadmap transforms the Schengen Calculator from a free tool into a comprehensive travel compliance platform while maintaining the technical excellence and user experience that has earned 50,000+ users and a 4.9/5 rating.**