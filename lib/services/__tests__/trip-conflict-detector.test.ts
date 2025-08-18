import { TripConflictDetector } from "../trip-conflict-detector"
import type { Trip } from "@/lib/types/enhanced-calculator"
import { addDays, subDays } from "date-fns"

describe("TripConflictDetector", () => {
  const createTrip = (
    id: string,
    country: string,
    startOffset: number,
    duration: number
  ): Trip => {
    const startDate = addDays(new Date("2024-01-01"), startOffset)
    const endDate = addDays(startDate, duration - 1)
    return {
      id,
      country,
      startDate,
      endDate,
      days: duration,
    }
  }

  describe("Date Order Conflicts", () => {
    it("should detect when end date is before start date", () => {
      const trips: Trip[] = [
        {
          id: "1",
          country: "France",
          startDate: new Date("2024-03-15"),
          endDate: new Date("2024-03-10"),
          days: 5,
        },
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      expect(result.hasErrors).toBe(true)
      expect(result.conflicts).toHaveLength(1)
      expect(result.conflicts[0].type).toBe("INVALID_DATE_ORDER")
      expect(result.conflicts[0].severity).toBe("ERROR")
    })
  })

  describe("Overlapping Trips", () => {
    it("should detect fully overlapping trips", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 10),
        createTrip("2", "Germany", 12, 5),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      expect(result.hasErrors).toBe(true)
      const overlap = result.conflicts.find(c => c.type === "OVERLAPPING_TRIPS")
      expect(overlap).toBeDefined()
      expect(overlap?.severity).toBe("ERROR")
      expect(overlap?.tripIds).toContain("1")
      expect(overlap?.tripIds).toContain("2")
    })

    it("should detect partially overlapping trips", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 10),
        createTrip("2", "Germany", 18, 5),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const overlap = result.conflicts.find(c => c.type === "OVERLAPPING_TRIPS")
      expect(overlap).toBeDefined()
      expect(overlap?.severity).toBe("ERROR")
    })

    it("should not detect non-overlapping trips", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 10),
        createTrip("2", "Germany", 21, 5),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const overlap = result.conflicts.find(c => c.type === "OVERLAPPING_TRIPS")
      expect(overlap).toBeUndefined()
    })
  })

  describe("Insufficient Gap Warnings", () => {
    it("should warn about trips with less than 3 days gap", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 10),
        createTrip("2", "Germany", 21, 5),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const gapWarning = result.conflicts.find(c => c.type === "INSUFFICIENT_GAP")
      expect(gapWarning).toBeDefined()
      expect(gapWarning?.severity).toBe("WARNING")
    })

    it("should not warn about trips with sufficient gap", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 10),
        createTrip("2", "Germany", 25, 5),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const gapWarning = result.conflicts.find(c => c.type === "INSUFFICIENT_GAP")
      expect(gapWarning).toBeUndefined()
    })
  })

  describe("90-Day Single Trip Violations", () => {
    it("should detect single trip exceeding 90 days", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 95),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      expect(result.hasErrors).toBe(true)
      const violation = result.conflicts.find(c => 
        c.type === "CONSECUTIVE_STAY_VIOLATION" && c.tripIds.length === 1
      )
      expect(violation).toBeDefined()
      expect(violation?.severity).toBe("ERROR")
      expect(violation?.message).toContain("exceeds 90-day limit")
    })

    it("should not flag trip exactly 90 days", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 10, 90),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => 
        c.type === "CONSECUTIVE_STAY_VIOLATION" && c.tripIds.length === 1
      )
      expect(violation).toBeUndefined()
    })
  })

  describe("180-Day Period Violations", () => {
    it("should detect exceeding 90 days in 180-day period", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 50),
        createTrip("2", "Germany", 60, 30),
        createTrip("3", "Spain", 100, 20),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => c.type === "EXCEEDS_180_DAY_PERIOD")
      expect(violation).toBeDefined()
      expect(violation?.severity).toBe("ERROR")
      expect(violation?.details).toContain("100 days")
    })

    it("should calculate correctly with trips spanning period boundary", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 45),
        createTrip("2", "Germany", 150, 45),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => c.type === "EXCEEDS_180_DAY_PERIOD")
      expect(violation).toBeUndefined()
    })

    it("should handle exactly 90 days in period", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 30),
        createTrip("2", "Germany", 40, 30),
        createTrip("3", "Spain", 80, 30),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => c.type === "EXCEEDS_180_DAY_PERIOD")
      expect(violation).toBeUndefined()
    })
  })

  describe("Consecutive Stay Violations", () => {
    it("should detect consecutive trips exceeding 90 days", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 50),
        createTrip("2", "Germany", 50, 50),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => 
        c.type === "CONSECUTIVE_STAY_VIOLATION" && c.tripIds.length > 1
      )
      expect(violation).toBeDefined()
      expect(violation?.severity).toBe("ERROR")
      expect(violation?.details).toContain("100 consecutive days")
    })

    it("should not flag non-consecutive trips", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 50),
        createTrip("2", "Germany", 55, 40),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => 
        c.type === "CONSECUTIVE_STAY_VIOLATION" && c.tripIds.length > 1
      )
      expect(violation).toBeUndefined()
    })

    it("should consider 1-day gap as consecutive", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 50),
        createTrip("2", "Germany", 51, 45),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => 
        c.type === "CONSECUTIVE_STAY_VIOLATION" && c.tripIds.length > 1
      )
      expect(violation).toBeDefined()
      expect(violation?.details).toContain("96 consecutive days")
    })
  })

  describe("Future Violation Risks", () => {
    it("should warn about high risk future trips", () => {
      const today = new Date("2024-03-01")
      const trips: Trip[] = [
        {
          id: "1",
          country: "France",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-02-15"),
          days: 46,
        },
        {
          id: "2",
          country: "Germany",
          startDate: new Date("2024-04-01"),
          endDate: new Date("2024-05-15"),
          days: 45,
        },
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const warning = result.conflicts.find(c => c.type === "FUTURE_VIOLATION_RISK")
      expect(warning).toBeDefined()
    })

    it("should detect definite future violations", () => {
      const trips: Trip[] = [
        {
          id: "1",
          country: "France",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-02-28"),
          days: 59,
        },
        {
          id: "2",
          country: "Germany",
          startDate: new Date("2024-04-01"),
          endDate: new Date("2024-05-15"),
          days: 45,
        },
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      const violation = result.conflicts.find(c => 
        c.type === "FUTURE_VIOLATION_RISK" && c.severity === "ERROR"
      )
      expect(violation).toBeDefined()
      expect(violation?.details).toContain("Will exceed 90-day limit")
    })
  })

  describe("Complex Scenarios", () => {
    it("should handle multiple different conflicts", () => {
      const trips: Trip[] = [
        createTrip("1", "France", 0, 50),
        createTrip("2", "Germany", 48, 45),
        createTrip("3", "Spain", 100, 30),
        {
          id: "4",
          country: "Italy",
          startDate: new Date("2024-06-01"),
          endDate: new Date("2024-05-15"),
          days: 15,
        },
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      expect(result.hasErrors).toBe(true)
      expect(result.hasWarnings).toBe(true)
      
      const dateOrderError = result.conflicts.find(c => c.type === "INVALID_DATE_ORDER")
      const overlapError = result.conflicts.find(c => c.type === "OVERLAPPING_TRIPS")
      const periodViolation = result.conflicts.find(c => c.type === "EXCEEDS_180_DAY_PERIOD")
      
      expect(dateOrderError).toBeDefined()
      expect(overlapError).toBeDefined()
      expect(periodViolation).toBeDefined()
    })

    it("should handle empty trip list", () => {
      const result = TripConflictDetector.detectAllConflicts([])
      
      expect(result.hasConflicts).toBe(false)
      expect(result.hasErrors).toBe(false)
      expect(result.hasWarnings).toBe(false)
      expect(result.conflicts).toHaveLength(0)
    })

    it("should handle trips with null dates", () => {
      const trips: Trip[] = [
        {
          id: "1",
          country: "France",
          startDate: null,
          endDate: null,
          days: 0,
        },
        createTrip("2", "Germany", 10, 10),
      ]

      const result = TripConflictDetector.detectAllConflicts(trips)
      
      expect(result.conflicts.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe("Conflict Summary", () => {
    it("should generate correct summary for no conflicts", () => {
      const result = {
        hasConflicts: false,
        hasErrors: false,
        hasWarnings: false,
        conflicts: [],
        totalConflicts: 0,
      }

      const summary = TripConflictDetector.getConflictSummary(result)
      expect(summary).toContain("No conflicts detected")
      expect(summary).toContain("✅")
    })

    it("should generate correct summary for errors and warnings", () => {
      const result = {
        hasConflicts: true,
        hasErrors: true,
        hasWarnings: true,
        conflicts: [
          { type: "OVERLAPPING_TRIPS" as const, severity: "ERROR" as const, tripIds: [], message: "", details: "" },
          { type: "OVERLAPPING_TRIPS" as const, severity: "ERROR" as const, tripIds: [], message: "", details: "" },
          { type: "INSUFFICIENT_GAP" as const, severity: "WARNING" as const, tripIds: [], message: "", details: "" },
        ],
        totalConflicts: 3,
      }

      const summary = TripConflictDetector.getConflictSummary(result)
      expect(summary).toContain("2 errors")
      expect(summary).toContain("1 warning")
      expect(summary).toContain("⚠️")
    })
  })
})