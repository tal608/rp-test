#!/usr/bin/env node

/**
 * Fix broken image references by:
 * 1. Removing focal point entries for images that don't exist
 * 2. Finding images that exist but aren't in focal points
 * 3. Updating code references to use correct paths
 */

const fs = require('fs');
const path = require('path');

function getAllImageFiles() {
  const images = new Map();
  
  // Get all images from Hiking directory
  const hikingDir = path.join(__dirname, '..', 'public', 'Hiking');
  if (fs.existsSync(hikingDir)) {
    const files = fs.readdirSync(hikingDir).filter(f => f.endsWith('.jpg'));
    files.forEach(f => {
      images.set(f, '/Hiking/');
    });
  }
  
  // Get all images from Grooming directory
  const groomingDir = path.join(__dirname, '..', 'public', 'Grooming');
  if (fs.existsSync(groomingDir)) {
    const files = fs.readdirSync(groomingDir).filter(f => f.endsWith('.jpg'));
    files.forEach(f => {
      images.set(f, '/Grooming/');
    });
  }
  
  return images;
}

function getFocalPointEntries() {
  const focalPointsFile = path.join(__dirname, '..', 'src', 'lib', 'imageFocalPoints.ts');
  const content = fs.readFileSync(focalPointsFile, 'utf-8');
  const entries = [];
  
  // Extract all focal point entries
  const matches = content.matchAll(/'([^']+\.jpg)':\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+)\s*\}/g);
  for (const match of matches) {
    entries.push({
      filename: match[1],
      x: parseInt(match[2]),
      y: parseInt(match[3])
    });
  }
  
  return entries;
}

function fixFocalPoints() {
  console.log('🔍 Analyzing focal points...\n');
  
  const allImages = getAllImageFiles();
  const focalEntries = getFocalPointEntries();
  
  console.log(`Found ${allImages.size} images in public directories`);
  console.log(`Found ${focalEntries.length} entries in focalPoints.ts\n`);
  
  // Find entries that don't have corresponding files
  const missing = [];
  const valid = [];
  
  for (const entry of focalEntries) {
    if (allImages.has(entry.filename)) {
      valid.push(entry);
    } else {
      missing.push(entry);
    }
  }
  
  console.log(`✅ Valid entries: ${valid.length}`);
  console.log(`❌ Missing entries: ${missing.length}\n`);
  
  if (missing.length > 0) {
    console.log('Missing images (will be removed from focalPoints.ts):');
    missing.slice(0, 20).forEach(e => console.log(`  - ${e.filename}`));
    if (missing.length > 20) {
      console.log(`  ... and ${missing.length - 20} more`);
    }
  }
  
  // Find images that exist but aren't in focal points
  const missingFromMap = [];
  for (const [filename, dir] of allImages.entries()) {
    if (!focalEntries.find(e => e.filename === filename)) {
      missingFromMap.push({ filename, dir });
    }
  }
  
  console.log(`\n📋 Images not in focalPoints.ts: ${missingFromMap.length}`);
  if (missingFromMap.length > 0 && missingFromMap.length <= 20) {
    missingFromMap.forEach(img => console.log(`  - ${img.dir}${img.filename}`));
  } else if (missingFromMap.length > 20) {
    missingFromMap.slice(0, 20).forEach(img => console.log(`  - ${img.dir}${img.filename}`));
    console.log(`  ... and ${missingFromMap.length - 20} more`);
  }
  
  // Update focalPoints.ts - remove missing entries
  if (missing.length > 0) {
    console.log('\n🔧 Updating focalPoints.ts...');
    const focalPointsFile = path.join(__dirname, '..', 'src', 'lib', 'imageFocalPoints.ts');
    let content = fs.readFileSync(focalPointsFile, 'utf-8');
    
    // Remove missing entries
    for (const entry of missing) {
      const pattern = new RegExp(`\\s*'${entry.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*\\{\\s*x:\\s*\\d+,\\s*y:\\s*\\d+\\s*\\},?\\n`, 'g');
      content = content.replace(pattern, '');
    }
    
    // Clean up any double newlines
    content = content.replace(/\n\n\n+/g, '\n\n');
    
    fs.writeFileSync(focalPointsFile, content);
    console.log(`   ✅ Removed ${missing.length} missing entries`);
  }
  
  return { missing, valid, missingFromMap };
}

// Run the fix
const result = fixFocalPoints();

console.log('\n✅ Focal points cleanup complete!');
console.log(`   - Removed ${result.missing.length} invalid entries`);
console.log(`   - Kept ${result.valid.length} valid entries`);
console.log(`   - ${result.missingFromMap.length} images exist but aren't in focal points (these are OK)`);

