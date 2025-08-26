"use client"

import React from 'react'
import { cn } from '../../lib/utils'

export interface CircularProgressProps {
  /** Current value */
  value: number
  /** Maximum value (default: 90 for Schengen days) */
  max?: number
  /** Size of the circle in pixels */
  size?: number
  /** Stroke width */
  strokeWidth?: number
  /** Progress color */
  progressColor?: string
  /** Background color */
  backgroundColor?: string
  /** Text color */
  textColor?: string
  /** Additional className */
  className?: string
  /** Custom label */
  label?: string
  /** Show percentage instead of value */
  showPercentage?: boolean
  /** Animation duration in milliseconds */
  animationDuration?: number
}

export function CircularProgress({
  value,
  max = 90,
  size = 120,
  strokeWidth = 8,
  progressColor = "#10b981", // Green-500
  backgroundColor = "#e5e7eb", // Gray-200
  textColor = "#374151", // Gray-700
  className,
  label,
  showPercentage = false,
  animationDuration = 1000
}: CircularProgressProps) {
  // Calculate progress percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference
  
  // Display value
  const displayValue = showPercentage 
    ? `${Math.round(percentage)}%`
    : Math.round(value).toString()

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-labelledby="circular-progress-title"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <title id="circular-progress-title">
          {label ? `${label}: ${displayValue}` : `Progress: ${displayValue}`}
        </title>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            animationDuration: `${animationDuration}ms`,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div 
          className="text-3xl font-bold tabular-nums"
          style={{ color: textColor }}
        >
          {displayValue}
        </div>
        {label && (
          <div 
            className="text-sm font-medium mt-1"
            style={{ color: textColor }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

export default CircularProgress