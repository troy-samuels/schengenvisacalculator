/**
 * Trojan Horse Layout Component
 * Main application layout that implements phase-based feature revelation
 */

import React, { useState } from 'react';
import { PhaseGate, PhaseIndicator } from '../../../../ui/src/components/PhaseGate';
import { PhaseAwareNavigation, MobilePhaseNavigation } from '../../../../ui/src/components/PhaseAwareNavigation';
import { useFeaturePhase, useUpgradeRecommendations } from '../../../../ui/src/hooks/useFeaturePhase';
import { UserTier } from '../../lib/phase-control';

interface TrojanHorseLayoutProps {
  children: React.ReactNode;
  userTier: UserTier;
  currentPath?: string;
}

export function TrojanHorseLayout({
  children,
  userTier,
  currentPath = '/'
}: TrojanHorseLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPhaseInfo, isFeatureAvailable } = useFeaturePhase(userTier);
  const { recommendations, hasUpgradeOpportunities } = useUpgradeRecommendations(userTier);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Branding */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  EU Border Authority
                </h1>
              </div>

              {/* Phase Indicator (Development) */}
              {process.env.NODE_ENV === 'development' && (
                <PhaseIndicator />
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <DesktopNavItems userTier={userTier} currentPath={currentPath} />
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
              <div className="flex-grow px-3">
                <PhaseAwareNavigation
                  userTier={userTier}
                  currentPath={currentPath}
                />
              </div>

              {/* Upgrade Prompts */}
              {hasUpgradeOpportunities && (
                <div className="px-3 mt-6">
                  <UpgradePrompt
                    userTier={userTier}
                    recommendations={recommendations}
                  />
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative overflow-y-auto focus:outline-none">
            {/* Trojan Horse Content Area */}
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Phase-specific content warnings/promotions */}
                <PhaseContentHeader
                  userTier={userTier}
                  currentPath={currentPath}
                  currentPhase={currentPhaseInfo.phase}
                />

                {/* Main content with phase gates */}
                <div className="space-y-6">
                  {children}
                </div>

                {/* Coming Soon Features Preview */}
                <ComingSoonSection userTier={userTier} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobilePhaseNavigation
        userTier={userTier}
        currentPath={currentPath}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}

/**
 * Desktop Navigation Items
 */
function DesktopNavItems({ userTier, currentPath }: { userTier: UserTier; currentPath: string }) {
  const { isFeatureAvailable } = useFeaturePhase(userTier);

  const navItems = [
    { label: 'Calculator', href: '/', feature: 'basic_schengen_calculator' },
    { label: 'Guide', href: '/guide', feature: 'basic_schengen_calculator' }
  ];

  // Phase 2+ items
  if (isFeatureAvailable('family_tracking_4_members')) {
    navItems.push({ label: 'Family', href: '/family', feature: 'family_tracking_4_members' });
  }

  if (isFeatureAvailable('ees_preparation_hub')) {
    navItems.push({ label: 'EES', href: '/ees', feature: 'ees_preparation_hub' });
  }

  // Phase 3+ items
  if (isFeatureAvailable('etias_guidance_hub')) {
    navItems.push({ label: 'ETIAS', href: '/etias', feature: 'etias_guidance_hub' });
  }

  return (
    <>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPath === item.href
              ? 'bg-blue-100 text-blue-900'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}

/**
 * Phase-specific content header
 */
function PhaseContentHeader({
  userTier,
  currentPath,
  currentPhase
}: {
  userTier: UserTier;
  currentPath: string;
  currentPhase: number;
}) {
  // Phase 1: Focus on calculator excellence
  if (currentPhase === 1 && currentPath === '/') {
    return (
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-lg font-semibold text-green-900 mb-2">
          🧮 The Most Accurate Schengen Calculator
        </h2>
        <p className="text-green-800">
          Calculate your 90/180 day compliance with mathematical precision.
          Trusted by thousands of travelers for accurate EU border compliance.
        </p>
      </div>
    );
  }

  // Phase 2: Introduce family features
  if (currentPhase === 2 && currentPath === '/family') {
    return (
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          👨‍👩‍👧‍👦 Industry-First Family Coordination
        </h2>
        <p className="text-blue-800">
          Track up to 4 family members' compliance in one place.
          The only platform designed for families traveling together.
        </p>
      </div>
    );
  }

  return null;
}

/**
 * Upgrade Prompt Component
 */
function UpgradePrompt({
  userTier,
  recommendations
}: {
  userTier: UserTier;
  recommendations: any[];
}) {
  if (userTier !== UserTier.FREE || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-amber-900 mb-2">
        🚀 Unlock Premium Features
      </h3>
      <p className="text-xs text-amber-700 mb-3">
        Get family tracking, unlimited trips, and professional reports.
      </p>
      <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-medium py-2 px-3 rounded transition-colors">
        Upgrade for £5.99 (One-time)
      </button>
    </div>
  );
}

/**
 * Coming Soon Features Section
 */
function ComingSoonSection({ userTier }: { userTier: UserTier }) {
  const { getComingSoonFeatures } = useFeaturePhase(userTier);
  const comingSoonFeatures = getComingSoonFeatures();

  if (comingSoonFeatures.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 bg-gray-100 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        🔮 Coming Soon to EU Border Authority
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comingSoonFeatures.slice(0, 3).map((feature, index) => (
          <div key={feature.feature} className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">
              {getFeatureDisplayName(feature.feature)}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {feature.description}
            </p>
            {feature.revealDate && (
              <p className="text-xs text-blue-600">
                Expected: {feature.revealDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Helper function to get display names for features
 */
function getFeatureDisplayName(feature: string): string {
  const displayNames: Record<string, string> = {
    'family_tracking_4_members': 'Family Coordination',
    'ees_preparation_hub': 'EES Preparation Center',
    'country_specific_guides': '27 Country Guides',
    'etias_guidance_hub': 'ETIAS Authorization Hub',
    'enterprise_dashboard': 'Business Dashboard',
    'api_access': 'API Integration'
  };

  return displayNames[feature] || feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}