#!/usr/bin/env node

/**
 * Cleanup script to remove broken image references from gallery.ts
 * Removes references to images that don't exist in the filesystem
 */

const fs = require('fs');
const path = require('path');

const GALLERY_FILE = path.join(__dirname, '..', 'src', 'constants', 'gallery.ts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

/**
 * Get all image files in a directory
 */
function getImageFiles(dir) {
  const fullPath = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  return files
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => `/${dir}/${file}`);
}

/**
 * Find all image references in gallery.ts
 */
function findImageReferences(content) {
  const references = [];
  const regex = /src:\s*["']([^"']+)["']/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    references.push({
      path: match[1],
      index: match.index,
      fullMatch: match[0]
    });
  }
  
  return references;
}

/**
 * Check if an image file exists
 */
function imageExists(imagePath) {
  // Remove leading slash and check
  const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(PUBLIC_DIR, relativePath);
  return fs.existsSync(fullPath);
}

/**
 * Remove broken references from content
 */
function removeBrokenReferences(content, brokenRefs) {
  // Sort by index descending to remove from end to start (preserves indices)
  const sorted = [...brokenRefs].sort((a, b) => b.index - a.index);
  
  let updatedContent = content;
  for (const ref of sorted) {
    // Find the image entry block (from { to },)
    const startIdx = ref.index;
    let entryStart = startIdx;
    let entryEnd = startIdx;
    
    // Find the start of the object (go backwards to find {)
    for (let i = startIdx; i >= 0; i--) {
      if (updatedContent[i] === '{') {
        entryStart = i;
        break;
      }
    }
    
    // Find the end of the object (find matching })
    let braceCount = 0;
    let foundStart = false;
    for (let i = entryStart; i < updatedContent.length; i++) {
      if (updatedContent[i] === '{') {
        braceCount++;
        foundStart = true;
      } else if (updatedContent[i] === '}') {
        braceCount--;
        if (foundStart && braceCount === 0) {
          entryEnd = i + 1;
          break;
        }
      }
    }
    
    // Check if there's a comma after the closing brace
    if (updatedContent[entryEnd] === ',') {
      entryEnd++;
    }
    
    // Remove whitespace before if it's on its own line
    let beforeStart = entryStart;
    while (beforeStart > 0 && /\s/.test(updatedContent[beforeStart - 1])) {
      beforeStart--;
    }
    if (updatedContent[beforeStart - 1] === '\n') {
      beforeStart--;
    }
    
    // Remove the entry
    updatedContent = updatedContent.substring(0, beforeStart) + updatedContent.substring(entryEnd);
  }
  
  return updatedContent;
}

/**
 * Main cleanup function
 */
function cleanupBrokenReferences() {
  console.log('🧹 Cleaning up broken image references...\n');
  
  // Read gallery file
  let content = fs.readFileSync(GALLERY_FILE, 'utf-8');
  const originalContent = content;
  
  // Find all image references
  const references = findImageReferences(content);
  console.log(`📋 Found ${references.length} image references in gallery.ts\n`);
  
  // Check which ones are broken
  const brokenRefs = [];
  const validRefs = [];
  
  for (const ref of references) {
    if (!imageExists(ref.path)) {
      brokenRefs.push(ref);
    } else {
      validRefs.push(ref);
    }
  }
  
  console.log(`✅ Valid references: ${validRefs.length}`);
  console.log(`❌ Broken references: ${brokenRefs.length}\n`);
  
  if (brokenRefs.length === 0) {
    console.log('✨ No broken references found!');
    return;
  }
  
  // Show broken references
  console.log('Broken references to remove:');
  brokenRefs.forEach(ref => {
    console.log(`   - ${ref.path}`);
  });
  console.log('');
  
  // Remove broken references
  content = removeBrokenReferences(content, brokenRefs);
  
  // Write updated content
  fs.writeFileSync(GALLERY_FILE, content, 'utf-8');
  
  console.log(`✅ Removed ${brokenRefs.length} broken references`);
  console.log(`✅ Updated gallery.ts`);
  
  // Verify no broken references remain
  const newReferences = findImageReferences(content);
  const stillBroken = newReferences.filter(ref => !imageExists(ref.path));
  
  if (stillBroken.length > 0) {
    console.error(`\n⚠️  Warning: ${stillBroken.length} broken references still remain:`);
    stillBroken.forEach(ref => console.error(`   - ${ref.path}`));
  } else {
    console.log('\n✨ All broken references removed successfully!');
  }
}

// Run cleanup
try {
  cleanupBrokenReferences();
} catch (error) {
  console.error('❌ Error during cleanup:', error);
  process.exit(1);
}

