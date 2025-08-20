// Blog Scheduling System Types

export interface BlogSchedule {
  id: string
  status: 'active' | 'paused' | 'completed'
  targetCount: number
  currentCount: number
  postsPerWeek: number
  startDate: Date
  estimatedEndDate: Date
  settings: SchedulingSettings
  createdAt: Date
  updatedAt: Date
}

export interface SchedulingSettings {
  timeZone: string
  publishingHours: {
    start: number // 0-23 (24-hour format)
    end: number   // 0-23
  }
  excludedDays: number[] // 0=Sunday, 1=Monday, etc.
  minHoursBetweenPosts: number
  randomizePublishTime: boolean
  contentTypes: string[] // Which content types to include
  priorityOrder: ContentPriority[]
}

export interface ContentPriority {
  templateId: string
  weight: number // Higher weight = more likely to be selected
  maxPerWeek?: number
}

export interface ScheduledPost {
  id: string
  scheduleId: string
  pageId?: string // Will be set when content is generated
  templateId: string
  scheduledFor: Date
  status: 'pending' | 'generated' | 'published' | 'failed'
  publishAttempts: number
  lastError?: string
  contentVariables?: Record<string, any>
  generatedAt?: Date
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface PublishingJob {
  id: string
  postId: string
  status: 'queued' | 'running' | 'completed' | 'failed'
  progress: number
  startedAt?: Date
  completedAt?: Date
  error?: string
  logs: JobLog[]
}

export interface JobLog {
  timestamp: Date
  level: 'info' | 'warn' | 'error'
  message: string
  data?: any
}

export interface SchedulingStats {
  totalScheduled: number
  published: number
  pending: number
  failed: number
  avgPublishTime: number
  successRate: number
  estimatedTimeToComplete: number
  nextPublishDate: Date
  recentActivity: ScheduledPost[]
}

export interface WeeklyPlan {
  weekStart: Date
  weekEnd: Date
  scheduledPosts: ScheduledPost[]
  contentTypeDistribution: Record<string, number>
  publishingDays: number[]
  averageTimeSpacing: number
}

export interface ContentQueue {
  id: string
  templateId: string
  priority: number
  variables: Record<string, any>
  estimatedGenerationTime: number
  dependencies?: string[] // Other content that should be generated first
  tags: string[]
  createdAt: Date
}

export type SchedulingStrategy = 
  | 'random' 
  | 'balanced' 
  | 'peak-times' 
  | 'content-type-rotation'

export interface SchedulingConfig {
  strategy: SchedulingStrategy
  timezone: string
  businessHours: {
    start: number
    end: number
  }
  weekendPosting: boolean
  holidayAwareness: boolean
  contentMixRatio: Record<string, number>
}