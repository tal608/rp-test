"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import { hikingVoiceFaqs, formatForFAQSchema } from "@/constants/voiceSearchFaqs";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import PawCursorTrail from "@/components/PawCursorTrail";
import RotatingBadges from "@/components/RotatingBadges";

export default function DogHikes() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  const faqs = [
    {
      question: "What if it rains?",
      answer: "We adapt to Madison's unpredictable weather by adjusting routes or rescheduling when conditions aren't safe or enjoyable for your pup.",
    },
    {
      question: "How many dogs per group?",
      answer: "We keep groups small—just 4-6 dogs per handler—ensuring personalized attention and safer, more meaningful interactions.",
    },
    {
      question: "What does my dog need to join?",
      answer: "Current vaccinations (rabies, DHPP, bordetella), good recall skills, and a love for outdoor adventure. Not sure if your pup is ready? Book a Monday assessment hike!",
    },
    {
      question: "How do I get started?",
      answer: "Please note: We are currently at capacity and not accepting new dogs. You can apply to join our waitlist for future availability. Contact us to be added to the waitlist. Once space opens, we'll schedule a trial assessment hike to evaluate your dog's fit for the program.",
    },
    {
      question: "Is my dog a good fit?",
      answer: "Most dogs love our hikes! If your pup enjoys being outdoors, gets along reasonably well with other dogs, and has basic recall, they'll likely thrive. Dogs who are reactive are not a fit for us, but depending upon the situation, we may accept a dog for a private hike instead.",
    },
  ];

  return (
    <>
      <ServiceSchema serviceType="hiking" />
      <FAQSchema faqs={[...faqs, ...formatForFAQSchema(hikingVoiceFaqs)]} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Hiking", url: "https://www.riverpaws.dog/dog-hikes" },
        ]}
      />
      <SpeakableSchema
        name="Dog Hiking Services Near Madison"
        url="https://www.riverpaws.dog/dog-hikes"
        cssSelectors={["h1", ".hero-description", ".service-intro", ".faq-answer"]}
      />

      {/* Modern Hero Section */}
      {/* IMAGE_PLACEMENT_START: dog-hikes-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-20 left-4 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Hiking", href: "/dog-hikes" },
            ]}
            compact
            className="bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md"
          />
        </div>
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hiking/joyful-australian-shepherd-dog-hiking-sun-prairie-wi-river-paws.jpg"
            alt="Joyful Aussie building confidence serving Sun Prairie families at professionally supervised wilderness trails"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-australian-shepherd-dog-hiking-sun-prairie-wi-river-paws.jpg") }}
            priority
          />
          {/* IMAGE_PLACEMENT_END: dog-hikes-hero */}
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
              <span className="block text-white animate-fadeInUp drop-shadow-2xl">Where Madison</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-200 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Dogs Run Free
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl mt-2 font-medium text-blue-100 animate-fadeInUp-delay-400 drop-shadow-md">
                on River Paws Adventure Hikes
              </span>
            </h1>

            <div className="animate-fadeInUp-delay-400">
              <RotatingBadges />
            </div>

            <p className="hero-description text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto animate-fadeInUp-delay-600 px-4 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Your dog isn&apos;t built for four walls—they&apos;re built for adventure.
              <span className="block mt-1 text-white/80">We swap daycare chaos for private trails where dogs run free, explore nature, and come home the happiest version of themselves.</span>
              <span className="block mt-3 text-yellow-200 font-semibold text-lg sm:text-xl">Professional dog hiking near you!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeInUp-delay-800 pt-2">
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
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                  background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.3), transparent)' 
                }}></span>
                <span className="relative z-10 flex items-center justify-center text-blue-700 group-hover:text-white transition-colors duration-300">
                  <Image
                    src="/Logos/paw only 72.png"
                    alt=""
                    width={20}
                    height={20}
                    className="mr-2 w-5 h-5 object-contain group-hover:rotate-12 transition-transform duration-300"
                  />
                  Join our Waitlist
                </span>
              </Link>

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

      {/* About Program & Day in Life */}
      <section id="about-program-section" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Why Our Dog Hikes Beat Traditional Daycare
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Traditional daycare has its place, but some dogs need more—outdoor adventure that taps into their natural instincts. Instead of enclosed rooms and constant chaos, our hikes offer freedom to roam, explore, and bond in nature.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Here&apos;s why Madison area pet parents are choosing trails over daycare rooms:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Hundreds</div>
                  <div className="text-sm text-gray-600">of Tail-Wagging Adventures</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">8</div>
                  <div className="text-sm text-gray-600">Years of Adventures</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">Why Choose Adventure Hikes?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Natural off-leash freedom in private trails</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Small groups (max 6 dogs) for personalized attention</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Professional handlers ensure safety and positive reinforcement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg"
                  alt="A large pack of dogs sits together on a picnic table after a River Paws adventure near Madison."
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
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
                    <div className="font-semibold text-gray-800">Adventure Guides</div>
                    <div className="text-sm text-gray-600">Since 2017</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day in Life Cards */}
          <div className="mt-12 sm:mt-16 md:mt-24">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-12 md:mb-16">What a River Paws Hike Looks Like</h3>
            <p className="text-base sm:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              We make adventure easy. Our team picks up your pup from home, transports them to our private trails for 1-1.5 hours of off-leash exploration in small groups, and drops them back home—happy, tired, and fulfilled.
            </p>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {/* IMAGE_PLACEMENT_START: dog-hikes-convenient-pickup-card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/Hiking/calm-golden-retriever-dog-bus-transport-madison-wi-river-paws.jpg"
                    alt="Multiple dogs wait patiently to load onto the River Paws bus in Madison."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Hiking/calm-golden-retriever-dog-bus-transport-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-hikes-convenient-pickup-card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Adventure pickup in progress.</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Convenient Pickup</h4>
                <p className="text-gray-600 leading-relaxed">
                  We pick up your pup from home and transport them to our beautiful private trails,
                  making the adventure seamless for busy pet parents.
                </p>
              </div>

              {/* IMAGE_PLACEMENT_START: dog-hikes-off-leash-adventure-card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/Hiking/curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg"
                    alt="A happy golden retriever runs along a wooded trail during a River Paws dog hike in Waunakee, Wisconsin."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Hiking/curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-hikes-off-leash-adventure-card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Adventure starts with every wag.</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Off-Leash Adventure</h4>
                <p className="text-gray-600 leading-relaxed">
                  1-2 hours of supervised fun in small groups (up to 6 dogs) exploring Madison&apos;s
                  scenic trails with professional handlers ensuring safety.
                </p>
              </div>

              {/* IMAGE_PLACEMENT_START: dog-hikes-happy-return-card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg"
                    alt="A large pack of dogs sits together on a picnic table after a River Paws adventure near Madison."
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* IMAGE_PLACEMENT_END: dog-hikes-happy-return-card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">The happiest pack around.</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Happy Return</h4>
                <p className="text-gray-600 leading-relaxed">
                  We drop them back off at home, happily tired and fulfilled from their adventure.
                  Ready for cozy cuddles and well-deserved rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule & Why Choose Hikes */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Flexible Schedule */}
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">Flexible Adventure Schedule</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
              We offer dog hikes Monday through Friday, with flexible times to fit your routine.
            </p>

            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center max-w-4xl mx-auto overflow-hidden">
              {/* Animated Blobs Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
                <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 drop-shadow-lg">Available Days & Times</h3>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Adventure Days</h4>
                    <p className="text-blue-100">Monday through Friday</p>
                    <p className="text-sm text-blue-200 mt-2">Flexible morning & afternoon slots</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-400/50">
                      <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Assessments On Hold</h4>
                    <p className="text-blue-100">Currently at capacity</p>
                    <p className="text-sm text-yellow-200 mt-2">Join our waitlist to be notified when spots open!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Hikes */}
          <div className="mb-12 sm:mb-16 md:mb-24">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">Experience the Difference</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Imagine a place where your dog can run without limits, sniff every trail, and just <em>be a dog</em>. That&apos;s what we built.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Freedom That Feels Natural</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Off-leash adventures give your dog what they&apos;re wired for: running through woods, discovering new scents, and exploring at their own pace. It&apos;s not just exercise; it&apos;s the reset button that leaves them balanced and content.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Running through woods
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unleashing their wild side
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safe, supervised space
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Socialization Without Overwhelm</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Small groups (4-6 dogs per handler) create the perfect environment for natural bonding. Dogs form genuine friendships while hiking together, learning trust and cooperation without the overwhelming dynamics of larger daycare groups.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    4-6 dogs per handler
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Genuine friendships
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Builds confidence
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Mind & Body Engagement</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Every hike brings fresh terrain to navigate, new scents to investigate, and varied challenges. This enrichment satisfies their deepest instincts, reducing anxiety, boredom, and destructive behaviors.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fresh terrain to navigate
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reduces anxiety & boredom
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Meaningful stimulation
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Perfect for Every Age</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Not every dog loves the intensity of daycare. Older dogs, gentle souls, and pups who prefer to set their own pace find their stride on our trails. Whether spirited puppy or wise senior, they&apos;ll feel included and energized.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Puppies to seniors welcome
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Set their own pace
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Inclusive environment
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden">
              {/* Animated Blobs Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
                <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">The Proof Is In The Tired, Happy Faces</h3>
                <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
                  Pet parents tell us their dogs come home peacefully exhausted, ready for cozy cuddles—exactly how nature intended.
                </p>
              </div>
            </div>

            {/* Adventure Gallery Preview */}
            <div className="mt-12 sm:mt-16">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  See the adventures for yourself
                </h3>
                <p className="text-lg text-emerald-600 font-semibold">Every hike tells a story.</p>
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
                            src="/Hiking/energetic-german-shepherd-dog-hiking-madison-wi-river-paws.jpg"
                            alt="German Shepherd enjoying a trail adventure"
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
                            src="/Hiking/happy-golden-retriever-pack-hiking-middleton-wi-river-paws.jpg"
                            alt="Happy golden retriever pack on a hike"
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
                            src="/Hiking/joyful-mini-aussie-dog-hiking-madison-wi-river-paws.jpg"
                            alt="Joyful Mini Aussie on the trails"
                            fill
                            className="object-cover"
                            sizes="256px"
                          />
                        </div>
                      </div>
                      <span className="absolute bottom-3 left-0 right-0 text-center text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>Best day ever! 🐾</span>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-teal-400/0 to-emerald-400/0 group-hover:from-emerald-400/20 group-hover:via-teal-400/20 group-hover:to-emerald-400/20 rounded-3xl blur-2xl transition-all duration-500 -z-10"></div>
                </Link>
              </div>
              
              {/* CTA Button */}
              <div className="text-center">
                <Link
                  href="/gallery"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_100%] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-gradient-x"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Browse All Trail Photos
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="text-sm text-gray-500 mt-3">100+ adventure photos in our gallery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Requirements */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Adventure Pricing</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Simple, transparent pricing with multi-dog discounts for families with more than one pup.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-24 items-stretch">
            {/* Pricing Cards */}
            <div className="flex flex-col">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Group Adventure Hikes</h3>
                <p className="text-gray-600 mb-6">1 - 1.5 hours on-trail + transportation within 4-mile radius</p>

                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Per Dog</p>
                      <p className="text-sm text-gray-600">Standard Rate</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">$45</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Second Family Dog</p>
                      <p className="text-sm text-gray-600">Discounted Rate</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">$33.75</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Private Hikes</h3>
                  <p className="text-gray-600 mb-6">Limited availability - your dogs only. 45 minutes on-trail.</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">First Dog</span>
                      <span className="text-xl font-bold text-gray-800">$55</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">Second Dog</span>
                      <span className="text-xl font-bold text-gray-800">$20</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-800">Third Dog</span>
                      <span className="text-xl font-bold text-gray-800">$10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      {/* Requirements */}
            <div className="flex flex-col">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Adventure Requirements</h3>

                <div className="space-y-4 flex-1">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Rabies Vaccination</p>
                      <p className="text-sm text-gray-600">Current vaccination required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Distemper Vaccination</p>
                      <p className="text-sm text-gray-600">Up-to-date vaccination required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Bordetella Vaccination</p>
                      <p className="text-sm text-gray-600">Current vaccination required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Application Process</p>
                      <p className="text-sm text-gray-600">Behavior evaluation required for all hiking dogs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Good Recall</p>
                      <p className="text-sm text-gray-600">Dogs should respond to basic commands</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Adventure Spirit</p>
                      <p className="text-sm text-gray-600">Love for outdoor exploration and meeting new friends</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                href="/dog-hike-scheduling"
                className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-white rounded-full font-medium text-base sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[44px]"
                onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-[length:200%_100%] animate-gradient-shift"></span>
                    <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                      background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.3), transparent)' 
                    }}></span>
                    <span className="relative z-10 flex items-center text-white">
                      <svg className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Join Our Waitlist
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">What Our Adventurers Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Don&apos;t just take our word for it—these pups (and their people) speak for themselves.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Emily D.</h3>
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
                &ldquo;River Paws&apos; hikes are amazing — my dog is exercised, socialized, and SO much happier.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Jennifer M.</h3>
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
                &ldquo;The private trails are beautiful, and the staff are incredible. Best decision we ever made for our pup.&rdquo;
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq: { question: string; answer: string }, index) => {
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
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-emerald-600 to-teal-500 transition-all duration-500 ${
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

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to See Your Dog This Happy?</h3>
              <p className="text-gray-600 mb-8">Join our waitlist today and be the first to know when space opens for your pup to discover their wild side on Madison&apos;s most beautiful private trails.</p>
              <Link
                href="/dog-hike-scheduling"
                className="group relative inline-flex items-center px-8 py-4 bg-white text-white rounded-full font-medium text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[44px]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-[length:200%_100%] animate-gradient-shift"></span>
                <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                  background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.3), transparent)' 
                }}></span>
                <span className="relative z-10 flex items-center">
                  <svg className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Contact to Join Waitlist
                </span>
              </Link>
            </div>
              </div>
            </div>
          </section>

          {/* Related Services - Polaroid Style */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-10 sm:mb-14">
                <p className="text-lg text-gray-500 mb-2">While you&apos;re here...</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
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
                          src="/Grooming/pampered-spaniel-bath-waunakee-wi-river-paws.jpg"
                          alt="Pampered spaniel enjoying a spa bath at River Paws"
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
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">Bath & brush, full grooms, and that fresh-from-the-salon feeling.</p>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Meet Our Team</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">The passionate people behind every adventure and spa day.</p>
                    <Link
                      href="/caretakers"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
          </section>
        </>
      );
    }