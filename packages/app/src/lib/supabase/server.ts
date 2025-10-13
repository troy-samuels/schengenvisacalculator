import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '../types/database'

export const createClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, if env vars are missing, return a mock client
  if (!supabaseUrl || !supabaseKey) {
    // Build-time - return a mock client
    return {} as any
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server component error
          }
        },
      },
    }
  )
}