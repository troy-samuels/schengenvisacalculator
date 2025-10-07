/**
 * Phase-Aware Navigation Component
 * Systematically reveals navigation items according to Trojan Horse strategy
 */

import React from 'react';
import { PhaseGate, usePhaseControl } from './PhaseGate';
import { UserTier } from '../../../app/src/lib/phase-control';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  feature: string;
  description: string;
  icon: React.ReactNode;
  tier: UserTier;
}

interface PhaseAwareNavigationProps {
  userTier: UserTier;
  currentPath?: string;
  onNavigate?: (href: string) => void;
}

/**
 * Navigation items with phase-based visibility
 */
const NAVIGATION_ITEMS: NavigationItem[] = [
  // Phase 1: Core Schengen Features (Always Visible)
  {
    id: 'calculator',
    label: 'Schengen Calculator',
    href: '/',
    feature: 'basic_schengen_calculator',
    description: 'Calculate your 90/180 day compliance',
    tier: UserTier.FREE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'guide',
    label: 'Compliance Guide',
    href: '/guide',
    feature: 'basic_schengen_calculator',
    description: 'Learn Schengen regulations',
    tier: UserTier.FREE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },

  // Phase 2: Competitive Differentiation (Reveal Month 4-6)
  {
    id: 'family',
    label: 'Family Tracking',
    href: '/family',
    feature: 'family_tracking_4_members',
    description: 'Coordinate up to 4 family members',
    tier: UserTier.LIFETIME,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'ees',
    label: 'EES Preparation',
    href: '/ees',
    feature: 'ees_preparation_hub',
    description: 'EU Entry/Exit System guidance',
    tier: UserTier.FREE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 'countries',
    label: 'Country Guides',
    href: '/countries',
    feature: 'country_specific_guides',
    description: '27 EU country compliance guides',
    tier: UserTier.FREE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },

  // Phase 3: Market Domination (Reveal Month 7+)
  {
    id: 'etias',
    label: 'ETIAS Hub',
    href: '/etias',
    feature: 'etias_guidance_hub',
    description: 'Travel authorization support',
    tier: UserTier.FREE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'business',
    label: 'Business',
    href: '/business',
    feature: 'enterprise_dashboard',
    description: 'Corporate compliance solutions',
    tier: UserTier.ANNUAL,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 'api',
    label: 'API Access',
    href: '/api',
    feature: 'api_access',
    description: 'Integration and automation',
    tier: UserTier.ANNUAL,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
];

export function PhaseAwareNavigation({
  userTier,
  currentPath = '/',
  onNavigate
}: PhaseAwareNavigationProps) {
  const { getCurrentPhaseInfo } = usePhaseControl();
  const phaseInfo = getCurrentPhaseInfo();

  return (
    <nav className="phase-aware-navigation">
      {/* Phase Indicator */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-blue-900">
            {phaseInfo.phaseName}
          </span>
        </div>
        <p className="mt-1 text-xs text-blue-700">
          {phaseInfo.description}
        </p>
      </div>

      {/* Navigation Items */}
      <ul className="space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.id}>
            <PhaseGate
              feature={item.feature}
              userTier={userTier}
              showComingSoon={true}
              comingSoonMessage={`${item.label}: ${item.description}`}
            >
              <NavItem
                item={item}
                isActive={currentPath === item.href}
                isAccessible={userTier === item.tier ||
                  (item.tier === UserTier.FREE) ||
                  (item.tier === UserTier.LIFETIME && userTier === UserTier.ANNUAL)}
                onNavigate={onNavigate}
              />
            </PhaseGate>
          </li>
        ))}
      </ul>

      {/* Coming Soon Features Preview */}
      <ComingSoonPreview userTier={userTier} />
    </nav>
  );
}

/**
 * Individual Navigation Item Component
 */
interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
  isAccessible: boolean;
  onNavigate?: (href: string) => void;
}

function NavItem({ item, isActive, isAccessible, onNavigate }: NavItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(item.href);
    }
  };

  const baseClasses = "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors";
  const activeClasses = isActive
    ? "bg-blue-100 text-blue-900 border border-blue-200"
    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
  const accessibleClasses = isAccessible
    ? "cursor-pointer"
    : "opacity-60 cursor-not-allowed";

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`${baseClasses} ${activeClasses} ${accessibleClasses}`}
      title={item.description}
    >
      <span className="mr-3">{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {!isAccessible && item.tier !== UserTier.FREE && (
        <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
          {item.tier === UserTier.LIFETIME ? '£5.99' : '£2.99/yr'}
        </span>
      )}
    </a>
  );
}

/**
 * Coming Soon Features Preview
 */
interface ComingSoonPreviewProps {
  userTier: UserTier;
}

function ComingSoonPreview({ userTier }: ComingSoonPreviewProps) {
  const { getComingSoonFeatures } = usePhaseControl();
  const comingSoonFeatures = getComingSoonFeatures(userTier);

  if (comingSoonFeatures.length === 0) {
    return null;
  }

  const nextFeature = comingSoonFeatures[0];
  const navItem = NAVIGATION_ITEMS.find(item => item.feature === nextFeature.feature);

  if (!navItem) {
    return null;
  }

  return (
    <div className="mt-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-purple-900">
          Coming Next
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-purple-600">{navItem.icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-purple-900">
            {navItem.label}
          </p>
          <p className="text-xs text-purple-700">
            {navItem.description}
          </p>
          {nextFeature.revealDate && (
            <p className="text-xs text-purple-600 mt-1">
              Expected: {nextFeature.revealDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile-friendly navigation component
 */
export function MobilePhaseNavigation({
  userTier,
  currentPath,
  onNavigate,
  isOpen,
  onClose
}: PhaseAwareNavigationProps & {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 -m-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <PhaseAwareNavigation
            userTier={userTier}
            currentPath={currentPath}
            onNavigate={(href) => {
              onNavigate?.(href);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}