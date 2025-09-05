'use client'

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { type Trip, getCountriesForSelect, SCHENGEN_COUNTRIES, RobustSchengenCalculator } from '@schengen/calculator'
import { Button, CircularProgress, CalendarModal, DateOverlapValidator, useDateOverlapPrevention, Header } from '@schengen/ui'
import { Calendar, ChevronRight, Plus, Save, Star } from 'lucide-react'
import { format, isFuture } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { User } from '@supabase/supabase-js'
import { createClient } from '../lib/supabase/client'
import { Database } from '../lib/types/database'
import { useRouter } from 'next/navigation'

// Date range type for app state
type AppDateRange = { startDate: Date | null; endDate: Date | null }

// Entry limitation constants
const MAX_FREE_ENTRIES = 5

interface VisaEntry {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
  daysInLast180: number
  daysRemaining: number
  activeColumn: "country" | "dates" | "complete" | null
}

const schengenCountries = [
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", flag: "🇮🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "LV", name: "Latvia", flag: "🇱🇻" },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
]

// Animated Counter Component
function AnimatedCounter({ value, duration = 500 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (displayValue === value) return

    const startValue = displayValue
    const difference = value - startValue
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.round(startValue + difference * easeOutQuart)

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, displayValue])

  return <span>{displayValue}</span>
}

