import { NextRequest, NextResponse } from 'next/server'
import { BlogSchedulingService } from '@/lib/blog-scheduler/scheduling-service'

/**
 * Cron job endpoint for automated blog publishing
 * This endpoint should be called every hour by a cron service
 * 
 * Example cron setup:
 * - Vercel Cron: https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching#cron-jobs
 * - GitHub Actions: Can be set up to call this endpoint
 * - External services: UptimeRobot, Uptime.com, etc.
 */

export const maxDuration = 300 // 5 minutes max execution time

/**
 * Cron job to process scheduled posts
 * POST /api/blog-scheduler/cron
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Verify this is a legitimate cron call
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🕒 Cron job started - processing scheduled posts')

    const scheduler = new BlogSchedulingService()
    
    // Process pending posts
    await scheduler.processPendingPosts()
    
    // Schedule more posts if needed (maintain 4-week buffer)
    await scheduler.maintainScheduleBuffer()
    
    const executionTime = Date.now() - startTime
    
    console.log(`✅ Cron job completed in ${executionTime}ms`)

    return NextResponse.json({
      success: true,
      message: 'Cron job completed successfully',
      executionTime,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    const executionTime = Date.now() - startTime
    
    console.error('❌ Cron job failed:', error)

    return NextResponse.json({
      success: false,
      error: 'Cron job failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      executionTime,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

/**
 * Health check for cron job monitoring
 * GET /api/blog-scheduler/cron
 */
export async function GET() {
  try {
    const scheduler = new BlogSchedulingService()
    const healthCheck = await scheduler.getHealthStatus()

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      nextScheduledPost: healthCheck.nextPost,
      pendingPosts: healthCheck.pendingCount,
      recentlyPublished: healthCheck.recentCount,
      systemStatus: 'operational'
    })

  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}