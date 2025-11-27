"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import ScrollIndicator from "@/components/ScrollIndicator";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function Apply() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Apply", url: "https://www.riverpaws.dog/apply" },
        ]}
      />
      
      {/* Modern Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-6 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Apply", href: "/apply" },
            ]}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
          />
        </div>
        
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Madison dog hiking1.jpg"
            alt="Enroll your dog at River Paws - Professional grooming and adventure hiking services"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
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
              <span className="text-xs sm:text-sm font-medium text-gray-700">Trusted by 2000+ Local Families Since 2017</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Apply for</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Services
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl mt-6 font-medium text-blue-100 animate-fadeInUp-delay-600 drop-shadow-md">
                Dog Grooming & Hiking at River Paws
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Ready to give your dog a safe, fun environment with supervised play and professional care?
              Choose your service below to start the enrollment process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
              <Link
                href="/dog-hike-scheduling"
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
                  background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.3), transparent)' 
                }}></span>
                <span className="relative z-10 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Apply for Hiking
                </span>
              </Link>

              <Link
                href="/grooming-application"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[44px] flex items-center justify-center"
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
                <span className="relative z-10 flex items-center justify-center text-white group-hover:text-blue-600 transition-colors duration-300">
                  <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Apply for Grooming
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="service-options" />
      </section>

      {/* Service Options */}
      <section id="service-options" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Service
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Select the service that best fits your dog&apos;s needs and start the enrollment process today.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Dog Hikes - Primary */}
            <div className="group relative rounded-2xl border-2 border-blue-600 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">🐾</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Adventure Dog Hikes</h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    Small-group hiking adventures on private trails near Madison and Waunakee. This isn&apos;t dog walking. It&apos;s your pup&apos;s new favorite days of the week.
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Small group hikes (2-5 dogs)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Professional supervision</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Private trails and parks</span>
                  </div>
                </div>
                <Link
                  href="/dog-hike-scheduling"
                  className="block w-full text-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-teal-600 hover:shadow-xl transition-all duration-300 min-h-[44px] text-base sm:text-lg transform hover:scale-105"
                >
                  Apply for Hiking →
                </Link>
              </div>
            </div>

            {/* Dog Grooming */}
            <div className="group relative rounded-2xl border-2 border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 bg-white overflow-hidden transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">✂️</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Dog Grooming</h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    Professional grooming services tailored to your dog&apos;s breed, size, and personality.
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Full body grooming</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Bath & brush services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">À la carte options</span>
                  </div>
                </div>
                <Link
                  href="/grooming-application"
                  className="block w-full text-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-teal-600 hover:shadow-xl transition-all duration-300 min-h-[44px] text-base sm:text-lg transform hover:scale-105"
                >
                  Apply for Grooming →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple Application Process
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started is easy. Follow these three simple steps to enroll your dog.
            </p>
          </div>
          
          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 to-teal-200 border-t-2 border-dashed border-blue-200/50 -z-10"></div>

            <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Submit Application</h3>
              <p className="text-gray-600 leading-relaxed">
                Fill out our detailed application form with your information and your dog&apos;s details. It only takes a few minutes.
              </p>
            </div>
            
            <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full mb-6 text-2xl font-bold shadow-lg ring-4 ring-white">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Review &amp; Confirmation</h3>
              <p className="text-gray-600 leading-relaxed">
                We&apos;ll review your details to ensure the best fit. For hiking, we&apos;ll schedule an assessment. For grooming, we&apos;ll confirm your appointment.
              </p>
            </div>
            
            <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full mb-6 text-2xl font-bold shadow-lg ring-4 ring-white">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Start Services</h3>
              <p className="text-gray-600 leading-relaxed">
                Once approved, the adventure begins! Your dog will love the experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Important Requirements
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                To ensure the safety and well-being of all dogs, we require the following:
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vaccinations Required
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Rabies</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bordetella</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Distemper</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Age Guidelines
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Grooming: 12 weeks minimum</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hiking: 6 months minimum</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Special considerations for seniors</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200 border-l-4 border-l-blue-500 shadow-md">
              <p className="text-base sm:text-lg text-blue-900 flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  <strong>Note:</strong> All dogs must complete a behavior evaluation before participating in services.
                  We specialize in working with dogs of all temperaments and will work with you to ensure a positive experience.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Our team is here to help you understand our services and application process.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 min-h-[44px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
          >
            <span className="absolute inset-0 rounded-full bg-blue-600/10 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
              background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.2), transparent)' 
            }}></span>
            <span className="relative z-10 flex items-center">
              Contact Us
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
