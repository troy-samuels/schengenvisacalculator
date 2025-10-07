# 🚨 FIX: Run This Safe Migration SQL

## The Problem

You got this error:
```
ERROR: 42501: must be owner of table users
```

This happened because `001_initial_schema.sql` contains:
```sql
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
```

**You can't modify `auth.users`** - it's managed by Supabase.

---

## The Solution

Run **ONLY THIS SQL** in Supabase Dashboard → SQL Editor:

### Copy Everything Below This Line ⬇️

```sql
-- ========================================
-- SAFE PURCHASES TABLE MIGRATION
-- ========================================
-- Creates ONLY the purchases table
-- No auth.users modifications
-- Safe to run multiple times
-- ========================================

-- Create purchases table (IF NOT EXISTS for safety)
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product TEXT NOT NULL CHECK (product IN ('ees_guide')),
  status TEXT NOT NULL CHECK (status IN ('paid', 'refunded', 'cancelled')),
  amount INTEGER, -- amount in minor units (e.g., pence)
  currency TEXT DEFAULT 'gbp',
  stripe_session_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (safe - only affects purchases table)
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (for re-runs)
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;

-- RLS: Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Create indexes (IF NOT EXISTS for safety)
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON public.purchases(created_at);

-- Verification query (confirm success)
SELECT
  'purchases table created successfully' as status,
  COUNT(*) as current_row_count
FROM public.purchases;
```

### Copy Everything Above This Line ⬆️

---

## Steps

1. **Copy** the SQL above (between the arrows)
2. **Go to**: Supabase Dashboard → SQL Editor → New Query
3. **Paste** the SQL
4. **Click**: Run
5. **Verify**: Should see "purchases table created successfully" with row count 0

---

## What This Does

✅ Creates `purchases` table safely
✅ Enables RLS on purchases (not auth.users)
✅ Creates user access policy
✅ Adds performance indexes
✅ Safe to run multiple times (won't error if already exists)

---

## After Running

1. Go to **Table Editor**
2. Find `purchases` table
3. Should see columns: id, user_id, product, status, amount, currency, stripe_session_id, created_at
4. Test by making a test purchase at `/ees`

---

## Still Having Issues?

Check if `profiles` table exists:
```sql
SELECT * FROM public.profiles LIMIT 1;
```

If that errors, you need to run the profiles table migration first.

---

**File**: `packages/app/src/lib/database/migrations/002_purchases_SAFE.sql`
**Alternative**: Copy SQL from this file directly
