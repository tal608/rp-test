#!/usr/bin/env node

/**
 * Post-Process Validation
 * 
 * Checks after processing:
 * - All modified files are valid TypeScript
 * - No duplicate images in gallery
 * - All image references exist
 * - Build succeeds (optional)
 * - Registry is consistent
 */

const fs = require('fs');
const path = require('path');
const { safeBuildTest } = require('./safe-build-test');

const PATHS = {
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  gallery: path.join(__dirname, '../src/constants/gallery.ts'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts')
};

function validateAfterProcessing(options = {}) {
  const { checkBuild = false } = options;
  const errors = [];
  const warnings = [];
  
  console.log('\n🔍 Post-Processing Validation\n');
  
  // 1. Check for duplicate images in gallery
  console.log('📋 Checking for duplicate images...');
  if (fs.existsSync(PATHS.gallery)) {
    const content = fs.readFileSync(PATHS.gallery, 'utf-8');
    const srcMatches = [...content.matchAll(/src:\s*["']([^"']+)["']/g)];
    const srcCounts = {};
    
    srcMatches.forEach(m => {
      const src = m[1];
      srcCounts[src] = (srcCounts[src] || 0) + 1;
    });
    
    const duplicates = Object.entries(srcCounts).filter(([src, count]) => count > 1);
    if (duplicates.length > 0) {
      errors.push(`Found ${duplicates.length} duplicate images in gallery`);
      console.log(`   ❌ Found ${duplicates.length} duplicate images:`);
      duplicates.forEach(([src, count]) => {
        console.log(`      - ${src}: ${count} times`);
      });
    } else {
      console.log(`   ✅ No duplicates found (${srcMatches.length} unique images)`);
    }
  }
  
  // 2. Validate TypeScript syntax (basic checks)
  console.log('\n📝 Validating TypeScript syntax...');
  
  // Gallery.ts
  if (fs.existsSync(PATHS.gallery)) {
    const content = fs.readFileSync(PATHS.gallery, 'utf-8');
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`Gallery.ts: Unmatched braces (${openBraces} open, ${closeBraces} close)`);
      console.log(`   ❌ Gallery.ts: Unmatched braces`);
    } else {
      console.log('   ✅ Gallery.ts syntax appears valid');
    }
  }
  
  // FocalPoints.ts
  if (fs.existsSync(PATHS.focalPoints)) {
    const content = fs.readFileSync(PATHS.focalPoints, 'utf-8');
    if (!content.includes('export function getImageFocalPoint')) {
      errors.push('FocalPoints.ts: Missing getImageFocalPoint function');
      console.log('   ❌ FocalPoints.ts: Missing getImageFocalPoint function');
    } else {
      console.log('   ✅ FocalPoints.ts appears valid');
    }
  }
  
  // 3. Validate image references exist
  console.log('\n🖼️  Validating image references...');
  if (fs.existsSync(PATHS.gallery)) {
    const content = fs.readFileSync(PATHS.gallery, 'utf-8');
    const srcMatches = [...content.matchAll(/src:\s*["']([^"']+)["']/g)];
    const missingImages = [];
    
    srcMatches.forEach(m => {
      const src = m[1];
      if (src.startsWith('/')) {
        const imagePath = path.join(__dirname, '..', 'public', src);
        if (!fs.existsSync(imagePath)) {
          missingImages.push(src);
        }
      }
    });
    
    if (missingImages.length > 0) {
      errors.push(`Found ${missingImages.length} missing image files`);
      console.log(`   ❌ Found ${missingImages.length} missing images:`);
      missingImages.slice(0, 10).forEach(img => {
        console.log(`      - ${img}`);
      });
      if (missingImages.length > 10) {
        console.log(`      ... and ${missingImages.length - 10} more`);
      }
    } else {
      console.log(`   ✅ All ${srcMatches.length} image references exist`);
    }
  }
  
  // 4. Validate registry consistency
  console.log('\n📋 Validating registry consistency...');
  if (fs.existsSync(PATHS.registry)) {
    try {
      const content = fs.readFileSync(PATHS.registry, 'utf-8');
      const registry = JSON.parse(content);
      
      if (!registry.placements || !Array.isArray(registry.placements)) {
        errors.push('Registry: Invalid structure (missing placements array)');
        console.log('   ❌ Registry: Invalid structure');
      } else {
        console.log(`   ✅ Registry is valid (${registry.placements.length} placements)`);
      }
    } catch (err) {
      errors.push(`Registry: Invalid JSON - ${err.message}`);
      console.log(`   ❌ Registry: Invalid JSON`);
    }
  }
  
  // 5. Optional: Check build (ALWAYS using safe build test - NEVER unsafe version)
  if (checkBuild) {
    console.log('\n🏗️  Running build test (safe mode)...');
    // SAFETY: Always use safeBuildTest() - NEVER execSync('npm run build')
    const buildExitCode = safeBuildTest();
    if (buildExitCode !== 0) {
      errors.push('Build failed - check output for details');
      console.log('   ❌ Build failed');
      warnings.push('Run `node scripts/safe-build-test.js` manually to see full error details');
    } else {
      console.log('   ✅ Build succeeded');
    }
  }
  
  return {
    errors,
    warnings,
    valid: errors.length === 0
  };
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const checkBuild = args.includes('--check-build');
  
  const result = validateAfterProcessing({ checkBuild });
  
  console.log('\n📊 Validation Summary\n');
  
  if (result.warnings.length > 0) {
    console.log(`⚠️  Warnings (${result.warnings.length}):`);
    result.warnings.forEach(w => console.log(`   - ${w}`));
    console.log('');
  }
  
  if (result.errors.length > 0) {
    console.log(`❌ Errors (${result.errors.length}):`);
    result.errors.forEach(e => console.log(`   - ${e}`));
    console.log('');
    console.log('❌ Post-processing validation FAILED');
    process.exit(1);
  } else {
    console.log('✅ Post-processing validation PASSED');
    if (result.warnings.length > 0) {
      console.log(`   (with ${result.warnings.length} warnings)`);
    }
  }
}

module.exports = { validateAfterProcessing };

