"use client";

import { RefObject } from "react";
import { useGradientAnimation } from "@/hooks/useGradientAnimation";

/**
 * Safe wrapper for useGradientAnimation hook
 * Simply calls the hook - errors are handled by React error boundaries
 * This ensures hooks are called unconditionally (React requirement)
 */
export function useGradientAnimationSafe(ref: RefObject<HTMLElement | null>) {
  // Hooks must be called unconditionally
  // Errors will be caught by ErrorBoundary
  useGradientAnimation(ref);
}

