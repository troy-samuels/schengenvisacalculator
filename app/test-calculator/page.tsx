'use client'

import { useState } from 'react'
import { MobileOptimizedCalculatorFixed } from '@/components/mobile-optimized-calculator-fixed'
import { differenceInDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'

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
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
]

export default function TestCalculator() {
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

  const updateEntry = (id: string, field: keyof VisaEntry, value: any) => {
    console.log('UPDATE ENTRY CALLED:', { id, field, value })
    
    setEntries(prevEntries => {
      const updatedEntries = prevEntries.map((entry) => {
        if (entry.id === id) {
          const updatedEntry = { ...entry, [field]: value }
          console.log('UPDATING ENTRY:', updatedEntry)
          
          // Calculate days when both dates are selected
          if (field === "startDate" || field === "endDate") {
            if (updatedEntry.startDate && updatedEntry.endDate) {
              updatedEntry.days = differenceInDays(updatedEntry.endDate, updatedEntry.startDate) + 1
            } else {
              updatedEntry.days = 0
            }
          }

          // Update active column
          if (updatedEntry.country && !updatedEntry.startDate) {
            updatedEntry.activeColumn = "dates"
          } else if (updatedEntry.country && updatedEntry.startDate && updatedEntry.endDate) {
            updatedEntry.activeColumn = "complete"
          } else if (!updatedEntry.country) {
            updatedEntry.activeColumn = "country"
          }

          return updatedEntry
        }
        return entry
      })
      
      console.log('UPDATED ENTRIES:', updatedEntries)
      return updatedEntries
    })
  }

  const updateDateRange = (id: string, dateRange: DateRange | undefined) => {
    console.log('UPDATE DATE RANGE CALLED:', { id, dateRange })
    
    setEntries(prevEntries => {
      const updatedEntries = prevEntries.map((entry) => {
        if (entry.id === id) {
          const updatedEntry = {
            ...entry,
            startDate: dateRange?.from || null,
            endDate: dateRange?.to || null,
          }

          // Calculate days when both dates are selected
          if (updatedEntry.startDate && updatedEntry.endDate) {
            updatedEntry.days = differenceInDays(updatedEntry.endDate, updatedEntry.startDate) + 1
            updatedEntry.daysInLast180 = updatedEntry.days // Simplified for testing
          } else {
            updatedEntry.days = 0
            updatedEntry.daysInLast180 = 0
          }

          // Update remaining days (simplified)
          const totalDays = updatedEntry.daysInLast180
          updatedEntry.daysRemaining = Math.max(0, 90 - totalDays)

          return updatedEntry
        }
        return entry
      })

      console.log('UPDATED ENTRIES WITH DATES:', updatedEntries)
      return updatedEntries
    })
  }

  const addEntry = () => {
    console.log('ADD ENTRY CALLED')
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
    setEntries(prev => {
      const updated = [...prev, newEntry]
      console.log('ENTRIES AFTER ADD:', updated)
      return updated
    })
  }

  const confirmDeleteEntry = (id: string) => {
    console.log('DELETE ENTRY CALLED:', id)
    setEntries(prev => {
      const updated = prev.filter(entry => entry.id !== id)
      console.log('ENTRIES AFTER DELETE:', updated)
      return updated
    })
  }

  const totalDaysRemaining = entries[entries.length - 1]?.daysRemaining ?? 90

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Calculator - Debug Mode</h1>
        
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold mb-2">Current State:</h2>
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(entries, null, 2)}
          </pre>
        </div>

        <MobileOptimizedCalculatorFixed
          entries={entries}
          countries={schengenCountries}
          onUpdateEntry={updateEntry}
          onUpdateDateRange={updateDateRange}
          onAddEntry={addEntry}
          onConfirmDelete={confirmDeleteEntry}
          totalDaysRemaining={totalDaysRemaining}
        />
      </div>
    </div>
  )
}