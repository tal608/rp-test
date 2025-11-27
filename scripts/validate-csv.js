#!/usr/bin/env node

/**
 * Validate CSV Structure
 * 
 * Checks CSV file for:
 * - Required columns
 * - No empty required fields
 * - Valid focal point coordinates (0-100)
 * - Valid scores (0-10)
 * - No duplicate filenames
 * - All original files exist
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const REQUIRED_COLUMNS = [
  'Original Filename',
  'New SEO Filename',
  'Alt Text',
  'Focal X (%)',
  'Focal Y (%)'
];

function validateCSV(csvPath) {
  const errors = [];
  const warnings = [];
  
  // Check file exists
  if (!fs.existsSync(csvPath)) {
    errors.push(`CSV file not found: ${csvPath}`);
    return { errors, warnings, valid: false };
  }
  
  // Read and parse CSV
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
  
  if (records.length === 0) {
    errors.push('CSV file is empty');
    return { errors, warnings, valid: false };
  }
  
  // Check required columns
  const headers = Object.keys(records[0]);
  const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }
  
  // Determine directory from CSV path
  const normalizedPath = csvPath.replace(/\\/g, '/');
  const csvDir = path.dirname(normalizedPath);
  const directoryName = path.basename(csvDir);
  
  // Validate each record
  const newFilenames = new Set();
  const originalFilenames = new Set();
  
  records.forEach((record, index) => {
    const rowNum = index + 2; // +2 because CSV has header row and 0-indexed
    
    // Check required fields
    if (!record['Original Filename']?.trim()) {
      errors.push(`Row ${rowNum}: Missing Original Filename`);
    }
    if (!record['New SEO Filename']?.trim()) {
      errors.push(`Row ${rowNum}: Missing New SEO Filename`);
    }
    if (!record['Alt Text']?.trim()) {
      warnings.push(`Row ${rowNum}: Missing Alt Text`);
    }
    
    // Check focal points
    const focalX = parseFloat(record['Focal X (%)']);
    const focalY = parseFloat(record['Focal Y (%)']);
    
    if (isNaN(focalX) || focalX < 0 || focalX > 100) {
      errors.push(`Row ${rowNum}: Invalid Focal X (${focalX}), must be 0-100`);
    }
    if (isNaN(focalY) || focalY < 0 || focalY > 100) {
      errors.push(`Row ${rowNum}: Invalid Focal Y (${focalY}), must be 0-100`);
    }
    
    // Check scores
    const totalScore = parseFloat(record['Total Score']);
    if (!isNaN(totalScore) && (totalScore < 0 || totalScore > 10)) {
      warnings.push(`Row ${rowNum}: Total Score (${totalScore}) outside typical range 0-10`);
    }
    
    // Check for duplicate new filenames
    const newFilename = record['New SEO Filename']?.trim();
    if (newFilename) {
      if (newFilenames.has(newFilename)) {
        errors.push(`Row ${rowNum}: Duplicate New SEO Filename: ${newFilename}`);
      }
      newFilenames.add(newFilename);
    }
    
    // Check original file exists
    const originalFilename = record['Original Filename']?.trim();
    if (originalFilename) {
      if (originalFilenames.has(originalFilename)) {
        warnings.push(`Row ${rowNum}: Duplicate Original Filename: ${originalFilename}`);
      }
      originalFilenames.add(originalFilename);
      
      const originalPath = path.join(__dirname, '..', 'public', directoryName, originalFilename);
      const newFilename = record['New SEO Filename']?.trim();
      const newPath = newFilename ? path.join(__dirname, '..', 'public', directoryName, newFilename) : null;
      
      // Check if original exists OR if new file already exists (already processed)
      if (!fs.existsSync(originalPath) && (!newPath || !fs.existsSync(newPath))) {
        errors.push(`Row ${rowNum}: Original file not found and new file doesn't exist: ${originalPath}`);
      }
    }
  });
  
  return {
    errors,
    warnings,
    valid: errors.length === 0,
    recordCount: records.length,
    directory: directoryName
  };
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const csvIndex = args.indexOf('--csv');
  
  if (csvIndex === -1 || !args[csvIndex + 1]) {
    console.error('Usage: node scripts/validate-csv.js --csv path/to/file.csv');
    process.exit(1);
  }
  
  const csvPath = path.resolve(args[csvIndex + 1]);
  const result = validateCSV(csvPath);
  
  console.log('\n📋 CSV Validation Results\n');
  console.log(`File: ${csvPath}`);
  console.log(`Records: ${result.recordCount}`);
  console.log(`Directory: ${result.directory}\n`);
  
  if (result.warnings.length > 0) {
    console.log(`⚠️  Warnings (${result.warnings.length}):`);
    result.warnings.forEach(w => console.log(`   - ${w}`));
    console.log('');
  }
  
  if (result.errors.length > 0) {
    console.log(`❌ Errors (${result.errors.length}):`);
    result.errors.forEach(e => console.log(`   - ${e}`));
    console.log('');
    console.log('❌ CSV validation FAILED');
    process.exit(1);
  } else {
    console.log('✅ CSV validation PASSED');
    if (result.warnings.length > 0) {
      console.log(`   (with ${result.warnings.length} warnings)`);
    }
  }
}

module.exports = { validateCSV };

