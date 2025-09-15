'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  Download,
  FileText,
  Zap,
  Target,
  TrendingUp,
  Users,
  Clock,
  Check,
  AlertCircle,
  Info
} from 'lucide-react'
import { Header, Footer } from '@schengen/ui'
import { useContentManagement } from '@/lib/services/content-management'
import { CONTENT_CATEGORIES } from '@/lib/services/ai-content-generator'
import { BlogPost } from '@/lib/blog-data'

interface GenerationStatus {
  category: string
  status: 'pending' | 'generating' | 'completed' | 'error'
  progress: number
  postsGenerated: number
  totalPosts: number
  estimatedTime?: string
  error?: string
}

export default function ContentGeneratorPage() {
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus[]>(
    CONTENT_CATEGORIES.map(cat => ({
      category: cat.id,
      status: 'pending',
      progress: 0,
      postsGenerated: 0,
      totalPosts: cat.targetPosts
    }))
  )

  const [generatedPosts, setGeneratedPosts] = useState<BlogPost[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { generateCategory, generateAllContent } = useContentManagement()

  /**
   * Generate content for a specific category
   */
  const handleCategoryGeneration = async (categoryId: string) => {
    if (isGenerating) return

    setIsGenerating(true)
    setSelectedCategory(categoryId)

    // Update status to generating
    setGenerationStatus(prev => prev.map(status =>
      status.category === categoryId
        ? { ...status, status: 'generating', progress: 0 }
        : status
    ))

    try {
      console.log(`Starting generation for category: ${categoryId}`)

      // Simulate progress updates (in real implementation, this would come from the generator)
      const progressInterval = setInterval(() => {
        setGenerationStatus(prev => prev.map(status =>
          status.category === categoryId
            ? {
                ...status,
                progress: Math.min(status.progress + 10, 90),
                postsGenerated: Math.floor((status.progress / 100) * status.totalPosts)
              }
            : status
        ))
      }, 2000)

      // Generate the content
      const posts = await generateCategory(categoryId)

      clearInterval(progressInterval)

      // Update final status
      setGenerationStatus(prev => prev.map(status =>
        status.category === categoryId
          ? {
              ...status,
              status: 'completed',
              progress: 100,
              postsGenerated: posts.length
            }
          : status
      ))

      // Add generated posts to state
      setGeneratedPosts(prev => [...prev, ...posts])

      console.log(`✅ Generated ${posts.length} posts for ${categoryId}`)

    } catch (error) {
      console.error(`❌ Generation failed for ${categoryId}:`, error)

      setGenerationStatus(prev => prev.map(status =>
        status.category === categoryId
          ? {
              ...status,
              status: 'error',
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          : status
      ))
    } finally {
      setIsGenerating(false)
      setSelectedCategory(null)
    }
  }

  /**
   * Generate all content at once
   */
  const handleGenerateAll = async () => {
    if (isGenerating) return

    setIsGenerating(true)

    try {
      // Mark all as generating
      setGenerationStatus(prev => prev.map(status => ({
        ...status,
        status: 'generating',
        progress: 0
      })))

      console.log('🚀 Starting full content generation...')

      const allContent = await generateAllContent()

      // Flatten all posts
      const allPosts = Object.values(allContent).flat()

      // Update all statuses to completed
      setGenerationStatus(prev => prev.map(status => {
        const categoryPosts = allContent[status.category as keyof typeof allContent] || []
        return {
          ...status,
          status: 'completed',
          progress: 100,
          postsGenerated: categoryPosts.length
        }
      }))

      setGeneratedPosts(allPosts)

      console.log(`✅ Generated ${allPosts.length} total posts!`)

    } catch (error) {
      console.error('❌ Full generation failed:', error)

      setGenerationStatus(prev => prev.map(status => ({
        ...status,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })))
    } finally {
      setIsGenerating(false)
    }
  }

  /**
   * Export generated content as JSON
   */
  const handleExportContent = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      totalPosts: generatedPosts.length,
      posts: generatedPosts.map(post => ({
        ...post,
        // Remove large content field for overview export
        contentPreview: post.content.substring(0, 500) + '...',
        content: undefined
      }))
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `blog-content-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const totalPosts = generationStatus.reduce((sum, status) => sum + status.totalPosts, 0)
  const completedPosts = generationStatus.reduce((sum, status) => sum + status.postsGenerated, 0)
  const overallProgress = totalPosts > 0 ? (completedPosts / totalPosts) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
              AI Content Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-dm-sans">
              Generate 50 SEO-optimized blog posts with LLM optimization for maximum search visibility
            </p>
          </motion.div>

          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{totalPosts}</h3>
              <p className="text-gray-600">Total Posts</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{completedPosts}</h3>
              <p className="text-gray-600">Generated</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{Math.round(overallProgress)}%</h3>
              <p className="text-gray-600">Progress</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Target className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">95+</h3>
              <p className="text-gray-600">SEO Score</p>
            </div>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <h2 className="text-2xl font-poppins font-bold text-gray-900">
                Content Generation Control
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={handleGenerateAll}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <Pause className="h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Generate All (50 Posts)
                    </>
                  )}
                </button>

                {generatedPosts.length > 0 && (
                  <button
                    onClick={handleExportContent}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Export Content
                  </button>
                )}
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-500">{completedPosts}/{totalPosts} posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Category Generation Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONTENT_CATEGORIES.map((category, index) => {
                const status = generationStatus.find(s => s.category === category.id)
                const isCurrentlyGenerating = selectedCategory === category.id && isGenerating

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {status?.status === 'completed' && (
                          <Check className="h-5 w-5 text-green-600" />
                        )}
                        {status?.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        {status?.status === 'generating' && (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        {status?.postsGenerated || 0}/{category.targetPosts} posts
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {category.seoFocus}
                      </span>
                    </div>

                    {/* Category Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${status?.progress || 0}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleCategoryGeneration(category.id)}
                      disabled={isGenerating || status?.status === 'completed'}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {status?.status === 'completed' ? 'Completed' :
                       isCurrentlyGenerating ? 'Generating...' :
                       status?.status === 'error' ? 'Retry' :
                       'Generate Category'}
                    </button>

                    {status?.error && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{status.error}</p>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Generated Content Preview */}
          {generatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-poppins font-bold text-gray-900">
                  Generated Content Preview
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Info className="h-4 w-4" />
                  {generatedPosts.length} posts ready for publication
                </div>
              </div>

              <div className="grid gap-4">
                {generatedPosts.slice(0, 5).map((post, index) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{post.wordCount} words</span>
                          <span>{post.readTime}</span>
                          <span>SEO: {post.seoScore}/100</span>
                          <span>LLM: {post.llmOptimizationScore}/100</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {generatedPosts.length > 5 && (
                  <div className="text-center py-4 text-gray-500">
                    ... and {generatedPosts.length - 5} more posts
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}