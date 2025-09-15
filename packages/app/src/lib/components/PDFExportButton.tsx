/**
 * PDF Export Button Component
 * Premium feature for exporting professional compliance reports
 * Integrates with existing calculator UI and user tier system
 */

'use client'

import React, { useState } from 'react'
import { UserStatus } from '../types/user-status'
import { SchengenTrip } from '../types/schengen-trip'
import { Button } from '@schengen/ui'
import { FileText, Download, Crown, Lock } from 'lucide-react'
import { 
  PDFReportGenerator, 
  ComplianceReportData, 
  ReportOptions,
  usePDFReportGenerator 
} from '../services/pdf-report-generator'
import { format, subDays } from 'date-fns'

interface PDFExportButtonProps {
  userStatus: UserStatus
  trips: SchengenTrip[]
  complianceData: {
    totalDaysUsed: number
    remainingDays: number
    isCompliant: boolean
    nextResetDate: Date
  }
  userProfile?: {
    full_name?: string
    email?: string
  }
  className?: string
}

interface ExportOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (options: ReportOptions) => void
  userStatus: UserStatus
}

function ExportOptionsModal({ isOpen, onClose, onExport, userStatus }: ExportOptionsModalProps) {
  const [options, setOptions] = useState<ReportOptions>({
    includeVisualCalendar: true,
    includeRecommendations: true,
    includeLegalDisclaimer: true,
    reportType: userStatus !== UserStatus.FREE ? 'detailed' : 'summary',
    branding: true
  })

  if (!isOpen) return null

  const handleExport = () => {
    onExport(options)
    onClose()
  }

  const isLocked = (feature: string) => userStatus === UserStatus.FREE

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Report Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="summary"
                  checked={options.reportType === 'summary'}
                  onChange={(e) => setOptions(prev => ({ ...prev, reportType: e.target.value as any }))}
                  className="mr-2"
                />
                <span className="text-sm">Quick Summary</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="detailed"
                  checked={options.reportType === 'detailed'}
                  onChange={(e) => setOptions(prev => ({ ...prev, reportType: e.target.value as any }))}
                  disabled={isLocked('detailed')}
                  className="mr-2"
                />
                <span className={`text-sm ${isLocked('detailed') ? 'text-gray-400' : ''} flex items-center gap-1`}>
                  Detailed Analysis
                  {isLocked('detailed') && <Crown className="w-3 h-3 text-blue-500" />}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="official"
                  checked={options.reportType === 'official'}
                  onChange={(e) => setOptions(prev => ({ ...prev, reportType: e.target.value as any }))}
                  disabled={isLocked('official')}
                  className="mr-2"
                />
                <span className={`text-sm ${isLocked('official') ? 'text-gray-400' : ''} flex items-center gap-1`}>
                  Official Format
                  {isLocked('official') && <Crown className="w-3 h-3 text-blue-500" />}
                </span>
              </label>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Include:</h4>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeVisualCalendar}
                onChange={(e) => setOptions(prev => ({ ...prev, includeVisualCalendar: e.target.checked }))}
                disabled={isLocked('calendar')}
                className="mr-2"
              />
              <span className={`text-sm ${isLocked('calendar') ? 'text-gray-400' : ''} flex items-center gap-1`}>
                Visual Calendar
                {isLocked('calendar') && <Crown className="w-3 h-3 text-blue-500" />}
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeRecommendations}
                onChange={(e) => setOptions(prev => ({ ...prev, includeRecommendations: e.target.checked }))}
                disabled={isLocked('recommendations')}
                className="mr-2"
              />
              <span className={`text-sm ${isLocked('recommendations') ? 'text-gray-400' : ''} flex items-center gap-1`}>
                Personalized Recommendations
                {isLocked('recommendations') && <Crown className="w-3 h-3 text-blue-500" />}
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeLegalDisclaimer}
                onChange={(e) => setOptions(prev => ({ ...prev, includeLegalDisclaimer: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm">Legal Disclaimer</span>
            </label>
          </div>

          {/* Premium Upsell */}
          {userStatus === UserStatus.FREE && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Premium Features</span>
              </div>
              <p className="text-xs text-blue-700 mb-2">
                Unlock detailed reports with visual calendars and personalized recommendations
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-xs w-full">
                Upgrade to Premium - £9.99/year
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

export function PDFExportButton({ 
  userStatus, 
  trips, 
  complianceData, 
  userProfile,
  className = '' 
}: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const { generateReport, generateBasicSummary, downloadReport } = usePDFReportGenerator()

  const handleQuickExport = async () => {
    setIsExporting(true)
    
    try {
      if (userStatus !== UserStatus.FREE) {
        // Generate full premium report
        const reportData: ComplianceReportData = {
          user: userProfile || { full_name: 'Premium User' },
          trips,
          reportDate: new Date(),
          calculationPeriod: {
            start: subDays(new Date(), 180),
            end: new Date()
          },
          complianceStatus: complianceData,
          recommendations: generateRecommendations(trips, complianceData)
        }

        const blob = await generateReport(reportData, {
          includeVisualCalendar: true,
          includeRecommendations: true,
          includeLegalDisclaimer: true,
          reportType: 'detailed',
          branding: true
        })

        downloadReport(blob, `schengen-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
      } else {
        // Generate basic summary for free users
        const blob = await generateBasicSummary(trips, complianceData)
        downloadReport(blob, `schengen-summary-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
      }
    } catch (error) {
      console.error('Failed to generate PDF report:', error)
      // TODO: Show error toast
    } finally {
      setIsExporting(false)
    }
  }

  const handleCustomExport = async (options: ReportOptions) => {
    setIsExporting(true)
    
    try {
      const reportData: ComplianceReportData = {
        user: userProfile || { full_name: 'Premium User' },
        trips,
        reportDate: new Date(),
        calculationPeriod: {
          start: subDays(new Date(), 180),
          end: new Date()
        },
        complianceStatus: complianceData,
        recommendations: generateRecommendations(trips, complianceData)
      }

      const blob = await generateReport(reportData, options)
      downloadReport(blob, `schengen-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
    } catch (error) {
      console.error('Failed to generate custom PDF report:', error)
      // TODO: Show error toast
    } finally {
      setIsExporting(false)
    }
  }

  // Different UI based on user status
  if (userStatus === UserStatus.FREE) {
    return (
      <Button
        variant="outline"
        className={`${className} opacity-50 cursor-not-allowed`}
        disabled
      >
        <Lock className="w-4 h-4 mr-2" />
        Sign up to export
      </Button>
    )
  }


  // Premium user - full features
  return (
    <>
      <div className={`flex gap-2 ${className}`}>
        <Button
          onClick={handleQuickExport}
          disabled={isExporting}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Generating...' : 'Export PDF'}
        </Button>
        
        <Button
          onClick={() => setShowOptions(true)}
          disabled={isExporting}
          variant="outline"
          className="px-3"
        >
          ⚙️
        </Button>
      </div>

      <ExportOptionsModal
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        onExport={handleCustomExport}
        userStatus={userStatus}
      />
    </>
  )
}

// Helper function to generate personalized recommendations
function generateRecommendations(
  trips: SchengenTrip[], 
  complianceData: { totalDaysUsed: number; remainingDays: number; isCompliant: boolean }
): string[] {
  const recommendations: string[] = []

  if (!complianceData.isCompliant) {
    recommendations.push('URGENT: You may be exceeding the 90-day limit. Consider shortening current or future trips.')
    recommendations.push('Contact immigration authorities or legal counsel for guidance on your specific situation.')
  } else if (complianceData.remainingDays < 10) {
    recommendations.push('You are approaching the 90-day limit. Plan future trips carefully to maintain compliance.')
    recommendations.push('Consider waiting until your rolling 180-day window resets before traveling again.')
  } else if (complianceData.remainingDays > 60) {
    recommendations.push('You have significant remaining allowance. You can plan longer trips if desired.')
  }

  if (trips.length > 0) {
    const frequentCountries = trips.reduce((acc, trip) => {
      acc[trip.country] = (acc[trip.country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const mostVisited = Object.entries(frequentCountries)
      .sort(([,a], [,b]) => b - a)[0]

    if (mostVisited && mostVisited[1] > 2) {
      recommendations.push(`You frequently visit ${mostVisited[0]}. Consider longer stays to maximize your travel experience.`)
    }
  }

  if (recommendations.length === 0) {
    recommendations.push('Your travel pattern shows good compliance with Schengen regulations.')
    recommendations.push('Continue monitoring your 180-day rolling window for future trip planning.')
  }

  return recommendations
}