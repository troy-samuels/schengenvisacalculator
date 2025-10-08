-- Create purchases table to record one-time add-on purchases (e.g., EES Guide)
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product TEXT NOT NULL CHECK (product IN ('ees_guide')),
  status TEXT NOT NULL CHECK (status IN ('paid', 'refunded', 'cancelled')),
  amount INTEGER, -- amount in minor units (e.g., pence)
  currency TEXT DEFAULT 'gbp',
  stripe_session_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- RLS: Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Indexes for common queries
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_created_at ON public.purchases(created_at);


