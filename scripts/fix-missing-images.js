#!/usr/bin/env node

/**
 * Fix Missing Images Script
 * 
 * Finds all image references in the codebase and checks if they exist.
 * If missing, attempts to find the original file and fix the reference.
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const PATHS = {
  hikingDir: path.join(__dirname, '../public/Hiking'),
  groomingDir: path.join(__dirname, '../public/Grooming'),
  csv: path.join(__dirname, '../public/Hiking/river-paws-report-2025-11-22 (3).csv'),
  appDir: path.join(__dirname, '../src/app')
};

/**
 * Load CSV to get filename mappings
 */
function loadCSVMappings() {
  if (!fs.existsSync(PATHS.csv)) {
    console.log('⚠️  CSV file not found, skipping filename mappings');
    return new Map();
  }
  
  const csvContent = fs.readFileSync(PATHS.csv, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  const mappings = new Map();
  records.forEach(record => {
    const original = record['Original Filename']?.trim();
    const newName = record['New SEO Filename']?.trim();
    if (original && newName) {
      mappings.set(newName, original);
      mappings.set(original, newName);
    }
  });
  
  return mappings;
}

/**
 * Find all image references in TSX and TS files
 */
function findImageReferences() {
  const references = [];
  const appFiles = getAllTSXFiles(PATHS.appDir);
  const constantsFile = path.join(__dirname, '../src/constants/gallery.ts');
  const files = [...appFiles];
  if (fs.existsSync(constantsFile)) {
    files.push(constantsFile);
  }
  
  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Match both src="/Hiking/..." and src: "/Hiking/..." (for gallery.ts)
    const hikingMatches = [...content.matchAll(/src[:=]["']\/Hiking\/([^"']+)["']/g)];
    const groomingMatches = [...content.matchAll(/src[:=]["']\/Grooming\/([^"']+)["']/g)];
    
    hikingMatches.forEach(match => {
      references.push({
        file: filePath,
        imagePath: `/Hiking/${match[1]}`,
        filename: match[1],
        directory: 'Hiking',
        line: content.substring(0, match.index).split('\n').length
      });
    });
    
    groomingMatches.forEach(match => {
      references.push({
        file: filePath,
        imagePath: `/Grooming/${match[1]}`,
        filename: match[1],
        directory: 'Grooming',
        line: content.substring(0, match.index).split('\n').length
      });
    });
  });
  
  return references;
}

/**
 * Get all TSX files recursively
 */
function getAllTSXFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllTSXFiles(fullPath));
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

/**
 * Check if image exists
 */
function imageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  return fs.existsSync(fullPath);
}

/**
 * Find alternative filename (check if old name exists or vice versa)
 */
function findAlternativeFilename(filename, directory, mappings) {
  const dirPath = path.join(__dirname, '..', 'public', directory);
  if (!fs.existsSync(dirPath)) return null;
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg'));
  
  // Check if mapped filename exists
  if (mappings.has(filename)) {
    const mapped = mappings.get(filename);
    if (files.includes(mapped)) {
      return mapped;
    }
  }
  
  // Check if file exists with different case
  const lowerFilename = filename.toLowerCase();
  const found = files.find(f => f.toLowerCase() === lowerFilename);
  if (found) return found;
  
  // Check if it's an old filename that should be mapped
  for (const [oldName, newName] of mappings.entries()) {
    if (oldName === filename && files.includes(newName)) {
      return newName;
    }
  }
  
  return null;
}

/**
 * Fix missing images
 */
function fixMissingImages() {
  console.log('🔍 Scanning for missing images...\n');
  
  const mappings = loadCSVMappings();
  const references = findImageReferences();
  const missing = [];
  const fixes = [];
  
  console.log(`Found ${references.length} image references\n`);
  
  references.forEach(ref => {
    if (!imageExists(ref.imagePath)) {
      missing.push(ref);
      console.log(`❌ Missing: ${ref.imagePath} in ${path.relative(process.cwd(), ref.file)}:${ref.line}`);
      
      // Try to find alternative
      const alternative = findAlternativeFilename(ref.filename, ref.directory, mappings);
      if (alternative) {
        const newPath = `/${ref.directory}/${alternative}`;
        fixes.push({
          ...ref,
          newPath,
          alternative
        });
        console.log(`   ✅ Found alternative: ${newPath}`);
      } else {
        console.log(`   ⚠️  No alternative found`);
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   Missing images: ${missing.length}`);
  console.log(`   Fixable: ${fixes.length}`);
  console.log(`   Unfixable: ${missing.length - fixes.length}`);
  
  if (fixes.length > 0) {
    console.log(`\n🔧 Applying fixes...`);
    fixes.forEach(fix => {
      const content = fs.readFileSync(fix.file, 'utf-8');
      const newContent = content.replace(
        new RegExp(`src=["']${fix.imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'),
        `src="${fix.newPath}"`
      );
      fs.writeFileSync(fix.file, newContent);
      console.log(`   ✅ Fixed: ${path.relative(process.cwd(), fix.file)}`);
    });
    console.log(`\n✅ Fixed ${fixes.length} image references!`);
  }
  
  return { missing, fixes };
}

if (require.main === module) {
  fixMissingImages();
}

module.exports = { fixMissingImages };
