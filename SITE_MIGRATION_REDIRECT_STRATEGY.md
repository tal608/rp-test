# Live Site Migration Analysis & Redirect Strategy

**Goal:** Prevent SEO ranking drops during site migration by properly handling all old URLs and redirects.

---

## 🔍 LIVE SITE ANALYSIS

### Step 1: Identify All Pages on Live Site

**To Complete This Analysis, You Need To:**

1. **Export Google Search Console Data:**
   - Go to Google Search Console → Pages
   - Export all indexed URLs
   - Export all URLs receiving clicks/impressions
   - This gives you the authoritative list of what Google knows about

2. **Check Server Logs:**
   - Review access logs for all URLs visitors are accessing
   - Identify any pages with traffic that might not be indexed

3. **Manual Site Crawl:**
   - Use tools like Screaming Frog (free version) or Sitebulb
   - Crawl https://www.riverpaws.dog
   - Export all discovered URLs

4. **Check Analytics:**
   - Google Analytics → Behavior → Site Content → All Pages
   - Export all pages receiving traffic in last 12 months

---

## 📊 CURRENT NEW SITE PAGES (What We Have)

### ✅ Confirmed Pages in New Site:

#### **Core Pages:**
- `/` - Homepage ✅
- `/services/dog-grooming` - Main grooming page ✅
- `/services/dog-hikes` - Main hiking page ✅
- `/contact` - Contact page ✅
- `/caretakers` - Team page ✅
- `/gallery` - Gallery ✅
- `/blog` - Blog index ✅
- `/blog/[slug]` - Blog articles (5 articles) ✅

#### **Application Pages:**
- `/apply` - Application hub ✅
- `/apply/dog-grooming-application` ✅
- `/apply/dog-hikes-application` ✅

#### **City-Specific Pages (Preserved Old URLs):**
- `/dog-grooming-madison` ✅
- `/dog-grooming-waunakee` ✅
- `/dog-grooming-middleton` ✅
- `/dog-grooming-sun-prairie` ✅

#### **Specialty Pages:**
- `/puppy-grooming` ✅
- `/canine-grooming` ✅
- `/locations/waunakee` ✅ (New page)

#### **Other Pages:**
- `/services/puppy-play` ✅
- `/portal` ✅ (Should be noindex - private)
- `/policies` ✅
- `/waivers` ✅

---

## 🚨 POTENTIAL MISSING PAGES FROM LIVE SITE

### **Likely URLs on Live Site That May Need Handling:**

#### **1. Old URL Structure Variations:**
Based on typical WordPress/site builder patterns, live site might have:
- `/dog-grooming/` (without `/services/` prefix)
- `/dog-hikes/` or `/hiking/` (old service URLs)
- `/about/` or `/about-us/`
- `/team/` or `/staff/` (alternative to `/caretakers/`)
- `/services/` (services index page)
- `/home/` or `/homepage/`

#### **2. Parameter Variations:**
- `/dog-grooming/?page=1` or similar pagination
- `/contact/?success=true` (form success pages)
- `/gallery/?category=grooming` (filtered gallery views)

#### **3. Common WordPress/Builder URLs:**
- `/wp-admin/` (should be blocked)
- `/wp-content/` (should be blocked)
- `/category/` or `/tag/` pages
- `/author/` pages
- `/search/` or `/search?q=query`
- `/page/2/` (pagination)

#### **4. Redirects from Old Site:**
- Check if old site already has redirects
- Review `.htaccess` or redirect rules on live site

---

## 🗺️ URL MAPPING STRATEGY

### **Priority 1: Direct Page Matches**

| Old URL (Live Site) | New URL (New Site) | Action | Status |
|---------------------|-------------------|--------|--------|
| `/` | `/` | ✅ Same URL | ✅ No redirect needed |
| `/contact` | `/contact` | ✅ Same URL | ✅ No redirect needed |
| `/gallery` | `/gallery` | ✅ Same URL | ✅ No redirect needed |
| `/caretakers` | `/caretakers` | ✅ Same URL | ✅ No redirect needed |
| `/apply` | `/apply` | ✅ Same URL | ✅ No redirect needed |
| `/dog-grooming-madison` | `/dog-grooming-madison` | ✅ Same URL | ✅ No redirect needed |
| `/dog-grooming-waunakee` | `/dog-grooming-waunakee` | ✅ Same URL | ✅ No redirect needed |
| `/dog-grooming-middleton` | `/dog-grooming-middleton` | ✅ Same URL | ✅ No redirect needed |
| `/dog-grooming-sun-prairie` | `/dog-grooming-sun-prairie` | ✅ Same URL | ✅ No redirect needed |
| `/puppy-grooming` | `/puppy-grooming` | ✅ Same URL | ✅ No redirect needed |
| `/canine-grooming` | `/canine-grooming` | ✅ Same URL | ✅ No redirect needed |

