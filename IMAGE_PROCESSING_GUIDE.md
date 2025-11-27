# Image Processing Guide

## Quick Start

**One script does everything:**

```bash
# Preview changes (recommended first)
node scripts/process-images.js --csv public/Hiking/your-file.csv --dry-run

# Apply changes
node scripts/process-images.js --csv public/Hiking/your-file.csv
```

## What It Does

The `process-images.js` script handles the complete pipeline:

1. ✅ **Validates** CSV structure and file system
2. ✅ **Finds & removes** duplicate image files
3. ✅ **Cleans** broken gallery references
4. ✅ **Creates** automatic backup
5. ✅ **Processes** images (renames, updates focal points)
6. ✅ **Validates** results (no duplicates, no missing images)
7. ✅ **Tests** build to ensure everything works

## Options

- `--dry-run` - Preview changes without applying them
- `--skip-backup` - Skip creating backup (not recommended)
- `--skip-build` - Skip build test after processing
- `--auto-approve` - Auto-approve after dry run (for automation)

## CSV Format

Your CSV should have these columns:
- `Original Filename` - Current filename
- `New SEO Filename` - New optimized filename
- `Focal X (%)` - Focal point X coordinate (0-100)
- `Focal Y (%)` - Focal point Y coordinate (0-100)
- `Alt Text` - Image alt text
- `Caption` - Image caption

## Example

```bash
# Step 1: Preview
node scripts/process-images.js --csv public/Hiking/images.csv --dry-run

# Step 2: Review output, then execute
node scripts/process-images.js --csv public/Hiking/images.csv
```

## Rollback

If something goes wrong, backups are in `backups/` directory:
```bash
# Restore from backup
cp backups/2025-11-23T02-57-21/src/constants/gallery.ts src/constants/gallery.ts
```

## That's It!

No need to remember multiple scripts - just use `process-images.js` for everything.

