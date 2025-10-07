// Styles (must be imported first)
import "./styles.css"

// Core utilities
export * from "./lib/utils"

// Hooks
export * from "./hooks/useMediaQuery"
export * from "./hooks/useFeatureAccess"
export * from "./hooks/useConversionAnalytics"

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
export * from "./components/ui/calendar-modal"
export * from "./components/ui/mobile-calendar-drawer"
export * from "./components/ui/social-media-links"
export * from "./components/ui/footer"
export * from "./components/ui/accuracy-verification-badge"
export * from "./components/ui/rolling-calendar-view"
export * from "./components/ui/future-trip-validator"
export type { CalendarDateRange } from "./components/ui/calendar-modal"

// Date overlap prevention system
export * from "./validators/date-overlap-validator"
export type {
  ValidationResult,
  OccupiedDateInfo,
  TripEntry,
  UseDateOverlapPreventionProps,
  UseDateOverlapPreventionReturn
} from "./validators/date-overlap-validator"

// Phase control components
export * from "./components/PhaseGate"
export * from "./components/PhaseAwareNavigation"
export * from "./hooks/useFeaturePhase"