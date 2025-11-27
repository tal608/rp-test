# Complete URL Migration Audit & Redirect Map

**Generated:** January 2025  
**Purpose:** Comprehensive mapping of all URLs for safe site migration  
**Status:** Ready for implementation

---

## 📊 NEW SITE PAGE INVENTORY

### ✅ Confirmed Pages in New Site (22 pages + blog articles):

#### **Core Pages:**
1. `/` - Homepage ✅
2. `/services/dog-grooming` - Main grooming page ✅
3. `/services/dog-hikes` - Main hiking page ✅
4. `/services/puppy-play` - Puppy play page ✅
5. `/contact` - Contact page ✅
6. `/caretakers` - Team page ✅
7. `/gallery` - Gallery ✅
8. `/blog` - Blog index ✅
9. `/blog/[slug]` - Blog articles (5 articles) ✅

#### **Application Pages:**
10. `/apply` - Application hub ✅
11. `/apply/dog-grooming-application` ✅
12. `/apply/dog-hikes-application` ✅

#### **City-Specific Pages (Preserved Old URLs):**
13. `/dog-grooming-madison` ✅
14. `/dog-grooming-waunakee` ✅
15. `/dog-grooming-middleton` ✅
16. `/dog-grooming-sun-prairie` ✅

#### **Specialty Pages:**
17. `/puppy-grooming` ✅
18. `/canine-grooming` ✅
19. `/locations/waunakee` ✅ (New page)

#### **Other Pages:**
20. `/portal` ✅ (Private - should be noindex)
21. `/policies` ✅
22. `/waivers` ✅

---

## 🔄 REDIRECT MAPPING

### **Implemented Redirects (In next.config.ts):**

| Old URL Pattern | New URL | Type | Status |
|-----------------|---------|------|--------|
| `/dog-grooming` | `/services/dog-grooming` | 301 | ✅ |
| `/dog-grooming/` | `/services/dog-grooming` | 301 | ✅ |
| `/dog-hikes` | `/services/dog-hikes` | 301 | ✅ |
| `/dog-hikes/` | `/services/dog-hikes` | 301 | ✅ |
| `/hiking` | `/services/dog-hikes` | 301 | ✅ |
| `/hiking/` | `/services/dog-hikes` | 301 | ✅ |
| `/services` | `/services/dog-grooming` | 301 | ✅ |
| `/services/` | `/services/dog-grooming` | 301 | ✅ |
| `/team` | `/caretakers` | 301 | ✅ |
| `/team/` | `/caretakers` | 301 | ✅ |
| `/staff` | `/caretakers` | 301 | ✅ |
| `/staff/` | `/caretakers` | 301 | ✅ |
| `/about` | `/caretakers` | 301 | ✅ |
| `/about/` | `/caretakers` | 301 | ✅ |
| `/about-us` | `/caretakers` | 301 | ✅ |
| `/about-us/` | `/caretakers` | 301 | ✅ |
| `/application` | `/apply` | 301 | ✅ |
| `/application/` | `/apply` | 301 | ✅ |
| `/search` | `/blog` | 301 | ✅ |
| `/search/` | `/blog` | 301 | ✅ |
| `/grooming` | `/services/dog-grooming` | 301 | ✅ |
| `/grooming/` | `/services/dog-grooming` | 301 | ✅ |
| `/hikes` | `/services/dog-hikes` | 301 | ✅ |
| `/hikes/` | `/services/dog-hikes` | 301 | ✅ |

### **Trailing Slash Redirects (All Pages):**
- All pages with trailing slashes redirect to non-trailing versions ✅
- Handled automatically by Next.js + explicit redirects ✅

---

## 🔍 LIVE SITE URL DISCOVERY CHECKLIST

### **To Complete Audit, You Need:**

#### **1. Google Search Console Export:**
- [ ] Go to Google Search Console → Pages
- [ ] Export all indexed URLs (CSV)
- [ ] Export pages with impressions/clicks
- [ ] **Action:** Share exported URLs for mapping

#### **2. Google Analytics Export:**
- [ ] Go to Google Analytics → Behavior → Site Content → All Pages
- [ ] Export all pages with traffic (last 12 months)
- [ ] Filter by pages with > 10 visits/month
- [ ] **Action:** Share exported URLs for mapping

#### **3. Manual Site Crawl:**
- [ ] Visit https://www.riverpaws.dog
- [ ] Click through all navigation menus
- [ ] Check footer links
- [ ] Check any sidebar/widgets
- [ ] Document all URLs found
- [ ] **Action:** Create list of discovered URLs

#### **4. Check Live Site Files:**
- [ ] Visit https://www.riverpaws.dog/sitemap.xml
- [ ] Document all URLs listed
- [ ] Visit https://www.riverpaws.dog/robots.txt
- [ ] Check for any blocked/allowed paths
- [ ] **Action:** Share findings

#### **5. Google Search:**
- [ ] Search: `site:riverpaws.dog`
- [ ] Review all indexed pages
- [ ] Document URLs Google knows about
- [ ] **Action:** List all discovered URLs

---

## 🚨 POTENTIAL MISSING PAGES FROM LIVE SITE

### **Common URL Patterns to Check:**

#### **1. Old Blog Structure:**
- `/blog/` → Should redirect to `/blog` ✅
- `/blog/[old-slug]` → Need to map to new blog slugs
- `/category/[name]` → Should redirect to `/blog`
- `/tag/[name]` → Should redirect to `/blog`
- `/author/[name]` → Should redirect to `/caretakers` or `/blog`

