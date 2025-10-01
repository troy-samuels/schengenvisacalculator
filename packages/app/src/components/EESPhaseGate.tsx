'use client'

/**
 * EES Phase Gate - Trojan Horse Strategy Control
 * Hides the EES preparation hub until Month 5 (Phase 2 reveal)
 * Part of the 50K+ monthly search opportunity capture
 */

import React from 'react'
import { PhaseGate } from '@schengen/ui'
import { UserTier } from '../lib/phase-control'
import { Clock, Fingerprint, CheckCircle, AlertTriangle } from 'lucide-react'

interface EESPhaseGateProps {
  children: React.ReactNode
  userTier?: UserTier
}

export function EESPhaseGate({ children, userTier = UserTier.FREE }: EESPhaseGateProps) {
  return (
    <PhaseGate
      feature="ees_preparation_hub"
      userTier={userTier}
      showComingSoon={true}
      comingSoonMessage="Complete EES biometric preparation hub launching Month 5 - the definitive authority for October 2025 system launch."
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                Coming May 2025
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                🔮 EES Preparation Hub
                <br />
                <span className="text-blue-600">Coming Soon</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                The definitive EU Entry/Exit System authority center. Master biometric registration,
                country schedules, and corporate compliance for the October 2025 launch.
              </p>
            </div>

            {/* Strategic Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Fingerprint className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    EU Border Authority EES Center
                  </h2>
                  <p className="text-gray-600">
                    First-mover advantage in 50K+ monthly searches
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Complete Country Guides
                    </h3>
                    <p className="text-sm text-gray-600">
                      27 EU country implementation schedules and requirements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Biometric Preparation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Step-by-step guides for fingerprints and facial imaging
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Corporate Compliance
                    </h3>
                    <p className="text-sm text-gray-600">
                      Business travel management and employee preparation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Family Coordination
                    </h3>
                    <p className="text-sm text-gray-600">
                      Multi-member biometric registration planning
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Real-time Updates
                    </h3>
                    <p className="text-sm text-gray-600">
                      Latest EES implementation news and changes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Expert Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional insights and compliance strategies
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Why We're Building the EES Authority Hub
                    </h4>
                    <p className="text-sm text-blue-800 mb-2">
                      The EU Entry/Exit System launches October 2025, affecting millions of travelers.
                      Current information is scattered and incomplete - we're building the definitive authority.
                    </p>
                    <div className="text-sm text-blue-700">
                      <strong>Market Opportunity:</strong> 50K+ monthly searches | <strong>Launch:</strong> May 2025 | <strong>First-Mover Advantage:</strong> 6 months ahead of competition
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Focus */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                🧮 Currently Available: Schengen Calculator Excellence
              </h3>
              <p className="text-green-800 mb-4">
                Master the 90/180-day rule with our ultra-fast calculator while we prepare the complete EES authority hub.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Use Schengen Calculator
                <CheckCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get EES Launch Updates
              </h3>
              <p className="text-gray-600 mb-4">
                Be the first to know when the EES preparation hub launches in May 2025.
              </p>
              <div className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </PhaseGate>
  )
}