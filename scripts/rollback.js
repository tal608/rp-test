#!/usr/bin/env node

/**
 * Rollback to Backup
 * 
 * Restores files from a backup directory
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts'),
  gallery: path.join(__dirname, '../src/constants/gallery.ts'),
  backupsDir: path.join(__dirname, '../backups')
};

function rollback(backupPath) {
  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup directory not found: ${backupPath}`);
  }
  
  // Check for manifest
  const manifestPath = path.join(backupPath, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Backup manifest not found - invalid backup directory');
  }
  
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const restoredFiles = [];
  
  // Restore registry
  const registryBackup = path.join(backupPath, 'image-placements-registry.json');
  if (fs.existsSync(registryBackup)) {
    fs.copyFileSync(registryBackup, PATHS.registry);
    restoredFiles.push('image-placements-registry.json');
  }
  
  // Restore focal points
  const focalBackup = path.join(backupPath, 'imageFocalPoints.ts');
  if (fs.existsSync(focalBackup)) {
    fs.copyFileSync(focalBackup, PATHS.focalPoints);
    restoredFiles.push('imageFocalPoints.ts');
  }
  
  // Restore gallery
  const galleryBackup = path.join(backupPath, 'gallery.ts');
  if (fs.existsSync(galleryBackup)) {
    fs.copyFileSync(galleryBackup, PATHS.gallery);
    restoredFiles.push('gallery.ts');
  }
  
  // Restore app files
  const appBackupDir = path.join(backupPath, 'app');
  if (fs.existsSync(appBackupDir)) {
    function restoreAppFiles(dir, baseDir = appBackupDir) {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          restoreAppFiles(filePath, baseDir);
        } else {
          const relativePath = path.relative(baseDir, filePath);
          const targetPath = path.join(__dirname, '..', 'src', relativePath);
          const targetDir = path.dirname(targetPath);
          
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          
          fs.copyFileSync(filePath, targetPath);
          restoredFiles.push(relativePath);
        }
      });
    }
    
    restoreAppFiles(appBackupDir);
  }
  
  return {
    backupPath,
    timestamp: manifest.timestamp,
    restoredFiles: restoredFiles.length
  };
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const backupIndex = args.indexOf('--backup');
  
  if (backupIndex === -1 || !args[backupIndex + 1]) {
    console.error('Usage: node scripts/rollback.js --backup backups/YYYY-MM-DD-HHMMSS');
    console.error('\nAvailable backups:');
    
    if (fs.existsSync(PATHS.backupsDir)) {
      const backups = fs.readdirSync(PATHS.backupsDir)
        .filter(f => fs.statSync(path.join(PATHS.backupsDir, f)).isDirectory())
        .sort()
        .reverse();
      
      if (backups.length === 0) {
        console.error('   No backups found');
      } else {
        backups.forEach(backup => {
          console.error(`   - ${backup}`);
        });
      }
    } else {
      console.error('   No backups directory found');
    }
    
    process.exit(1);
  }
  
  const backupPath = path.resolve(args[backupIndex + 1]);
  
  console.log('\n🔄 Rolling Back\n');
  console.log(`Backup: ${backupPath}\n`);
  
  try {
    const result = rollback(backupPath);
    
    console.log(`✅ Rollback completed successfully`);
    console.log(`   Timestamp: ${result.timestamp}`);
    console.log(`   Files restored: ${result.restoredFiles}\n`);
    
    console.log('⚠️  Note: You may need to:');
    console.log('   1. Run `npm run build` to verify everything works');
    console.log('   2. Check for any manual fixes needed');
  } catch (err) {
    console.error(`❌ Rollback failed: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { rollback };

