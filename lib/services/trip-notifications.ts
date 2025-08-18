import { differenceInDays, addDays, subDays, isAfter, isBefore, format } from 'date-fns'

export interface Trip {
  id: string
  startDate: Date
  endDate: Date
  countries: string[]
  purpose?: string
  notes?: string
}

export interface NotificationSchedule {
  id: string
  tripId: string
  type: 'departure_reminder' | 'return_reminder' | 'compliance_warning' | 'overstay_alert' | 'window_reset' | 'document_reminder'
  scheduledFor: Date
  title: string
  body: string
  urgency: 'low' | 'normal' | 'high'
  data?: any
  sent?: boolean
  dismissed?: boolean
}

export interface SchengenWindowInfo {
  windowStart: Date
  windowEnd: Date
  totalDaysUsed: number
  remainingDays: number
  isCompliant: boolean
  nextResetDate: Date
}

export class TripNotificationScheduler {
  private trips: Trip[] = []
  private schedules: NotificationSchedule[] = []
  
  constructor(trips: Trip[] = []) {
    this.trips = trips
    this.generateAllSchedules()
  }

  // Add a new trip and regenerate schedules
  addTrip(trip: Trip): void {
    this.trips.push(trip)
    this.generateSchedulesForTrip(trip)
  }

  // Remove a trip and its schedules
  removeTrip(tripId: string): void {
    this.trips = this.trips.filter(trip => trip.id !== tripId)
    this.schedules = this.schedules.filter(schedule => schedule.tripId !== tripId)
  }

  // Generate all notification schedules
  private generateAllSchedules(): void {
    this.schedules = []
    this.trips.forEach(trip => {
      this.generateSchedulesForTrip(trip)
    })
    this.generateComplianceSchedules()
  }

  // Generate schedules for a specific trip
  private generateSchedulesForTrip(trip: Trip): void {
    const now = new Date()
    
    // Skip past trips for most notifications
    if (isBefore(trip.endDate, now)) {
      return
    }

    // 1. Departure reminders
    this.scheduleDepartureReminders(trip)
    
    // 2. Return reminders
    this.scheduleReturnReminders(trip)
    
    // 3. Document reminders
    this.scheduleDocumentReminders(trip)
    
    // 4. Trip-specific compliance checks
    this.scheduleTripComplianceChecks(trip)
  }

  // Schedule departure reminders
  private scheduleDepartureReminders(trip: Trip): void {
    const now = new Date()
    
    // Don't schedule if trip has already started
    if (isBefore(trip.startDate, now)) return

    const daysUntilDeparture = differenceInDays(trip.startDate, now)
    
    // 1 week before
    if (daysUntilDeparture >= 7) {
      this.addSchedule({
        id: `${trip.id}-departure-7d`,
        tripId: trip.id,
        type: 'departure_reminder',
        scheduledFor: subDays(trip.startDate, 7),
        title: 'Trip Departure in 1 Week',
        body: `Your trip to ${trip.countries.join(', ')} starts in 1 week (${format(trip.startDate, 'MMM dd')})`,
        urgency: 'low',
        data: { trip, daysUntil: 7 }
      })
    }

    // 3 days before
    if (daysUntilDeparture >= 3) {
      this.addSchedule({
        id: `${trip.id}-departure-3d`,
        tripId: trip.id,
        type: 'departure_reminder',
        scheduledFor: subDays(trip.startDate, 3),
        title: 'Trip Departure in 3 Days',
        body: `Pack your bags! Trip to ${trip.countries.join(', ')} starts in 3 days`,
        urgency: 'normal',
        data: { trip, daysUntil: 3 }
      })
    }

    // 1 day before
    if (daysUntilDeparture >= 1) {
      this.addSchedule({
        id: `${trip.id}-departure-1d`,
        tripId: trip.id,
        type: 'departure_reminder',
        scheduledFor: subDays(trip.startDate, 1),
        title: 'Trip Departure Tomorrow',
        body: `Final preparations! Your trip to ${trip.countries.join(', ')} starts tomorrow`,
        urgency: 'high',
        data: { trip, daysUntil: 1 }
      })
    }
  }

