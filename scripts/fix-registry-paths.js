#!/usr/bin/env node

/**
 * Fix Registry Paths
 * 
 * Normalizes all file paths in registry and opportunities to use forward slashes
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  opportunities: path.join(__dirname, '../data/placement-opportunities.json'),
  registry: path.join(__dirname, '../data/image-placements-registry.json')
};

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function extractPageName(filePath) {
  const normalized = normalizePath(filePath);
  const match = normalized.match(/src\/app\/([^\/]+)/);
  return match ? match[1] : (normalized.includes('components') ? 'components' : 'unknown');
}

// Fix opportunities
const opportunities = JSON.parse(fs.readFileSync(PATHS.opportunities, 'utf-8'));
let fixedOpps = 0;

opportunities.opportunities.forEach(opp => {
  const oldFile = opp.file;
  const normalizedFile = normalizePath(oldFile);
  if (oldFile !== normalizedFile) {
    opp.file = normalizedFile;
    fixedOpps++;
  }
  
  // Fix page name if it's wrong
  const correctPage = extractPageName(normalizedFile);
  if (opp.page !== correctPage && opp.page !== 'gallery') {
    opp.page = correctPage;
  }
});

// Fix registry
const registry = JSON.parse(fs.readFileSync(PATHS.registry, 'utf-8'));
let fixedPlacements = 0;

registry.placements.forEach(placement => {
  const oldFile = placement.location.file;
  const normalizedFile = normalizePath(oldFile);
  if (oldFile !== normalizedFile) {
    placement.location.file = normalizedFile;
    fixedPlacements++;
  }
  
  // Fix page name if it's wrong
  const correctPage = extractPageName(normalizedFile);
  if (placement.location.page !== correctPage && placement.location.page !== 'gallery') {
    placement.location.page = correctPage;
    fixedPlacements++;
  }
});

// Save
fs.writeFileSync(PATHS.opportunities, JSON.stringify(opportunities, null, 2));
fs.writeFileSync(PATHS.registry, JSON.stringify(registry, null, 2));

console.log('✅ Fixed paths!');
console.log(`   - Fixed ${fixedOpps} opportunity file paths`);
console.log(`   - Fixed ${fixedPlacements} placement file paths and page names`);

// Show summary
const byPage = {};
registry.placements.forEach(p => {
  const page = p.location.page;
  byPage[page] = (byPage[page] || 0) + p.currentImages.length;
});

console.log('\nPlacements by page:');
Object.entries(byPage).sort((a,b) => b[1] - a[1]).forEach(([page, count]) => {
  console.log(`   ${page}: ${count} images`);
});

const galleryTotal = registry.galleryEntries.reduce((sum, e) => sum + e.images.length, 0);
console.log(`\nTotal: ${registry.placements.length} placements + ${galleryTotal} gallery images = ${registry.placements.length + galleryTotal} images tracked`);

