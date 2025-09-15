# SchengenTracker - Development Roadmap
**Evolution from Basic Calculator to Premium Compliance Tool**

## 🏗️ Technical Architecture Overview

### Current Foundation (Excellent Starting Point)
- **Next.js 15** with App Router and TypeScript 5.7
- **Monorepo Structure**: 4 packages (`app`, `calculator`, `ui`, `payments`)
- **100% EU-Compliant Calculator**: Validated against official test cases
- **Enterprise Security**: Zero vulnerabilities, Supabase auth with RLS
- **Mobile-First PWA**: Offline functionality, 44px touch targets
- **Payment Ready**: Stripe integration for subscriptions

### Core Strengths to Leverage
✅ **RobustSchengenCalculator** - Industry-leading accuracy
✅ **Date Overlap Prevention** - Visual indicators and validation
✅ **Enterprise Security** - Production-ready authentication
✅ **Scalable Architecture** - Supports rapid feature addition
✅ **Mobile Optimized** - PWA with offline capabilities

## 🎯 Development Phases & Timeline

## Phase 1: Foundation & Monetization (Months 1-4)
**Goal**: Best-in-class 90/180 calculator with family tracking
**Target**: £800 MRR, 500 MAU

### Week 1-2: Quick Wins & Revenue Setup

#### 1.1 Premium Pricing Implementation
```typescript
// packages/app/src/lib/types/pricing.ts
export const PRICING_TIERS = {
  LIFETIME: {
    price: 4.99,
    currency: 'GBP',
    features: [
      'unlimited_trips',
      'family_tracking_4_members',
      'basic_alerts',
      'pdf_reports',
      'priority_support'
    ]
  },
  ANNUAL: {
    price: 2.99,
    currency: 'GBP',
    interval: 'year',
    features: [
      'all_lifetime_features',
      'sms_alerts',
      'advanced_reports',
      'regulatory_updates'
    ]
  }
} as const;
```

**Implementation Tasks**:
- [ ] Set up Stripe pricing tiers
- [ ] Implement upgrade prompts for free users
- [ ] Build payment flow for lifetime purchases
- [ ] Add feature gates based on subscription status
- [ ] Track conversion metrics and optimize pricing

#### 1.2 Family/Household Tracking MVP
```typescript
// packages/app/src/lib/types/family-tracking.ts
export interface FamilyMember {
  id: string;
  name: string;
  nationality: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'other';
  trips: Trip[];
  complianceStatus: ComplianceResult;
  alerts: AlertPreference[];
}

export interface FamilyGroup {
  id: string;
  name: string;
  members: FamilyMember[];
  sharedTrips: Trip[]; // Trips where multiple family members travel together
  primaryAccountId: string;
}

// packages/ui/src/components/FamilyTracker.tsx
export function FamilyTracker() {
  const { familyMembers, addMember, removeMember } = useFamilyTracking();

  return (
    <div className="family-tracker">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Family Schengen Tracking</h2>
        <button
          onClick={() => setShowAddMember(true)}
          className="btn-primary"
          disabled={familyMembers.length >= 4} // Premium limit
        >
          Add Family Member
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {familyMembers.map(member => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            onUpdateTrips={(trips) => updateMemberTrips(member.id, trips)}
          />
        ))}
      </div>
    </div>
  );
}
```

**Implementation Tasks**:
- [ ] Database schema for family members and shared trips
- [ ] Family member management UI
- [ ] Shared trip coordination (multiple travelers, same dates)
- [ ] Family-wide compliance dashboard
- [ ] Premium-gated: max 4 family members

### Week 3-4: Core Premium Features

#### 1.3 Smart Overstay Alert System
```typescript
// packages/app/src/lib/services/alertService.ts
export class SchengenAlertService {
  async scheduleOverstayAlerts(userId: string, trips: Trip[]) {
    const alerts = this.calculateAlertSchedule(trips);

    for (const alert of alerts) {
      await this.scheduleAlert({
        userId,
        type: alert.type,
        scheduledFor: alert.date,
        message: alert.message,
        channels: ['email', 'sms'], // Premium feature
        metadata: {
          tripId: alert.tripId,
          daysRemaining: alert.daysRemaining,
          action: alert.suggestedAction
        }
      });
    }
  }

  private calculateAlertSchedule(trips: Trip[]): Alert[] {
    // Logic to create alerts:
    // - 30 days before potential overstay
    // - 7 days before reaching 90-day limit
    // - Day of re-entry eligibility
    // - When adding new trip would cause overstay
  }
}

// Alert Types
enum AlertType {
  OVERSTAY_WARNING = 'overstay_warning',
  LIMIT_APPROACHING = 'limit_approaching',
  REENTRY_ELIGIBLE = 'reentry_eligible',
  TRIP_CONFLICT = 'trip_conflict'
}
```

**Implementation Tasks**:
- [ ] Background job system for alert scheduling
- [ ] Email/SMS notification service integration
- [ ] Alert preference management UI
- [ ] Real-time overstay warnings when adding trips
- [ ] Family-wide alert coordination

