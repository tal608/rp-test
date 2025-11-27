#!/usr/bin/env node

/**
 * Comprehensive script to find and fix ALL broken image references
 * Checks: gallery.ts, page files, components, focal points
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  public: path.join(__dirname, '..', 'public'),
  src: path.join(__dirname, '..', 'src'),
  gallery: path.join(__dirname, '..', 'src', 'constants', 'gallery.ts'),
  focalPoints: path.join(__dirname, '..', 'src', 'lib', 'imageFocalPoints.ts')
};

/**
 * Get all existing image files
 */
function getExistingImages() {
  const images = new Set();
  
  // Check Hiking directory
  const hikingDir = path.join(PATHS.public, 'Hiking');
  if (fs.existsSync(hikingDir)) {
    const files = fs.readdirSync(hikingDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    files.forEach(f => {
      images.add(`/Hiking/${f}`);
      images.add(f); // Also add filename only
    });
  }
  
  // Check Grooming directory
  const groomingDir = path.join(PATHS.public, 'Grooming');
  if (fs.existsSync(groomingDir)) {
    const files = fs.readdirSync(groomingDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    files.forEach(f => {
      images.add(`/Grooming/${f}`);
      images.add(f); // Also add filename only
    });
  }
  
  return images;
}

/**
 * Find all image references in a file
 */
function findImageReferences(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const references = [];
  
  // Match src="/Hiking/..." or src="/Grooming/..."
  const srcMatches = [...content.matchAll(/src[:=]\s*["'](\/(?:Hiking|Grooming)\/[^"']+)["']/g)];
  srcMatches.forEach(match => {
    references.push({
      path: match[1],
      index: match.index,
      fullMatch: match[0],
      file: filePath
    });
  });
  
  // Match focal point entries: 'filename.jpg': { x: ..., y: ... }
  const focalMatches = [...content.matchAll(/'([^']+\.(?:jpg|jpeg|png|webp))':\s*\{/gi)];
  focalMatches.forEach(match => {
    const filename = match[1];
    // Try to determine directory from context or filename
    let imagePath = filename;
    if (filename.includes('hiking') || filename.includes('adventure') || filename.includes('wilderness')) {
      imagePath = `/Hiking/${filename}`;
    } else if (filename.includes('grooming') || filename.includes('groomed')) {
      imagePath = `/Grooming/${filename}`;
    }
    
    references.push({
      path: imagePath,
      filename: filename,
      index: match.index,
      fullMatch: match[0],
      file: filePath,
      isFocalPoint: true
    });
  });
  
  return references;
}

/**
 * Check if image exists
 */
function imageExists(imagePath, existingImages) {
  // Check full path
  if (existingImages.has(imagePath)) return true;
  
  // Check filename only (for focal points)
  const filename = imagePath.split('/').pop();
  if (existingImages.has(filename)) return true;
  
  // Check actual file system
  const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(PATHS.public, relativePath);
  return fs.existsSync(fullPath);
}

/**
 * Remove broken reference from gallery.ts
 */
function removeFromGallery(content, brokenRef) {
  // Find the image entry block (from { to },)
  const startIdx = brokenRef.index;
  let entryStart = startIdx;
  let entryEnd = startIdx;
  
  // Find the start of the object (go backwards to find {)
  for (let i = startIdx; i >= 0; i--) {
    if (content[i] === '{') {
      entryStart = i;
      break;
    }
  }
  
  // Find the end of the object (find matching })
  let braceCount = 0;
  let foundStart = false;
  for (let i = entryStart; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
      foundStart = true;
    } else if (content[i] === '}') {
      braceCount--;
      if (foundStart && braceCount === 0) {
        entryEnd = i + 1;
        break;
      }
    }
  }
  
  // Check if there's a comma after the closing brace
  while (entryEnd < content.length && (content[entryEnd] === ',' || /\s/.test(content[entryEnd]))) {
    if (content[entryEnd] === ',') {
      entryEnd++;
      break;
    }
    entryEnd++;
  }
  
  // Remove whitespace before if it's on its own line
  let beforeStart = entryStart;
  while (beforeStart > 0 && /\s/.test(content[beforeStart - 1])) {
    beforeStart--;
  }
  if (beforeStart > 0 && content[beforeStart - 1] === '\n') {
    beforeStart--;
  }
  
  // Remove the entry
  return content.substring(0, beforeStart) + content.substring(entryEnd);
}

/**
 * Remove broken focal point entry
 */
function removeFocalPoint(content, brokenRef) {
  const startIdx = brokenRef.index;
  
  // Find the end of the entry (find },)
  let entryEnd = startIdx;
  let foundComma = false;
  
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '}') {
      entryEnd = i + 1;
      // Look for comma
      let j = i + 1;
      while (j < content.length && /\s/.test(content[j])) j++;
      if (j < content.length && content[j] === ',') {
        entryEnd = j + 1;
        foundComma = true;
      }
      break;
    }
  }
  
  // Remove whitespace before
  let beforeStart = startIdx;
  while (beforeStart > 0 && /\s/.test(content[beforeStart - 1])) {
    beforeStart--;
  }
  if (beforeStart > 0 && content[beforeStart - 1] === '\n') {
    beforeStart--;
  }
  
  // Remove trailing comma from previous entry if this was the last entry
  if (!foundComma && beforeStart > 0) {
    let checkIdx = beforeStart - 1;
    while (checkIdx >= 0 && /\s/.test(content[checkIdx])) checkIdx--;
    if (checkIdx >= 0 && content[checkIdx] === ',') {
      beforeStart = checkIdx;
    }
  }
  
  return content.substring(0, beforeStart) + content.substring(entryEnd);
}

