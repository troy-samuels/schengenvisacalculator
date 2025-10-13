'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { format, isFuture } from 'date-fns'
import { Calendar, Plus, Trash2, ChevronRight, LogOut, User } from 'lucide-react'
import { toast } from 'sonner'
import {
  Button,
  CircularProgress,
  CalendarModal,
  useDateOverlapPrevention,
  Header
} from '@schengen/ui'
import {
  RobustSchengenCalculator,
  SCHENGEN_COUNTRIES,
  type Trip
} from '@schengen/calculator'
import { useUserStatus } from '../../lib/hooks/useUserStatus'
import { TripData } from '../../lib/services/trip-data'
import { createClient } from '../../lib/supabase/client'

// Visual entry type matching homepage
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

// Authority Statement Component (from homepage)
function AuthorityStatement({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center space-x-3 bg-green-50 border border-green-200 rounded-lg px-6 py-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-dm-sans font-semibold text-green-800">
          EU Regulation Compliant
        </span>
      </div>
      <div className="text-gray-400">•</div>
      <span className="text-sm font-dm-sans font-medium text-gray-700">
        Official Schengen & EES Rules
      </span>
    </div>
  )
}

// Progress Circle Component (from homepage)
function ProgressCircle({ daysRemaining, size = 80 }: { daysRemaining: number; size?: number }) {
  const percentage = (daysRemaining / 90) * 100
  const circumference = 2 * Math.PI * (size / 2 - 8)
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (daysRemaining <= 5) return '#EF4444' // red-500
    if (daysRemaining <= 15) return '#F59E0B' // amber-500
    return '#10B981' // green-500
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          stroke="#E5E7EB"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          stroke={getColor()}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold ${size > 60 ? 'text-2xl' : 'text-base'}`} style={{ color: getColor() }}>
          {daysRemaining}
        </span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const {
    user,
    loading,
    signOut,
    userTrips,
    tripsLoading,
    loadUserTrips,
    saveTrip,
    deleteTrip
  } = useUserStatus()

  const [entries, setEntries] = useState<VisaEntry[]>([])
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState<string>("")

  // Load trips from database on mount
  useEffect(() => {
    if (user && loadUserTrips) {
      loadUserTrips()
    }
  }, [user, loadUserTrips])

  // Convert database trips to visual entries
  useEffect(() => {
    if (userTrips && userTrips.length > 0) {
      // Filter out trips without valid dates first
      const validTrips = userTrips.filter(trip => trip.startDate && trip.endDate)

      const convertedEntries: VisaEntry[] = validTrips.map(trip => ({
        id: trip.id || Date.now().toString(),
        country: trip.country,
        startDate: new Date(trip.startDate!),
        endDate: new Date(trip.endDate!),
        days: 0,
        daysInLast180: 0,
        daysRemaining: 90,
        activeColumn: "complete"
      }))

      // Calculate compliance for all trips
      const trips: Trip[] = convertedEntries
        .filter(e => e.startDate && e.endDate)
        .map(e => {
          const days = Math.ceil((e.endDate!.getTime() - e.startDate!.getTime()) / (1000 * 60 * 60 * 24)) + 1
          return {
            id: e.id,
            country: e.country,
            startDate: e.startDate!,
            endDate: e.endDate!,
            days
          }
        })

      const result = RobustSchengenCalculator.calculateExactCompliance(trips)

      // Update entries with calculations
      const updatedEntries = convertedEntries.map(entry => {
        if (entry.startDate && entry.endDate) {
          const days = Math.ceil((entry.endDate.getTime() - entry.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
          return {
            ...entry,
            days,
            daysInLast180: result.totalDaysUsed,
            daysRemaining: result.daysRemaining
          }
        }
        return entry
      })

      setEntries(updatedEntries)
    } else if (userTrips && userTrips.length === 0) {
      // No trips yet - show empty state with one entry form
      setEntries([{
        id: Date.now().toString(),
        country: "",
        startDate: null,
        endDate: null,
        days: 0,
        daysInLast180: 0,
        daysRemaining: 90,
        activeColumn: "country"
      }])
    }
  }, [userTrips])

  // Update entry
  const updateEntry = useCallback((id: string, field: "country" | "dates", value: any) => {
    setEntries(prev => {
      const updated = prev.map(entry => {
        if (entry.id !== id) return entry

        if (field === "country") {
          return {
            ...entry,
            country: value,
            activeColumn: value ? "dates" : "country"
          }
        }

        if (field === "dates" && value.startDate && value.endDate) {
          const days = Math.ceil((value.endDate.getTime() - value.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
          return {
            ...entry,
            startDate: value.startDate,
            endDate: value.endDate,
            days,
            activeColumn: "complete"
          }
        }

        return entry
      })

      // Recalculate compliance
      const trips: Trip[] = updated
        .filter(e => e.country && e.startDate && e.endDate)
        .map(e => {
          const days = Math.ceil((e.endDate!.getTime() - e.startDate!.getTime()) / (1000 * 60 * 60 * 24)) + 1
          return {
            id: e.id,
            country: e.country,
            startDate: e.startDate!,
            endDate: e.endDate!,
            days
          }
        })

      if (trips.length > 0) {
        const result = RobustSchengenCalculator.calculateExactCompliance(trips)
        return updated.map(entry => ({
          ...entry,
          daysInLast180: result.totalDaysUsed,
          daysRemaining: result.daysRemaining
        }))
      }

      return updated
    })
  }, [])

  // Add new entry
  const addEntry = useCallback(() => {
    const newEntry: VisaEntry = {
      id: `new-${Date.now()}`,
      country: "",
      startDate: null,
      endDate: null,
      days: 0,
      daysInLast180: entries[0]?.daysInLast180 || 0,
      daysRemaining: entries[0]?.daysRemaining || 90,
      activeColumn: "country"
    }
    setEntries(prev => [...prev, newEntry])
  }, [entries])

  // Remove entry
  const removeEntry = useCallback(async (id: string) => {
    // If it's a saved trip, delete from database
    if (!id.startsWith('new-') && deleteTrip) {
      try {
        await deleteTrip(id)
        toast.success('Trip deleted successfully')
      } catch (error) {
        toast.error('Failed to delete trip')
        return
      }
    }

    setEntries(prev => {
      const filtered = prev.filter(e => e.id !== id)

      if (filtered.length === 0) {
        return [{
          id: Date.now().toString(),
          country: "",
          startDate: null,
          endDate: null,
          days: 0,
          daysInLast180: 0,
          daysRemaining: 90,
          activeColumn: "country"
        }]
      }

      // Recalculate
      const trips: Trip[] = filtered
        .filter(e => e.country && e.startDate && e.endDate)
        .map(e => {
          const days = Math.ceil((e.endDate!.getTime() - e.startDate!.getTime()) / (1000 * 60 * 60 * 24)) + 1
          return {
            id: e.id,
            country: e.country,
            startDate: e.startDate!,
            endDate: e.endDate!,
            days
          }
        })

      if (trips.length > 0) {
        const result = RobustSchengenCalculator.calculateExactCompliance(trips)
        return filtered.map(entry => ({
          ...entry,
          daysInLast180: result.totalDaysUsed,
          daysRemaining: result.daysRemaining
        }))
      }

      return filtered
    })
  }, [deleteTrip])

  // Save trip to database
  const handleSaveTrip = useCallback(async (entry: VisaEntry) => {
    if (!user || !saveTrip || !entry.country || !entry.startDate || !entry.endDate) return

    const tripData: TripData = {
      id: entry.id.startsWith('new-') ? 'new' : entry.id,
      country: entry.country,
      startDate: entry.startDate,
      endDate: entry.endDate,
      entry_type: 'schengen',
      notes: undefined
    }

    try {
      await saveTrip(tripData)
      toast.success('Trip saved successfully')
      // Reload trips to get updated IDs
      if (loadUserTrips) {
        loadUserTrips()
      }
    } catch (error) {
      toast.error('Failed to save trip')
    }
  }, [user, saveTrip, loadUserTrips])

  // Calendar handlers
  const handleOpenCalendar = useCallback((entryId: string) => {
    setSelectedEntryId(entryId)
    setIsCalendarOpen(true)
  }, [])

  const handleDateRangeSelect = useCallback((range: { startDate: Date | null; endDate: Date | null }) => {
    if (range.startDate && range.endDate) {
      updateEntry(selectedEntryId, "dates", { startDate: range.startDate, endDate: range.endDate })
      setIsCalendarOpen(false)

      // Auto-save if it's an existing trip
      const entry = entries.find(e => e.id === selectedEntryId)
      if (entry && !entry.id.startsWith('new-')) {
        handleSaveTrip({ ...entry, startDate: range.startDate, endDate: range.endDate })
      }
    }
  }, [selectedEntryId, updateEntry, entries, handleSaveTrip])

  // Get column border styles (from homepage)
  const getColumnBorderStyles = (entry: VisaEntry, column: string) => {
    if (entry.activeColumn === column) {
      return "border-2 border-blue-500 bg-blue-50"
    }
    return "border border-gray-200"
  }

  // Sign out handler
  const handleLogout = async () => {
    if (signOut) {
      await signOut()
      router.push('/')
    }
  }

  // Show loading spinner while authentication is loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    router.push('/')
    return null
  }

  // Show loading spinner while trips are loading
  if (tripsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your trips...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-dm-sans bg-gray-50">
      {/* Header with User Info */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Schengen Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your travel history and compliance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Minimal Header Section (from homepage) */}
      <section className="pt-12 pb-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6">
            {/* EES Ready Header */}
            <h2 className="text-sm md:text-base font-dm-sans font-medium text-gray-600">
              EES Ready • Schengen Authority • EU Border Compliance
            </h2>

            {/* Authority Badge */}
            <div className="flex justify-center">
              <AuthorityStatement />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section - EXACT SAME LAYOUT AS HOMEPAGE */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            {/* Column Headers - Desktop */}
            <div
              className="hidden md:grid gap-4 p-6 bg-gray-50 border-b"
              style={{ gridTemplateColumns: "1.4fr 2fr 1.2fr 1.3fr 1fr 48px" }}
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
              <div></div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900 text-center">EU Border Authority</h3>
              <p className="text-xs text-gray-500 text-center mt-1">Track your 90/180 day rule compliance</p>
            </div>

            {/* Calculator Rows */}
            <div className="p-6 space-y-8">
              {entries.map((entry, index) => (
                <div key={entry.id} className="relative">
                  {/* Progress Indicator - Simple Dots */}
                  <div className="flex items-center justify-center mb-6 space-x-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        entry.activeColumn === "country" || entry.country
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        entry.activeColumn === "dates" || (entry.startDate && entry.endDate)
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        entry.activeColumn === "complete" || (entry.country && entry.startDate && entry.endDate)
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid gap-6 items-center" style={{ gridTemplateColumns: "1.4fr 2fr 1.2fr 1.3fr 1fr 48px" }}>
                    {/* Country Selection */}
                    <div className={`rounded-lg p-4 ${getColumnBorderStyles(entry, "country")}`}>
                      <div className="relative">
                        <select
                          value={entry.country}
                          onChange={(e) => updateEntry(entry.id, "country", e.target.value)}
                          className="w-full bg-white border-0 shadow-sm h-12 text-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white"
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
                          {entry.days > 0 ? `${entry.days} days` : "—"}
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

                    {/* Delete button */}
                    <div className="flex items-center justify-center">
                      <button
                        aria-label="Delete entry"
                        onClick={() => removeEntry(entry.id)}
                        className="p-2 rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
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
                          className="w-full bg-white border-0 shadow-sm h-12 text-center rounded-md px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white"
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
                            {entry.days > 0 ? `${entry.days} days` : "—"}
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

                    {/* Mobile delete button */}
                    <div className="flex justify-end">
                      <button
                        aria-label="Delete entry"
                        onClick={() => removeEntry(entry.id)}
                        className="px-3 py-2 rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-colors inline-flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Helper Text */}
              {entries.length === 1 && !entries[0].country && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500 font-dm-sans">
                    Add your trips to track compliance
                  </p>
                </div>
              )}

              {/* Add Another Trip Button */}
              {entries.length > 0 && (
                <div className="flex justify-center pt-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={addEntry}
                      className="flex items-center justify-center gap-2 transition-all duration-200 rounded-md px-6 py-3 min-h-[44px] touch-manipulation text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Another Trip</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateRangeSelect={handleDateRangeSelect}
        existingTrips={entries
          .filter(e => e.id !== selectedEntryId && e.startDate && e.endDate)
          .map(e => ({
            id: e.id,
            country: e.country,
            startDate: e.startDate!,
            endDate: e.endDate!
          }))}
      />
    </div>
  )
}
