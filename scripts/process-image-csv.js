#!/usr/bin/env node

/**
 * Image CSV Processing Script
 * 
 * Processes CSV files containing image optimization data and:
 * 1. Matches images to placement opportunities
 * 2. Compares against current placements
 * 3. Generates placement recommendations
 * 4. Updates code files and registry
 * 
 * Usage:
 *   node scripts/process-image-csv.js --csv path/to/file.csv [--dry-run] [--execute]
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const CONFIG = {
  replacementThresholds: {
    critical: 0.3,  // Hero images
    high: 0.5,      // Service pages
    medium: 0.7,    // Section images
    low: 1.0        // Supporting images
  },
  maxRotations: 5,
  strictCityMatch: true
};

// File paths
const PATHS = {
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  opportunities: path.join(__dirname, '../data/placement-opportunities.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts'),
  gallery: path.join(__dirname, '../src/constants/gallery.ts'),
  blogArticles: path.join(__dirname, '../src/constants/blogArticles.ts')
};

/**
 * Parse CSV file
 */
function parseCSV(csvPath) {
  try {
    // Check if file exists
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found: ${csvPath}`);
    }
    
    // Read file with error handling
    let csvContent;
    try {
      csvContent = fs.readFileSync(csvPath, 'utf-8');
    } catch (err) {
      throw new Error(`Could not read CSV file: ${err.message}`);
    }
    
    if (!csvContent || csvContent.trim().length === 0) {
      throw new Error('CSV file is empty');
    }
    
    // Parse CSV with error handling
    let records;
    try {
      records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });
    } catch (err) {
      throw new Error(`CSV parsing failed: ${err.message}`);
    }
    
    if (!records || records.length === 0) {
      throw new Error('CSV file contains no valid records');
    }
    
    // Determine directory from CSV path (e.g., .../public/Hiking/file.csv -> Hiking)
    // Normalize path separators and extract directory name
    const normalizedPath = csvPath.replace(/\\/g, '/');
    const csvDir = path.dirname(normalizedPath);
    const directoryName = path.basename(csvDir); // Gets "Hiking" or "Grooming"

    // Validate directory name
    if (!directoryName || directoryName === '.' || directoryName === 'public') {
      throw new Error(`Could not determine image directory from CSV path: ${csvPath}. CSV must be inside a subdirectory of public/ (e.g., public/Hiking/)`);
    }
    
    // Map records with validation
    const images = records.map((record, index) => {
      try {
        return {
          originalFilename: record['Original Filename']?.trim() || '',
          newFilename: record['New SEO Filename']?.trim() || '',
          targetCity: record['Target City (Filename Only)']?.trim() || record['Target City']?.trim() || '',
          score: parseFloat(record['Total Score']) || 0,
          emotional: parseFloat(record['Emotional (25%)']) || 0,
          technical: parseFloat(record['Technical (20%)']) || 0,
          brand: parseFloat(record['Brand (20%)']) || 0,
          marketing: parseFloat(record['Marketing (20%)']) || 0,
          seo: parseFloat(record['SEO (15%)']) || 0,
          focalX: parseFloat(record['Focal X (%)']) || 50,
          focalY: parseFloat(record['Focal Y (%)']) || 40,
          category: record['Category']?.trim() || '', // Full category like "Adventure / Hiking"
          directory: directoryName, // Directory name like "Hiking" or "Grooming"
          altText: record['Alt Text']?.trim() || '',
          caption: record['Caption']?.trim() || '',
          placementTags: (record['Placement Tags'] || record['Placement Tag'] || '').split(';').map(t => t.trim()).filter(Boolean),
          reasoning: record['Reasoning']?.trim() || ''
        };
      } catch (err) {
        throw new Error(`Error parsing record ${index + 1}: ${err.message}`);
      }
    }).filter(img => img.originalFilename && img.newFilename); // Filter out invalid records
    
    if (images.length === 0) {
      throw new Error('No valid image records found in CSV');
    }
    
    return images;
  } catch (error) {
    console.error(`❌ Error parsing CSV: ${error.message}`);
    throw error; // Re-throw to be caught by caller
  }
}

/**
 * Load JSON data files
 */
function loadData() {
  try {
    // Check if files exist first
    if (!fs.existsSync(PATHS.registry)) {
      throw new Error(`Registry file not found: ${PATHS.registry}`);
    }
    if (!fs.existsSync(PATHS.opportunities)) {
      throw new Error(`Opportunities file not found: ${PATHS.opportunities}`);
    }
    
    // Read and parse with error handling
    const registryContent = fs.readFileSync(PATHS.registry, 'utf-8');
    const opportunitiesContent = fs.readFileSync(PATHS.opportunities, 'utf-8');
    
    let registry, opportunities;
    try {
      registry = JSON.parse(registryContent);
    } catch (err) {
      throw new Error(`Invalid JSON in registry file: ${err.message}`);
    }
    
    try {
      opportunities = JSON.parse(opportunitiesContent);
    } catch (err) {
      throw new Error(`Invalid JSON in opportunities file: ${err.message}`);
    }
    
    // Validate structure
    if (!registry.placements || !Array.isArray(registry.placements)) {
      throw new Error('Registry file missing placements array');
    }
    if (!opportunities.opportunities || !Array.isArray(opportunities.opportunities)) {
      throw new Error('Opportunities file missing opportunities array');
    }
    
    return { registry, opportunities };
  } catch (error) {
    console.error(`❌ Error loading data files: ${error.message}`);
    console.error(`   Registry: ${PATHS.registry}`);
    console.error(`   Opportunities: ${PATHS.opportunities}`);
    throw error; // Re-throw to be caught by caller
  }
}

/**
 * Calculate placement match score
 */
function calculatePlacementScore(image, opportunity) {
  let score = 0;
  const req = opportunity.requirements;
  
  // Tag Match (40% weight)
  const requiredTags = req.requiredTags || [];
  const tagMatches = image.placementTags.filter(tag => 
    requiredTags.some(reqTag => tag.toLowerCase().includes(reqTag.toLowerCase()))
  ).length;
  const tagScore = requiredTags.length > 0 ? tagMatches / requiredTags.length : 0.5;
  score += tagScore * 40;
  
  // Category Match (20% weight)
  const preferredCategories = req.preferredCategories || [];
  const categoryMatch = preferredCategories.some(cat => 
    image.category && image.category.toLowerCase().includes(cat.toLowerCase().split('/')[0].trim())
  ) ? 1 : 0;
  score += categoryMatch * 20;
  
  // Score Above Minimum (20% weight)
  const scoreAboveMin = image.score >= req.minScore 
    ? Math.min((image.score - req.minScore) / 2, 1) 
    : 0;
  score += scoreAboveMin * 20;
  
  // City Match (10% weight) - STRICT
  const preferredCities = req.preferredCities || [];
  const cityMatch = CONFIG.strictCityMatch && req.strictCityMatch !== false
    ? (image.targetCity && preferredCities.includes(image.targetCity)) ? 1 : 0
    : preferredCities.includes(image.targetCity) ? 1 : 0;
  score += cityMatch * 10;
  
  // Content Context Match (10% weight) - simplified
  const contextMatch = 0.5; // Would use NLP in production
  score += contextMatch * 10;
  
  return score;
}

/**
 * Find matching opportunities for an image
 */
function findMatchingOpportunities(image, opportunities) {
  const matches = [];
  
  for (const opp of opportunities) {
    const req = opp.requirements;
    
    // Check minimum score
    if (image.score < req.minScore) continue;
    
    // Check strict city match if required
    if (CONFIG.strictCityMatch && req.strictCityMatch && image.targetCity) {
      if (!req.preferredCities.includes(image.targetCity)) continue;
    }
    
    // Check if image has required tags
    const hasRequiredTag = req.requiredTags.some(reqTag =>
      image.placementTags.some(tag => tag.toLowerCase().includes(reqTag.toLowerCase()))
    );
    
    if (!hasRequiredTag) continue;
    
    // Calculate match score
    const matchScore = calculatePlacementScore(image, opp);
    
    if (matchScore > 30) { // Minimum threshold
      matches.push({
        opportunity: opp,
        score: matchScore,
        image: image
      });
    }
  }
  
  return matches.sort((a, b) => b.score - a.score);
}

/**
 * Check if image should replace current placement
 */
function shouldReplace(currentPlacement, newImage, opportunity) {
  // Get current image (first in array)
  const currentImage = currentPlacement.currentImages && currentPlacement.currentImages[0] ? currentPlacement.currentImages[0] : null;
  
  if (!currentImage) {
    return { shouldReplace: true, reason: 'No current image', improvement: newImage.score };
  }
  
  // Don't replace if locked
  if (currentImage.locked) {
    return { shouldReplace: false, reason: 'Image is locked' };
  }
  
  // Check if image is in locked list
  if (opportunity.lockedImages && opportunity.lockedImages.includes(newImage.newFilename)) {
    return { shouldReplace: false, reason: 'Image is in locked list' };
  }
  
  const currentScore = currentImage.score || 0;
  const threshold = CONFIG.replacementThresholds[opportunity.requirements.priority] || 0.5;
  
  if (newImage.score >= currentScore + threshold) {
    return { 
      shouldReplace: true, 
      reason: `Score improvement: ${(newImage.score - currentScore).toFixed(2)} (threshold: ${threshold})`,
      improvement: newImage.score - currentScore
    };
  }
  
  return { shouldReplace: false, reason: 'Score improvement below threshold' };
}

/**
 * Process CSV and generate recommendations
 */
function processCSV(csvPath, dryRun = true) {
  console.log('📊 Processing CSV file:', csvPath);
  console.log('Mode:', dryRun ? 'DRY RUN (no changes will be made)' : 'EXECUTE (changes will be applied)');
  console.log('');
  
  // Parse CSV with error handling
  let images;
  try {
    images = parseCSV(csvPath);
    console.log(`✅ Parsed ${images.length} images from CSV\n`);
  } catch (error) {
    console.error(`❌ Failed to parse CSV: ${error.message}`);
    throw error;
  }
  
  // Load current state with error handling
  let registry, opportunities;
  try {
    const data = loadData();
    registry = data.registry;
    opportunities = data.opportunities;
    console.log(`✅ Loaded ${opportunities.opportunities.length} placement opportunities\n`);
  } catch (error) {
    console.error(`❌ Failed to load data files: ${error.message}`);
    throw error;
  }
  
  const recommendations = {
    newPlacements: [],
    replacements: [],
    galleryAdditions: [],
    rotations: [],
    skipped: []
  };
  
  // Process each image with error handling
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    try {
      const matches = findMatchingOpportunities(image, opportunities.opportunities);
      
      if (matches.length === 0) {
        recommendations.skipped.push({
          image: image.newFilename,
          reason: 'No matching opportunities found'
        });
        continue;
      }
      
      // Process top match for specific placement
      const topMatch = matches[0];
      const opp = topMatch.opportunity;
      
      // FORCE GALLERY ADDITION: Ensure every image gets into the appropriate gallery category
      // regardless of tags, based purely on the CSV Category column.
      const imgCat = (image.category || '').toLowerCase();
      let targetGalleryCat = null;
      
      if (imgCat.includes('hiking') || imgCat.includes('adventure')) targetGalleryCat = 'hiking';
      else if (imgCat.includes('grooming') || imgCat.includes('spa') || imgCat.includes('bath')) targetGalleryCat = 'grooming';
      else if (imgCat.includes('transport') || imgCat.includes('bus')) targetGalleryCat = 'transport';
      else if (imgCat.includes('boarding')) targetGalleryCat = 'boarding';
      else if (imgCat.includes('daycare') || imgCat.includes('play')) targetGalleryCat = 'daycare';
      else if (imgCat.includes('social') || imgCat.includes('community') || imgCat.includes('celebration')) targetGalleryCat = 'playtime';
      
      if (targetGalleryCat) {
        // Find the opportunity definition for this gallery category to get the ID
        const galleryOppDef = opportunities.opportunities.find(o => o.category === targetGalleryCat);
        if (galleryOppDef) {
           const alreadyAdded = recommendations.galleryAdditions.some(
            a => a.image.newFilename === image.newFilename && a.category === targetGalleryCat
          );
          
          if (!alreadyAdded) {
            recommendations.galleryAdditions.push({
              image: image,
              category: targetGalleryCat,
              opportunity: galleryOppDef.id
            });
          }
        } else {
          // Warn if gallery opportunity is missing - this means images won't be added to gallery
          recommendations.skipped.push({
            image: image.newFilename,
            reason: `Gallery opportunity 'gallery-category-${targetGalleryCat}' not found in placement-opportunities.json`
          });
          console.warn(`⚠️  Warning: Image ${image.newFilename} (category: ${image.category}) should go to '${targetGalleryCat}' gallery, but opportunity definition is missing. Image will be skipped.`);
        }
      }
      
      // Check for existing placement (using top match)
      const existingPlacement = registry.placements.find(p => p.id === opp.id);
      
      if (existingPlacement) {
        // Check if should replace
        const replaceDecision = shouldReplace(existingPlacement, image, opp);
        
        if (replaceDecision.shouldReplace) {
          recommendations.replacements.push({
            opportunity: opp.id,
            currentImage: existingPlacement.currentImages && existingPlacement.currentImages[0] ? existingPlacement.currentImages[0] : null,
            newImage: image,
            reason: replaceDecision.reason,
            improvement: replaceDecision.improvement
          });
        } else {
          // Check if rotation is enabled and we can add to rotation
          if (opp.rotationEnabled && opp.maxRotations) {
            const currentRotations = registry.placements.filter(p => p.id === opp.id);
            if (currentRotations.length < opp.maxRotations) {
              // Validate image exists before adding to rotations
              const imageDir = image.directory || 'Grooming';
              const imagePath = path.join(__dirname, '..', 'public', imageDir, image.newFilename);
              if (fs.existsSync(imagePath)) {
                recommendations.rotations.push({
                  opportunity: opp.id,
                  image: image,
                  currentCount: currentRotations.length,
                  maxRotations: opp.maxRotations
                });
              } else {
                recommendations.skipped.push({
                  image: image.newFilename,
                  reason: `Image does not exist for rotation: ${imagePath}`
                });
                console.warn(`⚠️  Skipping rotation - image does not exist: ${imagePath}`);
              }
            }
          }
        }
      } else {
        // New placement
        recommendations.newPlacements.push({
          opportunity: opp.id,
          image: image,
          matchScore: topMatch.score
        });
      }
    } catch (err) {
      console.warn(`⚠️  Error processing image ${i + 1} (${image.newFilename || image.originalFilename}): ${err.message}`);
      recommendations.skipped.push({
        image: image.newFilename || image.originalFilename || `image-${i + 1}`,
        reason: `Processing error: ${err.message}`
      });
      // Continue processing other images instead of crashing
    }
  }
  
  // Generate report with error handling
  try {
    generateReport(recommendations, dryRun);
  } catch (err) {
    console.error(`❌ Error generating report: ${err.message}`);
    throw err;
  }
  
  // Execute if not dry run
  if (!dryRun) {
    try {
      console.log('\n🚀 Executing updates...');
      executeUpdates(recommendations, images, registry, opportunities);
    } catch (err) {
      console.error(`❌ Error executing updates: ${err.message}`);
      throw err;
    }
  }
  
  return recommendations;
}

/**
 * Generate report
 */
function generateReport(recommendations, dryRun) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📋 PROCESSING REPORT');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log(`✅ New Placements: ${recommendations.newPlacements.length}`);
  recommendations.newPlacements.forEach(rec => {
    console.log(`   - ${rec.opportunity}: ${rec.image.newFilename} (score: ${rec.image.score}, match: ${rec.matchScore.toFixed(1)})`);
  });
  
  console.log(`\n🔄 Replacements: ${recommendations.replacements.length}`);
  recommendations.replacements.forEach(rec => {
    console.log(`   - ${rec.opportunity}:`);
    if (rec.currentImage) {
      console.log(`     Current: ${rec.currentImage.filename} (score: ${rec.currentImage.score})`);
    } else {
      console.log(`     Current: (none)`);
    }
    console.log(`     New: ${rec.newImage.newFilename} (score: ${rec.newImage.score}, improvement: +${rec.improvement.toFixed(2)})`);
    console.log(`     Reason: ${rec.reason}`);
  });
  
  console.log(`\n🔄 Rotations: ${recommendations.rotations.length}`);
  recommendations.rotations.forEach(rec => {
    console.log(`   - ${rec.opportunity}: ${rec.image.newFilename} (${rec.currentCount + 1}/${rec.maxRotations})`);
  });
  
  console.log(`\n🖼️  Gallery Additions: ${recommendations.galleryAdditions.length}`);
  const byCategory = {};
  recommendations.galleryAdditions.forEach(rec => {
    if (!byCategory[rec.category]) byCategory[rec.category] = [];
    byCategory[rec.category].push(rec.image.newFilename);
  });
  Object.entries(byCategory).forEach(([cat, imgs]) => {
    console.log(`   - ${cat}: ${imgs.length} images`);
  });
  
  console.log(`\n⏭️  Skipped: ${recommendations.skipped.length}`);
  if (recommendations.skipped.length > 0 && recommendations.skipped.length <= 10) {
    recommendations.skipped.forEach(rec => {
      console.log(`   - ${rec.image}: ${rec.reason}`);
    });
  } else if (recommendations.skipped.length > 10) {
    console.log(`   (Showing first 10 of ${recommendations.skipped.length})`);
    recommendations.skipped.slice(0, 10).forEach(rec => {
      console.log(`   - ${rec.image}: ${rec.reason}`);
    });
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
}

/**
 * Execute updates - Full implementation
 */
function executeUpdates(recommendations, images, registry, opportunities) {
  console.log('\n🚀 Executing updates...\n');
  
  // 0. Pre-validation: Check all original files exist before starting
  console.log('🔍 Pre-validation: Checking original files exist...');
  const missingOriginals = [];
  for (const image of images) {
    const imageDir = image.directory;
    if (!imageDir) {
      console.error(`   ⚠️  Image missing directory: ${image.originalFilename}`);
      continue;
    }
    const oldPath = path.join(__dirname, '..', 'public', imageDir, image.originalFilename);
    if (!fs.existsSync(oldPath)) {
      missingOriginals.push({ original: image.originalFilename, directory: imageDir });
    }
  }
  if (missingOriginals.length > 0) {
    console.error(`   ⚠️  WARNING: ${missingOriginals.length} original files not found:`);
    missingOriginals.forEach(m => console.error(`      - ${m.directory}/${m.original}`));
    console.error(`   ⚠️  These images will be skipped. Code will NOT be updated for missing files.\n`);
  } else {
    console.log(`   ✅ All ${images.length} original files found\n`);
  }
  
  // 1. Rename image files
  console.log('📁 Step 1: Renaming image files...');
  const renamedImages = new Map(); // Track renamed files for validation
  
  for (const image of images) {
    // Use directory from CSV path
    const imageDir = image.directory;
    if (!imageDir) {
      console.error(`   ⚠️  Skipping rename - missing directory for: ${image.originalFilename}`);
      continue;
    }
    const oldPath = path.join(__dirname, '..', 'public', imageDir, image.originalFilename);
    const newPath = path.join(__dirname, '..', 'public', imageDir, image.newFilename);
    
    // Skip if already validated as missing
    if (missingOriginals.some(m => m.original === image.originalFilename && m.directory === imageDir)) {
      continue;
    }
    
    if (!fs.existsSync(oldPath)) {
      console.error(`   ⚠️  File not found: ${oldPath}`);
      console.error(`       Looking for: ${image.originalFilename}`);
      console.error(`       Directory: ${imageDir}`);
      const dirPath = path.dirname(oldPath);
      if (fs.existsSync(dirPath)) {
        const available = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg'));
        console.error(`       Available files (${available.length} total): ${available.slice(0, 10).join(', ')}${available.length > 10 ? '...' : ''}`);
      } else {
        console.error(`       Directory does not exist: ${dirPath}`);
      }
      continue;
    }
    
    if (oldPath !== newPath) {
      try {
        // Ensure directory exists
        const dir = path.dirname(newPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.renameSync(oldPath, newPath);
        console.log(`   ✅ Renamed: ${image.originalFilename} → ${image.newFilename}`);
        renamedImages.set(`/${imageDir}/${image.newFilename}`, true);
      } catch (error) {
        console.error(`   ❌ Error renaming ${image.originalFilename}:`, error.message);
      }
    } else {
      console.log(`   ⏭️  Skipped (same name): ${image.originalFilename}`);
      renamedImages.set(`/${imageDir}/${image.newFilename}`, true);
    }
  }
  
  // Validate all renamed images exist
  console.log('\n🔍 Validating renamed images exist...');
  let validationErrors = 0;
  const missingAfterRename = [];
  for (const [imagePath] of renamedImages) {
    const fullPath = path.join(__dirname, '..', 'public', imagePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`   ❌ Missing after rename: ${imagePath}`);
      missingAfterRename.push(imagePath);
      validationErrors++;
    }
  }
  if (validationErrors === 0) {
    console.log(`   ✅ All ${renamedImages.size} renamed images validated`);
  } else {
    console.error(`   ⚠️  ${validationErrors} images missing after rename - code updates may fail!`);
    console.error(`   Missing images: ${missingAfterRename.join(', ')}`);
  }
  
  // 2. Update focal points
  console.log('\n🎯 Step 2: Updating focal points...');
  updateFocalPoints(images);
  
  // 3. Update placements in page files
  console.log('\n📝 Step 3: Updating page files...');
  updatePageFiles(recommendations, images, opportunities);
  
  // 4. Update gallery.ts
  console.log('\n🖼️  Step 4: Updating gallery...');
  updateGallery(recommendations, images);
  
  // 5. Update blog articles
  console.log('\n📰 Step 5: Updating blog articles...');
  updateBlogArticles(recommendations, images, opportunities);
  
  // 6. Update registry
  console.log('\n📋 Step 6: Updating registry...');
  updateRegistry(recommendations, images, registry, opportunities);
  
  // Save registry
  fs.writeFileSync(PATHS.registry, JSON.stringify(registry, null, 2));
  console.log('\n✅ All updates completed!');
}

/**
 * Update focal points in imageFocalPoints.ts
 */
function updateFocalPoints(images) {
  const focalPointsFile = PATHS.focalPoints;
  let content = fs.readFileSync(focalPointsFile, 'utf-8');
  
  for (const image of images) {
    const filename = image.newFilename;
    const focalX = image.focalX || 50;
    const focalY = image.focalY || 40;
    
    // Check if entry exists
    const entryPattern = new RegExp(`'${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*\\{[^}]+\\}`, 'g');
    
    if (entryPattern.test(content)) {
      // Update existing entry
      content = content.replace(
        entryPattern,
        `'${filename}': { x: ${focalX}, y: ${focalY} }`
      );
      console.log(`   ✅ Updated focal point: ${filename}`);
    } else {
      // Find the closing brace of focalPointMap object (before the function definition)
      // Look for the pattern: }; followed by a newline and then /** or export function
      const mapEndPattern = /(\};\s*\n\s*\n\s*\/\*\*|\};\s*\n\s*export function)/;
      const mapEndMatch = content.match(mapEndPattern);
      
      if (mapEndMatch) {
        // Insert before the closing brace of focalPointMap
        const insertPoint = mapEndMatch.index;
        const newEntry = `  '${filename}': { x: ${focalX}, y: ${focalY} },\n`;
        content = content.slice(0, insertPoint) + newEntry + content.slice(insertPoint);
        console.log(`   ✅ Added focal point: ${filename}`);
      } else {
        // Fallback: find the last }; before "export function"
        const exportFunctionIndex = content.indexOf('export function getImageFocalPoint');
        if (exportFunctionIndex > 0) {
          const beforeFunction = content.substring(0, exportFunctionIndex);
          const lastBraceIndex = beforeFunction.lastIndexOf('};');
          if (lastBraceIndex > 0) {
            const newEntry = `  '${filename}': { x: ${focalX}, y: ${focalY} },\n`;
            content = content.slice(0, lastBraceIndex) + newEntry + content.slice(lastBraceIndex);
            console.log(`   ✅ Added focal point: ${filename}`);
          } else {
            console.error(`   ⚠️  Could not find insertion point for: ${filename}`);
          }
        } else {
          console.error(`   ⚠️  Could not find insertion point for: ${filename}`);
        }
      }
    }
  }
  
  fs.writeFileSync(focalPointsFile, content);
}

