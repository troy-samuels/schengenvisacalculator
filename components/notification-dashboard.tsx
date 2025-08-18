'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Bell, 
  Settings, 
  Activity, 
  Users, 
  Smartphone,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { NotificationPermission } from './notification-permission'
import { NotificationSettingsPanel } from './notification-settings'
import { NotificationManager } from './notification-manager'
import { MobileInstallPrompt } from './mobile-install-prompt'
import { Trip, NotificationSchedule } from '@/lib/services/trip-notifications'

interface NotificationDashboardProps {
  trips?: Trip[]
  className?: string
}

export function NotificationDashboard({ trips = [], className = '' }: NotificationDashboardProps) {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')
  const [pushSupported, setPushSupported] = useState(false)
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false)
  const [activeNotifications, setActiveNotifications] = useState<NotificationSchedule[]>([])

  useEffect(() => {
    // Check notification support
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
      setPushSupported('serviceWorker' in navigator && 'PushManager' in window)
    }

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => setServiceWorkerReady(true))
        .catch(() => setServiceWorkerReady(false))
    }
  }, [])

  const getPermissionStatus = () => {
    switch (notificationPermission) {
      case 'granted':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bgColor: 'bg-green-50',
          text: 'Notifications Enabled',
          description: 'You\'ll receive trip reminders and alerts'
        }
      case 'denied':
        return { 
          icon: XCircle, 
          color: 'text-red-600', 
          bgColor: 'bg-red-50',
          text: 'Notifications Blocked',
          description: 'Enable in browser settings to receive alerts'
        }
      default:
        return { 
          icon: AlertCircle, 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-50',
          text: 'Notifications Not Set',
          description: 'Enable notifications to get travel reminders'
        }
    }
  }

  const status = getPermissionStatus()
  const StatusIcon = status.icon

  const systemInfo = [
    {
      label: 'Browser Support',
      value: 'Notification' in window ? 'Yes' : 'No',
      status: 'Notification' in window ? 'success' : 'error'
    },
    {
      label: 'Push Support',
      value: pushSupported ? 'Yes' : 'No',
      status: pushSupported ? 'success' : 'error'
    },
    {
      label: 'Service Worker',
      value: serviceWorkerReady ? 'Ready' : 'Not Ready',
      status: serviceWorkerReady ? 'success' : 'warning'
    },
    {
      label: 'Permission',
      value: notificationPermission.charAt(0).toUpperCase() + notificationPermission.slice(1),
      status: notificationPermission === 'granted' ? 'success' : 
              notificationPermission === 'denied' ? 'error' : 'warning'
    }
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'success': return 'default'
      case 'error': return 'destructive'
      case 'warning': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Card */}
      <Card className={status.bgColor}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <StatusIcon className={`h-6 w-6 ${status.color}`} />
              <div>
                <CardTitle className="text-lg">{status.text}</CardTitle>
                <CardDescription className={`${status.color}`}>
                  {status.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>{activeNotifications.length} Active</span>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="manager" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manager" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Manager</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Setup</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        {/* Notification Manager */}
        <TabsContent value="manager" className="space-y-4">
          <NotificationManager 
            trips={trips}
            onNotificationUpdate={setActiveNotifications}
          />
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <NotificationSettingsPanel />
          </div>
        </TabsContent>

        {/* Permissions & Setup */}
        <TabsContent value="permissions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Browser Notifications</h3>
              <NotificationPermission 
                onPermissionChange={(granted) => {
                  setNotificationPermission(granted ? 'granted' : 'denied')
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Mobile Installation</h3>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5" />
                    <span>Install as App</span>
                  </CardTitle>
                  <CardDescription>
                    Install the Schengen Calculator as a mobile app for the best experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Works offline</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Push notifications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Home screen shortcut</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    The installation prompt will appear automatically when available
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* System Status */}
        <TabsContent value="system" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {systemInfo.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{item.label}</div>
                      <Badge variant={getStatusBadgeVariant(item.status)}>
                        {item.value}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* API Status */}
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Status of notification-related API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">POST /api/notifications/subscribe</code>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">POST /api/notifications/unsubscribe</code>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">POST /api/user/notification-settings</code>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">POST /api/notifications/send</code>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Debug Info */}
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>User Agent: {navigator.userAgent.substring(0, 80)}...</div>
                <div>Platform: {navigator.platform}</div>
                <div>Online: {navigator.onLine ? 'Yes' : 'No'}</div>
                <div>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
                <div>Language: {navigator.language}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mobile Install Prompt (appears when appropriate) */}
      <MobileInstallPrompt />
    </div>
  )
}