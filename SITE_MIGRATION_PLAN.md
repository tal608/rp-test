# River Paws Site Migration Plan

## 🔍 Current Live Site Analysis

### ✅ Pages That Exist in New Site:
- `/` - Homepage ✅
- `/services/dog-grooming/` - Main grooming page ✅
- `/services/dog-hikes/` - Main hiking page ✅
- `/contact/` - Contact page ✅
- `/caretakers/` - Team page ✅
- `/gallery/` - Gallery ✅
- `/apply/` - Application hub ✅
- `/apply/dog-grooming-application/` ✅
- `/apply/dog-hikes-application/` ✅
- `/locations/waunakee/` ✅ (newly created)

### ⚠️ Missing Pages from Live Site:

#### **City-Specific Grooming Pages:**
Based on live site analysis:
- `/dog-grooming-madison/` ❌ **MISSING**
- `/dog-grooming-sun-prairie/` ❌ **MISSING** (referenced in FAQ)
- `/dog-grooming-middleton/` ❌ **MISSING** (referenced in FAQ)
- `/dog-grooming-waunakee/` ❌ **MISSING** (referenced in FAQ)

**Note:** Live site uses `/dog-grooming/` but new site uses `/services/dog-grooming/`
**Need to decide:** Keep old URLs with redirects OR create new structure

---

## 📋 Migration Strategy

### **Option A: Preserve Old URLs (Recommended for SEO)**
Create pages at old URLs but with new design:
- `/dog-grooming-madison/` → New design, new content structure
- `/dog-grooming-waunakee/` → New design
- etc.

### **Option B: New Structure with Redirects**
- `/services/dog-grooming/madison/` → New structure
- Redirect old URLs to new structure

### **Option C: Hybrid (Best for SEO)**
- Create pages at both old and new URLs
- Old URLs redirect to new URLs after migration period
- Or: Keep old URLs, use canonical tags pointing to main page

**RECOMMENDATION: Option A - Preserve old URLs for SEO value**

---

## 🎯 Pages to Create

### **Priority 1: City-Specific Grooming Pages**

1. **`/dog-grooming-madison/`**
   - Content from live site: FAQ about grooming benefits
   - Local SEO: "Dog Grooming Madison"
   - Design: Match new site, use FAQSection component
   - Link to main `/services/dog-grooming/` page

2. **`/dog-grooming-waunakee/`**
   - Content from live site: Best products FAQ
   - Local SEO: "Dog Grooming Waunakee"
   - Design: Match new site

3. **`/dog-grooming-sun-prairie/`**
   - Content from live site: Before/after appointment tips
   - Local SEO: "Dog Grooming Sun Prairie"

4. **`/dog-grooming-middleton/`**
   - Content from live site: Bathing tips FAQ
   - Local SEO: "Dog Grooming Middleton"

5. **`/dog-grooming-deforest/`**
   - Create new (if not on live site, good for SEO)

### **Priority 2: City-Specific Hiking Pages**
- `/dog-hikes-madison/`
- `/dog-hikes-waunakee/`
- `/dog-hikes-middleton/`
- `/dog-hikes-sun-prairie/`
- `/dog-hikes-deforest/`

---

## 📝 Content Migration Plan

### **From Live Site `/dog-grooming-madison/`:**
- **Topic:** "What are the benefits of regular dog grooming?"
- **Content:** Detailed health benefits explanation
- **Action:** Create page with this FAQ + new design

### **From Live Site `/dog-grooming/`:**
- **FAQs Mentioning Cities:**
  - "A Dog Grooming Madison Client Asked" → Move to `/dog-grooming-madison/`
  - "A Dog Grooming Sun Prairie Client Asked" → Move to `/dog-grooming-sun-prairie/`
  - "A Dog Grooming Middleton Client Asked" → Move to `/dog-grooming-middleton/`
  - "A River Paws Dog Grooming Waunakee client asked" → Move to `/dog-grooming-waunakee/`

---

## 🛠️ Implementation Plan

### **Step 1: Create City-Specific FAQ Content**
Extract FAQs from live site and create constants:
- `src/constants/cityFaqs.ts` - City-specific FAQs

### **Step 2: Create Page Template**
Reusable component for city-specific pages:
- Uses new design system
- Includes FAQSection component
- Proper SEO metadata
- Breadcrumbs
- Link to main service page

### **Step 3: Create Individual Pages**
Generate pages for each city:
- `/dog-grooming-madison/page.tsx`
- `/dog-grooming-waunakee/page.tsx`
- etc.

### **Step 4: Add to Sitemap**
Update sitemap.ts to include all new pages

### **Step 5: Internal Linking**
- Link from main `/services/dog-grooming/` page to city pages
- Cross-link between city pages
- Link from homepage to city pages

---

## ✅ SEO Considerations

### **URL Structure:**
- Keep old URLs: `/dog-grooming-madison/` (better for existing SEO)
- Add canonical tags if needed
- Ensure 301 redirects for any changed URLs

### **Meta Data:**
- Title: "Dog Grooming in [City] | River Paws"
- Description: Include city name and services
- Canonical URLs
- Schema markup for LocalBusiness + Service

### **Content:**
- H1: Include city name
- City name in first paragraph
- Local keywords naturally integrated
- City-specific testimonials if available

---

## 🎨 Design Requirements

### **Match New Site:**
- ✅ Use same hero section style
- ✅ Use FAQSection component
- ✅ Use Breadcrumb component
- ✅ Use ScrollIndicator component
- ✅ Same color scheme and typography
- ✅ Mobile responsive
- ✅ Image optimization with Next.js Image

### **Page Structure:**
1. Hero section with city name
2. Brief intro about serving [City]
3. Main FAQ content (city-specific)
4. Link to main service page
5. Call-to-action (Book appointment)
6. Related services section

---

## 📊 Next Steps

1. **Audit live site completely** - Find all city-specific pages
2. **Create city FAQs constant** - Extract all FAQ content
3. **Build page template component** - Reusable city page template
4. **Create all city pages** - Generate for all service areas
5. **Update sitemap** - Add all new pages
6. **Add internal links** - Connect pages together
7. **Test redirects** - Ensure old URLs work
8. **Update SEO metadata** - All pages optimized

