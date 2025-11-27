# Image Management Pipeline - Comprehensive Plan

## Overview
This document outlines a systematic, repeatable approach for managing images across the River Paws website. The pipeline enables intelligent image placement, tracking, and optimization based on SEO scores, content context, and metadata.

---

## 🎯 Goals

1. **Repeatable Process**: Execute the same workflow each time new CSV files arrive
2. **Intelligent Placement**: Automatically determine optimal image placement based on:
   - Content context (surrounding text, page purpose)
   - Image metadata (SEO scores, placement tags, categories)
   - Current placement performance
3. **Smart Replacement**: Compare new images against existing placements and upgrade when better options exist
4. **Complete Tracking**: Maintain a record of all placements, reasoning, and metadata
5. **Gallery Integration**: All images automatically added to appropriate gallery categories

---

## 📋 System Architecture

### 1. **Image Placement Registry** (`image-placements-registry.json`)

A comprehensive JSON file tracking all image placements across the site:

```json
{
  "placements": [
    {
      "id": "homepage-hero-001",
      "location": {
        "page": "homepage",
        "section": "hero",
        "component": "HeroSection",
        "file": "src/app/page.tsx",
        "line": 71
      },
      "currentImage": {
        "filename": "happy-labmix-field-madison-wi-river-paws.jpg",
        "path": "/Hiking/happy-labmix-field-madison-wi-river-paws.jpg",
        "alt": "A happy black Lab mix dog...",
        "score": 8.8,
        "category": "Adventure / Hiking",
        "targetCity": "Madison",
        "placementTags": ["Homepage Hero", "Services", "Gallery", "Social"],
        "focalPoint": { "x": 45, "y": 40 },
        "locked": false
      },
      "placementReasoning": {
        "contentContext": "Homepage hero requires high-impact image showcasing adventure energy",
        "metadataMatch": "Score 8.8, tagged 'Homepage Hero', Madison location matches service area",
        "seoFactors": ["High emotional score (9)", "Strong brand alignment (9)", "Local SEO (Madison)"],
        "replacedPrevious": "replaced-old-image.jpg",
        "replacementReason": "New image scored 0.5 points higher with better focal point"
      },
      "placementDate": "2025-01-XX",
      "lastUpdated": "2025-01-XX"
    }
  ],
  "galleryEntries": [
    {
      "category": "hiking",
      "image": {
        "filename": "happy-golden-retriever-trail-madison-wi-river-paws.jpg",
        "path": "/Hiking/happy-golden-retriever-trail-madison-wi-river-paws.jpg",
        "alt": "...",
        "title": "Happy trails and wagging tails await your dog!",
        "priority": true,
        "score": 8.3
      },
      "addedDate": "2025-01-XX"
    }
  ]
}
```

### 2. **Placement Opportunity Map** (`placement-opportunities.json`)

Defines all potential image placement locations across the site:

```json
{
  "opportunities": [
    {
      "id": "homepage-hero",
      "page": "homepage",
      "section": "hero",
      "requirements": {
        "minScore": 8.5,
        "requiredTags": ["Homepage Hero"],
        "preferredCategories": ["Adventure / Hiking", "Social / Community / Celebration"],
        "preferredCities": ["Madison", "Waunakee"],
        "contentContext": "High-impact hero image showcasing adventure energy and joy",
        "priority": "critical"
      },
      "currentPlacements": ["homepage-hero-001", "homepage-hero-002"],
      "maxRotations": 5,
      "lockedImages": [],
      "rotationEnabled": true
    },
    {
      "id": "dog-grooming-hero",
      "page": "dog-grooming",
      "section": "hero",
      "requirements": {
        "minScore": 8.0,
        "requiredTags": ["Services", "Homepage Hero"],
        "preferredCategories": ["Grooming / Care Close-Up"],
        "preferredCities": ["Madison", "Waunakee", "DeForest", "Sun Prairie", "Middleton"],
        "contentContext": "Professional grooming service hero",
        "priority": "high"
      }
    }
  ]
}
```

### 3. **CSV Processing Script** (`scripts/process-image-csv.js`)

A Node.js script that:
1. Reads CSV file
2. Parses image metadata
3. Compares against current placements
4. Generates placement recommendations
5. Updates registry and code files

---

## 🔄 Workflow Process

### Phase 1: CSV Processing & Analysis

1. **Read CSV File**
   - Parse all rows with image metadata
   - Extract: filename, alt text, caption, score, category, placement tags, focal points, target city

2. **Load Current State**
   - Read `image-placements-registry.json`
   - Read `placement-opportunities.json`
   - Read current code files to identify existing placements

