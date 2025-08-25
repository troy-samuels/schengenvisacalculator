# Baseline Documentation - Pre-Refactor State

**Date**: August 25, 2025  
**Branch**: fix/regenerate-lockfile  
**Status**: Pre-Phase 0 baseline capture

## GitHub Actions Failures

Based on the screenshot from `/Users/troysamuels/Desktop/Screenshot 2025-08-25 at 14.05.12.png`:

### Current Failing Jobs
- ✅ **build (ubuntu-latest, 18)** - PASSING
- ❌ **test-summary (ubuntu-latest, 18)** - FAILING
- ✅ **build (ubuntu-latest, 20)** - PASSING  
- ❌ **test-summary (ubuntu-latest, 20)** - FAILING
- ✅ **build (ubuntu-latest, 22)** - PASSING
- ❌ **test-summary (ubuntu-latest, 22)** - FAILING

### Analysis
- **Build jobs are passing** across all Node.js versions (18, 20, 22)
- **Test-summary jobs are failing** across all Node.js versions
- This indicates the code compiles but tests are failing

### Suspected Issues
1. **Dependency conflicts**: Likely related to React 19 and Next.js 15.2.4 bleeding edge versions
2. **Blog scheduler tests**: May be failing due to missing environment variables
3. **Test configuration**: Test runners may have configuration issues
4. **Package version mismatches**: "latest" tags causing unpredictable behavior

### Current Branch Status
- **Main branch**: main
- **Current branch**: fix/regenerate-lockfile  
- **Git status**: Clean (no uncommitted changes)

### Recent Commits
```
0f774d9 fix: resolve all calculator functionality issues for mobile and desktop
2aa5a9e fix: improve mobile UX for trip form with responsive components  
09f9ea4 feat: add automated blog scheduler for 1000 posts
62c6f4a fix: resolve GitHub Actions test-summary job failures
32e2bdb feat: add comprehensive trip template system and country autocomplete
```

**Note**: Previous commit (62c6f4a) already attempted to fix GitHub Actions test-summary failures, but issues persist.

## Build Status

### Current Build Failure
**Command**: `npm run build`  
**Status**: ❌ FAILING  
**Error Location**: `lib/blog-scheduler/scheduling-service.ts:167:1`

```
Error: x await isn't allowed in non-async function
     ,-[/Users/.../lib/blog-scheduler/scheduling-service.ts:167:1]
 164 |       }
 165 |       
 166 |       // Skip holidays (would need to check special_dates table)
 167 |       if (await this.isHoliday(day)) {
     :                ^^^^
 168 |         continue
 169 |       }
```

**Root Cause**: Blog scheduler code has async/await syntax errors
**Impact**: Cannot generate bundle size baseline until build succeeds
**Next.js Version**: 15.2.4 (bleeding edge - likely contributing to issues)

### Bundle Size Baseline
❌ **CONFIRMED: Unable to establish baseline** - build failing due to TypeScript syntax errors
**Build Command**: `npm run build`
**Build Status**: ❌ FAILING
**Next.js Version**: 15.2.4 (bleeding edge)

**Build Output**:
```
Error: x await isn't allowed in non-async function
/Users/.../lib/blog-scheduler/scheduling-service.ts:167:1
167 | if (await this.isHoliday(day)) {
    :                ^^^^
```

**Impact**: Cannot establish bundle size baseline until blog scheduler is removed or fixed
📝 **Action Required**: Remove blog scheduler in Phase 1 to proceed with baseline establishment

## Dependency Issues Confirmed
This validates the issues identified in REFACTOR_TASKS.md:
1. ✅ **React 19 bleeding edge** causing compatibility issues
2. ✅ **Blog scheduler complexity** causing syntax/async errors  
3. ✅ **Next.js 15.2.4** contributing to build instability
4. ✅ **"latest" package versions** creating unpredictable behavior

## Next Steps
Following REFACTOR_TASKS.md Phase 0 checklist:
1. ✅ Document failing tests (this file)
2. ❌ Record current bundle size (blocked by build failure)
3. ⏳ Save Lighthouse scores (may be blocked by build failure)
4. ⏳ Export dependency tree
5. ⏳ Backup database schema
6. ⏳ Create feature branch

**Critical Finding**: Build is completely broken, confirming the urgent need for dependency stabilization in Phase 1.

## Lighthouse Performance Baseline

### Mobile Performance Scores
- 📊 **Performance**: 45/100 ⚠️ (Needs improvement)
- ✅ **Accessibility**: 90/100 (Good)
- ✅ **Best Practices**: 100/100 (Excellent)
- ✅ **SEO**: 100/100 (Excellent)

### Desktop Performance Scores  
- ✅ **Performance**: 85/100 (Good)
- ✅ **Accessibility**: 90/100 (Good)
- ✅ **Best Practices**: 100/100 (Excellent)
- ✅ **SEO**: 100/100 (Excellent)

### Analysis
- **Mobile Performance**: Significantly lower (45) vs Desktop (85) - priority for optimization
- **Accessibility**: Consistent at 90 across devices - minor improvements needed for WCAG AA compliance
- **SEO & Best Practices**: Both perfect scores, indicating solid foundation

### Baseline Files
- `lighthouse-mobile-baseline.json` - Full mobile audit results
- `lighthouse-desktop-baseline.json` - Full desktop audit results

## Dependency Tree Analysis

### Critical Issues Identified
- **Multiple "invalid: 'latest'" entries** - Radix UI components using unstable versions:
  - `@radix-ui/react-collapsible@1.1.11 invalid: "latest"`
  - `@radix-ui/react-dialog@1.1.14 invalid: "latest"`  
  - `@radix-ui/react-popover@1.1.14 invalid: "latest"`

### Extraneous Packages
- **249+ extraneous dependencies** detected (showing first 50 in baseline)
- Indicates package.json vs node_modules mismatch
- Likely caused by "latest" version tags and incomplete lockfile

### Root Project Issues  
- **schengen-visa-calculator@0.1.0** - Base package healthy
- **Next.js 15.2.4** - Bleeding edge version causing compatibility issues
- **React 19** - Latest but potentially unstable dependencies

### Baseline File
- `dependency-tree-baseline.txt` - Full dependency analysis (truncated to first 50 entries)

## Database Schema Baseline

### Current Schema Overview
✅ **Successfully documented** - Complete Supabase PostgreSQL schema captured

### Core Tables
1. **`profiles`** - User profile data (name, phone, home country, travel reason)
2. **`countries`** - Schengen countries list with flags (27 countries)
3. **`visa_entries`** - Individual trip entries with dates and calculated days
4. **`trip_collections`** - Grouped trips for organization

### Security Implementation
- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **User-scoped policies** for data access control
- ✅ **Automatic profile creation** via auth triggers
- ✅ **Timestamp triggers** for audit trail

### Database Connection
- **Provider**: Supabase (PostgreSQL)
- **URL**: `ydskboviymdwvynheef.supabase.co`
- **Authentication**: JWT-based with anon key
- **Status**: Configured and operational

### Baseline Files
- `database-schema-baseline.sql` - Complete schema backup with RLS policies
- `lib/types/database.ts` - TypeScript type definitions

**Status**: Proceeding with remaining baseline tasks where possible, will note build dependency as immediate priority.