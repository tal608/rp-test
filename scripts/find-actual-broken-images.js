#!/usr/bin/env node

/**
 * Find images actually referenced in page files that don't exist
 */

const fs = require('fs');
const path = require('path');

function findAllImageReferencesInPages() {
  const imageRefs = new Map(); // path -> array of files that reference it
  const appDir = path.join(__dirname, '..', 'src', 'app');
  const componentsDir = path.join(__dirname, '..', 'src', 'components');
  const constantsDir = path.join(__dirname, '..', 'src', 'constants');
  
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
      }
    }
  }
  
  scanDirectory(appDir);
  scanDirectory(componentsDir);
  scanDirectory(constantsDir);
  
  return imageRefs;
}

function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath.substring(1));
  return fs.existsSync(fullPath);
}

console.log('🔍 Finding broken image references in page files...\n');

const imageRefs = findAllImageReferencesInPages();
console.log(`Found ${imageRefs.size} unique image references in pages\n`);

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
  console.log('Missing images referenced in pages:');
  for (const item of missing) {
    console.log(`\n  ${item.path}:`);
    item.files.forEach(f => console.log(`    - ${f}`));
  }
}

process.exit(missing.length > 0 ? 1 : 0);

