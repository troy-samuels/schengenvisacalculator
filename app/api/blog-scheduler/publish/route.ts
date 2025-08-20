import { NextRequest, NextResponse } from 'next/server'
import { BlogSchedulingService } from '@/lib/blog-scheduler/scheduling-service'

/**
 * Blog Publishing API
 * Handles the actual publishing of scheduled posts
 */

/**
 * Process pending posts (typically called by cron job)
 * POST /api/blog-scheduler/publish
 */
export async function POST(request: NextRequest) {
  try {
    const { manual = false, postId } = await request.json()

    const scheduler = new BlogSchedulingService()

    if (postId) {
      // Manually publish a specific post
      await scheduler.publishPost(postId)
      return NextResponse.json({
        success: true,
        message: `Post ${postId} published successfully`
      })
    } else {
      // Process all pending posts
      await scheduler.processPendingPosts()
      return NextResponse.json({
        success: true,
        message: 'Processed all pending posts',
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('Publishing failed:', error)
    return NextResponse.json(
      { 
        error: 'Publishing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Get publishing status and queue
 * GET /api/blog-scheduler/publish
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scheduleId = searchParams.get('scheduleId')
    const limit = parseInt(searchParams.get('limit') || '50')

    const scheduler = new BlogSchedulingService()

    if (scheduleId) {
      const stats = await scheduler.getSchedulingStats(scheduleId)
      return NextResponse.json({
        success: true,
        stats
      })
    }

    // Get general publishing queue status
    const queueStatus = await scheduler.getPublishingQueue(limit)
    
    return NextResponse.json({
      success: true,
      queue: queueStatus
    })

  } catch (error) {
    console.error('Failed to get publishing status:', error)
    return NextResponse.json(
      { error: 'Failed to get publishing status' },
      { status: 500 }
    )
  }
}