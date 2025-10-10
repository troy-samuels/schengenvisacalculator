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
      title: 'Post Not Found | EU Border Authority',
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

  // Generate comprehensive JSON-LD structured data for SEO
  const baseUrl = 'https://euborder.com'

  // Main Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image ? [post.image] : undefined,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EU Border Authority',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishDate,
    dateModified: post.lastUpdated || post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount: post.wordCount,
    inLanguage: 'en-US',
  }

  // FAQ Schema (if post has FAQ section)
  const faqSchema = post.faqSection && post.faqSection.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqSection.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null

  // HowTo Schema (if post has HowTo structured data)
  const howToSchema = post.structuredData?.type === 'HowTo' ? post.structuredData.schema : null

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`
      }
    ]
  }

  // Combine all schemas
  const jsonLd = [
    articleSchema,
    breadcrumbSchema,
    faqSchema,
    howToSchema
  ].filter(Boolean)

  return (
    <>
      {/* Multiple JSON-LD structured data schemas for rich snippets */}
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogPostClient post={post} />
    </>
  )
}