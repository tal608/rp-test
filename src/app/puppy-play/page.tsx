"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import ScrollIndicator from "@/components/ScrollIndicator";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import PawCursorTrail from "@/components/PawCursorTrail";
import RotatingBadges from "@/components/RotatingBadges";

export default function PuppyPlay() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  const faqs = [
    {
      question: "What age puppies do you accept?",
      answer: "We accept puppies 12 weeks and older. By 12 weeks, puppies have typically received their initial vaccination series, making group socialization safer. While the critical socialization window begins earlier, there's still tremendous benefit to structured socialization through 16 weeks and beyond."
    },
    {
      question: "What if my puppy is shy or fearful?",
      answer: "Our trainers specialize in working with puppies of all temperaments. We use positive reinforcement techniques and go at your puppy's pace to build confidence gradually and safely."
    },
    {
      question: "Can I observe the sessions?",
      answer: "Yes! We encourage parents to observe sessions, especially initially. This helps you understand your puppy's behavior and learn how to reinforce the training at home."
    },
    {
      question: "What happens if my puppy isn't ready for group play?",
      answer: "If your puppy needs more individual attention, we can recommend private sessions or suggest waiting until they're more comfortable. Safety and positive experiences are our top priorities."
    },
    {
      question: "Is it too late if my puppy is older than 16 weeks?",
      answer: "Not at all! While the primary socialization window is 3-12 weeks, puppies continue to benefit from positive social experiences well beyond that. We accept puppies up to 6 months old, giving you time to take advantage of this important developmental period."
    }
  ];

  return (
    <>
      {/* Modern Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hiking/joyful-golden-retriever-pack-hiking-madison-wi-river-paws.jpg"
            alt="Joyful puppies playing and socializing at River Paws in Madison, Wisconsin"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-golden-retriever-pack-hiking-madison-wi-river-paws.jpg") }}
            priority
            sizes="100vw"
          />
          {/* Radial gradient overlay - creates spotlight effect */}
          <div className="absolute inset-0 z-[1] hero-spotlight-base"></div>
          {/* Color tint overlay - adds brand colors */}
          <div className="absolute inset-0 z-[1] hero-spotlight-color"></div>
        </div>

        {/* Floating elements with parallax */}
        <div
          className="absolute -top-10 -left-10 w-[280px] h-[280px] md:-top-20 md:-left-20 md:w-[500px] md:h-[500px] bg-emerald-500 rounded-full filter blur-[80px] md:blur-[100px] opacity-30 md:opacity-40 animate-blob z-[3]"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute top-10 -right-10 w-[250px] h-[250px] md:top-20 md:-right-20 md:w-[450px] md:h-[450px] bg-teal-500 rounded-full filter blur-[80px] md:blur-[100px] opacity-30 md:opacity-40 animate-blob-delay-2 z-[3]"
          style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute bottom-0 -left-10 w-[220px] h-[220px] md:left-1/4 md:w-[400px] md:h-[400px] bg-blue-500 rounded-full filter blur-[90px] md:blur-[120px] opacity-25 md:opacity-35 animate-blob z-[3]"
          style={{ transform: `translate(${mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)` }}
        ></div>

        {/* Paw print cursor trail */}
        <PawCursorTrail />

        <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-4 sm:space-y-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp drop-shadow-2xl">Where Puppies</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-200 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Learn to Play
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl mt-2 font-medium text-blue-100 animate-fadeInUp-delay-400 drop-shadow-md">
                Puppy Play &amp; Socialization at River Paws
              </span>
            </h1>

            <div className="animate-fadeInUp-delay-400">
              <RotatingBadges />
            </div>

            <p className="hero-description text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto animate-fadeInUp-delay-600 px-4 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              The foundation for a confident, well-socialized adult dog begins with positive early experiences.
              <span className="block mt-1 text-white/80">Professional socialization programs for puppies 12 weeks to 6 months.</span>
            </p>
            
            <div className="mt-8 inline-flex items-center bg-yellow-400/95 backdrop-blur-md rounded-full px-6 py-3 animate-fadeInUp-delay-600 border-2 border-yellow-300">
              <svg className="w-5 h-5 text-yellow-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-base font-semibold text-yellow-900">
                Limited Availability: Very occasional offering - No current availability
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeInUp-delay-800 pt-2">
              <Link
                href="/contact"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                <span className="relative z-10 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Inquire About Future Sessions
                </span>
              </Link>

              <a 
                href="tel:608-571-7297"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center min-h-[44px]"
                aria-label="Call River Paws at (608) 571-7297"
              >
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="relative z-10 flex items-center justify-center text-white group-hover:text-blue-600 transition-colors duration-300">
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
        <ScrollIndicator targetId="about-program-section" />
      </section>

      {/* About Program Section */}
      <section id="about-program-section" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          {/* Limited Availability Notice */}
          <div className="mb-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
            <p className="text-base font-semibold text-gray-800">
              <strong>Important:</strong> Puppy Play &amp; Socialization is a very occasional and limited offering that only happens once or twice a year. There is currently no availability. Please call us to inquire about future sessions.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Building Confident Puppies
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  The first year of your puppy&apos;s life is crucial for developing social skills,
                  confidence, and good behavior patterns. Our supervised puppy play sessions
                  provide the perfect environment for positive socialization and learning.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  We focus on age-appropriate activities that help puppies learn to interact
                  appropriately with other dogs and people, while having fun and building
                  confidence in a safe, controlled environment.
                  <strong className="text-gray-800"> Please note: This program is offered on a very limited basis, typically only once or twice per year.</strong>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Understanding Puppy Development</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Primary socialization window: 3-12 weeks of age</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Continued socialization benefits extend through 16 weeks and beyond</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Positive experiences help prevent fear and anxiety in adult dogs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/Hiking/happy-mixed-pack-social-dog-hiking-middleton-wi-river-paws.jpg"
                  alt="Happy puppies playing and socializing together at River Paws"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-sm font-medium">Building confidence, one play session at a time.</p>
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
                    <div className="font-semibold text-gray-800">Puppy Experts</div>
                    <div className="text-sm text-gray-600">Since 2017</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Details Cards */}
          <div className="mt-12 sm:mt-16 md:mt-24">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-12 md:mb-16">Program Details</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Age Groups */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Age Range</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">12-16 weeks</p>
                      <p className="text-sm text-gray-600">Introduction &amp; foundation building</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">4-5 months</p>
                      <p className="text-sm text-gray-600">Skill development &amp; play styles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">5-6 months</p>
                      <p className="text-sm text-gray-600">Confidence &amp; social refinement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Maximum age: 6 months</p>
                      <p className="text-sm text-gray-600">Older pups? Check out our hiking program!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Structure */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Session Structure</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">45-60 minutes</p>
                      <p className="text-sm text-gray-600">Supervised play time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Small groups</p>
                      <p className="text-sm text-gray-600">4-6 puppies maximum</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Individual attention</p>
                      <p className="text-sm text-gray-600">As needed for each puppy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Positive reinforcement</p>
                      <p className="text-sm text-gray-600">Training integrated naturally</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Activities Include</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Controlled introduction games</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Obstacle courses &amp; challenges</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Toy sharing exercises</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Basic obedience practice</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Confidence building challenges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Puppy Socialization */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Why Early Socialization Matters</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              The benefits of proper puppy socialization extend far beyond the first year,
              creating a foundation for a happy, well-adjusted adult dog.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Prevents Behavior Problems</h3>
              <p className="text-gray-600 leading-relaxed">
                Early socialization reduces the likelihood of fear-based behaviors, aggression,
                and anxiety in adult dogs. Puppies learn to handle new situations confidently.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Builds Lasting Confidence</h3>
              <p className="text-gray-600 leading-relaxed">
                Positive experiences help puppies develop into confident, well-adjusted adult dogs
                who handle new situations, people, and environments with ease.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Improves Social Skills</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn appropriate play behaviors and communication with other dogs and people.
                Develop proper social cues and boundaries from an early age.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Early Training Foundation</h3>
              <p className="text-gray-600 leading-relaxed">
                Basic obedience and manners training integrated into fun, engaging activities.
                Learning becomes natural and enjoyable for your puppy.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Reduces Separation Anxiety</h3>
              <p className="text-gray-600 leading-relaxed">
                Helps puppies learn to be comfortable away from their owners for short periods.
                Builds independence and reduces anxiety when left alone.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Strengthens Family Bond</h3>
              <p className="text-gray-600 leading-relaxed">
                Parents learn to understand their puppy&apos;s behavior and communication cues.
                Creates a stronger, more communicative relationship with your dog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Program Requirements</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Health and safety standards to ensure the best experience for your puppy and all participants.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16">
            {/* Vaccinations */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Vaccination Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Minimum age: 12 weeks</p>
                    <p className="text-sm text-gray-600">Ensures initial vaccine series is complete</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">DHPP vaccinations</p>
                    <p className="text-sm text-gray-600">Distemper, Hepatitis, Parvo, Parainfluenza</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Bordetella &amp; Rabies</p>
                    <p className="text-sm text-gray-600">Required for all participants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health & Safety */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Health &amp; Safety Standards</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Current flea/tick prevention</p>
                    <p className="text-sm text-gray-600">Up-to-date preventative medication</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">No contagious illnesses</p>
                    <p className="text-sm text-gray-600">Healthy and illness-free</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Appropriate weight for age</p>
                    <p className="text-sm text-gray-600">Neither underweight nor overweight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden">
            {/* Animated Blobs Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
              <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-emerald-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
            </div>
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-lg">Veterinary Clearance Required</h3>
              <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
                All puppies must have a veterinary check-up and be cleared for participation.
                We follow strict health and safety protocols to ensure a positive experience for all puppies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">What Puppy Parents Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Real stories from families who have seen their puppies transform through our socialization program.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sarah M.</h4>
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
                &ldquo;Our shy rescue puppy has blossomed into a confident, social butterfly thanks to River Paws puppy program.
                The trainers are amazing with young dogs and really know how to bring out the best in them.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Mike R.</h4>
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
                &ldquo;The socialization classes made all the difference for our energetic puppy. He now plays appropriately
                with other dogs and has learned so many important skills. Highly recommend!&rdquo;
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="group relative bg-white rounded-2xl border border-gray-200/50 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
                    style={{
                      transform: isOpen ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                  >
                    {/* Gradient accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-teal-500 to-emerald-500 transition-all duration-500 ${
                      isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    
                    {/* Background gradient on hover/open */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/0 via-emerald-50/0 to-teal-50/0 transition-all duration-500 ${
                      isOpen ? 'from-blue-50/30 via-emerald-50/20 to-teal-50/30 group-hover:from-blue-50/40' : 'group-hover:from-blue-50/20 group-hover:via-emerald-50/10 group-hover:to-teal-50/20'
                    }`}></div>

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="relative w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-left flex items-center justify-between gap-3 sm:gap-4 group/button"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        {/* Icon wrapper */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isOpen 
                            ? 'bg-gradient-to-br from-blue-600 to-emerald-600 text-white scale-110' 
                            : 'bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-600 group-hover/button:scale-110 group-hover/button:rotate-6'
                        }`}>
                          <svg 
                            className="w-5 h-5 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d={isOpen 
                                ? "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                                : "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              } 
                            />
                          </svg>
                        </div>
                        
                        <span className={`font-semibold text-lg transition-all duration-300 flex-1 ${
                          isOpen ? 'text-gray-900' : 'text-gray-800 group-hover/button:text-blue-600'
                        }`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isOpen 
                          ? 'bg-gradient-to-br from-blue-600 to-teal-500 text-white rotate-180 scale-110' 
                          : 'bg-gray-100 text-gray-500 group-hover/button:bg-blue-100 group-hover/button:text-blue-600 group-hover/button:scale-110'
                      }`}>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    <div 
                      id={`faq-answer-${index}`}
                      aria-labelledby={`faq-question-${index}`}
                      className={`relative overflow-hidden transition-all duration-500 ${
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-8 pb-6 pl-20">
                        <div className={`prose prose-lg text-gray-700 leading-relaxed transition-all duration-500 ${
                          isOpen ? 'translate-y-0' : '-translate-y-2'
                        }`}>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gallery Preview */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                See the fun for yourself
              </h3>
              <p className="text-lg text-blue-600 font-semibold">Every puppy has a story.</p>
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
                          src="/Hiking/curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg"
                          alt="Curious puppies exploring together"
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
                          src="/Hiking/joyful-golden-retrievers-wilderness-trails-waunakee-wi-river-paws.jpg"
                          alt="Joyful puppies playing on the trails"
                          fill
                          className="object-cover"
                          sizes="224px"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Front polaroid - center */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-52 h-60 sm:w-64 sm:h-72 bg-white rounded shadow-2xl transform rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 z-10 overflow-hidden">
                    <div className="p-2 pb-10 h-full">
                      <div className="relative w-full h-full rounded-sm overflow-hidden">
                        <Image
                          src="/Hiking/playful-golden-retriever-adventure-park-sun-prairie-wi-river-paws.jpg"
                          alt="Playful puppy having fun at River Paws"
                          fill
                          className="object-cover"
                          sizes="256px"
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-0 right-0 text-center text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>Making friends! 🐾</span>
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
                Browse Our Photo Gallery
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-sm text-gray-500 mt-3">100+ photos of happy pups in our gallery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services - Polaroid Style */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <p className="text-lg text-gray-500 mb-2">While you&apos;re here...</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Check Out Our Other Services
            </h2>
          </div>

          {/* Two Polaroid Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            
            {/* Grooming Polaroid Card */}
            <div className="group">
              <Link href="/dog-grooming" className="block">
                {/* Polaroid Frame */}
                <div className="relative bg-white p-3 pb-16 sm:p-4 sm:pb-20 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-rotate-2 group-hover:scale-[1.02]"
                     style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)' }}>
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src="/Grooming/freshly-groomed-doodle-salon-waunakee-wi-river-paws.jpg"
                      alt="Freshly groomed doodle looking fabulous at River Paws"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Handwritten Caption */}
                  <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 text-center">
                    <p className="text-base sm:text-lg text-gray-700 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>
                      Spa day, anyone? 🛁✨
                    </p>
                  </div>
                </div>
              </Link>
              
              {/* Service Info Below Polaroid */}
              <div className="mt-5 sm:mt-6 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Professional Grooming</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Bath &amp; brush, full grooms, and that fresh-from-the-salon feeling.</p>
                <Link
                  href="/dog-grooming"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Explore Grooming
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Hiking Polaroid Card */}
            <div className="group">
              <Link href="/dog-hikes" className="block">
                {/* Polaroid Frame */}
                <div className="relative bg-white p-3 pb-16 sm:p-4 sm:pb-20 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:rotate-2 group-hover:scale-[1.02]"
                     style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)' }}>
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src="/Hiking/joyful-mixed-pack-hiking-waunakee-wi-river-paws.jpg"
                      alt="Happy pack of dogs on a trail adventure with River Paws"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-mixed-pack-hiking-waunakee-wi-river-paws.jpg") }}
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
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Adventure Dog Hikes</h3>
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
          </div>
        </div>
      </section>
    </>
  );
}
