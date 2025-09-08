'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, Calculator, ArrowRight, Tag, User } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Header } from '@schengen/ui'
import { BlogPost, blogPosts } from '@/lib/blog-data'

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  
  // Get related posts (same category, different post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      })
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowShareMenu(false)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-6 font-dm-sans">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">{post.content.split(' ').length} words</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Article
              </button>
              
              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                  <button
                    onClick={copyToClipboard}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-8 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg prose-blue max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-poppins font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-poppins font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-poppins font-semibold text-gray-900 mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4 font-dm-sans">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 my-6">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">
                    {children}
                  </code>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-gray-300">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.section>

      {/* Calculator CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-700 mt-8"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <Calculator className="h-16 w-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-poppins font-bold text-white mb-4">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Use our free Schengen calculator to ensure perfect visa compliance
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-poppins font-semibold text-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Try Our Calculator <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-16 px-4 bg-gray-50"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <RelatedPostCard post={relatedPost} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-16 px-4 bg-white"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
            Stay Updated with Travel Tips
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest Schengen visa guides and European travel tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 group">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="text-lg font-poppins font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </Link>
  )
}