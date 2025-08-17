import Link from 'next/link'

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-sm text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
                <p>
                  Schengen Visa Calculator ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our visa calculation service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                
                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Personal Information</h3>
                <p>We may collect the following types of personal information:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Account information (email address, username)</li>
                  <li>Travel history (entry and exit dates, countries visited)</li>
                  <li>Authentication data (when using third-party login services)</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent on site)</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Provide and maintain our visa calculation service</li>
                  <li>Store and sync your travel history across devices</li>
                  <li>Improve our service functionality and user experience</li>
                  <li>Send important updates about our service</li>
                  <li>Provide customer support</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
                <p>
                  Your data is stored securely using industry-standard encryption and security measures. 
                  We use Supabase as our database provider, which implements robust security protocols 
                  including encryption at rest and in transit.
                </p>
                
                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Data Retention</h3>
                <p>
                  We retain your personal information only as long as necessary to provide our services 
                  or as required by law. You may request deletion of your account and associated data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
                <p>We may use third-party services that collect, monitor, and analyze data:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Supabase:</strong> Database and authentication services</li>
                  <li><strong>Vercel:</strong> Hosting and deployment services</li>
                  <li><strong>Google OAuth:</strong> Authentication service (if enabled)</li>
                </ul>
                <p className="mt-3">
                  These services have their own privacy policies governing the use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience. These may include:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Essential cookies:</strong> Required for basic functionality</li>
                  <li><strong>Authentication cookies:</strong> To keep you logged in</li>
                  <li><strong>Preference cookies:</strong> To remember your settings</li>
                </ul>
                <p className="mt-3">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                <p>You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Data portability:</strong> Export your data in a structured format</li>
                  <li><strong>Withdrawal of consent:</strong> Opt out of data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country 
                  of residence. We ensure appropriate safeguards are in place to protect your data during 
                  such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
                <p>
                  Our service is not intended for children under the age of 13. We do not knowingly 
                  collect personal information from children under 13. If you become aware that a child 
                  has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="font-medium">Email:</p>
                  <p className="text-blue-600">privacy@schengenvisacalculator.com</p>
                </div>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Your Privacy Matters</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>We are committed to transparency and protecting your personal information. If you have any concerns, please don't hesitate to reach out.</p>
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