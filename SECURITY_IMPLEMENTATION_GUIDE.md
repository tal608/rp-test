# Security Implementation Guide

**This guide provides step-by-step instructions to fix all security vulnerabilities identified in the audit.**

---

## 🔴 **CRITICAL FIXES**

### **1. Add Security Headers**

**File:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... existing config ...
  
  async headers() {
    return [
      {
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
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://formspree.io https://www.google.com https://maps.googleapis.com",
              "frame-src 'self' https://www.google.com",
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
};

export default nextConfig;
```

**Note:** Adjust CSP based on your actual requirements. The above is a starting point.

---

### **2. Sanitize HTML Content with DOMPurify**

**Step 1:** Install DOMPurify
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Step 2:** Create sanitization utility
**File:** `src/lib/sanitize.ts`

```typescript
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: use isomorphic-dompurify or return as-is if trusted
    return html;
  }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}
```

**Step 3:** Update blog article page
**File:** `src/app/blog/[slug]/page.tsx`

```typescript
import { sanitizeHtml } from '@/lib/sanitize';

// In the component:
<div
  className="article-content text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
/>
```

**Step 4:** Update schema components (safe since JSON.stringify)
Schema components are generally safe since they use `JSON.stringify`, but verify:
- `ArticleSchema.tsx` - ✅ Safe (JSON)
- `BreadcrumbSchema.tsx` - ✅ Safe (JSON)
- `FAQSchema.tsx` - ✅ Safe (JSON)
- `ServiceSchema.tsx` - ✅ Safe (JSON)
- `ReviewSchema.tsx` - ✅ Safe (JSON)

---

### **3. Fix Portal Page**

**Option A: Remove Portal Page** (if not needed)

Delete `src/app/portal/page.tsx` and remove from navigation.

**Option B: Add "Coming Soon" Notice**

**File:** `src/app/portal/page.tsx`

```typescript
// Add at the top of the form section:
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
  <div className="flex items-start">
    <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
    <div>
      <h3 className="text-sm font-semibold text-yellow-800">Portal Coming Soon</h3>
      <p className="text-sm text-yellow-700 mt-1">
        Our client portal is currently under development. Please contact us for account access.
      </p>
    </div>
  </div>
</div>

// Disable the form:
<form className="space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
  {/* ... form fields ... */}
  <button
    type="button"
    disabled
    className="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-xl cursor-not-allowed"
  >
    Portal Coming Soon
  </button>
</form>
```

---

## ⚠️ **HIGH PRIORITY FIXES**

### **4. Add Form Validation with Zod**

**Step 1:** Create validation schemas
**File:** `src/lib/validation.ts`

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  phone: z.string()
    .regex(/^[\d\s\(\)\-\+]+$/, 'Invalid phone number format')
    .max(20, 'Phone number is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export const groomingApplicationSchema = z.object({
  ownerName: z.string().min(2).max(100),
  phone: z.string().regex(/^[\d\s\(\)\-\+]+$/).max(20),
  // ... add all form fields
});

export const hikeApplicationSchema = z.object({
  ownerName: z.string().min(2).max(100),
  phone: z.string().regex(/^[\d\s\(\)\-\+]+$/).max(20),
  // ... add all form fields
});
```

**Step 2:** Create form component with validation
**File:** `src/components/SecureForm.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface SecureFormProps {
  schema: z.ZodSchema;
  action: string;
  children: React.ReactNode;
}

export function SecureForm({ schema, action, children }: SecureFormProps) {
  const { handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    // Sanitize data before submission
    const sanitized = sanitizeFormData(data);
    
    // Submit to Formspree
    const response = await fetch(action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized),
    });
    
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}
```

---

### **5. Secure Service Worker**

**File:** `public/sw.js`

```javascript
const CACHE_VERSION = 'v1.0.1';
const STATIC_CACHE_NAME = `riverpaws-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `riverpaws-dynamic-${CACHE_VERSION}`;
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB limit

