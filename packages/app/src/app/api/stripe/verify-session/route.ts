import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'subscription']
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed', status: session.payment_status },
        { status: 400 }
      )
    }

    const { userId, tier, billingCycle } = session.metadata || {}

    if (!userId || !tier) {
      console.error('Missing metadata in session:', session.id)
    }

    // Extract subscription details
    const subscription = session.subscription as Stripe.Subscription
    const lineItem = session.line_items?.data[0]
    const price = lineItem?.price

    const sessionDetails = {
      sessionId: session.id,
      paymentStatus: session.payment_status,
      tier: tier || 'premium',
      billingCycle: billingCycle || 'monthly',
      amount: price?.unit_amount ? (price.unit_amount / 100) : 9.99,
      currency: price?.currency || 'usd',
      customerEmail: session.customer_details?.email,
      customerId: session.customer,
      subscriptionId: subscription?.id,
      currentPeriodEnd: subscription?.current_period_end 
        ? new Date(subscription.current_period_end * 1000) 
        : null,
      userId: userId,
      createdAt: new Date(session.created * 1000),
    }

    console.log(`✅ Session verified: ${sessionId} for user ${userId} (${tier} ${billingCycle})`)

    // TODO: Update user subscription in your database here
    // This should update the user's subscription status to active
    // and store the Stripe customer and subscription IDs

    return NextResponse.json({
      success: true,
      session: sessionDetails
    })

  } catch (error) {
    console.error('❌ Session verification error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: 'Stripe error', 
          details: error.message,
          type: error.type 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET to verify sessions.' },
    { status: 405 }
  )
}