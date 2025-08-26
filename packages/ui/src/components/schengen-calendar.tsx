import * as React from "react"
import { format, isSameDay, startOfDay, endOfDay } from "date-fns"
import { Calendar as CalendarIcon, AlertCircle, Info, MapPin, CheckCircle } from "lucide-react"
import { DayPickerSingleProps, DayPickerRangeProps } from "react-day-picker"

import { DateOverlapValidator, DateRange, ValidationResult } from "@schengen/calculator"
import type { Trip } from "@schengen/calculator"

import { cn, formatDateKey, isDateInRange } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface SchengenCalendarProps {
  /** Existing trips for conflict detection */
  existingTrips?: Trip[]
  /** Selected date (single mode) */
  selected?: Date
  /** Selected date range (range mode) */
  selectedRange?: DateRange
  /** Calendar mode */
  mode?: "single" | "range"
  /** Callback for single date selection */
  onSelect?: (date: Date | undefined) => void
  /** Callback for date range selection */
  onRangeSelect?: (range: DateRange | undefined) => void
  /** Show occupied date indicators */
  showOccupiedDates?: boolean
  /** Show conflict warnings */
  showConflictWarnings?: boolean
  /** Show alternative date suggestions */
  showAlternativeSuggestions?: boolean
  /** Custom validator configuration */
  validatorConfig?: {
    allowSameDayTravel?: boolean
    allowBorderTransitions?: boolean
    strictMode?: boolean
  }
  /** Additional class name */
  className?: string
  /** Minimum date that can be selected */
  fromDate?: Date
  /** Maximum date that can be selected */
  toDate?: Date
  /** Disabled dates */
  disabled?: Date[] | ((date: Date) => boolean)
  /** Custom styling for different date states */
  customClassNames?: {
    occupied?: string
    conflict?: string
    available?: string
    selected?: string
  }
  /** Show validation messages */
  showValidationMessages?: boolean
  /** Custom validation message render */
  renderValidationMessage?: (validation: ValidationResult) => React.ReactNode
}

