# Ideal Workflow: Image Processing Pipeline

**Goal**: Process new images from CSV without bugs, duplicates, or corruption.

---

## 📋 Pre-Processing Checklist

### 1. **Validate CSV Structure**
```bash
node scripts/validate-csv.js --csv public/Hiking/new-images.csv
```

**Checks:**
- ✅ All required columns present
- ✅ No empty required fields
- ✅ Valid focal point coordinates (0-100)
- ✅ Valid scores (0-10)
- ✅ No duplicate filenames
- ✅ All original files exist

### 2. **Validate File System**
```bash
node scripts/validate-filesystem.js --csv public/Hiking/new-images.csv
```

**Checks:**
- ✅ All original image files exist
- ✅ Target directory exists and is writable
- ✅ No naming conflicts (new filename already exists)
- ✅ Sufficient disk space

### 3. **Validate Codebase State**
```bash
node scripts/validate-codebase.js
```

**Checks:**
- ✅ All placement markers exist
- ✅ No syntax errors in target files
- ✅ Registry JSON is valid
- ✅ Opportunities JSON is valid
- ✅ Gallery.ts is valid TypeScript

---

## 🔄 Processing Workflow

### Step 1: **Create Backup**
```bash
node scripts/create-backup.js
```
- Creates timestamped backup of:
  - All modified `.tsx` files
  - `gallery.ts`
  - `imageFocalPoints.ts`
  - `image-placements-registry.json`
- Stores in `backups/YYYY-MM-DD-HHMMSS/`

### Step 2: **Dry Run with Full Validation**
```bash
node scripts/process-image-csv.js --csv public/Hiking/new-images.csv --dry-run --validate
```

**Enhanced Dry Run:**
- ✅ Validates all replacements would work
- ✅ Checks for duplicate images
- ✅ Validates focal point insertion points
- ✅ Checks for missing markers
- ✅ Generates detailed report

### Step 3: **Review Report**
- Check for:
  - Duplicate images (skip or handle)
  - Missing images (skip)
  - Invalid placements (skip)
  - Warnings (review)

### Step 4: **Execute with Safety Checks**
```bash
node scripts/process-image-csv.js --csv public/Hiking/new-images.csv --execute --safe-mode
```

**Safe Mode Features:**
- ✅ Validates each step before proceeding
- ✅ Stops on first error (with option to continue)
- ✅ Creates checkpoint after each major step
- ✅ Validates file syntax after each write

### Step 5: **Post-Process Validation**
```bash
node scripts/validate-after-processing.js
```

**Checks:**
- ✅ All modified files are valid TypeScript
- ✅ No duplicate images in gallery
- ✅ All image references exist
- ✅ Build succeeds
- ✅ Registry is consistent

### Step 6: **Build Test**
```bash
npm run build
```
- Must succeed before considering complete

---

## 🛡️ Safety Features

### 1. **Duplicate Prevention**

**In Gallery Updates:**
```javascript
// Before adding, check if image already exists
const existingImages = galleryCategory.map(img => img.src);
if (existingImages.includes(newImagePath)) {
  console.warn(`   ⚠️  Skipping duplicate: ${newImagePath}`);
  continue;
}
```

**In Placement Updates:**
```javascript
// Check if image already placed at this location
const existingPlacement = registry.placements.find(p => 
  p.id === opp.id && 
  p.currentImages.some(img => img.path === imagePath)
);
if (existingPlacement) {
  console.warn(`   ⚠️  Image already placed at ${opp.id}`);
  continue;
}
```

### 2. **Backup & Rollback**

**Before Processing:**
```bash
# Automatic backup
node scripts/create-backup.js
```

**If Issues:**
```bash
# Rollback to last backup
node scripts/rollback.js --backup backups/2025-11-23-143022
```

### 3. **Checkpoint System**

After each major step:
- ✅ Rename files → Checkpoint 1
- ✅ Update focal points → Checkpoint 2
- ✅ Update page files → Checkpoint 3
- ✅ Update gallery → Checkpoint 4
- ✅ Update registry → Checkpoint 5

If error occurs, can rollback to last checkpoint.

### 4. **Validation at Each Step**

```javascript
function validateAfterStep(stepName, modifiedFiles) {
  // Validate TypeScript syntax
  for (const file of modifiedFiles) {
    const result = validateTypeScript(file);
    if (!result.valid) {
      throw new Error(`Syntax error in ${file} after ${stepName}`);
    }
  }
  
  // Validate JSON files
  validateJSON('data/image-placements-registry.json');
  validateJSON('data/placement-opportunities.json');
}
```

---

## 🔧 Script Improvements Needed

### 1. **Add Duplicate Detection to updateGallery()**

