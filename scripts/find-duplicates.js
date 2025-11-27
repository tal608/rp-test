#!/usr/bin/env node

/**
 * Find duplicate images in gallery.ts
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function findDuplicates() {
  const content = fs.readFileSync(galleryPath, 'utf-8');
  const lines = content.split('\n');
  
  const imageMap = {};
  const lineMap = {};
  
  lines.forEach((line, idx) => {
    const match = line.match(/src:\s*["']([^"']+)["']/);
    if (match) {
      const src = match[1];
      if (!imageMap[src]) {
        imageMap[src] = [];
      }
      imageMap[src].push(idx + 1);
      lineMap[src] = lineMap[src] || [];
      lineMap[src].push({ lineNum: idx + 1, content: line.trim() });
    }
  });
  
  const duplicates = Object.entries(imageMap).filter(([src, lineNums]) => lineNums.length > 1);
  
  console.log('📊 Gallery Duplicate Analysis\n');
  console.log(`Total image entries: ${Object.values(imageMap).reduce((sum, arr) => sum + arr.length, 0)}`);
  console.log(`Unique images: ${Object.keys(imageMap).length}`);
  console.log(`Duplicates found: ${duplicates.length}\n`);
  
  if (duplicates.length > 0) {
    console.log('🔴 Duplicate Images:\n');
    duplicates.forEach(([src, lineNums]) => {
      console.log(`  ${src}`);
      console.log(`    Appears ${lineNums.length} times on lines: ${lineNums.join(', ')}`);
      lineMap[src].forEach(({ lineNum, content }) => {
        const altMatch = content.match(/alt:\s*["']([^"']+)["']/);
        const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
        console.log(`      Line ${lineNum}: alt="${altMatch ? altMatch[1].substring(0, 50) : 'N/A'}..." title="${titleMatch ? titleMatch[1] : 'N/A'}"`);
      });
      console.log('');
    });
  } else {
    console.log('✅ No duplicates found!');
  }
  
  return duplicates;
}

if (require.main === module) {
  findDuplicates();
}

module.exports = { findDuplicates };

