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

  // Handle date click - identical logic to desktop modal
  const handleDateClick = (date: Date) => {
    // Check if date is disabled
    if (isDateDisabled(date)) return

    // Handle occupied date click - show helpful message
    if (isDateOccupied(date)) {
      const occupiedInfo = getOccupiedDateInfo(date)
      if (occupiedInfo) {
        // You could add a toast notification here in the future
        console.log(`Cannot select ${format(date, 'MMM dd')} - already used by ${occupiedInfo.country} trip`)
      }
      return
    }

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
                onClick={() => handleDateClick(date)}
                disabled={disabled || !isCurrentMonth || occupied}
                title={occupied && occupiedInfo ? `Already used by ${occupiedInfo.country} trip` : undefined}
                className={cn(
                  // Airbnb-style: 44px touch targets, clean design
                  "h-11 w-11 text-sm font-medium transition-all duration-150 relative",
                  "hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black",
                  "flex items-center justify-center",
                  {
                    // Current month styling - clean Airbnb style
                    "text-gray-900 hover:bg-gray-100": isCurrentMonth && !disabled && !occupied && !inRange,
                    "text-gray-300": !isCurrentMonth,
                    
                    // Disabled styling
                    "text-gray-200 cursor-not-allowed": disabled,
                    
                    // Occupied styling (CLAUDE.md requirement: grey + strikethrough)
                    "bg-gray-200 text-gray-600 cursor-not-allowed opacity-60": occupied && isCurrentMonth,
                    
                    // Today styling - subtle Airbnb style
                    "bg-black text-white font-semibold rounded-full": today && !inRange && !occupied && isCurrentMonth,
                    
                    // Range styling - true Airbnb colors and design
                    "bg-gray-100 text-gray-900 rounded-full": inRange && !rangeStart && !rangeEnd && !occupied,
                    "bg-black text-white rounded-full font-semibold": (rangeStart || rangeEnd) && !occupied,
                    
                    // Hover effects - subtle like Airbnb
                    "hover:rounded-full": !disabled && !inRange && !occupied && isCurrentMonth,
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
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content 
          className={cn(
            "bg-white flex flex-col rounded-t-xl h-[90vh] mt-24 fixed bottom-0 left-0 right-0",
            "focus:outline-none",
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