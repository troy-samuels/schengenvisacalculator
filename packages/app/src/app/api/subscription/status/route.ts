import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    // TODO: Query your database for subscription status
    // This is a placeholder implementation
    // In a real app, you'd query your Supabase database like:
    
    /*
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscription status' },
        { status: 500 }
      )
    }

    if (subscription) {
      return NextResponse.json({
        status: subscription.tier || 'premium',
        tier: subscription.tier,
        billingCycle: subscription.billing_cycle,
        customerId: subscription.stripe_customer_id,
        subscriptionId: subscription.stripe_subscription_id,
        currentPeriodEnd: subscription.current_period_end,
        isActive: subscription.status === 'active'
      })
    }
    */

    // For now, return free tier as default
    console.log(`📊 Subscription status requested for user: ${userId}`)
    
    return NextResponse.json({
      status: 'free',
      tier: 'free',
      billingCycle: null,
      customerId: null,
      subscriptionId: null,
      currentPeriodEnd: null,
      isActive: false
    })

  } catch (error) {
    console.error('❌ Subscription status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET to fetch subscription status.' },
    { status: 405 }
  )
}