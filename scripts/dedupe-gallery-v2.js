const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../src/constants/gallery.ts');

function dedupeGallery() {
  console.log('🧹 Deduping gallery.ts...');
  let content = fs.readFileSync(galleryPath, 'utf-8');
  let originalContent = content;

  // Categories to check
  const categories = ['hiking', 'grooming', 'transport', 'training', 'play', 'boarding', 'daycare'];

  for (const category of categories) {
    // Find category block: category: [ ... ]
    const regex = new RegExp(`(${category}:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
    
    content = content.replace(regex, (match, start, body, end) => {
      // Split items by finding the closing brace of each object },
      // This is a bit tricky with regex, so let's use a simple parser
      
      // Improved split: split by "}," but keep the delimiter
      const items = body.split(/},\s*\n/);
      
      const uniqueItems = new Map(); // src -> item string
      const seenSrcs = new Set();
      const cleanItems = [];

      for (let item of items) {
        item = item.trim();
        if (!item) continue;
        
        // If it doesn't end with }, add it back (split consumes it sometimes)
        if (!item.endsWith('}') && !item.endsWith(',')) {
           // It might be the last item without comma
        }

        // Extract src
        const srcMatch = item.match(/src:\s*["']([^"']+)["']/);
        if (srcMatch) {
          const src = srcMatch[1];
          if (!seenSrcs.has(src)) {
            seenSrcs.add(src);
            cleanItems.push(item);
          } else {
            console.log(`   🗑️  Removing duplicate in ${category}: ${path.basename(src)}`);
          }
        } else {
          // Keep non-image items or comments?
          cleanItems.push(item);
        }
      }

      // Reconstruct body
      // Join with ",\n" and ensure braces are handled
      // The split removed "},\n", so we need to reconstruct carefully.
      // Actually, let's try a different approach.
      return match; // Placeholder - see below
    });
  }
  
  // Regex approach was too risky for robust parsing. Let's use a simpler string manipulation loop.
  
  const newContentLines = [];
  const seenSrcsGlobal = new Set();
  const lines = originalContent.split('\n');
  let insideCategory = false;
  let currentBlock = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect image object start
    if (line.trim().startsWith('{')) {
      currentBlock = line + '\n';
      // Read ahead until }
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        currentBlock += nextLine + '\n';
        if (nextLine.trim().startsWith('}') || nextLine.trim().endsWith('},')) {
          i = j; // Advance main loop
          break;
        }
        j++;
      }
      
      // Check src in block
      const srcMatch = currentBlock.match(/src:\s*["']([^"']+)["']/);
      if (srcMatch) {
        const src = srcMatch[1];
        if (seenSrcsGlobal.has(src)) {
          console.log(`   🗑️  Removing duplicate: ${path.basename(src)}`);
          // Skip adding this block
        } else {
          seenSrcsGlobal.add(src);
          newContentLines.push(currentBlock.trimEnd()); // Add unique block
        }
      } else {
        newContentLines.push(currentBlock.trimEnd()); // Unknown block, keep it
      }
    } else {
      newContentLines.push(line);
    }
  }
  
  fs.writeFileSync(galleryPath, newContentLines.join('\n'));
  console.log('✅ Deduping complete.');
}

dedupeGallery();

