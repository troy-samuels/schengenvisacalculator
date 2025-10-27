/**
 * Smart Alerts System for Premium Travel Compliance Monitoring
 * Provides proactive notifications for trip planning and compliance alerts
 * Part of £9.99/year premium tier value proposition
 */

'use client'

import { SchengenTrip } from '../types/schengen-trip'
import { UserStatus } from '../types/user-status'
import { RobustSchengenCalculator } from '@schengen/calculator'
import { format } from 'date-fns/format'
import { addDays } from 'date-fns/addDays'
import { differenceInDays } from 'date-fns/differenceInDays'
import { isBefore } from 'date-fns/isBefore'
import { isAfter } from 'date-fns/isAfter'

export interface SmartAlert {
  id: string
  type: 'compliance_warning' | 'optimization_tip' | 'trip_reminder' | 'reset_notification'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  actionRequired: boolean
  triggerDate: Date
  expiryDate?: Date
  metadata?: {
    daysUntilLimit?: number
    suggestedExitDate?: Date
    nextResetDate?: Date
    affectedTrips?: string[]
  }
}

export interface AlertPreferences {
  email: boolean
  push: boolean
  inApp: boolean
  frequency: 'immediate' | 'daily' | 'weekly'
  categories: {
    complianceWarnings: boolean
    optimizationTips: boolean
    tripReminders: boolean
    resetNotifications: boolean
  }
}

export interface UserAlertContext {
  userStatus: UserStatus
  trips: SchengenTrip[]
  upcomingTrips: SchengenTrip[]
  email?: string
  preferences: AlertPreferences
}

export class SmartAlertEngine {
  /**
   * Generates personalized alerts based on user's travel pattern and compliance status
   */
  static generateAlerts(context: UserAlertContext): SmartAlert[] {
    const alerts: SmartAlert[] = []
    
    // Only generate alerts for premium users
    if (context.userStatus === UserStatus.FREE) {
      return alerts
    }

    const now = new Date()
    const compliance = context.trips.length > 0 
      ? RobustSchengenCalculator.calculateExactCompliance(context.trips, now)
      : { totalDaysUsed: 0, daysRemaining: 90, isCompliant: true }

    // 1. Compliance warnings
    alerts.push(...this.generateComplianceAlerts(context, compliance, now))
    
    // 2. Trip optimization alerts
    alerts.push(...this.generateOptimizationAlerts(context, compliance, now))
    
    // 3. Upcoming trip reminders
    alerts.push(...this.generateTripReminders(context, now))
    
    // 4. Reset notifications
    alerts.push(...this.generateResetNotifications(context, compliance, now))

    // Filter alerts based on user preferences
    return this.filterByPreferences(alerts, context.preferences)
  }

  private static generateComplianceAlerts(
    context: UserAlertContext, 
    compliance: any, 
    now: Date
  ): SmartAlert[] {
    const alerts: SmartAlert[] = []

    // Critical: User is over the 90-day limit
    if (!compliance.isCompliant) {
      alerts.push({
        id: `compliance-critical-${Date.now()}`,
        type: 'compliance_warning',
        severity: 'critical',
        title: '🚨 URGENT: Schengen Limit Exceeded',
        message: `You have used ${compliance.totalDaysUsed} days out of 90 allowed. You may be in violation of Schengen regulations. Consider contacting immigration authorities immediately.`,
        actionRequired: true,
        triggerDate: now,
        expiryDate: addDays(now, 7),
        metadata: {
          daysUntilLimit: compliance.daysRemaining,
          nextResetDate: this.calculateNextResetDate(context.trips, now)
        }
      })
    }

    // High: Approaching the limit (less than 10 days remaining)
    else if (compliance.daysRemaining < 10 && compliance.daysRemaining >= 0) {
      alerts.push({
        id: `compliance-high-${Date.now()}`,
        type: 'compliance_warning',
        severity: 'high',
        title: '⚠️ Approaching Schengen Limit',
        message: `Only ${compliance.daysRemaining} days remaining in your 90-day allowance. Plan your next trip carefully to maintain compliance.`,
        actionRequired: true,
        triggerDate: now,
        expiryDate: addDays(now, 30),
        metadata: {
          daysUntilLimit: compliance.daysRemaining,
          nextResetDate: this.calculateNextResetDate(context.trips, now)
        }
      })
    }

    // Medium: Getting close to limit (10-30 days remaining)
    else if (compliance.daysRemaining < 30 && compliance.daysRemaining >= 10) {
      alerts.push({
        id: `compliance-medium-${Date.now()}`,
        type: 'compliance_warning',
        severity: 'medium',
        title: '📊 Monitor Your Schengen Usage',
        message: `${compliance.daysRemaining} days remaining in your current 180-day period. Consider planning shorter trips or waiting for your allowance to reset.`,
        actionRequired: false,
        triggerDate: now,
        expiryDate: addDays(now, 14),
        metadata: {
          daysUntilLimit: compliance.daysRemaining,
          nextResetDate: this.calculateNextResetDate(context.trips, now)
        }
      })
    }

    return alerts
  }

