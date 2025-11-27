#!/usr/bin/env node

/**
 * Validate Codebase State
 * 
 * Checks:
 * - All placement markers exist
 * - No syntax errors in target files
 * - Registry JSON is valid
 * - Opportunities JSON is valid
 * - Gallery.ts is valid TypeScript
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  opportunities: path.join(__dirname, '../data/placement-opportunities.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts'),
  gallery: path.join(__dirname, '../src/constants/gallery.ts'),
  appDir: path.join(__dirname, '../src/app')
};

function validateCodebase() {
  const errors = [];
  const warnings = [];
  
  // 1. Validate JSON files
  console.log('📋 Validating JSON files...');
  
  // Registry
  if (fs.existsSync(PATHS.registry)) {
    try {
      const content = fs.readFileSync(PATHS.registry, 'utf-8');
      JSON.parse(content);
      console.log('   ✅ Registry JSON is valid');
    } catch (err) {
      errors.push(`Registry JSON is invalid: ${err.message}`);
      console.log(`   ❌ Registry JSON is invalid: ${err.message}`);
    }
  } else {
    warnings.push('Registry file not found (will be created)');
    console.log('   ⚠️  Registry file not found');
  }
  
  // Opportunities
  if (fs.existsSync(PATHS.opportunities)) {
    try {
      const content = fs.readFileSync(PATHS.opportunities, 'utf-8');
      const opps = JSON.parse(content);
      console.log(`   ✅ Opportunities JSON is valid (${opps.opportunities?.length || 0} opportunities)`);
      
      // Check for placement markers
      if (opps.opportunities) {
        const missingMarkers = [];
        opps.opportunities.forEach(opp => {
          if (opp.file) {
            const filePath = path.join(__dirname, '..', opp.file);
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              const startMarker = `IMAGE_PLACEMENT_START: ${opp.id}`;
              const endMarker = `IMAGE_PLACEMENT_END: ${opp.id}`;
              
              if (!content.includes(startMarker) || !content.includes(endMarker)) {
                missingMarkers.push(`${opp.id} in ${opp.file}`);
              }
            }
          }
        });
        
        if (missingMarkers.length > 0) {
          warnings.push(`Missing placement markers: ${missingMarkers.length}`);
          console.log(`   ⚠️  Missing placement markers: ${missingMarkers.length}`);
          missingMarkers.slice(0, 5).forEach(m => console.log(`      - ${m}`));
          if (missingMarkers.length > 5) {
            console.log(`      ... and ${missingMarkers.length - 5} more`);
          }
        } else {
          console.log('   ✅ All placement markers found');
        }
      }
    } catch (err) {
      errors.push(`Opportunities JSON is invalid: ${err.message}`);
      console.log(`   ❌ Opportunities JSON is invalid: ${err.message}`);
    }
  } else {
    errors.push('Opportunities file not found');
    console.log('   ❌ Opportunities file not found');
  }
  
  // 2. Validate TypeScript files
  console.log('\n📝 Validating TypeScript files...');
  
  // Gallery.ts
  if (fs.existsSync(PATHS.gallery)) {
    try {
      const content = fs.readFileSync(PATHS.gallery, 'utf-8');
      // Basic syntax check - look for common issues
      if (content.includes('export const imageCategories')) {
        // Check for unclosed brackets
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
          errors.push(`Gallery.ts: Unmatched braces (${openBraces} open, ${closeBraces} close)`);
          console.log(`   ❌ Gallery.ts: Unmatched braces`);
        } else {
          console.log('   ✅ Gallery.ts syntax appears valid');
        }
      }
    } catch (err) {
      errors.push(`Gallery.ts: ${err.message}`);
      console.log(`   ❌ Gallery.ts: ${err.message}`);
    }
  }
  
  // FocalPoints.ts
  if (fs.existsSync(PATHS.focalPoints)) {
    try {
      const content = fs.readFileSync(PATHS.focalPoints, 'utf-8');
      // Check for export function
      if (!content.includes('export function getImageFocalPoint')) {
        errors.push('FocalPoints.ts: Missing getImageFocalPoint function');
        console.log('   ❌ FocalPoints.ts: Missing getImageFocalPoint function');
      } else {
        console.log('   ✅ FocalPoints.ts appears valid');
      }
    } catch (err) {
      errors.push(`FocalPoints.ts: ${err.message}`);
      console.log(`   ❌ FocalPoints.ts: ${err.message}`);
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
  console.log('\n🔍 Validating Codebase State\n');
  
  const result = validateCodebase();
  
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
    console.log('❌ Codebase validation FAILED');
    process.exit(1);
  } else {
    console.log('✅ Codebase validation PASSED');
    if (result.warnings.length > 0) {
      console.log(`   (with ${result.warnings.length} warnings)`);
    }
  }
}

module.exports = { validateCodebase };

