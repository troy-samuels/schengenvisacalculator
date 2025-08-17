"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EUOfficialTestCases } from "@/lib/services/eu-official-test-cases"
import { format } from "date-fns"

export function EUValidationComponent() {
  const [validationResult, setValidationResult] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)

  const runEUValidation = async () => {
    setIsRunning(true)
    try {
      console.log("🇪🇺 Running Official EU Schengen Calculator Validation...")
      
      const result = EUOfficialTestCases.validateAgainstOfficialCases()
      setValidationResult(result)
      
      console.log("EU Validation Results:", result)
      
      // Log detailed results
      result.results.forEach((test: any) => {
        console.log(`${test.passed ? "✅" : "❌"} ${test.testCase}: ${test.description}`)
        if (!test.passed) {
          console.log(`  Expected:`, test.expected)
          console.log(`  Actual:`, test.result)
        }
      })
      
    } catch (error) {
      console.error("Error running EU validation:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusIcon = (passed: boolean) => passed ? "✅" : "❌"
  const getStatusColor = (passed: boolean) => passed ? "text-green-600" : "text-red-600"
  const getBgColor = (passed: boolean) => passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"

  return (
    <Card className="w-full max-w-6xl mx-auto m-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🇪🇺 Official EU Schengen Calculator Validation
        </CardTitle>
        <p className="text-sm text-gray-600">
          Validates our implementation against official European Commission test cases (KOM series)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={runEUValidation}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? "Running..." : "Run EU Validation"}
          </Button>
        </div>

        {validationResult && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {validationResult.totalTests}
                </div>
                <div className="text-sm text-blue-600">Total Tests</div>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {validationResult.passed}
                </div>
                <div className="text-sm text-green-600">Passed</div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {validationResult.failed}
                </div>
                <div className="text-sm text-red-600">Failed</div>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {validationResult.passRate.toFixed(1)}%
                </div>
                <div className="text-sm text-purple-600">Pass Rate</div>
              </div>
            </div>

            {/* Compliance Assessment */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-3">EU Compliance Assessment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">KOM Compliance Rate</div>
                  <div className="text-lg font-semibold">
                    {validationResult.compliance.komComplianceRate.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Production Ready</div>
                  <div className={`text-lg font-semibold ${validationResult.compliance.readyForProduction ? 'text-green-600' : 'text-red-600'}`}>
                    {validationResult.compliance.readyForProduction ? '✅ Yes' : '❌ No'}
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Recommendations:</div>
                <ul className="space-y-1">
                  {validationResult.compliance.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Individual Test Results */}
            <div className="space-y-2">
              <h3 className="font-semibold">Test Results:</h3>
              {validationResult.results.map((test: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded border ${getBgColor(test.passed)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={getStatusColor(test.passed)}>
                        {getStatusIcon(test.passed)}
                      </span>
                      <strong>{test.testCase}</strong>
                      <span className="text-sm text-gray-500">
                        ({test.trips} trips)
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Reference: {format(new Date(test.referenceDate), 'dd/MM/yyyy')}
                    </div>
                  </div>
                  
                  <div className="text-sm mb-2">
                    <strong>Description:</strong> {test.description}
                  </div>
                  
                  {!test.passed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-green-700">Expected:</div>
                        <div className="bg-white p-2 rounded border text-xs">
                          <div>Days Used: {test.expected.totalDaysUsed}</div>
                          <div>Days Remaining: {test.expected.daysRemaining}</div>
                          <div>Compliant: {test.expected.isCompliant ? 'Yes' : 'No'}</div>
                          <div>Overstay: {test.expected.overstayDays} days</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-red-700">Actual:</div>
                        <div className="bg-white p-2 rounded border text-xs">
                          <div>Days Used: {test.result.totalDaysUsed}</div>
                          <div>Days Remaining: {test.result.daysRemaining}</div>
                          <div>Compliant: {test.result.isCompliant ? 'Yes' : 'No'}</div>
                          <div>Overstay: {test.result.overstayDays} days</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    <strong>Notes:</strong> {test.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">About EU Official Test Cases:</h4>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>KOM 1.1:</strong> Multiple short stays in different months</li>
            <li><strong>KOM 1.2:</strong> Single stay at exact 90-day limit</li>
            <li><strong>KOM 1.3:</strong> Overstay scenario validation</li>
            <li><strong>KOM 1.4:</strong> Unsorted passport entry/exit stamps</li>
          </ul>
          <p className="mt-2 text-xs">
            These test cases are based on the European Commission's official Schengen calculator
            validation scenarios and ensure compliance with EU standards.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}