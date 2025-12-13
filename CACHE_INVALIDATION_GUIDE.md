# Cache Invalidation System - Complete Guide

## Overview

This system automatically handles cache invalidation when content changes, ensuring users always see the latest content without stale cache issues.

## How It Works

### 1. **Cache Version Management**
- Cache version is stored in `lib/cache-version.ts`
- Current version: `1.0.2`
- When content changes, increment this version

### 2. **Service Worker Cache Checking**
- Service workers periodically check `/api/cache-version` endpoint
- If version changed, all caches are automatically invalidated
- Users get fresh content on next page load

### 3. **Next.js Cache Headers**
- Different cache strategies for different content types:
  - **HTML pages**: 5 minutes cache, stale-while-revalidate
  - **Images**: 1 year cache (immutable)
  - **CSS/JS**: 1 day cache, stale-while-revalidate
  - **API routes**: No cache

## Usage

### When Content Changes

**Option 1: Use the script (Recommended)**
```bash
node scripts/update-cache-version.js
```

This automatically increments the cache version.

**Option 2: Manual update**
1. Open `lib/cache-version.ts`
2. Increment the version number (e.g., `1.0.2` → `1.0.3`)
3. Save the file

### What Happens Next

1. **Service Workers**: 
   - Check version every 5 minutes (or on page load)
   - Detect version change
   - Automatically invalidate all caches
   - Reload page to get fresh content

2. **Next.js**:
   - New cache headers applied
   - Stale content revalidated on next request

3. **Users**:
   - See fresh content automatically
   - No manual cache clearing needed

## API Endpoints

### GET `/api/cache-version`
Returns current cache version:
```json
{
  "version": "1.0.2",
  "timestamp": 1234567890
}
```

### POST `/api/cache/invalidate`
Triggers cache invalidation (for admin use):
```json
{
  "success": true,
  "message": "Cache invalidation triggered",
  "timestamp": 1234567890
}
```

## Client Utilities

### `lib/cache-utils.ts`

```typescript
import { checkCacheVersion, invalidateCache, requestCacheCleanup } from '@/lib/cache-utils';

// Check if cache version changed
const { version, changed } = await checkCacheVersion();

// Request cache cleanup
await requestCacheCleanup();

// Invalidate cache
await invalidateCache();
```

## Service Worker Messages

Service workers listen for these messages:

### `CHECK_VERSION`
Check if cache version changed:
```javascript
registration.active.postMessage({ type: 'CHECK_VERSION' }, [port]);
```

### `CLEAN_CACHE`
Trigger cache cleanup:
```javascript
registration.active.postMessage({ type: 'CLEAN_CACHE' }, [port]);
```

## When to Update Cache Version

Update the cache version when:

- ✅ Images are updated/replaced
- ✅ Page content is modified
- ✅ Blog posts are added/updated
- ✅ Gallery images change
- ✅ Any static content changes
- ✅ CSS/JS files are updated (for service worker cache)

**Don't update** for:
- ❌ Code changes that don't affect rendered content
- ❌ Internal refactoring
- ❌ Development-only changes

## Cache Strategy Details

### Service Worker Cache
- **Static Cache**: 30 days TTL, 50MB limit
- **Dynamic Cache**: 7 days TTL, 100MB limit
- **Version Check**: Every 5 minutes + on page load
- **Auto-invalidation**: On version change

### Next.js Cache
- **HTML**: `max-age=300, stale-while-revalidate=86400`
- **Images**: `max-age=31536000, immutable`
- **CSS/JS**: `max-age=86400, stale-while-revalidate=604800`
- **API**: `no-store, no-cache`

## Troubleshooting

### Stale Content Still Showing

1. **Check cache version**:
   ```bash
   # View current version
   cat lib/cache-version.ts | grep CACHE_VERSION
   ```

2. **Force version check**:
   - Open browser DevTools
   - Application → Service Workers
   - Click "Update" or "Unregister"
   - Reload page

3. **Manual cache clear**:
   - Open browser DevTools
   - Application → Clear Storage
   - Clear "Cache storage" and "Service Workers"

### Version Not Updating

1. **Check API endpoint**:
   ```bash
   curl http://localhost:3000/api/cache-version
   ```

2. **Check service worker**:
   - DevTools → Application → Service Workers
   - Verify service worker is active
   - Check console for errors

3. **Verify file update**:
   ```bash
   # Check if file was updated
   git diff lib/cache-version.ts
   ```

## Best Practices

1. **Always update cache version** when content changes
2. **Use the script** for consistency
3. **Test cache invalidation** in development
4. **Monitor cache version** in production logs
5. **Document version changes** in commit messages

## Example Workflow

```bash
# 1. Make content changes (e.g., update images)
# ... edit files ...

# 2. Update cache version
node scripts/update-cache-version.js

# 3. Commit changes
git add .
git commit -m "Update gallery images [cache: 1.0.2 → 1.0.3]"

# 4. Deploy
# Service workers will automatically detect version change
```

## Technical Details

### Cache Version Storage
- Service workers store version in `sw-metadata` cache
- Checked against `/api/cache-version` endpoint
- Stored version compared with server version

### Invalidation Process
1. Service worker checks `/api/cache-version`
2. Compares with stored version
3. If different, deletes all caches except `sw-metadata`
4. Updates stored version
5. Next fetch gets fresh content from network

### Performance Impact
- Version check: ~50ms (cached API response)
- Cache invalidation: ~100-500ms (depends on cache size)
- User impact: Minimal (happens in background)

---

**Last Updated**: Cache version system implemented January 2025
**Current Version**: See `lib/cache-version.ts`


