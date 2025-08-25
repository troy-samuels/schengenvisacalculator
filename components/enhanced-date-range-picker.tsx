"use client"

import { useState, useEffect, useMemo } from 'react'
import { Calendar, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, differenceInDays, isAfter, isBefore, addDays, subDays, isSameDay } from "date-fns"
import type { DateRange } from "react-day-picker"
import type { Trip } from "@/lib/types/enhanced-calculator"
import { getTripForDate } from "@/lib/utils/date-overlap"

interface EnhancedDateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  disabled?: boolean
  placeholder?: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  minDate?: Date
  maxDate?: Date
  maxStayDays?: number
  occupiedDates?: Date[]
  existingTrips?: Trip[]
  currentTripId?: string
}

export function EnhancedDateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled = false,
  placeholder = "Select travel dates",
  isOpen,
  onOpenChange,
  minDate,
  maxDate,
  maxStayDays = 90,
  occupiedDates = [],
  existingTrips = [],
  currentTripId
}: EnhancedDateRangePickerProps) {
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(dateRange)
  const [error, setError] = useState<string>("")
  const [showValidation, setShowValidation] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)

  // Use internal state if not controlled externally
  const popoverOpen = isOpen !== undefined ? isOpen : internalOpen
  const setPopoverOpen = onOpenChange || setInternalOpen

  // Memoize occupied dates check for performance
  const occupiedDatesSet = useMemo(() => {
    return new Set(occupiedDates.map(date => date.getTime()))
  }, [occupiedDates])

  // Check if a date is occupied by existing trips
  const isDateOccupied = useMemo(() => {
    return (date: Date): boolean => {
      return occupiedDatesSet.has(date.getTime())
    }
  }, [occupiedDatesSet])

  // Get tooltip information for occupied dates
  const getOccupiedDateTooltip = (date: Date): string => {
    if (existingTrips.length === 0) return "Date already occupied"
    
    const trip = getTripForDate(date, existingTrips)
    if (trip) {
      return `Already used by ${trip.country ? `trip to ${trip.country}` : 'another trip'}`
    }
    return "Date already occupied"
  }

  // Update temp range when external dateRange changes
  useEffect(() => {
    setTempDateRange(dateRange)
    setError("")
    setShowValidation(false)
  }, [dateRange])

  const validateDateRange = (range: DateRange | undefined): string => {
    if (!range?.from || !range?.to) return ""
    
    const days = differenceInDays(range.to, range.from) + 1
    
    // Check if end date is before start date
    if (isBefore(range.to, range.from)) {
      return "End date cannot be before start date"
    }
    
    // Check for occupied dates (date overlap prevention)
    const currentDate = new Date(range.from)
    while (currentDate <= range.to) {
      if (isDateOccupied(currentDate)) {
        const trip = getTripForDate(currentDate, existingTrips)
        const dateStr = format(currentDate, "MMM dd, yyyy")
        if (trip && trip.country) {
          return `${dateStr} is already occupied by your trip to ${trip.country}. You cannot be in two places at once.`
        }
        return `${dateStr} is already occupied by another trip. You cannot be in two places at once.`
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    // Check if dates are in the future when not allowed (this check is now optional)
    // Removed restriction to allow both past and future dates for planning
    
    // Check if stay exceeds maximum days
    if (days > maxStayDays) {
      return `Trip cannot exceed ${maxStayDays} days (currently ${days} days)`
    }
    
    // Check if dates are within allowed range
    if (minDate && isBefore(range.from, minDate)) {
      return `Start date cannot be before ${format(minDate, "MMM dd, yyyy")}`
    }
    
    if (maxDate && isAfter(range.to, maxDate)) {
      return `End date cannot be after ${format(maxDate, "MMM dd, yyyy")}`
    }
    
    return ""
  }

  const formatDateRange = () => {
    if (!dateRange?.from) return placeholder
    if (!dateRange.to) {
      return `${format(dateRange.from, "MMM dd, yyyy")} - Select end date`
    }
    
    const days = differenceInDays(dateRange.to, dateRange.from) + 1
    return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")} (${days} day${days === 1 ? '' : 's'})`
  }

  const handleDateSelect = (range: DateRange | undefined) => {
    setTempDateRange(range)
    
    if (range?.from && range?.to) {
      const validationError = validateDateRange(range)
      setError(validationError)
      setShowValidation(true)
    } else {
      setError("")
      setShowValidation(false)
    }
  }

  const handleApply = () => {
    const validationError = validateDateRange(tempDateRange)
    
    if (validationError) {
      setError(validationError)
      setShowValidation(true)
      return
    }
    
    onDateRangeChange(tempDateRange)
    setPopoverOpen(false)
  }

  const handleCancel = () => {
    setTempDateRange(dateRange)
    setError("")
    setShowValidation(false)
    setPopoverOpen(false)
  }

  const handleClear = () => {
    setTempDateRange(undefined)
    setError("")
    setShowValidation(false)
    onDateRangeChange(undefined)
  }

  const handleQuickSelect = (days: number, type: 'past' | 'future') => {
    const today = new Date()
    let startDate: Date, endDate: Date
    
    if (type === 'future') {
      startDate = today
      endDate = addDays(today, days - 1)
    } else {
      startDate = subDays(today, days - 1)
      endDate = today
    }
    
    const newRange = { from: startDate, to: endDate }
    setTempDateRange(newRange)
    
    const validationError = validateDateRange(newRange)
    setError(validationError)
    setShowValidation(!!validationError)
  }

  const getButtonVariant = () => {
    if (error && showValidation) return "destructive"
    if (dateRange?.from && dateRange?.to) return "default"
    return "outline"
  }

  const getButtonIcon = () => {
    if (error && showValidation) return <AlertCircle className="h-4 w-4 flex-shrink-0" />
    return <Calendar className="h-4 w-4 flex-shrink-0" />
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={getButtonVariant()}
          className="w-full justify-start text-left font-normal h-12 px-4 border shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          {getButtonIcon()}
          <span className="ml-2 truncate flex-1">{formatDateRange()}</span>
          {dateRange?.from && dateRange?.to && (
            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto p-0 bg-white rounded-2xl shadow-xl border" align="start">
        <div className="p-6">
          {/* Quick Select Options */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Select</h4>
            
            {/* Past Trips */}
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Past Trips</p>
              <div className="flex flex-wrap gap-2">
                {[1, 3, 7, 14, 30].map((days) => (
                  <Button
                    key={`past-${days}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSelect(days, 'past')}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                  >
                    -{days}d
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Future Trips */}
            <div>
              <p className="text-xs text-gray-600 mb-2">Future Planning</p>
              <div className="flex flex-wrap gap-2">
                {[1, 3, 7, 14, 30].map((days) => (
                  <Button
                    key={`future-${days}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSelect(days, 'future')}
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  >
                    +{days}d
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Occupied Dates Warning */}
          {occupiedDates.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="ml-2">
                  <p className="text-sm text-red-700 font-medium">
                    Date Overlap Prevention Active
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Dates already used by other trips are disabled (shown with red strikethrough). 
                    You cannot be in two places at once.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Calendar */}
          <CalendarComponent
            mode="range"
            selected={tempDateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            className="rounded-none border-0"
            disabled={(date) => {
              // Allow both past and future dates for flexible planning
              if (minDate && isBefore(date, minDate)) return true
              if (maxDate && isAfter(date, maxDate)) return true
              
              // Disable occupied dates (date overlap prevention)
              if (isDateOccupied(date)) return true
              
              return false
            }}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg font-semibold text-gray-900",
              nav: "space-x-1 flex items-center",
              nav_button: "h-8 w-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors",
              nav_button_previous: "absolute left-0",
              nav_button_next: "absolute right-0",
              table: "w-full border-collapse space-y-1",
              head_row: "flex mb-2",
              head_cell: "text-gray-600 rounded-md w-10 font-medium text-sm text-center",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-lg transition-colors",
              day_range_start: "day-range-start bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white rounded-lg",
              day_range_end: "day-range-end bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white rounded-lg",
              day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white rounded-lg",
              day_today: "bg-gray-100 text-gray-900 font-semibold",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-red-400 bg-red-50 opacity-75 cursor-not-allowed line-through",
              day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-900 hover:bg-blue-100 rounded-none",
              day_hidden: "invisible",
            }}
          />

          {/* Validation Message */}
          {error && showValidation && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Trip Info */}
          {tempDateRange?.from && tempDateRange?.to && !error && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Trip Duration:</span>
                  <span className="font-medium text-blue-900">
                    {differenceInDays(tempDateRange.to, tempDateRange.from) + 1} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Trip Type:</span>
                  <span className="font-medium text-blue-900">
                    {isAfter(tempDateRange.from, new Date()) ? '🔮 Future Planning' : 
                     isBefore(tempDateRange.to, new Date()) ? '📅 Past Trip' : '⏳ Current/Mixed'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClear}
              disabled={!tempDateRange?.from}
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleApply}
              disabled={!tempDateRange?.from || !tempDateRange?.to || !!error}
            >
              <Check className="w-4 h-4 mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}