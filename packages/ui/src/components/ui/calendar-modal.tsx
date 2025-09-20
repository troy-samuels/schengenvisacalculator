"use client"

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { useIsMobile } from '../../hooks/useMediaQuery'
import { MobileCalendarDrawer } from './mobile-calendar-drawer'
import type { OccupiedDateInfo } from '../../validators/date-overlap-validator'
import type { CalendarDateRange } from '../../types/calendar'

// Re-export for backward compatibility
export type { CalendarDateRange }

export interface CalendarModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Callback when date range is selected */
  onDateRangeSelect: (range: CalendarDateRange) => void
  /** Initial date range */
  initialRange?: CalendarDateRange
  /** Disabled dates */
  disabledDates?: Date[]
  /** Information about occupied dates for better UX */
  occupiedDateInfo?: OccupiedDateInfo[]
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Additional className */
  className?: string
}

export function CalendarModal({
  isOpen,
  onClose,
  onDateRangeSelect,
  initialRange,
  disabledDates = [],
  occupiedDateInfo = [],
  minDate,
  maxDate,
  className
}: CalendarModalProps) {
  const isMobile = useIsMobile()

  // If mobile, render the mobile drawer instead
  if (isMobile) {
    return (
      <MobileCalendarDrawer
        isOpen={isOpen}
        onClose={onClose}
        onDateRangeSelect={onDateRangeSelect}
        initialRange={initialRange}
        disabledDates={disabledDates}
        occupiedDateInfo={occupiedDateInfo}
        minDate={minDate}
        maxDate={maxDate}
        className={className}
      />
    )
  }

  // Desktop version below (existing code unchanged)
  return <DesktopCalendarModal 
    isOpen={isOpen}
    onClose={onClose}
    onDateRangeSelect={onDateRangeSelect}
    initialRange={initialRange || { startDate: null, endDate: null }}
    disabledDates={disabledDates}
    occupiedDateInfo={occupiedDateInfo}
    minDate={minDate}
    maxDate={maxDate}
    className={className}
  />
}

