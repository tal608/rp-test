/**
 * Cache Version Management
 * 
 * This file manages the cache version that gets updated whenever content changes.
 * When content is updated (images, pages, etc.), increment this version to invalidate
 * all cached content across service workers and Next.js.
 * 
 * UPDATE CHECKLIST - Increment version when:
 * - Adding/removing/renaming images
 * - Major content changes to pages
 * - Service worker strategy changes
 * - CSS/styling changes that affect multiple pages
 */

/**
 * Current cache version
 * Format: MAJOR.MINOR.PATCH
 * - MAJOR: Breaking changes (full cache invalidation)
 * - MINOR: New features/content
 * - PATCH: Bug fixes
 * 
 * Last updated: 2025-11-27 - Service worker improvements
 */
export const CACHE_VERSION = '1.1.26';

/**
 * Get cache version from server
 * This can be called from API routes or server components
 */
export function getCacheVersion(): string {
  return CACHE_VERSION;
}

/**
 * Check if cache should be invalidated
 * Compares current version with stored version
 */
export function shouldInvalidateCache(storedVersion: string | null): boolean {
  if (!storedVersion) return true;
  return storedVersion !== CACHE_VERSION;
}

