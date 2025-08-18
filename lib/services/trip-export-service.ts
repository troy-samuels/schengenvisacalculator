import { format } from "date-fns"
import type { Trip, ComplianceResult } from "@/lib/types/enhanced-calculator"
import type { ConflictDetectionResult, TripConflict } from "./trip-conflict-detector"
import { TripConflictDetector } from "./trip-conflict-detector"
import { EnhancedSchengenCalculator } from "./enhanced-schengen-calculator"

export type ExportFormat = "csv" | "pdf" | "json"

export interface ExportOptions {
  format: ExportFormat
  includeCompliance?: boolean
  includeConflicts?: boolean
  includeRecommendations?: boolean
  includeSummary?: boolean
  dateFormat?: string
  filename?: string
}

export interface ExportData {
  trips: Trip[]
  compliance?: ComplianceResult
  conflicts?: ConflictDetectionResult
  metadata: {
    exportDate: Date
    totalTrips: number
    totalDays: number
    daysUsed: number
    daysRemaining: number
    isCompliant: boolean
  }
}

export class TripExportService {
  private static readonly DEFAULT_DATE_FORMAT = "MMM dd, yyyy"

  static prepareExportData(
    trips: Trip[],
    options: ExportOptions
  ): ExportData {
    const compliance = options.includeCompliance
      ? EnhancedSchengenCalculator.calculateCompliance(trips)
      : undefined

    const conflicts = options.includeConflicts
      ? TripConflictDetector.detectAllConflicts(trips)
      : undefined

    const totalDays = trips.reduce((sum, trip) => sum + (trip.days || 0), 0)

    return {
      trips,
      compliance,
      conflicts,
      metadata: {
        exportDate: new Date(),
        totalTrips: trips.length,
        totalDays,
        daysUsed: compliance?.totalDaysUsed || 0,
        daysRemaining: compliance?.daysRemaining || 90,
        isCompliant: compliance?.isCompliant ?? true,
      },
    }
  }

  static exportToCSV(data: ExportData, options: ExportOptions): string {
    const dateFormat = options.dateFormat || this.DEFAULT_DATE_FORMAT
    const lines: string[] = []

    // Header section
    lines.push("SCHENGEN VISA TRIP PLANNING DOCUMENT")
    lines.push(`Export Date:,${format(data.metadata.exportDate, dateFormat)}`)
    lines.push("")

    // Summary section
    if (options.includeSummary) {
      lines.push("SUMMARY")
      lines.push(`Total Trips:,${data.metadata.totalTrips}`)
      lines.push(`Total Days Planned:,${data.metadata.totalDays}`)
      lines.push(`Days Used (Last 180):,${data.metadata.daysUsed}`)
      lines.push(`Days Remaining:,${data.metadata.daysRemaining}`)
      lines.push(`Compliance Status:,${data.metadata.isCompliant ? "COMPLIANT" : "VIOLATION"}`)
      lines.push("")
    }

    // Trips section
    lines.push("TRIP DETAILS")
    lines.push("Trip #,Country,Start Date,End Date,Duration (Days),Status,Notes")

    data.trips.forEach((trip, index) => {
      const startDate = trip.startDate ? format(trip.startDate, dateFormat) : "Not set"
      const endDate = trip.endDate ? format(trip.endDate, dateFormat) : "Not set"
      const status = this.getTripStatus(trip, data.conflicts)
      const notes = this.getTripNotes(trip, data.conflicts)

      lines.push(
        `${index + 1},${trip.country},${startDate},${endDate},${trip.days},${status},"${notes}"`
      )
    })

    // Conflicts section
    if (options.includeConflicts && data.conflicts?.hasConflicts) {
      lines.push("")
      lines.push("CONFLICTS AND WARNINGS")
      lines.push("Severity,Type,Message,Details,Suggested Fix")

      data.conflicts.conflicts.forEach((conflict) => {
        lines.push(
          `${conflict.severity},${conflict.type},"${conflict.message}","${conflict.details}","${conflict.suggestedFix || "N/A"}"`
        )
      })
    }

    // Compliance details section
    if (options.includeCompliance && data.compliance) {
      lines.push("")
      lines.push("COMPLIANCE ANALYSIS")
      lines.push(`Risk Level:,${data.compliance.riskAssessment.riskLevel}`)
      lines.push(`Risk Score:,${data.compliance.riskAssessment.overallRisk}/100`)
      lines.push(`Utilization Rate:,${data.compliance.riskAssessment.utilizationRate.toFixed(1)}%`)
      
      if (data.compliance.nextResetDate) {
        lines.push(`Next Reset Date:,${format(data.compliance.nextResetDate, dateFormat)}`)
      }
    }

    // Recommendations section
    if (options.includeRecommendations && data.compliance?.recommendations.length) {
      lines.push("")
      lines.push("RECOMMENDATIONS")
      data.compliance.recommendations.forEach((rec, index) => {
        lines.push(`${index + 1},"${rec}"`)
      })
    }

    return lines.join("\n")
  }

