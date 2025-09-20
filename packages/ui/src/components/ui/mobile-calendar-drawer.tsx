"use client"

import React, { useState, useEffect, useMemo, useRef } from 'react'
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Generate months: 12 months back + 12 months forward from current date (25 months total)
  const months = useMemo(() => {
    const monthsArray = []
    const currentDate = new Date()
    const currentMonthStart = startOfMonth(currentDate)
    
    console.log('📱 DEBUG: Raw current date:', currentDate)
    console.log('📱 DEBUG: Current date formatted:', format(currentDate, 'MMMM yyyy dd'))
    console.log('📱 DEBUG: Current month start:', format(currentMonthStart, 'MMMM yyyy dd'))
    
    // Dynamic range: 12 months back to 12 months forward from current date
    const startDate = subMonths(currentMonthStart, 12) // 12 months back
    const endDate = addMonths(currentMonthStart, 12)   // 12 months forward
    
    console.log('📱 DEBUG: Start date (12 months back):', format(startDate, 'MMMM yyyy dd'))
    console.log('📱 DEBUG: End date (12 months forward):', format(endDate, 'MMMM yyyy dd'))
    
    let monthDate = startDate
    while (monthDate <= endDate) {
      monthsArray.push(new Date(monthDate))
      monthDate = addMonths(monthDate, 1)
    }
    
    // Find current month index
    const currentMonthIndex = monthsArray.findIndex(month => 
      month.getFullYear() === currentDate.getFullYear() && 
      month.getMonth() === currentDate.getMonth()
    )
    
    console.log('📱 DEBUG: Generated months array:')
    monthsArray.forEach((month, index) => {
      const isCurrent = month.getFullYear() === currentDate.getFullYear() && 
                       month.getMonth() === currentDate.getMonth()
      console.log(`📱 DEBUG:   [${index}] ${format(month, 'MMMM yyyy')} ${isCurrent ? '← CURRENT' : ''}`)
    })
    
    console.log('📱 Mobile calendar: Generated', monthsArray.length, 'months from', 
      format(monthsArray[0], 'MMMM yyyy'), 'to', format(monthsArray[monthsArray.length - 1], 'MMMM yyyy'))
    console.log('📱 Mobile calendar: Current month is', format(currentDate, 'MMMM yyyy'), 'at index:', currentMonthIndex)
    
    return monthsArray
  }, [])

  // Reset when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedRange(initialRange || { startDate: null, endDate: null })
      setSelectingEnd(false)
    }
  }, [isOpen, initialRange])

  // Auto-scroll to current month when drawer opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current && months.length > 0) {
      const currentDate = new Date()
      
      // Find the actual current month index instead of assuming it's at index 12
      const actualCurrentMonthIndex = months.findIndex(month => 
        month.getFullYear() === currentDate.getFullYear() && 
        month.getMonth() === currentDate.getMonth()
      )
      
      console.log('📱 DEBUG: Auto-scroll triggered')
      console.log('📱 DEBUG: Drawer opened - current date:', format(currentDate, 'MMMM yyyy dd'))
      console.log('📱 DEBUG: Months array length:', months.length)
      console.log('📱 DEBUG: Actual current month index:', actualCurrentMonthIndex)
      if (actualCurrentMonthIndex >= 0) {
        console.log('📱 DEBUG: Target month:', format(months[actualCurrentMonthIndex], 'MMMM yyyy'))
      }
      
      // Auto-scroll to actual current month with retry mechanism
      const scrollToCurrentMonth = (attempt = 1, maxAttempts = 3) => {
        if (!scrollContainerRef.current || actualCurrentMonthIndex < 0) {
          console.warn('📱 DEBUG: Cannot scroll - container or month index invalid')
          return
        }

        console.log(`📱 DEBUG: Starting scroll animation... (attempt ${attempt}/${maxAttempts})`)

        // Progressive delay: 800ms, 1200ms, 1600ms
        const delay = 400 + (400 * attempt)

        // Wait for drawer animation and DOM rendering
        requestAnimationFrame(() => {
          setTimeout(() => {
            try {
              const monthElements = scrollContainerRef.current?.querySelectorAll('[data-month-index]')
              
              console.log('📱 DEBUG: Found month elements:', monthElements?.length)
              console.log('📱 DEBUG: Looking for element at index:', actualCurrentMonthIndex)
              
              if (monthElements && monthElements[actualCurrentMonthIndex]) {
                const targetElement = monthElements[actualCurrentMonthIndex] as HTMLElement
                const scrollContainer = scrollContainerRef.current
                
                // Method 1: Try precise scroll calculation (primary approach)
                try {
                  const containerTop = scrollContainer.getBoundingClientRect().top
                  const elementTop = targetElement.getBoundingClientRect().top
                  const currentScroll = scrollContainer.scrollTop
                  const targetScroll = currentScroll + (elementTop - containerTop) - 20
                  
                  console.log('📱 DEBUG: Scroll calculation:')
                  console.log('📱 DEBUG:   Container top:', containerTop)
                  console.log('📱 DEBUG:   Element top:', elementTop)
                  console.log('📱 DEBUG:   Current scroll:', currentScroll)
                  console.log('📱 DEBUG:   Target scroll:', targetScroll)
                  
                  scrollContainer.scrollTo({
                    top: Math.max(0, targetScroll),
                    behavior: 'smooth'
                  })
                  
                  console.log('📱 DEBUG: Primary scroll method executed')
                  
                  // Verify scroll worked after a delay
                  setTimeout(() => {
                    const finalScroll = scrollContainer.scrollTop
                    const scrollSuccess = Math.abs(finalScroll - targetScroll) < 100 // Allow 100px tolerance
                    
                    console.log('📱 DEBUG: Scroll verification - Final:', finalScroll, 'Target:', targetScroll, 'Success:', scrollSuccess)
                    
                    if (!scrollSuccess && attempt < maxAttempts) {
                      console.log('📱 DEBUG: Primary method failed, retrying...')
                      scrollToCurrentMonth(attempt + 1, maxAttempts)
                    } else if (!scrollSuccess && attempt === maxAttempts) {
                      console.log('📱 DEBUG: All primary attempts failed, trying fallback...')
                      // Fallback: scrollIntoView
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      })
                      console.log('📱 DEBUG: Fallback scrollIntoView executed')
                    }
                  }, 1000)
                  
                } catch (calcError) {
                  console.warn('📱 DEBUG: Scroll calculation failed, using fallback:', calcError)
                  // Immediate fallback to scrollIntoView
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                  console.log('📱 DEBUG: Immediate fallback scrollIntoView executed')
                }
                
              } else {
                console.warn('📱 DEBUG: Current month element not found at index', actualCurrentMonthIndex)
                console.warn('📱 DEBUG: Available elements:', monthElements?.length)
                
                // Retry if elements not found and attempts remaining
                if (attempt < maxAttempts) {
                  console.log(`📱 DEBUG: Elements not found, retrying in ${delay + 200}ms...`)
                  setTimeout(() => scrollToCurrentMonth(attempt + 1, maxAttempts), delay + 200)
                }
              }
            } catch (error) {
              console.error(`📱 DEBUG: Auto-scroll failed on attempt ${attempt}:`, error)
              
              // Retry if attempts remaining
              if (attempt < maxAttempts) {
                console.log(`📱 DEBUG: Retrying due to error in ${delay + 200}ms...`)
                setTimeout(() => scrollToCurrentMonth(attempt + 1, maxAttempts), delay + 200)
              }
            }
          }, delay)
        })
      }

      scrollToCurrentMonth()
    }
  }, [isOpen, months])

  // Handle date click - precise single-date selection
  const handleDateClick = (date: Date) => {
    // Create a clean date without time for comparison
    const cleanDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    
    // Check if date is disabled
    if (isDateDisabled(cleanDate)) {
      console.log('Date is disabled:', format(cleanDate, 'yyyy-MM-dd'))
      return
    }

    // Handle occupied date click - show helpful message
    if (isDateOccupied(cleanDate)) {
      const occupiedInfo = getOccupiedDateInfo(cleanDate)
      if (occupiedInfo) {
        console.log(`Cannot select ${format(cleanDate, 'yyyy-MM-dd')} - already used by ${occupiedInfo.country} trip`)
      }
      return
    }

    console.log('📱 Mobile calendar: Selecting date:', format(cleanDate, 'yyyy-MM-dd'), 'Current state:', { 
      startDate: selectedRange.startDate ? format(selectedRange.startDate, 'yyyy-MM-dd') : null,
      endDate: selectedRange.endDate ? format(selectedRange.endDate, 'yyyy-MM-dd') : null
    })

    // Clean Airbnb-style selection logic
    if (!selectedRange.startDate) {
      // First click: set start date (black circle)
      setSelectedRange({ startDate: cleanDate, endDate: null })
      setSelectingEnd(true)
      console.log('📱 ✓ Start date set:', format(cleanDate, 'yyyy-MM-dd'))
    } else if (!selectedRange.endDate) {
      // Second click: set end date or reset
      if (cleanDate.getTime() === selectedRange.startDate.getTime()) {
        // Clicking same date - do nothing or could deselect
        console.log('📱 Same date clicked, ignoring')
        return
      } else if (cleanDate > selectedRange.startDate) {
        // Valid end date - show range
        setSelectedRange({ ...selectedRange, endDate: cleanDate })
        setSelectingEnd(false)
        console.log('📱 ✓ End date set:', format(cleanDate, 'yyyy-MM-dd'))
      } else {
        // Before start date - reset with new start
        setSelectedRange({ startDate: cleanDate, endDate: null })
        setSelectingEnd(true)
        console.log('📱 ↺ Reset with new start:', format(cleanDate, 'yyyy-MM-dd'))
      }
    } else {
      // Both dates already selected - reset with new start
      setSelectedRange({ startDate: cleanDate, endDate: null })
      setSelectingEnd(true)
      console.log('📱 ↺ New selection started:', format(cleanDate, 'yyyy-MM-dd'))
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

  // Check if date is in selected range - only for current month dates
  const isDateInRange = (date: Date, monthDate: Date) => {
    if (!selectedRange.startDate || !isSameMonth(date, monthDate)) return false
    if (!selectedRange.endDate) return isSameDay(date, selectedRange.startDate)
    
    return date >= selectedRange.startDate && date <= selectedRange.endDate
  }

  // Check if date is range boundary - only for current month dates
  const isRangeStart = (date: Date, monthDate: Date) => {
    return selectedRange.startDate && 
           isSameMonth(date, monthDate) && 
           isSameDay(date, selectedRange.startDate)
  }

  const isRangeEnd = (date: Date, monthDate: Date) => {
    return selectedRange.endDate && 
           isSameMonth(date, monthDate) && 
           isSameDay(date, selectedRange.endDate)
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
        {/* Month header - centered and larger font */}
        <div className="text-center font-bold text-lg mb-6 text-black pt-6 border-b border-gray-200 pb-3">
          {format(monthDate, 'MMMM yyyy')}
        </div>

        {/* Days of week header - only show for first month to avoid repetition */}
        {isFirstMonth && (
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-black py-2">
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
            const inRange = isDateInRange(date, monthDate)
            const rangeStart = isRangeStart(date, monthDate)
            const rangeEnd = isRangeEnd(date, monthDate)
            const today = isToday(date)

            return (
              <button
                key={`${format(monthDate, 'yyyy-MM')}-${index}`}
                onClick={() => {
                  // Allow clicks on any non-disabled, non-occupied date (past, present, future)
                  if (!disabled && !occupied) {
                    console.log('📱 Selecting date:', format(date, 'yyyy-MM-dd'), 'from month:', format(monthDate, 'MMMM'))
                    handleDateClick(date)
                  } else {
                    console.log('📱 Click blocked - disabled:', disabled, 'occupied:', occupied)
                  }
                }}
                disabled={disabled || occupied}
                title={occupied && occupiedInfo ? `Already used by ${occupiedInfo.country} trip` : undefined}
                className={cn(
                  // Airbnb-style: 44px touch targets, clean design
                  "h-11 w-11 text-sm font-medium transition-all duration-150 relative",
                  "flex items-center justify-center",
                  {
                    // All valid dates styling - clickable (current, past, future months)
                    "text-gray-900 !text-gray-900 hover:bg-gray-100 hover:rounded-full focus:outline-none focus:ring-1 focus:ring-black cursor-pointer":
                      !disabled && !occupied && !inRange,

                    // Other month dates that are outside valid range - lighter but still clickable
                    "text-gray-500 !text-gray-500":
                      !isCurrentMonth && !disabled && !occupied,

                    // Disabled styling
                    "text-gray-200 cursor-not-allowed !text-gray-200": disabled,

                    // Occupied styling (CLAUDE.md requirement: grey + strikethrough)
                    "bg-gray-200 text-gray-600 cursor-not-allowed opacity-60 !text-gray-600": occupied,

                    // Range start and end styling - clear black circles
                    "bg-black text-white rounded-full font-semibold !text-white":
                      (rangeStart || rangeEnd) && !occupied,

                    // Range middle styling - light background
                    "bg-gray-100 text-gray-900 !text-gray-900":
                      inRange && !rangeStart && !rangeEnd && !occupied,
                  }
                )}
                style={{
                  color: (rangeStart || rangeEnd) && !occupied ? 'white' :
                         occupied ? '#4b5563' :
                         disabled ? '#e5e7eb' :
                         !isCurrentMonth ? '#6b7280' : '#111827'
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
            <h2 className="text-lg font-semibold text-black">Select dates</h2>
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
              ref={scrollContainerRef}
              className="h-full overflow-y-auto overscroll-y-contain scroll-smooth"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                touchAction: 'pan-y'
              }}
              data-testid="scrollable-months"
            >
              {/* Seamless month container - no gaps like Airbnb */}
              <div className="pb-8">
                {months.map((month, index) => {
                  const isCurrentMonth = month.getFullYear() === new Date().getFullYear() && 
                                       month.getMonth() === new Date().getMonth()
                  return (
                    <div 
                      key={`${month.getFullYear()}-${month.getMonth()}`} 
                      data-month-index={index}
                      className={isCurrentMonth ? 'current-month' : ''}
                      aria-label={isCurrentMonth ? `Current month: ${format(month, 'MMMM yyyy')}` : format(month, 'MMMM yyyy')}
                    >
                      {renderSeamlessMonth(month, index === 0)}
                    </div>
                  )
                })}
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