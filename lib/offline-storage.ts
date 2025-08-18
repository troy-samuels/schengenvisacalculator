import { syncHelpers } from './sync-queue'

export interface StoredData {
  id: string
  type: 'trip' | 'user-settings' | 'notification-settings' | 'calculation' | 'profile'
  data: any
  timestamp: number
  synced: boolean
  lastModified: number
}

export interface OfflineStorageOptions {
  autoSync?: boolean
  syncOnReconnect?: boolean
  maxStorageSize?: number // in MB
  retentionDays?: number
}

export class OfflineStorage {
  private static instance: OfflineStorage
  private dbName = 'schengen-calculator-offline'
  private version = 1
  private db: IDBDatabase | null = null
  private options: OfflineStorageOptions

  static getInstance(options: OfflineStorageOptions = {}): OfflineStorage {
    if (!OfflineStorage.instance) {
      OfflineStorage.instance = new OfflineStorage(options)
    }
    return OfflineStorage.instance
  }

  private constructor(options: OfflineStorageOptions) {
    this.options = {
      autoSync: true,
      syncOnReconnect: true,
      maxStorageSize: 50, // 50MB default
      retentionDays: 30,
      ...options
    }
    this.initDatabase()
  }

  // Initialize IndexedDB
  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        console.error('Offline Storage: Failed to open database')
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        console.log('Offline Storage: Database initialized')
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains('data')) {
          const dataStore = db.createObjectStore('data', { keyPath: 'id' })
          dataStore.createIndex('type', 'type', { unique: false })
          dataStore.createIndex('synced', 'synced', { unique: false })
          dataStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' })
        }
      }
    })
  }

  // Store data offline
  async store(type: StoredData['type'], data: any, id?: string): Promise<string> {
    await this.ensureDatabase()
    
    const storedData: StoredData = {
      id: id || this.generateId(type),
      type,
      data,
      timestamp: Date.now(),
      synced: false,
      lastModified: Date.now()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readwrite')
      const store = transaction.objectStore('data')
      const request = store.put(storedData)

      request.onsuccess = () => {
        console.log(`Offline Storage: Stored ${type} data:`, storedData.id)
        
        // Auto-sync if enabled and online
        if (this.options.autoSync && navigator.onLine) {
          this.syncItem(storedData)
        }
        
        resolve(storedData.id)
      }

      request.onerror = () => {
        console.error(`Offline Storage: Failed to store ${type} data`)
        reject(request.error)
      }
    })
  }

  // Retrieve data by ID
  async get(id: string): Promise<StoredData | null> {
    await this.ensureDatabase()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readonly')
      const store = transaction.objectStore('data')
      const request = store.get(id)

      request.onsuccess = () => {
        resolve(request.result || null)
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to get data:', id)
        reject(request.error)
      }
    })
  }

  // Get all data by type
  async getByType(type: StoredData['type']): Promise<StoredData[]> {
    await this.ensureDatabase()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readonly')
      const store = transaction.objectStore('data')
      const index = store.index('type')
      const request = index.getAll(type)

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to get data by type:', type)
        reject(request.error)
      }
    })
  }

  // Get unsynced data
  async getUnsyncedData(): Promise<StoredData[]> {
    await this.ensureDatabase()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readonly')
      const store = transaction.objectStore('data')
      const index = store.index('synced')
      const request = index.getAll(false)

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to get unsynced data')
        reject(request.error)
      }
    })
  }

  // Update data
  async update(id: string, newData: any): Promise<boolean> {
    await this.ensureDatabase()

    const existing = await this.get(id)
    if (!existing) return false

    const updatedData: StoredData = {
      ...existing,
      data: newData,
      lastModified: Date.now(),
      synced: false
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readwrite')
      const store = transaction.objectStore('data')
      const request = store.put(updatedData)

      request.onsuccess = () => {
        console.log('Offline Storage: Updated data:', id)
        
        // Auto-sync if enabled and online
        if (this.options.autoSync && navigator.onLine) {
          this.syncItem(updatedData)
        }
        
        resolve(true)
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to update data:', id)
        reject(request.error)
      }
    })
  }

  // Delete data
  async delete(id: string): Promise<boolean> {
    await this.ensureDatabase()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readwrite')
      const store = transaction.objectStore('data')
      const request = store.delete(id)

      request.onsuccess = () => {
        console.log('Offline Storage: Deleted data:', id)
        resolve(true)
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to delete data:', id)
        reject(request.error)
      }
    })
  }

  // Mark item as synced
  async markAsSynced(id: string): Promise<boolean> {
    await this.ensureDatabase()

    const existing = await this.get(id)
    if (!existing) return false

    const syncedData: StoredData = {
      ...existing,
      synced: true
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readwrite')
      const store = transaction.objectStore('data')
      const request = store.put(syncedData)

      request.onsuccess = () => {
        console.log('Offline Storage: Marked as synced:', id)
        resolve(true)
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to mark as synced:', id)
        reject(request.error)
      }
    })
  }

  // Sync individual item
  private async syncItem(item: StoredData): Promise<void> {
    try {
      let syncId: string

      switch (item.type) {
        case 'trip':
          syncId = await syncHelpers.addTrip(item.data)
          break
        case 'user-settings':
          syncId = await syncHelpers.addUserSettings(item.data)
          break
        case 'notification-settings':
          syncId = await syncHelpers.addNotificationSettings(item.data)
          break
        case 'calculation':
          syncId = await syncHelpers.addCalculation(item.data)
          break
        default:
          console.warn('Offline Storage: Unknown sync type:', item.type)
          return
      }

      console.log(`Offline Storage: Queued ${item.type} for sync:`, syncId)
    } catch (error) {
      console.error('Offline Storage: Failed to sync item:', error)
    }
  }

  // Sync all unsynced data
  async syncAll(): Promise<void> {
    try {
      const unsyncedData = await this.getUnsyncedData()
      console.log(`Offline Storage: Syncing ${unsyncedData.length} items`)

      for (const item of unsyncedData) {
        await this.syncItem(item)
      }
    } catch (error) {
      console.error('Offline Storage: Failed to sync all data:', error)
    }
  }

  // Clean up old data
  async cleanup(): Promise<void> {
    try {
      const retentionMs = this.options.retentionDays! * 24 * 60 * 60 * 1000
      const cutoff = Date.now() - retentionMs

      await this.ensureDatabase()

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(['data'], 'readwrite')
        const store = transaction.objectStore('data')
        const index = store.index('timestamp')
        const request = index.openCursor(IDBKeyRange.upperBound(cutoff))

        let deletedCount = 0

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result
          if (cursor) {
            const data: StoredData = cursor.value
            // Only delete synced data that's old
            if (data.synced) {
              cursor.delete()
              deletedCount++
            }
            cursor.continue()
          } else {
            console.log(`Offline Storage: Cleaned up ${deletedCount} old items`)
            resolve()
          }
        }

        request.onerror = () => {
          console.error('Offline Storage: Cleanup failed')
          reject(request.error)
        }
      })
    } catch (error) {
      console.error('Offline Storage: Cleanup error:', error)
    }
  }

  // Get storage usage stats
  async getStorageStats(): Promise<{ used: number; available: number; itemCount: number }> {
    try {
      await this.ensureDatabase()

      const itemCount = await new Promise<number>((resolve, reject) => {
        const transaction = this.db!.transaction(['data'], 'readonly')
        const store = transaction.objectStore('data')
        const request = store.count()

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })

      // Estimate storage usage (rough approximation)
      const estimate = await navigator.storage?.estimate() || { usage: 0, quota: 0 }
      const used = Math.round((estimate.usage || 0) / 1024 / 1024 * 100) / 100 // MB
      const available = Math.round((estimate.quota || 0) / 1024 / 1024 * 100) / 100 // MB

      return { used, available, itemCount }
    } catch (error) {
      console.error('Offline Storage: Failed to get storage stats:', error)
      return { used: 0, available: 0, itemCount: 0 }
    }
  }

  // Clear all data
  async clear(): Promise<void> {
    await this.ensureDatabase()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['data'], 'readwrite')
      const store = transaction.objectStore('data')
      const request = store.clear()

      request.onsuccess = () => {
        console.log('Offline Storage: Cleared all data')
        resolve()
      }

      request.onerror = () => {
        console.error('Offline Storage: Failed to clear data')
        reject(request.error)
      }
    })
  }

  // Utility functions
  private async ensureDatabase(): Promise<void> {
    if (!this.db) {
      await this.initDatabase()
    }
  }

  private generateId(type: string): string {
    return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Convenience functions for common operations
export const offlineStorage = OfflineStorage.getInstance()

export const storageHelpers = {
  // Store trip data
  storeTrip: async (tripData: any, id?: string): Promise<string> => {
    return offlineStorage.store('trip', tripData, id)
  },

  // Store user settings
  storeUserSettings: async (settings: any): Promise<string> => {
    return offlineStorage.store('user-settings', settings)
  },

  // Store notification settings
  storeNotificationSettings: async (settings: any): Promise<string> => {
    return offlineStorage.store('notification-settings', settings)
  },

  // Store calculation result
  storeCalculation: async (calculation: any): Promise<string> => {
    return offlineStorage.store('calculation', calculation)
  },

  // Get all trips
  getTrips: async (): Promise<any[]> => {
    const stored = await offlineStorage.getByType('trip')
    return stored.map(item => ({ id: item.id, ...item.data }))
  },

  // Get user settings
  getUserSettings: async (): Promise<any | null> => {
    const stored = await offlineStorage.getByType('user-settings')
    return stored.length > 0 ? stored[stored.length - 1].data : null
  },

  // Get notification settings
  getNotificationSettings: async (): Promise<any | null> => {
    const stored = await offlineStorage.getByType('notification-settings')
    return stored.length > 0 ? stored[stored.length - 1].data : null
  }
}