'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  WifiOff, 
  Wifi, 
  Database, 
  X, 
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw
} from 'lucide-react'
import { syncQueue } from '@/lib/sync-queue'

export interface OfflineIndicatorProps {
  className?: string
  position?: 'top' | 'bottom' | 'inline'
  showSyncCount?: boolean
}

export function OfflineIndicator({ 
  className = '', 
  position = 'top',
  showSyncCount = true 
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isVisible, setIsVisible] = useState(!navigator.onLine)
  const [pendingCount, setPendingCount] = useState(0)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setIsVisible(false)
      setIsDismissed(false)
      setIsRetrying(false)
      
      // Show brief success message
      setTimeout(() => {
        setIsVisible(true)
        setTimeout(() => setIsVisible(false), 3000)
      }, 100)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setIsVisible(true)
      setIsDismissed(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Update pending count
    const updatePendingCount = () => {
      const queue = syncQueue.getPendingItems()
      setPendingCount(queue.length)
    }

    updatePendingCount()
    const interval = setInterval(updatePendingCount, 5000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handleRetry = async () => {
    setIsRetrying(true)
    
    try {
      // Try to reconnect by making a simple request
      const response = await fetch('/api/health', {
        method: 'GET',
        cache: 'no-cache'
      })
      
      if (response.ok) {
        setIsOnline(true)
        setIsVisible(false)
      }
    } catch (error) {
      console.log('Still offline:', error)
    } finally {
      setIsRetrying(false)
    }
  }

  if (!isVisible || isDismissed) {
    return null
  }

  const positionClasses = {
    top: 'fixed top-4 left-4 right-4 z-50',
    bottom: 'fixed bottom-4 left-4 right-4 z-50',
    inline: 'relative'
  }

  const alertContent = isOnline ? (
    // Back online message
    <Alert className={`${positionClasses[position]} ${className} border-green-500 bg-green-50 dark:bg-green-950/50`}>
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-green-800 dark:text-green-200">
            Back online!
          </span>
          {pendingCount > 0 && showSyncCount && (
            <Badge variant="outline" className="text-green-700 border-green-300">
              Syncing {pendingCount} items
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
        >
          <X className="h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  ) : (
    // Offline message
    <Alert className={`${positionClasses[position]} ${className} border-yellow-500 bg-yellow-50 dark:bg-yellow-950/50`}>
      <WifiOff className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-yellow-800 dark:text-yellow-200">
              You're offline
            </span>
            {pendingCount > 0 && showSyncCount && (
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                <Clock className="h-3 w-3 mr-1" />
                {pendingCount} pending
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-yellow-700 dark:text-yellow-300">
            <Database className="h-3 w-3" />
            <span>Data saved locally and will sync when reconnected</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
            className="h-8 px-2 text-yellow-600 hover:text-yellow-800"
          >
            <RefreshCw className={`h-3 w-3 ${isRetrying ? 'animate-spin' : ''}`} />
            <span className="ml-1 hidden sm:inline">Retry</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 text-yellow-600 hover:text-yellow-800"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )

  return alertContent
}

// Compact version for use in headers/toolbars
export function OfflineIndicatorCompact({ className = '' }: { className?: string }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Update pending count
    const updatePendingCount = () => {
      const queue = syncQueue.getPendingItems()
      setPendingCount(queue.length)
    }

    updatePendingCount()
    const interval = setInterval(updatePendingCount, 10000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  if (isOnline && pendingCount === 0) {
    return null
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {!isOnline && (
        <Badge variant="destructive" className="flex items-center space-x-1">
          <WifiOff className="h-3 w-3" />
          <span>Offline</span>
        </Badge>
      )}
      
      {pendingCount > 0 && (
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{pendingCount} pending</span>
        </Badge>
      )}
    </div>
  )
}

// Hook for accessing offline state in other components
export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingCount, setPendingCount] = useState(0)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Update pending count and sync time
    const updateStatus = () => {
      const queue = syncQueue.getPendingItems()
      setPendingCount(queue.length)

      const lastSync = localStorage.getItem('schengen-last-sync')
      if (lastSync) {
        setLastSyncTime(new Date(parseInt(lastSync)))
      }
    }

    updateStatus()
    const interval = setInterval(updateStatus, 5000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  return {
    isOnline,
    pendingCount,
    lastSyncTime,
    hasUnsyncedData: pendingCount > 0
  }
}