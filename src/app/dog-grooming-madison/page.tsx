"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cityGroomingFaqs, getCityGroomingFaqs } from "@/constants/cityFaqs";
import FAQSection from "@/components/FAQSection";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import SafeHtml from "@/components/SafeHtml";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import { contactInfo } from "@/constants/social";

export default function DogGroomingMadison() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);
  const madisonFaqs = getCityGroomingFaqs("madison");
  const mainFaq = cityGroomingFaqs.madison[0];

  return (
    <>
      <ServiceSchema serviceType="grooming" />
      <ArticleSchema
        headline={mainFaq.question}
        description="Learn about the health benefits of regular dog grooming for Madison area pet owners."
        datePublished="2024-01-15"
        dateModified="2025-11-01"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Grooming", url: "https://www.riverpaws.dog/dog-grooming" },
          { name: "Dog Grooming Madison", url: "https://www.riverpaws.dog/dog-grooming-madison" },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Modern Hero Section */}
        {/* IMAGE_PLACEMENT_START: dog-grooming-madison-hero */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-24 left-6 z-20">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Dog Grooming", href: "/dog-grooming" },
                { name: "Madison", href: "/dog-grooming-madison" },
              ]}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
            />
          </div>
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hiking/happy-bernedoodle-dog-bus-madison-wi-river-paws.jpg"
              alt="Happy Bernedoodle transforming boredom into adventure via Madison dog hiking transport to River Paws' exclusive wilderness grounds."
              fill
              className="object-cover"
              style={{ objectPosition: getImageObjectPosition("/Hiking/happy-bernedoodle-dog-bus-madison-wi-river-paws.jpg") }}
              priority
              sizes="100vw"
            />
            {/* IMAGE_PLACEMENT_END: dog-grooming-madison-hero */}
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

          <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Professional Grooming Since 2017</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
                <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Dog Grooming</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Madison
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
                <span className="block text-white animate-fadeInUp-delay-600 drop-shadow-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">Professional Grooming Services</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Right on the North Madison border, 15 minutes from downtown, and 500 feet from Yahara Heights Dog Park. Professional grooming with the personalized care big-box stores can&apos;t match.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
                <Link
                  href="/grooming-application"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                  <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                    background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.3), transparent)' 
                  }}></span>
                  <span className="relative z-10 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors duration-300">
                    <Image
                      src="/Logos/paw only 72.png"
                      alt=""
                      width={20}
                      height={20}
                      className="mr-2 w-5 h-5 object-contain group-hover:rotate-12 transition-transform duration-300"
                    />
                    Book Appointment
                  </span>
                </Link>

                <GetDirectionsButton className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[44px] flex items-center justify-center" />
              </div>
            </div>
          </div>
        </section>

        {/* Main FAQ Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              {/* Header with Image */}
              <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-teal-500">
                <Image
                  src="/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg"
                  alt="A happy Bernese Mountain Dog mix wearing a green bandana after grooming at River Paws in Madison, Wisconsin."
                  fill
                  className="object-cover opacity-80"
                  style={{ objectPosition: '50% 40%' }}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white uppercase tracking-wide">
                      Madison Dog Owners Ask
                    </p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {mainFaq.question}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <SafeHtml
                  html={mainFaq.fullContent || `<p>${mainFaq.answer}</p>`}
                  className="article-content text-gray-700 leading-relaxed"
                />
              </div>
            </div>

            {/* Additional FAQs */}
            {madisonFaqs.length > 1 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
                <FAQSection
                  faqs={madisonFaqs.slice(1)}
                  title="More Questions from Madison Dog Owners"
                  variant="div"
                />
                <FAQSchema faqs={madisonFaqs.slice(1)} />
              </div>
            )}

            {/* Perfect Location for Dog Park Visitors */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Right Next to Yahara Heights Dog Park
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We&apos;re 500 feet from Yahara Heights Dog Park—close enough that some clients walk their dogs over after an off-leash session. Muddy from Cherokee Marsh? Wet from swimming in the Yahara River? Drop off your adventurous pup, grab a coffee, and pick them up fresh, clean, and smelling significantly better.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We&apos;re right on the North Madison/Waunakee border, serving families from Maple Bluff, Sherman, Northport, Cherokee, and beyond. About 15 minutes from central Madison via Highway 113.
              </p>
            </div>

            {/* Why Madison Families Trust River Paws */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Madison Families Choose River Paws
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We&apos;re right on the North Madison border—close to everything, but with the personalized attention you won&apos;t find at high-volume salons.
              </p>
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">15 minutes from central Madison</strong>
                    <p className="mt-1">Straight shot up Highway 113 (Northport Drive). Families from Sherman, Northport, Cherokee, Maple Bluff, and the isthmus are here in no time.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">No assembly-line grooming</strong>
                    <p className="mt-1">We see fewer dogs per day than most salons. That means less stress for your dog, more attention from the groomer, and better results. Quality over quantity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Great with nervous dogs</strong>
                    <p className="mt-1">If your dog has had bad grooming experiences before, we&apos;re happy to go slow. Some of our most loyal regulars started as anxious messes. Patience is part of the job.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Book?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                We&apos;re right on the North Madison border—15 minutes from downtown, steps from Yahara Heights Dog Park. Professional grooming without the big-box chaos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://booking.moego.pet/ol/RiverPaws/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center"
                >
                  Book Appointment
                </a>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-emerald-100 mb-4">
                  Located at <strong>{contactInfo.address.full}</strong>
                </p>
                <p className="text-emerald-100">
                  Call us at{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white font-bold hover:underline"
                  >
                    {contactInfo.phoneDisplay}
                  </a>{" "}
                  to schedule your appointment
                </p>
              </div>
            </div>

            {/* Related Links */}
            <div className="space-y-6">
              {/* Link to Main Grooming Page */}
              <div className="text-center">
                <Link
                  href="/dog-grooming"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  View All Dog Grooming Services
                </Link>
              </div>

              {/* Related Location Pages */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                  Grooming Services in Nearby Areas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link
                    href="/dog-grooming-waunakee"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Waunakee
                  </Link>
                  <Link
                    href="/dog-grooming-middleton"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Middleton
                  </Link>
                  <Link
                    href="/dog-grooming-sun-prairie"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Sun Prairie
                  </Link>
                  <Link
                    href="/dog-grooming-deforest"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    DeForest
                  </Link>
                  <Link
                    href="/dog-hikes"
                    className="text-sm text-blue-600 hover:text-blue-700 text-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Dog Hikes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

