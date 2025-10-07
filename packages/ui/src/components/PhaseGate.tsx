/**
 * PhaseGate Component - Feature Visibility Controller
 * Wraps features to control visibility based on Trojan Horse strategy
 */

import React from 'react';
import { phaseControl, UserTier } from '../../../app/src/lib/phase-control';

interface PhaseGateProps {
  feature: string;
  userTier: UserTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showComingSoon?: boolean;
  comingSoonMessage?: string;
}

/**
 * PhaseGate - Controls feature visibility based on phase and user tier
 * Essential for Trojan Horse strategy execution
 */
export function PhaseGate({
  feature,
  userTier,
  children,
  fallback = null,
  showComingSoon = false,
  comingSoonMessage
}: PhaseGateProps) {
  const isAvailable = phaseControl.isFeatureAvailable(feature, userTier);

  // Feature is available - show it
  if (isAvailable) {
    return <>{children}</>;
  }

  // Feature not available - check if we should show coming soon
  if (showComingSoon) {
    const comingSoonFeatures = phaseControl.getComingSoonFeatures(userTier);
    const upcomingFeature = comingSoonFeatures.find(f => f.feature === feature);

    if (upcomingFeature) {
      return (
        <div className="phase-gate-coming-soon">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-sm font-medium text-blue-900">
                Coming Soon
              </h3>
            </div>
            <p className="mt-1 text-sm text-blue-700">
              {comingSoonMessage || upcomingFeature.description}
            </p>
            {upcomingFeature.revealDate && (
              <p className="mt-2 text-xs text-blue-600">
                Expected: {upcomingFeature.revealDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      );
    }
  }

  // Feature not available and no coming soon - show fallback or nothing
  return <>{fallback}</>;
}

/**
 * UpgradePrompt - Encourages users to upgrade for premium features
 */
interface UpgradePromptProps {
  feature: string;
  title: string;
  description: string;
  requiredTier: UserTier;
  className?: string;
}

export function UpgradePrompt({
  feature,
  title,
  description,
  requiredTier,
  className = ""
}: UpgradePromptProps) {
  const tierNames = {
    [UserTier.FREE]: 'Free',
    [UserTier.LIFETIME]: 'Lifetime',
    [UserTier.ANNUAL]: 'Annual'
  };

  const tierPricing = {
    [UserTier.LIFETIME]: '£5.99 one-time',
    [UserTier.ANNUAL]: '£2.99/year'
  };

  return (
    <div className={`phase-gate-upgrade-prompt ${className}`}>
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-amber-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-amber-700">
              {description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-amber-600">
                Requires {tierNames[requiredTier]} plan
              </span>
              {requiredTier !== UserTier.FREE && (
                <button className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-full transition-colors">
                  Upgrade {tierPricing[requiredTier]}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FeaturePreview - Shows preview of hidden features
 */
interface FeaturePreviewProps {
  feature: string;
  title: string;
  description: string;
  previewImage?: string;
  comingSoonDate?: Date;
  className?: string;
}

export function FeaturePreview({
  feature,
  title,
  description,
  previewImage,
  comingSoonDate,
  className = ""
}: FeaturePreviewProps) {
  return (
    <div className={`phase-gate-feature-preview ${className}`}>
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg overflow-hidden">
        {previewImage && (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <img
              src={previewImage}
              alt={`${title} preview`}
              className="max-w-full max-h-full object-contain opacity-60"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {description}
          </p>
          {comingSoonDate && (
            <div className="mt-3 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-600">
                Coming in {comingSoonDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * PhaseIndicator - Shows current development phase
 */
export function PhaseIndicator() {
  const phaseInfo = phaseControl.getCurrentPhaseInfo();

  const phaseColors = {
    1: 'bg-green-100 text-green-800 border-green-200',
    2: 'bg-blue-100 text-blue-800 border-blue-200',
    3: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <div className="phase-indicator">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${phaseColors[phaseInfo.phase]}`}>
        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
        Phase {phaseInfo.phase}: {phaseInfo.phaseName}
      </div>
    </div>
  );
}

/**
 * Hook for using phase control in functional components
 */
export function usePhaseControl() {
  return {
    isFeatureAvailable: phaseControl.isFeatureAvailable.bind(phaseControl),
    getAvailableFeatures: phaseControl.getAvailableFeatures.bind(phaseControl),
    getComingSoonFeatures: phaseControl.getComingSoonFeatures.bind(phaseControl),
    getCurrentPhaseInfo: phaseControl.getCurrentPhaseInfo.bind(phaseControl)
  };
}