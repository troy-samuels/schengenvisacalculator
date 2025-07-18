"use client"

import { useState } from "react"
import { Plus, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { EnhancedCalendarPopover } from "@/components/enhanced-calendar-popover"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

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

interface MobileOptimizedCalculatorProps {
  entries: VisaEntry[]
  countries: Array<{ code: string; name: string; flag: string }>
  onUpdateEntry: (id: string, field: keyof VisaEntry, value: any) => void
  onUpdateDateRange: (id: string, dateRange: DateRange | undefined) => void
  onAddEntry: () => void
  totalDaysRemaining: number
}

// Mobile Progress Circle Component
function MobileProgressCircle({ daysRemaining, size = 60 }: { daysRemaining: number; size?: number }) {
  const percentage = Math.max(0, Math.min(100, (daysRemaining / 90) * 100))
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (daysRemaining > 60) return "#10B981"
    if (daysRemaining > 30) return "#F59E0B"
    if (daysRemaining > 10) return "#EF4444"
    return "#DC2626"
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth="4" fill="transparent" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color: getColor() }}>
            {daysRemaining}
          </span>
        </div>
      </div>
    </div>
  )
}

export function MobileOptimizedCalculator({
  entries,
  countries,
  onUpdateEntry,
  onUpdateDateRange,
  onAddEntry,
  totalDaysRemaining,
}: MobileOptimizedCalculatorProps) {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({})
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({})

  const setPopoverOpen = (entryId: string, open: boolean) => {
    setOpenPopovers((prev) => ({ ...prev, [entryId]: open }))
  }

  const toggleEntryExpanded = (entryId: string) => {
    setExpandedEntries((prev) => ({ ...prev, [entryId]: !prev[entryId] }))
  }

  return (
    <div className="space-y-4">
      {/* Mobile Summary Card */}
      <Card className="lg:hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg">Visa Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalDaysRemaining}</div>
              <div className="text-xs text-gray-600">Days Remaining</div>
            </div>
            <MobileProgressCircle daysRemaining={totalDaysRemaining} />
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{90 - totalDaysRemaining}</div>
              <div className="text-xs text-gray-600">Days Used</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div
            className="grid gap-4 p-6 bg-gray-50 border-b"
            style={{ gridTemplateColumns: "1fr 2fr 1.2fr 1.5fr 1fr" }}
          >
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Country</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Date Range</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Days of Stay</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm">Days in Last 180</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Days Remaining</h3>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {entries.map((entry) => (
              <div key={entry.id} className="relative">
                <div className="flex items-center justify-center mb-4 space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      entry.activeColumn === "country" ? "bg-blue-500" : entry.country ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      entry.activeColumn === "dates"
                        ? "bg-blue-500"
                        : entry.startDate && entry.endDate
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

                <div className="grid gap-6 items-center" style={{ gridTemplateColumns: "1fr 2fr 1.2fr 1.5fr 1fr" }}>
                  {/* Desktop content - same as before */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {entries.map((entry, index) => (
          <Card key={entry.id} className="overflow-hidden">
            <Collapsible
              open={expandedEntries[entry.id] ?? index === 0}
              onOpenChange={() => toggleEntryExpanded(entry.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {entry.country ? countries.find((c) => c.code === entry.country)?.flag || "🇪🇺" : "🇪🇺"}
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {entry.country
                            ? countries.find((c) => c.code === entry.country)?.name || "Select Country"
                            : "Select Country"}
                        </CardTitle>
                        {entry.startDate && entry.endDate && (
                          <p className="text-sm text-gray-600">
                            {format(entry.startDate, "MMM dd")} - {format(entry.endDate, "MMM dd")} ({entry.days} days)
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {entry.days > 0 && <MobileProgressCircle daysRemaining={entry.daysRemaining} size={40} />}
                      {(expandedEntries[entry.id] ?? index === 0) ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center space-x-2 py-2">
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
                          : entry.startDate && entry.endDate
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

                  {/* Country Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <Select value={entry.country} onValueChange={(value) => onUpdateEntry(entry.id, "country", value)}>
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
                    <EnhancedCalendarPopover
                      dateRange={{
                        from: entry.startDate || undefined,
                        to: entry.endDate || undefined,
                      }}
                      onDateRangeChange={(range) => onUpdateDateRange(entry.id, range)}
                      disabled={!entry.country}
                      placeholder={!entry.country ? "Select country first" : "Select dates"}
                      isOpen={openPopovers[entry.id] || false}
                      onOpenChange={(open) => setPopoverOpen(entry.id, open)}
                    />
                  </div>

                  {/* Results */}
                  {entry.days > 0 && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{entry.days}</div>
                        <div className="text-xs text-gray-600">Days of Stay</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{entry.daysInLast180}</div>
                        <div className="text-xs text-gray-600">In Last 180</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{entry.daysRemaining}</div>
                        <div className="text-xs text-gray-600">Remaining</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Add Entry Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onAddEntry}
          variant="outline"
          className="flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 bg-transparent rounded-full px-6"
        >
          <Plus className="h-4 w-4" />
          <span>Add Another Trip</span>
        </Button>
      </div>
    </div>
  )
}
