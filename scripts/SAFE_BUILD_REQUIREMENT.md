# Safe Build Test Requirement

## ⚠️ IMPORTANT: Always Use Safe Build Test

**All build operations MUST use `scripts/safe-build-test.js` to prevent crashes.**

## Why Safe Build Test?

The safe build test:
- ✅ Handles errors gracefully without crashing
- ✅ Limits output to prevent buffer overflows
- ✅ Provides clear error messages
- ✅ Returns exit codes instead of throwing exceptions
- ✅ Has proper timeout handling (3 minutes)
- ✅ Has large buffer size (10MB)

## Direct `npm run build` is FORBIDDEN

**DO NOT** use direct `execSync('npm run build')` in scripts. It can:
- ❌ Crash the entire process on errors
- ❌ Cause buffer overflow with large output
- ❌ Hang indefinitely
- ❌ Provide unclear error messages

## Usage

### In Scripts

```javascript
// ✅ CORRECT - Use safe build test
const { safeBuildTest } = require('./safe-build-test');
const exitCode = safeBuildTest();
if (exitCode !== 0) {
  process.exit(1);
}

// ❌ WRONG - Direct execSync
const { execSync } = require('child_process');
execSync('npm run build'); // Can crash!
```

### From Command Line

```bash
# ✅ CORRECT - Use safe build test script
node scripts/safe-build-test.js

# ❌ WRONG - Direct npm build (can crash)
npm run build
```

## Scripts Using Safe Build

- ✅ `process-images-workflow.js` - Uses `safeBuildTest()`
- ✅ `validate-after-processing.js` - Uses `safeBuildTest()` (updated)

## Scripts That Should NOT Run Builds

- `process-image-csv.js` - Does not run builds (correct)
- `process-images.js` - Does not run builds (correct)

## Enforcement

If you see any script using direct `execSync('npm run build')`, update it to use `safeBuildTest()` instead.

