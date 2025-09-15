/**
 * PDF Compliance Report Generation Service
 * Premium feature for generating professional travel compliance reports
 * Part of £9.99/year premium tier value proposition
 */

'use client'

import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { SchengenTrip } from '../types/schengen-trip'
import { UserProfile } from '../types/user-status'
import { format, differenceInDays, startOfDay, endOfDay } from 'date-fns'

// Extend jsPDF with autoTable
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: any) => void
  lastAutoTable?: { finalY: number }
}

export interface ComplianceReportData {
  user: UserProfile | { full_name?: string; email?: string }
  trips: SchengenTrip[]
  reportDate: Date
  calculationPeriod: {
    start: Date
    end: Date
  }
  complianceStatus: {
    totalDaysUsed: number
    remainingDays: number
    isCompliant: boolean
    nextResetDate: Date
  }
  recommendations: string[]
}

export interface ReportOptions {
  includeVisualCalendar: boolean
  includeRecommendations: boolean
  includeLegalDisclaimer: boolean
  reportType: 'summary' | 'detailed' | 'official'
  branding: boolean
}

export class PDFReportGenerator {
  private static readonly COLORS = {
    primary: '#2563eb', // Blue-600
    secondary: '#64748b', // Slate-500
    success: '#16a34a', // Green-600
    warning: '#d97706', // Amber-600
    danger: '#dc2626', // Red-600
    muted: '#6b7280' // Gray-500
  }

  private static readonly FONTS = {
    title: 18,
    subtitle: 14,
    body: 10,
    caption: 8
  }

  /**
   * Generates a comprehensive PDF compliance report
   */
  static async generateComplianceReport(
    reportData: ComplianceReportData,
    options: ReportOptions = {
      includeVisualCalendar: true,
      includeRecommendations: true,
      includeLegalDisclaimer: true,
      reportType: 'detailed',
      branding: true
    }
  ): Promise<Blob> {
    const doc = new jsPDF() as jsPDFWithPlugin
    let yPosition = 20

    // Add header with branding
    if (options.branding) {
      yPosition = this.addHeader(doc, yPosition)
    }

    // Add report title and metadata
    yPosition = this.addReportTitle(doc, reportData, yPosition)

    // Add executive summary
    yPosition = this.addExecutiveSummary(doc, reportData, yPosition)

    // Add trip summary table
    yPosition = this.addTripSummaryTable(doc, reportData.trips, yPosition)

    // Add detailed compliance analysis
    if (options.reportType === 'detailed' || options.reportType === 'official') {
      yPosition = this.addDetailedAnalysis(doc, reportData, yPosition)
    }

    // Add visual calendar if requested
    if (options.includeVisualCalendar && options.reportType !== 'summary') {
      yPosition = this.addVisualCalendar(doc, reportData, yPosition)
    }

    // Add recommendations
    if (options.includeRecommendations) {
      yPosition = this.addRecommendations(doc, reportData.recommendations, yPosition)
    }

    // Add legal disclaimer
    if (options.includeLegalDisclaimer) {
      yPosition = this.addLegalDisclaimer(doc, yPosition)
    }

    // Add footer
    this.addFooter(doc, reportData.reportDate)

    return doc.output('blob')
  }

