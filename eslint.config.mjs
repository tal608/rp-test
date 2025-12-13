// Next.js 16 uses ESLint "flat config" exports (arrays), so we should import them
// directly instead of using FlatCompat (which is for legacy .eslintrc-style configs).
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Project-specific rule tweaks
  {
    rules: {
      // This rule is overly aggressive for common, intentional patterns like
      // "setMounted(true)" and state resets on prop changes.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Project-specific ignores (keep lint focused on real source)
  {
    ignores: [
      "backups/**",
      "internal/**",
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
    ],
  },
];
