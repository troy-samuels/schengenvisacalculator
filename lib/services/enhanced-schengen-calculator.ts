import { differenceInDays, subDays, addDays, isAfter, isBefore, startOfDay, format, isWeekend } from "date-fns"
import type {
  Trip,
  ComplianceResult,
  RiskAssessment,
  RiskFactor,
  TravelForecastResult,
  MaximumStayResult,
  OptimalDateOption,
  ScenarioTestResult,
  EmergencyExtensionResult,
  EmergencyAlternative,
  TravelStatistics,
  CalendarEvent,
  ExportMetadata,
  ValidationError,
  SingleEntryComplianceResult,
  TripDetail,
  FutureComplianceWarning,
  ViolatingTrip,
  ExitPeriod,
} from "@/lib/types/enhanced-calculator"

/**
 * Enhanced Schengen Calculator Service
 * Provides advanced visa compliance calculations with risk assessment and forecasting
 */
export class EnhancedSchengenCalculator {
  private static readonly MAX_DAYS_IN_PERIOD = 90
  private static readonly ROLLING_PERIOD_DAYS = 180
  private static readonly MAX_CONSECUTIVE_DAYS = 90

  /**
   * Calculate comprehensive compliance for all trips
   */
  static calculateCompliance(trips: Trip[], referenceDate: Date = new Date()): ComplianceResult {
    const validTrips = this.validateAndFilterTrips(trips)
    const normalizedRefDate = startOfDay(referenceDate)

    // Calculate days used in the last 180 days
    const daysUsed = this.calculateDaysInPeriod(validTrips, normalizedRefDate)

    // Basic compliance metrics
    const daysRemaining = Math.max(0, this.MAX_DAYS_IN_PERIOD - daysUsed)
    const isCompliant = daysUsed <= this.MAX_DAYS_IN_PERIOD
    const overstayDays = Math.max(0, daysUsed - this.MAX_DAYS_IN_PERIOD)

    // Advanced risk assessment
    const riskAssessment = this.assessRisk(validTrips, daysUsed, normalizedRefDate)

    // Calculate next reset date
    const nextResetDate = this.calculateNextResetDate(validTrips, normalizedRefDate)

    // Generate recommendations
    const recommendations = this.generateRecommendations(riskAssessment, daysRemaining, isCompliant)

    // Generate compliance history
    const complianceHistory = this.generateComplianceHistory(validTrips, normalizedRefDate)

    // Check for future warnings
    const futureWarnings = this.checkFutureCompliance(trips, normalizedRefDate)

    return {
      totalDaysUsed: daysUsed,
      daysRemaining,
      isCompliant,
      overstayDays,
      riskAssessment,
      nextResetDate,
      recommendations,
      complianceHistory,
      futureWarnings,
    }
  }

  /**
   * Calculate single entry compliance
   */
  static calculateSingleEntryCompliance(trip: Trip, referenceDate: Date = new Date()): SingleEntryComplianceResult {
    if (!trip.startDate || !trip.endDate) {
      return {
        daysUsed: 0,
        isWithinLimit: true,
        contributesToViolation: false,
        details: [],
      }
    }

    const normalizedRefDate = startOfDay(referenceDate)
    const periodStart = subDays(normalizedRefDate, this.ROLLING_PERIOD_DAYS - 1)

    const tripStart = startOfDay(trip.startDate)
    const tripEnd = startOfDay(trip.endDate)

    // Calculate overlap with the 180-day period
    const overlapStart = isAfter(tripStart, periodStart) ? tripStart : periodStart
    const overlapEnd = isBefore(tripEnd, normalizedRefDate) ? tripEnd : normalizedRefDate

    let daysUsed = 0
    const details: TripDetail[] = []

    if (overlapStart <= overlapEnd) {
      daysUsed = differenceInDays(overlapEnd, overlapStart) + 1

      // Generate daily details
      let currentDate = overlapStart
      while (currentDate <= overlapEnd) {
        details.push({
          date: currentDate,
          daysUsedOnDate: 1,
          isViolation: false, // Will be calculated in context
          tripId: trip.id,
        })
        currentDate = addDays(currentDate, 1)
      }
    }

    return {
      daysUsed,
      isWithinLimit: daysUsed <= this.MAX_DAYS_IN_PERIOD,
      contributesToViolation: daysUsed > this.MAX_DAYS_IN_PERIOD,
      details,
    }
  }

