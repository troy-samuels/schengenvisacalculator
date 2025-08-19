'use client'

import React, { useState, useEffect } from 'react'
import { TripTemplateSelector } from './trip-template-selector'
import { type CalculatedTrip } from '@/lib/utils/date-calculator'
import { type TripTemplate } from '@/lib/data/trip-templates'
import { countries, type Country } from '@/lib/data/countries'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Edit3, 
  Trash2, 
  Plus,
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RotateCcw,
  Download,
  Upload,
  Plane
} from 'lucide-react'
import { format, addDays, differenceInDays } from 'date-fns'

interface Trip {
  id: string
  country: Country
  startDate: Date
  endDate: Date
  duration: number
  purpose: string
  notes?: string
}

interface TripManagerProps {
  className?: string
}

export function TripManager({ className = '' }: TripManagerProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [showTemplates, setShowTemplates] = useState(true)
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)
  const [appliedTemplate, setAppliedTemplate] = useState<TripTemplate | null>(null)
  const [complianceStatus, setComplianceStatus] = useState<{
    status: 'compliant' | 'warning' | 'violation'
    message: string
    daysUsed: number
    daysRemaining: number
  }>({
    status: 'compliant',
    message: 'No trips planned',
    daysUsed: 0,
    daysRemaining: 90
  })

  // Calculate compliance whenever trips change
  useEffect(() => {
    const totalDays = trips.reduce((sum, trip) => sum + trip.duration, 0)
    const daysRemaining = 90 - totalDays
    
    let status: 'compliant' | 'warning' | 'violation' = 'compliant'
    let message = `Using ${totalDays}/90 days`
    
    if (totalDays > 90) {
      status = 'violation'
      message = `Exceeds limit by ${totalDays - 90} days`
    } else if (daysRemaining < 5) {
      status = 'warning'
      message = `Only ${daysRemaining} days remaining`
    } else if (totalDays === 0) {
      message = 'No trips planned'
    } else {
      message = `${totalDays}/90 days used, ${daysRemaining} remaining`
    }
    
    setComplianceStatus({
      status,
      message,
      daysUsed: totalDays,
      daysRemaining
    })
  }, [trips])

  const handleTemplateApply = (calculatedTrips: CalculatedTrip[], template: TripTemplate) => {
    const newTrips: Trip[] = calculatedTrips.map(calcTrip => {
      const country = countries.find(c => c.code === calcTrip.countryCode)!
      return {
        id: calcTrip.id,
        country,
        startDate: calcTrip.startDate,
        endDate: calcTrip.endDate,
        duration: calcTrip.duration,
        purpose: calcTrip.purpose,
        notes: calcTrip.notes
      }
    })
    
    setTrips(newTrips)
    setAppliedTemplate(template)
    setShowTemplates(false)
  }

  const handleTripEdit = (trip: Trip) => {
    setEditingTrip(trip)
  }

  const handleTripUpdate = (updatedTrip: Trip) => {
    setTrips(prev => prev.map(trip => 
      trip.id === updatedTrip.id ? updatedTrip : trip
    ))
    setEditingTrip(null)
  }

  const handleTripDelete = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId))
  }

  const handleAddTrip = () => {
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      country: countries.find(c => c.code === 'DE')!, // Default to Germany
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      duration: 7,
      purpose: 'Tourism',
      notes: ''
    }
    setTrips(prev => [...prev, newTrip])
    setEditingTrip(newTrip)
  }

  const resetTrips = () => {
    setTrips([])
    setAppliedTemplate(null)
    setShowTemplates(true)
  }

  const exportTrips = () => {
    const data = {
      trips: trips.map(trip => ({
        ...trip,
        country: trip.country.code,
        startDate: trip.startDate.toISOString(),
        endDate: trip.endDate.toISOString()
      })),
      appliedTemplate: appliedTemplate?.id,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `schengen-trip-plan-${format(new Date(), 'yyyy-MM-dd')}.json`
    a.click()
    URL.revokeObjectURL(url)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-400'
      case 'violation':
        return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
    }
  }

  // Convert trips to CalculatedTrip format for template selector
  const currentCalculatedTrips: CalculatedTrip[] = trips.map(trip => ({
    id: trip.id,
    countryCode: trip.country.code,
    countryName: trip.country.name,
    startDate: trip.startDate,
    endDate: trip.endDate,
    duration: trip.duration,
    purpose: trip.purpose,
    notes: trip.notes
  }))

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🗺️ Trip Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Plan your Schengen area travels with smart templates and compliance checking
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 
                       rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            {showTemplates ? 'Hide Templates' : 'Show Templates'}
          </button>
          {trips.length > 0 && (
            <>
              <button
                onClick={exportTrips}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                           transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={resetTrips}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                           transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Compliance Status */}
      <div className={`p-4 rounded-lg border flex items-center justify-between ${getStatusColor(complianceStatus.status)}`}>
        <div className="flex items-center space-x-3">
          {getStatusIcon(complianceStatus.status)}
          <div>
            <div className="font-medium">
              Visa Compliance: {complianceStatus.status.charAt(0).toUpperCase() + complianceStatus.status.slice(1)}
            </div>
            <div className="text-sm opacity-80">
              {complianceStatus.message}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            {complianceStatus.daysUsed}/90
          </div>
          <div className="text-sm opacity-80">
            Days Used
          </div>
        </div>
      </div>

      {/* Applied Template Info */}
      {appliedTemplate && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{appliedTemplate.icon}</span>
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-200">
                Applied Template: {appliedTemplate.name}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {appliedTemplate.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Selector */}
      {showTemplates && (
        <TripTemplateSelector
          onTemplateApply={handleTemplateApply}
          currentTrips={currentCalculatedTrips}
        />
      )}

      {/* Current Trips */}
      {trips.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Plane className="w-6 h-6" />
              <span>Your Planned Trips</span>
            </h2>
            <button
              onClick={handleAddTrip}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                         transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Trip</span>
            </button>
          </div>

          <div className="space-y-4">
            {trips.map((trip, index) => (
              <div
                key={trip.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                           hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Trip {index + 1}
                      </div>
                      <div className="text-2xl mt-1">
                        {trip.country.flag}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {trip.country.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {trip.purpose}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(trip.startDate, 'MMM dd')} - {format(trip.endDate, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{trip.duration} days</span>
                        </div>
                      </div>
                      {trip.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {trip.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTripEdit(trip)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 
                                 dark:hover:bg-blue-950/30 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleTripDelete(trip.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 
                                 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {trips.length === 0 && !showTemplates && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No trips planned yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start by selecting a template or adding your first trip manually
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setShowTemplates(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Templates
            </button>
            <button
              onClick={handleAddTrip}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 
                         dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Add Custom Trip
            </button>
          </div>
        </div>
      )}

      {/* Trip Edit Modal */}
      {editingTrip && (
        <TripEditModal
          trip={editingTrip}
          onSave={handleTripUpdate}
          onCancel={() => setEditingTrip(null)}
        />
      )}
    </div>
  )
}

// Trip Edit Modal Component
interface TripEditModalProps {
  trip: Trip
  onSave: (trip: Trip) => void
  onCancel: () => void
}

function TripEditModal({ trip, onSave, onCancel }: TripEditModalProps) {
  const [formData, setFormData] = useState({
    country: trip.country,
    startDate: format(trip.startDate, 'yyyy-MM-dd'),
    endDate: format(trip.endDate, 'yyyy-MM-dd'),
    purpose: trip.purpose,
    notes: trip.notes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const duration = differenceInDays(endDate, startDate) + 1

    onSave({
      ...trip,
      country: formData.country,
      startDate,
      endDate,
      duration,
      purpose: formData.purpose,
      notes: formData.notes
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit Trip
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country
            </label>
            <select
              value={formData.country.code}
              onChange={(e) => {
                const country = countries.find(c => c.code === e.target.value)!
                setFormData(prev => ({ ...prev, country }))
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Purpose
            </label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Tourism">Tourism</option>
              <option value="Business">Business</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Family Visit">Family Visit</option>
              <option value="Transit">Transit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Additional details about your trip..."
            />
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 
                         dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}