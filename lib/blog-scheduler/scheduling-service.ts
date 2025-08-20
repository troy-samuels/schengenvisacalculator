import { createClient } from '../supabase/client'
import { BlogSchedule, ScheduledPost, SchedulingSettings, WeeklyPlan, ContentQueue } from './types'
import { countries } from '../data/countries'

export class BlogSchedulingService {
  private supabase = createClient()

  /**
   * Initialize a new blog schedule for 1000 posts at 3 per week
   */
  async createBlogSchedule(targetCount: number = 1000, postsPerWeek: number = 3): Promise<BlogSchedule> {
    const estimatedWeeks = Math.ceil(targetCount / postsPerWeek)
    const estimatedEndDate = new Date()
    estimatedEndDate.setDate(estimatedEndDate.getDate() + (estimatedWeeks * 7))

    const defaultSettings: SchedulingSettings = {
      timeZone: 'UTC',
      publishingHours: { start: 9, end: 17 }, // 9 AM to 5 PM
      excludedDays: [], // Allow all days
      minHoursBetweenPosts: 24, // Minimum 24 hours between posts
      randomizePublishTime: true,
      contentTypes: ['country-to-schengen', 'digital-nomad-guide', 'visa-comparison', 'faq-page'],
      priorityOrder: [
        { templateId: 'country-to-schengen', weight: 40 },
        { templateId: 'digital-nomad-guide', weight: 30 },
        { templateId: 'visa-comparison', weight: 20 },
        { templateId: 'faq-page', weight: 10 }
      ]
    }

    const { data, error } = await this.supabase
      .from('blog_schedules')
      .insert({
        target_count: targetCount,
        posts_per_week: postsPerWeek,
        estimated_end_date: estimatedEndDate.toISOString(),
        settings: defaultSettings
      })
      .select()
      .single()

    if (error) throw new Error(`Failed to create blog schedule: ${error.message}`)

    return this.mapScheduleFromDB(data)
  }

  /**
   * Generate and schedule posts for the next N weeks
   */
  async scheduleNextWeeks(scheduleId: string, weeksToSchedule: number = 4): Promise<ScheduledPost[]> {
    const schedule = await this.getSchedule(scheduleId)
    if (!schedule) throw new Error('Schedule not found')

    const scheduledPosts: ScheduledPost[] = []
    const startDate = new Date()
    
    for (let week = 0; week < weeksToSchedule; week++) {
      const weekStart = new Date(startDate)
      weekStart.setDate(startDate.getDate() + (week * 7))
      
      const weeklyPlan = await this.generateWeeklyPlan(schedule, weekStart)
      const weekPosts = await this.scheduleWeeklyPosts(scheduleId, weeklyPlan)
      
      scheduledPosts.push(...weekPosts)
    }

    console.log(`Scheduled ${scheduledPosts.length} posts for the next ${weeksToSchedule} weeks`)
    return scheduledPosts
  }

