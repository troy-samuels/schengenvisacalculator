'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Database,
  Cloud,
  HardDrive
} from 'lucide-react'
import { syncQueue, BackgroundSyncQueue, SyncEvent } from '@/lib/sync-queue'
import { offlineStorage } from '@/lib/offline-storage'

export interface SyncStatusProps {
  className?: string
  showDetails?: boolean
  compact?: boolean
}

export function SyncStatus({ className = '', showDetails = false, compact = false }: SyncStatusProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [queueItems, setQueueItems] = useState(0)
  const [unsyncedItems, setUnsyncedItems] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [storageStats, setStorageStats] = useState({ used: 0, available: 0, itemCount: 0 })
  const [syncEvents, setSyncEvents] = useState<string[]>([])

  useEffect(() => {
    updateStatus()
    setupEventListeners()

    // Update status every 30 seconds
    const interval = setInterval(updateStatus, 30000)

    return () => {
      clearInterval(interval)
      cleanup()
    }
  }, [])

  const updateStatus = async () => {
    try {
      // Update queue info
      const queue = BackgroundSyncQueue.getInstance()
      const pendingItems = queue.getPendingItems()
      setQueueItems(pendingItems.length)

      // Update offline storage info
      const unsynced = await offlineStorage.getUnsyncedData()
      setUnsyncedItems(unsynced.length)

      // Update storage stats
      const stats = await offlineStorage.getStorageStats()
      setStorageStats(stats)

      // Update last sync from localStorage
      const lastSyncTime = localStorage.getItem('schengen-last-sync')
      if (lastSyncTime) {
        setLastSync(new Date(parseInt(lastSyncTime)))
      }
    } catch (error) {
      console.error('Error updating sync status:', error)
    }
  }

  const setupEventListeners = () => {
    // Online/offline detection
    const handleOnline = () => {
      setIsOnline(true)
      addSyncEvent('📡 Connected to internet')
    }

    const handleOffline = () => {
      setIsOnline(false)
      addSyncEvent('📡 Lost internet connection')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Sync queue events
    const handleSyncEvent = (event: SyncEvent) => {
      switch (event.type) {
        case 'item-added':
          setQueueItems(prev => prev + 1)
          addSyncEvent(`📥 Queued ${event.item.type} for sync`)
          break
        case 'item-synced':
          setQueueItems(prev => Math.max(0, prev - 1))
          addSyncEvent(`✅ Synced ${event.item.type} successfully`)
          setLastSync(new Date())
          localStorage.setItem('schengen-last-sync', Date.now().toString())
          break
        case 'item-failed':
          addSyncEvent(`❌ Failed to sync ${event.item.type}: ${event.error}`)
          break
        case 'queue-processed':
          setIsProcessing(false)
          addSyncEvent(`🔄 Sync batch completed (${event.results.length} items)`)
          break
        case 'background-sync-complete':
          addSyncEvent('🎉 Background sync completed')
          break
        case 'background-sync-error':
          addSyncEvent(`⚠️ Background sync error: ${event.error}`)
          break
      }
      updateStatus()
    }

    const queue = BackgroundSyncQueue.getInstance()
    queue.addEventListener(handleSyncEvent)

    return { handleOnline, handleOffline, handleSyncEvent }
  }

  const cleanup = () => {
    window.removeEventListener('online', () => {})
    window.removeEventListener('offline', () => {})
  }

  const addSyncEvent = (message: string) => {
    setSyncEvents(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9) // Keep last 10 events
    ])
  }

  const handleManualSync = async () => {
    setIsProcessing(true)
    addSyncEvent('🔄 Manual sync initiated')

    try {
      const queue = BackgroundSyncQueue.getInstance()
      await queue.processQueue()
      await offlineStorage.syncAll()
    } catch (error) {
      console.error('Manual sync failed:', error)
      addSyncEvent(`❌ Manual sync failed: ${error}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const getConnectionStatus = () => {
    return {
      icon: isOnline ? Wifi : WifiOff,
      color: isOnline ? 'text-green-600' : 'text-red-600',
      text: isOnline ? 'Online' : 'Offline',
      variant: isOnline ? 'default' : 'destructive' as const
    }
  }

  const getSyncStatus = () => {
    const totalItems = queueItems + unsyncedItems
    
    if (!isOnline && totalItems > 0) {
      return {
        icon: Clock,
        color: 'text-yellow-600',
        text: `${totalItems} Pending`,
        variant: 'secondary' as const
      }
    } else if (totalItems > 0) {
      return {
        icon: RefreshCw,
        color: 'text-blue-600',
        text: isProcessing ? 'Syncing...' : `${totalItems} To Sync`,
        variant: 'outline' as const
      }
    } else {
      return {
        icon: CheckCircle,
        color: 'text-green-600',
        text: 'All Synced',
        variant: 'default' as const
      }
    }
  }

  const connectionStatus = getConnectionStatus()
  const syncStatus = getSyncStatus()
  const ConnectionIcon = connectionStatus.icon
  const SyncIcon = syncStatus.icon

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Badge variant={connectionStatus.variant} className="flex items-center space-x-1">
          <ConnectionIcon className="h-3 w-3" />
          <span>{connectionStatus.text}</span>
        </Badge>
        <Badge variant={syncStatus.variant} className="flex items-center space-x-1">
          <SyncIcon className={`h-3 w-3 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{syncStatus.text}</span>
        </Badge>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Sync Status</span>
            </CardTitle>
            <CardDescription>
              Data synchronization and offline storage
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={connectionStatus.variant} className="flex items-center space-x-1">
              <ConnectionIcon className="h-3 w-3" />
              <span>{connectionStatus.text}</span>
            </Badge>
            <Badge variant={syncStatus.variant} className="flex items-center space-x-1">
              <SyncIcon className={`h-3 w-3 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{syncStatus.text}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Sync Progress */}
        {(queueItems > 0 || unsyncedItems > 0) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Sync Progress</span>
              <span>{queueItems + unsyncedItems} items remaining</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        )}

        {/* Storage Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <HardDrive className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-medium">{storageStats.itemCount} Items</div>
              <div className="text-muted-foreground">Stored offline</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <div>
              <div className="font-medium">{storageStats.used}MB Used</div>
              <div className="text-muted-foreground">of {storageStats.available}MB</div>
            </div>
          </div>
        </div>

        {/* Last Sync */}
        {lastSync && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Last sync:</span>
            <span>{lastSync.toLocaleString()}</span>
          </div>
        )}

        {/* Manual Sync Button */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleManualSync}
            disabled={!isOnline || isProcessing}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>Manual Sync</span>
          </Button>
          
          {!isOnline && (
            <div className="flex items-center space-x-1 text-sm text-yellow-600">
              <AlertCircle className="h-4 w-4" />
              <span>Will sync when online</span>
            </div>
          )}
        </div>

        {/* Sync Events (if details enabled) */}
        {showDetails && syncEvents.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Recent Activity</div>
            <div className="bg-muted p-3 rounded-lg text-xs max-h-32 overflow-y-auto space-y-1">
              {syncEvents.map((event, index) => (
                <div key={index} className="text-muted-foreground">
                  {event}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}