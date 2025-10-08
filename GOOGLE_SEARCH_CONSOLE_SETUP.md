# Google Search Console Setup Guide - EES Launch October 12, 2025

**Domain**: euborder.com
**Priority**: CRITICAL for October 12 launch
**Estimated Setup Time**: 20 minutes

---

## 🎯 Why This Matters

Google Search Console is essential for:
- **Submitting sitemap** for faster indexing of 15 EES pages
- **Monitoring keyword rankings** for 50K+ monthly EES searches
- **Tracking click-through rates** from Google search results
- **Identifying indexing issues** before they impact traffic
- **Requesting manual indexing** for critical launch pages

---

## 📋 Setup Checklist

### Step 1: Add Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **"Add Property"**
3. Choose **"URL prefix"** method
4. Enter: `https://euborder.com`
5. Click **"Continue"**

### Step 2: Verify Domain Ownership

**Option A: HTML File Upload (Recommended)**

1. Google will provide a verification HTML file
2. Download the file (e.g., `google1234567890abcdef.html`)
3. Upload to `/packages/app/public/` directory
4. File will be accessible at: `https://euborder.com/google1234567890abcdef.html`
5. Deploy to production (Vercel/Netlify)
6. Return to Search Console and click **"Verify"**

**Option B: DNS Verification (Alternative)**

1. Google provides a TXT record
2. Add to your domain DNS settings:
   ```
   Type: TXT
   Host: @
   Value: google-site-verification=xxxxxxxxxxxxx
   ```
3. Wait 15-60 minutes for propagation
4. Return to Search Console and click **"Verify"**

**Option C: HTML Tag (Quick)**

1. Google provides a meta tag:
   ```html
   <meta name="google-site-verification" content="xxxxxxxxxxxxx" />
   ```
2. Add to `packages/app/src/app/layout.tsx` in `<head>`
3. Deploy to production
4. Click **"Verify"**

### Step 3: Submit Sitemap

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter sitemap URL: `https://euborder.com/sitemap.xml`
3. Click **"Submit"**
4. Status should show **"Success"** within 24 hours

**Expected Result:**
```
Discovered URLs: 25+
Indexed URLs: 0 → 25+ (over 7 days)
```

### Step 4: Request Manual Indexing for Critical Pages

For immediate indexing of high-priority EES pages:

1. Go to **"URL Inspection"** (top search bar)
2. Enter each critical URL:
   - `https://euborder.com/ees`
   - `https://euborder.com/ees/guide`
   - `https://euborder.com/ees/complete-guide`
   - `https://euborder.com/ees/preparation`
   - `https://euborder.com/ees/vs-etias`
   - `https://euborder.com/ees/family`
   - `https://euborder.com/ees/countries`
3. Click **"Request Indexing"**
4. Repeat for all 7 URLs
5. Google will prioritize crawling these pages

**Note**: You can request ~10 URLs/day. Prioritize the most important pages first.

---

## 🔧 Configuration Best Practices

### Enable Email Alerts

1. Go to **"Settings"** (gear icon)
2. Click **"Users and permissions"**
3. Verify your email is listed
4. Enable notifications for:
   - **Coverage issues** (indexing errors)
   - **Security issues** (hacking/malware)
   - **Manual actions** (Google penalties)

### Set Target Country (Optional)

1. Go to **"Settings"**
2. Click **"International Targeting"**
3. Set target country: **"United Kingdom"** (primary audience)
4. This helps Google show results to UK users searching for "EES", "Brexit travel", etc.

### Link Google Analytics (Optional but Recommended)

1. Go to **"Settings"** → **"Associations"**
2. Click **"Associate"**
3. Link your Google Analytics property
4. This combines search data with traffic analytics

---

## 📊 Post-Launch Monitoring (October 12-19)

### Daily Checks (First Week)

**October 12 (Launch Day)**
1. Check **"Coverage"** report:
   - Ensure no "Excluded" or "Error" pages
   - Target: 15+ valid pages indexed
2. Submit updated sitemap if any changes
3. Request indexing for any missed pages

**October 13-14**
1. Monitor **"Performance"** report:
   - Check impressions for "EES system", "Entry Exit System"
   - Look for click-through rate (CTR) trends
2. Check **"Enhancements"** for mobile usability issues
3. Review **"Page Experience"** metrics

**October 15-19**
1. Track keyword rankings:
   - "EES system" (target: Top 50)
   - "Entry Exit System" (target: Top 50)
   - "EU biometric registration" (target: Top 30)
   - "EES vs ETIAS" (target: Top 20)
2. Monitor click-through rates:
   - Optimize titles if CTR <3%
3. Check for indexing errors daily

### Weekly Monitoring (Ongoing)

**Metrics to Track:**
- **Impressions**: How many times pages appear in search
- **Clicks**: Actual traffic from Google
- **Average Position**: Keyword ranking (target: <20)
- **CTR (Click-Through Rate)**: Aim for >3%

**Tools to Use:**
- **Performance Report**: Traffic and keyword data
- **Coverage Report**: Indexing status and errors
- **URL Inspection**: Individual page health check
- **Mobile Usability**: Mobile-friendliness issues

---

## 🎯 Key Performance Indicators (KPIs)

### Week 1 (October 12-19)
- **Indexed Pages**: 15+ / 15 EES pages
- **Impressions**: 500-1,000
- **Clicks**: 20-50
- **Average Position**: 40-50

### Month 1 (October 12 - November 12)
- **Indexed Pages**: 25+ (all pages)
- **Impressions**: 5,000-10,000
- **Clicks**: 150-300
- **Average Position**: 20-30
- **CTR**: 3-5%

