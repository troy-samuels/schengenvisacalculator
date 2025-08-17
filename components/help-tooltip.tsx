"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HelpTooltipProps {
  content: ReactNode
  title?: string
  position?: "top" | "bottom" | "left" | "right" | "auto"
  size?: "sm" | "md" | "lg"
  className?: string
  children?: ReactNode
}

export function HelpTooltip({ 
  content, 
  title, 
  position = "auto", 
  size = "md",
  className = "",
  children 
}: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [actualPosition, setActualPosition] = useState<"top" | "bottom" | "left" | "right">("top")
  const [isMobile, setIsMobile] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate tooltip position
  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const tooltip = tooltipRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    let newPosition = position

    if (position === "auto") {
      // Auto-calculate best position
      const spaceTop = trigger.top
      const spaceBottom = viewport.height - trigger.bottom
      const spaceLeft = trigger.left
      const spaceRight = viewport.width - trigger.right

      if (isMobile) {
        // On mobile, prefer bottom or top for better thumb reach
        newPosition = spaceBottom > 300 ? "bottom" : "top"
      } else {
        // On desktop, choose position with most space
        const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight)
        if (maxSpace === spaceBottom && spaceBottom > 200) newPosition = "bottom"
        else if (maxSpace === spaceTop && spaceTop > 200) newPosition = "top"
        else if (maxSpace === spaceRight && spaceRight > 300) newPosition = "right"
        else newPosition = "left"
      }
    }

    setActualPosition(newPosition)
  }, [isVisible, position, isMobile])

  // Close on outside click/touch
  useEffect(() => {
    if (!isVisible) return

    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      if (
        tooltipRef.current && 
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideInteraction)
    document.addEventListener('touchstart', handleOutsideInteraction)
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction)
      document.removeEventListener('touchstart', handleOutsideInteraction)
    }
  }, [isVisible])

  // Close on escape key
  useEffect(() => {
    if (!isVisible) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible])

  const handleTriggerClick = () => {
    setIsVisible(!isVisible)
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsVisible(!isVisible)
    }
  }

  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md"
  }

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
  }

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900"
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Custom trigger or default help icon */}
      {children ? (
        <div
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={isVisible}
          aria-haspopup="true"
          className="cursor-pointer"
        >
          {children}
        </div>
      ) : (
        <Button
          ref={triggerRef}
          variant="ghost"
          size="sm"
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          onMouseEnter={() => !isMobile && setIsVisible(true)}
          onMouseLeave={() => !isMobile && setIsVisible(false)}
          className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={title ? `Help: ${title}` : "Show help"}
          aria-expanded={isVisible}
          aria-haspopup="true"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      )}

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 ${positionClasses[actualPosition]} ${sizeClasses[size]}
            bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700
            animate-in fade-in-0 zoom-in-95 duration-200
            ${isMobile ? 'fixed inset-x-4 top-20 transform-none !max-w-none' : ''}
          `}
          role="tooltip"
          aria-live="polite"
        >
          {/* Arrow (desktop only) */}
          {!isMobile && (
            <div 
              className={`absolute w-0 h-0 border-4 ${arrowClasses[actualPosition]}`}
            />
          )}

          {/* Content */}
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              {title && (
                <h3 className="font-semibold text-sm text-white">
                  {title}
                </h3>
              )}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="h-6 w-6 p-0 text-gray-300 hover:text-white ml-auto"
                  aria-label="Close help"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Content */}
            <div className="text-sm text-gray-100 leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}