# CSV File Placement Guide

## 📁 Where to Place CSV Files

Place your CSV files in the **same directory as the images** they reference:

```
riverpaws/
├── public/
│   ├── Grooming/
│   │   ├── river-paws-optimization-report.csv  ← Place CSV here
│   │   └── [grooming images]
│   ├── Hiking/
│   │   ├── river-paws-optimization-report.csv  ← Place CSV here
│   │   └── [hiking images]
│   └── [other-categories]/
│       ├── [category]-optimization-report.csv  ← Place CSV here
│       └── [category images]
```

## 🎯 Naming Convention

Use descriptive names that indicate:
- **Category**: What type of images (Grooming, Hiking, etc.)
- **Purpose**: Optimization report, placement data, etc.

**Recommended format:**
```
[category]-optimization-report.csv
```

**Examples:**
- `grooming-optimization-report.csv`
- `hiking-optimization-report.csv`
- `transport-optimization-report.csv`

## 📋 CSV File Requirements

### Required Columns

Your CSV must include these columns (case-sensitive):

1. `Original Filename` - Current filename before renaming
2. `New SEO Filename` - Optimized filename to rename to
3. `Target City` - City for local SEO (Madison, Waunakee, DeForest, Sun Prairie, Middleton)
4. `Total Score` - Overall image score (0-10)
5. `Emotional (25%)` - Emotional score component
6. `Technical (20%)` - Technical quality score
7. `Brand (20%)` - Brand alignment score
8. `Marketing (20%)` - Marketing value score
9. `SEO (15%)` - SEO potential score
10. `Focal X (%)` - Horizontal focal point (0-100)
11. `Focal Y (%)` - Vertical focal point (0-100)
12. `Category` - Image category (e.g., "Adventure / Hiking", "Grooming / Care Close-Up")
13. `Alt Text` - SEO-optimized alt text
14. `Caption` - Image caption/title
15. `Placement Tags` - Semicolon-separated tags (e.g., "Homepage Hero; Services; Gallery")
16. `Reasoning` - Why this image was scored/placed this way

### CSV Format Example

```csv
Original Filename,New SEO Filename,Target City,Total Score,Emotional (25%),Technical (20%),Brand (20%),Marketing (20%),SEO (15%),Focal X (%),Focal Y (%),Category,Alt Text,Caption,Placement Tags,Reasoning
image1.jpg,happy-dog-madison-wi-river-paws.jpg,Madison,8.5,9,8,9,8,7,50,40,Adventure / Hiking,"A happy dog...","Happy adventures!",Homepage Hero; Services; Gallery,"High emotional score..."
```

## 🚀 Processing CSV Files

### Step 1: Place CSV in Image Directory

Put your CSV file in the same folder as the images:
```
public/Grooming/your-csv-file.csv
```

### Step 2: Run Processing Script

```bash
# Preview changes
node scripts/process-image-csv.js --csv public/Grooming/your-csv-file.csv --dry-run

# Execute changes
node scripts/process-image-csv.js --csv public/Grooming/your-csv-file.csv --execute
```

### Step 3: Verify Results

- Check updated page files
- Review gallery.ts updates
- Verify focal points in imageFocalPoints.ts
- Check registry.json for tracking

## 🔍 How the Script Finds CSV Files

The script uses the **exact path you provide**. It does NOT auto-discover CSV files.

**You must specify the full path:**
```bash
# ✅ Correct
node scripts/process-image-csv.js --csv public/Grooming/my-file.csv

# ❌ Wrong (script won't find it)
node scripts/process-image-csv.js --csv my-file.csv
```

## 📝 Best Practices

1. **One CSV per Category**: Keep separate CSV files for each image category
2. **Consistent Naming**: Use consistent naming across CSV files
3. **Version Control**: Commit CSV files to track changes over time
4. **Backup Before Processing**: Always commit before running execute mode
5. **Document Changes**: Note what changed in each CSV update

## 🆕 Adding New Categories

When adding a new image category:

1. Create folder: `public/[NewCategory]/`
2. Add images to folder
3. Create CSV: `public/[NewCategory]/[category]-optimization-report.csv`
4. Update placement opportunities if needed
5. Process CSV as normal

## 🔄 Workflow Summary

```
1. Place CSV in image directory
   ↓
2. Run dry-run to preview
   ↓
3. Review recommendations
   ↓
4. Run execute to apply
   ↓
5. Verify changes
   ↓
6. Commit to version control
```

---

**Remember**: The CSV file path must be relative to the `riverpaws/` directory root, or use an absolute path.

