"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUserStatus } from '../../lib/hooks/useUserStatus'
import { Button } from '@schengen/ui'
import { Input } from '@schengen/ui'
import { Label } from '@schengen/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@schengen/ui'
import { Badge } from '@schengen/ui'
import { 
  Lock, 
  TrendingUp, 
  Globe, 
  AlertCircle, 
  Calendar,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Gauge,
  CheckCircle,
  Star,
  Info,
  Shield
} from 'lucide-react'
import { 
  getCountriesForCitizenshipSelect, 
  getRuleApplicability, 
  isSubjectTo90180Rule 
} from '@schengen/calculator'

interface TimelineData {
  date: string;
  daysUsed: number;
  daysRemaining: number;
  riskLevel: 'safe' | 'monitor' | 'warning';
  country: string;
}

interface CountryUsage {
  country: string;
  daysSpent: number;
  percentage: number;
  flag: string;
  color: string;
}

interface RiskAssessment {
  currentRisk: number; // 0-100 scale
  daysUntilRisk: number;
  recommendationsCount: number;
}

// Sample data to show in the greyed-out preview
const sampleTimelineData: TimelineData[] = [
  { date: '2024-01', daysUsed: 15, daysRemaining: 75, riskLevel: 'safe', country: 'Germany' },
  { date: '2024-02', daysUsed: 28, daysRemaining: 62, riskLevel: 'safe', country: 'France' },
  { date: '2024-03', daysUsed: 45, daysRemaining: 45, riskLevel: 'monitor', country: 'Spain' },
  { date: '2024-04', daysUsed: 67, daysRemaining: 23, riskLevel: 'warning', country: 'Italy' },
]

const sampleCountryData: CountryUsage[] = [
  { country: 'Germany', daysSpent: 23, percentage: 34, flag: '🇩🇪', color: '#3B82F6' },
  { country: 'France', daysSpent: 18, percentage: 27, flag: '🇫🇷', color: '#10B981' },
  { country: 'Spain', daysSpent: 15, percentage: 22, flag: '🇪🇸', color: '#F59E0B' },
  { country: 'Italy', daysSpent: 11, percentage: 17, flag: '🇮🇹', color: '#EF4444' },
]

const sampleRiskData: RiskAssessment = {
  currentRisk: 73,
  daysUntilRisk: 23,
  recommendationsCount: 4
}

