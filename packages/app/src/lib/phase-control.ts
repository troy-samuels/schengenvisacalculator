/**
 * Phase Control System - Trojan Horse Feature Revelation
 * Controls systematic unveiling of advanced features according to strategy
 */

export enum DevelopmentPhase {
  PHASE_1 = 1, // Trojan Horse Entry (Months 1-3)
  PHASE_2 = 2, // Competitive Differentiation (Months 4-6)
  PHASE_3 = 3  // Market Domination (Months 7-12)
}

export enum UserTier {
  FREE = 'free',
  LIFETIME = 'lifetime',
  ANNUAL = 'annual'
}

export interface FeatureAccess {
  feature: string;
  phase: DevelopmentPhase;
  userTiers: UserTier[];
  revealDate?: Date;
  description: string;
}

/**
 * Feature Access Control Matrix
 * Defines what features are available in each phase and tier
 */
export const FEATURE_ACCESS_MATRIX: FeatureAccess[] = [
  // Phase 1: Trojan Horse Entry - Simple, Proven Features
  {
    feature: 'basic_schengen_calculator',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.FREE, UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Core 90/180 day calculation engine'
  },
  {
    feature: 'date_overlap_prevention',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.FREE, UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Visual indicators preventing scheduling conflicts'
  },
  {
    feature: 'trip_limit_5',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.FREE],
    description: 'Maximum 5 trips for free users'
  },
  {
    feature: 'unlimited_trips',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Unlimited trip tracking for premium users'
  },
  {
    feature: 'screenshot_export',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.FREE, UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Export compliance screenshots'
  },
  {
    feature: 'email_alerts',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Email notifications for compliance deadlines'
  },
  {
    feature: 'pdf_reports',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Professional PDF compliance reports'
  },
  {
    feature: 'ad_free_experience',
    phase: DevelopmentPhase.PHASE_1,
    userTiers: [UserTier.LIFETIME, UserTier.ANNUAL],
    description: 'Clean interface without advertisements'
  },

  // Phase 2: Competitive Differentiation - Unique Advantages
  {
    feature: 'family_tracking_4_members',
    phase: DevelopmentPhase.PHASE_2,
    userTiers: [UserTier.LIFETIME, UserTier.ANNUAL],
    revealDate: new Date('2025-04-01'), // Month 4 reveal
    description: 'Industry-first family coordination system'
  },
  {
    feature: 'ees_preparation_hub',
    phase: DevelopmentPhase.PHASE_2,
    userTiers: [UserTier.FREE, UserTier.LIFETIME, UserTier.ANNUAL],
    revealDate: new Date('2025-05-01'), // Month 5 reveal
    description: 'Complete EES biometric preparation guidance'
  },
  {
    feature: 'mobile_pwa_features',
    phase: DevelopmentPhase.PHASE_2,
    userTiers: [UserTier.LIFETIME, UserTier.ANNUAL],
    revealDate: new Date('2025-05-15'), // Month 5.5 reveal
    description: 'Advanced PWA capabilities showcase'
  },
  {
    feature: 'country_specific_guides',
    phase: DevelopmentPhase.PHASE_2,
    userTiers: [UserTier.FREE, UserTier.LIFETIME, UserTier.ANNUAL],
    revealDate: new Date('2025-06-01'), // Month 6 reveal
    description: '27 individual EU country compliance guides'
  },

  // Phase 3: Market Domination - Full Authority Platform
  {
    feature: 'etias_guidance_hub',
    phase: DevelopmentPhase.PHASE_3,
    userTiers: [UserTier.FREE, UserTier.LIFETIME, UserTier.ANNUAL],
    revealDate: new Date('2025-07-01'), // Month 7 reveal
    description: 'Complete ETIAS authorization support'
  },
  {
    feature: 'sms_alerts',
    phase: DevelopmentPhase.PHASE_3,
    userTiers: [UserTier.ANNUAL],
    revealDate: new Date('2025-07-01'), // Month 7 reveal
    description: 'SMS notifications for critical compliance updates'
  },
  {
    feature: 'enterprise_dashboard',
    phase: DevelopmentPhase.PHASE_3,
    userTiers: [UserTier.ANNUAL],
    revealDate: new Date('2025-08-01'), // Month 8 reveal
    description: 'Corporate compliance management dashboard'
  },
  {
    feature: 'api_access',
    phase: DevelopmentPhase.PHASE_3,
    userTiers: [UserTier.ANNUAL],
    revealDate: new Date('2025-09-01'), // Month 9 reveal
    description: 'API integration for enterprise systems'
  },
  {
    feature: 'regulatory_updates_realtime',
    phase: DevelopmentPhase.PHASE_3,
    userTiers: [UserTier.ANNUAL],
    revealDate: new Date('2025-10-01'), // Month 10 reveal
    description: 'Real-time EU border regulation updates'
  }
];

