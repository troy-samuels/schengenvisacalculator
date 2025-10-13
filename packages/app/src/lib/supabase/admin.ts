import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// Lazy initialization to avoid build-time environment variable requirements
let client: SupabaseClient<Database> | null = null

// Server-side admin client using service role key for privileged writes (e.g., Stripe webhooks)
// This is a getter function to ensure it's only initialized at runtime, not during build
export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    client = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    })
  }
  return client
}

// For backwards compatibility, export as supabaseAdmin
export const supabaseAdmin = new Proxy({} as SupabaseClient<Database>, {
  get(target, prop) {
    return getSupabaseAdmin()[prop as keyof SupabaseClient<Database>]
  }
})


