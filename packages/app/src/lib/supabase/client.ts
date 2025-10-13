import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../types/database'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, if env vars are missing, return a mock client
  if (!supabaseUrl || !supabaseKey) {
    if (typeof window === 'undefined') {
      // Server-side during build - return a mock client
      return {} as any
    }
    // Client-side without credentials - this is a configuration error
    throw new Error('Supabase environment variables are not configured')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}