/**
 * Adjust focal point Y coordinate based on container height
 * Shorter containers need lower Y values to show more of the top of the image
 * @param {number} originalY - Original Y focal point (0-100)
 * @param {string} containerHeight - Tailwind height class (e.g., "h-48", "h-screen")
 * @returns {number} Adjusted Y focal point
 */
function adjustFocalPointForContainer(originalY, containerHeight) {
  try {
    // Validate inputs
    if (typeof originalY !== 'number' || isNaN(originalY)) {
      console.warn(`   ⚠️  Invalid focal point Y value: ${originalY}, using default 40`);
      return 40; // Default fallback
    }
    
    if (!containerHeight || typeof containerHeight !== 'string') {
      return originalY; // No adjustment if height not specified or invalid
    }
    
    // Map container heights to adjustment factors
    // Negative adjustment = lower Y value = move focus higher up
    const heightAdjustments = {
      'h-32': -15,  // Very short (128px) - move focus significantly higher
      'h-40': -12,  // Short (160px)
      'h-48': -10,  // Short (192px) - like card images
      'h-56': -8,   // Medium-short (224px)
      'h-64': -5,   // Medium (256px)
      'h-72': -3,   // Medium-tall (288px)
      'h-80': -2,   // Tall (320px)
      'h-96': -1,   // Very tall (384px)
      'h-screen': 0, // Full height - no adjustment
    };
    
    const adjustment = heightAdjustments[containerHeight] || 0;
    const adjustedY = Math.max(10, Math.min(90, originalY + adjustment)); // Clamp between 10-90%
    
    return adjustedY;
  } catch (error) {
    console.warn(`   ⚠️  Error adjusting focal point: ${error.message}, using original value`);
    return originalY || 40; // Fallback to original or default
  }
}

