#!/usr/bin/env node

/**
 * Script to update cache version when content changes
 * 
 * Usage:
 *   node scripts/update-cache-version.js
 * 
 * This increments the cache version, which triggers automatic
 * cache invalidation across all service workers and Next.js caches.
 */

const fs = require('fs');
const path = require('path');

const CACHE_VERSION_FILE = path.join(__dirname, '..', 'src', 'lib', 'cache-version.ts');

function updateCacheVersion() {
  try {
    // Read current cache version file
    let content = fs.readFileSync(CACHE_VERSION_FILE, 'utf-8');
    
    // Extract current version
    const versionMatch = content.match(/export const CACHE_VERSION = ['"]([^'"]+)['"]/);
    if (!versionMatch) {
      console.error('❌ Could not find CACHE_VERSION in cache-version.ts');
      process.exit(1);
    }
    
    const currentVersion = versionMatch[1];
    console.log(`Current cache version: ${currentVersion}`);
    
    // Parse version (format: major.minor.patch)
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    // Increment patch version
    const newVersion = `${major}.${minor}.${patch + 1}`;
    console.log(`New cache version: ${newVersion}`);
    
    // Replace version in file
    content = content.replace(
      /export const CACHE_VERSION = ['"][^'"]+['"]/,
      `export const CACHE_VERSION = '${newVersion}'`
    );
    
    // Write updated file
    fs.writeFileSync(CACHE_VERSION_FILE, content, 'utf-8');
    
    console.log(`✅ Cache version updated to ${newVersion}`);
    console.log('📢 All service workers will automatically detect the version change and invalidate caches.');
    
  } catch (error) {
    console.error('❌ Error updating cache version:', error);
    process.exit(1);
  }
}

updateCacheVersion();

