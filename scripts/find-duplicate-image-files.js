#!/usr/bin/env node

/**
 * Find duplicate image files (same content, different filenames)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getFileHash(filePath) {
  // Use synchronous reading with buffer limit or stream?
  // For simplicity in synchronous flow, we'll stick to readFileSync but with size check
  // Ideally this should be async streams, but the whole pipeline is sync
  const stats = fs.statSync(filePath);
  if (stats.size > 100 * 1024 * 1024) { // Skip files > 100MB to avoid OOM
    return 'SKIP-LARGE-FILE';
  }
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function findDuplicateImages(directory) {
  // Ensure fs is available (in case module is imported)
  const fsModule = require('fs');
  
  if (!fsModule.existsSync(directory)) {
    return [];
  }
  
  const files = fsModule.readdirSync(directory)
    .filter(f => f.toLowerCase().endsWith('.jpg') || 
                 f.toLowerCase().endsWith('.jpeg') || 
                 f.toLowerCase().endsWith('.png') ||
                 f.toLowerCase().endsWith('.webp'));
  
  const hashMap = new Map();
  const duplicates = [];
  
  files.forEach(filename => {
    const filePath = path.join(directory, filename);
    try {
      const hash = getFileHash(filePath);
      if (hashMap.has(hash)) {
        duplicates.push({
          hash,
          files: [hashMap.get(hash), filename],
          size: fsModule.statSync(filePath).size,
          directory: path.basename(directory)
        });
      } else {
        hashMap.set(hash, filename);
      }
    } catch (err) {
      // Silently skip files that can't be processed
      // Don't warn here as it's called during processing
    }
  });
  
  return duplicates;
}

function main() {
  const groomingDir = path.join(__dirname, '..', 'public', 'Grooming');
  const hikingDir = path.join(__dirname, '..', 'public', 'Hiking');
  
  console.log('🔍 Searching for duplicate image files...\n');
  
  const allDuplicates = [];
  
  if (fs.existsSync(groomingDir)) {
    console.log('📁 Checking Grooming directory...');
    const groomingDups = findDuplicateImages(groomingDir);
    if (groomingDups.length > 0) {
      console.log(`   Found ${groomingDups.length} duplicate(s) in Grooming:`);
      groomingDups.forEach(dup => {
        console.log(`   ❌ ${dup.files[0]} == ${dup.files[1]} (${dup.size} bytes)`);
      });
      allDuplicates.push(...groomingDups.map(d => ({ ...d, directory: 'Grooming' })));
    } else {
      console.log('   ✅ No duplicates found');
    }
  }
  
  if (fs.existsSync(hikingDir)) {
    console.log('\n📁 Checking Hiking directory...');
    const hikingDups = findDuplicateImages(hikingDir);
    if (hikingDups.length > 0) {
      console.log(`   Found ${hikingDups.length} duplicate(s) in Hiking:`);
      hikingDups.forEach(dup => {
        console.log(`   ❌ ${dup.files[0]} == ${dup.files[1]} (${dup.size} bytes)`);
      });
      allDuplicates.push(...hikingDups.map(d => ({ ...d, directory: 'Hiking' })));
    } else {
      console.log('   ✅ No duplicates found');
    }
  }
  
  if (allDuplicates.length === 0) {
    console.log('\n✅ No duplicate image files found!');
    return 0;
  }
  
  console.log(`\n📊 Summary: Found ${allDuplicates.length} duplicate image pair(s)`);
  console.log('\n⚠️  Recommendation: Remove one file from each pair and update all references.');
  
  return 1;
}

if (require.main === module) {
  const exitCode = main();
  process.exit(exitCode);
}

module.exports = { findDuplicateImages };

