"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { differenceInDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/useAuth"
import { SaveProgressModal } from "@/components/save-progress-modal"
import { useSchengenCalculator } from "@/lib/hooks/useSchengenCalculator"
import { MobileOptimizedCalculator } from "@/components/mobile-optimized-calculator"

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


export default function SchengenVisaCalculator() {
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

  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  const { calculateCompliance, calculateSingleEntryCompliance } = useSchengenCalculator(false)
  const [showSaveModal, setShowSaveModal] = useState(false)

  // Recalculate all entries whenever entries change
  const recalculateEntries = (updatedEntries: VisaEntry[]) => {
    // Convert entries to Trip format for the calculator
    const tripsForCalculation = updatedEntries
      .filter((entry) => entry.country && entry.startDate && entry.endDate)
      .map((entry) => ({
        id: entry.id,
        country: entry.country,
        startDate: entry.startDate!,
        endDate: entry.endDate!,
        days: entry.days,
      }))

    // Calculate overall compliance using all valid trips
    const compliance = calculateCompliance(tripsForCalculation)

    // Update each entry with calculated values
    const entriesWithCalculations = updatedEntries.map((entry) => {
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

      // Determine active column based on completion state
      let activeColumn: VisaEntry["activeColumn"] = "country"
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
        daysRemaining: compliance.daysRemaining, // This should now update correctly
        activeColumn,
      }
    })

    return entriesWithCalculations
  }

  const addEntry = () => {
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

        return updatedEntry
      }
      return entry
    })

    setEntries(recalculateEntries(updatedEntries))
  }


  // Calculate totals for display - use the same logic as recalculateEntries
  const tripsForCalculation = entries
    .filter((entry) => entry.country && entry.startDate && entry.endDate)
    .map((entry) => ({
      id: entry.id,
      country: entry.country,
      startDate: entry.startDate!,
      endDate: entry.endDate!,
      days: entry.days,
    }))

  const totalDays = entries.reduce((sum, entry) => sum + entry.days, 0)
  const compliance = calculateCompliance(tripsForCalculation)
  const totalDaysRemaining = compliance.daysRemaining

  return (
    <div className="min-h-screen font-['Onest',sans-serif]" style={{ backgroundColor: "#F4F2ED" }}>
      {/* Header */}
      <header className="shadow-sm border-b border-gray-200" style={{ backgroundColor: "#F4F2ED" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/images/visa-calculator-logo.png" alt="Visa Calculator" className="h-8 w-auto mr-3" />
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Schengen Visa Calculator</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <Link href="/login">
                <Button className="bg-black hover:bg-gray-800 text-white transition-colors duration-200 px-6 sm:px-8 py-2 rounded-full">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="text-white transition-colors duration-200 px-6 sm:px-8 py-2 rounded-full hover:opacity-90"
                  style={{ backgroundColor: "#FA9937" }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Link href="/login">
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white mr-2">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: "#FA9937" }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Plan Smarter
              <br />
              Travel Easier
            </h1>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Know Where You Can Go — Instantly See Visa Rules, Book Trips, and Travel Confidently.
            </h2>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MobileOptimizedCalculator
            entries={entries}
            countries={schengenCountries}
            onUpdateEntry={updateEntry}
            onUpdateDateRange={updateDateRange}
            onAddEntry={addEntry}
            totalDaysRemaining={totalDaysRemaining}
          />
          
          {/* Save Progress Button */}
          {totalDays > 0 && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center space-x-2 text-white px-6 py-2 rounded-full hover:opacity-90 font-medium"
                style={{ backgroundColor: "#FA9937" }}
              >
                <span>Save Progress</span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Save Progress Modal */}
      {showSaveModal && <SaveProgressModal onClose={() => setShowSaveModal(false)} entries={entries} />}

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
    </div>
  )
}
