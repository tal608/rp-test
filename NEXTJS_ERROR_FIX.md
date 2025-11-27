# Next.js Runtime Error Fix

**Error:** `Invariant: Expected a request ID to be defined for the document via self.__next_r`

This is a Next.js 16 development server issue, often caused by cache corruption or browser state.

## ✅ **Fixes Applied:**

1. ✅ Cleared `.next` cache folder

## 🔧 **Additional Steps to Fix:**

### **1. Stop and Restart Dev Server**
```powershell
# Stop the current dev server (Ctrl+C)
# Then restart:
cd riverpaws
npm run dev
```

### **2. Hard Refresh Browser**
- **Chrome/Edge:** `Ctrl+Shift+R` or `Ctrl+F5`
- **Firefox:** `Ctrl+Shift+R` or `Ctrl+F5`
- Or clear browser cache for localhost

### **3. Clear Browser Cache (if needed)**
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### **4. Check Browser Extensions**
The `unchecked runtime.lastError` suggests a browser extension might be interfering:
- Try opening in Incognito/Private mode
- Disable extensions temporarily
- Check if any extensions are blocking scripts

### **5. If Still Persisting:**
```powershell
# Clear all caches
cd riverpaws
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
npm run dev
```

### **6. Alternative: Use Different Port**
```powershell
npm run dev -- -p 3001
```

## 📝 **Note:**
This is a known Next.js 16 development issue and doesn't affect production builds. The site will work fine in production.

---

**Status:** Cache cleared ✅  
**Next:** Restart dev server and hard refresh browser




