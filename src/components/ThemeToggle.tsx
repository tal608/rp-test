"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    // Toggle between light and dark only
    if (theme === "system") {
      // If currently on system, toggle to opposite of resolved theme
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    } else {
      // Toggle between light and dark
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  // Render a placeholder during SSR/hydration to prevent mismatch
  if (!mounted) {
    return (
      <button
        className="relative p-2 rounded-lg bg-gray-100 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Theme: ${theme === "system" ? `System (${resolvedTheme})` : theme}`}
    >
      {/* Sun icon - shown in dark mode */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          resolvedTheme === "dark"
            ? "text-yellow-400 rotate-0 scale-100"
            : "text-gray-400 -rotate-90 scale-0 absolute"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon - shown in light mode */}
      <svg
        className={`w-5 h-5 transition-all duration-300 ${
          resolvedTheme === "light"
            ? "text-gray-700 rotate-0 scale-100"
            : "text-gray-400 rotate-90 scale-0 absolute"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* System indicator dot */}
      {theme === "system" && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
      )}
    </button>
  );
}

