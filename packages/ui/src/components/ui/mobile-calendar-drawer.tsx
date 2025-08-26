"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'
import { Drawer } from 'vaul'
import { cn } from '../../lib/utils'
import { Button } from './button'
import type { OccupiedDateInfo } from '../../validators/date-overlap-validator'
import type { CalendarDateRange } from '../../types/calendar'

export interface MobileCalendarDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean
  /** Callback when drawer should close */
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

export function MobileCalendarDrawer({
  isOpen,
  onClose,
  onDateRangeSelect,
  initialRange,
  disabledDates = [],
  occupiedDateInfo = [],
  minDate,
  maxDate,
  className
}: MobileCalendarDrawerProps) {
  const [selectedRange, setSelectedRange] = useState<CalendarDateRange>(
    initialRange || { startDate: null, endDate: null }
  )
  const [selectingEnd, setSelectingEnd] = useState(false)

  // Generate 18 months starting from current month for true Airbnb-style scrolling
  const months = useMemo(() => {
    const monthsArray = []
    const startDate = new Date()
    // Start from current month, go 18 months forward for more scrolling options
    for (let i = 0; i < 18; i++) {
      monthsArray.push(addMonths(startDate, i))
    }
    return monthsArray
  }, [])

  // Reset when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedRange(initialRange || { startDate: null, endDate: null })
      setSelectingEnd(false)
    }
  }, [isOpen, initialRange])

  // Handle date click - simplified Airbnb-style logic
  const handleDateClick = (date: Date) => {
    // Check if date is disabled
    if (isDateDisabled(date)) {
      console.log('Date is disabled:', format(date, 'MMM dd'))
      return
    }

    // Handle occupied date click - show helpful message
    if (isDateOccupied(date)) {
      const occupiedInfo = getOccupiedDateInfo(date)
      if (occupiedInfo) {
        console.log(`Cannot select ${format(date, 'MMM dd')} - already used by ${occupiedInfo.country} trip`)
      }
      return
    }

    console.log('Clicking date:', format(date, 'MMM dd'), 'Current state:', { 
      startDate: selectedRange.startDate ? format(selectedRange.startDate, 'MMM dd') : null,
      endDate: selectedRange.endDate ? format(selectedRange.endDate, 'MMM dd') : null,
      selectingEnd 
    })

    // Airbnb-style selection: start -> end -> reset
    if (!selectedRange.startDate) {
      // First click: set start date
      setSelectedRange({ startDate: date, endDate: null })
      setSelectingEnd(true)
      console.log('Set start date:', format(date, 'MMM dd'))
    } else if (!selectedRange.endDate) {
      // Second click: set end date (or reset if before start)
      if (date >= selectedRange.startDate) {
        setSelectedRange({ ...selectedRange, endDate: date })
        setSelectingEnd(false)
        console.log('Set end date:', format(date, 'MMM dd'))
      } else {
        // Reset if clicking before start date
        setSelectedRange({ startDate: date, endDate: null })
        setSelectingEnd(true)
        console.log('Reset with new start date:', format(date, 'MMM dd'))
      }
    } else {
      // Both dates selected: reset with new start
      setSelectedRange({ startDate: date, endDate: null })
      setSelectingEnd(true)
      console.log('Reset with new start date:', format(date, 'MMM dd'))
    }
  }

  // Check if date is disabled - identical to desktop
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate))
  }

  // Check if date is occupied by an existing trip - identical to desktop
  const getOccupiedDateInfo = (date: Date): OccupiedDateInfo | null => {
    return occupiedDateInfo.find(info => isSameDay(info.date, date)) || null
  }

  // Check if date is occupied - identical to desktop
  const isDateOccupied = (date: Date) => {
    return getOccupiedDateInfo(date) !== null
  }

  // Check if date is in selected range - identical to desktop
  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate) return false
    if (!selectedRange.endDate) return isSameDay(date, selectedRange.startDate)
    
    return date >= selectedRange.startDate && date <= selectedRange.endDate
  }

  // Check if date is range boundary - identical to desktop
  const isRangeStart = (date: Date) => {
    return selectedRange.startDate && isSameDay(date, selectedRange.startDate)
  }

  const isRangeEnd = (date: Date) => {
    return selectedRange.endDate && isSameDay(date, selectedRange.endDate)
  }

  // Handle clear - identical to desktop
  const handleClear = () => {
    setSelectedRange({ startDate: null, endDate: null })
    setSelectingEnd(false)
  }

  // Handle done - identical to desktop
  const handleDone = () => {
    onDateRangeSelect(selectedRange)
    onClose()
  }

  // No longer need touch handlers - scrolling is handled by native scroll

  // Render seamless month for Airbnb-style continuous scrolling
  const renderSeamlessMonth = (monthDate: Date, isFirstMonth = false) => {
    const monthStart = startOfMonth(monthDate)
    const monthEnd = endOfMonth(monthDate)
    
    // Get all days in the month
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

    // Add padding days from previous month for first week
    const startPadding = monthStart.getDay()
    const paddingDays = []
    for (let i = startPadding - 1; i >= 0; i--) {
      const paddingDate = new Date(monthStart)
      paddingDate.setDate(paddingDate.getDate() - (i + 1))
      paddingDays.push(paddingDate)
    }

    // Add padding days from next month for last week
    const endPadding = 6 - monthEnd.getDay()
    const endPaddingDays = []
    for (let i = 1; i <= endPadding; i++) {
      const paddingDate = new Date(monthEnd)
      paddingDate.setDate(paddingDate.getDate() + i)
      endPaddingDays.push(paddingDate)
    }

    const allDays = [...paddingDays, ...monthDays, ...endPaddingDays]

    return (
      <div className="px-4">
        {/* Month header - sticky-like appearance but not actually sticky */}
        <div className="text-left font-bold text-xl mb-6 text-gray-900 pt-6">
          {format(monthDate, 'MMMM yyyy')}
        </div>

        {/* Days of week header - only show for first month to avoid repetition */}
        {isFirstMonth && (
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
        )}

        {/* Calendar days - Airbnb-style seamless grid */}
        <div className="grid grid-cols-7 gap-1 mb-2" data-testid="mobile-calendar-content">
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
                onClick={() => {
                  console.log('Button clicked:', format(date, 'MMM dd'), 'isCurrentMonth:', isCurrentMonth, 'disabled:', disabled, 'occupied:', occupied)
                  if (!disabled && isCurrentMonth && !occupied) {
                    handleDateClick(date)
                  }
                }}
                disabled={false}
                title={occupied && occupiedInfo ? `Already used by ${occupiedInfo.country} trip` : undefined}
                className={cn(
                  // Airbnb-style: 44px touch targets, clean design
                  "h-11 w-11 text-sm font-medium transition-all duration-150 relative",
                  "flex items-center justify-center cursor-pointer",
                  {
                    // Current month styling - clean Airbnb style
                    "text-gray-900 hover:bg-gray-100 hover:rounded-full focus:outline-none focus:ring-1 focus:ring-black": 
                      isCurrentMonth && !disabled && !occupied && !inRange,
                    
                    // Other month styling (lighter, still clickable for seamless experience)
                    "text-gray-300 hover:bg-gray-50 hover:rounded-full": 
                      !isCurrentMonth && !disabled && !occupied,
                    
                    // Disabled styling
                    "text-gray-200 cursor-not-allowed": disabled,
                    
                    // Occupied styling (CLAUDE.md requirement: grey + strikethrough)
                    "bg-gray-200 text-gray-600 cursor-not-allowed opacity-60": occupied,
                    
                    // Today styling - subtle Airbnb style
                    "bg-black text-white font-semibold rounded-full": 
                      today && !inRange && !occupied,
                    
                    // Range styling - true Airbnb colors and design
                    "bg-gray-100 text-gray-900 rounded-full": 
                      inRange && !rangeStart && !rangeEnd && !occupied,
                    "bg-black text-white rounded-full font-semibold": 
                      (rangeStart || rangeEnd) && !occupied,
                  }
                )}
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

  // SSR Safety: Only render drawer on client side
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content 
          className={cn(
            "bg-white flex flex-col rounded-t-xl h-[90vh] mt-24 fixed bottom-0 left-0 right-0",
            "focus:outline-none z-50",
            className
          )}
          data-testid="mobile-drawer"
        >
          {/* Drag handle */}
          <div 
            className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 mt-4" 
            data-testid="drag-handle"
          />
          
          {/* Header */}
          <div className="text-center px-6 mb-6">
            <h2 className="text-lg font-semibold">Select dates</h2>
          </div>

          {/* Content area - True Airbnb seamless scrolling */}
          <div className="flex-1 overflow-hidden">
            {selectedRange.startDate && !selectedRange.endDate && (
              <div className="mb-3 text-center px-4">
                <p className="text-gray-600 font-medium text-sm">
                  Select your end date
                </p>
              </div>
            )}

            {/* True Airbnb-style seamless scrolling calendar */}
            <div 
              className="h-full overflow-y-auto overscroll-y-contain"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
              data-testid="scrollable-months"
            >
              {/* Seamless month container - no gaps like Airbnb */}
              <div className="pb-8">
                {months.map((month, index) => (
                  <div key={index}>
                    {renderSeamlessMonth(month, index === 0)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!selectedRange.startDate}
              className="px-8"
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}