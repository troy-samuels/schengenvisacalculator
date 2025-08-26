import * as React from "react"
import { format } from "date-fns"
import { Calendar, MapPin, Clock, Trash2, Edit3 } from "lucide-react"

import type { Trip } from "@schengen/calculator"
import { cn, formatDateRange, daysBetween } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface TripCardProps {
  /** Trip data to display */
  trip: Trip
  /** Show edit button */
  showEdit?: boolean
  /** Show delete button */
  showDelete?: boolean
  /** Callback when edit is clicked */
  onEdit?: (trip: Trip) => void
  /** Callback when delete is clicked */
  onDelete?: (trip: Trip) => void
  /** Additional class name */
  className?: string
  /** Compact mode for mobile */
  compact?: boolean
  /** Show country flag (requires country code mapping) */
  showFlag?: boolean
  /** Custom country flag render function */
  renderFlag?: (countryName: string) => React.ReactNode
}

// Simple country name to flag emoji mapping
const COUNTRY_FLAGS: Record<string, string> = {
  // Major Schengen countries
  'Austria': '🇦🇹',
  'Belgium': '🇧🇪',
  'Czech Republic': '🇨🇿',
  'Denmark': '🇩🇰',
  'Estonia': '🇪🇪',
  'Finland': '🇫🇮',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Greece': '🇬🇷',
  'Hungary': '🇭🇺',
  'Iceland': '🇮🇸',
  'Italy': '🇮🇹',
  'Latvia': '🇱🇻',
  'Liechtenstein': '🇱🇮',
  'Lithuania': '🇱🇹',
  'Luxembourg': '🇱🇺',
  'Malta': '🇲🇹',
  'Netherlands': '🇳🇱',
  'Norway': '🇳🇴',
  'Poland': '🇵🇱',
  'Portugal': '🇵🇹',
  'Slovakia': '🇸🇰',
  'Slovenia': '🇸🇮',
  'Spain': '🇪🇸',
  'Sweden': '🇸🇪',
  'Switzerland': '🇨🇭',
  // Common variations
  'The Netherlands': '🇳🇱',
  'Czech': '🇨🇿',
  'Czechia': '🇨🇿',
}

export function TripCard({
  trip,
  showEdit = false,
  showDelete = false,
  onEdit,
  onDelete,
  className,
  compact = false,
  showFlag = true,
  renderFlag,
}: TripCardProps) {
  const flag = React.useMemo(() => {
    if (renderFlag) {
      return renderFlag(trip.country)
    }
    if (showFlag) {
      return COUNTRY_FLAGS[trip.country] || '🇪🇺'
    }
    return null
  }, [trip.country, showFlag, renderFlag])

  const duration = React.useMemo(() => {
    return daysBetween(trip.startDate, trip.endDate) + 1
  }, [trip.startDate, trip.endDate])

  const dateRange = React.useMemo(() => {
    return formatDateRange(trip.startDate, trip.endDate)
  }, [trip.startDate, trip.endDate])

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg hover:shadow-primary/10",
      "border-l-4 border-l-primary",
      compact ? "p-3" : "",
      className
    )}>
      {compact ? (
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {flag && (
                <span className="text-lg flex-shrink-0" role="img" aria-label={`${trip.country} flag`}>
                  {flag}
                </span>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{trip.country}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {dateRange}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {duration}d
              </span>
              
              {(showEdit || showDelete) && (
                <div className="flex gap-1">
                  {showEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onEdit?.(trip)}
                      aria-label={`Edit trip to ${trip.country}`}
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  )}
                  
                  {showDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onDelete?.(trip)}
                      aria-label={`Delete trip to ${trip.country}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {flag && (
                  <span className="text-2xl" role="img" aria-label={`${trip.country} flag`}>
                    {flag}
                  </span>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{trip.country}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Schengen Area
                  </p>
                </div>
              </div>
              
              {(showEdit || showDelete) && (
                <div className="flex gap-1">
                  {showEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit?.(trip)}
                      className="h-8 w-8 p-0"
                      aria-label={`Edit trip to ${trip.country}`}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {showDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(trip)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      aria-label={`Delete trip to ${trip.country}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{dateRange}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {duration} day{duration !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {/* Additional trip details could go here */}
            <div className="text-xs text-gray-400 border-t pt-2">
              Trip ID: {trip.id}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}

TripCard.displayName = "TripCard"