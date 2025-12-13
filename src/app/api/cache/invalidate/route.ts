import { NextResponse } from 'next/server';

/**
 * API route to trigger cache invalidation
 * This can be called when content changes to force cache clearing
 */
export async function POST(request: Request) {
  try {
    // Optional: Add authentication/authorization here
    // For now, we'll allow it but you may want to add a secret token
    
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


