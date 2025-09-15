/**
 * PWA Service Management for Smart Alerts System
 * Handles service worker registration, push notifications, and offline functionality
 */

'use client'

export class PWAService {
  private static registration: ServiceWorkerRegistration | null = null
  private static isSupported = false

  /**
   * Initialize PWA features
   */
  static async initialize(): Promise<boolean> {
    if (typeof window === 'undefined') return false

    try {
      // Check for service worker support
      if ('serviceWorker' in navigator) {
        this.isSupported = true
        await this.registerServiceWorker()
        await this.setupNotifications()
        return true
      }
    } catch (error) {
      console.error('[PWAService] Failed to initialize:', error)
    }
    
    return false
  }

  /**
   * Register service worker
   */
  private static async registerServiceWorker(): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      this.registration = registration

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              this.notifyUpdate()
            }
          })
        }
      })

      console.log('[PWAService] Service worker registered:', registration.scope)
    } catch (error) {
      console.error('[PWAService] Service worker registration failed:', error)
    }
  }

  /**
   * Setup push notifications
   */
  private static async setupNotifications(): Promise<void> {
    if (!('Notification' in window) || !('PushManager' in window)) {
      console.warn('[PWAService] Push notifications not supported')
      return
    }

    // Check current permission
    if (Notification.permission === 'granted') {
      await this.subscribeToPushNotifications()
    }
  }

  /**
   * Request notification permission and subscribe
   */
  static async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false
    }

    const permission = await Notification.requestPermission()
    
    if (permission === 'granted') {
      await this.subscribeToPushNotifications()
      return true
    }

    return false
  }

  /**
   * Subscribe to push notifications
   */
  private static async subscribeToPushNotifications(): Promise<void> {
    if (!this.registration) return

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        ) as unknown as ArrayBuffer
      })

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription)
      
      console.log('[PWAService] Push subscription successful')
    } catch (error) {
      console.error('[PWAService] Push subscription failed:', error)
    }
  }

  /**
   * Send subscription to server
   */
  private static async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send subscription to server')
      }
    } catch (error) {
      console.error('[PWAService] Failed to send subscription:', error)
    }
  }

  /**
   * Send message to service worker
   */
  static sendMessageToServiceWorker(message: any): void {
    if (!navigator.serviceWorker.controller) return

    navigator.serviceWorker.controller.postMessage(message)
  }

  /**
   * Register for periodic background sync (premium feature)
   */
  static async enablePeriodicSync(userStatus: string): Promise<void> {
    if (!this.registration || userStatus !== 'premium') return

    try {
      // Register periodic sync for alert checking
      if ('periodicSync' in this.registration) {
        await (this.registration as any).periodicSync.register('alert-check', {
          minInterval: 24 * 60 * 60 * 1000 // 24 hours
        })
        
        console.log('[PWAService] Periodic sync registered for premium user')
      }
    } catch (error) {
      console.error('[PWAService] Failed to register periodic sync:', error)
    }
  }

  /**
   * Check if app can be installed
   */
  static canInstall(): boolean {
    return 'beforeinstallprompt' in window
  }

  /**
   * Prompt app installation
   */
  static async promptInstall(): Promise<boolean> {
    const event = (window as any).deferredPrompt
    if (!event) return false

    try {
      event.prompt()
      const { outcome } = await event.userChoice
      
      if (outcome === 'accepted') {
        console.log('[PWAService] App installation accepted')
        return true
      }
    } catch (error) {
      console.error('[PWAService] Installation prompt failed:', error)
    }

    return false
  }

  /**
   * Queue alert for offline processing
   */
  static queueAlert(alert: any): void {
    this.sendMessageToServiceWorker({
      type: 'QUEUE_ALERT',
      alert
    })
  }

  /**
   * Show local notification
   */
  static async showNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    if (!this.registration || Notification.permission !== 'granted') {
      return
    }

    try {
      await this.registration.showNotification(title, {
        icon: '/icon-192.png',
        badge: '/icon-72.png',
        ...options
      })
    } catch (error) {
      console.error('[PWAService] Failed to show notification:', error)
    }
  }

  /**
   * Get network status
   */
  static isOnline(): boolean {
    return navigator.onLine
  }

  /**
   * Listen for network status changes
   */
  static onNetworkChange(callback: (online: boolean) => void): () => void {
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }

  /**
   * Force service worker update
   */
  static async updateServiceWorker(): Promise<void> {
    if (!this.registration) return

    try {
      await this.registration.update()
      console.log('[PWAService] Service worker update requested')
    } catch (error) {
      console.error('[PWAService] Service worker update failed:', error)
    }
  }

  /**
   * Skip waiting for new service worker
   */
  static skipWaiting(): void {
    this.sendMessageToServiceWorker({ type: 'SKIP_WAITING' })
  }

  /**
   * Utility: Convert VAPID key
   */
  private static urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  /**
   * Notify about service worker update
   */
  private static notifyUpdate(): void {
    // Create update notification
    const updateEvent = new CustomEvent('sw-update-available', {
      detail: {
        message: 'A new version is available. Refresh to update.',
        action: () => {
          this.skipWaiting()
          window.location.reload()
        }
      }
    })

    window.dispatchEvent(updateEvent)
  }
}

/**
 * React hook for PWA functionality
 */
export function usePWA() {
  const [isOnline, setIsOnline] = useState(true)
  const [canInstall, setCanInstall] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Initialize PWA
    PWAService.initialize()

    // Set initial online status
    setIsOnline(PWAService.isOnline())

    // Listen for network changes
    const unsubscribe = PWAService.onNetworkChange(setIsOnline)

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      ;(window as any).deferredPrompt = e
      setCanInstall(true)
    }

    // Listen for service worker updates
    const handleServiceWorkerUpdate = () => {
      setUpdateAvailable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('sw-update-available', handleServiceWorkerUpdate)

    return () => {
      unsubscribe()
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('sw-update-available', handleServiceWorkerUpdate)
    }
  }, [])

  const install = useCallback(async () => {
    const installed = await PWAService.promptInstall()
    if (installed) {
      setCanInstall(false)
    }
    return installed
  }, [])

  const requestNotifications = useCallback(async () => {
    return PWAService.requestNotificationPermission()
  }, [])

  const update = useCallback(() => {
    PWAService.skipWaiting()
    window.location.reload()
  }, [])

  return {
    isOnline,
    canInstall,
    updateAvailable,
    install,
    requestNotifications,
    update,
    showNotification: PWAService.showNotification,
    queueAlert: PWAService.queueAlert
  }
}

import { useState, useEffect, useCallback } from 'react'