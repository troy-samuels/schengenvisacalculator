/**
 * Multi-API Intelligence Service
 * Intelligently routes AI requests between OpenRouter, Perplexity, and OpenAI
 * for optimal cost efficiency (40x reduction) while maintaining quality
 */

'use client'

export interface IntelligenceRequest {
  query: string
  context?: {
    userLocation?: string
    travelHistory?: any[]
    currentTrips?: any[]
    upcomingTrips?: any[]
    familyMembers?: number
    complianceStatus?: any
  }
  intentType: 'compliance' | 'deals' | 'planning' | 'realtime' | 'complex'
  maxTokens?: number
  temperature?: number
}

export interface IntelligenceResponse {
  answer: string
  confidence: number
  sources?: string[]
  recommendations?: Array<{
    type: 'booking' | 'savings' | 'compliance' | 'timing'
    title: string
    description: string
    value?: string
    action?: string
    affiliate?: boolean
  }>
  apiUsed: 'openrouter' | 'perplexity' | 'openai'
  tokensUsed: number
  cost: number
  processingTime: number
}

export interface APIUsageStats {
  totalRequests: number
  totalCost: number
  dailyBudget: number
  dailySpend: number
  monthlyBudget: number
  monthlySpend: number
  averageCostPerRequest: number
  apiBreakdown: {
    openrouter: { requests: number; cost: number }
    perplexity: { requests: number; cost: number }
    openai: { requests: number; cost: number }
  }
}

class MultiAPIIntelligenceService {
  private static instance: MultiAPIIntelligenceService
  private dailyBudget = parseFloat(process.env.DAILY_API_BUDGET_LIMIT || '50.00')
  private monthlyBudget = parseFloat(process.env.MONTHLY_API_BUDGET_LIMIT || '1500.00')
  private costAlertThreshold = parseFloat(process.env.COST_ALERT_THRESHOLD || '0.80')
  
  // Cost tracking (in localStorage for client-side tracking)
  private usageStats: APIUsageStats

  private constructor() {
    this.usageStats = this.loadUsageStats()
    this.resetDailyStatsIfNeeded()
  }

  static getInstance(): MultiAPIIntelligenceService {
    if (!MultiAPIIntelligenceService.instance) {
      MultiAPIIntelligenceService.instance = new MultiAPIIntelligenceService()
    }
    return MultiAPIIntelligenceService.instance
  }

  /**
   * Main intelligence entry point - routes to optimal API based on query type
   */
  async processIntelligentQuery(request: IntelligenceRequest): Promise<IntelligenceResponse> {
    const startTime = performance.now()
    
    try {
      // Check budget constraints
      if (!this.canMakeRequest()) {
        return this.createBudgetExceededResponse()
      }

      // Route to optimal API based on intent and complexity
      const apiChoice = this.selectOptimalAPI(request)
      let response: IntelligenceResponse

      switch (apiChoice) {
        case 'perplexity':
          response = await this.queryPerplexity(request)
          break
        case 'openrouter':
          response = await this.queryOpenRouter(request)
          break
        case 'openai':
          response = await this.queryOpenAI(request)
          break
        default:
          // Fallback to OpenRouter if decision fails
          response = await this.queryOpenRouter(request)
      }

      response.processingTime = performance.now() - startTime
      this.trackUsage(response)
      
      return response

    } catch (error) {
      console.error('[MultiAPIIntelligence] Query failed:', error)
      return this.createErrorResponse(error, performance.now() - startTime)
    }
  }

  /**
   * Smart API selection based on query intent and cost optimization
   */
  private selectOptimalAPI(request: IntelligenceRequest): 'openrouter' | 'perplexity' | 'openai' {
    // Real-time queries always go to Perplexity for live data
    if (request.intentType === 'realtime') {
      return 'perplexity'
    }

    // Complex compliance calculations use GPT-4 for accuracy
    if (request.intentType === 'compliance' && this.isComplexComplianceQuery(request)) {
      return 'openai'
    }

    // High-value planning queries that justify GPT-4 cost
    if (request.intentType === 'complex' || 
        (request.intentType === 'planning' && this.isHighValuePlanningQuery(request))) {
      return 'openai'
    }

    // Everything else goes to OpenRouter for cost efficiency (40x cheaper)
    return 'openrouter'
  }

