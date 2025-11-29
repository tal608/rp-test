"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { groomingFaqs } from "@/constants/faqs";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import TeamStats from "@/components/TeamStats";
import FAQSection from "@/components/FAQSection";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

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
      {/* Modern Hero Section */}
      {/* IMAGE_PLACEMENT_START: dog-grooming-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-6 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Dog Grooming", href: "/dog-grooming" },
            ]}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
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

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Every Tail Gets</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  The Royal Treatment
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl mt-6 font-medium text-blue-100 animate-fadeInUp-delay-600 drop-shadow-md">
                at River Paws Dog Grooming
              </span>
          </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Experience professional grooming that puts your dog&apos;s comfort and happiness first. 
              Our experienced, gentle groomers treat every pet like family. Located on the edge of Waunakee and Madison, 
              we serve pet owners from Middleton, DeForest, Sun Prairie, and throughout the greater Madison area with compassionate, expert care since 2017.
              <span className="block mt-2 text-yellow-200 font-semibold">Find professional dog grooming near you!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
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
        <ScrollIndicator targetId="philosophy-section" />
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
                  Since 2017, River Paws has been the premier destination for professional grooming throughout Waunakee, Madison, and surrounding communities 
                  including Middleton, DeForest, and Sun Prairie. Whether you're searching for a professional dog groomer, pet groomer, dog salon, or dog spa experience in Waunakee, Madison, Middleton, DeForest, or Sun Prairie, 
                  our experienced team provides spa-quality grooming services tailored to your dog's specific needs.
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
                  <div className="text-3xl font-bold text-emerald-600 mb-2">7</div>
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
                  src="/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg"
                  alt="A happy Bernese Mountain Dog mix wearing a green bandana after grooming at River Paws in Madison, Wisconsin."
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 40%' }}
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

      {/* Walk-In Grooming & Services */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Professional Grooming Services</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Enrichment-focused grooming that puts your dog&apos;s comfort first.
              All services use premium, pet-safe products.
            </p>
          </div>

          {/* Book Appointment Banner */}
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center mb-8 sm:mb-12 md:mb-16 overflow-hidden group">
            {/* Animated Blobs Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
              <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
              <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
            </div>
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg">Book Your Grooming Appointment</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto drop-shadow-md">
                All grooming services are by appointment only. Call us or book online to schedule
                your pup&apos;s next pampering session with your preferred groomer.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call (608) 571-PAWS</span>
                </div>
                <div className="flex items-center">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Appointments Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            {/* IMAGE_PLACEMENT_START: dog-grooming-a-la-carte-card */}
            {/* À La Carte */}
            <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/Grooming/groomed-poodle-grooming-waunakee-wi-river-paws.jpg"
                  alt="Freshly groomed poodle at River Paws grooming salon in Waunakee"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: getImageObjectPosition("/Grooming/groomed-poodle-grooming-waunakee-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-xs font-medium">Individual grooming services.</p>
                </div>
              </div>
              {/* IMAGE_PLACEMENT_END: dog-grooming-a-la-carte-card */}
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">À La Carte Services</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Individual grooming services for specific needs. Perfect for maintaining your dog&apos;s health
                and appearance between full grooming sessions.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pawdicure (Nail Trim, Nail Grind, Ear Cleaning)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Nail Trim
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Nail Grind
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Teeth Brushing
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Anal Gland Expression
                </li>
              </ul>
            </div>

            {/* IMAGE_PLACEMENT_START: dog-grooming-bath-brush-card */}
            {/* Bath and Brush */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg"
                  alt="Pampered spaniel enjoying bath at River Paws grooming salon in Waunakee"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: getImageObjectPosition("/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-xs font-medium">Complete bathing and brushing.</p>
                </div>
              </div>
              {/* IMAGE_PLACEMENT_END: dog-grooming-bath-brush-card */}
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Bath & Brush Package</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Complete bathing and brushing service with professional grooming essentials.
                Perfect for maintaining healthy coat and skin.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Bath (Premium Shampoo &amp; Conditioning)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Blow Out
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Brush Out
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Nail Trim
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ear Cleaning
                </li>
              </ul>
            </div>

            {/* IMAGE_PLACEMENT_START: dog-grooming-full-service-card */}
            {/* Full Body Groom */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/Grooming/freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg"
                  alt="Freshly groomed goldendoodle at River Paws grooming salon in Madison"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: getImageObjectPosition("/Grooming/freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-xs font-medium">Complete professional grooming.</p>
                </div>
              </div>
              {/* IMAGE_PLACEMENT_END: dog-grooming-full-service-card */}
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Full Body Groom</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Complete professional grooming experience with everything your dog needs
                for optimal health, comfort, and style.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Bath (Premium Shampoo &amp; Conditioning)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Blow Out
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Brush Out
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Nail Trim
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ear Cleaning
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full Body Haircut
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing Note */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Transparent Pricing</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prices are based on your dog&apos;s breed, size, weight, coat condition, and specific services needed.
              We provide detailed quotes and never charge hidden fees.
            </p>
            <div className="mt-6">
              <Link
                href="/grooming-application"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 text-white rounded-full font-medium text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden group relative min-h-[44px]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                  background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.3), transparent)' 
                }}></span>
                <span className="relative z-10 flex items-center">
                  Get Your Custom Quote
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose River Paws */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Why Choose River Paws?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Experience the difference that experienced, compassionate grooming makes for your beloved pet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Experienced Professionals</h3>
              <p className="text-gray-600 leading-relaxed">
                Our groomers are experienced, trained professionals with years of hands-on experience,
                ensuring your dog receives the highest quality care and attention.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Stress-Free Environment</h3>
              <p className="text-gray-600 leading-relaxed">
                Our experienced groomers work at your dog&apos;s pace, using gentle techniques
                and positive reinforcement to ensure a comfortable grooming experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Complete Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Full transparency about your dog&apos;s coat health, care recommendations,
                and detailed explanations of all services and pricing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Premium Products</h3>
              <p className="text-gray-600 leading-relaxed">
                We use only top-quality, pet-safe grooming products and professional-grade
                equipment to ensure the best results for your dog.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Convenient Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Located on the edge of Waunakee and Madison, we're an easy drive from throughout the greater Madison area, 
                including Middleton, DeForest, and Sun Prairie. Convenient parking makes drop-off and pick-up a breeze.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Flexible Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">
                We work with your schedule to find appointment times that work for you and your dog.
                Call us to discuss availability and scheduling options.
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
                  Email vaccination records to riverpawsgrooming@gmail.com or bring a copy when you drop off.
                  Records must be current for your dog&apos;s safety and our facility requirements.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white">
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
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Important Policies</h3>
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

              <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white text-center">
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

      {/* Testimonials & FAQ */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">What Our Clients Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Don&apos;t just take our word for it - hear from the families who trust us with their beloved pets.
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
            <FAQSchema faqs={groomingFaqs} />
          </div>

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
          <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-10">
              Explore Our Other Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Hiking Portal Card */}
              <Link
                href="/dog-hikes"
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src="/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg"
                  alt="Adventure Dog Hikes"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: getImageObjectPosition("/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute top-6 left-6 w-14 h-14 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h4 className="text-3xl font-bold text-white mb-3 group-hover:translate-y-[-4px] transition-transform duration-300">
                    Adventure Dog Hikes
                  </h4>
                  <p className="text-emerald-50 text-lg mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    Small group hiking adventures for your dog. Exercise, socialization, and fun!
                  </p>
                  <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    View Hiking Services
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Team Portal Card */}
              <Link
                href="/caretakers"
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src="/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg"
                  alt="River Paws team members"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: getImageObjectPosition("/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute top-6 left-6 w-14 h-14 bg-white/95 force-bg-white backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h4 className="text-3xl font-bold text-white mb-3 group-hover:translate-y-[-4px] transition-transform duration-300">
                    Meet Our Team
                  </h4>
                  <p className="text-blue-50 text-lg mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    Learn about our experienced, trained professionals who care for your pets.
                  </p>
                  <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Meet the Pack Leaders
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>

            </div>
          </div>

          {/* Dog Grooming Resources & Topic Clusters */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Dog Grooming Resources & Guides
            </h3>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore detailed guides, expert articles, and location-specific grooming information:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-puppy */}
              {/* Puppy Grooming */}
              <Link
                href="/puppy-grooming"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg"
                    alt="A happy, freshly groomed Pomeranian wearing a watermelon bandana at a River Paws grooming salon in Waunakee, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-puppy */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Puppy Grooming
                    </h4>
                    <p className="text-sm text-white/90">
                      Early grooming for puppies starting at 12 weeks
                    </p>
                  </div>
                </div>
              </Link>

              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-canine-products */}
              {/* Canine Grooming Products */}
              <Link
                href="/canine-grooming"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/freshcut-doodle-grooming-waunakee-wi-river-paws.jpg"
                    alt="A freshly groomed black and white doodle dog calmly poses in a River Paws grooming salon in Waunakee, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/freshcut-doodle-grooming-waunakee-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-canine-products */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Canine Grooming Products
                    </h4>
                    <p className="text-sm text-white/90">
                      Guide to best brushes, shampoos & tools
                    </p>
                  </div>
                </div>
              </Link>

              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-madison */}
              {/* Madison */}
              <Link
                href="/dog-grooming-madison"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/grooming-transformation-doodle-madison-wi-river-paws.jpg"
                    alt="A doodle's transformation from muddy outdoor play to a happy, freshly groomed look at River Paws in Madison, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/grooming-transformation-doodle-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-madison */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Dog Grooming Madison
                    </h4>
                    <p className="text-sm text-white/90">
                      Benefits of regular grooming
                    </p>
                  </div>
                </div>
              </Link>

              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-waunakee */}
              {/* Waunakee */}
              <Link
                href="/dog-grooming-waunakee"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg"
                    alt="A pampered Spaniel dog fresh from a bath, wrapped in a towel in a grooming tub, receiving gentle care from River Paws in Waunakee, WI."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-waunakee */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Dog Grooming Waunakee
                    </h4>
                    <p className="text-sm text-white/90">
                      Products & puppy grooming FAQs
                    </p>
                  </div>
                </div>
              </Link>

              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-deforest */}
              {/* DeForest */}
              <Link
                href="/dog-grooming-deforest"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/happy-husky-groomed-deforest-wi-river-paws.jpg"
                    alt="A happy Siberian Husky with a fresh grooming and an orange bandana, cared for by River Paws in DeForest, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/happy-husky-groomed-deforest-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-deforest */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Dog Grooming DeForest
                    </h4>
                    <p className="text-sm text-white/90">
                      Post-dog park grooming
                    </p>
                  </div>
                </div>
              </Link>

              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-sun-prairie */}
              {/* Sun Prairie */}
              <Link
                href="/dog-grooming-sun-prairie"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/curious-maltipoo-grooming-tub-sun-prairie-wi-river-paws.jpg"
                    alt="A fluffy Maltipoo with its tongue out, curiously peeking from a grooming tub at River Paws in Sun Prairie, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/curious-maltipoo-grooming-tub-sun-prairie-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-sun-prairie */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Dog Grooming Sun Prairie
                    </h4>
                    <p className="text-sm text-white/90">
                      Before & after appointment tips
                    </p>
                  </div>
                </div>
              </Link>

              {/* IMAGE_PLACEMENT_START: dog-grooming-resources-middleton */}
              {/* Middleton */}
              <Link
                href="/dog-grooming-middleton"
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src="/Grooming/groomed-poodle-grooming-waunakee-wi-river-paws.jpg"
                    alt="A freshly groomed Poodle mix sits calmly on a table after a River Paws grooming session in Waunakee, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/groomed-poodle-grooming-waunakee-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-grooming-resources-middleton */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      Dog Grooming Middleton
                    </h4>
                    <p className="text-sm text-white/90">
                      Bathing tips at home
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Blog Articles Topic Cluster */}
            <div className="mt-12 pt-12 border-t border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Expert Grooming Guides & Articles
              </h4>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Learn from our professional groomers with these comprehensive guides:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/blog/5-signs-your-dog-needs-grooming"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Grooming Tips
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    5 Signs Your Dog Needs Grooming
                  </h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Learn the key signs that indicate your dog needs professional grooming attention.
                  </p>
                </Link>

                <Link
                  href="/blog/how-often-should-you-groom-your-dog"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Grooming Schedule
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    How Often Should You Groom Your Dog?
                  </h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Discover the ideal grooming frequency based on breed, coat type, and lifestyle.
                  </p>
                </Link>

                <Link
                  href="/blog/best-grooming-practices-for-different-dog-breeds"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Breed Guide
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    Best Grooming Practices for Different Dog Breeds
                  </h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Comprehensive breed-specific grooming guide for every dog breed.
                  </p>
                </Link>

                <Link
                  href="/blog/preparing-your-puppy-for-their-first-groom"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Puppy Care
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    Preparing Your Puppy for Their First Groom
                  </h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Essential tips for creating positive first grooming experiences for puppies.
                  </p>
                </Link>

                <Link
                  href="/blog/grooming-dogs-with-anxiety"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Stress-Free
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    Grooming Dogs with Anxiety
                  </h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Gentle techniques and strategies for stress-free grooming of anxious dogs.
                  </p>
                </Link>

                <Link
                  href="/blog/understanding-dog-behavior-during-grooming"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Behavior
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    Understanding Dog Behavior During Grooming
                  </h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Learn to read your dog's signals and body language during grooming.
                  </p>
                </Link>
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View All Grooming Articles
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}