  /**
   * Generate a random publishing schedule for one week
   */
  async generateWeeklyPlan(schedule: BlogSchedule, weekStart: Date): Promise<WeeklyPlan> {
    const settings = schedule.settings
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    
    // Generate random days for posting (3 posts per week)
    const availableDays = this.getAvailableDays(weekStart, settings)
    const selectedDays = this.selectRandomDays(availableDays, schedule.postsPerWeek)
    
    // Generate random times for each selected day
    const scheduledPosts: ScheduledPost[] = []
    
    for (const day of selectedDays) {
      const publishTime = this.generateRandomPublishTime(day, settings)
      const contentType = this.selectContentType(settings.priorityOrder)
      
      scheduledPosts.push({
        id: '', // Will be set when saved to DB
        scheduleId: schedule.id,
        templateId: contentType,
        scheduledFor: publishTime,
        status: 'pending',
        publishAttempts: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    // Sort by scheduled time
    scheduledPosts.sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime())

    // Ensure minimum spacing between posts
    this.enforceMinimumSpacing(scheduledPosts, settings.minHoursBetweenPosts)

    return {
      weekStart,
      weekEnd,
      scheduledPosts,
      contentTypeDistribution: this.calculateContentDistribution(scheduledPosts),
      publishingDays: selectedDays.map(d => d.getDay()),
      averageTimeSpacing: this.calculateAverageSpacing(scheduledPosts)
    }
  }

  /**
   * Save weekly posts to database
   */
  private async scheduleWeeklyPosts(scheduleId: string, weeklyPlan: WeeklyPlan): Promise<ScheduledPost[]> {
    const posts = []
    
    for (const post of weeklyPlan.scheduledPosts) {
      // Generate content variables for this post
      const variables = await this.generateContentVariables(post.templateId)
      
      const { data, error } = await this.supabase
        .from('scheduled_posts')
        .insert({
          schedule_id: scheduleId,
          template_id: post.templateId,
          scheduled_for: post.scheduledFor.toISOString(),
          content_variables: variables,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error(`Failed to schedule post: ${error.message}`)
        continue
      }

      posts.push(this.mapPostFromDB(data))
    }

    return posts
  }

  /**
   * Get available days for posting (excluding holidays and blackout dates)
   */
  private getAvailableDays(weekStart: Date, settings: SchedulingSettings): Date[] {
    const days: Date[] = []
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      
      // Skip excluded days
      if (settings.excludedDays.includes(day.getDay())) {
        continue
      }
      
      // Skip holidays (would need to check special_dates table)
      if (await this.isHoliday(day)) {
        continue
      }
      
      days.push(day)
    }
    
    return days
  }

  /**
   * Randomly select N days from available days
   */
  private selectRandomDays(availableDays: Date[], count: number): Date[] {
    if (availableDays.length <= count) {
      return availableDays
    }
    
    const selected: Date[] = []
    const daysCopy = [...availableDays]
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * daysCopy.length)
      selected.push(daysCopy.splice(randomIndex, 1)[0])
    }
    
    return selected.sort((a, b) => a.getTime() - b.getTime())
  }

  /**
   * Generate a random publish time within business hours
   */
  private generateRandomPublishTime(day: Date, settings: SchedulingSettings): Date {
    const { start, end } = settings.publishingHours
    
    if (settings.randomizePublishTime) {
      // Random hour between start and end
      const randomHour = start + Math.floor(Math.random() * (end - start))
      // Random minute
      const randomMinute = Math.floor(Math.random() * 60)
      
      const publishTime = new Date(day)
      publishTime.setHours(randomHour, randomMinute, 0, 0)
      
      return publishTime
    } else {
      // Use a more predictable time (e.g., 10 AM)
      const publishTime = new Date(day)
      publishTime.setHours(10, 0, 0, 0)
      return publishTime
    }
  }

  /**
   * Select content type based on weighted priority
   */
  private selectContentType(priorityOrder: any[]): string {
    const totalWeight = priorityOrder.reduce((sum, item) => sum + item.weight, 0)
    const random = Math.random() * totalWeight
    
    let currentWeight = 0
    for (const item of priorityOrder) {
      currentWeight += item.weight
      if (random <= currentWeight) {
        return item.templateId
      }
    }
    
    // Fallback to first item
    return priorityOrder[0]?.templateId || 'country-to-schengen'
  }

  /**
   * Ensure minimum time spacing between posts
   */
  private enforceMinimumSpacing(posts: ScheduledPost[], minHours: number): void {
    for (let i = 1; i < posts.length; i++) {
      const currentPost = posts[i]
      const previousPost = posts[i - 1]
      
      const timeDiff = currentPost.scheduledFor.getTime() - previousPost.scheduledFor.getTime()
      const minSpacing = minHours * 60 * 60 * 1000 // Convert to milliseconds
      
      if (timeDiff < minSpacing) {
        // Adjust current post time
        const newTime = new Date(previousPost.scheduledFor.getTime() + minSpacing)
        currentPost.scheduledFor = newTime
      }
    }
  }

