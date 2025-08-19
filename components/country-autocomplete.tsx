'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { countries, searchCountries, getSchengenStatusLabel, getPopularCountries, type Country } from '@/lib/data/countries'
import { ChevronDown, X, Search } from 'lucide-react'

interface CountryAutocompleteProps {
  value?: Country | null
  onChange?: (country: Country | null) => void
  placeholder?: string
  className?: string
  showPopular?: boolean
  autoFocus?: boolean
  id?: string
  name?: string
  required?: boolean
  disabled?: boolean
}

export function CountryAutocomplete({
  value,
  onChange,
  placeholder = 'Search for a country...',
  className = '',
  showPopular = true,
  autoFocus = false,
  id,
  name,
  required = false,
  disabled = false
}: CountryAutocompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Country[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update input when value changes externally
  useEffect(() => {
    if (value) {
      setInputValue(`${value.flag} ${value.name}`)
    } else {
      setInputValue('')
    }
  }, [value])

  // Handle search
  useEffect(() => {
    if (!value && inputValue) {
      const searchResults = searchCountries(inputValue)
      setResults(searchResults.slice(0, 10)) // Limit to 10 results
    } else if (!inputValue && showPopular && isOpen) {
      setResults(getPopularCountries().slice(0, 8))
    } else if (!inputValue) {
      setResults([])
    }
  }, [inputValue, value, showPopular, isOpen])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setIsOpen(true)
    setHighlightedIndex(-1)
    
    if (value) {
      onChange?.(null)
    }
  }

  const handleSelectCountry = useCallback((country: Country) => {
    onChange?.(country)
    setInputValue(`${country.flag} ${country.name}`)
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.blur()
  }, [onChange])

  const handleClear = () => {
    onChange?.(null)
    setInputValue('')
    setResults([])
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true)
      return
    }

    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          handleSelectCountry(results[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('[role="option"]')
      const highlightedItem = items[highlightedIndex] as HTMLElement
      if (highlightedItem) {
        highlightedItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        })
      }
    }
  }, [highlightedIndex])

  const getStatusColor = (status: Country['schengenStatus']) => {
    if (status.includes('schengen')) return 'text-green-600 dark:text-green-400'
    if (status === 'eu-non-schengen') return 'text-blue-600 dark:text-blue-400'
    return 'text-gray-500 dark:text-gray-400'
  }

  const getStatusBg = (status: Country['schengenStatus']) => {
    if (status.includes('schengen')) return 'bg-green-50 dark:bg-green-950/30'
    if (status === 'eu-non-schengen') return 'bg-blue-50 dark:bg-blue-950/30'
    return ''
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          className="w-full px-4 py-3 pr-20 text-base border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 
                     dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="country-listbox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Search className="w-4 h-4 mr-2 text-gray-400" />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 pointer-events-auto"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (results.length > 0 || (!inputValue && showPopular)) && (
        <div
          ref={dropdownRef}
          id="country-listbox"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 
                     dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-auto"
        >
          {!inputValue && showPopular && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Popular Destinations
            </div>
          )}
          
          {results.map((country, index) => (
            <div
              key={country.code}
              role="option"
              aria-selected={highlightedIndex === index}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors
                ${highlightedIndex === index ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                ${getStatusBg(country.schengenStatus)}
                hover:bg-gray-50 dark:hover:bg-gray-700/50
                border-b border-gray-100 dark:border-gray-700/50 last:border-0`}
              onClick={() => handleSelectCountry(country)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-label={`${country.name} flag`}>
                  {country.flag}
                </span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {country.name}
                  </div>
                  {country.alternativeNames && country.alternativeNames.length > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Also known as: {country.alternativeNames.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              
              <span className={`text-xs font-medium ${getStatusColor(country.schengenStatus)}`}>
                {getSchengenStatusLabel(country.schengenStatus)}
              </span>
            </div>
          ))}
          
          {results.length === 0 && inputValue && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              No countries found matching "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}