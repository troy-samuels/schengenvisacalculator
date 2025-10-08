'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Globe, CheckCircle, AlertCircle, ArrowRight, Zap, Users, Plane, Info } from 'lucide-react';
import { EESGuideCTA } from '@/components/ees/EESGuideCTA';
import { EnhancedSchema } from '@/components/enhanced-schema';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'EES Launch Date: October 12, 2025 | Entry/Exit System Official Launch',
  description: 'The EU Entry/Exit System (EES) launches on October 12, 2025. Get ready for biometric registration at EU borders. Complete timeline, country readiness, and what to expect on launch day.',
  keywords: [
    'ees launch date',
    'when does ees start',
    'ees october 2025',
    'eu entry exit system launch',
    'ees implementation date',
    'ees go live date',
    'when is ees launching',
    'ees start date',
    'eu biometric system launch',
    'ees rollout schedule'
  ],
  openGraph: {
    title: 'EES Launch Date: October 12, 2025 | Official Entry/Exit System Launch',
    description: 'The EU Entry/Exit System launches October 12, 2025. Countdown, country readiness, and complete launch day guide.',
    type: 'website',
    url: 'https://euborder.com/ees/launch-date'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EES Launch Date: October 12, 2025',
    description: 'The EU Entry/Exit System launches in days. Get ready for biometric registration at EU borders.'
  },
  alternates: {
    canonical: 'https://euborder.com/ees/launch-date'
  }
};

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer() {
  const launchDate = new Date('2025-10-12T00:00:00Z');
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">--</div>
            <div className="text-sm md:text-base text-gray-600 font-medium">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{timeRemaining.days}</div>
        <div className="text-sm md:text-base text-gray-600 font-medium">Days</div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{timeRemaining.hours}</div>
        <div className="text-sm md:text-base text-gray-600 font-medium">Hours</div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{timeRemaining.minutes}</div>
        <div className="text-sm md:text-base text-gray-600 font-medium">Minutes</div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{timeRemaining.seconds}</div>
        <div className="text-sm md:text-base text-gray-600 font-medium">Seconds</div>
      </div>
    </div>
  );
}

