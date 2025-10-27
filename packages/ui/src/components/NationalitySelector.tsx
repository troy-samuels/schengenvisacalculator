'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { Globe, Check, X } from 'lucide-react'
import { Button } from './ui/button'

/**
 * Nationality Selector Component
 *
 * Smart user segmentation for visa-exempt vs visa-required travelers
 * Supports 195 countries with autocomplete and flag emojis
 *
 * Features:
 * - Mobile-first design (44px touch targets)
 * - Fuzzy search with flag emoji display
 * - Stores selection in user_nationalities table
 * - Triggers conditional UI based on visa_required status
 * - Progressive disclosure (optional, non-intrusive)
 */

export interface Country {
  country_code: string
  country_name: string
  flag_emoji: string
  region: string | null
  visa_required: boolean
  population: number | null
  search_priority: number
}

interface NationalitySelectorProps {
  /** Selected country code (ISO 3166-1 alpha-2) */
  value?: string

  /** Callback when nationality is selected */
  onSelect?: (country: Country) => void

  /** Callback when selection is cleared */
  onClear?: () => void

  /** List of countries to display */
  countries: Country[]

  /** Compact mode for header display */
  compact?: boolean

  /** Placeholder text */
  placeholder?: string

  /** Optional className for wrapper */
  className?: string

  /** Auto-focus on mount */
  autoFocus?: boolean
}

