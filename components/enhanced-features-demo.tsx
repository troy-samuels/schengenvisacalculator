"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, AlertTriangle, Target, BarChart3 } from "lucide-react"
import { useEnhancedSchengenCalculator } from "@/lib/hooks/useEnhancedSchengenCalculator"
import type { Trip } from "@/lib/types/enhanced-calculator"
import { format, addDays } from "date-fns"

interface EnhancedFeaturesDemoProps {
  trips: Trip[]
  className?: string
}

export function EnhancedFeaturesDemo({ trips, className }: EnhancedFeaturesDemoProps) {
  const {
    calculateCompliance,
    forecastTravel,
    findOptimalTravelDates,
    testScenarios,
    getTravelStatistics,
    exportData,
    getRiskColor,
    getRiskMessage,
  } = useEnhancedSchengenCalculator()

  const [activeTab, setActiveTab] = useState("compliance")

  // Calculate current compliance
  const compliance = calculateCompliance(trips)
  const statistics = getTravelStatistics(trips)

  // Example: Find optimal dates for a 14-day trip
  const optimalDates = findOptimalTravelDates(trips, 14, new Date(), addDays(new Date(), 180)).slice(0, 3)

  // Example: Test scenarios
  const testResults = testScenarios(trips, [
    [
      {
        country: "ES",
        startDate: addDays(new Date(), 30),
        endDate: addDays(new Date(), 44),
      },
    ],
    [
      {
        country: "IT",
        startDate: addDays(new Date(), 60),
        endDate: addDays(new Date(), 89),
      },
    ],
  ])

  const handleExport = (format: "json" | "csv" | "ical") => {
    const data = exportData(trips, format)
    const blob = new Blob([data], {
      type: format === "json" ? "application/json" : format === "csv" ? "text/csv" : "text/calendar",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `schengen-trips.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Calculator Features</h2>
        <p className="text-gray-600">Advanced visa compliance analysis and travel planning</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compliance">Risk Analysis</TabsTrigger>
          <TabsTrigger value="optimal">Optimal Dates</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Advanced Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Risk Level:</span>
                <Badge
                  style={{ backgroundColor: getRiskColor(compliance.riskAssessment.riskLevel) }}
                  className="text-white"
                >
                  {compliance.riskAssessment.riskLevel}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span>Risk Score:</span>
                <span className="font-bold">{compliance.riskAssessment.overallRisk}/100</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Confidence:</span>
                <span className="font-bold">{compliance.riskAssessment.confidenceScore.toFixed(1)}%</span>
              </div>

              {compliance.riskAssessment.riskFactors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Risk Factors:</h4>
                  {compliance.riskAssessment.riskFactors.map((factor, index) => (
                    <Alert key={index}>
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{factor.description}</div>
                            <div className="text-sm text-gray-600 mt-1">{factor.suggestion}</div>
                          </div>
                          <Badge variant={factor.severity === "HIGH" ? "destructive" : "outline"}>
                            {factor.severity}
                          </Badge>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {compliance.futureWarnings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600">Future Warnings:</h4>
                  {compliance.futureWarnings.map((warning, index) => (
                    <Alert key={index} variant="destructive">
                      <AlertDescription>
                        <div className="font-medium">
                          {format(warning.date, "MMM d, yyyy")}: {warning.totalOverstay} day overstay
                        </div>
                        <div className="text-sm mt-1">{warning.recommendation}</div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Optimal Travel Dates (14-day trip)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {optimalDates.length > 0 ? (
                <div className="space-y-3">
                  {optimalDates.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">
                            {format(option.startDate, "MMM d")} - {format(option.endDate, "MMM d, yyyy")}
                          </div>
                          <div className="text-sm text-gray-600">Score: {option.score.toFixed(0)}/100</div>
                        </div>
                        <Badge variant={index === 0 ? "default" : "outline"}>
                          {index === 0 ? "Best" : `Option ${index + 1}`}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Available:</span> {option.immediatelyAvailable} days
                        </div>
                        <div>
                          <span className="text-gray-600">Utilization:</span> {option.utilizationAfter.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No optimal dates found in the next 6 months.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Scenario Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Scenario {index + 1}</div>
                      <Badge variant={result.isViable ? "default" : "destructive"}>
                        {result.isViable ? "Viable" : "Not Viable"}
                      </Badge>
                    </div>
                    {result.recommendation && <p className="text-sm text-gray-600">{result.recommendation}</p>}
                    {result.maxUtilizationRate && (
                      <div className="text-sm mt-2">
                        <span className="text-gray-600">Max Utilization:</span> {result.maxUtilizationRate.toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Travel Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statistics.totalTrips}</div>
                  <div className="text-sm text-gray-600">Total Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{statistics.totalDaysPlanned}</div>
                  <div className="text-sm text-gray-600">Total Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{statistics.averageTripLength}</div>
                  <div className="text-sm text-gray-600">Avg Length</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{statistics.longestTrip || 0}</div>
                  <div className="text-sm text-gray-600">Longest Trip</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Export your trip data in various formats:</p>
                <div className="flex gap-3">
                  <Button onClick={() => handleExport("json")} variant="outline">
                    Export JSON
                  </Button>
                  <Button onClick={() => handleExport("csv")} variant="outline">
                    Export CSV
                  </Button>
                  <Button onClick={() => handleExport("ical")} variant="outline">
                    Export Calendar
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  <p>
                    <strong>JSON:</strong> Complete data with metadata
                  </p>
                  <p>
                    <strong>CSV:</strong> Spreadsheet-compatible format
                  </p>
                  <p>
                    <strong>iCal:</strong> Import into calendar apps
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
