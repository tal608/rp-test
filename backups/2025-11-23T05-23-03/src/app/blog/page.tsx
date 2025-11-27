"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { blogArticles } from "@/constants/blogArticles";
import Breadcrumb from "@/components/Breadcrumb";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

// Categories for future filtering functionality
// const categories = [
//   { name: "All", slug: "all" },
//   { name: "Grooming", slug: "grooming" },
//   { name: "Health", slug: "health" },
//   { name: "Tips", slug: "tips" },
//   { name: "Seasonal", slug: "seasonal" },
// ];

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);
  // Sort by date (newest first)
  const sortedArticles = [...blogArticles].sort(
    (a, b) =>
      new Date(b.datePublished).getTime() -
      new Date(a.datePublished).getTime()
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Modern Hero Section */}
        {/* IMAGE_PLACEMENT_START: blog-hero */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-24 left-6 z-20">
            <Breadcrumb
              items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
            />
          </div>
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hiking/happy-alert-brindle-mix-dog-hiking-waunakee-wi-river-paws.jpg"
              alt="A brindle dog poses during a River Paws adventure near Madison, Wisconsin."
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* IMAGE_PLACEMENT_END: blog-hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-blue-900/60 to-teal-900/70 z-[1]"></div>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-emerald-600/20 z-[2]"></div>

          {/* Floating elements with parallax */}
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob z-[3]"
            style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
          ></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2 z-[3]"
            style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
          ></div>

          <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Expert Tips & Advice</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
                <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Dog Grooming</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    & Care Blog
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Expert tips, guides, and advice from our professional groomers.
                Learn how to keep your dog healthy, comfortable, and looking their best.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Articles Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
                >
                  {/* Article Image */}
                  <div className="relative h-48 bg-gradient-to-r from-emerald-500 to-teal-500">
                    <Image
                      src={article.image || "/Hiking/happy-alert-brindle-mix-dog-hiking-waunakee-wi-river-paws.jpg"}
                      alt={article.image ? `${article.title} - Expert dog grooming tips from River Paws` : "A brindle dog poses during a River Paws adventure near Madison, Wisconsin."}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      style={{ objectPosition: getImageObjectPosition(article.image || '') }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <time dateTime={article.datePublished}>
                        {new Date(article.datePublished).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {article.readTime && (
                        <>
                          <span>•</span>
                          <span>{article.readTime} min read</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                      Read more
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Related Resources */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
                Grooming Resources by Location
              </h2>
              <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Explore location-specific grooming guides and FAQs:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/dog-grooming-madison"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Madison</h3>
                  <p className="text-sm text-gray-600">Grooming benefits & FAQs</p>
                </Link>
                <Link
                  href="/dog-grooming-waunakee"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Waunakee</h3>
                  <p className="text-sm text-gray-600">Products & puppy grooming</p>
                </Link>
                <Link
                  href="/dog-grooming-middleton"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Middleton</h3>
                  <p className="text-sm text-gray-600">Home bathing tips</p>
                </Link>
                <Link
                  href="/dog-grooming-sun-prairie"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Sun Prairie</h3>
                  <p className="text-sm text-gray-600">Before & after tips</p>
                </Link>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Experience Professional Grooming?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Our expert groomers in Waunakee, Wisconsin, are here to help keep your dog
                looking and feeling their best. Serving Madison, Middleton, DeForest, and Sun Prairie.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link
                  href="/grooming-application"
                  className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg min-h-[44px] flex items-center justify-center"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/dog-grooming"
                  className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Learn About Services
                </Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}