export function NationalitySelector({
  value,
  onSelect,
  onClear,
  countries,
  compact = false,
  placeholder = 'Select your nationality',
  className,
  autoFocus = false
}: NationalitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Find selected country on mount or value change
  useEffect(() => {
    if (value) {
      const country = countries.find(c => c.country_code === value)
      if (country) {
        setSelectedCountry(country)
        setSearchQuery('')
      }
    }
  }, [value, countries])

  // Filter countries based on search query
  const filteredCountries = React.useMemo(() => {
    if (!searchQuery.trim()) {
      // Show top 20 countries by search priority when no query
      return countries
        .slice()
        .sort((a, b) => a.search_priority - b.search_priority)
        .slice(0, 20)
    }

    const query = searchQuery.toLowerCase()
    return countries
      .filter(country => {
        const nameMatch = country.country_name.toLowerCase().includes(query)
        const codeMatch = country.country_code.toLowerCase().includes(query)
        return nameMatch || codeMatch
      })
      .sort((a, b) => {
        // Prioritize exact matches at start
        const aStartsWith = a.country_name.toLowerCase().startsWith(query)
        const bStartsWith = b.country_name.toLowerCase().startsWith(query)
        if (aStartsWith && !bStartsWith) return -1
        if (!aStartsWith && bStartsWith) return 1

        // Then by search priority
        return a.search_priority - b.search_priority
      })
      .slice(0, 10) // Max 10 results
  }, [searchQuery, countries])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
        setFocusedIndex(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const focusedElement = dropdownRef.current.querySelector(`[data-index="${focusedIndex}"]`)
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [focusedIndex, isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key !== 'Escape') {
      setIsOpen(true)
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev =>
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        )
        break

      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => prev > 0 ? prev - 1 : prev)
        break

      case 'Enter':
        e.preventDefault()
        if (filteredCountries[focusedIndex]) {
          handleSelect(filteredCountries[focusedIndex])
        }
        break

      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSearchQuery('')
        setFocusedIndex(0)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelect = (country: Country) => {
    setSelectedCountry(country)
    setSearchQuery('')
    setIsOpen(false)
    setFocusedIndex(0)
    onSelect?.(country)
  }

  const handleClear = () => {
    setSelectedCountry(null)
    setSearchQuery('')
    setFocusedIndex(0)
    onClear?.()
    inputRef.current?.focus()
  }

  // Compact display mode for header
  if (compact && selectedCountry) {
    return (
      <div className={cn('relative', className)}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'min-h-[44px] md:min-h-[36px] px-3 gap-2',
            'bg-white hover:bg-gray-50 border-gray-300',
            'text-sm font-medium'
          )}
        >
          <span className="text-lg">{selectedCountry.flag_emoji}</span>
          <span className="hidden sm:inline">{selectedCountry.country_name}</span>
          <span className="sm:hidden">{selectedCountry.country_code}</span>
        </Button>

        {isOpen && (
          <div
            ref={wrapperRef}
            className={cn(
              'absolute right-0 top-full mt-2 z-50',
              'w-[300px] max-w-[calc(100vw-2rem)]',
              'bg-white rounded-lg shadow-lg border border-gray-200',
              'overflow-hidden'
            )}
          >
            {/* Search input */}
            <div className="p-2 border-b border-gray-200">
              <Input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setFocusedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search countries..."
                leftIcon={<Globe className="w-4 h-4" />}
                autoFocus
                className="min-h-[44px]"
              />
            </div>

            {/* Country list */}
            <div
              ref={dropdownRef}
              className="max-h-[300px] overflow-y-auto"
            >
              {filteredCountries.map((country, index) => (
                <button
                  key={country.country_code}
                  data-index={index}
                  onClick={() => handleSelect(country)}
                  className={cn(
                    'w-full px-3 py-2.5 flex items-center gap-3',
                    'min-h-[44px] text-left',
                    'transition-colors',
                    'hover:bg-gray-50',
                    focusedIndex === index && 'bg-gray-50',
                    selectedCountry?.country_code === country.country_code && 'bg-blue-50'
                  )}
                >
                  <span className="text-2xl flex-shrink-0">{country.flag_emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {country.country_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {country.visa_required ? 'Visa required' : 'Visa-exempt'}
                    </div>
                  </div>
                  {selectedCountry?.country_code === country.country_code && (
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                </button>
              ))}

              {filteredCountries.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-gray-500">
                  No countries found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Clear button */}
            <div className="p-2 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="w-full min-h-[44px] justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear selection
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full display mode
  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      {/* Selected display or search input */}
      {selectedCountry && !isOpen ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className={cn(
              'w-full px-3 py-2.5 min-h-[44px]',
              'flex items-center gap-3',
              'bg-white border border-gray-300 rounded-md',
              'text-left transition-all',
              'hover:border-blue-500 hover:ring-4 hover:ring-blue-100',
              'focus-visible:outline-none focus-visible:border-blue-500',
              'focus-visible:ring-4 focus-visible:ring-blue-100'
            )}
          >
            <span className="text-2xl flex-shrink-0">{selectedCountry.flag_emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">
                {selectedCountry.country_name}
              </div>
              <div className="text-xs text-gray-500">
                {selectedCountry.visa_required ? 'Visa required for Schengen' : 'Visa-exempt'}
              </div>
            </div>
          </button>

          <button
            onClick={handleClear}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2',
              'p-1.5 rounded-md',
              'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'transition-colors'
            )}
            aria-label="Clear selection"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsOpen(true)
              setFocusedIndex(0)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            leftIcon={<Globe className="w-4 h-4" />}
            autoFocus={autoFocus}
            className="min-h-[44px]"
          />
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute top-full left-0 right-0 mt-2 z-50',
            'bg-white rounded-lg shadow-lg border border-gray-200',
            'max-h-[400px] overflow-y-auto'
          )}
        >
          {filteredCountries.map((country, index) => (
            <button
              key={country.country_code}
              data-index={index}
              onClick={() => handleSelect(country)}
              className={cn(
                'w-full px-3 py-2.5 flex items-center gap-3',
                'min-h-[44px] text-left',
                'transition-colors',
                'hover:bg-gray-50',
                focusedIndex === index && 'bg-gray-50',
                selectedCountry?.country_code === country.country_code && 'bg-blue-50'
              )}
            >
              <span className="text-2xl flex-shrink-0">{country.flag_emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900 truncate">
                  {country.country_name}
                </div>
                <div className="text-xs text-gray-500">
                  {country.visa_required ? 'Visa required' : 'Visa-exempt'}
                </div>
              </div>
              {selectedCountry?.country_code === country.country_code && (
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              )}
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-gray-500">
              {searchQuery ? (
                <>No countries found matching "{searchQuery}"</>
              ) : (
                <>Loading countries...</>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