export function SchengenCalendar({
  existingTrips = [],
  selected,
  selectedRange,
  mode = "single",
  onSelect,
  onRangeSelect,
  showOccupiedDates = true,
  showConflictWarnings = true,
  showAlternativeSuggestions = false,
  validatorConfig = {},
  className,
  fromDate,
  toDate,
  disabled,
  customClassNames = {},
  showValidationMessages = true,
  renderValidationMessage,
  ...props
}: SchengenCalendarProps) {
  // Stable validator configuration to prevent recreation
  const validatorConfigStringified = JSON.stringify(validatorConfig)
  const validator = React.useMemo(() => 
    new DateOverlapValidator(validatorConfig), 
    [validatorConfigStringified]
  )

  // Create stable reference for existingTrips to prevent infinite loops
  const stableTripsRef = React.useRef<Trip[]>([])
  const tripsStringified = JSON.stringify(existingTrips)
  
  React.useEffect(() => {
    stableTripsRef.current = existingTrips
  }, [tripsStringified])

  const occupiedDates = React.useMemo(() => 
    validator.getAllOccupiedDates(stableTripsRef.current),
    [validator, tripsStringified]
  )

  const [validationResult, setValidationResult] = React.useState<ValidationResult | null>(null)
  const [alternativeDates, setAlternativeDates] = React.useState<DateRange[]>([])

  // Validate current selection
  React.useEffect(() => {
    const trips = stableTripsRef.current
    
    if (mode === "single" && selected) {
      const range: DateRange = {
        start: startOfDay(selected),
        end: endOfDay(selected)
      }
      const result = validator.validateDateRange(range, trips)
      setValidationResult(result)

      if (!result.isValid && showAlternativeSuggestions) {
        const alternatives = validator.suggestAlternativeDates(range, 1, trips)
        setAlternativeDates(alternatives)
      } else {
        setAlternativeDates([])
      }
    } else if (mode === "range" && selectedRange) {
      const result = validator.validateDateRange(selectedRange, trips)
      setValidationResult(result)

      if (!result.isValid && showAlternativeSuggestions) {
        const duration = Math.ceil(
          (selectedRange.end.getTime() - selectedRange.start.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
        const alternatives = validator.suggestAlternativeDates(selectedRange, duration, trips)
        setAlternativeDates(alternatives)
      } else {
        setAlternativeDates([])
      }
    } else {
      setValidationResult(null)
      setAlternativeDates([])
    }
  }, [selected, selectedRange, tripsStringified, validator, mode, showAlternativeSuggestions])

  // Check if a date is occupied
  const isDateOccupied = React.useCallback((date: Date) => {
    return occupiedDates.some(occupiedDate => isSameDay(date, occupiedDate))
  }, [occupiedDates])

  // Check if a date has conflicts
  const isDateConflicted = React.useCallback((date: Date) => {
    if (!validationResult || validationResult.isValid) return false
    
    if (mode === "single" && selected) {
      return isSameDay(date, selected)
    } else if (mode === "range" && selectedRange) {
      return isDateInRange(date, selectedRange.start, selectedRange.end)
    }
    
    return false
  }, [validationResult, mode, selected, selectedRange])

  // MANDATORY visual states per CLAUDE.md requirements
  const DATE_VISUAL_STATES = {
    occupied: 'bg-gray-200 text-gray-600 line-through cursor-not-allowed opacity-60 hover:bg-gray-200',
    available: 'bg-gray-50 hover:bg-primary/10 cursor-pointer transition-colors',
    selected: 'bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90',
    conflict: 'bg-red-100 text-red-700 cursor-not-allowed border border-red-200',
    suggestion: 'bg-green-100 text-green-700 border border-green-200 cursor-pointer hover:bg-green-200'
  } as const

  // Custom day class names with mandatory visual requirements
  const getDayClassNames = React.useCallback((date: Date) => {
    const classes: string[] = []

    // CRITICAL: Occupied dates MUST be greyed out with strikethrough (CLAUDE.md requirement)
    if (showOccupiedDates && isDateOccupied(date)) {
      classes.push(
        "schengen-occupied-date",
        DATE_VISUAL_STATES.occupied,
        customClassNames.occupied || ""
      )
    } else {
      classes.push(
        "schengen-available-date",
        DATE_VISUAL_STATES.available,
        customClassNames.available || ""
      )
    }

    // Conflict styling with red indicators
    if (showConflictWarnings && isDateConflicted(date)) {
      classes.push(
        "schengen-conflict-date",
        DATE_VISUAL_STATES.conflict,
        customClassNames.conflict || ""
      )
    }

    // Selected date styling
    if ((mode === "single" && selected && isSameDay(date, selected)) ||
        (mode === "range" && selectedRange && isDateInRange(date, selectedRange.start, selectedRange.end))) {
      classes.push(
        "schengen-selected-date",
        DATE_VISUAL_STATES.selected,
        customClassNames.selected || ""
      )
    }

    return classes.filter(Boolean).join(" ")
  }, [
    showOccupiedDates,
    showConflictWarnings,
    isDateOccupied,
    isDateConflicted,
    mode,
    selected,
    selectedRange,
    customClassNames
  ])

  // Handle date selection with validation and helpful error messages
  const handleDateSelect = React.useCallback((date: Date | undefined) => {
    if (!date) {
      onSelect?.(undefined)
      return
    }

    // CRITICAL: Occupied date interaction prevention with helpful error message (CLAUDE.md requirement)
    if (showOccupiedDates && isDateOccupied(date)) {
      const tripsOnDate = validator.getTripsOnDate(date, stableTripsRef.current)
      const tripNames = tripsOnDate.map(t => t.country).join(', ')
      
      // Show helpful error message as required by CLAUDE.md
      alert(`This date is occupied by existing trip${tripsOnDate.length > 1 ? 's' : ''}: ${tripNames}\n\nPlease select a different date or modify your existing trip.`)
      return
    }

    onSelect?.(date)
  }, [onSelect, showOccupiedDates, isDateOccupied, validator, tripsStringified])

  // Handle range selection with validation and helpful error messages
  const handleRangeSelect = React.useCallback((range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from) {
      onRangeSelect?.(undefined)
      return
    }

    const dateRange: DateRange = {
      start: range.from,
      end: range.to || range.from
    }

    // CRITICAL: Check for occupied dates in range with helpful error message (CLAUDE.md requirement)
    if (showOccupiedDates) {
      const occupiedInRange = occupiedDates.filter(occupiedDate =>
        isDateInRange(occupiedDate, dateRange.start, dateRange.end)
      )
      
      if (occupiedInRange.length > 0) {
        const conflictDates = occupiedInRange.map(date => format(date, 'MMM d')).join(', ')
        alert(`Selected date range contains ${occupiedInRange.length} occupied date${occupiedInRange.length > 1 ? 's' : ''}: ${conflictDates}\n\nPlease select a different date range or modify your existing trips.`)
        return
      }
    }

    onRangeSelect?.(dateRange)
  }, [onRangeSelect, showOccupiedDates, occupiedDates])

  // Disabled dates logic
  const isDateDisabled = React.useCallback((date: Date) => {
    // Check custom disabled logic
    if (typeof disabled === "function") {
      if (disabled(date)) return true
    } else if (Array.isArray(disabled)) {
      if (disabled.some(disabledDate => isSameDay(date, disabledDate))) return true
    }

    // Check date range bounds
    if (fromDate && date < fromDate) return true
    if (toDate && date > toDate) return true

    // Optionally disable occupied dates
    if (showOccupiedDates && isDateOccupied(date)) {
      return true
    }

    return false
  }, [disabled, fromDate, toDate, showOccupiedDates, isDateOccupied])

  const calendarProps = React.useMemo(() => {
    const baseProps = {
      className: cn("schengen-calendar", className),
      disabled: isDateDisabled,
      fromDate,
      toDate,
      modifiers: {
        occupied: (date: Date) => showOccupiedDates && isDateOccupied(date),
        conflicted: (date: Date) => showConflictWarnings && isDateConflicted(date)
      },
      modifiersClassNames: {
        occupied: DATE_VISUAL_STATES.occupied,
        conflicted: DATE_VISUAL_STATES.conflict
      },
      ...props
    }

    if (mode === "single") {
      return {
        ...baseProps,
        mode: "single" as const,
        selected,
        onSelect: handleDateSelect,
      } satisfies DayPickerSingleProps
    } else {
      return {
        ...baseProps,
        mode: "range" as const,
        selected: selectedRange ? { from: selectedRange.start, to: selectedRange.end } : undefined,
        onSelect: handleRangeSelect,
      } satisfies DayPickerRangeProps
    }
  }, [
    className,
    isDateDisabled,
    fromDate,
    toDate,
    getDayClassNames,
    mode,
    selected,
    selectedRange,
    handleDateSelect,
    handleRangeSelect,
    props
  ])

  return (
    <div className="space-y-4">
      <Calendar {...calendarProps} />
      
      {/* Validation Messages */}
      {showValidationMessages && validationResult && (
        <div className="space-y-2">
          {renderValidationMessage ? (
            renderValidationMessage(validationResult)
          ) : (
            <div className={cn(
              "flex items-start gap-2 p-3 rounded-md text-sm",
              validationResult.isValid 
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            )}>
              {validationResult.isValid ? (
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              )}
              <span>{validationResult.message}</span>
            </div>
          )}
          
          {/* Conflict Details */}
          {!validationResult.isValid && validationResult.conflicts.length > 0 && (
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">Conflicting trips:</p>
              {validationResult.conflicts.map((conflict, index) => (
                <div key={index} className="pl-4 border-l-2 border-red-200">
                  <p>
                    🇪🇺 <strong>{conflict.tripCountry}</strong> - {conflict.overlapDays} day{conflict.overlapDays !== 1 ? 's' : ''} overlap
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(conflict.conflictStart, 'MMM d')} - {format(conflict.conflictEnd, 'MMM d')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Alternative Date Suggestions */}
      {showAlternativeSuggestions && alternativeDates.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            💡 Alternative dates available:
          </p>
          <div className="flex flex-wrap gap-2">
            {alternativeDates.map((alt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (mode === "single") {
                    onSelect?.(alt.start)
                  } else {
                    onRangeSelect?.(alt)
                  }
                }}
                className="text-xs"
              >
                <CalendarIcon className="h-3 w-3 mr-1" />
                {isSameDay(alt.start, alt.end) 
                  ? format(alt.start, 'MMM d')
                  : `${format(alt.start, 'MMM d')} - ${format(alt.end, 'MMM d')}`
                }
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Legend with Mandatory Visual Indicators (CLAUDE.md requirement) */}
      {showOccupiedDates && occupiedDates.length > 0 && (
        <div className="text-xs text-gray-500 border-t pt-3">
          <div className="flex items-center justify-center gap-6 mb-2">
            {/* CRITICAL: Occupied dates legend with strikethrough (CLAUDE.md requirement) */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 text-gray-600 rounded opacity-60 flex items-center justify-center relative">
                <span className="text-xs">X</span>
                <div className="absolute inset-0 border-b border-gray-600 rotate-12 transform"></div>
              </div>
              <span className="font-medium">Occupied</span>
            </div>
            
            {/* Available dates legend */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-gray-400" />
              </div>
              <span className="font-medium">Available</span>
            </div>
            
            {/* Selected dates legend */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-white" />
              </div>
              <span className="font-medium">Selected</span>
            </div>
          </div>
          
          {/* Trip conflict summary */}
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              {occupiedDates.length} day{occupiedDates.length !== 1 ? 's' : ''} occupied by existing trips
            </Badge>
          </div>
          
          {/* Helpful instruction */}
          <p className="mt-2 text-center text-gray-400 italic">
            💡 Occupied dates are greyed out and cannot be selected
          </p>
        </div>
      )}
    </div>
  )
}

SchengenCalendar.displayName = "SchengenCalendar"