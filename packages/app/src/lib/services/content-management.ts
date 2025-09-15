/**
 * Content Management Service
 * Handles blog post creation, updates, and publishing automation
 * Integrates AI content generation with existing blog infrastructure
 */

'use client'

import { BlogPost, FAQ, InternalLink } from '../blog-data'
import { AIContentGenerator, BlogPostTemplate, GeneratedContent } from './ai-content-generator'

export interface ContentUpdate {
  postId: string
  changes: Partial<BlogPost>
  updateReason: string
  timestamp: Date
}

export interface PublishingSchedule {
  postsPerWeek: number
  publishDays: number[] // 0-6 (Sunday-Saturday)
  publishTime: string // HH:MM format
  timezone: string
}

export class ContentManagementService {
  private aiGenerator: AIContentGenerator
  private publishingSchedule: PublishingSchedule

  constructor() {
    this.aiGenerator = new AIContentGenerator()
    this.publishingSchedule = {
      postsPerWeek: 3,
      publishDays: [1, 3, 5], // Monday, Wednesday, Friday
      publishTime: "09:00",
      timezone: "Europe/London"
    }
  }

  /**
   * Generate and convert AI content to BlogPost format
   */
  async generateBlogPost(template: BlogPostTemplate): Promise<BlogPost> {
    const generatedContent = await this.aiGenerator.generateBlogPost(template)

    return this.convertToBlogPost(generatedContent)
  }

  /**
   * Generate all posts for a category
   */
  async generateCategoryPosts(categoryId: string): Promise<BlogPost[]> {
    const generatedContent = await this.aiGenerator.generateCategoryContent(categoryId)

    return generatedContent.map(content => this.convertToBlogPost(content))
  }

  /**
   * Convert generated content to BlogPost interface
   */
  private convertToBlogPost(generated: GeneratedContent): BlogPost {
    const now = new Date()
    const publishDate = this.calculateNextPublishDate()

    // Extract FAQ section from content
    const faqSection = this.extractFAQSection(generated.content)

    // Extract internal links
    const internalLinks = this.extractInternalLinks(generated.content)

    // Generate structured data
    const structuredData = this.generateStructuredData(generated)

    return {
      id: this.generateUniqueId(),
      slug: generated.metadata.slug,
      title: generated.metadata.title,
      description: generated.metadata.description,
      content: generated.content,
      author: "AI Content Assistant",
      publishDate: publishDate.toISOString(),
      readTime: generated.readTime,
      tags: this.extractTags(generated.metadata),
      category: generated.metadata.category,
      featured: this.shouldBeFeatured(generated),
      seoTitle: generated.metadata.seoTitle,
      seoDescription: generated.metadata.seoDescription,
      keywords: generated.metadata.keywords,
      image: this.selectImage(generated.metadata),
      imageAlt: this.generateImageAlt(generated.metadata),

      // LLM Optimization fields
      primaryKeyword: generated.metadata.primaryKeyword,
      targetAudience: generated.metadata.targetAudience,
      wordCount: generated.wordCount,
      seoScore: generated.seoScore,
      llmOptimizationScore: generated.llmOptimizationScore,
      faqSection,
      structuredData,
      aiGenerated: true,
      lastUpdated: now.toISOString(),
      contentSource: 'ai_generated',
      internalLinks,

      // Publishing automation
      scheduledPublishDate: publishDate.toISOString(),
      publishStatus: 'scheduled',
      contentQuality: {
        grammarScore: 85, // AI-generated content typically has good grammar
        readabilityScore: this.calculateReadabilityScore(generated.content),
        seoOptimization: generated.seoScore,
        llmFriendliness: generated.llmOptimizationScore
      }
    }
  }

