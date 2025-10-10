import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface SubscriptionRequest {
  email: string
  source?: string
  leadMagnet?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionRequest = await request.json()
    const { email, source = 'unknown', leadMagnet } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      console.error('Error checking existing subscriber:', checkError)
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      )
    }

    // If already subscribed and active
    if (existing && existing.status === 'active') {
      return NextResponse.json(
        { error: 'This email is already subscribed!' },
        { status: 400 }
      )
    }

    // If previously unsubscribed, reactivate
    if (existing && existing.status === 'unsubscribed') {
      const { error: updateError } = await supabaseAdmin
        .from('newsletter_subscribers')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString(),
          source,
          lead_magnet: leadMagnet
        })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Error reactivating subscriber:', updateError)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }

      // TODO: Send welcome back email
      return NextResponse.json({
        success: true,
        message: 'Welcome back! You\'ve been resubscribed.'
      })
    }

    // New subscriber
    const { error: insertError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        source,
        lead_magnet: leadMagnet,
        status: 'active',
        subscribed_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Error inserting subscriber:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    // TODO: Send welcome email with lead magnet if applicable
    // TODO: Add to email marketing platform (SendGrid, Resend, etc.)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
