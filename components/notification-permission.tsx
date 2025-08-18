'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Bell, BellOff, Settings, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface NotificationPermissionProps {
  onPermissionChange?: (granted: boolean) => void
}

export function NotificationPermission({ onPermissionChange }: NotificationPermissionProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isRequesting, setIsRequesting] = useState(false)
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Check notification support and current permission
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
      checkPushSubscription()
    }
  }, [])

  const checkPushSubscription = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.getSubscription()
        setPushSubscription(subscription)
      } catch (error) {
        console.error('Error checking push subscription:', error)
      }
    }
  }

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications')
      return
    }

    setIsRequesting(true)

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      
      if (permission === 'granted') {
        await setupPushSubscription()
        onPermissionChange?.(true)
        
        // Show test notification
        new Notification('Schengen Calculator Notifications Enabled!', {
          body: 'You\'ll now receive trip reminders and compliance alerts',
          icon: '/images/visa-calculator-logo.png',
          tag: 'permission-granted'
        })
      } else {
        onPermissionChange?.(false)
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    } finally {
      setIsRequesting(false)
    }
  }

  const setupPushSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push messaging is not supported')
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready
      
      // Check if already subscribed
      let subscription = await registration.pushManager.getSubscription()
      
      if (!subscription) {
        // Create new subscription
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 
          'BEl62iUYgUivxIkv69yViEuiBIa40HI4YOu1uNiQAqCeHPASpjQFVA2MmL7LGCNiOy1uUULO6gQYE4K2YqFQ8cQ' // Demo key
        
        const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey)
        
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
      }
      
      setPushSubscription(subscription)
      
      // Send subscription to server for storage
      await saveSubscriptionToServer(subscription)
      
    } catch (error) {
      console.error('Error setting up push subscription:', error)
    }
  }

  const saveSubscriptionToServer = async (subscription: PushSubscription) => {
    try {
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          timestamp: Date.now()
        })
      })
      
      if (response.ok) {
        console.log('Push subscription saved to server')
      }
    } catch (error) {
      console.error('Error saving subscription to server:', error)
    }
  }

  const disableNotifications = async () => {
    if (pushSubscription) {
      try {
        await pushSubscription.unsubscribe()
        setPushSubscription(null)
        
        // Notify server to remove subscription
        await fetch('/api/notifications/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        onPermissionChange?.(false)
      } catch (error) {
        console.error('Error unsubscribing from notifications:', error)
      }
    }
  }

  const sendTestNotification = async () => {
    if (permission === 'granted') {
      try {
        // Send test notification via service worker
        const registration = await navigator.serviceWorker.ready
        registration.showNotification('Test Schengen Reminder', {
          body: '✈️ This is how your trip reminders will look',
          icon: '/images/visa-calculator-logo.png',
          badge: '/images/visa-calculator-logo.png',
          actions: [
            { action: 'view', title: '👁️ View App' },
            { action: 'dismiss', title: '❌ Dismiss' }
          ],
          data: { type: 'test', url: '/dashboard' }
        })
      } catch (error) {
        console.error('Error sending test notification:', error)
      }
    }
  }

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { icon: CheckCircle, color: 'text-green-600', text: 'Enabled', variant: 'default' as const }
      case 'denied':
        return { icon: XCircle, color: 'text-red-600', text: 'Blocked', variant: 'destructive' as const }
      default:
        return { icon: AlertCircle, color: 'text-yellow-600', text: 'Not Set', variant: 'secondary' as const }
    }
  }

  const status = getPermissionStatus()
  const StatusIcon = status.icon

  if (!('Notification' in window)) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BellOff className="h-5 w-5" />
            <span>Notifications Not Supported</span>
          </CardTitle>
          <CardDescription>
            Your browser doesn't support push notifications
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Trip Notifications</span>
          </div>
          <Badge variant={status.variant} className="flex items-center space-x-1">
            <StatusIcon className="h-3 w-3" />
            <span>{status.text}</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Get reminded about trip departures, returns, and visa compliance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {permission === 'default' && (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>🛫 <strong>Departure reminders</strong> - Never miss your trip</p>
              <p>🏠 <strong>Return alerts</strong> - Stay within visa limits</p>
              <p>⚠️ <strong>Compliance warnings</strong> - Avoid overstay penalties</p>
              <p>🔄 <strong>Window resets</strong> - Know when you can travel again</p>
            </div>
            
            <Button 
              onClick={requestNotificationPermission} 
              disabled={isRequesting}
              className="w-full"
            >
              {isRequesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Requesting Permission...
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Enable Notifications
                </>
              )}
            </Button>
          </div>
        )}

        {permission === 'granted' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Push Notifications</span>
              <Switch 
                checked={!!pushSubscription} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setupPushSubscription()
                  } else {
                    disableNotifications()
                  }
                }}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={sendTestNotification}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Test Notification
              </Button>
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="ghost"
                size="sm"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            {showDetails && (
              <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                <div>Status: {pushSubscription ? 'Active' : 'Inactive'}</div>
                <div>Endpoint: {pushSubscription?.endpoint ? 'Configured' : 'None'}</div>
              </div>
            )}
          </div>
        )}

        {permission === 'denied' && (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <p>Notifications are blocked. To enable:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Click the lock icon in your browser's address bar</li>
                <li>Select "Allow" for notifications</li>
                <li>Refresh this page</li>
              </ol>
            </div>
            
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Refresh Page
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}