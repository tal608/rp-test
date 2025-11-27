#!/usr/bin/env node

/**
 * Validate all image references exist and fix broken ones
 */

const fs = require('fs');
const path = require('path');

function getAllImageFiles() {
  const images = new Map();
  
  ['Hiking', 'Grooming'].forEach(dirName => {
    const dir = path.join(__dirname, '..', 'public', dirName);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
      files.forEach(f => {
        images.set(f.toLowerCase(), `/${dirName}/${f}`);
      });
    }
  });
  
  return images;
}

function findAllImageReferences() {
  const refs = [];
  const appDir = path.join(__dirname, '..', 'src', 'app');
  const componentsDir = path.join(__dirname, '..', 'src', 'components');
  const constantsDir = path.join(__dirname, '..', 'src', 'constants');
  
  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
    
    // Match src="/Hiking/..." or src="/Grooming/..."
    const srcMatches = content.matchAll(/src=["'](\/(?:Hiking|Grooming)\/[^"']+)["']/g);
    for (const match of srcMatches) {
      refs.push({ path: match[1], file: relativePath, type: 'src' });
    }
    
    // Match image: "/Hiking/..."
    const imageMatches = content.matchAll(/image:\s*["'](\/(?:Hiking|Grooming)\/[^"']+)["']/g);
    for (const match of imageMatches) {
      refs.push({ path: match[1], file: relativePath, type: 'image' });
    }
  }
  
  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        scanFile(fullPath);
      }
    }
  }
  
  scanDirectory(appDir);
  scanDirectory(componentsDir);
  scanDirectory(constantsDir);
  
  return refs;
}

console.log('🔍 Validating all image references...\n');

const allImages = getAllImageFiles();
const allRefs = findAllImageReferences();

console.log(`Found ${allImages.size} images in public directories`);
console.log(`Found ${allRefs.length} image references in code\n`);

const missing = [];
const existing = [];

for (const ref of allRefs) {
  const fullPath = path.join(__dirname, '..', 'public', ref.path.substring(1));
  if (fs.existsSync(fullPath)) {
    existing.push(ref);
  } else {
    // Try case-insensitive match
    const filename = path.basename(ref.path);
    const lowerFilename = filename.toLowerCase();
    const found = allImages.get(lowerFilename);
    
    if (found) {
      missing.push({ ...ref, suggestion: found });
    } else {
      missing.push({ ...ref, suggestion: null });
    }
  }
}

console.log(`✅ Existing: ${existing.length}`);
console.log(`❌ Missing: ${missing.length}\n`);

if (missing.length > 0) {
  console.log('Missing images:');
  const withSuggestion = missing.filter(m => m.suggestion);
  const withoutSuggestion = missing.filter(m => !m.suggestion);
  
  if (withSuggestion.length > 0) {
    console.log(`\n✅ Can be auto-fixed (${withSuggestion.length}):`);
    withSuggestion.forEach(m => {
      console.log(`  ${m.path} → ${m.suggestion}`);
      console.log(`    In: ${m.file}`);
    });
  }
  
  if (withoutSuggestion.length > 0) {
    console.log(`\n❌ Need manual fix (${withoutSuggestion.length}):`);
    withoutSuggestion.slice(0, 20).forEach(m => {
      console.log(`  ${m.path}`);
      console.log(`    In: ${m.file}`);
    });
    if (withoutSuggestion.length > 20) {
      console.log(`  ... and ${withoutSuggestion.length - 20} more`);
    }
  }
  
  // Auto-fix if requested
  if (process.argv.includes('--fix') && withSuggestion.length > 0) {
    console.log('\n🔧 Auto-fixing...');
    const filesToFix = new Map();
    
    for (const m of withSuggestion) {
      if (!filesToFix.has(m.file)) {
        filesToFix.set(m.file, []);
      }
      filesToFix.get(m.file).push({ old: m.path, new: m.suggestion });
    }
    
    for (const [filePath, replacements] of filesToFix.entries()) {
      const fullPath = path.join(__dirname, '..', filePath);
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      for (const rep of replacements) {
        // Replace src="..." or image: "..."
        content = content.replace(
          new RegExp(`(src|image):\\s*["']${rep.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'),
          `$1: "${rep.new}"`
        );
        console.log(`   ✅ Fixed ${rep.old} → ${rep.new} in ${filePath}`);
      }
      
      fs.writeFileSync(fullPath, content);
    }
    
    console.log(`\n✅ Fixed ${withSuggestion.length} image references`);
  }
}

process.exit(missing.length > 0 ? 1 : 0);
