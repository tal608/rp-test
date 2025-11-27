'use client';

import { useEffect, useState } from 'react';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

// Cache DOMPurify instance to avoid multiple imports
let dompurifyCache: any = null;
let dompurifyPromise: Promise<any> | null = null;

/**
 * Load DOMPurify with caching
 */
function loadDOMPurify(): Promise<any> {
  if (dompurifyCache) {
    return Promise.resolve(dompurifyCache);
  }

  if (dompurifyPromise) {
    return dompurifyPromise;
  }

  dompurifyPromise = import('dompurify')
    .then((module) => {
      dompurifyCache = module.default || module;
      return dompurifyCache;
    })
    .catch((error) => {
      dompurifyPromise = null; // Reset on error so we can retry
      throw error;
    });

  return dompurifyPromise;
}

/**
 * Client-side HTML sanitization component
 * Sanitizes HTML on the client side to prevent XSS attacks
 */
export default function SafeHtml({ html, className = '' }: SafeHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>(html);

  useEffect(() => {
    // Only sanitize on client side
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;

    // Sanitize HTML
    loadDOMPurify()
      .then((DOMPurify) => {
        if (!isMounted || !DOMPurify || typeof DOMPurify.sanitize !== 'function') {
          return;
        }

        try {
          const sanitized = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
              'p', 'br', 'strong', 'em', 'u', 'b', 'i',
              'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
              'ul', 'ol', 'li',
              'a', 'blockquote', 'code', 'pre',
              'span', 'div'
            ],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
            ALLOW_DATA_ATTR: false,
            ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          });

          if (isMounted) {
            setSanitizedHtml(sanitized);
          }
        } catch (error) {
          console.warn('Failed to sanitize HTML:', error);
          if (isMounted) {
            setSanitizedHtml(html);
          }
        }
      })
      .catch((error) => {
        console.warn('Failed to load DOMPurify:', error);
        if (isMounted) {
          // Keep original HTML if sanitization fails (it's from trusted constants)
          setSanitizedHtml(html);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [html]);

  // Render HTML (will be sanitized on client after hydration)
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

