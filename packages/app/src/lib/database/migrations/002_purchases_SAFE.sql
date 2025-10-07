-- ========================================
-- SAFE PURCHASES TABLE MIGRATION
-- ========================================
-- This migration creates ONLY the purchases table
-- No auth.users modifications (prevents permission errors)
-- Safe to run multiple times (uses IF NOT EXISTS)
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

-- Verification query (optional - copy result to confirm success)
SELECT
  'purchases table created' as status,
  COUNT(*) as row_count
FROM public.purchases;
