/**
 * usePurchases Hook - Query EES Guide Purchase Status
 * Provides access control and purchase history for users
 * Part of the EES October 2025 launch monetization
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '../supabase/client'
import type { Database } from '../types/database'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

type Purchase = Database['public']['Tables']['purchases']['Row']

interface UsePurchasesReturn {
  purchases: Purchase[]
  loading: boolean
  error: string | null
  hasEESGuide: boolean
  hasPaidEESGuide: boolean
  latestEESGuide: Purchase | null
  refetch: () => Promise<void>
}

/**
 * Hook to query user's purchase history
 * Automatically fetches purchases when user is authenticated
 */
export function usePurchases(): UsePurchasesReturn {
  const supabase = createClient()

  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUserId(user?.id || null)
      } catch (err) {
        console.error('Error getting user for purchases:', err)
      }
    }
    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUserId(session?.user?.id || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  // Fetch purchases
  const fetchPurchases = useCallback(async () => {
    if (!userId) {
      setPurchases([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setPurchases(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load purchases'
      setError(errorMessage)
      console.error('Error fetching purchases:', err)
    } finally {
      setLoading(false)
    }
  }, [userId, supabase])

  // Auto-fetch on user change
  useEffect(() => {
    fetchPurchases()
  }, [fetchPurchases])

  // Computed values
  const hasEESGuide = useMemo(() => {
    return purchases.some(p => p.product === 'ees_guide')
  }, [purchases])

  const hasPaidEESGuide = useMemo(() => {
    return purchases.some(p => p.product === 'ees_guide' && p.status === 'paid')
  }, [purchases])

  const latestEESGuide = useMemo(() => {
    const eesGuides = purchases.filter(p => p.product === 'ees_guide')
    return eesGuides.length > 0 ? eesGuides[0] : null
  }, [purchases])

  return {
    purchases,
    loading,
    error,
    hasEESGuide,
    hasPaidEESGuide,
    latestEESGuide,
    refetch: fetchPurchases
  }
}

/**
 * Server-side helper to check if user has purchased EES Guide
 * Use in API routes or server components
 */
// Server-side helpers removed from client module to avoid server-only imports in client bundles
