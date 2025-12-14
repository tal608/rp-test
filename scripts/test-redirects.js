#!/usr/bin/env node

/**
 * Pre-Launch Redirect Testing Script
 * Tests all critical redirects before going live
 * 
 * Usage:
 *   1. Build the project: npm run build
 *   2. Start the server: npm start
 *   3. Run this script: node scripts/test-redirects.js
 */

const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// Critical redirects to test (from Google Search Console and sitemap)
const CRITICAL_REDIRECTS = [
  // Service pages (now at root level - preserved URLs)
  { source: '/services/dog-grooming', dest: '/dog-grooming', desc: 'Services Dog Grooming → Dog Grooming' },
  { source: '/services/dog-grooming/', dest: '/dog-grooming', desc: 'Services Dog Grooming (trailing slash) → Dog Grooming' },
  { source: '/services/dog-hikes', dest: '/dog-hikes', desc: 'Services Dog Hikes → Dog Hikes' },
  { source: '/services/dog-hikes/', dest: '/dog-hikes', desc: 'Services Dog Hikes (trailing slash) → Dog Hikes' },
  { source: '/hiking', dest: '/dog-hikes', desc: 'Hiking' },
  { source: '/puppy-play', dest: '/puppy-play', desc: 'Puppy Play' },
  { source: '/dog-daycare', dest: '/dog-hikes', desc: 'Dog Daycare → Dog Hikes' },
  { source: '/services/puppy-play', dest: '/puppy-play', desc: 'Services Puppy Play → Puppy Play' },
  
  // Team/About pages
  { source: '/team', dest: '/caretakers', desc: 'Team' },
  { source: '/staff', dest: '/caretakers', desc: 'Staff' },
  { source: '/about', dest: '/caretakers', desc: 'About' },
  { source: '/about-us', dest: '/caretakers', desc: 'About Us' },
  
  // Application pages (now at root level - preserved URLs)
  { source: '/apply/dog-grooming-application', dest: '/grooming-application', desc: 'Apply Dog Grooming → Grooming Application' },
  { source: '/apply/dog-hikes-application', dest: '/dog-hike-scheduling', desc: 'Apply Dog Hikes → Dog Hike Scheduling' },
  { source: '/application', dest: '/apply', desc: 'Application' },
  { source: '/grooming-application', dest: '/grooming-application', desc: 'Grooming Application (preserved)' },
  { source: '/dog-hike-scheduling', dest: '/dog-hike-scheduling', desc: 'Dog Hike Scheduling (preserved)' },
  
  // Other critical pages
  { source: '/agreement', dest: '/waivers', desc: 'Agreement' },
  { source: '/grooming-and-doggy-daycare-gallery', dest: '/gallery', desc: 'Gallery' },
  { source: '/sms', dest: '/contact', desc: 'SMS' },
  { source: '/search', dest: '/blog', desc: 'Search' },
  
  // WordPress/PDF redirects
  { source: '/wp-content/uploads/2019/03/Pick-up-and-Drop-off-Online-Instructions.pdf', dest: '/waivers', desc: 'Pick-up PDF' },
  { source: '/wp-admin/test', dest: '/', desc: 'WordPress Admin' },
  { source: '/wp-json/test', dest: '/', desc: 'WordPress JSON' },
];

// Pages that should exist (200 status)
const EXISTING_PAGES = [
  '/',
  '/dog-grooming',
  '/dog-hikes',
  '/puppy-play',
  '/grooming-application',
  '/dog-hike-scheduling',
  '/caretakers',
  '/contact',
  '/gallery',
  '/blog',
  '/apply',
  '/waivers',
];

