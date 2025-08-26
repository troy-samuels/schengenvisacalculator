// Types-only export file (no CSS imports)

// Core utilities (no CSS)
export * from "./lib/utils"

// UI Components (shadcn/ui based)
export * from "./components/ui/button"
export * from "./components/ui/calendar"
export * from "./components/ui/card"
export * from "./components/ui/input"
export * from "./components/ui/label"
export * from "./components/ui/badge"
export * from "./components/ui/header"
export * from "./components/ui/circular-progress"

// Calendar modal with specific exports (CalendarDateRange only, OccupiedDateInfo comes from validator)
export type { CalendarDateRange, CalendarModalProps } from "./components/ui/calendar-modal"
export { CalendarModal } from "./components/ui/calendar-modal"

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