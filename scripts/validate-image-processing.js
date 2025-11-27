const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = path.join(__dirname, '..', 'public', 'Hiking', 'river-paws-final-complete.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n').filter(l => l.trim());
const headers = lines[0].split(',');

// Find column indices
const filenameIdx = headers.findIndex(h => h.includes('New SEO Filename'));
const placementIdx = headers.findIndex(h => h.includes('Placement Tags'));

console.log('CSV Headers:', headers);
console.log('Filename column index:', filenameIdx);
console.log('Placement column index:', placementIdx);

// Extract filenames from CSV (handle CSV with quoted fields)
const csvImages = new Set();
const csvImagesWithGallery = new Set();
lines.slice(1).forEach(line => {
  // Parse CSV line properly handling quoted fields
  const parts = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim()); // Add last field
  
  if (parts[filenameIdx]) {
    const filename = parts[filenameIdx].trim().replace(/"/g, '');
    if (filename && filename.endsWith('.jpg')) {
      csvImages.add(filename);
      
      // Check if it has Gallery tag
      if (placementIdx >= 0 && parts[placementIdx]) {
        const placements = parts[placementIdx].toLowerCase();
        if (placements.includes('gallery')) {
          csvImagesWithGallery.add(filename);
        }
      }
    }
  }
});

console.log(`\n📊 CSV Analysis:`);
console.log(`Total images in CSV: ${csvImages.size}`);
console.log(`Images with Gallery tag: ${csvImagesWithGallery.size}`);

// Read gallery.ts
const galleryPath = path.join(__dirname, '..', 'src', 'constants', 'gallery.ts');
const galleryContent = fs.readFileSync(galleryPath, 'utf8');

// Extract hiking images from gallery
const galleryHikingImages = new Set();
const hikingMatches = galleryContent.match(/src: "\/Hiking\/[^"]+"/g) || [];
hikingMatches.forEach(match => {
  const filenameMatch = match.match(/\/Hiking\/([^"]+)/);
  if (filenameMatch) {
    galleryHikingImages.add(filenameMatch[1]);
  }
});

// Extract transport images from gallery
const galleryTransportImages = new Set();
const transportMatches = galleryContent.match(/src: "\/Hiking\/[^"]+"/g) || [];
// Transport images are also in /Hiking directory but in transport category
const transportSection = galleryContent.match(/transport:\s*\[([\s\S]*?)\]/);
if (transportSection) {
  const transportImageMatches = transportSection[1].match(/src: "\/Hiking\/[^"]+"/g) || [];
  transportImageMatches.forEach(match => {
    const filenameMatch = match.match(/\/Hiking\/([^"]+)/);
    if (filenameMatch) {
      galleryTransportImages.add(filenameMatch[1]);
    }
  });
}

console.log(`\n📸 Gallery Analysis:`);
console.log(`Hiking images in gallery: ${galleryHikingImages.size}`);
console.log(`Transport images in gallery: ${galleryTransportImages.size}`);
console.log(`Total gallery images: ${galleryHikingImages.size + galleryTransportImages.size}`);

// Check files on disk
const hikingDir = path.join(__dirname, '..', 'public', 'Hiking');
const filesOnDisk = fs.readdirSync(hikingDir)
  .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'))
  .filter(f => !f.startsWith('river-paws') && !f.includes('.csv'));

const seoFilesOnDisk = filesOnDisk.filter(f => 
  f.includes('-') && 
  (f.includes('madison') || f.includes('waunakee') || f.includes('sun-prairie') || 
   f.includes('middleton') || f.includes('deforest'))
);

console.log(`\n💾 Filesystem Analysis:`);
console.log(`Total image files in /Hiking: ${filesOnDisk.length}`);
console.log(`SEO-optimized filenames: ${seoFilesOnDisk.length}`);
console.log(`Original filenames (not renamed): ${filesOnDisk.length - seoFilesOnDisk.length}`);

// Find missing images
const missingFromGallery = [];
csvImagesWithGallery.forEach(filename => {
  if (!galleryHikingImages.has(filename) && !galleryTransportImages.has(filename)) {
    missingFromGallery.push(filename);
  }
});

const missingFromDisk = [];
csvImages.forEach(filename => {
  if (!filesOnDisk.includes(filename)) {
    missingFromDisk.push(filename);
  }
});

const inGalleryButNotInCSV = [];
[...galleryHikingImages, ...galleryTransportImages].forEach(filename => {
  if (!csvImages.has(filename)) {
    inGalleryButNotInCSV.push(filename);
  }
});

console.log(`\n❌ Missing Images:`);
console.log(`Images in CSV with Gallery tag but NOT in gallery.ts: ${missingFromGallery.length}`);
if (missingFromGallery.length > 0) {
  console.log('Missing gallery images:');
  missingFromGallery.slice(0, 20).forEach(f => console.log(`  - ${f}`));
  if (missingFromGallery.length > 20) {
    console.log(`  ... and ${missingFromGallery.length - 20} more`);
  }
}

console.log(`\nImages in CSV but NOT on disk: ${missingFromDisk.length}`);
if (missingFromDisk.length > 0) {
  console.log('Missing files:');
  missingFromDisk.slice(0, 20).forEach(f => console.log(`  - ${f}`));
  if (missingFromDisk.length > 20) {
    console.log(`  ... and ${missingFromDisk.length - 20} more`);
  }
}

console.log(`\nImages in gallery.ts but NOT in CSV: ${inGalleryButNotInCSV.length}`);
if (inGalleryButNotInCSV.length > 0) {
  console.log('Extra gallery images (may be from previous runs):');
  inGalleryButNotInCSV.slice(0, 20).forEach(f => console.log(`  - ${f}`));
  if (inGalleryButNotInCSV.length > 20) {
    console.log(`  ... and ${inGalleryButNotInCSV.length - 20} more`);
  }
}

// Summary
console.log(`\n✅ Summary:`);
console.log(`CSV images processed: ${csvImages.size}`);
console.log(`Images successfully added to gallery: ${csvImagesWithGallery.size - missingFromGallery.length} / ${csvImagesWithGallery.size}`);
console.log(`Images successfully renamed on disk: ${csvImages.size - missingFromDisk.length} / ${csvImages.size}`);

if (missingFromGallery.length === 0 && missingFromDisk.length === 0) {
  console.log(`\n🎉 All images successfully processed!`);
} else {
  console.log(`\n⚠️  Some images need attention:`);
  if (missingFromGallery.length > 0) {
    console.log(`  - ${missingFromGallery.length} images need to be added to gallery`);
  }
  if (missingFromDisk.length > 0) {
    console.log(`  - ${missingFromDisk.length} images need to be renamed on disk`);
  }
}

