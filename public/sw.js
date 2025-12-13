/**
 * Service Worker for River Paws
 * Provides offline support and caching for better performance
 * 
 * SECURITY FEATURES:
 * - Cache size limits (50MB static, 100MB dynamic)
 * - Cache expiration (7 days for dynamic, 30 days for static)
 * - Cache versioning
 * - Automatic cache cleanup
 */

// Cache version - will be checked against server version
// IMPORTANT: Keep in sync with src/lib/cache-version.ts
let CACHE_VERSION = '1.1.36';

// Cache name generators (recalculated when version changes)
function getStaticCacheName() {
  return `riverpaws-static-v${CACHE_VERSION}`;
}

function getDynamicCacheName() {
  return `riverpaws-dynamic-v${CACHE_VERSION}`;
}

// Store last known cache version
const CACHE_VERSION_KEY = 'sw-cache-version';

// Cache size limits (in bytes)
const MAX_STATIC_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_DYNAMIC_CACHE_SIZE = 100 * 1024 * 1024; // 100MB

// Cache expiration times (in milliseconds)
const STATIC_CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
const DYNAMIC_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// Assets to cache immediately (core pages for offline support)
const STATIC_ASSETS = [
  '/',
  '/dog-grooming',
  '/dog-hikes',
  '/contact',
  '/blog',
  '/gallery',
  '/caretakers',
  '/puppy-play',
  '/puppy-grooming',
  '/policies',
  '/offline',
  // Key location pages
  '/dog-grooming-madison',
  '/dog-grooming-waunakee',
  '/dog-grooming-middleton',
  '/dog-grooming-sun-prairie',
  '/dog-grooming-deforest',
];

/**
 * Get cache size in bytes
 */
async function getCacheSize(cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    let totalSize = 0;

    for (const key of keys) {
      const response = await cache.match(key);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }

    return totalSize;
  } catch (error) {
    console.warn('Error calculating cache size:', error);
    return 0;
  }
}

/**
 * Check if cache entry is expired
 * @param {number} cacheTimestamp - Timestamp when item was cached
 * @param {boolean} isStatic - Whether this is a static asset (images, fonts, etc.)
 */
function isExpired(cacheTimestamp, isStatic = false) {
  if (!cacheTimestamp) return true;
  const now = Date.now();
  const age = now - cacheTimestamp;
  const ttl = isStatic ? STATIC_CACHE_TTL : DYNAMIC_CACHE_TTL;
  return age > ttl;
}

/**
 * Determine if a request is for a static asset
 */
function isStaticAsset(url) {
  const staticExtensions = /\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot|css|js)$/i;
  return staticExtensions.test(url) || url.includes('/_next/static/');
}

/**
 * Clean expired entries from cache
 */
async function cleanExpiredCache(cacheName, ttl) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    const now = Date.now();

    for (const key of keys) {
      const response = await cache.match(key);
      if (response) {
        const cacheDate = response.headers.get('sw-cache-date');
        if (cacheDate) {
          const age = now - parseInt(cacheDate, 10);
          if (age > ttl) {
            await cache.delete(key);
          }
        }
      }
    }
  } catch (error) {
    console.warn('Error cleaning expired cache:', error);
  }
}

/**
 * Trim cache to size limit
 */
async function trimCache(cacheName, maxSize) {
  try {
    const currentSize = await getCacheSize(cacheName);
    if (currentSize <= maxSize) {
      return;
    }

    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    // Get all entries with metadata
    const entries = [];
    for (const key of keys) {
      const response = await cache.match(key);
      if (response) {
        const blob = await response.blob();
        const cacheDate = response.headers.get('sw-cache-date') || '0';
        entries.push({
          key,
          size: blob.size,
          date: parseInt(cacheDate, 10),
        });
      }
    }

    // Sort by date (oldest first)
    entries.sort((a, b) => a.date - b.date);

    // Remove oldest entries until under limit
    let sizeToRemove = currentSize - maxSize;
    for (const entry of entries) {
      if (sizeToRemove <= 0) break;
      await cache.delete(entry.key);
      sizeToRemove -= entry.size;
    }
  } catch (error) {
    console.warn('Error trimming cache:', error);
  }
}

