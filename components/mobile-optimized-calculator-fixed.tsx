"use client"

import { useState, useCallback } from "react"
import { Plus, ChevronRight, ChevronDown, ChevronUp, Trash2, Loader2, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TripTimeline } from "@/components/trip-timeline"
import { HelpTooltip } from "@/components/help-tooltip"
import { 
  Rule90180Help, 
  DayCountingHelp, 
  SchengenCountriesHelp, 
  CalculationResultsHelp,
  PlanningHelp 
} from "@/components/schengen-help-content"
import { format, differenceInDays } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

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

// Custom Country Selector Component
function CountrySelector({ 
  value, 
  onChange, 
  countries, 
  disabled = false 
}: { 
  value: string
  onChange: (value: string) => void
  countries: Array<{ code: string; name: string; flag: string }>
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  
  const selectedCountry = countries.find(c => c.code === value)
  
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.code.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = useCallback((countryCode: string) => {
    onChange(countryCode)
    setOpen(false)
    setSearch("")
  }, [onChange])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12"
          disabled={disabled}
        >
          {selectedCountry ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Select a country</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2" align="start">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCountries.length === 0 ? (
            <div className="py-2 px-3 text-sm text-muted-foreground">No countries found</div>
          ) : (
            filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelect(country.code)}
                className={cn(
                  "w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors",
                  value === country.code && "bg-accent"
                )}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="flex-1 text-left">{country.name}</span>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Custom Date Range Picker Component
function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled = false,
  placeholder = "Select travel dates"
}: {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  disabled?: boolean
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [tempRange, setTempRange] = useState<DateRange | undefined>(dateRange)

  const handleSelect = useCallback((range: DateRange | undefined) => {
    setTempRange(range)
    if (range?.from && range?.to) {
      onDateRangeChange(range)
      setOpen(false)
    }
  }, [onDateRangeChange])

  const handleClear = () => {
    setTempRange(undefined)
    onDateRangeChange(undefined)
    setOpen(false)
  }

  const formatDateRange = () => {
    if (!dateRange?.from) return placeholder
    if (!dateRange.to) return `${format(dateRange.from, "MMM dd, yyyy")} - Select end date`
    
    const days = differenceInDays(dateRange.to, dateRange.from) + 1
    return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")} (${days} day${days === 1 ? '' : 's'})`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-12",
            !dateRange && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <CalendarComponent
            mode="range"
            selected={tempRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="rounded-md"
          />
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button 
              size="sm" 
              onClick={() => setOpen(false)}
              disabled={!tempRange?.from || !tempRange?.to}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function MobileOptimizedCalculatorFixed({
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

  const toggleEntryExpanded = (entryId: string, index: number) => {
    setExpandedEntries(prev => {
      const newState = { ...prev }
      const currentlyExpanded = entryId in newState ? newState[entryId] : (index === 0)
      newState[entryId] = !currentlyExpanded
      return newState
    })
  }

  const isEntryExpanded = (entryId: string, index: number): boolean => {
    return entryId in expandedEntries ? expandedEntries[entryId] : (index === 0)
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
              <span>Days in last 180</span>
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
                  <CountrySelector
                    value={entry.country}
                    onChange={(value) => onUpdateEntry(entry.id, "country", value)}
                    countries={countries}
                  />
                </div>

                {/* Date Range */}
                <div className="rounded-lg p-4 border border-gray-200 bg-gray-50">
                  <DateRangePicker
                    dateRange={{
                      from: entry.startDate || undefined,
                      to: entry.endDate || undefined,
                    }}
                    onDateRangeChange={(range) => onUpdateDateRange(entry.id, range)}
                    disabled={!entry.country}
                    placeholder={!entry.country ? "Select country first" : "Select travel dates"}
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
              className="cursor-pointer transition-all duration-300"
              onClick={() => toggleEntryExpanded(entry.id, index)}
              role="button"
              tabIndex={0}
              aria-expanded={isEntryExpanded(entry.id, index)}
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
                      >
                        {deletingEntryId === entry.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {isEntryExpanded(entry.id, index) ? (
                      <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {isEntryExpanded(entry.id, index) && (
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
                    <CountrySelector
                      value={entry.country}
                      onChange={(value) => onUpdateEntry(entry.id, "country", value)}
                      countries={countries}
                    />
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">Travel Dates</label>
                    <DateRangePicker
                      dateRange={{
                        from: entry.startDate || undefined,
                        to: entry.endDate || undefined,
                      }}
                      onDateRangeChange={(range) => onUpdateDateRange(entry.id, range)}
                      disabled={!entry.country}
                      placeholder={!entry.country ? "Select country first" : "Select travel dates"}
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