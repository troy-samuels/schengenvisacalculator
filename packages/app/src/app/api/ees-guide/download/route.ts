/**
 * EES Guide Download Endpoint
 * Verifies purchase and provides download access to EES Quick Card PDF
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // 1. Check user authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // 2. Verify user has purchased the EES Guide
    const { data: purchases, error: purchaseError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('product', 'ees_guide')
      .eq('status', 'paid')
      .order('created_at', { ascending: false })
      .limit(1)

    if (purchaseError) {
      console.error('Error checking purchase:', purchaseError)
      return NextResponse.json({ error: 'Error verifying purchase' }, { status: 500 })
    }

    if (!purchases || purchases.length === 0) {
      return NextResponse.json(
        { error: 'EES Guide not purchased. Please purchase the guide first.' },
        { status: 403 }
      )
    }

    const purchase = purchases[0]

    // 3. Get signed URL from Supabase Storage
    // File path: ees_products/ees-quick-card-v1.pdf
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('ees_products')
      .createSignedUrl('ees-quick-card-v1.pdf', 86400) // 24 hour expiry

    if (urlError) {
      console.error('Error generating signed URL:', urlError)

      // Fallback: If storage not set up yet, return purchase info
      return NextResponse.json({
        error: 'Download temporarily unavailable. Please contact support.',
        purchaseId: purchase.id,
        purchaseDate: purchase.created_at,
        supportEmail: 'support@euborder.com',
      }, { status: 503 })
    }

    // 4. Return signed URL for download
    return NextResponse.json({
      downloadUrl: signedUrlData.signedUrl,
      purchaseId: purchase.id,
      purchaseDate: purchase.created_at,
      expiresIn: '24 hours',
    })
  } catch (error) {
    console.error('❌ EES Guide download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET to download the guide.' },
    { status: 405 }
  )
}
