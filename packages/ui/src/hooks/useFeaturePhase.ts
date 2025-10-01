/**
 * useFeaturePhase Hook - Feature Phase Management
 * Combines user subscription tier with phase control for feature access
 */

import { useState, useEffect, useMemo } from 'react';
import { phaseControl, UserTier, DevelopmentPhase, FeatureAccess, FEATURE_ACCESS_MATRIX } from '../../../app/src/lib/phase-control';

interface UseFeaturePhaseReturn {
  // Feature availability
  isFeatureAvailable: (feature: string) => boolean;
  getAvailableFeatures: () => string[];
  getComingSoonFeatures: () => FeatureAccess[];

  // Phase information
  currentPhase: DevelopmentPhase;
  currentPhaseInfo: {
    phase: DevelopmentPhase;
    phaseName: string;
    description: string;
    nextPhaseDate?: Date;
  };

  // User tier management
  userTier: UserTier;
  setUserTier: (tier: UserTier) => void;

  // Upgrade helpers
  getRequiredTierForFeature: (feature: string) => UserTier | null;
  canUserAccessFeature: (feature: string) => {
    hasAccess: boolean;
    reason: 'available' | 'wrong_tier' | 'wrong_phase' | 'not_revealed' | 'unknown_feature';
    requiredTier?: UserTier;
    availableDate?: Date;
  };
}

/**
 * Hook for managing feature access based on user tier and development phase
 */
export function useFeaturePhase(initialUserTier: UserTier = UserTier.FREE): UseFeaturePhaseReturn {
  const [userTier, setUserTier] = useState<UserTier>(initialUserTier);

  // Memoized phase information
  const currentPhaseInfo = useMemo(() => {
    return phaseControl.getCurrentPhaseInfo();
  }, []);

  // Feature availability checker
  const isFeatureAvailable = useMemo(() => {
    return (feature: string) => phaseControl.isFeatureAvailable(feature, userTier);
  }, [userTier]);

  // Get all available features for current user
  const getAvailableFeatures = useMemo(() => {
    return () => phaseControl.getAvailableFeatures(userTier);
  }, [userTier]);

  // Get coming soon features
  const getComingSoonFeatures = useMemo(() => {
    return () => phaseControl.getComingSoonFeatures(userTier);
  }, [userTier]);

  // Get required tier for a specific feature
  const getRequiredTierForFeature = (feature: string): UserTier | null => {
    const featureMatrix = FEATURE_ACCESS_MATRIX || [];
    const featureConfig = featureMatrix.find((f: any) => f.feature === feature);

    if (!featureConfig) return null;

    // Return the lowest tier that has access to this feature
    const tiers = featureConfig.userTiers;
    if (tiers.includes(UserTier.FREE)) return UserTier.FREE;
    if (tiers.includes(UserTier.LIFETIME)) return UserTier.LIFETIME;
    if (tiers.includes(UserTier.ANNUAL)) return UserTier.ANNUAL;

    return null;
  };

  // Comprehensive feature access analysis
  const canUserAccessFeature = (feature: string) => {
    const featureMatrix = FEATURE_ACCESS_MATRIX || [];
    const featureConfig = featureMatrix.find((f: any) => f.feature === feature);

    if (!featureConfig) {
      return {
        hasAccess: false,
        reason: 'unknown_feature' as const
      };
    }

    // Check if user tier has access
    if (!featureConfig.userTiers.includes(userTier)) {
      return {
        hasAccess: false,
        reason: 'wrong_tier' as const,
        requiredTier: getRequiredTierForFeature(feature) || UserTier.LIFETIME
      };
    }

    // Check if we're in the right phase
    if (currentPhaseInfo.phase < featureConfig.phase) {
      return {
        hasAccess: false,
        reason: 'wrong_phase' as const,
        availableDate: featureConfig.revealDate
      };
    }

    // Check if reveal date has passed
    if (featureConfig.revealDate && new Date() < featureConfig.revealDate) {
      return {
        hasAccess: false,
        reason: 'not_revealed' as const,
        availableDate: featureConfig.revealDate
      };
    }

    return {
      hasAccess: true,
      reason: 'available' as const
    };
  };

  return {
    // Feature availability
    isFeatureAvailable,
    getAvailableFeatures,
    getComingSoonFeatures,

    // Phase information
    currentPhase: currentPhaseInfo.phase,
    currentPhaseInfo,

    // User tier management
    userTier,
    setUserTier,

    // Upgrade helpers
    getRequiredTierForFeature,
    canUserAccessFeature
  };
}

