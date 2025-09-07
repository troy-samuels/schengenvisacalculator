# Schengen Visa Calculator - Technical Overview

A modern, responsive web application for calculating Schengen visa compliance using the 90/180-day rule. Built with Next.js and TypeScript in a monorepo architecture with enterprise-grade tooling.

## Architecture Overview

### Monorepo Structure
```
├── packages/
│   ├── app/           # Main Next.js application
│   ├── calculator/    # Core calculation engine
│   ├── ui/           # Reusable UI components
│   └── payments/     # Payment processing utilities
├── public/           # Static assets
├── scripts/          # Build and deployment scripts
└── turbo.json        # Monorepo configuration
```

## Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with modern features
- **TypeScript 5.7** - Type-safe JavaScript
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Build System
- **Turbo** - High-performance build system for monorepos
- **Rollup** - Module bundler for package builds
- **SWC** - Fast TypeScript/JavaScript compiler
- **PostCSS** - CSS processor with autoprefixer

### UI Components
- **Radix UI** - Headless, accessible UI primitives
- **shadcn/ui** - Re-usable components built on Radix UI
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Date & Time
- **date-fns** - Modern JavaScript date utility library
- **React Day Picker** - Flexible date picker component

### Testing
- **Jest** - JavaScript testing framework with SWC
- **@testing-library/react** - Simple and complete testing utilities
- **Playwright** - End-to-end testing framework

### Development Tools
- **ESLint** - JavaScript linter with TypeScript support
- **Prettier** - Code formatter
- **Husky** - Git hooks for code quality

## Package Details

### 1. Core Calculator (`@schengen/calculator`)

The heart of the application - implements the EU Schengen 90/180-day rule with precision.

**Key Components:**
- `RobustSchengenCalculator` - Main calculation engine
- `DateOverlapValidator` - Prevents conflicting travel dates
- EU compliance test suites for validation

**Dependencies:**
- `date-fns` - Date manipulation and calculations
- `zod` - Runtime type validation

**Features:**
- Rolling 180-day window calculations
- Leap year handling
- Timezone-aware date processing
- Edge case validation
- Performance optimizations

### 2. UI Components (`@schengen/ui`)

Comprehensive component library built on modern design systems.

**Key Components:**
- `CalendarModal` - Interactive date range picker
- `ProgressCircle` - Animated compliance indicator
- `Header` - Application navigation
- `DateOverlapPrevention` - Visual date conflict indicators
- `MobileCalendarDrawer` - Touch-optimized mobile calendar

**Dependencies:**
- **Radix UI Primitives** - 20+ accessible component primitives
- `class-variance-authority` - Component variant management  
- `tailwind-merge` - Tailwind class conflict resolution
- `react-day-picker` - Calendar functionality
- `embla-carousel-react` - Touch-friendly carousels

**Design System:**
- Mobile-first responsive design (44px minimum touch targets)
- Consistent color palette and typography
- Smooth animations with reduced-motion support
- Accessibility-first approach (WCAG AA compliant)

### 3. Main Application (`@schengen/app`)

Next.js application providing the user interface and business logic.

**Key Features:**
- Progressive Web App (PWA) configuration
- Server-side rendering with App Router
- Responsive design for all screen sizes
- Real-time calculation updates
- User authentication integration
- Data persistence with Supabase

**Dependencies:**
- `@supabase/ssr` - Server-side Supabase integration
- `@supabase/supabase-js` - Supabase client library
- `react-hook-form` - Form state management
- `zustand` - Lightweight state management
- `next-themes` - Dark/light mode support
- `sonner` - Toast notifications

### 4. Payment Processing (`@schengen/payments`)

Stripe integration for handling transactions and user management.

**Dependencies:**
- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe integration

## Core Features

### 1. Schengen Compliance Calculator

**90/180-Day Rule Implementation:**
- Calculates exact compliance using rolling 180-day windows
- Processes multiple overlapping trips
- Handles edge cases (leap years, timezone boundaries)
- Real-time validation with visual feedback

**Performance Optimizations:**
- Optimized date key formatting (replaces expensive `.toISOString().split()`)
- Efficient memory management for large date ranges
- Batched calculations for multiple trips
- Cached compliance results

