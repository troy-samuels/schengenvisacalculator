"use client"

import React from "react"
import { AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { ConflictDetectionResult, TripConflict } from "@/lib/services/trip-conflict-detector"
import { format } from "date-fns"

interface TripConflictWarningsProps {
  conflicts: ConflictDetectionResult
  onDismiss?: (conflictIndex: number) => void
  onFixSuggestion?: (conflict: TripConflict) => void
  compact?: boolean
}

export function TripConflictWarnings({ 
  conflicts, 
  onDismiss, 
  onFixSuggestion,
  compact = false 
}: TripConflictWarningsProps) {
  const [dismissedConflicts, setDismissedConflicts] = React.useState<Set<number>>(new Set())
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set())

  if (!conflicts.hasConflicts) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <AlertCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">All Clear</AlertTitle>
        <AlertDescription className="text-green-700">
          No conflicts detected. Your trips are compliant with Schengen visa rules.
        </AlertDescription>
      </Alert>
    )
  }

  const groupedConflicts = React.useMemo(() => {
    const groups: Record<string, TripConflict[]> = {
      ERROR: [],
      WARNING: [],
      INFO: []
    }

    conflicts.conflicts.forEach((conflict, index) => {
      if (!dismissedConflicts.has(index)) {
        groups[conflict.severity].push(conflict)
      }
    })

    return groups
  }, [conflicts.conflicts, dismissedConflicts])

  const getIcon = (severity: string) => {
    switch (severity) {
      case "ERROR":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "INFO":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "ERROR":
        return "border-red-200 bg-red-50"
      case "WARNING":
        return "border-yellow-200 bg-yellow-50"
      case "INFO":
        return "border-blue-200 bg-blue-50"
      default:
        return ""
    }
  }

  const getTextStyles = (severity: string) => {
    switch (severity) {
      case "ERROR":
        return { title: "text-red-800", description: "text-red-700" }
      case "WARNING":
        return { title: "text-yellow-800", description: "text-yellow-700" }
      case "INFO":
        return { title: "text-blue-800", description: "text-blue-700" }
      default:
        return { title: "", description: "" }
    }
  }

  const handleDismiss = (index: number) => {
    setDismissedConflicts(new Set([...dismissedConflicts, index]))
    onDismiss?.(index)
  }

  const toggleGroup = (severity: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(severity)) {
      newExpanded.delete(severity)
    } else {
      newExpanded.add(severity)
    }
    setExpandedGroups(newExpanded)
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Trip Conflicts Detected</CardTitle>
            <div className="flex gap-2">
              {groupedConflicts.ERROR.length > 0 && (
                <Badge variant="destructive">{groupedConflicts.ERROR.length} Errors</Badge>
              )}
              {groupedConflicts.WARNING.length > 0 && (
                <Badge variant="secondary" className="bg-yellow-100">
                  {groupedConflicts.WARNING.length} Warnings
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>
            Review and resolve conflicts to ensure Schengen visa compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(groupedConflicts).map(([severity, severityConflicts]) => {
            if (severityConflicts.length === 0) return null

            const isExpanded = expandedGroups.has(severity)
            const styles = getTextStyles(severity)

            return (
              <Collapsible
                key={severity}
                open={isExpanded}
                onOpenChange={() => toggleGroup(severity)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${getSeverityStyles(severity)} hover:opacity-90 transition-opacity`}>
                    {getIcon(severity)}
                    <span className={`font-medium ${styles.title}`}>
                      {severityConflicts.length} {severity.toLowerCase()}{severityConflicts.length !== 1 ? 's' : ''}
                    </span>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {isExpanded ? 'Hide' : 'Show'} details
                    </span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {severityConflicts.map((conflict, idx) => (
                    <Alert key={idx} className={getSeverityStyles(severity)}>
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1">
                          <AlertTitle className={`${styles.title} mb-1`}>
                            {conflict.message}
                          </AlertTitle>
                          <AlertDescription className={styles.description}>
                            <div className="space-y-1">
                              <p>{conflict.details}</p>
                              {conflict.suggestedFix && (
                                <p className="text-sm font-medium mt-2">
                                  💡 Suggestion: {conflict.suggestedFix}
                                </p>
                              )}
                            </div>
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {conflicts.conflicts.map((conflict, index) => {
        if (dismissedConflicts.has(index)) return null

        const styles = getTextStyles(conflict.severity)

        return (
          <Alert key={index} className={getSeverityStyles(conflict.severity)}>
            <div className="flex items-start justify-between w-full">
              <div className="flex gap-2">
                {getIcon(conflict.severity)}
                <div className="flex-1">
                  <AlertTitle className={`${styles.title} mb-1`}>
                    {conflict.message}
                  </AlertTitle>
                  <AlertDescription className={styles.description}>
                    <div className="space-y-2">
                      <p>{conflict.details}</p>
                      {conflict.affectedDates && (
                        <p className="text-sm">
                          Affected period: {format(conflict.affectedDates.start, "MMM d, yyyy")} - {format(conflict.affectedDates.end, "MMM d, yyyy")}
                        </p>
                      )}
                      {conflict.suggestedFix && (
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-sm font-medium">
                            💡 {conflict.suggestedFix}
                          </p>
                          {onFixSuggestion && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onFixSuggestion(conflict)}
                              className="ml-2"
                            >
                              Apply Fix
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </div>
              </div>
              {onDismiss && conflict.severity !== "ERROR" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(index)}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Alert>
        )
      })}
    </div>
  )
}

export function ConflictSummaryBadge({ conflicts }: { conflicts: ConflictDetectionResult }) {
  if (!conflicts.hasConflicts) {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        ✅ No conflicts
      </Badge>
    )
  }

  const errors = conflicts.conflicts.filter(c => c.severity === "ERROR").length
  const warnings = conflicts.conflicts.filter(c => c.severity === "WARNING").length

  if (errors > 0) {
    return (
      <Badge variant="destructive">
        {errors} error{errors !== 1 ? 's' : ''} • {warnings} warning{warnings !== 1 ? 's' : ''}
      </Badge>
    )
  }

  if (warnings > 0) {
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        {warnings} warning{warnings !== 1 ? 's' : ''}
      </Badge>
    )
  }

  return null
}