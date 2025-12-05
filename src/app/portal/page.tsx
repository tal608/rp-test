"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { contactInfo } from "@/constants/social";
import ScrollIndicator from "@/components/ScrollIndicator";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function Portal() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Grooming/happy-husky-groomed-deforest-wi-river-paws.jpg"
            alt="Happy dog ready for their River Paws appointment"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Grooming/happy-husky-groomed-deforest-wi-river-paws.jpg") }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-teal-900/70 z-[1]"></div>
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
        <div
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob-delay-4 z-[3]"
          style={{ transform: `translate(${mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)` }}
        ></div>

        {/* Content */}
        <div className="relative z-[50] max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 py-2 animate-fadeInUp">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Online Booking</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Book Your Pup&apos;s</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Next Spa Day
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-2xl mx-auto animate-fadeInUp-delay-600 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Scheduling is easy—pick a service, choose a time, done. We&apos;ll handle the rest.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="booking-section" />
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 sm:px-8 py-5 sm:py-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Schedule Your Appointment</h2>
                  <p className="text-blue-100 text-sm sm:text-base">Select a service and pick a time that works for you</p>
                </div>
              </div>
            </div>

            {/* Booking Iframe */}
            <div className="p-4 sm:p-6">
              <div style={{ width: '100%', height: '800px' }}>
                <iframe
                  src="https://booking.moego.pet/ol/RiverPaws/book?utm_medium=embed"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Online booking for River Paws grooming and hiking services"
                  scrolling="no"
                  className="rounded-xl"
                  allow="payment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Time Booking Tips */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3">First Time Booking?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Here&apos;s what to know before your visit</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Tip 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Vaccination Records</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Please have your pup&apos;s current vaccination records ready. We require rabies and distemper/parvo for all visits.
              </p>
            </div>

            {/* Tip 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Arrival Time</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Please arrive on time for your appointment. If you&apos;re running late, give us a quick call so we can adjust.
              </p>
            </div>

            {/* Tip 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Cancellation Policy</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Life happens! Just give us 24 hours notice if you need to reschedule—it helps us serve everyone better.
              </p>
            </div>
          </div>

          {/* Link to full policies */}
          <div className="text-center mt-8">
            <Link 
              href="/policies" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View all policies & requirements
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl">
            {/* Decorative elements - contained within overflow-hidden */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Questions? We&apos;ve Got You.
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                If the online system is giving you trouble or you&apos;d rather talk to a human, we totally get it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg min-h-[48px]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {contactInfo.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 min-h-[48px]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send an Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
