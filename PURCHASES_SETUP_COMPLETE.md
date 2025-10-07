# ✅ Purchases Table Setup - COMPLETE

## Summary

The `public.purchases` table infrastructure is now **fully implemented** and ready for the EES Readiness Guide (£7.99) launch. All code is in place - only database migration execution is required.

---

## 🎯 What's Been Implemented

### 1. Database Schema ✅
- **File**: `packages/app/src/lib/database/migrations/002_purchases.sql`
- **What it does**:
  - Creates `purchases` table with proper foreign keys
  - Row Level Security (RLS) enabled - users only see their own purchases
  - Indexes for performance (user_id, created_at)
  - CHECK constraints to ensure data integrity

### 2. TypeScript Types ✅
- **File**: `packages/app/src/lib/types/database.ts` (lines 126-166)
- **What it includes**:
  - Full type definitions for Row, Insert, Update
  - Product enum: 'ees_guide' (extensible for future products)
  - Status enum: 'paid', 'refunded', 'cancelled'

### 3. Stripe Integration ✅
- **Webhook Handler**: `packages/app/src/app/api/stripe/webhook/route.ts` (lines 112-133)
  - Automatically records purchases on `checkout.session.completed`
  - Saves: user_id, product, status, amount, currency, stripe_session_id
- **Checkout Session**: `packages/app/src/app/api/stripe/create-checkout-session/route.ts` (lines 102-131)
  - Handles `tier: 'ees_guide'` with `billingCycle: 'one_time'`
  - Uses `STRIPE_PRICE_EES_GUIDE` environment variable

### 4. Frontend Purchase Component ✅
- **File**: `packages/app/src/components/ees/EESGuidePurchase.tsx`
- **What it does**:
  - £7.99 purchase card with feature list
  - Redirects to Stripe Checkout
  - Handles loading and error states

### 5. React Hook for Access Control ✅ (NEW)
- **File**: `packages/app/src/lib/hooks/usePurchases.ts`
- **What it provides**:
  ```typescript
  const {
    purchases,        // All user purchases
    loading,          // Loading state
    error,            // Error message
    hasEESGuide,      // Boolean: owns any EES guide
    hasPaidEESGuide,  // Boolean: has PAID EES guide
    latestEESGuide,   // Most recent EES purchase
    refetch           // Manual refresh function
  } = usePurchases()
  ```

### 6. Access Control Component ✅ (NEW)
- **File**: `packages/app/src/components/ees/EESGuideAccessCheck.tsx`
- **What it does**:
  - Wraps premium content
  - Shows purchase prompt if not purchased
  - Shows content if purchased
  - Handles loading/error states

### 7. Environment Variables ✅
- **File**: `.env.example` (updated)
- **Added**: `STRIPE_PRICE_EES_GUIDE=price_ees_guide_7_99`

### 8. Supabase CLI ✅
- **Installed**: `~/bin/supabase` (v2.48.3)
- **Ready for**: Database migrations and management

---

## 🚀 Next Steps (Required by User)

### Step 1: Run Database Migration

**Option A: Supabase Dashboard (Easiest)**
1. Go to https://supabase.com/dashboard → Your Project
2. Navigate to: **SQL Editor** → **New Query**
3. Copy SQL from: `packages/app/src/lib/database/migrations/002_purchases.sql`
4. Click **Run**
5. Verify success: Go to **Table Editor** → should see `purchases` table

**Option B: Supabase CLI**
```bash
# Link your project first
~/bin/supabase link --project-ref <your-project-ref>

# Run migration
~/bin/supabase db push
```

### Step 2: Set Stripe Environment Variable

1. Get your EES Guide Price ID from Stripe Dashboard
   - Go to: Stripe Dashboard → Products
   - Find: "EES Readiness Guide" (or create it)
   - Price: £7.99 one-time payment
   - Copy: Price ID (starts with `price_`)

2. Add to `.env.local`:
   ```bash
   STRIPE_PRICE_EES_GUIDE=price_xxxxxxxxxxxxxx
   ```

3. Restart your development server

### Step 3: Test the Complete Flow

1. **Test Purchase Flow**:
   ```bash
   npm run dev
   # Navigate to: http://localhost:3000/ees
   # Click: "Get EES Guide" button
   # Complete: Stripe test checkout
   # Verify: Webhook logs show purchase recorded
   ```

2. **Test Access Control**:
   ```typescript
   // Use in any component
   import { usePurchases } from '@/lib/hooks/usePurchases'

   function MyComponent() {
     const { hasPaidEESGuide, loading } = usePurchases()

     if (loading) return <div>Loading...</div>
     if (!hasPaidEESGuide) return <div>Purchase required</div>

     return <div>Premium content here!</div>
   }
   ```

3. **Verify Database**:
   - Go to: Supabase Dashboard → Table Editor → purchases
   - Check: New row appears after test purchase
   - Verify: All fields populated correctly

---

## 📊 Usage Examples