/**
 * Update page files with new image placements
 */
function updatePageFiles(recommendations, images, opportunities) {
  // Track files being modified to avoid reading stale content
  const filesBeingModified = new Map(); // filePath -> content
  
  // Validate images exist before updating code
  const defaultImageDir = images[0]?.directory;
  if (!defaultImageDir) {
     console.warn('   ⚠️  Warning: Could not determine default directory from first image.');
  }
  const imageValidation = new Map();
  const missingImages = [];
  for (const image of images) {
    const imageDir = image.directory || defaultImageDir;
    if (!imageDir) {
      console.warn(`   ⚠️  Skipping image validation - no directory for ${image.newFilename}`);
      continue;
    }
    const imagePath = path.join(__dirname, '..', 'public', imageDir, image.newFilename);
    const exists = fs.existsSync(imagePath);
    imageValidation.set(`/${imageDir}/${image.newFilename}`, exists);
    if (!exists) {
      missingImages.push(`/${imageDir}/${image.newFilename}`);
      console.error(`   ⚠️  Image does not exist: ${imagePath}`);
    }
  }
  
  if (missingImages.length > 0) {
    console.error(`\n   ⚠️  WARNING: ${missingImages.length} images are missing and will be skipped:`);
    missingImages.forEach(img => console.error(`      - ${img}`));
    console.error(`   ⚠️  Code will NOT be updated for these images to prevent broken references.\n`);
  }
  
  // CRITICAL: Validate ALL existing image references in codebase before making changes
  console.log('   🔍 Validating existing image references in codebase...');
  const brokenReferences = [];
  for (const opp of opportunities.opportunities) {
    if (!opp.file) continue;
    const filePath = path.join(__dirname, '..', opp.file);
    if (!fs.existsSync(filePath)) continue;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const markerStart = `IMAGE_PLACEMENT_START: ${opp.id}`;
    const markerEnd = `IMAGE_PLACEMENT_END: ${opp.id}`;
    const startIdx = content.indexOf(markerStart);
    const endIdx = content.indexOf(markerEnd);
    
    if (startIdx === -1 || endIdx === -1) continue;
    
    const section = content.substring(startIdx, endIdx + markerEnd.length);
    const srcMatches = section.matchAll(/src=["']([^"']+)["']/g);
    
    for (const match of srcMatches) {
      const imageSrc = match[1];
      // Skip if it's a Next.js optimized image URL
      if (imageSrc.startsWith('/_next/image')) continue;
      
      // Check if image exists
      const fullImagePath = path.join(__dirname, '..', 'public', imageSrc);
      if (!fs.existsSync(fullImagePath)) {
        brokenReferences.push({
          file: opp.file,
          opportunity: opp.id,
          image: imageSrc,
          line: content.substring(0, match.index).split('\n').length
        });
        console.error(`   ⚠️  BROKEN REFERENCE: ${opp.file} (${opp.id}) references missing image: ${imageSrc}`);
      }
    }
  }
  
  if (brokenReferences.length > 0) {
    console.error(`\n   ⚠️  WARNING: Found ${brokenReferences.length} broken image references in codebase:`);
    brokenReferences.forEach(ref => {
      console.error(`      - ${ref.file}:${ref.line} (${ref.opportunity}) → ${ref.image}`);
    });
    console.error(`   ⚠️  These will be fixed by new placements, but consider reviewing manually.\n`);
  } else {
    console.log(`   ✅ All existing image references validated\n`);
  }
  
  // Process new placements
  for (const placement of recommendations.newPlacements) {
    const opp = opportunities.opportunities.find(o => o.id === placement.opportunity);
    if (!opp || !opp.file) continue;
    
    const image = images.find(img => img.newFilename === placement.image.newFilename);
    if (!image) continue;
    
    // Validate image exists before updating code
    const imageDir = image.directory || defaultImageDir;
    const imagePath = `/${imageDir}/${image.newFilename}`;
    const fullImagePath = path.join(__dirname, '..', 'public', imageDir, image.newFilename);
    if (!fs.existsSync(fullImagePath)) {
      console.error(`   ⚠️  Skipping placement - image does not exist: ${imagePath} (checked: ${fullImagePath})`);
      continue;
    }
    
    const filePath = path.join(__dirname, '..', opp.file);
    if (!fs.existsSync(filePath)) continue;
    
    // Get or read file content (use cached version if already modified)
    let content = filesBeingModified.get(filePath);
    if (!content) {
      content = fs.readFileSync(filePath, 'utf-8');
      filesBeingModified.set(filePath, content);
    }
    
    const markerStart = `IMAGE_PLACEMENT_START: ${opp.id}`;
    const markerEnd = `IMAGE_PLACEMENT_END: ${opp.id}`;
    
    const startIdx = content.indexOf(markerStart);
    const endIdx = content.indexOf(markerEnd);
    
    if (startIdx === -1 || endIdx === -1) {
      console.warn(`   ⚠️  Markers not found for ${opp.id} in ${opp.file}`);
      continue;
    }
    
    // Extract section (include markers for proper replacement)
    const beforeSection = content.substring(0, startIdx);
    const section = content.substring(startIdx, endIdx + markerEnd.length);
    const afterSection = content.substring(endIdx + markerEnd.length);
    
    // Build new section with all updates
    let newSection = section;
    
    // Update src - use directory, not category
    const imagePathForSrc = image.path || `/${imageDir}/${image.newFilename}`;
    newSection = newSection.replace(
      /src=["'][^"']+["']/,
      `src="${imagePathForSrc}"`
    );
    
    // Update alt - handle corrupted concatenated alt texts
    if (image.altText) {
      // Match alt attribute precisely: alt="..." or alt='...'
      // Stop at the first closing quote that's followed by whitespace, >, or another attribute name (className, style, etc.)
      // This prevents matching beyond the alt attribute into className or other attributes
      const altRegex = /alt=["'](?:[^"']|\\["'])*["'](?=\s|>|[a-z-]+=)/gi;
      const escapedAltText = image.altText.replace(/"/g, '&quot;');
      // Only replace if we find a match - this prevents corrupting valid code
      if (altRegex.test(newSection)) {
        // Reset regex lastIndex for next match
        altRegex.lastIndex = 0;
        newSection = newSection.replace(altRegex, `alt="${escapedAltText}"`);
      }
    }
    
    // Update objectPosition if focal point exists
    // Adjust focal point based on container height if specified
    if (image.focalX && image.focalY) {
      try {
        // Validate focal point values are numbers
        const focalX = typeof image.focalX === 'number' ? image.focalX : parseFloat(image.focalX) || 50;
        const focalY = typeof image.focalY === 'number' ? image.focalY : parseFloat(image.focalY) || 40;
        
        // Safely get container height from opportunity
        const containerHeight = (opp && opp.containerHeight) ? opp.containerHeight : null;
        const adjustedY = adjustFocalPointForContainer(focalY, containerHeight);
        
        // If adjustment was made, we need to use inline style with adjusted values
        // Otherwise, use the function call
        const imagePathForFocal = image.path || `/${imageDir}/${image.newFilename}`;
        
        let newStyle;
        if (containerHeight && adjustedY !== focalY) {
          // Use adjusted focal point directly in style
          // Ensure values are valid numbers and within bounds
          const safeX = Math.max(0, Math.min(100, focalX));
          const safeY = Math.max(0, Math.min(100, adjustedY));
          newStyle = `style={{ objectPosition: '${safeX}% ${safeY}%' }}`;
        } else {
          // Use function call (will use original focal point from file)
          const focalPointFn = `getImageObjectPosition("${imagePathForFocal}")`;
          newStyle = `style={{ objectPosition: ${focalPointFn} }}`;
        }
        
        const styleRegex = /style=\{\{[^}]*objectPosition[^}]*\}\}/;
        
        if (styleRegex.test(newSection)) {
          // Replace existing style
          newSection = newSection.replace(styleRegex, newStyle);
        } else {
          // Add style if missing - find Image tag and add style attribute
          const imageTagRegex = /(<Image[^>]*)(\s*\/?>)/;
          if (imageTagRegex.test(newSection)) {
            newSection = newSection.replace(imageTagRegex, `$1 ${newStyle}$2`);
          }
        }
      } catch (error) {
        console.warn(`   ⚠️  Error updating focal point for ${image.newFilename}: ${error.message}`);
        // Fallback to function call if adjustment fails
        try {
          const imagePathForFocal = image.path || `/${imageDir}/${image.newFilename}`;
          const focalPointFn = `getImageObjectPosition("${imagePathForFocal}")`;
          const newStyle = `style={{ objectPosition: ${focalPointFn} }}`;
          const styleRegex = /style=\{\{[^}]*objectPosition[^}]*\}\}/;
          if (styleRegex.test(newSection)) {
            newSection = newSection.replace(styleRegex, newStyle);
          }
        } catch (fallbackError) {
          console.warn(`   ⚠️  Fallback focal point update also failed: ${fallbackError.message}`);
        }
      }
    }
    
    // Reconstruct content with updated section
    content = beforeSection + newSection + afterSection;
    filesBeingModified.set(filePath, content);
  }
  
  // Process replacements (similar logic)
  for (const replacement of recommendations.replacements) {
    const opp = opportunities.opportunities.find(o => o.id === replacement.opportunity);
    if (!opp || !opp.file) continue;
    
    const image = replacement.newImage;
    
    // Validate image exists before updating code
    const imageDir = image.directory || defaultImageDir;
    const imagePath = `/${imageDir}/${image.newFilename}`;
    const fullImagePath = path.join(__dirname, '..', 'public', imageDir, image.newFilename);
    if (!fs.existsSync(fullImagePath)) {
      console.error(`   ⚠️  Skipping replacement - image does not exist: ${imagePath} (checked: ${fullImagePath})`);
      continue;
    }
    
    const filePath = path.join(__dirname, '..', opp.file);
    if (!fs.existsSync(filePath)) continue;
    
    // Get or read file content (use cached version if already modified)
    let content = filesBeingModified.get(filePath);
    if (!content) {
      content = fs.readFileSync(filePath, 'utf-8');
      filesBeingModified.set(filePath, content);
    }
    
    const markerStart = `IMAGE_PLACEMENT_START: ${opp.id}`;
    const markerEnd = `IMAGE_PLACEMENT_END: ${opp.id}`;
    
    const startIdx = content.indexOf(markerStart);
    const endIdx = content.indexOf(markerEnd);
    
    if (startIdx === -1 || endIdx === -1) {
      console.warn(`   ⚠️  Markers not found for ${opp.id} in ${opp.file}`);
      continue;
    }
    
    // Extract section (include markers for proper replacement)
    const beforeSection = content.substring(0, startIdx);
    const section = content.substring(startIdx, endIdx + markerEnd.length);
    const afterSection = content.substring(endIdx + markerEnd.length);
    
    // Build new section with all updates
    let newSection = section;
    
    // Update src - use directory, not category
    const imagePathForSrc = image.path || `/${imageDir}/${image.newFilename}`;
    newSection = newSection.replace(
      /src=["'][^"']+["']/,
      `src="${imagePathForSrc}"`
    );
    
    // Update alt - handle corrupted concatenated alt texts
    if (image.altText) {
      // Match alt attribute precisely: alt="..." or alt='...'
      // Stop at the first closing quote that's followed by whitespace, >, or another attribute name (className, style, etc.)
      // This prevents matching beyond the alt attribute into className or other attributes
      const altRegex = /alt=["'](?:[^"']|\\["'])*["'](?=\s|>|[a-z-]+=)/gi;
      const escapedAltText = image.altText.replace(/"/g, '&quot;');
      // Only replace if we find a match - this prevents corrupting valid code
      if (altRegex.test(newSection)) {
        // Reset regex lastIndex for next match
        altRegex.lastIndex = 0;
        newSection = newSection.replace(altRegex, `alt="${escapedAltText}"`);
      }
    }
    
    // Update objectPosition if focal point exists
    // Adjust focal point based on container height if specified
    if (image.focalX && image.focalY) {
      try {
        // Validate focal point values are numbers
        const focalX = typeof image.focalX === 'number' ? image.focalX : parseFloat(image.focalX) || 50;
        const focalY = typeof image.focalY === 'number' ? image.focalY : parseFloat(image.focalY) || 40;
        
        // Safely get container height from opportunity
        const containerHeight = (opp && opp.containerHeight) ? opp.containerHeight : null;
        const adjustedY = adjustFocalPointForContainer(focalY, containerHeight);
        
        // If adjustment was made, we need to use inline style with adjusted values
        // Otherwise, use the function call
        const imagePathForFocal = image.path || `/${imageDir}/${image.newFilename}`;
        
        let newStyle;
        if (containerHeight && adjustedY !== focalY) {
          // Use adjusted focal point directly in style
          // Ensure values are valid numbers and within bounds
          const safeX = Math.max(0, Math.min(100, focalX));
          const safeY = Math.max(0, Math.min(100, adjustedY));
          newStyle = `style={{ objectPosition: '${safeX}% ${safeY}%' }}`;
        } else {
          // Use function call (will use original focal point from file)
          const focalPointFn = `getImageObjectPosition("${imagePathForFocal}")`;
          newStyle = `style={{ objectPosition: ${focalPointFn} }}`;
        }
        
        const styleRegex = /style=\{\{[^}]*objectPosition[^}]*\}\}/;
        
        if (styleRegex.test(newSection)) {
          // Replace existing style
          newSection = newSection.replace(styleRegex, newStyle);
        } else {
          // Add style if missing
          const imageTagRegex = /(<Image[^>]*)(\s*\/?>)/;
          if (imageTagRegex.test(newSection)) {
            newSection = newSection.replace(imageTagRegex, `$1 ${newStyle}$2`);
          }
        }
      } catch (error) {
        console.warn(`   ⚠️  Error updating focal point for ${image.newFilename}: ${error.message}`);
        // Fallback to function call if adjustment fails
        try {
          const imagePathForFocal = image.path || `/${imageDir}/${image.newFilename}`;
          const focalPointFn = `getImageObjectPosition("${imagePathForFocal}")`;
          const newStyle = `style={{ objectPosition: ${focalPointFn} }}`;
          const styleRegex = /style=\{\{[^}]*objectPosition[^}]*\}\}/;
          if (styleRegex.test(newSection)) {
            newSection = newSection.replace(styleRegex, newStyle);
          }
        } catch (fallbackError) {
          console.warn(`   ⚠️  Fallback focal point update also failed: ${fallbackError.message}`);
        }
      }
    }
    
    // Reconstruct content with updated section
    content = beforeSection + newSection + afterSection;
    filesBeingModified.set(filePath, content);
  }
  
  // Write all modified files at once
  for (const [filePath, content] of filesBeingModified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`   ✅ Updated: ${filePath}`);
  }
}

