# 🖼️ Image Management System - Quick Reference

## 📍 CSV File Location

**Place CSV files in the same folder as images:**

```
public/Grooming/grooming-optimization-report.csv
public/Hiking/hiking-optimization-report.csv
```

## 🚀 Process CSV

```bash
# Preview
node scripts/process-image-csv.js --csv public/Grooming/file.csv --dry-run

# Execute
node scripts/process-image-csv.js --csv public/Grooming/file.csv --execute
```

## 🔍 Find Placements

**All placements defined in:**
- `data/placement-opportunities.json`

**Search code for markers:**
```bash
grep -r "IMAGE_PLACEMENT" src/
```

**Auto-discover new placements:**
```bash
node scripts/discover-placements.js --update
```

## 📚 Full Documentation

- **Master Guide**: `IMAGE_MANAGEMENT_SYSTEM.md`
- **CSV Guide**: `CSV_PLACEMENT_GUIDE.md`
- **Markers Guide**: `IMAGE_PLACEMENT_MARKERS.md`
- **Quick Start**: `IMAGE_MANAGEMENT_QUICK_START.md`

---

**For future AI sessions**: Read `IMAGE_MANAGEMENT_SYSTEM.md` first!

