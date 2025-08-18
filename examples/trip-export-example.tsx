"use client"

import React from "react"
import { Download, FileText, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TripExportDialog } from "@/components/trip-export-dialog"
import { TripConflictWarnings } from "@/components/trip-conflict-warnings"
import { useTripExport } from "@/lib/hooks/useTripExport"
import { useTripConflicts } from "@/lib/hooks/useTripConflicts"
import { EnhancedSchengenCalculator } from "@/lib/services/enhanced-schengen-calculator"
import type { Trip } from "@/lib/types/enhanced-calculator"
import { format, addDays } from "date-fns"

export function TripExportExample() {
  const [trips, setTrips] = React.useState<Trip[]>([
    {
      id: "1",
      country: "France",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-20"),
      days: 20,
    },
    {
      id: "2",
      country: "Germany",
      startDate: new Date("2024-04-15"),
      endDate: new Date("2024-05-05"),
      days: 21,
    },
    {
      id: "3",
      country: "Spain",
      startDate: new Date("2024-06-10"),
      endDate: new Date("2024-06-30"),
      days: 21,
    },
  ])

  const [newTrip, setNewTrip] = React.useState({
    country: "",
    startDate: "",
    endDate: "",
  })

  const compliance = React.useMemo(
    () => EnhancedSchengenCalculator.calculateCompliance(trips),
    [trips]
  )

  const { conflicts, validateTrip } = useTripConflicts(trips)

  const {
    exportToCSV,
    exportToPDF,
    exportToJSON,
    isExporting,
    canExport,
    lastExportDate,
    exportStats,
  } = useTripExport(trips, compliance, conflicts, {
    onExportSuccess: (format) => {
      console.log(`Successfully exported to ${format}`)
    },
  })

  const handleAddTrip = () => {
    if (!newTrip.country || !newTrip.startDate || !newTrip.endDate) {
      alert("Please fill in all trip details")
      return
    }

    const startDate = new Date(newTrip.startDate)
    const endDate = new Date(newTrip.endDate)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    const tripToAdd: Trip = {
      id: Date.now().toString(),
      country: newTrip.country,
      startDate,
      endDate,
      days,
    }

    const validation = validateTrip(tripToAdd, trips)
    
    if (validation.hasErrors) {
      alert("Cannot add trip due to conflicts!")
      return
    }

    setTrips([...trips, tripToAdd])
    setNewTrip({ country: "", startDate: "", endDate: "" })
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter(t => t.id !== tripId))
  }

  const quickExportButtons = (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => exportToCSV()}
        disabled={!canExport || isExporting}
      >
        CSV
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => exportToPDF()}
        disabled={!canExport || isExporting}
      >
        PDF
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => exportToJSON()}
        disabled={!canExport || isExporting}
      >
        JSON
      </Button>
    </div>
  )

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trip Export Example</CardTitle>
              <CardDescription>
                Manage trips and export documentation in various formats
              </CardDescription>
            </div>
            <TripExportDialog
              trips={trips}
              compliance={compliance}
              conflicts={conflicts}
              trigger={
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Documentation
                </Button>
              }
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Trips</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{exportStats.tripCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Days Used</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{compliance.totalDaysUsed}/90</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Conflicts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{exportStats.conflictCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Risk Level</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{compliance.riskAssessment.riskLevel}</p>
              </CardContent>
            </Card>
          </div>

          {/* Conflict Warnings */}
          {conflicts.hasConflicts && (
            <TripConflictWarnings conflicts={conflicts} compact={true} />
          )}

          {/* Add New Trip */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={newTrip.country}
                    onValueChange={(value) => setNewTrip({ ...newTrip, country: value })}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddTrip} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trip
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Planned Trips</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Quick Export: {quickExportButtons}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{trip.country}</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.startDate && format(trip.startDate, "MMM d, yyyy")} -{" "}
                        {trip.endDate && format(trip.endDate, "MMM d, yyyy")} ({trip.days} days)
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {trips.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No trips planned yet. Add your first trip above.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Export History */}
          {lastExportDate && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last exported: {format(lastExportDate, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use Export Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Available Export Formats:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-0.5" />
                    <div>
                      <strong>PDF:</strong> Professional document with formatting, charts, and visual compliance indicators. 
                      Exports as HTML that can be printed to PDF from your browser.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-0.5" />
                    <div>
                      <strong>CSV:</strong> Spreadsheet format compatible with Excel and Google Sheets. 
                      Ideal for data analysis and record keeping.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-0.5" />
                    <div>
                      <strong>JSON:</strong> Machine-readable format for integration with other systems 
                      or backup purposes.
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Export Options:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Include executive summary with key metrics</li>
                  <li>• Add compliance analysis and risk assessment</li>
                  <li>• Include detected conflicts and warnings</li>
                  <li>• Add personalized recommendations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Use Cases:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Visa application documentation</li>
                  <li>• Travel planning records</li>
                  <li>• Compliance verification</li>
                  <li>• Sharing trip plans with others</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}