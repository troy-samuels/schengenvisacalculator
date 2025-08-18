import { NextRequest, NextResponse } from 'next/server'

export interface TripData {
  id?: string
  startDate: string
  endDate: string
  countries: string[]
  purpose?: string
  notes?: string
  userId?: string
}

export async function POST(request: NextRequest) {
  try {
    const tripData: TripData = await request.json()
    
    // Validate required fields
    if (!tripData.startDate || !tripData.endDate || !tripData.countries || tripData.countries.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: startDate, endDate, countries' },
        { status: 400 }
      )
    }

    // Validate date format
    const startDate = new Date(tripData.startDate)
    const endDate = new Date(tripData.endDate)
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Authenticate the user
    // 2. Validate user permissions
    // 3. Store in database with proper relationships
    // 4. Update notification schedules
    // 5. Log the sync event
    
    const syncedTrip = {
      ...tripData,
      id: tripData.id || `trip-${Date.now()}`,
      syncedAt: new Date().toISOString(),
      duration: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    }

    console.log('Trip sync successful:', {
      id: syncedTrip.id,
      countries: tripData.countries.join(', '),
      duration: syncedTrip.duration,
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Trip data synchronized successfully',
      trip: syncedTrip
    })

  } catch (error) {
    console.error('Error syncing trip data:', error)
    return NextResponse.json(
      { error: 'Failed to sync trip data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, return user's trips from database
    // For now, return empty array since we're not storing in DB
    
    return NextResponse.json({
      success: true,
      trips: [],
      message: 'No trips found (database not configured)'
    })
  } catch (error) {
    console.error('Error fetching trip data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trip data' },
      { status: 500 }
    )
  }
}