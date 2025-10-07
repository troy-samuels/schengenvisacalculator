'use client'

import React, { useState } from 'react'
import { Download, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { usePurchases } from '@/lib/hooks/usePurchases'
import { useUserStatus } from '@/lib/hooks/useUserStatus'
import { EESGuideAccessCheck } from '@/components/ees/EESGuideAccessCheck'
import Link from 'next/link'

export function EESGuideDownloadClient() {
  const { user, loading: userLoading } = useUserStatus()
  const { purchases, hasPaidEESGuide, loading: purchasesLoading, latestEESGuide } = usePurchases()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsDownloading(true)
    setDownloadError(null)

    try {
      const response = await fetch('/api/ees-guide/download')

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Download failed')
      }

      const data = await response.json()

      if (data.downloadUrl) {
        // Redirect to signed URL
        window.location.href = data.downloadUrl
      } else if (data.error) {
        setDownloadError(data.error)
      }
    } catch (error: any) {
      console.error('Download error:', error)
      setDownloadError(error.message || 'Failed to download guide. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  // Show purchase info
  const purchaseDate = latestEESGuide
    ? new Date(latestEESGuide.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <EESGuideAccessCheck>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Success Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome to Your EES Guide!</h1>
                <p className="text-gray-600">Thank you for your purchase</p>
              </div>
            </div>

            {purchaseDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Purchase Date:</strong> {purchaseDate}
                </p>
                {latestEESGuide && latestEESGuide.amount && (
                  <p className="text-sm text-blue-800">
                    <strong>Amount Paid:</strong> £{(latestEESGuide.amount / 100).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {/* Download Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📄 Download Your Quick Card PDF
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <FileText className="h-12 w-12 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">EES Readiness Quick Card</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      4-page compact guide covering essential checklists, biometrics process,
                      country-specific tips, and emergency contacts. Print and carry at the border.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Border checklist with all required documents</li>
                      <li>• Step-by-step biometric registration</li>
                      <li>• Country-specific airport procedures</li>
                      <li>• Emergency contacts and resources</li>
                    </ul>

                    {downloadError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md mb-4 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Download Error</p>
                          <p>{downloadError}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          Download PDF Quick Card
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                <strong>Tip:</strong> Print this PDF and keep it with your passport for easy
                reference at the border. The download link is valid for 24 hours.
              </p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📚 Additional Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/ees/complete-guide"
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Complete EES Guide</h3>
                <p className="text-sm text-gray-600">
                  Full 20-page guide with in-depth explanations
                </p>
              </Link>

              <Link
                href="/ees/countries"
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Country-Specific Guides</h3>
                <p className="text-sm text-gray-600">27 EU country implementation details</p>
              </Link>

              <Link
                href="/schengen-calculator"
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Schengen Calculator</h3>
                <p className="text-sm text-gray-600">Track your 90/180-day compliance</p>
              </Link>

              <Link
                href="/ees/family"
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Family Preparation</h3>
                <p className="text-sm text-gray-600">Coordinate EES for your whole family</p>
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Need help?{' '}
              <a href="mailto:support@euborder.com" className="text-blue-600 hover:underline">
                support@euborder.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </EESGuideAccessCheck>
  )
}
