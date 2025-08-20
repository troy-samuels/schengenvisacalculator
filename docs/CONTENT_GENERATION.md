# Content Generation System

An automated SEO content generation system that creates thousands of location-specific visa and travel pages for maximum search visibility.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Templates](#templates)
- [SEO Optimization](#seo-optimization)
- [Admin Interface](#admin-interface)
- [CLI Tools](#cli-tools)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The content generation system automatically creates SEO-optimized pages for:

- **Country-to-Schengen visa requirements** (50+ pages)
- **Digital nomad guides** (30+ pages)
- **Visa comparison pages** (200+ pages)
- **FAQ pages** for common questions (10+ pages)
- **Travel guides** and related content

**Target:** Generate 1000+ unique, high-quality pages covering all country combinations and visa scenarios.

## ✨ Features

### Core Features
- 🤖 **Automated Content Generation** - Template-based content with variable injection
- 🔗 **Automatic Internal Linking** - Context-aware linking between related pages
- 📊 **Schema Markup** - Rich snippets for FAQs, travel actions, and government services
- 🗺️ **Dynamic Sitemaps** - Auto-generated XML sitemaps for SEO
- 📱 **Mobile Optimization** - Responsive content with mobile-specific sitemaps
- 🎨 **AI Content Variation** - Avoid duplication with intelligent content variation
- 📈 **SEO Scoring** - Automatic content quality assessment

### Admin Features
- 🖥️ **Admin Dashboard** - Visual interface for content management
- 📊 **Analytics Integration** - Track page performance and SEO metrics
- ✏️ **Content Review** - Manual review and editing workflow
- 🔄 **Bulk Operations** - Generate, update, or delete multiple pages
- 📋 **Generation Jobs** - Track long-running content generation tasks

### Technical Features
- ⚡ **High Performance** - Efficient template processing and database operations
- 🔧 **Extensible** - Easy to add new content types and templates
- 🛡️ **Error Handling** - Robust error handling with detailed logging
- 🧪 **Testing** - Comprehensive test coverage for all components

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Generation System                │
├─────────────────────────────────────────────────────────────┤
│  Admin UI        │  API Routes       │  CLI Tools          │
│  ├── Dashboard   │  ├── /generate    │  ├── generate.mjs   │
│  ├── Analytics   │  ├── /sitemap     │  └── validate.mjs   │
│  └── Management  │  └── /robots      │                     │
├─────────────────────────────────────────────────────────────┤
│                    Core Services                            │
│  ├── ContentGeneratorService  - Main generation logic      │
│  ├── TemplateEngine          - Template processing         │
│  ├── InternalLinkingService  - Auto-linking system         │
│  ├── SchemaGenerator         - Structured data markup      │
│  └── SitemapGenerator        - SEO sitemap management      │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ├── Countries Database      - Country and visa data       │
│  ├── Template Storage       - Content templates            │
│  ├── Generated Pages        - Output content storage       │
│  └── Analytics Data         - Performance metrics          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (via Supabase)
- Next.js 14+

### Installation

1. **Database Setup**
```sql
-- Run the database schema
psql -f lib/content-generation/database-schema.sql
```

2. **Environment Variables**
```bash
# Add to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. **Install Dependencies**
```bash
npm install
```

4. **Initialize Templates**
```bash
# The system will auto-create default templates on first run
npm run content:dry-run
```

## 📖 Usage

### Quick Start

Generate all content types:
```bash
npm run content:generate:all
```

Generate specific content types:
```bash
# Country visa pages
npm run content:generate:countries

# Digital nomad guides  
npm run content:generate:nomad

# Visa comparisons
npm run content:generate:comparisons

# FAQ pages
npm run content:generate:faq
```

### Admin Interface

Access the admin interface at `/admin/content`:

1. **Dashboard** - Overview of generated content and metrics
2. **Content Generator** - Bulk generation controls
3. **Page Management** - Review and edit individual pages
4. **Analytics** - Performance tracking and SEO metrics

### API Usage

Generate content via API:
```bash
# Generate all content
curl -X POST http://localhost:3000/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'

# Generate specific type
curl -X POST http://localhost:3000/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{"type": "country-to-schengen", "options": {"saveToDatabase": true}}'
```

Get sitemaps:
```bash
# Main sitemap
curl http://localhost:3000/api/sitemap

# Country-specific sitemap
curl http://localhost:3000/api/sitemap?type=countries

# Sitemap index
curl http://localhost:3000/api/sitemap?type=index
```

## 🔧 API Reference

### Content Generation API

#### `POST /api/content/generate`

Generate content pages.

**Request:**
```json
{
  "type": "all|country-to-schengen|digital-nomad|visa-comparison|faq-pages",
  "options": {
    "saveToDatabase": true,
    "updateInternalLinks": true,
    "updateSitemap": true,
    "includeContent": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "generated": 150,
  "pages": [...],
  "breakdown": {
    "countryPages": 50,
    "nomadPages": 30,
    "comparisonPages": 60,
    "faqPages": 10
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### `GET /api/content/generate`

Get generation status and statistics.

**Response:**
```json
{
  "totalPages": 1247,
  "publishedPages": 892,
  "draftPages": 355,
  "templates": {
    "country-to-schengen": 45,
    "digital-nomad-guide": 28,
    "visa-comparison": 156,
    "faq-page": 12
  }
}
```

### Sitemap API

#### `GET /api/sitemap?type={type}`

Generate dynamic sitemaps.

**Types:**
- `main` - Main sitemap with all content
- `countries` - Country-specific pages
- `nomad-guides` - Digital nomad guides
- `comparisons` - Visa comparison pages
- `news` - Recent content (last 48 hours)
- `mobile` - Mobile-optimized sitemap
- `index` - Sitemap index file

#### `POST /api/sitemap`

Regenerate all sitemaps.

#### `GET /api/robots`

Generate dynamic robots.txt.

## 📝 Templates

### Template Types

1. **Country-to-Schengen** (`country-to-schengen`)
   - Visa requirements for specific countries
   - Processing times, costs, and requirements
   - Popular destinations and travel tips

2. **Digital Nomad Guide** (`digital-nomad-guide`)
   - Visa options for remote workers
   - Cost of living and internet speeds
   - Best cities and coworking spaces

3. **Visa Comparison** (`visa-comparison`)
   - Side-by-side country comparisons
   - Cost and requirement differences
   - Processing time comparisons

4. **FAQ Page** (`faq-page`)
   - Common questions and answers
   - Structured data markup
   - Topic-specific information

### Template Variables

Templates use Handlebars-like syntax:

```markdown
# {{fromCountry}} to Schengen Area: Visa Requirements

{{#if visaRequired}}
Citizens of {{fromCountry}} **require a visa** to enter the Schengen Area.
- **Cost**: €{{cost}}
- **Processing**: {{processingTime}}
{{else}}
Great news! Citizens of {{fromCountry}} can travel **visa-free**.
{{/if}}

## Popular Destinations
{{#each popularDestinations}}
### {{name}} {{flag}}
{{description}}
{{/each}}
```

### Creating Custom Templates

1. **Define Template Structure**
```typescript
const customTemplate: ContentTemplate = {
  id: 'custom-template',
  name: 'Custom Template',
  type: 'custom',
  slug: 'custom-template',
  template: 'Your template content here...',
  variables: [
    { name: 'customVar', type: 'string', required: true, description: 'Custom variable' }
  ],
  seoConfig: {
    titleTemplate: '{{customVar}} - Custom Page',
    descriptionTemplate: 'Custom description for {{customVar}}'
  }
}
```

2. **Register Template**
```typescript
templateEngine.registerTemplate(customTemplate)
```

## 🎯 SEO Optimization

### Built-in SEO Features

- **Meta Titles & Descriptions** - Auto-generated with keyword optimization
- **Schema Markup** - Rich snippets for better SERP visibility
- **Internal Linking** - Contextual links between related pages
- **Sitemap Generation** - XML sitemaps for search engines
- **Mobile Optimization** - Mobile-specific sitemaps and markup
- **Robots.txt** - Dynamic robots.txt with sitemap references

### SEO Scoring

The system automatically scores each page (0-100) based on:
- Title length and keyword placement (15-25 points)
- Meta description optimization (15-25 points)
- Content length and structure (20 points)
- Header hierarchy (10 points)
- Internal linking (10 points)
- Schema markup presence (10 points)

### Schema Markup Types

- **FAQPage** - For FAQ pages with question/answer pairs
- **TravelAction** - For visa and travel information pages
- **GovernmentService** - For official visa requirements
- **HowTo** - For digital nomad guides with step-by-step instructions
- **Article** - For content-rich pages
- **BreadcrumbList** - For navigation breadcrumbs

## 🖥️ Admin Interface

### Dashboard Features

- **Content Metrics** - Total pages, SEO scores, view counts
- **Generation Status** - Active jobs and completion rates
- **Performance Analytics** - Top-performing pages and trends
- **Quick Actions** - Generate, review, or publish content

### Content Management

- **Page Listing** - Filterable list of all generated pages
- **Bulk Operations** - Select multiple pages for actions
- **Status Management** - Move between draft, review, and published
- **SEO Analysis** - Per-page SEO score breakdown

### Generation Controls

- **Template Selection** - Choose which templates to generate
- **Country Filtering** - Generate for specific countries only
- **Batch Size Control** - Limit generation for testing
- **Preview Mode** - See generated content before saving

## ⚡ CLI Tools

### Content Generation CLI

```bash
# Generate all content
npm run content:generate:all

# Generate specific types
npm run content:generate:countries
npm run content:generate:nomad
npm run content:generate:comparisons
npm run content:generate:faq

# Dry run (show what would be generated)
npm run content:dry-run

# Generate with verbose output
node scripts/generate-content.mjs --type all --verbose

# Save to database only (skip sitemap updates)
node scripts/generate-content.mjs --type countries --save-only
```

### Available Options

- `--type, -t` - Content type to generate
- `--save-only, -s` - Skip sitemap and linking updates
- `--dry-run, -d` - Preview without generating
- `--verbose, -v` - Detailed output
- `--help, -h` - Show help message

## 🗃️ Database Schema

### Core Tables

1. **content_templates** - Template definitions and configurations
2. **generated_pages** - All generated page content and metadata
3. **visa_requirements** - Country-specific visa data
4. **content_generation_jobs** - Background job tracking
5. **sitemap_entries** - SEO sitemap management
6. **internal_links** - Automatic internal linking data
7. **content_metrics** - Page performance analytics

### Key Relationships

```sql
generated_pages ──→ content_templates (template_id)
generated_pages ──→ sitemap_entries (page_id)
generated_pages ──→ internal_links (from_page_id, to_page_id)
generated_pages ──→ content_metrics (page_id)
```

## ⚙️ Configuration

### Environment Variables

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Content Generation
CONTENT_BASE_URL=https://schengenvisacalculator.com
CONTENT_AI_VARIATION=true
CONTENT_AUTO_PUBLISH=false

# SEO
SEO_DEFAULT_IMAGE=https://example.com/default-image.jpg
SEO_ORGANIZATION_NAME=Schengen Visa Calculator
```

### System Limits

- **Max pages per generation**: 50,000
- **Sitemap max URLs**: 50,000 per file
- **Internal links per page**: 15
- **Template variables**: Unlimited
- **Content length**: 100,000 characters per page

## 📊 Monitoring

### Performance Metrics

- **Generation Speed** - Pages per second
- **Success Rate** - Percentage of successful generations
- **SEO Score Average** - Content quality metrics
- **Database Performance** - Query times and optimization
- **Memory Usage** - System resource utilization

### Logging

The system provides comprehensive logging:

```typescript
// Content generation logs
console.log('Generated 50 country-to-Schengen pages')
console.log('SEO score average: 87%')
console.log('Internal links created: 425')

// Error logs
console.error('Template validation failed: Missing required variable')
console.error('Database save failed for page: visa-requirements-india')
```

### Health Checks

- **Template Validation** - Ensure all templates are valid
- **Database Connectivity** - Verify database connections
- **API Endpoint Status** - Monitor API response times
- **Sitemap Accessibility** - Check sitemap URL validity

## 🔍 Troubleshooting

### Common Issues

#### Generation Fails with Template Error
```bash
Error: Template validation failed: Required variable 'fromCountry' is missing
```
**Solution:** Check template variable definitions and ensure all required variables are provided.

#### Database Save Errors
```bash
Error: Database constraint violation - duplicate slug
```
**Solution:** Ensure slug uniqueness or implement slug deduplication logic.

#### Sitemap Too Large
```bash
Warning: Sitemap contains 55,000 URLs, exceeding 50,000 limit
```
**Solution:** Use sitemap splitting or multiple themed sitemaps.

#### Memory Issues During Generation
```bash
Error: JavaScript heap out of memory
```
**Solution:** Reduce batch size or implement streaming generation.

### Debug Mode

Enable detailed logging:
```bash
DEBUG=content-generation node scripts/generate-content.mjs --verbose
```

### Performance Optimization

1. **Batch Processing** - Generate pages in smaller batches
2. **Database Indexing** - Ensure proper indexes on frequently queried columns
3. **Template Caching** - Cache compiled templates for reuse
4. **Parallel Processing** - Use worker threads for CPU-intensive tasks

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Schema.org Markup](https://schema.org/)
- [XML Sitemaps Protocol](https://www.sitemaps.org/)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

## 📜 License

This content generation system is part of the Schengen Visa Calculator project and follows the same licensing terms.