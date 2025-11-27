#!/usr/bin/env node

/**
 * Consolidated Image Processing Pipeline
 * 
 * Single script that handles everything:
 * 1. Pre-validation (CSV, filesystem, codebase)
 * 2. Cleanup broken references
 * 3. Find duplicate files
 * 4. Create backup
 * 5. Dry run / Execute processing
 * 6. Post-validation
 * 7. Safe build test
 * 
 * Usage:
 *   node scripts/process-images.js --csv "public/Hiking/file.csv" [--execute] [--skip-backup] [--skip-build]
 */

const { validateCSV } = require('./validate-csv');
const { validateFilesystem } = require('./validate-filesystem');
const { validateCodebase } = require('./validate-codebase');
const { createBackup } = require('./create-backup');
const { validateAfterProcessing } = require('./validate-after-processing');
const { cleanGallery } = require('./clean-broken-gallery-refs');
const { findDuplicateImages } = require('./find-duplicate-image-files');
const { safeBuildTest } = require('./safe-build-test');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PATHS = {
  groomingDir: path.join(__dirname, '..', 'public', 'Grooming'),
  hikingDir: path.join(__dirname, '..', 'public', 'Hiking'),
};

// Define safe logger to handle EPIPE
function safeLog(message) {
  try {
    console.log(message);
  } catch (err) {
    if (err.code !== 'EPIPE') throw err;
  }
}

