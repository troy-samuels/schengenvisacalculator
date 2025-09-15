/**
 * Cost Optimization System
 * Intelligent budget controls and usage limits for AI services
 * Ensures profitable operation while maintaining premium experience
 */

'use client'

export interface CostBudgetConfig {
  dailyBudget: number
  monthlyBudget: number
  alertThreshold: number // 0-1 (80% = 0.8)
  emergencyThreshold: number // 0-1 (95% = 0.95)
  userDailyLimit: number // Per premium user daily limit
  userMonthlyLimit: number // Per premium user monthly limit
}

export interface UsageMetrics {
  today: {
    requests: number
    cost: number
    avgCostPerRequest: number
    peakHour: string
  }
  thisMonth: {
    requests: number
    cost: number
    avgCostPerRequest: number
    projecteddMonthlyCost: number
  }
  apiBreakdown: {
    openrouter: { requests: number; cost: number; percentage: number }
    perplexity: { requests: number; cost: number; percentage: number }
    openai: { requests: number; cost: number; percentage: number }
  }
  costEfficiency: {
    savingsVsOpenAI: number // How much saved by using multi-API
    optimizationRatio: number // Percentage of queries routed to cheaper APIs
  }
}

export interface CostAlert {
  type: 'warning' | 'critical' | 'emergency'
  message: string
  recommendation: string
  currentSpend: number
  budgetLimit: number
  timeframe: 'daily' | 'monthly'
}

class CostOptimizationService {
  private static instance: CostOptimizationService
  private config: CostBudgetConfig
  private alertCallbacks: ((alert: CostAlert) => void)[] = []

  private constructor() {
    this.config = {
      dailyBudget: parseFloat(process.env.DAILY_API_BUDGET_LIMIT || '50.00'),
      monthlyBudget: parseFloat(process.env.MONTHLY_API_BUDGET_LIMIT || '1500.00'),
      alertThreshold: parseFloat(process.env.COST_ALERT_THRESHOLD || '0.80'),
      emergencyThreshold: parseFloat(process.env.COST_EMERGENCY_THRESHOLD || '0.95'),
      userDailyLimit: 3.00, // £3 per premium user per day
      userMonthlyLimit: 25.00 // £25 per premium user per month
    }
  }

  static getInstance(): CostOptimizationService {
    if (!CostOptimizationService.instance) {
      CostOptimizationService.instance = new CostOptimizationService()
    }
    return CostOptimizationService.instance
  }

  /**
   * Check if a request should be allowed based on current budget status
   */
  async canProcessRequest(
    userId: string, 
    estimatedCost: number, 
    apiType: 'openrouter' | 'perplexity' | 'openai'
  ): Promise<{ allowed: boolean; reason?: string; alternatives?: string[] }> {
    const currentUsage = await this.getCurrentUsage()
    const userUsage = await this.getUserUsage(userId)

    // Check global daily budget
    if (currentUsage.today.cost + estimatedCost > this.config.dailyBudget) {
      return {
        allowed: false,
        reason: 'Daily budget limit reached. Premium AI features will resume tomorrow.',
        alternatives: ['basic_calculator', 'manual_compliance_check']
      }
    }

    // Check user daily limit
    if (userUsage.dailyCost + estimatedCost > this.config.userDailyLimit) {
      return {
        allowed: false,
        reason: 'Daily AI usage limit reached. Contact support for priority access.',
        alternatives: ['basic_features', 'tomorrow_access']
      }
    }

    // Check if we're approaching limits and should recommend cheaper alternatives
    const dailyUtilization = (currentUsage.today.cost + estimatedCost) / this.config.dailyBudget
    if (dailyUtilization > this.config.alertThreshold && apiType === 'openai') {
      return {
        allowed: true,
        reason: 'Approaching budget limit - automatically optimizing to maintain service',
        alternatives: ['openrouter_alternative'] // Will auto-route to cheaper API
      }
    }

    return { allowed: true }
  }

  /**
   * Record API usage for cost tracking
   */
  async recordUsage(
    userId: string,
    apiType: 'openrouter' | 'perplexity' | 'openai',
    cost: number,
    tokensUsed: number,
    requestType: string
  ): Promise<void> {
    const usage = {
      userId,
      apiType,
      cost,
      tokensUsed,
      requestType,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      hour: new Date().getHours()
    }

    // Store in localStorage for client-side tracking
    this.storeUsageRecord(usage)
    
    // Check for alerts after recording
    await this.checkAndTriggerAlerts()
  }

