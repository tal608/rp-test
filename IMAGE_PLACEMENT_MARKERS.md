# Image Placement Markers - For AI/Future Sessions

## 🎯 Purpose

This document explains the code markers and structure used for image placement management. Future AI sessions should reference this to understand the system.

## 📍 Code Markers

### Image Placement Comments

When adding or modifying image placements, use these comment markers:

```tsx
{/* IMAGE_PLACEMENT_START: homepage-hero */}
<Image
  src="/Hiking/happy-labmix-field-madison-wi-river-paws.jpg"
  alt="..."
  // ... other props
/>
{/* IMAGE_PLACEMENT_END: homepage-hero */}
```

### Placement Opportunity IDs

Each placement location has a unique ID in `data/placement-opportunities.json`. Use these IDs in comments:

- `homepage-hero` - Homepage hero section
- `dog-grooming-hero` - Dog grooming page hero
- `dog-hikes-hero` - Dog hikes page hero
- `homepage-adventure-hikes-card` - Homepage service card
- `gallery-category-[category]` - Gallery category entries

## 🔍 How to Discover Placements

### Automatic Discovery

Run the discovery script to find new placements:

```bash
# Preview discovered placements
node scripts/discover-placements.js

# Add to opportunities file
node scripts/discover-placements.js --update
```

### Manual Discovery

When adding new pages/sections with images:

1. **Add to opportunities file**: Edit `data/placement-opportunities.json`
2. **Add placement comment**: Use markers above
3. **Update registry**: After processing CSV, registry auto-updates

## 📋 File Structure for AI Understanding

### Key Files

```
riverpaws/
├── data/
│   ├── placement-opportunities.json    ← ALL placement locations defined here
│   └── image-placements-registry.json  ← Current placements tracked here
├── scripts/
│   ├── process-image-csv.js            ← Main CSV processor
│   └── discover-placements.js          ← Auto-discover new placements
├── src/
│   ├── lib/
│   │   └── imageFocalPoints.ts        ← Focal point mappings
│   └── constants/
│       └── gallery.ts                  ← Gallery image definitions
└── [CSV files in public/[category]/]
```

### How to Find Placement Locations

1. **Check opportunities file**: `data/placement-opportunities.json` has all locations
2. **Search for Image components**: Look for `<Image` in `src/app/**/*.tsx`
3. **Check gallery.ts**: Gallery placements are in `src/constants/gallery.ts`
4. **Run discovery script**: Auto-finds new placements

## 🎨 Placement ID Format

Placement IDs follow this pattern:
```
[page]-[section]-[type]
```

Examples:
- `homepage-hero` - Homepage hero section
- `dog-grooming-madison-hero` - City-specific page hero
- `homepage-adventure-hikes-card` - Service card on homepage
- `gallery-category-grooming` - Gallery category

## 🔄 When Adding New Placements

### Step 1: Add to Opportunities

Edit `data/placement-opportunities.json`:

```json
{
  "id": "new-page-hero",
  "page": "new-page",
  "section": "hero",
  "file": "src/app/new-page/page.tsx",
  "requirements": {
    "minScore": 8.0,
    "requiredTags": ["Services"],
    "preferredCategories": ["Adventure / Hiking"],
    "preferredCities": ["Madison"],
    "contentContext": "Description of placement",
    "priority": "high"
  },
  "maxRotations": 5,
  "rotationEnabled": true,
  "lockedImages": []
}
```

### Step 2: Add Comment Marker

In the code file:

```tsx
{/* IMAGE_PLACEMENT: new-page-hero */}
<Image src="..." />
```

### Step 3: Process CSV

The script will automatically match images to this new opportunity.

## 🧹 Cleanup Checklist

Before ending a session, ensure:

- [ ] All new placements added to `placement-opportunities.json`
- [ ] Placement comments added to code files
- [ ] Registry updated after CSV processing
- [ ] Gallery categories updated if needed
- [ ] Focal points added to `imageFocalPoints.ts`
- [ ] Documentation updated

## 🔍 Search Patterns for AI

To find image placements, search for:

1. **Image components**: `grep -r "<Image" src/app/`
2. **Placement comments**: `grep -r "IMAGE_PLACEMENT" src/`
3. **Hero sections**: `grep -r "hero" src/app/**/*.tsx`
4. **Gallery entries**: Check `src/constants/gallery.ts`

## 📝 Registry Structure

The registry tracks:
- Current image in each placement
- Why it was placed there
- Replacement history
- Lock status

**Key fields:**
- `id` - Placement opportunity ID
- `currentImage` - Current image metadata
- `locked` - Whether image is locked
- `placementReasoning` - Why this image was chosen

## 🚨 Important Notes for Future Sessions

1. **CSV Location**: CSV files go in `public/[category]/` folders
2. **Strict City Match**: City-specific pages require exact city match
3. **Rotation Limit**: Max 5 images per placement (except gallery)
4. **Gallery**: No limit - all qualifying images added
5. **Lock Support**: Check `lockedImages` array before replacing

## 🔄 Maintenance Tasks

### Regular Maintenance

1. **Run discovery script** when new pages added
2. **Update opportunities** when site structure changes
3. **Review registry** periodically for accuracy
4. **Clean up old placements** if pages removed

### After Major Site Changes

1. Run `discover-placements.js --update`
2. Review new opportunities
3. Process any pending CSV files
4. Verify all placements still valid

---

**For Future AI Sessions**: Reference this document and `IMAGE_MANAGEMENT_QUICK_START.md` to understand the system quickly.

