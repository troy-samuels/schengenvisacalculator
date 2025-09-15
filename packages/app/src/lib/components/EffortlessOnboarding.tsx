/**
 * Effortless Onboarding Flow
 * Apple-like seamless journey from Anonymous → Premium
 * Smart defaults, minimal friction, immediate value demonstration
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@schengen/ui'
import { Button } from '@schengen/ui'
import { Input } from '@schengen/ui'
import { Badge } from '@schengen/ui'
import { Loader2, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react'

interface EffortlessOnboardingProps {
  onComplete?: (userDetails: { email: string; paymentSuccess: boolean }) => void
  onSkip?: () => void
  className?: string
}

type OnboardingStep = 'value_preview' | 'smart_demo' | 'effortless_signup' | 'instant_premium' | 'success'

export function EffortlessOnboarding({
  onComplete,
  onSkip,
  className = ''
}: EffortlessOnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('value_preview')
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)
  const [detectedLocation, setDetectedLocation] = useState('United Kingdom')
  const [smartDefaults, setSmartDefaults] = useState({
    travelStyle: 'Leisure',
    familySize: 1,
    budgetRange: 'Mid-range'
  })

  // Auto-detect user context on mount
  useEffect(() => {
    // Simulate smart detection of user context
    const detectContext = setTimeout(() => {
      // Would use actual geolocation/IP detection in production
      setDetectedLocation('United Kingdom')
      setSmartDefaults({
        travelStyle: 'Leisure',
        familySize: 1,
        budgetRange: 'Mid-range'
      })
    }, 500)

    return () => clearTimeout(detectContext)
  }, [])

  // Auto-advance demo
  useEffect(() => {
    if (currentStep === 'smart_demo') {
      const interval = setInterval(() => {
        setDemoProgress(prev => {
          if (prev >= 100) {
            setCurrentStep('effortless_signup')
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [currentStep])

  const handleStartJourney = () => {
    setCurrentStep('smart_demo')
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsProcessing(true)
    setCurrentStep('instant_premium')

    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep('success')
      setIsProcessing(false)
      
      setTimeout(() => {
        onComplete?.({ email, paymentSuccess: true })
      }, 2000)
    }, 3000)
  }

  const steps = {
    value_preview: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 
                         rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">AI Travel Intelligence</span>
          </div>
          
          <h2 className="text-2xl font-light text-gray-900">
            Transform Your European Travel
          </h2>
          
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            See how AI intelligence saves you £100s per trip while ensuring perfect compliance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          <ValuePreviewCard
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
            title="Average Savings"
            value="£347 per trip"
            description="Through intelligent deal hunting"
          />
          <ValuePreviewCard
            icon={<Shield className="w-5 h-5 text-blue-600" />}
            title="Compliance Rate"
            value="100%"
            description="Zero overstay risk with AI monitoring"
          />
          <ValuePreviewCard
            icon={<Zap className="w-5 h-5 text-purple-600" />}
            title="Planning Time"
            value="90% reduced"
            description="From hours to minutes with AI"
          />
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleStartJourney}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     text-white px-8 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl
                     transition-all duration-300 transform hover:scale-105"
          >
            See AI Intelligence in Action
          </Button>
          
          <div className="text-sm text-gray-500">
            <span>30-day guarantee • Cancel anytime • UK company</span>
          </div>
        </div>
      </motion.div>
    ),

    smart_demo: (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        className="space-y-6"
      >
        <div className="text-center space-y-3">
          <h3 className="text-xl font-light text-gray-900">
            AI Analyzing Your Travel Context
          </h3>
          <p className="text-gray-600 text-sm">
            Location: {detectedLocation} • Travel Style: {smartDefaults.travelStyle}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${demoProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="space-y-3">
            <DemoStep
              completed={demoProgress > 20}
              title="Scanning travel deals..."
              subtitle="Found 47 opportunities for European destinations"
            />
            <DemoStep
              completed={demoProgress > 40}
              title="Analyzing Schengen compliance..."
              subtitle="Optimal travel windows identified for UK citizens"
            />
            <DemoStep
              completed={demoProgress > 60}
              title="Calculating Brexit requirements..."
              subtitle="ETA preparation timeline mapped"
            />
            <DemoStep
              completed={demoProgress > 80}
              title="Personalizing recommendations..."
              subtitle="£347 average savings detected for your profile"
            />
          </div>
        </div>

        {demoProgress >= 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Intelligence Ready • Unlock Full Access
            </Badge>
          </motion.div>
        )}
      </motion.div>
    ),

    effortless_signup: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <div className="text-center space-y-3">
          <h3 className="text-xl font-light text-gray-900">
            Unlock Your AI Travel Intelligence
          </h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto">
            One email, instant access. Your first AI savings recommendation appears in seconds.
          </p>
        </div>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-blue-500 
                       focus:ring-blue-500 text-center text-lg"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">AI Travel Intelligence</span>
              <span className="font-medium text-gray-900">£24.99/month</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>30-day guarantee • Cancel anytime</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Save £300+ per trip
              </Badge>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!email || isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl
                     transition-all duration-300 transform hover:scale-105 disabled:transform-none
                     disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Activating Intelligence...</span>
              </div>
            ) : (
              'Unlock Intelligence - Start Saving'
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Continue with basic calculator
            </button>
          </div>
        </form>
      </motion.div>
    ),

    instant_premium: (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="text-center space-y-6"
      >
        <div className="space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Sparkles className="w-12 h-12 text-purple-600" />
          </motion.div>
          
          <h3 className="text-xl font-light text-gray-900">
            Activating AI Intelligence
          </h3>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Setting up your personal travel assistant...</div>
            <div className="text-xs text-gray-500">Connecting to live travel data</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700">Payment processed securely</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700">AI models initializing</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-700">Travel intelligence ready</span>
          </div>
        </div>
      </motion.div>
    ),

    success: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-green-600 text-2xl"
          >
            ✓
          </motion.div>
        </motion.div>

        <div className="space-y-3">
          <h3 className="text-xl font-light text-gray-900">
            Welcome to AI Travel Intelligence
          </h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto">
            Your personal travel assistant is now active. First savings recommendation incoming...
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <div className="text-left flex-1">
              <div className="font-medium text-gray-900 text-sm">First AI Insight Ready</div>
              <div className="text-gray-600 text-xs">Found £127 savings opportunity for France trips</div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              New
            </Badge>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {steps[currentStep]}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

interface ValuePreviewCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}

function ValuePreviewCard({ icon, title, value, description }: ValuePreviewCardProps) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0 text-left">
        <div className="text-xs text-gray-600">{title}</div>
        <div className="font-semibold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  )
}

interface DemoStepProps {
  completed: boolean
  title: string
  subtitle: string
}

function DemoStep({ completed, title, subtitle }: DemoStepProps) {
  return (
    <motion.div
      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-500"
      animate={{
        backgroundColor: completed ? '#f0fdf4' : '#f9fafb'
      }}
    >
      <motion.div
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
        animate={{
          borderColor: completed ? '#22c55e' : '#d1d5db',
          backgroundColor: completed ? '#22c55e' : 'transparent'
        }}
      >
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white text-xs font-bold"
          >
            ✓
          </motion.div>
        )}
      </motion.div>
      <div className="flex-1 min-w-0 text-left">
        <div className={`text-sm font-medium ${completed ? 'text-green-900' : 'text-gray-700'}`}>
          {title}
        </div>
        <div className={`text-xs ${completed ? 'text-green-600' : 'text-gray-500'}`}>
          {subtitle}
        </div>
      </div>
    </motion.div>
  )
}

export default EffortlessOnboarding