/**
 * Phase Control Service
 * Manages feature visibility and phase progression
 */
export class PhaseControlService {
  private currentPhase: DevelopmentPhase;
  private currentDate: Date;

  constructor(currentPhase?: DevelopmentPhase, currentDate?: Date) {
    this.currentPhase = currentPhase || this.calculateCurrentPhase();
    this.currentDate = currentDate || new Date();
  }

  /**
   * Calculate current phase based on date and environment
   */
  private calculateCurrentPhase(): DevelopmentPhase {
    const phaseStartDate = new Date('2025-01-01'); // Platform launch date
    const currentDate = new Date();
    const monthsSinceStart = Math.floor(
      (currentDate.getTime() - phaseStartDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    if (monthsSinceStart < 3) {
      return DevelopmentPhase.PHASE_1;
    } else if (monthsSinceStart < 6) {
      return DevelopmentPhase.PHASE_2;
    } else {
      return DevelopmentPhase.PHASE_3;
    }
  }

  /**
   * Check if a feature is available for a user
   */
  public isFeatureAvailable(
    featureName: string,
    userTier: UserTier,
    overrideDate?: Date
  ): boolean {
    const feature = FEATURE_ACCESS_MATRIX.find(f => f.feature === featureName);
    if (!feature) {
      console.warn(`[PhaseControl] Unknown feature: ${featureName}`);
      return false;
    }

    // Check if user tier has access to this feature
    if (!feature.userTiers.includes(userTier)) {
      return false;
    }

    // Check if we're in the right phase
    if (this.currentPhase < feature.phase) {
      return false;
    }

    // Check if reveal date has passed (if specified)
    if (feature.revealDate) {
      const checkDate = overrideDate || this.currentDate;
      if (checkDate < feature.revealDate) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get all available features for a user
   */
  public getAvailableFeatures(userTier: UserTier): string[] {
    return FEATURE_ACCESS_MATRIX
      .filter(feature => this.isFeatureAvailable(feature.feature, userTier))
      .map(feature => feature.feature);
  }

  /**
   * Get features coming soon for a user
   */
  public getComingSoonFeatures(userTier: UserTier): FeatureAccess[] {
    return FEATURE_ACCESS_MATRIX
      .filter(feature => {
        return feature.userTiers.includes(userTier) &&
               !this.isFeatureAvailable(feature.feature, userTier);
      })
      .sort((a, b) => {
        if (!a.revealDate && !b.revealDate) return 0;
        if (!a.revealDate) return 1;
        if (!b.revealDate) return -1;
        return a.revealDate.getTime() - b.revealDate.getTime();
      });
  }

  /**
   * Get current phase information
   */
  public getCurrentPhaseInfo(): {
    phase: DevelopmentPhase;
    phaseName: string;
    description: string;
    nextPhaseDate?: Date;
  } {
    const phaseInfo = {
      [DevelopmentPhase.PHASE_1]: {
        phaseName: 'Trojan Horse Entry',
        description: 'Focus on core Schengen calculator excellence',
        nextPhaseDate: new Date('2025-04-01')
      },
      [DevelopmentPhase.PHASE_2]: {
        phaseName: 'Competitive Differentiation',
        description: 'Revealing unique family and EES advantages',
        nextPhaseDate: new Date('2025-07-01')
      },
      [DevelopmentPhase.PHASE_3]: {
        phaseName: 'Market Domination',
        description: 'Complete EU Border Authority platform',
        nextPhaseDate: undefined
      }
    };

    return {
      phase: this.currentPhase,
      ...phaseInfo[this.currentPhase]
    };
  }

  /**
   * Force reveal a feature (for testing/admin)
   */
  public forceRevealFeature(featureName: string): void {
    const feature = FEATURE_ACCESS_MATRIX.find(f => f.feature === featureName);
    if (feature && feature.revealDate) {
      feature.revealDate = new Date(); // Set to now
    }
  }

  /**
   * Set current phase (for testing/admin)
   */
  public setCurrentPhase(phase: DevelopmentPhase): void {
    this.currentPhase = phase;
  }
}

/**
 * Default instance for application use
 */
export const phaseControl = new PhaseControlService();

/**
 * Environment-based phase override
 */
export function getPhaseFromEnvironment(): DevelopmentPhase {
  const envPhase = process.env.NEXT_PUBLIC_CURRENT_PHASE;
  if (envPhase) {
    const phase = parseInt(envPhase);
    if (phase >= 1 && phase <= 3) {
      return phase as DevelopmentPhase;
    }
  }
  return DevelopmentPhase.PHASE_1; // Default to Phase 1
}

/**
 * Feature flag helper for React components
 */
export function usePhaseGate(featureName: string, userTier: UserTier): boolean {
  return phaseControl.isFeatureAvailable(featureName, userTier);
}