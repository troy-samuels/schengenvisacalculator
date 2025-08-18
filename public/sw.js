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
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="icon">🛜</div>
                      <h1>You're Offline</h1>
                      <p>The Schengen visa calculator is currently unavailable because you're not connected to the internet.</p>
                      <p>The calculator works entirely in your browser, so once you're back online, you can continue using all features.</p>
                      <button onclick="location.reload()">Try Again</button>
                    </div>
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

// Handle background sync for form submissions when back online
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any queued operations when back online
  console.log('Service Worker: Performing background sync');
}

// Handle push notifications (future enhancement)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/visa-calculator-logo.png',
      badge: '/images/visa-calculator-logo.png',
      tag: 'schengen-notification',
      actions: [
        {
          action: 'view',
          title: 'View Calculator'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});