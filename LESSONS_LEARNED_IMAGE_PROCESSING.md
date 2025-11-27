# Lessons Learned: Image Processing Pipeline

**Date:** November 2025  
**Status:** Post-Mortem Analysis & Workflow Redesign

---

## 🔴 Critical Issues Encountered

### 1. **Script Bugs That Caused File Corruption**

#### Bug #1: Wrong Replacement Scope
- **Problem**: Used `content.replace()` on full file instead of section-based replacement
- **Impact**: Replaced first occurrence in entire file, not the intended section
- **Fix**: All replacements now operate on extracted sections, then reconstruct full content

#### Bug #2: Variable Shadowing
- **Problem**: `imageDir` declared multiple times causing confusion
- **Impact**: Wrong directory paths used, images not found
- **Fix**: Use `defaultImageDir` at function scope, `imageDir` per image

#### Bug #3: Stale File Reads
- **Problem**: Processing same file multiple times read stale content after earlier writes
- **Impact**: Later replacements overwrote earlier changes incorrectly
- **Fix**: Cache file content in Map, write once at end

#### Bug #4: Incorrect Section Extraction
- **Problem**: Section extraction didn't include markers, causing misalignment
- **Impact**: Replacements happened outside intended sections
- **Fix**: Extract section including markers: `content.substring(startIdx, endIdx + markerEnd.length)`

#### Bug #5: Alt Text Concatenation
- **Problem**: Regex didn't handle corrupted concatenated alt texts correctly
- **Impact**: Alt text got concatenated multiple times: `alt="text1" text2" text3"`
- **Fix**: Updated regex to `/alt=["'](?:[^"']|\\["'])*["'](?:\s+[^"']*["'])*/g`

#### Bug #6: Focal Point Insertion Location
- **Problem**: Script inserted focal points in wrong location (inside function instead of object)
- **Impact**: Build errors, syntax errors
- **Fix**: Find correct insertion point before `export function getImageFocalPoint`

### 2. **Duplicate Images in Gallery**

#### Root Cause
- Script adds images to gallery without checking for duplicates
- Same image added multiple times with different alt text/titles
- No deduplication logic

#### Examples Found
- `/Hiking/curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg` appears 2+ times
- `/Hiking/content-golden-retriever-spaniel-pack-outdoor-enrichment-sun-prairie-wi-river-paws.jpg` appears 3+ times
- `/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg` appears multiple times

### 3. **Mystery Pics Directory**

#### What Happened
- Empty `public/Pics/` directory exists (only contains `desktop.ini`)
- Old code references `/Pics/` paths in some scripts
- No actual images in Pics directory
- Likely leftover from old WordPress site or initial migration

#### Impact
- Confusion about image organization
- Scripts reference non-existent directory
- No functional impact currently, but adds confusion

---

## 🟡 Process Issues

### 1. **No Pre-Flight Validation**
- Script didn't validate CSV structure before processing
- No check for required columns
- No validation of image file existence before renaming

### 2. **No Rollback Mechanism**
- If script fails mid-way, files left in corrupted state
- No backup before making changes
- No way to revert changes

### 3. **No Duplicate Prevention**
- Gallery additions don't check for existing images
- Same image can be added multiple times
- No deduplication logic

### 4. **Insufficient Error Handling**
- Script continues processing even when errors occur
- Errors logged but don't stop execution
- No clear error summary at end

### 5. **No Dry-Run Validation**
- Dry-run shows what WOULD happen but doesn't validate
- No check if files are writable
- No check if markers exist before processing

---

## 🟢 What Worked Well

1. **CSV Structure**: Well-organized CSV with all necessary metadata
2. **Placement Opportunities System**: Good concept for defining placement locations
3. **Registry Tracking**: Useful for tracking image usage
4. **Focal Point System**: Centralized focal point management works well

---

## 📋 Recommendations for Future

### Immediate Fixes Needed

1. **Add Duplicate Detection**
   - Check gallery.ts for existing images before adding
   - Use image src as unique identifier
   - Skip or update instead of duplicate

2. **Add Pre-Flight Validation**
   - Validate CSV structure
   - Check all original files exist
   - Verify all target directories exist
   - Check file permissions

3. **Add Backup System**
   - Create backup of files before modification
   - Store backup with timestamp
   - Provide rollback script

4. **Improve Error Handling**
   - Stop on critical errors
   - Provide clear error messages
   - Generate error summary report

5. **Clean Up Pics Directory**
   - Remove empty Pics directory
   - Update any scripts referencing it
   - Document directory structure

### Long-Term Improvements

1. **Add Testing**
   - Unit tests for each function
   - Integration tests for full workflow
   - Test with corrupted data

2. **Add Validation Scripts**
   - Pre-process validation
   - Post-process verification
   - Build validation

3. **Improve Logging**
   - Structured logging
   - Log levels (info, warn, error)
   - Detailed execution log

4. **Add Rollback Capability**
   - Git-based rollback
   - File-level rollback
   - Registry rollback

---

## 🎯 Ideal Workflow (Next Attempt)

See `IDEAL_WORKFLOW_IMAGE_PROCESSING.md` for detailed workflow.

