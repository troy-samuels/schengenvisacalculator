'use client'

import React, { useState } from 'react'
import { TripManager } from '@/components/trip-manager'
import { TripTemplateSelector } from '@/components/trip-template-selector'
import { tripTemplates } from '@/lib/data/trip-templates'
import { TripDateCalculator } from '@/lib/utils/date-calculator'
import { 
  Code2, 
  Eye, 
  Calendar, 
  Users, 
  Briefcase,
  GraduationCap,
  Backpack,
  Sun,
  Laptop,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react'

export function TripTemplateDemo() {
  const [activeDemo, setActiveDemo] = useState<'full' | 'templates' | 'showcase'>('full')
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const demoSections = [
    {
      id: 'full',
      name: 'Full Trip Manager',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Complete trip planning experience with templates'
    },
    {
      id: 'templates',
      name: 'Template Browser',
      icon: <Eye className="w-5 h-5" />,
      description: 'Browse and preview travel templates'
    },
    {
      id: 'showcase',
      name: 'Template Showcase',
      icon: <Code2 className="w-5 h-5" />,
      description: 'Detailed view of all available templates'
    }
  ]

  const categoryInfo = {
    'digital-nomad': { icon: <Laptop className="w-6 h-6" />, color: 'text-purple-600 dark:text-purple-400' },
    'business': { icon: <Briefcase className="w-6 h-6" />, color: 'text-blue-600 dark:text-blue-400' },
    'family': { icon: <Users className="w-6 h-6" />, color: 'text-green-600 dark:text-green-400' },
    'student': { icon: <GraduationCap className="w-6 h-6" />, color: 'text-indigo-600 dark:text-indigo-400' },
    'backpacker': { icon: <Backpack className="w-6 h-6" />, color: 'text-orange-600 dark:text-orange-400' },
    'summer': { icon: <Sun className="w-6 h-6" />, color: 'text-yellow-600 dark:text-yellow-400' }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'violation':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const calculatePreview = (templateId: string) => {
    const template = tripTemplates.find(t => t.id === templateId)
    if (!template) return null

    const calculator = new TripDateCalculator()
    return calculator.calculateTemplateTrips(
      template.trips,
      template.seasonality?.preferredMonths[0],
      template.seasonality?.preferredMonths
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🌍 Schengen Trip Templates
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive trip planning system with pre-configured templates for different travel styles.
            All templates ensure Schengen visa compliance with smart date optimization.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {demoSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveDemo(section.id as any)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-lg border transition-all ${
                activeDemo === section.id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              {section.icon}
              <div className="text-left">
                <div className="font-medium">{section.name}</div>
                <div className="text-sm opacity-75">{section.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Demo Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
          {activeDemo === 'full' && (
            <div className="p-6">
              <TripManager />
            </div>
          )}

          {activeDemo === 'templates' && (
            <div className="p-6">
              <TripTemplateSelector 
                onTemplatePreview={(template) => console.log('Preview:', template)}
                onTemplateApply={(trips, template) => console.log('Applied:', { trips, template })}
              />
            </div>
          )}

          {activeDemo === 'showcase' && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  📋 All Available Templates
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Detailed overview of all travel templates with compliance analysis and trip breakdowns.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {tripTemplates.map(template => {
                  const categoryData = categoryInfo[template.category as keyof typeof categoryInfo]
                  const preview = previewTemplate === template.id ? calculatePreview(template.id) : null
                  
                  return (
                    <div
                      key={template.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 
                                 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    >
                      {/* Template Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{template.icon}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {template.name}
                              </h3>
                              {template.optimal && (
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
                                  Optimal
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className={categoryData.color}>
                                {categoryData.icon}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {template.category.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                        {getStatusIcon(template.compliance.status)}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {template.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {template.totalDays}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {template.trips.length}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Countries</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {90 - template.totalDays}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Buffer</div>
                        </div>
                      </div>

                      {/* Compliance Status */}
                      <div className={`p-3 rounded-lg border mb-4 ${
                        template.compliance.status === 'compliant'
                          ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800'
                          : template.compliance.status === 'warning'
                          ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800'
                          : 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800'
                      }`}>
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

                      {/* Trip Breakdown */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Trip Breakdown:</h4>
                        <div className="space-y-1">
                          {template.trips.slice(0, 3).map((trip, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 
                                         p-2 bg-gray-50 dark:bg-gray-700 rounded"
                            >
                              <span>{trip.countryName}</span>
                              <span>{trip.duration} days</span>
                            </div>
                          ))}
                          {template.trips.length > 3 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                              +{template.trips.length - 3} more countries...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setPreviewTemplate(previewTemplate === template.id ? null : template.id)}
                          className="flex-1 px-3 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 
                                     rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors text-sm"
                        >
                          {previewTemplate === template.id ? 'Hide Preview' : 'Preview Dates'}
                        </button>
                        <button
                          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                                     transition-colors text-sm"
                          onClick={() => console.log('Apply template:', template.id)}
                        >
                          Apply Template
                        </button>
                      </div>

                      {/* Preview Dates */}
                      {preview && previewTemplate === template.id && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <h5 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                            📅 Calculated Schedule
                          </h5>
                          <div className="space-y-1 text-xs">
                            {preview.trips.slice(0, 3).map((trip, index) => (
                              <div key={trip.id} className="flex items-center justify-between">
                                <span>{trip.countryName}</span>
                                <span>
                                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                            {preview.trips.length > 3 && (
                              <div className="text-center text-blue-600 dark:text-blue-400 pt-1">
                                +{preview.trips.length - 3} more trips...
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-xs text-blue-700 dark:text-blue-300">
                            Total: {preview.totalDays} days | Status: {preview.compliance.status}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            🚀 Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Smart Templates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pre-configured travel patterns for different lifestyles with optimal visa compliance
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Real-time Compliance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant feedback on visa compliance with detailed warnings and recommendations
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🗓️</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Smart Scheduling</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic date calculation based on seasonality and travel patterns
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Customizable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modify templates or create custom trips with full editing capabilities
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Mobile Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Responsive design works perfectly on all devices and screen sizes
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Export & Import</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Save and share your trip plans with JSON export functionality
              </p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            💡 Usage Examples
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Digital Nomad</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Sarah wants to work remotely while exploring Europe. She applies the "Digital Nomad Explorer" 
                template which automatically schedules 28 days in Portugal, 26 days in Germany, and 30 days 
                in the Netherlands with optimal spacing.
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                Result: 84/90 days used, fully compliant with 6-day buffer
              </code>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Family Vacation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                The Johnson family applies the "Family Holiday Explorer" template which schedules trips 
                during school holidays: Easter in Spain, summer in France, autumn in Italy, and Christmas 
                markets in Austria and Germany.
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                Result: 63/90 days used, excellent spacing with 27-day buffer
              </code>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Business Traveler</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Marcus needs frequent short trips to European offices. The "Business Power Traveler" 
                template creates 16 strategically spaced trips to Germany, France, Netherlands, 
                Switzerland, and other business hubs.
              </p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                Result: 72/90 days used with strategic spacing for business needs
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}