# Pre-Launch Testing Guide

**Purpose:** Comprehensive testing of redirects, 404 page, and middleware before going live  
**Date:** January 2025

---

## 🧪 TESTING CHECKLIST

### **1. Critical Redirects Testing**

Test all critical redirects from Google Search Console and sitemap:

#### **Service Page Redirects:**
- [ ] `/dog-grooming` → `/services/dog-grooming` (301)
- [ ] `/dog-grooming/` → `/services/dog-grooming` (301)
- [ ] `/dog-hikes` → `/services/dog-hikes` (301)
- [ ] `/dog-hikes/` → `/services/dog-hikes` (301)
- [ ] `/hiking` → `/services/dog-hikes` (301)
- [ ] `/puppy-play` → `/services/puppy-play` (301)
- [ ] `/dog-daycare` → `/services/puppy-play` (301)

#### **Team/About Redirects:**
- [ ] `/team` → `/caretakers` (301)
- [ ] `/staff` → `/caretakers` (301)
- [ ] `/about` → `/caretakers` (301)
- [ ] `/about-us` → `/caretakers` (301)

#### **Application Redirects:**
- [ ] `/application` → `/apply` (301)
- [ ] `/grooming-application` → `/apply/dog-grooming-application` (301)
- [ ] `/dog-hike-scheduling` → `/apply/dog-hikes-application` (301)

#### **Other Critical Redirects:**
- [ ] `/agreement` → `/waivers` (301)
- [ ] `/grooming-and-doggy-daycare-gallery` → `/gallery` (301)
- [ ] `/sms` → `/contact` (301)
- [ ] `/search` → `/blog` (301)

#### **WordPress/PDF Redirects:**
- [ ] `/wp-content/uploads/2019/03/Pick-up-and-Drop-off-Online-Instructions.pdf` → `/waivers` (301)
- [ ] `/wp-content/uploads/2019/03/Adventure-Out-Online-Instructions.pdf` → `/waivers` (301)
- [ ] `/wp-admin/test` → `/` (301)
- [ ] `/wp-json/test` → `/` (301)

---

### **2. 404 Page Testing**

#### **Test 404 Page Functionality:**
- [ ] Visit `/nonexistent-page` - Should show 404 page
- [ ] Visit `/old-url-that-doesnt-exist` - Should show 404 page
- [ ] 404 page should display helpful navigation links
- [ ] 404 page should suggest redirects for known old URLs

#### **Test 404 Page Redirect Suggestions:**
- [ ] `/dog-grooming` (if somehow not redirected) → Should suggest `/services/dog-grooming`
- [ ] `/team` (if somehow not redirected) → Should suggest `/caretakers`
- [ ] `/application` (if somehow not redirected) → Should suggest `/apply`

#### **Test Pattern Matching:**
- [ ] `/dog-grooming/` → Should suggest `/services/dog-grooming`
- [ ] `/DOG-GROOMING` → Should suggest `/services/dog-grooming` (case insensitive)
- [ ] `/about-us` → Should suggest `/caretakers`

---

### **3. Middleware Testing**

#### **Query Parameter Stripping:**
- [ ] `/contact?success=true` → Should redirect to `/contact` (301)
- [ ] `/gallery?category=dogs` → Should redirect to `/gallery` (301)
- [ ] `/blog?page=2` → Should redirect to `/blog` (301)
- [ ] `/services/dog-grooming?utm_source=google` → Should redirect to `/services/dog-grooming` (301)

#### **Case Normalization:**
- [ ] `/CONTACT` → Should redirect to `/contact` (301)
- [ ] `/Dog-Grooming` → Should redirect to `/dog-grooming` → Then redirect to `/services/dog-grooming` (301)
- [ ] `/Caretakers` → Should redirect to `/caretakers` (301)

#### **Trailing Slash Normalization:**
- [ ] `/contact/` → Should redirect to `/contact` (301)
- [ ] `/gallery/` → Should redirect to `/gallery` (301)
- [ ] `/blog/` → Should redirect to `/blog` (301)

#### **Old Blog Post Patterns:**
- [ ] `/blog/2024/01/old-post` → Should redirect to `/blog` (301)
- [ ] `/blog/2023/12/another-post` → Should redirect to `/blog` (301)

---

## 🛠️ MANUAL TESTING METHODS

### **Method 1: Browser Developer Tools**

1. **Open Browser DevTools (F12)**
2. **Go to Network Tab**
3. **Enable "Preserve log"**
4. **Visit old URL** (e.g., `/dog-grooming`)
5. **Check Response:**
   - Status Code: Should be `301` or `308` (permanent redirect)
   - Location Header: Should contain destination URL
   - Response Headers: Should include redirect headers