export default function SaveProgressPage() {
  const router = useRouter()
  const { signUp, signIn } = useUserStatus()

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    primaryCitizenship: '',
    additionalCitizenships: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [showAdditionalCitizenships, setShowAdditionalCitizenships] = useState(false)

  // Get countries list for dropdown
  const countriesForSelect = getCountriesForCitizenshipSelect()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCountrySelect = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      primaryCitizenship: countryCode
    }))
  }

  const handleAdditionalCitizenshipToggle = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      additionalCitizenships: prev.additionalCitizenships.includes(countryCode)
        ? prev.additionalCitizenships.filter(code => code !== countryCode)
        : [...prev.additionalCitizenships, countryCode]
    }))
  }

  // Calculate rule applicability
  const allCitizenships = formData.primaryCitizenship 
    ? [formData.primaryCitizenship, ...formData.additionalCitizenships]
    : []
  
  const ruleApplicability = allCitizenships.length > 0 
    ? getRuleApplicability(allCitizenships) 
    : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLoginMode) {
        console.log('🔐 Logging in with Supabase...', {
          email: formData.email
        })

        // Login existing user
        await signIn(formData.email, formData.password)

        console.log('✅ Login successful!')
      } else {
        console.log('🚀 Creating account with Supabase...', {
          email: formData.email,
          name: formData.name,
          primaryCitizenship: formData.primaryCitizenship
        })

        // Create account with Supabase
        await signUp(formData.email, formData.password, formData.name)

        console.log('✅ Account created successfully!')

        // TODO: Save user profile data (citizenship, etc.) to database
      }

      // Redirect to main page - user is now logged in
      router.push('/')
    } catch (error: any) {
      console.error('❌ Authentication failed:', error)
      const errorMessage = isLoginMode
        ? 'Login failed. Please check your email and password.'
        : 'Failed to create account. Please try again.'
      setError(error.message || errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = isLoginMode
    ? formData.email && formData.password.length >= 1
    : formData.email && formData.name && formData.password.length >= 8 && formData.primaryCitizenship

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebPage", "SoftwareApplication"],
            "name": "Schengen Travel Progress Tracker",
            "description": "Save and track your Schengen visa compliance with advanced analytics",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "90/180 day rule tracking",
              "Travel pattern analytics",
              "Country usage breakdown",
              "Compliance risk assessment",
              "Travel optimization insights"
            ]
          })
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Save Your Schengen Travel Progress
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Never lose track of your 90/180 day compliance again. Get instant insights into your travel patterns and optimize your Europe trips.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Column: Analytics Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                See Your 90/180 Day Compliance at a Glance
              </h2>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  EU Regulation Compliant
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  27 countries
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  4.9/5 rating
                </div>
              </div>
            </div>

            {/* Analytics Preview Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6" 
              data-testid="analytics-preview"
              role="region"
              aria-label="Travel analytics preview"
            >
              {/* 90/180 Timeline Chart */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
                data-testid="timeline-chart"
                aria-label="90-day travel timeline showing optimal travel windows for compliance tracking"
              >
                <Card className="h-full relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                      90/180 Timeline
                    </CardTitle>
                    <CardDescription>Track your rolling compliance periods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleTimelineData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.date}</span>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  data.riskLevel === 'safe' ? 'bg-green-500' : 
                                  data.riskLevel === 'monitor' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(data.daysUsed / 90) * 100}%` }}
                              />
                            </div>
                            <Badge variant={data.riskLevel === 'safe' ? 'default' : 'warning'} className="text-xs">
                              {data.daysUsed}d
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  {/* Greyed overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-4">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600">Preview</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Country Breakdown Chart */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
                data-testid="country-chart"
                aria-label="Country breakdown revealing most visited Schengen destinations with usage statistics"
              >
                <Card className="h-full relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-green-600" />
                      Country Usage
                    </CardTitle>
                    <CardDescription>Where you spend your Schengen days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleCountryData.map((country, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{country.flag}</span>
                            <span className="text-sm font-medium">{country.country}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full transition-all duration-500"
                                style={{ 
                                  width: `${country.percentage}%`,
                                  backgroundColor: country.color 
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8 text-right">{country.daysSpent}d</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  {/* Greyed overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-4">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600">Preview</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Risk Assessment Gauge */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
                data-testid="risk-gauge"
                aria-label="Compliance risk assessment meter showing current violation risk level"
              >
                <Card className="h-full relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Gauge className="h-5 w-5 mr-2 text-orange-600" />
                      Risk Assessment
                    </CardTitle>
                    <CardDescription>Avoid compliance violations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="relative w-24 h-24 mx-auto">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={sampleRiskData.currentRisk > 80 ? '#ef4444' : sampleRiskData.currentRisk > 60 ? '#f59e0b' : '#10b981'}
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 40 * (sampleRiskData.currentRisk / 100)}, ${2 * Math.PI * 40}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-900">{sampleRiskData.currentRisk}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{sampleRiskData.daysUntilRisk} days</span> until risk
                        </p>
                        <p className="text-xs text-gray-500">
                          {sampleRiskData.recommendationsCount} recommendations available
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  {/* Greyed overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-4">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600">Preview</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Travel Heatmap */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
                data-testid="travel-heatmap"
                aria-label="Travel intensity calendar showing seasonal patterns and optimal travel windows"
              >
                <Card className="h-full relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                      Travel Heatmap
                    </CardTitle>
                    <CardDescription>Seasonal travel patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <div key={index} className="text-xs text-gray-400 py-1">{day}</div>
                      ))}
                      {Array.from({ length: 28 }, (_, index) => {
                        const intensity = Math.random()
                        return (
                          <div
                            key={index}
                            className={`h-3 w-3 rounded-sm ${
                              intensity > 0.7 ? 'bg-green-500' :
                              intensity > 0.4 ? 'bg-green-300' :
                              intensity > 0.1 ? 'bg-green-100' :
                              'bg-gray-100'
                            }`}
                          />
                        )
                      })}
                    </div>
                    <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                      <span>Less</span>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-100 rounded-sm"></div>
                        <div className="h-2 w-2 bg-green-100 rounded-sm"></div>
                        <div className="h-2 w-2 bg-green-300 rounded-sm"></div>
                        <div className="h-2 w-2 bg-green-500 rounded-sm"></div>
                      </div>
                      <span>More</span>
                    </div>
                  </CardContent>
                  {/* Greyed overlay */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-4">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600">Preview</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Unlock Overlay Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center py-6"
              data-testid="unlock-overlay"
            >
              <div className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Lock className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-800 font-medium">Create account to unlock your travel insights</span>
              </div>
            </motion.div>

            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Active travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">27</div>
                <div className="text-sm text-gray-600">Schengen countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1M+</div>
                <div className="text-sm text-gray-600">Days tracked</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">
                  {isLoginMode ? 'Welcome Back!' : 'Unlock My Travel Insights'}
                </CardTitle>
                <CardDescription>
                  {isLoginMode
                    ? 'Sign in to access your saved travel data and insights'
                    : 'Join thousands of travelers who optimize their Europe trips with data'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Get your travel insights at email@example.com"
                      required
                      className="mt-1"
                      data-testid="email-input"
                    />
                  </div>

                  {!isLoginMode && (
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Track progress under your name"
                        required
                        className="mt-1"
                        data-testid="name-input"
                      />
                    </div>
                  )}

                  {/* Citizenship fields - only show for signup */}
                  {!isLoginMode && (
                    <>
                      <div>
                        <Label htmlFor="primaryCitizenship" className="text-sm font-medium text-gray-700">
                          Country of Citizenship
                        </Label>
                        <select
                          id="primaryCitizenship"
                          name="primaryCitizenship"
                          value={formData.primaryCitizenship}
                          onChange={(e) => handleCountrySelect(e.target.value)}
                          required
                          className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          data-testid="citizenship-select"
                        >
                          <option value="" disabled>Select your country of citizenship</option>
                          {countriesForSelect.map(({ value, label, category, region }) => (
                            <option key={value} value={value} className="py-2">
                              {label} {category === 'affected_by_90_180' ? '(90/180 rule applies)' :
                               category === 'eu_eea_swiss' ? '(EU/EEA/Swiss citizen)' : '(Visa required)'}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          This helps us determine which travel rules apply to you
                        </p>
                      </div>

                      {/* Rule Applicability Display */}
                      {ruleApplicability && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg border ${
                            ruleApplicability.isSubjectToRule
                              ? 'bg-blue-50 border-blue-200'
                              : ruleApplicability.exemptionReason === 'eu_citizen'
                                ? 'bg-green-50 border-green-200'
                                : 'bg-yellow-50 border-yellow-200'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {ruleApplicability.isSubjectToRule ? (
                              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            ) : ruleApplicability.exemptionReason === 'eu_citizen' ? (
                              <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p className={`text-sm font-medium ${
                                ruleApplicability.isSubjectToRule
                                  ? 'text-blue-800'
                                  : ruleApplicability.exemptionReason === 'eu_citizen'
                                    ? 'text-green-800'
                                    : 'text-yellow-800'
                              }`}>
                                {ruleApplicability.message}
                              </p>
                              {!ruleApplicability.isSubjectToRule && (
                                <p className="text-xs text-gray-600 mt-1">
                                  You can still use our travel planning tools to track your European travels.
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Additional Citizenships */}
                      {formData.primaryCitizenship && (
                        <div>
                          <button
                            type="button"
                            onClick={() => setShowAdditionalCitizenships(!showAdditionalCitizenships)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {showAdditionalCitizenships ? 'Hide' : 'Add'} additional citizenships (optional)
                          </button>

                          {showAdditionalCitizenships && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3"
                            >
                              <p className="text-xs text-gray-600 mb-2">
                                Select any additional citizenships or passports you hold:
                              </p>
                              {countriesForSelect
                                .filter(country => country.value !== formData.primaryCitizenship)
                                .map(({ value, label }) => (
                                <label key={value} className="flex items-center space-x-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={formData.additionalCitizenships.includes(value)}
                                    onChange={() => handleAdditionalCitizenshipToggle(value)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span>{label}</span>
                                </label>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a secure password (8+ characters)"
                      required
                      minLength={8}
                      className="mt-1"
                      data-testid="password-input"
                    />
                    {formData.password && formData.password.length < 8 && (
                      <p className="text-xs text-red-600 mt-1">Password must be at least 8 characters</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || loading}
                    loading={loading}
                    loadingText={isLoginMode ? "Signing In..." : "Creating Account..."}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                    data-testid="unlock-insights-button"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {!loading && <CheckCircle className="h-5 w-5" />}
                      <span>{isLoginMode ? 'Sign In' : 'Unlock My Travel Insights'}</span>
                    </div>
                  </Button>

                  {/* Login/Signup Mode Toggle */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginMode(!isLoginMode)
                        setError(null)
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {isLoginMode
                        ? "Don't have an account? Sign up here"
                        : "Already have an account? Sign in here"
                      }
                    </button>
                  </div>

                  <div className="text-center text-xs text-gray-500 space-y-2">
                    {!isLoginMode && (
                      <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
                    )}
                    <div className="flex items-center justify-center space-x-4 pt-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        <span>No credit card required</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        <span>EU compliant</span>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <div className="mt-6 text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>SSL Encrypted</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                100% accurate calculations based on official EU border authority rules for all 66+ countries subject to the 90/180 rule
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Smart Travelers Save Their Schengen Data
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get instant insights into your Schengen compliance</h3>
              <p className="text-gray-600">Real-time analytics help you stay within the 90/180 day rule</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track your 90-day usage across all trips</h3>
              <p className="text-gray-600">Never lose track of your travel history and compliance status</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visualize travel patterns and optimize future planning</h3>
              <p className="text-gray-600">Smart recommendations help you maximize your Europe travel</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}