/**
 * Invisible AI Engine
 * Background processing and contextual intelligence that works seamlessly
 * behind the scenes without explicit user interaction
 */

'use client'

import { MultiAPIIntelligence, IntelligenceRequest } from './multi-api-intelligence'
import { CostOptimizer } from './cost-optimization'
import { UserStatus } from '../types/user-status'

export interface AIContext {
  userId?: string
  userStatus: UserStatus
  userLocation?: string
  deviceType: 'mobile' | 'desktop' | 'tablet'
  sessionData: {
    currentTrips: any[]
    upcomingTrips: any[]
    calculationHistory: any[]
    lastActivity: Date
    sessionDuration: number
  }
  behaviorPatterns: {
    frequentDestinations: string[]
    travelStyle: 'business' | 'leisure' | 'family' | 'budget'
    bookingPatterns: string[]
    complianceHistory: any[]
  }
  currentIntent?: 'exploring' | 'planning' | 'booking' | 'compliance_checking'
}

export interface InvisibleInsight {
  id: string
  type: 'savings' | 'compliance' | 'optimization' | 'warning' | 'opportunity'
  title: string
  message: string
  confidence: number
  value?: {
    savings?: number
    riskLevel?: 'low' | 'medium' | 'high'
    urgency?: 'low' | 'medium' | 'high' | 'critical'
  }
  action?: {
    type: 'notification' | 'suggestion' | 'automation' | 'alert'
    trigger: 'immediate' | 'contextual' | 'timed'
    data?: any
  }
  aiSource: 'background_analysis' | 'predictive' | 'reactive' | 'real_time'
  createdAt: Date
  expiresAt?: Date
  presented: boolean
}

export interface BackgroundTask {
  id: string
  type: 'deal_hunting' | 'compliance_monitoring' | 'price_tracking' | 'optimization' | 'predictive_analysis'
  priority: 'low' | 'medium' | 'high' | 'critical'
  context: AIContext
  scheduledFor?: Date
  processingStarted?: Date
  completedAt?: Date
  result?: InvisibleInsight[]
  error?: string
}

class InvisibleAIEngine {
  private static instance: InvisibleAIEngine
  private activeContext: AIContext | null = null
  private backgroundTasks: BackgroundTask[] = []
  private insights: InvisibleInsight[] = []
  private processingQueue: BackgroundTask[] = []
  private isProcessing = false
  private contextUpdateCallbacks: ((insights: InvisibleInsight[]) => void)[] = []

  private constructor() {
    // Start background processing loop
    this.startBackgroundProcessing()
    
    // Set up context monitoring
    this.setupContextMonitoring()
  }

  static getInstance(): InvisibleAIEngine {
    if (!InvisibleAIEngine.instance) {
      InvisibleAIEngine.instance = new InvisibleAIEngine()
    }
    return InvisibleAIEngine.instance
  }

  /**
   * Initialize AI context for a user session
   */
  initializeContext(context: AIContext): void {
    this.activeContext = context
    
    // Immediately queue high-priority background tasks
    this.queueImmediateTasks(context)
    
    // Schedule periodic tasks
    this.schedulePeriodicTasks(context)
  }

  /**
   * Update context based on user behavior
   */
  updateContext(updates: Partial<AIContext>): void {
    if (!this.activeContext) return

    this.activeContext = { ...this.activeContext, ...updates }
    
    // React to significant context changes
    this.handleContextChange(updates)
  }

