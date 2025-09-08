import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getBlogPost, blogPosts } from '@/lib/blog-data'
import BlogPostClient from './BlogPostClient'

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found | Schengen Calculator',
      description: 'The blog post you are looking for could not be found.'
    }
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
    },
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    other: {
      'article:published_time': post.publishDate,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    }
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Schengen Calculator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://schengenvisacalculator.com/logo.png',
      },
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://schengenvisacalculator.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    articleBody: post.content,
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <BlogPostClient post={post} />
    </>
  )
}