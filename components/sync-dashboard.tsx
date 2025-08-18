'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  RefreshCw, 
  Trash2, 
  Settings, 
  Activity, 
  Database,
  Cloud,
  HardDrive,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Wifi,
  WifiOff,
  Download,
  Upload
} from 'lucide-react'
import { SyncStatus } from './sync-status'
import { OfflineIndicator, useOfflineStatus } from './offline-indicator'
import { syncQueue, BackgroundSyncQueue, SyncQueueItem } from '@/lib/sync-queue'
import { offlineStorage, StoredData } from '@/lib/offline-storage'

export interface SyncDashboardProps {
  className?: string
}

export function SyncDashboard({ className = '' }: SyncDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [queueItems, setQueueItems] = useState<SyncQueueItem[]>([])
  const [offlineData, setOfflineData] = useState<StoredData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [storageStats, setStorageStats] = useState({ used: 0, available: 0, itemCount: 0 })
  const offlineStatus = useOfflineStatus()

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      // Load queue items
      const queue = BackgroundSyncQueue.getInstance()
      const items = queue.getQueue()
      setQueueItems(items)

      // Load offline data
      const stored = await offlineStorage.getUnsyncedData()
      setOfflineData(stored)

      // Load storage stats
      const stats = await offlineStorage.getStorageStats()
      setStorageStats(stats)
    } catch (error) {
      console.error('Error loading sync data:', error)
    }
  }

  const handleSyncAll = async () => {
    setIsProcessing(true)
    try {
      const queue = BackgroundSyncQueue.getInstance()
      await queue.processQueue()
      await offlineStorage.syncAll()
      await loadData()
    } catch (error) {
      console.error('Sync all failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClearQueue = async () => {
    try {
      const queue = BackgroundSyncQueue.getInstance()
      await queue.clear()
      await loadData()
    } catch (error) {
      console.error('Clear queue failed:', error)
    }
  }

  const handleClearOfflineData = async () => {
    try {
      await offlineStorage.clear()
      await loadData()
    } catch (error) {
      console.error('Clear offline data failed:', error)
    }
  }

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'trip': return '✈️'
      case 'user-settings': return '⚙️'
      case 'notification-settings': return '🔔'
      case 'calculation': return '📊'
      default: return '📄'
    }
  }

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'trip': return 'text-blue-600'
      case 'user-settings': return 'text-purple-600'
      case 'notification-settings': return 'text-yellow-600'
      case 'calculation': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const getRetryBadge = (item: SyncQueueItem) => {
    if (item.retryCount === 0) return null
    
    const variant = item.retryCount >= item.maxRetries ? 'destructive' : 'secondary'
    return (
      <Badge variant={variant} className="text-xs">
        {item.retryCount}/{item.maxRetries} retries
      </Badge>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Offline Indicator */}
      <OfflineIndicator position="inline" />

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="queue" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Queue ({queueItems.length})</span>
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center space-x-2">
            <HardDrive className="h-4 w-4" />
            <span>Offline ({offlineData.length})</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  {offlineStatus.isOnline ? (
                    <>
                      <Wifi className="h-5 w-5 text-green-600" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-5 w-5 text-red-600" />
                      <span>Offline</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {offlineStatus.isOnline 
                    ? 'Data will sync automatically' 
                    : 'Data will sync when connection is restored'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {offlineStatus.lastSyncTime && (
                  <div className="text-sm text-muted-foreground">
                    Last sync: {offlineStatus.lastSyncTime.toLocaleString()}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Button
                    onClick={handleSyncAll}
                    disabled={!offlineStatus.isOnline || isProcessing}
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>Sync Now</span>
                  </Button>
                  
                  {offlineStatus.hasUnsyncedData && (
                    <Badge variant="secondary">
                      {offlineStatus.pendingCount} items pending
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Storage Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Storage</span>
                </CardTitle>
                <CardDescription>
                  Local data storage usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{storageStats.itemCount}</div>
                    <div className="text-sm text-muted-foreground">Items stored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{storageStats.used}MB</div>
                    <div className="text-sm text-muted-foreground">Space used</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {storageStats.available}MB available total
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sync Status Component */}
          <SyncStatus showDetails={true} />
        </TabsContent>

        {/* Sync Queue Tab */}
        <TabsContent value="queue" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Sync Queue</h3>
              <p className="text-sm text-muted-foreground">
                Items waiting to be synchronized with the server
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleSyncAll}
                disabled={!offlineStatus.isOnline || isProcessing || queueItems.length === 0}
                variant="default"
                size="sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                Sync All
              </Button>
              <Button
                onClick={handleClearQueue}
                disabled={queueItems.length === 0}
                variant="outline"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {queueItems.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {queueItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getItemTypeIcon(item.type)}</span>
                          <div>
                            <div className={`font-medium ${getItemTypeColor(item.type)}`}>
                              {item.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.method} {item.url}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Created: {formatTimestamp(item.timestamp)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={
                            item.priority === 'high' ? 'border-red-500 text-red-700' :
                            item.priority === 'normal' ? 'border-blue-500 text-blue-700' :
                            'border-gray-500 text-gray-700'
                          }>
                            {item.priority}
                          </Badge>
                          {getRetryBadge(item)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Queue is Empty</h3>
                <p className="text-muted-foreground">
                  All items have been synchronized with the server
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Offline Data Tab */}
        <TabsContent value="offline" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Offline Data</h3>
              <p className="text-sm text-muted-foreground">
                Data stored locally that hasn't been synchronized yet
              </p>
            </div>
            <Button
              onClick={handleClearOfflineData}
              disabled={offlineData.length === 0}
              variant="outline"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          {offlineData.length > 0 ? (
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {offlineData.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getItemTypeIcon(item.type)}</span>
                          <div>
                            <div className={`font-medium ${getItemTypeColor(item.type)}`}>
                              {item.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {item.id}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Modified: {formatTimestamp(item.lastModified)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {item.synced ? (
                            <Badge variant="default" className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3" />
                              <span>Synced</span>
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Pending</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <HardDrive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Offline Data</h3>
                <p className="text-muted-foreground">
                  All your data is up to date with the server
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>
                Configure how background synchronization works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Background sync settings are configured automatically based on your connection and device capabilities.
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Auto Sync</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically sync when online
                    </div>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Background Sync</div>
                    <div className="text-sm text-muted-foreground">
                      Sync when app is in background
                    </div>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Offline Storage</div>
                    <div className="text-sm text-muted-foreground">
                      Store data locally when offline
                    </div>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}