#### 1.4 PDF Compliance Reports
```typescript
// packages/app/src/lib/services/pdfExport.ts
import jsPDF from 'jspdf';

export class CompliancePDFGenerator {
  generateReport(userId: string, familyMember?: string): Buffer {
    const doc = new jsPDF();

    // Header with official styling
    doc.setFontSize(18);
    doc.text('Schengen Area Compliance Report', 20, 30);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 40);

    // User information
    this.addUserSection(doc, userData);

    // Trip history table
    this.addTripHistoryTable(doc, trips);

    // Compliance summary
    this.addComplianceSummary(doc, complianceResult);

    // Footer with verification
    this.addFooter(doc);

    return doc.output('arraybuffer');
  }

  private addTripHistoryTable(doc: jsPDF, trips: Trip[]) {
    // Professional table showing:
    // - Entry/Exit dates
    // - Countries visited
    // - Days spent
    // - Running total
    // - Compliance status
  }
}
```

**Implementation Tasks**:
- [ ] Professional PDF template design
- [ ] Trip history table with running totals
- [ ] Compliance status summary
- [ ] Multi-language support (English, German, French, Spanish)
- [ ] Digital signature/verification system

### Month 2-3: Premium Tier Launch & Optimization

#### 1.5 Premium Subscription System
```typescript
// Updated user status system
export enum UserStatus {
  ANONYMOUS = 'anonymous',     // 5 trips, ads, basic features
  FREE = 'free',              // Unlimited trips, ads, no family features
  PREMIUM = 'premium'         // £9.99/year, all features, no ads
}

// Feature access control
export const FEATURES = {
  [UserStatus.ANONYMOUS]: [
    'basic_calculator',
    'date_overlap_prevention',
    'screenshot_export',
    'show_ads',
    'trip_limit_5'
  ],
  [UserStatus.FREE]: [
    'basic_calculator',
    'date_overlap_prevention',
    'unlimited_trips',
    'screenshot_export',
    'show_ads',
    'upgrade_prompts'
  ],
  [UserStatus.PREMIUM]: [
    'unlimited_trips',
    'family_tracking_4_members',  // UNIQUE
    'smart_alerts_email_sms',     // UNIQUE
    'pdf_compliance_reports',     // UNIQUE
    'no_ads',
    'priority_support',
    'trip_optimization_tools',
    'dark_mode',
    'export_csv'
  ]
} as const;
```

**Implementation Tasks**:
- [ ] Stripe subscription setup for £9.99/year
- [ ] Premium upgrade flow with feature comparison
- [ ] Free trial system (14 days)
- [ ] Billing management dashboard
- [ ] Upgrade prompts for free users hitting limits

## Phase 2: B2B Expansion (Months 5-8)
**Goal**: Corporate compliance tools and professional features
**Target**: £1,800 MRR, 1,500 MAU

### 2.1 Corporate Dashboard
```typescript
// packages/app/src/lib/services/corporateService.ts
export class CorporateComplianceService {
  async generateTeamReport(
    companyId: string,
    employees: Employee[],
    dateRange: DateRange
  ): Promise<ComplianceReport> {
    const complianceData = await this.analyzeTeamCompliance(employees, dateRange);

    return {
      companyName: companyData.name,
      reportPeriod: dateRange,
      totalEmployees: employees.length,
      complianceStatus: complianceData.overallStatus,
      riskAlerts: complianceData.alerts,
      upcomingDeadlines: complianceData.deadlines,
      recommendations: this.generateRecommendations(complianceData)
    };
  }

  private generateRecommendations(data: ComplianceData): string[] {
    // Business rules for compliance optimization
    // Focus on preventing overstays and optimizing business travel
  }
}
```

**Features**:
- [ ] Employee compliance tracking
- [ ] Bulk trip management
- [ ] Compliance audit reports
- [ ] Risk alerts for HR teams
- [ ] API integration for travel management systems

### 2.2 Advanced Compliance Tools
```typescript
// packages/app/src/lib/services/complianceOptimizer.ts
export class ComplianceOptimizer {
  analyzeOptimalTiming(plannedTrip: Trip, existingTrips: Trip[]): OptimizationResult {
    const scenarios = this.calculateAlternatives(plannedTrip, existingTrips);

    return {
      currentCompliance: this.checkCompliance(plannedTrip, existingTrips),
      alternatives: scenarios.map(scenario => ({
        suggestedDates: scenario.dates,
        additionalDays: scenario.extraDays,
        complianceRisk: scenario.risk,
        reasoning: scenario.explanation
      })),
      familyCoordination: this.checkFamilyImpact(scenarios)
    };
  }

  private calculateAlternatives(trip: Trip, existing: Trip[]): Scenario[] {
    // Calculate alternative date ranges that maximize compliance
    // Focus on mathematical optimization, not AI predictions
  }
}
```

### 2.3 Professional Features
- [ ] Advanced PDF reporting with company branding
- [ ] CSV export for corporate expense systems
- [ ] Multi-language compliance documentation
- [ ] Custom alert schedules for business travelers
- [ ] Integration APIs for travel management platforms