/**
 * Main function
 */
function fixAllBrokenImages() {
  console.log('🔍 Finding all broken image references...\n');
  
  const existingImages = getExistingImages();
  console.log(`📁 Found ${existingImages.size} existing images\n`);
  
  // Find all TS/TSX files
  const filesToCheck = [];
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(ts|tsx)$/.test(item.name)) {
        filesToCheck.push(fullPath);
      }
    }
  }
  
  scanDir(PATHS.src);
  
  console.log(`📋 Checking ${filesToCheck.length} files...\n`);
  
  // Find all broken references
  const brokenRefs = [];
  const allRefs = [];
  
  for (const file of filesToCheck) {
    const refs = findImageReferences(file);
    allRefs.push(...refs.map(r => ({ ...r, file })));
    
    for (const ref of refs) {
      if (!imageExists(ref.path, existingImages)) {
        brokenRefs.push({ ...ref, file });
      }
    }
  }
  
  console.log(`📊 Total image references: ${allRefs.length}`);
  console.log(`❌ Broken references: ${brokenRefs.length}\n`);
  
  if (brokenRefs.length === 0) {
    console.log('✨ No broken references found!');
    return;
  }
  
  // Group by file
  const brokenByFile = {};
  brokenRefs.forEach(ref => {
    if (!brokenByFile[ref.file]) {
      brokenByFile[ref.file] = [];
    }
    brokenByFile[ref.file].push(ref);
  });
  
  // Fix each file
  let totalRemoved = 0;
  for (const [filePath, refs] of Object.entries(brokenByFile)) {
    console.log(`\n🔧 Fixing ${path.relative(process.cwd(), filePath)}...`);
    console.log(`   Removing ${refs.length} broken references`);
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    
    // Sort by index descending to preserve indices
    const sortedRefs = [...refs].sort((a, b) => b.index - a.index);
    
    for (const ref of sortedRefs) {
      if (ref.isFocalPoint) {
        content = removeFocalPoint(content, ref);
        console.log(`   ✅ Removed focal point: ${ref.filename || ref.path}`);
      } else {
        content = removeFromGallery(content, ref);
        console.log(`   ✅ Removed reference: ${ref.path}`);
      }
      totalRemoved++;
    }
    
    // Write updated content
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`   ✅ Updated file`);
    }
  }
  
  console.log(`\n✨ Removed ${totalRemoved} broken references`);
  console.log(`✅ All files updated`);
}

// Run with error handling
try {
  fixAllBrokenImages();
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}

