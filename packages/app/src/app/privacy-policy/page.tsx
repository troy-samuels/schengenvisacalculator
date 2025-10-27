import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | EU Border Authority',
  description:
    'Learn how EU Border Authority collects, uses, and protects your personal data, including account details, travel inputs, and optional anonymized analytics.',
  alternates: {
    canonical: '/privacy-policy'
  },
  openGraph: {
    title: 'Privacy Policy | EU Border Authority',
    description:
      'Our commitment to GDPR-compliant data protection, user control, and transparent analytics.',
    url: '/privacy-policy',
    type: 'article'
  }
}

const LAST_UPDATED = 'September 30, 2025'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            EU Border Authority Legal
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">
            This Privacy Policy explains how EU Border Authority collects, uses, and protects your
            personal data when you use our Schengen visa planning tools, dashboards, and related
            services.
          </p>
          <p className="mt-2 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="space-y-12 text-gray-700">
          <article>
            <h2 className="text-2xl font-semibold text-gray-900">1. Data Controller</h2>
            <p className="mt-3">
              EU Border Authority is the data controller responsible for your personal data. You can
              reach our privacy team at{' '}
              <a className="text-blue-600 underline" href="mailto:privacy@euborder.com">
                privacy@euborder.com
              </a>
              .
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">2. Information We Collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Account data:</strong> name, email address, authentication credentials, and
                subscription tier.
              </li>
              <li>
                <strong>Travel planning data:</strong> trip histories, countries visited, entry and
                exit dates, and notes you enter to calculate compliance.
              </li>
              <li>
                <strong>Support communications:</strong> messages sent to customer support or
                feedback forms.
              </li>
              <li>
                <strong>Technical data:</strong> device type, browser, and diagnostic logs collected
                to keep the Services secure and reliable.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">3. Optional Anonymized Analytics</h2>
            <p className="mt-3">
              We offer an optional program that lets you contribute anonymized travel patterns to
              help improve the Services. Participation requires explicit opt-in and can be withdrawn
              at any time. Data collected for this program is hashed monthly, grouped to ensure
              k-anonymity (minimum group size of 20), generalized to month or quarter ranges, and
              protected with differential privacy noise. No personal identifiers, precise dates, or
              IP addresses are stored.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">4. How We Use Data</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Deliver core calculator functionality and personalized travel dashboards.</li>
              <li>Send service updates, security alerts, and billing notifications.</li>
              <li>Provide customer support and troubleshoot issues.</li>
              <li>
                Improve product performance and develop new features (anonymized analytics only when
                opted in).
              </li>
              <li>
                Meet legal obligations, including responding to lawful requests from authorities.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">5. Legal Bases</h2>
            <p className="mt-3">
              We process personal data based on contract performance (providing the Services),
              legitimate interests (security, product improvement), consent (optional analytics and
              marketing communications), and compliance with legal obligations.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">6. Data Sharing</h2>
            <p className="mt-3">
              We share data with trusted processors who provide infrastructure, analytics, customer
              support, or payment processing. Each processor signs GDPR-compliant agreements and may
              only use data on our behalf. We never sell personal information to third parties.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">7. Data Retention</h2>
            <p className="mt-3">
              We retain account and travel history data while your account is active and for up to
              24 months after closure, unless a longer period is required by law. Support records and
              audit logs are retained for security and compliance purposes.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">8. Your Rights</h2>
            <p className="mt-3">
              Depending on your residence, you may have rights to access, rectify, delete, restrict,
              or transfer your personal data, as well as to object to processing. You can exercise
              these rights by contacting{' '}
              <a className="text-blue-600 underline" href="mailto:privacy@euborder.com">
                privacy@euborder.com
              </a>
              . You also have the right to lodge a complaint with your local supervisory authority.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">9. Security</h2>
            <p className="mt-3">
              We implement industry-standard security measures including encryption in transit and
              at rest, strict access controls, regular security assessments, and anonymization
              safeguards for analytics data.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">10. International Transfers</h2>
            <p className="mt-3">
              When personal data is transferred outside the EU/EEA we rely on approved transfer
              mechanisms such as Standard Contractual Clauses and conduct risk assessments to
              maintain equivalent protection.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">11. Changes</h2>
            <p className="mt-3">
              We may update this Privacy Policy to reflect product or legal changes. Material
              updates will be communicated through the Service dashboard or by email. Continued use
              after an update constitutes acceptance of the revised Policy.
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
