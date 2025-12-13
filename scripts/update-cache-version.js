#!/usr/bin/env node

/**
 * Script to update cache version when content changes
 * 
 * Usage:
 *   node scripts/update-cache-version.js
 *   node scripts/update-cache-version.js --sync   (just sync sw.js to current version)
 * 
 * This increments the cache version, which triggers automatic
 * cache invalidation across all service workers and Next.js caches.
 */

const fs = require('fs');
const path = require('path');

const CACHE_VERSION_FILE = path.join(__dirname, '..', 'src', 'lib', 'cache-version.ts');
const SERVICE_WORKER_FILE = path.join(__dirname, '..', 'public', 'sw.js');

/**
 * Update the service worker file with the given version
 */
function updateServiceWorker(version) {
  try {
    let swContent = fs.readFileSync(SERVICE_WORKER_FILE, 'utf-8');
    
    // Replace the CACHE_VERSION in sw.js
    const swVersionRegex = /let CACHE_VERSION = ['"][^'"]+['"]/;
    if (!swVersionRegex.test(swContent)) {
      console.warn('⚠️  Could not find CACHE_VERSION in sw.js - skipping service worker update');
      return false;
    }
    
    swContent = swContent.replace(
      swVersionRegex,
      `let CACHE_VERSION = '${version}'`
    );
    
    fs.writeFileSync(SERVICE_WORKER_FILE, swContent, 'utf-8');
    console.log(`✅ Service worker (sw.js) updated to version ${version}`);
    return true;
  } catch (error) {
    console.error('❌ Error updating service worker:', error);
    return false;
  }
}

/**
 * Get current version from cache-version.ts
 */
function getCurrentVersion() {
  const content = fs.readFileSync(CACHE_VERSION_FILE, 'utf-8');
  const versionMatch = content.match(/export const CACHE_VERSION = ['"]([^'"]+)['"]/);
  if (!versionMatch) {
    throw new Error('Could not find CACHE_VERSION in cache-version.ts');
  }
  return versionMatch[1];
}

function updateCacheVersion() {
  try {
    // Check for --sync flag (just sync sw.js without incrementing)
    const syncOnly = process.argv.includes('--sync');
    
    // Read current cache version file
    let content = fs.readFileSync(CACHE_VERSION_FILE, 'utf-8');
    
    // Extract current version
    const currentVersion = getCurrentVersion();
    console.log(`Current cache version: ${currentVersion}`);
    
    let newVersion = currentVersion;
    
    if (!syncOnly) {
      // Parse version (format: major.minor.patch)
      const [major, minor, patch] = currentVersion.split('.').map(Number);
      
      // Increment patch version
      newVersion = `${major}.${minor}.${patch + 1}`;
      console.log(`New cache version: ${newVersion}`);
      
      // Replace version in cache-version.ts
      content = content.replace(
        /export const CACHE_VERSION = ['"][^'"]+['"]/,
        `export const CACHE_VERSION = '${newVersion}'`
      );
      
      // Write updated file
      fs.writeFileSync(CACHE_VERSION_FILE, content, 'utf-8');
      console.log(`✅ Cache version file (cache-version.ts) updated to ${newVersion}`);
    } else {
      console.log('🔄 Sync mode: syncing sw.js to current version without incrementing');
    }
    
    // Always update service worker to match
    updateServiceWorker(newVersion);
    
    console.log('');
    console.log('📢 Both cache-version.ts and sw.js are now in sync.');
    console.log('📢 Restart the dev server for changes to take effect.');
    
  } catch (error) {
    console.error('❌ Error updating cache version:', error);
    process.exit(1);
  }
}

updateCacheVersion();

