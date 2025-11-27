const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function fixGalleryCategories() {
  console.log('🔧 Fixing gallery categories...');
  let content = fs.readFileSync(galleryPath, 'utf-8');
  
  // 1. Extract all image objects
  const imageObjects = [];
  const lines = content.split('\n');
  let currentBlock = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('{') && line.includes('src:')) {
      currentBlock = line + '\n';
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        currentBlock += nextLine + '\n';
        if (nextLine.trim().startsWith('}') || nextLine.trim().endsWith('},')) {
          i = j;
          break;
        }
        j++;
      }
      // Clean up comma
      currentBlock = currentBlock.trim();
      if (currentBlock.endsWith(',')) currentBlock = currentBlock.slice(0, -1);
      
      imageObjects.push(currentBlock);
    }
  }
  
  console.log(`Found ${imageObjects.length} total images.`);
  
  // 2. Sort into correct categories based on src path
  const categories = {
    grooming: [],
    hiking: [],
    transport: [],
    team: [],
    playtime: [],
    portraits: []
  };
  
  const seenSrcs = new Set();
  
  for (const imgBlock of imageObjects) {
    const srcMatch = imgBlock.match(/src:\s*["']([^"']+)["']/);
    if (!srcMatch) continue;
    
    const src = srcMatch[1];
    if (seenSrcs.has(src)) continue; // Dedupe
    seenSrcs.add(src);
    
    if (src.includes('/Grooming/')) {
      if (src.includes('transport') || src.includes('dog-bus')) {
         categories.transport.push(imgBlock);
      } else {
         categories.grooming.push(imgBlock);
      }
    } else if (src.includes('/Hiking/')) {
      if (src.includes('transport') || src.includes('dog-bus')) {
         categories.transport.push(imgBlock);
      } else {
         categories.hiking.push(imgBlock);
      }
    } else {
      // Default or other
      categories.grooming.push(imgBlock);
    }
  }
  
  // 3. Reconstruct file
  let newContent = `import type { ImageData } from "@/types";

export const imageCategories: Record<string, ImageData[]> = {
`;

  for (const [cat, images] of Object.entries(categories)) {
    console.log(`   📂 ${cat}: ${images.length} images`);
    newContent += `  ${cat}: [\n`;
    if (images.length > 0) {
      newContent += images.join(',\n') + '\n';
    }
    newContent += `  ],\n`;
  }
  
  newContent += `};\n`;
  
  fs.writeFileSync(galleryPath, newContent);
  console.log('✅ Gallery fixed and sorted.');
}

fixGalleryCategories();

