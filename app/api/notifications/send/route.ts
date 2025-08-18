import { NextRequest, NextResponse } from 'next/server'
import webpush from 'web-push'

// In a real application, these would be environment variables
const VAPID_KEYS = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa40HI4YOu1uNiQAqCeHPASpjQFVA2MmL7LGCNiOy1uUULO6gQYE4K2YqFQ8cQ',
  privateKey: process.env.VAPID_PRIVATE_KEY || 'example-private-key-32-bytes-long-demo-key'
}

// Only configure web-push if we have valid keys
if (process.env.VAPID_PRIVATE_KEY && VAPID_KEYS.privateKey !== 'example-private-key-32-bytes-long-demo-key') {
  try {
    webpush.setVapidDetails(
      'mailto:your-email@example.com', // Replace with your email
      VAPID_KEYS.publicKey,
      VAPID_KEYS.privateKey
    )
  } catch (error) {
    console.warn('Invalid VAPID keys provided, push notifications will not work:', error)
  }
}

interface NotificationPayload {
  title: string
  body: string
  type: 'departure_reminder' | 'return_reminder' | 'compliance_warning' | 'overstay_alert' | 'window_reset' | 'document_reminder'
  urgency?: 'low' | 'normal' | 'high'
  tripData?: any
  targetUsers?: string[] // User IDs to send to
}

export async function POST(request: NextRequest) {
  try {
    const payload: NotificationPayload = await request.json()
    
    if (!payload.title || !payload.body || !payload.type) {
      return NextResponse.json(
        { error: 'Missing required fields: title, body, type' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Authenticate the request (API key, admin auth, etc.)
    // 2. Fetch active subscriptions from database
    // 3. Filter subscriptions based on user preferences
    // 4. Send notifications to all relevant subscriptions
    
    console.log('Notification send requested:', {
      title: payload.title,
      type: payload.type,
      urgency: payload.urgency || 'normal',
      targetUsers: payload.targetUsers?.length || 'all',
      timestamp: new Date().toISOString()
    })

    // For development, we'll just log the notification
    const notificationData = {
      title: payload.title,
      body: payload.body,
      type: payload.type,
      urgency: payload.urgency || 'normal',
      tripData: payload.tripData,
      timestamp: Date.now()
    }

    // In a real app, iterate through subscriptions and send:
    // const subscriptions = await getActiveSubscriptions(payload.targetUsers)
    // const results = await Promise.allSettled(
    //   subscriptions.map(subscription => 
    //     webpush.sendNotification(subscription, JSON.stringify(notificationData))
    //   )
    // )

    return NextResponse.json({
      success: true,
      message: 'Notification queued for delivery',
      notificationId: `notif_${Date.now()}`,
      payload: notificationData
    })

  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

// Test endpoint to send a sample notification
export async function GET() {
  try {
    const testNotification = {
      title: '🧪 Test Notification',
      body: 'This is a test notification from the Schengen Calculator API',
      type: 'departure_reminder' as const,
      urgency: 'normal' as const,
      tripData: {
        destination: 'Test Country',
        startDate: new Date().toISOString()
      }
    }

    console.log('Test notification generated:', testNotification)

    return NextResponse.json({
      success: true,
      message: 'Test notification generated',
      testPayload: testNotification,
      instructions: 'POST this payload to the same endpoint to send the notification'
    })

  } catch (error) {
    console.error('Error generating test notification:', error)
    return NextResponse.json(
      { error: 'Failed to generate test notification' },
      { status: 500 }
    )
  }
}