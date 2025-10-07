import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Price IDs from environment
const PRICE_LIFETIME = process.env.STRIPE_PRICE_LIFETIME // one-time price id
const PRICE_ANNUAL_YEARLY = process.env.STRIPE_PRICE_ANNUAL // yearly subscription price id
const PRICE_EES_GUIDE = process.env.STRIPE_PRICE_EES_GUIDE // one-time EES Guide add-on

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      tier, 
      billingCycle = 'monthly', 
      userId, 
      userEmail, 
      successUrl, 
      cancelUrl,
      metadata = {} 
    } = body

    // Validate required parameters
    if (!tier || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters: tier, userId, userEmail' },
        { status: 400 }
      )
    }

    let session: Stripe.Checkout.Session
    let priceId: string | undefined
    let amount: number | null = null

    if (tier === 'lifetime' && billingCycle === 'one_time') {
      if (!PRICE_LIFETIME) {
        return NextResponse.json(
          { error: 'Lifetime price ID not configured (STRIPE_PRICE_LIFETIME)' },
          { status: 400 }
        )
      }
      priceId = PRICE_LIFETIME
      // Fetch amount for client display
      const price = await stripe.prices.retrieve(priceId)
      amount = typeof price.unit_amount === 'number' ? price.unit_amount : null

      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          { price: priceId, quantity: 1 },
        ],
        customer_email: userEmail,
        metadata: {
          userId,
          tier,
          billingCycle,
          ...metadata,
        },
        success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancelled`,
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        tax_id_collection: { enabled: true },
      })
    } else if (tier === 'annual' && billingCycle === 'yearly') {
      if (!PRICE_ANNUAL_YEARLY) {
        return NextResponse.json(
          { error: 'Annual yearly price ID not configured (STRIPE_PRICE_ANNUAL)' },
          { status: 400 }
        )
      }
      priceId = PRICE_ANNUAL_YEARLY
      const price = await stripe.prices.retrieve(priceId)
      amount = typeof price.unit_amount === 'number' ? price.unit_amount : null

      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          { price: priceId, quantity: 1 },
        ],
        customer_email: userEmail,
        metadata: {
          userId,
          tier,
          billingCycle,
          ...metadata,
        },
        success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancelled`,
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        tax_id_collection: { enabled: true },
        subscription_data: {
          metadata: { userId, tier, billingCycle },
        },
      })
    } else if (tier === 'ees_guide' && billingCycle === 'one_time') {
      if (!PRICE_EES_GUIDE) {
        return NextResponse.json(
          { error: 'EES Guide price ID not configured (STRIPE_PRICE_EES_GUIDE)' },
          { status: 400 }
        )
      }
      priceId = PRICE_EES_GUIDE
      const price = await stripe.prices.retrieve(priceId)
      amount = typeof price.unit_amount === 'number' ? price.unit_amount : null

      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          { price: priceId, quantity: 1 },
        ],
        customer_email: userEmail,
        metadata: {
          userId,
          tier,
          billingCycle,
          ...metadata,
        },
        success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/ees/guide/download`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/ees/guide`,
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        tax_id_collection: { enabled: true },
      })
    } else {
      return NextResponse.json(
        { error: `Unsupported tier/billingCycle combination: ${tier}/${billingCycle}` },
        { status: 400 }
      )
    }

    console.log(`✅ Stripe checkout session created: ${session.id} for user ${userId} (${tier} ${billingCycle})`)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      tier,
      billingCycle,
      amount,
    })

  } catch (error) {
    console.error('❌ Stripe checkout session creation failed:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: 'Payment processing error', 
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

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create checkout sessions.' },
    { status: 405 }
  )
}