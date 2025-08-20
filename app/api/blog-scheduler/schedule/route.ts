import { NextRequest, NextResponse } from 'next/server'
import { BlogSchedulingService } from '@/lib/blog-scheduler/scheduling-service'

/**
 * Blog Scheduling API
 * Manages automated blog posting schedules
 */

/**
 * Create a new blog schedule
 * POST /api/blog-scheduler/schedule
 */
export async function POST(request: NextRequest) {
  try {
    const { targetCount = 1000, postsPerWeek = 3, weeksToSchedule = 4 } = await request.json()

    const scheduler = new BlogSchedulingService()
    
    // Create the schedule
    const schedule = await scheduler.createBlogSchedule(targetCount, postsPerWeek)
    
    // Schedule the first few weeks
    const scheduledPosts = await scheduler.scheduleNextWeeks(schedule.id, weeksToSchedule)

    return NextResponse.json({
      success: true,
      schedule: {
        id: schedule.id,
        targetCount: schedule.targetCount,
        postsPerWeek: schedule.postsPerWeek,
        estimatedEndDate: schedule.estimatedEndDate,
        status: schedule.status
      },
      scheduledPosts: scheduledPosts.length,
      weeksScheduled: weeksToSchedule,
      message: `Created schedule for ${targetCount} posts at ${postsPerWeek} per week. Scheduled ${scheduledPosts.length} posts for the next ${weeksToSchedule} weeks.`
    })

  } catch (error) {
    console.error('Failed to create blog schedule:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create schedule',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Get blog schedule information
 * GET /api/blog-scheduler/schedule?id=schedule_id
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const scheduleId = searchParams.get('id')

    if (!scheduleId) {
      return NextResponse.json(
        { error: 'Schedule ID is required' },
        { status: 400 }
      )
    }

    const scheduler = new BlogSchedulingService()
    const stats = await scheduler.getSchedulingStats(scheduleId)

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error) {
    console.error('Failed to get schedule stats:', error)
    return NextResponse.json(
      { error: 'Failed to get schedule information' },
      { status: 500 }
    )
  }
}

/**
 * Update blog schedule settings
 * PUT /api/blog-scheduler/schedule
 */
export async function PUT(request: NextRequest) {
  try {
    const { scheduleId, action, ...updateData } = await request.json()

    if (!scheduleId) {
      return NextResponse.json(
        { error: 'Schedule ID is required' },
        { status: 400 }
      )
    }

    const scheduler = new BlogSchedulingService()

    switch (action) {
      case 'pause':
        await scheduler.pauseSchedule(scheduleId)
        break
      
      case 'resume':
        await scheduler.resumeSchedule(scheduleId)
        break
      
      case 'schedule-more':
        const weeks = updateData.weeks || 4
        const scheduledPosts = await scheduler.scheduleNextWeeks(scheduleId, weeks)
        return NextResponse.json({
          success: true,
          message: `Scheduled ${scheduledPosts.length} more posts for the next ${weeks} weeks`
        })
      
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: `Schedule ${action} successful`
    })

  } catch (error) {
    console.error('Failed to update schedule:', error)
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    )
  }
}