export default function EESLaunchDatePage() {
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
            <span className="text-gray-900 font-medium">Launch Date</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Countdown */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 text-sm font-medium bg-red-100 text-red-800 rounded-full animate-pulse">
            🚨 Launching Soon
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EES Launch Date
            <span className="block text-blue-600 mt-2">October 12, 2025</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            The EU Entry/Exit System launches in:
          </p>

          <CountdownTimer />

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ees/guide"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center tap-target shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Ready Now - £7.99 Guide
            </Link>
            <Link
              href="/ees/requirements"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 transition-colors inline-flex items-center justify-center tap-target"
            >
              View Requirements
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Official Launch Information */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Official Launch Information
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200 mb-8">
              <div className="flex items-start gap-4">
                <Calendar className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">Launch Date Confirmed</h3>
                  <p className="text-lg text-blue-800 mb-4">
                    <strong>October 12, 2025</strong> - The EU Entry/Exit System (EES) will begin operations at all external EU borders.
                  </p>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>00:01 CET</strong> - EES becomes mandatory for all third-country nationals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>All 27 EU countries</strong> + 4 Schengen countries (Norway, Iceland, Switzerland, Liechtenstein)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>All border crossing points</strong> - airports, seaports, land borders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Clock className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">First-Time Registration</h3>
                <p className="text-gray-600">
                  Expect <strong>5-10 minutes</strong> additional time at borders for initial biometric registration.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Users className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Return Visits</h3>
                <p className="text-gray-600">
                  Subsequent entries take <strong>less than 1 minute</strong> with automated biometric verification.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Globe className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Who Needs EES</h3>
                <p className="text-gray-600">
                  All <strong>non-EU nationals</strong> entering the Schengen Area, including UK, US, Canadian, and Australian citizens.
                </p>
              </div>
            </div>
          </section>

          {/* First CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Phased Rollout Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Phased Rollout Timeline
            </h2>

            <div className="space-y-6">
              {/* Week 1 */}
              <div className="bg-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Week 1: October 12-18, 2025</h3>
                    <p className="text-gray-600 mb-4">
                      <strong>Launch Week - Universal Implementation</strong>
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>All major international airports activate EES systems simultaneously</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Expect longer queues (30-45 min) as travelers complete first-time registration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Border staff on-site to assist with registration process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Travel Tip:</strong> Arrive 3+ hours early for international flights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Month 1 */}
              <div className="bg-white border-l-4 border-indigo-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-indigo-600">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Month 1: October-November 2025</h3>
                    <p className="text-gray-600 mb-4">
                      <strong>Stabilization Period</strong>
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Border crossing times normalize as more travelers complete initial registration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Self-service kiosks become primary registration method</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Land borders and smaller airports optimize processes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Month 3+ */}
              <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Month 3+: January 2026 Onward</h3>
                    <p className="text-gray-600 mb-4">
                      <strong>Full Operation</strong>
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Majority of frequent travelers already registered</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Border crossings return to pre-EES efficiency levels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Automated gates process EES travelers in seconds</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Country Readiness Status */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Country Readiness Status
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              All 31 participating countries have confirmed readiness for the October 12, 2025 launch. Below is the implementation status by region:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Western Europe */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Western Europe</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇫🇷 France</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇩🇪 Germany</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇳🇱 Netherlands</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇧🇪 Belgium</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇱🇺 Luxembourg</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇨🇭 Switzerland</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇦🇹 Austria</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                </div>
              </div>

              {/* Southern Europe */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Southern Europe</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇪🇸 Spain</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇮🇹 Italy</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇵🇹 Portugal</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇬🇷 Greece</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇲🇹 Malta</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇨🇾 Cyprus</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇭🇷 Croatia</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                </div>
              </div>

              {/* Nordic Countries */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Nordic Countries</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇸🇪 Sweden</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇩🇰 Denmark</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇫🇮 Finland</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇳🇴 Norway</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇮🇸 Iceland</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                </div>
              </div>

              {/* Eastern Europe & Baltic */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Eastern Europe & Baltic</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇵🇱 Poland</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇨🇿 Czech Republic</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇸🇰 Slovakia</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇭🇺 Hungary</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇸🇮 Slovenia</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇪🇪 Estonia</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇱🇻 Latvia</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇱🇹 Lithuania</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">🇱🇮 Liechtenstein</span>
                    <span className="text-green-600 font-medium">Ready</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-medium mb-2">
                    All Countries Confirmed for October 12, 2025
                  </p>
                  <p className="text-blue-800 text-sm">
                    The European Commission has confirmed that all 27 EU member states and 4 Schengen-associated countries (Norway, Iceland, Switzerland, Liechtenstein) have completed EES infrastructure testing and staff training. Universal launch on October 12, 2025 is confirmed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Second CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Major Airport Implementation */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Major Airport Implementation
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              High-traffic airports have installed dedicated EES registration areas with multiple self-service kiosks and staffed assistance desks:
            </p>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Paris Charles de Gaulle (CDG)</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      120 self-service kiosks + 40 staffed registration desks across all terminals
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Estimate:</strong> 30-40 min additional wait time for first-time EES registration
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Amsterdam Schiphol (AMS)</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      90 automated gates with biometric verification + 25 registration desks
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Estimate:</strong> 25-35 min additional wait time for first-time registration
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Frankfurt Airport (FRA)</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      110 EES kiosks + automated passport control integration
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Estimate:</strong> 30-40 min additional wait time
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Madrid Barajas (MAD)</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      85 registration kiosks + multilingual staff assistance
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Estimate:</strong> 25-35 min additional wait time
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Rome Fiumicino (FCO)</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      75 self-service terminals + dedicated EES registration area
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Estimate:</strong> 30-45 min additional wait time
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Barcelona El Prat (BCN)</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      70 kiosks + fast-track lanes for already-registered travelers
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Launch Week Estimate:</strong> 25-35 min additional wait time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900 font-medium mb-2">
                    Launch Week Travel Advisory
                  </p>
                  <p className="text-yellow-800 text-sm">
                    During the first 1-2 weeks after launch (October 12-25, 2025), expect significant delays at all EU entry points as millions of travelers complete first-time EES registration. <strong>Arrive at least 3 hours before international flights.</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What to Expect on Launch Day */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              What to Expect on Launch Day
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Before You Travel</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Check your passport validity (must be valid for 6+ months beyond travel dates)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Prepare proof of accommodation and return ticket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Arrive at airport/border 3+ hours early during launch week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Read our <Link href="/ees/requirements" className="underline font-semibold hover:text-blue-600">EES Requirements Guide</Link></span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">At the Border</h3>
                <ul className="space-y-3 text-indigo-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Follow signs for "EES Registration" or "Non-EU Nationals"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Use self-service kiosks if comfortable with technology (faster)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Request assistance from border staff if needed (no penalty for help)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Complete biometric scan: fingerprints (4 fingers) + facial photo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Answer basic travel questions (purpose, duration, accommodation)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">After Registration</h3>
                <ul className="space-y-3 text-purple-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>You're registered in the EES system for 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Future entries take less than 1 minute with automated verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Your entry/exit dates are automatically tracked for Schengen 90/180 rule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>No paperwork or stamps needed - all digital</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Launch Date FAQs
            </h2>

            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I travel to the EU before October 12, 2025 without EES registration?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. If you enter the Schengen Area before October 12, 2025, the EES system is not yet mandatory. However, if your trip extends past the launch date, you will need to register when you exit or during your next entry.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What happens if I'm already in the EU on October 12, 2025?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  You'll complete your EES registration when you exit the Schengen Area. There's no need to register while you're already inside the EU. Your first interaction with the EES system will be at your exit border crossing.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Will airports be prepared for the expected delays on launch day?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. Major EU airports have installed hundreds of self-service kiosks and dedicated EES registration areas. Additional border staff will be on duty during the first weeks. However, initial delays are inevitable as millions of travelers complete first-time registration. Plan for 30-45 minutes additional time during launch week.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Can I pre-register for EES before October 12, 2025?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  No. EES registration must be completed at the border with biometric verification equipment. There is no pre-registration or online enrollment option. You must register in person at an EU entry point on or after October 12, 2025.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>Will cruise ships and ferry terminals have EES registration on launch day?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Yes. All external EU border crossing points must implement EES on October 12, 2025, including seaports. Cruise terminals and ferry operators have installed mobile EES units or dedicated registration areas. Expect additional boarding time for first-time registration.
                </p>
              </details>

              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between tap-target">
                  <span>What if I have connecting flights through multiple EU countries on launch day?</span>
                  <AlertCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  You only register once at your first EU entry point. If you fly from New York → Paris → Barcelona on October 12, you complete EES registration in Paris. Your flight to Barcelona is within the Schengen Area and doesn't require additional EES checks.
                </p>
              </details>
            </div>
          </section>

          {/* Final CTA */}
          <div className="my-16">
            <EESGuideCTA />
          </div>

          {/* Related Pages */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related EES Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/ees/requirements" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Requirements</h3>
                <p className="text-gray-600 text-sm mb-4">Complete document checklist and eligibility guide for EES registration.</p>
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

              <Link href="/ees/biometrics" className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">EES Biometric Data</h3>
                <p className="text-gray-600 text-sm mb-4">What biometric information is collected and how it's protected.</p>
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
        page="ees-launch-date"
        breadcrumbs={[
          { name: 'Home', url: 'https://euborder.com' },
          { name: 'EES', url: 'https://euborder.com/ees' },
          { name: 'Launch Date', url: 'https://euborder.com/ees/launch-date' }
        ]}
        faqItems={[
          {
            question: 'Can I travel to the EU before October 12, 2025 without EES registration?',
            answer: 'Yes. If you enter the Schengen Area before October 12, 2025, the EES system is not yet mandatory. However, if your trip extends past the launch date, you will need to register when you exit or during your next entry.'
          },
          {
            question: 'What happens if I\'m already in the EU on October 12, 2025?',
            answer: 'You\'ll complete your EES registration when you exit the Schengen Area. There\'s no need to register while you\'re already inside the EU. Your first interaction with the EES system will be at your exit border crossing.'
          },
          {
            question: 'Will airports be prepared for the expected delays on launch day?',
            answer: 'Yes. Major EU airports have installed hundreds of self-service kiosks and dedicated EES registration areas. Additional border staff will be on duty during the first weeks. However, initial delays are inevitable as millions of travelers complete first-time registration.'
          },
          {
            question: 'Can I pre-register for EES before October 12, 2025?',
            answer: 'No. EES registration must be completed at the border with biometric verification equipment. There is no pre-registration or online enrollment option.'
          }
        ]}
      />
    </div>
  );
}
