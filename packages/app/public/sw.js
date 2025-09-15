/**
 * Service Worker for ETIAS Calculator PWA
 * Handles push notifications, offline functionality, and caching
 * Part of premium smart alerts system
 */

const CACHE_NAME = 'etias-calculator-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
]

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell')
        return cache.addAll(urlsToCache)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        
        // Clone the request
        const fetchRequest = event.request.clone()
        
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          
          // Clone the response
          const responseToCache = response.clone()
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
          
          return response
        }).catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html')
          }
        })
      })
  )
})

// Push notification event
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push Received.')
  
  if (!event.data) {
    return
  }
  
  const data = event.data.json()
  const options = {
    body: data.message,
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    tag: data.tag || 'etias-alert',
    requireInteraction: data.actionRequired || false,
    timestamp: Date.now(),
    data: {
      url: data.url || '/',
      alertId: data.alertId,
      type: data.type
    },
    actions: data.actionRequired ? [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icon-72.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icon-72.png'
      }
    ] : undefined
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification click Received.')
  
  const notification = event.notification
  const action = event.action
  
  if (action === 'dismiss') {
    notification.close()
    return
  }
  
  // Default action or 'view' action
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      
      // Open new window/tab
      if (clients.openWindow) {
        return clients.openWindow(notification.data.url || '/')
      }
    })
  )
  
  notification.close()
})

// Background sync for offline alert queue
self.addEventListener('sync', (event) => {
  if (event.tag === 'alert-sync') {
    console.log('[ServiceWorker] Background sync: alert-sync')
    
    event.waitUntil(
      // Process queued alerts when back online
      processQueuedAlerts()
    )
  }
})

// Periodic background sync for premium alert checks
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'alert-check') {
    console.log('[ServiceWorker] Periodic sync: alert-check')
    
    event.waitUntil(
      // Check for new alerts (premium feature)
      checkForNewAlerts()
    )
  }
})

// Helper functions
async function processQueuedAlerts() {
  try {
    // Get queued alerts from IndexedDB
    const queuedAlerts = await getQueuedAlerts()
    
    for (const alert of queuedAlerts) {
      try {
        // Send alert to server
        const response = await fetch('/api/alerts/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(alert)
        })
        
        if (response.ok) {
          // Remove from queue
          await removeFromQueue(alert.id)
        }
      } catch (error) {
        console.error('[ServiceWorker] Failed to send queued alert:', error)
      }
    }
  } catch (error) {
    console.error('[ServiceWorker] Failed to process queued alerts:', error)
  }
}

async function checkForNewAlerts() {
  try {
    // Fetch latest user data and check for new alerts
    const response = await fetch('/api/alerts/check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const { alerts } = await response.json()
      
      // Show notifications for new high-priority alerts
      for (const alert of alerts) {
        if (alert.severity === 'high' || alert.severity === 'critical') {
          await self.registration.showNotification(alert.title, {
            body: alert.message,
            icon: '/icon-192.png',
            badge: '/icon-72.png',
            tag: alert.id,
            requireInteraction: alert.actionRequired,
            data: {
              alertId: alert.id,
              type: alert.type,
              url: '/'
            }
          })
        }
      }
    }
  } catch (error) {
    console.error('[ServiceWorker] Failed to check for new alerts:', error)
  }
}

// IndexedDB helpers for offline queue
async function getQueuedAlerts() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('EtiasAlertQueue', 1)
    
    request.onerror = () => reject(request.error)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['alerts'], 'readonly')
      const store = transaction.objectStore('alerts')
      const getAll = store.getAll()
      
      getAll.onsuccess = () => resolve(getAll.result)
      getAll.onerror = () => reject(getAll.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      const store = db.createObjectStore('alerts', { keyPath: 'id' })
      store.createIndex('timestamp', 'timestamp', { unique: false })
    }
  })
}

async function removeFromQueue(alertId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('EtiasAlertQueue', 1)
    
    request.onerror = () => reject(request.error)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['alerts'], 'readwrite')
      const store = transaction.objectStore('alerts')
      const deleteReq = store.delete(alertId)
      
      deleteReq.onsuccess = () => resolve()
      deleteReq.onerror = () => reject(deleteReq.error)
    }
  })
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting()
        break
        
      case 'QUEUE_ALERT':
        // Queue alert for later sending when online
        queueAlert(event.data.alert)
        break
        
      case 'REGISTER_PERIODIC_SYNC':
        // Register periodic background sync for premium users
        if (event.data.userStatus === 'premium') {
          self.registration.periodicSync?.register('alert-check', {
            minInterval: 24 * 60 * 60 * 1000 // 24 hours
          })
        }
        break
        
      default:
        console.log('[ServiceWorker] Unknown message type:', event.data.type)
    }
  }
})

async function queueAlert(alert) {
  try {
    const request = indexedDB.open('EtiasAlertQueue', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['alerts'], 'readwrite')
      const store = transaction.objectStore('alerts')
      
      store.add({
        ...alert,
        timestamp: Date.now(),
        queued: true
      })
    }
  } catch (error) {
    console.error('[ServiceWorker] Failed to queue alert:', error)
  }
}