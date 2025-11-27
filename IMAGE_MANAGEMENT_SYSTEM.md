# Image Management System - Master Guide

## 🎯 System Overview

This is a **repeatable, intelligent image management pipeline** for the River Paws website. It processes CSV files with image optimization data and automatically places images across the site based on SEO scores, metadata, and content context.

## 📍 Quick Answers to Common Questions

### Where do I place CSV files?

**Place CSV files in the same directory as the images:**

```
public/
├── Grooming/
│   ├── grooming-optimization-report.csv  ← CSV goes here
│   └── [grooming images]
├── Hiking/
│   ├── hiking-optimization-report.csv    ← CSV goes here
│   └── [hiking images]
└── [other-categories]/
    ├── [category]-optimization-report.csv
    └── [category images]
```

**Then reference with full path:**
```bash
node scripts/process-image-csv.js --csv public/Grooming/grooming-optimization-report.csv
```

### Will AI know to add placement opportunities?

**YES - Two ways:**

1. **Automatic Discovery**: Run discovery script when new pages added
   ```bash
   node scripts/discover-placements.js --update
   ```

2. **Manual Addition**: Edit `data/placement-opportunities.json` directly

3. **Code Markers**: Use placement markers in code (see below)

### Do we need to clean up markup?

**YES - Use these markers for future AI sessions:**

```tsx
{/* IMAGE_PLACEMENT_START: placement-id */}
<Image src="..." />
{/* IMAGE_PLACEMENT_END: placement-id */}
```

**Search for placements:**
```bash
grep -r "IMAGE_PLACEMENT" src/
```

## 📁 File Structure

```
riverpaws/
├── data/                                    ← System data files
│   ├── placement-opportunities.json         ← ALL placement locations
│   └── image-placements-registry.json      ← Current placements tracking
├── scripts/                                 ← Processing scripts
│   ├── process-image-csv.js                ← Main CSV processor
│   └── discover-placements.js              ← Auto-discover new placements
├── public/                                  ← Images and CSV files
│   ├── Grooming/
│   │   ├── *.csv                           ← CSV files here
│   │   └── *.jpg                           ← Images here
│   └── Hiking/
│       ├── *.csv
│       └── *.jpg
├── src/
│   ├── lib/
│   │   └── imageFocalPoints.ts             ← Focal point mappings
│   └── constants/
│       └── gallery.ts                      ← Gallery definitions
└── [Documentation files]
    ├── IMAGE_MANAGEMENT_SYSTEM.md          ← This file (master guide)
    ├── CSV_PLACEMENT_GUIDE.md              ← CSV placement details
    ├── IMAGE_PLACEMENT_MARKERS.md          ← Code markers guide
    └── IMAGE_MANAGEMENT_QUICK_START.md     ← Quick start guide
```

## 🔄 Complete Workflow

### Step 1: Prepare CSV File

1. Create CSV with image optimization data
2. Place in `public/[category]/` folder
3. Name it descriptively: `[category]-optimization-report.csv`

### Step 2: Discover New Placements (if needed)

When new pages/sections are added:

```bash
# Preview discovered placements
node scripts/discover-placements.js

# Add to opportunities file
node scripts/discover-placements.js --update
```

### Step 3: Process CSV

```bash
# Preview changes (ALWAYS do this first)
node scripts/process-image-csv.js --csv public/Grooming/grooming-optimization-report.csv --dry-run

# Review report

# Execute changes
node scripts/process-image-csv.js --csv public/Grooming/grooming-optimization-report.csv --execute
```

### Step 4: Verify & Commit

1. Check updated files
2. Test site
3. Commit changes

## 🎨 Code Markers for Sustainability

### Placement Markers

**Always use these markers when adding/modifying image placements:**

```tsx
{/* IMAGE_PLACEMENT_START: placement-id */}
<Image
  src="/path/to/image.jpg"
  alt="..."
/>
{/* IMAGE_PLACEMENT_END: placement-id */}
```

**Placement IDs match `data/placement-opportunities.json`:**

- `homepage-hero`
- `dog-grooming-hero`
- `dog-hikes-hero`
- `homepage-adventure-hikes-card`
- `gallery-category-grooming`
- etc.

### Why Markers Matter

- **Future AI sessions** can find placements quickly
- **Discovery script** can parse markers
- **Documentation** stays in sync with code
- **Maintenance** is easier

