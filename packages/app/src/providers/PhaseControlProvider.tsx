'use client'

/**
 * Phase Control Provider - Trojan Horse Strategy Implementation
 * Wraps the entire application to ensure phase-based feature control
 */

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  PhaseControlService,
  DevelopmentPhase,
  UserTier,
  getPhaseFromEnvironment
} from '../lib/phase-control'
import { getUserStatus } from '../lib/types/user-status'
import { User } from '@supabase/supabase-js'
import { Database } from '../lib/types/database'

type UserProfile = Database['public']['Tables']['profiles']['Row']

interface PhaseControlContextType {
  phaseControl: PhaseControlService
  currentPhase: DevelopmentPhase
  isFeatureAvailable: (feature: string, userTier: UserTier) => boolean
  getAvailableFeatures: (userTier: UserTier) => string[]
  getComingSoonFeatures: (userTier: UserTier) => any[]
  updateUserContext: (user: User | null, userProfile: UserProfile | null) => void
}

const PhaseControlContext = createContext<PhaseControlContextType | undefined>(undefined)

interface PhaseControlProviderProps {
  children: React.ReactNode
}

export function PhaseControlProvider({ children }: PhaseControlProviderProps) {
  const [phaseControl] = useState(() => {
    // Initialize phase control with environment settings
    const currentPhase = getPhaseFromEnvironment()
    const service = new PhaseControlService(currentPhase)

    // Log phase initialization for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PhaseControl] Initialized with Phase ${currentPhase}`)
      console.log(`[PhaseControl] Environment phase override:`, process.env.NEXT_PUBLIC_CURRENT_PHASE)
    }

    return service
  })

  const [currentPhase, setCurrentPhase] = useState<DevelopmentPhase>(() =>
    getPhaseFromEnvironment()
  )

  // Update phase when environment changes (mainly for development/testing)
  useEffect(() => {
    const envPhase = getPhaseFromEnvironment()
    if (envPhase !== currentPhase) {
      setCurrentPhase(envPhase)
      phaseControl.setCurrentPhase(envPhase)

      if (process.env.NODE_ENV === 'development') {
        console.log(`[PhaseControl] Phase updated to ${envPhase}`)
      }
    }
  }, [currentPhase, phaseControl])

  const isFeatureAvailable = (feature: string, userTier: UserTier): boolean => {
    return phaseControl.isFeatureAvailable(feature, userTier)
  }

  const getAvailableFeatures = (userTier: UserTier): string[] => {
    return phaseControl.getAvailableFeatures(userTier)
  }

  const getComingSoonFeatures = (userTier: UserTier) => {
    return phaseControl.getComingSoonFeatures(userTier)
  }

  const updateUserContext = (user: User | null, userProfile: UserProfile | null) => {
    const userStatus = getUserStatus(user, userProfile)
    const userTier = userStatusToTier(userStatus)

    if (process.env.NODE_ENV === 'development') {
      console.log(`[PhaseControl] User context updated:`, {
        user: user?.email || 'anonymous',
        userTier,
        availableFeatures: getAvailableFeatures(userTier).length,
        comingSoonFeatures: getComingSoonFeatures(userTier).length
      })
    }
  }

  const contextValue: PhaseControlContextType = {
    phaseControl,
    currentPhase,
    isFeatureAvailable,
    getAvailableFeatures,
    getComingSoonFeatures,
    updateUserContext
  }

  return (
    <PhaseControlContext.Provider value={contextValue}>
      {children}
    </PhaseControlContext.Provider>
  )
}

/**
 * Hook to use Phase Control context
 */
export function usePhaseControl() {
  const context = useContext(PhaseControlContext)
  if (context === undefined) {
    throw new Error('usePhaseControl must be used within a PhaseControlProvider')
  }
  return context
}

/**
 * Helper function to convert UserStatus to UserTier
 */
function userStatusToTier(userStatus: string): UserTier {
  switch (userStatus) {
    case 'lifetime':
      return UserTier.LIFETIME
    case 'annual':
      return UserTier.ANNUAL
    default:
      return UserTier.FREE
  }
}

/**
 * Hook for checking if a specific feature is available for current user
 */
export function useFeatureAvailability(feature: string, userTier: UserTier) {
  const { isFeatureAvailable } = usePhaseControl()
  return isFeatureAvailable(feature, userTier)
}

/**
 * Hook for getting phase-aware navigation items
 */
export function usePhaseAwareNavigation(userTier: UserTier) {
  const { getAvailableFeatures, currentPhase } = usePhaseControl()
  const availableFeatures = getAvailableFeatures(userTier)

  const navigationItems = [
    { path: '/', label: 'Calculator', feature: 'basic_schengen_calculator' },
    { path: '/guide', label: 'Guide', feature: 'basic_schengen_calculator' }
  ]

  // Phase 2+ items (systematically revealed)
  if (availableFeatures.includes('family_tracking_4_members')) {
    navigationItems.push({ path: '/family', label: 'Family Tracking', feature: 'family_tracking_4_members' })
  }

  if (availableFeatures.includes('ees_preparation_hub')) {
    navigationItems.push({ path: '/ees', label: 'EES Preparation', feature: 'ees_preparation_hub' })
  }

  if (availableFeatures.includes('country_specific_guides')) {
    navigationItems.push({ path: '/countries', label: 'Country Guides', feature: 'country_specific_guides' })
  }

  // Phase 3+ items
  if (availableFeatures.includes('etias_guidance_hub')) {
    navigationItems.push({ path: '/etias', label: 'ETIAS', feature: 'etias_guidance_hub' })
  }

  if (availableFeatures.includes('enterprise_dashboard')) {
    navigationItems.push({ path: '/business', label: 'Business', feature: 'enterprise_dashboard' })
  }

  if (availableFeatures.includes('api_access')) {
    navigationItems.push({ path: '/api', label: 'API', feature: 'api_access' })
  }

  return {
    navigationItems,
    currentPhase,
    availableFeatures
  }
}