### Month 3 (December 2025)
- **Indexed Pages**: 30+ (including new content)
- **Impressions**: 20,000-40,000
- **Clicks**: 600-1,200
- **Average Position**: 10-20
- **CTR**: 3-5%
- **Featured Snippets**: 3-5 keywords

### Month 6 (March 2026)
- **Indexed Pages**: 50+
- **Impressions**: 50,000-100,000
- **Clicks**: 1,500-3,000
- **Average Position**: 5-15
- **CTR**: 3-6%
- **Featured Snippets**: 10+ keywords

---

## 🚨 Common Issues & Solutions

### Issue 1: Pages Not Indexing

**Symptoms:**
- Pages show "Discovered - currently not indexed"
- Coverage report shows "Excluded" status

**Solutions:**
1. Request manual indexing via URL Inspection
2. Check robots.txt isn't blocking pages
3. Verify pages return 200 status code
4. Add internal links to pages from homepage
5. Submit updated sitemap

### Issue 2: Mobile Usability Errors

**Symptoms:**
- "Text too small to read"
- "Clickable elements too close together"
- "Content wider than screen"

**Solutions:**
1. Check responsive design on real devices
2. Increase font sizes to 16px minimum
3. Add touch target spacing (44px minimum)
4. Test with Google Mobile-Friendly Test tool

### Issue 3: Low Click-Through Rate (CTR <2%)

**Symptoms:**
- High impressions but low clicks
- Pages ranking but not getting traffic

**Solutions:**
1. **Optimize title tags:**
   - Add numbers: "5 Steps to EES Preparation"
   - Add year: "EES Guide 2025"
   - Add urgency: "Launching October 12"
2. **Improve meta descriptions:**
   - Add call-to-action: "Get ready now"
   - Highlight unique value: "Complete guide with country tips"
   - Use action verbs: "Master", "Prepare", "Avoid"
3. **Add structured data:**
   - FAQ schema for featured snippets
   - HowTo schema for step-by-step guides

### Issue 4: Core Web Vitals Issues

**Symptoms:**
- Poor Page Experience score
- "Needs improvement" or "Poor" rating

**Solutions:**
1. Optimize images (<200KB per image)
2. Enable lazy loading for below-fold content
3. Minimize JavaScript bundle size
4. Use next/image for automatic optimization
5. Enable compression (Gzip/Brotli)
6. Check Lighthouse report in Chrome DevTools

---

## 📈 Advanced Optimization Tips

### Optimize for Featured Snippets

**Target Question Keywords:**
- "What is EES system?"
- "When does EES start?"
- "How to prepare for EES registration?"
- "EES vs ETIAS difference?"
- "Do I need EES for France?"

**Strategies:**
1. Use clear headings with question format
2. Provide concise answers (40-60 words)
3. Add FAQ schema markup
4. Use bullet points and numbered lists
5. Include tables for comparisons

### Monitor Competitor Rankings

**Key Competitors:**
- etiasvisa.com
- schengenvisainfo.com
- gov.uk (official sites)

**Tools:**
1. Use **"Performance"** report
2. Filter by **"Queries"**
3. Compare your position vs competitors
4. Identify keyword gaps
5. Create content for missed opportunities

### Track Brand Searches

**Monitor searches for:**
- "euborder"
- "EU Border Authority"
- "euborder.com EES"

**Goal**: Increase branded searches by 10% monthly

---

## 🔗 Additional Resources

### Official Google Docs
- [Search Console Help](https://support.google.com/webmasters/)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)

### Monitoring Tools
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Sitemap & Robots.txt
- Sitemap URL: `https://euborder.com/sitemap.xml`
- Robots.txt URL: `https://euborder.com/robots.txt`

---

## ✅ Pre-Launch Checklist (Complete Before October 12)

- [ ] Add euborder.com to Google Search Console
- [ ] Verify domain ownership (HTML file/DNS/Meta tag)
- [ ] Submit sitemap.xml
- [ ] Request manual indexing for 7 critical pages
- [ ] Enable email alerts for coverage and security issues
- [ ] Set target country (UK)
- [ ] Link Google Analytics (optional)
- [ ] Test sitemap in browser (should show XML)
- [ ] Verify robots.txt allows crawler access
- [ ] Check all meta tags are correct (no client component issues)

---

## 🚀 Launch Day Actions (October 12, 2025)

**Morning (9 AM GMT)**
1. Submit updated sitemap to Search Console
2. Request indexing for all 15 EES pages
3. Check Coverage report (target: 0 errors)
4. Verify mobile usability (target: 0 errors)

**Afternoon (2 PM GMT)**
1. Monitor Performance report for first impressions
2. Check URL Inspection for newly indexed pages
3. Look for any crawl errors in Coverage report

**Evening (6 PM GMT)**
1. Review first day metrics (impressions, clicks)
2. Check for any security or manual action alerts
3. Plan next day optimizations based on data

---

## 📊 Reporting Template

### Weekly Report Format

**Date**: [Week of October 12-19]
**Property**: euborder.com

**Metrics:**
- Total Indexed Pages: X / 15
- Total Impressions: X
- Total Clicks: X
- Average Position: X
- CTR: X%

**Top Queries:**
1. [keyword] - Position X - Clicks X
2. [keyword] - Position X - Clicks X
3. [keyword] - Position X - Clicks X

**Top Pages:**
1. [URL] - Clicks X - Impressions X
2. [URL] - Clicks X - Impressions X
3. [URL] - Clicks X - Impressions X

**Issues:**
- [List any coverage, mobile, or performance issues]

**Actions Taken:**
- [List optimization tasks completed]

**Next Week Goals:**
- [List improvement targets]

---

**Setup Status**: Pending Manual Verification
**Critical Deadline**: October 11, 2025 (1 day before launch)
**Estimated Impact**: 500-1,000 organic visitors in first week
