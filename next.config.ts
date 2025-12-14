import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optimized for Polaroid hero sizes: 100, 120, 140 (mobile) + 240, 280, 320 (desktop)
    imageSizes: [16, 32, 48, 64, 96, 100, 120, 140, 160, 200, 240, 280, 320, 384],
  },
  // Enable compression
  compress: true,
  // Improve performance
  poweredByHeader: false,
  
  // ============================================
  // SECURITY HEADERS
  // ============================================
  async headers() {
    return [
      {
        // Next.js built static assets (immutable - includes content hash in filename)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        // Next.js optimized images
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
          },
        ],
      },
      {
        // Public folder images
        source: '/Grooming/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400'
          },
        ],
      },
      {
        // Public folder images
        source: '/Hiking/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400'
          },
        ],
      },
      {
        // Caretaker images - shorter cache since these can be updated
        source: '/caretakers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          },
        ],
      },
      {
        // Logos and icons
        source: '/Logos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        // Favicon and manifest
        source: '/:path(favicon.ico|manifest.json|apple-touch-icon.png|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800'
          },
        ],
      },
      {
        // API routes - no cache (except cache-version which has its own headers)
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
        ],
      },
      {
        // Default headers for all pages
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://booking.moego.pet")'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400, must-revalidate'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.googleapis.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
                  "connect-src 'self' https://formspree.io https://www.google.com https://maps.googleapis.com https://www.google-analytics.com",
                  "frame-src 'self' https://www.google.com https://form.moego.pet https://booking.moego.pet",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ];
  },
  
  // ============================================
  // SEO-PRESERVING REDIRECTS
  // ============================================
  // These redirects preserve SEO value during site migration
  // All redirects are 301 (permanent) to transfer link equity
  async redirects() {
    return [
      // ============================================
      // SERVICE PAGE REDIRECTS (Old URLs → New URLs)
      // ============================================
      // Note: /dog-grooming and /dog-hikes are now at root level (preserved URLs)
      // Reverse redirects: /services/dog-grooming → /dog-grooming (in case anyone links to /services/ version)
      {
        source: '/services/dog-grooming',
        destination: '/dog-grooming',
        permanent: true, // 301 redirect
      },
      {
        source: '/services/dog-grooming/',
        destination: '/dog-grooming',
        permanent: true,
      },
      {
        source: '/services/dog-hikes',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/services/dog-hikes/',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/hiking',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/hiking/',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/dog-grooming',
        permanent: true,
      },
      {
        source: '/services/',
        destination: '/dog-grooming',
        permanent: true,
      },
      
      // ============================================
      // TEAM/ABOUT PAGE REDIRECTS
      // ============================================
      {
        source: '/team',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/team/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/staff/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/caretakers',
        permanent: true,
      },
      
      // ============================================
      // APPLICATION PAGE REDIRECTS
      // ============================================
      // Note: /grooming-application and /dog-hike-scheduling are now at root level (preserved URLs)
      // Reverse redirects: /apply/dog-grooming-application → /grooming-application
      {
        source: '/apply/dog-grooming-application',
        destination: '/grooming-application',
        permanent: true,
      },
      {
        source: '/apply/dog-grooming-application/',
        destination: '/grooming-application',
        permanent: true,
      },
      {
        source: '/apply/dog-hikes-application',
        destination: '/dog-hike-scheduling',
        permanent: true,
      },
      {
        source: '/apply/dog-hikes-application/',
        destination: '/dog-hike-scheduling',
        permanent: true,
      },
      {
        source: '/application',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/application/',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/grooming-application/',
        destination: '/grooming-application',
        permanent: true,
      },
      {
        source: '/dog-hike-scheduling/',
        destination: '/dog-hike-scheduling',
        permanent: true,
      },
      
      // ============================================
      // SEARCH PAGE REDIRECTS
      // ============================================
      {
        source: '/search',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/search/',
        destination: '/blog',
        permanent: true,
      },
      
      // ============================================
      // OLD SERVICE URL VARIATIONS
      // ============================================
      {
        source: '/services/dog-grooming/',
        destination: '/services/dog-grooming',
        permanent: true,
      },
      {
        source: '/services/dog-hikes/',
        destination: '/services/dog-hikes',
        permanent: true,
      },
      {
        source: '/services/puppy-play',
        destination: '/puppy-play',
        permanent: true,
      },
      {
        source: '/services/puppy-play/',
        destination: '/puppy-play',
        permanent: true,
      },
      
      // ============================================
      // CITY PAGE VARIATIONS (with trailing slashes)
      // ============================================
      {
        source: '/dog-grooming-madison/',
        destination: '/dog-grooming-madison',
        permanent: true,
      },
      {
        source: '/dog-grooming-waunakee/',
        destination: '/dog-grooming-waunakee',
        permanent: true,
      },
      {
        source: '/dog-grooming-middleton/',
        destination: '/dog-grooming-middleton',
        permanent: true,
      },
      {
        source: '/dog-grooming-sun-prairie/',
        destination: '/dog-grooming-sun-prairie',
        permanent: true,
      },
      {
        source: '/dog-grooming-deforest/',
        destination: '/dog-grooming-deforest',
        permanent: true,
      },
      {
        source: '/puppy-grooming/',
        destination: '/puppy-grooming',
        permanent: true,
      },
      {
        source: '/canine-grooming/',
        destination: '/canine-grooming',
        permanent: true,
      },
      {
        source: '/locations/waunakee/',
        destination: '/locations/waunakee',
        permanent: true,
      },
      
      // ============================================
      // CORE PAGE VARIATIONS (with trailing slashes)
      // ============================================
      {
        source: '/contact/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/gallery/',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/caretakers/',
        destination: '/caretakers',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/apply/',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/policies/',
        destination: '/policies',
        permanent: true,
      },
      {
        source: '/waivers/',
        destination: '/waivers',
        permanent: true,
      },
      {
        source: '/portal/',
        destination: '/portal',
        permanent: true,
      },
      {
        source: '/privacy-policy/',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/offline/',
        destination: '/offline',
        permanent: true,
      },
      {
        source: '/dog-grooming/',
        destination: '/dog-grooming',
        permanent: true,
      },
      {
        source: '/dog-hikes/',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/puppy-play/',
        destination: '/puppy-play',
        permanent: true,
      },
      
      // ============================================
      // APPLICATION PAGE VARIATIONS
      // ============================================
      {
        source: '/apply/dog-grooming-application',
        destination: '/grooming-application',
        permanent: true,
      },
      {
        source: '/apply/dog-grooming-application/',
        destination: '/grooming-application',
        permanent: true,
      },
      {
        source: '/apply/dog-hikes-application',
        destination: '/dog-hike-scheduling',
        permanent: true,
      },
      {
        source: '/apply/dog-hikes-application/',
        destination: '/dog-hike-scheduling',
        permanent: true,
      },
      
      // ============================================
      // COMMON MISSPELLINGS/VARIATIONS
      // ============================================
      {
        source: '/grooming',
        destination: '/dog-grooming',
        permanent: true,
      },
      {
        source: '/grooming/',
        destination: '/dog-grooming',
        permanent: true,
      },
      {
        source: '/hikes',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/hikes/',
        destination: '/dog-hikes',
        permanent: true,
      },
      
      // ============================================
      // LIVE SITE URL MAPPINGS (From Sitemap Audit)
      // ============================================
      // These URLs were found on live site and need redirects
      {
        source: '/dog-daycare',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/dog-daycare/',
        destination: '/dog-hikes',
        permanent: true,
      },
      {
        source: '/services/puppy-play',
        destination: '/puppy-play',
        permanent: true,
      },
      {
        source: '/services/puppy-play/',
        destination: '/puppy-play',
        permanent: true,
      },
      {
        source: '/agreement',
        destination: '/waivers',
        permanent: true,
      },
      {
        source: '/agreement/',
        destination: '/waivers',
        permanent: true,
      },
      {
        source: '/grooming-and-doggy-daycare-gallery',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/grooming-and-doggy-daycare-gallery/',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/sms',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/sms/',
        destination: '/contact',
        permanent: true,
      },
      
      // ============================================
      // PDF FILES (Old WordPress uploads)
      // ============================================
      // Old PDF files from WordPress uploads folder
      // These redirect to relevant pages where documents can be accessed
      {
        source: '/wp-content/uploads/2019/03/Pick-up-and-Drop-off-Online-Instructions.pdf',
        destination: '/waivers',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2019/03/Adventure-Out-Online-Instructions.pdf',
        destination: '/waivers',
        permanent: true,
      },
      // Catch-all for old WordPress uploads
      {
        source: '/wp-content/uploads/:path*',
        destination: '/waivers',
        permanent: true,
      },
      // Block WordPress admin and files
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-json/:path*',
        destination: '/',
        permanent: true,
      },
      
      // ============================================
      // NOTE: Trailing slash redirects are handled automatically by Next.js
      // City-specific pages (/dog-grooming-madison, etc.) already exist at correct URLs
      // Additional redirects should be added here as discovered from live site audit
      // ============================================
    ];
  },
};

export default nextConfig;
