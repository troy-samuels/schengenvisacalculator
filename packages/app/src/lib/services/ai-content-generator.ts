/**
 * AI Content Generation Service
 * Automated blog post creation with LLM optimization for 2025 SEO strategy
 * Generates 50 SEO-optimized posts across 5 strategic categories
 */

'use client'

// Temporarily comment out AI integration for build
// import { MultiAPIIntelligenceService } from './multi-api-intelligence'
import { ALL_BLOG_TEMPLATES, TEMPLATES_BY_CATEGORY } from '../data/blog-templates'

export interface ContentCategory {
  id: string
  name: string
  description: string
  keywords: string[]
  targetPosts: number
  seoFocus: 'awareness' | 'preparation' | 'planning' | 'compliance' | 'tools'
}

export interface BlogPostTemplate {
  id: string
  slug: string
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  category: string
  primaryKeyword: string
  targetAudience: string
  contentStructure: {
    introduction: string
    mainSections: string[]
    faqSection: string[]
    conclusion: string
  }
  llmOptimization: {
    conversationalTone: boolean
    faqFormat: boolean
    structuredData: boolean
    bulletPoints: boolean
    stepByStep: boolean
  }
}

export interface GeneratedContent {
  metadata: BlogPostTemplate
  content: string
  wordCount: number
  readTime: string
  seoScore: number
  llmOptimizationScore: number
}

// Content categories from SEO strategy
export const CONTENT_CATEGORIES: ContentCategory[] = [
  {
    id: 'foundational',
    name: 'Foundational Education',
    description: 'High-volume awareness keywords + conversational LLM queries',
    keywords: ['schengen 90/180 rule', 'what is ETIAS', 'EES vs ETIAS', 'schengen area countries'],
    targetPosts: 12,
    seoFocus: 'awareness'
  },
  {
    id: 'preparation',
    name: 'EES/ETIAS Preparation',
    description: 'Implementation timeline + preparation keywords',
    keywords: ['EES October 2025', 'ETIAS application', 'biometric data', 'travel documents'],
    targetPosts: 12,
    seoFocus: 'preparation'
  },
  {
    id: 'planning',
    name: 'Travel Planning & Scenarios',
    description: 'Long-tail planning queries + specific use cases',
    keywords: ['maximize 90 days Europe', '6 months Europe travel', 'multi country trip'],
    targetPosts: 12,
    seoFocus: 'planning'
  },
  {
    id: 'compliance',
    name: 'Compliance & Legal',
    description: 'Legal/compliance focused keywords + professional queries',
    keywords: ['schengen overstay penalties', 'EES data protection', 'corporate compliance'],
    targetPosts: 10,
    seoFocus: 'compliance'
  },
  {
    id: 'tools',
    name: 'Tools & Practical Resources',
    description: 'Tool-specific keywords + how-to guides',
    keywords: ['best schengen calculator', 'travel planning tools', 'compliance tracking'],
    targetPosts: 4,
    seoFocus: 'tools'
  }
]

// Use the comprehensive templates
export const BLOG_POST_TEMPLATES: BlogPostTemplate[] = ALL_BLOG_TEMPLATES

export class AIContentGenerator {
  // private multiAPI: MultiAPIIntelligenceService

  constructor() {
    // this.multiAPI = MultiAPIIntelligenceService.getInstance()
  }

  /**
   * Generate a complete blog post from template
   */
  async generateBlogPost(template: BlogPostTemplate): Promise<GeneratedContent> {
    const prompt = this.createContentPrompt(template)

    try {
      // Temporary mock content for build testing
      const mockContent = this.generateMockContent(template)

      const content = this.formatGeneratedContent(mockContent, template)
      const metrics = this.calculateContentMetrics(content)

      return {
        metadata: template,
        content,
        wordCount: metrics.wordCount,
        readTime: metrics.readTime,
        seoScore: metrics.seoScore,
        llmOptimizationScore: metrics.llmScore
      }
    } catch (error) {
      console.error('Content generation failed:', error)
      throw new Error(`Failed to generate content for ${template.title}`)
    }
  }

  /**
   * Generate all posts for a specific category
   */
  async generateCategoryContent(categoryId: string): Promise<GeneratedContent[]> {
    const templates = BLOG_POST_TEMPLATES.filter(t =>
      t.category.toLowerCase().includes(categoryId)
    )

    const results: GeneratedContent[] = []

    for (const template of templates) {
      try {
        const content = await this.generateBlogPost(template)
        results.push(content)

        // Add delay between requests to respect rate limits
        await this.delay(2000)
      } catch (error) {
        console.error(`Failed to generate ${template.title}:`, error)
      }
    }

    return results
  }

  /**
   * Generate mock content for testing (temporary)
   */
  private generateMockContent(template: BlogPostTemplate): string {
    return `
# ${template.title}

${template.description}

## Introduction

${template.contentStructure.introduction}

${template.contentStructure.mainSections.map(section => `
## ${section}

This section would cover ${section.toLowerCase()} with detailed explanations, examples, and practical guidance for travelers.

`).join('')}

## Frequently Asked Questions

${template.contentStructure.faqSection.map(question => `
### ${question}

This is a comprehensive answer to the question about ${question.toLowerCase()}.

`).join('')}

## Conclusion

${template.contentStructure.conclusion}
`
  }

