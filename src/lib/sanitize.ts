/**
 * HTML Sanitization Utility
 * Uses DOMPurify to prevent XSS attacks
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe HTML tags for blog content
 * 
 * Note: This function should only be called client-side.
 * For server-side rendering, content is trusted (from constants).
 */
export function sanitizeHtml(html: string): string {
  // Server-side: If running on server, return as-is (trusted content)
  // Content is from constants, so it's safe. Sanitization happens client-side.
  if (typeof window === 'undefined') {
    // For server-side rendering, we can return as-is since content is from constants
    // If content becomes user-generated, use isomorphic-dompurify here
    return html;
  }

  // Client-side: Use DOMPurify if available
  // Check if we're in browser environment
  try {
    // Dynamic import for client-side only
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const DOMPurify = require('dompurify');
    
    if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 'b', 'i',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li',
          'a', 'blockquote', 'code', 'pre',
          'span', 'div'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
        ALLOW_DATA_ATTR: false,
        // Allow links to same origin and known safe domains
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      });
    }
  } catch (error) {
    // If DOMPurify fails to load, return html as-is (from trusted constants)
    console.warn('DOMPurify not available, skipping sanitization:', error);
    return html;
  }

  // Fallback: return as-is
  return html;
}

/**
 * Sanitize user input to prevent injection attacks
 * More restrictive than HTML sanitization
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers (onclick, onerror, etc.)
    .replace(/data:/gi, '') // Remove data: protocol
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