// Middleware tests
const MIDDLEWARE_TESTS = [
  { source: '/contact?success=true', dest: '/contact', desc: 'Query param stripping' },
  { source: '/CONTACT', dest: '/contact', desc: 'Case normalization' },
  { source: '/contact/', dest: '/contact', desc: 'Trailing slash normalization' },
  { source: '/blog/2024/01/old-post', dest: '/blog', desc: 'Old blog post pattern' },
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function makeRequest(url, followRedirects = false, maxRedirects = 10) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url, BASE_URL);
    const originalPath = urlObj.pathname + urlObj.search;
    
    let redirectCount = 0;
    let finalStatus = null;
    let finalLocation = null;
    let redirectChain = [];
    
    const makeRequestInternal = (currentUrl) => {
      if (redirectCount >= maxRedirects) {
        resolve({
          statusCode: finalStatus || 301,
          location: finalLocation,
          redirectChain: redirectChain,
          error: 'Max redirects reached',
        });
        return;
      }
      
      const currentUrlObj = new URL(currentUrl, BASE_URL);
      const options = {
        hostname: currentUrlObj.hostname,
        port: currentUrlObj.port || (currentUrlObj.protocol === 'https:' ? 443 : 80),
        path: currentUrlObj.pathname + currentUrlObj.search,
        method: 'HEAD',
        followRedirect: followRedirects,
      };

      const req = http.request(options, (res) => {
        const isRedirect = res.statusCode === 301 || res.statusCode === 308 || res.statusCode === 302 || res.statusCode === 307;
        
        if (isRedirect && res.headers.location) {
          redirectCount++;
          let location = res.headers.location;
          
          // Track redirect chain
          redirectChain.push({
            from: currentUrlObj.pathname + currentUrlObj.search,
            to: location,
            status: res.statusCode,
          });
          
          // Normalize location
          if (!location.startsWith('http')) {
            location = new URL(location, BASE_URL).href;
          }
          
          finalStatus = res.statusCode;
          finalLocation = location;
          
          // Follow redirect if enabled
          if (followRedirects) {
            makeRequestInternal(location);
          } else {
            resolve({
              statusCode: res.statusCode,
              location: new URL(location).pathname,
              redirectChain: redirectChain,
            });
          }
        } else {
          // Final destination reached
          resolve({
            statusCode: res.statusCode,
            location: finalLocation ? new URL(finalLocation).pathname : null,
            redirectChain: redirectChain,
            finalDestination: currentUrlObj.pathname + currentUrlObj.search,
          });
        }
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    };
    
    makeRequestInternal(originalPath);
  });
}

async function testRedirect(test) {
  try {
    // Follow redirects to get final destination
    const response = await makeRequest(test.source, true, 5);
    
    // Check if we reached the correct destination
    const finalDestination = response.finalDestination || response.location;
    const normalizedDest = test.dest.startsWith('/') ? test.dest : '/' + test.dest;
    const correctDestination = finalDestination === normalizedDest || finalDestination === test.dest;
    
    // Check if redirect chain is valid (should include at least one redirect)
    const hasRedirects = response.redirectChain && response.redirectChain.length > 0;
    const isRedirect = response.statusCode === 301 || response.statusCode === 308 || response.statusCode === 302 || response.statusCode === 307;
    const isSuccess = response.statusCode === 200 && correctDestination;
    
    if (correctDestination && (hasRedirects || isRedirect || isSuccess)) {
      const redirectInfo = response.redirectChain.length > 0 
        ? ` (${response.redirectChain.length} redirect${response.redirectChain.length > 1 ? 's' : ''})`
        : '';
      console.log(`${colors.green}✓${colors.reset} ${test.desc}: ${test.source} → ${test.dest}${redirectInfo}`);
      
      // Show redirect chain if multi-step
      if (response.redirectChain.length > 1) {
        response.redirectChain.forEach((step, idx) => {
          console.log(`  ${colors.cyan}→${colors.reset} Step ${idx + 1}: ${step.from} → ${step.to} (${step.status})`);
        });
      }
      
      return { success: true, test, response };
    } else {
      console.log(`${colors.red}✗${colors.reset} ${test.desc}: ${test.source}`);
      console.log(`  Expected: → ${test.dest}`);
      console.log(`  Got: ${response.statusCode} → ${finalDestination || response.location || 'N/A'}`);
      
      if (response.redirectChain && response.redirectChain.length > 0) {
        console.log(`  Redirect chain:`);
        response.redirectChain.forEach((step, idx) => {
          console.log(`    ${idx + 1}. ${step.from} → ${step.to} (${step.status})`);
        });
      }
      
      return { success: false, test, response };
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${test.desc}: ${test.source}`);
    console.log(`  Error: ${error.message}`);
    return { success: false, test, error };
  }
}

async function testExistingPage(path) {
  try {
    const response = await makeRequest(path, true, 5);
    
    if (response.statusCode === 200) {
      console.log(`${colors.green}✓${colors.reset} Page exists: ${path}`);
      return { success: true, path };
    } else {
      console.log(`${colors.red}✗${colors.reset} Page missing: ${path} (${response.statusCode})`);
      if (response.redirectChain && response.redirectChain.length > 0) {
        console.log(`  Redirected to: ${response.finalDestination || response.location || 'unknown'}`);
      }
      return { success: false, path, statusCode: response.statusCode };
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Page error: ${path}`);
    console.log(`  Error: ${error.message}`);
    return { success: false, path, error };
  }
}