  /**
   * Calculate days used within the 180-day rolling period
   */
  private static calculateDaysInPeriod(trips: Trip[], referenceDate: Date): number {
    const periodStart = subDays(referenceDate, this.ROLLING_PERIOD_DAYS - 1)
    let totalDays = 0

    for (const trip of trips) {
      if (!trip.startDate || !trip.endDate) continue

      const tripStart = startOfDay(trip.startDate)
      const tripEnd = startOfDay(trip.endDate)

      // Calculate overlap with the 180-day period
      const overlapStart = isAfter(tripStart, periodStart) ? tripStart : periodStart
      const overlapEnd = isBefore(tripEnd, referenceDate) ? tripEnd : referenceDate

      if (overlapStart <= overlapEnd) {
        let tripDays = differenceInDays(overlapEnd, overlapStart) + 1

        // Subtract exit periods if they exist
        if (trip.exitPeriods) {
          for (const exitPeriod of trip.exitPeriods) {
            const exitStart = isAfter(exitPeriod.exitDate, overlapStart) ? exitPeriod.exitDate : overlapStart
            const exitEnd = isBefore(exitPeriod.reentryDate, overlapEnd) ? exitPeriod.reentryDate : overlapEnd

            if (exitStart <= exitEnd) {
              tripDays -= differenceInDays(exitEnd, exitStart)
            }
          }
        }

        totalDays += Math.max(0, tripDays)
      }
    }

    return totalDays
  }

  /**
   * Assess risk factors for visa compliance
   */
  private static assessRisk(trips: Trip[], daysUsed: number, referenceDate: Date): RiskAssessment {
    const riskFactors: RiskFactor[] = []
    let overallRisk = 0

    // Calculate utilization rate
    const utilizationRate = (daysUsed / this.MAX_DAYS_IN_PERIOD) * 100

    // Risk Factor 1: High usage percentage
    if (utilizationRate > 85) {
      riskFactors.push({
        type: "USAGE_HIGH",
        severity: "HIGH",
        description: `Using ${utilizationRate.toFixed(1)}% of allowed days`,
        impact: 35,
        suggestion: "Consider taking a break from Schengen travel",
      })
      overallRisk += 35
    } else if (utilizationRate > 70) {
      riskFactors.push({
        type: "USAGE_HIGH",
        severity: "MEDIUM",
        description: `Using ${utilizationRate.toFixed(1)}% of allowed days`,
        impact: 20,
        suggestion: "Plan future trips with more spacing",
      })
      overallRisk += 20
    }

    // Risk Factor 2: Frequent travel pattern
    const recentTrips = trips.filter((trip) => {
      if (!trip.endDate) return false
      return differenceInDays(referenceDate, trip.endDate) <= 90
    })

    if (recentTrips.length >= 4) {
      riskFactors.push({
        type: "PATTERN_FREQUENT",
        severity: "HIGH",
        description: `${recentTrips.length} trips in the last 90 days`,
        impact: 25,
        suggestion: "Reduce travel frequency to avoid scrutiny",
      })
      overallRisk += 25
    } else if (recentTrips.length >= 3) {
      riskFactors.push({
        type: "PATTERN_FREQUENT",
        severity: "MEDIUM",
        description: `${recentTrips.length} trips in the last 90 days`,
        impact: 15,
        suggestion: "Monitor travel frequency",
      })
      overallRisk += 15
    }

    // Risk Factor 3: Low buffer days
    const daysRemaining = this.MAX_DAYS_IN_PERIOD - daysUsed
    if (daysRemaining < 5 && daysRemaining > 0) {
      riskFactors.push({
        type: "BUFFER_LOW",
        severity: "HIGH",
        description: `Only ${daysRemaining} days remaining`,
        impact: 30,
        suggestion: "Avoid any additional travel until reset",
      })
      overallRisk += 30
    } else if (daysRemaining < 15 && daysRemaining > 0) {
      riskFactors.push({
        type: "BUFFER_LOW",
        severity: "MEDIUM",
        description: `Only ${daysRemaining} days remaining`,
        impact: 20,
        suggestion: "Plan very carefully for remaining days",
      })
      overallRisk += 20
    }

    // Risk Factor 4: Long consecutive stays
    const longestStay = Math.max(...trips.map((trip) => trip.days))
    if (longestStay > 60) {
      riskFactors.push({
        type: "CONSECUTIVE_LONG",
        severity: "MEDIUM",
        description: `Longest stay: ${longestStay} days`,
        impact: 15,
        suggestion: "Consider shorter, more distributed trips",
      })
      overallRisk += 15
    }

    // Determine risk level
    let riskLevel: RiskAssessment["riskLevel"] = "MINIMAL"
    if (overallRisk >= 80) riskLevel = "CRITICAL"
    else if (overallRisk >= 60) riskLevel = "HIGH"
    else if (overallRisk >= 35) riskLevel = "MODERATE"
    else if (overallRisk >= 15) riskLevel = "LOW"

    // Calculate confidence score
    const confidenceScore = Math.max(0, 100 - overallRisk * 0.5)

    const recommendations = this.generateRiskRecommendations(riskFactors, daysUsed)

    return {
      overallRisk: Math.min(100, overallRisk),
      riskLevel,
      riskFactors,
      recommendations,
      confidenceScore,
      utilizationRate,
    }
  }

