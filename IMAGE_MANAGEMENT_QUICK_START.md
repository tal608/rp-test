# Image Management Pipeline - Quick Start Guide

## 🚀 Getting Started

This pipeline provides a repeatable, intelligent system for managing images across your website based on CSV optimization data.

## 📋 Prerequisites

- Node.js installed
- CSV files with image optimization data
- Image files in appropriate folders (`public/Grooming/`, `public/Hiking/`, etc.)

## 🔄 Workflow

### Step 1: Prepare Your CSV

Your CSV should follow this format (matching your existing CSV structure):

```csv
Original Filename,New SEO Filename,Target City,Total Score,Emotional (25%),Technical (20%),Brand (20%),Marketing (20%),SEO (15%),Focal X (%),Focal Y (%),Category,Alt Text,Caption,Placement Tags,Reasoning
```

**Key Columns:**
- `New SEO Filename`: The optimized filename
- `Target City`: City for local SEO (Madison, Waunakee, etc.)
- `Total Score`: Overall image score (0-10)
- `Placement Tags`: Semicolon-separated tags (e.g., "Homepage Hero; Services; Gallery")
- `Focal X (%)` / `Focal Y (%)`: Focal point coordinates

### Step 2: Run Processing Script

```bash
# Preview changes (recommended first step)
node scripts/process-image-csv.js --csv path/to/your-file.csv --dry-run

# Review the report, then execute
node scripts/process-image-csv.js --csv path/to/your-file.csv --execute
```

### Step 3: Review Report

The script will show:
- ✅ **New Placements**: Images matched to new locations
- 🔄 **Replacements**: Better images replacing current ones
- 🔄 **Rotations**: Additional images added to rotation pools
- 🖼️ **Gallery Additions**: Images added to gallery categories
- ⏭️ **Skipped**: Images that didn't match any opportunities

### Step 4: Verify Changes

After execution:
1. Check updated page files
2. Verify gallery.ts updates
3. Confirm focal points in imageFocalPoints.ts
4. Review registry.json for tracking

## 🎯 How It Works

### Matching Logic

Images are matched to placement opportunities based on:

1. **Placement Tags** (40% weight)
   - Image must have at least one required tag
   - Example: "Homepage Hero" tag → matches homepage hero opportunity

2. **Category Match** (20% weight)
   - Image category should match preferred categories
   - Example: "Adventure / Hiking" → matches hiking page opportunities

3. **Score Threshold** (20% weight)
   - Image must meet minimum score requirement
   - Higher scores get better placement priority

4. **City Match** (10% weight) - **STRICT**
   - For city-specific pages, exact city match required
   - Example: Madison page → only Madison images

5. **Content Context** (10% weight)
   - Analyzes surrounding content for best fit

### Replacement Rules

Images are replaced when:
- New image score ≥ current score + threshold
- Thresholds: Critical (0.3), High (0.5), Medium (0.7), Low (1.0)
- Current image is not locked
- New image is not in locked list

### Rotation System

- Up to 5 images per placement location
- Rotates on each CSV update
- Maintains variety while keeping best performers

### Locking Images

To lock an image to a placement:
1. Edit `data/placement-opportunities.json`
2. Add image filename to `lockedImages` array for that opportunity
3. Or set `locked: true` in registry placement

## 📁 File Structure

```
riverpaws/
├── data/
│   ├── image-placements-registry.json    # Tracks all current placements
│   └── placement-opportunities.json        # Defines all placement locations
├── scripts/
│   ├── process-image-csv.js              # Main processing script
│   └── README.md                         # Script documentation
└── [your CSV files]
```

## 🔧 Configuration

### Adjust Replacement Thresholds

Edit `scripts/process-image-csv.js`:

```javascript
const CONFIG = {
  replacementThresholds: {
    critical: 0.3,  // Hero images
    high: 0.5,      // Service pages
    medium: 0.7,   // Section images
    low: 1.0        // Supporting images
  },
  maxRotations: 5,
  strictCityMatch: true
};
```

### Add New Placement Opportunities

Edit `data/placement-opportunities.json`:

```json
{
  "id": "new-placement-id",
  "page": "page-name",
  "section": "section-name",
  "file": "src/app/page.tsx",
  "requirements": {
    "minScore": 8.0,
    "requiredTags": ["Services"],
    "preferredCategories": ["Grooming / Care Close-Up"],
    "preferredCities": ["Madison"],
    "contentContext": "Description of placement context"
  },
  "maxRotations": 5,
  "rotationEnabled": true
}
```

## 📊 Understanding Reports

### Example Output

```
📋 PROCESSING REPORT
═══════════════════════════════════════════════════════════

✅ New Placements: 3
   - homepage-hero: happy-labmix-field-madison-wi-river-paws.jpg (score: 8.8, match: 85.2)
   - dog-grooming-hero: grooming-transformation-doodle-madison-wi-river-paws.jpg (score: 8.5, match: 78.5)

🔄 Replacements: 2
   - homepage-hero:
     Current: old-image.jpg (score: 8.2)
     New: happy-labmix-field-madison-wi-river-paws.jpg (score: 8.8, improvement: +0.60)
     Reason: Score improvement: 0.60 (threshold: 0.3)

🖼️  Gallery Additions: 45
   - grooming: 18 images
   - hiking: 27 images
```

## 🛡️ Safety Features

1. **Dry Run Default**: Script defaults to dry-run mode
2. **Lock Protection**: Locked images cannot be replaced
3. **Validation**: Checks file existence and data integrity
4. **Backup Recommendation**: Always commit before executing

## 🔄 Recurring Process

Each time you get a new CSV:

1. **Run Dry Run**: `node scripts/process-image-csv.js --csv new-file.csv --dry-run`
2. **Review Report**: Check recommendations make sense
3. **Execute**: `node scripts/process-image-csv.js --csv new-file.csv --execute`
4. **Verify**: Check updated files and test site
5. **Commit**: Save changes to version control

## 💡 Tips

- **Start with Dry Run**: Always preview before executing
- **Review Skipped Images**: May indicate missing opportunities
- **Check Replacements**: Verify score improvements are meaningful
- **Monitor Rotations**: Ensure variety in rotated images
- **Update Opportunities**: Add new placement locations as site grows

## 🐛 Troubleshooting

### "CSV file not found"
- Check file path is correct
- Use absolute path if relative doesn't work

### "No matching opportunities"
- Check image has required tags
- Verify score meets minimum
- Confirm city match (if strict)

### "Image skipped"
- Review skipped reasons in report
- May need to add new opportunity or adjust requirements

## 📚 Related Documentation

- `IMAGE_MANAGEMENT_PIPELINE_PLAN.md` - Full system architecture
- `scripts/README.md` - Script-specific documentation
- `data/placement-opportunities.json` - All placement locations

## 🎯 Next Steps

1. Test with your first CSV file
2. Review and refine placement opportunities
3. Adjust thresholds based on results
4. Add new opportunities as site evolves
5. Build out execute function for full automation

---

**Ready to start?** Run your first dry-run and see what the system recommends!

