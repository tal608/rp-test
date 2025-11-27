#!/usr/bin/env node

/**
 * Remove duplicate images from gallery.ts - Manual approach
 * Reads file, parses properly, removes only actual duplicates
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function removeDuplicates() {
  console.log('🔍 Removing duplicates from gallery.ts...\n');
  
  const content = fs.readFileSync(galleryPath, 'utf-8');
  
  // Use regex to find all image entries with their src
  // Match: { ... src: "..." ... }
  const imagePattern = /\{\s*(?:[^}]*\n)*?\s*src:\s*["']([^"']+)["'][^}]*?\}/g;
  const allMatches = [...content.matchAll(imagePattern)];
  
  // Track seen images per category
  const seenByCategory = {};
  let currentCategory = null;
  
  // Find category boundaries
  const categoryPattern = /(\w+):\s*\[/g;
  const categoryMatches = [...content.matchAll(categoryPattern)];
  
  // Build map of which images belong to which category
  const categoryRanges = [];
  for (let i = 0; i < categoryMatches.length; i++) {
    const match = categoryMatches[i];
    const category = match[1];
    const startPos = match.index;
    const endPos = i < categoryMatches.length - 1 
      ? categoryMatches[i + 1].index 
      : content.length;
    categoryRanges.push({ category, startPos, endPos });
  }
  
  // Find which category each image belongs to
  const imagesByCategory = {};
  categoryRanges.forEach(({ category, startPos, endPos }) => {
    if (!imagesByCategory[category]) imagesByCategory[category] = [];
    allMatches.forEach((match, idx) => {
      if (match.index >= startPos && match.index < endPos) {
        imagesByCategory[category].push({
          src: match[1],
          fullMatch: match[0],
          index: match.index,
          matchIndex: idx
        });
      }
    });
  });
  
  // Find duplicates per category
  const duplicatesToRemove = [];
  Object.entries(imagesByCategory).forEach(([category, images]) => {
    const seen = new Set();
    images.forEach((img, idx) => {
      if (seen.has(img.src)) {
        // This is a duplicate - mark for removal
        duplicatesToRemove.push({
          category,
          src: img.src,
          index: img.index,
          fullMatch: img.fullMatch
        });
      } else {
        seen.add(img.src);
      }
    });
  });
  
  if (duplicatesToRemove.length === 0) {
    console.log('✅ No duplicates found!');
    return;
  }
  
  console.log(`🔴 Found ${duplicatesToRemove.length} duplicate images:\n`);
  duplicatesToRemove.forEach((dup, idx) => {
    console.log(`${idx + 1}. ${dup.src} (${dup.category})`);
  });
  
  // Remove duplicates (in reverse order to preserve positions)
  let newContent = content;
  duplicatesToRemove.reverse().forEach(dup => {
    // Find the exact match and remove it
    // Need to find the full image object including trailing comma
    const beforeMatch = newContent.substring(0, dup.index);
    const afterMatch = newContent.substring(dup.index);
    
    // Find the end of this image object (matching })
    let braceCount = 0;
    let endPos = 0;
    for (let i = 0; i < afterMatch.length; i++) {
      if (afterMatch[i] === '{') braceCount++;
      if (afterMatch[i] === '}') braceCount--;
      if (braceCount === 0 && afterMatch[i] === '}') {
        endPos = i + 1;
        // Check for trailing comma and newline
        if (afterMatch[endPos] === ',') endPos++;
        if (afterMatch[endPos] === '\n') endPos++;
        break;
      }
    }
    
    // Remove this image entry
    const imageEntry = afterMatch.substring(0, endPos);
    newContent = beforeMatch + afterMatch.substring(endPos);
  });
  
  // Write back
  fs.writeFileSync(galleryPath, newContent, 'utf-8');
  
  // Verify
  const afterMatches = (newContent.match(/src:\s*["']/g) || []).length;
  const beforeMatches = (content.match(/src:\s*["']/g) || []).length;
  const removed = beforeMatches - afterMatches;
  
  console.log(`\n✅ Removed ${removed} duplicate images`);
  console.log(`   Before: ${beforeMatches} images`);
  console.log(`   After: ${afterMatches} images`);
}

if (require.main === module) {
  try {
    removeDuplicates();
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { removeDuplicates };