  // Schedule return reminders
  private scheduleReturnReminders(trip: Trip): void {
    const now = new Date()
    const tripLengthDays = differenceInDays(trip.endDate, trip.startDate) + 1

    // Don't schedule if trip has ended
    if (isBefore(trip.endDate, now)) return

    // 3 days before return (for trips longer than a week)
    if (tripLengthDays > 7) {
      this.addSchedule({
        id: `${trip.id}-return-3d`,
        tripId: trip.id,
        type: 'return_reminder',
        scheduledFor: subDays(trip.endDate, 3),
        title: 'Trip Return in 3 Days',
        body: `Your ${tripLengthDays}-day trip ends in 3 days. Check your compliance status!`,
        urgency: 'normal',
        data: { trip, daysUntilReturn: 3 }
      })
    }

    // Day of return
    this.addSchedule({
      id: `${trip.id}-return-today`,
      tripId: trip.id,
      type: 'return_reminder',
      scheduledFor: trip.endDate,
      title: 'Trip Return Today',
      body: `Safe travels! Your ${tripLengthDays}-day trip ends today`,
      urgency: 'high',
      data: { trip, daysUntilReturn: 0 }
    })
  }

  // Schedule document reminders
  private scheduleDocumentReminders(trip: Trip): void {
    const now = new Date()
    
    // Don't schedule for past trips
    if (isBefore(trip.startDate, now)) return

    // 2 weeks before departure
    const twoWeeksBefore = subDays(trip.startDate, 14)
    if (isAfter(twoWeeksBefore, now)) {
      this.addSchedule({
        id: `${trip.id}-documents-2w`,
        tripId: trip.id,
        type: 'document_reminder',
        scheduledFor: twoWeeksBefore,
        title: 'Travel Document Check',
        body: 'Ensure your passport, insurance, and travel documents are ready',
        urgency: 'normal',
        data: { trip, checkType: 'documents' }
      })
    }
  }

  // Schedule trip-specific compliance checks
  private scheduleTripComplianceChecks(trip: Trip): void {
    const tripLengthDays = differenceInDays(trip.endDate, trip.startDate) + 1
    
    // Long trip warning (approaching 90 days)
    if (tripLengthDays >= 80) {
      this.addSchedule({
        id: `${trip.id}-long-trip-warning`,
        tripId: trip.id,
        type: 'compliance_warning',
        scheduledFor: subDays(trip.startDate, 7),
        title: 'Long Trip Compliance Check',
        body: `Your ${tripLengthDays}-day trip approaches the 90-day limit. Verify your visa status`,
        urgency: 'high',
        data: { trip, warningType: 'long_trip', tripLength: tripLengthDays }
      })
    }

    // Overstay risk (exceeding 90 days)
    if (tripLengthDays > 90) {
      this.addSchedule({
        id: `${trip.id}-overstay-alert`,
        tripId: trip.id,
        type: 'overstay_alert',
        scheduledFor: addDays(trip.startDate, 90),
        title: '🚨 OVERSTAY ALERT',
        body: `You may be exceeding the 90-day limit. Check immediately!`,
        urgency: 'high',
        data: { trip, alertType: 'overstay_risk', tripLength: tripLengthDays }
      })
    }
  }