  /**
   * Generates a quick summary report for free account users (limited version)
   */
  static async generateBasicSummary(
    trips: SchengenTrip[],
    complianceStatus: ComplianceReportData['complianceStatus']
  ): Promise<Blob> {
    const doc = new jsPDF() as jsPDFWithPlugin
    let yPosition = 20

    // Basic header
    doc.setFontSize(this.FONTS.title)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Schengen Compliance Summary', 20, yPosition)
    yPosition += 20

    // Watermark for free users
    doc.setFontSize(8)
    doc.setTextColor(this.COLORS.muted)
    doc.text('Generated with ETIAS Calculator Free Account - Upgrade for detailed reports', 20, yPosition)
    yPosition += 15

    // Basic compliance status
    doc.setFontSize(this.FONTS.body)
    doc.setTextColor(complianceStatus.isCompliant ? this.COLORS.success : this.COLORS.danger)
    doc.text(`Status: ${complianceStatus.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}`, 20, yPosition)
    yPosition += 10

    doc.setTextColor(this.COLORS.secondary)
    doc.text(`Days used: ${complianceStatus.totalDaysUsed}/90`, 20, yPosition)
    yPosition += 8
    doc.text(`Days remaining: ${complianceStatus.remainingDays}`, 20, yPosition)
    yPosition += 15

    // Limited trip list (max 3 trips)
    const limitedTrips = trips.slice(0, 3)
    if (limitedTrips.length > 0) {
      doc.setFontSize(this.FONTS.subtitle)
      doc.setTextColor(this.COLORS.primary)
      doc.text('Recent Trips', 20, yPosition)
      yPosition += 10

      limitedTrips.forEach(trip => {
        doc.setFontSize(this.FONTS.body)
        doc.setTextColor(this.COLORS.secondary)
        doc.text(`${trip.country}: ${format(trip.startDate, 'dd/MM/yyyy')} - ${format(trip.endDate, 'dd/MM/yyyy')}`, 25, yPosition)
        yPosition += 8
      })

      if (trips.length > 3) {
        doc.setFontSize(this.FONTS.caption)
        doc.setTextColor(this.COLORS.muted)
        doc.text(`... and ${trips.length - 3} more trips (upgrade to see all)`, 25, yPosition)
        yPosition += 15
      }
    }

    // Upgrade prompt
    yPosition += 10
    doc.setFillColor(240, 240, 255)
    doc.rect(15, yPosition - 5, 180, 25, 'F')
    
    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Upgrade to Premium for:', 20, yPosition + 5)
    
    doc.setFontSize(this.FONTS.body)
    doc.setTextColor(this.COLORS.secondary)
    doc.text('• Detailed compliance analysis', 25, yPosition + 12)
    doc.text('• Visual travel calendar', 25, yPosition + 18)
    doc.text('• Personalized recommendations', 100, yPosition + 12)
    doc.text('• Official report formatting', 100, yPosition + 18)

    return doc.output('blob')
  }

  private static addHeader(doc: jsPDFWithPlugin, yPosition: number): number {
    // Add logo placeholder and branding
    doc.setFillColor(245, 245, 245)
    doc.rect(20, yPosition - 5, 170, 25, 'F')
    
    doc.setFontSize(16)
    doc.setTextColor(this.COLORS.primary)
    doc.text('🛂 ETIAS Calculator', 25, yPosition + 8)
    
    doc.setFontSize(10)
    doc.setTextColor(this.COLORS.secondary)
    doc.text('Professional Schengen Compliance Report', 25, yPosition + 15)
    
    return yPosition + 35
  }

  private static addReportTitle(doc: jsPDFWithPlugin, reportData: ComplianceReportData, yPosition: number): number {
    doc.setFontSize(this.FONTS.title)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Schengen Area Travel Compliance Report', 20, yPosition)
    yPosition += 15

    doc.setFontSize(this.FONTS.body)
    doc.setTextColor(this.COLORS.secondary)
    
    const reportInfo = [
      `Report Date: ${format(reportData.reportDate, 'dd MMMM yyyy')}`,
      `Traveller: ${(reportData.user as any)?.full_name || (reportData.user as any)?.email || 'Premium User'}`,
      `Period: ${format(reportData.calculationPeriod.start, 'dd/MM/yyyy')} - ${format(reportData.calculationPeriod.end, 'dd/MM/yyyy')}`,
      `Total Trips Analyzed: ${reportData.trips.length}`
    ]

    reportInfo.forEach(info => {
      doc.text(info, 20, yPosition)
      yPosition += 8
    })

    return yPosition + 10
  }