  /**
   * Query Perplexity for real-time travel intelligence
   */
  private async queryPerplexity(request: IntelligenceRequest): Promise<IntelligenceResponse> {
    const response = await fetch('/api/intelligence/perplexity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: request.query,
        context: request.context,
        maxTokens: request.maxTokens || 800
      })
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      answer: data.answer,
      confidence: data.confidence || 0.85,
      sources: data.sources || [],
      recommendations: data.recommendations || [],
      apiUsed: 'perplexity',
      tokensUsed: data.tokensUsed || 0,
      cost: data.cost || 0.005, // ~$5 per 1K searches
      processingTime: 0
    }
  }

  /**
   * Query OpenRouter for cost-efficient AI processing
   */
  private async queryOpenRouter(request: IntelligenceRequest): Promise<IntelligenceResponse> {
    const response = await fetch('/api/intelligence/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: request.query,
        context: request.context,
        maxTokens: request.maxTokens || 800,
        temperature: request.temperature || 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      answer: data.answer,
      confidence: data.confidence || 0.82,
      sources: [],
      recommendations: data.recommendations || [],
      apiUsed: 'openrouter',
      tokensUsed: data.tokensUsed || 0,
      cost: data.cost || 0.0009, // Claude Haiku pricing
      processingTime: 0
    }
  }

  /**
   * Query OpenAI GPT-4 for complex analysis
   */
  private async queryOpenAI(request: IntelligenceRequest): Promise<IntelligenceResponse> {
    const response = await fetch('/api/intelligence/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: request.query,
        context: request.context,
        maxTokens: request.maxTokens || 800,
        temperature: request.temperature || 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      answer: data.answer,
      confidence: data.confidence || 0.90,
      sources: [],
      recommendations: data.recommendations || [],
      apiUsed: 'openai',
      tokensUsed: data.tokensUsed || 0,
      cost: data.cost || 0.06, // GPT-4 pricing
      processingTime: 0
    }
  }

  /**
   * Determine if compliance query is complex enough for GPT-4
   */
  private isComplexComplianceQuery(request: IntelligenceRequest): boolean {
    const complexIndicators = [
      'multiple countries',
      'family travel',
      'visa requirements',
      'brexit',
      'business travel',
      'dual citizenship',
      'extended stay'
    ]

    const queryLower = request.query.toLowerCase()
    const hasComplexContext = request.context?.familyMembers && request.context.familyMembers > 1
    const hasMultipleTrips = (request.context?.currentTrips?.length || 0) + 
                            (request.context?.upcomingTrips?.length || 0) > 2

    return complexIndicators.some(indicator => queryLower.includes(indicator)) ||
           hasComplexContext ||
           hasMultipleTrips
  }

  /**
   * Determine if planning query justifies GPT-4 cost
   */
  private isHighValuePlanningQuery(request: IntelligenceRequest): boolean {
    const highValueIndicators = [
      'optimize',
      'best time',
      'save money',
      'family trip',
      'business travel',
      'long-term'
    ]

    const queryLower = request.query.toLowerCase()
    return highValueIndicators.some(indicator => queryLower.includes(indicator))
  }

  /**
   * Budget and cost control methods
   */
  private canMakeRequest(): boolean {
    return this.usageStats.dailySpend < this.dailyBudget &&
           this.usageStats.monthlySpend < this.monthlyBudget
  }

  private trackUsage(response: IntelligenceResponse): void {
    this.usageStats.totalRequests++
    this.usageStats.totalCost += response.cost
    this.usageStats.dailySpend += response.cost
    this.usageStats.monthlySpend += response.cost

    // Update API breakdown
    this.usageStats.apiBreakdown[response.apiUsed].requests++
    this.usageStats.apiBreakdown[response.apiUsed].cost += response.cost

    // Update averages
    this.usageStats.averageCostPerRequest = 
      this.usageStats.totalCost / this.usageStats.totalRequests

    this.saveUsageStats()

    // Alert if approaching budget limits
    if (this.usageStats.dailySpend > this.dailyBudget * this.costAlertThreshold) {
      console.warn('[MultiAPIIntelligence] Approaching daily budget limit')
    }
  }

  private loadUsageStats(): APIUsageStats {
    if (typeof window === 'undefined') {
      return this.createEmptyStats()
    }

    try {
      const stored = localStorage.getItem('ai-usage-stats')
      return stored ? JSON.parse(stored) : this.createEmptyStats()
    } catch {
      return this.createEmptyStats()
    }
  }

  private saveUsageStats(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ai-usage-stats', JSON.stringify(this.usageStats))
      } catch (error) {
        console.warn('[MultiAPIIntelligence] Failed to save usage stats:', error)
      }
    }
  }

  private createEmptyStats(): APIUsageStats {
    return {
      totalRequests: 0,
      totalCost: 0,
      dailyBudget: this.dailyBudget,
      dailySpend: 0,
      monthlyBudget: this.monthlyBudget,
      monthlySpend: 0,
      averageCostPerRequest: 0,
      apiBreakdown: {
        openrouter: { requests: 0, cost: 0 },
        perplexity: { requests: 0, cost: 0 },
        openai: { requests: 0, cost: 0 }
      }
    }
  }

  private resetDailyStatsIfNeeded(): void {
    // Skip localStorage operations during server-side rendering
    if (typeof window === 'undefined') return
    
    const today = new Date().toDateString()
    const lastReset = localStorage.getItem('ai-stats-last-reset')
    
    if (lastReset !== today) {
      this.usageStats.dailySpend = 0
      localStorage.setItem('ai-stats-last-reset', today)
      this.saveUsageStats()
    }
  }

  private createBudgetExceededResponse(): IntelligenceResponse {
    return {
      answer: "I've reached the daily budget limit for AI processing. Premium features will be available again tomorrow, or you can contact support for priority access.",
      confidence: 1.0,
      recommendations: [{
        type: 'compliance',
        title: 'Budget Protection Active',
        description: 'AI intelligence is temporarily limited to protect costs.',
        action: 'Contact support for priority access'
      }],
      apiUsed: 'openrouter',
      tokensUsed: 0,
      cost: 0,
      processingTime: 0
    }
  }

  private createErrorResponse(error: any, processingTime: number): IntelligenceResponse {
    return {
      answer: "I'm temporarily unable to provide AI assistance. Please try again in a moment, or contact support if the issue persists.",
      confidence: 0,
      recommendations: [],
      apiUsed: 'openrouter',
      tokensUsed: 0,
      cost: 0,
      processingTime
    }
  }

  /**
   * Get current usage statistics
   */
  getUsageStats(): APIUsageStats {
    return { ...this.usageStats }
  }

  /**
   * Reset usage statistics (admin function)
   */
  resetUsageStats(): void {
    this.usageStats = this.createEmptyStats()
    this.saveUsageStats()
  }
}

