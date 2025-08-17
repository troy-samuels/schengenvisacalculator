"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSchengenCalculator } from "@/lib/hooks/useSchengenCalculator"
import { RobustSchengenCalculator } from "@/lib/services/robust-schengen-calculator"
import { addDays, subDays, format } from "date-fns"

interface TestTrip {
  id: string
  country: string
  startDate: Date
  endDate: Date
  days: number
}

export function SchengenValidator() {
  const { calculateCompliance, debugRollingWindow } = useSchengenCalculator()
  const [testResults, setTestResults] = useState<any[]>([])

  const runTests = () => {
    const today = new Date()
    const results = []

    // Test 1: Simple single trip
    console.log("=== Running Schengen Calculator Tests ===")
    
    const test1Trips: TestTrip[] = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 30),
        endDate: subDays(today, 23),
        days: 8
      }
    ]
    
    const result1 = calculateCompliance(test1Trips, today)
    results.push({
      name: "Single 8-day trip",
      expected: { totalDaysUsed: 8, daysRemaining: 82, isCompliant: true },
      actual: result1,
      passed: result1.totalDaysUsed === 8 && result1.daysRemaining === 82 && result1.isCompliant
    })

    // Test 2: Exact 90-day limit
    const test2Trips: TestTrip[] = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 90),
        endDate: subDays(today, 1),
        days: 90
      }
    ]
    
    const result2 = calculateCompliance(test2Trips, today)
    results.push({
      name: "Exact 90-day limit",
      expected: { totalDaysUsed: 90, daysRemaining: 0, isCompliant: true },
      actual: result2,
      passed: result2.totalDaysUsed === 90 && result2.daysRemaining === 0 && result2.isCompliant
    })

    // Test 3: Overstay by 1 day
    const test3Trips: TestTrip[] = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 91),
        endDate: today,
        days: 92
      }
    ]
    
    const result3 = calculateCompliance(test3Trips, today)
    results.push({
      name: "Overstay by 1 day",
      expected: { totalDaysUsed: 92, daysRemaining: 0, isCompliant: false, overstayDays: 2 },
      actual: result3,
      passed: !result3.isCompliant && result3.overstayDays > 0
    })

    // Test 4: Multiple trips within window
    const test4Trips: TestTrip[] = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 100),
        endDate: subDays(today, 91),
        days: 10
      },
      {
        id: "2",
        country: "DE",
        startDate: subDays(today, 60),
        endDate: subDays(today, 46),
        days: 15
      },
      {
        id: "3",
        country: "IT",
        startDate: subDays(today, 20),
        endDate: subDays(today, 11),
        days: 10
      }
    ]
    
    const result4 = calculateCompliance(test4Trips, today)
    results.push({
      name: "Multiple trips (35 days total)",
      expected: { totalDaysUsed: 35, daysRemaining: 55, isCompliant: true },
      actual: result4,
      passed: result4.totalDaysUsed === 35 && result4.daysRemaining === 55 && result4.isCompliant
    })

    // Test 5: Trip outside 180-day window
    const test5Trips: TestTrip[] = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 200),
        endDate: subDays(today, 193),
        days: 8
      },
      {
        id: "2",
        country: "DE",
        startDate: subDays(today, 30),
        endDate: subDays(today, 21),
        days: 10
      }
    ]
    
    const result5 = calculateCompliance(test5Trips, today)
    results.push({
      name: "Trip outside window (should only count 10 days)",
      expected: { totalDaysUsed: 10, daysRemaining: 80, isCompliant: true },
      actual: result5,
      passed: result5.totalDaysUsed === 10 && result5.daysRemaining === 80
    })

    // Test 6: Rolling window edge case
    const test6Trips: TestTrip[] = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 179),
        endDate: subDays(today, 135),
        days: 45
      },
      {
        id: "2",
        country: "DE",
        startDate: subDays(today, 44),
        endDate: today,
        days: 45
      }
    ]
    
    const result6 = calculateCompliance(test6Trips, today)
    results.push({
      name: "Rolling window edge (90 days exactly)",
      expected: { totalDaysUsed: 90, daysRemaining: 0, isCompliant: true },
      actual: result6,
      passed: result6.totalDaysUsed === 90 && result6.isCompliant
    })

    console.log("Test Results:", results)
    setTestResults(results)

    // Run debug for the last test
    const debug = debugRollingWindow(test6Trips, today)
    console.log("Debug info for Test 6:", debug)
  }

  const runRobustTests = () => {
    console.log("=== Running Direct Robust Calculator Tests ===")
    
    const today = new Date()
    const trips = [
      {
        id: "1",
        country: "FR",
        startDate: subDays(today, 30),
        endDate: subDays(today, 23),
        days: 8
      }
    ]

    const robustResult = RobustSchengenCalculator.calculateExactCompliance(trips, today)
    console.log("Robust calculator result:", robustResult)

    const debug = RobustSchengenCalculator.debugRollingWindow(trips, today)
    console.log("Robust debug info:", debug)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto m-4">
      <CardHeader>
        <CardTitle>Schengen Calculator Validator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={runTests}>
            Run Hook Tests
          </Button>
          <Button onClick={runRobustTests} variant="outline">
            Run Robust Tests
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results:</h3>
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded border ${
                  result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={result.passed ? "text-green-600" : "text-red-600"}>
                    {result.passed ? "✅" : "❌"}
                  </span>
                  <strong>{result.name}</strong>
                </div>
                <div className="text-sm mt-1">
                  <div>Expected: {JSON.stringify(result.expected)}</div>
                  <div>Actual: {JSON.stringify(result.actual)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p><strong>Schengen 90/180 Rule:</strong></p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Maximum 90 days in any rolling 180-day period</li>
            <li>The 180-day period is calculated backward from any given date</li>
            <li>Both entry and exit days count as stay days</li>
            <li>The window "rolls" forward each day</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}