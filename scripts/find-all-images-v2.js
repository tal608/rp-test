#!/usr/bin/env node

/**
 * Find All Images Script V2
 * 
 * Improved version that properly finds all Image components
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
  try {
    const content = fs.readFileSync(PATHS.focalPoints, 'utf-8');
    const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = content.match(new RegExp(`'${escapedFilename}':\\s*\\{\\s*x:\\s*(\\d+),\\s*y:\\s*(\\d+)\\s*\\}`));
    if (match) {
      return { x: parseInt(match[1]), y: parseInt(match[2]) };
    }
  } catch (e) {
    // Ignore errors
  }
  return { x: 50, y: 40 }; // Default
}

/**
 * Extract section context from code
 */
function getSectionContext(content, imageIndex) {
  const beforeImage = content.substring(Math.max(0, imageIndex - 1000), imageIndex);
  
  let section = 'content';
  let sectionName = 'Content Section';
  
  // Check for comment markers first
  const markerMatch = beforeImage.match(/IMAGE_PLACEMENT_START:\s*([^\s\n]+)/);
  if (markerMatch) {
    return { section, sectionName, placementId: markerMatch[1] };
  }
  
  // Check for section markers
  if (beforeImage.includes('hero') || beforeImage.match(/section.*hero/i)) {
    section = 'hero';
    sectionName = 'Hero Section';
  } else if (beforeImage.includes('service') || beforeImage.match(/section.*service/i)) {
    section = 'services';
    sectionName = 'Service Section';
  } else if (beforeImage.includes('faq') || beforeImage.match(/section.*faq/i)) {
    section = 'faq';
    sectionName = 'FAQ Section';
  } else if (beforeImage.includes('gallery') || beforeImage.match(/section.*gallery/i)) {
    section = 'gallery';
    sectionName = 'Gallery Section';
  } else if (beforeImage.includes('testimonial') || beforeImage.match(/section.*testimonial/i)) {
    section = 'testimonial';
    sectionName = 'Testimonial Section';
  } else if (beforeImage.includes('team') || beforeImage.match(/section.*team/i)) {
    section = 'team';
    sectionName = 'Team Section';
  } else if (beforeImage.includes('resource') || beforeImage.match(/section.*resource/i)) {
    section = 'resource';
    sectionName = 'Resource Section';
  } else if (beforeImage.includes('card') || beforeImage.match(/className.*card/i)) {
    section = 'card';
    sectionName = 'Card Section';
  }
  
  return { section, sectionName, placementId: null };
}

/**
 * Scan file for all Image components - improved version
 */