  // Generate overall compliance schedules
  private generateComplianceSchedules(): void {
    if (this.trips.length === 0) return

    const schengenInfo = this.calculateSchengenWindow()
    const now = new Date()

    // Window reset notifications
    if (schengenInfo.nextResetDate && isAfter(schengenInfo.nextResetDate, now)) {
      this.addSchedule({
        id: `window-reset-${schengenInfo.nextResetDate.getTime()}`,
        tripId: 'system',
        type: 'window_reset',
        scheduledFor: schengenInfo.nextResetDate,
        title: '🔄 180-Day Window Reset',
        body: `Your Schengen window resets today! You can now travel for up to 90 days`,
        urgency: 'normal',
        data: { windowInfo: schengenInfo }
      })

      // 1 week before reset
      const weekBeforeReset = subDays(schengenInfo.nextResetDate, 7)
      if (isAfter(weekBeforeReset, now)) {
        this.addSchedule({
          id: `window-reset-week-${schengenInfo.nextResetDate.getTime()}`,
          tripId: 'system',
          type: 'window_reset',
          scheduledFor: weekBeforeReset,
          title: 'Window Reset in 1 Week',
          body: `Your 180-day window resets in 1 week. Plan your next trip!`,
          urgency: 'low',
          data: { windowInfo: schengenInfo, daysUntilReset: 7 }
        })
      }
    }

    // Compliance warnings based on current usage
    if (schengenInfo.remainingDays <= 10 && schengenInfo.remainingDays > 0) {
      this.addSchedule({
        id: `low-days-warning-${now.getTime()}`,
        tripId: 'system',
        type: 'compliance_warning',
        scheduledFor: now,
        title: 'Low Remaining Days Warning',
        body: `Only ${schengenInfo.remainingDays} days left in your current 180-day window`,
        urgency: 'high',
        data: { windowInfo: schengenInfo, warningType: 'low_days' }
      })
    }
  }

  // Calculate current Schengen window information
  private calculateSchengenWindow(): SchengenWindowInfo {
    const now = new Date()
    const windowStart = subDays(now, 179) // 180 days ago
    const windowEnd = now

    // Calculate days used in current window
    let totalDaysUsed = 0
    this.trips.forEach(trip => {
      const tripStart = trip.startDate > windowStart ? trip.startDate : windowStart
      const tripEnd = trip.endDate < windowEnd ? trip.endDate : windowEnd
      
      if (tripStart <= tripEnd) {
        totalDaysUsed += differenceInDays(tripEnd, tripStart) + 1
      }
    })

    const remainingDays = Math.max(0, 90 - totalDaysUsed)
    const isCompliant = totalDaysUsed <= 90

    // Find next reset date (when oldest trip exits the window)
    let nextResetDate = addDays(now, 180)
    this.trips.forEach(trip => {
      if (isBefore(trip.startDate, windowStart)) return
      
      const tripExitDate = addDays(trip.startDate, 180)
      if (isBefore(tripExitDate, nextResetDate)) {
        nextResetDate = tripExitDate
      }
    })

    return {
      windowStart,
      windowEnd,
      totalDaysUsed,
      remainingDays,
      isCompliant,
      nextResetDate
    }
  }

  // Add a schedule to the list
  private addSchedule(schedule: Omit<NotificationSchedule, 'sent' | 'dismissed'>): void {
    const fullSchedule: NotificationSchedule = {
      ...schedule,
      sent: false,
      dismissed: false
    }
    
    // Don't duplicate schedules
    const exists = this.schedules.find(s => s.id === schedule.id)
    if (!exists) {
      this.schedules.push(fullSchedule)
    }
  }

  // Get pending schedules (not sent, not dismissed, scheduled for future or now)
  getPendingSchedules(): NotificationSchedule[] {
    const now = new Date()
    return this.schedules
      .filter(schedule => 
        !schedule.sent && 
        !schedule.dismissed && 
        schedule.scheduledFor <= now
      )
      .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())
  }

  // Get upcoming schedules
  getUpcomingSchedules(): NotificationSchedule[] {
    const now = new Date()
    return this.schedules
      .filter(schedule => 
        !schedule.dismissed && 
        schedule.scheduledFor > now
      )
      .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())
  }

  // Mark schedule as sent
  markAsSent(scheduleId: string): void {
    const schedule = this.schedules.find(s => s.id === scheduleId)
    if (schedule) {
      schedule.sent = true
    }
  }

  // Mark schedule as dismissed
  markAsDismissed(scheduleId: string): void {
    const schedule = this.schedules.find(s => s.id === scheduleId)
    if (schedule) {
      schedule.dismissed = true
    }
  }

  // Get all schedules for debugging
  getAllSchedules(): NotificationSchedule[] {
    return [...this.schedules]
  }

  // Export schedules for storage
  exportSchedules(): NotificationSchedule[] {
    return this.schedules
  }

  // Import schedules from storage
  importSchedules(schedules: NotificationSchedule[]): void {
    this.schedules = schedules.map(s => ({
      ...s,
      scheduledFor: new Date(s.scheduledFor)
    }))
  }
}