# ⚠️ CRITICAL: NEVER Call Unsafe Build Commands

## 🚨 ABSOLUTE RULE

**NEVER call `execSync('npm run build')` or `npm run build` directly in any script or command.**

## Why This Is Critical

Direct build calls can:
- ❌ **Crash the entire process** on errors
- ❌ **Cause buffer overflow** with large output
- ❌ **Hang indefinitely** without timeout
- ❌ **Provide unclear error messages**
- ❌ **Break tool calls** and cause failures

## ✅ CORRECT Usage

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
execSync('npm run build'); // WILL CRASH!
```

### From Command Line
```bash
# ✅ CORRECT - Use safe build test script
node scripts/safe-build-test.js

# ✅ CORRECT - Use workflow scripts (they use safe build)
node scripts/process-images.js --csv "file.csv" --execute
node scripts/process-images-workflow.js --csv "file.csv" --auto-approve

# ❌ WRONG - Direct npm build
npm run build  # WILL CRASH IF ERRORS!
```

## Dry Run Safety

**Dry runs NEVER run builds:**
- ✅ Dry runs skip build tests automatically
- ✅ Only `--execute` mode runs builds (and only with safe script)
- ✅ This prevents crashes during testing/validation

## Enforcement

If you see ANY script calling `execSync('npm run build')` or `npm run build`:
1. **STOP** - Do not run it
2. **UPDATE** - Replace with `safeBuildTest()`
3. **VERIFY** - Test that it works safely

## Current Status

✅ All scripts updated to use `safeBuildTest()`
✅ Dry runs never run builds
✅ Only execute mode runs builds (safely)
✅ Safe build test is the ONLY way to run builds

## Remember

1. Never call `npm run build` directly
2. Always use `safeBuildTest()` in scripts
3. Dry runs skip builds automatically
4. Only execute mode runs builds (safely)
