'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Bell, 
  Plane, 
  Home, 
  AlertTriangle, 
  RotateCcw, 
  FileText, 
  Volume2, 
  VolumeX,
  Clock,
  Save,
  Settings2
} from 'lucide-react'

export interface NotificationSettings {
  enabled: boolean
  types: {
    departureReminders: boolean
    returnReminders: boolean
    complianceWarnings: boolean
    overstayAlerts: boolean
    windowResets: boolean
    documentReminders: boolean
  }
  timing: {
    departureNotice: '1' | '3' | '7' | '14' // days before
    returnNotice: '1' | '3' | '7' // days before  
    complianceCheck: 'daily' | 'weekly' | 'monthly'
  }
  quiet: {
    enabled: boolean
    startHour: number
    endHour: number
  }
  sound: boolean
  vibration: boolean
}

const defaultSettings: NotificationSettings = {
  enabled: false,
  types: {
    departureReminders: true,
    returnReminders: true,
    complianceWarnings: true,
    overstayAlerts: true,
    windowResets: true,
    documentReminders: true
  },
  timing: {
    departureNotice: '7',
    returnNotice: '3',
    complianceCheck: 'weekly'
  },
  quiet: {
    enabled: false,
    startHour: 22,
    endHour: 8
  },
  sound: true,
  vibration: true
}

interface NotificationSettingsProps {
  onSettingsChange?: (settings: NotificationSettings) => void
}

export function NotificationSettingsPanel({ onSettingsChange }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('schengen-notification-settings')
      if (stored) {
        const parsedSettings = JSON.parse(stored)
        setSettings({ ...defaultSettings, ...parsedSettings })
      }
    } catch (error) {
      console.error('Error loading notification settings:', error)
    }
  }, [])

  const updateSettings = (updates: Partial<NotificationSettings>) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    setHasChanges(true)
  }

  const updateNestedSettings = (section: keyof NotificationSettings, updates: any) => {
    const newSettings = {
      ...settings,
      [section]: { ...settings[section], ...updates }
    }
    setSettings(newSettings)
    setHasChanges(true)
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      // Save to localStorage
      localStorage.setItem('schengen-notification-settings', JSON.stringify(settings))
      
      // Save to server if user is authenticated
      try {
        await fetch('/api/user/notification-settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings)
        })
      } catch (serverError) {
        console.warn('Could not save to server, saved locally:', serverError)
      }
      
      onSettingsChange?.(settings)
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const notificationTypes = [
    {
      key: 'departureReminders' as const,
      icon: Plane,
      title: 'Departure Reminders',
      description: 'Get notified before your trips start',
      color: 'text-blue-600'
    },
    {
      key: 'returnReminders' as const,
      icon: Home,
      title: 'Return Reminders',
      description: 'Stay aware of your return dates',
      color: 'text-green-600'
    },
    {
      key: 'complianceWarnings' as const,
      icon: AlertTriangle,
      title: 'Compliance Warnings',
      description: 'Alerts when approaching visa limits',
      color: 'text-yellow-600'
    },
    {
      key: 'overstayAlerts' as const,
      icon: AlertTriangle,
      title: 'Overstay Alerts',
      description: 'Critical alerts for potential overstays',
      color: 'text-red-600'
    },
    {
      key: 'windowResets' as const,
      icon: RotateCcw,
      title: 'Window Resets',
      description: 'Know when your 180-day window resets',
      color: 'text-purple-600'
    },
    {
      key: 'documentReminders' as const,
      icon: FileText,
      title: 'Document Reminders',
      description: 'Check passports and travel documents',
      color: 'text-gray-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSettings({ enabled: checked })}
            />
          </CardTitle>
          <CardDescription>
            Configure how and when you receive trip reminders and compliance alerts
          </CardDescription>
        </CardHeader>
      </Card>

      {settings.enabled && (
        <>
          {/* Notification Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings2 className="h-5 w-5" />
                <span>Notification Types</span>
              </CardTitle>
              <CardDescription>
                Choose which types of notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div key={type.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${type.color}`} />
                      <div>
                        <div className="font-medium">{type.title}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                    </div>
                    <Switch
                      checked={settings.types[type.key]}
                      onCheckedChange={(checked) =>
                        updateNestedSettings('types', { [type.key]: checked })
                      }
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Timing Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Timing Preferences</span>
              </CardTitle>
              <CardDescription>
                Customize when you receive different types of notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departure Notice</label>
                  <Select
                    value={settings.timing.departureNotice}
                    onValueChange={(value: '1' | '3' | '7' | '14') =>
                      updateNestedSettings('timing', { departureNotice: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="7">1 week before</SelectItem>
                      <SelectItem value="14">2 weeks before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Return Notice</label>
                  <Select
                    value={settings.timing.returnNotice}
                    onValueChange={(value: '1' | '3' | '7') =>
                      updateNestedSettings('timing', { returnNotice: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="7">1 week before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Compliance Checks</label>
                  <Select
                    value={settings.timing.complianceCheck}
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') =>
                      updateNestedSettings('timing', { complianceCheck: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <VolumeX className="h-5 w-5" />
                  <span>Quiet Hours</span>
                </div>
                <Switch
                  checked={settings.quiet.enabled}
                  onCheckedChange={(checked) =>
                    updateNestedSettings('quiet', { enabled: checked })
                  }
                />
              </CardTitle>
              <CardDescription>
                Silence notifications during specific hours
              </CardDescription>
            </CardHeader>
            {settings.quiet.enabled && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Time</label>
                    <Select
                      value={settings.quiet.startHour.toString()}
                      onValueChange={(value) =>
                        updateNestedSettings('quiet', { startHour: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Time</label>
                    <Select
                      value={settings.quiet.endHour.toString()}
                      onValueChange={(value) =>
                        updateNestedSettings('quiet', { endHour: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Notifications will be silenced from{' '}
                  {settings.quiet.startHour.toString().padStart(2, '0')}:00 to{' '}
                  {settings.quiet.endHour.toString().padStart(2, '0')}:00
                  {settings.quiet.startHour > settings.quiet.endHour && ' (next day)'}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Sound & Vibration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <span>Sound & Vibration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Sound</div>
                  <div className="text-sm text-muted-foreground">Play notification sounds</div>
                </div>
                <Switch
                  checked={settings.sound}
                  onCheckedChange={(checked) => updateSettings({ sound: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Vibration</div>
                  <div className="text-sm text-muted-foreground">Vibrate on mobile devices</div>
                </div>
                <Switch
                  checked={settings.vibration}
                  onCheckedChange={(checked) => updateSettings({ vibration: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {hasChanges && (
            <div className="flex justify-end">
              <Button onClick={saveSettings} disabled={saving} className="w-full sm:w-auto">
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}