// Desktop modal component (extracted from existing code)
function DesktopCalendarModal({
  isOpen,
  onClose,
  onDateRangeSelect,
  initialRange,
  disabledDates = [],
  occupiedDateInfo = [],
  minDate,
  maxDate,
  className
}: {
  isOpen: boolean
  onClose: () => void
  onDateRangeSelect: (range: CalendarDateRange) => void
  initialRange: CalendarDateRange
  disabledDates?: Date[]
  occupiedDateInfo?: OccupiedDateInfo[]
  minDate?: Date
  maxDate?: Date
  className?: string
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<CalendarDateRange>(
    initialRange
  )
  const [selectingEnd, setSelectingEnd] = useState(false)

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedRange(initialRange)
      setSelectingEnd(false)
    }
  }, [isOpen, initialRange])

  // Handle date click
  const handleDateClick = (date: Date) => {
    console.log('🖱️ Desktop calendar: Date clicked:', format(date, 'yyyy-MM-dd'))

    // Check if date is disabled
    if (isDateDisabled(date)) {
      console.log('🚫 Date is disabled:', format(date, 'yyyy-MM-dd'))
      return
    }

    // Handle occupied date click - show helpful message
    if (isDateOccupied(date)) {
      const occupiedInfo = getOccupiedDateInfo(date)
      if (occupiedInfo) {
        // You could add a toast notification here in the future
        console.log(`Cannot select ${format(date, 'MMM dd')} - already used by ${occupiedInfo.country} trip`)
      }
      return
    }

    console.log('✅ Date click allowed, processing selection...')

    if (!selectedRange.startDate || selectingEnd) {
      // Select start date or reset and select new start date
      if (selectingEnd && selectedRange.startDate && date < selectedRange.startDate) {
        // If clicking before start date while selecting end, reset
        setSelectedRange({ startDate: date, endDate: null })
        setSelectingEnd(false)
      } else if (!selectedRange.startDate) {
        // First selection - start date
        setSelectedRange({ startDate: date, endDate: null })
        setSelectingEnd(true)
      } else {
        // Selecting end date
        setSelectedRange({ ...selectedRange, endDate: date })
        setSelectingEnd(false)
      }
    } else {
      // Start date exists, this is end date selection
      if (date >= selectedRange.startDate) {
        setSelectedRange({ ...selectedRange, endDate: date })
        setSelectingEnd(false)
      } else {
        // If clicked date is before start, make it the new start
        setSelectedRange({ startDate: date, endDate: null })
        setSelectingEnd(true)
      }
    }
  }

  // Check if date is disabled
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate))
  }

  // Check if date is occupied by an existing trip
  const getOccupiedDateInfo = (date: Date): OccupiedDateInfo | null => {
    return occupiedDateInfo.find(info => isSameDay(info.date, date)) || null
  }

  // Check if date is occupied
  const isDateOccupied = (date: Date) => {
    return getOccupiedDateInfo(date) !== null
  }

  // Check if date is in selected range
  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate) return false
    if (!selectedRange.endDate) return isSameDay(date, selectedRange.startDate)
    
    return date >= selectedRange.startDate && date <= selectedRange.endDate
  }

  // Check if date is range boundary
  const isRangeStart = (date: Date) => {
    return selectedRange.startDate && isSameDay(date, selectedRange.startDate)
  }

  const isRangeEnd = (date: Date) => {
    return selectedRange.endDate && isSameDay(date, selectedRange.endDate)
  }

  // Handle clear
  const handleClear = () => {
    setSelectedRange({ startDate: null, endDate: null })
    setSelectingEnd(false)
  }

  // Handle done
  const handleDone = () => {
    onDateRangeSelect(selectedRange)
    onClose()
  }

  // Navigation functions
  const goToPrevMonth = () => {
    console.log('🖱️ Desktop calendar: Previous month clicked')
    setCurrentMonth(prev => subMonths(prev, 1))
  }

  const goToNextMonth = () => {
    console.log('🖱️ Desktop calendar: Next month clicked')
    setCurrentMonth(prev => addMonths(prev, 1))
  }

  // Render calendar month
  const renderMonth = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate)
    const monthEnd = endOfMonth(monthDate)
    
    // Get all days in the month
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

    // Add padding days from previous month
    const startPadding = monthStart.getDay()
    const paddingDays = []
    for (let i = startPadding - 1; i >= 0; i--) {
      const paddingDate = new Date(monthStart)
      paddingDate.setDate(paddingDate.getDate() - (i + 1))
      paddingDays.push(paddingDate)
    }

    // Add padding days from next month
    const endPadding = 6 - monthEnd.getDay()
    const endPaddingDays = []
    for (let i = 1; i <= endPadding; i++) {
      const paddingDate = new Date(monthEnd)
      paddingDate.setDate(paddingDate.getDate() + i)
      endPaddingDays.push(paddingDate)
    }

    const allDays = [...paddingDays, ...monthDays, ...endPaddingDays]

    return (
      <div className="flex-1">
        {/* Month header */}
        <div className="text-center font-bold text-xl mb-4 text-black py-2">
          {format(monthDate, 'MMMM yyyy')}
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-black p-2 bg-gray-100 rounded">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {allDays.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, monthDate)
            const disabled = isDateDisabled(date)
            const occupied = isDateOccupied(date)
            const occupiedInfo = getOccupiedDateInfo(date)
            const inRange = isDateInRange(date)
            const rangeStart = isRangeStart(date)
            const rangeEnd = isRangeEnd(date)
            const today = isToday(date)

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={disabled || !isCurrentMonth || occupied}
                title={occupied && occupiedInfo ? `Already used by ${occupiedInfo.country} trip` : undefined}
                className={cn(
                  "h-10 w-10 text-sm font-medium rounded-lg transition-colors relative border border-transparent",
                  "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                  {
                    // Current month styling - force readable text
                    "text-gray-900 !text-gray-900": isCurrentMonth && !disabled && !occupied,
                    "text-gray-400 !text-gray-400": !isCurrentMonth,

                    // Disabled styling
                    "text-gray-300 cursor-not-allowed !text-gray-300": disabled,

                    // Occupied styling (CLAUDE.md requirement: grey + strikethrough)
                    "bg-gray-200 text-gray-600 cursor-not-allowed opacity-60 !text-gray-600": occupied && isCurrentMonth,

                    // Today styling - force readable contrast
                    "bg-blue-100 text-blue-900 !text-blue-900": today && !inRange && !occupied && isCurrentMonth,

                    // Range styling
                    "bg-primary/20 text-gray-900 !text-gray-900": inRange && !rangeStart && !rangeEnd && !occupied,
                    "bg-primary text-white !text-white": (rangeStart || rangeEnd) && !occupied,

                    // Hover effects
                    "hover:bg-primary/10": !disabled && !inRange && !occupied && isCurrentMonth,
                    "hover:bg-primary/90": (rangeStart || rangeEnd) && !disabled && !occupied,
                  }
                )}
                style={{
                  color: (rangeStart || rangeEnd) && !occupied ? 'white' :
                         today && !inRange && !occupied && isCurrentMonth ? '#1e3a8a' :
                         occupied && isCurrentMonth ? '#4b5563' :
                         disabled ? '#d1d5db' :
                         !isCurrentMonth ? '#9ca3af' : '#111827'
                }}
              >
                <span className={occupied ? "line-through" : ""}>
                  {date.getDate()}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return typeof window !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="desktop-calendar-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <div className={cn(
        "relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto",
        "animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-center text-black">Select dates</h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar content */}
        <div className="p-6">
          {selectedRange.startDate && !selectedRange.endDate && (
            <div className="mb-4 text-center">
              <p className="text-blue-600 font-medium">
                Select your travel dates
              </p>
            </div>
          )}

          {/* Month range indicator */}
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-500">
              Showing: {format(currentMonth, 'MMMM yyyy')} - {format(addMonths(currentMonth, 1), 'MMMM yyyy')}
            </p>
          </div>

          {/* Dual month view with side navigation */}
          <div className="flex items-center justify-center gap-4" data-testid="dual-month-view">
            {/* Left navigation arrow */}
            <button
              onClick={goToPrevMonth}
              className="flex-shrink-0 p-3 hover:bg-gray-100 rounded-full transition-colors group"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
            </button>

            {/* Calendar months */}
            <div className="flex gap-8">
              {renderMonth(currentMonth)}
              {renderMonth(addMonths(currentMonth, 1))}
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={goToNextMonth}
              className="flex-shrink-0 p-3 hover:bg-gray-100 rounded-full transition-colors group"
              aria-label="Next month"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!selectedRange.startDate}
          >
            Clear
          </Button>
          
          <Button
            onClick={handleDone}
            disabled={!selectedRange.startDate}
            className="px-8"
          >
            Done
          </Button>
        </div>
      </div>
    </div>,
    document.body
  ) : null
}

export default CalendarModal