3. **Match Images to Opportunities**
   - For each image in CSV:
     - Find matching placement opportunities based on:
       - Placement tags (exact match preferred)
       - Category alignment
       - Score threshold
       - City targeting
     - Score each potential match:
       ```
       Match Score = 
         (Tag Match: 40%) +
         (Category Match: 20%) +
         (Score Above Min: 20%) +
         (City Match: 10%) +
         (Content Context: 10%)
       ```

4. **Compare Against Current Placements**
   - For each current placement:
     - Check if new CSV has better image (higher score, better tags)
     - Calculate improvement potential
     - Flag for replacement if improvement > threshold (e.g., 0.3 points)

### Phase 2: Placement Decision Logic

**Decision Tree:**
```
IF image has "Homepage Hero" tag AND score >= 8.5:
  → Consider for homepage hero
  → Compare with current hero image
  → Replace if score improvement >= 0.3

IF image has "Services" tag AND category matches page:
  → Consider for service page hero
  → Check city match for city-specific pages
  
IF image has "Gallery" tag:
  → Add to gallery category matching image category
  
IF image has "Social" tag:
  → Consider for social sharing / blog posts
```

**Replacement Rules:**
- Replace if new score > current score + 0.3
- Replace if new image has better tag match
- Replace if new image better matches content context
- Never replace if current image is performing well AND new image is only marginally better

### Phase 3: Code Updates

1. **Update Image Files**
   - Rename files according to CSV
   - Update focal points in `imageFocalPoints.ts`

2. **Update Placements**
   - Modify page files (hero images, section images)
   - Update gallery.ts with new images
   - Ensure all images use `getImageObjectPosition()` helper

3. **Update Registry**
   - Record all new placements
   - Document reasoning for each placement
   - Track replacement history

### Phase 4: Validation & Reporting

1. **Generate Report**
   - List all placements made
   - List all replacements
   - Show score improvements
   - Flag any conflicts or issues

2. **Validation Checks**
   - Ensure no duplicate images in adjacent sections
   - Verify all images have focal points
   - Check all alt text is present
   - Validate image paths exist

---

## 📁 File Structure

```
riverpaws/
├── data/
│   ├── image-placements-registry.json      # All current placements
│   ├── placement-opportunities.json        # All placement locations
│   └── image-metadata-history.json         # Historical tracking
├── scripts/
│   ├── process-image-csv.js                # Main processing script
│   ├── analyze-placements.js               # Placement analysis
│   └── generate-report.js                  # Report generation
├── public/
│   ├── Grooming/                           # Grooming images
│   ├── Hiking/                             # Hiking images
│   └── [other-categories]/                 # Other categories
└── src/
    ├── lib/
    │   └── imageFocalPoints.ts             # Focal point mappings
    └── constants/
        └── gallery.ts                      # Gallery definitions
```

---

## 🎨 Placement Strategy Matrix

### Hero Images (Priority: Critical)
- **Requirements**: Score >= 8.5, "Homepage Hero" or "Services" tag
- **Selection**: Rotate top 5 highest scoring images matching page context
- **Replacement Threshold**: +0.3 score improvement
- **Rotation**: Max 5 images per location, rotate on each CSV update

### Service Page Images (Priority: High)
- **Requirements**: Score >= 7.5, category match, strict city match for city pages
- **Selection**: Rotate top 5 best matches for service type + strict city match
- **Replacement Threshold**: +0.5 score improvement OR better city match
- **Rotation**: Max 5 images per location

### Gallery Images (Priority: Medium)
- **Requirements**: Score >= 6.0, "Gallery" tag
- **Selection**: ALL qualifying images added (no limit), prioritized by score
- **Replacement Threshold**: N/A (all images added, no replacement needed)
- **Rotation**: N/A (all images displayed)

### Blog Images (Priority: Medium)
- **Requirements**: Score >= 7.0, category/content match, strict city match if applicable
- **Selection**: Match article topic + strict city match
- **Replacement Threshold**: +0.5 score improvement
- **Rotation**: Max 5 images per article

### Section Images (Priority: Low)
- **Requirements**: Score >= 6.5, contextual match, strict city match
- **Selection**: Rotate top 5 best fits for section content
- **Replacement Threshold**: +0.7 score improvement
- **Rotation**: Max 5 images per location

---

## 🔍 Content Context Analysis

For each placement location, analyze:
1. **Page Purpose**: What is the page trying to achieve?
2. **Section Purpose**: What does this section communicate?
3. **Surrounding Content**: What text/images are nearby?
4. **User Intent**: What is the user looking for?
5. **SEO Goals**: What keywords should be reinforced?

