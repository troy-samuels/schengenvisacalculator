import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Server-side admin client using service role key for privileged writes (e.g., Stripe webhooks)
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
)


