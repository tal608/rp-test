"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import ServiceSchema from "@/components/ServiceSchema";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function DogHikes() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  const faqs = [
    {
      question: "What if it rains?",
      answer: "We adapt by offering shorter routes or rescheduling for your pup's comfort during Madison's unpredictable weather.",
    },
    {
      question: "Group sizes?",
      answer: "Kept small (4-6 dogs per person) for personalized attention on our off-leash trails.",
    },
    {
      question: "Requirements?",
      answer: "Up-to-date vaccines, good recall, and a love for adventure—apply today!",
    },
    {
      question: "Can small or older dogs hike?",
      answer: "Definitely. We carefully match groups based on energy level, size, and temperament for all dogs.",
    },
  ];

  return (
    <>
      <ServiceSchema serviceType="hiking" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Hiking", url: "https://www.riverpaws.dog/dog-hikes" },
        ]}
      />
      <style>{`
        @keyframes blob { animation: blob 7s infinite; }
        @keyframes simpleFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes tailWag {
          0% { transform: rotate(0deg); }
          12.5% { transform: rotate(2deg); }
          25% { transform: rotate(0deg); }
          37.5% { transform: rotate(-2deg); }
          50% { transform: rotate(0deg); }
          62.5% { transform: rotate(2deg); }
          75% { transform: rotate(0deg); }
          87.5% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes slideIn { animation: slideIn 0.5s ease-out; }
        @keyframes pulse { animation: pulse 2s infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-blob-delay-2 { animation: blob 7s infinite; animation-delay: 2s; }
        .animate-fadeInUp { 
          opacity: 1 !important; 
          animation: simpleFadeIn 0.6s ease-out forwards;
        }
        .animate-fadeInUp-delay-200 { 
          opacity: 1 !important; 
          animation: simpleFadeIn 0.6s ease-out 0.15s forwards;
        }
        .animate-fadeInUp-delay-400 { 
          opacity: 1 !important; 
          animation: simpleFadeIn 0.6s ease-out 0.3s forwards;
        }
        .animate-fadeInUp-delay-600 { 
          opacity: 1 !important; 
          animation: simpleFadeIn 0.6s ease-out 0.45s forwards;
        }
        .animate-fadeInUp-delay-800 { 
          opacity: 1 !important; 
          animation: simpleFadeIn 0.6s ease-out 0.6s forwards;
        }
        h1 .animate-fadeInUp, h1 span.animate-fadeInUp {
          animation: simpleFadeIn 0.6s ease-out forwards, tailWag 0.5s ease-in-out 0.6s 6;
        }
        h1 .animate-fadeInUp-delay-200, h1 span.animate-fadeInUp-delay-200 {
          animation: simpleFadeIn 0.6s ease-out 0.15s forwards, tailWag 0.5s ease-in-out 0.75s 6;
        }
        h1 .animate-fadeInUp-delay-400, h1 span.animate-fadeInUp-delay-400 {
          animation: simpleFadeIn 0.6s ease-out 0.3s forwards, tailWag 0.5s ease-in-out 0.9s 6;
        }
        h1 .animate-fadeInUp-delay-600, h1 span.animate-fadeInUp-delay-600 {
          animation: simpleFadeIn 0.6s ease-out 0.45s forwards, tailWag 0.5s ease-in-out 1.05s 6;
        }
        h1 .animate-fadeInUp-delay-800, h1 span.animate-fadeInUp-delay-800 {
          animation: simpleFadeIn 0.6s ease-out 0.6s forwards, tailWag 0.5s ease-in-out 1.2s 6;
        }
        .animate-slideIn { animation: slideIn 0.5s ease-out; }
        .animate-pulse { animation: pulse 2s infinite; }
      `}</style>

      {/* Modern Hero Section */}
      {/* IMAGE_PLACEMENT_START: dog-hikes-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-6 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Dog Hiking", href: "/dog-hikes" },
            ]}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-blue-900/60 to-teal-900/70 z-[1]"></div>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-emerald-600/20 z-[2]"></div>

        {/* Floating elements with parallax */}
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob z-[3]"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2 z-[3]"
          style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>

        <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp">
              <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Adventure Awaits Since 2017</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Where Every</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Adventure Begins
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-white animate-fadeInUp-delay-600 drop-shadow-2xl">With Joy</span>
          </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Give your dog the freedom they crave with small-group pack hikes and off-leash adventure walks across beautiful private trails. 
              Watch them explore, play, and make new friends while getting the exercise they need. Located on the edge of Waunakee and Madison, 
              we welcome dogs from Middleton, DeForest, Sun Prairie, and throughout the greater Madison area. Where exercise meets exploration and every tail wags with happiness.
              <span className="block mt-2 text-yellow-200 font-semibold">Find pack hikes and adventure dog walks near you!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
              <Link
                href="/dog-hike-scheduling"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
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
                <span className="relative z-10 flex items-center justify-center text-emerald-600 group-hover:text-white transition-colors duration-300">
                  <svg className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Start Your Adventure
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
        <ScrollIndicator targetId="about-program-section" />
      </section>

      {/* About Program & Day in Life */}
      <section id="about-program-section" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Your Dog&apos;s Ultimate Adventure
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Since 2017, River Paws has been the premier destination for enriching dog hikes throughout Waunakee, Madison, and surrounding communities 
                  including Middleton, DeForest, and Sun Prairie. Our mission is to provide the freedom to connect
                  with the outdoors through joyful, supervised adventures.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Just down the road, we have beautiful private trails where your dogs can safely
                  explore off-leash. A few hours of hiking lead to happy, balanced pups, leaving
                  tails wagging and hearts full of happiness.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
                  <div className="text-sm text-gray-600">Happy Hikers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">7</div>
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
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-12 md:mb-16">A Day in the Life of Adventure</h3>
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
              We offer dog hikes Tuesday through Friday, with flexible times to fit your routine.
              Mondays are reserved for new assessments for pups looking to join the pack.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Available Days & Times</h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Adventure Days</h4>
                  <p className="text-blue-100">Tuesday through Friday</p>
                  <p className="text-sm text-blue-200 mt-2">Flexible morning & afternoon slots</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Assessment Days</h4>
                  <p className="text-blue-100">Mondays</p>
                  <p className="text-sm text-blue-200 mt-2">New pup evaluations & introductions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Hikes */}
          <div className="mb-12 sm:mb-16 md:mb-24">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">Why Choose Adventure Hikes?</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Our off-leash hikes offer a more fulfilling, natural experience that taps into
                dogs&apos; innate instincts for adventure and exploration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Natural Freedom</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Off-leash adventures allow your pup the freedom to run, sniff, and play in a safe,
                  supervised natural environment. It&apos;s more than exercise—it&apos;s a chance for your
                  dog to feel truly alive.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Private Madison trails
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Off-leash exploration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional supervision
          </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Better Socialization</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Small, controlled groups help your pup form strong bonds naturally. Our hikes
                  encourage positive social behavior at a comfortable pace in a natural environment.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Max 6 dogs per group
          </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional handlers
          </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Natural bonding opportunities
          </li>
        </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mental Stimulation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Every hike is a new adventure filled with fresh smells, sights, and challenges.
                  This mental enrichment makes dogs calmer, happier, and more balanced.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fresh sensory experiences
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Natural problem-solving
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reduces anxiety & boredom
                  </li>
          </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Inclusive for All Ages</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our hikes are designed for all types of dogs and let them move at their own pace
                  while enjoying the company of other dogs in a natural outdoor setting.
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
                    Individual pace respected
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Gentle socialization
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">The Perfect Adventure Experience</h3>
              <p className="text-lg text-emerald-100 max-w-3xl mx-auto">
                By choosing our adventure hikes, you&apos;re providing your dog with a tailored experience
                that aligns with their natural behaviors. Many pet parents tell us their pups come home happily
                exhausted, ready for cozy cuddles—proof that these outings make a real difference!
              </p>
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
              Flexible pricing designed to fit your lifestyle and budget.
              More hikes per week means better rates!
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
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Weekly Adventures</h3>

                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">1 Hike per Week</p>
                      <p className="text-sm text-gray-600">Great for getting started</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">$50</p>
                      <p className="text-sm text-gray-600">($45 pickup)</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">2+ Hikes per Week</p>
                      <p className="text-sm text-gray-600">Regular adventurer</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">$45</p>
                      <p className="text-sm text-gray-600">($40 pickup)</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">3+ Hikes per Week</p>
                      <p className="text-sm text-gray-600">Adventure enthusiast</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">$42</p>
                      <p className="text-sm text-gray-600">($37 pickup)</p>
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
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-medium text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-xl min-h-[44px]"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Start Application
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
              Don&apos;t just take our word for it - hear from families whose dogs have discovered
              the joy of outdoor adventures with River Paws.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Emily D.</h4>
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
                  <h4 className="font-bold text-gray-800">Jennifer M.</h4>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Give Your Dog the Outdoor Joy They Deserve?</h3>
              <p className="text-gray-600 mb-8">Let&apos;s make those tails wag with adventure!</p>
              <Link
                href="/dog-hike-scheduling"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Schedule a Hike or Apply Now
              </Link>
            </div>
              </div>
            </div>
          </section>

          {/* Related Services */}
          <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Explore Our Other Services
                </h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Link
                    href="/dog-grooming"
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        Professional Dog Grooming
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Full-service grooming with expert groomers. Keep your dog looking and feeling great!
                    </p>
                  </Link>
                  <Link
                    href="/caretakers"
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Meet Our Team
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Get to know the experienced professionals who guide your dog's adventures.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }