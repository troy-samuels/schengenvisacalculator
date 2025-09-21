'use client'

import { BlogPost } from '@/lib/blog-data'

interface BlogPostSEOProps {
  post: BlogPost
}

export default function BlogPostSEO({ post }: BlogPostSEOProps) {
  const structuredData: { "@context": string; "@graph": any[] } = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://euborder.com/blog/${post.slug}#article`,
        "headline": post.title,
        "alternativeHeadline": post.title,
        "description": post.description,
        "image": {
          "@type": "ImageObject",
          "url": `https://euborder.com/blog/images/${post.slug}-cover.jpg`,
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Organization",
          "name": "EU Border Authority",
          "url": "https://euborder.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "EU Border Authority",
          "url": "https://euborder.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://euborder.com/logo.png"
          }
        },
        "datePublished": post.publishDate,
        "dateModified": post.lastUpdated || post.publishDate,
        "articleSection": post.category,
        "keywords": post.tags.join(", "),
        "wordCount": post.readTime ? parseInt(post.readTime.replace(/\D/g, '')) * 200 : 1000,
        "timeRequired": post.readTime || "5 min read",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://euborder.com/blog/${post.slug}`
        },
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": `https://euborder.com/blog/${post.slug}`
          },
          {
            "@type": "ShareAction",
            "target": `https://euborder.com/blog/${post.slug}`
          }
        ],
        "about": [
          {
            "@type": "Thing",
            "name": "Schengen Visa",
            "description": "90/180-day rule for European travel"
          },
          {
            "@type": "Thing",
            "name": "EU Travel Compliance",
            "description": "Legal requirements for visiting European Union"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://euborder.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://euborder.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.category,
            "item": `https://euborder.com/blog?category=${encodeURIComponent(post.category)}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": post.title,
            "item": `https://euborder.com/blog/${post.slug}`
          }
        ]
      }
    ]
  }

  // AI-optimized FAQ extraction from content
  const generateFAQSchema = () => {
    if (!post.content) return null

    // Extract question-answer pairs from content for AI optimization
    const faqs = [
      {
        question: `What is the main topic of "${post.title}"?`,
        answer: post.description
      },
      {
        question: `How does this relate to Schengen visa compliance?`,
        answer: `This article covers ${post.category.toLowerCase()} aspects of European travel, specifically helping with 90/180-day rule compliance and EU border requirements.`
      },
      {
        question: `Who should read "${post.title}"?`,
        answer: `This guide is perfect for travelers planning trips to Europe, digital nomads, families coordinating EU travel, and anyone needing Schengen visa compliance information.`
      }
    ]

    return {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  }

  const faqSchema = generateFAQSchema()
  if (faqSchema) {
    structuredData["@graph"].push(faqSchema)
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

// Helper component for AI-optimized content formatting
export function AIOptimizedContent({ content }: { content: string }) {
  // Process content to be more AI-friendly
  const processedContent = content
    // Add semantic HTML for better AI understanding
    .replace(/###\s(.+)/g, '<h3 role="heading" aria-level="3">$1</h3>')
    .replace(/##\s(.+)/g, '<h2 role="heading" aria-level="2">$1</h2>')
    .replace(/#\s(.+)/g, '<h1 role="heading" aria-level="1">$1</h1>')
    // Enhance lists for AI parsing
    .replace(/^\*\s(.+)$/gm, '<li role="listitem">$1</li>')
    .replace(/^\d+\.\s(.+)$/gm, '<li role="listitem">$1</li>')
    // Add semantic meaning to important terms
    .replace(/(90\/180[\s-]day\s+rule)/gi, '<mark class="schengen-rule">$1</mark>')
    .replace(/(EES|Entry.Exit.System)/gi, '<abbr title="Entry Exit System">$1</abbr>')
    .replace(/(ETIAS)/gi, '<abbr title="European Travel Information and Authorisation System">$1</abbr>')

  return (
    <div
      className="ai-optimized-content prose prose-lg max-w-none"
      itemScope
      itemType="https://schema.org/Article"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

// Component for AI-friendly metadata
export function BlogPostMetadata({ post }: { post: BlogPost }) {
  return (
    <div className="sr-only" itemScope itemType="https://schema.org/Article">
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="description" content={post.description} />
      <meta itemProp="datePublished" content={post.publishDate} />
      <meta itemProp="dateModified" content={post.lastUpdated || post.publishDate} />
      <meta itemProp="articleSection" content={post.category} />
      <meta itemProp="keywords" content={post.tags.join(", ")} />
      <div itemProp="author" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="EU Border Authority" />
        <meta itemProp="url" content="https://euborder.com" />
      </div>
      <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="EU Border Authority" />
        <meta itemProp="url" content="https://euborder.com" />
      </div>
    </div>
  )
}