### **Priority 2: URL Structure Changes**

| Old URL (Live Site) | New URL (New Site) | Action | Redirect Type |
|---------------------|-------------------|--------|---------------|
| `/dog-grooming/` | `/services/dog-grooming` | ⚠️ **301 Redirect** | Permanent |
| `/dog-hikes/` | `/services/dog-hikes` | ⚠️ **301 Redirect** | Permanent |
| `/hiking/` | `/services/dog-hikes` | ⚠️ **301 Redirect** | Permanent |
| `/services/` | `/services/dog-grooming` or `/` | ⚠️ **301 Redirect** | Permanent |
| `/team/` | `/caretakers` | ⚠️ **301 Redirect** | Permanent |
| `/staff/` | `/caretakers` | ⚠️ **301 Redirect** | Permanent |
| `/about/` | `/caretakers` or `/` | ⚠️ **301 Redirect** | Permanent |
| `/about-us/` | `/caretakers` or `/` | ⚠️ **301 Redirect** | Permanent |

### **Priority 3: Potential Missing Pages**

| Old URL (Live Site) | New URL (New Site) | Action | Priority |
|---------------------|-------------------|--------|----------|
| `/services/grooming/` | `/services/dog-grooming` | ⚠️ **301 Redirect** | High |
| `/services/hiking/` | `/services/dog-hikes` | ⚠️ **301 Redirect** | High |
| `/blog/` (if exists) | `/blog` | ✅ Same URL | ✅ No redirect |
| `/blog/[any-old-slug]` | `/blog` (or closest match) | ⚠️ **301 Redirect** | Medium |

### **Priority 4: Query Parameters & Variations**

| Old URL Pattern | New URL | Action |
|-----------------|---------|--------|
| `/contact/?success=true` | `/contact` | ✅ Strip query params |
| `/gallery/?category=*` | `/gallery` | ✅ Strip query params |
| `/dog-grooming/?page=*` | `/services/dog-grooming` | ✅ Strip query params |
| `/search?q=*` | `/` or `/blog` | ⚠️ **301 Redirect** to relevant page |

---

## 🔧 REDIRECT IMPLEMENTATION STRATEGY

### **Method 1: Next.js Redirects (Recommended)**

Create redirects in `next.config.ts`:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old service URLs → New service URLs
      {
        source: '/dog-grooming',
        destination: '/services/dog-grooming',
        permanent: true, // 301 redirect
      },
      {
        source: '/dog-hikes',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/hiking',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      
      // Alternative team page URLs
      {
        source: '/team',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/caretakers',
        permanent: true,
      },
      
      // About pages
      {
        source: '/about',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/caretakers',
        permanent: true,
      },
      
      // Query parameter stripping (handled automatically, but document)
      // Next.js automatically strips query params unless you preserve them
    ];
  },
  
  // ... rest of config
};
```

### **Method 2: Middleware Redirects (For Complex Cases)**

For dynamic redirects or query parameter handling:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Strip query parameters from certain pages
  if (url.pathname === '/contact' && url.searchParams.has('success')) {
    url.searchParams.delete('success');
    return NextResponse.redirect(url, 301);
  }
  
  // Handle old blog slugs (if migrating from old blog)
  const oldBlogSlugs: Record<string, string> = {
    '/blog/old-article-name': '/blog/new-article-name',
    // Add mappings as discovered
  };
  
  if (oldBlogSlugs[url.pathname]) {
    return NextResponse.redirect(new URL(oldBlogSlugs[url.pathname], url.origin), 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/contact',
    '/blog/:path*',
    // Add other paths that need special handling
  ],
};
```

### **Method 3: Custom 404 Page with Redirect Suggestions**

Create a smart 404 page that suggests redirects:

```typescript
// src/app/not-found.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  
  // Check if URL matches a known redirect pattern
  const suggestedRedirects: Record<string, string> = {
    '/dog-grooming': '/services/dog-grooming',
    '/dog-hikes': '/services/dog-hikes',
    '/team': '/caretakers',
    '/about': '/caretakers',
  };
  
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const suggestedPath = suggestedRedirects[currentPath];
  
  if (suggestedPath) {
    // Auto-redirect after 2 seconds
    setTimeout(() => {
      router.push(suggestedPath);
    }, 2000);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>Redirecting...</h1>
          <p>Taking you to the correct page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
}
```