Example:
```json
{
  "location": "dog-grooming-madison-hero",
  "contentContext": {
    "pagePurpose": "Convert visitors to grooming bookings in Madison",
    "sectionPurpose": "Showcase professional grooming services",
    "surroundingContent": "Headline: 'Professional Dog Grooming in Madison', CTA: 'Book Appointment'",
    "userIntent": "Find trusted groomer in Madison",
    "seoKeywords": ["dog grooming madison", "professional groomer madison"],
    "idealImage": {
      "category": "Grooming / Care Close-Up",
      "city": "Madison",
      "emotion": "trustworthy, professional, happy",
      "minScore": 8.0
    }
  }
}
```

---

## 📊 Scoring Algorithm

### Placement Match Score Calculation

```javascript
function calculatePlacementScore(image, opportunity) {
  let score = 0;
  
  // Tag Match (40% weight)
  const tagMatch = image.placementTags.filter(tag => 
    opportunity.requirements.requiredTags.includes(tag)
  ).length / opportunity.requirements.requiredTags.length;
  score += tagMatch * 40;
  
  // Category Match (20% weight)
  const categoryMatch = opportunity.requirements.preferredCategories.includes(image.category) ? 1 : 0;
  score += categoryMatch * 20;
  
  // Score Above Minimum (20% weight)
  const scoreAboveMin = Math.min((image.score - opportunity.requirements.minScore) / 2, 1);
  score += scoreAboveMin * 20;
  
  // City Match (10% weight)
  const cityMatch = opportunity.requirements.preferredCities.includes(image.targetCity) ? 1 : 0;
  score += cityMatch * 10;
  
  // Content Context Match (10% weight)
  // This would use NLP/semantic analysis - simplified here
  const contextMatch = analyzeContentMatch(image, opportunity.contentContext);
  score += contextMatch * 10;
  
  return score;
}
```

---

## 🚀 Execution Plan

### Initial Setup (One-Time)

1. **Create Data Files**
   - Generate `image-placements-registry.json` from current codebase
   - Create `placement-opportunities.json` mapping all placement locations
   - Initialize `image-metadata-history.json`

2. **Create Processing Script**
   - Build `process-image-csv.js` with all logic
   - Add validation and error handling
   - Add reporting functionality

3. **Document Placement Locations**
   - Catalog all hero images
   - Catalog all section images
   - Catalog all gallery entries
   - Document content context for each

### Recurring Process (Each CSV Update)

1. **Run Processing Script**
   ```bash
   node scripts/process-image-csv.js --csv path/to/new-csv.csv --dry-run
   ```

2. **Review Recommendations**
   - Check generated report
   - Review proposed replacements
   - Approve or modify decisions

3. **Execute Updates**
   ```bash
   node scripts/process-image-csv.js --csv path/to/new-csv.csv --execute
   ```

4. **Validate Changes**
   - Run linting
   - Check image paths
   - Verify focal points
   - Review placement registry updates

---

## 📝 Registry Maintenance

### Regular Updates
- After each CSV processing run
- When manual placements are made
- When images are removed

### Registry Fields
- **Placement ID**: Unique identifier
- **Location**: Page, section, component, file, line
- **Current Image**: All metadata
- **Placement Reasoning**: Why this image was chosen
- **Replacement History**: Previous images and why replaced
- **Performance Metrics**: (Future) Track engagement/performance

---

## 🎯 Success Metrics

1. **Placement Quality**: Average image score in placements
2. **Replacement Rate**: How often better images replace existing
3. **Coverage**: Percentage of opportunities filled
4. **SEO Impact**: Image-related SEO improvements
5. **Process Efficiency**: Time to process new CSV

---

## 🔄 Future Enhancements

1. **Performance Tracking**: Track which images perform best
2. **A/B Testing**: Test different images in same location
3. **Automated Optimization**: ML-based placement recommendations
4. **Image Quality Analysis**: Automated quality scoring
5. **Duplicate Detection**: Prevent duplicate images in adjacent sections

---

## 📋 Next Steps

1. **Approve Plan**: Review and approve this approach
2. **Create Initial Registry**: Scan codebase and create registry
3. **Build Processing Script**: Develop the main script
4. **Test with First CSV**: Run through with new CSV file
5. **Refine Process**: Adjust based on results
6. **Document Workflow**: Create user guide for recurring use

---

## Configuration (Confirmed)

1. **Replacement Threshold**: 0.3-0.5 score improvement justifies replacement ✅
2. **Priority Handling**: Rotate images for same location (max 5 per spot) ✅
3. **Manual Override**: Users can lock images to prevent automatic replacement ✅
4. **Gallery Size**: No limit - all images added for SEO benefit ✅
5. **City Matching**: Strict city match required ✅

---

This plan provides a systematic, repeatable approach to image management that will scale as your image library grows and improves over time.

