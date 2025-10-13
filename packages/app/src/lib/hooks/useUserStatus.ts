/**
 * B2C User Status Hook - 3-Tier System Implementation
 * Manages Anonymous → Free Account → Premium user progression
 * Part of B2C-first strategy defined in CLAUDE.md
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createClient } from '../supabase/client'
import {
  UserContext,
  UserStatus,
  UserProfile,
  getUserStatus,
  canAddMoreTrips,
  COMPLIANCE_FEATURES,
  trackUserStatusEvent
} from '../types/user-status'
import { tripDataService, type TripData } from '../services/trip-data'
import { TripEntry, convertLocalStorageTrip, convertTripToLocalStorage } from '../types/schengen-trip'

// Local storage key for anonymous user trip count
const ANONYMOUS_TRIP_COUNT_KEY = 'etias_anonymous_trip_count'

export function useUserStatus(): UserContext {
  const supabase = createClient()
  
  // Authentication state
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Anonymous user state (localStorage)
  const [anonymousTripCount, setAnonymousTripCount] = useState(0)

  // Trip management state
  const [userTrips, setUserTrips] = useState<TripData[]>([])
  const [tripsLoading, setTripsLoading] = useState(false)
  const [tripsError, setTripsError] = useState<string | null>(null)

  // Initialize anonymous trip count from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem(ANONYMOUS_TRIP_COUNT_KEY)
      setAnonymousTripCount(savedCount ? parseInt(savedCount, 10) : 0)
    }
  }, [])

  // Update localStorage when anonymous trip count changes
  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      localStorage.setItem(ANONYMOUS_TRIP_COUNT_KEY, anonymousTripCount.toString())
    }
  }, [anonymousTripCount, user])

  // Get user authentication state and profile
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          setUserProfile(profile)
          
          // Clear anonymous trip count when user logs in
          if (typeof window !== 'undefined') {
            localStorage.removeItem(ANONYMOUS_TRIP_COUNT_KEY)
            setAnonymousTripCount(0)
          }
        } else {
          setUserProfile(null)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        const newUser = session?.user ?? null
        setUser(newUser)
        
        if (newUser) {
          // Fetch profile for new user
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newUser.id)
            .single()
          
          setUserProfile(profile)
          
          // Track status change
          const newStatus = getUserStatus(newUser, profile)
          trackUserStatusEvent({
            event: 'status_change',
            userStatus: newStatus,
            previousStatus: UserStatus.FREE
          })
          
          // Clear anonymous state
          if (typeof window !== 'undefined') {
            localStorage.removeItem(ANONYMOUS_TRIP_COUNT_KEY)
            setAnonymousTripCount(0)
          }

          // Load user trips
          loadUserTrips()
        } else {
          setUserProfile(null)
          setUserTrips([]) // Clear trips when user logs out
          setTripsError(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Calculate current user status
  const userStatus = useMemo(() => {
    return getUserStatus(user, userProfile)
  }, [user, userProfile])

  // Calculate trip count based on user status
  const tripCount = useMemo(() => {
    if (userStatus === UserStatus.FREE) {
      return anonymousTripCount
    }
    // For logged-in users, this would come from database
    // TODO: Implement database trip count fetching
    return 0
  }, [userStatus, anonymousTripCount])

  // Get trip limit for current user status
  const tripLimit = useMemo(() => {
    return COMPLIANCE_FEATURES[userStatus].tripLimit
  }, [userStatus])

  // Check if user can add more trips
  const canAddTrips = useMemo(() => {
    return canAddMoreTrips(userStatus, tripCount)
  }, [userStatus, tripCount])

  // Feature access flags
  const hasUnlimitedTrips = tripLimit === null
  const showDisplayAds = userStatus === UserStatus.FREE // Only free users see ads
  const hasAffiliateAccess = userStatus !== UserStatus.FREE // Premium users have affiliate access
  const hasPremiumFeatures = COMPLIANCE_FEATURES[userStatus].premiumFeatures

  // Authentication methods
  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      throw error
    }
  }, [supabase])

  const signInWithGoogle = useCallback(async () => {
    console.log('🔍 signInWithGoogle called')
    console.log('🌍 Current origin:', window.location.origin)
    console.log('📡 Supabase client:', supabase ? 'Available' : 'Not available')

    // Check for placeholder configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl?.includes('placeholder') || supabaseKey?.includes('placeholder')) {
      const configError = new Error('Authentication is not properly configured. Please contact support.')
      configError.name = 'ConfigurationError'
      console.error('🚨 Supabase configuration issue detected:', { supabaseUrl, supabaseKey: supabaseKey?.substring(0, 20) + '...' })
      throw configError
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      console.log('🔄 OAuth response data:', data)
      console.log('❗ OAuth response error:', error)

      if (error) {
        console.error('🚨 OAuth error details:', {
          message: error.message,
          code: error.code
        })

        // Provide more user-friendly error messages
        if (error.message?.includes('Invalid provider')) {
          const providerError = new Error('Google authentication is not enabled. Please contact support.')
          providerError.name = 'ProviderError'
          throw providerError
        }

        if (error.message?.includes('redirect_uri')) {
          const redirectError = new Error('Authentication redirect is misconfigured. Please contact support.')
          redirectError.name = 'RedirectError'
          throw redirectError
        }

        throw error
      }

      console.log('🎉 OAuth call completed successfully')
    } catch (error) {
      console.error('🚨 Exception in OAuth flow:', error)
      throw error
    }
  }, [supabase])

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    
    if (error) {
      throw error
    }
    
    // Track conversion from anonymous to free account
    trackUserStatusEvent({
      event: 'conversion',
      userStatus: UserStatus.LIFETIME, // User is signing up for premium
      previousStatus: UserStatus.FREE,
      metadata: { 
        conversion_trigger: 'signup',
        anonymous_trip_count: anonymousTripCount
      }
    })
  }, [supabase, anonymousTripCount])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
  }, [supabase])

  // Conversion methods
  const upgradeToFreeAccount = useCallback(async () => {
    // This would trigger the registration flow
    trackUserStatusEvent({
      event: 'upgrade_prompt',
      userStatus: UserStatus.FREE,
      feature: 'unlimited_trips',
      metadata: { 
        trigger: 'trip_limit_reached',
        current_trips: anonymousTripCount 
      }
    })
  }, [anonymousTripCount])

  const upgradeToPremium = useCallback(async () => {
    // This would trigger the premium upgrade flow
    trackUserStatusEvent({
      event: 'upgrade_prompt',
      userStatus: userStatus,
      feature: 'premium_features'
    })
  }, [userStatus])

  // Method to increment anonymous trip count
  const incrementAnonymousTripCount = useCallback(() => {
    if (userStatus === UserStatus.FREE) {
      setAnonymousTripCount(prev => prev + 1)
    }
  }, [userStatus])

  // Trip management methods
  const loadUserTrips = useCallback(async () => {
    if (!user?.id) {
      setUserTrips([])
      return
    }

    setTripsLoading(true)
    setTripsError(null)

    try {
      console.log('📥 Loading trips for user:', user.id)
      const trips = await tripDataService.loadUserTrips(user.id)
      setUserTrips(trips)
      console.log(`✅ Loaded ${trips.length} trips`)
    } catch (error) {
      console.error('❌ Failed to load trips:', error)
      setTripsError(error instanceof Error ? error.message : 'Failed to load trips')
    } finally {
      setTripsLoading(false)
    }
  }, [user?.id])

  const saveTrip = useCallback(async (trip: TripData): Promise<TripData | null> => {
    if (!user?.id) {
      console.warn('⚠️ Cannot save trip: user not logged in')
      return null
    }

    setTripsError(null)

    try {
      console.log('💾 Saving trip:', trip.id)
      const savedTrip = await tripDataService.saveTrip(trip, user.id)

      // Update local state
      setUserTrips(prevTrips => {
        const existingIndex = prevTrips.findIndex(t => t.id === trip.id)
        if (existingIndex >= 0) {
          // Update existing trip
          const newTrips = [...prevTrips]
          newTrips[existingIndex] = savedTrip
          return newTrips
        } else {
          // Add new trip
          return [...prevTrips, savedTrip]
        }
      })

      console.log('✅ Trip saved successfully')
      return savedTrip
    } catch (error) {
      console.error('❌ Failed to save trip:', error)
      setTripsError(error instanceof Error ? error.message : 'Failed to save trip')
      return null
    }
  }, [user?.id])

  const deleteTrip = useCallback(async (tripId: string): Promise<boolean> => {
    if (!user?.id) {
      console.warn('⚠️ Cannot delete trip: user not logged in')
      return false
    }

    setTripsError(null)

    try {
      console.log('🗑️ Deleting trip:', tripId)
      await tripDataService.deleteTrip(tripId, user.id)

      // Update local state
      setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId))

      console.log('✅ Trip deleted successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to delete trip:', error)
      setTripsError(error instanceof Error ? error.message : 'Failed to delete trip')
      return false
    }
  }, [user?.id])

  const migrateMigrationFromLocalStorage = useCallback(async (): Promise<boolean> => {
    if (!user?.id || typeof window === 'undefined') {
      return false
    }

    try {
      // Check for existing trips in localStorage
      const localTripsData = localStorage.getItem('schengen_trips')
      if (!localTripsData) {
        return true // No trips to migrate
      }

      const localTrips = JSON.parse(localTripsData)
      if (!Array.isArray(localTrips) || localTrips.length === 0) {
        return true
      }

      console.log(`🔄 Migrating ${localTrips.length} trips from localStorage`)

      // Convert to TripData format
      const tripsToMigrate: TripData[] = localTrips
        .map(convertLocalStorageTrip)
        .filter((trip): trip is TripData =>
          Boolean(trip.country && trip.startDate && trip.endDate)
        )
        .map(trip => ({
          id: 'new', // Let database generate new IDs
          country: trip.country,
          startDate: trip.startDate,
          endDate: trip.endDate,
          entry_type: trip.entry_type || 'schengen',
          notes: trip.notes
        }))

      if (tripsToMigrate.length === 0) {
        return true
      }

      // Batch save to database
      const savedTrips = await tripDataService.batchSaveTrips(tripsToMigrate, user.id)

      // Update local state
      setUserTrips(prevTrips => [...prevTrips, ...savedTrips])

      // Clear localStorage
      localStorage.removeItem('schengen_trips')

      console.log(`✅ Successfully migrated ${savedTrips.length} trips`)
      return true
    } catch (error) {
      console.error('❌ Failed to migrate trips from localStorage:', error)
      setTripsError('Failed to migrate your saved trips')
      return false
    }
  }, [user?.id])

  // Return context with additional helper for trip counting
  return {
    // Authentication state
    user,
    userProfile,
    loading,

    // B2C user status
    userStatus,

    // Feature access
    canAddTrips,
    hasUnlimitedTrips,
    showDisplayAds,
    hasAffiliateAccess,
    hasPremiumFeatures,

    // Trip limitations
    tripCount,
    tripLimit,

    // Authentication methods
    signIn,
    signInWithGoogle,
    signUp,
    signOut,

    // Conversion methods
    upgradeToFreeAccount,
    upgradeToPremium,

    // Trip management (database persistence)
    userTrips,
    tripsLoading,
    tripsError,
    loadUserTrips,
    saveTrip,
    deleteTrip,
    migrateMigrationFromLocalStorage,

    // Helper method (not part of interface but useful)
    incrementAnonymousTripCount: userStatus === UserStatus.FREE ? incrementAnonymousTripCount : undefined
  } as UserContext & {
    incrementAnonymousTripCount?: () => void
    // Trip management extensions
    userTrips: TripData[]
    tripsLoading: boolean
    tripsError: string | null
    loadUserTrips: () => Promise<void>
    saveTrip: (trip: TripData) => Promise<TripData | null>
    deleteTrip: (tripId: string) => Promise<boolean>
    migrateMigrationFromLocalStorage: () => Promise<boolean>
  }
}