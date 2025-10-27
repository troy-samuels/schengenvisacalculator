import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | EU Border Authority',
  description:
    'Legal terms governing the use of the EU Border Authority platform, including eligibility, subscriptions, acceptable use, and liability limitations.',
  alternates: {
    canonical: '/terms-of-service'
  },
  openGraph: {
    title: 'Terms of Service | EU Border Authority',
    description:
      'Understand the legal terms that apply when you use EU Border Authority tools and services.',
    url: '/terms-of-service',
    type: 'article'
  }
}

const LAST_UPDATED = 'September 30, 2025'

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            EU Border Authority Legal
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-4 text-gray-600">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of EU Border
            Authority services, including our Schengen visa calculators, dashboards, premium
            subscriptions, and related content (collectively, the &quot;Services&quot;). By using
            the Services you agree to these Terms.
          </p>
          <p className="mt-2 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </header>

        <section className="space-y-12 text-gray-700">
          <article>
            <h2 className="text-2xl font-semibold text-gray-900">1. Eligibility &amp; Accounts</h2>
            <p className="mt-3">
              You must be at least 18 years old or the age of majority in your jurisdiction to use
              the Services. When you create an account you must provide accurate information and are
              responsible for maintaining the confidentiality of your credentials. You are liable
              for all activity undertaken through your account.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">2. Subscriptions &amp; Billing</h2>
            <p className="mt-3">
              Some Services require a paid subscription. You authorize EU Border Authority to charge
              the payment method you provide for recurring fees until you cancel. You may cancel
              premium plans at any time; cancellations take effect at the end of the current billing
              cycle. Fees already paid are non-refundable except where required by law.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">3. Acceptable Use</h2>
            <p className="mt-3">
              You agree not to misuse the Services, interfere with their normal operation, or access
              them using methods other than the interfaces we provide. You may not reverse engineer,
              resell, or provide automated access to the Services without prior written consent.
              We reserve the right to suspend or terminate access if we believe your use violates
              these Terms or applicable law.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">4. Data &amp; Privacy</h2>
            <p className="mt-3">
              Our processing of personal data is described in the{' '}
              <a className="text-blue-600 underline" href="/privacy-policy">
                Privacy Policy
              </a>
              . By using the Services you consent to the collection and use of information as
              described therein. You remain responsible for ensuring that any data you provide is
              accurate and legally shareable.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">5. Intellectual Property</h2>
            <p className="mt-3">
              The Services, including software, text, graphics, and logos, are owned by EU Border
              Authority or its licensors and are protected by applicable intellectual property laws.
              We grant you a limited, non-exclusive, non-transferable license to use the Services in
              accordance with these Terms.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">6. Disclaimers</h2>
            <p className="mt-3">
              The Services are provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind. We do not guarantee the accuracy of government regulations or
              travel outcomes and are not liable for decisions made based on the Services. You should
              consult official authorities for definitive immigration guidance.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">7. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, EU Border Authority is not liable for indirect,
              incidental, special, consequential, or punitive damages, or for any loss of profits,
              revenues, or data. Our total liability for any claim arising out of or relating to the
              Services is limited to the amount you paid, if any, for the Services in the twelve
              months preceding the claim.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">8. Changes &amp; Termination</h2>
            <p className="mt-3">
              We may modify these Terms by posting an updated version to this page. Material changes
              will be communicated through the Service dashboard or email. Continued use after the
              revised Terms take effect constitutes acceptance. We may discontinue any part of the
              Services with reasonable notice.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">9. Governing Law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of the European Union and the country where EU
              Border Authority is established, without regard to conflict of law principles. The
              courts located in that jurisdiction have exclusive authority to resolve disputes
              arising under these Terms.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-gray-900">10. Contact</h2>
            <p className="mt-3">
              If you have questions about these Terms, contact us at{' '}
              <a className="text-blue-600 underline" href="mailto:legal@euborder.com">
                legal@euborder.com
              </a>
              .
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
