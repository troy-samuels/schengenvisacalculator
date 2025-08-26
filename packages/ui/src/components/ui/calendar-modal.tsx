"use client"

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'
import { cn } from '../../lib/utils'
import { Button } from './button'

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface CalendarModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Callback when date range is selected */
  onDateRangeSelect: (range: DateRange) => void
  /** Initial date range */
  initialRange?: DateRange
  /** Disabled dates */
  disabledDates?: Date[]
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
  minDate,
  maxDate,
  className
}: CalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    initialRange || { startDate: null, endDate: null }
  )
  const [selectingEnd, setSelectingEnd] = useState(false)

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedRange(initialRange || { startDate: null, endDate: null })
      setSelectingEnd(false)
    }
  }, [isOpen, initialRange])

  // Handle date click
  const handleDateClick = (date: Date) => {
    // Check if date is disabled
    if (isDateDisabled(date)) return

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
  const goToPrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1))
  const goToNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1))

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
        <div className="text-center font-semibold text-lg mb-4">
          {format(monthDate, 'MMMM yyyy')}
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {allDays.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, monthDate)
            const disabled = isDateDisabled(date)
            const inRange = isDateInRange(date)
            const rangeStart = isRangeStart(date)
            const rangeEnd = isRangeEnd(date)
            const today = isToday(date)

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={disabled || !isCurrentMonth}
                className={cn(
                  "h-10 w-10 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50",
                  {
                    // Current month styling
                    "text-gray-900": isCurrentMonth && !disabled,
                    "text-gray-400": !isCurrentMonth,
                    
                    // Disabled styling
                    "text-gray-300 cursor-not-allowed": disabled,
                    
                    // Today styling
                    "bg-blue-100 text-blue-900": today && !inRange && isCurrentMonth,
                    
                    // Range styling
                    "bg-primary/20": inRange && !rangeStart && !rangeEnd,
                    "bg-primary text-white": rangeStart || rangeEnd,
                    
                    // Hover effects
                    "hover:bg-primary/10": !disabled && !inRange && isCurrentMonth,
                    "hover:bg-primary/90": (rangeStart || rangeEnd) && !disabled,
                  }
                )}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return typeof window !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">Select dates</h2>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
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

          {/* Dual month view */}
          <div className="flex gap-8 justify-center">
            {renderMonth(currentMonth)}
            {renderMonth(addMonths(currentMonth, 1))}
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