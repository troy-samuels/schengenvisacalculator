# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev           # Start development server
npm run build         # Build for production  
npm run start         # Start production server
npm run lint          # Run ESLint
```

### Testing
```bash
npm test              # Run fast test suite
npm run test:full     # Complete test suite with performance tests
npm run test:eu       # EU compliance tests only
npm run test:edge     # Edge case tests only
npm run validate      # Run all validation tests
npm run benchmark     # Performance benchmarking
```

### Testing & Quality Assurance
```bash
npm run test:coverage   # Run tests with coverage report
npm run test:e2e       # End-to-end testing with Playwright
npm run test:mobile    # Mobile-specific testing
npm run test:security  # Security vulnerability scanning
npm run lighthouse     # Performance and accessibility audit
```

## Architecture Overview

This is a **Next.js** application for calculating Schengen visa compliance using the 90/180-day rule, architected as a scalable travel platform. The application includes:

### Core Architecture
- **Frontend**: Next.js App Router with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes, Supabase (PostgreSQL + Auth)
- **Authentication**: Supabase Auth with Google OAuth
- **PWA**: Configured with service worker and offline functionality

### Key Components & Services

#### Schengen Calculator Core (`lib/services/`)
- **`robust-schengen-calculator.ts`**: Main calculation engine implementing exact 90/180-day rule
- **`enhanced-schengen-calculator.ts`**: Enhanced calculator with additional features
- **`trip-conflict-detector.ts`**: Detects overlapping or conflicting trips
- **`trip-optimizer.ts`**: Optimizes travel planning within visa constraints

#### Database Schema (`lib/types/database.ts`)
- **`profiles`**: User profile information and preferences
- **`countries`**: Schengen area country data with flags
- **`visa_entries`**: Individual travel entries and dates
- **`trip_collections`**: Grouped trips for better organization

#### Custom Hooks (`lib/hooks/`)
- **`useSchengenCalculator.ts`**: Basic calculator hook
- **`useEnhancedSchengenCalculator.ts`**: Enhanced calculator with trip management
- **`useTripConflicts.ts`**: Trip conflict detection
- **`useTripExport.ts`**: Export functionality

#### UI Components (`components/`)
- Calculator components with mobile optimization
- Trip management and timeline components
- PWA components (offline status, install prompt)
- Dashboard and sync components

### Travel Platform Architecture
The application is designed for expansion into a comprehensive travel platform with:

- **API-First Design**: Versioned REST APIs (`/api/v1/`) for multi-platform support
- **Microservices Ready**: Calculator logic can be separated into independent services
- **Multi-Platform Support**: Shared business logic for web and mobile applications
- **Feature Flag System**: Progressive rollout and A/B testing capabilities

## Development Guidelines

### Testing Requirements
- Always run tests before committing: `npm run validate`
- EU compliance tests must pass 100%
- Performance benchmarks must meet thresholds (< 50ms for calculations)

### Calculator Development
- The `RobustSchengenCalculator` class is the source of truth for all calculations
- Always validate against EU official test cases (KOM series)
- Handle edge cases: leap years, timezone transitions, boundary conditions
- Maintain backward compatibility with existing trip data

### Database Operations
- Use Supabase client from `lib/supabase/client.ts` for browser-side operations
- Use server client from `lib/supabase/server.ts` for API routes
- Follow Row Level Security (RLS) policies for data access

### Component Development
- Use shadcn/ui components for consistency
- Follow mobile-first responsive design
- Implement proper loading states and error handling
- Use TypeScript interfaces from `lib/types/`

### Mobile Development Standards
- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Responsive Design**: Mobile-first approach with breakpoints at 640px, 768px, 1024px
- **Performance**: Target <50ms for calculations, <200KB initial bundle size
- **PWA Requirements**: Offline functionality, service worker, app manifest
- **Accessibility**: WCAG AA compliance, screen reader support, keyboard navigation

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

# Platform Features (Optional)
FEATURE_FLAGS_API_KEY=your_feature_flags_key
ANALYTICS_API_KEY=your_analytics_key
ERROR_TRACKING_DSN=your_sentry_dsn
```

## Important Files & Directories

### Calculator Core
- `lib/services/robust-schengen-calculator.ts` - Main calculation engine
- `lib/services/__tests__/` - Comprehensive test suites
- `test-*.mjs` - Integration and compliance test runners

### Configuration
- `next.config.mjs` - Next.js config with PWA settings
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - shadcn/ui component configuration

### Documentation
- `REFACTOR_TASKS.md` - Complete refactoring task list and timeline
- `TESTING.md` - Comprehensive testing guide
- `DEPLOYMENT.md` - Production deployment guide

### Database
- `scripts/setup-database-fixed.sql` - Main database setup
- `lib/types/database.ts` - TypeScript database types

## Testing Strategy

The application has extensive automated testing:

1. **EU Compliance Tests**: Validate against official European Commission test cases
2. **Edge Case Tests**: Handle leap years, timezones, boundary conditions  
3. **Performance Tests**: Ensure calculations complete within acceptable time limits
4. **Integration Tests**: Verify end-to-end functionality

Always run the full test suite before making changes to calculator logic:
```bash
npm run validate
```

## PWA Features

The application is configured as a Progressive Web App with:
- Service worker for offline functionality
- App manifest for installation
- Offline status indicator
- Background sync capabilities
- Mobile install prompts

## Refactoring Guidelines

### Current Refactoring Status
See `REFACTOR_TASKS.md` for complete task list and progress tracking. The refactor is organized into 11 phases:

