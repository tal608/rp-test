// Site Migration Audit Script
// Run this in browser console on live site to discover all URLs

(() => {
  console.log('🔍 Starting River Paws Site Audit...\n');
  
  const results = {
    navigationLinks: [],
    footerLinks: [],
    pageLinks: [],
    allLinks: [],
    sitemapUrls: [],
    indexedUrls: []
  };
  
  // Find all navigation links
  const navLinks = document.querySelectorAll('nav a, header a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/')) {
      results.navigationLinks.push(href);
    }
  });
  
  // Find all footer links
  const footerLinks = document.querySelectorAll('footer a');
  footerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/')) {
      results.footerLinks.push(href);
    }
  });
  
  // Find all page links
  const pageLinks = document.querySelectorAll('a[href^="/"]');
  pageLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('#') && !href.includes('mailto:') && !href.includes('tel:')) {
      results.pageLinks.push(href);
    }
  });
  
  // Get unique links
  results.allLinks = [...new Set([...results.navigationLinks, ...results.footerLinks, ...results.pageLinks])];
  
  console.log('📊 AUDIT RESULTS:\n');
  console.log('Navigation Links:', [...new Set(results.navigationLinks)]);
  console.log('Footer Links:', [...new Set(results.footerLinks)]);
  console.log('All Unique Page Links:', results.allLinks);
  console.log('\n📋 Copy this list and share it for redirect mapping.');
  
  // Try to fetch sitemap
  fetch('/sitemap.xml')
    .then(res => res.text())
    .then(xml => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const urls = doc.querySelectorAll('url loc');
      urls.forEach(url => {
        if (url.textContent) {
          const path = new URL(url.textContent).pathname;
          results.sitemapUrls.push(path);
        }
      });
      console.log('Sitemap URLs:', results.sitemapUrls);
    })
    .catch(() => console.log('No sitemap.xml found'));
  
  return results;
})();