function scanFileForImages(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const images = [];
  
  // Extract page name from path (handle both Windows and Unix paths)
  const relativePath = filePath.replace(path.join(__dirname, '../'), '').replace(/\\/g, '/');
  const pageMatch = relativePath.match(/src\/app\/([^\/]+)/);
  const pageName = pageMatch ? pageMatch[1] : 'unknown';
  
  // Use a more robust pattern that handles multiline Image components
  // Look for Image tag start, then find src attribute, then find closing
  const imageStartPattern = /<Image/g;
  let match;
  
  while ((match = imageStartPattern.exec(content)) !== null) {
    const startIndex = match.index;
    const startLine = content.substring(0, startIndex).split('\n').length;
    
    // Find the end of this Image tag (either /> or </Image>)
    let endIndex = startIndex;
    let depth = 0;
    let inString = false;
    let stringChar = '';
    
    for (let i = startIndex + 6; i < content.length; i++) {
      const char = content[i];
      const nextChar = content[i + 1];
      
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && content[i - 1] !== '\\') {
        inString = false;
      } else if (!inString) {
        if (char === '<' && nextChar === '/') {
          // Check if it's closing Image tag
          const closingTag = content.substring(i, i + 8);
          if (closingTag === '</Image>') {
            endIndex = i + 8;
            break;
          }
        } else if (char === '/' && nextChar === '>') {
          endIndex = i + 2;
          break;
        }
      }
    }
    
    if (endIndex > startIndex) {
      const imageTag = content.substring(startIndex, endIndex);
      
      // Extract src
      const srcMatch = imageTag.match(/src\s*=\s*["']([^"']+)["']/);
      if (srcMatch) {
        const imagePath = srcMatch[1];
        
        // Extract alt text
        const altMatch = imageTag.match(/alt\s*=\s*["']([^"']+)["']/);
        const alt = altMatch ? altMatch[1] : '';
        
        // Check if priority
        const isPriority = imageTag.includes('priority') || imageTag.includes('priority={true}');
        
        // Get section context
        const context = getSectionContext(content, startIndex);
        
        // Get focal point
        const filename = getImageFilename(imagePath);
        const focalPoint = getFocalPoint(filename);
        
        // Generate placement ID
        let placementId = context.placementId;
        if (!placementId) {
          // Try to find a unique identifier
          const beforeImage = content.substring(Math.max(0, startIndex - 500), startIndex);
          const hrefMatch = beforeImage.match(/href=["']([^"']+)["']/);
          const cityMatch = beforeImage.match(/(Madison|Waunakee|DeForest|Sun Prairie|Middleton)/);
          const resourceMatch = beforeImage.match(/(Puppy|Canine)/);
          
          let identifier = '';
          if (cityMatch) {
            identifier = cityMatch[1].toLowerCase().replace(' ', '-');
          } else if (resourceMatch) {
            identifier = resourceMatch[1].toLowerCase();
          } else if (hrefMatch) {
            const href = hrefMatch[1];
            const slug = href.split('/').pop();
            identifier = slug || '';
          }
          
          const sectionSuffix = context.section === 'hero' ? 'hero' : 
                                context.section === 'card' ? `card-${identifier || images.filter(i => i.context.section === 'card').length + 1}` :
                                context.section === 'faq' ? `faq-${images.filter(i => i.context.section === 'faq').length + 1}` :
                                context.section === 'resource' ? `resource-${identifier || images.filter(i => i.context.section === 'resource').length + 1}` :
                                identifier ? `resource-${identifier}` :
                                `image-${images.length + 1}`;
          placementId = `${pageName}-${sectionSuffix}`;
        }
        
        images.push({
          placementId,
          file: relativePath,
          line: startLine,
          imagePath,
          filename,
          alt,
          isPriority,
          context,
          focalPoint
        });
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
  
  // Scan each file
  for (const file of allFiles) {
    try {
      const images = scanFileForImages(file);
      if (images.length > 0) {
        console.log(`  ${file.replace(path.join(__dirname, '../'), '')}: ${images.length} images`);
      }
      allImages.push(...images.map(img => ({ ...img, sourceFile: file })));
    } catch (error) {
      console.error(`Error scanning ${file}:`, error.message);
    }
  }
  
  console.log(`\nFound ${allImages.length} images total\n`);
  
  // Group by placement ID
  const byPlacement = {};
  for (const img of allImages) {
    if (!byPlacement[img.placementId]) {
      byPlacement[img.placementId] = [];
    }
    byPlacement[img.placementId].push(img);
  }
  
  // Load existing data
  const existingOpportunities = JSON.parse(fs.readFileSync(PATHS.opportunities, 'utf-8'));
  const existingRegistry = JSON.parse(fs.readFileSync(PATHS.registry, 'utf-8'));
  
  const opportunities = [];
  const placements = [];
  
  // Create opportunities and placements
  for (const [placementId, images] of Object.entries(byPlacement)) {
    const firstImage = images[0];
    // Normalize file path and extract page name
    let normalizedFile = firstImage.file.replace(/\\/g, '/');
    // Handle both src/app/ and src\app\ paths
    if (!normalizedFile.startsWith('src/')) {
      normalizedFile = normalizedFile.replace(/^.*?src[\\\/]/, 'src/');
    }
    const pageMatch = normalizedFile.match(/src\/app\/([^\/]+)/);
    const pageName = pageMatch ? pageMatch[1] : (normalizedFile.includes('components') ? 'components' : 'unknown');
    
    // Check if already exists
    const existingOpp = existingOpportunities.opportunities.find(o => o.id === placementId);
    const existingPlacement = existingRegistry.placements.find(p => p.id === placementId);
    
    if (existingOpp && existingPlacement) {
      continue; // Skip if already exists
    }
    
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
    } else if (firstImage.context.section === 'resource') {
      minScore = 7.5;
      requiredTags = ['Services', 'Gallery'];
      priority = 'high';
    }
    
    // Normalize file path for opportunity
    const normalizedFilePath = firstImage.file.replace(/\\/g, '/');
    
    // Add opportunity
    opportunities.push({
      id: placementId,
      page: pageName,
      section: firstImage.context.section,
      component: 'Image',
      file: normalizedFilePath,
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
        file: normalizedFilePath,
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
  
  // Merge opportunities
  existingOpportunities.opportunities.push(...opportunities);
  existingOpportunities.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Merge placements
  existingRegistry.placements.push(...placements);
  existingRegistry.metadata.totalPlacements = existingRegistry.placements.length;
  existingRegistry.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Save
  fs.writeFileSync(PATHS.opportunities, JSON.stringify(existingOpportunities, null, 2));
  fs.writeFileSync(PATHS.registry, JSON.stringify(existingRegistry, null, 2));
  
  console.log('✅ Complete!\n');
  console.log(`   - Found ${allImages.length} total images`);
  console.log(`   - Created ${opportunities.length} new opportunities`);
  console.log(`   - Created ${placements.length} new placements`);
  console.log(`   - Total opportunities: ${existingOpportunities.opportunities.length}`);
  console.log(`   - Total placements: ${existingRegistry.placements.length}\n`);
  
  // Show summary by page
  const byPage = {};
  allImages.forEach(img => {
    const normalizedFile = img.file.replace(/\\/g, '/');
    const page = normalizedFile.match(/src\/app\/([^\/]+)/)?.[1] || 'components';
    if (!byPage[page]) byPage[page] = 0;
    byPage[page]++;
  });
  
  console.log('Images by page:');
  Object.entries(byPage).sort((a, b) => b[1] - a[1]).forEach(([page, count]) => {
    console.log(`   - ${page}: ${count} images`);
  });
}

findAllImages();

