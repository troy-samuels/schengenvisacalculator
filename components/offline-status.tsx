'use client'

import { useState, useEffect } from 'react'

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowIndicator(true)
      // Hide the indicator after 3 seconds
      setTimeout(() => setShowIndicator(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowIndicator(true)
    }

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Service Worker status updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated, new content available')
        }
      })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showIndicator && isOnline) return null

  return (
    <div 
      className={`offline-indicator ${showIndicator ? 'show' : ''} ${isOnline ? 'online' : ''}`}
      role="alert"
      aria-live="polite"
    >
      {isOnline ? (
        <>
          🟢 Back online! All features are available.
        </>
      ) : (
        <>
          🔴 You're offline. Some features may be limited.
        </>
      )}
    </div>
  )
}

export function OfflineContent({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    
    updateOnlineStatus()
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  if (!isOnline) {
    return (
      <div className="offline-content">
        <h2>🛜 Offline Mode</h2>
        <p>You're currently offline, but the Schengen visa calculator still works!</p>
        <p>All calculations are performed locally in your browser.</p>
        <p>Connect to the internet to access additional features and sync your data.</p>
        <div className="offline-loading" />
      </div>
    )
  }

  return <>{children}</>
}