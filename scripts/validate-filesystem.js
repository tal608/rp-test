#!/usr/bin/env node

/**
 * Validate File System State
 * 
 * Checks:
 * - All original image files exist
 * - Target directory exists and is writable
 * - No naming conflicts (new filename already exists)
 * - Sufficient disk space
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

function validateFilesystem(csvPath) {
  const errors = [];
  const warnings = [];
  
  if (!fs.existsSync(csvPath)) {
    errors.push(`CSV file not found: ${csvPath}`);
    return { errors, warnings, valid: false };
  }
  
  // Parse CSV to get image info
  let records;
  try {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
  } catch (err) {
    errors.push(`Failed to parse CSV: ${err.message}`);
    return { errors, warnings, valid: false };
  }
  
  // Determine directory from CSV path
  const normalizedPath = csvPath.replace(/\\/g, '/');
  const csvDir = path.dirname(normalizedPath);
  const directoryName = path.basename(csvDir);
  const targetDir = path.join(__dirname, '..', 'public', directoryName);
  
  // Check target directory exists
  if (!fs.existsSync(targetDir)) {
    errors.push(`Target directory does not exist: ${targetDir}`);
    return { errors, warnings, valid: false };
  }
  
  // Check directory is writable
  try {
    const testFile = path.join(targetDir, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
  } catch (err) {
    errors.push(`Target directory is not writable: ${targetDir}`);
    return { errors, warnings, valid: false };
  }
  
  // Check each image
  const newFilenames = new Set();
  let totalSize = 0;
  
  records.forEach((record, index) => {
    const rowNum = index + 2;
    const originalFilename = record['Original Filename']?.trim();
    const newFilename = record['New SEO Filename']?.trim();
    
    if (!originalFilename || !newFilename) {
      return; // Skip invalid rows
    }
    
    // Check original file exists OR if new file already exists (already processed)
    const originalPath = path.join(targetDir, originalFilename);
    const newFilePath = path.join(targetDir, newFilename);
    
    if (!fs.existsSync(originalPath) && !fs.existsSync(newFilePath)) {
      errors.push(`Row ${rowNum}: Original file not found and new file doesn't exist: ${originalPath}`);
    } else {
      // Get file size (prefer original, fallback to new)
      const fileToCheck = fs.existsSync(originalPath) ? originalPath : newFilePath;
      try {
        const stats = fs.statSync(fileToCheck);
        totalSize += stats.size;
      } catch (err) {
        warnings.push(`Row ${rowNum}: Could not read file stats: ${fs.existsSync(originalPath) ? originalFilename : newFilename}`);
      }
    }
    
    // Check for naming conflicts
    const newPath = path.join(targetDir, newFilename);
    if (fs.existsSync(newPath) && originalFilename !== newFilename) {
      warnings.push(`Row ${rowNum}: New filename already exists: ${newFilename} (will be overwritten)`);
    }
    
    // Check for duplicate new filenames in CSV
    if (newFilenames.has(newFilename)) {
      errors.push(`Row ${rowNum}: Duplicate new filename in CSV: ${newFilename}`);
    }
    newFilenames.add(newFilename);
  });
  
  // Check disk space (rough estimate)
  const freeSpace = getFreeDiskSpace(targetDir);
  if (freeSpace !== null && freeSpace < totalSize * 2) {
    warnings.push(`Low disk space: ${formatBytes(freeSpace)} free, ${formatBytes(totalSize)} needed`);
  }
  
  return {
    errors,
    warnings,
    valid: errors.length === 0,
    totalSize,
    directory: directoryName
  };
}

function getFreeDiskSpace(dir) {
  // This is a simplified check - actual implementation would use platform-specific APIs
  // For now, just return null to skip this check
  return null;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const csvIndex = args.indexOf('--csv');
  
  if (csvIndex === -1 || !args[csvIndex + 1]) {
    console.error('Usage: node scripts/validate-filesystem.js --csv path/to/file.csv');
    process.exit(1);
  }
  
  const csvPath = path.resolve(args[csvIndex + 1]);
  const result = validateFilesystem(csvPath);
  
  console.log('\n📁 File System Validation Results\n');
  console.log(`CSV: ${csvPath}`);
  console.log(`Directory: ${result.directory}`);
  console.log(`Total size: ${formatBytes(result.totalSize)}\n`);
  
  if (result.warnings.length > 0) {
    console.log(`⚠️  Warnings (${result.warnings.length}):`);
    result.warnings.forEach(w => console.log(`   - ${w}`));
    console.log('');
  }
  
  if (result.errors.length > 0) {
    console.log(`❌ Errors (${result.errors.length}):`);
    result.errors.forEach(e => console.log(`   - ${e}`));
    console.log('');
    console.log('❌ File system validation FAILED');
    process.exit(1);
  } else {
    console.log('✅ File system validation PASSED');
    if (result.warnings.length > 0) {
      console.log(`   (with ${result.warnings.length} warnings)`);
    }
  }
}

module.exports = { validateFilesystem };

