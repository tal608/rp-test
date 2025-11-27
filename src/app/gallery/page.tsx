"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { imageCategories } from "@/constants/gallery";
import ScrollIndicator from "@/components/ScrollIndicator";
import { contactInfo } from "@/constants/social";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Lightbox from "@/components/Lightbox";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  // Interleave images from all categories for a mixed "All" view
  const allImages = (() => {
    const categories = Object.values(imageCategories);
    const maxLength = Math.max(...categories.map(cat => cat.length));
    const mixed = [];
    
    for (let i = 0; i < maxLength; i++) {
      for (const category of categories) {
        if (category[i]) {
          mixed.push(category[i]);
        }
      }
    }
    return mixed;
  })();

  const filteredImages = selectedCategory ? imageCategories[selectedCategory as keyof typeof imageCategories] : allImages;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Gallery", url: "https://www.riverpaws.dog/gallery" },
        ]}
      />

      {/* Modern Hero Section */}
      {/* IMAGE_PLACEMENT_START: gallery-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-6 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Gallery", href: "/gallery" },
            ]}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
          />
        </div>
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hiking/content-golden-retriever-spaniel-pack-outdoor-enrichment-sun-prairie-wi-river-paws.jpg"
            alt="English Cream Golden and friends socializing safely on exclusive private grounds serving Sun Prairie families at River Paws."
            fill
            className="object-cover object-center"
            style={{ objectPosition: getImageObjectPosition("/Hiking/content-golden-retriever-spaniel-pack-outdoor-enrichment-sun-prairie-wi-river-paws.jpg") }}
            priority
            sizes="100vw"
          />
          {/* IMAGE_PLACEMENT_END: gallery-hero */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-emerald-800/50 to-teal-900/60 z-[1]"></div>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-teal-600/20 z-[2]"></div>

        {/* Floating elements with parallax */}
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob z-[3]"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2 z-[3]"
          style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>

        <div className="relative z-[50] max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 py-2 animate-fadeInUp">
              <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Capturing Joy Since 2017</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Gallery of</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Happy Tails
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-2xl md:text-4xl mt-4 font-medium text-blue-100 animate-fadeInUp-delay-600 drop-shadow-md">
                at River Paws Waunakee
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fadeInUp-delay-600">
              See the smiles, adventures, and transformations that happen every day at River Paws.
              From spa days to trail adventures, we capture the joy we create.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="gallery-content" />
      </section>

      {/* Gallery Content */}
      <section id="gallery-content" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Happy Customers</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A glimpse into the day-to-day adventures and spa days at River Paws.
              Every photo tells a story of joy, care, and transformation.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[44px] ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:scale-105'
              }`}
            >
              All Photos ({allImages.length})
            </button>
            <button
              onClick={() => setSelectedCategory('grooming')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[44px] ${
                selectedCategory === 'grooming'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:scale-105'
              }`}
            >
              Spa & Grooming ({imageCategories.grooming?.length || 0})
            </button>
            <button
              onClick={() => setSelectedCategory('hiking')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[44px] ${
                selectedCategory === 'hiking'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:scale-105'
              }`}
            >
              Trail Adventures ({imageCategories.hiking?.length || 0})
            </button>
            <button
              onClick={() => setSelectedCategory('transport')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[44px] ${
                selectedCategory === 'transport'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:scale-105'
              }`}
            >
              Dog Bus & Transport ({imageCategories.transport?.length || 0})
            </button>
            <button
              onClick={() => setSelectedCategory('team')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[44px] ${
                selectedCategory === 'team'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:scale-105'
              }`}
            >
              Our Team ({imageCategories.team?.length || 0})
            </button>
            <button
              onClick={() => setSelectedCategory('playtime')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 min-h-[44px] ${
                selectedCategory === 'playtime'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:scale-105'
              }`}
            >
              Playtime & Fun ({imageCategories.playtime?.length || 0})
            </button>
          </div>

          {/* Gallery Grid - SEO Optimized with Lazy Loading */}
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-6">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="break-inside-avoid mb-6 group cursor-zoom-in"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition(image.src) }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={image.priority || false}
                    loading={image.priority ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Share Your Pup&apos;s Story</h3>
              <p className="text-base sm:text-lg text-emerald-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Have great photos of your pup at River Paws? Email them to us and we&apos;d
                love to feature them in our gallery! Help other families see the joy we create together.
              </p>
              <a 
                href={`mailto:${contactInfo.email}?subject=Gallery Photo Submission&body=Hi River Paws! I'd like to share photos of my pup for your gallery.`}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-xl min-h-[44px]"
                aria-label="Email River Paws to submit photos for gallery"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Your Photos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null))}
          onPrev={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null))}
        />
      )}
    </>
  );
} 