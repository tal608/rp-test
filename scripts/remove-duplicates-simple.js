#!/usr/bin/env node

/**
 * Remove duplicate images from gallery.ts
 * Simple approach: Parse file, track seen images, remove duplicates
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function removeDuplicates() {
  console.log('🔍 Removing duplicates from gallery.ts...\n');
  
  const content = fs.readFileSync(galleryPath, 'utf-8');
  
  // Track seen images per category
  const seenByCategory = {};
  let currentCategory = null;
  
  const lines = content.split('\n');
  const newLines = [];
  let inCategoryArray = false;
  let currentImageLines = [];
  let currentImageSrc = null;
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect category start: "category: ["
    const categoryMatch = line.match(/(\w+):\s*\[/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];
      inCategoryArray = true;
      seenByCategory[currentCategory] = new Set();
      newLines.push(line);
      continue;
    }
    
    // Detect category end: "],"
    if (inCategoryArray && trimmed === '],') {
      inCategoryArray = false;
      currentCategory = null;
      newLines.push(line);
      continue;
    }
    
    // Process within category array
    if (inCategoryArray && currentCategory) {
      // Start of image object
      if (trimmed.startsWith('{')) {
        currentImageLines = [line];
        currentImageSrc = null;
        braceDepth = 1;
        continue;
      }
      
      // Continue collecting image lines
      if (currentImageLines.length > 0) {
        currentImageLines.push(line);
        
        // Track brace depth
        braceDepth += (line.match(/\{/g) || []).length;
        braceDepth -= (line.match(/\}/g) || []).length;
        
        // Extract src if found
        const srcMatch = line.match(/src:\s*["']([^"']+)["']/);
        if (srcMatch) {
          currentImageSrc = srcMatch[1];
        }
        
        // End of image object
        if (braceDepth === 0 && trimmed.endsWith('}')) {
          // Check if duplicate
          if (currentImageSrc && seenByCategory[currentCategory].has(currentImageSrc)) {
            console.log(`   ⚠️  Removing duplicate: ${currentImageSrc}`);
            // Don't add this image - skip it
            currentImageLines = [];
            currentImageSrc = null;
            continue;
          }
          
          // First occurrence - keep it
          if (currentImageSrc) {
            seenByCategory[currentCategory].add(currentImageSrc);
          }
          
          // Add image lines
          newLines.push(...currentImageLines);
          currentImageLines = [];
          currentImageSrc = null;
          continue;
        }
        
        // Still collecting image lines
        continue;
      }
    }
    
    // Regular line - add it
    newLines.push(line);
  }
  
  const newContent = newLines.join('\n');
  
  // Count images before and after
  const beforeMatches = content.match(/src:\s*["']/g) || [];
  const afterMatches = newContent.match(/src:\s*["']/g) || [];
  const removed = beforeMatches.length - afterMatches.length;
  
  if (removed > 0) {
    fs.writeFileSync(galleryPath, newContent, 'utf-8');
    console.log(`\n✅ Removed ${removed} duplicate images`);
    console.log(`   Before: ${beforeMatches.length} images`);
    console.log(`   After: ${afterMatches.length} images`);
    console.log(`📝 File updated: ${galleryPath}`);
  } else {
    console.log('\n✅ No duplicates found to remove');
  }
}

if (require.main === module) {
  try {
    removeDuplicates();
  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { removeDuplicates };