  /**
   * Generate content variables for a specific template
   */
  private async generateContentVariables(templateId: string): Promise<Record<string, any>> {
    switch (templateId) {
      case 'country-to-schengen':
        const country = this.selectRandomCountry()
        return {
          fromCountry: country.name,
          fromCountryCode: country.code,
          flag: country.flag,
          lastUpdated: new Date().toLocaleDateString()
        }
        
      case 'digital-nomad-guide':
        const nomadCountry = this.selectRandomNomadDestination()
        return {
          countryName: nomadCountry.name,
          countryCode: nomadCountry.code,
          flag: nomadCountry.flag,
          lastUpdated: new Date().toLocaleDateString()
        }
        
      case 'visa-comparison':
        const countries2 = this.selectRandomCountryPair()
        return {
          country1: countries2[0].name,
          country2: countries2[1].name,
          flag1: countries2[0].flag,
          flag2: countries2[1].flag,
          lastUpdated: new Date().toLocaleDateString()
        }
        
      case 'faq-page':
        const topics = ['general', 'digital-nomad', 'business-travel', 'student-visa', 'family-visit']
        return {
          topic: topics[Math.floor(Math.random() * topics.length)],
          lastUpdated: new Date().toLocaleDateString()
        }
        
      default:
        return {}
    }
  }

  /**
   * Process pending scheduled posts (to be called by cron job)
   */
  async processPendingPosts(): Promise<void> {
    const now = new Date()
    
    // Get posts scheduled for publishing now or earlier
    const { data: pendingPosts, error } = await this.supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', now.toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(10)

    if (error) {
      console.error('Failed to fetch pending posts:', error)
      return
    }

    console.log(`Processing ${pendingPosts.length} pending posts`)

    for (const post of pendingPosts) {
      try {
        await this.publishPost(post.id)
      } catch (error) {
        console.error(`Failed to publish post ${post.id}:`, error)
        
        // Update error count and status
        await this.supabase
          .from('scheduled_posts')
          .update({
            publish_attempts: post.publish_attempts + 1,
            last_error: error instanceof Error ? error.message : 'Unknown error',
            status: post.publish_attempts >= 3 ? 'failed' : 'pending'
          })
          .eq('id', post.id)
      }
    }
  }

  /**
   * Publish a single scheduled post
   */
  private async publishPost(postId: string): Promise<void> {
    // Get the scheduled post
    const { data: post, error: postError } = await this.supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (postError) throw new Error(`Post not found: ${postError.message}`)

    // Update status to generating
    await this.supabase
      .from('scheduled_posts')
      .update({ status: 'generating' })
      .eq('id', postId)

    // Generate the content using the content generation service
    const contentGenerator = await import('../content-generation/content-generator')
    const generator = new contentGenerator.ContentGeneratorService()

    let generatedPage
    
    switch (post.template_id) {
      case 'country-to-schengen':
        const country = countries.find(c => c.name === post.content_variables.fromCountry)
        if (country) {
          generatedPage = await generator.generateCountryToSchengenPage(country)
        }
        break
        
      case 'digital-nomad-guide':
        const nomadCountry = countries.find(c => c.name === post.content_variables.countryName)
        if (nomadCountry) {
          generatedPage = await generator.generateDigitalNomadPage(nomadCountry)
        }
        break
        
      // Add other template types as needed
    }

    if (!generatedPage) {
      throw new Error('Failed to generate content')
    }

    // Save the generated page
    await generator.savePages([generatedPage])

    // Update the scheduled post
    await this.supabase
      .from('scheduled_posts')
      .update({
        page_id: generatedPage.id,
        status: 'published',
        generated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      })
      .eq('id', postId)

    console.log(`Successfully published post ${postId}`)
  }

  // Helper methods

  private async isHoliday(date: Date): Promise<boolean> {
    const { data } = await this.supabase
      .from('special_dates')
      .select('id')
      .eq('date', date.toISOString().split('T')[0])
      .eq('adjust_publishing', true)
      .limit(1)

    return (data?.length || 0) > 0
  }

