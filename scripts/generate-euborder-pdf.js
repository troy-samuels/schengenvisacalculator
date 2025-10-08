#!/usr/bin/env node

/**
 * EUBORDER.PDF Generator
 * Comprehensive project documentation in PDF format
 *
 * Usage: node scripts/generate-euborder-pdf.js
 */

const fs = require('fs');
const PDFDocument = require('pdfkit');

// Create PDF document
const doc = new PDFDocument({
  size: 'A4',
  margin: 50,
  info: {
    Title: 'EU Border Authority Platform - Technical Documentation',
    Author: 'EU Border Authority Platform Team',
    Subject: 'Comprehensive technical and strategic documentation',
    Keywords: 'EU border, Schengen, EES, ETIAS, travel compliance'
  }
});

// Output path
const outputPath = '/Users/troysamuels/SCHENGEN VISA CALCULATOR/schengenvisacalculator/EUBORDER.PDF';
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// PDF styling constants
const colors = {
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#0ea5e9',
  text: '#1e293b',
  lightGray: '#f1f5f9',
  success: '#10b981'
};

let pageNumber = 1;

// Helper functions
function addPageNumber() {
  doc.fontSize(8)
    .fillColor(colors.secondary)
    .text(
      `Page ${pageNumber}`,
      50,
      doc.page.height - 50,
      { align: 'center', width: doc.page.width - 100 }
    );
  pageNumber++;
}

function addHeader(text, level = 1) {
  const sizes = { 1: 24, 2: 18, 3: 14, 4: 12 };
  const spacing = { 1: 30, 2: 20, 3: 15, 4: 12 };

  doc.moveDown(1);

  if (doc.y > doc.page.height - 150) {
    doc.addPage();
    addPageNumber();
  }

  doc.fontSize(sizes[level])
    .fillColor(level === 1 ? colors.primary : colors.text)
    .font('Helvetica-Bold')
    .text(text);

  if (level === 1) {
    doc.moveTo(50, doc.y + 5)
      .lineTo(doc.page.width - 50, doc.y + 5)
      .stroke(colors.primary);
  }

  doc.moveDown(spacing[level] / 10);
}

function addParagraph(text) {
  if (doc.y > doc.page.height - 100) {
    doc.addPage();
    addPageNumber();
  }

  doc.fontSize(10)
    .fillColor(colors.text)
    .font('Helvetica')
    .text(text, { align: 'justify' });

  doc.moveDown(0.5);
}

function addBullet(text, level = 0) {
  const indent = 60 + (level * 20);

  if (doc.y > doc.page.height - 100) {
    doc.addPage();
    addPageNumber();
  }

  doc.fontSize(10)
    .fillColor(colors.text)
    .font('Helvetica');

  const bulletX = indent - 10;
  const textX = indent;
  const startY = doc.y;

  doc.text('•', bulletX, startY, { continued: false });
  doc.text(text, textX, startY, {
    width: doc.page.width - textX - 50,
    align: 'left'
  });

  doc.moveDown(0.3);
}

function addCode(code) {
  if (doc.y > doc.page.height - 120) {
    doc.addPage();
    addPageNumber();
  }

  const codeX = 60;
  const codeY = doc.y + 5;
  const codeWidth = doc.page.width - 120;

  // Background
  doc.rect(codeX - 10, codeY - 5, codeWidth + 20, code.split('\n').length * 12 + 10)
    .fill(colors.lightGray);

  doc.fontSize(8)
    .fillColor('#334155')
    .font('Courier')
    .text(code, codeX, codeY, {
      width: codeWidth,
      lineGap: 2
    });

  doc.moveDown(1);
}

function addMetric(label, value) {
  if (doc.y > doc.page.height - 100) {
    doc.addPage();
    addPageNumber();
  }

  doc.fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(colors.text)
    .text(`${label}: `, 60, doc.y, { continued: true })
    .font('Helvetica')
    .fillColor(colors.secondary)
    .text(value);

  doc.moveDown(0.4);
}

function addSpacer(size = 1) {
  doc.moveDown(size);
}

