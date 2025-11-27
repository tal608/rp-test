#!/usr/bin/env node

/**
 * Add Blog Images to Registry
 * 
 * Scans blogArticles.ts and adds all blog article images to the registry
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  blogArticles: path.join(__dirname, '../src/constants/blogArticles.ts'),
  registry: path.join(__dirname, '../data/image-placements-registry.json'),
  focalPoints: path.join(__dirname, '../src/lib/imageFocalPoints.ts')
};

function getFocalPoint(filename) {
  try {
    const content = fs.readFileSync(PATHS.focalPoints, 'utf-8');
    const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = content.match(new RegExp(`'${escapedFilename}':\\s*\\{\\s*x:\\s*(\\d+),\\s*y:\\s*(\\d+)\\s*\\}`));
    if (match) {
      return { x: parseInt(match[1]), y: parseInt(match[2]) };
    }
  } catch (e) {
    // Ignore errors
  }
  return { x: 50, y: 40 }; // Default
}

function extractBlogImages() {
  const content = fs.readFileSync(PATHS.blogArticles, 'utf-8');
  const images = [];
  
  // Extract all blog articles with their images
  const articleRegex = /slug:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
  let match;
  
  while ((match = articleRegex.exec(content)) !== null) {
    const slug = match[1];
    const imagePath = match[2];
    const filename = imagePath.split('/').pop();
    
    images.push({
      slug,
      imagePath,
      filename,
      focalPoint: getFocalPoint(filename)
    });
  }
  
  return images;
}

function addBlogImagesToRegistry() {
  console.log('📝 Adding blog images to registry...\n');
  
  const blogImages = extractBlogImages();
  console.log(`Found ${blogImages.length} blog articles with images\n`);
  
  const registry = JSON.parse(fs.readFileSync(PATHS.registry, 'utf-8'));
  
  // Check existing blog placements
  const existingBlogPlacements = registry.placements.filter(p => 
    p.id.startsWith('blog-') || p.location.page === 'blog'
  );
  
  console.log(`Existing blog placements: ${existingBlogPlacements.length}\n`);
  
  // Add placements for blog listing page (one per article image)
  blogImages.forEach((blogImg, index) => {
    const placementId = `blog-listing-article-${blogImg.slug}`;
    
    // Check if already exists
    const exists = registry.placements.find(p => p.id === placementId);
    if (exists) {
      console.log(`  ✓ Already tracked: ${placementId}`);
      return;
    }
    
    registry.placements.push({
      id: placementId,
      location: {
        page: 'blog',
        section: 'article-card',
        component: 'BlogArticleCard',
        file: 'src/app/blog/page.tsx',
        line: 110
      },
      currentImages: [{
        filename: blogImg.filename,
        path: blogImg.imagePath,
        alt: `Blog article image for ${blogImg.slug}`,
        focalPoint: blogImg.focalPoint,
        score: 7.5,
        category: 'Blog / Content',
        targetCity: 'Unknown',
        placementTags: ['Blog Images', 'Services'],
        locked: false
      }],
      placementReasoning: {
        contentContext: `Blog article card image for ${blogImg.slug} on blog listing page`,
        metadataMatch: `Blog article image`,
        seoFactors: [`Article: ${blogImg.slug}`, `Category: Blog`]
      },
      placementDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    
    console.log(`  + Added: ${placementId}`);
  });
  
  // Add placements for individual blog post pages
  blogImages.forEach((blogImg) => {
    const placementId = `blog-post-featured-${blogImg.slug}`;
    
    // Check if already exists
    const exists = registry.placements.find(p => p.id === placementId);
    if (exists) {
      console.log(`  ✓ Already tracked: ${placementId}`);
      return;
    }
    
    registry.placements.push({
      id: placementId,
      location: {
        page: `blog/${blogImg.slug}`,
        section: 'featured-image',
        component: 'BlogPostFeaturedImage',
        file: 'src/app/blog/[slug]/page.tsx',
        line: 141
      },
      currentImages: [{
        filename: blogImg.filename,
        path: blogImg.imagePath,
        alt: `Featured image for ${blogImg.slug}`,
        focalPoint: blogImg.focalPoint,
        score: 8.0,
        category: 'Blog / Content',
        targetCity: 'Unknown',
        placementTags: ['Blog Images', 'Featured'],
        locked: false
      }],
      placementReasoning: {
        contentContext: `Featured image for blog post ${blogImg.slug}`,
        metadataMatch: `Blog post featured image`,
        seoFactors: [`Article: ${blogImg.slug}`, `Category: Blog`]
      },
      placementDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    
    console.log(`  + Added: ${placementId}`);
  });
  
  // Add placement for RelatedArticles component
  const relatedArticlesId = 'blog-related-articles';
  const relatedArticlesExists = registry.placements.find(p => p.id === relatedArticlesId);
  if (!relatedArticlesExists) {
    registry.placements.push({
      id: relatedArticlesId,
      location: {
        page: 'blog',
        section: 'related-articles',
        component: 'RelatedArticles',
        file: 'src/components/RelatedArticles.tsx',
        line: 51
      },
      currentImages: blogImages.slice(0, 3).map(img => ({
        filename: img.filename,
        path: img.imagePath,
        alt: `Related article image`,
        focalPoint: img.focalPoint,
        score: 7.5,
        category: 'Blog / Content',
        targetCity: 'Unknown',
        placementTags: ['Blog Images', 'Related Articles'],
        locked: false
      })),
      placementReasoning: {
        contentContext: 'Related articles component showing 3 related blog post images',
        metadataMatch: 'Blog related articles images',
        seoFactors: ['Category: Blog', 'Component: RelatedArticles']
      },
      placementDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    
    console.log(`  + Added: ${relatedArticlesId}`);
  }
  
  // Update metadata
  registry.metadata.totalPlacements = registry.placements.length;
  registry.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Save
  fs.writeFileSync(PATHS.registry, JSON.stringify(registry, null, 2));
  
  console.log(`\n✅ Complete!`);
  console.log(`   - Total blog images tracked: ${blogImages.length}`);
  console.log(`   - Total placements: ${registry.placements.length}`);
}

addBlogImagesToRegistry();

