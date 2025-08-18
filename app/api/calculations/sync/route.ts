import { NextRequest, NextResponse } from 'next/server'

export interface CalculationData {
  id?: string
  type: 'visa-check' | 'remaining-days' | 'window-reset' | 'compliance-check'
  input: {
    trips?: Array<{
      startDate: string
      endDate: string
      countries: string[]
    }>
    targetDate?: string
    checkDate?: string
  }
  result: {
    isCompliant: boolean
    daysUsed: number
    remainingDays: number
    windowStart: string
    windowEnd: string
    nextResetDate?: string
    warnings?: string[]
    errors?: string[]
  }
  timestamp: string
  duration?: number // calculation time in ms
}

export async function POST(request: NextRequest) {
  try {
    const calculationData: CalculationData = await request.json()
    
    // Validate required fields
    if (!calculationData.type || !calculationData.input || !calculationData.result) {
      return NextResponse.json(
        { error: 'Missing required fields: type, input, result' },
        { status: 400 }
      )
    }

    // Validate calculation type
    const validTypes = ['visa-check', 'remaining-days', 'window-reset', 'compliance-check']
    if (!validTypes.includes(calculationData.type)) {
      return NextResponse.json(
        { error: 'Invalid calculation type' },
        { status: 400 }
      )
    }

    // Validate result structure
    const { result } = calculationData
    if (typeof result.isCompliant !== 'boolean' || 
        typeof result.daysUsed !== 'number' || 
        typeof result.remainingDays !== 'number') {
      return NextResponse.json(
        { error: 'Invalid result structure' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Authenticate the user
    // 2. Store calculation in database for analytics
    // 3. Update user's calculation history
    // 4. Trigger compliance alerts if needed
    // 5. Log for audit purposes
    
    const syncedCalculation = {
      ...calculationData,
      id: calculationData.id || `calc-${Date.now()}`,
      syncedAt: new Date().toISOString(),
      version: '1.0'
    }

    // Log calculation details for monitoring
    console.log('Calculation sync successful:', {
      id: syncedCalculation.id,
      type: calculationData.type,
      isCompliant: result.isCompliant,
      daysUsed: result.daysUsed,
      remainingDays: result.remainingDays,
      hasWarnings: (result.warnings?.length || 0) > 0,
      hasErrors: (result.errors?.length || 0) > 0,
      tripCount: calculationData.input.trips?.length || 0,
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })

    // If calculation shows compliance issues, log for attention
    if (!result.isCompliant || result.remainingDays <= 10) {
      console.warn('Compliance issue detected in calculation:', {
        id: syncedCalculation.id,
        isCompliant: result.isCompliant,
        remainingDays: result.remainingDays,
        warnings: result.warnings
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Calculation data synchronized successfully',
      calculation: syncedCalculation
    })

  } catch (error) {
    console.error('Error syncing calculation data:', error)
    return NextResponse.json(
      { error: 'Failed to sync calculation data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, return user's calculation history from database
    // For now, return empty array since we're not storing in DB
    
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const type = url.searchParams.get('type')
    
    console.log('Calculation history requested:', {
      limit,
      type,
      userAgent: request.headers.get('user-agent')?.substring(0, 50)
    })
    
    return NextResponse.json({
      success: true,
      calculations: [],
      total: 0,
      message: 'No calculations found (database not configured)'
    })
  } catch (error) {
    console.error('Error fetching calculation data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calculation data' },
      { status: 500 }
    )
  }
}

// Get calculation statistics
export async function PATCH(request: NextRequest) {
  try {
    // This could return statistics about calculations
    return NextResponse.json({
      success: true,
      stats: {
        totalCalculations: 0,
        complianceIssues: 0,
        averageRemainingDays: 0,
        commonWarnings: [],
        calculationTypes: {
          'visa-check': 0,
          'remaining-days': 0,
          'window-reset': 0,
          'compliance-check': 0
        }
      },
      message: 'Statistics not available (database not configured)'
    })
  } catch (error) {
    console.error('Error fetching calculation statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calculation statistics' },
      { status: 500 }
    )
  }
}