// Export singleton instance (client-side only)
export const MultiAPIIntelligence = typeof window !== 'undefined' 
  ? MultiAPIIntelligenceService.getInstance() 
  : null

// Convenience functions for different intelligence types
export const getSmartDeals = async (context: any) => {
  if (!MultiAPIIntelligence) {
    throw new Error('AI service not available on server side')
  }
  return MultiAPIIntelligence.processIntelligentQuery({
    query: `Find the best travel deals and savings opportunities based on my travel plans and compliance status`,
    context,
    intentType: 'deals'
  })
}

export const getComplianceGuidance = async (context: any, query: string) => {
  if (!MultiAPIIntelligence) {
    throw new Error('AI service not available on server side')
  }
  return MultiAPIIntelligence.processIntelligentQuery({
    query,
    context,
    intentType: 'compliance'
  })
}

export const getRealTimeIntelligence = async (query: string, context: any) => {
  if (!MultiAPIIntelligence) {
    throw new Error('AI service not available on server side')
  }
  return MultiAPIIntelligence.processIntelligentQuery({
    query,
    context,
    intentType: 'realtime'
  })
}

export const getPlanningOptimization = async (context: any) => {
  if (!MultiAPIIntelligence) {
    throw new Error('AI service not available on server side')
  }
  return MultiAPIIntelligence.processIntelligentQuery({
    query: `Optimize my travel plans for cost savings, compliance, and timing based on my current situation`,
    context,
    intentType: 'planning'
  })
}