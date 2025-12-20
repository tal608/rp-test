const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeKellyImage() {
  const inputPath = path.join(__dirname, '../public/caretakers/kelly-esterholm.png');
  const outputPath = path.join(__dirname, '../public/caretakers/kelly-esterholm.jpg');
  
  try {
    const inputStats = fs.statSync(inputPath);
    console.log(`Input file size: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    
    await sharp(inputPath)
      .jpeg({ 
        quality: 85,  // High quality but good compression
        mozjpeg: true // Use mozjpeg for better compression
      })
      .resize(800, 800, { // Max 800x800 for profile photos
        fit: 'cover',
        position: 'attention' // Focus on the most interesting part
      })
      .toFile(outputPath);
    
    const outputStats = fs.statSync(outputPath);
    console.log(`Output file size: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(`Compression ratio: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}% smaller`);
    console.log(`\nDone! New file: ${outputPath}`);
    console.log('\nNext step: Update riverpaws/src/constants/team.ts to use kelly-esterholm.jpg');
    
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeKellyImage();

