#!/usr/bin/env node

/**
 * Rebuild gallery.ts from registry JSON, removing duplicates
 */

const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../data/image-placements-registry.json');
const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function rebuildGallery() {
  console.log('🔧 Rebuilding gallery.ts from registry...\n');
  
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  
  // Group gallery entries by category
  const categories = {
    grooming: [],
    hiking: [],
    transport: [],
    team: [],
    playtime: [],
    portraits: []
  };
  
  // Track seen images to prevent duplicates
  const seenImages = new Set();
  
  // Process gallery entries from registry
  if (registry.galleryEntries && Array.isArray(registry.galleryEntries)) {
    for (const entry of registry.galleryEntries) {
      const category = entry.category || 'grooming';
      if (!categories[category]) {
        categories[category] = [];
      }
      
      if (entry.images && Array.isArray(entry.images)) {
        for (const img of entry.images) {
          const imagePath = img.path || `/${img.category || 'Grooming'}/${img.filename}`;
          
          // Skip duplicates
          if (seenImages.has(imagePath)) {
            console.warn(`   ⚠️  Skipping duplicate: ${imagePath}`);
            continue;
          }
          
          seenImages.add(imagePath);
          
          categories[category].push({
            src: imagePath,
            alt: img.alt || '',
            title: img.title || '',
            priority: img.score >= 8.5 || false
          });
        }
      }
    }
  }
  
  // Build TypeScript file content
  let content = `import type { ImageData } from "@/types";

export const imageCategories: Record<string, ImageData[]> = {
`;
  
  // Add each category
  for (const [category, images] of Object.entries(categories)) {
    content += `  ${category}: [`;
    
    if (images.length === 0) {
      content += `\n  ],\n`;
      continue;
    }
    
    content += '\n';
    images.forEach((img, idx) => {
      const escapedAlt = (img.alt || '').replace(/"/g, '\\"');
      const escapedTitle = (img.title || '').replace(/"/g, '\\"');
      
      content += `    { 
      src: "${img.src}", 
      alt: "${escapedAlt}", 
      title: "${escapedTitle}", 
      priority: ${img.priority} 
    }`;
      
      if (idx < images.length - 1) {
        content += ',\n';
      } else {
        content += '\n';
      }
    });
    
    content += `  ],\n`;
  }
  
  content += `};
`;
  
  // Write file
  fs.writeFileSync(galleryPath, content, 'utf-8');
  
  console.log('✅ Gallery rebuilt successfully!');
  console.log(`   - Grooming: ${categories.grooming.length} images`);
  console.log(`   - Hiking: ${categories.hiking.length} images`);
  console.log(`   - Transport: ${categories.transport.length} images`);
  console.log(`   - Team: ${categories.team.length} images`);
  console.log(`   - Playtime: ${categories.playtime.length} images`);
  console.log(`   - Portraits: ${categories.portraits.length} images`);
  console.log(`   - Total unique images: ${seenImages.size}`);
}

if (require.main === module) {
  rebuildGallery();
}

module.exports = { rebuildGallery };

