export interface SyncQueueItem {
  id: string
  type: 'trip' | 'user-settings' | 'notification-settings' | 'calculation' | 'general'
  data: any
  url: string
  method: 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  timestamp: number
  retryCount: number
  maxRetries: number
  priority: 'high' | 'normal' | 'low'
}

export interface SyncResult {
  success: boolean
  item: SyncQueueItem
  error?: string
  response?: any
}

export class BackgroundSyncQueue {
  private static instance: BackgroundSyncQueue
  private queue: SyncQueueItem[] = []
  private isOnline: boolean = navigator.onLine
  private listeners: ((event: SyncEvent) => void)[] = []

  static getInstance(): BackgroundSyncQueue {
    if (!BackgroundSyncQueue.instance) {
      BackgroundSyncQueue.instance = new BackgroundSyncQueue()
    }
    return BackgroundSyncQueue.instance
  }

  private constructor() {
    this.loadQueue()
    this.setupEventListeners()
  }

  // Add item to sync queue
  async add(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>): Promise<string> {
    const queueItem: SyncQueueItem = {
      ...item,
      id: this.generateId(),
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: item.maxRetries || 3
    }

    this.queue.push(queueItem)
    await this.saveQueue()
    
    this.notifyListeners({ type: 'item-added', item: queueItem })

    // Try to process immediately if online
    if (this.isOnline) {
      this.processQueue()
    } else {
      // Register for background sync
      this.registerBackgroundSync(queueItem.type)
    }

    return queueItem.id
  }

  // Remove item from queue
  async remove(id: string): Promise<boolean> {
    const index = this.queue.findIndex(item => item.id === id)
    if (index === -1) return false

    const [removedItem] = this.queue.splice(index, 1)
    await this.saveQueue()
    
    this.notifyListeners({ type: 'item-removed', item: removedItem })
    return true
  }

  // Get all items in queue
  getQueue(): SyncQueueItem[] {
    return [...this.queue]
  }

  // Get items by type
  getByType(type: SyncQueueItem['type']): SyncQueueItem[] {
    return this.queue.filter(item => item.type === type)
  }

  // Get pending items (not yet processed or failed with retries remaining)
  getPendingItems(): SyncQueueItem[] {
    return this.queue.filter(item => item.retryCount < item.maxRetries)
  }

  // Get failed items (exceeded max retries)
  getFailedItems(): SyncQueueItem[] {
    return this.queue.filter(item => item.retryCount >= item.maxRetries)
  }

  // Clear all items
  async clear(): Promise<void> {
    const oldQueue = [...this.queue]
    this.queue = []
    await this.saveQueue()
    
    this.notifyListeners({ type: 'queue-cleared', items: oldQueue })
  }

  // Clear items by type
  async clearByType(type: SyncQueueItem['type']): Promise<void> {
    const removedItems = this.queue.filter(item => item.type === type)
    this.queue = this.queue.filter(item => item.type !== type)
    await this.saveQueue()
    
    this.notifyListeners({ type: 'type-cleared', items: removedItems })
  }