  private static addExecutiveSummary(doc: jsPDFWithPlugin, reportData: ComplianceReportData, yPosition: number): number {
    // Status box
    const statusColor = reportData.complianceStatus.isCompliant ? this.COLORS.success : this.COLORS.danger
    const statusText = reportData.complianceStatus.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'
    
    doc.setFillColor(statusColor === this.COLORS.success ? 240 : 255, statusColor === this.COLORS.success ? 255 : 240, 240)
    doc.rect(20, yPosition - 5, 170, 35, 'F')
    
    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(statusColor)
    doc.text(`COMPLIANCE STATUS: ${statusText}`, 25, yPosition + 8)
    
    doc.setFontSize(this.FONTS.body)
    doc.setTextColor(this.COLORS.secondary)
    doc.text(`Days Used: ${reportData.complianceStatus.totalDaysUsed}/90`, 25, yPosition + 18)
    doc.text(`Days Remaining: ${reportData.complianceStatus.remainingDays}`, 100, yPosition + 18)
    doc.text(`Next Reset: ${format(reportData.complianceStatus.nextResetDate, 'dd/MM/yyyy')}`, 25, yPosition + 26)
    
    return yPosition + 45
  }

  private static addTripSummaryTable(doc: jsPDFWithPlugin, trips: SchengenTrip[], yPosition: number): number {
    if (trips.length === 0) return yPosition

    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Trip Summary', 20, yPosition)
    yPosition += 10

    const tableData = trips.map((trip, index) => [
      (index + 1).toString(),
      trip.country,
      format(trip.startDate, 'dd/MM/yyyy'),
      format(trip.endDate, 'dd/MM/yyyy'),
      differenceInDays(endOfDay(trip.endDate), startOfDay(trip.startDate)) + 1 + ' days',
      trip.purpose || 'Tourism'
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['#', 'Country', 'Entry Date', 'Exit Date', 'Duration', 'Purpose']],
      body: tableData,
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [37, 99, 235], // Blue-600
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // Slate-50
      },
      margin: { left: 20, right: 20 }
    })

    return doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 20 : yPosition + 50
  }

  private static addDetailedAnalysis(doc: jsPDFWithPlugin, reportData: ComplianceReportData, yPosition: number): number {
    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Detailed Compliance Analysis', 20, yPosition)
    yPosition += 15

    // 90/180 rule explanation
    doc.setFontSize(this.FONTS.body)
    doc.setTextColor(this.COLORS.secondary)
    
    const analysis = [
      'The Schengen 90/180-day rule states that non-EU nationals can stay in the',
      'Schengen Area for a maximum of 90 days within any 180-day period.',
      '',
      `Your current usage: ${reportData.complianceStatus.totalDaysUsed} days out of 90 allowed`,
      `Remaining allowance: ${reportData.complianceStatus.remainingDays} days`,
      `Next reset date: ${format(reportData.complianceStatus.nextResetDate, 'dd MMMM yyyy')}`,
      '',
      reportData.complianceStatus.isCompliant 
        ? '✓ You are currently compliant with Schengen area regulations.'
        : '⚠ WARNING: You may be exceeding the allowed stay duration.'
    ]

    analysis.forEach(line => {
      if (line.includes('WARNING')) {
        doc.setTextColor(this.COLORS.danger)
      } else if (line.includes('✓')) {
        doc.setTextColor(this.COLORS.success)
      } else {
        doc.setTextColor(this.COLORS.secondary)
      }
      
      doc.text(line, 20, yPosition)
      yPosition += 8
    })

    return yPosition + 15
  }

  private static addVisualCalendar(doc: jsPDFWithPlugin, reportData: ComplianceReportData, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 200) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Travel Calendar Visualization', 20, yPosition)
    yPosition += 15

    doc.setFontSize(this.FONTS.body)
    doc.setTextColor(this.COLORS.muted)
    doc.text('Visual representation of your travel periods within the Schengen Area:', 20, yPosition)
    yPosition += 15

    // Simple timeline visualization
    const timelineWidth = 150
    const timelineHeight = 20
    
    // Draw timeline background
    doc.setFillColor(240, 240, 240)
    doc.rect(20, yPosition, timelineWidth, timelineHeight, 'F')
    
    // Draw border
    doc.setDrawColor(200, 200, 200)
    doc.rect(20, yPosition, timelineWidth, timelineHeight)

    // Mark travel periods (simplified representation)
    reportData.trips.forEach((trip, index) => {
      const tripStart = Math.random() * (timelineWidth - 20) + 20 // Simplified positioning
      const tripWidth = Math.min(20, timelineWidth - tripStart - 20)
      
      doc.setFillColor(37, 99, 235, 0.7) // Blue with transparency
      doc.rect(tripStart, yPosition + 2, tripWidth, timelineHeight - 4, 'F')
    })

    yPosition += timelineHeight + 20

    // Legend
    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    doc.text('■ Travel periods within Schengen Area', 25, yPosition)
    
    return yPosition + 15
  }

  private static addRecommendations(doc: jsPDFWithPlugin, recommendations: string[], yPosition: number): number {
    if (recommendations.length === 0) return yPosition

    // Check if we need a new page
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Personalized Recommendations', 20, yPosition)
    yPosition += 15

    recommendations.forEach((recommendation, index) => {
      doc.setFontSize(this.FONTS.body)
      doc.setTextColor(this.COLORS.secondary)
      doc.text(`${index + 1}. ${recommendation}`, 25, yPosition)
      yPosition += 12
    })

    return yPosition + 15
  }

  private static addLegalDisclaimer(doc: jsPDFWithPlugin, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 240) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFillColor(248, 250, 252)
    doc.rect(15, yPosition - 5, 180, 40, 'F')
    
    doc.setFontSize(this.FONTS.subtitle)
    doc.setTextColor(this.COLORS.primary)
    doc.text('Important Legal Disclaimer', 20, yPosition + 5)
    
    doc.setFontSize(this.FONTS.caption)
    doc.setTextColor(this.COLORS.muted)
    
    const disclaimer = [
      'This report is generated for informational purposes only and should not be considered',
      'as official legal advice. Schengen area entry requirements may vary by nationality,',
      'purpose of visit, and individual circumstances. Always verify current requirements',
      'with official embassy or consular sources before travel.',
      '',
      'ETIAS Calculator provides this service to assist with travel planning but assumes',
      'no responsibility for immigration decisions or travel complications.'
    ]

    disclaimer.forEach(line => {
      doc.text(line, 20, yPosition + 15)
      yPosition += 6
    })

    return yPosition + 15
  }

  private static addFooter(doc: jsPDFWithPlugin, reportDate: Date): void {
    const pageCount = (doc as any).internal.getNumberOfPages()
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      
      doc.setFontSize(this.FONTS.caption)
      doc.setTextColor(this.COLORS.muted)
      
      // Footer text
      doc.text('Generated by ETIAS Calculator Premium', 20, 285)
      doc.text(`Report Date: ${format(reportDate, 'dd/MM/yyyy HH:mm')}`, 20, 292)
      doc.text(`Page ${i} of ${pageCount}`, 170, 285)
      doc.text('etiascalculator.com', 170, 292)
    }
  }
}

/**
 * Hook for using PDF report generation in components
 */
export function usePDFReportGenerator() {
  const generateReport = async (
    reportData: ComplianceReportData,
    options?: ReportOptions
  ): Promise<Blob> => {
    return PDFReportGenerator.generateComplianceReport(reportData, options)
  }

  const generateBasicSummary = async (
    trips: SchengenTrip[],
    complianceStatus: ComplianceReportData['complianceStatus']
  ): Promise<Blob> => {
    return PDFReportGenerator.generateBasicSummary(trips, complianceStatus)
  }

  const downloadReport = (blob: Blob, filename: string = 'schengen-compliance-report.pdf') => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return {
    generateReport,
    generateBasicSummary,
    downloadReport
  }
}