/**
 * Update gallery.ts
 */
function updateGallery(recommendations, images) {
  const galleryFile = PATHS.gallery;
  let content = fs.readFileSync(galleryFile, 'utf-8');
  
  // Validate images exist before updating gallery
  const imageDir = images[0]?.directory;
  if (!imageDir) {
    console.warn('   ⚠️  Warning: Could not determine default directory for gallery update.');
  }
  const imageValidation = new Map();
  for (const image of images) {
    const dir = image.directory || imageDir;
    if (!dir) continue;
    const imagePath = path.join(__dirname, '..', 'public', dir, image.newFilename);
    imageValidation.set(`/${dir}/${image.newFilename}`, fs.existsSync(imagePath));
  }
  
  // Group by category
  const byCategory = {};
  const skippedGallery = [];
  for (const addition of recommendations.galleryAdditions) {
    const category = addition.category;
    const imagePath = `/${addition.image.directory || imageDir}/${addition.image.newFilename}`;
    const fullImagePath = path.join(__dirname, '..', 'public', addition.image.directory || imageDir, addition.image.newFilename);
    
    // Double-check image exists
    if (!fs.existsSync(fullImagePath)) {
      skippedGallery.push(imagePath);
      console.error(`   ⚠️  Skipping gallery addition - image does not exist: ${imagePath} (checked: ${fullImagePath})`);
      continue;
    }
    
    if (!byCategory[category]) byCategory[category] = [];
    byCategory[category].push(addition.image);
  }
  
  if (skippedGallery.length > 0) {
    console.error(`\n   ⚠️  WARNING: ${skippedGallery.length} gallery images skipped due to missing files:`);
    skippedGallery.forEach(img => console.error(`      - ${img}`));
  }
  
  // Update each category
  for (const [category, categoryImages] of Object.entries(byCategory)) {
    // Find category section
    const categoryPattern = new RegExp(`${category}:\\s*\\[([\\s\\S]*?)\\]`, 'g');
    const match = categoryPattern.exec(content);
    
    if (match) {
      const categoryStart = match.index + match[0].indexOf('[');
      const categoryEnd = match.index + match[0].length - 1;
      const existingContent = content.substring(categoryStart + 1, categoryEnd);
      
      // Extract existing image srcs to check for duplicates
      const existingSrcs = new Set();
      const existingSrcMatches = existingContent.matchAll(/src:\s*["']([^"']+)["']/g);
      for (const srcMatch of existingSrcMatches) {
        existingSrcs.add(srcMatch[1]);
      }
      
      // Filter out duplicates before adding
      const newImages = [];
      const batchSrcs = new Set(); // Track duplicates within this batch
      const defaultDir = imageDir; // Use default from outer scope
      for (const img of categoryImages) {
        const imgDir = img.directory || defaultDir;
        const imagePath = img.path || `/${imgDir}/${img.newFilename}`;
        
        // Check if already exists in gallery
        if (existingSrcs.has(imagePath)) {
          console.warn(`   ⚠️  Skipping duplicate in gallery: ${imagePath}`);
          continue;
        }
        
        // Check if duplicate within this batch
        if (batchSrcs.has(imagePath)) {
          console.warn(`   ⚠️  Skipping duplicate within batch: ${imagePath}`);
          continue;
        }
        
        batchSrcs.add(imagePath);
        newImages.push(img);
      }
      
      if (newImages.length === 0) {
        console.log(`   ⏭️  Skipped ${category} category - all images are duplicates`);
        continue;
      }
      
      // Add new images (non-duplicates only)
      const newEntries = newImages.map(img => {
        const priority = img.score >= 8.5 ? 'true' : 'false';
        // Use directory for path
        const imgDir = img.directory || defaultDir;
        const imagePath = img.path || `/${imgDir}/${img.newFilename}`;
        return `    { 
      src: "${imagePath}", 
      alt: "${(img.altText || '').replace(/"/g, '\\"')}", 
      title: "${(img.caption || '').replace(/"/g, '\\"')}", 
      priority: ${priority} 
    }`;
      }).join(',\n');
      
      const updatedContent = existingContent.trim() + (existingContent.trim() ? ',\n' : '') + newEntries;
      content = content.substring(0, categoryStart + 1) + updatedContent + content.substring(categoryEnd);
      
      const skippedCount = categoryImages.length - newImages.length;
      if (skippedCount > 0) {
        console.log(`   ✅ Added ${newImages.length} images to ${category} category (skipped ${skippedCount} duplicates)`);
      } else {
        console.log(`   ✅ Added ${newImages.length} images to ${category} category`);
      }
    }
  }
  
  fs.writeFileSync(galleryFile, content);
}

