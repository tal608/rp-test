# Blog Page Webpack Error Fix

## Issue:
Webpack error: `Cannot read properties of undefined (reading 'call')` on blog page refresh.

## Root Cause:
The `useMouseParallax` hook was missing the `'use client'` directive, causing Next.js webpack to incorrectly handle it as a server module in a client component context.

## Fix Applied:
✅ Added `'use client'` directive to `src/hooks/useMouseParallax.ts`

## Next Steps:
1. Stop dev server (Ctrl+C)
2. Clear cache: `Remove-Item -Recurse -Force .next` (if needed)
3. Restart dev server: `npm run dev`
4. Hard refresh browser: `Ctrl+Shift+R`

The hook now properly identifies as a client-side module, preventing webpack module resolution errors.

---
**Status:** ✅ Fixed - Hook now properly marked as client module




