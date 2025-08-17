"use client"

import { useMemo } from "react"
import { format, isAfter, isBefore, addDays, subDays } from "date-fns"
import { Calendar, MapPin, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VisaEntry {
  id: string
  country: string
  startDate: Date | null
  endDate: Date | null
  days: number
  daysInLast180: number
  daysRemaining: number
  activeColumn: "country" | "dates" | "complete" | null
}

interface TripTimelineProps {
  entries: VisaEntry[]
  countries: Array<{ code: string; name: string; flag: string }>
}

interface TimelineTrip {
  id: string
  country: string
  countryName: string
  flag: string
  startDate: Date
  endDate: Date
  days: number
  daysInLast180: number
  status: "past" | "current" | "planned"
  isInWindow: boolean
}

export function TripTimeline({ entries, countries }: TripTimelineProps) {
  const timelineTrips = useMemo<TimelineTrip[]>(() => {
    const today = new Date()
    const windowStart = subDays(today, 179) // 180-day window

    return entries
      .filter(entry => entry.startDate && entry.endDate && entry.country)
      .map(entry => {
        const country = countries.find(c => c.code === entry.country)
        const startDate = entry.startDate!
        const endDate = entry.endDate!
        
        let status: "past" | "current" | "planned"
        if (isAfter(startDate, today)) {
          status = "planned"
        } else if (isBefore(endDate, today)) {
          status = "past"
        } else {
          status = "current"
        }

        const isInWindow = isAfter(endDate, windowStart)

        return {
          id: entry.id,
          country: entry.country,
          countryName: country?.name || "Unknown Country",
          flag: country?.flag || "🏳️",
          startDate,
          endDate,
          days: entry.days,
          daysInLast180: entry.daysInLast180,
          status,
          isInWindow
        }
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }, [entries, countries])

  const { pastTrips, currentTrips, plannedTrips } = useMemo(() => {
    return {
      pastTrips: timelineTrips.filter(trip => trip.status === "past"),
      currentTrips: timelineTrips.filter(trip => trip.status === "current"),
      plannedTrips: timelineTrips.filter(trip => trip.status === "planned")
    }
  }, [timelineTrips])

  if (timelineTrips.length === 0) {
    return null
  }

  const TimelineItem = ({ trip, isLast = false }: { trip: TimelineTrip; isLast?: boolean }) => (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
      )}
      
      {/* Timeline dot */}
      <div className={`absolute left-2 top-4 w-4 h-4 rounded-full border-2 ${
        trip.status === "current" 
          ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/50" 
          : trip.status === "planned"
          ? "bg-blue-500 border-blue-500"
          : trip.isInWindow
          ? "bg-orange-500 border-orange-500"
          : "bg-gray-400 border-gray-400"
      }`}></div>

      {/* Content */}
      <div className="ml-10 pb-8">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{trip.flag}</span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {trip.countryName}
            </h3>
            <Badge 
              variant={
                trip.status === "current" ? "default" :
                trip.status === "planned" ? "secondary" : 
                trip.isInWindow ? "destructive" : "outline"
              }
              className="text-xs"
            >
              {trip.status === "current" ? "Current" :
               trip.status === "planned" ? "Planned" :
               trip.isInWindow ? "Counts in 180 days" : "Past"}
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {trip.isInWindow && trip.status === "past" && (
              <TrendingDown className="h-4 w-4 text-orange-500" />
            )}
            {trip.status === "planned" && (
              <TrendingUp className="h-4 w-4 text-blue-500" />
            )}
            <span className="font-medium">{trip.days} days</span>
          </div>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>
              {format(trip.startDate, "MMM dd, yyyy")} - {format(trip.endDate, "MMM dd, yyyy")}
            </span>
          </div>
          
          {trip.isInWindow && trip.daysInLast180 > 0 && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>
                {trip.daysInLast180} days count toward 180-day limit
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Trip Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Current Trips */}
          {currentTrips.map((trip, index) => (
            <TimelineItem 
              key={trip.id} 
              trip={trip} 
              isLast={index === currentTrips.length - 1 && pastTrips.length === 0 && plannedTrips.length === 0}
            />
          ))}

          {/* Planned Trips */}
          {plannedTrips.map((trip, index) => (
            <TimelineItem 
              key={trip.id} 
              trip={trip} 
              isLast={index === plannedTrips.length - 1 && pastTrips.length === 0}
            />
          ))}

          {/* Past Trips */}
          {pastTrips.length > 0 && (
            <>
              {(currentTrips.length > 0 || plannedTrips.length > 0) && (
                <div className="relative mb-6">
                  <div className="absolute left-4 w-0.5 h-4 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ml-10">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Past Trips
                    </div>
                  </div>
                </div>
              )}
              
              {pastTrips.map((trip, index) => (
                <TimelineItem 
                  key={trip.id} 
                  trip={trip} 
                  isLast={index === pastTrips.length - 1}
                />
              ))}
            </>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">
                {timelineTrips.length}
              </div>
              <div className="text-xs text-gray-600">Total Trips</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {currentTrips.length}
              </div>
              <div className="text-xs text-gray-600">Current</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {timelineTrips.filter(t => t.isInWindow).length}
              </div>
              <div className="text-xs text-gray-600">In 180-day Window</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {plannedTrips.length}
              </div>
              <div className="text-xs text-gray-600">Planned</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}