/**
 * Hook specifically for checking if a single feature is available
 */
export function useFeatureAvailable(feature: string, userTier: UserTier): boolean {
  return useMemo(() => {
    return phaseControl.isFeatureAvailable(feature, userTier);
  }, [feature, userTier]);
}

/**
 * Hook for getting upgrade recommendations
 */
export function useUpgradeRecommendations(userTier: UserTier) {
  const { getComingSoonFeatures, canUserAccessFeature } = useFeaturePhase(userTier);

  const recommendations = useMemo(() => {
    const comingSoon = getComingSoonFeatures();
    const upgradeWorthyFeatures = [
      'family_tracking_4_members',
      'ees_preparation_hub',
      'sms_alerts',
      'enterprise_dashboard'
    ];

    return upgradeWorthyFeatures.map(feature => {
      const accessInfo = canUserAccessFeature(feature);
      return {
        feature,
        ...accessInfo,
        isUpgradeWorthy: true
      };
    }).filter(rec => !rec.hasAccess);
  }, [userTier, getComingSoonFeatures, canUserAccessFeature]);

  return {
    recommendations,
    hasUpgradeOpportunities: recommendations.length > 0,
    tierUpgradeValue: userTier === UserTier.FREE ? UserTier.LIFETIME : UserTier.ANNUAL
  };
}

/**
 * Hook for phase-aware navigation
 */
export function usePhaseNavigation() {
  const { currentPhase, getAvailableFeatures } = useFeaturePhase();

  const navigationItems = useMemo(() => {
    const baseItems = [
      { path: '/', label: 'Calculator', feature: 'basic_schengen_calculator' },
      { path: '/guide', label: 'Guide', feature: 'basic_schengen_calculator' }
    ];

    const phaseItems = [
      // Phase 2 items
      { path: '/family', label: 'Family Tracking', feature: 'family_tracking_4_members' },
      { path: '/ees', label: 'EES Preparation', feature: 'ees_preparation_hub' },
      { path: '/countries', label: 'Country Guides', feature: 'country_specific_guides' },

      // Phase 3 items
      { path: '/etias', label: 'ETIAS', feature: 'etias_guidance_hub' },
      { path: '/business', label: 'Business', feature: 'enterprise_dashboard' },
      { path: '/api', label: 'API', feature: 'api_access' }
    ];

    return [...baseItems, ...phaseItems.filter(item =>
      phaseControl.isFeatureAvailable(item.feature, UserTier.FREE) // Check minimum access
    )];
  }, [currentPhase]);

  return {
    navigationItems,
    currentPhase
  };
}

/**
 * Development helper for phase testing
 */
export function usePhaseDebug() {
  const [debugMode, setDebugMode] = useState(false);

  const forcePhase = (phase: DevelopmentPhase) => {
    if (debugMode) {
      phaseControl.setCurrentPhase(phase);
    }
  };

  const forceRevealFeature = (feature: string) => {
    if (debugMode) {
      phaseControl.forceRevealFeature(feature);
    }
  };

  // Only enable in development
  useEffect(() => {
    setDebugMode(process.env.NODE_ENV === 'development');
  }, []);

  return {
    debugMode,
    forcePhase,
    forceRevealFeature,
    phaseControl: debugMode ? phaseControl : null
  };
}