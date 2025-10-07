'use client'

import { useState } from 'react'
import { EESQuickCardGenerator } from '@/lib/services/ees-quick-card-generator'
import { Download, Loader2, FileText, CheckCircle } from 'lucide-react'

export default function GenerateEESPDFPage() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setGenerating(true)
    setError(null)
    setGenerated(false)

    try {
      console.log('🚀 Starting PDF generation...')

      const pdfBlob = await EESQuickCardGenerator.generateQuickCard({
        purchasedBy: 'EU Border Authority',
        purchaseDate: new Date(),
        includeQRCodes: true,
      })

      console.log('✅ PDF generated:', pdfBlob.size, 'bytes')

      // Download the generated PDF
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'ees-quick-card-v1.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setGenerated(true)
      console.log('📥 PDF downloaded successfully')
    } catch (err: any) {
      console.error('❌ Error generating PDF:', err)
      setError(err.message || 'Failed to generate PDF')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                EES Quick Card PDF Generator
              </h1>
              <p className="text-gray-600">Admin tool to generate the £7.99 product PDF</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Admin Access Only:</strong> This page generates the EES Readiness Quick
              Card PDF. After generating, upload to Supabase Storage bucket:{' '}
              <code className="bg-yellow-100 px-2 py-0.5 rounded">ees_products</code>
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3 text-lg font-medium mb-4"
          >
            {generating ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-6 w-6" />
                Generate & Download EES Quick Card PDF
              </>
            )}
          </button>

          {/* Success Message */}
          {generated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">PDF Generated Successfully!</p>
                <p className="text-sm text-green-700">
                  The PDF has been downloaded to your computer. Next: Upload to Supabase Storage.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-medium text-red-900">Generation Failed</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Next Steps After Generation
          </h2>

          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                1
              </span>
              <div>
                <p className="font-medium text-gray-900">Generate the PDF</p>
                <p className="text-sm text-gray-600">
                  Click the button above to create <code>ees-quick-card-v1.pdf</code>
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                2
              </span>
              <div>
                <p className="font-medium text-gray-900">Review the PDF</p>
                <p className="text-sm text-gray-600">
                  Open the downloaded PDF and verify content quality and formatting
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                3
              </span>
              <div>
                <p className="font-medium text-gray-900">Create Supabase Storage Bucket</p>
                <p className="text-sm text-gray-600">
                  Go to Supabase Dashboard → Storage → Create bucket:{' '}
                  <code className="bg-gray-100 px-2 py-0.5 rounded">ees_products</code>
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                4
              </span>
              <div>
                <p className="font-medium text-gray-900">Set RLS Policies</p>
                <p className="text-sm text-gray-600">
                  Configure policies so only purchasers can download (see{' '}
                  <code>SUPABASE_STORAGE_SETUP.md</code>)
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                5
              </span>
              <div>
                <p className="font-medium text-gray-900">Upload PDF</p>
                <p className="text-sm text-gray-600">
                  Upload <code>ees-quick-card-v1.pdf</code> to the{' '}
                  <code className="bg-gray-100 px-2 py-0.5 rounded">ees_products</code> bucket
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                6
              </span>
              <div>
                <p className="font-medium text-gray-900">Test Download Flow</p>
                <p className="text-sm text-gray-600">
                  Make a test purchase and verify download works at{' '}
                  <code>/ees/guide/download</code>
                </p>
              </div>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📚 Full Documentation:</strong> See <code>SUPABASE_STORAGE_SETUP.md</code>{' '}
              for detailed setup instructions and troubleshooting.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔧 Technical Details</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">PDF Generator:</span>
              <code className="text-gray-900">ees-quick-card-generator.ts</code>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Content Source:</span>
              <code className="text-gray-900">ees-quick-card-content.ts</code>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Expected File Size:</span>
              <span className="text-gray-900">2-4 MB</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Pages:</span>
              <span className="text-gray-900">4 pages (A4 format)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Format:</span>
              <span className="text-gray-900">PDF (application/pdf)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Product Price:</span>
              <span className="text-gray-900 font-medium">£7.99 one-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
