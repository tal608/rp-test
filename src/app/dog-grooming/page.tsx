"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { groomingFaqs } from "@/constants/faqs";
import { groomingVoiceFaqs, formatForFAQSchema } from "@/constants/voiceSearchFaqs";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import TeamStats from "@/components/TeamStats";
import FAQSection from "@/components/FAQSection";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import PawCursorTrail from "@/components/PawCursorTrail";
import RotatingBadges from "@/components/RotatingBadges";
import { contactInfo } from "@/constants/social";

export default function DogGrooming() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  return (
    <>
      <ServiceSchema serviceType="grooming" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Grooming", url: "https://www.riverpaws.dog/dog-grooming" },
        ]}
      />
      <HowToSchema
        name="How to Get Your Dog Groomed at River Paws"
        description="A step-by-step guide to the professional dog grooming experience at River Paws in Waunakee, WI. From booking to pickup, see exactly what to expect."
        totalTime="PT2H"
        estimatedCost={{
          currency: "USD",
          minValue: 45,
          maxValue: 150,
        }}
        image="https://www.riverpaws.dog/Grooming/freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg"
        steps={[
          {
            name: "Book Your Appointment",
            text: "Choose your service (Bath & Brush or Full Service Groom) and schedule online at booking.moego.pet/ol/RiverPaws/book or call (608) 571-7297.",
            url: "https://booking.moego.pet/ol/RiverPaws/book",
          },
          {
            name: "Arrive & Check In",
            text: "Drop off your pup at our convenient River Road location. Park in our lot, and we'll greet you and your dog warmly with a quick health check at the door.",
            image: "https://www.riverpaws.dog/Grooming/calm-cockapoo-grooming-waunakee-wi-river-paws.jpg",
          },
          {
            name: "We Weigh Your Pup",
            text: "Your price is based on weight because bigger pups need more time and products. We weigh every visit to ensure fair, accurate pricing. Weight groups range from Extra Small (9-10 lbs) to Giant (121+ lbs).",
          },
          {
            name: "We Assess the Coat",
            text: "Coat type affects grooming time and price. We'll assess whether your dog has a Basic Coat (hairless, smooth, short, medium) or Thick Coat (corded, wire, double, curly, long), discuss any mats or tangles, and give you an estimated price before we begin.",
            image: "https://www.riverpaws.dog/Grooming/groomed-poodle-grooming-waunakee-wi-river-paws.jpg",
          },
          {
            name: "The Pampering Begins",
            text: "Your dog receives spa-quality care with premium, pet-safe products. Services include premium bath and conditioning, blow out, brush out, nail trim, ear cleaning, and full body haircut (for Full Service Groom).",
            image: "https://www.riverpaws.dog/Grooming/freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg",
          },
        ]}
      />
      <SpeakableSchema
        name="Dog Grooming Services in Waunakee"
        url="https://www.riverpaws.dog/dog-grooming"
        cssSelectors={["h1", ".hero-description", ".service-intro", ".grooming-journey-intro"]}
      />
      {/* Modern Hero Section */}
      {/* IMAGE_PLACEMENT_START: dog-grooming-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-20 left-4 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Grooming", href: "/dog-grooming" },
            ]}
            compact
            className="bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md"
          />
        </div>
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg"
            alt="A happy Bernese Mountain Dog mix wearing a green bandana after grooming at River Paws in Madison, Wisconsin"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg") }}
            priority
            sizes="100vw"
          />
          {/* IMAGE_PLACEMENT_END: dog-grooming-hero */}
          {/* Radial gradient overlay - creates spotlight effect: lighter in center (~10%), darker at edges */}
          {/* Responsive: adjusts ellipse size and position for mobile vs desktop */}
          <div className="absolute inset-0 z-[1] hero-spotlight-base"></div>
          {/* Color tint overlay - adds brand colors while maintaining spotlight effect */}
          <div className="absolute inset-0 z-[1] hero-spotlight-color"></div>
        </div>

        {/* Floating elements with parallax */}
        <div
          className="absolute -top-10 -left-10 w-[280px] h-[280px] md:-top-20 md:-left-20 md:w-[500px] md:h-[500px] bg-blue-500 rounded-full filter blur-[80px] md:blur-[100px] opacity-30 md:opacity-40 animate-blob z-[3]"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute top-10 -right-10 w-[250px] h-[250px] md:top-20 md:-right-20 md:w-[450px] md:h-[450px] bg-teal-500 rounded-full filter blur-[80px] md:blur-[100px] opacity-30 md:opacity-40 animate-blob-delay-2 z-[3]"
          style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute bottom-0 -left-10 w-[220px] h-[220px] md:left-1/4 md:w-[400px] md:h-[400px] bg-emerald-500 rounded-full filter blur-[90px] md:blur-[120px] opacity-25 md:opacity-35 animate-blob z-[3]"
          style={{ transform: `translate(${mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)` }}
        ></div>

        {/* Paw print cursor trail */}
        <PawCursorTrail />

        <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-4 sm:space-y-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp drop-shadow-2xl">Every Tail Gets</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-200 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  The Royal Treatment
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl mt-2 font-medium text-blue-100 animate-fadeInUp-delay-400 drop-shadow-md">
                at River Paws Dog Grooming
              </span>
            </h1>

            <div className="animate-fadeInUp-delay-400">
              <RotatingBadges />
            </div>

            <p className="hero-description text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto animate-fadeInUp-delay-600 px-4 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Patient groomers. Premium products. Dogs who actually enjoy their spa day.
              <span className="block mt-1 text-white/80">We take the time other places won&apos;t—because a calm pup means a beautiful groom.</span>
              <span className="block mt-3 text-yellow-200 font-semibold text-lg sm:text-xl">Professional dog grooming near you!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeInUp-delay-800 pt-2">
              <a
                href="https://booking.moego.pet/ol/RiverPaws/book"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>

              <a 
                href="tel:608-571-7297"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center min-h-[44px]"
                aria-label="Call River Paws at (608) 571-7297"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                  background: 'radial-gradient(circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.2), transparent)' 
                }}></span>
                <span className="relative z-10 flex items-center justify-center text-white group-hover:text-emerald-600 transition-colors duration-300">
                  <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call (608) 571-PAWS
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="grooming-journey" />
      </section>

      {/* Your Grooming Journey Section */}
      <section id="grooming-journey" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <span className="mr-2">🐾</span> From Booking to Beautiful
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Grooming Journey</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">See exactly what to expect when you bring your pup for grooming</p>
          </div>

          {/* Journey Steps - Flowing Zigzag Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* SVG Flowing Path - Desktop (zigzag connecting steps) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" 
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="pathGradientDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#14b8a6" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="75%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Zigzag path connecting left-right-left-right-center steps */}
              <path 
                d="M 22 4
                   Q 22 10, 50 12
                   Q 78 14, 78 22
                   Q 78 30, 50 32
                   Q 22 34, 22 42
                   Q 22 50, 50 52
                   Q 78 54, 78 62
                   Q 78 70, 50 72
                   Q 22 74, 22 82
                   Q 22 90, 50 95"
                stroke="url(#pathGradientDesktop)"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeDasharray="1.5 1"
                fill="none"
                opacity="0.5"
              />
            </svg>
            
            {/* SVG Flowing Path - Mobile (soft gentle curves) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none md:hidden" 
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="pathGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="20%" stopColor="#14b8a6" />
                  <stop offset="40%" stopColor="#3b82f6" />
                  <stop offset="60%" stopColor="#10b981" />
                  <stop offset="80%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Soft flowing S-curve path */}
              <path 
                d="M 12 2
                   Q 12 6, 50 8
                   Q 88 10, 88 14
                   Q 88 18, 50 20
                   Q 12 22, 12 26
                   Q 12 30, 50 32
                   Q 88 34, 88 38
                   Q 88 42, 50 44
                   Q 12 46, 12 50
                   Q 12 54, 50 56
                   Q 88 58, 88 62
                   Q 88 66, 50 68
                   Q 12 70, 12 74
                   Q 12 78, 50 82
                   Q 88 86, 50 92"
                stroke="url(#pathGradientMobile)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeDasharray="2 1.5"
                fill="none"
                opacity="0.4"
              />
            </svg>
            
            {/* Step 1: Book Your Appointment - LEFT */}
            <div className="relative mb-16 md:mb-16">
              <div className="flex items-start gap-4 md:gap-12">
                {/* Left side - Step badge and card */}
                <div className="w-full md:w-[55%]">
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white flex-shrink-0 relative z-10"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)' }}
                    >
                      <span className="text-lg md:text-2xl font-bold text-white">1</span>
                    </div>
                    <div>
                      <span className="text-[10px] md:text-xs uppercase tracking-wider text-blue-600 font-semibold block">Step 1</span>
                      <h3 className="text-base md:text-xl font-bold text-gray-800">Book Your Appointment</h3>
                    </div>
                  </div>
                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ml-4 md:ml-6">
                    <p className="text-gray-600 mb-3 text-sm">Choose your service and schedule online or by phone:</p>
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-2 md:p-3 text-center hover:scale-105 transition-transform duration-300 cursor-default">
                        <span className="text-xl md:text-2xl mb-1 block">🛁</span>
                        <span className="text-xs md:text-sm font-semibold text-gray-800 block">Bath & Brush</span>
                        <span className="text-[10px] md:text-xs text-gray-500 hidden md:block">Clean & refreshed</span>
                      </div>
                      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-2 md:p-3 text-center hover:scale-105 transition-transform duration-300 cursor-default">
                        <span className="text-xl md:text-2xl mb-1 block">✂️</span>
                        <span className="text-xs md:text-sm font-semibold text-gray-800 block">Full Groom</span>
                        <span className="text-[10px] md:text-xs text-gray-500 hidden md:block">The complete works</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <a
                        href="https://booking.moego.pet/ol/RiverPaws/book"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full text-xs md:text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Online
                      </a>
                      <a
                        href="tel:608-571-7297"
                        className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-full text-xs md:text-sm font-medium hover:bg-blue-50 transition-all duration-300"
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Us
                      </a>
                    </div>
                  </div>
                </div>
                {/* Right side - empty for zigzag */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            </div>

            {/* Step 2: Arrive & Check In - RIGHT */}
            <div className="relative mb-16 md:mb-16">
              <div className="flex items-start gap-4 md:gap-12 flex-row-reverse">
                {/* Right side - Step badge and card */}
                <div className="w-full md:w-[55%]">
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 md:gap-4 mb-4 flex-row-reverse">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white flex-shrink-0 relative z-10"
                      style={{ background: 'linear-gradient(135deg, #14b8a6, #10b981)' }}
                    >
                      <span className="text-lg md:text-2xl font-bold text-white">2</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs uppercase tracking-wider text-teal-600 font-semibold block">Step 2</span>
                      <h3 className="text-base md:text-xl font-bold text-gray-800">Arrive & Check In</h3>
                    </div>
                  </div>
                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mr-4 md:mr-6">
                    <div className="md:flex md:gap-4">
                      {/* Small image */}
                      <div className="hidden md:block relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src="/Grooming/curious-maltipoo-grooming-tub-sun-prairie-wi-river-paws.jpg"
                          alt="Curious Maltipoo greeting at River Paws check-in"
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 mb-2 text-sm">Drop-off is easy at our convenient location:</p>
                        <ul className="space-y-1 text-sm text-gray-700 mb-2">
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs md:text-sm">Convenient parking</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs md:text-sm">Warm greeting</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs md:text-sm">Quick health check</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-blue-600 bg-blue-50 rounded-lg p-2 mt-2">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="font-medium">5305 River Road, Waunakee</span>
                    </div>
                  </div>
                </div>
                {/* Left side - empty for zigzag */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            </div>

            {/* Step 3: We Weigh Your Pup - LEFT */}
            <div className="relative mb-16 md:mb-16">
              <div className="flex items-start gap-4 md:gap-12">
                {/* Left side - Step badge and card */}
                <div className="w-full md:w-[55%]">
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white flex-shrink-0 relative z-10"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                    >
                      <span className="text-lg md:text-2xl font-bold text-white">3</span>
                    </div>
                    <div>
                      <span className="text-[10px] md:text-xs uppercase tracking-wider text-blue-600 font-semibold block">Step 3</span>
                      <h3 className="text-base md:text-xl font-bold text-gray-800">We Weigh Your Pup</h3>
                    </div>
                  </div>
                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ml-4 md:ml-6">
                    <p className="text-gray-600 mb-2 text-xs md:text-sm">Price is based on weight — bigger pups need more time:</p>
                    <div className="grid grid-cols-3 gap-1.5 md:gap-2 text-xs mb-3">
                      {[
                        { name: "XS", weight: "9-10 lbs" },
                        { name: "Small", weight: "11-30 lbs" },
                        { name: "Medium", weight: "31-60 lbs" },
                        { name: "Large", weight: "61-90 lbs" },
                        { name: "XL", weight: "91-120 lbs" },
                        { name: "Giant", weight: "121+ lbs" }
                      ].map((group, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-1.5 md:p-2 text-center hover:bg-blue-50 transition-colors duration-300">
                          <span className="font-semibold text-gray-800 block text-[10px] md:text-xs">{group.name}</span>
                          <span className="text-gray-500 text-[8px] md:text-[10px]">{group.weight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 md:p-3 text-[10px] md:text-sm text-amber-800">
                      <span className="font-medium">💡</span> We weigh every visit — always fair pricing!
                    </div>
                  </div>
                </div>
                {/* Right side - empty for zigzag */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            </div>

            {/* Step 4: We Assess the Coat - RIGHT */}
            <div className="relative mb-16 md:mb-16">
              <div className="flex items-start gap-4 md:gap-12 flex-row-reverse">
                {/* Right side - Step badge and card */}
                <div className="w-full md:w-[55%]">
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 md:gap-4 mb-4 flex-row-reverse">
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white flex-shrink-0 relative z-10"
                      style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}
                    >
                      <span className="text-lg md:text-2xl font-bold text-white">4</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs uppercase tracking-wider text-emerald-600 font-semibold block">Step 4</span>
                      <h3 className="text-base md:text-xl font-bold text-gray-800">We Assess the Coat</h3>
                    </div>
                  </div>
                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mr-4 md:mr-6">
                    <div className="md:flex md:gap-4 md:flex-row-reverse">
                      {/* Small image */}
                      <div className="hidden md:block relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src="/Grooming/joyful-havanese-mix-dog-grooming-waunakee-wi-river-paws.jpg"
                          alt="Sweet Havanese mix celebrating with professional grooming at River Paws"
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 mb-2 text-xs md:text-sm">Coat type also affects time and price:</p>
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 md:p-3 hover:border-blue-300 transition-colors duration-300">
                            <span className="font-bold text-blue-900 text-xs md:text-sm block">Basic Coat</span>
                            <p className="text-[10px] md:text-xs text-blue-700">Hairless, Smooth, Short, Medium</p>
                          </div>
                          <div className="bg-teal-50 border border-teal-200 rounded-xl p-2 md:p-3 hover:border-teal-300 transition-colors duration-300">
                            <span className="font-bold text-teal-900 text-xs md:text-sm block">Thick Coat</span>
                            <p className="text-[10px] md:text-xs text-teal-700">Corded, Wire, Double, Curly, Long</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] md:text-xs text-gray-500 italic text-center mt-2 md:mt-3">We&apos;ll discuss special needs and give an estimated price before we begin.</p>
                  </div>
                </div>
                {/* Left side - empty for zigzag */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            </div>

            {/* Step 5: The Pampering Begins - LEFT (Expanded) */}
            <div className="relative">
              <div className="md:flex md:items-start md:gap-12">
                {/* Full width for final step - spans both columns */}
                <div className="w-full">
                  {/* Step indicator - centered on large screens */}
                  <div className="flex items-center gap-4 mb-6 md:justify-center">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white flex-shrink-0 relative z-10"
                      style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
                    >
                      <span className="text-2xl md:text-3xl font-bold text-white">5</span>
                    </div>
                    <div className="md:hidden">
                      <span className="text-xs uppercase tracking-wider text-orange-600 font-semibold block">Step 5</span>
                      <h3 className="text-lg font-bold text-gray-800">The Pampering Begins!</h3>
                    </div>
                  </div>
                  <div className="hidden md:block text-center mb-6">
                    <span className="text-xs uppercase tracking-wider text-orange-600 font-semibold block">Step 5</span>
                    <h3 className="text-2xl font-bold text-gray-800">The Pampering Begins!</h3>
                    <p className="text-gray-600 mt-2">Spa-quality care with premium, pet-safe products</p>
                  </div>
                  
                  {/* Expanded service cards */}
                  <div className="grid md:grid-cols-3 gap-8 md:gap-6">
                    {/* Bath & Brush Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="relative h-[200px] md:h-[168px] -mx-5 -mt-5 mb-4 overflow-hidden">
                        <Image
                          src="/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg"
                          alt="Dog enjoying bath at River Paws"
                          fill
                          className="object-cover"
                          style={{ objectPosition: getImageObjectPosition("/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg") }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 left-3">
                          <span className="text-white font-bold text-sm">🛁 Bath & Brush</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Premium Bath & Conditioning</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Blow Out</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Brush Out</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Nail Trim</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Ear Cleaning</li>
                      </ul>
                    </div>

                    {/* Full Service Groom Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="relative h-[200px] md:h-[168px] -mx-5 -mt-5 mb-4 overflow-hidden">
                        <Image
                          src="/Grooming/confident-saint-bernard-dog-grooming-waunakee-wi-river-paws.jpg"
                          alt="Gentle Saint Bernard getting pampered with professional grooming at River Paws"
                          fill
                          className="object-cover"
                          style={{ objectPosition: getImageObjectPosition("/Grooming/confident-saint-bernard-dog-grooming-waunakee-wi-river-paws.jpg") }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 left-3">
                          <span className="text-white font-bold text-sm">✂️ Full Service Groom</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>Full Body Haircut</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>Premium Bath & Conditioning</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>Blow Out & Brush Out</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>Nail Trim</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>Ear Cleaning</li>
                      </ul>
                    </div>

                    {/* À La Carte Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="relative h-[200px] md:h-[168px] -mx-5 -mt-5 mb-4 overflow-hidden">
                        <Image
                          src="/Grooming/wisconsin-bernedoodle-dog-grooming-madison-wi-river-paws.jpg"
                          alt="Cheerful Bernedoodle enjoying gentle expert grooming services at River Paws"
                          fill
                          className="object-cover"
                          style={{ objectPosition: getImageObjectPosition("/Grooming/wisconsin-bernedoodle-dog-grooming-madison-wi-river-paws.jpg") }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-2 left-3">
                          <span className="text-white font-bold text-sm">🐾 À La Carte</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Pawdicure (Nails + Grind + Ears)</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Nail Trim or Nail Grind</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Teeth Brushing</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Anal Gland Expression</li>
                        <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Sanitary Trim</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add-Ons & Extras */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center">
                <span className="mr-2">🎁</span> Add-Ons & Extras
              </h3>
              <p className="text-gray-600 text-sm mt-2">Customize your pup&apos;s experience with these extras</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: "Pawdicure", desc: "Nails + Grind + Ears", icon: "🐾" },
                { name: "Nail Trim", desc: "Quick trim", icon: "🐩" },
                { name: "Nail Grind", desc: "Smooth finish", icon: "🐕" },
                { name: "Teeth Brushing", desc: "Fresh breath", icon: "🪥" },
                { name: "Anal Glands", desc: "Expression", icon: "🩺" },
                { name: "Sanitary Trim", desc: "Hygiene cut", icon: "✂️" }
              ].map((addon, idx) => (
                <div key={idx} className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <span className="text-2xl block mb-1">{addon.icon}</span>
                  <span className="font-semibold text-gray-800 text-sm block">{addon.name}</span>
                  <span className="text-xs text-gray-500">{addon.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Packages */}
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center sm:justify-start">
                  <span className="mr-2">✨</span> Special Packages Available
                </h3>
                <p className="text-gray-600 text-sm mt-1">Ask about our Monthly, Premium, Deluxe, and Supreme specials when booking!</p>
              </div>
              <a
                href="tel:608-571-7297"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Ask About Specials
              </a>
            </div>
          </div>

          {/* Ready to Book CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Ready to Start Your Pup&apos;s Journey?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://booking.moego.pet/ol/RiverPaws/book"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Your Appointment
              </a>
              <a
                href="tel:608-571-7297"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (608) 571-PAWS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Team Section */}
      <section id="philosophy-section" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Your Trusted Grooming Partners
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  It started with one simple belief: dogs deserve groomers who actually <em>like</em> dogs. Not just tolerate them—genuinely enjoy working with them. 
                  Since 2017, that philosophy has turned first-time visitors into regulars, and nervous pups into spa-day enthusiasts. 
                  We&apos;re proud to serve families from Waunakee, Madison, Middleton, DeForest, Sun Prairie, and beyond.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  We believe every dog deserves personalized attention, stress-free experiences,
                  and owners who can trust their furry family members are in the best hands.
                  That&apos;s why we&apos;ve built our reputation on transparency, compassion, and expertise.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
                  <div className="text-sm text-gray-600">Happy Dogs Groomed</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">8</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
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
                    <span className="text-gray-700">Premium, pet-safe grooming products</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Personalized attention for each dog&apos;s unique needs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/Grooming/joyful-golden-retriever-outdoor-enrichment-middleton-wi-river-paws.jpg"
                  alt="Joyful Golden Retriever celebrating with skilled grooming serving Middleton families at River Paws"
                  fill
                  className="object-cover"
                  style={{ objectPosition: getImageObjectPosition("/Grooming/joyful-golden-retriever-outdoor-enrichment-middleton-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-sm font-medium">Gentle care, happy dogs.</p>
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
                    <div className="font-semibold text-gray-800">Professional Groomers</div>
                    <div className="text-sm text-gray-600">Since 2017</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose River Paws */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Why Choose River Paws?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We&apos;re not a grooming factory. Here, your dog gets the time and attention they deserve—not a rushed assembly line.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Experienced & Gentle Team - Combined card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Experienced & Gentle Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team has seen every coat type, every temperament, and every wiggle-filled bath. Does your dog hide when they hear &quot;bath&quot;? 
                We get it. Our groomers are experts at reading body language, taking breaks when needed, and turning nervous energy into tail wags.
              </p>
            </div>

            {/* Complete Transparency */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Complete Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                No surprise charges, no mystery services. We&apos;ll explain exactly what your dog needs, 
                show you any problem areas, and give you an honest estimate before we start.
              </p>
            </div>

            {/* Premium Products */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Premium Products</h3>
              <p className="text-gray-600 leading-relaxed">
                Salon-quality shampoos, conditioners, and tools that make coats shine and skin happy. 
                We&apos;re picky about products so your pup gets the best.
              </p>
            </div>

            {/* Convenient Location */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Convenient Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Located on the edge of Waunakee and Madison, we&apos;re an easy drive from Middleton, DeForest, and Sun Prairie. 
                Plus, we&apos;re just 500 feet from Yahara Heights Dog Park—perfect for post-adventure cleanups!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Highlight - Yahara Heights Dog Park */}
      <section className="relative py-16 px-6 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
        {/* Animated Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
          <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/20">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                  Conveniently Located Next to Yahara Heights Dog Park
                </h3>
                <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
                  Just 500 feet from Yahara Heights&apos; 20-acre off-leash area, we&apos;re the perfect solution for post-dog park grooming. 
                  Clean up your muddy pup after Cherokee Marsh adventures or Yahara River swimming sessions. 
                  Walking distance from the area&apos;s most popular dog park!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">What Our Clients Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              The real reviewers are the dogs who pull their owners toward our door instead of away from it. But, here is what their owners say:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Lindsey M.</h4>
                  <p className="text-sm text-gray-600">Waunakee</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;The best grooming experience we&apos;ve ever had. Our golden retriever comes home looking amazing and completely stress-free.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Kate S.</h4>
                  <p className="text-sm text-gray-600">Madison</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;They work magic with nervous dogs. Monique and the team have been a blessing for us.&rdquo;
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg">
            <FAQSection
              faqs={groomingFaqs}
              title="Frequently Asked Questions"
              variant="div"
            />
            <FAQSchema faqs={[...groomingFaqs, ...formatForFAQSchema(groomingVoiceFaqs)]} />
          </div>

          {/* Grooming Gallery Preview */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                See the transformations for yourself
              </h3>
              <p className="text-lg text-blue-600 font-semibold">Every groom tells a story.</p>
            </div>
            
            {/* Polaroid Preview Stack */}
            <div className="relative flex justify-center items-center mb-8">
              <Link href="/gallery" className="group relative">
                {/* Stacked Polaroid effect */}
                <div className="relative w-64 h-72 sm:w-80 sm:h-96">
                  {/* Back polaroid - left */}
                  <div className="absolute left-0 top-4 w-48 h-56 sm:w-56 sm:h-64 bg-white rounded shadow-lg transform -rotate-12 group-hover:-rotate-6 transition-transform duration-300 overflow-hidden">
                    <div className="p-2 pb-8 h-full">
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                          src="/Grooming/groomed-shih-tzu-grooming-madison-wi-river-paws.jpg"
                          alt="Freshly groomed Shih Tzu looking adorable"
                          fill
                          className="object-cover"
                          sizes="224px"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Back polaroid - right */}
                  <div className="absolute right-0 top-2 w-48 h-56 sm:w-56 sm:h-64 bg-white rounded shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300 overflow-hidden">
                    <div className="p-2 pb-8 h-full">
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                          src="/Grooming/calm-cockapoo-grooming-waunakee-wi-river-paws.jpg"
                          alt="Calm cockapoo enjoying the grooming experience"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Front polaroid - center */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-52 h-60 sm:w-64 sm:h-72 bg-white rounded shadow-2xl transform rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 z-10 overflow-hidden">
                    <div className="p-2 pb-10 h-full">
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                          src="/Grooming/freshly-groomed-doodle-salon-waunakee-wi-river-paws.jpg"
                          alt="Freshly groomed doodle looking fabulous"
                          fill
                          className="object-cover"
                          sizes="256px"
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-0 right-0 text-center text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>Fresh & fabulous! ✨</span>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-teal-400/0 to-blue-400/0 group-hover:from-blue-400/20 group-hover:via-teal-400/20 group-hover:to-blue-400/20 rounded-3xl blur-2xl transition-all duration-500 -z-10"></div>
              </Link>
            </div>
            
            {/* CTA Button */}
            <div className="text-center">
              <Link
                href="/gallery"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-[length:200%_100%] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-gradient-x"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Browse All Spa Day Photos
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-sm text-gray-500 mt-3">100+ photos of happy, freshly groomed pups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies & Requirements */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Policies & Requirements</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Clear policies designed to ensure the best experience for your dog and maintain fairness for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Requirements */}
            <div className="space-y-8 flex flex-col h-full">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex-1">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Vaccination Requirements</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Rabies</p>
                      <p className="text-sm text-gray-600">Current vaccination required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Distemper</p>
                      <p className="text-sm text-gray-600">Up-to-date vaccination required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Bordetella</p>
                      <p className="text-sm text-gray-600">Current vaccination required</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-6 leading-relaxed">
                  Email vaccination records to {contactInfo.email} or bring a copy when you drop off.
                  Records must be current for your dog&apos;s safety and our facility requirements.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-teal-500 dark:!from-blue-600 dark:!to-teal-500 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <h3 className="text-2xl font-bold">Appointment Requirements</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Allow 2-4 hours for grooming appointment</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Credit card required to hold appointment</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Complete grooming application required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-8 flex flex-col h-full">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex-1">
                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Important to Note</h3>
                <p className="text-sm text-gray-500 mb-6">(not typically enforced, but up to our discretion)</p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Cancellations</p>
                      <p className="text-sm text-gray-600">50% fee for cancellations within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Late Arrivals</p>
                      <p className="text-sm text-gray-600">$15 late fee for arrivals 10+ minutes late</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Extended Stays</p>
                      <p className="text-sm text-gray-600">$15 boarding fee for stays over 2 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">No-Shows</p>
                      <p className="text-sm text-gray-600">No-show fee of 50% of service cost</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/policies"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Complete Policies
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-teal-500 dark:!from-blue-600 dark:!to-teal-500 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-emerald-100 mb-6">
                  Complete our grooming application to ensure we can provide the best experience for your dog.
                </p>
                <Link
                  href="/grooming-application"
                  className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Start Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Resources Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Blog Section */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-blue-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
              Expert Grooming Tips & Guides
            </h3>
            <p className="text-center text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              Learn from our professional groomers with in-depth articles on dog grooming best practices, breed-specific care, and seasonal grooming tips.
            </p>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Articles
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Related Services */}
          {/* Related Services - Polaroid Style */}
          <div className="mt-8 sm:mt-12 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-10 sm:mb-14">
                <p className="text-lg text-gray-500 mb-2">While you&apos;re here...</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Check Out Our Other Services
                </h3>
              </div>

              {/* Two Polaroid Cards */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                
                {/* Hiking Polaroid Card */}
                <div className="group">
                  <Link href="/dog-hikes" className="block">
                    {/* Polaroid Frame */}
                    <div className="relative bg-white p-3 pb-16 sm:p-4 sm:pb-20 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-rotate-2 group-hover:scale-[1.02]"
                         style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)' }}>
                      {/* Photo */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <Image
                          src="/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg"
                          alt="Happy pack of dogs on a trail adventure with River Paws"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ objectPosition: getImageObjectPosition("/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg") }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Handwritten Caption */}
                      <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 text-center">
                        <p className="text-base sm:text-lg text-gray-700 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>
                          Adventure awaits! 🌲🐕
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Service Info Below Polaroid */}
                  <div className="mt-5 sm:mt-6 text-center">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Adventure Dog Hikes</h4>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">Small group trails, big smiles, and the kind of tired that means a great day.</p>
                    <Link
                      href="/dog-hikes"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Explore Hiking
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Meet the Team Polaroid Card */}
                <div className="group">
                  <Link href="/caretakers" className="block">
                    {/* Polaroid Frame */}
                    <div className="relative bg-white p-3 pb-16 sm:p-4 sm:pb-20 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-2 group-hover:scale-[1.02]"
                         style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)' }}>
                      {/* Photo */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <Image
                          src="/Hiking/joyful-pack-social-hiking-madison-wi-river-paws.jpg"
                          alt="River Paws team with happy pack of dogs on the trails"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-pack-social-hiking-madison-wi-river-paws.jpg") }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Handwritten Caption */}
                      <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 text-center">
                        <p className="text-base sm:text-lg text-gray-700 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>
                          The crew! 🐾❤️
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Service Info Below Polaroid */}
                  <div className="mt-5 sm:mt-6 text-center">
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Meet Our Team</h4>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">The passionate people behind every adventure and spa day.</p>
                    <Link
                      href="/caretakers"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Meet the Pack Leaders
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Areas We Serve - Compact Design */}
          <div className="mt-12 bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Proudly Serving the Greater Madison Area</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Whether you&apos;re around the corner or across town, we&apos;re worth the drive. Learn more about grooming in your area:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/dog-grooming-waunakee" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-gray-700 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 hover:border-blue-200">
                    📍 Waunakee
                  </Link>
                  <Link href="/dog-grooming-madison" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-gray-700 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 hover:border-blue-200">
                    📍 Madison
                  </Link>
                  <Link href="/dog-grooming-middleton" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-gray-700 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 hover:border-blue-200">
                    📍 Middleton
                  </Link>
                  <Link href="/dog-grooming-deforest" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-gray-700 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 hover:border-blue-200">
                    📍 DeForest
                  </Link>
                  <Link href="/dog-grooming-sun-prairie" className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 text-gray-700 rounded-full text-sm font-medium transition-all duration-300 border border-blue-100 hover:border-blue-200">
                    📍 Sun Prairie
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🗺️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Guides - Polaroid Style Blog Cards */}
          <div className="mt-12 bg-gradient-to-b from-blue-50 to-white rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <p className="text-lg text-gray-500 mb-2">From our grooming experts...</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Tips & Guides for Happy Pups</h3>
            </div>
            
            {/* Polaroid-Style Blog Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Card 1 */}
              <Link href="/blog/5-signs-your-dog-needs-grooming" className="group">
                <div className="bg-white p-3 pb-6 rounded-sm shadow-lg hover:shadow-xl transition-all duration-500 transform group-hover:-rotate-1 group-hover:scale-[1.02]"
                     style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <Image
                      src="/Grooming/grooming-transformation-doodle-madison-wi-river-paws.jpg"
                      alt="Before and after grooming transformation"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="px-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mb-2">Grooming Tips</span>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">5 Signs Your Dog Needs Grooming</h4>
                  </div>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/blog/preparing-your-puppy-for-their-first-groom" className="group">
                <div className="bg-white p-3 pb-6 rounded-sm shadow-lg hover:shadow-xl transition-all duration-500 transform group-hover:rotate-1 group-hover:scale-[1.02]"
                     style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <Image
                      src="/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg"
                      alt="Happy puppy after first grooming"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: getImageObjectPosition("/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg") }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="px-1">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium mb-2">Puppy Care</span>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Preparing Your Puppy for Their First Groom</h4>
                  </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/blog/grooming-dogs-with-anxiety" className="group">
                <div className="bg-white p-3 pb-6 rounded-sm shadow-lg hover:shadow-xl transition-all duration-500 transform group-hover:-rotate-1 group-hover:scale-[1.02]"
                     style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <Image
                      src="/Grooming/freshly-groomed-doodle-mix-grooming-waunakee-wi-river-paws.jpg"
                      alt="Relaxed doodle mix during gentle grooming"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="px-1">
                    <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium mb-2">Stress-Free</span>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Grooming Dogs with Anxiety</h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* View All CTA */}
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="group inline-flex items-center px-6 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Browse All Grooming Guides
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}