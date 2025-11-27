# Image Processing - Quick Start Guide

## 🚀 One Command Does Everything

```bash
# Dry run (preview changes)
node scripts/process-images.js --csv "public/Hiking/file.csv"

# Execute (apply changes)
node scripts/process-images.js --csv "public/Hiking/file.csv" --execute
```

## What It Does Automatically

1. ✅ **Validates CSV** - Checks structure and required columns
2. ✅ **Validates filesystem** - Ensures directories exist
3. ✅ **Validates codebase** - Checks for syntax errors
4. ✅ **Finds duplicates** - Detects duplicate image files (same content, different names)
5. ✅ **Cleans broken references** - Removes images from gallery that don't exist
6. ✅ **Creates backup** - Backs up critical files before changes
7. ✅ **Processes images** - Renames, places, updates focal points
8. ✅ **Validates results** - Checks for duplicates, syntax errors, missing images
9. ✅ **Tests build** - Runs safe build test (won't crash on errors)

## Options

- `--execute` - Apply changes (default: dry-run)
- `--skip-backup` - Skip creating backup
- `--skip-build` - Skip build test
- `--skip-cleanup` - Skip cleaning broken references
- `--skip-duplicates` - Skip checking for duplicate files

## Examples

```bash
# Preview what will happen
node scripts/process-images.js --csv "public/Hiking/new-images.csv"

# Apply changes
node scripts/process-images.js --csv "public/Hiking/new-images.csv" --execute

# Skip backup (faster, but no rollback)
node scripts/process-images.js --csv "public/Hiking/new-images.csv" --execute --skip-backup

# Process without build test (faster)
node scripts/process-images.js --csv "public/Hiking/new-images.csv" --execute --skip-build
```

## Rollback

If something goes wrong:

```bash
node scripts/rollback.js --backup [backup-dir-name]
```

Backup directories are in `backups/` folder with timestamps.

## Troubleshooting

**"Original file not found"** - This is OK if images were already processed. The script checks for new filenames too.

**"Duplicate files found"** - Remove duplicate files first:
```bash
node scripts/find-duplicate-image-files.js
```

**Build fails** - Check the error output. The safe build test shows last 50 lines of output.

