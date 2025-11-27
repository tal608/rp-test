#!/usr/bin/env node

/**
 * Clean broken image references from gallery.ts
 * Removes references to images that don't exist in the filesystem
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  gallery: path.join(__dirname, '..', 'src', 'constants', 'gallery.ts'),
  publicHiking: path.join(__dirname, '..', 'public', 'Hiking'),
  publicGrooming: path.join(__dirname, '..', 'public', 'Grooming'),
};

function getExistingImages() {
  const existing = new Set();
  
  // Check Hiking directory
  if (fs.existsSync(PATHS.publicHiking)) {
    try {
      const hikingFiles = fs.readdirSync(PATHS.publicHiking)
        .filter(f => {
          const lower = f.toLowerCase();
          return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp');
        })
        .map(f => `/Hiking/${f}`);
      hikingFiles.forEach(f => existing.add(f));
    } catch (err) {
      console.warn(`Warning: Could not read Hiking directory: ${err.message}`);
    }
  }
  
  // Check Grooming directory
  if (fs.existsSync(PATHS.publicGrooming)) {
    try {
      const groomingFiles = fs.readdirSync(PATHS.publicGrooming)
        .filter(f => {
          const lower = f.toLowerCase();
          return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp');
        })
        .map(f => `/Grooming/${f}`);
      groomingFiles.forEach(f => existing.add(f));
    } catch (err) {
      console.warn(`Warning: Could not read Grooming directory: ${err.message}`);
    }
  }
  
  return existing;
}

function cleanGallery() {
  console.log('🧹 Cleaning broken image references from gallery.ts...\n');
  
  let content = fs.readFileSync(PATHS.gallery, 'utf-8');
  const existingImages = getExistingImages();
  
  console.log(`📊 Found ${existingImages.size} existing images in public directories\n`);
  
  // Find all image references - match full object entries
  // Pattern matches: { src: "...", alt: "...", title: "...", priority: ... }
  const imageRefRegex = /(\s*\{\s*src:\s*["']([^"']+)["'][^}]*?\})/gs;
  const matches = [];
  let match;
  while ((match = imageRefRegex.exec(content)) !== null) {
    matches.push({
      index: match.index,
      fullMatch: match[1],
      imagePath: match[2],
      endIndex: match.index + match[1].length
    });
  }
  
  let removedCount = 0;
  const removedImages = [];
  const keptImages = [];
  
  // Process matches in reverse order to maintain indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const imagePath = match.imagePath;
    
    if (!existingImages.has(imagePath)) {
      // Remove this image entry
      removedImages.push(imagePath);
      removedCount++;
      
      // Find the boundaries of this entry
      const startIdx = match.index;
      let endIdx = match.endIndex;
      
      // Check if there's a trailing comma and newline
      const afterMatch = content.substring(endIdx);
      const commaMatch = afterMatch.match(/^\s*,?\s*\n?\s*/);
      if (commaMatch) {
        endIdx += commaMatch[0].length;
      }
      
      // Remove the entry
      content = content.substring(0, startIdx) + content.substring(endIdx);
    } else {
      keptImages.push(imagePath);
    }
  }
  
  // Clean up any double commas or trailing commas before closing brackets
  content = content.replace(/,\s*,/g, ','); // Double commas
  content = content.replace(/,\s*\]/g, ']'); // Trailing comma before ]
  content = content.replace(/,\s*\}/g, '}'); // Trailing comma before }
  
  // Write cleaned content
  fs.writeFileSync(PATHS.gallery, content, 'utf-8');
  
  console.log(`✅ Removed ${removedCount} broken image references`);
  if (removedImages.length > 0) {
    console.log('\n📋 Removed images:');
    removedImages.slice(0, 10).forEach(img => console.log(`   - ${img}`));
    if (removedImages.length > 10) {
      console.log(`   ... and ${removedImages.length - 10} more`);
    }
  }
  
  console.log(`\n✅ Kept ${keptImages.length} valid image references`);
  
  return { removed: removedCount, kept: keptImages.length };
}

if (require.main === module) {
  try {
    const result = cleanGallery();
    console.log(`\n✅ Gallery cleanup complete!`);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error cleaning gallery:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { cleanGallery };

