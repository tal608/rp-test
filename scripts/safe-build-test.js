#!/usr/bin/env node

/**
 * Safe build test that won't crash on errors
 * Returns exit code 0 on success, 1 on failure
 */

const { execSync } = require('child_process');
const path = require('path');

function safeBuildTest() {
  const projectRoot = path.join(__dirname, '..');
  
  try {
    console.log('🔨 Running build test...\n');
    
    // Run build with error handling
    const buildOutput = execSync('npm run build 2>&1', {
      cwd: projectRoot,
      encoding: 'utf-8',
      timeout: 180000, // 3 minutes
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });
    
    // Show last 50 lines
    const lines = buildOutput.split('\n');
    const lastLines = lines.slice(-50);
    console.log(lastLines.join('\n'));
    
    // Check for common error patterns
    const errorPatterns = [
      /Error:/i,
      /Failed to compile/i,
      /SyntaxError/i,
      /TypeError/i,
      /Cannot find module/i,
      /Module not found/i
    ];
    
    const hasErrors = errorPatterns.some(pattern => pattern.test(buildOutput));
    
    if (hasErrors) {
      console.error('\n❌ Build failed - errors detected');
      return 1;
    }
    
    // Check for success indicators
    if (buildOutput.includes('Compiled successfully') || 
        buildOutput.includes('Generating static pages')) {
      console.log('\n✅ Build test passed');
      return 0;
    }
    
    // If we get here, assume success (build completed without errors)
    console.log('\n✅ Build completed');
    return 0;
    
  } catch (error) {
    console.error('\n❌ Build test failed\n');
    
    // Try to extract useful error info
    if (error.stdout) {
      const lines = error.stdout.split('\n');
      console.error('Build output (last 30 lines):');
      console.error(lines.slice(-30).join('\n'));
    }
    
    if (error.stderr) {
      const lines = error.stderr.split('\n');
      console.error('\nError output (last 30 lines):');
      console.error(lines.slice(-30).join('\n'));
    }
    
    if (error.message) {
      console.error(`\nError: ${error.message}`);
    }
    
    return 1;
  }
}

if (require.main === module) {
  const exitCode = safeBuildTest();
  process.exit(exitCode);
}

module.exports = { safeBuildTest };

