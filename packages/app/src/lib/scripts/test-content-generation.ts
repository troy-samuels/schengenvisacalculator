/**
 * Test Content Generation Script
 * Tests the AI content generation pipeline with sample templates
 */

import { AIContentGenerator } from '../services/ai-content-generator'
import { ContentManagementService } from '../services/content-management'
import { FOUNDATIONAL_TEMPLATES } from '../data/blog-templates'

export async function testContentGeneration() {
  console.log('🚀 Starting content generation test...')

  const aiGenerator = new AIContentGenerator()
  const contentManager = new ContentManagementService()

  try {
    // Test 1: Generate a single blog post
    console.log('\n📝 Test 1: Generating single blog post...')
    const testTemplate = FOUNDATIONAL_TEMPLATES[0] // First foundational post

    console.log(`Generating: "${testTemplate.title}"`)
    const generatedContent = await aiGenerator.generateBlogPost(testTemplate)

    console.log('✅ Content generated successfully!')
    console.log(`📊 Metrics:`)
    console.log(`- Word count: ${generatedContent.wordCount}`)
    console.log(`- Read time: ${generatedContent.readTime}`)
    console.log(`- SEO score: ${generatedContent.seoScore}/100`)
    console.log(`- LLM optimization: ${generatedContent.llmOptimizationScore}/100`)

    // Test 2: Convert to BlogPost format
    console.log('\n🔄 Test 2: Converting to BlogPost format...')
    const blogPost = await contentManager.generateBlogPost(testTemplate)

    console.log('✅ BlogPost created successfully!')
    console.log(`📋 Post details:`)
    console.log(`- ID: ${blogPost.id}`)
    console.log(`- Slug: ${blogPost.slug}`)
    console.log(`- Publish status: ${blogPost.publishStatus}`)
    console.log(`- AI generated: ${blogPost.aiGenerated}`)
    console.log(`- FAQ sections: ${blogPost.faqSection?.length || 0}`)
    console.log(`- Internal links: ${blogPost.internalLinks?.length || 0}`)

    // Test 3: Test category generation (limited to prevent API costs)
    console.log('\n📚 Test 3: Testing category generation (first 2 posts)...')
    const limitedTemplates = FOUNDATIONAL_TEMPLATES.slice(0, 2)

    const categoryPosts = await Promise.all(
      limitedTemplates.map(template => contentManager.generateBlogPost(template))
    )

    console.log(`✅ Generated ${categoryPosts.length} category posts!`)
    categoryPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.wordCount} words)`)
    })

    // Test 4: Validate content quality
    console.log('\n🔍 Test 4: Content quality validation...')
    const qualityMetrics = categoryPosts.map(post => ({
      title: post.title.substring(0, 50) + '...',
      seoScore: post.seoScore || 0,
      llmScore: post.llmOptimizationScore || 0,
      wordCount: post.wordCount || 0,
      hasFAQ: (post.faqSection?.length || 0) > 0,
      hasInternalLinks: (post.internalLinks?.length || 0) > 0
    }))

    console.table(qualityMetrics)

    console.log('\n🎉 Content generation test completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Total posts generated: ${categoryPosts.length + 1}`)
    console.log(`- Average SEO score: ${Math.round(categoryPosts.reduce((sum, post) => sum + (post.seoScore || 0), 0) / categoryPosts.length)}`)
    console.log(`- Average LLM score: ${Math.round(categoryPosts.reduce((sum, post) => sum + (post.llmOptimizationScore || 0), 0) / categoryPosts.length)}`)
    console.log(`- Posts with FAQ: ${categoryPosts.filter(post => (post.faqSection?.length || 0) > 0).length}`)
    console.log(`- Posts with internal links: ${categoryPosts.filter(post => (post.internalLinks?.length || 0) > 0).length}`)

    return {
      success: true,
      postsGenerated: categoryPosts.length + 1,
      samplePost: blogPost,
      qualityMetrics
    }

  } catch (error) {
    console.error('❌ Content generation test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function testFullCategoryGeneration(categoryId: 'foundational' | 'preparation' | 'planning' | 'compliance' | 'tools') {
  console.log(`🚀 Starting full category generation test for: ${categoryId}`)

  const contentManager = new ContentManagementService()

  try {
    const startTime = Date.now()

    // Generate all posts in the category
    console.log(`📝 Generating all posts for ${categoryId} category...`)
    const categoryPosts = await contentManager.generateCategoryPosts(categoryId)

    const endTime = Date.now()
    const duration = Math.round((endTime - startTime) / 1000)

    console.log(`✅ Category generation completed!`)
    console.log(`⏱️  Duration: ${duration} seconds`)
    console.log(`📊 Results:`)
    console.log(`- Posts generated: ${categoryPosts.length}`)
    console.log(`- Average word count: ${Math.round(categoryPosts.reduce((sum, post) => sum + (post.wordCount || 0), 0) / categoryPosts.length)}`)
    console.log(`- Average SEO score: ${Math.round(categoryPosts.reduce((sum, post) => sum + (post.seoScore || 0), 0) / categoryPosts.length)}`)

    // Show post titles
    console.log('\n📋 Generated posts:')
    categoryPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`)
    })

    return {
      success: true,
      categoryId,
      postsGenerated: categoryPosts.length,
      duration,
      posts: categoryPosts
    }

  } catch (error) {
    console.error(`❌ Category generation failed for ${categoryId}:`, error)
    return {
      success: false,
      categoryId,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Command line interface for testing
export function runContentGenerationTests() {
  const args = process.argv.slice(2)
  const testType = args[0] || 'basic'

  switch (testType) {
    case 'basic':
      testContentGeneration()
      break
    case 'category':
      const categoryId = args[1] as any || 'foundational'
      testFullCategoryGeneration(categoryId)
      break
    case 'all':
      console.log('🚀 Running comprehensive content generation...')
      // This would generate all 50 posts - use with caution due to API costs
      break
    default:
      console.log('Usage: npm run test:content [basic|category|all] [categoryId]')
      console.log('Examples:')
      console.log('  npm run test:content basic')
      console.log('  npm run test:content category foundational')
      console.log('  npm run test:content all')
  }
}

// Export test functions
export { testContentGeneration as default }