---

## 📋 PRE-MIGRATION CHECKLIST

### **Before Migration:**

1. **Export Live Site Data:**
   - [ ] Google Search Console - All indexed URLs
   - [ ] Google Analytics - All pages with traffic
   - [ ] Server logs - All accessed URLs
   - [ ] Sitemap.xml from live site (if exists)

2. **Identify All Live Site URLs:**
   - [ ] Main navigation pages
   - [ ] City-specific pages
   - [ ] Blog posts (if any)
   - [ ] Category/tag pages
   - [ ] Search result pages
   - [ ] Pagination pages
   - [ ] Form success pages
   - [ ] Any custom pages

3. **Map URLs:**
   - [ ] Create spreadsheet: Old URL | New URL | Redirect Type | Priority
   - [ ] Identify pages that need redirects
   - [ ] Identify pages that can be deleted (no traffic)
   - [ ] Identify content that needs migration

4. **Check Current Rankings:**
   - [ ] Google Search Console - Top ranking pages
   - [ ] Google Analytics - Top landing pages
   - [ ] Identify pages with backlinks (Ahrefs/SEMrush)

---

## 🚀 MIGRATION PHASES

### **Phase 1: Pre-Migration (Week Before)**

1. **Document Everything:**
   - Complete URL audit
   - Create redirect mapping spreadsheet
   - Document all pages with traffic > 10 visits/month

2. **Prepare Redirects:**
   - Implement redirects in `next.config.ts`
   - Test redirects on staging environment
   - Verify all critical URLs redirect correctly

3. **Set Up Monitoring:**
   - Google Search Console - Monitor for 404 errors
   - Google Analytics - Set up alerts for traffic drops
   - Create redirect tracking spreadsheet

### **Phase 2: Migration Day**

1. **Before Going Live:**
   - [ ] Verify all redirects are in place
   - [ ] Test critical redirects manually
   - [ ] Ensure sitemap.xml is updated
   - [ ] Update robots.txt if needed

2. **During Migration:**
   - [ ] Deploy new site
   - [ ] Verify redirects are working
   - [ ] Test a few URLs manually
   - [ ] Monitor for immediate errors

3. **After Migration:**
   - [ ] Submit updated sitemap to Google Search Console
   - [ ] Request re-indexing of important pages
   - [ ] Monitor 404 errors in Search Console
   - [ ] Check analytics for traffic patterns

### **Phase 3: Post-Migration (First 2 Weeks)**

1. **Daily Monitoring:**
   - [ ] Check Google Search Console for 404 errors
   - [ ] Review Google Analytics for traffic drops
   - [ ] Check server logs for 404 requests
   - [ ] Add redirects for any missed URLs

2. **Weekly Review:**
   - [ ] Analyze 404 error patterns
   - [ ] Review redirect effectiveness
   - [ ] Check ranking changes
   - [ ] Update redirects as needed

---

## 🔍 HOW TO IDENTIFY LIVE SITE PAGES

### **Method 1: Google Search Console (Best Source)**

1. Go to Google Search Console
2. Navigate to: **Pages** → **All pages**
3. Export CSV of all indexed URLs
4. Filter by:
   - Pages with impressions
   - Pages with clicks
   - Pages indexed in last 30 days

### **Method 2: Google Analytics**

1. Go to Google Analytics
2. Navigate to: **Behavior** → **Site Content** → **All Pages**
3. Export all pages with traffic
4. Filter by:
   - Pages with > 10 visits/month
   - Landing pages
   - Pages with conversions

### **Method 3: Screaming Frog SEO Spider (Free Tool)**

1. Download Screaming Frog (free version)
2. Enter: `https://www.riverpaws.dog`
3. Start crawl
4. Export:
   - All URLs
   - Response codes
   - Internal links
   - External links

### **Method 4: Manual Site Navigation**

1. Visit live site
2. Click through all navigation menus
3. Check footer links
4. Check sitemap.xml (if exists)
5. Document all discovered URLs

### **Method 5: Check Server Logs**

1. Access server access logs
2. Extract all unique URLs accessed
3. Filter out:
   - Assets (images, CSS, JS)
   - Admin pages
   - Bot crawlers
