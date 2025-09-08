'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Crown, ArrowRight, Download, Users, Zap, Shield, X } from 'lucide-react'
import { Button } from '@schengen/ui'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [isLoading, setIsLoading] = useState(true)
  const [sessionDetails, setSessionDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      // Verify the payment session and get details
      verifyPaymentSession(sessionId)
    } else {
      setError('No payment session found')
      setIsLoading(false)
    }
  }, [sessionId])

  const verifyPaymentSession = async (sessionId: string) => {
    try {
      console.log(`🔍 Verifying payment session: ${sessionId}`)
      
      const response = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify session')
      }
      
      if (data.success && data.session) {
        setSessionDetails(data.session)
        console.log('✅ Payment verified successfully:', data.session)
      } else {
        throw new Error('Invalid session data received')
      }
      
      setIsLoading(false)
      
    } catch (error) {
      console.error('❌ Failed to verify payment:', error)
      setError(error instanceof Error ? error.message : 'Failed to verify payment. Please contact support.')
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verifying Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your subscription...
          </p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <Button
            onClick={() => router.push('/')}
            className="w-full"
          >
            Return Home
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Welcome to Premium!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your subscription has been activated successfully
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium">
            <Crown className="w-4 h-4 mr-2" />
            {sessionDetails?.tier?.charAt(0).toUpperCase() + sessionDetails?.tier?.slice(1)} Plan Active
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subscription Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Subscription Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-gray-900">
                  Premium {sessionDetails?.billingCycle === 'yearly' ? 'Annual' : 'Monthly'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold text-gray-900">
                  ${sessionDetails?.amount}/{sessionDetails?.billingCycle === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Next Billing</span>
                <span className="font-semibold text-gray-900">
                  {new Date(Date.now() + (sessionDetails?.billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  Active
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">30-Day Money-Back Guarantee</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Now Available */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Now Available to You
            </h2>
            
            <div className="space-y-4">
              {[
                { icon: Download, title: 'Professional PDF Exports', desc: 'Beautiful reports perfect for visa applications' },
                { icon: Users, title: 'Unlimited Trip Lists', desc: 'Organize trips by project, client, or purpose' },
                { icon: Zap, title: 'Smart Alerts & Notifications', desc: 'Never miss important visa deadlines again' },
                { icon: Crown, title: 'Priority Support', desc: 'Get help faster with premium support' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <Button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Start Using Premium Features
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                A confirmation email has been sent to {sessionDetails?.customerEmail}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Payment Details
          </h2>
          <p className="text-gray-600">
            Please wait...
          </p>
        </motion.div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}