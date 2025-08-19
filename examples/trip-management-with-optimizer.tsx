'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, MapPin, Edit, Trash2 } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TripOptimizerWidget, CompactTripOptimizer } from '@/components/trip-optimizer-widget'
import { SwipeActions } from '@/components/swipe-refresh'
import { TripCardSkeleton } from '@/components/loading-states'
import { AppLayout } from '@/components/app-layout'
import { Trip } from '@/lib/services/trip-optimizer'
import { cn } from '@/lib/utils'

// Example page showing how to integrate the trip optimizer
export default function TripManagementPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddTrip, setShowAddTrip] = useState(false)

  // Simulate loading trips from API
  useEffect(() => {
    const loadTrips = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Sample trips data
      const sampleTrips: Trip[] = [
        {
          id: '1',
          startDate: new Date('2024-12-15'),
          endDate: new Date('2024-12-25'),
          countries: ['France', 'Italy'],
          purpose: 'Vacation',
          notes: 'Christmas holiday trip'
        },
        {
          id: '2',
          startDate: new Date('2025-02-10'),
          endDate: new Date('2025-02-20'),
          countries: ['Germany', 'Austria'],
          purpose: 'Business',
          notes: 'Conference and meetings'
        },
        {
          id: '3',
          startDate: new Date('2025-04-05'),
          endDate: new Date('2025-04-15'),
          countries: ['Spain'],
          purpose: 'Vacation',
          notes: 'Spring break'
        },
        {
          id: '4',
          startDate: new Date('2025-06-20'),
          endDate: new Date('2025-07-05'),
          countries: ['Netherlands', 'Belgium'],
          purpose: 'Tourism',
          notes: 'Summer vacation'
        }
      ]
      
      setTrips(sampleTrips)
      setIsLoading(false)
    }

    loadTrips()
  }, [])

  const handleTripsUpdated = (updatedTrips: Trip[]) => {
    setTrips(updatedTrips)
    // In a real app, you would also sync with your backend here
    console.log('Trips updated:', updatedTrips)
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId))
  }

  const handleEditTrip = (tripId: string) => {
    console.log('Edit trip:', tripId)
    // Navigate to edit form or open modal
  }

  return (
    <AppLayout
      title="My Trips"
      showBackButton={false}
      enablePullToRefresh={true}
      onRefresh={async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
      }}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
            <p className="text-gray-600">
              {trips.length > 0 
                ? `${trips.length} trip${trips.length !== 1 ? 's' : ''} planned`
                : 'No trips planned yet'
              }
            </p>
          </div>
          <Button onClick={() => setShowAddTrip(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Trip</span>
          </Button>
        </div>

        {/* Trip Optimizer Widget - Desktop */}
        <div className="hidden lg:block">
          <TripOptimizerWidget
            trips={trips}
            onTripsUpdated={handleTripsUpdated}
            showAlways={false}
            minimized={false}
          />
        </div>

        {/* Trip Optimizer Widget - Mobile (Compact) */}
        <div className="lg:hidden">
          <CompactTripOptimizer
            trips={trips}
            onTripsUpdated={handleTripsUpdated}
          />
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            <>
              {[...Array(3)].map((_, i) => (
                <TripCardSkeleton key={i} />
              ))}
            </>
          ) : trips.length > 0 ? (
            // Trip cards
            <>
              {trips.map((trip, index) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  index={index}
                  onEdit={() => handleEditTrip(trip.id)}
                  onDelete={() => handleDeleteTrip(trip.id)}
                />
              ))}
            </>
          ) : (
            // Empty state
            <EmptyTripsState onAddTrip={() => setShowAddTrip(true)} />
          )}
        </div>

        {/* Additional sections */}
        {trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <TripStatsCard trips={trips} />
            <ComplianceOverviewCard trips={trips} />
          </div>
        )}
      </div>
    </AppLayout>
  )
}

interface TripCardProps {
  trip: Trip
  index: number
  onEdit: () => void
  onDelete: () => void
}

function TripCard({ trip, index, onEdit, onDelete }: TripCardProps) {
  const duration = differenceInDays(trip.endDate, trip.startDate) + 1
  const isOptimized = trip.isOptimized
  const isPast = trip.endDate < new Date()

  const swipeActions = [
    {
      id: 'edit',
      label: 'Edit',
      icon: Edit,
      color: 'bg-blue-500',
      action: onEdit
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      color: 'bg-red-500',
      action: onDelete
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <SwipeActions rightActions={swipeActions}>
        <Card className={cn(
          'p-4 transition-all duration-200 hover:shadow-md',
          isOptimized && !isPast && 'ring-2 ring-green-200 bg-green-50',
          isPast && 'opacity-75'
        )}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Trip Icon */}
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                isPast ? 'bg-gray-100' : 'bg-blue-100'
              )}>
                <MapPin className={cn(
                  'h-5 w-5',
                  isPast ? 'text-gray-500' : 'text-blue-600'
                )} />
              </div>

              {/* Trip Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {trip.countries.join(', ')}
                  </h3>
                  {isOptimized && !isPast && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Optimized
                    </span>
                  )}
                  {isPast && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Completed
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d, yyyy')}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{duration} day{duration !== 1 ? 's' : ''}</span>
                  </div>

                  {trip.purpose && (
                    <div className="text-xs text-gray-500">
                      {trip.purpose}
                    </div>
                  )}

                  {trip.notes && (
                    <div className="text-xs text-gray-500 truncate">
                      {trip.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </SwipeActions>
    </motion.div>
  )
}

function EmptyTripsState({ onAddTrip }: { onAddTrip: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
        <Calendar className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No trips planned yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Start planning your Schengen area trips and let our optimizer help you maximize your available days.
      </p>
      <Button onClick={onAddTrip} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Plan Your First Trip</span>
      </Button>
    </motion.div>
  )
}

function TripStatsCard({ trips }: { trips: Trip[] }) {
  const today = new Date()
  const totalDays = trips.reduce((sum, trip) => 
    sum + (differenceInDays(trip.endDate, trip.startDate) + 1), 0
  )
  const upcomingTrips = trips.filter(trip => trip.startDate > today)
  const uniqueCountries = [...new Set(trips.flatMap(trip => trip.countries))]

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Trip Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalDays}</div>
          <div className="text-sm text-gray-500">Total Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{upcomingTrips.length}</div>
          <div className="text-sm text-gray-500">Upcoming</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{uniqueCountries.length}</div>
          <div className="text-sm text-gray-500">Countries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {trips.filter(trip => trip.isOptimized).length}
          </div>
          <div className="text-sm text-gray-500">Optimized</div>
        </div>
      </div>
    </Card>
  )
}

function ComplianceOverviewCard({ trips }: { trips: Trip[] }) {
  // This would use the TripOptimizer to check compliance
  const remainingDays = 45 // Placeholder - would calculate from TripOptimizer
  const riskLevel = remainingDays > 30 ? 'low' : remainingDays > 10 ? 'medium' : 'high'
  
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Schengen Compliance</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Days Remaining</span>
          <span className={cn(
            'text-lg font-bold',
            riskLevel === 'low' ? 'text-green-600' :
            riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
          )}>
            {remainingDays}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              riskLevel === 'low' ? 'bg-green-500' :
              riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            )}
            style={{ width: `${(remainingDays / 90) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500">
          Current 180-day rolling period
        </div>
      </div>
    </Card>
  )
}