"use client"

import React, { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  value,
  duration = 800,
  className = "",
  suffix = "",
  prefix = ""
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startValueRef = useRef(0)

  useEffect(() => {
    if (value === displayValue) return

    setIsAnimating(true)
    startValueRef.current = displayValue
    startTimeRef.current = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - (startTimeRef.current || now)
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = startValueRef.current + (value - startValueRef.current) * easeOut
      setDisplayValue(Math.round(currentValue))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
        setIsAnimating(false)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [value, duration, displayValue])

  return (
    <span className={`${className} ${isAnimating ? 'transition-transform duration-150 scale-105' : 'transition-transform duration-150 scale-100'}`}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}