  /**
   * Get intelligent API routing recommendation based on cost optimization
   */
  getOptimalAPIRoute(
    queryComplexity: 'simple' | 'moderate' | 'complex',
    requiresRealTime: boolean,
    currentBudgetUtilization: number
  ): { api: 'openrouter' | 'perplexity' | 'openai'; reason: string; estimatedCost: number } {
    
    // Always use Perplexity for real-time queries
    if (requiresRealTime) {
      return {
        api: 'perplexity',
        reason: 'Real-time data required',
        estimatedCost: 0.005
      }
    }

    // If budget utilization is high, force cheaper options
    if (currentBudgetUtilization > this.config.alertThreshold) {
      return {
        api: 'openrouter',
        reason: 'Budget optimization - maintaining service availability',
        estimatedCost: 0.0009
      }
    }

    // Normal routing based on complexity
    switch (queryComplexity) {
      case 'simple':
        return {
          api: 'openrouter',
          reason: 'Cost-optimized for simple queries',
          estimatedCost: 0.0003 // Claude Haiku
        }
      
      case 'moderate':
        return {
          api: 'openrouter', 
          reason: 'Balanced cost and capability',
          estimatedCost: 0.0009 // Llama 3.1 70B
        }
      
      case 'complex':
        return {
          api: 'openai',
          reason: 'Maximum accuracy for complex analysis',
          estimatedCost: 0.06 // GPT-4
        }
    }
  }

  /**
   * Calculate cost savings vs pure OpenAI approach
   */
  calculateSavings(): { dailySavings: number; monthlySavings: number; optimizationRatio: number } {
    const usage = this.getStoredUsage()
    let actualCost = 0
    let openAICost = 0 // What it would cost with pure OpenAI
    
    for (const record of usage) {
      actualCost += record.cost
      
      // Calculate what this would have cost with GPT-4
      openAICost += record.tokensUsed * 0.06 / 1000 // GPT-4 rate
    }
    
    const dailySavings = this.getDailyCostSavings()
    const monthlySavings = this.getMonthlyCostSavings()
    const optimizationRatio = actualCost > 0 ? (openAICost - actualCost) / openAICost : 0

    return {
      dailySavings,
      monthlySavings,
      optimizationRatio
    }
  }

  /**
   * Get comprehensive usage metrics for dashboard
   */
  async getUsageMetrics(): Promise<UsageMetrics> {
    const usage = this.getStoredUsage()
    const today = new Date().toISOString().split('T')[0]
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    
    const todayUsage = usage.filter(u => u.date === today)
    const monthUsage = usage.filter(u => u.timestamp.startsWith(currentMonth))

    // API breakdown
    const apiBreakdown = {
      openrouter: { requests: 0, cost: 0, percentage: 0 },
      perplexity: { requests: 0, cost: 0, percentage: 0 },
      openai: { requests: 0, cost: 0, percentage: 0 }
    }

    let totalCost = 0
    for (const record of monthUsage) {
      const apiType = record.apiType as keyof typeof apiBreakdown
      if (apiBreakdown[apiType]) {
        apiBreakdown[apiType].requests++
        apiBreakdown[apiType].cost += record.cost
        totalCost += record.cost
      }
    }

    // Calculate percentages
    Object.values(apiBreakdown).forEach(api => {
      api.percentage = totalCost > 0 ? (api.cost / totalCost) * 100 : 0
    })

    const todayCost = todayUsage.reduce((sum, u) => sum + u.cost, 0)
    const monthCost = monthUsage.reduce((sum, u) => sum + u.cost, 0)
    
    return {
      today: {
        requests: todayUsage.length,
        cost: todayCost,
        avgCostPerRequest: todayUsage.length > 0 ? todayCost / todayUsage.length : 0,
        peakHour: this.getPeakHour(todayUsage)
      },
      thisMonth: {
        requests: monthUsage.length,
        cost: monthCost,
        avgCostPerRequest: monthUsage.length > 0 ? monthCost / monthUsage.length : 0,
        projecteddMonthlyCost: this.projectMonthlyCost(monthCost)
      },
      apiBreakdown,
      costEfficiency: {
        savingsVsOpenAI: this.calculateSavings().monthlySavings,
        optimizationRatio: this.calculateSavings().optimizationRatio * 100
      }
    }
  }

  /**
   * Register alert callback
   */
  onCostAlert(callback: (alert: CostAlert) => void): void {
    this.alertCallbacks.push(callback)
  }

  /**
   * Private helper methods
   */
  private async getCurrentUsage() {
    return {
      today: {
        cost: this.getDailyCost(),
        requests: this.getDailyRequests()
      }
    }
  }

  private async getUserUsage(userId: string) {
    const userUsage = this.getUserStoredUsage(userId)
    const today = new Date().toISOString().split('T')[0]
    const todayUsage = userUsage.filter(u => u.date === today)
    
    return {
      dailyCost: todayUsage.reduce((sum, u) => sum + u.cost, 0),
      dailyRequests: todayUsage.length
    }
  }

