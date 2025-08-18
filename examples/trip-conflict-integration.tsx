"use client"

import React from "react"
import { useTripConflicts } from "@/lib/hooks/useTripConflicts"
import { TripConflictWarnings, ConflictSummaryBadge } from "@/components/trip-conflict-warnings"
import type { Trip } from "@/lib/types/enhanced-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Example integration showing how to use the trip conflict detection system
 * in a Schengen visa calculator application
 */
export function TripConflictIntegrationExample() {
  const [trips, setTrips] = React.useState<Trip[]>([
    {
      id: "1",
      country: "France",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-04-15"),
      days: 46,
    },
    {
      id: "2",
      country: "Germany",
      startDate: new Date("2024-04-14"),
      endDate: new Date("2024-05-20"),
      days: 37,
    },
    {
      id: "3",
      country: "Spain",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-06-30"),
      days: 30,
    },
  ])

  const {
    conflicts,
    hasErrors,
    hasWarnings,
    errorCount,
    warningCount,
    getSummary,
    validateTripUpdate,
    getConflictsForTrip,
  } = useTripConflicts(trips)

  const handleAddTrip = () => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      country: "Italy",
      startDate: new Date("2024-07-10"),
      endDate: new Date("2024-08-10"),
      days: 32,
    }

    const validation = validateTripUpdate(newTrip, trips)
    
    if (validation.hasErrors) {
      alert("Cannot add trip due to conflicts!")
      return
    }

    setTrips([...trips, newTrip])
  }

  const handleFixSuggestion = (conflict: any) => {
    console.log("Applying fix for conflict:", conflict)
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trip Conflict Detection Example</CardTitle>
              <CardDescription>
                Demonstrates real-time conflict detection and warnings
              </CardDescription>
            </div>
            <ConflictSummaryBadge conflicts={conflicts} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Status: {getSummary()}
            </p>
            {hasErrors && (
              <span className="text-sm text-red-600 font-medium">
                {errorCount} critical issue{errorCount !== 1 ? 's' : ''} found
              </span>
            )}
            {hasWarnings && !hasErrors && (
              <span className="text-sm text-yellow-600 font-medium">
                {warningCount} warning{warningCount !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Current Trips:</h3>
            {trips.map((trip) => {
              const tripConflicts = getConflictsForTrip(trip.id)
              const hasIssues = tripConflicts.length > 0

              return (
                <div
                  key={trip.id}
                  className={`p-3 rounded-lg border ${
                    hasIssues ? "border-red-200 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{trip.country}</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.startDate?.toLocaleDateString()} - {trip.endDate?.toLocaleDateString()}
                        ({trip.days} days)
                      </p>
                    </div>
                    {hasIssues && (
                      <span className="text-xs text-red-600">
                        {tripConflicts.length} issue{tripConflicts.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <Button onClick={handleAddTrip} disabled={hasErrors}>
            Add Test Trip
          </Button>

          {conflicts.hasConflicts && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Detected Conflicts:</h3>
              <TripConflictWarnings
                conflicts={conflicts}
                onFixSuggestion={handleFixSuggestion}
                compact={false}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compact View Example</CardTitle>
          <CardDescription>
            Shows the compact conflict warning display
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TripConflictWarnings
            conflicts={conflicts}
            compact={true}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Import the hook and components:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import { useTripConflicts } from "@/lib/hooks/useTripConflicts"
import { TripConflictWarnings } from "@/components/trip-conflict-warnings"`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">2. Use the hook with your trips:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`const { conflicts, hasErrors, validateTrip } = useTripConflicts(trips)`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">3. Display warnings in your UI:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<TripConflictWarnings conflicts={conflicts} />`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold mb-2">4. Validate before adding trips:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`const validation = validateTrip(newTrip, existingTrips)
if (validation.hasErrors) {
  // Show error to user
  return
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}