#### **2. Search & Filter Pages:**
- `/search?q=*` → Redirects to `/blog` ✅
- `/gallery/?category=*` → Redirects to `/gallery` (query stripped)
- `/contact/?success=true` → Redirects to `/contact` (query stripped)

#### **3. Pagination Pages:**
- `/blog/page/2` → Should redirect to `/blog` or show 404
- `/blog/page/[n]` → Should redirect to `/blog`

#### **4. Old Admin/WordPress URLs (Should 404):**
- `/wp-admin/*` → Should return 404 (blocked in robots.txt)
- `/wp-content/*` → Should return 404
- `/wp-json/*` → Should return 404

#### **5. Archive Pages (If WordPress):**
- `/category/*` → Redirect to `/blog`
- `/tag/*` → Redirect to `/blog`
- `/date/*` → Redirect to `/blog`
- `/author/*` → Redirect to `/caretakers` or `/blog`

#### **6. Feed URLs:**
- `/feed` → Should redirect to `/blog` or 404
- `/rss` → Should redirect to `/blog` or 404
- `/atom` → Should redirect to `/blog` or 404

---

## 📝 URL MAPPING TEMPLATE

### **Spreadsheet Format:**

| Old URL | New URL | Redirect Type | Traffic (Monthly) | Backlinks | Priority | Status | Notes |
|---------|---------|--------------|-------------------|-----------|----------|--------|-------|
| `/dog-grooming/` | `/services/dog-grooming` | 301 | ? | ? | High | ✅ Done | - |
| `/old-blog-post` | `/blog/new-post` | 301 | ? | ? | Medium | ⚠️ Needs mapping | Old blog structure |
| `/category/grooming` | `/blog` | 301 | ? | ? | Low | ⚠️ Needs redirect | Category archive |

---

## 🛡️ PROTECTION STRATEGIES IMPLEMENTED

### **1. Comprehensive Redirects:**
- ✅ All common URL variations redirected
- ✅ Trailing slash normalization
- ✅ Case normalization (middleware)
- ✅ Query parameter stripping (middleware)

### **2. Smart 404 Page:**
- ✅ Suggests redirects for common patterns
- ✅ Shows popular pages
- ✅ Helpful navigation
- ✅ Auto-redirect detection

### **3. Middleware Protection:**
- ✅ Handles query parameters
- ✅ Normalizes URLs
- ✅ Dynamic redirect patterns
- ✅ Case-insensitive matching

### **4. Monitoring Setup:**
- ⚠️ Need to set up Google Search Console alerts
- ⚠️ Need to set up Google Analytics alerts
- ⚠️ Need to monitor server logs for 404s

---

## 📋 POST-MIGRATION MONITORING CHECKLIST

### **Week 1 (Daily Checks):**
- [ ] Check Google Search Console for 404 errors
- [ ] Review Google Analytics for traffic drops
- [ ] Check server logs for 404 requests
- [ ] Test critical redirects manually
- [ ] Monitor ranking changes

### **Week 2-4 (Weekly Checks):**
- [ ] Review 404 error patterns
- [ ] Add redirects for any missed URLs
- [ ] Monitor traffic trends
- [ ] Check ranking stability
- [ ] Review user feedback

### **Ongoing:**
- [ ] Monthly review of 404 errors
- [ ] Quarterly redirect audit
- [ ] Monitor Search Console regularly
- [ ] Update redirects as needed

---

## 🎯 NEXT STEPS

### **Before Migration:**
1. ✅ Redirects implemented in `next.config.ts`
2. ✅ Smart 404 page created
3. ✅ Middleware for query params created
4. ⚠️ **YOU NEED TO:** Export live site URLs from Search Console/Analytics
5. ⚠️ **YOU NEED TO:** Share URLs for any additional redirects needed

### **After Migration:**
1. Submit new sitemap to Google Search Console
2. Request re-indexing of key pages
3. Monitor 404 errors daily
4. Add redirects for any missed URLs
5. Track traffic and rankings

---

## 📊 EXPECTED OUTCOMES

### **With Current Implementation:**
- ✅ **Common URL variations covered** - Most redirects handled
- ✅ **Smart 404 handling** - Users guided to correct pages
- ✅ **Query parameter cleanup** - Clean URLs maintained
- ✅ **Case normalization** - Prevents duplicate content

### **Still Needed:**
- ⚠️ **Live site URL audit** - Need actual URLs from live site
- ⚠️ **Blog post mapping** - If old blog structure exists
- ⚠️ **Custom page handling** - Any unique pages on live site

---

## 🔧 QUICK ADD REDIRECTS

When you discover additional URLs from live site audit, add them here:

```typescript
// Add to next.config.ts redirects array:
{
  source: '/old-url-path',
  destination: '/new-url-path',
  permanent: true,
},
```

---

## 📞 WHAT TO DO NEXT

1. **Export URLs from:**
   - Google Search Console
   - Google Analytics
   - Manual site crawl

2. **Share the URLs with me**, and I'll:
   - Add redirects for any missing URLs
   - Map old blog posts (if any)
   - Handle any custom pages

3. **Test before going live:**
   - Test all redirects manually
   - Verify 404 page works
   - Check middleware is functioning

4. **Monitor after migration:**
   - Daily 404 checks
   - Traffic monitoring
   - Ranking tracking

---

**Last Updated:** January 2025  
**Status:** ✅ Redirects implemented, ⚠️ Awaiting live site URL audit  
**Next Action:** Export and share live site URLs for final mapping




