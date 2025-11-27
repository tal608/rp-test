#!/usr/bin/env node

/**
 * Remove duplicate images from gallery.ts
 * Keeps the first occurrence of each image
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function removeDuplicates() {
  let content = fs.readFileSync(galleryPath, 'utf-8');
  const lines = content.split('\n');
  
  // Track seen images by src
  const seenImages = new Set();
  const seenLines = new Set();
  const linesToRemove = [];
  
  // Find all duplicate entries
  lines.forEach((line, idx) => {
    const match = line.match(/src:\s*["']([^"']+)["']/);
    if (match) {
      const src = match[1];
      if (seenImages.has(src)) {
        // This is a duplicate - mark for removal
        // Find the entire object (from { to },)
        let startLine = idx;
        let endLine = idx;
        
        // Find start of object (go backwards to find opening brace)
        for (let i = idx; i >= 0; i--) {
          if (lines[i].includes('{')) {
            startLine = i;
            break;
          }
        }
        
        // Find end of object (go forwards to find closing brace)
        for (let i = idx; i < lines.length; i++) {
          if (lines[i].includes('},') || lines[i].includes('}')) {
            endLine = i;
            break;
          }
        }
        
        // Mark all lines in this object for removal
        for (let i = startLine; i <= endLine; i++) {
          linesToRemove.push(i);
        }
        
        console.log(`   Removing duplicate: ${src} (lines ${startLine + 1}-${endLine + 1})`);
      } else {
        seenImages.add(src);
      }
    }
  });
  
  if (linesToRemove.length === 0) {
    console.log('✅ No duplicates found!');
    return;
  }
  
  // Remove duplicate lines (in reverse order to maintain indices)
  const uniqueLines = lines.filter((line, idx) => !linesToRemove.includes(idx));
  
  // Write back
  fs.writeFileSync(galleryPath, uniqueLines.join('\n'), 'utf-8');
  
  console.log(`\n✅ Removed ${linesToRemove.length} lines containing ${seenImages.size} duplicate images`);
  console.log(`   Original: ${lines.length} lines`);
  console.log(`   After cleanup: ${uniqueLines.length} lines`);
}

if (require.main === module) {
  console.log('🔍 Finding and removing duplicates from gallery.ts...\n');
  removeDuplicates();
  console.log('\n✅ Done!');
}

module.exports = { removeDuplicates };
