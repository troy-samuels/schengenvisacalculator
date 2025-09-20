'use client'

import React, { useState } from 'react'
import { Mail, Download, CheckCircle, Gift, Users, Calendar, Shield } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Badge } from './badge'

interface EESNewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline' | 'sidebar'
  title?: string
  description?: string
  showBenefits?: boolean
  showTestimonial?: boolean
  className?: string
}

export function EESNewsletterSignup({
  variant = 'default',
  title,
  description,
  showBenefits = true,
  showTestimonial = false,
  className = ''
}: EESNewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call - replace with actual newsletter signup logic
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  const defaultTitle = variant === 'compact'
    ? 'Get EES Updates'
    : 'Free EES Preparation Kit + Newsletter'

  const defaultDescription = variant === 'compact'
    ? 'Stay updated on EES implementation across 29 EU countries'
    : 'Download our comprehensive EES preparation guide and join 15,000+ travelers getting exclusive updates'

  const benefits = [
    'Weekly EES implementation updates',
    'Country-specific preparation guides',
    'Digital nomad compliance strategies',
    'Early access to tools and resources'
  ]

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Gift className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">{title || defaultTitle}</h3>
              <p className="text-sm text-gray-600">{description || 'Get our free EES preparation guide'}</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">FREE</Badge>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
            disabled={isSubmitting || isSubmitted}
          />
          <Button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Sending...' : isSubmitted ? 'Sent!' : 'Get Kit'}
          </Button>
        </form>

        {isSubmitted && (
          <div className="mt-3 flex items-center text-green-700 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Check your email for your free EES preparation kit!
          </div>
        )}
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <Card className={`sticky top-8 ${className}`}>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-3">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-lg">{title || 'Free EES Kit'}</CardTitle>
          <CardDescription className="text-sm">
            {description || 'Complete preparation guide + updates'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting || isSubmitted}
              className="text-center"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting ? (
                'Sending...'
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Sent!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Get Free Kit
                </>
              )}
            </Button>
          </form>

          {isSubmitted && (
            <div className="mt-3 text-center text-green-700 text-xs">
              Check your email for download link!
            </div>
          )}

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-xs text-gray-600">
              <Users className="w-3 h-3 mr-2 text-blue-600" />
              15,000+ subscribers
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Shield className="w-3 h-3 mr-2 text-green-600" />
              No spam, unsubscribe anytime
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className={`border-2 border-blue-200 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{title || defaultTitle}</h3>
                <p className="text-sm text-gray-600">{description || defaultDescription}</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">FREE</Badge>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={isSubmitting || isSubmitted}
            />
            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Joining...' : isSubmitted ? 'Joined!' : 'Join Now'}
            </Button>
          </form>

          {isSubmitted && (
            <div className="mt-3 flex items-center text-green-700 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Welcome! Check your email for the preparation kit.
            </div>
          )}

          <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              15K+ subscribers
            </div>
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Privacy protected
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Weekly updates
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={`border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 ${className}`}>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-gray-900">
          {title || defaultTitle}
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          {description || defaultDescription}
        </CardDescription>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <Badge className="bg-green-100 text-green-800">FREE</Badge>
          <Badge className="bg-blue-100 text-blue-800">£120 Value</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center text-lg h-12"
              disabled={isSubmitting || isSubmitted}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg h-12"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting ? (
                'Sending Your Kit...'
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Check Your Email!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Get Free Kit + Join Newsletter
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 text-center">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </form>

        {isSubmitted && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900">Success! Kit on the way.</h3>
            <p className="text-green-800 text-sm">
              Check your email for the download link and welcome to our community!
            </p>
          </div>
        )}

        {showBenefits && (
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">What You'll Get:</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        )}

        {showTestimonial && (
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 italic mb-2">
              "This preparation kit saved me hours of research. The country guides are incredibly detailed and practical."
            </p>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Sarah Chen</span> - Digital Nomad, Barcelona
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-blue-600 mr-2" />
            15,000+ Subscribers
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 text-green-600 mr-2" />
            Privacy Protected
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-purple-600 mr-2" />
            Weekly Updates
          </div>
        </div>
      </CardContent>
    </Card>
  )
}