  /**
   * Check future compliance violations
   */
  private static checkFutureCompliance(trips: Trip[], referenceDate: Date): FutureComplianceWarning[] {
    const warnings: FutureComplianceWarning[] = []
    const futureTrips = trips
      .filter((trip) => trip.startDate && isAfter(trip.startDate, referenceDate))
      .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime())

    // Check compliance at each future trip start date
    for (const futureTrip of futureTrips) {
      if (!futureTrip.startDate || !futureTrip.endDate) continue

      const compliance = this.calculateCompliance(trips, futureTrip.endDate)

      if (!compliance.isCompliant) {
        const violatingTrips: ViolatingTrip[] = [
          {
            tripId: futureTrip.id,
            country: futureTrip.country,
            startDate: futureTrip.startDate,
            endDate: futureTrip.endDate,
            overstayDays: compliance.overstayDays,
          },
        ]

        warnings.push({
          date: futureTrip.startDate,
          violatingTrips,
          totalOverstay: compliance.overstayDays,
          severity: compliance.overstayDays > 10 ? "CRITICAL" : "WARNING",
          recommendation: `Consider shortening this trip by ${compliance.overstayDays} days or rescheduling`,
        })
      }
    }

    return warnings
  }

  /**
   * Generate risk-based recommendations
   */
  private static generateRiskRecommendations(riskFactors: RiskFactor[], daysUsed: number): string[] {
    const recommendations: string[] = []

    riskFactors.forEach((factor) => {
      recommendations.push(factor.suggestion)
    })

    if (daysUsed > 90) {
      recommendations.push("⚠️ Seek immediate legal consultation - you have exceeded the limit")
    }

    // Add general recommendations
    recommendations.push("Keep detailed records of all travels")
    recommendations.push("Carry proof of accommodation and return tickets")

    return [...new Set(recommendations)] // Remove duplicates
  }

  /**
   * Calculate when the oldest days will "roll off" the 180-day period
   */
  private static calculateNextResetDate(trips: Trip[], referenceDate: Date): Date | null {
    if (trips.length === 0) return null

    const periodStart = subDays(referenceDate, this.ROLLING_PERIOD_DAYS - 1)
    const relevantTrips = trips.filter((trip) => {
      if (!trip.endDate) return false
      return trip.endDate >= periodStart
    })

    if (relevantTrips.length === 0) return null

    // Find the earliest trip that affects the current period
    const earliestTrip = relevantTrips.reduce((earliest, trip) => {
      if (!trip.startDate || !earliest.startDate) return trip
      return trip.startDate < earliest.startDate ? trip : earliest
    })

    if (!earliestTrip.startDate) return null

    return addDays(earliestTrip.startDate, this.ROLLING_PERIOD_DAYS)
  }

  /**
   * Generate general recommendations
   */
  private static generateRecommendations(
    riskAssessment: RiskAssessment,
    daysRemaining: number,
    isCompliant: boolean,
  ): string[] {
    const recommendations: string[] = []

    if (!isCompliant) {
      recommendations.push("⚠️ You have exceeded the 90-day limit - seek legal advice immediately")
      recommendations.push("Document all your travels with official stamps and receipts")
      return recommendations
    }

    switch (riskAssessment.riskLevel) {
      case "CRITICAL":
        recommendations.push("🚨 Critical risk - avoid all Schengen travel until significant reset")
        recommendations.push("Consider consulting with an immigration lawyer")
        break
      case "HIGH":
        recommendations.push("⚠️ High risk - take a break from Schengen travel")
        recommendations.push("Plan future trips with 6+ month gaps")
        break
      case "MODERATE":
        recommendations.push("⚡ Moderate risk - plan carefully")
        recommendations.push("Space out future trips by at least 3 months")
        break
      case "LOW":
        recommendations.push("✅ Low risk - continue monitoring")
        break
      case "MINIMAL":
        recommendations.push("🎉 Great compliance - you have good flexibility")
        break
    }

    if (daysRemaining < 30) {
      recommendations.push("Plan remaining days very carefully")
    }

    return recommendations
  }

  /**
   * Forecast travel possibilities for a future trip
   */
  static forecastTravel(existingTrips: Trip[], plannedStartDate: Date, plannedDuration: number): TravelForecastResult {
    const plannedEndDate = addDays(plannedStartDate, plannedDuration - 1)

    // Create a test trip
    const testTrip: Trip = {
      id: "forecast-test",
      country: "TEST",
      startDate: plannedStartDate,
      endDate: plannedEndDate,
      days: plannedDuration,
    }

    // Calculate compliance with the planned trip included
    const allTrips = [...existingTrips, testTrip]
    const compliance = this.calculateCompliance(allTrips, plannedEndDate)

    const canTravel = compliance.isCompliant
    const maxStayDays = canTravel ? plannedDuration : Math.max(0, compliance.daysRemaining)

    // Generate alternative start dates if the planned trip doesn't work
    const alternativeStartDates: Date[] = []
    const warnings: string[] = []

    if (!canTravel && compliance.daysRemaining > 0) {
      // Try different start dates
      for (let offset = 7; offset <= 180; offset += 14) {
        const altStartDate = addDays(plannedStartDate, offset)
        const altEndDate = addDays(altStartDate, plannedDuration - 1)
        const altTestTrip = { ...testTrip, startDate: altStartDate, endDate: altEndDate }
        const altCompliance = this.calculateCompliance([...existingTrips, altTestTrip], altEndDate)

        if (altCompliance.isCompliant) {
          alternativeStartDates.push(altStartDate)
          if (alternativeStartDates.length >= 5) break // Limit alternatives
        }
      }

      if (alternativeStartDates.length === 0) {
        warnings.push("No suitable alternative dates found within 6 months")
      }
    }

    if (compliance.riskAssessment.riskLevel === "HIGH" || compliance.riskAssessment.riskLevel === "CRITICAL") {
      warnings.push(`This trip carries ${compliance.riskAssessment.riskLevel.toLowerCase()} risk`)
    }

    return {
      canTravel,
      maxStayDays,
      suggestedStartDate: canTravel ? plannedStartDate : alternativeStartDates[0] || null,
      alternativeStartDates,
      riskProjection: compliance.riskAssessment,
      warnings,
    }
  }

  /**
   * Calculate maximum consecutive days available from a start date
   */
  static calculateMaxConsecutiveDays(trips: Trip[], startDate: Date): MaximumStayResult {
    const compliance = this.calculateCompliance(trips, startDate)
    const maxConsecutiveDays = Math.min(compliance.daysRemaining, this.MAX_CONSECUTIVE_DAYS)

    // Check if we need to wait for more days to become available
    const nextResetDate = this.calculateNextResetDate(trips, startDate)
    const requiresWaiting = compliance.daysRemaining < this.MAX_CONSECUTIVE_DAYS && nextResetDate !== null

    let explanation = `${maxConsecutiveDays} days available immediately`
    if (requiresWaiting && nextResetDate) {
      explanation += `. More days available after ${format(nextResetDate, "MMM d, yyyy")}`
    }

    return {
      maxConsecutiveDays,
      immediatelyAvailable: compliance.daysRemaining,
      requiresWaiting,
      nextAvailableDate: nextResetDate,
      explanation,
    }
  }

  /**
   * Find optimal travel dates for a given duration
   */
  static findOptimalTravelDates(
    trips: Trip[],
    desiredDays: number,
    earliestStart: Date,
    latestEnd: Date,
  ): OptimalDateOption[] {
    const options: OptimalDateOption[] = []
    let currentDate = startOfDay(earliestStart)
    const endSearchDate = startOfDay(latestEnd)

    // Iterate through possible start dates
    while (!isAfter(currentDate, endSearchDate)) {
      const maxStay = this.calculateMaxConsecutiveDays(trips, currentDate)

      if (maxStay.maxConsecutiveDays >= desiredDays) {
        const endDate = addDays(currentDate, desiredDays - 1)
        const testTrip: Trip = {
          id: "test",
          country: "XX",
          startDate: currentDate,
          endDate,
          days: desiredDays,
        }

        const compliance = this.calculateCompliance([...trips, testTrip], endDate)

        const option: OptimalDateOption = {
          startDate: currentDate,
          endDate,
          immediatelyAvailable: maxStay.immediatelyAvailable,
          totalAvailable: maxStay.maxConsecutiveDays,
          utilizationAfter: ((90 - compliance.daysRemaining) / 90) * 100,
          requiresNoBreak: maxStay.immediatelyAvailable >= desiredDays,
          score: this.calculateOptionScore(currentDate, desiredDays, maxStay, compliance),
        }

        options.push(option)
      }

      currentDate = addDays(currentDate, 1)
    }

    // Sort by score (best first)
    return options.sort((a, b) => b.score - a.score).slice(0, 10)
  }

  /**
   * Calculate option score for optimal date finding
   */
  private static calculateOptionScore(
    startDate: Date,
    desiredDays: number,
    maxStay: MaximumStayResult,
    compliance: ComplianceResult,
  ): number {
    let score = 100

    // Immediate availability bonus
    if (maxStay.immediatelyAvailable >= desiredDays) {
      score += 50
    }

    // Buffer days bonus
    const bufferDays = compliance.daysRemaining
    score += Math.min(bufferDays * 2, 40)

    // Risk level penalty
    const riskPenalties = {
      MINIMAL: 0,
      LOW: -10,
      MODERATE: -25,
      HIGH: -40,
      CRITICAL: -70,
    }
    score += riskPenalties[compliance.riskAssessment.riskLevel]

    // Weekend start bonus
    if (isWeekend(startDate)) {
      score += 5
    }

    // Proximity to requested date
    const today = new Date()
    const daysFromToday = Math.abs(differenceInDays(startDate, today))
    if (daysFromToday <= 7) {
      score += 10
    } else if (daysFromToday <= 30) {
      score += 5
    }

    return Math.max(0, score)
  }

  /**
   * Test multiple trip scenarios
   */
  static testScenarios(currentTrips: Trip[], scenarios: Array<Array<Omit<Trip, "id">>>): ScenarioTestResult[] {
    const results: ScenarioTestResult[] = []

    scenarios.forEach((scenario, index) => {
      try {
        // Create test trips with IDs
        const testTrips: Trip[] = scenario.map((tripData, i) => ({
          ...tripData,
          id: `scenario-${index}-trip-${i}`,
          days:
            tripData.startDate && tripData.endDate ? this.calculateTripDays(tripData.startDate, tripData.endDate) : 0,
        }))

        // Validate all trips
        const validationErrors = testTrips.flatMap((trip) => this.validateTrip(trip))
        if (validationErrors.length > 0) {
          results.push({
            scenarioIndex: index,
            error: validationErrors[0].message,
            isValid: false,
          })
          return
        }

        // Test compliance at multiple checkpoints
        const allTrips = [...currentTrips, ...testTrips]
        const checkpoints = this.generateScenarioCheckpoints(testTrips)

        const complianceResults = checkpoints.map((date) => ({
          date,
          compliance: this.calculateCompliance(allTrips, date),
        }))

        const violations = complianceResults.filter((r) => !r.compliance.isCompliant)
        const maxUtilization = Math.max(...complianceResults.map((r) => r.compliance.totalDaysUsed))

        results.push({
          scenarioIndex: index,
          trips: scenario,
          isValid: true,
          isViable: violations.length === 0,
          violations,
          maxUtilization,
          maxUtilizationRate: (maxUtilization / 90) * 100,
          totalPlannedDays: testTrips.reduce((sum, trip) => sum + trip.days, 0),
          recommendation: this.generateScenarioRecommendation(complianceResults, testTrips),
        })
      } catch (error) {
        results.push({
          scenarioIndex: index,
          error: error instanceof Error ? error.message : "Unknown error",
          isValid: false,
        })
      }
    })

    return results
  }

  /**
   * Generate scenario checkpoints for testing
   */
  private static generateScenarioCheckpoints(trips: Trip[]): Date[] {
    const checkpoints = new Set<string>()
    const today = startOfDay(new Date())

    trips.forEach((trip) => {
      if (trip.startDate) {
        checkpoints.add(trip.startDate.toISOString())

        // Add midpoint
        if (trip.endDate) {
          const midpoint = new Date(trip.startDate.getTime() + (trip.endDate.getTime() - trip.startDate.getTime()) / 2)
          checkpoints.add(startOfDay(midpoint).toISOString())
          checkpoints.add(trip.endDate.toISOString())
        }
      }
    })

    // Add today
    checkpoints.add(today.toISOString())

    // Add 30 days after last trip
    const lastTripEnd = trips
      .filter((t) => t.endDate)
      .map((t) => t.endDate!)
      .sort((a, b) => b.getTime() - a.getTime())[0]

    if (lastTripEnd) {
      checkpoints.add(addDays(lastTripEnd, 30).toISOString())
    }

    return Array.from(checkpoints)
      .map((d) => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime())
  }

  /**
   * Generate scenario recommendation
   */
  private static generateScenarioRecommendation(
    complianceResults: Array<{ date: Date; compliance: ComplianceResult }>,
    trips: Trip[],
  ): string {
    const violations = complianceResults.filter((r) => !r.compliance.isCompliant)

    if (violations.length === 0) {
      const avgUtilization =
        complianceResults.reduce((sum, r) => sum + r.compliance.riskAssessment.utilizationRate, 0) /
        complianceResults.length

      if (avgUtilization < 50) {
        return "Excellent plan with plenty of flexibility"
      } else if (avgUtilization < 70) {
        return "Good plan with reasonable buffer"
      } else if (avgUtilization < 85) {
        return "Viable but consider maintaining more buffer days"
      } else {
        return "High utilization - limited flexibility for changes"
      }
    } else {
      const firstViolation = violations[0]
      return `Plan exceeds limit by ${firstViolation.compliance.overstayDays} days on ${format(firstViolation.date, "MMM d, yyyy")}`
    }
  }

  /**
   * Calculate emergency extension possibilities
   */
  static calculateEmergencyExtension(
    trips: Trip[],
    currentTripId: string,
    additionalDays: number,
  ): EmergencyExtensionResult | null {
    const tripIndex = trips.findIndex((t) => t.id === currentTripId)
    if (tripIndex === -1) return null

    const trip = trips[tripIndex]
    if (!trip.endDate) return null

    const newEndDate = addDays(trip.endDate, additionalDays)

    // Test with extended trip
    const testTrips = [...trips]
    testTrips[tripIndex] = {
      ...trip,
      endDate: newEndDate,
      days: trip.startDate ? this.calculateTripDays(trip.startDate, newEndDate) : 0,
    }

    const compliance = this.calculateCompliance(testTrips, newEndDate)

    // Generate alternatives
    const alternatives = this.generateEmergencyAlternatives(trips, currentTripId, additionalDays, compliance)

    return {
      isPossible: compliance.isCompliant,
      newEndDate,
      originalEndDate: trip.endDate,
      additionalDays,
      totalDaysAfterExtension: compliance.totalDaysUsed,
      overstayRisk: compliance.overstayDays,
      daysAvailableForExtension: Math.min(additionalDays, compliance.daysRemaining),
      alternatives,
    }
  }

  /**
   * Generate emergency alternatives
   */
  private static generateEmergencyAlternatives(
    trips: Trip[],
    currentTripId: string,
    additionalDays: number,
    currentCompliance: ComplianceResult,
  ): EmergencyAlternative[] {
    const alternatives: EmergencyAlternative[] = []

    // Alternative 1: Split the trip
    alternatives.push({
      type: "SPLIT_TRIP",
      description: "Leave Schengen area for a few days mid-trip",
      viability: additionalDays > 3,
      adjustments: [],
    })

    // Alternative 2: Reduce other future trips
    const futureTrips = trips.filter((t) => t.id !== currentTripId && t.startDate && isAfter(t.startDate, new Date()))

    if (futureTrips.length > 0 && currentCompliance.overstayDays > 0) {
      const adjustments = futureTrips.map((trip) => ({
        tripId: trip.id,
        originalEndDate: trip.endDate!,
        newEndDate: addDays(trip.endDate!, -Math.ceil(currentCompliance.overstayDays / futureTrips.length)),
        daysSaved: Math.ceil(currentCompliance.overstayDays / futureTrips.length),
      }))

      alternatives.push({
        type: "REDUCE_OTHER",
        description: "Shorten future trips to accommodate extension",
        viability: true,
        adjustments,
      })
    }

    // Alternative 3: Delay future trips
    if (futureTrips.length > 0) {
      alternatives.push({
        type: "DELAY_FUTURE",
        description: "Postpone future trips to create more buffer",
        viability: true,
        adjustments: [],
      })
    }

    return alternatives
  }

  /**
   * Get travel statistics
   */
  static getTravelStatistics(trips: Trip[]): TravelStatistics {
    const validTrips = trips.filter((t) => t.days > 0)

    if (validTrips.length === 0) {
      return {
        totalTrips: 0,
        totalDaysPlanned: 0,
        averageTripLength: 0,
        longestTrip: null,
        shortestTrip: null,
      }
    }

    const tripDays = validTrips.map((t) => t.days)
    const totalDays = tripDays.reduce((sum, days) => sum + days, 0)

    return {
      totalTrips: validTrips.length,
      totalDaysPlanned: totalDays,
      averageTripLength: Math.round(totalDays / validTrips.length),
      longestTrip: Math.max(...tripDays),
      shortestTrip: Math.min(...tripDays),
    }
  }

  /**
   * Generate calendar events for integration
   */
  static generateCalendarEvents(trips: Trip[]): CalendarEvent[] {
    const events: CalendarEvent[] = []

    // Add trip events
    trips.forEach((trip) => {
      if (trip.startDate && trip.endDate) {
        events.push({
          type: "TRIP",
          title: `Schengen: ${trip.country} (${trip.days} days)`,
          start: trip.startDate,
          end: trip.endDate,
          allDay: true,
        })
      }
    })

    // Add warning events
    const today = new Date()
    const compliance = this.calculateCompliance(trips, today)

    if (compliance.riskAssessment.riskLevel === "HIGH" || compliance.riskAssessment.riskLevel === "CRITICAL") {
      events.push({
        type: "WARNING",
        title: `Schengen Risk: ${compliance.riskAssessment.riskLevel}`,
        date: today,
        allDay: true,
        severity: "high",
      })
    }

    // Add reset date event
    if (compliance.nextResetDate) {
      events.push({
        type: "WARNING",
        title: "Schengen days start resetting",
        date: compliance.nextResetDate,
        allDay: true,
        severity: "low",
      })
    }

    return events
  }

  /**
   * Export trip data in various formats
   */
  static exportData(trips: Trip[], format: "json" | "csv" | "ical"): string {
    switch (format) {
      case "json":
        return JSON.stringify(
          {
            trips: trips.map((t) => ({
              ...t,
              startDate: t.startDate?.toISOString(),
              endDate: t.endDate?.toISOString(),
            })),
            metadata: {
              exportDate: new Date().toISOString(),
              version: "2.0.0",
              statistics: this.getTravelStatistics(trips),
            } as ExportMetadata,
          },
          null,
          2,
        )

      case "csv":
        const headers = ["ID", "Country", "Start Date", "End Date", "Days"]
        const rows = trips.map((trip) => [
          trip.id,
          trip.country,
          trip.startDate ? format(trip.startDate, "yyyy-MM-dd") : "",
          trip.endDate ? format(trip.endDate, "yyyy-MM-dd") : "",
          trip.days.toString(),
        ])
        return [headers, ...rows].map((row) => row.join(",")).join("\n")

      case "ical":
        let ical = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Schengen Calculator//EN\n"

        trips.forEach((trip) => {
          if (trip.startDate && trip.endDate) {
            ical += "BEGIN:VEVENT\n"
            ical += `UID:${trip.id}@schengen-calculator\n`
            ical += `DTSTART:${format(trip.startDate, "yyyyMMdd")}\n`
            ical += `DTEND:${format(addDays(trip.endDate, 1), "yyyyMMdd")}\n`
            ical += `SUMMARY:Schengen: ${trip.country} (${trip.days} days)\n`
            ical += "END:VEVENT\n"
          }
        })

        ical += "END:VCALENDAR"
        return ical

      default:
        throw new Error("Unsupported export format")
    }
  }

  /**
   * Add exit periods to a trip (for non-Schengen exits)
   */
  static addTripExits(
    trips: Trip[],
    tripId: string,
    exitPeriods: Array<{ exitDate: Date; reentryDate: Date }>,
  ): Trip[] {
    const tripIndex = trips.findIndex((t) => t.id === tripId)
    if (tripIndex === -1) throw new Error("Trip not found")

    const trip = trips[tripIndex]
    if (!trip.startDate || !trip.endDate) {
      throw new Error("Trip must have start and end dates")
    }

    // Validate exit periods
    const validatedExits: ExitPeriod[] = exitPeriods.map((period) => {
      if (isAfter(period.exitDate, period.reentryDate)) {
        throw new Error("Exit date must be before reentry date")
      }

      if (isBefore(period.exitDate, trip.startDate!) || isAfter(period.reentryDate, trip.endDate!)) {
        throw new Error("Exit periods must be within trip dates")
      }

      return {
        exitDate: startOfDay(period.exitDate),
        reentryDate: startOfDay(period.reentryDate),
      }
    })

    // Check for overlaps
    validatedExits.sort((a, b) => a.exitDate.getTime() - b.exitDate.getTime())
    for (let i = 1; i < validatedExits.length; i++) {
      if (isBefore(validatedExits[i].exitDate, validatedExits[i - 1].reentryDate)) {
        throw new Error("Exit periods cannot overlap")
      }
    }

    // Update trip
    const updatedTrips = [...trips]
    updatedTrips[tripIndex] = {
      ...trip,
      exitPeriods: validatedExits,
      actualSchengenDays: this.calculateActualSchengenDays({
        ...trip,
        exitPeriods: validatedExits,
      }),
    }

    return updatedTrips
  }

  /**
   * Calculate actual Schengen days with exits
   */
  private static calculateActualSchengenDays(trip: Trip): number {
    if (!trip.startDate || !trip.endDate) return 0
    if (!trip.exitPeriods || trip.exitPeriods.length === 0) return trip.days

    let totalDays = trip.days

    trip.exitPeriods.forEach((period) => {
      const exitDays = differenceInDays(period.reentryDate, period.exitDate)
      totalDays -= exitDays
    })

    return Math.max(0, totalDays)
  }

  /**
   * Calculate safe travel with buffer days
   */
  static calculateSafeTravel(
    trips: Trip[],
    desiredDays: number,
    bufferDays = 5,
  ): {
    isSafe: boolean
    actualDaysAvailable: number
    recommendedMaxStay: number
    bufferExplanation: string
  } {
    const compliance = this.calculateCompliance(trips)
    const totalRequired = desiredDays + bufferDays

    return {
      isSafe: compliance.daysRemaining >= totalRequired,
      actualDaysAvailable: compliance.daysRemaining,
      recommendedMaxStay: Math.max(0, compliance.daysRemaining - bufferDays),
      bufferExplanation: `${bufferDays}-day buffer for emergencies, delays, or calculation variations`,
    }
  }

  /**
   * Validate trip data
   */
  static validateTrip(trip: Partial<Trip>): ValidationError[] {
    const errors: ValidationError[] = []

    // Basic validation
    if (!trip.country) {
      errors.push({
        field: "country",
        message: "Country is required",
        severity: "ERROR",
      })
    }

    if (!trip.startDate) {
      errors.push({
        field: "startDate",
        message: "Start date is required",
        severity: "ERROR",
      })
    }

    if (!trip.endDate) {
      errors.push({
        field: "endDate",
        message: "End date is required",
        severity: "ERROR",
      })
    }

    if (trip.startDate && trip.endDate) {
      if (trip.startDate > trip.endDate) {
        errors.push({
          field: "dates",
          message: "Start date must be before end date",
          severity: "ERROR",
        })
      }

      const duration = differenceInDays(trip.endDate, trip.startDate) + 1

      if (duration > this.MAX_CONSECUTIVE_DAYS) {
        errors.push({
          field: "duration",
          message: `Trip duration (${duration} days) exceeds maximum allowed (${this.MAX_CONSECUTIVE_DAYS} days)`,
          severity: "ERROR",
        })
      }

      if (duration < 1) {
        errors.push({
          field: "duration",
          message: "Trip must be at least 1 day long",
          severity: "ERROR",
        })
      }
    }

    // Date validation
    if (trip.startDate && trip.startDate < new Date()) {
      errors.push({
        field: "startDate",
        message: "Start date is in the past",
        severity: "WARNING",
      })
    }

    return errors
  }

  /**
   * Generate a unique trip ID
   */
  static generateTripId(): string {
    return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Calculate days between dates
   */
  static daysBetween(startDate: Date, endDate: Date): number {
    return Math.abs(differenceInDays(endDate, startDate))
  }

  /**
   * Calculate trip days (inclusive)
   */
  static calculateTripDays(startDate: Date, endDate: Date): number {
    return differenceInDays(endDate, startDate) + 1
  }

  /**
   * Generate compliance history for visualization
   */
  private static generateComplianceHistory(trips: Trip[], referenceDate: Date): any[] {
    const history: any[] = []
    const startDate = subDays(referenceDate, 365) // Look back 1 year

    // Generate monthly snapshots
    for (let date = startDate; date <= referenceDate; date = addDays(date, 30)) {
      const compliance = this.calculateCompliance(trips, date)
      history.push({
        date,
        daysUsed: compliance.totalDaysUsed,
        daysRemaining: compliance.daysRemaining,
        riskLevel: compliance.riskAssessment.riskLevel,
      })
    }

    return history
  }

  /**
   * Validate and filter trips for processing
   */
  private static validateAndFilterTrips(trips: Trip[]): Trip[] {
    return trips.filter((trip) => {
      // Basic validation
      if (!trip.startDate || !trip.endDate || !trip.country) return false
      if (trip.startDate > trip.endDate) return false

      // Only include trips that have started (for compliance calculation)
      const now = new Date()
      return trip.startDate <= now
    })
  }
}
