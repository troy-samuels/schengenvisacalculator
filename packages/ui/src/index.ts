// Styles (must be imported first)
import "./styles.css"

// Core utilities
export * from "./lib/utils"

// UI Components (shadcn/ui based)
export * from "./components/ui/button"
export * from "./components/ui/calendar"
export * from "./components/ui/card"
export * from "./components/ui/input"
export * from "./components/ui/label"
export * from "./components/ui/badge"
export * from "./components/ui/header"
export * from "./components/ui/select"
export * from "./components/ui/circular-progress"
export * from "./components/ui/calendar-modal"
export * from "./components/ui/animated-counter"

// Schengen-specific components
export * from "./components/schengen-calendar"
export * from "./components/trip-card"

// Revenue-generating components (CRITICAL for monetization)
export * from "./components/subscription-gate"
export * from "./components/payment-modal" 
export * from "./components/pricing-cards"

// Re-export calculator types and utilities for convenience
export type { 
  Trip, 
  DateRange, 
  ValidationResult, 
  ConflictDetail, 
  OverlapPreventionConfig 
} from "@schengen/calculator"