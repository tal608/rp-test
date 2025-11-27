# Performance Testing Guide

## Quick Performance Tests

### 1. Build Analysis ✅ COMPLETE
```bash
npm run build
```
**Result:** ✅ Build successful, bundle sizes analyzed

### 2. Local Development Server Test
```bash
npm run dev
```
Then open: http://localhost:3000
- Check Network tab in DevTools
- Verify service worker registration
- Check Core Web Vitals

### 3. Production Build Test
```bash
npm run build
npm run start
```
Then open: http://localhost:3000
- Test with production optimizations
- Run Lighthouse audit
- Check PageSpeed Insights

### 4. Lighthouse CLI (If Installed)
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### 5. Google PageSpeed Insights (Online)
Visit: https://pagespeed.web.dev/
Enter your deployed URL

## Expected Results

### Desktop
- Performance: 90-95/100
- Accessibility: 95-100/100
- Best Practices: 95-100/100
- SEO: 95-100/100

### Mobile
- Performance: 85-90/100
- Accessibility: 95-100/100
- Best Practices: 95-100/100
- SEO: 95-100/100

## Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s ✅
- **FID (First Input Delay):** < 100ms ✅
- **CLS (Cumulative Layout Shift):** < 0.1 ✅
- **INP (Interaction to Next Paint):** < 200ms ✅
- **FCP (First Contentful Paint):** < 1.8s ✅

## Service Worker Verification

1. Open Chrome DevTools
2. Go to Application > Service Workers
3. Verify service worker is registered
4. Check "Offline" checkbox
5. Reload page - should work offline

## Bundle Size Analysis

Current bundle sizes are excellent:
- Shared JS: 101 kB ✅
- Average page: 6-7 kB ✅
- Largest page: 24.2 kB (blog listing) ✅

All within optimal ranges!