  private static generateOptimizationAlerts(
    context: UserAlertContext,
    compliance: any,
    now: Date
  ): SmartAlert[] {
    const alerts: SmartAlert[] = []

    // Analyze trip patterns for optimization opportunities
    const recentTrips = context.trips.filter(trip => 
      differenceInDays(now, trip.endDate) <= 180
    ).sort((a, b) => b.endDate.getTime() - a.endDate.getTime())

    if (recentTrips.length >= 2) {
      // Check for frequent short trips (inefficient usage)
      const shortTrips = recentTrips.filter(trip => 
        differenceInDays(trip.endDate, trip.startDate) + 1 <= 7
      )

      if (shortTrips.length >= 3) {
        alerts.push({
          id: `optimization-consolidate-${Date.now()}`,
          type: 'optimization_tip',
          severity: 'low',
          title: '💡 Optimize Your Travel Pattern',
          message: `You've taken ${shortTrips.length} short trips recently. Consider consolidating into longer stays to maximize your Schengen allowance and reduce border crossings.`,
          actionRequired: false,
          triggerDate: now,
          expiryDate: addDays(now, 30),
          metadata: {
            affectedTrips: shortTrips.map(trip => trip.id)
          }
        })
      }

      // Check for gaps where user could travel more
      if (compliance.daysRemaining > 60) {
        alerts.push({
          id: `optimization-underuse-${Date.now()}`,
          type: 'optimization_tip',
          severity: 'low',
          title: '🌍 Travel Opportunity Available',
          message: `You have ${compliance.daysRemaining} days remaining in your allowance. This is a great time to plan a longer European adventure!`,
          actionRequired: false,
          triggerDate: now,
          expiryDate: addDays(now, 21),
          metadata: {
            daysUntilLimit: compliance.daysRemaining
          }
        })
      }
    }

    return alerts
  }

