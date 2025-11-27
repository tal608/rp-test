/**
 * Image Optimization Script
 * Compresses all images in the public folder using sharp
 * 
 * Run with: npm run optimize-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Quality settings
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

// Stats
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;
let skippedCount = 0;
let errorCount = 0;

function getImageFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        files.push(...getImageFiles(fullPath));
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = fs.statSync(filePath).size;
  totalOriginalSize += originalSize;
  
  try {
    // Read file into buffer first (releases file handle)
    const inputBuffer = fs.readFileSync(filePath);
    
    let image = sharp(inputBuffer);
    const metadata = await image.metadata();
    
    // Resize if too large
    let needsResize = false;
    let newWidth = metadata.width;
    let newHeight = metadata.height;
    
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      needsResize = true;
      const aspectRatio = metadata.width / metadata.height;
      
      if (metadata.width > MAX_WIDTH) {
        newWidth = MAX_WIDTH;
        newHeight = Math.round(MAX_WIDTH / aspectRatio);
      }
      
      if (newHeight > MAX_HEIGHT) {
        newHeight = MAX_HEIGHT;
        newWidth = Math.round(MAX_HEIGHT * aspectRatio);
      }
    }
    
    // Apply resize if needed
    if (needsResize) {
      image = sharp(inputBuffer).resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Compress based on format
    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await image
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toBuffer();
    } else {
      outputBuffer = await image
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
    }
    
    const optimizedSize = outputBuffer.length;
    
    // Only save if we achieved compression
    if (optimizedSize < originalSize) {
      // Write to temp file first, then rename (atomic operation)
      const tempPath = path.join(os.tmpdir(), `opt-${Date.now()}-${path.basename(filePath)}`);
      fs.writeFileSync(tempPath, outputBuffer);
      
      // Delete original and rename temp
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      totalOptimizedSize += optimizedSize;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB (-${savings}%)`);
      processedCount++;
    } else {
      totalOptimizedSize += originalSize;
      console.log(`○ ${path.basename(filePath)}: Already optimized (${(originalSize/1024).toFixed(0)}KB)`);
      skippedCount++;
    }
    
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error.message);
    totalOptimizedSize += originalSize;
    errorCount++;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`Settings: JPEG quality=${JPEG_QUALITY}, Max size=${MAX_WIDTH}x${MAX_HEIGHT}\n`);
  
  const imageFiles = getImageFiles(PUBLIC_DIR);
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  for (const file of imageFiles) {
    await optimizeImage(file);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total images: ${imageFiles.length}`);
  console.log(`Optimized: ${processedCount}`);
  console.log(`Skipped (already optimal): ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  const savedMB = (totalOriginalSize - totalOptimizedSize) / 1024 / 1024;
  const savedPct = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`Savings: ${savedMB.toFixed(2)} MB (${savedPct}%)`);
}

main().catch(console.error);
