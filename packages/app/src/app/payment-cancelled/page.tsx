'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { X, ArrowLeft, CreditCard, HelpCircle, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@schengen/ui'

export default function PaymentCancelledPage() {
  const router = useRouter()
  const [showSupport, setShowSupport] = useState(false)

  const handleRetryPayment = () => {
    // Redirect back to the main app where they can try upgrading again
    router.push('/?upgrade=premium')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const supportOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with billing questions',
      action: () => window.location.href = 'mailto:support@schengenvisacalculator.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: () => {
        // TODO: Integrate with support chat system
        alert('Live chat will be available soon!')
      }
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Common questions about billing',
      action: () => window.open('/help/billing', '_blank')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            No worries! Your subscription attempt was cancelled.
          </p>
          <p className="text-gray-500">
            You haven't been charged anything.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            What would you like to do?
          </h2>

          <div className="space-y-4">
            <Button
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-3"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Try Payment Again
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Calculator
            </Button>

            <button
              onClick={() => setShowSupport(!showSupport)}
              className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors border-t border-gray-100 mt-6"
            >
              <HelpCircle className="w-5 h-5 inline mr-2" />
              Need help with your payment?
            </button>
          </div>
        </motion.div>

        {/* Support Options */}
        {showSupport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              How can we help?
            </h3>

            <div className="grid gap-4">
              {supportOptions.map((option, index) => (
                <motion.button
                  key={option.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={option.action}
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group text-left"
                >
                  <div className="w-10 h-10 bg-orange-100 group-hover:bg-orange-200 rounded-lg flex items-center justify-center mr-4">
                    <option.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{option.title}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Common Payment Issues</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Make sure your card has sufficient funds</li>
                <li>• Check that your billing address is correct</li>
                <li>• Try a different payment method if available</li>
                <li>• Contact your bank if the card is being declined</li>
              </ul>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Still interested in premium features? We're here to help!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Your cart is saved and ready when you're ready to continue.
          </p>
        </motion.div>
      </div>
    </div>
  )
}