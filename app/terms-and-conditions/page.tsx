import Link from 'next/link'

export default function TermsAndConditions() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-sm text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Schengen Visa Calculator service ("Service"), you accept and 
                  agree to be bound by the terms and provision of this agreement. If you do not agree to 
                  abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p>
                  The Schengen Visa Calculator is a web-based tool designed to help users calculate their 
                  compliance with the Schengen Area's 90/180-day rule. The service provides estimates and 
                  planning tools for European travel within the Schengen zone.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                
                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Account Creation</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One person or legal entity may maintain no more than one account</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Account Responsibilities</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>We reserve the right to terminate accounts that violate these terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use the Service for any commercial purpose without our consent</li>
                  <li>Upload malicious code or attempt to harm our infrastructure</li>
                  <li>Impersonate another person or entity</li>
                  <li>Harass, abuse, or harm other users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
                
                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Our Content</h3>
                <p>
                  The Service and its original content, features, and functionality are and will remain 
                  the exclusive property of Schengen Visa Calculator and its licensors. The Service is 
                  protected by copyright, trademark, and other laws.
                </p>

                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Your Content</h3>
                <p>
                  You retain ownership of any travel data or information you input into the Service. 
                  By using the Service, you grant us a license to use this data to provide the Service 
                  to you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Disclaimers and Limitations</h2>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important Warning</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>This service provides estimates only and should not be considered as official immigration advice.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Service Availability</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>The Service is provided "as is" without warranties of any kind</li>
                  <li>We do not guarantee the Service will be available at all times</li>
                  <li>We may modify or discontinue the Service at any time</li>
                  <li>We are not responsible for any data loss</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, we shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited 
                  to loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs 
                  your use of the Service, to understand our practices regarding your personal information.
                </p>
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium">
                  View Privacy Policy →
                </Link>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  including breach of these Terms.
                </p>
                <p className="mt-3">
                  You may also delete your account at any time through the Service interface.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                  the Service operates, without regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is 
                  material, we will provide at least 30 days notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Severability</h2>
                <p>
                  If any provision of these Terms is held to be unenforceable or invalid, such provision 
                  will be changed and interpreted to accomplish the objectives of such provision to the 
                  greatest extent possible under applicable law and the remaining provisions will continue 
                  in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="font-medium">Email:</p>
                  <p className="text-blue-600">support@schengenvisacalculator.com</p>
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
                    <h3 className="text-sm font-medium text-blue-800">Agreement</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
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