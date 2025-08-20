# Production Deployment Guide

This guide will help you deploy the Schengen Visa Calculator with the automated blog scheduler to production.

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option as it's built by the creators of Next.js and includes automatic cron job support.

#### Step 1: Prepare Your Repository

1. **Commit all changes**:
```bash
git add .
git commit -m "feat: add automated blog scheduler for 1000 posts"
git push origin main
```

2. **Ensure your repository is on GitHub**

#### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure environment variables** (Add these in Vercel dashboard):

```env
# Required - From Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Required - For Blog Scheduler
CRON_SECRET=generate-secure-key-here
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

5. **Click "Deploy"**

#### Step 3: Configure Cron Jobs in Vercel

1. After deployment, go to your project settings
2. Navigate to "Functions" → "Cron Jobs"
3. The cron job is already configured in `vercel.json`:
   - Runs every hour at the top of the hour
   - Calls `/api/blog-scheduler/cron`

#### Step 4: Set Up GitHub Secrets

1. Go to your GitHub repository → Settings → Secrets
2. Add these secrets:
   - `CRON_SECRET`: Same value as in Vercel
   - `APP_URL`: Your Vercel app URL (e.g., https://your-app.vercel.app)

---

### Option 2: Deploy to Netlify

#### Step 1: Deploy to Netlify

1. **Go to [Netlify](https://netlify.com)**
2. **Connect your GitHub repository**
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Add environment variables** in Netlify dashboard

#### Step 2: Set Up Cron Jobs

Since Netlify doesn't have built-in cron, use one of these options:

**Option A: GitHub Actions (Free)**
- Already configured in `.github/workflows/blog-scheduler.yml`
- Runs automatically every hour

**Option B: External Cron Service**
- Use [Cron-job.org](https://cron-job.org) (free)
- Set URL: `https://your-app.netlify.app/api/blog-scheduler/cron`
- Schedule: Every hour
- Add header: `Authorization: Bearer YOUR_CRON_SECRET`

---

### Option 3: Deploy to Custom VPS

#### Step 1: Server Setup

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install Nginx
sudo apt-get install nginx
```

#### Step 2: Deploy Application

```bash
# Clone repository
git clone https://github.com/your-username/schengenvisacalculator.git
cd schengenvisacalculator

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local with your values

# Build application
npm run build

# Start with PM2
pm2 start npm --name "schengen-calculator" -- start
pm2 save
pm2 startup
```

#### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/schengen-calculator`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 4: Set Up Cron Job

```bash
# Edit crontab
crontab -e

# Add this line (runs every hour)
0 * * * * curl -X POST -H "Authorization: Bearer YOUR_CRON_SECRET" -H "Content-Type: application/json" https://your-domain.com/api/blog-scheduler/cron
```

---

## 🔐 Security Configuration

### Generate Secure CRON_SECRET

```bash
# Generate a secure random key
openssl rand -base64 32
```

### Production Environment Variables

Create these environment variables in your hosting platform:

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Blog Scheduler
CRON_SECRET=your-secure-generated-key
NEXT_PUBLIC_APP_URL=https://your-production-domain.com

# Node Environment
NODE_ENV=production
```

---

## 📊 Database Setup

### Run Database Migrations

1. **Go to Supabase Dashboard**
2. **SQL Editor**
3. **Run the migration**:

```sql
-- Copy and paste the content from:
-- lib/blog-scheduler/database-schema.sql
```

---

## ✅ Post-Deployment Checklist

### 1. Verify Deployment

- [ ] Visit your production URL
- [ ] Check `/admin/blog-scheduler` loads correctly
- [ ] Verify environment variables are set

### 2. Test Blog Scheduler

```bash
# Test health endpoint
curl https://your-domain.com/api/blog-scheduler/cron

# Test manual publish (with your CRON_SECRET)
curl -X POST \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  https://your-domain.com/api/blog-scheduler/cron
```

### 3. Monitor First Publications

- Check admin dashboard after 1 hour
- Verify first post is scheduled
- Monitor GitHub Actions logs (if using)

### 4. Set Up Monitoring (Optional)

**Uptime Monitoring**:
- [UptimeRobot](https://uptimerobot.com) - Free
- Monitor: `https://your-domain.com/api/blog-scheduler/cron`
- Check every 30 minutes

**Error Tracking**:
- [Sentry](https://sentry.io) - Free tier available
- Add `SENTRY_DSN` to environment variables

---

## 🎯 Production Timeline

After deployment, here's what happens:

**Hour 1**: System checks for posts to publish (none yet)
**Day 1-7**: First 3 posts are published randomly
**Week 2**: Next 3 posts published
**Month 1**: ~12-13 posts published
**Month 6**: ~78 posts published
**Year 1**: ~156 posts published
**Year 6.5**: 1000 posts reached!

---

## 🔧 Troubleshooting

### Blog posts not publishing

1. **Check cron job is running**:
   - Vercel: Check Functions logs
   - GitHub Actions: Check workflow runs
   - External cron: Check service logs

2. **Verify environment variables**:
   ```bash
   # All these should be set:
   - CRON_SECRET
   - NEXT_PUBLIC_APP_URL
   - SUPABASE keys
   ```

3. **Check database connection**:
   - Verify Supabase is accessible
   - Check service role key is correct

### Manual publish for testing

```bash
# Force publish pending posts
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"manual": true}' \
  https://your-domain.com/api/blog-scheduler/publish
```

### View logs

**Vercel**:
- Dashboard → Functions → View logs

**GitHub Actions**:
- Repository → Actions → blog-scheduler workflow

**Custom VPS**:
```bash
pm2 logs schengen-calculator
```

---

## 📈 Monitoring Dashboard

After deployment, monitor your blog scheduler at:

```
https://your-domain.com/admin/blog-scheduler
```

Key metrics to watch:
- **Publishing Progress**: X/1000 posts
- **Success Rate**: Should be >95%
- **Next Post**: Date and time
- **Failed Posts**: Should be 0 or minimal

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ First post publishes within 1-7 days
2. ✅ Posts appear on random days/times
3. ✅ Progress counter increases in admin
4. ✅ No failed posts in queue
5. ✅ Steady progress toward 1000 posts

---

## 🚨 Emergency Controls

If you need to stop publishing:

1. **Pause via Admin Interface**:
   - Go to `/admin/blog-scheduler`
   - Click "Pause Schedule"

2. **Disable Cron Job**:
   - Vercel: Disable in dashboard
   - GitHub Actions: Disable workflow
   - External: Stop cron service

3. **Emergency Stop**:
   ```sql
   -- In Supabase SQL Editor
   UPDATE blog_schedules 
   SET status = 'paused' 
   WHERE status = 'active';
   ```

---

## 📞 Support

If you encounter issues:

1. Check the [documentation](./docs/BLOG_SCHEDULER.md)
2. Review [troubleshooting guide](#troubleshooting)
3. Check GitHub Actions logs
4. Verify all environment variables

The system is designed to be self-healing and will retry failed posts automatically.