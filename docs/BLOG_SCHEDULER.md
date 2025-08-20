# Automated Blog Scheduler

An intelligent blog scheduling system that automatically publishes 3 blog posts per week on random days and times until reaching 1000 total posts. This creates a natural, organic publishing pattern that's great for SEO while removing the manual effort.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Configuration](#configuration)
- [Admin Interface](#admin-interface)
- [API Reference](#api-reference)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The blog scheduler automatically:
- **Generates 3 posts per week** on random days/times
- **Maintains 24+ hour spacing** between posts
- **Publishes within business hours** (9 AM - 5 PM UTC)
- **Rotates content types** intelligently
- **Continues until 1000 posts** are reached
- **Provides full admin control** and monitoring

### Timeline Example
- **Target**: 1000 posts at 3 per week
- **Duration**: ~77 weeks (~1.5 years)
- **Schedule**: Random days (Mon-Sun) at random times (9 AM - 5 PM UTC)
- **Content Mix**: 40% country guides, 30% nomad guides, 20% comparisons, 10% FAQ

## ✨ Features

### 🎲 Smart Random Scheduling
- **Random Day Selection**: Picks 3 different days each week
- **Random Time Generation**: Posts between 9 AM - 5 PM UTC
- **Minimum Spacing**: Ensures 24+ hours between posts
- **Holiday Awareness**: Skips major holidays (configurable)

### 📝 Intelligent Content Generation
- **Content Type Rotation**: Balances different post types
- **Variable Content**: Each post has unique variables and data
- **SEO Optimization**: Automatic meta tags, schema markup
- **Internal Linking**: Connects related posts automatically

### 🔄 Automated Publishing Pipeline
- **Hourly Checks**: GitHub Actions runs every hour
- **Content Generation**: Creates posts just before publishing
- **Database Updates**: Tracks all publishing activity
- **Error Handling**: Retries failed posts automatically

### 📊 Comprehensive Monitoring
- **Admin Dashboard**: Visual interface for all scheduling
- **Real-time Stats**: Progress, success rates, next posts
- **Health Monitoring**: System status and alerts
- **Analytics**: Publishing patterns and performance

## 🚀 Quick Start

### 1. Initial Setup

Run the setup script to create your blog schedule:

```bash
# Setup with default settings (1000 posts, 3 per week)
npm run blog:setup

# Custom schedule (500 posts, 2 per week)
npm run blog:setup:custom

# Schedule more weeks ahead
npm run blog:schedule
```

### 2. Configure Environment Variables

Add these to your `.env.local`:

```bash
# Required for cron job authentication
CRON_SECRET=your-secure-random-key

# Your app URL for webhooks
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 3. GitHub Secrets Setup

In your GitHub repository settings, add these secrets:

- `CRON_SECRET`: Same as your .env CRON_SECRET
- `APP_URL`: Your production URL

### 4. Verify Setup

Check that everything is working:

```bash
# Check system health
npm run blog:status

# Manual publish test (optional)
npm run blog:publish
```

### 5. Monitor Progress

Visit the admin interface at `/admin/blog-scheduler` to:
- View publishing progress
- See upcoming scheduled posts
- Monitor success rates
- Adjust settings if needed

## 🔧 How It Works

### Weekly Scheduling Process

1. **Week Planning**: Every week, the system:
   - Selects 3 random days (ensuring variety)
   - Generates random times within business hours
   - Ensures minimum 24-hour spacing between posts

2. **Content Selection**: Uses weighted selection:
   - 40% Country-to-Schengen guides
   - 30% Digital nomad guides  
   - 20% Visa comparison pages
   - 10% FAQ pages

3. **Publishing Pipeline**: When a post is due:
   - Generate content with unique variables
   - Create SEO metadata and schema markup
   - Save to database and mark as published
   - Update internal links and sitemaps

### Example Weekly Schedule

```
Week of Jan 15-21, 2024:
├── Tuesday, Jan 16 at 11:23 AM UTC - "India to Schengen Visa Guide"
├── Friday, Jan 19 at 2:47 PM UTC - "Digital Nomad Guide: Portugal" 
└── Sunday, Jan 21 at 10:15 AM UTC - "US vs UK Visa Comparison"

Week of Jan 22-28, 2024:
├── Monday, Jan 22 at 3:31 PM UTC - "FAQ: Schengen Tourist Visas"
├── Thursday, Jan 25 at 9:44 AM UTC - "Brazil to Schengen Guide"
└── Saturday, Jan 27 at 1:18 PM UTC - "Digital Nomad Guide: Spain"
```

## ⚙️ Configuration

### Default Settings

```javascript
{
  targetCount: 1000,           // Total posts to generate
  postsPerWeek: 3,            // Posts per week
  publishingHours: {          // UTC hours
    start: 9,                 // 9 AM UTC
    end: 17                   // 5 PM UTC
  },
  minHoursBetweenPosts: 24,   // Minimum spacing
  randomizePublishTime: true,  // Random vs fixed times
  excludedDays: [],           // Days to avoid (0=Sunday)
  contentTypes: [             // Available content types
    'country-to-schengen',
    'digital-nomad-guide', 
    'visa-comparison',
    'faq-page'
  ],
  priorityWeights: {          // Content distribution
    'country-to-schengen': 40,
    'digital-nomad-guide': 30,
    'visa-comparison': 20,
    'faq-page': 10
  }
}
```

### Customizing the Schedule

You can modify settings through the admin interface or by updating the database:

```sql
-- Update posting frequency
UPDATE blog_schedules 
SET posts_per_week = 4 
WHERE status = 'active';

-- Change content distribution
UPDATE blog_schedules 
SET settings = jsonb_set(
  settings, 
  '{priorityOrder}', 
  '[{"templateId": "country-to-schengen", "weight": 50}]'
)
WHERE status = 'active';
```

## 🖥️ Admin Interface

Access the admin dashboard at `/admin/blog-scheduler`:

### Overview Tab
- **Progress Tracking**: Visual progress toward 1000 posts
- **Schedule Status**: Active/paused/completed status
- **Next Posts**: Upcoming scheduled publications
- **Success Metrics**: Publishing success rates and statistics

### Schedule Management Tab
- **Quick Actions**: Schedule more weeks ahead
- **Content Distribution**: View and adjust content mix
- **Publishing Settings**: Modify hours, spacing, randomization
- **Pause/Resume**: Control the publishing schedule

### Publishing Queue Tab
- **Upcoming Posts**: List of scheduled posts with details
- **Failed Posts**: Posts that failed to publish (with retry options)
- **Manual Publishing**: Force-publish specific posts

### Analytics Tab
- **Publishing Patterns**: When posts are typically published
- **Content Performance**: Which content types perform best
- **System Health**: Monitoring and error tracking

## 📡 API Reference

### Schedule Management

```bash
# Create new schedule
POST /api/blog-scheduler/schedule
{
  "targetCount": 1000,
  "postsPerWeek": 3,
  "weeksToSchedule": 4
}

# Get schedule status
GET /api/blog-scheduler/schedule?id={schedule_id}

# Pause/resume schedule
PUT /api/blog-scheduler/schedule
{
  "scheduleId": "schedule_id",
  "action": "pause" | "resume"
}

# Schedule more weeks
PUT /api/blog-scheduler/schedule  
{
  "scheduleId": "schedule_id",
  "action": "schedule-more",
  "weeks": 4
}
```

### Publishing Control

```bash
# Process pending posts (cron job)
POST /api/blog-scheduler/publish

# Manual publish specific post
POST /api/blog-scheduler/publish
{
  "manual": true,
  "postId": "post_id"
}

# Get publishing queue status
GET /api/blog-scheduler/publish?scheduleId={schedule_id}
```

### System Monitoring

```bash
# Health check
GET /api/blog-scheduler/cron

# Cron job endpoint (called by GitHub Actions)
POST /api/blog-scheduler/cron
Headers: Authorization: Bearer {CRON_SECRET}
```

## 📊 Monitoring

### GitHub Actions Workflow

The automated publishing runs via GitHub Actions every hour:

- **Workflow File**: `.github/workflows/blog-scheduler.yml`
- **Schedule**: Every hour at 15 minutes past (e.g., 1:15, 2:15, 3:15...)
- **Timeout**: 5 minutes maximum execution time
- **Monitoring**: Health checks and failure notifications

### Health Monitoring

Monitor system health at these endpoints:

```bash
# Quick health check
curl https://your-domain.com/api/blog-scheduler/cron

# Detailed status
curl https://your-domain.com/api/blog-scheduler/publish?scheduleId=your_schedule_id
```

### Key Metrics to Monitor

1. **Publishing Success Rate**: Should be >95%
2. **Schedule Adherence**: Posts published on time
3. **Content Distribution**: Balanced across content types
4. **System Health**: No recurring errors
5. **Progress Rate**: Steady progress toward 1000 posts

### Alerting Options

Set up alerts for:
- Failed publishing attempts (>3 failures)
- Schedule falls behind (no posts in 48 hours)
- System errors (API failures)
- Completion milestones (100, 250, 500, 750, 1000 posts)

## 🎯 Content Strategy

### Content Type Distribution

**Country-to-Schengen Guides (40%)**
- Visa requirements for each country
- Processing times and costs
- Travel tips and popular destinations
- ~400 posts covering all major countries

**Digital Nomad Guides (30%)**
- Remote work visa options
- Cost of living and internet speeds
- Best cities and coworking spaces
- ~300 posts covering popular destinations

**Visa Comparison Pages (20%)**
- Side-by-side country comparisons
- Processing time and cost differences
- Requirement comparisons
- ~200 posts covering country pairs

**FAQ Pages (10%)**
- Common visa questions
- Process explanations
- Troubleshooting guides
- ~100 posts covering all major topics

### SEO Optimization

Each generated post includes:
- **Optimized Title Tags**: 50-60 characters with target keywords
- **Meta Descriptions**: 150-160 characters summarizing content
- **Schema Markup**: Rich snippets for better search visibility
- **Internal Links**: 3-5 contextual links to related posts
- **URL Structure**: SEO-friendly slugs with target keywords

## 🔧 Troubleshooting

### Common Issues

#### "No posts being published"

**Check:**
1. GitHub Actions workflow is enabled
2. CRON_SECRET is set correctly
3. Schedule status is 'active'
4. Posts are actually scheduled for the current time

**Solution:**
```bash
# Check schedule status
npm run blog:status

# Manual publish test
npm run blog:publish

# Check admin interface
# Visit /admin/blog-scheduler
```

#### "Posts failing to generate"

**Check:**
1. Database connectivity
2. Content generation service is working
3. Template variables are valid

**Solution:**
```bash
# Test content generation
npm run content:generate:countries

# Check logs in admin interface
# Review failed posts in publishing queue
```

#### "GitHub Actions workflow failing"

**Check:**
1. GitHub Secrets are set (CRON_SECRET, APP_URL)
2. App URL is correct and accessible
3. Cron endpoint returns 200 status

**Solution:**
```bash
# Test cron endpoint manually
curl -X POST \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  https://your-domain.com/api/blog-scheduler/cron
```

#### "Schedule is off-track"

**Check:**
1. Failed posts need to be retried
2. Schedule settings are correct
3. Enough posts are scheduled ahead

**Solution:**
```bash
# Schedule more weeks ahead
npm run blog:schedule

# Check and retry failed posts in admin interface
```

### Debug Mode

Enable detailed logging:

```bash
# Set environment variable
DEBUG=blog-scheduler

# Check detailed logs in admin interface
# Monitor GitHub Actions workflow logs
```

### Manual Recovery

If the system gets off track:

1. **Pause the schedule** via admin interface
2. **Review failed posts** and retry manually
3. **Schedule additional weeks** if needed
4. **Resume the schedule** once caught up

## 📚 Advanced Configuration

### Custom Content Templates

Add your own content types:

```typescript
// Add to template factory
const customTemplate = {
  id: 'custom-guide',
  name: 'Custom Travel Guide',
  type: 'custom-guide',
  // ... template definition
}

// Register in content generator
templateEngine.registerTemplate(customTemplate)

// Add to scheduling priorities
priorityOrder: [
  { templateId: 'custom-guide', weight: 15 },
  // ... existing types
]
```

### Holiday Configuration

Add holidays to avoid posting:

```sql
INSERT INTO special_dates (name, date, type, adjust_publishing) VALUES
  ('Black Friday', '2024-11-29', 'event', true),
  ('Cyber Monday', '2024-12-02', 'event', true);
```

### Time Zone Adjustments

Modify publishing hours for different time zones:

```javascript
// Convert UTC to your local time zone
const localHours = {
  start: 9 + timeZoneOffset,   // Adjust for your TZ
  end: 17 + timeZoneOffset
}
```

## 🤝 Integration Options

### Analytics Integration

Track post performance:

```javascript
// Google Analytics 4
gtag('event', 'blog_post_published', {
  'content_type': post.templateId,
  'post_id': post.id
})

// Custom analytics
await trackEvent('blog_published', {
  type: post.templateId,
  scheduledTime: post.scheduledFor,
  actualTime: new Date()
})
```

### Webhook Notifications

Get notified of publishing events:

```javascript
// Add webhook after successful publish
await fetch(process.env.WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'blog_published',
    post: post,
    timestamp: new Date()
  })
})
```

### Social Media Integration

Auto-post to social platforms:

```javascript
// After successful publish
await postToTwitter(post.title, post.url)
await postToLinkedIn(post.title, post.excerpt, post.url)
```

## 📈 Performance Optimization

### Database Optimization

- Index scheduled_for column for fast querying
- Archive old published posts to separate table
- Use connection pooling for high-volume publishing

### Content Generation Optimization

- Cache compiled templates
- Pre-generate content during low-traffic hours
- Use worker threads for CPU-intensive tasks

### Monitoring Optimization

- Implement circuit breakers for external API calls
- Use exponential backoff for retries
- Monitor memory usage during bulk operations

---

## 🎉 Success Metrics

After setup, you should see:
- **Consistent Publishing**: 3 posts per week like clockwork
- **Random Distribution**: Posts on different days/times each week
- **High Success Rate**: 95%+ posts published successfully
- **SEO Growth**: Steady increase in organic traffic
- **Content Variety**: Balanced mix across all content types

The system will automatically handle everything from content generation to publishing, internal linking, and sitemap updates. Just monitor the progress and enjoy watching your content library grow!

**Estimated Results**: 1000 high-quality, SEO-optimized blog posts published over ~18 months with zero manual effort after initial setup.