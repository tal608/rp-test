#!/usr/bin/env node

/**
 * Remove duplicate images from gallery.ts
 * Keeps the first occurrence of each image
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function removeDuplicates() {
  console.log('🔍 Removing duplicates from gallery.ts...\n');
  
  let content = fs.readFileSync(galleryPath, 'utf-8');
  
  // Track seen images per category
  const seenByCategory = {};
  let currentCategory = null;
  
  // Split by category sections
  const lines = content.split('\n');
  const newLines = [];
  let inCategory = false;
  let categoryStartIdx = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect category start
    const categoryMatch = line.match(/(\w+):\s*\[/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];
      inCategory = true;
      seenByCategory[currentCategory] = new Set();
      newLines.push(line);
      continue;
    }
    
    // Detect category end
    if (inCategory && line.trim() === '],') {
      inCategory = false;
      currentCategory = null;
      newLines.push(line);
      continue;
    }
    
    // Process image entries
    if (inCategory && currentCategory) {
      const srcMatch = line.match(/src:\s*["']([^"']+)["']/);
      
      if (srcMatch) {
        const src = srcMatch[1];
        
        // Check if we've seen this image in this category
        if (seenByCategory[currentCategory].has(src)) {
          // This is a duplicate - skip this image entry
          // We need to find where this image entry ends
          let entryStart = i;
          let entryEnd = i;
          let braceCount = 0;
          let foundStart = false;
          
          // Find the start of this entry (previous {)
          for (let j = i; j >= 0; j--) {
            if (lines[j].trim().startsWith('{')) {
              entryStart = j;
              foundStart = true;
              break;
            }
          }
          
          // Find the end of this entry (matching })
          if (foundStart) {
            for (let j = entryStart; j < lines.length; j++) {
              const l = lines[j];
              braceCount += (l.match(/\{/g) || []).length;
              braceCount -= (l.match(/\}/g) || []).length;
              if (braceCount === 0 && j >= entryStart) {
                entryEnd = j;
                break;
              }
            }
            
            // Skip this entire entry
            console.log(`   ⚠️  Removing duplicate: ${src} (lines ${entryStart + 1}-${entryEnd + 1})`);
            i = entryEnd; // Skip to end of entry
            continue;
          }
        } else {
          // First time seeing this image - keep it
          seenByCategory[currentCategory].add(src);
        }
      }
    }
    
    newLines.push(line);
  }
  
  const newContent = newLines.join('\n');
  
  // Verify we removed duplicates
  const verifyContent = fs.readFileSync(galleryPath, 'utf-8');
  const beforeCount = (verifyContent.match(/src:\s*["']/g) || []).length;
  const afterCount = (newContent.match(/src:\s*["']/g) || []).length;
  const removed = beforeCount - afterCount;
  
  if (removed > 0) {
    fs.writeFileSync(galleryPath, newContent, 'utf-8');
    console.log(`\n✅ Removed ${removed} duplicate images`);
    console.log(`   Before: ${beforeCount} images`);
    console.log(`   After: ${afterCount} images`);
  } else {
    console.log('\n✅ No duplicates found to remove');
  }
}

if (require.main === module) {
  try {
    removeDuplicates();
  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
    process.exit(1);
  }
}

module.exports = { removeDuplicates };

