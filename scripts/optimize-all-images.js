const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const DIRS_TO_OPTIMIZE = ['Grooming', 'Hiking', 'caretakers'];
const MAX_SIZE_KB = 500; // Images over this will be optimized
const MAX_DIMENSION = 2400; // Max width/height
const QUALITY = 80; // JPEG quality

async function optimizeImage(inputPath, outputPath, isJpeg) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  let transformer = image;
  
  // Resize if too large
  if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
    transformer = transformer.resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }
  
  if (isJpeg) {
    transformer = transformer.jpeg({ quality: QUALITY, mozjpeg: true });
  } else {
    transformer = transformer.png({ compressionLevel: 9 });
  }
  
  await transformer.toFile(outputPath);
}

async function processDirectory(dir) {
  const publicPath = path.join(__dirname, '../public', dir);
  
  if (!fs.existsSync(publicPath)) {
    console.log(`Directory not found: ${publicPath}`);
    return;
  }
  
  const files = fs.readdirSync(publicPath);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  console.log(`\n📁 Processing ${dir}/ (${imageFiles.length} images)`);
  
  let optimized = 0;
  let skipped = 0;
  let totalSaved = 0;
  
  for (const file of imageFiles) {
    const filePath = path.join(publicPath, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    if (sizeKB < MAX_SIZE_KB) {
      skipped++;
      continue;
    }
    
    const isJpeg = /\.(jpg|jpeg)$/i.test(file);
    const tempPath = filePath + '.optimized';
    
    try {
      await optimizeImage(filePath, tempPath, isJpeg);
      
      const newStats = fs.statSync(tempPath);
      const newSizeKB = newStats.size / 1024;
      const savings = sizeKB - newSizeKB;
      
      if (newSizeKB < sizeKB) {
        // Only replace if smaller
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        totalSaved += savings;
        optimized++;
        console.log(`  ✅ ${file}: ${sizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB (-${savings.toFixed(0)}KB)`);
      } else {
        fs.unlinkSync(tempPath);
        skipped++;
        console.log(`  ⏭️ ${file}: Already optimal`);
      }
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
  
  console.log(`  Summary: ${optimized} optimized, ${skipped} skipped, ${(totalSaved/1024).toFixed(2)}MB saved`);
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log(`   Max size threshold: ${MAX_SIZE_KB}KB`);
  console.log(`   Max dimension: ${MAX_DIMENSION}px`);
  console.log(`   JPEG quality: ${QUALITY}%`);
  
  for (const dir of DIRS_TO_OPTIMIZE) {
    await processDirectory(dir);
  }
  
  console.log('\n✨ Done!');
}

main().catch(console.error);

