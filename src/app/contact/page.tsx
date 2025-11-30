"use client";

import Image from "next/image";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { contactInfo } from "@/constants/social";
import ScrollIndicator from "@/components/ScrollIndicator";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import FAQSchema from "@/components/FAQSchema";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  // Voice-search optimized FAQs - conversational questions people actually ask
  const voiceFaqs = [
    {
      question: "Where is River Paws located?",
      answer: "River Paws is located at 5305 River Road in Waunakee, Wisconsin. We're on the border of Waunakee and Madison, just 500 feet from Yahara Heights Dog Park.",
    },
    {
      question: "What is the phone number for River Paws?",
      answer: "You can reach River Paws at (608) 571-7297. That's 608-571-PAWS.",
    },
    {
      question: "What are River Paws hours?",
      answer: "River Paws is open Monday through Friday from 8:00 AM to 4:30 PM. We are closed on weekends.",
    },
    {
      question: "How do I book a grooming appointment at River Paws?",
      answer: "You can book a grooming appointment online at booking.moego.pet/ol/RiverPaws/book or by calling (608) 571-7297.",
    },
    {
      question: "Does River Paws accept walk-ins?",
      answer: "No, River Paws is by appointment only. We do not accept walk-in services. Please book online or call ahead to schedule your appointment.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Contact", url: "https://www.riverpaws.dog/contact" },
        ]}
      />
      <SpeakableSchema
        name="Contact River Paws Dog Grooming"
        url="https://www.riverpaws.dog/contact"
        cssSelectors={["h1", ".contact-info", ".business-hours", ".location-address"]}
      />
      <FAQSchema faqs={voiceFaqs} />

      {/* Modern Hero Section */}
      {/* IMAGE_PLACEMENT_START: contact-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-6 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
          />
        </div>
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Madison dog hiking5.jpg"
            alt="Contact River Paws dog grooming and hiking services in Waunakee, Wisconsin serving Madison, Middleton, DeForest, and Sun Prairie"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* IMAGE_PLACEMENT_END: contact-hero */}
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
              <span className="text-xs sm:text-sm font-medium text-gray-700">Get In Touch With Us</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Journey Over to</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  River Paws
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl mt-6 font-medium text-blue-100 animate-fadeInUp-delay-600 drop-shadow-md">
                for Dog Grooming & Hiking in Waunakee
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-600 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Ready to give your pet the care they deserve? We&apos;re here to help make your pet&apos;s experience exceptional. 
              Have questions? Want to schedule an appointment? We&apos;d love to hear from you. Located on the edge of Waunakee and Madison, 
              we serve pet owners from Middleton, DeForest, Sun Prairie, and throughout the greater Madison area.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
                      <a 
                href={`tel:${contactInfo.phone}`}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center min-h-[44px]"
                aria-label={`Call River Paws at ${contactInfo.phoneDisplay}`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                  background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.3), transparent)' 
                }}></span>
                <span className="relative z-10 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {contactInfo.phoneDisplay}
                </span>
              </a>

              <a 
                href={`mailto:${contactInfo.email}`}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center min-h-[44px]"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send a Message
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="contact-info-section" />
      </section>

      {/* Contact Information & Map */}
      <section id="contact-info-section" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-stretch">
            {/* Contact Information */}
            <div className="space-y-8 flex flex-col">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Get In Touch
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Ready to give your pet the care they deserve? Contact us today to schedule
                  an appointment or learn more about our services.
                </p>
              </div>

              {/* Contact Details Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        {contactInfo.phoneDisplay}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Monday - Friday: 8:00 AM - 4:30 PM<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        {contactInfo.email}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">
                      5305 River Road<br />
                      Waunakee, WI 53597
                    </p>
                    <p className="text-sm text-gray-500 mt-1 mb-4">
                      Located on the edge of Waunakee and Madison, serving pet owners from Middleton, DeForest, Sun Prairie, and throughout the area. 
                      Conveniently located just 500 feet from Yahara Heights Dog Park - perfect for post-dog park grooming visits!
                    </p>
                    <GetDirectionsButton className="w-full sm:w-auto" />
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Stay connected with us on social media for updates, photos, and more!
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.facebook.com/yaharariverpaws"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center hover:from-blue-200 hover:to-teal-200 transition-all duration-300 hover:scale-110"
                        aria-label="Visit our Facebook page"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/riverpaws.dog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center hover:from-blue-200 hover:to-teal-200 transition-all duration-300 hover:scale-110"
                        aria-label="Visit our Instagram page"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.tiktok.com/@riverpawsdogs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center hover:from-blue-200 hover:to-teal-200 transition-all duration-300 hover:scale-110"
                        aria-label="Visit our TikTok page"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.yelp.com/biz/river-paws-waunakee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center hover:from-blue-200 hover:to-teal-200 transition-all duration-300 hover:scale-110"
                        aria-label="Visit our Yelp page"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.16 7.76c-.27-.67-.55-1.31-1.07-1.77-.71-.63-1.68-1.04-2.92-1.35-1.21-.29-2.76-.57-4.47-.73l-.86-1.94c-.09-.19-.25-.34-.44-.44L8.5 1.03c-.24-.13-.51-.13-.75 0L4.5 2.58c-.19.1-.35.25-.44.44l-.86 1.94c-1.71.16-3.26.44-4.47.73-1.24.31-2.21.72-2.92 1.35-.52.46-.8 1.1-1.07 1.77-.28.69-.43 1.37-.58 2.05-.15.67-.29 1.34-.24 1.98.05.65.23 1.27.55 1.84.25.44.55.84.92 1.19.36.34.77.63 1.21.87.44.24.91.42 1.39.57.48.14.98.24 1.48.32.51.08 1.02.14 1.53.18.51.04 1.03.06 1.54.07.51.01 1.02.01 1.53 0 .51-.01 1.03-.03 1.54-.07.51-.04 1.02-.1 1.53-.18.5-.08 1-.18 1.48-.32.48-.15.95-.33 1.39-.57.44-.24.85-.53 1.21-.87.37-.35.67-.75.92-1.19.32-.57.5-1.19.55-1.84.05-.64-.09-1.31-.24-1.98-.15-.68-.3-1.36-.58-2.05zM12 5.5c-3.58 0-6.5 2.92-6.5 6.5s2.92 6.5 6.5 6.5 6.5-2.92 6.5-6.5S15.58 5.5 12 5.5zm0 11c-2.48 0-4.5-2.02-4.5-4.5S9.52 8.5 12 8.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday</span>
                    <span className="font-medium">8:00 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuesday</span>
                    <span className="font-medium">8:00 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wednesday</span>
                    <span className="font-medium">8:00 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thursday</span>
                    <span className="font-medium">8:00 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-medium">8:00 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps & Visuals */}
            <div className="flex flex-col gap-6 h-full">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                <div className="aspect-[4/3] w-full">
                  {/* Google Maps Embed */}
                  {/* Google Maps Embed - Update this URL with the embed code from your live site or get it from: */}
                  {/* Go to Google Maps > Search "5305 River Road, Waunakee, WI" > Share > Embed a map > Copy the URL */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.123!2d-89.445123!3d43.191789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8807a3f9b9b9b9b9%3A0x1234567890abcdef!2s5305%20River%20Rd%2C%20Waunakee%2C%20WI%2053597!5e0!3m2!1sen!2sus!4v1698000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="River Paws Location - 5305 River Road, Waunakee, WI 53597"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Getting Here</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      We're located at <span className="font-semibold text-gray-900">5305 River Road</span>, right on the border of Waunakee and Madison.
                      Look for us just 500 feet from the Yahara Heights Dog Park entrance!
                    </p>
                    <div className="mt-4">
                      <GetDirectionsButton />
                    </div>
                  </div>
                </div>
              </div>

              {/* Soulful Lab Image */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative flex-1 min-h-[300px]">
                <Image 
                  src="/Hiking/soulful-lab-mix-dog-hiking-madison-wi-river-paws.jpg" 
                  alt="Soulful Lab mix enjoying a peaceful moment in Madison nature"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: getImageObjectPosition("/Hiking/soulful-lab-mix-dog-hiking-madison-wi-river-paws.jpg") }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-medium text-lg drop-shadow-md">We can&apos;t wait to meet you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-red-50/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-lg border border-red-100 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Contact</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                For urgent situations during business hours, please call us directly.
                <br/>
                <span className="text-sm text-gray-500 mt-2 block">
                  If this is a medical emergency, please contact your veterinarian immediately.
                </span>
              </p>
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-red-100"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {contactInfo.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 