// Cache expiration (24 hours)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/dog-grooming',
  '/dog-hikes',
  '/contact',
  '/blog',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' }))).catch((err) => {
        console.error('Cache install error:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE_NAME && name !== DYNAMIC_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// Helper to check cache size
async function checkCacheSize(cacheName) {
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
}

// Helper to clean old cache entries
async function cleanCache(cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const now = Date.now();
  
  for (const key of keys) {
    const response = await cache.match(key);
    if (response) {
      const cachedDate = response.headers.get('sw-cached-date');
      if (cachedDate && (now - parseInt(cachedDate)) > maxAge) {
        await cache.delete(key);
      }
    }
  }
}

// Fetch event
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

  // Skip service worker and cache files
  if (url.pathname === '/sw.js' || url.pathname.startsWith('/_next/')) {
    return;
  }

  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      // Check if cached response is still valid
      if (cachedResponse) {
        const cachedDate = cachedResponse.headers.get('sw-cached-date');
        if (cachedDate && (Date.now() - parseInt(cachedDate)) < CACHE_EXPIRATION) {
          return cachedResponse;
        }
        // Cache expired, delete it
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        await cache.delete(request);
      }

      // Fetch from network
      try {
        const response = await fetch(request);
        
        // Only cache successful responses
        if (response && response.status === 200 && response.type === 'basic') {
          // Clone response and add cache timestamp
          const responseToCache = response.clone();
          const headers = new Headers(responseToCache.headers);
          headers.set('sw-cached-date', Date.now().toString());
          
          const modifiedResponse = new Response(responseToCache.body, {
            status: responseToCache.status,
            statusText: responseToCache.statusText,
            headers: headers,
          });

          // Check cache size before adding
          const cacheSize = await checkCacheSize(DYNAMIC_CACHE_NAME);
          if (cacheSize < MAX_CACHE_SIZE) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            await cache.put(request, modifiedResponse);
          } else {
            // Clean old entries
            await cleanCache(DYNAMIC_CACHE_NAME, CACHE_EXPIRATION);
            // Try again
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            await cache.put(request, modifiedResponse);
          }
        }

        return response;
      } catch (error) {
        // If offline and page request, show offline page
        if (request.destination === 'document') {
          return caches.match('/offline');
        }
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      }
    })
  );
});
```

---

### **6. Environment Variables**

**Step 1:** Create `.env.example`
**File:** `.env.example`

```
# Formspree Form IDs
NEXT_PUBLIC_FORMSPREE_GROOMING_FORM_ID=xayvgzea
NEXT_PUBLIC_FORMSPREE_HIKE_FORM_ID=xayvgzeb

# Contact Information (if needed as env vars)
NEXT_PUBLIC_CONTACT_EMAIL=YaharaRiverPaws@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=608-571-7297
```

**Step 2:** Update form pages
**File:** `src/app/grooming-application/page.tsx`

```typescript
const formAction = process.env.NEXT_PUBLIC_FORMSPREE_GROOMING_FORM_ID 
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_GROOMING_FORM_ID}`
  : 'https://formspree.io/f/xayvgzea'; // fallback

<form action={formAction} method="POST">
```

**Step 3:** Create `.env.local` (add to `.gitignore`)
Never commit `.env.local` to git!

---

### **7. Dependency Security Audit**

**Step 1:** Add audit script
**File:** `package.json`

```json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "security": "npm audit --audit-level=moderate"
  }
}
```

**Step 2:** Run audit
```bash
npm audit
npm audit fix
```

**Step 3:** Set up Dependabot (if using GitHub)
**File:** `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## 🟡 **MEDIUM PRIORITY FIXES**

### **8. Rate Limiting**

**File:** `src/middleware.ts` (add rate limiting)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, limit: number = 10, window: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  // Rate limit form submissions
  if (request.nextUrl.pathname.startsWith('/grooming-application') || 
      request.nextUrl.pathname.startsWith('/dog-hike-scheduling')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!rateLimit(ip, 5, 60000)) { // 5 requests per minute
      return new NextResponse('Too many requests', { status: 429 });
    }
  }

  // ... existing middleware code ...
}
```

---

### **9. Input Sanitization Utility**

**File:** `src/lib/sanitize.ts`

```typescript
/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 10000); // Limit length
}

/**
 * Sanitize form data object
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = String(value);
    }
  }
  
  return sanitized;
}
```

---

## 📋 **CHECKLIST**

### **Before Production Launch:**

- [ ] Add all security headers
- [ ] Implement DOMPurify for HTML sanitization
- [ ] Fix or remove portal page
- [ ] Add form validation with Zod
- [ ] Secure service worker
- [ ] Move secrets to environment variables
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Add rate limiting
- [ ] Implement input sanitization
- [ ] Remove console.logs from production
- [ ] Test all security measures
- [ ] Review CSP policy
- [ ] Test forms with malicious input
- [ ] Verify HTTPS enforcement

---

## 🚀 **QUICK START**

1. **Install dependencies:**
   ```bash
   npm install dompurify @types/dompurify
   ```

2. **Add security headers** (30 min)
3. **Add DOMPurify** (1 hour)
4. **Fix portal page** (30 min)
5. **Add form validation** (2 hours)
6. **Secure service worker** (1 hour)
7. **Environment variables** (30 min)
8. **Run npm audit** (30 min)

**Total Time:** ~6-7 hours for critical fixes

---

**Last Updated:** January 2025




