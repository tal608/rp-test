#!/usr/bin/env node

/**
 * Create Backup Before Processing
 * 
 * Creates timestamped backup of:
 * - All modified .tsx files (with placement markers)
 * - gallery.ts
 * - imageFocalPoints.ts
 * - image-placements-registry.json
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts'),
  gallery: path.join(__dirname, '../src/constants/gallery.ts'),
  appDir: path.join(__dirname, '../src/app'),
  backupsDir: path.join(__dirname, '../backups')
};

function findFilesWithPlacementMarkers(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.includes('node_modules')) {
      findFilesWithPlacementMarkers(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes('IMAGE_PLACEMENT_START')) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(PATHS.backupsDir, timestamp);
  
  // Create backups directory if it doesn't exist
  if (!fs.existsSync(PATHS.backupsDir)) {
    fs.mkdirSync(PATHS.backupsDir, { recursive: true });
  }
  
  // Create timestamped backup directory
  fs.mkdirSync(backupDir, { recursive: true });
  
  const backedUpFiles = [];
  
  // Backup registry
  if (fs.existsSync(PATHS.registry)) {
    const backupPath = path.join(backupDir, 'image-placements-registry.json');
    fs.copyFileSync(PATHS.registry, backupPath);
    backedUpFiles.push('image-placements-registry.json');
  }
  
  // Backup focal points
  if (fs.existsSync(PATHS.focalPoints)) {
    const backupPath = path.join(backupDir, 'imageFocalPoints.ts');
    fs.copyFileSync(PATHS.focalPoints, backupPath);
    backedUpFiles.push('imageFocalPoints.ts');
  }
  
  // Backup gallery
  if (fs.existsSync(PATHS.gallery)) {
    const backupPath = path.join(backupDir, 'gallery.ts');
    fs.copyFileSync(PATHS.gallery, backupPath);
    backedUpFiles.push('gallery.ts');
  }
  
  // Backup files with placement markers
  const filesWithMarkers = findFilesWithPlacementMarkers(PATHS.appDir);
  if (filesWithMarkers.length > 0) {
    const appBackupDir = path.join(backupDir, 'app');
    fs.mkdirSync(appBackupDir, { recursive: true });
    
    filesWithMarkers.forEach(filePath => {
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);
      const backupPath = path.join(backupDir, relativePath);
      const backupDirPath = path.dirname(backupPath);
      
      if (!fs.existsSync(backupDirPath)) {
        fs.mkdirSync(backupDirPath, { recursive: true });
      }
      
      fs.copyFileSync(filePath, backupPath);
      backedUpFiles.push(relativePath);
    });
  }
  
  // Create backup manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    files: backedUpFiles,
    backupDir: backupDir
  };
  
  fs.writeFileSync(
    path.join(backupDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  return {
    backupDir,
    timestamp,
    fileCount: backedUpFiles.length
  };
}

// CLI
if (require.main === module) {
  console.log('\n💾 Creating Backup\n');
  
  try {
    const result = createBackup();
    
    console.log(`✅ Backup created successfully`);
    console.log(`   Location: ${result.backupDir}`);
    console.log(`   Files: ${result.fileCount}`);
    console.log(`   Timestamp: ${result.timestamp}\n`);
    
    // List recent backups
    if (fs.existsSync(PATHS.backupsDir)) {
      const backups = fs.readdirSync(PATHS.backupsDir)
        .filter(f => fs.statSync(path.join(PATHS.backupsDir, f)).isDirectory())
        .sort()
        .reverse()
        .slice(0, 5);
      
      if (backups.length > 0) {
        console.log('📋 Recent backups:');
        backups.forEach(backup => {
          console.log(`   - ${backup}`);
        });
      }
    }
  } catch (err) {
    console.error(`❌ Backup failed: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { createBackup };