## 🔍 How Future Sessions Find Placements

### Method 1: Check Opportunities File

```bash
cat data/placement-opportunities.json
```

This file contains ALL placement locations.

### Method 2: Search Code Markers

```bash
grep -r "IMAGE_PLACEMENT" src/
```

Finds all marked placements.

### Method 3: Run Discovery Script

```bash
node scripts/discover-placements.js
```

Auto-discovers new placements.

### Method 4: Search Image Components

```bash
grep -r "<Image" src/app/
```

Finds all Image components.

## 📋 CSV File Requirements

### Required Columns

Your CSV must have these exact column names:

1. `Original Filename`
2. `New SEO Filename`
3. `Target City`
4. `Total Score`
5. `Emotional (25%)`
6. `Technical (20%)`
7. `Brand (20%)`
8. `Marketing (20%)`
9. `SEO (15%)`
10. `Focal X (%)`
11. `Focal Y (%)`
12. `Category`
13. `Alt Text`
14. `Caption`
15. `Placement Tags` (semicolon-separated)
16. `Reasoning`

### Placement Tags Format

Semicolon-separated, e.g.:
```
Homepage Hero; Services; Gallery; Social
```

Common tags:
- `Homepage Hero`
- `Services`
- `Gallery`
- `Social`
- `Banner`
- `About/Team`

## 🛠️ Maintenance Tasks

### When Adding New Pages

1. Add placement markers to code
2. Run discovery script: `node scripts/discover-placements.js --update`
3. Review new opportunities in `data/placement-opportunities.json`
4. Process CSV as normal

### When CSV Format Changes

1. Update `scripts/process-image-csv.js` parseCSV function
2. Update `CSV_PLACEMENT_GUIDE.md`
3. Test with sample CSV

### Regular Maintenance

- **Monthly**: Run discovery script to catch new placements
- **After CSV updates**: Review registry for accuracy
- **Quarterly**: Review and clean up old placements

## 🚨 Important Notes

### CSV Location
- **MUST** be in `public/[category]/` folder
- **MUST** use full path when running script
- Script does NOT auto-discover CSV files

### City Matching
- **STRICT** matching enforced
- City-specific pages require exact city match
- No fallback to nearby cities

### Rotation Limits
- Max 5 images per placement (except gallery)
- Gallery has NO limit (all images added)
- Rotations update on each CSV processing

### Locking Images
- Lock in `data/placement-opportunities.json` → `lockedImages` array
- Or set `locked: true` in registry
- Locked images cannot be replaced

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `IMAGE_MANAGEMENT_SYSTEM.md` | **Master guide** (this file) |
| `CSV_PLACEMENT_GUIDE.md` | CSV file placement and format |
| `IMAGE_PLACEMENT_MARKERS.md` | Code markers for AI discovery |
| `IMAGE_MANAGEMENT_QUICK_START.md` | Quick start workflow |
| `IMAGE_MANAGEMENT_PIPELINE_PLAN.md` | Full system architecture |
| `scripts/README.md` | Script documentation |

## 🔄 For Future AI Sessions

**To understand this system quickly:**

1. Read `IMAGE_MANAGEMENT_SYSTEM.md` (this file)
2. Check `data/placement-opportunities.json` for all placements
3. Search for `IMAGE_PLACEMENT` markers in code
4. Run `node scripts/discover-placements.js` to find new ones
5. Process CSV: `node scripts/process-image-csv.js --csv [path] --dry-run`

**Key files to check:**
- `data/placement-opportunities.json` - All placement locations
- `data/image-placements-registry.json` - Current placements
- `src/lib/imageFocalPoints.ts` - Focal point mappings
- `src/constants/gallery.ts` - Gallery definitions

## ✅ Sustainability Checklist

- [x] CSV placement location documented
- [x] Code markers added for discovery
- [x] Discovery script created
- [x] Opportunities file structure defined
- [x] Registry tracking implemented
- [x] Documentation complete
- [x] Quick start guide created
- [x] Master guide created

## 🎯 Next Steps

1. **Test the system**: Run with your first CSV
2. **Add markers**: Add placement markers to existing code
3. **Run discovery**: Discover any missed placements
4. **Extend execute**: Build out full automation if desired

---

**This system is designed to be sustainable and discoverable by future AI sessions.**

