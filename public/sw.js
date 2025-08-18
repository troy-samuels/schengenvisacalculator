const CACHE_NAME = 'schengen-calculator-v1';
const STATIC_CACHE_NAME = 'schengen-static-v1';
const DYNAMIC_CACHE_NAME = 'schengen-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/dashboard',
  '/legal-disclaimer',
  '/privacy-policy',
  '/terms-and-conditions',
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main-app.js',
  '/images/visa-calculator-logo.png',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache static files', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle POST/PUT/DELETE requests that might need background sync
  if (['POST', 'PUT', 'DELETE'].includes(request.method) && url.pathname.startsWith('/api/')) {
    event.respondWith(handleSyncableRequest(request));
    return;
  }

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then(fetchResponse => {
              // Cache successful responses
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(DYNAMIC_CACHE_NAME)
                  .then(cache => {
                    cache.put(request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch(() => {
              // Return offline page or cached home page
              return caches.match('/') || new Response(
                `<!DOCTYPE html>
                <html>
                  <head>
                    <title>Schengen Calculator - Offline</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                      body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        max-width: 600px; 
                        margin: 50px auto; 
                        padding: 20px; 
                        text-align: center;
                        background: #f8fafc;
                      }
                      .container {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                      }
                      h1 { color: #1e40af; margin-bottom: 20px; }
                      p { color: #64748b; line-height: 1.6; margin-bottom: 15px; }
                      .icon { font-size: 48px; margin-bottom: 20px; }
                      button {
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 16px;
                        margin-top: 20px;
                      }
                      button:hover { background: #2563eb; }
                      .sync-status {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        color: #92400e;
                        padding: 12px;
                        border-radius: 6px;
                        margin: 20px 0;
                        font-size: 14px;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="icon">🛜</div>
                      <h1>You're Offline</h1>
                      <p>The Schengen visa calculator is currently unavailable because you're not connected to the internet.</p>
                      <div class="sync-status" id="syncStatus">
                        📋 Any data you save will automatically sync when you're back online
                      </div>
                      <p>The calculator works entirely in your browser, so once you're back online, you can continue using all features.</p>
                      <button onclick="location.reload()">Try Again</button>
                    </div>
                    <script>
                      // Listen for sync completion
                      if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.addEventListener('message', event => {
                          if (event.data.type === 'background-sync') {
                            const syncStatus = document.getElementById('syncStatus');
                            if (event.data.message === 'sync-complete') {
                              syncStatus.innerHTML = '✅ Data synchronized successfully!';
                              syncStatus.style.background = '#d1fae5';
                              syncStatus.style.borderColor = '#10b981';
                              syncStatus.style.color = '#047857';
                            } else if (event.data.message === 'sync-error') {
                              syncStatus.innerHTML = '❌ Sync failed: ' + (event.data.error || 'Unknown error');
                              syncStatus.style.background = '#fee2e2';
                              syncStatus.style.borderColor = '#ef4444';
                              syncStatus.style.color = '#dc2626';
                            }
                          }
                        });
                      }
                    </script>
                  </body>
                </html>`,
                {
                  headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                  },
                }
              );
            });
        })
    );
    return;
  }

  // Handle static assets (CSS, JS, images)
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/images/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg')) {
    
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then(fetchResponse => {
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then(cache => {
                    cache.put(request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch(() => {
              console.log('Service Worker: Failed to fetch', request.url);
              return new Response('Resource not available offline', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return new Response(
            JSON.stringify({
              error: 'API not available offline',
              message: 'This feature requires an internet connection'
            }),
            {
              status: 503,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        })
    );
    return;
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME)
            .then(cache => {
              cache.put(request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Handle background sync for data updates when back online
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync event triggered:', event.tag);
  
  switch (event.tag) {
    case 'trip-data-sync':
      event.waitUntil(syncTripData());
      break;
    case 'user-settings-sync':
      event.waitUntil(syncUserSettings());
      break;
    case 'notification-settings-sync':
      event.waitUntil(syncNotificationSettings());
      break;
    case 'offline-calculations-sync':
      event.waitUntil(syncOfflineCalculations());
      break;
    case 'background-sync':
      event.waitUntil(doBackgroundSync());
      break;
    default:
      console.log('Service Worker: Unknown sync tag:', event.tag);
  }
});

// Main background sync handler
async function doBackgroundSync() {
  console.log('Service Worker: Performing comprehensive background sync');
  
  const syncPromises = [
    syncTripData(),
    syncUserSettings(),
    syncNotificationSettings(),
    syncOfflineCalculations()
  ];
  
  try {
    await Promise.allSettled(syncPromises);
    console.log('Service Worker: All background sync operations completed');
    
    // Notify clients about sync completion
    await notifyClients({ type: 'sync-complete' });
    
  } catch (error) {
    console.error('Service Worker: Background sync error:', error);
    await notifyClients({ type: 'sync-error', error: error.message });
  }
}

// Sync trip data
async function syncTripData() {
  try {
    console.log('Service Worker: Syncing trip data');
    
    const pendingTrips = await getPendingData('trips');
    if (!pendingTrips || pendingTrips.length === 0) {
      console.log('Service Worker: No pending trip data to sync');
      return;
    }
    
    for (const tripData of pendingTrips) {
      try {
        const response = await fetch('/api/trips/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tripData)
        });
        
        if (response.ok) {
          await removePendingData('trips', tripData.id);
          console.log('Service Worker: Trip data synced:', tripData.id);
        } else {
          console.warn('Service Worker: Trip sync failed:', response.status);
        }
      } catch (error) {
        console.error('Service Worker: Error syncing trip:', tripData.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Trip data sync failed:', error);
    throw error;
  }
}

// Sync user settings
async function syncUserSettings() {
  try {
    console.log('Service Worker: Syncing user settings');
    
    const pendingSettings = await getPendingData('user-settings');
    if (!pendingSettings || pendingSettings.length === 0) {
      console.log('Service Worker: No pending user settings to sync');
      return;
    }
    
    for (const settingsData of pendingSettings) {
      try {
        const response = await fetch('/api/user/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settingsData.data)
        });
        
        if (response.ok) {
          await removePendingData('user-settings', settingsData.id);
          console.log('Service Worker: User settings synced');
        }
      } catch (error) {
        console.error('Service Worker: Error syncing user settings:', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: User settings sync failed:', error);
    throw error;
  }
}

// Sync notification settings
async function syncNotificationSettings() {
  try {
    console.log('Service Worker: Syncing notification settings');
    
    const pendingNotifications = await getPendingData('notification-settings');
    if (!pendingNotifications || pendingNotifications.length === 0) {
      console.log('Service Worker: No pending notification settings to sync');
      return;
    }
    
    for (const notificationData of pendingNotifications) {
      try {
        const response = await fetch('/api/user/notification-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notificationData.data)
        });
        
        if (response.ok) {
          await removePendingData('notification-settings', notificationData.id);
          console.log('Service Worker: Notification settings synced');
        }
      } catch (error) {
        console.error('Service Worker: Error syncing notification settings:', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Notification settings sync failed:', error);
    throw error;
  }
}

// Sync offline calculations
async function syncOfflineCalculations() {
  try {
    console.log('Service Worker: Syncing offline calculations');
    
    const pendingCalculations = await getPendingData('calculations');
    if (!pendingCalculations || pendingCalculations.length === 0) {
      console.log('Service Worker: No pending calculations to sync');
      return;
    }
    
    for (const calcData of pendingCalculations) {
      try {
        const response = await fetch('/api/calculations/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(calcData)
        });
        
        if (response.ok) {
          await removePendingData('calculations', calcData.id);
          console.log('Service Worker: Calculation synced:', calcData.id);
        }
      } catch (error) {
        console.error('Service Worker: Error syncing calculation:', calcData.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Calculation sync failed:', error);
    throw error;
  }
}

// Handle push notifications for trip reminders
self.addEventListener('push', event => {
  console.log('Push notification received:', event);
  
  let notificationData = {
    title: 'Schengen Visa Reminder',
    body: 'You have a travel reminder',
    type: 'general'
  };

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const { type, title, body, tripData, urgency = 'normal' } = notificationData;

  // Create notification options based on reminder type
  let options = {
    body: body,
    icon: '/images/visa-calculator-logo.png',
    badge: '/images/visa-calculator-logo.png',
    tag: `schengen-${type}-${Date.now()}`,
    requireInteraction: urgency === 'high',
    silent: urgency === 'low',
    timestamp: Date.now(),
    data: {
      type,
      tripData,
      url: '/'
    }
  };

  // Customize notification based on reminder type
  switch (type) {
    case 'departure_reminder':
      options.body = `🛫 Trip departure reminder: ${body}`;
      options.actions = [
        { action: 'view_trip', title: '📅 View Trip', icon: '/images/visa-calculator-logo.png' },
        { action: 'check_compliance', title: '✅ Check Status', icon: '/images/visa-calculator-logo.png' }
      ];
      options.data.url = '/dashboard';
      break;

    case 'return_reminder':
      options.body = `🏠 Trip return reminder: ${body}`;
      options.actions = [
        { action: 'view_trip', title: '📅 View Trip', icon: '/images/visa-calculator-logo.png' },
        { action: 'extend_stay', title: '⏰ Extend Stay', icon: '/images/visa-calculator-logo.png' }
      ];
      options.data.url = '/dashboard';
      break;

    case 'compliance_warning':
      options.body = `⚠️ Visa compliance alert: ${body}`;
      options.requireInteraction = true;
      options.actions = [
        { action: 'check_status', title: '🔍 Check Status', icon: '/images/visa-calculator-logo.png' },
        { action: 'view_legal', title: '📋 Legal Info', icon: '/images/visa-calculator-logo.png' }
      ];
      options.data.url = '/dashboard';
      options.vibrate = [200, 100, 200];
      break;

    case 'overstay_alert':
      options.body = `🚨 URGENT: Possible overstay alert - ${body}`;
      options.requireInteraction = true;
      options.actions = [
        { action: 'immediate_check', title: '🚨 Check Now', icon: '/images/visa-calculator-logo.png' },
        { action: 'contact_embassy', title: '🏛️ Embassy Info', icon: '/images/visa-calculator-logo.png' }
      ];
      options.data.url = '/dashboard';
      options.vibrate = [300, 100, 300, 100, 300];
      break;

    case 'window_reset':
      options.body = `🔄 180-day window reset: ${body}`;
      options.actions = [
        { action: 'plan_trip', title: '🗺️ Plan Trip', icon: '/images/visa-calculator-logo.png' },
        { action: 'view_calendar', title: '📅 View Calendar', icon: '/images/visa-calculator-logo.png' }
      ];
      options.data.url = '/dashboard';
      break;

    case 'document_reminder':
      options.body = `📄 Document reminder: ${body}`;
      options.actions = [
        { action: 'view_checklist', title: '✅ Checklist', icon: '/images/visa-calculator-logo.png' },
        { action: 'dismiss', title: '❌ Dismiss', icon: '/images/visa-calculator-logo.png' }
      ];
      break;

    default:
      options.actions = [
        { action: 'view', title: '👁️ View App', icon: '/images/visa-calculator-logo.png' },
        { action: 'dismiss', title: '❌ Dismiss', icon: '/images/visa-calculator-logo.png' }
      ];
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => {
        console.log('Notification displayed successfully');
        // Track notification display
        return self.registration.sync.register('notification-displayed');
      })
      .catch(error => {
        console.error('Error displaying notification:', error);
      })
  );
});

// Handle notification clicks with comprehensive actions
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event);
  
  const { action, notification } = event;
  const { type, tripData, url } = notification.data || {};
  
  event.notification.close();

  let targetUrl = url || '/';
  let shouldFocus = true;

  // Handle different notification actions
  switch (action) {
    case 'view_trip':
    case 'check_compliance':
    case 'check_status':
    case 'immediate_check':
      targetUrl = '/dashboard';
      break;
      
    case 'extend_stay':
      targetUrl = '/dashboard?action=extend_stay';
      break;
      
    case 'view_legal':
    case 'contact_embassy':
      targetUrl = '/legal-disclaimer';
      break;
      
    case 'plan_trip':
      targetUrl = '/dashboard?action=plan_trip';
      break;
      
    case 'view_calendar':
      targetUrl = '/dashboard?view=calendar';
      break;
      
    case 'view_checklist':
      targetUrl = '/dashboard?view=checklist';
      break;
      
    case 'dismiss':
      shouldFocus = false;
      // Just close notification, don't open app
      return;
      
    default:
      targetUrl = url || '/dashboard';
  }

  if (shouldFocus) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Check if app is already open
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url.includes(self.location.origin)) {
              // Focus existing window and navigate
              client.focus();
              return client.navigate(targetUrl);
            }
          }
          
          // Open new window if app not open
          return clients.openWindow(targetUrl);
        })
        .then(() => {
          // Log notification interaction
          return self.registration.sync.register('notification-clicked');
        })
    );
  }
});

// Handle notification close events
self.addEventListener('notificationclose', event => {
  console.log('Notification closed:', event);
  
  // Track notification dismissals for analytics
  event.waitUntil(
    self.registration.sync.register('notification-dismissed')
  );
});

// Background sync for notification analytics
self.addEventListener('sync', event => {
  if (event.tag === 'notification-displayed') {
    event.waitUntil(trackNotificationEvent('displayed'));
  } else if (event.tag === 'notification-clicked') {
    event.waitUntil(trackNotificationEvent('clicked'));
  } else if (event.tag === 'notification-dismissed') {
    event.waitUntil(trackNotificationEvent('dismissed'));
  }
});

// Track notification events (analytics)
async function trackNotificationEvent(eventType) {
  try {
    // Store analytics data locally for later sync
    const analytics = await getStoredAnalytics();
    analytics.notifications = analytics.notifications || {};
    analytics.notifications[eventType] = (analytics.notifications[eventType] || 0) + 1;
    analytics.notifications.lastEvent = Date.now();
    
    await storeAnalytics(analytics);
    console.log(`Notification ${eventType} tracked`);
  } catch (error) {
    console.error('Error tracking notification event:', error);
  }
}

// Helper functions for analytics storage
async function getStoredAnalytics() {
  try {
    const cache = await caches.open('schengen-analytics');
    const response = await cache.match('/analytics');
    return response ? await response.json() : {};
  } catch {
    return {};
  }
}

async function storeAnalytics(data) {
  try {
    const cache = await caches.open('schengen-analytics');
    await cache.put('/analytics', new Response(JSON.stringify(data)));
  } catch (error) {
    console.error('Error storing analytics:', error);
  }
}

// Background sync queue management functions
async function getPendingData(type) {
  try {
    const cache = await caches.open('schengen-sync-queue');
    const response = await cache.match(`/sync-queue/${type}`);
    return response ? await response.json() : [];
  } catch (error) {
    console.error(`Error getting pending ${type} data:`, error);
    return [];
  }
}

async function storePendingData(type, data) {
  try {
    const existing = await getPendingData(type);
    const updated = [...existing, { 
      ...data, 
      id: data.id || `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      retryCount: 0
    }];
    
    const cache = await caches.open('schengen-sync-queue');
    await cache.put(`/sync-queue/${type}`, new Response(JSON.stringify(updated)));
    console.log(`Stored pending ${type} data:`, data.id || 'auto-generated-id');
    
    // Schedule background sync
    if ('serviceWorker' in self && self.registration && self.registration.sync) {
      await self.registration.sync.register(`${type}-sync`);
    }
    
  } catch (error) {
    console.error(`Error storing pending ${type} data:`, error);
  }
}

async function removePendingData(type, id) {
  try {
    const existing = await getPendingData(type);
    const updated = existing.filter(item => item.id !== id);
    
    const cache = await caches.open('schengen-sync-queue');
    await cache.put(`/sync-queue/${type}`, new Response(JSON.stringify(updated)));
    console.log(`Removed pending ${type} data:`, id);
  } catch (error) {
    console.error(`Error removing pending ${type} data:`, error);
  }
}

async function clearPendingData(type) {
  try {
    const cache = await caches.open('schengen-sync-queue');
    await cache.delete(`/sync-queue/${type}`);
    console.log(`Cleared all pending ${type} data`);
  } catch (error) {
    console.error(`Error clearing pending ${type} data:`, error);
  }
}

// Notify all clients about sync events
async function notifyClients(message) {
  try {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach(client => {
      client.postMessage({
        type: 'background-sync',
        ...message,
        timestamp: Date.now()
      });
    });
  } catch (error) {
    console.error('Error notifying clients:', error);
  }
}

// Check network connectivity and queue data for sync
async function handleOfflineRequest(request, data, type) {
  try {
    // Try to make the request first
    const response = await fetch(request);
    if (response.ok) {
      return response;
    }
    throw new Error(`Request failed with status: ${response.status}`);
  } catch (error) {
    console.log('Request failed, queuing for background sync:', error.message);
    
    // Store data for background sync
    await storePendingData(type, {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      data: data,
      originalRequest: {
        url: request.url,
        method: request.method
      }
    });
    
    // Return a response indicating data was queued
    return new Response(JSON.stringify({
      success: true,
      queued: true,
      message: 'Data saved locally and will sync when online',
      timestamp: Date.now()
    }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


// Handle syncable API requests (POST, PUT, DELETE)
async function handleSyncableRequest(request) {
  const url = new URL(request.url);
  let requestData = null;
  
  // Extract request data
  try {
    if (request.body) {
      requestData = await request.json();
    }
  } catch (error) {
    console.log('Could not parse request body:', error);
  }
  
  // Determine sync type based on URL
  let syncType = 'general';
  if (url.pathname.includes('/trips')) {
    syncType = 'trips';
  } else if (url.pathname.includes('/user/settings')) {
    syncType = 'user-settings';
  } else if (url.pathname.includes('/notification-settings')) {
    syncType = 'notification-settings';
  } else if (url.pathname.includes('/calculations')) {
    syncType = 'calculations';
  }
  
  return handleOfflineRequest(request, requestData, syncType);
}