  private selectRandomCountry() {
    const nonSchengenCountries = countries.filter(c => !c.schengenStatus.includes('schengen'))
    return nonSchengenCountries[Math.floor(Math.random() * nonSchengenCountries.length)]
  }

  private selectRandomNomadDestination() {
    const popularCountries = countries.filter(c => c.popular)
    return popularCountries[Math.floor(Math.random() * popularCountries.length)]
  }

  private selectRandomCountryPair() {
    const allCountries = countries.filter(c => c.popular)
    const country1 = allCountries[Math.floor(Math.random() * allCountries.length)]
    let country2 = allCountries[Math.floor(Math.random() * allCountries.length)]
    
    // Ensure different countries
    while (country2.code === country1.code) {
      country2 = allCountries[Math.floor(Math.random() * allCountries.length)]
    }
    
    return [country1, country2]
  }

  private calculateContentDistribution(posts: ScheduledPost[]): Record<string, number> {
    const distribution: Record<string, number> = {}
    
    for (const post of posts) {
      distribution[post.templateId] = (distribution[post.templateId] || 0) + 1
    }
    
    return distribution
  }

  private calculateAverageSpacing(posts: ScheduledPost[]): number {
    if (posts.length < 2) return 0
    
    let totalSpacing = 0
    for (let i = 1; i < posts.length; i++) {
      const spacing = posts[i].scheduledFor.getTime() - posts[i - 1].scheduledFor.getTime()
      totalSpacing += spacing
    }
    
    return totalSpacing / (posts.length - 1) / (1000 * 60 * 60) // Convert to hours
  }

  private async getSchedule(id: string): Promise<BlogSchedule | null> {
    const { data, error } = await this.supabase
      .from('blog_schedules')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return this.mapScheduleFromDB(data)
  }

  private mapScheduleFromDB(data: any): BlogSchedule {
    return {
      id: data.id,
      status: data.status,
      targetCount: data.target_count,
      currentCount: data.current_count,
      postsPerWeek: data.posts_per_week,
      startDate: new Date(data.start_date),
      estimatedEndDate: new Date(data.estimated_end_date),
      settings: data.settings,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    }
  }

  private mapPostFromDB(data: any): ScheduledPost {
    return {
      id: data.id,
      scheduleId: data.schedule_id,
      pageId: data.page_id,
      templateId: data.template_id,
      scheduledFor: new Date(data.scheduled_for),
      status: data.status,
      publishAttempts: data.publish_attempts,
      lastError: data.last_error,
      contentVariables: data.content_variables,
      generatedAt: data.generated_at ? new Date(data.generated_at) : undefined,
      publishedAt: data.published_at ? new Date(data.published_at) : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    }
  }

  // Public API methods

  async getSchedulingStats(scheduleId: string): Promise<any> {
    const { data: posts } = await this.supabase
      .from('scheduled_posts')
      .select('*')
      .eq('schedule_id', scheduleId)

    const total = posts?.length || 0
    const published = posts?.filter(p => p.status === 'published').length || 0
    const pending = posts?.filter(p => p.status === 'pending').length || 0
    const failed = posts?.filter(p => p.status === 'failed').length || 0

    const nextPost = posts
      ?.filter(p => p.status === 'pending')
      ?.sort((a, b) => new Date(a.scheduled_for).getTime() - new Date(b.scheduled_for).getTime())[0]

    return {
      totalScheduled: total,
      published,
      pending,
      failed,
      successRate: total > 0 ? (published / total) * 100 : 0,
      nextPublishDate: nextPost ? new Date(nextPost.scheduled_for) : null,
      recentActivity: posts?.slice(-10) || []
    }
  }

  async pauseSchedule(scheduleId: string): Promise<void> {
    await this.supabase
      .from('blog_schedules')
      .update({ status: 'paused' })
      .eq('id', scheduleId)
  }

  async resumeSchedule(scheduleId: string): Promise<void> {
    await this.supabase
      .from('blog_schedules')
      .update({ status: 'active' })
      .eq('id', scheduleId)
  }
}