/**
 * Match image to blog article based on category and tags
 */
function matchImageToBlogArticle(image, article) {
  try {
    if (!image || !article) {
      return false;
    }
    
    // Map image categories to blog article categories
    const categoryMap = {
      'grooming / care close-up': 'grooming',
      'adventure / hiking': 'tips', // Hiking images can go to tips/health articles
      'social / community / celebration': 'tips'
    };
    
    const imgCat = (image.category || '').toLowerCase();
    const articleCat = (article.category || '').toLowerCase();
    
    if (!imgCat || !articleCat) {
      return false;
    }
    
    // Check category match
    const mappedCategory = categoryMap[imgCat];
    const categoryMatch = mappedCategory === articleCat || imgCat.includes(articleCat);
    
    // Check tag overlap
    let tagOverlap = false;
    try {
      const imageTags = (image.placementTags || []).map(t => String(t || '').toLowerCase()).filter(t => t.length > 0);
      const articleTags = (article.tags || []).map(t => String(t || '').toLowerCase()).filter(t => t.length > 0);
      
      tagOverlap = imageTags.some(imgTag => 
        articleTags.some(artTag => artTag.includes(imgTag) || imgTag.includes(artTag))
      );
    } catch (err) {
      // If tag matching fails, just use category match
      tagOverlap = false;
    }
    
    // Match if category matches OR tags overlap
    return categoryMatch || tagOverlap;
  } catch (err) {
    // Return false on any error to prevent crashes
    return false;
  }
}

