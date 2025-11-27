#!/usr/bin/env node

/**
 * Comprehensive Missing Images Fixer
 * 
 * 1. Finds all image references in code
 * 2. Checks if they exist
 * 3. If missing, tries to find the original file or a suitable replacement
 * 4. Updates code references
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const PATHS = {
  hikingDir: path.join(__dirname, '../public/Hiking'),
  groomingDir: path.join(__dirname, '../public/Grooming'),
  csv: path.join(__dirname, '../public/Hiking/river-paws-report-2025-11-22 (3).csv'),
  appDir: path.join(__dirname, '../src/app'),
  constantsDir: path.join(__dirname, '../src/constants')
};

// Load CSV mappings
function loadCSVMappings() {
  if (!fs.existsSync(PATHS.csv)) {
    return { originalToNew: new Map(), newToOriginal: new Map() };
  }
  
  const csvContent = fs.readFileSync(PATHS.csv, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  const originalToNew = new Map();
  const newToOriginal = new Map();
  
  records.forEach(record => {
    const original = record['Original Filename']?.trim();
    const newName = record['New SEO Filename']?.trim();
    if (original && newName) {
      originalToNew.set(original, newName);
      newToOriginal.set(newName, original);
    }
  });
  
  return { originalToNew, newToOriginal };
}

// Get all existing image files
function getExistingImages() {
  const hikingFiles = new Set();
  const groomingFiles = new Set();
  
  if (fs.existsSync(PATHS.hikingDir)) {
    fs.readdirSync(PATHS.hikingDir).forEach(f => {
      if (f.endsWith('.jpg')) {
        hikingFiles.add(f);
      }
    });
  }
  
  if (fs.existsSync(PATHS.groomingDir)) {
    fs.readdirSync(PATHS.groomingDir).forEach(f => {
      if (f.endsWith('.jpg')) {
        groomingFiles.add(f);
      }
    });
  }
  
  return { hikingFiles, groomingFiles };
}

// Find all image references
function findAllImageReferences() {
  const references = [];
  
  // Check TSX files
  function getAllTSXFiles(dir) {
    const files = [];
    if (!fs.existsSync(dir)) return files;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...getAllTSXFiles(fullPath));
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    });
    return files;
  }
  
  const files = [
    ...getAllTSXFiles(PATHS.appDir),
    ...getAllTSXFiles(PATHS.constantsDir)
  ];
  
  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Match both src="/Hiking/..." and src: "/Hiking/..."
    const matches = [...content.matchAll(/src[:=]\s*["']([^"']+)["']/g)];
    
    matches.forEach(match => {
      const imagePath = match[1];
      if (imagePath.startsWith('/Hiking/') || imagePath.startsWith('/Grooming/')) {
        references.push({
          file: filePath,
          imagePath,
          filename: path.basename(imagePath),
          directory: imagePath.startsWith('/Hiking/') ? 'Hiking' : 'Grooming',
          matchIndex: match.index,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    });
  });
  
  return references;
}

// Find replacement for missing image
function findReplacement(missingRef, existingImages, mappings) {
  const { hikingFiles, groomingFiles } = existingImages;
  const { originalToNew, newToOriginal } = mappings;
  const files = missingRef.directory === 'Hiking' ? hikingFiles : groomingFiles;
  
  // Check if it's a new filename that should map to original
  if (newToOriginal.has(missingRef.filename)) {
    const original = newToOriginal.get(missingRef.filename);
    if (files.has(original)) {
      return original;
    }
  }
  
  // Check if it's an original filename that should map to new
  if (originalToNew.has(missingRef.filename)) {
    const newName = originalToNew.get(missingRef.filename);
    if (files.has(newName)) {
      return newName;
    }
  }
  
  // Check case-insensitive match
  const lowerMissing = missingRef.filename.toLowerCase();
  for (const file of files) {
    if (file.toLowerCase() === lowerMissing) {
      return file;
    }
  }
  
  return null;
}

// Main function
function fixAllMissingImages() {
  console.log('🔍 Comprehensive Image Check\n');
  
  const mappings = loadCSVMappings();
  const existingImages = getExistingImages();
  const references = findAllImageReferences();
  
  console.log(`Found ${references.length} image references`);
  console.log(`Existing Hiking images: ${existingImages.hikingFiles.size}`);
  console.log(`Existing Grooming images: ${existingImages.groomingFiles.size}\n`);
  
  const missing = [];
  const fixes = [];
  
  references.forEach(ref => {
    const files = ref.directory === 'Hiking' ? existingImages.hikingFiles : existingImages.groomingFiles;
    
    if (!files.has(ref.filename)) {
      missing.push(ref);
      console.log(`❌ Missing: ${ref.imagePath}`);
      console.log(`   File: ${path.relative(process.cwd(), ref.file)}:${ref.line}`);
      
      const replacement = findReplacement(ref, existingImages, mappings);
      if (replacement) {
        fixes.push({
          ...ref,
          replacement,
          newPath: `/${ref.directory}/${replacement}`
        });
        console.log(`   ✅ Found replacement: ${replacement}`);
      } else {
        console.log(`   ⚠️  No replacement found`);
      }
      console.log('');
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total references: ${references.length}`);
  console.log(`   Missing: ${missing.length}`);
  console.log(`   Fixable: ${fixes.length}`);
  console.log(`   Unfixable: ${missing.length - fixes.length}`);
  
  if (fixes.length > 0) {
    console.log(`\n🔧 Applying fixes...\n`);
    
    // Group fixes by file
    const fixesByFile = new Map();
    fixes.forEach(fix => {
      if (!fixesByFile.has(fix.file)) {
        fixesByFile.set(fix.file, []);
      }
      fixesByFile.get(fix.file).push(fix);
    });
    
    fixesByFile.forEach((fileFixes, filePath) => {
      let content = fs.readFileSync(filePath, 'utf-8');
      let modified = false;
      
      fileFixes.forEach(fix => {
        // Replace all occurrences of this image path in the file
        const oldPathRegex = new RegExp(fix.imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        if (content.includes(fix.imagePath)) {
          content = content.replace(oldPathRegex, fix.newPath);
          modified = true;
          console.log(`   ✅ Fixed: ${path.relative(process.cwd(), filePath)} - ${fix.imagePath} → ${fix.newPath}`);
        }
      });
      
      if (modified) {
        fs.writeFileSync(filePath, content);
      }
    });
    
    console.log(`\n✅ Fixed ${fixes.length} image references in ${fixesByFile.size} files!`);
  }
  
  return { missing, fixes };
}

if (require.main === module) {
  fixAllMissingImages();
}

module.exports = { fixAllMissingImages };

