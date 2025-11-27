#!/usr/bin/env node

/**
 * Populate Initial Registry
 * 
 * Scans current codebase and populates image-placements-registry.json
 * with current image placements.
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  opportunities: path.join(__dirname, '../data/placement-opportunities.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts'),
  gallery: path.join(__dirname, '../src/constants/gallery.ts')
};

/**
 * Extract image filename from path
 */
function getImageFilename(imagePath) {
  return imagePath.split('/').pop();
}

/**
 * Get focal point for image
 */
function getFocalPoint(filename) {
  const content = fs.readFileSync(PATHS.focalPoints, 'utf-8');
  const match = content.match(new RegExp(`'${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*\\{\\s*x:\\s*(\\d+),\\s*y:\\s*(\\d+)\\s*\\}`));
  if (match) {
    return { x: parseInt(match[1]), y: parseInt(match[2]) };
  }
  return { x: 50, y: 40 }; // Default
}

/**
 * Scan file for image placement
 */
function scanPlacement(filePath, opportunity) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const markerStart = `IMAGE_PLACEMENT_START: ${opportunity.id}`;
  const markerEnd = `IMAGE_PLACEMENT_END: ${opportunity.id}`;
  
  const startIdx = content.indexOf(markerStart);
  const endIdx = content.indexOf(markerEnd);
  
  if (startIdx === -1 || endIdx === -1) {
    return null;
  }
  
  const section = content.substring(startIdx, endIdx);
  const srcMatch = section.match(/src=["']([^"']+)["']/);
  const altMatch = section.match(/alt=["']([^"']+)["']/);
  
  if (!srcMatch) {
    return null;
  }
  
  const imagePath = srcMatch[1];
  const filename = getImageFilename(imagePath);
  const focalPoint = getFocalPoint(filename);
  
  return {
    filename: filename,
    path: imagePath,
    alt: altMatch ? altMatch[1] : '',
    focalPoint: focalPoint,
    score: 8.0, // Default score, will be updated when CSV processed
    category: opportunity.requirements.preferredCategories[0] || 'Unknown',
    targetCity: opportunity.requirements.preferredCities[0] || 'Unknown',
    placementTags: opportunity.requirements.requiredTags || [],
    locked: false
  };
}

/**
 * Populate registry
 */
function populateRegistry() {
  const opportunities = JSON.parse(fs.readFileSync(PATHS.opportunities, 'utf-8'));
  const registry = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    placements: [],
    galleryEntries: [],
    metadata: {
      totalPlacements: 0,
      totalGalleryEntries: 0,
      lockedPlacements: 0
    }
  };
  
  // Scan each opportunity
  for (const opp of opportunities.opportunities) {
    const filePath = path.join(__dirname, '..', opp.file);
    
    if (opp.category) {
      // Gallery category - read from gallery.ts
      const galleryContent = fs.readFileSync(PATHS.gallery, 'utf-8');
      const categoryMatch = new RegExp(`${opp.category}:\\s*\\[([\\s\\S]*?)\\]`, 'g');
      let match;
      const images = [];
      
      while ((match = categoryMatch.exec(galleryContent)) !== null) {
        const categoryContent = match[1];
        const imageMatches = categoryContent.matchAll(/src:\s*["']([^"']+)["']/g);
        for (const imgMatch of imageMatches) {
          const imgPath = imgMatch[1];
          const filename = getImageFilename(imgPath);
          const altMatch = categoryContent.match(new RegExp(`src:\\s*["']${imgPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][\\s\\S]*?alt:\\s*["']([^"']+)["']`));
          const titleMatch = categoryContent.match(new RegExp(`src:\\s*["']${imgPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][\\s\\S]*?title:\\s*["']([^"']+)["']`));
          
          images.push({
            filename: filename,
            path: imgPath,
            alt: altMatch ? altMatch[1] : '',
            title: titleMatch ? titleMatch[1] : '',
            category: opp.category,
            focalPoint: getFocalPoint(filename)
          });
        }
      }
      
      registry.galleryEntries.push({
        category: opp.category,
        images: images,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    } else {
      // Regular placement
      const image = scanPlacement(filePath, opp);
      if (image) {
        registry.placements.push({
          id: opp.id,
          location: {
            page: opp.page,
            section: opp.section,
            component: opp.component,
            file: opp.file,
            line: opp.line || null
          },
          currentImages: [image],
          placementReasoning: {
            contentContext: opp.requirements.contentContext,
            metadataMatch: `Score ${image.score}, tagged ${image.placementTags.join(', ')}`,
            seoFactors: [`Category: ${image.category}`, `City: ${image.targetCity}`]
          },
          placementDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0]
        });
      }
    }
  }
  
  registry.metadata.totalPlacements = registry.placements.length;
  registry.metadata.totalGalleryEntries = registry.galleryEntries.length;
  registry.metadata.lockedPlacements = registry.placements.filter(p => 
    p.currentImages.some(img => img.locked)
  ).length;
  
  // Save registry
  fs.writeFileSync(PATHS.registry, JSON.stringify(registry, null, 2));
  
  console.log('✅ Registry populated successfully!');
  console.log(`   - ${registry.metadata.totalPlacements} placements`);
  console.log(`   - ${registry.metadata.totalGalleryEntries} gallery categories`);
  console.log(`   - ${registry.metadata.lockedPlacements} locked placements`);
}

populateRegistry();

