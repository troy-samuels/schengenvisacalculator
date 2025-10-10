import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Ensure this route runs in the Node.js runtime and is never statically optimized
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Support both live and test webhook secrets; attempt verification in this order
const webhookSecretLive = process.env.STRIPE_WEBHOOK_SECRET
const webhookSecretTest = process.env.STRIPE_WEBHOOK_SECRET_TEST

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('❌ Missing Stripe-Signature header')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event | null = null

    // Try verification with live secret first, then test secret if provided
    const verificationAttempts: Array<{ label: 'live' | 'test'; secret?: string | null }> = [
      { label: 'live', secret: webhookSecretLive },
      { label: 'test', secret: webhookSecretTest },
    ]

    let lastError: unknown = null
    for (const attempt of verificationAttempts) {
      if (!attempt.secret) continue
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, attempt.secret)
        console.log(`🔐 Stripe webhook verified using ${attempt.label} secret`)
        break
      } catch (err) {
        lastError = err
      }
    }

    if (!event) {
      console.error('❌ Webhook signature verification failed for all known secrets:', lastError)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log(`🔔 Stripe webhook received: ${event.type} (live=${event.livemode === true})`)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(subscription)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`)
        break
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`✅ Checkout session completed: ${session.id}`)
  
  const { userId, tier, billingCycle } = session.metadata || {}
  
  if (!userId || !tier) {
    console.error('❌ Missing metadata in checkout session')
    return
  }

  try {
    if (tier === 'lifetime' || tier === 'annual') {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_tier: tier as 'lifetime' | 'annual',
          subscription_status: 'active',
        })
        .eq('id', userId)

      if (error) {
        console.error('❌ Supabase subscription update failed:', error)
      } else {
        console.log(`✅ User ${userId} subscription activated: ${tier} (${billingCycle})`)
      }
    } else if (tier === 'ees_guide') {
      const amount = (session.amount_total ?? null)
      const currency = (session.currency ?? 'gbp')

      // Idempotent upsert by unique stripe_session_id to avoid duplicate inserts on retries
      const { error: purchaseError } = await supabaseAdmin
        .from('purchases')
        .upsert({
          user_id: userId,
          product: 'ees_guide',
          status: 'paid',
          amount,
          currency,
          stripe_session_id: session.id,
          created_at: new Date().toISOString()
        }, { onConflict: 'stripe_session_id' })

      if (purchaseError) {
        console.error('❌ Failed to record EES Guide purchase:', purchaseError)
      } else {
        console.log(`✅ Recorded EES Guide purchase for user ${userId}`)
      }
    }

    // TODO: Send confirmation email
    // TODO: Update analytics/tracking

  } catch (error) {
    console.error('❌ Failed to update user purchase/subscription:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`✅ Subscription created: ${subscription.id}`)
  
  const { userId, tier } = subscription.metadata || {}
  
  if (!userId || !tier) {
    console.error('❌ Missing metadata in subscription')
    return
  }

  try {
    // TODO: Update database with subscription details
    console.log(`✅ Subscription ${subscription.id} created for user ${userId}`)
    
  } catch (error) {
    console.error('❌ Failed to handle subscription creation:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`🔄 Subscription updated: ${subscription.id}`)
  
  const { userId } = subscription.metadata || {}
  
  if (!userId) {
    console.error('❌ Missing userId in subscription metadata')
    return
  }

  try {
    // TODO: Update database with new subscription status/details
    console.log(`✅ Subscription ${subscription.id} updated for user ${userId}`)
    
  } catch (error) {
    console.error('❌ Failed to handle subscription update:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`❌ Subscription cancelled: ${subscription.id}`)
  
  const { userId } = subscription.metadata || {}
  
  if (!userId) {
    console.error('❌ Missing userId in subscription metadata')
    return
  }

  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        subscription_tier: 'free',
        subscription_status: 'cancelled',
      })
      .eq('id', userId)

    if (error) {
      console.error('❌ Supabase cancel update failed:', error)
    } else {
      console.log(`✅ Subscription ${subscription.id} cancelled for user ${userId}`)
    }
    
  } catch (error) {
    console.error('❌ Failed to handle subscription cancellation:', error)
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`✅ Invoice payment succeeded: ${invoice.id}`)
  
  // TODO: Update payment history
  // TODO: Send receipt email
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`❌ Invoice payment failed: ${invoice.id}`)
  
  // TODO: Notify user of failed payment
  // TODO: Update subscription status if needed
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests from Stripe.' },
    { status: 405 }
  )
}