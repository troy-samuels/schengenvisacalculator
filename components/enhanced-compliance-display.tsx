"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Info, TrendingUp, Calendar, Target } from "lucide-react"
import type { ComplianceResult } from "@/lib/types/enhanced-calculator"

interface EnhancedComplianceDisplayProps {
  compliance: ComplianceResult
  className?: string
}

export function EnhancedComplianceDisplay({ compliance, className }: EnhancedComplianceDisplayProps) {
  const { riskAssessment, totalDaysUsed, daysRemaining, isCompliant, recommendations, nextResetDate } = compliance

  const getRiskIcon = () => {
    switch (riskAssessment.riskLevel) {
      case "MINIMAL":
      case "LOW":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "MODERATE":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "HIGH":
      case "CRITICAL":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
    }
  }

  const getRiskBadgeVariant = () => {
    switch (riskAssessment.riskLevel) {
      case "MINIMAL":
        return "default"
      case "LOW":
        return "secondary"
      case "MODERATE":
        return "outline"
      case "HIGH":
      case "CRITICAL":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getRiskColor = () => {
    switch (riskAssessment.riskLevel) {
      case "MINIMAL":
        return "#10B981"
      case "LOW":
        return "#059669"
      case "MODERATE":
        return "#F59E0B"
      case "HIGH":
        return "#EF4444"
      case "CRITICAL":
        return "#DC2626"
      default:
        return "#6B7280"
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Compliance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getRiskIcon()}
            Enhanced Visa Compliance
            <Badge variant={getRiskBadgeVariant()}>{riskAssessment.riskLevel}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usage Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Days Used (Last 180 Days)</span>
              <span className="font-medium">{totalDaysUsed} / 90 days</span>
            </div>
            <Progress value={(totalDaysUsed / 90) * 100} className="h-3" />
          </div>

          {/* Risk Score */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Risk Assessment</span>
              <span className="font-medium">{riskAssessment.overallRisk}/100</span>
            </div>
            <Progress
              value={riskAssessment.overallRisk}
              className="h-3"
              style={{
                background: `linear-gradient(to right, ${getRiskColor()}22 0%, ${getRiskColor()}22 ${riskAssessment.overallRisk}%, #e5e7eb ${riskAssessment.overallRisk}%)`,
              }}
            />
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{daysRemaining}</div>
              <div className="text-xs text-gray-600">Days Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalDaysUsed}</div>
              <div className="text-xs text-gray-600">Days Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getRiskColor() }}>
                {riskAssessment.confidenceScore.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      {riskAssessment.riskFactors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskAssessment.riskFactors.map((factor, index) => (
                <Alert key={index}>
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium">{factor.description}</div>
                        <div className="text-sm text-gray-600 mt-1">{factor.suggestion}</div>
                      </div>
                      <Badge
                        variant={
                          factor.severity === "HIGH"
                            ? "destructive"
                            : factor.severity === "MEDIUM"
                              ? "outline"
                              : "secondary"
                        }
                        className="ml-2"
                      >
                        {factor.severity}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Next Reset Date */}
      {nextResetDate && (
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            <strong>Next Reset:</strong> {nextResetDate.toLocaleDateString()} - Your oldest travel days will "roll off",
            giving you more available days for future trips.
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Status */}
      {!isCompliant && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>⚠️ Compliance Alert:</strong> You have exceeded the 90-day limit. Consult with immigration
            authorities immediately.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
