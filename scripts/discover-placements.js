#!/usr/bin/env node

/**
 * Placement Discovery Script
 * 
 * Scans the codebase to automatically discover image placement opportunities.
 * Run this when new pages/sections are added to the site.
 * 
 * Usage:
 *   node scripts/discover-placements.js [--update]
 */

const fs = require('fs');
const path = require('path');

// Use Node.js built-in glob (Node 20+) or fallback
let glob;
try {
  glob = require('glob');
} catch (e) {
  // Fallback: use fs.readdirSync recursively
  function findFiles(dir, pattern, results = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.includes('node_modules')) {
        findFiles(filePath, pattern, results);
      } else if (file.match(pattern)) {
        results.push(filePath);
      }
    }
    return results;
  }
  glob = {
    sync: (pattern, options) => {
      const baseDir = options.cwd || process.cwd();
      const filePattern = pattern.replace('**/*', '.*');
      return findFiles(baseDir, new RegExp(filePattern.replace('.', '\\.')), []);
    }
  };
}

const PATHS = {
  opportunities: path.join(__dirname, '../data/placement-opportunities.json'),
  appDir: path.join(__dirname, '../src/app'),
  componentsDir: path.join(__dirname, '../src/components')
};

/**
 * Scan file for Image components and placement opportunities
 */
function scanFileForPlacements(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const placements = [];
  
  // Extract page name from path
  const pageMatch = filePath.match(/src\/app\/([^\/]+)/);
  const pageName = pageMatch ? pageMatch[1] : 'unknown';
  
  // Look for Image components with src attributes
  const imageRegex = /<Image[^>]*src=["']([^"']+)["'][^>]*>/g;
  const lines = content.split('\n');
  
  let match;
  let lineNumber = 1;
  
  for (const line of lines) {
    if (line.includes('<Image')) {
      // Check if it's a hero section
      const isHero = line.includes('hero') || 
                     content.substring(Math.max(0, content.indexOf(line) - 500), content.indexOf(line)).includes('hero');
      
      // Check if it's priority
      const isPriority = line.includes('priority') || line.includes('priority={true}');
      
      // Extract section context
      let section = 'unknown';
      const sectionMatch = content.substring(Math.max(0, content.indexOf(line) - 200), content.indexOf(line)).match(/(section|div).*className=["']([^"']*)/);
      if (sectionMatch) {
        const className = sectionMatch[2];
        if (className.includes('hero')) section = 'hero';
        else if (className.includes('service')) section = 'services';
        else if (className.includes('gallery')) section = 'gallery';
        else if (className.includes('about')) section = 'about';
        else if (className.includes('faq')) section = 'faq';
      }
      
      const imageMatch = line.match(/src=["']([^"']+)["']/);
      if (imageMatch) {
        placements.push({
          file: filePath.replace(path.join(__dirname, '../'), ''),
          line: lineNumber,
          section: section,
          isHero: isHero,
          isPriority: isPriority,
          currentImage: imageMatch[1]
        });
      }
    }
    lineNumber++;
  }
  
  return placements;
}

/**
 * Discover all placement opportunities
 */
function discoverPlacements() {
  console.log('🔍 Scanning codebase for image placements...\n');
  
  // Find all page files
  const pageFiles = glob.sync('**/*.tsx', {
    cwd: PATHS.appDir,
    absolute: true,
    ignore: ['**/node_modules/**', '**/*.test.tsx', '**/*.spec.tsx']
  });
  
  const discovered = [];
  
  for (const file of pageFiles) {
    const placements = scanFileForPlacements(file);
    if (placements.length > 0) {
      discovered.push({
        file: file,
        placements: placements
      });
    }
  }
  
  console.log(`✅ Found ${discovered.length} files with image placements\n`);
  
  // Generate opportunity suggestions
  const opportunities = [];
  
  for (const fileData of discovered) {
    const relativePath = fileData.file.replace(path.join(__dirname, '../'), '');
    const pageName = relativePath.match(/src\/app\/([^\/]+)/)?.[1] || 'unknown';
    
    for (const placement of fileData.placements) {
      const oppId = `${pageName}-${placement.section}-${placement.isHero ? 'hero' : 'image'}`;
      
      opportunities.push({
        id: oppId,
        page: pageName,
        section: placement.section,
        component: 'Image',
        file: relativePath,
        line: placement.line,
        discovered: true,
        currentImage: placement.currentImage,
        requirements: {
          minScore: placement.isHero ? 8.0 : 7.0,
          requiredTags: placement.isHero ? ['Homepage Hero', 'Services'] : ['Services', 'Gallery'],
          preferredCategories: [],
          preferredCities: [],
          contentContext: `Auto-discovered ${placement.section} image in ${pageName} page`,
          priority: placement.isHero ? 'high' : 'medium'
        },
        maxRotations: 5,
        rotationEnabled: true,
        lockedImages: []
      });
    }
  }
  
  return opportunities;
}

/**
 * Update opportunities file
 */
function updateOpportunities(newOpportunities, update = false) {
  const existing = JSON.parse(fs.readFileSync(PATHS.opportunities, 'utf-8'));
  
  if (update) {
    // Merge with existing, avoiding duplicates
    const existingIds = new Set(existing.opportunities.map(o => o.id));
    const toAdd = newOpportunities.filter(o => !existingIds.has(o.id));
    
    existing.opportunities.push(...toAdd);
    existing.lastUpdated = new Date().toISOString().split('T')[0];
    
    fs.writeFileSync(PATHS.opportunities, JSON.stringify(existing, null, 2));
    console.log(`✅ Added ${toAdd.length} new opportunities\n`);
  } else {
    console.log('📋 Discovered Opportunities (dry run):\n');
    newOpportunities.forEach(opp => {
      console.log(`  - ${opp.id}`);
      console.log(`    File: ${opp.file}:${opp.line}`);
      console.log(`    Current Image: ${opp.currentImage}`);
      console.log('');
    });
    console.log(`\n💡 Run with --update to add these to placement-opportunities.json`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const update = args.includes('--update');
  
  try {
    const opportunities = discoverPlacements();
    updateOpportunities(opportunities, update);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { discoverPlacements };

