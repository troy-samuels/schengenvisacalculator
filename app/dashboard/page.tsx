"use client"

import { useState, useEffect } from "react"
import { User, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, differenceInDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { ProfileCompletionModal } from "@/components/profile-completion-modal"
import type { Profile, Country } from "@/lib/types/database"
import { useRouter } from "next/navigation"
import { useSchengenCalculator } from "@/lib/hooks/useSchengenCalculator"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MobileOptimizedCalculatorFixed } from "@/components/mobile-optimized-calculator-fixed"

interface VisaEntryLocal {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
  daysInLast180: number
  daysRemaining: number
  activeColumn: "country" | "dates" | "complete" | null
}

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
function ProgressCircle({ daysRemaining, size = 120 }: { daysRemaining: number; size?: number }) {
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

  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  // Color logic based on days remaining
  const getColor = () => {
    if (daysRemaining > 60) return "#10B981" // Green
    if (daysRemaining > 30) return "#F59E0B" // Yellow/Orange
    if (daysRemaining > 10) return "#EF4444" // Red
    return "#DC2626" // Dark Red
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`font-bold ${size > 100 ? "text-2xl" : "text-lg"}`} style={{ color: getColor() }}>
            <AnimatedCounter value={daysRemaining} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const { calculateCompliance, calculateSingleEntryCompliance } = useSchengenCalculator(false)

  const [entries, setEntries] = useState<VisaEntryLocal[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null)
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  // Load data when user is available
  useEffect(() => {
    if (user && profile) {
      loadUserData()
      loadCountries()
    }
  }, [user, profile])

  // Check if profile needs completion
  useEffect(() => {
    if (profile && !profile.profile_completed) {
      setShowProfileModal(true)
    }
  }, [profile])

  const loadCountries = async () => {
    try {
      const { data, error } = await supabase.from("countries").select("*").order("name")

      if (error) throw error
      setCountries(data || [])
    } catch (error) {
      console.error("Error loading countries:", error)
      toast({
        title: "Error loading countries",
        description: "There was a problem loading the country list. Some features may be limited.",
        variant: "destructive",
      })
    }
  }

  const loadUserData = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data: visaEntries, error } = await supabase
        .from("visa_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Convert database entries to local format
      const localEntries: VisaEntryLocal[] = (visaEntries || []).map((entry) => ({
        id: entry.id,
        country: entry.country_code,
        startDate: new Date(entry.start_date),
        endDate: new Date(entry.end_date),
        days: entry.days || 0,
        daysInLast180: 0,
        daysRemaining: 90,
        activeColumn: "complete" as const,
      }))

      // If no entries, create a default one
      if (localEntries.length === 0) {
        localEntries.push({
          id: "new-1",
          country: "",
          startDate: null,
          endDate: null,
          days: 0,
          daysInLast180: 0,
          daysRemaining: 90,
          activeColumn: "country",
        })
      }

      setEntries(recalculateEntries(localEntries))
    } catch (error) {
      console.error("Error loading user data:", error)
      toast({
        title: "Error loading data",
        description: "There was a problem loading your trips. Please refresh the page and try again.",
        variant: "destructive",
      })
      
      // Create a default entry if loading failed
      setEntries(recalculateEntries([{
        id: "new-1",
        country: "",
        startDate: null,
        endDate: null,
        days: 0,
        daysInLast180: 0,
        daysRemaining: 90,
        activeColumn: "country",
      }]))
    } finally {
      setLoading(false)
    }
  }

  const saveEntry = async (entry: VisaEntryLocal) => {
    if (!user || !entry.startDate || !entry.endDate || !entry.country) return

    try {
      const entryData = {
        user_id: user.id,
        country_code: entry.country,
        start_date: entry.startDate.toISOString().split("T")[0],
        end_date: entry.endDate.toISOString().split("T")[0],
      }

      if (entry.id.startsWith("new-")) {
        // Create new entry
        const { error } = await supabase.from("visa_entries").insert(entryData)
        if (error) throw error
        
        toast({
          title: "Trip saved",
          description: "Your trip has been automatically saved.",
        })
      } else {
        // Update existing entry
        const { error } = await supabase.from("visa_entries").update(entryData).eq("id", entry.id)
        if (error) throw error
        
        toast({
          title: "Trip updated",
          description: "Your changes have been saved.",
        })
      }
    } catch (error) {
      console.error("Error saving entry:", error)
      toast({
        title: "Error saving trip",
        description: "There was a problem saving your trip. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Recalculate all entries whenever entries change
  const recalculateEntries = (updatedEntries: VisaEntryLocal[]) => {
    const entriesWithCalculations = updatedEntries.map((entry, currentIndex) => {
      // Get trips up to and including the current index for cumulative calculation
      const tripsUpToHere = updatedEntries
        .slice(0, currentIndex + 1)
        .filter((e) => e.country && e.startDate && e.endDate)
        .map((e) => ({
          id: e.id,
          country: e.country,
          startDate: e.startDate!,
          endDate: e.endDate!,
          days: e.days,
        }))

      // Calculate cumulative compliance up to this row
      const cumulativeCompliance = calculateCompliance(tripsUpToHere)

      // Calculate individual entry days in last 180 days
      const entryDaysInLast180 =
        entry.country && entry.startDate && entry.endDate
          ? calculateSingleEntryCompliance({
              id: entry.id,
              country: entry.country,
              startDate: entry.startDate,
              endDate: entry.endDate,
              days: entry.days,
            })
          : 0

      let activeColumn: VisaEntryLocal["activeColumn"] = "country"
      if (entry.country && !entry.startDate) {
        activeColumn = "dates"
      } else if (entry.country && entry.startDate && entry.endDate) {
        activeColumn = "complete"
      } else if (!entry.country) {
        activeColumn = "country"
      }

      return {
        ...entry,
        daysInLast180: entryDaysInLast180,
        daysRemaining: cumulativeCompliance.daysRemaining, // Cumulative remaining days
        activeColumn,
      }
    })

    return entriesWithCalculations
  }

  const addEntry = () => {
    const newEntry: VisaEntryLocal = {
      id: `new-${Date.now()}`,
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

  const updateEntry = (id: string, field: keyof VisaEntryLocal, value: any) => {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        const updatedEntry = { ...entry, [field]: value }

        // Calculate days when both dates are selected
        if (field === "startDate" || field === "endDate") {
          if (updatedEntry.startDate && updatedEntry.endDate) {
            updatedEntry.days = differenceInDays(updatedEntry.endDate, updatedEntry.startDate) + 1
          } else {
            updatedEntry.days = 0
          }
        }

        // Auto-save when entry is complete
        if (updatedEntry.country && updatedEntry.startDate && updatedEntry.endDate) {
          saveEntry(updatedEntry)
        }

        return updatedEntry
      }
      return entry
    })

    setEntries(recalculateEntries(updatedEntries))
  }

  const updateDateRange = (id: string, dateRange: DateRange | undefined) => {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        const updatedEntry = {
          ...entry,
          startDate: dateRange?.from || null,
          endDate: dateRange?.to || null,
        }

        // Calculate days when both dates are selected
        if (updatedEntry.startDate && updatedEntry.endDate) {
          updatedEntry.days = differenceInDays(updatedEntry.endDate, updatedEntry.startDate) + 1
        } else {
          updatedEntry.days = 0
        }

        // Auto-save when entry is complete
        if (updatedEntry.country && updatedEntry.startDate && updatedEntry.endDate) {
          saveEntry(updatedEntry)
        }

        return updatedEntry
      }
      return entry
    })

    setEntries(recalculateEntries(updatedEntries))
  }

  const confirmDeleteEntry = (id: string) => {
    // Prevent deleting the last entry
    if (entries.length === 1) {
      toast({
        title: "Cannot delete entry",
        description: "You must have at least one trip entry.",
        variant: "destructive",
      })
      return
    }
    setEntryToDelete(id)
  }

  const deleteEntry = async (id: string) => {
    if (!id) return
    
    setDeletingEntryId(id)
    
    try {
      // If it's a saved entry (not starting with "new-"), delete from database
      if (!id.startsWith("new-")) {
        const { error } = await supabase.from("visa_entries").delete().eq("id", id)
        if (error) throw error
      }
      
      const updatedEntries = entries.filter((entry) => entry.id !== id)
      setEntries(recalculateEntries(updatedEntries))
      
      toast({
        title: "Trip deleted",
        description: "Your trip has been successfully removed.",
      })
    } catch (error) {
      console.error("Error deleting entry:", error)
      toast({
        title: "Error deleting trip",
        description: "There was a problem deleting your trip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletingEntryId(null)
      setEntryToDelete(null)
    }
  }

  const handleProfileComplete = async (updatedProfile: Partial<Profile>) => {
    if (!user) return

    try {
      const { error } = await supabase.from("profiles").update(updatedProfile).eq("id", user.id)

      if (error) throw error
      setShowProfileModal(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }


  // Use the days remaining from the last entry (which represents cumulative calculation)
  const lastEntry = entries[entries.length - 1]
  const totalDaysRemaining = lastEntry?.daysRemaining ?? 90

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F4F2ED" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen font-['Onest',sans-serif]" style={{ backgroundColor: "#F4F2ED" }}>
      {/* Header */}
      <header className="shadow-sm border-b border-gray-200" style={{ backgroundColor: "#F4F2ED" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center min-w-0 flex-1">
              <Link href="/dashboard" className="flex items-center min-w-0">
                <img src="/images/visa-calculator-logo.png" alt="Visa Calculator" className="h-6 sm:h-8 w-auto mr-2 sm:mr-3 flex-shrink-0" />
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Schengen Visa Calculator</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
              {/* User info - hidden on very small screens */}
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="truncate max-w-32 md:max-w-none">
                  {profile?.first_name && profile?.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : profile?.email}
                </span>
              </div>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-50 transition-colors duration-200 bg-transparent rounded-full px-2 sm:px-4 text-xs sm:text-sm"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Welcome back{profile?.first_name ? `, ${profile.first_name}` : ""}!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Your visa calculations are automatically saved. Continue planning your travels below.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MobileOptimizedCalculatorFixed
            entries={entries.map(entry => ({
              id: entry.id,
              country: entry.country,
              startDate: entry.startDate,
              endDate: entry.endDate,
              days: entry.days,
              daysInLast180: entry.daysInLast180,
              daysRemaining: entry.daysRemaining,
              activeColumn: entry.activeColumn,
            }))}
            countries={countries
              .filter(country => country.is_schengen)
              .map(country => ({
                code: country.code,
                name: country.name,
                flag: country.flag || "🇪🇺",
              }))}
            onUpdateEntry={updateEntry}
            onUpdateDateRange={updateDateRange}
            onAddEntry={addEntry}
            onConfirmDelete={confirmDeleteEntry}
            deletingEntryId={deletingEntryId}
            totalDaysRemaining={totalDaysRemaining}
          />
        </div>
      </section>

      {/* Profile Completion Modal */}
      {showProfileModal && (
        <ProfileCompletionModal
          onComplete={handleProfileComplete}
          onClose={() => setShowProfileModal(false)}
          countries={countries}
        />
      )}

      {/* Footer */}
      <footer className="text-gray-900 py-12" style={{ backgroundColor: "#F4F2ED" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-8">
            {/* Top section with logo and links */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              <img src="/images/visa-calculator-logo.png" alt="Visa Calculator" className="h-8 w-auto" />

              {/* Legal Links */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <a
                  href="/legal-disclaimer"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Legal Disclaimer
                </a>
                <a href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Privacy Policy
                </a>
                <a
                  href="/terms-and-conditions"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>

            {/* Bottom section with copyright */}
            <div className="border-t border-gray-300 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600">© 2024 Schengen Visa Calculator. All rights reserved.</div>
                <div className="text-xs text-gray-500">
                  This tool provides estimates only. Please consult official sources for accurate visa requirements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!entryToDelete} onOpenChange={() => setEntryToDelete(null)}>
        <AlertDialogContent className="sm:max-w-[425px] mx-4">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-lg sm:text-xl">Delete Trip</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base leading-relaxed">
              Are you sure you want to delete this trip? This action cannot be undone and will permanently remove the trip from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto order-2 sm:order-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => entryToDelete && deleteEntry(entryToDelete)}
              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto order-1 sm:order-2"
            >
              Delete Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
