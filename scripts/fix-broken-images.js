#!/usr/bin/env node

/**
 * Fix broken image references by finding missing images and updating references
 */

const fs = require('fs');
const path = require('path');

function findAllImageReferences() {
  const imageRefs = new Map(); // path -> array of files that reference it
  const appDir = path.join(__dirname, '..', 'src', 'app');
  const componentsDir = path.join(__dirname, '..', 'src', 'components');
  const constantsDir = path.join(__dirname, '..', 'src', 'constants');
  const libDir = path.join(__dirname, '..', 'src', 'lib');
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const relativePath = path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/');
        
        // Match src="/Hiking/..." or src="/Grooming/..."
        const srcMatches = content.matchAll(/src=["'](\/(?:Hiking|Grooming)\/[^"']+)["']/g);
        for (const match of srcMatches) {
          if (!imageRefs.has(match[1])) {
            imageRefs.set(match[1], []);
          }
          imageRefs.get(match[1]).push(relativePath);
        }
        
        // Match image: "/Hiking/..." or image: "/Grooming/..."
        const imageMatches = content.matchAll(/image:\s*["'](\/(?:Hiking|Grooming)\/[^"']+)["']/g);
        for (const match of imageMatches) {
          if (!imageRefs.has(match[1])) {
            imageRefs.set(match[1], []);
          }
          imageRefs.get(match[1]).push(relativePath);
        }
        
        // Match focal point map entries
        const focalMatches = content.matchAll(/'([^']+\.jpg)':\s*\{/g);
        for (const match of focalMatches) {
          const filename = match[1];
          // Check if it's a hiking or grooming image
          if (filename.includes('hiking') || filename.includes('grooming') || filename.includes('river-paws')) {
            const imagePath = filename.includes('hiking') ? `/Hiking/${filename}` : `/Grooming/${filename}`;
            if (!imageRefs.has(imagePath)) {
              imageRefs.set(imagePath, []);
            }
            if (!imageRefs.get(imagePath).includes(relativePath)) {
              imageRefs.get(imagePath).push(relativePath);
            }
          }
        }
      }
    }
  }
  
  scanDirectory(appDir);
  scanDirectory(componentsDir);
  scanDirectory(constantsDir);
  scanDirectory(libDir);
  
  return imageRefs;
}

function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath.substring(1));
  return fs.existsSync(fullPath);
}

function findSimilarImage(missingPath) {
  const filename = path.basename(missingPath);
  const dir = path.dirname(missingPath).substring(1);
  const dirPath = path.join(__dirname, '..', 'public', dir);
  
  if (!fs.existsSync(dirPath)) return null;
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg'));
  
  // Try exact match first (case insensitive)
  const exactMatch = files.find(f => f.toLowerCase() === filename.toLowerCase());
  if (exactMatch) return `/${dir}/${exactMatch}`;
  
  // Try partial match - check if filename contains key parts
  const keyParts = filename.toLowerCase().replace(/[-_]/g, ' ').split(' ').filter(p => p.length > 3);
  const similar = files.find(f => {
    const fLower = f.toLowerCase();
    return keyParts.every(part => fLower.includes(part));
  });
  
  if (similar) return `/${dir}/${similar}`;
  
  return null;
}

console.log('🔍 Finding broken image references...\n');

const imageRefs = findAllImageReferences();
console.log(`Found ${imageRefs.size} unique image references\n`);

const missing = [];
const existing = [];

for (const [imagePath, files] of imageRefs.entries()) {
  if (checkImageExists(imagePath)) {
    existing.push(imagePath);
  } else {
    missing.push({ path: imagePath, files });
  }
}

console.log(`✅ Existing: ${existing.length}`);
console.log(`❌ Missing: ${missing.length}\n`);

if (missing.length > 0) {
  console.log('Missing images and their references:');
  for (const item of missing) {
    console.log(`\n  ${item.path}:`);
    item.files.forEach(f => console.log(`    - ${f}`));
    
    // Try to find similar image
    const similar = findSimilarImage(item.path);
    if (similar) {
      console.log(`    → Found similar: ${similar}`);
      item.replacement = similar;
    } else {
      console.log(`    → No similar image found`);
    }
  }
}

// Generate fix report
if (missing.length > 0) {
  console.log('\n\n📋 FIX REPORT:');
  console.log('='.repeat(60));
  const fixable = missing.filter(m => m.replacement);
  const unfixable = missing.filter(m => !m.replacement);
  
  if (fixable.length > 0) {
    console.log(`\n✅ Can be auto-fixed (${fixable.length}):`);
    fixable.forEach(m => {
      console.log(`  ${m.path} → ${m.replacement}`);
    });
  }
  
  if (unfixable.length > 0) {
    console.log(`\n❌ Need manual fix (${unfixable.length}):`);
    unfixable.forEach(m => {
      console.log(`  ${m.path}`);
      console.log(`    Referenced in: ${m.files.join(', ')}`);
    });
  }
}

process.exit(missing.length > 0 ? 1 : 0);