/**
 * Update blog articles in blogArticles.ts
 */
function updateBlogArticles(recommendations, images, opportunities) {
  try {
    const blogFile = PATHS.blogArticles;
    if (!fs.existsSync(blogFile)) {
      console.warn('   ⚠️  Blog articles file not found, skipping blog updates');
      return;
    }
    
    let content;
    try {
      content = fs.readFileSync(blogFile, 'utf-8');
    } catch (err) {
      console.error(`   ❌ Error reading blog articles file: ${err.message}`);
      console.warn('   ⚠️  Skipping blog updates due to read error');
      return;
    }
    
    if (!content || content.trim().length === 0) {
      console.warn('   ⚠️  Blog articles file is empty, skipping blog updates');
      return;
    }
  
  // Find blog article opportunities
  const blogOpportunities = opportunities.opportunities.filter(opp => 
    opp.id === 'blog-article-cards' || opp.id === 'blog-post-featured'
  );
  
  if (blogOpportunities.length === 0) {
    console.log('   ℹ️  No blog opportunities found, skipping blog updates');
    return;
  }
  
    // Extract blog articles from content - more robust regex
    // Match article objects: { slug: "...", category: "...", tags: [...], image: "..." }
    const articles = [];
    try {
      const articleRegex = /slug:\s*["']([^"']+)["'][\s\S]*?category:\s*["']([^"']+)["'][\s\S]*?tags:\s*\[([^\]]+)\][\s\S]*?(?:image:\s*["']([^"']*)["'])?/g;
      let match;
      
      while ((match = articleRegex.exec(content)) !== null) {
        try {
          const slug = match[1];
          const category = match[2];
          const tagsStr = match[3];
          const currentImage = match[4] || '';
          
          if (!slug || !category) {
            console.warn(`   ⚠️  Skipping malformed article at index ${match.index}`);
            continue;
          }
          
          // Parse tags - handle both single and double quotes, and multi-line
          let tags = [];
          try {
            tags = tagsStr
              .split(',')
              .map(t => t.trim().replace(/^["']|["']$/g, ''))
              .filter(t => t.length > 0);
          } catch (err) {
            console.warn(`   ⚠️  Error parsing tags for article ${slug}: ${err.message}`);
            tags = [];
          }
          
          articles.push({
            slug,
            category,
            tags,
            currentImage,
            matchIndex: match.index,
            matchLength: match[0].length
          });
        } catch (err) {
          console.warn(`   ⚠️  Error processing article match: ${err.message}`);
          continue;
        }
      }
    } catch (err) {
      console.error(`   ❌ Error extracting blog articles: ${err.message}`);
      console.warn('   ⚠️  Skipping blog updates due to parsing error');
      return;
    }
    
    if (articles.length === 0) {
      console.log('   ℹ️  No blog articles found in file, skipping blog updates');
      return;
    }
    
    console.log(`   📰 Found ${articles.length} blog articles`);
  
    // Match images to articles
    const blogUpdates = [];
    const defaultImageDir = images[0]?.directory;
    
    if (!images || images.length === 0) {
      console.log('   ℹ️  No images provided, skipping blog updates');
      return;
    }
    
    for (const image of images) {
      try {
    // Check if image has blog-related tags OR matches blog opportunities
    const hasBlogTag = (image.placementTags || []).some(tag => 
      tag.toLowerCase().includes('blog') || tag.toLowerCase().includes('content')
    );
    
    // Also check if image matches blog opportunities
    const matchesBlogOpp = blogOpportunities.some(opp => {
      const req = opp.requirements;
      return image.score >= req.minScore &&
             req.requiredTags.some(reqTag =>
               (image.placementTags || []).some(tag => tag.toLowerCase().includes(reqTag.toLowerCase()))
             );
    });
    
    if (!hasBlogTag && !matchesBlogOpp) continue;
    
    // Validate image exists
    const imageDir = image.directory || defaultImageDir;
    if (!imageDir) continue;
    const imagePath = path.join(__dirname, '..', 'public', imageDir, image.newFilename);
    if (!fs.existsSync(imagePath)) {
      console.warn(`   ⚠️  Skipping blog update - image missing: ${imagePath}`);
      continue;
    }
    
    const imagePathForArticle = `/${imageDir}/${image.newFilename}`;
    
    // Find best matching article
    let bestMatch = null;
    let bestScore = 0;
    
    for (const article of articles) {
      if (matchImageToBlogArticle(image, article)) {
        // Calculate match score
        const imgCat = (image.category || '').toLowerCase();
        const artCat = article.category.toLowerCase();
        
        // Category matching
        let categoryScore = 0;
        if (imgCat.includes('grooming') && artCat === 'grooming') categoryScore = 20;
        else if (imgCat.includes('hiking') && (artCat === 'tips' || artCat === 'health')) categoryScore = 15;
        else if (imgCat.includes('social') && artCat === 'tips') categoryScore = 10;
        
        // Tag overlap
        const tagOverlap = (image.placementTags || []).filter(imgTag => 
          article.tags.some(artTag => artTag.toLowerCase().includes(imgTag.toLowerCase()) || 
                            imgTag.toLowerCase().includes(artTag.toLowerCase()))
        ).length * 5;
        
        const score = categoryScore + tagOverlap + image.score;
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = article;
        }
      }
    }
    
        if (bestMatch && bestScore > 60) {
          // Check if current image needs replacement
          const currentImage = bestMatch.currentImage;
          const shouldUpdate = !currentImage || 
                              currentImage === '' || 
                              image.score > 7.5; // Use a threshold for blog images
          
          if (shouldUpdate) {
            blogUpdates.push({
              article: bestMatch,
              image: imagePathForArticle,
              score: bestScore
            });
          }
        }
      } catch (err) {
        console.warn(`   ⚠️  Error processing image ${image.newFilename || image.originalFilename}: ${err.message}`);
        continue;
      }
    }
  
    if (blogUpdates.length === 0) {
      console.log('   ℹ️  No blog article updates needed');
      return;
    }
    
    console.log(`   📝 Updating ${blogUpdates.length} blog articles...`);
    
    // Sort updates by position (reverse order to avoid index shifting)
    try {
      blogUpdates.sort((a, b) => {
        const idxA = a.article.matchIndex || 0;
        const idxB = b.article.matchIndex || 0;
        return idxB - idxA;
      });
    } catch (err) {
      console.error(`   ❌ Error sorting blog updates: ${err.message}`);
      console.warn('   ⚠️  Skipping blog updates due to sort error');
      return;
    }
    
    // Update articles in content (reverse order to preserve indices)
    let updateCount = 0;
    let errorCount = 0;
    
    for (const update of blogUpdates) {
      try {
        const article = update.article;
        const newImagePath = update.image;
        
        if (!article || !article.matchIndex || article.matchIndex < 0) {
          console.warn(`   ⚠️  Invalid article data for update, skipping`);
          errorCount++;
          continue;
        }
        
        // Find the image property for this article
        const articleStart = article.matchIndex;
        const articleEnd = articleStart + (article.matchLength || 1000);
        
        // Validate indices
        if (articleStart >= content.length || articleEnd > content.length) {
          console.warn(`   ⚠️  Invalid article indices for ${article.slug}, skipping`);
          errorCount++;
          continue;
        }
        
        // Find image property within this article block
        const articleBlock = content.substring(articleStart, articleEnd);
        
        if (!articleBlock || articleBlock.length === 0) {
          console.warn(`   ⚠️  Empty article block for ${article.slug}, skipping`);
          errorCount++;
          continue;
        }
        
        // Update image property - handle both existing and missing image properties
        let newArticleBlock;
        try {
          if (articleBlock.includes('image:')) {
            // Replace existing image
            const imageRegex = /image:\s*["']([^"']*)["']/;
            if (imageRegex.test(articleBlock)) {
              newArticleBlock = articleBlock.replace(imageRegex, `image: "${newImagePath}"`);
            } else {
              console.warn(`   ⚠️  Could not find image property in ${article.slug}, skipping`);
              errorCount++;
              continue;
            }
          } else {
            // Add image property before the closing brace or before readTime/author
            // Find where to insert (before author or readTime, whichever comes first)
            const insertBefore = articleBlock.match(/(author|readTime):/);
            if (insertBefore) {
              const insertIndex = articleBlock.indexOf(insertBefore[0]);
              if (insertIndex >= 0) {
                newArticleBlock = articleBlock.substring(0, insertIndex) + 
                                 `    image: "${newImagePath}",\n    ` +
                                 articleBlock.substring(insertIndex);
              } else {
                // Fallback: add before closing brace
                newArticleBlock = articleBlock.replace(/(\s*)(\},)/, `$1    image: "${newImagePath}",$1$2`);
              }
            } else {
              // Fallback: add before closing brace
              newArticleBlock = articleBlock.replace(/(\s*)(\},)/, `$1    image: "${newImagePath}",$1$2`);
            }
          }
          
          if (!newArticleBlock || newArticleBlock === articleBlock) {
            console.warn(`   ⚠️  No changes made to ${article.slug}, skipping`);
            errorCount++;
            continue;
          }
          
          // Replace in content
          content = content.substring(0, articleStart) + newArticleBlock + content.substring(articleEnd);
          updateCount++;
          console.log(`   ✅ Updated: ${article.slug} → ${newImagePath}`);
        } catch (err) {
          console.warn(`   ⚠️  Error updating article ${article.slug}: ${err.message}`);
          errorCount++;
          continue;
        }
      } catch (err) {
        console.warn(`   ⚠️  Error processing blog update: ${err.message}`);
        errorCount++;
        continue;
      }
    }
    
    if (errorCount > 0) {
      console.warn(`   ⚠️  ${errorCount} blog updates failed, ${updateCount} succeeded`);
    }
    
    if (updateCount === 0) {
      console.log('   ℹ️  No blog articles were updated');
      return;
    }
    
    // Write updated content with error handling
    try {
      fs.writeFileSync(blogFile, content, 'utf-8');
      console.log(`   ✅ Blog articles file updated (${updateCount} articles)`);
    } catch (err) {
      console.error(`   ❌ Error writing blog articles file: ${err.message}`);
      console.error('   ⚠️  Blog articles file was NOT updated due to write error');
      throw err; // Re-throw to be caught by outer try-catch
    }
  } catch (error) {
    console.error(`   ❌ Error updating blog articles: ${error.message}`);
    console.warn('   ⚠️  Blog updates skipped due to error - script will continue');
    // Don't throw - allow script to continue with other updates
  }
}

