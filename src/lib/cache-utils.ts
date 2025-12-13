/**
 * Client-side cache management utilities
 * Used to check cache version and trigger invalidation
 */

/**
 * Check if cache version has changed on the server
 */
export async function checkCacheVersion(): Promise<{ version: string; changed: boolean }> {
  try {
    const response = await fetch('/api/cache-version', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cache version');
    }
    
    const data = await response.json();
    return {
      version: data.version,
      changed: false, // Will be determined by service worker
    };
  } catch (error) {
    console.error('Error checking cache version:', error);
    return {
      version: '',
      changed: false,
    };
  }
}

/**
 * Trigger cache invalidation via service worker
 */
export async function invalidateCache(): Promise<boolean> {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data.success === true);
        };
        
        registration.active?.postMessage(
          { type: 'CHECK_VERSION' },
          [messageChannel.port2]
        );
        
        // Timeout after 5 seconds
        setTimeout(() => resolve(false), 5000);
      });
    }
    
    return false;
  } catch (error) {
    console.error('Error invalidating cache:', error);
    return false;
  }
}

/**
 * Request cache cleanup from service worker
 */
export async function requestCacheCleanup(): Promise<boolean> {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data.success === true);
        };
        
        registration.active?.postMessage(
          { type: 'CLEAN_CACHE' },
          [messageChannel.port2]
        );
        
        // Timeout after 5 seconds
        setTimeout(() => resolve(false), 5000);
      });
    }
    
    return false;
  } catch (error) {
    console.error('Error requesting cache cleanup:', error);
    return false;
  }
}


