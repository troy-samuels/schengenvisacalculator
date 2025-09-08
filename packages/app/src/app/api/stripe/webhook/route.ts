import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    console.log(`🔔 Stripe webhook received: ${event.type}`)

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
    // TODO: Update user subscription in database
    // This would typically update your Supabase database with:
    // - subscription status: 'active'
    // - subscription tier: tier
    // - stripe_customer_id: session.customer
    // - stripe_subscription_id: session.subscription
    // - billing_cycle: billingCycle
    // - current_period_end: subscription.current_period_end

    console.log(`✅ User ${userId} subscription activated: ${tier} (${billingCycle})`)
    
    // TODO: Send confirmation email
    // TODO: Update analytics/tracking
    
  } catch (error) {
    console.error('❌ Failed to update user subscription:', error)
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
    // TODO: Update database - set subscription status to 'cancelled'
    // TODO: Downgrade user to free tier
    console.log(`✅ Subscription ${subscription.id} cancelled for user ${userId}`)
    
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