/**
 * Update registry.json
 */
function updateRegistry(recommendations, images, registry, opportunities) {
  // Update placements
  for (const placement of recommendations.newPlacements) {
    const opp = opportunities.opportunities.find(o => o.id === placement.opportunity);
    const image = images.find(img => img.newFilename === placement.image.newFilename);
    
    if (!opp || !image) continue;
    
    registry.placements.push({
      id: opp.id,
      location: {
        page: opp.page,
        section: opp.section,
        component: opp.component,
        file: opp.file,
        line: opp.line || null
      },
      currentImages: [{
        filename: image.newFilename,
        path: image.path || `/${image.directory || 'Grooming'}/${image.newFilename}`, // Fallback only if absolutely necessary
        alt: image.altText || '',
        score: image.score || 8.0,
        category: image.category || 'Unknown',
        targetCity: image.targetCity || 'Unknown',
        placementTags: image.placementTags || [],
        focalPoint: { x: image.focalX || 50, y: image.focalY || 40 },
        locked: false
      }],
      placementReasoning: {
        contentContext: opp.requirements.contentContext,
        metadataMatch: `Score ${image.score || 8.0}, tagged ${(image.placementTags || []).join(', ')}`,
        seoFactors: [`Category: ${image.category || 'Unknown'}`, `City: ${image.targetCity || 'Unknown'}`]
      },
      placementDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  }
  
  // Update replacements
  for (const replacement of recommendations.replacements) {
    const placement = registry.placements.find(p => p.id === replacement.opportunity);
    if (placement) {
      const oldImage = placement.currentImages[0];
      placement.currentImages[0] = {
        filename: replacement.newImage.newFilename,
        path: replacement.newImage.path || `/${replacement.newImage.directory || 'Grooming'}/${replacement.newImage.newFilename}`,
        alt: replacement.newImage.altText || '',
        score: replacement.newImage.score || 8.0,
        category: replacement.newImage.category || 'Unknown',
        targetCity: replacement.newImage.targetCity || 'Unknown',
        placementTags: replacement.newImage.placementTags || [],
        focalPoint: { x: replacement.newImage.focalX || 50, y: replacement.newImage.focalY || 40 },
        locked: false
      };
      placement.lastUpdated = new Date().toISOString().split('T')[0];
      
      // Add to replacement history if it exists
      if (!placement.replacementHistory) placement.replacementHistory = [];
      placement.replacementHistory.push({
        oldImage: oldImage,
        newImage: placement.currentImages[0],
        reason: replacement.reason,
        date: new Date().toISOString().split('T')[0]
      });
    }
  }
  
  // Update gallery entries
  for (const addition of recommendations.galleryAdditions) {
    let galleryEntry = registry.galleryEntries.find(e => e.category === addition.category);
    if (!galleryEntry) {
      galleryEntry = {
        category: addition.category,
        images: [],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      registry.galleryEntries.push(galleryEntry);
    }
    
    // Use directory for path, category for gallery category
    const imgDir = addition.image.directory || 'Grooming';
    galleryEntry.images.push({
      filename: addition.image.newFilename,
      path: addition.image.path || `/${imgDir}/${addition.image.newFilename}`,
      alt: addition.image.altText || '',
      title: addition.image.caption || '',
      category: addition.category,
      focalPoint: { x: addition.image.focalX || 50, y: addition.image.focalY || 40 }
    });
    
    galleryEntry.lastUpdated = new Date().toISOString().split('T')[0];
  }
  
  // Update metadata
  registry.metadata.totalPlacements = registry.placements.length;
  registry.metadata.totalGalleryEntries = registry.galleryEntries.length;
  registry.metadata.lockedPlacements = registry.placements.filter(p => 
    p.currentImages.some(img => img.locked)
  ).length;
  registry.lastUpdated = new Date().toISOString().split('T')[0];
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  const csvIndex = args.indexOf('--csv');
  const dryRun = args.includes('--dry-run');
  const execute = args.includes('--execute');
  
  if (csvIndex === -1 || csvIndex === args.length - 1) {
    console.error('❌ Error: --csv argument required');
    console.log('\nUsage:');
    console.log('  node scripts/process-image-csv.js --csv path/to/file.csv [--dry-run] [--execute]');
    process.exit(1);
  }
  
  const csvPath = args[csvIndex + 1];
  
  // Resolve CSV path relative to script location
  const resolvedCsvPath = path.isAbsolute(csvPath) ? csvPath : path.join(__dirname, '..', csvPath);
  
  if (!fs.existsSync(resolvedCsvPath)) {
    console.error(`❌ Error: CSV file not found: ${resolvedCsvPath}`);
    console.error(`   Tried: ${resolvedCsvPath}`);
    process.exit(1);
  }
  
  // Use resolved path
  const finalCsvPath = resolvedCsvPath;
  
  const runMode = execute ? false : (dryRun || true); // Default to dry-run unless --execute
  
  try {
    processCSV(finalCsvPath, runMode);
  } catch (error) {
    console.error('\n❌ Error processing CSV:');
    if (error.message) {
      console.error(`   ${error.message}`);
    }
    if (error.stack && process.env.DEBUG) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    console.error('\n⚠️  Processing stopped due to error.');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { processCSV, parseCSV, calculatePlacementScore };