// ===========================================
// PDF CONTENT GENERATION
// ===========================================

console.log('Generating EUBORDER.PDF...\n');

// COVER PAGE
doc.fontSize(36)
  .fillColor(colors.primary)
  .font('Helvetica-Bold')
  .text('EU BORDER AUTHORITY', { align: 'center' });

doc.moveDown(0.5);

doc.fontSize(32)
  .fillColor(colors.accent)
  .text('PLATFORM', { align: 'center' });

doc.moveDown(2);

doc.fontSize(16)
  .fillColor(colors.text)
  .font('Helvetica')
  .text('Comprehensive Technical Documentation', { align: 'center' });

doc.moveDown(3);

doc.fontSize(14)
  .fillColor(colors.secondary)
  .text('euborder.com', { align: 'center' });

doc.moveDown(1);

doc.fontSize(12)
  .text('Schengen + EES + ETIAS Compliance Platform', { align: 'center' });

doc.moveDown(8);

doc.fontSize(11)
  .fillColor(colors.text)
  .font('Helvetica-Oblique')
  .text(
    'An integrated Trojan Horse strategy combining proven market methodology with superior technical capabilities to achieve £10M+ market potential through systematic, phased execution.',
    70,
    doc.y,
    { align: 'center', width: doc.page.width - 140 }
  );

doc.moveDown(10);

doc.fontSize(10)
  .font('Helvetica')
  .fillColor(colors.secondary)
  .text(
    `Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}`,
    { align: 'center' }
  );

addPageNumber();

// TABLE OF CONTENTS
doc.addPage();
addPageNumber();

addHeader('TABLE OF CONTENTS', 1);

const tocEntries = [
  '1. Executive Summary',
  '2. Strategic Vision & Business Model',
  '3. Technical Architecture',
  '4. Core Features & Functionality',
  '5. Database Schema & Data Models',
  '6. Development Workflow',
  '7. Mobile-First Design Philosophy',
  '8. Phased Launch Strategy',
  '9. Content & SEO Strategy',
  '10. Deployment & DevOps',
  '11. Appendices'
];

doc.fontSize(12).font('Helvetica');
tocEntries.forEach((entry, index) => {
  doc.moveDown(0.5);
  doc.fillColor(colors.text).text(entry, 70);
});

// 1. EXECUTIVE SUMMARY
doc.addPage();
addPageNumber();

addHeader('1. EXECUTIVE SUMMARY', 1);

addHeader('Project Overview', 2);
addParagraph(
  'The EU Border Authority Platform is a comprehensive travel compliance solution that combines Schengen 90/180-day calculations, EES (Entry/Exit System) preparation, and ETIAS (European Travel Information and Authorization System) guidance into a single, authoritative platform.'
);

addParagraph(
  'Built on an 18-month technical foundation with enterprise-grade architecture, the platform executes a proven Trojan Horse strategy: starting simple, revealing capabilities systematically, and dominating through technical excellence.'
);

addHeader('Mission Statement', 2);
addParagraph(
  'To achieve market domination through systematic execution of proven methodology while leveraging superior technical capabilities and broader market opportunity.'
);

addHeader('Key Differentiators', 2);
addBullet('Performance Excellence: 28.39ms calculation time vs competitors\' 200ms+ (85% faster)');
addBullet('EU Compliance: 99% accuracy rate validated against official EU test cases');
addBullet('Family Tracking: Industry-first 4-member coordination system (UNIQUE competitive advantage)');
addBullet('Mobile PWA: 44px touch targets, offline functionality, iOS-like smoothness');
addBullet('Date Overlap Prevention: Visual conflict detection with strikethrough indicators');
addBullet('Broader Market Scope: EU Border Authority vs competitors\' limited UK-only tools');

addHeader('Market Opportunity', 2);
addMetric('Schengen Keywords', '3,000 monthly searches (current market)');
addMetric('EES Keywords', '50,000+ monthly searches (launching October 2025)');
addMetric('ETIAS Keywords', '40,000+ monthly searches');
addMetric('Total Market', '100,000+ monthly searches vs competitors\' 3,000');
addMetric('Revenue Potential', '£10M+ vs competitors\' £500K (20x advantage)');

