'use client';

import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook for mouse parallax effect
 * @param ref - React ref to the element that should track mouse movement
 * @returns Mouse position relative to the element
 */
export function useMouseParallax(ref: RefObject<HTMLElement | null>) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setMousePosition({
            x: (e.clientX - rect.left - rect.width / 2) / 50,
            y: (e.clientY - rect.top - rect.height / 2) / 50
          });
        }
      } catch (error) {
        // Silently fail - parallax is enhancement, not critical
        console.warn("Mouse parallax error:", error);
      }
    };

    try {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        try {
          window.removeEventListener('mousemove', handleMouseMove);
        } catch {
          // Ignore cleanup errors
        }
      };
    } catch {
      console.warn("Failed to set up mouse parallax");
      return () => {}; // Return empty cleanup function
    }
  }, [ref]);

  return mousePosition;
}

