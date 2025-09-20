/**
 * Schengen Compliance User Status System - 3-Tier Implementation
 * Part of compliance-first strategy defined in CLAUDE.md
 */

import { User } from '@supabase/supabase-js'
import { Database } from './database'

// Focused User Status Tiers (Compliance-First)
export enum UserStatus {
  FREE = 'free',                // 5 trip limit, basic calculator
  LIFETIME = 'lifetime',        // £4.99 one-time, family tracking + alerts
  ANNUAL = 'annual'             // £2.99/year, SMS alerts + priority support
}

// User profile from database
export type UserProfile = Database['public']['Tables']['profiles']['Row']

// Trip Data interface for type consistency
export interface TripData {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  entry_type?: 'schengen' | 'non_schengen'
  notes?: string
}

// Extended user context with B2C status and trip management
export interface UserContext {
  // Authentication state
  user: User | null
  userProfile: UserProfile | null
  loading: boolean

  // B2C user status
  userStatus: UserStatus

  // Feature access
  canAddTrips: boolean
  hasUnlimitedTrips: boolean
  showDisplayAds: boolean
  hasAffiliateAccess: boolean
  hasPremiumFeatures: boolean

  // Trip limitations
  tripCount: number
  tripLimit: number | null

  // Authentication methods
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>

  // Conversion methods
  upgradeToFreeAccount: () => Promise<void>
  upgradeToPremium: () => Promise<void>

  // Trip management (database persistence)
  userTrips: TripData[]
  tripsLoading: boolean
  tripsError: string | null
  loadUserTrips: () => Promise<void>
  saveTrip: (trip: TripData) => Promise<TripData | null>
  deleteTrip: (tripId: string) => Promise<boolean>
  migrateMigrationFromLocalStorage: () => Promise<boolean>

  // Optional helper method (only available for anonymous users)
  incrementAnonymousTripCount?: () => void
}

// Compliance-First Feature Access Control
export const COMPLIANCE_FEATURES = {
  [UserStatus.FREE]: {
    tripLimit: 5,
    familyMembers: 1,
    emailAlerts: false,
    smsAlerts: false,
    premiumFeatures: false,
    exportFormats: ['screenshot'],
    prioritySupport: false
  },
  [UserStatus.LIFETIME]: {
    tripLimit: null, // Unlimited
    familyMembers: 4, // Core competitive advantage
    emailAlerts: true,
    smsAlerts: false,
    premiumFeatures: true,
    exportFormats: ['screenshot', 'pdf'],
    prioritySupport: false,
    pdfReports: true,
    dateOverlapPrevention: true
  },
  [UserStatus.ANNUAL]: {
    tripLimit: null, // Unlimited
    familyMembers: 4,
    emailAlerts: true,
    smsAlerts: true, // Premium communication
    premiumFeatures: true,
    exportFormats: ['screenshot', 'pdf', 'csv'],
    prioritySupport: true,
    pdfReports: true,
    advancedReports: true,
    regulatoryUpdates: true
  }
} as const

// Helper function to determine user status
export function getUserStatus(user: User | null, userProfile: UserProfile | null): UserStatus {
  if (!user) {
    return UserStatus.FREE
  }

  if (userProfile?.subscription_tier === 'premium' && userProfile?.subscription_status === 'active') {
    return UserStatus.LIFETIME // Map premium tier to lifetime status
  }

  if (userProfile?.subscription_tier === 'pro' && userProfile?.subscription_status === 'active') {
    return UserStatus.ANNUAL // Map pro tier to annual status
  }

  return UserStatus.FREE
}

// Helper function to check feature access
export function hasFeatureAccess(userStatus: UserStatus, feature: string): boolean {
  const features = COMPLIANCE_FEATURES[userStatus] as any
  return Boolean(features[feature])
}

// Helper function to get trip limit
export function getTripLimit(userStatus: UserStatus): number | null {
  return COMPLIANCE_FEATURES[userStatus].tripLimit
}

// Helper function to check if user can add more trips
export function canAddMoreTrips(userStatus: UserStatus, currentTripCount: number): boolean {
  const limit = getTripLimit(userStatus)
  if (limit === null) return true // Unlimited
  return currentTripCount < limit
}

// Helper function to check family member limit
export function getFamilyMemberLimit(userStatus: UserStatus): number {
  return COMPLIANCE_FEATURES[userStatus].familyMembers
}

// Helper function to check if user can add family members
export function canAddFamilyMember(userStatus: UserStatus, currentMemberCount: number): boolean {
  const limit = getFamilyMemberLimit(userStatus)
  return currentMemberCount < limit
}

// Analytics tracking for user status changes
export interface UserStatusEvent {
  event: 'status_change' | 'feature_accessed' | 'upgrade_prompt' | 'conversion'
  userStatus: UserStatus
  previousStatus?: UserStatus
  feature?: string
  metadata?: Record<string, any>
}

export function trackUserStatusEvent(event: UserStatusEvent) {
  // Analytics implementation
  console.log('Compliance User Status Event:', event)

  // In production, send to analytics service
  // analytics.track('compliance_status_event', event)
}