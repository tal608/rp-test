/**
 * Design system configuration
 * Centralized colors, spacing, and design tokens
 */

export const colors = {
  primary: {
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
  },
  accent: {
    yellow: "#fef08a",
  },
  neutral: {
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
} as const;

export const gradients = {
  primary: "from-blue-600 via-emerald-600 via-teal-500 to-blue-600",
  primaryShorter: "from-blue-600 to-teal-500",
  emerald: "from-emerald-600 to-teal-600",
  overlay: "from-emerald-900/70 via-blue-900/60 to-teal-900/70",
} as const;

export const spacing = {
  section: {
    sm: "py-16",
    md: "py-24",
    lg: "py-32",
  },
  container: {
    padding: "px-6",
    maxWidth: "max-w-7xl",
  },
} as const;

