// Types-only export file (no CSS imports)

// Core utilities (no CSS)
export * from "./lib/utils"

// Hooks
export * from "./hooks/useMediaQuery"
export * from "./hooks/useFeatureAccess"

// Shared types
export * from "./types/calendar"

// UI Components (shadcn/ui based)
export * from "./components/ui/button"
export * from "./components/ui/calendar"
export * from "./components/ui/card"
export * from "./components/ui/input"
export * from "./components/ui/label"
export * from "./components/ui/badge"
export * from "./components/ui/header"
export * from "./components/ui/login-modal"
export * from "./components/ui/feature-button"
export * from "./components/ui/account-creation-modal"
export * from "./components/ui/premium-upgrade-modal"
export * from "./components/ui/circular-progress"

// Calendar modal with specific exports (CalendarDateRange only, OccupiedDateInfo comes from validator)
export type { CalendarDateRange, CalendarModalProps } from "./components/ui/calendar-modal"
export { CalendarModal } from "./components/ui/calendar-modal"

// Mobile calendar drawer
export type { MobileCalendarDrawerProps } from "./components/ui/mobile-calendar-drawer"
export { MobileCalendarDrawer } from "./components/ui/mobile-calendar-drawer"

// Social media links
export * from "./components/ui/social-media-links"

// Footer
export * from "./components/ui/footer"

// Accuracy verification badge
export * from "./components/ui/accuracy-verification-badge"

// Rolling calendar view
export * from "./components/ui/rolling-calendar-view"

// Future trip validator
export * from "./components/ui/future-trip-validator"

// Date overlap prevention system (exports DateOverlapValidator and OccupiedDateInfo)
export * from "./validators/date-overlap-validator"

// Re-export calculator types and utilities for convenience
export type { 
  Trip, 
  DateRange, 
  ValidationResult, 
  ConflictDetail, 
  OverlapPreventionConfig 
} from "@schengen/calculator"