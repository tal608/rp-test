# Quick Start: Image Processing Workflow

**Use this guide for your next image processing run.**

---

## 🚀 Quick Start (Recommended)

### Option 1: Master Workflow (Easiest)

```bash
# Run complete workflow with auto-approval
node scripts/process-images-workflow.js --csv public/Hiking/new-images.csv --auto-approve
```

This will:
1. ✅ Validate CSV structure
2. ✅ Validate file system
3. ✅ Validate codebase
4. ✅ Create backup
5. ✅ Run dry run
6. ✅ Execute processing
7. ✅ Validate results
8. ✅ Test build

---

## 📋 Step-by-Step (Manual Control)

### Step 1: Pre-Flight Validation

```bash
# Validate CSV
node scripts/validate-csv.js --csv public/Hiking/new-images.csv

# Validate file system
node scripts/validate-filesystem.js --csv public/Hiking/new-images.csv

# Validate codebase
node scripts/validate-codebase.js
```

**If any fail, fix issues before proceeding.**

### Step 2: Create Backup

```bash
node scripts/create-backup.js
```

**Always create a backup before processing!**

### Step 3: Dry Run

```bash
node scripts/process-image-csv.js --csv public/Hiking/new-images.csv --dry-run
```

**Review the output carefully before proceeding.**

### Step 4: Execute

```bash
node scripts/process-image-csv.js --csv public/Hiking/new-images.csv --execute
```

### Step 5: Validate Results

```bash
# Check for duplicates and validate
node scripts/validate-after-processing.js

# Test build
npm run build
```

---

## 🔄 If Something Goes Wrong

### Rollback to Backup

```bash
# List available backups
ls backups/

# Rollback to specific backup
node scripts/rollback.js --backup backups/2025-11-23T02-53-47

# Then verify
npm run build
```

---

## 📁 Where to Place CSV Files

Place CSV files in the same directory as the images:

```
public/
├── Hiking/
│   ├── new-images.csv  ← CSV goes here
│   └── [image files]
└── Grooming/
    ├── new-images.csv  ← Or here
    └── [image files]
```

Then reference with:
```bash
node scripts/process-images-workflow.js --csv public/Hiking/new-images.csv
```

---

## ✅ Success Checklist

After processing, verify:
- ✅ No duplicate images in gallery (`node scripts/find-duplicates.js`)
- ✅ Build succeeds (`npm run build`)
- ✅ All images display correctly
- ✅ No console errors

---

## 🆘 Troubleshooting

### CSV Validation Fails
- Check CSV has all required columns
- Verify original filenames match actual files
- Check focal points are 0-100

### File System Validation Fails
- Ensure target directory exists
- Check file permissions
- Verify disk space

### Codebase Validation Fails
- Run `npm run build` to see TypeScript errors
- Check JSON files are valid
- Verify placement markers exist

### Build Fails After Processing
- Rollback to backup
- Check error messages
- Fix issues manually
- Re-run validation

---

## 📚 Full Documentation

- **Workflow Details**: `IDEAL_WORKFLOW_IMAGE_PROCESSING.md`
- **Lessons Learned**: `LESSONS_LEARNED_IMAGE_PROCESSING.md`
- **Implementation**: `WORKFLOW_IMPLEMENTATION_COMPLETE.md`

---

**Ready to process images? Use the master workflow command above!** 🚀

