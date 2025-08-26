import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with conditional logic
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to ISO string for consistent date comparisons
 */
export function formatDateKey(date: Date): string {
  return date.toISOString().split('T')[0]!
}

/**
 * Check if two dates are the same day (ignoring time)
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return formatDateKey(date1) === formatDateKey(date2)
}

/**
 * Check if a date is within a date range (inclusive)
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const dateKey = formatDateKey(date)
  const startKey = formatDateKey(start)
  const endKey = formatDateKey(end)
  
  return dateKey >= startKey && dateKey <= endKey
}

/**
 * Generate array of dates between start and end (inclusive)
 */
export function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = []
  const current = new Date(start)
  
  while (current <= end) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  
  return dates
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

/**
 * Check if date is in the future
 */
export function isFutureDate(date: Date): boolean {
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return date > today
}

/**
 * Format date for display in UI components
 */
export function formatDisplayDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  })
}

/**
 * Format date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  if (isSameDay(start, end)) {
    return formatDisplayDate(start)
  }
  
  return `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`
}

/**
 * Calculate number of days between two dates
 */
export function daysBetween(start: Date, end: Date): number {
  const startTime = new Date(start).setHours(0, 0, 0, 0)
  const endTime = new Date(end).setHours(0, 0, 0, 0)
  
  return Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24))
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Subtract days from a date
 */
export function subtractDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

/**
 * Get the start of day for consistent date comparisons
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * Get the end of day
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Generate a unique ID for components
 */
export function generateId(prefix: string = 'schengen'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if device is mobile based on viewport width
 */
export function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

/**
 * Check if device has touch capability
 */
export function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && 'ontouchstart' in window
}