  private static generateTripReminders(
    context: UserAlertContext,
    now: Date
  ): SmartAlert[] {
    const alerts: SmartAlert[] = []

    context.upcomingTrips.forEach(trip => {
      const daysUntilTrip = differenceInDays(trip.startDate, now)
      
      // 7 days before trip
      if (daysUntilTrip === 7) {
        alerts.push({
          id: `reminder-7day-${trip.id}`,
          type: 'trip_reminder',
          severity: 'medium',
          title: '📅 Trip Starting Soon',
          message: `Your trip to ${trip.country} starts in 7 days (${format(trip.startDate, 'MMM dd, yyyy')}). Don't forget to check travel requirements and pack your documents!`,
          actionRequired: false,
          triggerDate: now,
          expiryDate: trip.startDate
        })
      }

      // 24 hours before trip
      if (daysUntilTrip === 1) {
        alerts.push({
          id: `reminder-24h-${trip.id}`,
          type: 'trip_reminder',
          severity: 'high',
          title: '✈️ Trip Tomorrow',
          message: `Your trip to ${trip.country} starts tomorrow! Safe travels and remember to get your passport stamped at entry and exit.`,
          actionRequired: false,
          triggerDate: now,
          expiryDate: trip.startDate
        })
      }

      // Check if upcoming trip will cause compliance issues
      const hypotheticalTrips = [...context.trips, trip]
      const futureCompliance = RobustSchengenCalculator.calculateExactCompliance(
        hypotheticalTrips, 
        trip.endDate
      )

      if (!futureCompliance.isCompliant) {
        alerts.push({
          id: `compliance-future-${trip.id}`,
          type: 'compliance_warning',
          severity: 'critical',
          title: '🚫 Upcoming Trip Violates Limits',
          message: `Your planned trip to ${trip.country} (${format(trip.startDate, 'MMM dd')} - ${format(trip.endDate, 'MMM dd')}) would exceed the 90-day limit. Consider shortening the trip or rescheduling.`,
          actionRequired: true,
          triggerDate: now,
          expiryDate: addDays(trip.startDate, -1),
          metadata: {
            suggestedExitDate: this.calculateSafeExitDate(context.trips, trip.startDate),
            affectedTrips: [trip.id]
          }
        })
      }
    })

    return alerts
  }

  private static generateResetNotifications(
    context: UserAlertContext,
    compliance: any,
    now: Date
  ): SmartAlert[] {
    const alerts: SmartAlert[] = []

    if (context.trips.length > 0) {
      const nextResetDate = this.calculateNextResetDate(context.trips, now)
      const daysUntilReset = differenceInDays(nextResetDate, now)

      // Notify when allowance is about to reset
      if (daysUntilReset <= 14 && daysUntilReset > 0 && compliance.totalDaysUsed > 30) {
        alerts.push({
          id: `reset-upcoming-${Date.now()}`,
          type: 'reset_notification',
          severity: 'low',
          title: '🔄 Allowance Resetting Soon',
          message: `Your 90-day allowance will reset on ${format(nextResetDate, 'MMM dd, yyyy')} (in ${daysUntilReset} days). You'll have fresh travel days available for your next European adventure!`,
          actionRequired: false,
          triggerDate: now,
          expiryDate: nextResetDate,
          metadata: {
            nextResetDate,
            daysUntilLimit: daysUntilReset
          }
        })
      }
    }

    return alerts
  }

  private static calculateNextResetDate(trips: SchengenTrip[], referenceDate: Date): Date {
    if (trips.length === 0) return referenceDate

    // Find the oldest trip in the current 180-day window
    const windowStart = addDays(referenceDate, -179)
    const tripsInWindow = trips.filter(trip => 
      isAfter(trip.endDate, windowStart) && isBefore(trip.startDate, referenceDate)
    )

    if (tripsInWindow.length === 0) return referenceDate

    const oldestTrip = tripsInWindow.sort((a, b) => 
      a.startDate.getTime() - b.startDate.getTime()
    )[0]

    return addDays(oldestTrip.startDate, 180)
  }

  private static calculateSafeExitDate(existingTrips: SchengenTrip[], plannedStartDate: Date): Date {
    // Calculate the latest safe exit date that maintains compliance
    let safeDuration = 90
    
    existingTrips.forEach(trip => {
      const overlapDays = this.calculateOverlapDays(trip, plannedStartDate, addDays(plannedStartDate, 179))
      safeDuration -= overlapDays
    })

    return addDays(plannedStartDate, Math.max(1, safeDuration - 1))
  }

  private static calculateOverlapDays(trip: SchengenTrip, windowStart: Date, windowEnd: Date): number {
    const tripStart = trip.startDate > windowStart ? trip.startDate : windowStart
    const tripEnd = trip.endDate < windowEnd ? trip.endDate : windowEnd
    
    if (tripStart > tripEnd) return 0
    return differenceInDays(tripEnd, tripStart) + 1
  }