  // Process the entire queue
  async processQueue(): Promise<SyncResult[]> {
    if (!this.isOnline) {
      console.log('Sync Queue: Offline, skipping queue processing')
      return []
    }

    const pendingItems = this.getPendingItems()
    if (pendingItems.length === 0) {
      console.log('Sync Queue: No pending items to process')
      return []
    }

    console.log(`Sync Queue: Processing ${pendingItems.length} items`)

    // Sort by priority and timestamp
    const sortedItems = pendingItems.sort((a, b) => {
      const priorityOrder = { high: 3, normal: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      return priorityDiff !== 0 ? priorityDiff : a.timestamp - b.timestamp
    })

    const results: SyncResult[] = []

    for (const item of sortedItems) {
      try {
        const result = await this.processItem(item)
        results.push(result)

        if (result.success) {
          await this.remove(item.id)
          this.notifyListeners({ type: 'item-synced', item, result })
        } else {
          item.retryCount++
          if (item.retryCount >= item.maxRetries) {
            this.notifyListeners({ type: 'item-failed', item, error: result.error })
          }
          await this.saveQueue()
        }
      } catch (error) {
        console.error('Sync Queue: Error processing item:', item.id, error)
        item.retryCount++
        if (item.retryCount >= item.maxRetries) {
          this.notifyListeners({ type: 'item-failed', item, error: String(error) })
        }
        await this.saveQueue()
        results.push({ success: false, item, error: String(error) })
      }
    }

    this.notifyListeners({ type: 'queue-processed', results })
    return results
  }

  // Process a single item
  private async processItem(item: SyncQueueItem): Promise<SyncResult> {
    try {
      console.log(`Sync Queue: Processing ${item.type} item:`, item.id)

      const response = await fetch(item.url, {
        method: item.method,
        headers: {
          'Content-Type': 'application/json',
          ...item.headers
        },
        body: JSON.stringify(item.data)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(`Sync Queue: Successfully synced ${item.type}:`, item.id)
        return { success: true, item, response: responseData }
      } else {
        const error = `HTTP ${response.status}: ${response.statusText}`
        console.warn(`Sync Queue: Failed to sync ${item.type}:`, item.id, error)
        return { success: false, item, error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`Sync Queue: Network error syncing ${item.type}:`, item.id, errorMessage)
      return { success: false, item, error: errorMessage }
    }
  }

  // Setup event listeners
  private setupEventListeners(): void {
    // Online/offline detection
    window.addEventListener('online', () => {
      console.log('Sync Queue: Back online, processing queue')
      this.isOnline = true
      this.processQueue()
    })

    window.addEventListener('offline', () => {
      console.log('Sync Queue: Gone offline')
      this.isOnline = false
    })

    // Listen to service worker messages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'background-sync') {
          this.handleBackgroundSyncMessage(event.data)
        }
      })
    }
  }

  // Handle background sync messages from service worker
  private handleBackgroundSyncMessage(data: any): void {
    switch (data.message) {
      case 'sync-complete':
        this.notifyListeners({ type: 'background-sync-complete' })
        break
      case 'sync-error':
        this.notifyListeners({ type: 'background-sync-error', error: data.error })
        break
    }
  }

  // Register background sync with service worker
  private async registerBackgroundSync(type: string): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready
        await registration.sync.register(`${type}-sync`)
        console.log(`Sync Queue: Registered background sync for ${type}`)
      } catch (error) {
        console.error('Sync Queue: Failed to register background sync:', error)
      }
    }
  }

  // Save queue to localStorage
  private async saveQueue(): Promise<void> {
    try {
      localStorage.setItem('schengen-sync-queue', JSON.stringify(this.queue))
    } catch (error) {
      console.error('Sync Queue: Failed to save queue:', error)
    }
  }

  // Load queue from localStorage
  private loadQueue(): void {
    try {
      const saved = localStorage.getItem('schengen-sync-queue')
      if (saved) {
        this.queue = JSON.parse(saved)
        console.log(`Sync Queue: Loaded ${this.queue.length} items from storage`)
      }
    } catch (error) {
      console.error('Sync Queue: Failed to load queue:', error)
      this.queue = []
    }
  }

  // Generate unique ID
  private generateId(): string {
    return `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Event listener management
  addEventListener(listener: (event: SyncEvent) => void): void {
    this.listeners.push(listener)
  }

  removeEventListener(listener: (event: SyncEvent) => void): void {
    const index = this.listeners.indexOf(listener)
    if (index !== -1) {
      this.listeners.splice(index, 1)
    }
  }

  private notifyListeners(event: SyncEvent): void {
    this.listeners.forEach(listener => {
      try {
        listener(event)
      } catch (error) {
        console.error('Sync Queue: Error in event listener:', error)
      }
    })
  }
}

// Event types for sync queue
export type SyncEvent = 
  | { type: 'item-added'; item: SyncQueueItem }
  | { type: 'item-removed'; item: SyncQueueItem }
  | { type: 'item-synced'; item: SyncQueueItem; result: SyncResult }
  | { type: 'item-failed'; item: SyncQueueItem; error?: string }
  | { type: 'queue-cleared'; items: SyncQueueItem[] }
  | { type: 'type-cleared'; items: SyncQueueItem[] }
  | { type: 'queue-processed'; results: SyncResult[] }
  | { type: 'background-sync-complete' }
  | { type: 'background-sync-error'; error?: string }

// Helper functions for common sync operations
export const syncHelpers = {
  // Add trip data to sync queue
  addTrip: async (tripData: any): Promise<string> => {
    const queue = BackgroundSyncQueue.getInstance()
    return queue.add({
      type: 'trip',
      data: tripData,
      url: '/api/trips/sync',
      method: 'POST',
      priority: 'normal',
      maxRetries: 3
    })
  },

  // Add user settings to sync queue
  addUserSettings: async (settingsData: any): Promise<string> => {
    const queue = BackgroundSyncQueue.getInstance()
    return queue.add({
      type: 'user-settings',
      data: settingsData,
      url: '/api/user/settings',
      method: 'POST',
      priority: 'normal',
      maxRetries: 3
    })
  },

  // Add notification settings to sync queue
  addNotificationSettings: async (notificationData: any): Promise<string> => {
    const queue = BackgroundSyncQueue.getInstance()
    return queue.add({
      type: 'notification-settings',
      data: notificationData,
      url: '/api/user/notification-settings',
      method: 'POST',
      priority: 'high',
      maxRetries: 5
    })
  },

  // Add calculation to sync queue
  addCalculation: async (calculationData: any): Promise<string> => {
    const queue = BackgroundSyncQueue.getInstance()
    return queue.add({
      type: 'calculation',
      data: calculationData,
      url: '/api/calculations/sync',
      method: 'POST',
      priority: 'low',
      maxRetries: 2
    })
  }
}

// Export singleton instance
export const syncQueue = BackgroundSyncQueue.getInstance()