## Phase 3: Platform Maturity (Months 9-12)
**Goal**: Sustainable growth and market leadership
**Target**: £2,500-3,000 MRR, 3,000+ MAU

### 3.1 Market Expansion
- [ ] UK ETA calculator (2025 preparation)
- [ ] US ESTA compliance tracking
- [ ] Canada eTA integration
- [ ] Multi-passport support for digital nomads
- [ ] Visa requirement checker (non-Schengen)

### 3.2 Business Intelligence
- [ ] Travel pattern analytics for corporate clients
- [ ] Compliance trend reporting
- [ ] Risk assessment dashboards
- [ ] Automated compliance auditing
- [ ] Custom reporting for different business needs

### 3.3 Enterprise Features
```typescript
// Enterprise tier for large organizations
export interface EnterpriseAccount {
  companyName: string;
  employees: Employee[];
  compliancePolicy: CompliancePolicy;
  auditRequirements: AuditRequirement[];
  reportingSchedule: ReportingSchedule;
}

// Features focus on compliance and reporting:
// - Bulk employee compliance tracking
// - Automated audit trail generation
// - Custom compliance policies
// - Advanced reporting and analytics
// - API access for existing systems
```

## 🛠️ Technical Implementation Details

### Database Schema Extensions

```sql
-- Family tracking tables
CREATE TABLE family_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_user_id UUID REFERENCES profiles(id),
  group_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_group_id UUID REFERENCES family_groups(id),
  name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  relationship TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alert system
CREATE TABLE scheduled_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  alert_type TEXT NOT NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  message TEXT NOT NULL,
  channels TEXT[] DEFAULT ARRAY['email'],
  metadata JSONB DEFAULT '{}'
);

-- Booking integration
CREATE TABLE affiliate_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  provider TEXT NOT NULL,
  booking_reference TEXT,
  commission_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Design

```typescript
// REST API endpoints
GET    /api/family/members                 // List family members
POST   /api/family/members                 // Add family member
PUT    /api/family/members/:id             // Update family member
DELETE /api/family/members/:id             // Remove family member

GET    /api/alerts/schedule                // Get scheduled alerts
POST   /api/alerts/schedule                // Schedule new alert
PUT    /api/alerts/preferences             // Update alert preferences

POST   /api/ai/assistant/chat              // AI chat endpoint
GET    /api/optimization/trip/:tripId      // Get trip optimization suggestions

POST   /api/booking/search                 // Search accommodations with compliance
GET    /api/booking/affiliates             // Get affiliate booking history
```

### Performance & Scaling Considerations

- **CDN**: CloudFlare for global performance
- **Database**: Supabase with read replicas for scaling
- **Caching**: Redis for frequently accessed calculations
- **Background Jobs**: For alert scheduling and batch operations
- **Monitoring**: Comprehensive logging and error tracking
- **Testing**: Maintain 100% test coverage for calculation engine

### Mobile-First Development Standards

Every feature MUST include:
- [ ] Mobile-responsive design (320px+ width support)
- [ ] Touch-friendly interactions (44px minimum targets)
- [ ] Offline functionality where applicable
- [ ] Fast loading (<3s on 3G networks)
- [ ] Progressive enhancement
- [ ] Accessibility (WCAG AA compliance)

## 📊 Development Metrics & KPIs

### Technical Metrics
- **Performance**: <50ms calculation time, <200KB bundle size
- **Reliability**: 99.9% uptime, <1% error rate
- **Security**: Zero high/critical vulnerabilities
- **EU Compliance**: 100% test pass rate (NON-NEGOTIABLE)

### User Experience Metrics
- **Conversion Rate**: Free to Premium >5%
- **Feature Adoption**: Family tracking >40% of premium users
- **User Satisfaction**: NPS >50, <2% support tickets
- **Mobile Performance**: <3s load time on mobile devices

### Business Metrics
- **Revenue Growth**: 20%+ month-over-month growth
- **Customer Acquisition Cost**: <£10 per premium user
- **Lifetime Value**: >£50 per premium user
- **Retention Rate**: >70% annual retention

## 🚀 Implementation Priority Matrix

### High Impact, Low Effort (Do First)
1. Google AdSense integration
2. Family tracking MVP
3. Smart overstay alerts
4. Premium tier pricing

### High Impact, High Effort (Plan Carefully)
1. AI travel assistant
2. Mobile app development
3. Booking platform integration
4. Multi-language support

### Low Impact, Low Effort (Fill Gaps)
1. Dark mode
2. Export improvements
3. UI polish
4. Additional payment methods

### Low Impact, High Effort (Avoid)
1. AI travel assistant features
2. Comprehensive travel booking platform
3. Complex travel optimization algorithms
4. Multi-API intelligence systems

---

This roadmap focuses SchengenTracker on core compliance excellence with unique family tracking features, positioned for sustainable B2B expansion while maintaining the excellent technical foundation already in place.