/**
 * Add cache metadata to response
 */
function addCacheMetadata(response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-date', Date.now().toString());
  headers.set('sw-cache-version', CACHE_VERSION);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

/**
 * Check server cache version and invalidate if changed
 */
async function checkCacheVersion() {
  try {
    const response = await fetch('/api/cache-version', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    const serverVersion = data.version;
    
    // Get stored version from IndexedDB or use current
    const storedVersion = await getStoredCacheVersion();
    
    // If versions don't match, invalidate all caches
    if (storedVersion !== serverVersion) {
      console.log(`Cache version changed: ${storedVersion} → ${serverVersion}. Invalidating caches...`);
      await invalidateAllCaches();
      await setStoredCacheVersion(serverVersion);
      CACHE_VERSION = serverVersion;
      return true;
    }
    
    return false;
  } catch (error) {
    console.warn('Error checking cache version:', error);
    return false;
  }
}

/**
 * Get stored cache version from IndexedDB
 */
async function getStoredCacheVersion() {
  try {
    // Use a simple approach: store in cache name or use localStorage-like API
    // Since IndexedDB is complex, we'll use cache metadata
    const cache = await caches.open('sw-metadata');
    const response = await cache.match('/cache-version');
    if (response) {
      const data = await response.json();
      return data.version || CACHE_VERSION;
    }
  } catch (error) {
    console.warn('Error getting stored cache version:', error);
  }
  return CACHE_VERSION;
}

/**
 * Store cache version
 */
async function setStoredCacheVersion(version) {
  try {
    const cache = await caches.open('sw-metadata');
    const response = new Response(JSON.stringify({ version }), {
      headers: { 'Content-Type': 'application/json' },
    });
    await cache.put('/cache-version', response);
  } catch (error) {
    console.warn('Error storing cache version:', error);
  }
}

/**
 * Invalidate all caches by deleting them
 */
async function invalidateAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((name) => {
        // Don't delete metadata cache
        if (name !== 'sw-metadata') {
          return caches.delete(name);
        }
      })
    );
    console.log('All caches invalidated');
  } catch (error) {
    console.error('Error invalidating caches:', error);
  }
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  const staticCacheName = getStaticCacheName();
  const dynamicCacheName = getDynamicCacheName();
  
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Cache install error:', err);
      });
    }).then(() => {
      // Clean up old caches after install
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name !== staticCacheName && name !== dynamicCacheName && name !== 'sw-metadata';
            })
            .map((name) => caches.delete(name))
        );
      });
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches and trim sizes
self.addEventListener('activate', (event) => {
  const staticCacheName = getStaticCacheName();
  const dynamicCacheName = getDynamicCacheName();
  
  event.waitUntil(
    Promise.all([
      // Check cache version first
      checkCacheVersion().then((versionChanged) => {
        if (versionChanged) {
          // If version changed, skip other cleanup as caches were invalidated
          return Promise.resolve();
        }
        // Otherwise, proceed with normal cleanup
        return Promise.all([
          // Delete old caches
          caches.keys().then((cacheNames) => {
            return Promise.all(
              cacheNames
                .filter((name) => {
                  return name !== staticCacheName && name !== dynamicCacheName && name !== 'sw-metadata';
                })
                .map((name) => caches.delete(name))
            );
          }),
          // Clean expired entries
          cleanExpiredCache(dynamicCacheName, DYNAMIC_CACHE_TTL),
          cleanExpiredCache(staticCacheName, STATIC_CACHE_TTL),
          // Trim cache sizes
          trimCache(staticCacheName, MAX_STATIC_CACHE_SIZE),
          trimCache(dynamicCacheName, MAX_DYNAMIC_CACHE_SIZE),
        ]);
      }),
    ])
  );
  return self.clients.claim(); // Take control immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Periodically check cache version and clean cache (every 100 requests)
  if (Math.random() < 0.01) {
    const dynamicCacheName = getDynamicCacheName();
    checkCacheVersion().then((versionChanged) => {
      if (!versionChanged) {
        // Only clean if version didn't change (otherwise caches were already invalidated)
        cleanExpiredCache(dynamicCacheName, DYNAMIC_CACHE_TTL);
        trimCache(dynamicCacheName, MAX_DYNAMIC_CACHE_SIZE);
      }
    });
  }

  // Strategy: Network First for HTML pages, Cache First for static assets
  const isHTMLPage = request.destination === 'document' || 
                     request.headers.get('accept')?.includes('text/html');

  if (isHTMLPage) {
    // Network First for HTML pages - always check network first
    const dynamicCacheName = getDynamicCacheName();
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(dynamicCacheName).then(async (cache) => {
              const cachedResponse = addCacheMetadata(responseToCache);
              await cache.put(request, cachedResponse);
              await trimCache(dynamicCacheName, MAX_DYNAMIC_CACHE_SIZE);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              // Check cache version - if old, don't serve
              const cacheVersion = cachedResponse.headers.get('sw-cache-version');
              if (cacheVersion === CACHE_VERSION) {
                return cachedResponse;
              }
            }
            // If no valid cache, show offline page
            return caches.match('/offline');
          });
        })
    );
  } else {
    // Cache First for static assets (images, CSS, JS)
    const staticAsset = isStaticAsset(url.pathname);
    const cacheName = staticAsset ? getStaticCacheName() : getDynamicCacheName();
    const maxCacheSize = staticAsset ? MAX_STATIC_CACHE_SIZE : MAX_DYNAMIC_CACHE_SIZE;
    
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Check if cached response is expired or wrong version
        if (cachedResponse) {
          const cacheDate = cachedResponse.headers.get('sw-cache-date');
          const cacheVersion = cachedResponse.headers.get('sw-cache-version');
          
          // If cache version matches and not expired, serve from cache
          if (cacheVersion === CACHE_VERSION && cacheDate && !isExpired(parseInt(cacheDate, 10), staticAsset)) {
            return cachedResponse;
          } else {
            // Remove old/expired entry
            caches.open(cacheName).then((cache) => {
              cache.delete(request);
            });
          }
        }

        // Fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses or opaque responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache with metadata
            caches.open(cacheName).then(async (cache) => {
              // Add cache metadata
              const cachedResponse = addCacheMetadata(responseToCache);
              await cache.put(request, cachedResponse);

              // Trim cache if needed
              await trimCache(cacheName, maxCacheSize);
            });

            return response;
          })
          .catch(() => {
            // If offline, return cached version if available (even if expired)
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline response for non-cached items
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: {
                'Content-Type': 'text/plain',
              },
            });
          });
      })
    );
  }
});

// Periodic cache maintenance (triggered from client)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    // Check version first, then clean
    checkCacheVersion().then((versionChanged) => {
      if (versionChanged) {
        // Version changed, caches already invalidated
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true, versionChanged: true });
        }
        return;
      }
      
      // Normal cleanup
      const staticCacheName = getStaticCacheName();
      const dynamicCacheName = getDynamicCacheName();
      Promise.all([
        cleanExpiredCache(dynamicCacheName, DYNAMIC_CACHE_TTL),
        cleanExpiredCache(staticCacheName, STATIC_CACHE_TTL),
        trimCache(staticCacheName, MAX_STATIC_CACHE_SIZE),
        trimCache(dynamicCacheName, MAX_DYNAMIC_CACHE_SIZE),
      ]).then(() => {
        // Send confirmation if we have a port
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      }).catch((error) => {
        console.warn('Cache cleanup error:', error);
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: false, error: error.message });
        }
      });
    });
  } else if (event.data && event.data.type === 'CHECK_VERSION') {
    // Explicit version check request
    checkCacheVersion().then((versionChanged) => {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ 
          success: true, 
          versionChanged,
          currentVersion: CACHE_VERSION 
        });
      }
    });
  }
});