  private static filterByPreferences(alerts: SmartAlert[], preferences: AlertPreferences): SmartAlert[] {
    return alerts.filter(alert => {
      switch (alert.type) {
        case 'compliance_warning':
          return preferences.categories.complianceWarnings
        case 'optimization_tip':
          return preferences.categories.optimizationTips
        case 'trip_reminder':
          return preferences.categories.tripReminders
        case 'reset_notification':
          return preferences.categories.resetNotifications
        default:
          return true
      }
    })
  }
}

/**
 * Alert delivery service for email and push notifications
 */
export class AlertDeliveryService {
  /**
   * Send email alert to user
   */
  static async sendEmailAlert(alert: SmartAlert, userEmail: string): Promise<boolean> {
    try {
      const emailContent = this.generateEmailContent(alert)
      
      // In production, integrate with SendGrid/Mailgun/etc
      console.log('📧 Email Alert:', {
        to: userEmail,
        subject: alert.title,
        content: emailContent,
        priority: alert.severity
      })

      // Simulated email sending
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 100)
      })
    } catch (error) {
      console.error('Failed to send email alert:', error)
      return false
    }
  }

  /**
   * Send push notification via PWA
   */
  static async sendPushNotification(alert: SmartAlert): Promise<boolean> {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return false
    }

    try {
      const notification = new Notification(alert.title, {
        body: alert.message,
        icon: '/icon-192.png',
        badge: '/icon-72.png',
        tag: alert.id,
        requireInteraction: alert.actionRequired
      })

      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      return true
    } catch (error) {
      console.error('Failed to send push notification:', error)
      return false
    }
  }

  private static generateEmailContent(alert: SmartAlert): string {
    const severityEmoji = {
      low: '💡',
      medium: '📊', 
      high: '⚠️',
      critical: '🚨'
    }[alert.severity]

    return `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">${severityEmoji} ETIAS Calculator Alert</h1>
        </div>
        
        <div style="padding: 24px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin: 0 0 16px 0;">${alert.title}</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">${alert.message}</p>
          
          ${alert.actionRequired ? `
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-weight: 500;">⚡ Action Required</p>
              <p style="margin: 8px 0 0 0; color: #92400e;">Please review your travel plans and take appropriate action.</p>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 24px;">
            <a href="https://etiascalculator.com" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500;">
              View Your Dashboard
            </a>
          </div>
        </div>
        
        <div style="background: #e5e7eb; padding: 16px; text-align: center; color: #6b7280; font-size: 14px;">
          <p style="margin: 0;">You're receiving this because you have premium alerts enabled.</p>
          <p style="margin: 4px 0 0 0;">
            <a href="https://etiascalculator.com/settings" style="color: #3b82f6;">Update preferences</a> | 
            <a href="https://etiascalculator.com/unsubscribe" style="color: #3b82f6;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `
  }
}

/**
 * Hook for managing user alerts in React components
 */
export function useSmartAlerts(context: UserAlertContext) {
  const [alerts, setAlerts] = useState<SmartAlert[]>([])
  const [loading, setLoading] = useState(false)

  const generateAlerts = useCallback(async () => {
    setLoading(true)
    try {
      const generatedAlerts = SmartAlertEngine.generateAlerts(context)
      setAlerts(generatedAlerts)
    } catch (error) {
      console.error('Failed to generate alerts:', error)
    } finally {
      setLoading(false)
    }
  }, [context])

  const sendAlert = useCallback(async (alert: SmartAlert) => {
    const results = await Promise.allSettled([
      context.preferences.email && context.email 
        ? AlertDeliveryService.sendEmailAlert(alert, context.email)
        : Promise.resolve(false),
      context.preferences.push 
        ? AlertDeliveryService.sendPushNotification(alert)
        : Promise.resolve(false)
    ])

    return results.map(result => result.status === 'fulfilled' ? result.value : false)
  }, [context.email, context.preferences])

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }, [])

  return {
    alerts,
    loading,
    generateAlerts,
    sendAlert,
    dismissAlert
  }
}

import { useState, useCallback } from 'react'