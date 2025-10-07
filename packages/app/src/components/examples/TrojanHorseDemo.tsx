/**
 * Trojan Horse Strategy Demo Component
 * Demonstrates how features are systematically hidden and revealed
 */

import React, { useState } from 'react';
import { PhaseGate, UpgradePrompt, FeaturePreview } from '../../../../ui/src/components/PhaseGate';
import { useFeaturePhase } from '../../../../ui/src/hooks/useFeaturePhase';
import { UserTier, DevelopmentPhase } from '../../lib/phase-control';

export function TrojanHorseDemo() {
  const [selectedUserTier, setSelectedUserTier] = useState<UserTier>(UserTier.FREE);
  const { currentPhaseInfo, isFeatureAvailable, getComingSoonFeatures } = useFeaturePhase(selectedUserTier);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Demo Controls */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-yellow-900 mb-4">
          🎭 Trojan Horse Strategy Demo
        </h2>
        <p className="text-yellow-800 mb-4">
          This demo shows how features are systematically hidden and revealed according to our integrated strategy.
          Phase 1 starts simple, Phase 2 reveals competitive advantages, Phase 3 shows full platform.
        </p>

        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-yellow-900">
            User Tier:
          </label>
          <select
            value={selectedUserTier}
            onChange={(e) => setSelectedUserTier(e.target.value as UserTier)}
            className="px-3 py-1 border border-yellow-300 rounded bg-white text-sm"
          >
            <option value={UserTier.FREE}>Free User</option>
            <option value={UserTier.LIFETIME}>Lifetime (£4.99)</option>
            <option value={UserTier.ANNUAL}>Annual (£2.99/year)</option>
          </select>

          <div className="text-sm text-yellow-700">
            Current Phase: {currentPhaseInfo.phase} - {currentPhaseInfo.phaseName}
          </div>
        </div>
      </div>

      {/* Phase 1: Core Features (Always Visible) */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          ✅ Phase 1: Core Schengen Features (Always Visible)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Calculator */}
          <PhaseGate feature="basic_schengen_calculator" userTier={selectedUserTier}>
            <div className="bg-white p-4 rounded border border-green-200">
              <h4 className="font-semibold text-green-900">🧮 Schengen Calculator</h4>
              <p className="text-sm text-green-700 mt-2">
                Ultra-fast 90/180 day calculations with 28.39ms performance.
                The core feature that establishes our technical superiority.
              </p>
              <div className="mt-3 text-xs text-green-600">
                Available: All users | Phase 1+
              </div>
            </div>
          </PhaseGate>

          {/* Date Overlap Prevention */}
          <PhaseGate feature="date_overlap_prevention" userTier={selectedUserTier}>
            <div className="bg-white p-4 rounded border border-green-200">
              <h4 className="font-semibold text-green-900">🚫 Date Overlap Prevention</h4>
              <p className="text-sm text-green-700 mt-2">
                Visual indicators prevent scheduling conflicts.
                Critical for compliance accuracy.
              </p>
              <div className="mt-3 text-xs text-green-600">
                Available: All users | Phase 1+
              </div>
            </div>
          </PhaseGate>
        </div>
      </section>

      {/* Phase 2: Hidden Features (Family Tracking) */}
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          🔒 Phase 2: Competitive Advantages (Hidden Until Month 4)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Family Tracking - Hidden in Phase 1 */}
          <PhaseGate
            feature="family_tracking_4_members"
            userTier={selectedUserTier}
            showComingSoon={true}
            fallback={
              <FeaturePreview
                feature="family_tracking_4_members"
                title="👨‍👩‍👧‍👦 Family Coordination"
                description="Industry-first 4-member family tracking system. Coordinate compliance for entire household."
                comingSoonDate={new Date('2025-04-01')}
              />
            }
          >
            <div className="bg-white p-4 rounded border border-blue-200">
              <h4 className="font-semibold text-blue-900">👨‍👩‍👧‍👦 Family Coordination</h4>
              <p className="text-sm text-blue-700 mt-2">
                Track up to 4 family members' compliance in one integrated system.
                Our unique competitive advantage - no competitor offers this.
              </p>
              <div className="mt-3 text-xs text-blue-600">
                Available: Lifetime/Annual users | Phase 2+ (Month 4)
              </div>
            </div>
          </PhaseGate>

          {/* EES Preparation - Hidden in Phase 1 */}
          <PhaseGate
            feature="ees_preparation_hub"
            userTier={selectedUserTier}
            showComingSoon={true}
            fallback={
              <FeaturePreview
                feature="ees_preparation_hub"
                title="🔒 EES Preparation Hub"
                description="Complete biometric system guidance for October 2025 launch. First-mover advantage content."
                comingSoonDate={new Date('2025-05-01')}
              />
            }
          >
            <div className="bg-white p-4 rounded border border-blue-200">
              <h4 className="font-semibold text-blue-900">🔒 EES Preparation Hub</h4>
              <p className="text-sm text-blue-700 mt-2">
                Complete guidance for EU biometric system launch.
                50K+ monthly search opportunity capture.
              </p>
              <div className="mt-3 text-xs text-blue-600">
                Available: All users | Phase 2+ (Month 5)
              </div>
            </div>
          </PhaseGate>
        </div>
      </section>

      {/* Phase 3: Market Domination Features */}
      <section className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">
          🏆 Phase 3: Market Domination (Hidden Until Month 7)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ETIAS Guidance */}
          <PhaseGate
            feature="etias_guidance_hub"
            userTier={selectedUserTier}
            showComingSoon={true}
            fallback={
              <FeaturePreview
                feature="etias_guidance_hub"
                title="📋 ETIAS Authorization Hub"
                description="Complete travel authorization support. Full EU Border Authority platform revealed."
                comingSoonDate={new Date('2025-07-01')}
              />
            }
          >
            <div className="bg-white p-4 rounded border border-purple-200">
              <h4 className="font-semibold text-purple-900">📋 ETIAS Authorization Hub</h4>
              <p className="text-sm text-purple-700 mt-2">
                Complete travel authorization support.
                Full EU Border Authority platform revealed.
              </p>
              <div className="mt-3 text-xs text-purple-600">
                Available: All users | Phase 3+ (Month 7)
              </div>
            </div>
          </PhaseGate>

          {/* Enterprise Dashboard */}
          <PhaseGate
            feature="enterprise_dashboard"
            userTier={selectedUserTier}
            showComingSoon={true}
            fallback={
              <FeaturePreview
                feature="enterprise_dashboard"
                title="🏢 Enterprise Dashboard"
                description="B2B compliance management for corporate travelers. Revenue diversification."
                comingSoonDate={new Date('2025-08-01')}
              />
            }
          >
            <div className="bg-white p-4 rounded border border-purple-200">
              <h4 className="font-semibold text-purple-900">🏢 Enterprise Dashboard</h4>
              <p className="text-sm text-purple-700 mt-2">
                Corporate compliance management dashboard.
                B2B revenue expansion with superior architecture.
              </p>
              <div className="mt-3 text-xs text-purple-600">
                Available: Annual users | Phase 3+ (Month 8)
              </div>
            </div>
          </PhaseGate>
        </div>
      </section>

      {/* Upgrade Prompts Demo */}
      <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">
          💰 Strategic Upgrade Prompts
        </h3>

        {selectedUserTier === UserTier.FREE && (
          <div className="space-y-4">
            <UpgradePrompt
              feature="family_tracking_4_members"
              title="Unlock Family Coordination"
              description="Track up to 4 family members' compliance in one place. Industry-first feature available only with Lifetime access."
              requiredTier={UserTier.LIFETIME}
            />

            <UpgradePrompt
              feature="sms_alerts"
              title="Never Miss a Compliance Deadline"
              description="Get SMS alerts for critical compliance updates and overstay prevention."
              requiredTier={UserTier.ANNUAL}
            />
          </div>
        )}

        {selectedUserTier === UserTier.LIFETIME && (
          <UpgradePrompt
            feature="sms_alerts"
            title="Upgrade to Annual for SMS Alerts"
            description="Get instant SMS notifications for compliance deadlines and priority support."
            requiredTier={UserTier.ANNUAL}
          />
        )}

        {selectedUserTier === UserTier.ANNUAL && (
          <div className="text-center p-4 bg-white rounded border border-amber-200">
            <div className="text-amber-900 font-semibold">🎉 You have access to all current features!</div>
            <div className="text-sm text-amber-700 mt-2">
              New features will be automatically available as they're released in each phase.
            </div>
          </div>
        )}
      </section>

      {/* Coming Soon Features */}
      {getComingSoonFeatures().length > 0 && (
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🔮 Coming Soon Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getComingSoonFeatures().slice(0, 3).map((feature, index) => (
              <div key={feature.feature} className="bg-white p-4 rounded border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  {getFeatureDisplayName(feature.feature)}
                </h4>
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
        </section>
      )}

      {/* Strategy Explanation */}
      <section className="bg-slate-100 border border-slate-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          🎯 Strategy Explanation
        </h3>

        <div className="prose prose-sm text-slate-700">
          <p><strong>Phase 1 (Months 1-3): Trojan Horse Entry</strong></p>
          <ul>
            <li>Start simple with proven Schengen calculator excellence</li>
            <li>Use £4.99 lifetime pricing (validated conversion rate)</li>
            <li>Hide advanced features to avoid overwhelming users</li>
            <li>Focus on "best calculator" positioning vs "complex platform"</li>
          </ul>

          <p><strong>Phase 2 (Months 4-6): Competitive Differentiation</strong></p>
          <ul>
            <li>Reveal family tracking (industry-first advantage)</li>
            <li>Launch EES preparation hub (50K+ search opportunity)</li>
            <li>Showcase mobile PWA excellence</li>
            <li>Position as "family travel leader"</li>
          </ul>

          <p><strong>Phase 3 (Months 7-12): Market Domination</strong></p>
          <ul>
            <li>Full EU Border Authority platform reveal</li>
            <li>ETIAS integration for complete coverage</li>
            <li>B2B enterprise features and pricing</li>
            <li>API monetization leveraging superior architecture</li>
          </ul>

          <div className="mt-4 p-3 bg-green-100 rounded border border-green-200">
            <strong>Result:</strong> Systematic execution of proven methodology while leveraging our
            superior technical capabilities and broader market opportunity for accelerated growth to £10M+ potential.
          </div>
        </div>
      </section>
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
    'api_access': 'API Integration',
    'sms_alerts': 'SMS Notifications',
    'regulatory_updates_realtime': 'Real-time Updates'
  };

  return displayNames[feature] || feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}