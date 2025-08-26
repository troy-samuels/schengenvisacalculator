# Vercel Deployment Configuration

## Modern Monorepo Deployment Setup

This project uses Vercel's native monorepo support for optimal deployment configuration. No custom `vercel.json` is needed - Vercel handles everything automatically when configured properly.

## Required Vercel Dashboard Settings

### 1. Root Directory Configuration
- **Setting**: Project Settings → Build & Output Settings → Root Directory
- **Value**: `packages/app`
- **Reason**: Tells Vercel where to find the Next.js application in the monorepo

### 2. Framework Detection
- **Setting**: Project Settings → Build & Output Settings → Framework Preset
- **Value**: Let Vercel auto-detect (should show "Next.js")
- **Reason**: Vercel automatically detects Next.js and uses optimal build settings

### 3. Build Optimization
- **Setting**: Project Settings → Git → Ignored Build Step
- **Value**: `git diff HEAD^ HEAD --quiet packages/app/`
- **Reason**: Prevents unnecessary builds when only non-app files change

### 4. Node.js Version
- **Setting**: Project Settings → Build & Output Settings → Node.js Version
- **Value**: `22.x` (latest LTS)
- **Reason**: 2025 best practices require Node.js v22 for optimal performance

## How It Works

### 1. Native Monorepo Support
- Vercel automatically detects the monorepo structure
- Turbo handles internal package dependencies via `"dependsOn": ["^build"]`
- No manual build scripts or dependency management needed

### 2. Automatic Optimization
- Vercel caches build artifacts across packages
- Only rebuilds changed packages and their dependents
- Leverages Turbo's incremental builds and caching

### 3. Zero Configuration
- No `vercel.json` file needed
- No custom install or build commands
- Vercel's defaults work optimally with this setup

## Benefits of This Approach

- ✅ **Simpler**: Uses platform defaults instead of custom configuration
- ✅ **Faster**: Leverages Vercel's native optimizations
- ✅ **Maintainable**: Less custom code to maintain
- ✅ **Future-proof**: Automatically benefits from Vercel platform improvements

## Troubleshooting

### Build Fails with "No Next.js version detected"
- **Cause**: Root Directory not set to `packages/app`
- **Solution**: Update Root Directory setting in Vercel dashboard

### Unnecessary Rebuilds
- **Cause**: Ignored Build Step not configured
- **Solution**: Add Git ignore rule for unchanged packages

### Node.js Version Issues  
- **Cause**: Using older Node.js version
- **Solution**: Update to Node.js v22 in Vercel settings

## Previous Suboptimal Approach (Avoid)

❌ **Don't do this:**
```json
// vercel.json - NOT NEEDED
{
  "buildCommand": "npm run build:dependencies && cd packages/app && npm run build",
  "installCommand": "npm install", 
  "outputDirectory": "packages/app/.next",
  "framework": null
}
```

This approach:
- Fights against Vercel's native capabilities
- Creates maintenance overhead
- Misses performance optimizations
- Requires custom dependency scripts

## Summary

The optimal Vercel deployment approach:
1. Set Root Directory to `packages/app` in dashboard
2. Let Vercel auto-detect everything else
3. Trust Turbo to handle internal dependencies
4. Use Vercel's native monorepo support

This leverages 2025 best practices and Vercel's platform strengths.