  static exportToPDF(data: ExportData, options: ExportOptions): string {
    const dateFormat = options.dateFormat || this.DEFAULT_DATE_FORMAT
    const htmlContent = this.generatePDFHTML(data, options, dateFormat)
    return htmlContent
  }

  private static generatePDFHTML(
    data: ExportData,
    options: ExportOptions,
    dateFormat: string
  ): string {
    const isCompliant = data.metadata.isCompliant
    const complianceColor = isCompliant ? "#10b981" : "#ef4444"
    
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Schengen Visa Trip Planning Document</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      color: #1e40af;
      border-bottom: 3px solid #1e40af;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    
    h2 {
      color: #1e40af;
      margin-top: 30px;
      margin-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .metadata {
      text-align: right;
      color: #6b7280;
      font-size: 14px;
    }
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
    }
    
    .summary-item {
      display: flex;
      flex-direction: column;
    }
    
    .summary-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    
    .summary-value {
      font-size: 24px;
      font-weight: bold;
      color: #111827;
    }
    
    .compliance-status {
      padding: 10px 20px;
      border-radius: 8px;
      text-align: center;
      font-weight: bold;
      margin: 20px 0;
    }
    
    .compliant {
      background: #d1fae5;
      color: #065f46;
      border: 2px solid #10b981;
    }
    
    .violation {
      background: #fee2e2;
      color: #991b1b;
      border: 2px solid #ef4444;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    
    th {
      background: #f3f4f6;
      color: #374151;
      font-weight: 600;
      text-align: left;
      padding: 12px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    tr:hover {
      background: #f9fafb;
    }
    
    .trip-status {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .status-valid {
      background: #d1fae5;
      color: #065f46;
    }
    
    .status-warning {
      background: #fef3c7;
      color: #92400e;
    }
    
    .status-error {
      background: #fee2e2;
      color: #991b1b;
    }
    
    .conflict-box {
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      border-left: 4px solid;
    }
    
    .conflict-error {
      background: #fee2e2;
      border-color: #ef4444;
    }
    
    .conflict-warning {
      background: #fef3c7;
      border-color: #f59e0b;
    }
    
    .conflict-info {
      background: #dbeafe;
      border-color: #3b82f6;
    }
    
    .recommendation {
      padding: 10px;
      margin: 10px 0;
      background: #f0f9ff;
      border-left: 3px solid #0284c7;
      border-radius: 4px;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    
    .risk-meter {
      width: 100%;
      height: 30px;
      background: linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%);
      border-radius: 15px;
      position: relative;
      margin: 20px 0;
    }
    
    .risk-indicator {
      position: absolute;
      top: -5px;
      width: 40px;
      height: 40px;
      background: white;
      border: 3px solid #1e40af;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      
      .page-break {
        page-break-before: always;
      }
    }
  </style>
</head>
<body>
  <h1>Schengen Visa Trip Planning Document</h1>
  
  <div class="metadata">
    Generated: ${format(data.metadata.exportDate, dateFormat)}<br>
    Document Version: 1.0
  </div>
  `

    // Summary Section
    if (options.includeSummary) {
      html += `
  <h2>Executive Summary</h2>
  
  <div class="compliance-status ${isCompliant ? "compliant" : "violation"}">
    Status: ${isCompliant ? "✅ COMPLIANT" : "⚠️ VIOLATION DETECTED"}
  </div>
  
  <div class="summary-grid">
    <div class="summary-item">
      <span class="summary-label">Total Trips</span>
      <span class="summary-value">${data.metadata.totalTrips}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Days Planned</span>
      <span class="summary-value">${data.metadata.totalDays}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Days Used (180-day)</span>
      <span class="summary-value" style="color: ${complianceColor}">${data.metadata.daysUsed}/90</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Days Remaining</span>
      <span class="summary-value">${data.metadata.daysRemaining}</span>
    </div>
  </div>
      `

      // Risk Assessment
      if (data.compliance) {
        const riskPosition = (data.compliance.riskAssessment.overallRisk / 100) * 100
        html += `
  <h3>Risk Assessment</h3>
  <div style="position: relative;">
    <div class="risk-meter"></div>
    <div class="risk-indicator" style="left: ${riskPosition}%;"></div>
  </div>
  <p style="text-align: center;">
    Risk Level: <strong>${data.compliance.riskAssessment.riskLevel}</strong> 
    (${data.compliance.riskAssessment.overallRisk}/100)
  </p>
        `
      }
    }

    // Trip Details Table
    html += `
  <h2>Trip Details</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Country</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Duration</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
    `

    data.trips.forEach((trip, index) => {
      const startDate = trip.startDate ? format(trip.startDate, dateFormat) : "Not set"
      const endDate = trip.endDate ? format(trip.endDate, dateFormat) : "Not set"
      const status = this.getTripStatus(trip, data.conflicts)
      const statusClass = this.getStatusClass(status)

      html += `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${trip.country}</strong></td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>${trip.days} days</td>
        <td><span class="trip-status ${statusClass}">${status}</span></td>
      </tr>
      `
    })

    html += `
    </tbody>
  </table>
    `

    // Conflicts Section
    if (options.includeConflicts && data.conflicts?.hasConflicts) {
      html += `
  <div class="page-break"></div>
  <h2>Conflicts and Warnings</h2>
      `

      const groupedConflicts = this.groupConflictsBySeverity(data.conflicts.conflicts)

      if (groupedConflicts.ERROR.length > 0) {
        html += `<h3 style="color: #ef4444;">🚫 Errors (${groupedConflicts.ERROR.length})</h3>`
        groupedConflicts.ERROR.forEach((conflict) => {
          html += `
  <div class="conflict-box conflict-error">
    <strong>${conflict.message}</strong><br>
    ${conflict.details}<br>
    ${conflict.suggestedFix ? `<em>💡 Suggestion: ${conflict.suggestedFix}</em>` : ""}
  </div>
          `
        })
      }

      if (groupedConflicts.WARNING.length > 0) {
        html += `<h3 style="color: #f59e0b;">⚠️ Warnings (${groupedConflicts.WARNING.length})</h3>`
        groupedConflicts.WARNING.forEach((conflict) => {
          html += `
  <div class="conflict-box conflict-warning">
    <strong>${conflict.message}</strong><br>
    ${conflict.details}<br>
    ${conflict.suggestedFix ? `<em>💡 Suggestion: ${conflict.suggestedFix}</em>` : ""}
  </div>
          `
        })
      }
    }

    // Recommendations Section
    if (options.includeRecommendations && data.compliance?.recommendations.length) {
      html += `
  <h2>Recommendations</h2>
      `
      data.compliance.recommendations.forEach((rec) => {
        html += `
  <div class="recommendation">
    ✓ ${rec}
  </div>
        `
      })
    }

    // Footer
    html += `
  <div class="footer">
    <p>
      This document is generated for planning purposes only. 
      Always verify current visa requirements with official sources.
    </p>
    <p>
      Generated by Schengen Visa Calculator | ${format(new Date(), "yyyy")}
    </p>
  </div>
</body>
</html>
    `

    return html
  }

  private static getTripStatus(trip: Trip, conflicts?: ConflictDetectionResult): string {
    if (!conflicts) return "Valid"
    
    const tripConflicts = conflicts.conflicts.filter(c => c.tripIds.includes(trip.id))
    
    if (tripConflicts.some(c => c.severity === "ERROR")) {
      return "Error"
    }
    if (tripConflicts.some(c => c.severity === "WARNING")) {
      return "Warning"
    }
    return "Valid"
  }

  private static getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "error":
        return "status-error"
      case "warning":
        return "status-warning"
      default:
        return "status-valid"
    }
  }

  private static getTripNotes(trip: Trip, conflicts?: ConflictDetectionResult): string {
    if (!conflicts) return ""
    
    const tripConflicts = conflicts.conflicts.filter(c => c.tripIds.includes(trip.id))
    
    if (tripConflicts.length === 0) return "No issues"
    
    return tripConflicts
      .map(c => `${c.severity}: ${c.message}`)
      .join("; ")
  }

  private static groupConflictsBySeverity(conflicts: TripConflict[]) {
    return {
      ERROR: conflicts.filter(c => c.severity === "ERROR"),
      WARNING: conflicts.filter(c => c.severity === "WARNING"),
      INFO: conflicts.filter(c => c.severity === "INFO"),
    }
  }

  static exportToJSON(data: ExportData, options: ExportOptions): string {
    const exportObject = {
      metadata: {
        ...data.metadata,
        exportDate: data.metadata.exportDate.toISOString(),
        version: "1.0.0",
      },
      trips: data.trips.map(trip => ({
        ...trip,
        startDate: trip.startDate?.toISOString() || null,
        endDate: trip.endDate?.toISOString() || null,
      })),
      compliance: options.includeCompliance ? data.compliance : undefined,
      conflicts: options.includeConflicts ? data.conflicts : undefined,
    }

    return JSON.stringify(exportObject, null, 2)
  }

  static downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  static generateFilename(exportFormat: ExportFormat): string {
    const date = format(new Date(), "yyyy-MM-dd")
    return `schengen-trips-${date}.${exportFormat}`
  }

  static getMimeType(format: ExportFormat): string {
    switch (format) {
      case "csv":
        return "text/csv;charset=utf-8;"
      case "pdf":
        return "text/html;charset=utf-8;"
      case "json":
        return "application/json;charset=utf-8;"
      default:
        return "text/plain;charset=utf-8;"
    }
  }
}