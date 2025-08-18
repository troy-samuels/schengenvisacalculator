'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Bell, 
  BellRing, 
  Calendar, 
  Clock, 
  X, 
  Eye, 
  Trash2,
  Settings,
  TestTube,
  Plane,
  Home,
  AlertTriangle,
  RotateCcw,
  FileText
} from 'lucide-react'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { TripNotificationScheduler, NotificationSchedule, Trip } from '@/lib/services/trip-notifications'
import { NotificationSettingsPanel } from './notification-settings'

interface NotificationManagerProps {
  trips?: Trip[]
  onNotificationUpdate?: (notifications: NotificationSchedule[]) => void
}

export function NotificationManager({ trips = [], onNotificationUpdate }: NotificationManagerProps) {
  const [scheduler, setScheduler] = useState<TripNotificationScheduler | null>(null)
  const [pendingNotifications, setPendingNotifications] = useState<NotificationSchedule[]>([])
  const [upcomingNotifications, setUpcomingNotifications] = useState<NotificationSchedule[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [loading, setLoading] = useState(false)

  // Initialize scheduler with trips
  useEffect(() => {
    const newScheduler = new TripNotificationScheduler(trips)
    setScheduler(newScheduler)
    updateNotifications(newScheduler)
  }, [trips])

  const updateNotifications = (currentScheduler: TripNotificationScheduler) => {
    const pending = currentScheduler.getPendingSchedules()
    const upcoming = currentScheduler.getUpcomingSchedules()
    
    setPendingNotifications(pending)
    setUpcomingNotifications(upcoming)
    onNotificationUpdate?.([...pending, ...upcoming])
  }

  const handleDismissNotification = (scheduleId: string) => {
    if (!scheduler) return

    scheduler.markAsDismissed(scheduleId)
    updateNotifications(scheduler)
  }

  const handleMarkAsSent = (scheduleId: string) => {
    if (!scheduler) return

    scheduler.markAsSent(scheduleId)
    updateNotifications(scheduler)
  }

  const sendTestNotification = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '🧪 Test Notification',
          body: 'This is a test notification from your Schengen Calculator',
          type: 'departure_reminder',
          urgency: 'normal'
        })
      })

      if (response.ok) {
        // Show browser notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('🧪 Test Notification', {
            body: 'This is a test notification from your Schengen Calculator',
            icon: '/images/visa-calculator-logo.png',
            tag: 'test-notification'
          })
        }
      }
    } catch (error) {
      console.error('Error sending test notification:', error)
    } finally {
      setLoading(false)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'departure_reminder': return Plane
      case 'return_reminder': return Home
      case 'compliance_warning': return AlertTriangle
      case 'overstay_alert': return AlertTriangle
      case 'window_reset': return RotateCcw
      case 'document_reminder': return FileText
      default: return Bell
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const NotificationCard = ({ notification, isPending = false }: { notification: NotificationSchedule, isPending?: boolean }) => {
    const Icon = getNotificationIcon(notification.type)
    const urgencyClass = getUrgencyColor(notification.urgency)
    const isOverdue = isPast(notification.scheduledFor)

    return (
      <Card className={`${urgencyClass} border-l-4`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon className={`h-5 w-5 mt-0.5 ${notification.urgency === 'high' ? 'text-red-600' : 'text-current'}`} />
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">{notification.title}</CardTitle>
                <CardDescription className="text-xs">
                  {notification.body}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant={notification.urgency === 'high' ? 'destructive' : 'outline'} className="text-xs">
                {notification.urgency}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismissNotification(notification.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>
                  {isPending && isOverdue ? 'Overdue' : format(notification.scheduledFor, 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(notification.scheduledFor, { addSuffix: !isPending })}
                </span>
              </div>
            </div>
            {isPending && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAsSent(notification.id)}
                className="h-6 px-2 text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                Mark Read
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showSettings) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notification Settings</h2>
          <Button
            variant="outline"
            onClick={() => setShowSettings(false)}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Back to Manager</span>
          </Button>
        </div>
        <NotificationSettingsPanel />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <BellRing className="h-5 w-5" />
            <span>Notification Manager</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your trip reminders and compliance alerts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={sendTestNotification}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <TestTube className="h-4 w-4" />
            <span>Test</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSettings(true)}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{pendingNotifications.length}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{upcomingNotifications.length}</div>
                <div className="text-xs text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{trips.length}</div>
                <div className="text-xs text-muted-foreground">Active Trips</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Notifications */}
      {pendingNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Pending Notifications ({pendingNotifications.length})</span>
            </CardTitle>
            <CardDescription>
              Notifications that are ready to be sent or are overdue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {pendingNotifications.map(notification => (
                  <NotificationCard 
                    key={notification.id} 
                    notification={notification} 
                    isPending={true}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Notifications */}
      {upcomingNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Upcoming Notifications ({upcomingNotifications.length})</span>
            </CardTitle>
            <CardDescription>
              Scheduled notifications for your future trips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {upcomingNotifications.slice(0, 10).map(notification => (
                  <NotificationCard 
                    key={notification.id} 
                    notification={notification} 
                  />
                ))}
                {upcomingNotifications.length > 10 && (
                  <div className="text-center text-sm text-muted-foreground pt-2">
                    and {upcomingNotifications.length - 10} more notifications...
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {pendingNotifications.length === 0 && upcomingNotifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Notifications Scheduled</h3>
            <p className="text-muted-foreground mb-4">
              {trips.length === 0 
                ? "Add some trips to start receiving travel reminders"
                : "Your notifications will appear here once they're scheduled"
              }
            </p>
            <Button
              variant="outline"
              onClick={sendTestNotification}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <TestTube className="h-4 w-4" />
              <span>Send Test Notification</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}