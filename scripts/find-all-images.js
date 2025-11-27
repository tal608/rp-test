#!/usr/bin/env node

/**
 * Find All Images Script
 * 
 * Scans all pages and components to find every Image component
 * and creates comprehensive placement opportunities and registry entries.
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  appDir: path.join(__dirname, '../src/app'),
  componentsDir: path.join(__dirname, '../src/components'),
  opportunities: path.join(__dirname, '../data/placement-opportunities.json'),
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts')
};

/**
 * Recursively find all .tsx files
 */
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.includes('node_modules')) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

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
 * Extract section context from code
 */
function getSectionContext(content, imageIndex) {
  const beforeImage = content.substring(Math.max(0, imageIndex - 500), imageIndex);
  const afterImage = content.substring(imageIndex, Math.min(content.length, imageIndex + 200));
  
  let section = 'content';
  let sectionName = '';
  
  // Check for section markers
  const sectionMatch = beforeImage.match(/section.*className=["']([^"']*)/);
  if (sectionMatch) {
    const className = sectionMatch[1];
    if (className.includes('hero')) {
      section = 'hero';
      sectionName = 'Hero Section';
    } else if (className.includes('service')) {
      section = 'services';
      sectionName = 'Service Section';
    } else if (className.includes('faq')) {
      section = 'faq';
      sectionName = 'FAQ Section';
    } else if (className.includes('gallery')) {
      section = 'gallery';
      sectionName = 'Gallery Section';
    } else if (className.includes('testimonial')) {
      section = 'testimonial';
      sectionName = 'Testimonial Section';
    } else if (className.includes('team')) {
      section = 'team';
      sectionName = 'Team Section';
    } else if (className.includes('resource')) {
      section = 'resource';
      sectionName = 'Resource Section';
    } else if (className.includes('card')) {
      section = 'card';
      sectionName = 'Card Section';
    }
  }
  
  // Check for comment markers
  const markerMatch = beforeImage.match(/IMAGE_PLACEMENT_START:\s*([^\s\n]+)/);
  if (markerMatch) {
    return { section, sectionName, placementId: markerMatch[1] };
  }
  
  return { section, sectionName, placementId: null };
}

/**
 * Scan file for all Image components
 */
function scanFileForImages(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const images = [];
  
  // Extract page name from path
  const relativePath = filePath.replace(path.join(__dirname, '../'), '');
  const pageMatch = relativePath.match(/src\/app\/([^\/]+)/);
  const pageName = pageMatch ? pageMatch[1] : 'unknown';
  
  // Split into lines for line number tracking
  const lines = content.split('\n');
  
  // Find all Image components by looking for src= patterns
  // This handles both single-line and multiline Image components
  let inImageTag = false;
  let imageStartLine = 0;
  let imageContent = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line starts an Image tag
    if (line.includes('<Image') && !line.includes('</Image>')) {
      inImageTag = true;
      imageStartLine = i + 1;
      imageContent = line;
    } else if (inImageTag) {
      // Continue collecting Image tag content
      imageContent += '\n' + line;
      
      // Check if Image tag closes
      if (line.includes('/>') || line.includes('</Image>')) {
        inImageTag = false;
        
        // Extract src
        const srcMatch = imageContent.match(/src=["']([^"']+)["']/);
        if (srcMatch) {
          const imagePath = srcMatch[1];
          
          // Extract alt text
          const altMatch = imageContent.match(/alt=["']([^"']+)["']/);
          const alt = altMatch ? altMatch[1] : '';
          
          // Check if priority
          const isPriority = imageContent.includes('priority') || imageContent.includes('priority={true}');
          
          // Get section context
          const imageIndex = lines.slice(0, imageStartLine).join('\n').length;
          const context = getSectionContext(content, imageIndex);
          
          // Get focal point
          const filename = getImageFilename(imagePath);
          const focalPoint = getFocalPoint(filename);
          
          // Generate placement ID
          let placementId = context.placementId;
          if (!placementId) {
            // Try to find a unique identifier in the surrounding code
            const beforeImage = content.substring(Math.max(0, imageIndex - 500), imageIndex);
            const hrefMatch = beforeImage.match(/href=["']([^"']+)["']/);
            const cityMatch = beforeImage.match(/(Madison|Waunakee|DeForest|Sun Prairie|Middleton)/);
            const resourceMatch = beforeImage.match(/(Puppy|Canine|Madison|Waunakee|DeForest|Sun Prairie|Middleton)/);
            
            let identifier = '';
            if (cityMatch) {
              identifier = cityMatch[1].toLowerCase().replace(' ', '-');
            } else if (resourceMatch && !cityMatch) {
              identifier = resourceMatch[1].toLowerCase();
            } else if (hrefMatch) {
              const href = hrefMatch[1];
              const slug = href.split('/').pop();
              identifier = slug || '';
            }
            
            const sectionSuffix = context.section === 'hero' ? 'hero' : 
                                  context.section === 'card' ? `card-${identifier || images.filter(i => i.context.section === 'card').length + 1}` :
                                  context.section === 'faq' ? `faq-${images.filter(i => i.context.section === 'faq').length + 1}` :
                                  identifier ? `resource-${identifier}` :
                                  `image-${images.length + 1}`;
            placementId = `${pageName}-${sectionSuffix}`;
          }
          
          images.push({
            placementId,
            file: relativePath,
            line: imageStartLine,
            imagePath,
            filename,
            alt,
            isPriority,
            context,
            focalPoint
          });
        }
        
        imageContent = '';
      }
    }
  }
  
  return images;
}

/**
 * Main function
 */
function findAllImages() {
  console.log('🔍 Scanning all files for images...\n');
  
  // Find all files
  const appFiles = findTsxFiles(PATHS.appDir);
  const componentFiles = findTsxFiles(PATHS.componentsDir);
  const allFiles = [...appFiles, ...componentFiles];
  
  console.log(`Found ${allFiles.length} files to scan\n`);
  
  const allImages = [];
  const opportunities = [];
  const placements = [];
  
  // Scan each file
  for (const file of allFiles) {
    try {
      const images = scanFileForImages(file);
      allImages.push(...images.map(img => ({ ...img, sourceFile: file })));
    } catch (error) {
      console.error(`Error scanning ${file}:`, error.message);
    }
  }
  
  console.log(`Found ${allImages.length} images total\n`);
  
  // Group by placement ID
  const byPlacement = {};
  for (const img of allImages) {
    if (!byPlacement[img.placementId]) {
      byPlacement[img.placementId] = [];
    }
    byPlacement[img.placementId].push(img);
  }
  
  // Create opportunities and placements
  for (const [placementId, images] of Object.entries(byPlacement)) {
    const firstImage = images[0];
    const pageName = firstImage.file.match(/src\/app\/([^\/]+)/)?.[1] || 'unknown';
    
    // Determine requirements based on section
    let minScore = 7.0;
    let requiredTags = ['Services', 'Gallery'];
    let preferredCategories = [];
    let priority = 'medium';
    
    if (firstImage.context.section === 'hero') {
      minScore = 8.0;
      requiredTags = ['Homepage Hero', 'Services'];
      priority = 'high';
    } else if (firstImage.context.section === 'card') {
      minScore = 7.5;
      requiredTags = ['Services'];
      priority = 'high';
    } else if (firstImage.context.section === 'faq') {
      minScore = 7.0;
      requiredTags = ['Services', 'Gallery'];
      priority = 'medium';
    }
    
    // Add opportunity
    opportunities.push({
      id: placementId,
      page: pageName,
      section: firstImage.context.section,
      component: 'Image',
      file: firstImage.file,
      line: firstImage.line,
      requirements: {
        minScore,
        requiredTags,
        preferredCategories,
        preferredCities: ['Madison', 'Waunakee', 'DeForest', 'Sun Prairie', 'Middleton'],
        contentContext: `${firstImage.context.sectionName} on ${pageName} page`,
        priority
      },
      maxRotations: firstImage.context.section === 'hero' ? 5 : 1,
      rotationEnabled: firstImage.context.section === 'hero',
      lockedImages: [],
      currentPlacements: []
    });
    
    // Add placement
    placements.push({
      id: placementId,
      location: {
        page: pageName,
        section: firstImage.context.section,
        component: 'Image',
        file: firstImage.file,
        line: firstImage.line
      },
      currentImages: images.map(img => ({
        filename: img.filename,
        path: img.imagePath,
        alt: img.alt,
        focalPoint: img.focalPoint,
        score: 8.0,
        category: 'Unknown',
        targetCity: 'Unknown',
        placementTags: requiredTags,
        locked: false
      })),
      placementReasoning: {
        contentContext: `${firstImage.context.sectionName} on ${pageName} page`,
        metadataMatch: `Found ${images.length} image(s)`,
        seoFactors: [`Section: ${firstImage.context.section}`, `Page: ${pageName}`]
      },
      placementDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  }
  
  // Load existing data
  const existingOpportunities = JSON.parse(fs.readFileSync(PATHS.opportunities, 'utf-8'));
  const existingRegistry = JSON.parse(fs.readFileSync(PATHS.registry, 'utf-8'));
  
  // Merge opportunities (avoid duplicates)
  const existingIds = new Set(existingOpportunities.opportunities.map(o => o.id));
  const newOpportunities = opportunities.filter(o => !existingIds.has(o.id));
  existingOpportunities.opportunities.push(...newOpportunities);
  existingOpportunities.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Merge placements (avoid duplicates)
  const existingPlacementIds = new Set(existingRegistry.placements.map(p => p.id));
  const newPlacements = placements.filter(p => !existingPlacementIds.has(p.id));
  existingRegistry.placements.push(...newPlacements);
  existingRegistry.metadata.totalPlacements = existingRegistry.placements.length;
  existingRegistry.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Save
  fs.writeFileSync(PATHS.opportunities, JSON.stringify(existingOpportunities, null, 2));
  fs.writeFileSync(PATHS.registry, JSON.stringify(existingRegistry, null, 2));
  
  console.log('✅ Complete!\n');
  console.log(`   - Found ${allImages.length} total images`);
  console.log(`   - Created ${newOpportunities.length} new opportunities`);
  console.log(`   - Created ${newPlacements.length} new placements`);
  console.log(`   - Total opportunities: ${existingOpportunities.opportunities.length}`);
  console.log(`   - Total placements: ${existingRegistry.placements.length}\n`);
  
  // Show summary by page
  const byPage = {};
  allImages.forEach(img => {
    const page = img.file.match(/src\/app\/([^\/]+)/)?.[1] || 'components';
    if (!byPage[page]) byPage[page] = 0;
    byPage[page]++;
  });
  
  console.log('Images by page:');
  Object.entries(byPage).sort((a, b) => b[1] - a[1]).forEach(([page, count]) => {
    console.log(`   - ${page}: ${count} images`);
  });
}

findAllImages();