### 2. Date Overlap Prevention

**Visual Indicators:**
- Occupied dates shown with strikethrough and grey styling
- Hover tooltips showing conflicting trip information
- Real-time conflict detection during date selection
- Mobile-optimized touch interactions

**Validation Logic:**
```typescript
// Prevents users from selecting conflicting dates
const validation = DateOverlapValidator.validateDateRange(
  newRange, 
  existingTrips, 
  excludeCurrentTrip
);
```

### 3. Responsive Design

**Mobile-First Approach:**
- 44px minimum touch targets for accessibility
- Progressive disclosure of complex information
- Touch-optimized calendar interfaces
- Responsive grid layouts at 640px, 768px, 1024px breakpoints

**Desktop Enhancements:**
- Multi-column layout for efficient data entry
- Keyboard navigation support
- Hover states and detailed tooltips

### 4. Progressive Web App

**PWA Features:**
- Service worker for offline functionality
- App manifest for installation
- Fast loading with Next.js optimization
- Background sync capabilities

## Development Workflow

### Getting Started
```bash
npm install           # Install dependencies
npm run dev          # Start development servers
npm run build        # Build all packages
npm test             # Run test suites
```

### Testing Strategy
```bash
npm run test:unit            # Unit tests with coverage
npm run test:eu-compliance   # EU regulation compliance tests
npm run test:date-overlap    # Date conflict prevention tests
npm run test:e2e            # End-to-end browser tests
npm run test:performance    # Performance benchmarking
```

### Code Quality
```bash
npm run lint         # ESLint with TypeScript rules
npm run typecheck    # TypeScript compilation check
npm run format       # Prettier code formatting
```

## Performance Characteristics

### Calculation Engine
- **<50ms** calculation time for complex trip scenarios
- **<200KB** bundle size for calculator package
- Optimized for mobile device performance
- Memory-efficient date processing

### User Interface
- **Core Web Vitals** optimized (LCP, FID, CLS)
- Smooth 60fps animations with hardware acceleration
- Efficient re-rendering with React optimization patterns
- Progressive loading of non-critical resources

## Security Features

### Data Validation
- Runtime type checking with Zod schemas
- Input sanitization for all user data
- SQL injection prevention with parameterized queries
- XSS protection through React's built-in sanitization

### Authentication
- Secure OAuth integration with Supabase Auth
- JWT token management
- Row-level security (RLS) in database
- CSRF protection

## Browser Support

### Supported Browsers
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced UX with modern browser features
- Graceful degradation for older browsers

## Deployment

### Build Process
```bash
turbo build          # Build all packages in dependency order
npm run typecheck    # Validate TypeScript across packages
npm test             # Run full test suite
```

### Vercel Integration
- Automatic deployments from Git
- Edge function support
- Global CDN distribution
- Automatic HTTPS and performance monitoring

### Environment Configuration
```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

## File Organization

### Application Structure
```
packages/app/src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and fonts
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── api/               # API routes
├── lib/                   # Shared utilities
│   ├── supabase/          # Database client configuration
│   └── types/             # TypeScript type definitions
└── components/            # App-specific components
```

### Component Architecture
```
packages/ui/src/
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── validators/           # Data validation utilities
└── types/                # TypeScript interfaces
```

### Calculator Engine
```
packages/calculator/src/
├── calculator/           # Core calculation logic
├── validators/           # Input validation
├── data/                # Reference data (countries, etc.)
└── __tests__/           # Comprehensive test suites
```

## Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Run tests: `npm test`

### Code Standards
- TypeScript strict mode enabled
- ESLint with React and accessibility rules
- Prettier for consistent formatting
- Jest for testing with high coverage requirements
- Conventional commits for clear history

### Performance Guidelines
- Bundle size monitoring with webpack-bundle-analyzer
- Core Web Vitals tracking
- Mobile-first development approach
- Accessibility testing with axe-core

This technical overview provides a comprehensive understanding of the Schengen Visa Calculator's architecture, components, and development practices, enabling developers to effectively contribute to and maintain the codebase.