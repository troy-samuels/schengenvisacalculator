'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ChevronUp, ChevronDown, Info, AlertTriangle } from 'lucide-react'
import { TripOptimization } from './trip-optimization'
import { Trip } from '@/lib/services/trip-optimizer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { isBefore, startOfDay } from 'date-fns'

export interface TripOptimizerWidgetProps {
  trips: Trip[]
  onTripsUpdated: (trips: Trip[]) => void
  className?: string
  showAlways?: boolean
  minimized?: boolean
}

export function TripOptimizerWidget({
  trips,
  onTripsUpdated,
  className,
  showAlways = false,
  minimized = false
}: TripOptimizerWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(!minimized)
  const [shouldShow, setShouldShow] = useState(showAlways)

  const today = startOfDay(new Date())
  const futureTrips = trips.filter(trip => !isBefore(trip.endDate, today))
  const hasOptimizableTrips = futureTrips.length >= 2

  // Determine if widget should be shown
  useEffect(() => {
    if (showAlways) {
      setShouldShow(true)
      return
    }

    // Show if there are multiple future trips that could benefit from optimization
    const shouldDisplay = hasOptimizableTrips
    setShouldShow(shouldDisplay)
  }, [trips, showAlways, hasOptimizableTrips])

  if (!shouldShow) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('relative', className)}
    >
      <Card className={cn(
        'border-2 border-dashed transition-all duration-300',
        hasOptimizableTrips 
          ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' 
          : 'border-gray-300 bg-gray-50'
      )}>
        {/* Widget Header */}
        <div 
          className="p-4 cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                hasOptimizableTrips 
                  ? 'bg-yellow-100 text-yellow-600' 
                  : 'bg-gray-100 text-gray-500'
              )}>
                <Zap className="h-5 w-5" />
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <span>Trip Optimizer</span>
                  {hasOptimizableTrips && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                      {futureTrips.length} trips
                    </Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-600">
                  {hasOptimizableTrips 
                    ? 'Maximize your available days within Schengen rules'
                    : 'Add more future trips to enable optimization'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {hasOptimizableTrips && !isExpanded && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(true)
                  }}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Optimize
                </Button>
              )}
              
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Widget Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {hasOptimizableTrips ? (
                  <>
                    {/* Information Banner */}
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">How trip optimization works:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Rearranges future trips to maximize available days</li>
                            <li>• Ensures compliance with 90/180-day Schengen rules</li>
                            <li>• Only modifies trips from today forward</li>
                            <li>• Shows you exactly what changes and why</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Trip Optimization Component */}
                    <TripOptimization 
                      trips={trips}
                      onTripsUpdated={onTripsUpdated}
                    />
                  </>
                ) : (
                  /* No Optimizable Trips State */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Need More Trips to Optimize
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Add at least 2 future trips to enable trip optimization. 
                      The optimizer works best with multiple trips to arrange.
                    </p>
                    <p className="text-xs text-gray-500">
                      Current future trips: {futureTrips.length}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Floating Minimize/Expand Button (when minimized initially) */}
      {minimized && !isExpanded && hasOptimizableTrips && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          onClick={() => setIsExpanded(true)}
          className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Zap className="h-5 w-5" />
        </motion.button>
      )}
    </motion.div>
  )
}

// Compact version for mobile or constrained spaces
export function CompactTripOptimizer({
  trips,
  onTripsUpdated,
  className
}: TripOptimizerWidgetProps) {
  const [showModal, setShowModal] = useState(false)

  const today = startOfDay(new Date())
  const futureTrips = trips.filter(trip => !isBefore(trip.endDate, today))
  const hasOptimizableTrips = futureTrips.length >= 2

  if (!hasOptimizableTrips) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className={cn(
          'w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white',
          className
        )}
      >
        <Zap className="h-4 w-4 mr-2" />
        Optimize {futureTrips.length} trips
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-8 bg-white rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Trip Optimization</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                <TripOptimization
                  trips={trips}
                  onTripsUpdated={(optimizedTrips) => {
                    onTripsUpdated(optimizedTrips)
                    setShowModal(false)
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}