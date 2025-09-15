/**
 * Smart Alerts Panel Component
 * Premium feature for displaying and managing travel compliance alerts
 * Part of £9.99/year premium tier value proposition
 */

'use client'

import React, { useState, useEffect } from 'react'
import { UserStatus } from '../types/user-status'
import { SchengenTrip } from '../types/schengen-trip'
import { 
  SmartAlert, 
  AlertPreferences, 
  UserAlertContext,
  useSmartAlerts,
  AlertDeliveryService 
} from '../services/smart-alerts'
import { Button } from '@schengen/ui'
import { 
  Bell, 
  BellRing, 
  Settings, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Monitor
} from 'lucide-react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

interface SmartAlertsPanelProps {
  userStatus: UserStatus
  trips: SchengenTrip[]
  upcomingTrips: SchengenTrip[]
  userEmail?: string
  className?: string
}

interface AlertsSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  preferences: AlertPreferences
  onSave: (preferences: AlertPreferences) => void
}

function AlertsSettingsModal({ isOpen, onClose, preferences, onSave }: AlertsSettingsModalProps) {
  const [localPreferences, setLocalPreferences] = useState<AlertPreferences>(preferences)

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  const handleSave = () => {
    onSave(localPreferences)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Alert Preferences
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Delivery Methods */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Delivery Methods</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.email}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    email: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Mail className="w-4 h-4 ml-2 mr-1 text-gray-500" />
                <span className="text-sm text-gray-700">Email notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.push}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    push: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Smartphone className="w-4 h-4 ml-2 mr-1 text-gray-500" />
                <span className="text-sm text-gray-700">Push notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.inApp}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    inApp: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Monitor className="w-4 h-4 ml-2 mr-1 text-gray-500" />
                <span className="text-sm text-gray-700">In-app alerts</span>
              </label>
            </div>
          </div>

          {/* Alert Categories */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Alert Types</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.categories.complianceWarnings}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    categories: {
                      ...prev.categories,
                      complianceWarnings: e.target.checked
                    }
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Compliance warnings</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.categories.optimizationTips}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    categories: {
                      ...prev.categories,
                      optimizationTips: e.target.checked
                    }
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Optimization tips</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.categories.tripReminders}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    categories: {
                      ...prev.categories,
                      tripReminders: e.target.checked
                    }
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Trip reminders</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localPreferences.categories.resetNotifications}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    categories: {
                      ...prev.categories,
                      resetNotifications: e.target.checked
                    }
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Reset notifications</span>
              </label>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Frequency</h4>
            <select
              value={localPreferences.frequency}
              onChange={(e) => setLocalPreferences(prev => ({
                ...prev,
                frequency: e.target.value as AlertPreferences['frequency']
              }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="immediate">Immediate</option>
              <option value="daily">Daily digest</option>
              <option value="weekly">Weekly summary</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}

function AlertCard({ alert, onDismiss, onAction }: { 
  alert: SmartAlert
  onDismiss: () => void
  onAction?: () => void 
}) {
  const getSeverityIcon = () => {
    switch (alert.severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'medium':
        return <Info className="w-5 h-5 text-blue-500" />
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const getSeverityStyles = () => {
    switch (alert.severity) {
      case 'critical':
        return 'border-red-200 bg-red-50'
      case 'high':
        return 'border-orange-200 bg-orange-50'
      case 'medium':
        return 'border-blue-200 bg-blue-50'
      case 'low':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`border rounded-lg p-4 ${getSeverityStyles()}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {getSeverityIcon()}
          <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {format(alert.triggerDate, 'MMM dd, HH:mm')}
          </span>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{alert.message}</p>

      {alert.metadata && (
        <div className="space-y-1 mb-3">
          {alert.metadata.daysUntilLimit !== undefined && (
            <div className="text-xs text-gray-600">
              Days remaining: <span className="font-medium">{alert.metadata.daysUntilLimit}</span>
            </div>
          )}
          {alert.metadata.nextResetDate && (
            <div className="text-xs text-gray-600">
              Next reset: <span className="font-medium">
                {format(alert.metadata.nextResetDate, 'MMM dd, yyyy')}
              </span>
            </div>
          )}
          {alert.metadata.suggestedExitDate && (
            <div className="text-xs text-gray-600">
              Suggested exit: <span className="font-medium">
                {format(alert.metadata.suggestedExitDate, 'MMM dd, yyyy')}
              </span>
            </div>
          )}
        </div>
      )}

      {alert.actionRequired && (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onAction}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
          >
            Take Action
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDismiss}
            className="text-xs"
          >
            Dismiss
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export function SmartAlertsPanel({ 
  userStatus, 
  trips, 
  upcomingTrips, 
  userEmail, 
  className = '' 
}: SmartAlertsPanelProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<AlertPreferences>({
    email: true,
    push: true,
    inApp: true,
    frequency: 'immediate',
    categories: {
      complianceWarnings: true,
      optimizationTips: true,
      tripReminders: true,
      resetNotifications: true
    }
  })

  // Only show for premium users
  if (userStatus === UserStatus.FREE) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <BellRing className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-blue-900 mb-2">Smart Travel Alerts</h3>
          <p className="text-sm text-blue-800 mb-3">
            Get proactive notifications about compliance limits, trip optimization, and travel reminders.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
            Upgrade to Premium
          </Button>
        </div>
      </div>
    )
  }

  const alertContext: UserAlertContext = {
    userStatus,
    trips,
    upcomingTrips,
    email: userEmail,
    preferences
  }

  const { alerts, loading, generateAlerts, sendAlert, dismissAlert } = useSmartAlerts(alertContext)

  useEffect(() => {
    generateAlerts()
  }, [generateAlerts])

  // Request notification permissions
  useEffect(() => {
    if (preferences.push && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [preferences.push])

  const handleSavePreferences = (newPreferences: AlertPreferences) => {
    setPreferences(newPreferences)
    // In production, save to database
    console.log('Saving alert preferences:', newPreferences)
  }

  const handleSendAlert = async (alert: SmartAlert) => {
    const results = await sendAlert(alert)
    console.log('Alert sent:', { alert: alert.title, results })
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellRing className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Smart Travel Alerts</h3>
          {alerts.length > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {alerts.length}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(true)}
          className="text-xs"
        >
          <Settings className="w-4 h-4 mr-1" />
          Settings
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        <AnimatePresence>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Analyzing your travel pattern...</p>
            </div>
          ) : alerts.length > 0 ? (
            alerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={() => dismissAlert(alert.id)}
                onAction={() => handleSendAlert(alert)}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-900 mb-1">All Clear!</h4>
              <p className="text-sm text-green-700">
                No alerts at this time. Your travel pattern looks compliant.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Features Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Premium Smart Alerts Active
            </h4>
            <p className="text-xs text-blue-700">
              You'll receive proactive notifications about compliance limits, trip optimization opportunities, 
              and important travel reminders via your preferred channels.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AlertsSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        preferences={preferences}
        onSave={handleSavePreferences}
      />
    </div>
  )
}