  /**
   * Create optimized prompt for content generation
   */
  private createContentPrompt(template: BlogPostTemplate): string {
    return `
Create a comprehensive, SEO-optimized blog post with the following specifications:

TITLE: ${template.title}
PRIMARY KEYWORD: ${template.primaryKeyword}
TARGET AUDIENCE: ${template.targetAudience}
WORD COUNT: 1500-2000 words

CONTENT REQUIREMENTS:
- Write in conversational, expert tone
- Include FAQ section with ${template.contentStructure.faqSection.length} questions
- Use H2/H3 hierarchy with descriptive headings
- Include bullet points and numbered lists
- Make it LLM-friendly for AI citation
- Focus on semantic clarity over keyword density

STRUCTURE:
1. Introduction: ${template.contentStructure.introduction}
2. Main Sections: ${template.contentStructure.mainSections.join(', ')}
3. FAQ Section: Address these questions: ${template.contentStructure.faqSection.join(', ')}
4. Conclusion: ${template.contentStructure.conclusion}

SEO OPTIMIZATION:
- Naturally include keywords: ${template.keywords.join(', ')}
- Write for featured snippets and AI overviews
- Use question-based headings
- Include fact-checkable information
- Add internal linking opportunities

LLM OPTIMIZATION:
- Structure for easy AI extraction
- Use conversational language matching voice queries
- Include complete answers in digestible formats
- Add authoritative sources and expert insights

Please generate the complete blog post content in markdown format.
`
  }

  /**
   * Format generated content with proper structure
   */
  private formatGeneratedContent(content: string, template: BlogPostTemplate): string {
    let formattedContent = content

    // Add schema markup comments
    formattedContent = `<!-- Article Schema: ${template.title} -->
<!-- Primary Keyword: ${template.primaryKeyword} -->
<!-- Target: ${template.targetAudience} -->

${formattedContent}

<!-- FAQ Schema Integration -->
<!-- Internal Links: Add links to calculator and related posts -->
<!-- CTA: Include call-to-action to ETIAS Calculator -->`

    return formattedContent
  }

  /**
   * Calculate content quality metrics
   */
  private calculateContentMetrics(content: string): {
    wordCount: number
    readTime: string
    seoScore: number
    llmScore: number
  } {
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200) + ' min read'

    // Simple scoring based on structure elements
    let seoScore = 70 // Base score
    let llmScore = 70 // Base score

    // Check for SEO elements
    if (content.includes('##')) seoScore += 10 // H2 headings
    if (content.includes('###')) seoScore += 5 // H3 headings
    if (content.includes('FAQ') || content.includes('frequently asked')) seoScore += 15
    if (content.includes('- ') || content.includes('1.')) seoScore += 10 // Lists

    // Check for LLM optimization
    if (content.includes('?')) llmScore += 10 // Questions
    if (content.includes('step-by-step') || content.includes('Step 1')) llmScore += 10
    if (wordCount > 1500) llmScore += 10 // Comprehensive content
    if (content.includes('example') || content.includes('scenario')) llmScore += 5

    return {
      wordCount,
      readTime,
      seoScore: Math.min(seoScore, 100),
      llmScore: Math.min(llmScore, 100)
    }
  }

  /**
   * Utility function to add delay between API calls
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get all templates for a category
   */
  getTemplatesByCategory(categoryId: string): BlogPostTemplate[] {
    return TEMPLATES_BY_CATEGORY[categoryId as keyof typeof TEMPLATES_BY_CATEGORY] || []
  }

  /**
   * Generate content in batches to manage costs
   */
  async generateContentBatch(templates: BlogPostTemplate[], batchSize: number = 3): Promise<GeneratedContent[]> {
    const results: GeneratedContent[] = []

    for (let i = 0; i < templates.length; i += batchSize) {
      const batch = templates.slice(i, i + batchSize)
      const batchPromises = batch.map(template => this.generateBlogPost(template))

      try {
        const batchResults = await Promise.all(batchPromises)
        results.push(...batchResults)

        // Delay between batches
        if (i + batchSize < templates.length) {
          await this.delay(5000)
        }
      } catch (error) {
        console.error(`Batch ${i / batchSize + 1} failed:`, error)
      }
    }

    return results
  }
}

/**
 * Hook for using content generation in components
 */
export function useAIContentGenerator() {
  const generator = new AIContentGenerator()

  const generatePost = async (template: BlogPostTemplate): Promise<GeneratedContent> => {
    return generator.generateBlogPost(template)
  }

  const generateCategory = async (categoryId: string): Promise<GeneratedContent[]> => {
    return generator.generateCategoryContent(categoryId)
  }

  const getTemplates = (categoryId?: string): BlogPostTemplate[] => {
    if (categoryId) {
      return generator.getTemplatesByCategory(categoryId)
    }
    return BLOG_POST_TEMPLATES
  }

  return {
    generatePost,
    generateCategory,
    getTemplates,
    categories: CONTENT_CATEGORIES
  }
}