import { NextResponse } from 'next/server';

/**
 * API route to trigger cache invalidation
 * This can be called when content changes to force cache clearing
 */
export async function POST(request: Request) {
  try {
    // SECURITY: In production, require a secret token to prevent abuse.
    // This endpoint does not invalidate caches by itself (SWs poll /api/cache-version),
    // but it can still be spammed, so we gate it.
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
      const expected = process.env.CACHE_INVALIDATION_TOKEN;

      if (!expected) {
        return NextResponse.json(
          { success: false, error: 'CACHE_INVALIDATION_TOKEN is not configured' },
          { status: 503 }
        );
      }

      const authHeader = request.headers.get('authorization') || '';
      const provided = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : '';

      if (provided !== expected) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
    
    // Get all service worker registrations and send invalidation message
    // Note: This only works server-side, client-side code needs to handle it
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Cache invalidation triggered. Service workers will check for version updates.',
        timestamp: Date.now()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to invalidate cache' },
      { status: 500 }
    );
  }
}



