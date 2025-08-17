"use client"

import { useState } from "react"
import { Plus, ChevronRight, ChevronDown, ChevronUp, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedDateRangePicker } from "@/components/enhanced-date-range-picker"
import { TripTimeline } from "@/components/trip-timeline"
import { HelpTooltip } from "@/components/help-tooltip"
import { 
  Rule90180Help, 
  DayCountingHelp, 
  SchengenCountriesHelp, 
  CalculationResultsHelp,
  PlanningHelp 
} from "@/components/schengen-help-content"
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
  onDeleteEntry?: (id: string) => void
  onConfirmDelete?: (id: string) => void
  deletingEntryId?: string | null
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
  onDeleteEntry,
  onConfirmDelete,
  deletingEntryId,
  totalDaysRemaining,
}: MobileOptimizedCalculatorProps) {
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({})

  const toggleEntryExpanded = (entryId: string) => {
    setExpandedEntries((prev) => ({ ...prev, [entryId]: !prev[entryId] }))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Summary Card */}
      <Card className="lg:hidden">
        <CardHeader className="pb-4 pt-5">
          <CardTitle className="text-center text-lg sm:text-xl flex items-center justify-center space-x-2">
            <span>Visa Status</span>
            <HelpTooltip 
              title="90/180-Day Rule"
              content={<Rule90180Help />}
              position="bottom"
              size="lg"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <div className="flex items-center justify-between px-2">
            <div className="text-center flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalDaysRemaining}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center justify-center space-x-1">
                <span>Days Remaining</span>
                <HelpTooltip 
                  title="Calculation Results"
                  content={<CalculationResultsHelp daysUsed={90 - totalDaysRemaining} daysRemaining={totalDaysRemaining} />}
                  size="lg"
                />
              </div>
            </div>
            <div className="mx-4 sm:mx-6">
              <MobileProgressCircle daysRemaining={totalDaysRemaining} size={70} />
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">{90 - totalDaysRemaining}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center justify-center space-x-1">
                <span>Days Used</span>
                <HelpTooltip 
                  title="Day Counting"
                  content={<DayCountingHelp />}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Calculator */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Column Headers */}
        <div
          className="grid gap-4 p-6 bg-gray-50 border-b"
          style={{ gridTemplateColumns: "1fr 2fr 1.2fr 1.5fr 1fr 80px" }}
        >
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 flex items-center justify-center space-x-1">
              <span>Country</span>
              <HelpTooltip 
                title="Schengen Countries"
                content={<SchengenCountriesHelp />}
                size="lg"
              />
            </h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900">Date Range</h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 flex items-center justify-center space-x-1">
              <span>Days of Stay</span>
              <HelpTooltip 
                title="Day Counting"
                content={<DayCountingHelp />}
                size="lg"
              />
            </h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center justify-center space-x-1">
              <span>Days of Stay in the last 180 days</span>
              <HelpTooltip 
                title="180-Day Rolling Window"
                content={<Rule90180Help />}
                size="lg"
              />
            </h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 flex items-center justify-center space-x-1">
              <span>Days Remaining</span>
              <HelpTooltip 
                title="Calculation Results"
                content={<CalculationResultsHelp daysUsed={90 - totalDaysRemaining} daysRemaining={totalDaysRemaining} />}
                size="lg"
              />
            </h3>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900">Actions</h3>
          </div>
        </div>

        {/* Calculator Rows */}
        <div className="p-6 space-y-8">
          {entries.map((entry) => (
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

              <div className="grid gap-6 items-center" style={{ gridTemplateColumns: "1fr 2fr 1.2fr 1.5fr 1fr 80px" }}>
                {/* Country Selection */}
                <div className="rounded-lg p-4 border border-gray-200 bg-gray-50">
                  <Select value={entry.country} onValueChange={(value) => onUpdateEntry(entry.id, "country", value)}>
                    <SelectTrigger className="w-full bg-white text-center h-12 border-0 shadow-sm">
                      <SelectValue placeholder="🇪🇺" />
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

                {/* Date Range */}
                <div className="rounded-lg p-4 border border-gray-200 bg-gray-50">
                  <EnhancedDateRangePicker
                    dateRange={{
                      from: entry.startDate || undefined,
                      to: entry.endDate || undefined,
                    }}
                    onDateRangeChange={(range) => onUpdateDateRange(entry.id, range)}
                    disabled={!entry.country}
                    placeholder={!entry.country ? "Select country first" : "Select travel dates"}
                    maxStayDays={90}
                  />
                </div>

                {/* Results Columns */}
                <div className="rounded-lg p-4 border border-gray-200 bg-gray-50">
                  <div className="bg-white rounded-lg p-3 font-semibold text-base text-center border-0 shadow-sm h-12 flex items-center justify-center">
                    {entry.days > 0 ? `${entry.days} days` : "—"}
                  </div>
                </div>

                <div className="rounded-lg p-4 border border-gray-200 bg-gray-50">
                  <div className="bg-white rounded-lg p-3 font-semibold text-base text-center border-0 shadow-sm h-12 flex items-center justify-center">
                    {entry.daysInLast180 > 0 ? `${entry.daysInLast180} days` : "—"}
                  </div>
                </div>

                {/* Days Remaining with Progress Circle */}
                <div className="rounded-lg p-2">
                  <div className="flex items-center justify-center h-20">
                    <MobileProgressCircle daysRemaining={entry.daysRemaining} size={80} />
                  </div>
                </div>

                {/* Actions Column */}
                <div className="flex items-center justify-center">
                  {(onDeleteEntry || onConfirmDelete) && entries.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => (onConfirmDelete || onDeleteEntry)?.(entry.id)}
                      disabled={deletingEntryId === entry.id}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingEntryId === entry.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 sm:space-y-6">
        {entries.map((entry, index) => (
          <Card key={entry.id} className="overflow-hidden">
            <div
              className={`transition-all duration-300 ${
                expandedEntries[entry.id] ?? index === 0 ? "" : "cursor-pointer"
              }`}
              onClick={() => toggleEntryExpanded(entry.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedEntries[entry.id] ?? index === 0}
              aria-label={`Trip ${index + 1}: ${entry.country ? countries.find((c) => c.code === entry.country)?.name || "Country not selected" : "Country not selected"}. Click to ${(expandedEntries[entry.id] ?? index === 0) ? "collapse" : "expand"} details.`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleEntryExpanded(entry.id)
                }
              }}
            >
              <CardHeader className="hover:bg-gray-50 transition-colors py-4 sm:py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">
                      {entry.country ? countries.find((c) => c.code === entry.country)?.flag || "🇪🇺" : "🇪🇺"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg truncate">
                        {entry.country
                          ? countries.find((c) => c.code === entry.country)?.name || "Select Country"
                          : "Select Country"}
                      </CardTitle>
                      {entry.startDate && entry.endDate && (
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                          {format(entry.startDate, "MMM dd")} - {format(entry.endDate, "MMM dd")} ({entry.days} days)
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 ml-2">
                    {entry.days > 0 && <MobileProgressCircle daysRemaining={entry.daysRemaining} size={44} />}
                    {(onDeleteEntry || onConfirmDelete) && entries.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          ;(onConfirmDelete || onDeleteEntry)?.(entry.id)
                        }}
                        disabled={deletingEntryId === entry.id}
                        className="h-10 w-10 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 rounded-full"
                        aria-label={`Delete trip ${index + 1}`}
                        title="Delete this trip"
                      >
                        {deletingEntryId === entry.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {(expandedEntries[entry.id] ?? index === 0) ? (
                      <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {(expandedEntries[entry.id] ?? index === 0) && (
                <CardContent className="pt-0 space-y-4 sm:space-y-6 px-4 sm:px-6 pb-5 sm:pb-6">
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
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3 flex items-center space-x-1">
                      <span>Country</span>
                      <HelpTooltip 
                        title="Schengen Countries"
                        content={<SchengenCountriesHelp />}
                        size="lg"
                      />
                    </label>
                    <Select value={entry.country} onValueChange={(value) => onUpdateEntry(entry.id, "country", value)}>
                      <SelectTrigger 
                        className="w-full h-12 sm:h-14 text-base"
                        aria-label="Select country for trip"
                      >
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
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">Travel Dates</label>
                    <EnhancedDateRangePicker
                      dateRange={{
                        from: entry.startDate || undefined,
                        to: entry.endDate || undefined,
                      }}
                      onDateRangeChange={(range) => onUpdateDateRange(entry.id, range)}
                      disabled={!entry.country}
                      placeholder={!entry.country ? "Select country first" : "Select travel dates"}
                      maxStayDays={90}
                    />
                  </div>

                  {/* Results */}
                  {entry.days > 0 && (
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t">
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-blue-600">{entry.days}</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center justify-center space-x-1">
                          <span>Days of Stay</span>
                          <HelpTooltip 
                            title="Day Counting"
                            content={<DayCountingHelp />}
                            size="md"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-orange-600">{entry.daysInLast180}</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center justify-center space-x-1">
                          <span>In Last 180</span>
                          <HelpTooltip 
                            title="180-Day Window"
                            content={<Rule90180Help />}
                            size="md"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-green-600">{entry.daysRemaining}</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center justify-center space-x-1">
                          <span>Remaining</span>
                          <HelpTooltip 
                            title="Your Status"
                            content={<CalculationResultsHelp daysUsed={entry.daysInLast180} daysRemaining={entry.daysRemaining} />}
                            size="md"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Entry Button */}
      <div className="flex flex-col items-center pt-6 sm:pt-8 space-y-3">
        <Button
          onClick={onAddEntry}
          variant="outline"
          size="lg"
          className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 transition-colors duration-200 bg-transparent rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium shadow-sm"
          aria-label="Add another trip entry to calculate more visa days"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Add Another Trip</span>
        </Button>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <span>Need help planning future trips?</span>
          <HelpTooltip 
            title="Trip Planning"
            content={<PlanningHelp />}
            size="lg"
          />
        </div>
      </div>

      {/* Trip Timeline */}
      <TripTimeline entries={entries} countries={countries} />
    </div>
  )
}
