"use client"

import React from "react"
import { Download, FileText, FileSpreadsheet, FileJson, Eye, X, Check } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TripExportService, type ExportFormat, type ExportOptions } from "@/lib/services/trip-export-service"
import type { Trip, ComplianceResult } from "@/lib/types/enhanced-calculator"
import type { ConflictDetectionResult } from "@/lib/services/trip-conflict-detector"
import { format } from "date-fns"

interface TripExportDialogProps {
  trips: Trip[]
  compliance?: ComplianceResult
  conflicts?: ConflictDetectionResult
  trigger?: React.ReactNode
}

export function TripExportDialog({ 
  trips, 
  compliance, 
  conflicts,
  trigger 
}: TripExportDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [exportFormat, setExportFormat] = React.useState<ExportFormat>("pdf")
  const [includeCompliance, setIncludeCompliance] = React.useState(true)
  const [includeConflicts, setIncludeConflicts] = React.useState(true)
  const [includeRecommendations, setIncludeRecommendations] = React.useState(true)
  const [includeSummary, setIncludeSummary] = React.useState(true)
  const [previewContent, setPreviewContent] = React.useState<string>("")
  const [showPreview, setShowPreview] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)

  const hasConflicts = conflicts?.hasConflicts || false
  const hasRecommendations = compliance?.recommendations && compliance.recommendations.length > 0

  const handleExport = React.useCallback(() => {
    setIsExporting(true)

    const options: ExportOptions = {
      format: exportFormat,
      includeCompliance,
      includeConflicts,
      includeRecommendations,
      includeSummary,
      dateFormat: "MMM dd, yyyy",
    }

    const exportData = TripExportService.prepareExportData(trips, options)
    
    if (compliance) {
      exportData.compliance = compliance
    }
    
    if (conflicts) {
      exportData.conflicts = conflicts
    }

    let content: string
    let filename: string
    let mimeType: string

    switch (exportFormat) {
      case "csv":
        content = TripExportService.exportToCSV(exportData, options)
        filename = `schengen-trips-${format(new Date(), "yyyy-MM-dd")}.csv`
        mimeType = "text/csv;charset=utf-8;"
        break
      case "pdf":
        content = TripExportService.exportToPDF(exportData, options)
        filename = `schengen-trips-${format(new Date(), "yyyy-MM-dd")}.html`
        mimeType = "text/html;charset=utf-8;"
        break
      case "json":
        content = TripExportService.exportToJSON(exportData, options)
        filename = `schengen-trips-${format(new Date(), "yyyy-MM-dd")}.json`
        mimeType = "application/json;charset=utf-8;"
        break
      default:
        content = ""
        filename = ""
        mimeType = ""
    }

    if (content && filename) {
      TripExportService.downloadFile(content, filename, mimeType)
    }

    setTimeout(() => {
      setIsExporting(false)
      setOpen(false)
    }, 1000)
  }, [exportFormat, includeCompliance, includeConflicts, includeRecommendations, includeSummary, trips, compliance, conflicts])

  const handlePreview = React.useCallback(() => {
    const options: ExportOptions = {
      format: exportFormat,
      includeCompliance,
      includeConflicts,
      includeRecommendations,
      includeSummary,
      dateFormat: "MMM dd, yyyy",
    }

    const exportData = TripExportService.prepareExportData(trips, options)
    
    if (compliance) {
      exportData.compliance = compliance
    }
    
    if (conflicts) {
      exportData.conflicts = conflicts
    }

    let content: string

    switch (exportFormat) {
      case "csv":
        content = TripExportService.exportToCSV(exportData, options)
        break
      case "pdf":
        const htmlContent = TripExportService.exportToPDF(exportData, options)
        content = "PDF Preview (HTML format):\n\n" + htmlContent
        break
      case "json":
        content = TripExportService.exportToJSON(exportData, options)
        break
      default:
        content = ""
    }

    setPreviewContent(content)
    setShowPreview(true)
  }, [exportFormat, includeCompliance, includeConflicts, includeRecommendations, includeSummary, trips, compliance, conflicts])

  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case "csv":
        return <FileSpreadsheet className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "json":
        return <FileJson className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getFormatDescription = (format: ExportFormat) => {
    switch (format) {
      case "csv":
        return "Spreadsheet compatible format for Excel, Google Sheets"
      case "pdf":
        return "Professional document with formatting and visuals"
      case "json":
        return "Machine-readable format for data integration"
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Export Trip Documentation</DialogTitle>
          <DialogDescription>
            Generate comprehensive documentation for your Schengen visa trip planning
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="format" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="preview" disabled={!showPreview}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-4">
            <div className="space-y-2">
              <Label>Select Export Format</Label>
              <RadioGroup value={exportFormat} onValueChange={(value) => setExportFormat(value as ExportFormat)}>
                <Card className="cursor-pointer hover:bg-accent" onClick={() => setExportFormat("pdf")}>
                  <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <div className="flex items-center space-x-2">
                      {getFormatIcon("pdf")}
                      <Label htmlFor="pdf" className="cursor-pointer font-semibold">
                        PDF Document
                      </Label>
                    </div>
                  </CardHeader>
                  <CardDescription className="px-6 pb-4">
                    {getFormatDescription("pdf")}
                  </CardDescription>
                </Card>

                <Card className="cursor-pointer hover:bg-accent" onClick={() => setExportFormat("csv")}>
                  <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                    <RadioGroupItem value="csv" id="csv" />
                    <div className="flex items-center space-x-2">
                      {getFormatIcon("csv")}
                      <Label htmlFor="csv" className="cursor-pointer font-semibold">
                        CSV Spreadsheet
                      </Label>
                    </div>
                  </CardHeader>
                  <CardDescription className="px-6 pb-4">
                    {getFormatDescription("csv")}
                  </CardDescription>
                </Card>

                <Card className="cursor-pointer hover:bg-accent" onClick={() => setExportFormat("json")}>
                  <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                    <RadioGroupItem value="json" id="json" />
                    <div className="flex items-center space-x-2">
                      {getFormatIcon("json")}
                      <Label htmlFor="json" className="cursor-pointer font-semibold">
                        JSON Data
                      </Label>
                    </div>
                  </CardHeader>
                  <CardDescription className="px-6 pb-4">
                    {getFormatDescription("json")}
                  </CardDescription>
                </Card>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="options" className="space-y-4">
            <div className="space-y-4">
              <Label>Include in Export</Label>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={includeSummary}
                    onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                  />
                  <Label htmlFor="summary" className="cursor-pointer">
                    Executive Summary
                    <span className="text-sm text-muted-foreground ml-2">
                      Overview of compliance status and key metrics
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="compliance"
                    checked={includeCompliance}
                    onCheckedChange={(checked) => setIncludeCompliance(checked as boolean)}
                    disabled={!compliance}
                  />
                  <Label htmlFor="compliance" className="cursor-pointer">
                    Compliance Analysis
                    <span className="text-sm text-muted-foreground ml-2">
                      Detailed risk assessment and utilization metrics
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="conflicts"
                    checked={includeConflicts}
                    onCheckedChange={(checked) => setIncludeConflicts(checked as boolean)}
                    disabled={!hasConflicts}
                  />
                  <Label htmlFor="conflicts" className="cursor-pointer">
                    Conflicts & Warnings
                    <span className="text-sm text-muted-foreground ml-2">
                      {hasConflicts ? `${conflicts?.totalConflicts} issues found` : "No conflicts detected"}
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommendations"
                    checked={includeRecommendations}
                    onCheckedChange={(checked) => setIncludeRecommendations(checked as boolean)}
                    disabled={!hasRecommendations}
                  />
                  <Label htmlFor="recommendations" className="cursor-pointer">
                    Recommendations
                    <span className="text-sm text-muted-foreground ml-2">
                      {hasRecommendations ? `${compliance?.recommendations.length} suggestions` : "No recommendations"}
                    </span>
                  </Label>
                </div>
              </div>

              {trips.length === 0 && (
                <Alert>
                  <AlertDescription>
                    No trips to export. Add some trips first.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-2">
              <Label>Export Preview</Label>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <pre className="text-xs font-mono whitespace-pre-wrap">
                  {previewContent}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreview}
            disabled={trips.length === 0}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={trips.length === 0 || isExporting}
            >
              {isExporting ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export {exportFormat.toUpperCase()}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}