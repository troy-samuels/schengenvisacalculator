import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Subscription tier pricing configuration
const SUBSCRIPTION_PRICES = {
  premium: {
    monthly: 'price_premium_monthly', // Replace with actual Stripe price ID
    yearly: 'price_premium_yearly',   // Replace with actual Stripe price ID
    amount: 999, // $9.99 in cents
  },
  pro: {
    monthly: 'price_pro_monthly',     // Replace with actual Stripe price ID
    yearly: 'price_pro_yearly',       // Replace with actual Stripe price ID
    amount: 1999, // $19.99 in cents
  },
  business: {
    monthly: 'price_business_monthly', // Replace with actual Stripe price ID
    yearly: 'price_business_yearly',   // Replace with actual Stripe price ID
    amount: 4999, // $49.99 in cents
  }
}

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

    // Validate subscription tier
    if (!SUBSCRIPTION_PRICES[tier as keyof typeof SUBSCRIPTION_PRICES]) {
      return NextResponse.json(
        { error: `Invalid subscription tier: ${tier}` },
        { status: 400 }
      )
    }

    // Get the appropriate price ID
    const priceConfig = SUBSCRIPTION_PRICES[tier as keyof typeof SUBSCRIPTION_PRICES]
    const priceId = billingCycle === 'yearly' ? priceConfig.yearly : priceConfig.monthly

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
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
      tax_id_collection: {
        enabled: true,
      },
      subscription_data: {
        metadata: {
          userId,
          tier,
          billingCycle,
        },
      },
    })

    console.log(`✅ Stripe checkout session created: ${session.id} for user ${userId} (${tier} ${billingCycle})`)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      tier,
      billingCycle,
      amount: priceConfig.amount,
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