4. Identify real page URLs

---

## 📝 REDIRECT CONFIGURATION FILE

### **Complete Redirect Map (next.config.ts)**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  
  async redirects() {
    return [
      // ============================================
      // SERVICE PAGE REDIRECTS
      // ============================================
      {
        source: '/dog-grooming',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      {
        source: '/dog-grooming/',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      {
        source: '/services/dog-grooming/',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      {
        source: '/dog-hikes',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/dog-hikes/',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/hiking',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/hiking/',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      {
        source: '/services/',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      
      // ============================================
      // TEAM/ABOUT PAGE REDIRECTS
      // ============================================
      {
        source: '/team',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/team/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/staff/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/caretakers',
        permanent: true,
      },
      
      // ============================================
      // CITY PAGE VARIATIONS (if any)
      // ============================================
      // These URLs should already exist, but handle variations:
      {
        source: '/dog-grooming-madison/',
        destination: '/dog-grooming-madison',
        permanent: true,
      },
      {
        source: '/dog-grooming-waunakee/',
        destination: '/dog-grooming-waunakee',
        permanent: true,
      },
      {
        source: '/dog-grooming-middleton/',
        destination: '/dog-grooming-middleton',
        permanent: true,
      },
      {
        source: '/dog-grooming-sun-prairie/',
        destination: '/dog-grooming-sun-prairie',
        permanent: true,
      },
      
      // ============================================
      // APPLICATION PAGE VARIATIONS
      // ============================================
      {
        source: '/apply/',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/application',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/application/',
        destination: '/apply',
        permanent: true,
      },
      
      // ============================================
      // REMOVE TRAILING SLASHES (Next.js handles this automatically, but explicit is better)
      // ============================================
      // Next.js automatically handles trailing slashes, but we can be explicit
      
      // ============================================
      // BLOG REDIRECTS (if old blog structure exists)
      // ============================================
      // Add specific blog post redirects as discovered:
      // {
      //   source: '/blog/old-post-slug',
      //   destination: '/blog/new-post-slug',
      //   permanent: true,
      // },
      
      // ============================================
      // SEARCH PAGE REDIRECTS
      // ============================================
      {
        source: '/search',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/search/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

---

## 🛡️ PROTECTING AGAINST 404 ERRORS

### **Strategy 1: Comprehensive Redirect Coverage**

1. **Redirect all known URL variations**
2. **Use catch-all redirects** for common patterns
3. **Monitor 404s** and add redirects quickly

### **Strategy 2: Smart 404 Page**

Create a helpful 404 page that:
- Suggests relevant pages
- Auto-redirects common patterns
- Provides search functionality
- Links to main sections

### **Strategy 3: 404 Monitoring & Quick Response**

1. **Set up alerts:**
   - Google Search Console - Email alerts for 404s
   - Server monitoring - Alert on 404 spikes
   - Analytics alerts - Traffic drop alerts

2. **Response process:**
   - Daily check for new 404s
   - Identify traffic source
   - Add redirect within 24 hours
   - Monitor redirect effectiveness

---

## 📊 URL AUDIT TEMPLATE

### **Spreadsheet Columns:**

| Old URL | New URL | Redirect Type | Traffic (Monthly) | Backlinks | Priority | Status | Notes |
|---------|---------|--------------|-------------------|-----------|----------|--------|-------|
| `/dog-grooming/` | `/services/dog-grooming` | 301 | 500 | 5 | High | ✅ Redirect in place | - |
| `/old-blog-post` | `/blog/new-post` | 301 | 50 | 2 | Medium | ⚠️ Needs redirect | - |
| `/deleted-page` | `/` | 301 | 10 | 0 | Low | ⚠️ Needs redirect | No longer relevant |

---

## ⚠️ CRITICAL REDIRECTS (Implement Immediately)

### **High Priority - Must Have:**

1. **Service Page Redirects:**
   - `/dog-grooming` → `/services/dog-grooming`
   - `/dog-hikes` → `/services/dog-hikes`
   - `/hiking` → `/services/dog-hikes`

2. **Team Page Redirects:**
   - `/team` → `/caretakers`
   - `/about` → `/caretakers`

3. **Trailing Slash Normalization:**
   - `/contact/` → `/contact`
   - `/gallery/` → `/gallery`
   - All pages without trailing slashes

### **Medium Priority:**

4. **Query Parameter Handling:**
   - `/contact/?success=true` → `/contact`
   - `/gallery/?category=*` → `/gallery`

5. **Old Blog Structure (if exists):**
   - Map old blog URLs to new blog structure

---

## 🔍 HOW TO DISCOVER MISSING PAGES

### **Quick Discovery Methods:**

1. **Check Live Site Navigation:**
   ```
   Visit: https://www.riverpaws.dog
   - Click all header links
   - Click all footer links
   - Navigate all menus
   - Document all URLs
   ```

2. **Check Live Site Sitemap:**
   ```
   Visit: https://www.riverpaws.dog/sitemap.xml
   - Document all URLs listed
   - Compare with new site sitemap
   ```

3. **Google Search:**
   ```
   Search: site:riverpaws.dog
   - Review all indexed pages
   - Document URLs Google knows about
   ```

4. **Check Robots.txt:**
   ```
   Visit: https://www.riverpaws.dog/robots.txt
   - See what's blocked/allowed
   - Understand site structure
   ```

---

## 🎯 RECOMMENDED ACTION PLAN

### **Immediate Actions (Before Migration):**

1. **Complete URL Audit:**
   - [ ] Export Google Search Console URLs
   - [ ] Export Google Analytics pages
   - [ ] Crawl live site with Screaming Frog
   - [ ] Check live site navigation manually
   - [ ] Review live site sitemap.xml

2. **Create Redirect Map:**
   - [ ] Document all old URLs → new URLs
   - [ ] Identify pages that need redirects
   - [ ] Identify pages that can be deleted
   - [ ] Prioritize by traffic/importance

3. **Implement Redirects:**
   - [ ] Add redirects to `next.config.ts`
   - [ ] Test redirects on staging
   - [ ] Verify critical redirects work
   - [ ] Document all redirects

4. **Prepare Monitoring:**
   - [ ] Set up Google Search Console alerts
   - [ ] Set up Google Analytics alerts
   - [ ] Create redirect tracking spreadsheet
   - [ ] Plan daily monitoring schedule

### **During Migration:**

5. **Go-Live Checklist:**
   - [ ] Verify all redirects deployed
   - [ ] Test critical URLs manually
   - [ ] Submit new sitemap to Google
   - [ ] Request re-indexing of key pages
   - [ ] Monitor for immediate errors

### **Post-Migration (First 2 Weeks):**

6. **Daily Monitoring:**
   - [ ] Check Search Console for 404s
   - [ ] Review Analytics for traffic drops
   - [ ] Check server logs for 404 requests
   - [ ] Add redirects for any missed URLs
   - [ ] Document all actions taken

---

## 📈 EXPECTED IMPACT

### **With Proper Redirects:**
- ✅ **0% ranking loss** for properly redirected pages
- ✅ **Smooth transition** for users and search engines
- ✅ **Preserved link equity** from old URLs
- ✅ **No 404 errors** for important pages

### **Without Proper Redirects:**
- ❌ **Ranking drops** for pages that 404
- ❌ **Lost link equity** from old URLs
- ❌ **Poor user experience** (broken links)
- ❌ **Crawl budget waste** on 404s

---

## 🚨 RED FLAGS TO WATCH FOR

### **Warning Signs After Migration:**

1. **404 Errors Spike:**
   - If 404s increase significantly, you missed URLs
   - Action: Add redirects immediately

2. **Traffic Drops:**
   - If organic traffic drops >20%, check redirects
   - Action: Verify redirects are working, check Search Console

3. **Ranking Drops:**
   - If key pages drop in rankings, check:
     - Redirect implementation
     - Canonical URLs
     - Page content changes
   - Action: Fix issues immediately

4. **Crawl Errors:**
   - Google Search Console showing crawl errors
   - Action: Fix redirects, update sitemap

---

## 📞 NEXT STEPS

### **Your Action Items:**

1. **Export Live Site Data:**
   - Google Search Console → All URLs
   - Google Analytics → All pages
   - Server logs → All accessed URLs

2. **Create URL Mapping:**
   - Use the template provided
   - Map old URLs to new URLs
   - Identify redirect needs

3. **Review This Document:**
   - Understand redirect strategy
   - Identify any missed scenarios
   - Ask questions about specific URLs

4. **We'll Implement:**
   - Add redirects to `next.config.ts`
   - Create smart 404 page
   - Set up monitoring
   - Test all redirects

---

**Last Updated:** January 2025  
**Status:** Ready for URL audit and redirect implementation  
**Priority:** CRITICAL - Must complete before migration




