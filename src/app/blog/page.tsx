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
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-950">
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
              src="/Grooming/soft-goldendoodle-grooming-waunakee-wi-river-paws.jpg"
              alt="A soft Goldendoodle enjoys professional grooming at River Paws in Waunakee, Wisconsin."
              fill
              className="object-cover"
              style={{ objectPosition: getImageObjectPosition('/Grooming/soft-goldendoodle-grooming-waunakee-wi-river-paws.jpg') }}
              priority
              sizes="100vw"
            />
            {/* IMAGE_PLACEMENT_END: blog-hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-900/60 to-teal-900/70 z-[1]"></div>
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

          <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Expert Tips & Advice</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
                <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Expert Dog Grooming</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    & Hiking Tips
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl mt-4 font-medium text-blue-100 animate-fadeInUp-delay-600 drop-shadow-md">
                  from River Paws Waunakee
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Real advice from the people who actually spend their days with dogs. 
                No fluff—just practical tips you&apos;ll actually use.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Articles Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Articles Grid - Polaroid Style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {sortedArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group"
                >
                  {/* Polaroid Frame */}
                  <div 
                    className={`bg-white dark:bg-slate-800 p-3 pb-6 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                      index % 3 === 0 ? 'group-hover:-rotate-1' : index % 3 === 1 ? 'group-hover:rotate-1' : 'group-hover:-rotate-2'
                    } group-hover:scale-[1.02]`}
                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                      <Image
                        src={article.image || "/Hiking/happy-alert-brindle-mix-dog-hiking-waunakee-wi-river-paws.jpg"}
                        alt={article.image ? `${article.title} - Expert dog grooming tips from River Paws` : "A brindle dog poses during a River Paws adventure near Madison, Wisconsin."}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: getImageObjectPosition(article.image || '') }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Content Below Photo */}
                    <div className="px-1">
                      {/* Date & Read Time */}
                      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-2">
                        <time dateTime={article.datePublished}>
                          {new Date(article.datePublished).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        {article.readTime && (
                          <>
                            <span>•</span>
                            <span>{article.readTime} min</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{article.excerpt}</p>

                      {/* Read More Link */}
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        Read article
                        <svg
                          className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </Link>
              ))}
            </div>

            {/* Areas We Serve - Compact Design */}
            <div className="mt-16 bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Serving the Greater Madison Area</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Location-specific grooming guides and tips for your area:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/dog-grooming-waunakee" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-700 hover:from-blue-100 hover:to-teal-100 dark:hover:from-slate-600 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-slate-500">
                      📍 Waunakee
                    </Link>
                    <Link href="/dog-grooming-madison" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-700 hover:from-blue-100 hover:to-teal-100 dark:hover:from-slate-600 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-slate-500">
                      📍 Madison
                    </Link>
                    <Link href="/dog-grooming-middleton" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-700 hover:from-blue-100 hover:to-teal-100 dark:hover:from-slate-600 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-slate-500">
                      📍 Middleton
                    </Link>
                    <Link href="/dog-grooming-deforest" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-700 hover:from-blue-100 hover:to-teal-100 dark:hover:from-slate-600 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-slate-500">
                      📍 DeForest
                    </Link>
                    <Link href="/dog-grooming-sun-prairie" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-700 dark:to-slate-700 hover:from-blue-100 hover:to-teal-100 dark:hover:from-slate-600 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-slate-500">
                      📍 Sun Prairie
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden" style={{ background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(20, 184, 166))' }}>
              {/* Subtle animated background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-white/5 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[100%] bg-white/5 rounded-full filter blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                  Like what you&apos;re reading?
                </h2>
                <p className="text-xl sm:text-2xl text-white/90 mb-4">
                  We&apos;re even better in person.
                </p>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 text-white/80">
                  Our groomers practice what we preach. Book and see for yourself.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link
                    href="/grooming-application"
                    className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg min-h-[44px] flex items-center justify-center"
                  >
                    Book Your First Groom
                  </Link>
                  <Link
                    href="/dog-grooming"
                    className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                  >
                    See Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}

