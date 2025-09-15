"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from './badge'
import { Button } from './button'
import { AccuracyVerification } from '@schengen/calculator'
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  ShieldCheck,
  X,
  TrendingUp,
  Database,
  Clock
} from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AccuracyVerificationBadgeProps {
  verification: AccuracyVerification
  className?: string
  showDetailedModal?: boolean
}

export function AccuracyVerificationBadge({
  verification,
  className,
  showDetailedModal = true
}: AccuracyVerificationBadgeProps) {
  const [showModal, setShowModal] = useState(false)

  // Determine badge appearance based on verification status
  const getBadgeConfig = () => {
    switch (verification.verificationStatus) {
      case 'verified':
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          text: 'EU-Verified',
          variant: 'default' as const,
          bgColor: 'bg-green-50 border-green-200',
          textColor: 'text-green-700',
          iconColor: 'text-green-600'
        }
      case 'partial':
        return {
          icon: <AlertTriangle className="w-3 h-3" />,
          text: 'Partially Verified',
          variant: 'secondary' as const,
          bgColor: 'bg-amber-50 border-amber-200',
          textColor: 'text-amber-700',
          iconColor: 'text-amber-600'
        }
      case 'unverified':
        return {
          icon: <XCircle className="w-3 h-3" />,
          text: 'Unverified',
          variant: 'destructive' as const,
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-700',
          iconColor: 'text-red-600'
        }
    }
  }

  const badgeConfig = getBadgeConfig()

  return (
    <>
      <Badge
        variant={badgeConfig.variant}
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium cursor-pointer transition-all hover:scale-105",
          badgeConfig.bgColor,
          badgeConfig.textColor,
          className
        )}
        onClick={() => showDetailedModal && setShowModal(true)}
      >
        <span className={badgeConfig.iconColor}>
          {badgeConfig.icon}
        </span>
        {badgeConfig.text}
        <span className="font-semibold">
          {verification.confidenceScore}%
        </span>
        {showDetailedModal && (
          <Info className="w-3 h-3 opacity-60" />
        )}
      </Badge>

      {/* Detailed Verification Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-8 relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Calculation Accuracy Report
                  </h2>
                  <p className="text-gray-600">
                    Transparency in every calculation we make for you
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Overall Score */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {verification.confidenceScore}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Confidence Score
                  </div>
                  <Badge
                    variant={badgeConfig.variant}
                    className={cn("mt-2", badgeConfig.bgColor, badgeConfig.textColor)}
                  >
                    {badgeConfig.text}
                  </Badge>
                </div>

                {/* Data Quality Breakdown */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Data Quality Breakdown
                  </h3>

                  {/* Completeness */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Completeness</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${verification.dataQuality.completeness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-10">
                        {verification.dataQuality.completeness}%
                      </span>
                    </div>
                  </div>

                  {/* Consistency */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Consistency</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-2 bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${verification.dataQuality.consistency}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-10">
                        {verification.dataQuality.consistency}%
                      </span>
                    </div>
                  </div>

                  {/* Recency */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Recency</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${verification.dataQuality.recency}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-10">
                        {verification.dataQuality.recency}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Validation Sources */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Validation Sources
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {verification.validationSources.map((source, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-700">
                          {source === 'EU_OFFICIAL' && 'Official EU 90/180 Rule Implementation'}
                          {source === 'CROSS_VALIDATION' && 'Cross-validated with Multiple Methods'}
                          {source === 'TEST_CASES' && 'Validated Against Edge Cases'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EU Compliance Status */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="font-medium text-green-900">
                        EU Compliant Calculation
                      </div>
                      <div className="text-sm text-green-700">
                        Implements exact European Union 90/180-day rule
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Validated */}
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Last validated: {verification.lastValidated.toLocaleString()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AccuracyVerificationBadge