function safeError(message) {
  try {
    console.error(message);
  } catch (err) {
    if (err.code !== 'EPIPE') throw err;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const csvIndex = args.indexOf('--csv');
  
  if (csvIndex === -1 || !args[csvIndex + 1]) {
    safeError('Usage: node scripts/process-images.js --csv path/to/file.csv [options]');
    safeError('\nOptions:');
    safeError('  --execute       Execute changes (default: dry-run)');
    safeError('  --skip-backup   Skip creating backup');
    safeError('  --skip-build    Skip build test');
    safeError('  --skip-cleanup  Skip cleaning broken references');
    safeError('  --skip-duplicates Skip checking for duplicate files');
    safeError('\nExample:');
    safeError('  node scripts/process-images.js --csv "public/Hiking/file.csv" --execute');
    process.exit(1);
  }
  
  const csvPath = args[csvIndex + 1];
  const execute = args.includes('--execute');
  const skipBackup = args.includes('--skip-backup');
  // SAFETY: Dry runs NEVER run builds - only execute mode runs builds (and only with safe script)
  const skipBuild = args.includes('--skip-build') || !execute; // Always skip build for dry runs
  const skipCleanup = args.includes('--skip-cleanup');
  const skipDuplicates = args.includes('--skip-duplicates');
  
  safeLog('\n🚀 Image Processing Pipeline');
  safeLog('═══════════════════════════════════════════');
  safeLog(`CSV: ${csvPath}`);
  safeLog(`Mode: ${execute ? 'EXECUTE' : 'DRY RUN'}`);
  safeLog('═══════════════════════════════════════════\n');
  
  // Step 1: Pre-validation
  safeLog('═══════════════════════════════════════════');
  safeLog('STEP 1: Pre-Flight Validation');
  safeLog('═══════════════════════════════════════════\n');
  
  // 1.1 Validate CSV
  safeLog('📋 Validating CSV structure...');
  const csvResult = validateCSV(csvPath);
  if (!csvResult.valid) {
    safeError('\n❌ CSV validation failed');
    csvResult.errors.forEach(e => safeError(`   - ${e}`));
    process.exit(1);
  }
  safeLog('✅ CSV validation passed\n');
  
  // 1.2 Validate filesystem
  safeLog('📁 Validating file system...');
  const fsResult = validateFilesystem(csvPath);
  if (!fsResult.valid) {
    safeError('\n❌ File system validation failed');
    fsResult.errors.forEach(e => safeError(`   - ${e}`));
    process.exit(1);
  }
  safeLog('✅ File system validation passed\n');
  
  // 1.3 Validate codebase
  safeLog('🔍 Validating codebase state...');
  const codebaseResult = validateCodebase();
  if (!codebaseResult.valid) {
    safeError('\n❌ Codebase validation failed');
    codebaseResult.errors.forEach(e => safeError(`   - ${e}`));
    process.exit(1);
  }
  safeLog('✅ Codebase validation passed\n');
  
  // 1.4 Check for duplicate files
  if (!skipDuplicates) {
    safeLog('🔍 Checking for duplicate image files...');
    try {
      const groomingDups = fs.existsSync(PATHS.groomingDir) ? findDuplicateImages(PATHS.groomingDir) : [];
      const hikingDups = fs.existsSync(PATHS.hikingDir) ? findDuplicateImages(PATHS.hikingDir) : [];
      
      if (groomingDups.length > 0 || hikingDups.length > 0) {
        safeError('\n❌ Found duplicate image files:');
        groomingDups.forEach(dup => {
          safeError(`   - ${dup.files[0]} == ${dup.files[1]} (${dup.directory || 'Grooming'})`);
        });
        hikingDups.forEach(dup => {
          safeError(`   - ${dup.files[0]} == ${dup.files[1]} (${dup.directory || 'Hiking'})`);
        });
        safeError('\n⚠️  Please remove duplicate files before processing.');
        safeError('   Run: node scripts/find-duplicate-image-files.js');
        process.exit(1);
      }
      safeLog('✅ No duplicate files found\n');
    } catch (err) {
      // Ignore EPIPE if it happens during logging within findDuplicateImages (though it shouldn't as we log here)
      console.warn(`⚠️  Warning: Could not check duplicates: ${err.message}\n`);
    }
  }
  
  // 1.5 Clean broken gallery references
  if (!skipCleanup) {
    safeLog('🧹 Cleaning broken gallery references...');
    try {
      const cleanupResult = cleanGallery();
      if (cleanupResult.removed > 0) {
        safeLog(`✅ Removed ${cleanupResult.removed} broken references\n`);
      } else {
        safeLog('✅ No broken references found\n');
      }
    } catch (err) {
      console.warn(`⚠️  Warning: Could not clean gallery: ${err.message}\n`);
    }
  }
  
  // Step 2: Create backup
  if (!skipBackup && execute) {
    safeLog('═══════════════════════════════════════════');
    safeLog('STEP 2: Create Backup');
    safeLog('═══════════════════════════════════════════\n');
    
    const backupResult = createBackup();
    safeLog(`✅ Backup created: ${backupResult.backupDir}\n`);
  } else if (skipBackup && execute) {
    safeLog('⏭️  Skipping backup (--skip-backup)\n');
  }
  
  // Step 3: Process images
  safeLog('═══════════════════════════════════════════');
  safeLog(`STEP 3: ${execute ? 'Execute' : 'Dry Run'} Processing`);
  safeLog('═══════════════════════════════════════════\n');
  
  // Pre-flight check: Verify script exists
  const scriptPath = path.join(__dirname, 'process-image-csv.js');
  if (!fs.existsSync(scriptPath)) {
    safeError(`❌ Script not found: ${scriptPath}`);
    process.exit(1);
  }
  
  // Pre-flight check: Verify CSV file exists
  const resolvedCsvPath = path.isAbsolute(csvPath) ? csvPath : path.join(__dirname, '..', csvPath);
  if (!fs.existsSync(resolvedCsvPath)) {
    safeError(`❌ CSV file not found: ${resolvedCsvPath}`);
    safeError(`   Original path: ${csvPath}`);
    process.exit(1);
  }
  
  try {
    const modeFlag = execute ? '--execute' : '--dry-run';
    // SAFETY: Use timeout, maxBuffer, and capture output to prevent crashes
    const command = `node scripts/process-image-csv.js --csv "${csvPath}" ${modeFlag} 2>&1`;
    
    safeLog(`📝 Running: ${command}\n`);
    
    // Run with safe settings to prevent crashes
    // Using 2>&1 to capture both stdout and stderr together
    const output = execSync(command, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf-8',
      timeout: 300000, // 5 minutes timeout
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      stdio: 'pipe' // Capture all output to prevent buffer overflow
    });
    
    // Show output (limited to prevent overflow)
    if (output) {
      const lines = output.split('\n');
      // Show last 80 lines to match user's Select-Object -First 80
      const lastLines = lines.slice(-80);
      try {
        safeLog(lastLines.join('\n'));
      } catch (writeErr) {
        // Ignore EPIPE errors if pipe is closed by receiver (e.g., Select-Object)
        if (writeErr.code !== 'EPIPE') throw writeErr;
      }
    }
  } catch (err) {
    // Ignore EPIPE errors during process execution (pipe closed by receiver)
    if (err.code === 'EPIPE') {
      safeLog('\n⚠️  Output pipe closed (this is normal when piping to Select-Object)');
      return;
    }
    
    safeError('\n❌ Processing failed');
    
    // Try to extract useful error information safely - wrap everything in try-catch
    try {
      // With stdio: 'pipe' and 2>&1, output is in err.stdout (combined stdout+stderr)
      let errorOutput = '';
      
      // Try to get output from various possible locations
      try {
        if (err.stdout) {
          errorOutput = typeof err.stdout === 'string' ? err.stdout : err.stdout.toString();
        }
      } catch (e) {
        // Ignore errors extracting stdout
      }
      
      try {
        if (!errorOutput && err.stderr) {
          errorOutput = typeof err.stderr === 'string' ? err.stderr : err.stderr.toString();
        }
      } catch (e) {
        // Ignore errors extracting stderr
      }
      
      try {
        if (!errorOutput && err.output) {
          // err.output is an array [stdout, stderr, ...]
          if (Array.isArray(err.output)) {
            errorOutput = err.output.map(o => o ? (typeof o === 'string' ? o : o.toString()) : '').join('');
          } else {
            errorOutput = typeof err.output === 'string' ? err.output : err.output.toString();
          }
        }
      } catch (e) {
        // Ignore errors extracting output
      }
      
      // Display error output
      if (errorOutput && typeof errorOutput === 'string' && errorOutput.trim().length > 0) {
        try {
          const errorLines = errorOutput.split('\n');
          const lastErrorLines = errorLines.slice(-100); // Show more lines for debugging
          if (lastErrorLines.length > 0) {
            safeError('\n📋 Script output (last 100 lines):');
            safeError('─'.repeat(60));
            lastErrorLines.forEach(line => {
              try {
                safeError(line);
              } catch (e) {
                // Ignore EPIPE on individual lines
                if (e.code !== 'EPIPE') throw e;
              }
            });
            safeError('─'.repeat(60));
          }
        } catch (e) {
          // Ignore errors processing error lines
          if (e.code !== 'EPIPE') {
            safeError('\n⚠️  Could not process error output');
          }
        }
      } else {
        safeError('\n⚠️  No output captured from script');
      }
      
      // Display error details
      try {
        if (err.message && typeof err.message === 'string') {
          safeError(`\n💥 Error message: ${err.message}`);
        }
      } catch (e) {
        // Ignore errors accessing message
      }
      
      try {
        if (err.status !== undefined) {
          safeError(`\n📊 Exit code: ${err.status}`);
        }
      } catch (e) {
        // Ignore errors accessing status
      }
      
      try {
        if (err.signal) {
          safeError(`\n📡 Signal: ${err.signal}`);
        }
      } catch (e) {
        // Ignore errors accessing signal
      }
      
      // Check for timeout
      try {
        if (err.signal === 'SIGTERM' || (err.message && typeof err.message === 'string' && err.message.includes('timeout'))) {
          safeError('\n⏱️  Process timed out after 5 minutes');
          safeError('   This may indicate the CSV is too large or the script is hanging.');
        }
      } catch (e) {
        // Ignore errors checking timeout
      }
      
      // Check for buffer overflow
      try {
        if ((err.message && typeof err.message === 'string' && err.message.includes('maxBuffer')) || err.code === 'ENOBUFS') {
          safeError('\n📦 Output buffer exceeded (10MB limit)');
          safeError('   Try processing fewer images at once or increase maxBuffer.');
        }
      } catch (e) {
        // Ignore errors checking buffer
      }
      
      // Check for file not found
      try {
        if (err.code === 'ENOENT' || (err.message && typeof err.message === 'string' && err.message.includes('ENOENT'))) {
          safeError('\n📁 File not found error');
          safeError(`   CSV path: ${csvPath}`);
          safeError(`   Script path: ${scriptPath}`);
        }
      } catch (e) {
        // Ignore errors checking file
      }
      
    } catch (extractErr) {
      // Final fallback - just show basic error info
      try {
        safeError('\n⚠️  Could not extract detailed error information');
        if (err && typeof err === 'object') {
          try {
            safeError(`   Error code: ${err.code || 'unknown'}`);
            safeError(`   Error signal: ${err.signal || 'none'}`);
            safeError(`   Error status: ${err.status || 'unknown'}`);
            if (err.message) {
              safeError(`   Error message: ${err.message}`);
            }
          } catch (e) {
            // Ignore errors accessing error properties
          }
        }
      } catch (finalErr) {
        // If even this fails, just exit silently
        if (finalErr.code !== 'EPIPE') {
          safeError('\n⚠️  Fatal error during error handling');
        }
      }
    }
    
    try {
      if (!execute) {
        safeError('\n⚠️  This was a dry run. Review errors above.');
        safeError('No changes were made.');
      } else {
        safeError('\nYou can rollback using: node scripts/rollback.js --backup [backup-dir]');
      }
    } catch (e) {
      // Ignore EPIPE on final messages
      if (e.code !== 'EPIPE') throw e;
    }
    
    try {
      process.exit(1);
    } catch (e) {
      // If exit fails, just return
      return;
    }
  }
  
  if (!execute) {
    safeLog('\n⚠️  This was a dry run. No changes were made.');
    safeLog('Run with --execute to apply changes.\n');
    process.exit(0);
  }
  
  // Step 4: Post-process validation
  safeLog('\n═══════════════════════════════════════════');
  safeLog('STEP 4: Post-Process Validation');
  safeLog('═══════════════════════════════════════════\n');
  
  // Post-validation WITHOUT build check (build check happens separately with safe script)
  const postResult = validateAfterProcessing({ checkBuild: false });
  if (!postResult.valid) {
    safeError('\n❌ Post-processing validation failed');
    postResult.errors.forEach(e => safeError(`   - ${e}`));
    safeError('\nYou can rollback using: node scripts/rollback.js --backup [backup-dir]');
    process.exit(1);
  }
  safeLog('✅ Post-processing validation passed\n');
  
  // Step 5: Build test (ALWAYS using safe script - NEVER call unsafe version)
  // SAFETY: Build test ONLY runs in execute mode, and ONLY uses safeBuildTest()
  if (!skipBuild && execute) {
    safeLog('═══════════════════════════════════════════');
    safeLog('STEP 5: Build Test (Safe Mode)');
    safeLog('═══════════════════════════════════════════\n');
    
    // SAFETY: Always use safeBuildTest() - NEVER execSync('npm run build')
    // This is the ONLY place builds are run, and it's always safe
    const buildExitCode = safeBuildTest();
    if (buildExitCode !== 0) {
      safeError('\n❌ Build test failed');
      safeError('You can rollback using: node scripts/rollback.js --backup [backup-dir]');
      process.exit(1);
    }
  } else {
    if (!execute) {
      safeLog('⏭️  Skipping build test (dry run mode - builds never run in dry runs)\n');
    } else {
      safeLog('⏭️  Skipping build test (--skip-build)\n');
    }
  }
  
  safeLog('═══════════════════════════════════════════');
  safeLog('✅ Processing Completed Successfully!');
  safeLog('═══════════════════════════════════════════\n');
}

if (require.main === module) {
  main().catch(err => {
    try {
      safeError('\n❌ Fatal error');
      if (err && err.message) {
        try {
          safeError(`   ${err.message}`);
        } catch (e) {
          if (e.code !== 'EPIPE') throw e;
        }
      }
      if (err && err.stack) {
        try {
          const stackLines = err.stack.split('\n').slice(0, 10); // Limit stack trace
          stackLines.forEach(line => {
            try {
              safeError(`   ${line}`);
            } catch (e) {
              if (e.code !== 'EPIPE') throw e;
            }
          });
        } catch (e) {
          if (e.code !== 'EPIPE') throw e;
        }
      }
    } catch (finalErr) {
      // If even error logging fails, just exit
      if (finalErr.code !== 'EPIPE') {
        try {
          process.exit(1);
        } catch (e) {
          // Exit failed, just return
          return;
        }
      }
    }
    try {
      process.exit(1);
    } catch (e) {
      // Exit failed, just return
      return;
    }
  });
}

module.exports = { main };