// 2. STRATEGIC VISION & BUSINESS MODEL
doc.addPage();
addPageNumber();

addHeader('2. STRATEGIC VISION & BUSINESS MODEL', 1);

addHeader('The Integrated Strategy', 2);
addParagraph(
  'The platform combines the validated Trojan Horse methodology (proven £500K trajectory) with superior technical capabilities to achieve £10M+ market potential. This integration maintains all existing technical advantages while adopting systematic market-tested execution.'
);

addHeader('Three-Phase Trojan Horse Approach', 2);

addHeader('Phase 1: Simple Entry (Months 1-3)', 3);
addMetric('Revenue Target', '£800 MRR (break-even validation)');
addMetric('User Target', '1,500 registered users');
addMetric('Conversion Rate', '3%+ free to lifetime');
addMetric('SEO Target', 'Top 10 for 25+ Schengen keywords');

addSpacer(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Visible Features:', 60);
addBullet('Basic Schengen Calculator: 90/180 rule calculations');
addBullet('Date Overlap Prevention: Visual conflict detection');
addBullet('Mobile Excellence: Responsive design, touch-optimized');
addBullet('Screenshot Export: Simple trip report generation');

addSpacer(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Hidden Features (Phase 1):', 60);
addBullet('Family tracking system (reveal Month 4)');
addBullet('EES preparation hub (reveal Month 5)');
addBullet('ETIAS guidance (reveal Month 6)');
addBullet('Enterprise features (reveal Month 7+)');

doc.addPage();
addPageNumber();

addHeader('Phase 2: Competitive Differentiation (Months 4-6)', 3);
addMetric('Revenue Target', '£2,500 MRR (growth validation)');
addMetric('User Target', '4,000 total users');
addMetric('Family Adoption', '35%+ of premium users');
addMetric('SEO Target', 'Top 5 for 50+ EES keywords');

addSpacer(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Feature Reveals:', 60);
addBullet('Month 4: Family Tracking System (4-member coordination)');
addBullet('Month 5: EES Preparation Hub (50K+ monthly searches)');
addBullet('Month 6: Mobile PWA Excellence showcase');

addHeader('Phase 3: Market Domination (Months 7-12)', 3);
addMetric('Revenue Target', '£8,000 MRR (market leadership)');
addMetric('User Target', '15,000 total users, 6,000 MAU');
addMetric('B2B Pipeline', '25+ enterprise prospects');
addMetric('SEO Target', 'Top 3 for 100+ EU border keywords');

addSpacer(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Full Platform Features:', 60);
addBullet('Complete Schengen + EES + ETIAS integration');
addBullet('Enterprise B2B features and pricing');
addBullet('API monetization leveraging superior accuracy');
addBullet('Market position as THE EU border compliance platform');

addHeader('Monetization Model', 2);

addHeader('Subscription Tiers', 3);
addParagraph('FREE Tier: Basic calculator, 5 trip limit, date overlap prevention, screenshot export');
addSpacer(0.3);
addParagraph('LIFETIME Tier (£4.99 one-time): Unlimited trips, email alerts, PDF reports, ad-free, family tracking (4 members), EES preparation access');
addSpacer(0.3);
addParagraph('ANNUAL Tier (£2.99/year): All lifetime features + SMS alerts, priority support, ETIAS guidance, enterprise preview');

addHeader('Revenue Projections', 3);
addMetric('Month 3 (Phase 1)', '£800 MRR - Break-even validation');
addMetric('Month 6 (Phase 2)', '£2,500 MRR - Growth validation');
addMetric('Month 12 (Phase 3)', '£8,000 MRR - Market leadership');
addSpacer(0.5);
addMetric('Consumer Premium', '£4,000 MRR (mature segment)');
addMetric('B2B Enterprise', '£3,000 MRR (expansion)');
addMetric('API Licensing', '£1,000 MRR (technical advantage)');

// 3. TECHNICAL ARCHITECTURE
doc.addPage();
addPageNumber();

addHeader('3. TECHNICAL ARCHITECTURE', 1);

addHeader('Monorepo Structure', 2);
addParagraph(
  'The platform is built as a Turborepo-based monorepo with four main packages, enabling code sharing, consistent tooling, and efficient build orchestration.'
);

addCode(`schengen-calculator-v2/
├── packages/
│   ├── app/          # Next.js 15 main application
│   ├── calculator/   # Core calculation engine
│   ├── ui/           # Shared UI components (shadcn/ui)
│   └── payments/     # Stripe integration
├── turbo.json        # Monorepo build configuration
└── package.json      # Root workspace configuration`);

addHeader('Technology Stack', 2);

addHeader('Frontend', 3);
addBullet('Next.js 15: App Router, Server Components, Server Actions');
addBullet('React 18.3: Modern hooks, concurrent rendering');
addBullet('TypeScript 5.7: Full type safety across all packages');
addBullet('Tailwind CSS 3.4: Utility-first styling with custom theme');
addBullet('shadcn/ui: High-quality Radix UI components');
addBullet('Framer Motion: Smooth animations and transitions');

addHeader('Backend & Infrastructure', 3);
addBullet('Next.js API Routes: RESTful endpoints with TypeScript');
addBullet('Supabase: PostgreSQL database + Row Level Security');
addBullet('Supabase Auth: JWT-based authentication with social providers');
addBullet('Stripe: Payment processing with webhooks');
addBullet('SendGrid: Email notifications and alerts');

addHeader('State Management & Data', 3);
addBullet('Zustand: Lightweight state management');
addBullet('React Hook Form: Performant form handling');
addBullet('Zod: Runtime schema validation');
addBullet('date-fns: Date manipulation and calculations');

doc.addPage();
addPageNumber();

addHeader('Performance Architecture', 2);

addHeader('Calculation Engine', 3);
addParagraph(
  'The RobustSchengenCalculator class implements exact 180-day rolling window algorithm with daily compliance checks. Built for performance and accuracy.'
);

addMetric('Average Calculation Time', '28.39ms (85% faster than competitors)');
addMetric('EU Compliance Rate', '99% (validated against official test cases)');
addMetric('Bundle Size', '<200KB (target optimization)');
addMetric('Lighthouse Score', '>95 (mobile performance)');

addSpacer(0.5);
doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Key Calculation Features:', 60);
addBullet('Rolling Window Algorithm: Checks compliance for EVERY day');
addBullet('Edge Case Handling: Leap years, timezone transitions');
addBullet('Entry/Exit Day Counting: Both days count as stay days');
addBullet('Real-time Validation: Instant feedback on compliance');
addBullet('Future Trip Planning: Smart recommendations for optimal dates');

addHeader('Security Architecture', 3);
addBullet('Zero Vulnerabilities: Regular security audits');
addBullet('Row Level Security: Supabase RLS policies on all tables');
addBullet('JWT Authentication: Secure token-based authentication');
addBullet('Rate Limiting: Tier-based API rate limiting');
addBullet('Encryption: AES-256 for sensitive data at rest');

// 4. CORE FEATURES
doc.addPage();
addPageNumber();

addHeader('4. CORE FEATURES & FUNCTIONALITY', 1);

addHeader('1. Schengen Calculator Engine', 2);
addParagraph(
  'The core feature implementing EU\'s 90/180-day rule with mathematical precision. Calculates compliance for any 180-day rolling window using exact day-by-day analysis.'
);

addHeader('Key Capabilities', 3);
addBullet('90/180 Rule Compliance: Track days in Schengen area');
addBullet('Multi-Trip Management: Unlimited trips with auto sorting');
addBullet('Real-time Calculation: Instant compliance updates');
addBullet('Visual Timeline: Graphical trip representation');
addBullet('PDF Reports: Official compliance reports');

addHeader('Calculation Algorithm', 3);
addCode(`class RobustSchengenCalculator {
  static readonly MAX_DAYS_IN_PERIOD = 90
  static readonly ROLLING_PERIOD_DAYS = 180

  static calculateExactCompliance(
    trips: Trip[],
    referenceDate: Date
  ): ComplianceResult {
    // 1. Validate and normalize inputs
    // 2. Create daily stay map
    // 3. Calculate rolling compliance
    // 4. Find maximum violation
    // 5. Generate detailed breakdown
  }
}`);

addHeader('2. Date Overlap Prevention System', 2);
addParagraph(
  'Critical feature preventing double-booking and date conflicts across trips with visual indicators and real-time validation.'
);

addHeader('Visual Implementation', 3);
addBullet('Occupied Dates: Grey background, strikethrough, disabled');
addBullet('Available Dates: Hover effects, click handlers');
addBullet('Selected Dates: Primary color highlighting');
addBullet('Conflict Dates: Red background, warning indicators');

doc.addPage();
addPageNumber();

addHeader('3. Family Tracking System (UNIQUE)', 2);
addParagraph(
  'Industry-first feature enabling coordinated compliance tracking for up to 4 family members. Solves the critical problem of family travel planning.'
);

addHeader('Core Capabilities', 3);
addBullet('4-Member Tracking: Self + spouse + 2 children/parents');
addBullet('Individual Compliance: Separate calculations per member');
addBullet('Shared Trip Coordination: Link trips when traveling together');
addBullet('Family Dashboard: See all members\' status at a glance');
addBullet('Coordinated Alerts: Notify entire family of deadlines');

addHeader('Competitive Advantage', 3);
addParagraph(
  'This feature is unique in the market. Competitors focus on individual travelers only. Our family-first approach addresses a real pain point: coordinating travel plans for families.'
);

addHeader('4. EES Preparation Hub', 2);
addParagraph(
  'Comprehensive guidance for the new EU Entry/Exit System launching October 2025. First-mover advantage in 50,000+ monthly search market.'
);

addHeader('Key Content', 3);
addBullet('Biometric Requirements: What data is collected');
addBullet('Registration Process: Step-by-step enrollment');
addBullet('Border Procedures: What to expect at EU borders');
addBullet('Family Preparation: Requirements for children and groups');
addBullet('Country-Specific Rules: 27 EU member state implementations');

addHeader('Product: EES Readiness Guide', 3);
addParagraph('Premium downloadable PDF guide priced at £7.99');
addBullet('Comprehensive 40+ page guide');
addBullet('Country-by-country breakdown');
addBullet('Timeline and deadlines');
addBullet('Required documentation checklist');

// 5. DATABASE SCHEMA
doc.addPage();
addPageNumber();

addHeader('5. DATABASE SCHEMA & DATA MODELS', 1);

addHeader('Supabase PostgreSQL Structure', 2);
addParagraph(
  'The database is designed with Row Level Security (RLS) policies ensuring users can only access their own data.'
);

addCode(`-- profiles
id: uuid (PK, foreign key to auth.users)
email: text
full_name: text
subscription_tier: enum ('free', 'lifetime', 'annual')
subscription_status: enum ('active', 'cancelled')
created_at: timestamp

-- subscriptions
id: uuid (PK)
user_id: uuid (FK to profiles)
stripe_customer_id: text
tier: enum ('lifetime', 'annual')
status: enum ('active', 'cancelled', 'expired')

-- visa_entries (trips)
id: uuid (PK)
user_id: uuid (FK to profiles)
country_code: text
start_date: date
end_date: date
days: integer

-- family_members
id: uuid (PK)
user_id: uuid (FK to profiles, owner)
name: text
relationship: enum ('self', 'spouse', 'child')
nationality: text`);

// 6. DEVELOPMENT WORKFLOW
doc.addPage();
addPageNumber();

addHeader('6. DEVELOPMENT WORKFLOW', 1);

addHeader('Installation', 2);
addCode(`# Clone repository
git clone <repository-url>
cd schengenvisacalculator

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Start development
npm run dev`);

addHeader('Testing Commands', 2);
addCode(`# Fast tests
npm test
npm run test:fast

# Comprehensive testing
npm run test:full
npm run test:eu-compliance  # 100% pass required
npm run test:date-overlap
npm run test:performance

# Validation
npm run validate
npm run quality-check
npm run benchmark`);

addHeader('Testing Standards', 2);
addParagraph('EU compliance tests MUST pass at 100%. These validate calculations against official EU test cases.');

addMetric('Calculation Time', '< 50ms (target: 28.39ms)');
addMetric('Bundle Size', '< 200KB');
addMetric('Lighthouse Mobile', '> 95 score');

// 7. MOBILE-FIRST DESIGN
doc.addPage();
addPageNumber();

addHeader('7. MOBILE-FIRST DESIGN PHILOSOPHY', 1);

addHeader('Core Principles', 2);
addParagraph(
  'Every feature MUST work flawlessly on mobile before desktop implementation. Mobile is the primary target platform.'
);

addHeader('Touch Target Requirements', 3);
addBullet('Minimum 44px touch targets (Apple HIG standard)');
addBullet('Generous spacing between elements (minimum 8px)');
addBullet('Large, tappable buttons with visual feedback');
addBullet('Swipe gestures for natural navigation');

addHeader('Performance Targets', 3);
addMetric('Bundle Size', '< 200KB (mobile networks)');
addMetric('First Contentful Paint', '< 1.5s on 3G');
addMetric('Time to Interactive', '< 3.0s on 3G');
addMetric('Lighthouse Mobile', '> 95 score');

addHeader('Progressive Web App (PWA)', 2);
addParagraph('The platform is configured as a PWA enabling app-like experiences.');

addBullet('Offline Functionality: Core calculator works without internet');
addBullet('Install Prompt: Add to home screen capability');
addBullet('Service Worker: Background sync and caching');
addBullet('Push Notifications: Alert users of compliance deadlines');

// 8. PHASED LAUNCH STRATEGY
doc.addPage();
addPageNumber();

addHeader('8. PHASED LAUNCH STRATEGY', 1);

addHeader('The Trojan Horse Methodology', 2);
addParagraph(
  'Start simple, reveal capabilities systematically, dominate through excellence.'
);

addHeader('Phase Timeline', 2);

doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Phase 1 (Months 1-3): Simple Entry', 60);
addMetric('Target', '£800 MRR, 1,500 users');
addMetric('Focus', 'Best Schengen Calculator positioning');
addMetric('Features', 'Basic calculator + date overlap prevention');

addSpacer(0.5);

doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Phase 2 (Months 4-6): Differentiation', 60);
addMetric('Target', '£2,500 MRR, 4,000 users');
addMetric('Reveals', 'Family tracking, EES hub, Mobile PWA');
addMetric('Content', '40+ EES-focused articles');

addSpacer(0.5);

doc.fontSize(10).font('Helvetica-Bold').fillColor(colors.text).text('Phase 3 (Months 7-12): Domination', 60);
addMetric('Target', '£8,000 MRR, 15,000 users');
addMetric('Platform', 'Full Schengen + EES + ETIAS integration');
addMetric('Expansion', 'B2B enterprise, API monetization');

// 9. CONTENT & SEO
doc.addPage();
addPageNumber();

addHeader('9. CONTENT & SEO STRATEGY', 1);

addHeader('Content Hub Structure', 2);
addCode(`euborder.com/
├── /                     # Homepage
├── /schengen-calculator  # Core tool
├── /ees/                 # EES hub (50K+ searches)
│   ├── /preparation
│   ├── /guide
│   └── /vs-etias
├── /etias/               # ETIAS hub
├── /blog/                # Educational content
└── /countries/*          # 27 EU states`);

addHeader('SEO Implementation', 2);
addBullet('Sitemap.xml: Auto-generated, submitted to Google');
addBullet('Robots.txt: Optimized crawling directives');
addBullet('Schema.org Markup: FAQPage, HowTo schemas');
addBullet('Open Graph: Social sharing optimization');

addHeader('Content Strategy', 2);
addMetric('Phase 1', '25 Schengen authority articles');
addMetric('Phase 2', '40 EES system articles');
addMetric('Phase 3', '35 ETIAS articles');
addMetric('Current Status', '20 SEO-optimized posts published');

// 10. DEPLOYMENT
doc.addPage();
addPageNumber();

addHeader('10. DEPLOYMENT & DEVOPS', 1);

addHeader('Deployment Architecture', 2);
addBullet('Vercel: Edge network, automatic deployments');
addBullet('Supabase: Managed PostgreSQL + Auth');
addBullet('Stripe: Payment processing');
addBullet('CI/CD: GitHub Actions + Turbo');

addHeader('Monitoring', 2);
addBullet('Vercel Analytics: Performance metrics');
addBullet('PostHog: Product analytics');
addBullet('Google Analytics: Traffic analysis');

addMetric('Uptime Target', '99.9% availability');
addMetric('Response Time', '<200ms average (TTFB)');
addMetric('Error Rate', '<0.1% of requests');

// 11. APPENDICES
doc.addPage();
addPageNumber();

addHeader('11. APPENDICES', 1);

addHeader('Key File Locations', 2);

addCode(`packages/calculator/src/
├── calculator/
│   └── robust-schengen-calculator.ts
├── validators/
│   └── date-overlap-validator.ts
└── __tests__/

packages/ui/src/
├── components/
│   ├── ui/
│   ├── schengen-calendar.tsx
│   └── family-tracker.tsx
└── hooks/

packages/app/src/
├── app/
│   ├── calculator/
│   ├── ees/
│   └── api/
└── lib/`);

addHeader('Contact & Resources', 2);
addMetric('Domain', 'euborder.com');
addMetric('Email', 'info@euborder.com');
addMetric('Frontend', 'Next.js 15, React 18, TypeScript 5.7');
addMetric('Backend', 'Supabase, Stripe, SendGrid');
addMetric('Deployment', 'Vercel Edge Network');

// FINAL SUMMARY PAGE
doc.addPage();
addPageNumber();

addSpacer(3);

doc.fontSize(20)
  .font('Helvetica-Bold')
  .fillColor(colors.primary)
  .text('PROJECT SUMMARY', { align: 'center' });

addSpacer(2);

doc.fontSize(11)
  .font('Helvetica')
  .fillColor(colors.text)
  .text(
    'The EU Border Authority Platform represents the successful integration of proven Trojan Horse methodology with superior technical capabilities.',
    { align: 'justify' }
  );

addSpacer(1);

doc.text('By starting simple and revealing capabilities systematically, we achieve:', { align: 'justify' });

addSpacer(0.5);

addBullet('85% faster calculations than competitors (28.39ms)');
addBullet('Industry-first family tracking system (4 members)');
addBullet('99% EU compliance rate validated by official tests');
addBullet('10x larger market opportunity (100K+ vs 3K searches)');
addBullet('£10M+ revenue potential vs competitors\' £500K');

addSpacer(1);

doc.fontSize(11)
  .font('Helvetica')
  .fillColor(colors.text)
  .text(
    'Through disciplined three-phase execution and technical excellence, we establish euborder.com as THE authoritative platform for EU border compliance: Schengen + EES + ETIAS.',
    { align: 'justify' }
  );

addSpacer(1);

doc.text('This is not just a calculator—it\'s the future of EU travel compliance.', { align: 'justify' });

addSpacer(3);

doc.fontSize(12)
  .font('Helvetica-Oblique')
  .fillColor(colors.accent)
  .text('Start simple. Execute systematically. Dominate through excellence.', { align: 'center' });

// Finalize PDF
doc.end();

// Wait for stream to finish
stream.on('finish', () => {
  const stats = fs.statSync(outputPath);
  console.log(`✅ PDF generated successfully!`);
  console.log(`📄 File: ${outputPath}`);
  console.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`📑 Total pages: ${pageNumber - 1}`);
  console.log('\nYou can now open EUBORDER.PDF to view the documentation.\n');
});

stream.on('error', (err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