### **Method 2: curl Command (Terminal)**

```bash
# Test redirect
curl -I http://localhost:3000/dog-grooming

# Should see:
# HTTP/1.1 301 Moved Permanently
# Location: /services/dog-grooming
```

### **Method 3: Online Tools**

- **Redirect Checker:** https://www.redirect-checker.org/
- **HTTP Status Checker:** https://httpstatus.io/
- **SEO Site Checkup:** https://seositecheckup.com/tools/redirect-checker

---

## 📋 AUTOMATED TEST SCRIPT

Run the test script to verify all redirects:

```bash
# Install dependencies if needed
npm install

# Build the project
npm run build

# Start the server
npm start

# In another terminal, run tests
node scripts/test-redirects.js
```

---

## ✅ EXPECTED RESULTS

### **Redirects:**
- ✅ All redirects should return `301` status code
- ✅ Location header should point to correct destination
- ✅ No redirect chains (should be direct redirects)
- ✅ Final destination should return `200` status

### **404 Page:**
- ✅ Should display user-friendly error message
- ✅ Should suggest relevant redirects for old URLs
- ✅ Should provide navigation links to popular pages
- ✅ Should work correctly on mobile devices

### **Middleware:**
- ✅ Should strip query parameters from specified pages
- ✅ Should normalize URL casing
- ✅ Should handle trailing slashes
- ✅ Should redirect old blog post patterns

---

## 🚨 COMMON ISSUES TO WATCH FOR

### **Redirect Issues:**
- ❌ Redirect loops (page redirects to itself)
- ❌ Wrong status code (should be 301, not 302)
- ❌ Missing trailing slash redirects
- ❌ Case sensitivity issues

### **404 Page Issues:**
- ❌ Pathname not being passed correctly
- ❌ Suggestions not showing for known URLs
- ❌ Broken links on 404 page
- ❌ Mobile responsiveness issues

### **Middleware Issues:**
- ❌ Query params not being stripped
- ❌ Case normalization not working
- ❌ Middleware blocking static assets
- ❌ Performance issues (slow redirects)

---

## 📊 TEST RESULTS TEMPLATE

```
Date: [Date]
Tester: [Name]
Environment: [Development/Staging/Production]

### Redirect Tests:
- [ ] All critical redirects working: ✅ / ❌
- [ ] Status codes correct: ✅ / ❌
- [ ] No redirect loops: ✅ / ❌

### 404 Page Tests:
- [ ] Page displays correctly: ✅ / ❌
- [ ] Redirect suggestions work: ✅ / ❌
- [ ] Mobile responsive: ✅ / ❌

### Middleware Tests:
- [ ] Query params stripped: ✅ / ❌
- [ ] Case normalization works: ✅ / ❌
- [ ] Trailing slashes handled: ✅ / ❌

### Overall Status:
- [ ] Ready for Production: ✅ / ❌
- [ ] Issues Found: [List any issues]
- [ ] Notes: [Additional notes]
```

---

## 🎯 QUICK TEST COMMANDS

### **Test Critical Redirects:**
```bash
# Service pages
curl -I http://localhost:3000/dog-grooming
curl -I http://localhost:3000/dog-hikes
curl -I http://localhost:3000/puppy-play

# Team pages
curl -I http://localhost:3000/team
curl -I http://localhost:3000/about

# Application pages
curl -I http://localhost:3000/application
curl -I http://localhost:3000/grooming-application

# Other critical pages
curl -I http://localhost:3000/agreement
curl -I http://localhost:3000/sms
```

### **Test 404 Page:**
```bash
curl http://localhost:3000/nonexistent-page
# Should return 404 status with helpful content
```

### **Test Middleware:**
```bash
# Query params
curl -I http://localhost:3000/contact?success=true

# Case normalization
curl -I http://localhost:3000/CONTACT

# Trailing slash
curl -I http://localhost:3000/contact/
```

---

## ✅ FINAL CHECKLIST BEFORE GOING LIVE

- [ ] All critical redirects tested and working
- [ ] 404 page tested and working
- [ ] Middleware tested and functioning correctly
- [ ] No redirect loops detected
- [ ] All destination pages exist and work
- [ ] Mobile responsiveness verified
- [ ] Performance acceptable
- [ ] SEO metadata correct on destination pages
- [ ] No console errors
- [ ] No broken links

---

**Status:** Ready for Testing  
**Last Updated:** January 2025




