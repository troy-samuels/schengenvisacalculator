'use client'

import React, { useState, useEffect } from 'react'
import { 
  tripTemplates, 
  templateCategories, 
  getTemplatesByCategory, 
  getOptimalTemplates,
  type TripTemplate 
} from '@/lib/data/trip-templates'
import { TripDateCalculator, type CalculatedTrip, type DateCalculationResult } from '@/lib/utils/date-calculator'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Users,
  Briefcase,
  GraduationCap,
  Backpack,
  Sun,
  Laptop,
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react'
import { format } from 'date-fns'

interface TripTemplateSelectorProps {
  onTemplateApply?: (calculatedTrips: CalculatedTrip[], template: TripTemplate) => void
  onTemplatePreview?: (template: TripTemplate) => void
  className?: string
  currentTrips?: CalculatedTrip[]
}

export function TripTemplateSelector({
  onTemplateApply,
  onTemplatePreview,
  className = '',
  currentTrips = []
}: TripTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<TripTemplate | null>(null)
  const [calculationResult, setCalculationResult] = useState<DateCalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const filteredTemplates = selectedCategory === 'all' 
    ? tripTemplates 
    : getTemplatesByCategory(selectedCategory as any)

  const categoryIcons: Record<string, React.ReactNode> = {
    'digital-nomad': <Laptop className="w-5 h-5" />,
    'business': <Briefcase className="w-5 h-5" />,
    'family': <Users className="w-5 h-5" />,
    'student': <GraduationCap className="w-5 h-5" />,
    'backpacker': <Backpack className="w-5 h-5" />,
    'summer': <Sun className="w-5 h-5" />
  }

  useEffect(() => {
    if (selectedTemplate) {
      setIsCalculating(true)
      
      // Simulate calculation delay for better UX
      setTimeout(() => {
        const calculator = new TripDateCalculator()
        const result = calculator.calculateTemplateTrips(
          selectedTemplate.trips,
          selectedTemplate.seasonality?.preferredMonths[0],
          selectedTemplate.seasonality?.preferredMonths
        )
        
        setCalculationResult(result)
        setIsCalculating(false)
        onTemplatePreview?.(selectedTemplate)
      }, 500)
    }
  }, [selectedTemplate, onTemplatePreview])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'violation':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30'
      case 'violation':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30'
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
    }
  }

  const handleTemplateSelect = (template: TripTemplate) => {
    if (selectedTemplate?.id === template.id) {
      setSelectedTemplate(null)
      setCalculationResult(null)
      setShowComparison(false)
    } else {
      setSelectedTemplate(template)
      setShowComparison(currentTrips.length > 0)
    }
  }

  const handleApplyTemplate = () => {
    if (selectedTemplate && calculationResult) {
      onTemplateApply?.(calculationResult.trips, selectedTemplate)
    }
  }

  const currentTotalDays = currentTrips.reduce((sum, trip) => sum + trip.duration, 0)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ✈️ Trip Templates
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose from pre-configured travel patterns optimized for Schengen visa compliance
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All Templates
        </button>
        {templateCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {categoryIcons[category.id]}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className={`relative border rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate?.id === template.id
                ? 'ring-2 ring-blue-500 border-blue-200 dark:border-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            } ${getStatusColor(template.compliance.status)}`}
            onClick={() => handleTemplateSelect(template)}
          >
            {/* Optimal Badge */}
            {template.optimal && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Optimal</span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{template.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {template.pattern}
                  </p>
                </div>
              </div>
              {getStatusIcon(template.compliance.status)}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {template.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.totalDays}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Days</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.trips.length}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Countries</p>
              </div>
            </div>

            {/* Compliance Status */}
            <div className={`p-3 rounded-lg border ${getStatusColor(template.compliance.status)}`}>
              <div className="flex items-center space-x-2 mb-1">
                {getStatusIcon(template.compliance.status)}
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {template.compliance.status.charAt(0).toUpperCase() + template.compliance.status.slice(1)}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {template.compliance.message}
              </p>
            </div>

            {/* Expand Indicator */}
            {selectedTemplate?.id === template.id && (
              <div className="absolute bottom-4 right-4">
                <ChevronRight className="w-5 h-5 text-blue-500 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Template View */}
      {selectedTemplate && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <span className="text-2xl">{selectedTemplate.icon}</span>
                <span>{selectedTemplate.name}</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {selectedTemplate.description}
              </p>
            </div>
            <button
              onClick={handleApplyTemplate}
              disabled={!calculationResult || calculationResult.compliance.status === 'violation'}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply Template
            </button>
          </div>

          {/* Comparison */}
          {showComparison && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Plan</h4>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>{currentTrips.length} trips • {currentTotalDays} days used</p>
                  <p>Buffer: {90 - currentTotalDays} days</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">With Template</h4>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>{selectedTemplate.trips.length} trips • {selectedTemplate.totalDays} days used</p>
                  <p>Buffer: {90 - selectedTemplate.totalDays} days</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isCalculating && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Calculating optimal dates...</p>
            </div>
          )}

          {/* Calculated Schedule */}
          {calculationResult && !isCalculating && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  📅 Calculated Schedule
                </h4>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  calculationResult.compliance.status === 'compliant' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : calculationResult.compliance.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {getStatusIcon(calculationResult.compliance.status)}
                  <span>{calculationResult.compliance.message}</span>
                </div>
              </div>

              <div className="space-y-3">
                {calculationResult.trips.map((trip, index) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Trip {index + 1}
                        </div>
                        <div className="text-xs text-gray-500">
                          {trip.duration} days
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {trip.countryName}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {trip.purpose}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-gray-900 dark:text-white">
                        {format(trip.startDate, 'MMM dd')} - {format(trip.endDate, 'MMM dd, yyyy')}
                      </div>
                      <div className="text-gray-500">
                        {format(trip.startDate, 'EEEE')} to {format(trip.endDate, 'EEEE')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Warnings */}
              {calculationResult.warnings.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    ⚠️ Planning Considerations
                  </h5>
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    {calculationResult.warnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Template Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Advantages</h5>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {selectedTemplate.pros.map((pro, index) => (
                      <li key={index}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">⚠️ Considerations</h5>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {selectedTemplate.cons.map((con, index) => (
                      <li key={index}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Target Audience */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  🎯 Perfect For
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.targetAudience.map((audience, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}