  private storeUsageRecord(usage: any): void {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem('ai-cost-tracking') || '[]'
      const records = JSON.parse(stored)
      records.push(usage)
      
      // Keep only last 1000 records to prevent storage bloat
      const recentRecords = records.slice(-1000)
      localStorage.setItem('ai-cost-tracking', JSON.stringify(recentRecords))
    } catch (error) {
      console.warn('[CostOptimization] Failed to store usage:', error)
    }
  }

  private getStoredUsage(): any[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem('ai-cost-tracking') || '[]'
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  private getUserStoredUsage(userId: string): any[] {
    return this.getStoredUsage().filter(u => u.userId === userId)
  }

  private getDailyCost(): number {
    const usage = this.getStoredUsage()
    const today = new Date().toISOString().split('T')[0]
    return usage.filter(u => u.date === today).reduce((sum, u) => sum + u.cost, 0)
  }

  private getDailyRequests(): number {
    const usage = this.getStoredUsage()
    const today = new Date().toISOString().split('T')[0]
    return usage.filter(u => u.date === today).length
  }

  private getDailyCostSavings(): number {
    // Calculate how much we saved today vs pure OpenAI
    const usage = this.getStoredUsage()
    const today = new Date().toISOString().split('T')[0]
    const todayUsage = usage.filter(u => u.date === today)
    
    let actualCost = 0
    let openAICost = 0
    
    for (const record of todayUsage) {
      actualCost += record.cost
      openAICost += record.tokensUsed * 0.06 / 1000 // What GPT-4 would cost
    }
    
    return openAICost - actualCost
  }

  private getMonthlyCostSavings(): number {
    const usage = this.getStoredUsage()
    const currentMonth = new Date().toISOString().slice(0, 7)
    const monthUsage = usage.filter(u => u.timestamp.startsWith(currentMonth))
    
    let actualCost = 0
    let openAICost = 0
    
    for (const record of monthUsage) {
      actualCost += record.cost
      openAICost += record.tokensUsed * 0.06 / 1000
    }
    
    return openAICost - actualCost
  }

  private getPeakHour(todayUsage: any[]): string {
    if (todayUsage.length === 0) return '0'
    
    const hourCounts: Record<number, number> = {}
    todayUsage.forEach(u => {
      hourCounts[u.hour] = (hourCounts[u.hour] || 0) + 1
    })
    
    const peakHour = Object.keys(hourCounts).reduce((a, b) => 
      hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b
    )
    
    return `${peakHour}:00`
  }

  private projectMonthlyCost(currentMonthlyCost: number): number {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    const currentDay = new Date().getDate()
    
    return (currentMonthlyCost / currentDay) * daysInMonth
  }

  private async checkAndTriggerAlerts(): Promise<void> {
    const currentUsage = await this.getCurrentUsage()
    const dailyUtilization = currentUsage.today.cost / this.config.dailyBudget
    
    if (dailyUtilization > this.config.emergencyThreshold) {
      this.triggerAlert({
        type: 'emergency',
        message: `CRITICAL: Daily budget 95% exhausted (£${currentUsage.today.cost.toFixed(2)}/£${this.config.dailyBudget})`,
        recommendation: 'Switch to basic features only to preserve service availability',
        currentSpend: currentUsage.today.cost,
        budgetLimit: this.config.dailyBudget,
        timeframe: 'daily'
      })
    } else if (dailyUtilization > this.config.alertThreshold) {
      this.triggerAlert({
        type: 'warning',
        message: `Daily budget ${Math.round(dailyUtilization * 100)}% utilized`,
        recommendation: 'Route queries to cost-optimized APIs to maintain service',
        currentSpend: currentUsage.today.cost,
        budgetLimit: this.config.dailyBudget,
        timeframe: 'daily'
      })
    }
  }

  private triggerAlert(alert: CostAlert): void {
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert)
      } catch (error) {
        console.error('[CostOptimization] Alert callback error:', error)
      }
    })
  }
}

// Export singleton instance
export const CostOptimizer = CostOptimizationService.getInstance()

// Convenience functions for common operations
export const canProcessAIRequest = (userId: string, estimatedCost: number, apiType: 'openrouter' | 'perplexity' | 'openai') => {
  return CostOptimizer.canProcessRequest(userId, estimatedCost, apiType)
}

export const recordAIUsage = (userId: string, apiType: 'openrouter' | 'perplexity' | 'openai', cost: number, tokens: number, requestType: string) => {
  return CostOptimizer.recordUsage(userId, apiType, cost, tokens, requestType)
}

export const getOptimalAPI = (complexity: 'simple' | 'moderate' | 'complex', realTime: boolean, budgetUtilization: number) => {
  return CostOptimizer.getOptimalAPIRoute(complexity, realTime, budgetUtilization)
}

export const getCostMetrics = () => {
  return CostOptimizer.getUsageMetrics()
}