const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvPath = process.argv[2];
const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

if (!csvPath) {
  console.error('Please provide CSV path');
  process.exit(1);
}

// 1. Get CSV Images
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvContent, { columns: true, skip_empty_lines: true, trim: true });
const csvImages = records
  .map(r => r['New SEO Filename']?.trim())
  .filter(f => f && (f.endsWith('.jpg') || f.endsWith('.png')));

console.log(`CSV contains ${csvImages.length} images.`);

// 2. Get Gallery Images
const galleryContent = fs.readFileSync(galleryPath, 'utf-8');
const galleryImages = new Set();
const matches = galleryContent.matchAll(/src:\s*["']([^"']+)["']/g);
for (const m of matches) {
  galleryImages.add(path.basename(m[1]));
}

console.log(`Gallery contains ${galleryImages.size} images.`);

// 3. Compare
const missing = csvImages.filter(img => !galleryImages.has(img));

if (missing.length > 0) {
  console.log(`\n❌ MISSING ${missing.length} images from CSV in Gallery:`);
  missing.forEach(img => console.log(` - ${img}`));
} else {
  console.log('\n✅ All CSV images are present in Gallery.');
}
