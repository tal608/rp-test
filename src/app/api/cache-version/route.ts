import { NextResponse } from 'next/server';
import { getCacheVersion } from '@/lib/cache-version';

/**
 * API route to get current cache version
 * Service workers check this endpoint to detect version changes
 */
export async function GET() {
  const version = getCacheVersion();
  
  return NextResponse.json(
    { version, timestamp: Date.now() },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, must-revalidate', // Cache for 1 minute
        'Content-Type': 'application/json',
      },
    }
  );
}


