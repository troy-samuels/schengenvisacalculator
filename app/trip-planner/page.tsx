'use client'

import { TripManager } from '@/components/trip-manager'

export default function TripPlannerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <TripManager />
      </div>
    </div>
  )
}