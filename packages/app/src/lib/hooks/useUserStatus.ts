/**
 * B2C User Status Hook - 3-Tier System Implementation
 * Manages Anonymous → Free Account → Premium user progression
 * Part of B2C-first strategy defined in CLAUDE.md
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { User } from '@supabase/supabase-js'
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
      async (event, session) => {
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
        } else {
          setUserProfile(null)
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })
    
    if (error) {
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
    
    // Helper method (not part of interface but useful)
    incrementAnonymousTripCount: userStatus === UserStatus.FREE ? incrementAnonymousTripCount : undefined
  } as UserContext & { incrementAnonymousTripCount?: () => void }
}