  /**
   * Extract FAQ section from content
   */
  private extractFAQSection(content: string): FAQ[] {
    const faqRegex = /## (?:FAQ|Frequently Asked Questions)([\s\S]*?)(?=##|$)/i
    const match = content.match(faqRegex)

    if (!match) return []

    const faqContent = match[1]
    const questions = faqContent.match(/### (.+?)\n([\s\S]*?)(?=###|$)/g)

    if (!questions) return []

    return questions.map(q => {
      const [, question, answer] = q.match(/### (.+?)\n([\s\S]*?)$/) || []
      return {
        question: question?.trim() || '',
        answer: answer?.trim() || '',
        keywords: this.extractKeywordsFromText(question + ' ' + answer)
      }
    }).filter(faq => faq.question && faq.answer)
  }

  /**
   * Extract internal links from content
   */
  private extractInternalLinks(content: string): InternalLink[] {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const links: InternalLink[] = []
    let match

    while ((match = linkRegex.exec(content)) !== null) {
      const [fullMatch, text, url] = match

      // Only include internal links (relative URLs or same domain)
      if (url.startsWith('/') || url.includes('etiascalculator.com')) {
        links.push({
          text: text.trim(),
          url: url.trim(),
          context: this.getTextContext(content, match.index)
        })
      }
    }

    return links
  }

  /**
   * Generate structured data for SEO
   */
  private generateStructuredData(generated: GeneratedContent): BlogPost['structuredData'] {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: generated.metadata.title,
      description: generated.metadata.description,
      author: {
        '@type': 'Person',
        name: 'ETIAS Calculator Expert Team'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ETIAS Calculator',
        logo: {
          '@type': 'ImageObject',
          url: 'https://etiascalculator.com/logo.png'
        }
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://etiascalculator.com/blog/${generated.metadata.slug}`
      },
      keywords: generated.metadata.keywords.join(', '),
      articleSection: generated.metadata.category,
      wordCount: generated.wordCount,
      inLanguage: 'en-US'
    }

    // Add FAQ schema if FAQ section exists
    if (generated.content.includes('FAQ') || generated.content.includes('frequently asked')) {
      return {
        type: 'FAQ',
        schema: {
          ...schema,
          '@type': ['Article', 'FAQPage'],
          mainEntity: this.generateFAQSchema(generated.content)
        }
      }
    }

    // Add HowTo schema for step-by-step content
    if (generated.content.includes('step') || generated.content.includes('how to')) {
      return {
        type: 'HowTo',
        schema: {
          ...schema,
          '@type': ['Article', 'HowTo'],
          step: this.generateHowToSchema(generated.content)
        }
      }
    }

    return {
      type: 'Article',
      schema
    }
  }

  /**
   * Generate FAQ schema from content
   */
  private generateFAQSchema(content: string): any[] {
    const faqSection = this.extractFAQSection(content)

    return faqSection.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  /**
   * Generate HowTo schema from content
   */
  private generateHowToSchema(content: string): any[] {
    const stepRegex = /(?:Step \d+|###.*step.*)\n([\s\S]*?)(?=(?:Step \d+|###)|$)/gi
    const steps: any[] = []
    let match

    while ((match = stepRegex.exec(content)) !== null) {
      const stepContent = match[1].trim()
      if (stepContent) {
        steps.push({
          '@type': 'HowToStep',
          text: stepContent.substring(0, 200) + (stepContent.length > 200 ? '...' : '')
        })
      }
    }

    return steps
  }

  /**
   * Calculate next publish date based on schedule
   */
  private calculateNextPublishDate(): Date {
    const now = new Date()
    const { publishDays, publishTime } = this.publishingSchedule

    // Parse publish time
    const [hours, minutes] = publishTime.split(':').map(Number)

    // Find next publish day
    const currentDay = now.getDay()
    let nextPublishDay = publishDays.find(day => day > currentDay)

    if (!nextPublishDay) {
      // Next week
      nextPublishDay = publishDays[0]
    }

    const daysUntilPublish = nextPublishDay > currentDay
      ? nextPublishDay - currentDay
      : 7 - currentDay + nextPublishDay

    const publishDate = new Date(now)
    publishDate.setDate(now.getDate() + daysUntilPublish)
    publishDate.setHours(hours, minutes, 0, 0)

    return publishDate
  }

  /**
   * Update existing blog post
   */
  async updateBlogPost(postId: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    // In a real implementation, this would update the database
    // For now, we'll simulate the update

    const updatedPost: BlogPost = {
      ...updates as BlogPost,
      lastUpdated: new Date().toISOString(),
      contentSource: 'hybrid'
    }

    return updatedPost
  }

  /**
   * Utility methods
   */
  private generateUniqueId(): string {
    return 'blog_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private shouldBeFeatured(generated: GeneratedContent): boolean {
    // Feature posts with high quality scores and important keywords
    return generated.seoScore > 85 &&
           generated.llmOptimizationScore > 85 &&
           (generated.metadata.primaryKeyword.includes('ETIAS') ||
            generated.metadata.primaryKeyword.includes('schengen'))
  }

  private extractTags(metadata: BlogPostTemplate): string[] {
    return [
      ...metadata.keywords.slice(0, 3),
      metadata.category.split(' ')[0],
      'Europe Travel',
      'Compliance'
    ]
  }

  private selectImage(metadata: BlogPostTemplate): string {
    // Return appropriate image based on content type
    const imageMap: Record<string, string> = {
      'ETIAS': 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
      'schengen': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      'travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      'compliance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
      'calculator': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f'
    }

    const keyword = metadata.primaryKeyword.toLowerCase()
    for (const [key, image] of Object.entries(imageMap)) {
      if (keyword.includes(key)) {
        return image + '?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      }
    }

    return imageMap.travel + '?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }

  private generateImageAlt(metadata: BlogPostTemplate): string {
    return `${metadata.title} - European travel compliance guide illustration`
  }

  private calculateReadabilityScore(content: string): number {
    const sentences = content.split(/[.!?]+/).length
    const words = content.split(/\s+/).length
    const avgWordsPerSentence = words / sentences

    // Simple readability score (higher is better, max 100)
    let score = 100
    if (avgWordsPerSentence > 20) score -= 20
    if (avgWordsPerSentence > 30) score -= 20

    return Math.max(score, 60)
  }

  private extractKeywordsFromText(text: string): string[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)

    return [...new Set(words)].slice(0, 5)
  }

  private getTextContext(content: string, position: number): string {
    const start = Math.max(0, position - 50)
    const end = Math.min(content.length, position + 50)
    return content.substring(start, end).trim()
  }

  /**
   * Batch generate content for all categories
   */
  async generateAllContent(): Promise<{
    foundational: BlogPost[]
    preparation: BlogPost[]
    planning: BlogPost[]
    compliance: BlogPost[]
    tools: BlogPost[]
  }> {
    console.log('Starting comprehensive content generation...')

    const results = {
      foundational: await this.generateCategoryPosts('foundational'),
      preparation: await this.generateCategoryPosts('preparation'),
      planning: await this.generateCategoryPosts('planning'),
      compliance: await this.generateCategoryPosts('compliance'),
      tools: await this.generateCategoryPosts('tools')
    }

    console.log('Content generation completed:', {
      foundational: results.foundational.length,
      preparation: results.preparation.length,
      planning: results.planning.length,
      compliance: results.compliance.length,
      tools: results.tools.length,
      total: Object.values(results).flat().length
    })

    return results
  }
}

/**
 * Hook for using content management in components
 */
export function useContentManagement() {
  const service = new ContentManagementService()

  const generatePost = async (template: BlogPostTemplate): Promise<BlogPost> => {
    return service.generateBlogPost(template)
  }

  const generateCategory = async (categoryId: string): Promise<BlogPost[]> => {
    return service.generateCategoryPosts(categoryId)
  }

  const generateAllContent = async () => {
    return service.generateAllContent()
  }

  const updatePost = async (postId: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    return service.updateBlogPost(postId, updates)
  }

  return {
    generatePost,
    generateCategory,
    generateAllContent,
    updatePost
  }
}