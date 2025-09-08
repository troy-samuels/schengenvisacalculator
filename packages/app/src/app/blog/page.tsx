'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, ArrowRight, Filter } from 'lucide-react'
import Link from 'next/link'
import { blogPosts, getAllCategories, searchBlogPosts, getBlogPostsByCategory } from '@/lib/blog-data'
import { Header } from '@schengen/ui'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...getAllCategories()]

  // Filter posts based on search and category
  const filteredPosts = React.useMemo(() => {
    let posts = blogPosts

    if (selectedCategory !== 'All') {
      posts = getBlogPostsByCategory(selectedCategory)
    }

    if (searchQuery) {
      posts = searchBlogPosts(searchQuery).filter(post => 
        selectedCategory === 'All' || post.category === selectedCategory
      )
    }

    return posts
  }, [searchQuery, selectedCategory])

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
              Travel Smart with Expert Guides
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-dm-sans">
              Master European travel with our comprehensive guides on Schengen visas, digital nomad tips, and compliance strategies.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-500">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-poppins font-bold text-gray-900 mb-8"
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.filter(post => post.featured).slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <FeaturedBlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl font-poppins font-bold text-gray-900 mb-8"
          >
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategory !== 'All' ? `${selectedCategory} Articles` : 'All Articles'}
          </motion.h2>
          
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-500 mb-4">No articles found</p>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
              Ready to Plan Your European Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Use our free Schengen calculator to ensure perfect visa compliance
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-poppins font-semibold text-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Try Our Calculator <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function FeaturedBlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        </div>
        
        <div className="p-6">
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
          
          <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function BlogCard({ post }: { post: any }) {
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
        
        <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </Link>
  )
}