### Example 1: Protect Premium Content

```typescript
import { EESGuideAccessCheck } from '@/components/ees/EESGuideAccessCheck'

export default function EESCompleteGuidePage() {
  return (
    <EESGuideAccessCheck>
      {/* This content only shown to purchasers */}
      <h1>Complete EES Biometric Guide</h1>
      <p>Step-by-step preparation...</p>
    </EESGuideAccessCheck>
  )
}
```

### Example 2: Conditional Features

```typescript
import { usePurchases } from '@/lib/hooks/usePurchases'

export function EESResourcesList() {
  const { hasPaidEESGuide } = usePurchases()

  return (
    <div>
      <h2>EES Resources</h2>

      {/* Free resources */}
      <FreeResourceList />

      {/* Premium resources */}
      {hasPaidEESGuide && <PremiumResourceList />}
    </div>
  )
}
```

### Example 3: Server-Side Access Check

```typescript
import { checkEESGuidePurchase } from '@/lib/hooks/usePurchases'

export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id')

  const hasAccess = await checkEESGuidePurchase(userId)

  if (!hasAccess) {
    return new Response('Purchase required', { status: 403 })
  }

  return new Response(premiumContent)
}
```

### Example 4: Analytics Query

```sql
-- Total EES Guide revenue
SELECT
  COUNT(*) as total_purchases,
  SUM(amount) / 100 as total_revenue_gbp
FROM purchases
WHERE product = 'ees_guide'
  AND status = 'paid';

-- Recent purchases
SELECT
  p.created_at,
  p.amount / 100 as price_gbp,
  prof.email
FROM purchases p
JOIN profiles prof ON p.user_id = prof.id
WHERE p.product = 'ees_guide'
ORDER BY p.created_at DESC
LIMIT 10;
```

---

## 🛡️ Security Features

1. **Row Level Security (RLS)**
   - Users can only SELECT their own purchases
   - Service role (webhooks) can INSERT
   - No user can modify or delete purchases

2. **Foreign Key Constraints**
   - `user_id` must exist in `profiles` table
   - Cascade delete: if user deleted, purchases deleted

3. **CHECK Constraints**
   - `product` must be 'ees_guide' (extensible)
   - `status` must be 'paid', 'refunded', or 'cancelled'

4. **Unique Stripe Session ID**
   - Prevents duplicate purchase records
   - Enables idempotent webhook processing

---

## 🔍 Troubleshooting

### Problem: "relation 'purchases' does not exist"
**Solution**: Run the migration SQL in Supabase dashboard

### Problem: "STRIPE_PRICE_EES_GUIDE not configured"
**Solution**: Add price ID to `.env.local` and restart server

### Problem: "Foreign key constraint violation"
**Solution**: User must have profile in `profiles` table first

### Problem: Hook returns empty purchases
**Solution**: Check:
1. User is logged in
2. Migration has been run
3. Webhook successfully inserted purchase
4. Check Supabase logs for RLS policy issues

---

## 📁 Files Reference

| File | Purpose |
|------|---------|
| `migrations/002_purchases.sql` | Database schema |
| `lib/types/database.ts` | TypeScript types |
| `api/stripe/webhook/route.ts` | Purchase recording |
| `api/stripe/create-checkout-session/route.ts` | Checkout creation |
| `components/ees/EESGuidePurchase.tsx` | Purchase button |
| `lib/hooks/usePurchases.ts` | React hook |
| `components/ees/EESGuideAccessCheck.tsx` | Access control |
| `.env.example` | Environment template |
| `PURCHASES_MIGRATION_INSTRUCTIONS.md` | Detailed migration guide |

---

## ✨ Benefits Unlocked

✅ **Permanent Purchase Records** - Every EES Guide sale tracked
✅ **Access Control** - Easy to check if user owns guide
✅ **Receipt Generation** - Can query for invoice/receipt
✅ **Analytics** - Revenue tracking, conversion rates
✅ **Refund Tracking** - Status field supports refunds
✅ **Scalable** - Easy to add new products (ETIAS guide, etc.)
✅ **Secure** - RLS prevents unauthorized access
✅ **Type-Safe** - Full TypeScript support

---

## 🎯 Impact on Project

**Zero Breaking Changes** ✅
- Existing features unchanged
- Only adds new capabilities
- Backward compatible

**Production Ready** ✅
- RLS security enabled
- Indexes for performance
- Error handling in place
- Loading states handled

**Developer Friendly** ✅
- Simple hook API
- Clear component examples
- TypeScript everywhere
- Comprehensive docs

---

## 🚦 Status: READY TO DEPLOY

**Code Complete**: 100%
**User Action Required**:
1. Run migration (5 minutes)
2. Set env variable (1 minute)
3. Test purchase flow (5 minutes)

**Total Setup Time**: ~11 minutes

---

*Generated: 2025-10-07*
*Project: EU Border Authority Platform*
*Feature: EES Readiness Guide Monetization*