async function runTests() {
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  River Paws Pre-Launch Redirect Testing${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`Testing against: ${BASE_URL}\n`);

  // Test server is running
  try {
    await makeRequest('/');
    console.log(`${colors.green}✓${colors.reset} Server is running\n`);
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Cannot connect to server at ${BASE_URL}`);
    console.log(`  Make sure the server is running: npm start`);
    console.log(`  Error: ${error.message}\n`);
    process.exit(1);
  }

  // Test critical redirects
  console.log(`${colors.blue}Testing Critical Redirects...${colors.reset}`);
  const redirectResults = [];
  for (const test of CRITICAL_REDIRECTS) {
    const result = await testRedirect(test);
    redirectResults.push(result);
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
  }

  console.log(`\n${colors.blue}Testing Existing Pages...${colors.reset}`);
  const pageResults = [];
  for (const path of EXISTING_PAGES) {
    const result = await testExistingPage(path);
    pageResults.push(result);
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
  }

  // Test middleware (don't follow redirects for middleware tests - we want to see the first redirect)
  console.log(`\n${colors.blue}Testing Middleware...${colors.reset}`);
  const middlewareResults = [];
  for (const test of MIDDLEWARE_TESTS) {
    try {
      const response = await makeRequest(test.source, false, 1); // Don't follow redirects for middleware tests
      
      const isRedirect = response.statusCode === 301 || response.statusCode === 308;
      const correctDestination = response.location === test.dest || response.location === (BASE_URL + test.dest);
      
      if (isRedirect && correctDestination) {
        console.log(`${colors.green}✓${colors.reset} ${test.desc}: ${test.source} → ${test.dest} (${response.statusCode})`);
        middlewareResults.push({ success: true, test });
      } else {
        console.log(`${colors.red}✗${colors.reset} ${test.desc}: ${test.source}`);
        console.log(`  Expected: 301/308 → ${test.dest}`);
        console.log(`  Got: ${response.statusCode} → ${response.location || 'N/A'}`);
        middlewareResults.push({ success: false, test, response });
      }
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    } catch (error) {
      console.log(`${colors.red}✗${colors.reset} ${test.desc}: ${test.source}`);
      console.log(`  Error: ${error.message}`);
      middlewareResults.push({ success: false, test, error });
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    }
  }

  // Summary
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}  Test Summary${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  
  const redirectPassed = redirectResults.filter(r => r.success).length;
  const redirectFailed = redirectResults.filter(r => !r.success).length;
  const pagePassed = pageResults.filter(r => r.success).length;
  const pageFailed = pageResults.filter(r => !r.success).length;
  const middlewarePassed = middlewareResults.filter(r => r.success).length;
  const middlewareFailed = middlewareResults.filter(r => !r.success).length;

  console.log(`\nRedirects: ${colors.green}${redirectPassed} passed${colors.reset} / ${colors.red}${redirectFailed} failed${colors.reset}`);
  console.log(`Pages: ${colors.green}${pagePassed} passed${colors.reset} / ${colors.red}${pageFailed} failed${colors.reset}`);
  console.log(`Middleware: ${colors.green}${middlewarePassed} passed${colors.reset} / ${colors.red}${middlewareFailed} failed${colors.reset}`);

  const totalPassed = redirectPassed + pagePassed + middlewarePassed;
  const totalFailed = redirectFailed + pageFailed + middlewareFailed;
  const total = totalPassed + totalFailed;

  console.log(`\nTotal: ${colors.green}${totalPassed} passed${colors.reset} / ${colors.red}${totalFailed} failed${colors.reset} (${total} tests)`);

  if (totalFailed > 0) {
    console.log(`\n${colors.red}⚠ Some tests failed. Please review the errors above.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✓ All tests passed! Ready for production.${colors.reset}`);
    process.exit(0);
  }
}

// Run tests
runTests().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});

