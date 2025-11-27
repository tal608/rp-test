"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { homeFaqs } from "@/constants/faqs";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useGradientAnimation } from "@/hooks/useGradientAnimation";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FAQSection from "@/components/FAQSection";
import FAQSchema from "@/components/FAQSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function Home() {
  const [selectedService, setSelectedService] = useState<'grooming' | 'hiking'>('grooming');
  const [isVisible, setIsVisible] = useState(false);
  const [cardHover, setCardHover] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceSectionRef = useRef<HTMLDivElement>(null);
  const locationGradientRef = useRef<HTMLDivElement>(null);
  const newToRiverPawsRef = useRef<HTMLDivElement>(null);

  const mousePosition = useMouseParallax(heroRef);
  useGradientAnimation(locationGradientRef);
  useGradientAnimation(newToRiverPawsRef);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (serviceSectionRef.current) {
      observer.observe(serviceSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <>
      <div className="min-h-screen">
        {/* Live Chat Button */}
        <button 
          type="button"
          aria-label="Open live chat"
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-pulse"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Enhanced Hero Section with Advanced Effects */}
        {/* IMAGE_PLACEMENT_START: homepage-hero */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div className="absolute inset-0">
            <Image
              src="/Hiking/joyful-brindle-mix-running-waunakee-wi-river-paws.jpg"
              alt="Athletic brindle mix becoming a properly challenged athlete on exclusive gated wilderness grounds serving Waunakee families."
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-brindle-mix-running-waunakee-wi-river-paws.jpg") }}
              priority
            />
            {/* IMAGE_PLACEMENT_END: homepage-hero */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-emerald-800/50 to-teal-900/60"></div>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-teal-600/20"></div>

          {/* Floating elements with parallax */}
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
          ></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2"
            style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
          ></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 py-2 animate-fadeInUp">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Trusted by 2000+ Local Families Since 2017</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight">
                <span className="block text-white animate-fadeInUp drop-shadow-2xl">Where Every</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-200 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Tail Wags
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
                <span className="block text-white animate-fadeInUp-delay-400 drop-shadow-2xl">With Joy</span>
            </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp-delay-600 px-4">
                Professional grooming & adventure-filled hiking. Your dog&apos;s happiness is our mission.
                <span className="block mt-2 text-yellow-200 font-semibold">Find professional dog grooming and hiking services near you!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
                <Link
                  href="/apply"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
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
                    Book Grooming Today
                  </span>
                </Link>

                <Link
                  href="/dog-hikes"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                  <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                    background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.3), transparent)' 
                  }}></span>
                  <span className="relative z-10 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors duration-300">
                    <Image
                      src="/Logos/paw only 72.png"
                      alt=""
                      width={20}
                      height={20}
                      className="mr-2 w-5 h-5 object-contain group-hover:rotate-12 transition-transform duration-300"
                    />
                    Book Dog Hike Today
                  </span>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 text-white animate-fadeInUp-delay-1000">
                <div className="flex items-center">
                  <svg className="mr-2 text-yellow-300 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>minutes from Madison</span>
                </div>
                <div className="flex items-center">
                  <svg className="mr-2 text-yellow-300 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Call for hours and availability</span>
                </div>
            </div>
          </div>
        </div>

          {/* Scroll indicator */}
          <ScrollIndicator targetId="trust-bar" />
      </section>

                {/* Trust Bar */}
        <section id="trust-bar" className="bg-gradient-to-r from-blue-600 to-teal-500 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-white text-sm sm:text-base">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Fully Licensed & Insured</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="font-medium">Experienced Professional Groomers</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">Gentle, Patient Approach</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Experienced Professional Groomers</span>
              </div>
            </div>
          </div>
      </section>

        {/* Why Choose River Paws Section */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Why Choose River Paws?</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Serving Waunakee, Madison, and surrounding communities including Middleton, DeForest, and Sun Prairie since 2017 with professional,
                compassionate care for your beloved pets.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
              {/* IMAGE_PLACEMENT_START: homepage-local-expertise-card */}
              <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/dog-play-yard.jpg"
                    alt="Local dogs enjoying River Paws services in the Waunakee and Madison area"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/dog-play-yard.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Serving the local community.</p>
                  </div>
                </div>
                {/* IMAGE_PLACEMENT_END: homepage-local-expertise-card */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Local Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  We&apos;re located right on the edge of Waunakee and Madison, making us convenient for pet owners throughout the area - 
                  from Middleton and DeForest to Sun Prairie and beyond. We understand the unique needs of local pets and their families.
                </p>
              </div>

              {/* IMAGE_PLACEMENT_START: homepage-flexible-scheduling-card */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/dog-play-yard.jpg"
                    alt="Flexible scheduling options for busy pet owners at River Paws"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/dog-play-yard.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">We work around your schedule.</p>
                  </div>
                </div>
                {/* IMAGE_PLACEMENT_END: homepage-flexible-scheduling-card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-teal-50/0 group-hover:from-blue-50/40 group-hover:to-teal-50/30 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-blue-600 group-hover:text-teal-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">Flexible Scheduling</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    Flexible scheduling to accommodate your busy schedule.
                    Call us to discuss availability and appointment times.
                  </p>
                </div>
              </div>

              {/* IMAGE_PLACEMENT_START: homepage-stress-free-card */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/dog-play-yard.jpg"
                    alt="Calm, stress-free grooming environment at River Paws"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/dog-play-yard.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Gentle care, happy dogs.</p>
                  </div>
                </div>
                {/* IMAGE_PLACEMENT_END: homepage-stress-free-card */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-teal-50/0 group-hover:from-emerald-50/40 group-hover:to-teal-50/30 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-blue-600 group-hover:text-emerald-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">Stress-Free Environment</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    Our experienced groomers work at your dog&apos;s pace, using gentle techniques
                    and positive reinforcement to ensure a comfortable grooming experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Location Highlight */}
            <div className="relative bg-gradient-to-r from-blue-600 via-emerald-600 via-teal-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center overflow-hidden group">
              <div 
                ref={locationGradientRef}
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 via-teal-500 to-blue-600 bg-[length:300%_100%]"
                style={{ 
                  willChange: 'background-position',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              ></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg transform group-hover:scale-105 transition-transform duration-300 px-2">Conveniently Located on the Edge of Waunakee & Madison</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto drop-shadow-md">
                  We&apos;re perfectly positioned for pet owners throughout the greater Madison area. Whether you&apos;re coming from Middleton, DeForest, Sun Prairie, or anywhere in between, 
                  we offer convenient parking and easy access. Just minutes from downtown Madison, making it easy to fit us into your busy schedule.
                </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  5305 River Road, Waunakee, WI 53597
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  (608) 571-PAWS
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Call for hours and availability
                </div>
              </div>
              <GetDirectionsButton className="mt-4" />
              </div>
            </div>

            {/* Perfect Location for Dog Park Visitors */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                Conveniently Located Next to Yahara Heights Dog Park
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
                Just 500 feet from Yahara Heights Dog Park&apos;s 20-acre off-leash area, River Paws offers the perfect solution for muddy, happy dogs after their adventures. 
                Whether your pup just finished playing at the dog park or exploring Cherokee Marsh, we&apos;re here to help them look and feel their best.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mt-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Post-dog park grooming and cleanup</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Quick baths after Cherokee Marsh hikes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Professional grooming after swimming in the Yahara River</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Nail trims between dog park visits</span>
                </li>
              </ul>
            </div>
        </div>
      </section>

        {/* Services Section with Pricing */}
        <section ref={serviceSectionRef} className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Services</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Transparent pricing, exceptional care</p>
            </div>

            {/* Service Toggle */}
            <div className="flex justify-center mb-12">
              <div className="relative bg-white rounded-full shadow-lg p-1 flex backdrop-blur-sm border border-white/50">
                <div 
                  className={`absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all duration-500 ease-out shadow-lg ${
                    selectedService === 'grooming' ? 'left-1 w-[calc(50%-0.25rem)]' : 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
                  }`}
                />
                <button
                  type="button"
                  aria-label="Select grooming service"
                  aria-pressed={selectedService === 'grooming'}
                  onClick={() => setSelectedService('grooming')}
                  className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedService === 'grooming'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Grooming Services
                </button>
                <button
                  type="button"
                  aria-label="Select hiking service"
                  aria-pressed={selectedService === 'hiking'}
                  onClick={() => setSelectedService('hiking')}
                  className={`relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedService === 'hiking'
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Adventure Hikes
                </button>
              </div>
            </div>

            {/* Pricing Display */}
            {selectedService === 'grooming' ? (
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { size: "Small (Under 25 lbs)", basic: "$45", full: "$65", premium: "$85" },
                  { size: "Medium (25-50 lbs)", basic: "$55", full: "$75", premium: "$95" },
                  { size: "Large (50-75 lbs)", basic: "$65", full: "$85", premium: "$105" },
                  { size: "XL (Over 75 lbs)", basic: "$75", full: "$95", premium: "$120" }
                ].map((tier, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    onMouseEnter={() => setCardHover(index)}
                    onMouseLeave={() => setCardHover(null)}
                    style={{
                      transform: cardHover === index ? 'translateY(-8px) rotateX(2deg)' : 'translateY(0)',
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-teal-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-teal-50/30 group-hover:to-blue-50/50 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">{tier.size}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 group-hover:border-gray-200 transition-colors">
                          <span className="text-gray-600 group-hover:text-gray-700 transition-colors">Basic Bath</span>
                          <span className="font-bold text-blue-600 text-lg group-hover:scale-110 inline-block transition-transform duration-300">{tier.basic}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 group-hover:border-gray-200 transition-colors">
                          <span className="text-gray-600 group-hover:text-gray-700 transition-colors">Full Groom</span>
                          <span className="font-bold text-blue-600 text-lg group-hover:scale-110 inline-block transition-transform duration-300">{tier.full}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 group-hover:text-gray-700 transition-colors">Premium Spa</span>
                          <span className="font-bold text-blue-600 text-lg group-hover:scale-110 inline-block transition-transform duration-300">{tier.premium}</span>
                        </div>
                      </div>
                    </div>
                  </div>
          ))}
        </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { type: "Half Day Adventure", price: "$35", features: ["2-3 hours", "Small group (max 6)", "One park visit", "Photos included"] },
                  { type: "Full Day Adventure", price: "$55", features: ["5-6 hours", "Multiple locations", "Lunch included", "Training reinforcement"] },
                  { type: "Private Hike", price: "$75", features: ["One-on-one attention", "Custom route", "Extended training", "Video updates"] }
                ].map((tier, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    onMouseEnter={() => setCardHover(index + 10)}
                    onMouseLeave={() => setCardHover(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-teal-50/0 to-emerald-50/0 group-hover:from-emerald-50/50 group-hover:via-teal-50/30 group-hover:to-emerald-50/50 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-2xl text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{tier.type}</h3>
                      <p className="text-3xl font-bold text-blue-600 mb-6 group-hover:scale-110 inline-block transition-transform duration-300">{tier.price}</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors">
                            <svg className="w-5 h-5 text-green-500 mr-3 group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button 
                        type="button"
                        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn min-h-[44px]"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-shift"></span>
                          <span className="relative z-10">Book Now</span>
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Offer Banner */}
            <div className="mt-8 sm:mt-12 relative bg-gradient-to-r from-blue-600 via-emerald-600 via-teal-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-xl overflow-hidden group">
              <div 
                ref={newToRiverPawsRef}
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 via-teal-500 to-blue-600 bg-[length:300%_100%] opacity-100 group-hover:opacity-90 transition-opacity duration-500"
                style={{ 
                  willChange: 'background-position',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              ></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg transform group-hover:scale-105 transition-transform duration-300">✨ New to River Paws?</h3>
                <p className="text-white text-base sm:text-lg mb-4 drop-shadow-md px-2">Experience the difference for yourself! Call us today to schedule your first appointment and discover why thousands of local families trust us with their beloved pets.</p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {[
                    "Walk-in grooming available",
                    "Flexible scheduling",
                    "Experienced professionals"
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-white/25 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30 hover:bg-white/35 hover:border-white/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-default"
                    >
                      <p className="text-sm font-medium text-white drop-shadow-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>

                {/* About River Paws Section */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Your Trusted Local Pet Care Partner
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    Since 2017, River Paws has been the premier destination for professional grooming
                    and adventure experiences in the Madison and Waunakee area. Our experienced, trained team
                    brings over 50 years of combined experience in pet care.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We believe every pet deserves personalized attention, stress-free experiences,
                    and owners who can trust their furry family members are in the best hands.
                    That&apos;s why we&apos;ve built our reputation on transparency, compassion, and expertise.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">2000+</div>
                    <div className="text-sm text-gray-600">Happy Families Served</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">7</div>
                    <div className="text-sm text-gray-600">Years of Experience</div>
                  </div>
                </div>

        <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">What Sets Us Apart:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Gentle, patient approach tailored to each dog&apos;s comfort level</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Experienced, trained professional groomers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Flexible scheduling to fit your needs</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Small group hikes (max 6 dogs) for better attention</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg"
                    alt="A large pack of dogs sits together on a picnic table after a River Paws adventure near Madison."
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">The happiest pack around.</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold">
                        R
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">
                        P
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">River Paws Family</div>
                      <div className="text-sm text-gray-600">Since 2017</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Complete Pet Care Services</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                From professional grooming to exciting adventures, we provide comprehensive care
                that keeps your pet happy, healthy, and well-groomed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/Grooming/calm-biewer-terrier-grooming-waunakee-wi-river-paws.jpg"
                    alt="A gentle golden retriever looks toward the camera after a River Paws grooming session in Waunakee."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Gentle care, happy dogs.</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Professional Grooming</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Full-service grooming with experienced, trained professionals. Bath, brush, nail trim, and breed-specific cuts.
                  We use only premium, pet-safe products.
                </p>
                <div className="space-y-2 mb-4">
                  <Link
                    href="/dog-grooming"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group"
                  >
                    Learn more about dog grooming
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Link href="/puppy-grooming" className="text-blue-600 hover:text-blue-700">Puppy Grooming</Link>
                    <span className="text-gray-400">•</span>
                    <Link href="/canine-grooming" className="text-blue-600 hover:text-blue-700">Products Guide</Link>
                    <span className="text-gray-400">•</span>
                    <Link href="/blog" className="text-blue-600 hover:text-blue-700">Grooming Tips</Link>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Premium shampoos & conditioners
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional nail trimming
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ear cleaning & teeth brushing
                  </div>
                </div>
              </div>

              {/* IMAGE_PLACEMENT_START: homepage-adventure-hikes-card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg"
                    alt="Athletic pack getting fitness-level exercise on exclusive farm trails serving Madison families at River Paws."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: homepage-adventure-hikes-card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Adventure starts with every wag.</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Adventure Hikes</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Small group hiking adventures in beautiful local trails. Professional guidance,
                  socialization opportunities, and memorable experiences.
                </p>
                <Link
                  href="/dog-hikes"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group mb-4"
                >
                  Learn more about dog hiking
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Small groups (max 6 dogs)
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional dog handlers
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Private & scenic trails
                  </div>
                </div>
              </div>

              {/* IMAGE_PLACEMENT_START: homepage-puppy-play-card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/dog-play-yard.jpg"
                    alt="Puppy play group socialization at River Paws dog daycare service in Waunakee, Wisconsin"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/dog-play-yard.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: homepage-puppy-play-card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Safe, supervised puppy socialization.</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Puppy Play & Socialization</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Structured play sessions designed for puppies and young dogs. Learn socialization skills,
                  basic training, and make new friends in a safe environment.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Age-appropriate activities
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic training included
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Supervised socialization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Meet Our Pack Leaders</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Our experienced, trained team of professional groomers and hiking guides</p>
              <Link
                href="/caretakers"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group mt-4"
              >
                Meet the full team
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="relative bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/0 via-teal-100/0 to-emerald-100/0 group-hover:from-emerald-100/30 group-hover:via-teal-100/20 group-hover:to-emerald-100/30 transition-all duration-1000"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <p className="text-lg text-gray-700 leading-relaxed mb-8 group-hover:text-gray-800 transition-colors duration-300">
                  We&apos;re proud to have a team of dedicated professionals who bring years of experience 
                  and genuine passion for pet care. From our experienced groomers to our adventure hiking guides, 
                  each team member is committed to providing exceptional care for your beloved pets.
                </p>
                <Link
                  href="/caretakers"
                  className="group/btn inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white rounded-full font-medium text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden relative min-h-[44px]"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-shift"></span>
                  <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/btn:scale-100 transition-transform duration-500 origin-center" style={{ 
                    background: 'radial-gradient(circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.3), transparent)' 
                  }}></span>
                  <span className="relative z-10 flex items-center">
                    Meet Our Full Team
                    <svg className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
      </section>

        {/* Testimonials Carousel */}
        <TestimonialCarousel />

        {/* FAQ Section */}
        <FAQSection 
          faqs={homeFaqs}
          title="Frequently Asked Questions"
          description="Everything you need to know about our services"
        />
        <FAQSchema faqs={homeFaqs} />

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-teal-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Pack?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Give your dog the care and adventure they deserve. Book your appointment today and see why families choose River Paws.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Book Your Appointment
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent text-white rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
        </div>
      </section>
      </div>
    </>
  );
}