// Progress Circle Component
function ProgressCircle({ daysRemaining, size = 80 }: { daysRemaining: number; size?: number }) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const maxDays = 90
  const percentage = Math.max(0, Math.min(100, (daysRemaining / maxDays) * 100))

  useEffect(() => {
    const startProgress = animatedProgress
    const targetProgress = percentage
    const startTime = Date.now()
    const duration = 800

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentProgress = startProgress + (targetProgress - startProgress) * easeOutQuart

      setAnimatedProgress(currentProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [percentage])

  // Dynamic stroke width based on size for better mobile proportions
  const strokeWidth = size <= 45 ? 3 : size <= 60 ? 4 : size <= 80 ? 5 : 6
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  // Color logic based on days remaining
  const getColor = () => {
    if (daysRemaining > 60) return "#10B981" // Green
    if (daysRemaining > 30) return "#F59E0B" // Yellow/Orange
    if (daysRemaining > 10) return "#EF4444" // Red
    return "#DC2626" // Dark Red
  }

  // Optimized text sizing for better mobile readability
  const getTextSize = () => {
    if (size <= 45) return "text-xs" // Mobile-optimized for 40px circles
    if (size <= 60) return "text-sm"
    if (size <= 80) return "text-lg"
    return "text-xl"
  }

  // Font weight adjustment for smaller sizes - lighter for better readability
  const getFontWeight = () => {
    return size <= 50 ? "font-semibold" : "font-bold"
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            stroke="#E5E7EB" 
            strokeWidth={strokeWidth} 
            fill="transparent" 
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center content - optimized for mobile readability */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`${getFontWeight()} ${getTextSize()} leading-tight`} 
            style={{ color: getColor() }}
          >
            <AnimatedCounter value={daysRemaining} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Star Rating Component
function StarRating({ rating = 4.9, maxStars = 5, className = "" }: { rating?: number; maxStars?: number; className?: string }) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(maxStars)].map((_, i) => (
        <Star 
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : i < rating 
            ? 'text-yellow-400 fill-yellow-400 opacity-50'
            : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm font-dm-sans font-normal text-gray-600 ml-2">{rating}</span>
    </div>
  )
}

// Avatar Group Component with Real People Images
function AvatarGroup({ className = "" }: { className?: string }) {
  const avatars = [
    { 
      name: "Sarah M.", 
      role: "Digital Nomad", 
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    { 
      name: "Marco T.", 
      role: "Business Consultant", 
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    { 
      name: "Emma K.", 
      role: "Travel Blogger", 
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    { 
      name: "Lars N.", 
      role: "Software Engineer", 
      imageUrl: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    { 
      name: "Ana S.", 
      role: "Freelancer", 
      imageUrl: "https://randomuser.me/api/portraits/women/21.jpg"
    }
  ]

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {avatars.map((avatar, index) => (
        <div
          key={avatar.name}
          className="relative group"
          title={`${avatar.name} - ${avatar.role}`}
        >
          <img
            src={avatar.imageUrl}
            alt={`${avatar.name} - ${avatar.role}`}
            className="w-10 h-10 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform duration-200 cursor-pointer"
            loading="lazy"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />
          {/* Fallback initials div */}
          <div 
            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
            style={{ display: 'none' }}
          >
            {avatar.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      ))}
    </div>
  )
}

// Social Proof Badge Component
function SocialProofBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <AvatarGroup />
      <div className="flex flex-col items-start">
        <StarRating rating={4.9} />
        <span className="text-sm text-gray-600 font-dm-sans font-normal">
          50,000+ travelers trust us
        </span>
      </div>
    </div>
  )
}

// Hero Section Component
function HeroSection({ onScrollToCalculator }: { onScrollToCalculator: () => void }) {
  const router = useRouter()
  
  return (
    <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold tracking-tight leading-none text-gray-900 mb-6"
          >
            Schengen Visa Calculator
            <span className="block text-blue-600">Master the 90/180 Day Rule</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl font-dm-sans font-normal text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed text-balance"
          >
            Join 50,000+ travelers who use our precision calculator to track Schengen visa compliance. 
            Never worry about overstaying your 90-day limit in the European Union again.
          </motion.p>
          
          {/* Test DM Sans ExtraLight 200 weight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6"
          >
            <p className="text-lg font-dm-sans font-extralight text-gray-500 max-w-2xl mx-auto">
              Precise • Reliable • EU Compliant
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <SocialProofBadge />
          </motion.div>
        </div>
      </div>
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebApplication", "TravelApplication"],
            "name": "Schengen Visa Calculator",
            "description": "Professional 90/180 day rule calculator for Schengen visa compliance",
            "url": "https://schengenvisacalculator.com",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "All",
            "browserRequirements": "Modern browsers",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "50000",
              "bestRating": "5"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Schengen Calculator"
            },
            "featureList": [
              "90/180 day rule tracking",
              "27 Schengen countries supported", 
              "Real-time compliance checking",
              "Travel date optimization",
              "EU regulation compliant"
            ]
          })
        }}
      />
    </section>
  )
}

// Get Started Section Component
function GetStartedSection({ 
  user, 
  onScrollToCalculator 
}: { 
  user?: User | null; 
  onScrollToCalculator?: () => void; 
}) {
  const router = useRouter()
  
  return (
    <div className="text-center mb-12 py-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-poppins font-semibold text-gray-900 mb-4"
      >
        Ready to Track Your Schengen Compliance?
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-gray-600 mb-6 max-w-2xl mx-auto font-dm-sans font-normal"
      >
        Get instant calculations, save your travel history, and receive alerts before you reach your limits.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Button
          onClick={() => user ? router.push('/dashboard') : router.push('/save-progress')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-dm-sans font-medium text-base transition-colors duration-200"
        >
          {user ? 'Go to Dashboard' : 'Get Started Free'}
        </Button>
      </motion.div>
    </div>
  )
}


export default function HomePage() {
  const [entries, setEntries] = useState<VisaEntry[]>([
    {
      id: "1",
      country: "",
      startDate: null,
      endDate: null,
      days: 0,
      daysInLast180: 0,
      daysRemaining: 90,
      activeColumn: "country",
    },
  ])

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState<string>("")
  
  // Router for navigation
  const router = useRouter()
  
  // Smart Floating Save Animation State
  const [showFloatingSave, setShowFloatingSave] = useState(false)
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showConversionModal, setShowConversionModal] = useState(false)
  const calculatorRef = useRef<HTMLDivElement>(null)

  // Check auth state on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Save user progress to database
  const saveUserProgress = async () => {
    if (!user?.id) {
      console.error('User not authenticated')
      return
    }

    try {
      // Delete existing entries for this user
      const { error: deleteError } = await (supabase as any)
        .from('visa_entries')
        .delete()
        .eq('user_id', user.id)

      if (deleteError) {
        console.error('Error deleting existing entries:', deleteError)
        return
      }

      // Insert new entries
      const validEntries = entries.filter(entry => 
        entry.country && entry.startDate && entry.endDate
      )

      if (validEntries.length > 0) {
        const insertData: Database['public']['Tables']['visa_entries']['Insert'][] = validEntries.map(entry => ({
          user_id: user.id,
          country: entry.country,
          start_date: entry.startDate!.toISOString().split('T')[0],
          end_date: entry.endDate!.toISOString().split('T')[0],
          entry_type: 'schengen' as const
        }))

        const { error: insertError } = await (supabase as any)
          .from('visa_entries')
          .insert(insertData)

        if (insertError) {
          console.error('Error saving progress:', insertError)
        } else {
          console.log('Progress saved successfully')
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  // Load user progress from database
  const loadUserProgress = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await (supabase as any)
        .from('visa_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: true })

      if (error) {
        console.error('Error loading progress:', error)
        return
      }

      if (data && data.length > 0) {
        const dbEntries: Database['public']['Tables']['visa_entries']['Row'][] = data
        const loadedEntries: VisaEntry[] = dbEntries.map((entry, index) => ({
          id: entry.id,
          country: entry.country,
          startDate: new Date(entry.start_date),
          endDate: new Date(entry.end_date),
          days: 0, // Will be calculated
          daysInLast180: 0, // Will be calculated
          daysRemaining: 90, // Will be calculated
          activeColumn: "complete" as const
        }))

        // Add an empty entry at the end for new trips
        loadedEntries.push({
          id: Date.now().toString(),
          country: "",
          startDate: null,
          endDate: null,
          days: 0,
          daysInLast180: 0,
          daysRemaining: 90,
          activeColumn: "country",
        })

        setEntries(recalculateEntries(loadedEntries))
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }

  // Load user progress when user logs in
  useEffect(() => {
    if (user) {
      loadUserProgress()
    }
  }, [user])

  // Smart Floating Save: Detect future dates and trigger animation
  useEffect(() => {
    const hasFutureDates = entries.some(entry => {
      if (!entry.startDate || !entry.endDate) return false
      
      // Check if either start or end date is in the future
      return isFuture(entry.startDate) || isFuture(entry.endDate)
    })

    // Show animation if:
    // 1. User has future dates in their entries
    // 2. User has at least one complete entry with dates
    // 3. Animation isn't already showing (avoid flicker)
    const hasCompleteEntries = entries.some(entry => 
      entry.country && entry.startDate && entry.endDate
    )

    if (hasFutureDates && hasCompleteEntries && !showFloatingSave) {
      // Delay the animation slightly to avoid jarring transitions
      const timer = setTimeout(() => {
        setShowFloatingSave(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else if (!hasFutureDates && showFloatingSave) {
      // Hide animation when no future dates
      setShowFloatingSave(false)
    }
  }, [entries, showFloatingSave])

  // Authentication handlers
  const handleLoginClick = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`
        }
      })
      if (error) console.error('Login error:', error)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleSignupClick = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`
        }
      })
      if (error) console.error('Signup error:', error)
    } catch (error) {
      console.error('Signup error:', error)
    }
  }

  // Save button handler - redirect to sign-up landing page when not authenticated
  const handleSaveClick = () => {
    router.push('/save-progress')
  }

  // Scroll to calculator function
  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }

  // Get countries for dropdown
  const countryOptions = getCountriesForSelect()

  // Helper functions for progressive row completion
  const isRowComplete = (entry: VisaEntry): boolean => {
    return !!(entry.country && entry.startDate && entry.endDate)
  }

  const canAddNewRow = (): boolean => {
    if (entries.length === 0) return true // Allow first row
    
    // Check if user has reached free entry limit
    if (!user && entries.length >= MAX_FREE_ENTRIES) {
      return false // Block anonymous users at limit
    }
    
    const lastEntry = entries[entries.length - 1]
    return isRowComplete(lastEntry)
  }

  // New helper to check if button is disabled due to free limit specifically
  const isAtFreeLimitWithoutUser = (): boolean => {
    return !user && entries.length >= MAX_FREE_ENTRIES
  }

  // New helper to check if button is disabled due to incomplete row
  const hasIncompleteRow = (): boolean => {
    if (entries.length === 0) return false
    const lastEntry = entries[entries.length - 1]
    return !isRowComplete(lastEntry)
  }

  const getIncompleteRowMessage = (): string => {
    if (entries.length === 0) return ""
    
    // If at free limit, don't show completion messages
    if (isAtFreeLimitWithoutUser()) {
      return ""
    }
    
    const lastEntry = entries[entries.length - 1]
    if (!lastEntry.country) return "Please select a country first"
    if (!lastEntry.startDate || !lastEntry.endDate) return "Please select your travel dates"
    return ""
  }

  // Helper function to get appropriate reference date for calculations
  const getRowReferenceDate = (tripsUpToThisRow: any[], currentTripEndDate?: Date): Date => {
    // ENHANCED: Use the current trip's end date as reference for row-specific rolling calculations
    // This shows "Total Days Used" and "Days Remaining" as of each trip's completion
    // Falls back to "today" for incomplete rows or overall compliance calculations
    
    let referenceDate: Date
    
    if (currentTripEndDate && tripsUpToThisRow.length > 0) {
      // Use the current trip's end date for row-specific rolling calculations
      referenceDate = new Date(currentTripEndDate)
      console.log('Mobile: Using trip end date as reference:', referenceDate.toDateString(), 'for row calculation')
    } else {
      // Fall back to "today" for incomplete rows or overall calculations
      referenceDate = new Date()
      console.log('Mobile: Using today as reference date:', referenceDate.toDateString(), 'for', tripsUpToThisRow.length, 'trips')
    }
    
    return referenceDate
  }

  // Recalculate all entries whenever entries change
  const recalculateEntries = (updatedEntries: VisaEntry[]) => {
    console.log('🔄 RECALCULATING ENTRIES - Input:', updatedEntries.map(e => ({
      id: e.id,
      country: e.country,
      startDate: e.startDate?.toDateString(),
      endDate: e.endDate?.toDateString(),
      days: e.days
    })))

    // First, ensure all entries have correct days calculation
    const entriesWithDays = updatedEntries.map((entry) => {
      let calculatedDays = 0
      if (entry.startDate && entry.endDate) {
        calculatedDays = Math.ceil((entry.endDate.getTime() - entry.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      }
      return {
        ...entry,
        days: calculatedDays
      }
    })

    console.log('📊 Entries with calculated days:', entriesWithDays.map(e => ({
      id: e.id,
      country: e.country,
      startDate: e.startDate?.toDateString(),
      endDate: e.endDate?.toDateString(),
      days: e.days
    })))

    // CRITICAL: Sort entries chronologically for cumulative rolling calculations
    // This ensures "Total Used" and "Days Remaining" show progressive compliance
    // Sort by start date first, then end date (CLAUDE.md mobile-first compliant)
    const chronologicalEntries = [...entriesWithDays].sort((a, b) => {
      // Incomplete entries (no dates) stay at bottom in original order
      if (!a.startDate && !b.startDate) return 0
      if (!a.startDate) return 1  // a goes after b
      if (!b.startDate) return -1 // a goes before b
      
      // Primary sort: start date (earliest first)
      if (a.startDate.getTime() !== b.startDate.getTime()) {
        return a.startDate.getTime() - b.startDate.getTime()
      }
      
      // Secondary sort: end date (if start dates are equal)
      if (a.endDate && b.endDate) {
        return a.endDate.getTime() - b.endDate.getTime()
      }
      
      // Handle cases where only one has end date
      if (!a.endDate && b.endDate) return 1   // a goes after b
      if (a.endDate && !b.endDate) return -1  // a goes before b
      
      return 0 // Equal
    })
    
    console.log('🗓️ Chronologically sorted entries:', chronologicalEntries.map((e, idx) => ({
      displayIndex: idx,
      id: e.id,
      country: e.country,
      startDate: e.startDate?.toDateString() || 'No start date',
      endDate: e.endDate?.toDateString() || 'No end date',
      days: e.days
    })))

    // Convert chronological entries to Trip format for the calculator
    const tripsForCalculation = chronologicalEntries
      .filter((entry) => entry.country && entry.startDate && entry.endDate)
      .map((entry) => ({
        id: entry.id,
        country: entry.country,
        startDate: entry.startDate!,
        endDate: entry.endDate!,
        days: entry.days,
      }))

    // Calculate overall compliance using dynamic reference date
    const overallReferenceDate = getRowReferenceDate(tripsForCalculation)
    const compliance = tripsForCalculation.length > 0 
      ? RobustSchengenCalculator.calculateExactCompliance(tripsForCalculation, overallReferenceDate)
      : { totalDaysUsed: 0, daysRemaining: 90, isCompliant: true }

    // Update each chronologically sorted entry with calculated values
    // This shows cumulative "Total Used" and "Days Remaining" based on chronological progression
    const entriesWithCalculations = chronologicalEntries.map((entry, index) => {
      console.log(`\n🔍 ROW ${index}: Processing entry ${entry.country || 'incomplete'} (ID: ${entry.id})`)

      // Determine active column based on completion state
      let activeColumn: VisaEntry["activeColumn"] = "country"
      if (entry.country && !entry.startDate) {
        activeColumn = "dates"
      } else if (entry.country && entry.startDate && entry.endDate) {
        activeColumn = "complete"
      } else if (!entry.country) {
        activeColumn = "country"
      }

      // Calculate cumulative days up to this chronological row (including this row)
      // Uses chronological order to show progressive compliance from earliest trip
      const tripsUpToThisRow = chronologicalEntries.slice(0, index + 1)
        .filter(e => e.country && e.startDate && e.endDate)
        .map(e => ({
          id: e.id,
          country: e.country,
          startDate: e.startDate!,
          endDate: e.endDate!,
          days: e.days
        }))

      console.log(`  📋 Chronological trips up to this row (${tripsUpToThisRow.length} total):`, 
        tripsUpToThisRow.map(t => ({
          country: t.country,
          dates: `${t.startDate.toDateString()} → ${t.endDate.toDateString()}`,
          days: t.days
        })))
      
      // Mobile-specific debugging for chronological order (CLAUDE.md compliance)
      console.log(`  📱 Mobile: Chronological row ${index} processing ${entry.country || 'incomplete'} with ${tripsUpToThisRow.length} cumulative trips`)

      // Sort trips chronologically by end date for proper rolling calculation
      // (Input is already chronologically sorted by start date, this sorts by end date for rolling window)
      const sortedTrips = [...tripsUpToThisRow].sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
      
      console.log(`  🗓️  End-date sorted trips for rolling window calculation:`, 
        sortedTrips.map(t => ({
          country: t.country,
          endDate: t.endDate.toDateString(),
          days: t.days
        })))

      // Use trip-specific reference date for this row's rolling calculation
      // For completed trips, use the current trip's end date as reference
      // This shows rolling compliance as of each trip's completion
      const currentTripEndDate = entry.endDate || undefined
      const rowReferenceDate = getRowReferenceDate(sortedTrips, currentTripEndDate)
      
      console.log(`  🎯 Reference date for row ${index}: ${rowReferenceDate.toDateString()} ${currentTripEndDate ? '(trip end date)' : '(today)'}`)
      console.log(`  📅 180-day window: ${new Date(rowReferenceDate.getTime() - 179 * 24 * 60 * 60 * 1000).toDateString()} → ${rowReferenceDate.toDateString()}`)

      const cumulativeCompliance = sortedTrips.length > 0
        ? RobustSchengenCalculator.calculateExactCompliance(sortedTrips, rowReferenceDate)
        : { totalDaysUsed: 0, daysRemaining: 90, isCompliant: true }

      console.log(`  ✅ Calculator result:`, {
        totalDaysUsed: cumulativeCompliance.totalDaysUsed,
        daysRemaining: cumulativeCompliance.daysRemaining,
        isCompliant: cumulativeCompliance.isCompliant
      })
      
      // Detailed analysis of which trips fall within rolling window
      if (sortedTrips.length > 0) {
        const windowStart = new Date(rowReferenceDate.getTime() - 179 * 24 * 60 * 60 * 1000)
        console.log(`  🔍 Trip analysis for rolling window:`)
        sortedTrips.forEach(trip => {
          const inWindow = trip.endDate >= windowStart && trip.startDate <= rowReferenceDate
          const overlapDays = inWindow ? Math.min(
            Math.ceil((Math.min(trip.endDate.getTime(), rowReferenceDate.getTime()) - Math.max(trip.startDate.getTime(), windowStart.getTime())) / (1000 * 60 * 60 * 24)) + 1,
            trip.days
          ) : 0
          console.log(`    ${inWindow ? '✅' : '❌'} ${trip.country}: ${trip.startDate.toDateString()} → ${trip.endDate.toDateString()} (${overlapDays} days count in window)`)
        })
      }

      return {
        ...entry,
        daysInLast180: cumulativeCompliance.totalDaysUsed, // Show cumulative total up to this row
        daysRemaining: cumulativeCompliance.daysRemaining, // Show remaining days based on cumulative total
        activeColumn,
      }
    })

    return entriesWithCalculations
  }

  const addEntry = () => {
    // Check if user has reached free limit and show conversion modal
    if (!user && entries.length >= MAX_FREE_ENTRIES) {
      setShowConversionModal(true)
      return
    }

    const newEntry: VisaEntry = {
      id: Date.now().toString(),
      country: "",
      startDate: null,
      endDate: null,
      days: 0,
      daysInLast180: 0,
      daysRemaining: 90,
      activeColumn: "country",
    }
    const updatedEntries = [...entries, newEntry]
    setEntries(recalculateEntries(updatedEntries))
  }

  const updateEntry = (id: string, field: keyof VisaEntry, value: any) => {
    console.log('Mobile: Updating entry field:', field, 'with value:', value, 'for entry:', id)
    
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        const updatedEntry = { ...entry, [field]: value }

        // Calculate days when both dates are selected
        if (field === "startDate" || field === "endDate") {
          if (updatedEntry.startDate && updatedEntry.endDate) {
            updatedEntry.days = Math.ceil((updatedEntry.endDate.getTime() - updatedEntry.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
            console.log('Mobile: Calculated days for entry:', updatedEntry.days)
          } else {
            updatedEntry.days = 0
          }
        }

        console.log('Mobile: Updated entry:', { 
          id: updatedEntry.id, 
          country: updatedEntry.country, 
          startDate: updatedEntry.startDate?.toDateString(), 
          endDate: updatedEntry.endDate?.toDateString(), 
          days: updatedEntry.days 
        })

        return updatedEntry
      }
      return entry
    })

    setEntries(recalculateEntries(updatedEntries))
  }

  const updateDateRange = (id: string, dateRange: AppDateRange) => {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        const updatedEntry = {
          ...entry,
          startDate: dateRange.startDate || null,
          endDate: dateRange.endDate || null,
        }

        // Calculate days when both dates are selected
        if (updatedEntry.startDate && updatedEntry.endDate) {
          updatedEntry.days = Math.ceil((updatedEntry.endDate.getTime() - updatedEntry.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        } else {
          updatedEntry.days = 0
        }

        return updatedEntry
      }
      return entry
    })

    setEntries(recalculateEntries(updatedEntries))
  }

  const getColumnBorderStyles = (entry: VisaEntry, columnType: "country" | "dates" | "results") => {
    const isActive = entry.activeColumn === columnType

    const isCompleted = 
      (entry.activeColumn === "dates" && columnType === "country") ||
      (entry.activeColumn === "complete" && (columnType === "country" || columnType === "dates"))

    const isNext = 
      (entry.activeColumn === "country" && columnType === "dates" && entry.country) ||
      (entry.activeColumn === "dates" && columnType === "results")

    if (isActive) {
      return "border-2 border-blue-500 bg-blue-50"
    } else if (isCompleted) {
      return "border-2 border-green-300 bg-green-50"
    } else if (isNext) {
      return "border-2 border-orange-300 bg-orange-50"
    } else {
      return "border border-gray-200 bg-gray-50"
    }
  }

  const handleOpenCalendar = (entryId: string) => {
    setSelectedEntryId(entryId)
    setIsCalendarOpen(true)
  }

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false)
    setSelectedEntryId("")
  }

  const handleDateRangeSelect = (range: AppDateRange) => {
    if (!selectedEntryId) return

    // Validate date range for conflicts before updating
    const validation = DateOverlapValidator.validateDateRange(
      range, 
      tripsForValidation, 
      selectedEntryId
    )

    if (!validation.isValid) {
      // Log helpful message (in the future, could show a toast notification)
      console.warn('Date conflict detected:', validation.message)
      console.log('Conflicting trips:', validation.conflicts.map(c => `${c.country} (${c.startDate?.toDateString()} - ${c.endDate?.toDateString()})`))
      // Don't update the range if there's a conflict
      return
    }

    // Range is valid, proceed with update
    console.log('Mobile: Updating date range for entry:', selectedEntryId, 'with range:', range)
    updateDateRange(selectedEntryId, range)
    
    // Force a recalculation after a short delay to ensure mobile rendering updates
    setTimeout(() => {
      setEntries(currentEntries => {
        console.log('Mobile: Forcing recalculation after date selection')
        return recalculateEntries([...currentEntries])
      })
    }, 100)
  }

  // Calculate totals for display
  const totalDays = entries.reduce((sum, entry) => sum + entry.days, 0)
  const tripsForCalculation = entries
    .filter((entry) => entry.country && entry.startDate && entry.endDate)
    .map((entry) => ({
      id: entry.id,
      country: entry.country,
      startDate: entry.startDate!,
      endDate: entry.endDate!,
      days: entry.days,
    }))

  // Use "today" as reference date for overall compliance display
  // Overall compliance should always reflect current 90/180 status
  const overallDisplayReferenceDate = getRowReferenceDate(tripsForCalculation) // Falls back to "today" without trip end date
  const compliance = tripsForCalculation.length > 0 
    ? RobustSchengenCalculator.calculateExactCompliance(tripsForCalculation, overallDisplayReferenceDate)
    : { totalDaysUsed: 0, daysRemaining: 90, isCompliant: true }
  
  // Enhanced mobile debug logging for overall compliance
  console.log('Mobile: Overall compliance calculation:', {
    totalTrips: tripsForCalculation.length,
    referenceDate: overallDisplayReferenceDate.toDateString(),
    totalDaysUsed: compliance.totalDaysUsed,
    daysRemaining: compliance.daysRemaining,
    isCompliant: compliance.isCompliant
  })

  // Date overlap prevention: Convert entries to TripEntry format for validation
  const tripsForValidation = useMemo(() => {
    return entries.map(entry => ({
      id: entry.id,
      country: entry.country,
      startDate: entry.startDate,
      endDate: entry.endDate,
      days: entry.days
    }))
  }, [entries])

  // Get date overlap prevention data for the currently selected entry
  const currentEntryId = selectedEntryId
  const { getDisabledDates, getOccupiedDateInfo } = useDateOverlapPrevention({
    existingTrips: tripsForValidation,
    excludeTripId: currentEntryId // Exclude current entry when editing
  })

  // Get disabled dates and occupied date info for the calendar
  const disabledDates = useMemo(() => getDisabledDates(), [getDisabledDates])
  const occupiedDateInfo = useMemo(() => getOccupiedDateInfo(), [getOccupiedDateInfo])

  return (
    <div className="min-h-screen font-dm-sans" style={{ backgroundColor: "#F4F2ED" }}>
      {/* Header Navigation */}
      <Header 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        user={user}
        loading={loading}
      />
      
      {/* Hero Section with Social Proof */}
      <HeroSection onScrollToCalculator={scrollToCalculator} />

      {/* Get Started Section */}
      <GetStartedSection user={user} onScrollToCalculator={scrollToCalculator} />

            {/* Calculator Section */}
      <section ref={calculatorRef} className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Column Headers - Desktop */}
            <div
              className="hidden md:grid gap-4 p-6 bg-gray-50 border-b"
              style={{ gridTemplateColumns: "1fr 2fr 1.2fr 1.5fr 1fr" }}
            >
              <div className="text-center">
                <h3 className="font-dm-sans font-semibold text-gray-900">Country</h3>
              </div>
              <div className="text-center">
                <h3 className="font-dm-sans font-semibold text-gray-900">Date Range</h3>
              </div>
              <div className="text-center">
                <h3 className="font-dm-sans font-semibold text-gray-900">This Trip</h3>
                <p className="text-xs text-gray-500">Days</p>
              </div>
              <div className="text-center">
                <h3 className="font-dm-sans font-semibold text-gray-900 text-sm">Total Used</h3>
                <p className="text-xs text-gray-500">Last 180 days</p>
              </div>
              <div className="text-center">
                <h3 className="font-dm-sans font-semibold text-gray-900">Remaining</h3>
                <p className="text-xs text-gray-500">Out of 90</p>
              </div>
            </div>
            
            {/* Mobile Header */}
            <div className="md:hidden p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900 text-center">Schengen Visa Calculator</h3>
              <p className="text-xs text-gray-500 text-center mt-1">Track your 90/180 day rule compliance</p>
            </div>

            {/* Calculator Rows */}
            <div className="p-6 space-y-8">
              {entries.map((entry, index) => (
                <div key={entry.id} className="relative">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center mb-4 space-x-2 relative z-20">
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        entry.activeColumn === "country"
                          ? "bg-blue-500"
                          : entry.country
                            ? "bg-green-500"
                            : "bg-gray-300"
                      }`}
                    />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        entry.activeColumn === "dates"
                          ? "bg-blue-500"
                          : (entry.startDate && entry.endDate)
                            ? "bg-green-500"
                            : entry.country
                              ? "bg-orange-400"
                              : "bg-gray-300"
                      }`}
                    />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        entry.activeColumn === "complete" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid gap-6 items-center" style={{ gridTemplateColumns: "1fr 2fr 1.2fr 1.5fr 1fr" }}>
                    {/* Country Selection */}
                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "country")}`}>
                      <div className="relative">
                                    <select
              value={entry.country}
              onChange={(e) => updateEntry(entry.id, "country", e.target.value)}
              className="w-full bg-white border-0 shadow-sm h-12 text-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white"
            >
                          <option value="" disabled>🇪🇺 Select Country</option>
                          {schengenCountries.map(country => (
                            <option key={country.code} value={country.code} className="text-gray-900 font-medium">
                              {country.flag} {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        </div>
                      {entry.activeColumn === "country" && (
                        <div className="text-xs text-blue-600 mt-2 text-center font-medium relative z-10">
                          Select a country to continue
                            </div>
                          )}
                    </div>

                    {/* Date Range */}
                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "dates")}`}>
                      <Button
                        variant="outline"
                        className="w-full justify-center items-center text-center font-normal bg-white h-12 text-sm px-6 border-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex hover:bg-white"
                        disabled={!entry.country}
                        onClick={() => handleOpenCalendar(entry.id)}
                      >
                        {entry.startDate && entry.endDate ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-medium text-gray-800">
                              {`${format(entry.startDate, "MMM dd")} - ${format(entry.endDate, "MMM dd")}`}
                            </span>
                            <Calendar className="h-4 w-4 flex-shrink-0 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span className="font-medium text-gray-800">
                              {!entry.country ? "Select country first" : "Select dates"}
                            </span>
                          </div>
                        )}
                      </Button>
                      {entry.activeColumn === "dates" && (
                        <div className="text-xs text-blue-600 mt-2 text-center font-medium relative z-10">
                          {!entry.country ? "Select a country first" : "Select your travel dates"}
                        </div>
                      )}
                    </div>

                    {/* Results Columns */}
                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "results")}`}>
                      <div className="bg-white rounded-lg p-3 font-semibold text-base text-center border-0 shadow-sm h-12 flex items-center justify-center relative z-10">
                        <span className="font-medium text-gray-800 text-sm">
                          {entry.days > 0 ? `${entry.days} days` : "Select dates first"}
                        </span>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "results")}`}>
                      <div className="bg-white rounded-lg p-3 font-semibold text-base text-center border-0 shadow-sm h-12 flex items-center justify-center relative z-10">
                        <span className="font-medium text-gray-800 text-sm">
                          {entry.country && entry.startDate && entry.endDate ? `${entry.daysInLast180} days` : "—"}
                        </span>
                      </div>
                  </div>
                  
                    {/* Days Remaining with Progress Circle */}
                    <div className="rounded-lg p-2">
                      <div className="flex items-center justify-center h-20">
                        <ProgressCircle daysRemaining={entry.daysRemaining} size={80} />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-4">
                    {/* Country Selection */}
                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "country")}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <div className="relative">
                        <select
                          value={entry.country}
                          onChange={(e) => updateEntry(entry.id, "country", e.target.value)}
                          className="w-full bg-white border-0 shadow-sm h-12 text-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white"
                        >
                          <option value="" disabled>🇪🇺 Select Country</option>
                          {schengenCountries.map(country => (
                            <option key={country.code} value={country.code} className="text-gray-900 font-medium">
                              {country.flag} {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {entry.activeColumn === "country" && (
                        <div className="text-xs text-blue-600 mt-2 text-center font-medium">
                          Select a country to continue
                        </div>
                      )}
                    </div>

                    {/* Date Range */}
                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "dates")}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
                      <Button
                        variant="outline"
                        className="w-full justify-center items-center text-center font-normal bg-white h-12 text-sm px-6 border-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex hover:bg-white"
                        disabled={!entry.country}
                        onClick={() => handleOpenCalendar(entry.id)}
                      >
                        {entry.startDate && entry.endDate ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-medium text-gray-800">
                              {`${format(entry.startDate, "MMM dd")} - ${format(entry.endDate, "MMM dd")}`}
                            </span>
                            <Calendar className="h-4 w-4 flex-shrink-0 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            <span className="font-medium text-gray-800">
                              {!entry.country ? "Select country first" : "Select dates"}
                            </span>
                          </div>
                        )}
                      </Button>
                      {entry.activeColumn === "dates" && (
                        <div className="text-xs text-blue-600 mt-2 text-center font-medium">
                          {!entry.country ? "Select a country first" : "Select your travel dates"}
                        </div>
                      )}
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* This Trip */}
                      <div className={`rounded-lg p-3 ${getColumnBorderStyles(entry, "results")}`}>
                        <label className="block text-xs font-medium text-gray-500 mb-1 text-center">This Trip</label>
                        <div className="bg-white rounded-lg p-2 font-semibold text-sm text-center border-0 shadow-sm h-10 flex items-center justify-center">
                          <span className="font-medium text-gray-800 text-sm">
                            {entry.days > 0 ? `${entry.days} days` : "Select dates first"}
                          </span>
                        </div>
                      </div>

                      {/* Total Used */}
                      <div className={`rounded-lg p-3 ${getColumnBorderStyles(entry, "results")}`}>
                        <label className="block text-xs font-medium text-gray-500 mb-1 text-center">Total Used</label>
                        <div className="bg-white rounded-lg p-2 font-semibold text-sm text-center border-0 shadow-sm h-10 flex items-center justify-center">
                          <span className="font-medium text-gray-800 text-sm">
                            {entry.country && entry.startDate && entry.endDate ? `${entry.daysInLast180} days` : "—"}
                          </span>
                        </div>
                      </div>

                      {/* Days Remaining */}
                      <div className="rounded-lg p-3">
                        <label className="block text-xs font-medium text-gray-500 mb-1 text-center">Remaining</label>
                        <div className="flex items-center justify-center h-12 py-1">
                          <ProgressCircle daysRemaining={entry.daysRemaining} size={42} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Row Button */}
              <div className="flex justify-center pt-4 space-x-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={isAtFreeLimitWithoutUser() ? () => setShowConversionModal(true) : addEntry}
                    disabled={!canAddNewRow() && !isAtFreeLimitWithoutUser()}
                    className={`flex items-center justify-center gap-2 transition-colors duration-200 rounded-full px-4 sm:px-6 py-2.5 sm:py-2 border min-h-[44px] touch-manipulation ${
                      canAddNewRow()
                        ? 'hover:bg-gray-50 bg-white border-gray-300 cursor-pointer'
                        : isAtFreeLimitWithoutUser()
                          ? 'hover:opacity-90 cursor-pointer border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100'
                          : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                    }`}
                    style={{ fontFamily: 'inherit' }}
                  >
                    {isAtFreeLimitWithoutUser() ? (
                      <>
                        <Save className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <span className="font-medium text-xs sm:text-sm text-orange-600 text-center">Save Progress for Unlimited Entries</span>
                      </>
                    ) : (
                      <>
                        <span className={`font-medium text-sm ${canAddNewRow() ? 'text-gray-800' : 'text-gray-400'} flex-shrink-0`}>+</span>
                        <span className={`font-medium text-xs sm:text-sm ${canAddNewRow() ? 'text-gray-800' : 'text-gray-400'} text-center`}>Add Another Trip</span>
                      </>
                    )}
                  </button>
                  {!canAddNewRow() && !isAtFreeLimitWithoutUser() && (
                    <div className="text-xs text-gray-500 mt-2 text-center max-w-48">
                      {getIncompleteRowMessage()}
                    </div>
                  )}
                  
                  {/* Free Limit Call-to-Action */}
                  {isAtFreeLimitWithoutUser() && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 max-w-sm mx-auto">
                      <div className="text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2 sm:mb-0 sm:mr-2">
                            <span className="text-lg">🚀</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-poppins font-bold text-gray-900 text-center sm:text-left">
                            Add Unlimited Travel Dates
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 font-dm-sans mb-4 leading-relaxed">
                          You've used your {MAX_FREE_ENTRIES} free entries. Save your progress to add unlimited trips and keep your calculations safe.
                        </p>
                        <button
                          onClick={() => setShowConversionModal(true)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 sm:py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
                        >
                          <Save className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm sm:text-base">Save Progress to Continue</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {totalDays > 0 && (
                  <motion.div
                    animate={showFloatingSave && !prefersReducedMotion ? { 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 4px 14px 0 rgba(250, 153, 55, 0.3)",
                        "0 8px 24px 0 rgba(250, 153, 55, 0.5)", 
                        "0 4px 14px 0 rgba(250, 153, 55, 0.3)"
                      ]
                    } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 2,
                      repeat: showFloatingSave && !prefersReducedMotion ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <Button
                      onClick={user ? saveUserProgress : handleSaveClick}
                      className={`flex flex-row items-center justify-center gap-2 text-white px-6 py-2 rounded-full hover:opacity-90 font-medium transition-all duration-200 motion-reduce:transition-none ${
                        showFloatingSave ? 'ring-2 ring-orange-300 ring-opacity-50 motion-reduce:ring-0' : ''
                      }`}
                      style={{ backgroundColor: "#FA9937" }}
                    >
                      <motion.div
                        animate={showFloatingSave && !prefersReducedMotion ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ 
                          duration: prefersReducedMotion ? 0 : 1.5, 
                          repeat: showFloatingSave && !prefersReducedMotion ? Infinity : 0, 
                          ease: "easeInOut" 
                        }}
                        className="flex items-center flex-shrink-0"
                      >
                        <Save className="h-4 w-4" />
                      </motion.div>
                      <span className="font-dm-sans font-medium">
                        {user ? 'Save Progress' : 'Login to Save'}
                      </span>
                      
                      {/* Static visual indicator for reduced motion users */}
                      {showFloatingSave && (
                        <div className="hidden motion-reduce:block ml-2">
                          <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                        </div>
                      )}
                    </Button>
                    
                    {/* Pulsing ring animation for attention (hidden for reduced motion users) */}
                    {showFloatingSave && !prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-orange-400"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                )}
              </div>
                </div>
              </div>
        </div>
      </section>

        {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={handleCloseCalendar}
        onDateRangeSelect={handleDateRangeSelect}
        initialRange={{ startDate: null, endDate: null }}
        disabledDates={disabledDates}
        occupiedDateInfo={occupiedDateInfo}
        minDate={new Date(new Date().getFullYear() - 10, 0, 1)} // 10 years ago
        maxDate={new Date(new Date().getFullYear() + 5, 11, 31)} // 5 years in future
        />

      {/* Conversion Modal */}
      <AnimatePresence>
        {showConversionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConversionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Save className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-2">
                  Save Your Progress & Continue
                </h2>
                <p className="text-gray-600 font-dm-sans">
                  Keep building your travel timeline with unlimited entries
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Current Progress */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Your Current Progress</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{entries.length}</span>
                    <span className="text-sm text-blue-700">trips calculated</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">
                    Unlock with free account:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Plus className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-dm-sans">Unlimited trip entries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Calendar className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-dm-sans">Analytics dashboard</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Save className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-dm-sans">Progress auto-saved</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/save-progress')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-poppins font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Create Free Account
                  </Button>
                  <Button
                    onClick={() => setShowConversionModal(false)}
                    variant="ghost"
                    className="w-full text-gray-600 hover:text-gray-800 font-dm-sans py-2"
                  >
                    Maybe later
                  </Button>
                </div>

                {/* Trust indicator */}
                <p className="text-xs text-gray-500 text-center mt-4 font-dm-sans">
                  No credit card required • Join 50,000+ travelers
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
  )
}