'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, Mail, CheckCircle, Users, Calendar, Shield, Zap, Gift, Star, Clock, Globe } from 'lucide-react'
import { Button } from '@schengen/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@schengen/ui'
import { Badge } from '@schengen/ui'

const metadata: Metadata = {
  title: 'Free EES Preparation Kit 2025: Complete EU Border Guide & Newsletter | EU Border Authority',
  description: 'Download our free comprehensive EES preparation kit. Includes checklists, country guides, compliance tracker, and exclusive newsletter updates for October 2025 launch.',
  keywords: 'free EES preparation kit, EU border guide download, EES checklist PDF, EU entry exit system newsletter, free border compliance guide',
  authors: [{ name: 'EU Border Authority' }],
  openGraph: {
    title: 'Free EES Preparation Kit 2025: Complete EU Border Guide & Newsletter',
    description: 'Free comprehensive EES preparation kit with checklists, country guides, and exclusive updates for October 2025 launch.',
    type: 'website',
    url: 'https://euborderauthority.com/ees/preparation-kit',
    siteName: 'EU Border Authority',
    locale: 'en_US',
    images: [
      {
        url: '/images/ees-preparation-kit.jpg',
        width: 1200,
        height: 630,
        alt: 'Free EES Preparation Kit 2025'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free EES Preparation Kit 2025: Complete EU Border Guide',
    description: 'Free comprehensive EES preparation kit with checklists, country guides, and exclusive newsletter updates.',
    images: ['/images/ees-preparation-kit.jpg']
  },
  alternates: {
    canonical: 'https://euborderauthority.com/ees/preparation-kit'
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  headline: 'Free EES Preparation Kit 2025: Complete EU Border Guide & Newsletter',
  description: 'Comprehensive free EES preparation resources including checklists, country guides, and newsletter updates.',
  author: {
    '@type': 'Organization',
    name: 'EU Border Authority',
    url: 'https://euborderauthority.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'EU Border Authority',
    logo: {
      '@type': 'ImageObject',
      url: 'https://euborderauthority.com/logo.png'
    }
  },
  datePublished: '2024-12-20',
  dateModified: '2024-12-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://euborderauthority.com/ees/preparation-kit'
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    description: 'Free EES preparation kit and newsletter'
  }
}

const kitContents = [
  {
    title: 'EES Complete Preparation Checklist',
    description: '25-point comprehensive checklist for perfect EES readiness',
    icon: CheckCircle,
    pages: '3 pages',
    value: '£15'
  },
  {
    title: 'Country-Specific Implementation Guide',
    description: 'Detailed guides for France, Germany, Spain, and 8 more countries',
    icon: Globe,
    pages: '45 pages',
    value: '£35'
  },
  {
    title: 'Digital Nomad EES Strategy',
    description: 'Complete compliance strategies for nomads and frequent travelers',
    icon: Users,
    pages: '18 pages',
    value: '£25'
  },
  {
    title: 'EES Timeline & Deadlines Calendar',
    description: 'Critical dates, rollout schedule, and preparation milestones',
    icon: Calendar,
    pages: '2 pages',
    value: '£10'
  },
  {
    title: 'Emergency Contacts & Support Guide',
    description: 'Contact information for all 29 countries and troubleshooting',
    icon: Shield,
    pages: '8 pages',
    value: '£20'
  },
  {
    title: 'EES vs ETIAS Quick Reference',
    description: 'Side-by-side comparison and implementation differences',
    icon: Zap,
    pages: '4 pages',
    value: '£15'
  }
]

const newsletterBenefits = [
  'Weekly EES implementation updates from all 29 countries',
  'Early access to new country guides and preparation materials',
  'Exclusive compliance tips and strategies',
  'First notification of border processing delays or issues',
  'Digital nomad visa updates and opportunities',
  'Personal stories and case studies from EES travelers',
  'Expert interviews with immigration lawyers and border officials',
  'Exclusive discounts on premium compliance tools and services'
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Digital Nomad',
    location: 'Barcelona, Spain',
    text: 'This preparation kit saved me hours of research. The country-specific guides are incredibly detailed and practical.',
    rating: 5
  },
  {
    name: 'Marcus Weber',
    role: 'Business Traveler',
    location: 'Frankfurt, Germany',
    text: 'As someone who travels to the EU monthly, the EES preparation checklist was exactly what I needed. Comprehensive and actionable.',
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Travel Blogger',
    location: 'London, UK',
    text: 'The digital nomad strategy guide opened my eyes to visa options I never knew existed. Already applying for an Estonian nomad visa!',
    rating: 5
  }
]

export default function EESPreparationKitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/ees"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to EES Overview
              </Link>

              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  🎁 Free Resource
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  💌 Newsletter
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full p-6">
                <Gift className="w-16 h-16 text-white" />
              </div>
            </div>

            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
              🎁 FREE Download + Newsletter
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              EES Preparation Kit
              <span className="block text-green-600">Complete EU Border Guide</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get our comprehensive EES preparation kit with exclusive checklists, country guides,
              and insider strategies. Plus join 15,000+ travelers getting exclusive EES updates.
            </p>

            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">£120</div>
                <div className="text-gray-500 text-sm line-through">Usual Value</div>
              </div>
              <div className="text-4xl font-bold text-gray-400">→</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">FREE</div>
                <div className="text-green-600 text-sm font-medium">Limited Time</div>
              </div>
            </div>
          </div>

          {/* Value Alert */}
          <Card className="mb-12 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Gift className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">🎯 Why We're Giving This Away Free</h3>
                  <p className="text-green-700">
                    EES launches October 12, 2025 and affects 1.4 billion annual travelers. We believe everyone
                    deserves access to accurate preparation information. Our mission is EU border compliance
                    for all - starting with this comprehensive free resource.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Signup Form */}
          <Card className="mb-16 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 flex items-center justify-center">
                <Download className="w-8 h-8 text-blue-600 mr-3" />
                Get Your Free EES Preparation Kit
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Instant download + join our exclusive newsletter for ongoing updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 text-center text-lg h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg h-12"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Kit + Join Newsletter
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </form>

              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-2" />
                  Instant Download
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  Privacy Protected
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-purple-600 mr-2" />
                  15,000+ Subscribers
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kit Contents */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What's Included in Your Free Kit
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {kitContents.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <item.icon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
                          <CardDescription className="text-gray-600 mt-1">
                            {item.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-1">
                          {item.value}
                        </Badge>
                        <div className="text-sm text-gray-500">{item.pages}</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-yellow-100 rounded-full px-6 py-3">
                <Star className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-900">
                  Total Value: £120 - Yours Free Today
                </span>
              </div>
            </div>
          </section>

          {/* Newsletter Benefits */}
          <section className="mb-16">
            <Card className="border-l-4 border-l-blue-500 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center">
                  <Mail className="w-8 h-8 text-blue-600 mr-3" />
                  Exclusive Newsletter Benefits
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Join 15,000+ travelers staying ahead of EU border changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4">📧 What You'll Receive</h4>
                    <ul className="space-y-3">
                      {newsletterBenefits.slice(0, 4).map((benefit, index) => (
                        <li key={index} className="flex items-start text-blue-800">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4">🎯 Exclusive Content</h4>
                    <ul className="space-y-3">
                      {newsletterBenefits.slice(4).map((benefit, index) => (
                        <li key={index} className="flex items-start text-blue-800">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">📅 Publishing Schedule</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                    <div>
                      <div className="font-medium">Weekly Newsletter</div>
                      <div className="text-blue-600">Every Tuesday</div>
                    </div>
                    <div>
                      <div className="font-medium">Breaking Updates</div>
                      <div className="text-blue-600">As needed</div>
                    </div>
                    <div>
                      <div className="font-medium">Monthly Deep Dive</div>
                      <div className="text-blue-600">First Friday</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Social Proof / Testimonials */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What Travelers Are Saying
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-700 italic">
                      "{testimonial.text}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                      <div className="text-gray-500">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Master EES Compliance?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of smart travelers who are preparing now for the EES launch.
                  Download your free kit and stay ahead of the curve.
                </p>

                <form className="max-w-md mx-auto">
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 text-center text-lg h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg h-12"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Get Free Kit + Newsletter Access
                    </Button>
                  </div>
                </form>

                <div className="mt-8 grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">15,000+</div>
                    <div className="text-gray-600 text-sm">Newsletter Subscribers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">78 Pages</div>
                    <div className="text-gray-600 text-sm">Of Expert Content</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">£120</div>
                    <div className="text-gray-600 text-sm">Value - Free Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  )
}