  /**
   * Get current insights without triggering new processing
   */
  getCurrentInsights(): InvisibleInsight[] {
    return this.insights
      .filter(insight => !insight.presented && this.isInsightRelevant(insight))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3) // Limit to 3 most relevant insights
  }

  /**
   * Mark insights as presented to user
   */
  markInsightsPresented(insightIds: string[]): void {
    this.insights.forEach(insight => {
      if (insightIds.includes(insight.id)) {
        insight.presented = true
      }
    })
  }

  /**
   * Register callback for context updates
   */
  onContextUpdate(callback: (insights: InvisibleInsight[]) => void): void {
    this.contextUpdateCallbacks.push(callback)
  }

  /**
   * Trigger specific analysis on demand (while maintaining invisibility)
   */
  async analyzeInBackground(
    analysisType: 'deal_opportunity' | 'compliance_risk' | 'optimization' | 'price_change',
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<void> {
    if (!this.activeContext || this.activeContext.userStatus === UserStatus.FREE) return

    const task: BackgroundTask = {
      id: `analysis_${Date.now()}`,
      type: this.mapAnalysisTypeToTaskType(analysisType),
      priority,
      context: this.activeContext,
      scheduledFor: new Date()
    }

    this.queueTask(task)
  }

  /**
   * Private methods for background processing
   */
  private startBackgroundProcessing(): void {
    // Process tasks every 10 seconds
    setInterval(() => {
      this.processQueue()
    }, 10000)

    // Clean up expired insights every minute
    setInterval(() => {
      this.cleanupExpiredInsights()
    }, 60000)
  }

  private setupContextMonitoring(): void {
    // Monitor user behavior patterns
    if (typeof window !== 'undefined') {
      // Track page visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.activeContext) {
          this.handleUserReturn()
        }
      })

      // Track user interaction patterns
      let interactionTimer: NodeJS.Timeout | null = null
      document.addEventListener('click', () => {
        if (interactionTimer) clearTimeout(interactionTimer)
        interactionTimer = setTimeout(() => {
          this.handleUserInactivity()
        }, 30000) // 30 seconds of inactivity
      })
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.processingQueue.length === 0) return
    if (!this.activeContext || this.activeContext.userStatus === UserStatus.FREE) return

    this.isProcessing = true

    try {
      // Process highest priority task
      const task = this.processingQueue.sort((a, b) => {
        const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 }
        return priorityWeight[b.priority] - priorityWeight[a.priority]
      })[0]

      if (task) {
        await this.executeBackgroundTask(task)
      }
    } catch (error) {
      console.error('[InvisibleAI] Background processing error:', error)
    } finally {
      this.isProcessing = false
    }
  }

  private async executeBackgroundTask(task: BackgroundTask): Promise<void> {
    task.processingStarted = new Date()
    
    try {
      const insights = await this.performIntelligentAnalysis(task)
      
      task.result = insights
      task.completedAt = new Date()
      
      // Add insights to the pool
      this.insights.push(...insights)
      
      // Remove from processing queue
      this.processingQueue = this.processingQueue.filter(t => t.id !== task.id)
      
      // Notify callbacks if insights are significant
      if (insights.some(i => i.confidence > 0.7)) {
        this.notifyContextUpdate()
      }
      
    } catch (error) {
      task.error = error instanceof Error ? error.message : 'Unknown error'
      task.completedAt = new Date()
      console.error(`[InvisibleAI] Task ${task.id} failed:`, error)
    }
  }

  private async performIntelligentAnalysis(task: BackgroundTask): Promise<InvisibleInsight[]> {
    if (!this.activeContext) return []

    const insights: InvisibleInsight[] = []

    switch (task.type) {
      case 'deal_hunting':
        insights.push(...await this.analyzeDealOpportunities())
        break
      
      case 'compliance_monitoring':
        insights.push(...await this.analyzeComplianceRisks())
        break
      
      case 'price_tracking':
        insights.push(...await this.analyzePriceChanges())
        break
      
      case 'optimization':
        insights.push(...await this.analyzeOptimizationOpportunities())
        break
      
      case 'predictive_analysis':
        insights.push(...await this.performPredictiveAnalysis())
        break
    }

    return insights
  }

  private async analyzeDealOpportunities(): Promise<InvisibleInsight[]> {
    if (!this.activeContext) return []

    try {
      const request: IntelligenceRequest = {
        query: 'Analyze current travel plans for cost savings and booking opportunities',
        context: {
          currentTrips: this.activeContext.sessionData.currentTrips,
          upcomingTrips: this.activeContext.sessionData.upcomingTrips,
          userLocation: this.activeContext.userLocation
        },
        intentType: 'deals'
      }

      const response = await MultiAPIIntelligence?.processIntelligentQuery(request)
      if (!response) {
        return []
      }
      
      return response.recommendations?.map(rec => ({
        id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'savings' as const,
        title: rec.title,
        message: rec.description,
        confidence: response.confidence,
        value: { savings: this.extractSavingsValue(rec.description) },
        action: {
          type: 'suggestion' as const,
          trigger: 'contextual' as const,
          data: { affiliate: rec.affiliate }
        },
        aiSource: 'background_analysis' as const,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        presented: false
      })) || []

    } catch (error) {
      console.error('[InvisibleAI] Deal analysis failed:', error)
      return []
    }
  }

  private async analyzeComplianceRisks(): Promise<InvisibleInsight[]> {
    if (!this.activeContext) return []

    const complianceInsights: InvisibleInsight[] = []
    
    // Check for approaching Schengen limits
    const currentTrips = this.activeContext.sessionData.currentTrips
    if (currentTrips.length > 0) {
      // Simplified compliance check - would use RobustSchengenCalculator in reality
      const totalDays = currentTrips.reduce((sum: number, trip: any) => {
        const start = new Date(trip.startDate)
        const end = new Date(trip.endDate)
        return sum + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      }, 0)

      if (totalDays > 75) { // Approaching 90-day limit
        complianceInsights.push({
          id: `compliance_${Date.now()}`,
          type: 'warning',
          title: 'Approaching Schengen Limit',
          message: `You're approaching the 90-day Schengen limit. Consider planning your exit strategy.`,
          confidence: 0.9,
          value: { riskLevel: 'high', urgency: 'high' },
          action: { type: 'alert', trigger: 'immediate' },
          aiSource: 'background_analysis',
          createdAt: new Date(),
          presented: false
        })
      }
    }

    return complianceInsights
  }

  private async analyzePriceChanges(): Promise<InvisibleInsight[]> {
    // Placeholder - would integrate with real price monitoring
    return []
  }

  private async analyzeOptimizationOpportunities(): Promise<InvisibleInsight[]> {
    if (!this.activeContext) return []

    const insights: InvisibleInsight[] = []
    
    // Analyze family travel optimization
    const upcomingTrips = this.activeContext.sessionData.upcomingTrips
    if (upcomingTrips.length > 1) {
      insights.push({
        id: `optimization_${Date.now()}`,
        type: 'optimization',
        title: 'Trip Coordination Opportunity',
        message: 'I can optimize your multiple upcoming trips for better compliance and savings.',
        confidence: 0.75,
        value: { savings: 150 },
        action: { type: 'suggestion', trigger: 'contextual' },
        aiSource: 'background_analysis',
        createdAt: new Date(),
        presented: false
      })
    }

    return insights
  }

  private async performPredictiveAnalysis(): Promise<InvisibleInsight[]> {
    // Advanced predictive analysis would go here
    return []
  }

  private queueTask(task: BackgroundTask): void {
    this.processingQueue.push(task)
  }

  private queueImmediateTasks(context: AIContext): void {
    if (context.userStatus === UserStatus.FREE) return

    // Queue immediate compliance check
    this.queueTask({
      id: `immediate_compliance_${Date.now()}`,
      type: 'compliance_monitoring',
      priority: 'high',
      context,
      scheduledFor: new Date()
    })

    // Queue deal hunting if user has upcoming trips
    if (context.sessionData.upcomingTrips.length > 0) {
      this.queueTask({
        id: `immediate_deals_${Date.now()}`,
        type: 'deal_hunting',
        priority: 'medium',
        context,
        scheduledFor: new Date()
      })
    }
  }

  private schedulePeriodicTasks(context: AIContext): void {
    if (context.userStatus === UserStatus.FREE) return

    // Schedule price tracking every hour
    const hourlyPriceCheck = setInterval(() => {
      if (context.sessionData.upcomingTrips.length > 0) {
        this.queueTask({
          id: `price_check_${Date.now()}`,
          type: 'price_tracking',
          priority: 'low',
          context: this.activeContext!,
          scheduledFor: new Date()
        })
      }
    }, 60 * 60 * 1000) // Every hour

    // Clean up on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        clearInterval(hourlyPriceCheck)
      })
    }
  }

  private handleContextChange(updates: Partial<AIContext>): void {
    // React to significant changes
    if (updates.sessionData?.upcomingTrips) {
      // New trips added - queue deal hunting
      this.analyzeInBackground('deal_opportunity', 'medium')
    }

    if (updates.currentIntent) {
      // Intent changed - adjust analysis focus
      this.adjustAnalysisFocus(updates.currentIntent)
    }
  }

  private handleUserReturn(): void {
    // User returned to app - provide fresh insights
    if (this.activeContext) {
      this.analyzeInBackground('optimization', 'medium')
    }
  }

  private handleUserInactivity(): void {
    // User inactive - run background analysis
    if (this.activeContext) {
      this.analyzeInBackground('deal_opportunity', 'low')
    }
  }

  private adjustAnalysisFocus(intent: string): void {
    switch (intent) {
      case 'booking':
        this.analyzeInBackground('deal_opportunity', 'high')
        break
      case 'compliance_checking':
        this.analyzeInBackground('compliance_risk', 'high')
        break
      case 'planning':
        this.analyzeInBackground('optimization', 'medium')
        break
    }
  }

  private isInsightRelevant(insight: InvisibleInsight): boolean {
    if (insight.expiresAt && insight.expiresAt < new Date()) return false
    if (insight.confidence < 0.6) return false
    return true
  }

  private cleanupExpiredInsights(): void {
    const now = new Date()
    this.insights = this.insights.filter(insight => 
      !insight.expiresAt || insight.expiresAt > now
    )
  }

  private notifyContextUpdate(): void {
    const relevantInsights = this.getCurrentInsights()
    this.contextUpdateCallbacks.forEach(callback => {
      try {
        callback(relevantInsights)
      } catch (error) {
        console.error('[InvisibleAI] Context update callback error:', error)
      }
    })
  }

  private mapAnalysisTypeToTaskType(analysisType: string): BackgroundTask['type'] {
    const mapping: Record<string, BackgroundTask['type']> = {
      'deal_opportunity': 'deal_hunting',
      'compliance_risk': 'compliance_monitoring',
      'optimization': 'optimization',
      'price_change': 'price_tracking'
    }
    return mapping[analysisType] || 'optimization'
  }

  private extractSavingsValue(description: string): number {
    const savingsMatch = description.match(/£(\d+(?:,\d{3})*(?:\.\d{2})?)/g)
    if (savingsMatch) {
      return parseFloat(savingsMatch[0].replace(/[£,]/g, ''))
    }
    return 0
  }
}

// Export singleton instance
export const InvisibleAI = InvisibleAIEngine.getInstance()

// Convenience functions
export const initializeAIContext = (context: AIContext) => {
  InvisibleAI.initializeContext(context)
}

export const updateAIContext = (updates: Partial<AIContext>) => {
  InvisibleAI.updateContext(updates)
}

export const getInvisibleInsights = () => {
  return InvisibleAI.getCurrentInsights()
}

export const markInsightsViewed = (insightIds: string[]) => {
  InvisibleAI.markInsightsPresented(insightIds)
}

export const triggerBackgroundAnalysis = (type: 'deal_opportunity' | 'compliance_risk' | 'optimization' | 'price_change') => {
  return InvisibleAI.analyzeInBackground(type)
}