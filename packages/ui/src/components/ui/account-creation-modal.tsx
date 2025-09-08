"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { useConversionAnalytics } from '../../hooks/useConversionAnalytics'
import { X, Save, FileText, List, Bell, History, Chrome, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export interface AccountCreationModalProps {
  isOpen: boolean
  onClose: () => void
  trigger?: string // Which feature triggered the modal
  onEmailSignup: (email: string, password: string, name: string) => Promise<void>
  onGoogleSignup: () => Promise<void>
  loading?: boolean
  error?: string | null
}

// Feature-specific content for the modal
const getModalContent = (trigger?: string) => {
  const content = {
    save_trip: {
      icon: <Save className="w-8 h-8 text-blue-600" />,
      title: "Save Your Travel Data",
      subtitle: "Never lose your trip calculations again",
      benefits: [
        "Save unlimited trip calculations",
        "Access your data from any device", 
        "Track your travel history",
        "Get basic export options"
      ],
      cta: "Create account to save this trip"
    },
    export: {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Export Your Results",
      subtitle: "Get professional travel reports",
      benefits: [
        "Screenshot exports included",
        "Save reports for visa applications",
        "Share with travel agents",
        "Upgrade later for PDF reports"
      ],
      cta: "Create account to export results"
    },
    trip_list: {
      icon: <List className="w-8 h-8 text-purple-600" />,
      title: "Organize Your Trips",
      subtitle: "Keep track of multiple destinations",
      benefits: [
        "Create and organize trip lists",
        "Track business vs personal travel",
        "Plan complex itineraries", 
        "Upgrade for unlimited lists"
      ],
      cta: "Create account to organize trips"
    },
    alerts: {
      icon: <Bell className="w-8 h-8 text-amber-600" />,
      title: "Never Miss Important Deadlines",
      subtitle: "Get notified about visa compliance",
      benefits: [
        "Basic visa deadline alerts",
        "Email notifications",
        "Stay compliant automatically",
        "Upgrade for smart alerts"
      ],
      cta: "Create account for alerts"
    },
    history: {
      icon: <History className="w-8 h-8 text-indigo-600" />,
      title: "Access Your Travel History",
      subtitle: "See all your past calculations",
      benefits: [
        "Complete travel timeline",
        "Reference past trips",
        "Track compliance over time",
        "Export historical data"
      ],
      cta: "Create account to view history"
    },
    default: {
      icon: <Save className="w-8 h-8 text-blue-600" />,
      title: "Unlock Smart Travel Features",
      subtitle: "Join thousands of compliant travelers",
      benefits: [
        "Save unlimited calculations",
        "Export professional reports",
        "Get compliance alerts",
        "Track travel history"
      ],
      cta: "Create your free account"
    }
  }

  return content[trigger as keyof typeof content] || content.default
}

export function AccountCreationModal({
  isOpen,
  onClose,
  trigger,
  onEmailSignup,
  onGoogleSignup,
  loading = false,
  error = null
}: AccountCreationModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const analytics = useConversionAnalytics()

  const modalContent = getModalContent(trigger)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !name || loading || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onEmailSignup(email, password, name)
      // Track successful account creation
      analytics.trackAccountCreated(trigger || 'default', 'email')
    } catch (error) {
      console.error('Account creation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignup = async () => {
    if (loading || isSubmitting) return
    try {
      await onGoogleSignup()
      // Track successful Google account creation
      analytics.trackAccountCreated(trigger || 'default', 'google')
    } catch (error) {
      console.error('Google signup error:', error)
    }
  }

  const handleClose = (reason: 'close_button' | 'overlay_click' | 'escape_key') => {
    analytics.trackModalDismissed('account', trigger || 'default', reason)
    onClose()
  }

  const isFormValid = email && password && name && password.length >= 6

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => handleClose('overlay_click')}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 px-6 py-8">
              <button
                onClick={() => handleClose('close_button')}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {modalContent.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {modalContent.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {modalContent.subtitle}
                </p>

                {/* Benefits list */}
                <div className="text-left">
                  <ul className="space-y-2">
                    {modalContent.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                >
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Google Signup - Primary CTA */}
              <Button
                onClick={handleGoogleSignup}
                disabled={loading || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mb-6"
              >
                <Chrome className="h-5 w-5 mr-3" />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or create with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    disabled={loading || isSubmitting}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="pl-10"
                      disabled={loading || isSubmitting}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      minLength={6}
                      className="pl-10 pr-10"
                      disabled={loading || isSubmitting}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading || isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid || loading || isSubmitting}
                  variant="outline"
                  className="w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? 'Creating Account...' : modalContent.cta}
                </Button>
              </form>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By creating an account, you agree to our{' '}
                <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AccountCreationModal