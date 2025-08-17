import Link from 'next/link'

export default function LegalDisclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Disclaimer</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>This calculator provides estimates only and should not be considered as official immigration advice.</p>
                    </div>
                  </div>
                </div>
              </div>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Information Accuracy</h2>
                <p>
                  The Schengen Visa Calculator is designed to provide estimates based on the Schengen Area's 90/180-day rule. 
                  While we strive to maintain accuracy, the information provided by this tool should not be considered as 
                  legal advice or official immigration guidance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">No Guarantee of Accuracy</h2>
                <p>
                  We make no representations or warranties regarding the accuracy, completeness, or reliability of the 
                  calculations provided. Immigration rules and regulations may change, and individual circumstances 
                  may affect the application of these rules.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Official Sources</h2>
                <p>
                  Users are strongly advised to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Consult official embassy or consulate websites</li>
                  <li>Verify information with immigration authorities</li>
                  <li>Seek professional legal advice for complex situations</li>
                  <li>Check current visa requirements before travel</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p>
                  The creators and operators of this calculator shall not be liable for any consequences arising from 
                  the use of this tool, including but not limited to visa denials, immigration violations, or any 
                  other legal issues that may arise from reliance on the information provided.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Responsibility</h2>
                <p>
                  It is the user's responsibility to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Verify all calculations independently</li>
                  <li>Maintain accurate records of travel dates</li>
                  <li>Understand applicable immigration laws</li>
                  <li>Comply with all visa and immigration requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates and Changes</h2>
                <p>
                  This disclaimer may be updated from time to time. We reserve the right to modify the calculator's 
                  functionality and accuracy measures without prior notice.
                </p>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Recommendation</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Always consult with official immigration authorities or qualified legal professionals for definitive guidance on visa and travel requirements.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}