1. **Pre-Flight Checks**: Baseline documentation and backup
2. **Foundation Stabilization**: Fix dependencies and build issues
3. **Core Consolidation**: Merge components and fix tests  
4. **Progressive Enhancement**: Performance and mobile optimization
5. **Integration Testing**: E2E tests and monitoring
6. **Platform Features**: Feature flags and scaling preparation
7. **API Gateway & Microservices**: Service architecture foundation
8. **External Integration Layer**: Booking and travel APIs
9. **Revenue Infrastructure**: Tracking and monetization
10. **Caching & Performance**: Multi-layer optimization
11. **Platform Features**: Booking platform and analytics

### Refactoring Principles
- **Test-Driven**: Never proceed without passing tests
- **Incremental**: Small changes with frequent commits
- **Documented**: Track all changes and decisions
- **Reversible**: Each change can be rolled back
- **Performance-Aware**: Monitor impact on bundle size and load times

### Critical Requirements (NON-NEGOTIABLE)
- **EU compliance tests must always pass 100%** - This is the single most important requirement
- **Performance benchmarks must be maintained (<50ms calculations, <200KB bundle)**
- **Mobile-first design principles must be preserved**
- **Accessibility standards must be maintained (WCAG AA)**
- **PWA functionality must remain operational**
- **RobustSchengenCalculator remains single source of truth**

### Mandatory Checkpoint Validations
Run these commands at EVERY checkpoint before proceeding:

```bash
# Critical validation suite
npm run test:eu          # Must be 100% pass rate (non-negotiable)
npm run validate         # Complete validation suite
npm run lighthouse       # WCAG AA compliance verification
npm run benchmark        # <50ms calculation performance check
npm run build            # Verify <200KB initial bundle size
```

### Component Consolidation Rules
**Keep These Components** (as specified in REFACTOR_TASKS.md):
- `mobile-optimized-calculator-fixed.tsx` (delete the non-fixed version)
- `RobustSchengenCalculator` class (single source of truth)
- All shadcn/ui components (maintain consistency)

**Database Standards** (must be followed):
- Browser operations: `lib/supabase/client.ts`
- API routes: `lib/supabase/server.ts`
- Always follow Row Level Security (RLS) policies
- Maintain backward compatibility with existing trip data

### Architecture Preservation Requirements
- **API-First Design**: All new endpoints use `/api/v1/` versioning
- **Mobile-First**: Responsive breakpoints at 640px, 768px, 1024px
- **PWA Standards**: Service worker, offline functionality, app manifest
- **Touch Targets**: Minimum 44x44px for all interactive elements

## Platform Scaling Architecture

### Monorepo Structure (Future)
```
packages/
├── shared-types/          # TypeScript interfaces
├── calculator-engine/     # Core calculation logic
├── api-client/           # API client library
├── ui-components/        # Shared component library
├── web-app/             # Next.js web application
└── mobile-app/          # React Native mobile app
```

### API Architecture
- **REST APIs**: Version all endpoints (`/api/v1/`)
- **GraphQL Layer**: Optional for complex queries
- **Microservices**: Calculator, trips, users, notifications
- **Authentication**: JWT with Supabase Auth
- **Rate Limiting**: Protect against abuse

### Mobile App Strategy
- **React Native**: Shared codebase with web
- **Expo**: Managed workflow for easier development
- **Code Sharing**: 70%+ shared business logic
- **Platform-Specific**: Native UI patterns per platform

## Deployment Notes

- Optimized for Vercel deployment (recommended)
- GitHub Actions workflow for automated testing and deployment
- Feature flag system for progressive rollouts
- Error tracking with Sentry
- Performance monitoring with Web Vitals
- Environment variables must be configured in hosting platform
- Database migrations required for fresh deployments

## Development Workflow

### Before Starting Work
1. Check `REFACTOR_TASKS.md` for current phase
2. Run all tests to establish baseline
3. Create feature branch from main
4. Follow task order to avoid conflicts

### During Development
1. Make small, testable changes
2. Run tests after each change
3. Commit frequently with descriptive messages
4. Monitor performance impact
5. Update task list progress

### Before Merging
1. All tests must pass (100% EU compliance required)
2. Performance benchmarks must be met
3. Code coverage should increase or maintain
4. Accessibility audit should pass
5. Mobile testing on real devices

### Refactor Execution Order (CRITICAL)
When working on refactor tasks, follow this exact order to prevent cascading failures:

1. **Phase 0 (Day 0)**: ALWAYS establish baseline before ANY changes
2. **Dependencies First**: Fix package.json and build issues before code changes
3. **Tests Before Features**: Repair test infrastructure before adding new functionality
4. **Core Before Enhancement**: Stabilize existing code before optimizations
5. **One Phase at a Time**: Never skip phases or work on multiple phases simultaneously

### Emergency Procedures
- **Rollback Triggers**: EU compliance failure, >20% bundle increase, >10% performance degradation
- **Immediate Rollback**: Revert to last known good state if any critical requirement fails
- **Hotfix Protocol**: Fast-track critical fixes with mandatory test validation
- **Feature Flags**: Disable problematic features instantly during platform phases
- **Communication**: Document all rollbacks and emergency procedures for team awareness

### Refactor Phase Dependencies
- **Phases 1-6**: Core application refactoring (required foundation)
- **Phases 7-11**: Platform expansion (optional, can be deferred)
- **Never proceed to platform phases if core phases have unresolved issues**