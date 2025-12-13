const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Accept CSV path as argument or use default
const csvArg = process.argv[2];
const csvPath = csvArg 
  ? (path.isAbsolute(csvArg) ? csvArg : path.join(__dirname, '..', csvArg))
  : path.join(__dirname, '..', 'public', 'Grooming', 'river-paws-grooming-social-complete_1.csv');
const groomingDir = path.join(__dirname, '..', 'public', 'Grooming');

// Read CSV as raw lines to preserve formatting
const csvContent = fs.readFileSync(csvPath, 'utf8');
const allLines = csvContent.split('\n').filter(l => l.trim());
const header = allLines[0];

// Parse to get records for filtering
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
});

// Get existing images
const existingFiles = new Set(fs.readdirSync(groomingDir).filter(f => f.toLowerCase().endsWith('.jpg')));

// Create set of valid record indices (1-indexed, skipping header)
const validIndices = new Set();
records.forEach((record, index) => {
  const original = record['Original Filename']?.trim().replace(/"/g, '');
  const newName = record['New SEO Filename']?.trim().replace(/"/g, '');
  
  // Include if original exists OR new name already exists (already renamed)
  if (existingFiles.has(original) || existingFiles.has(newName)) {
    validIndices.add(index + 1); // +1 because header is line 0
  }
});

console.log(`Total records in CSV: ${records.length}`);
console.log(`Valid records (file exists): ${validIndices.size}`);
console.log(`Skipped records: ${records.length - validIndices.size}`);

// Write filtered CSV preserving original format
const inputBasename = path.basename(csvPath, '.csv');
const outputPath = path.join(path.dirname(csvPath), `${inputBasename}-filtered.csv`);
const outputLines = [header];
allLines.slice(1).forEach((line, index) => {
  if (validIndices.has(index + 1)) {
    outputLines.push(line);
  }
});

fs.writeFileSync(outputPath, outputLines.join('\n'));
console.log(`\n✅ Filtered CSV saved to: ${outputPath}`);
console.log(`\nYou can now run:`);
console.log(`  node scripts/process-images.js --csv "public/Grooming/river-paws-optimization-report-filtered.csv"`);

