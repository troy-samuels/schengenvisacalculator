"use client"

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
  searchable?: boolean
}

export function Select({
  options,
  value,
  placeholder = "Select an option...",
  onValueChange,
  disabled = false,
  className = "",
  searchable = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const selectRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  // Find selected option
  const selectedOption = options.find(option => option.value === value)

  // Calculate dropdown position for portal rendering with enhanced accuracy
  const calculateDropdownPosition = () => {
    if (!selectRef.current) return

    const rect = selectRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    
    // Use viewport-relative positioning for better accuracy
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    const dropdownHeight = 240 // max-h-60 = 15rem = 240px

    // Determine if dropdown should open upwards
    const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight

    // Calculate position relative to viewport (fixed positioning)
    const top = shouldOpenUp 
      ? Math.max(10, rect.top - dropdownHeight - 4) // 4px gap
      : Math.min(viewportHeight - dropdownHeight - 10, rect.bottom + 4) // 4px gap

    // Ensure dropdown doesn't overflow horizontally
    let left = rect.left
    const rightEdge = left + rect.width
    if (rightEdge > viewportWidth) {
      left = Math.max(10, viewportWidth - rect.width - 10) // 10px margin
    }

    setDropdownPosition({
      top: top,
      left: Math.max(10, left),
      width: rect.width
    })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      
      // Check if click is outside both the select trigger and the dropdown
      if (selectRef.current && !selectRef.current.contains(target)) {
        // Also check if the click is not within the dropdown portal
        const dropdownElement = document.querySelector('[data-dropdown-portal]')
        if (!dropdownElement || !dropdownElement.contains(target)) {
          setIsOpen(false)
          setSearchQuery("")
          setHighlightedIndex(-1)
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition()
      }
    }

    if (isOpen) {
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleResize)
      }
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          setSearchQuery("")
          setHighlightedIndex(-1)
          break
        case 'ArrowDown':
          event.preventDefault()
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
          break
        case 'Enter':
          event.preventDefault()
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            const selectedOption = filteredOptions[highlightedIndex]
            if (!selectedOption.disabled) {
              onValueChange?.(selectedOption.value)
              setIsOpen(false)
              setSearchQuery("")
              setHighlightedIndex(-1)
            }
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, highlightedIndex, filteredOptions, onValueChange])

  const handleToggle = () => {
    if (disabled) return
    
    if (!isOpen) {
      setIsOpen(true)
      setSearchQuery("")
      setHighlightedIndex(-1)
      // Calculate position after state update
      requestAnimationFrame(() => {
        calculateDropdownPosition()
      })
    } else {
      setIsOpen(false)
    }
  }

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return
    onValueChange?.(option.value)
    setIsOpen(false)
    setSearchQuery("")
    setHighlightedIndex(-1)
  }

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      {/* Select Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-accent hover:text-accent-foreground transition-colors",
          "mobile-touch-target"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={cn(
          selectedOption ? "text-foreground" : "text-muted-foreground"
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>

      {/* Dropdown rendered via portal for proper z-index */}
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div 
          data-dropdown-portal
          className={cn(
            "fixed z-[9999] rounded-md border border-input bg-white shadow-2xl",
            "animate-in fade-in-0 zoom-in-95"
          )}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${Math.max(dropdownPosition.width, 200)}px`,
            maxHeight: '240px'
          }}
        >
          {/* Search Input */}
          {searchable && (
            <div className="p-2">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 text-sm bg-background border border-input rounded-md",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                )}
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto" role="listbox" style={{ scrollbarWidth: 'thin' }}>
            {filteredOptions.length === 0 ? (
              <div className="py-2 px-3 text-sm text-muted-foreground text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  disabled={option.disabled}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-3 text-sm text-left",
                    "hover:bg-gray-100 hover:text-gray-900 cursor-pointer",
                    "focus:bg-gray-100 focus:text-gray-900 focus:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-150",
                    highlightedIndex === index && "bg-gray-100 text-gray-900",
                    option.value === value && "bg-primary/10 text-primary font-medium",
                    "min-h-[44px] flex items-center" // Ensure touch target size
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && (
                    <Check className="h-4 w-4 shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default Select