```javascript
function updateGallery(recommendations, images) {
  // ... existing code ...
  
  // Before adding, check for duplicates
  const existingImages = new Set();
  const categoryPattern = new RegExp(`${category}:\\s*\\[([\\s\\S]*?)\\]`, 'g');
  const match = categoryPattern.exec(content);
  
  if (match) {
    const existingContent = match[1];
    const existingSrcs = [...existingContent.matchAll(/src:\s*["']([^"']+)["']/g)];
    existingSrcs.forEach(m => existingImages.add(m[1]));
  }
  
  // Filter out duplicates
  const newImages = categoryImages.filter(img => {
    const imagePath = `/${img.directory || imageDir}/${img.newFilename}`;
    if (existingImages.has(imagePath)) {
      console.warn(`   ⚠️  Skipping duplicate: ${imagePath}`);
      return false;
    }
    return true;
  });
  
  // Only add non-duplicates
  // ... rest of code ...
}
```

### 2. **Add Pre-Flight Validation Function**

```javascript
function validateBeforeProcessing(csvPath, images) {
  const errors = [];
  const warnings = [];
  
  // Validate CSV structure
  const requiredColumns = ['Original Filename', 'New SEO Filename', 'Alt Text', 'Focal X (%)', 'Focal Y (%)'];
  // ... validation logic ...
  
  // Validate files exist
  for (const image of images) {
    const oldPath = path.join(__dirname, '..', 'public', image.directory, image.originalFilename);
    if (!fs.existsSync(oldPath)) {
      errors.push(`Original file not found: ${oldPath}`);
    }
  }
  
  // Validate no conflicts
  const newFilenames = new Set();
  for (const image of images) {
    if (newFilenames.has(image.newFilename)) {
      errors.push(`Duplicate new filename: ${image.newFilename}`);
    }
    newFilenames.add(image.newFilename);
  }
  
  return { errors, warnings, valid: errors.length === 0 };
}
```

### 3. **Add Post-Process Validation**

```javascript
function validateAfterProcessing() {
  const errors = [];
  
  // Check for duplicate images in gallery
  const galleryContent = fs.readFileSync(PATHS.gallery, 'utf-8');
  const allSrcs = [...galleryContent.matchAll(/src:\s*["']([^"']+)["']/g)];
  const srcCounts = {};
  allSrcs.forEach(m => {
    srcCounts[m[1]] = (srcCounts[m[1]] || 0) + 1;
  });
  
  const duplicates = Object.entries(srcCounts).filter(([src, count]) => count > 1);
  if (duplicates.length > 0) {
    errors.push(`Found ${duplicates.length} duplicate images in gallery`);
    duplicates.forEach(([src, count]) => {
      errors.push(`  - ${src}: ${count} times`);
    });
  }
  
  // Validate TypeScript syntax
  // ... syntax validation ...
  
  // Validate all image references exist
  // ... file existence checks ...
  
  return { errors, valid: errors.length === 0 };
}
```

---

## 📝 Updated Script Structure

### New Functions Needed:

1. **`validateCSV(csvPath)`** - Validate CSV structure
2. **`validateFilesystem(images)`** - Validate file system state
3. **`validateCodebase()`** - Validate codebase state
4. **`createBackup()`** - Create backup before processing
5. **`checkForDuplicates(galleryContent, newImages)`** - Check for duplicates
6. **`validateAfterStep(stepName, files)`** - Validate after each step
7. **`validateAfterProcessing()`** - Final validation
8. **`rollback(backupPath)`** - Rollback to backup

### Modified Functions:

1. **`updateGallery()`** - Add duplicate checking
2. **`updatePageFiles()`** - Add validation after each file write
3. **`updateFocalPoints()`** - Validate insertion point before inserting
4. **`executeUpdates()`** - Add checkpoint system

---

## 🎯 Success Criteria

Before considering processing complete:

- ✅ Build succeeds (`npm run build`)
- ✅ No duplicate images in gallery
- ✅ All image references exist
- ✅ All focal points valid
- ✅ Registry consistent
- ✅ No syntax errors
- ✅ All placements have valid markers

---

## 🚨 Emergency Procedures

### If Build Fails:
1. Check error message
2. Run `node scripts/validate-codebase.js` to find issues
3. Fix issues manually or rollback
4. Re-run validation

### If Duplicates Found:
1. Run `node scripts/find-duplicates.js` to identify all duplicates
2. Run `node scripts/remove-duplicates.js` to clean up
3. Verify gallery.ts is clean

### If Files Corrupted:
1. Run `node scripts/rollback.js --backup [latest-backup]`
2. Review what went wrong
3. Fix script if needed
4. Re-run with fixes

---

## 📊 Metrics to Track

- **Processing Time**: How long does full process take?
- **Error Rate**: How many errors per 100 images?
- **Duplicate Rate**: How many duplicates found?
- **Build Success Rate**: Does build succeed after processing?
- **Manual Fixes Needed**: How many issues require manual fixes?

---

## 🔄 Continuous Improvement

After each processing run:
1. Document any issues encountered
2. Update lessons learned
3. Improve scripts based on issues
4. Add tests for new edge cases
5. Update this workflow document

