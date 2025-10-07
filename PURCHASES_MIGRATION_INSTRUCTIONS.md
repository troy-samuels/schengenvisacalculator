# Purchases Table Migration Instructions

## Overview
This migration creates the `public.purchases` table to track EES Readiness Guide purchases (£7.99).

## Status
- ✅ TypeScript types: Already defined in `database.ts`
- ✅ Stripe webhook: Already handles purchases
- ✅ Frontend: Already has purchase button
- ❌ Database table: **NEEDS TO BE CREATED**
- ❌ Environment variable: **NEEDS TO BE SET**

---

## Step 1: Create the Purchases Table

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **SQL Editor** → **New Query**
4. Copy and paste the SQL from: `packages/app/src/lib/database/migrations/002_purchases.sql`
5. Click **Run**

### Option B: Using Supabase CLI

```bash
# Link your project (you'll need project ref from dashboard)
~/bin/supabase link --project-ref your-project-ref

# Run the migration
~/bin/supabase db push
```

---

## Step 2: Set Environment Variable

Add this to your `.env.local`:

```bash
# EES Guide Price ID from Stripe Dashboard
STRIPE_PRICE_EES_GUIDE=price_xxxxxx
```

**To get your Price ID:**
1. Go to Stripe Dashboard → Products
2. Find "EES Readiness Guide" product
3. Copy the Price ID (starts with `price_`)

---

## Step 3: Verify Installation

Run this in Node.js to test:

```javascript
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Test query
const { data, error } = await supabase
  .from('purchases')
  .select('*')
  .limit(1)

if (error) {
  console.error('❌ Table not created yet:', error.message)
} else {
  console.log('✅ Purchases table exists!', data)
}
```

---

## What This Migration Does

1. **Creates `purchases` table** with columns:
   - `id`: UUID primary key
   - `user_id`: References profiles table
   - `product`: Only 'ees_guide' allowed currently
   - `status`: 'paid', 'refunded', or 'cancelled'
   - `amount`: Price in minor units (pence)
   - `currency`: Default 'gbp'
   - `stripe_session_id`: Unique Stripe session reference
   - `created_at`: Timestamp

2. **Enables Row Level Security (RLS)**:
   - Users can only view their own purchases
   - Service role (webhook) can insert

3. **Creates indexes** for performance:
   - `user_id` index
   - `created_at` index

---

## Safety Notes

✅ **Safe to run multiple times** - Uses `CREATE TABLE` (fails silently if exists)
✅ **Zero impact on existing features** - Only adds new table
✅ **RLS protects data** - Users can't see others' purchases
✅ **Webhook already handles inserts** - Code path tested in webhook/route.ts

---

## Next Steps After Migration

1. Create a test purchase to verify:
   - Go to `/ees` page
   - Click "Get EES Guide"
   - Complete test checkout
   - Check Supabase → Table Editor → purchases

2. Query purchases in your code:
   ```typescript
   import { usePurchases } from '@/lib/hooks/usePurchases'

   const { purchases, hasEESGuide } = usePurchases()
   ```

3. Analytics queries:
   ```sql
   -- Total EES Guide sales
   SELECT COUNT(*), SUM(amount) FROM purchases WHERE product = 'ees_guide' AND status = 'paid';

   -- Recent purchases
   SELECT * FROM purchases ORDER BY created_at DESC LIMIT 10;
   ```

---

## Troubleshooting

**Error: "relation 'purchases' does not exist"**
→ Run the migration SQL in Supabase dashboard

**Error: "insert or update on table violates foreign key constraint"**
→ Make sure user has a profile in `profiles` table first

**Error: "STRIPE_PRICE_EES_GUIDE not configured"**
→ Add the price ID to `.env.local` and restart your dev server

---

## Files Reference

- Migration SQL: `packages/app/src/lib/database/migrations/002_purchases.sql`
- TypeScript types: `packages/app/src/lib/types/database.ts` (lines 126-166)
- Stripe webhook: `packages/app/src/app/api/stripe/webhook/route.ts` (lines 112-133)
- Purchase component: `packages/app/src/components/ees/EESGuidePurchase.tsx`
