"use client"

import { useCallback, useState } from "react"
import { TripExportService, type ExportFormat, type ExportOptions, type ExportData } from "@/lib/services/trip-export-service"
import type { Trip, ComplianceResult } from "@/lib/types/enhanced-calculator"
import type { ConflictDetectionResult } from "@/lib/services/trip-conflict-detector"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export interface UseTripExportOptions {
  defaultFormat?: ExportFormat
  defaultIncludeCompliance?: boolean
  defaultIncludeConflicts?: boolean
  defaultIncludeRecommendations?: boolean
  defaultIncludeSummary?: boolean
  onExportSuccess?: (format: ExportFormat) => void
  onExportError?: (error: Error) => void
}

export function useTripExport(
  trips: Trip[],
  compliance?: ComplianceResult,
  conflicts?: ConflictDetectionResult,
  options: UseTripExportOptions = {}
) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [lastExportDate, setLastExportDate] = useState<Date | null>(null)

  const {
    defaultFormat = "pdf",
    defaultIncludeCompliance = true,
    defaultIncludeConflicts = true,
    defaultIncludeRecommendations = true,
    defaultIncludeSummary = true,
    onExportSuccess,
    onExportError,
  } = options

  const prepareExportData = useCallback(
    (exportOptions: Partial<ExportOptions> = {}): ExportData => {
      const mergedOptions: ExportOptions = {
        format: exportOptions.format || defaultFormat,
        includeCompliance: exportOptions.includeCompliance ?? defaultIncludeCompliance,
        includeConflicts: exportOptions.includeConflicts ?? defaultIncludeConflicts,
        includeRecommendations: exportOptions.includeRecommendations ?? defaultIncludeRecommendations,
        includeSummary: exportOptions.includeSummary ?? defaultIncludeSummary,
        dateFormat: exportOptions.dateFormat || "MMM dd, yyyy",
      }

      const exportData = TripExportService.prepareExportData(trips, mergedOptions)

      if (compliance && mergedOptions.includeCompliance) {
        exportData.compliance = compliance
      }

      if (conflicts && mergedOptions.includeConflicts) {
        exportData.conflicts = conflicts
      }

      return exportData
    },
    [
      trips,
      compliance,
      conflicts,
      defaultFormat,
      defaultIncludeCompliance,
      defaultIncludeConflicts,
      defaultIncludeRecommendations,
      defaultIncludeSummary,
    ]
  )

  const exportToCSV = useCallback(
    async (exportOptions: Partial<ExportOptions> = {}) => {
      try {
        setIsExporting(true)
        
        const options: ExportOptions = {
          ...exportOptions,
          format: "csv",
        }

        const exportData = prepareExportData(options)
        const content = TripExportService.exportToCSV(exportData, options)
        const filename = `schengen-trips-${format(new Date(), "yyyy-MM-dd")}.csv`
        
        TripExportService.downloadFile(content, filename, "text/csv;charset=utf-8;")
        
        setLastExportDate(new Date())
        
        toast({
          title: "Export Successful",
          description: `Trips exported to ${filename}`,
        })
        
        onExportSuccess?.("csv")
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to export CSV"
        
        toast({
          title: "Export Failed",
          description: errorMessage,
          variant: "destructive",
        })
        
        onExportError?.(error instanceof Error ? error : new Error(errorMessage))
      } finally {
        setIsExporting(false)
      }
    },
    [prepareExportData, toast, onExportSuccess, onExportError]
  )

  const exportToPDF = useCallback(
    async (exportOptions: Partial<ExportOptions> = {}) => {
      try {
        setIsExporting(true)
        
        const options: ExportOptions = {
          ...exportOptions,
          format: "pdf",
        }

        const exportData = prepareExportData(options)
        const content = TripExportService.exportToPDF(exportData, options)
        const filename = `schengen-trips-${format(new Date(), "yyyy-MM-dd")}.html`
        
        TripExportService.downloadFile(content, filename, "text/html;charset=utf-8;")
        
        setLastExportDate(new Date())
        
        toast({
          title: "Export Successful",
          description: `Document exported as ${filename}. Open in browser to print as PDF.`,
        })
        
        onExportSuccess?.("pdf")
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to export PDF"
        
        toast({
          title: "Export Failed",
          description: errorMessage,
          variant: "destructive",
        })
        
        onExportError?.(error instanceof Error ? error : new Error(errorMessage))
      } finally {
        setIsExporting(false)
      }
    },
    [prepareExportData, toast, onExportSuccess, onExportError]
  )

  const exportToJSON = useCallback(
    async (exportOptions: Partial<ExportOptions> = {}) => {
      try {
        setIsExporting(true)
        
        const options: ExportOptions = {
          ...exportOptions,
          format: "json",
        }

        const exportData = prepareExportData(options)
        const content = TripExportService.exportToJSON(exportData, options)
        const filename = `schengen-trips-${format(new Date(), "yyyy-MM-dd")}.json`
        
        TripExportService.downloadFile(content, filename, "application/json;charset=utf-8;")
        
        setLastExportDate(new Date())
        
        toast({
          title: "Export Successful",
          description: `Data exported to ${filename}`,
        })
        
        onExportSuccess?.("json")
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to export JSON"
        
        toast({
          title: "Export Failed",
          description: errorMessage,
          variant: "destructive",
        })
        
        onExportError?.(error instanceof Error ? error : new Error(errorMessage))
      } finally {
        setIsExporting(false)
      }
    },
    [prepareExportData, toast, onExportSuccess, onExportError]
  )

  const exportTrips = useCallback(
    async (format: ExportFormat, exportOptions: Partial<ExportOptions> = {}) => {
      switch (format) {
        case "csv":
          return exportToCSV(exportOptions)
        case "pdf":
          return exportToPDF(exportOptions)
        case "json":
          return exportToJSON(exportOptions)
        default:
          throw new Error(`Unsupported export format: ${format}`)
      }
    },
    [exportToCSV, exportToPDF, exportToJSON]
  )

  const getPreview = useCallback(
    (format: ExportFormat, exportOptions: Partial<ExportOptions> = {}): string => {
      const options: ExportOptions = {
        ...exportOptions,
        format,
      }

      const exportData = prepareExportData(options)

      switch (format) {
        case "csv":
          return TripExportService.exportToCSV(exportData, options)
        case "pdf":
          return TripExportService.exportToPDF(exportData, options)
        case "json":
          return TripExportService.exportToJSON(exportData, options)
        default:
          return ""
      }
    },
    [prepareExportData]
  )

  const canExport = trips.length > 0

  const exportStats = {
    tripCount: trips.length,
    hasCompliance: !!compliance,
    hasConflicts: !!conflicts?.hasConflicts,
    conflictCount: conflicts?.totalConflicts || 0,
    recommendationCount: compliance?.recommendations?.length || 0,
  }

  return {
    exportToCSV,
    exportToPDF,
    exportToJSON,
    exportTrips,
    getPreview,
    prepareExportData,
    isExporting,
    canExport,
    lastExportDate,
    exportStats,
  }
}