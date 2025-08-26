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
export * from "./components/ui/circular-progress"
export * from "./components/ui/calendar-modal"
export type { DateRange } from "./components/ui/calendar-modal"

// Date overlap prevention system
export * from "./validators/date-overlap-validator"
export type { 
  ValidationResult, 
  OccupiedDateInfo, 
  TripEntry,
  UseDateOverlapPreventionProps,
  UseDateOverlapPreventionReturn 
} from "./validators/date-overlap-validator"