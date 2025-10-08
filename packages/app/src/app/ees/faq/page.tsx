import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Search, ArrowRight, CheckCircle } from 'lucide-react';
import { EESGuideCTA } from '@/components/ees/EESGuideCTA';
import { EnhancedSchema } from '@/components/enhanced-schema';

export const metadata: Metadata = {
  title: 'EES FAQ: 50+ Frequently Asked Questions About EU Entry/Exit System',
  description: 'Complete FAQ about the EU Entry/Exit System (EES). Answers to 50+ questions about registration, biometrics, requirements, privacy, and compliance.',
  keywords: [
    'ees faq',
    'ees frequently asked questions',
    'ees questions and answers',
    'eu entry exit system faq',
    'ees help',
    'ees information',
    'ees explained',
    'ees registration questions',
    'ees biometric faq',
    'ees requirements faq'
  ],
  openGraph: {
    title: 'EES FAQ: 50+ Frequently Asked Questions',
    description: 'Complete answers to all your questions about the EU Entry/Exit System including registration, biometrics, and compliance.',
    type: 'website',
    url: 'https://euborder.com/ees/faq'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EES FAQ: Frequently Asked Questions',
    description: '50+ answers about the EU Entry/Exit System'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/faq'
  }
};

export default function EESFAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/ees" className="text-gray-600 hover:text-blue-600 transition-colors">EES</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">FAQ</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EES Frequently Asked Questions
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Everything you need to know about the EU Entry/Exit System. 50+ questions answered about registration, biometrics, requirements, and compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target shadow-lg"
            >
              Get Complete Guide (£7.99)
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* General Questions */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              General Questions
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What is the EU Entry/Exit System (EES)?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  The EU Entry/Exit System (EES) is a digital border management system that records entry and exit data for non-EU nationals crossing EU external borders. It replaces manual passport stamping with biometric registration (fingerprints and facial photograph) and automatically tracks the 90/180 day rule for Schengen Area stays.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>When does EES start?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  The EES system launches on <strong>October 12, 2025</strong> at 00:01 CET. All 27 EU member states plus 4 Schengen-associated countries (Norway, Iceland, Switzerland, Liechtenstein) will implement EES simultaneously on this date.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Who needs to register with EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  All third-country nationals (non-EU citizens) entering the Schengen Area for short stays (up to 90 days) must register with EES. This includes citizens of the UK, US, Canada, Australia, New Zealand, and all other countries outside the EU/EEA. EU citizens, residents with long-stay visas, and certain exempted categories do not need EES registration.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Is EES the same as ETIAS?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. EES and ETIAS are two separate systems. <strong>EES</strong> is a border biometric registration system completed at entry/exit points. <strong>ETIAS</strong> is a pre-travel authorization (like US ESTA) applied for online before your trip. Both will be required for non-EU travelers - ETIAS approval before travel, EES registration at the border.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do I need to register with EES every time I enter the EU?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. You only complete the full biometric registration (fingerprints and facial photo) on your <strong>first entry</strong> after October 12, 2025. Your biometric data is stored for 3 years. On subsequent entries, your biometrics are verified automatically (less than 1 minute), but full registration is not required again unless your data has expired or your passport has changed.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>How much does EES registration cost?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EES registration is <strong>completely free</strong>. There is no fee for biometric registration or entry/exit recording. Do not pay any third-party service claiming to offer "EES registration" for a fee - all registration is done at the border at no cost.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Which countries are part of the EES system?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EES covers all 27 EU member states plus 4 Schengen-associated countries: <strong>Austria, Belgium, Bulgaria, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, Switzerland</strong>. Note: Ireland and Cyprus (EU members) are not part of Schengen and do not use EES.
                </p>
              </details>
            </div>
          </section>

          {/* Registration Process */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              Registration Process
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Where do I register for EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  You register at the <strong>first EU entry point</strong> after October 12, 2025. This could be an airport, seaport, land border crossing, or Eurostar/train terminal. Look for signs reading "EES Registration," "Non-EU Nationals," or "Third-Country Nationals." Self-service kiosks are available at all major border crossings.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I pre-register for EES before traveling?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. EES registration requires biometric scanning equipment at the border. There is no online pre-registration or enrollment option. You must complete registration in person at an EU entry point on or after October 12, 2025.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>How long does EES registration take?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  <strong>First-time registration:</strong> 5-10 minutes (includes biometric scan, document verification, travel questions).<br/>
                  <strong>Return visits:</strong> Less than 1 minute (automated biometric verification only).<br/>
                  <strong>Launch week (Oct 12-25, 2025):</strong> Expect 30-45 minutes due to high volume of first-time registrations.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What questions will I be asked during EES registration?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Basic questions include: (1) Purpose of visit (tourism, business, family, etc.), (2) Intended length of stay, (3) Accommodation address, (4) Contact information, (5) Means of financial support. These are standard border control questions - answer honestly and have supporting documents (hotel booking, return ticket) available.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I use a self-service kiosk or do I need to see a border officer?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Most travelers can use <strong>self-service kiosks</strong>, which are typically faster. Kiosks have multilingual interfaces (24+ languages) with step-by-step instructions. However, some cases require a staffed desk: children under 12, travelers with scanning difficulties, complex travel situations, or if you prefer assistance. Border staff are always nearby to help.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What happens if the biometric scan fails or doesn't work?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  If automated scanning fails, a <strong>border officer will assist</strong> with manual registration. Common reasons for scan failure: wet/dirty fingers, worn fingerprints, medical conditions affecting fingerprints, or technical issues. This is not a problem - you will not be denied entry. Officers are trained to handle these situations and will complete your registration manually.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do I register when entering or exiting the EU?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  You register on <strong>both entry and exit</strong>. First entry: complete biometric registration (5-10 min). Exit: quick biometric verification to record your departure (less than 1 min). Subsequent entries: quick verification only (less than 1 min). The system tracks both your entry and exit dates to enforce the 90/180 day rule automatically.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if I'm transiting through the EU but not entering?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  If you remain <strong>airside</strong> (international transit area) and do not pass through border control, EES registration is not required. Example: Flying New York → Paris CDG → Cairo - if you stay in the transit area and don't enter France, no EES needed. However, if you collect baggage and re-check, or leave the airport, you must register with EES.
                </p>
              </details>
            </div>
          </section>

          {/* First CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Biometric Data & Privacy */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              Biometric Data & Privacy
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What biometric data is collected?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EES collects: (1) <strong>Fingerprints</strong> - Four fingers scanned (index and middle fingers from both hands), (2) <strong>Facial photograph</strong> - Digital photo taken at the kiosk/desk. Additional data stored: passport details, entry/exit dates, border crossing location, travel purpose. No DNA, iris scans, or health information is collected.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>How long is my biometric data stored?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Biometric data (fingerprints and facial image) is stored for <strong>3 years</strong> from the date of registration. Entry/exit records are kept for an additional 3 years after your last recorded movement. After expiration, all data is automatically deleted from the system. If you don't travel to the EU for 3+ years, you'll need to re-register with fresh biometrics.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Who has access to my EES data?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Access is restricted to: (1) <strong>Border authorities</strong> in all Schengen countries for identity verification, (2) <strong>Law enforcement</strong> for serious crime investigations with proper authorization, (3) <strong>eu-LISA</strong> (EU IT agency) for system maintenance. Commercial entities, third countries (except under specific legal agreements), and private companies do NOT have access to EES data.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Is my EES data protected under GDPR?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. EES is fully compliant with the <strong>EU General Data Protection Regulation (GDPR)</strong> and the EU Data Protection Law Enforcement Directive. You have rights to: (1) Access your stored data, (2) Request correction of inaccurate information, (3) Lodge complaints with data protection authorities, (4) Be informed of data breaches affecting you. Data is encrypted and stored on secure EU-only servers.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I refuse to provide biometric data?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. Biometric registration is <strong>mandatory</strong> for all third-country nationals entering the Schengen Area after October 12, 2025. Refusal to provide biometrics will result in <strong>entry denial</strong> at the border. Limited exemptions exist: children under 12 (fingerprints only), travelers with physical impossibilities (missing fingers), or holders of certain diplomatic passports.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Will my biometric data be shared with my home country?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Generally, no. EES data remains within the EU/Schengen system. However, data may be shared with third countries under specific circumstances: (1) Bilateral agreements for counter-terrorism, (2) Interpol red notices, (3) Serious transnational crime investigations with proper legal authorization. Routine travel data is not shared with your home country.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I request a copy of my EES data?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. Under GDPR Article 15, you have the <strong>right to access</strong> your personal data. You can request a copy of your EES records (entry/exit history, biometric data) by contacting the border authority of the country where you registered, or through the eu-LISA data protection portal. Requests must be processed within 30 days.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What happens if there's a data breach of EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EU law requires <strong>immediate notification</strong> to affected individuals and data protection authorities in case of a breach. EES uses military-grade encryption (AES-256), multi-factor authentication, and continuous security audits to prevent breaches. If your data is compromised, you'll be notified within 72 hours with details on the breach extent and protective measures to take.
                </p>
              </details>
            </div>
          </section>

          {/* Travel & Compliance */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">4</span>
              </div>
              Travel & Compliance
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>How does EES track the 90/180 day rule?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  EES automatically records your exact entry and exit dates at EU borders. The system calculates your remaining days in real-time based on the <strong>rolling 180-day window</strong>. For example, if you entered on Jan 1 and exited Feb 14 (45 days), the system knows you have 45 days remaining until July 1. Border officers can see your status instantly, eliminating manual counting or errors.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What happens if I overstay my 90 days?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Overstaying is a serious violation with consequences: (1) <strong>Entry ban</strong>: 1-5 years depending on overstay duration, (2) <strong>Fines</strong>: Up to €10,000, (3) <strong>Deportation</strong> and ban from re-entering, (4) <strong>Future difficulties</strong> obtaining Schengen visas or ETIAS authorization. EES makes overstays impossible to hide - the system automatically flags violations when you attempt to exit.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I extend my stay beyond 90 days?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes, but only through <strong>official channels</strong> before your 90 days expire. Options: (1) Apply for a <strong>long-stay visa</strong> (Type D) at a consulate before travel, (2) Apply for a <strong>residence permit</strong> if eligible (work, study, family), (3) Request an <strong>extension</strong> from local immigration authorities with valid reasons (medical emergency, force majeure). Tourist stays cannot be extended in most cases - you must leave and wait until the 180-day window allows re-entry.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Does time spent in non-Schengen EU countries count toward my 90 days?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. The 90/180 rule applies only to the <strong>Schengen Area</strong>. Time spent in <strong>non-Schengen EU countries</strong> (Ireland, Cyprus) does NOT count toward your 90 days. However, Bulgaria, Romania, and Croatia have special status - they're in the Schengen Area for EES purposes even though they don't have full Schengen membership yet. Always verify current status as this is evolving.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I travel within the Schengen Area without additional EES checks?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. Once you've entered the Schengen Area and completed EES registration, you can travel freely between Schengen countries <strong>without additional border checks</strong>. Example: Enter through France, travel to Spain, then Italy - no EES checks between these countries. EES only applies at <strong>external Schengen borders</strong> (entry from non-Schengen countries and final exit from Schengen).
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if I lose track of my days spent in the Schengen Area?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  With EES, this is no longer a concern. The system automatically tracks your exact entry/exit dates and calculates remaining days. However, if you want to verify independently, use our <Link href="/schengen-calculator" className="text-blue-600 underline font-semibold hover:text-blue-700">Schengen Calculator</Link> to input your trips and see your remaining days. You can also request your EES travel history from border authorities.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do I need travel insurance to enter the EU with EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Travel insurance is <strong>not mandatory</strong> for EES registration itself. However, border officers may request proof of travel insurance as part of entry requirements (especially for longer stays). Insurance should cover medical expenses (minimum €30,000), emergency repatriation, and be valid across all Schengen countries. Some countries may deny entry without adequate coverage.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I work in the EU on a 90-day EES entry?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. EES entries are for <strong>short-stay purposes only</strong>: tourism, business meetings, conferences, family visits. You cannot work or receive payment from EU sources on a 90-day entry. For employment, you need a <strong>work visa</strong> and residence permit. Digital nomads working remotely for non-EU companies exist in a gray area - some countries tolerate it, others don't. Always check specific country rules.
                </p>
              </details>
            </div>
          </section>

          {/* Second CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Special Cases & Exceptions */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold">5</span>
              </div>
              Special Cases & Exceptions
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Do children need to register with EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes, all ages must register. However, children <strong>under 12 years old</strong> are exempt from fingerprint scanning. They must still provide a facial photograph and passport details. Children 12+ follow the same process as adults (fingerprints + facial photo). Parents/guardians must accompany children during registration and answer questions on their behalf.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I have dual citizenship (EU + non-EU). Which passport should I use?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Always use your <strong>EU passport</strong> when entering the Schengen Area. EU citizens are exempt from EES and ETIAS. Using your non-EU passport (even if valid) will trigger unnecessary EES registration. Example: UK-Irish dual citizen should travel on Irish passport to maintain EU freedom of movement rights and avoid EES.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I'm a refugee or asylum seeker. Do I need EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  It depends. If you hold a <strong>valid residence permit</strong> from an EU/Schengen country, you are <strong>exempt from EES</strong>. If you're entering to claim asylum, you'll be processed through asylum procedures (not EES). Recognized refugees with travel documents issued by an EU country do not need EES for intra-Schengen travel.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I have a long-stay visa (Type D). Do I need EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. Holders of <strong>long-stay visas</strong> (Type D - work, study, family reunification) and <strong>residence permits</strong> are exempt from EES. Your visa/permit must be valid for your intended stay duration. You'll still go through border control, but will not be processed through the EES system.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if I'm physically unable to provide fingerprints?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  If fingerprinting is <strong>physically impossible</strong> (missing fingers, severe burns, medical conditions), border officers will note this in your EES record and rely on facial recognition and passport verification. You will not be denied entry. Bring medical documentation if possible. Temporary conditions (bandages, cuts) may result in delayed registration until healing.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I'm traveling on a diplomatic or official passport. Do I need EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  It depends on your passport type and bilateral agreements. <strong>Full diplomatic passports</strong> for accredited diplomats are typically exempt. <strong>Service/official passports</strong> (government employees, contractors) may still require EES unless specific exemptions apply. Check with your foreign ministry or the EU embassy in your country for confirmation.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I'm traveling for medical treatment. How does EES affect me?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Medical travelers must register with EES like all other short-stay visitors. However, EES does NOT affect your right to travel for medical reasons. Bring documentation: (1) Medical appointment confirmation, (2) Proof of payment/insurance, (3) Doctor's letter if staying beyond typical treatment duration. Medical stays may exceed 90 days with proper <strong>medical visa</strong> documentation.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>I'm a frequent business traveler. Can I get expedited EES processing?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  After your first registration, all subsequent entries are expedited automatically (less than 1 minute through automated gates). There's no special "frequent traveler" program for EES. However, some airports offer <strong>fast-track services</strong> (paid, separate from EES) that give priority boarding and security lanes. These don't bypass EES but reduce overall airport time.
                </p>
              </details>
            </div>
          </section>

          {/* Technical Issues */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">6</span>
              </div>
              Technical Issues & Troubleshooting
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What happens if the EES system is down when I arrive?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Border authorities have <strong>contingency procedures</strong> for system outages. You'll be allowed to enter after manual passport checks and document verification. Your biometric registration will be completed later (within 48 hours) or at your next entry/exit if the outage is prolonged. System downtime does NOT result in entry denial or delays beyond standard checks.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>My passport was renewed. Do I need to re-register with EES?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. EES links your biometric data to your <strong>specific passport</strong>. A new passport (new number) requires a new EES registration, even if your previous registration is still within the 3-year validity. This is a security measure to prevent identity fraud. Bring your old passport if possible to help link the records, but it's not required.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>The system shows incorrect entry/exit dates for me. How do I fix this?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Contact the <strong>border authority</strong> of the country where the error occurred or the <strong>eu-LISA data protection portal</strong>. Provide evidence: travel tickets, boarding passes, accommodation receipts, passport stamps (if any). Under GDPR, you have the right to correction of inaccurate data. Authorities must investigate and fix errors within 30 days.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if I forget to exit through an EES border control?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  This should be impossible as all external Schengen borders require EES processing. However, if you somehow exit without EES verification (technical error, emergency evacuation), the system will show you as still present in Schengen. This can trigger <strong>overstay alerts</strong>. Contact the border authority immediately with proof of departure (boarding pass, entry stamp into your next country) to correct the record.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I check my EES status online?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Currently, there is no public-facing EES portal for travelers to check their status online. Border officers can see your status when you enter/exit. Under GDPR, you can request a copy of your EES record from border authorities, but this requires a formal data access request. For tracking your 90/180 days independently, use our <Link href="/schengen-calculator" className="text-blue-600 underline font-semibold hover:text-blue-700">Schengen Calculator</Link>.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if my name changed (marriage, legal name change) since my EES registration?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  If your <strong>passport reflects your new name</strong>, you'll need to re-register with EES (new passport = new registration). If traveling on your old passport temporarily, inform border officers of your name change and bring supporting documents (marriage certificate, court order). The system links to your passport details, so mismatched names may cause delays. Update your passport first to avoid complications.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-blue-300 transition-colors">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I opt out of facial recognition at EES kiosks?</span>
                  <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. Facial biometrics are <strong>mandatory</strong> for EES registration. Opting out means you cannot enter the Schengen Area. The facial photo is used for identity verification, not for mass surveillance or social credit systems. Under EU law, facial recognition data is protected under strict GDPR standards and cannot be used for purposes beyond border control.
                </p>
              </details>
            </div>
          </section>

          {/* Final CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Bottom Summary */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Still Have Questions?</h2>
              <p className="text-blue-800 mb-6">
                Our Complete EES Readiness Guide (£7.99) includes detailed answers to 100+ questions, step-by-step registration walkthrough, country-specific procedures, and downloadable checklists for hassle-free EU travel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ees/guide"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target"
                >
                  Get Complete Guide (£7.99)
                </Link>
                <Link
                  href="/ees"
                  className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 transition-colors inline-flex items-center justify-center tap-target"
                >
                  Browse All EES Guides
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* Related Pages */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related EES Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/ees/what-is-ees" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What is EES?</h3>
                <p className="text-gray-600 text-sm mb-4">Complete introduction to the EU Entry/Exit System and how it works.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>

              <Link href="/ees/how-it-works" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How EES Works</h3>
                <p className="text-gray-600 text-sm mb-4">Step-by-step walkthrough of the EES border registration process.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>

              <Link href="/ees/requirements" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Requirements</h3>
                <p className="text-gray-600 text-sm mb-4">Complete document checklist and eligibility guide for EES registration.</p>
                <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* Enhanced Schema Markup */}
      <EnhancedSchema
        page="ees-faq"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES', url: 'https://euborder.com/ees' },
          { name: 'FAQ', url: 'https://euborder.com/ees/faq' }
        ]}
        faqItems={[
          { question: 'What is the EU Entry/Exit System (EES)?', answer: 'The EU Entry/Exit System (EES) is a digital border management system that records entry and exit data for non-EU nationals crossing EU external borders. It replaces manual passport stamping with biometric registration and automatically tracks the 90/180 day rule.' },
          { question: 'When does EES start?', answer: 'The EES system launches on October 12, 2025 at 00:01 CET across all 27 EU member states plus 4 Schengen-associated countries.' },
          { question: 'Who needs to register with EES?', answer: 'All third-country nationals (non-EU citizens) entering the Schengen Area for short stays must register with EES, including citizens of the UK, US, Canada, and Australia.' },
          { question: 'Is EES the same as ETIAS?', answer: 'No. EES is border biometric registration completed at entry points. ETIAS is pre-travel authorization applied for online before your trip. Both are required.' },
          { question: 'How much does EES registration cost?', answer: 'EES registration is completely free. There is no fee for biometric registration or entry/exit recording.' },
          { question: 'How long does EES registration take?', answer: 'First-time registration takes 5-10 minutes. Return visits take less than 1 minute with automated verification.' },
          { question: 'What biometric data is collected?', answer: 'EES collects fingerprints (four fingers) and a facial photograph, along with passport details and entry/exit dates.' },
          { question: 'How long is my biometric data stored?', answer: 'Biometric data is stored for 3 years from registration date. Entry/exit records are kept for an additional 3 years after your last movement.' },
          { question: 'Do children need to register with EES?', answer: 'Yes, all ages must register. Children under 12 are exempt from fingerprint scanning but must provide a facial photograph.' },
          { question: 'What happens if I overstay my 90 days?', answer: 'Overstaying results in entry bans (1-5 years), fines up to €10,000, deportation, and future difficulties obtaining Schengen visas or ETIAS authorization.' }
        ]}
      />
    </div>
  );
}
