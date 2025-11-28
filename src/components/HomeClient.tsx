"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { homeFaqs } from "@/constants/faqs";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useGradientAnimation } from "@/hooks/useGradientAnimation";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import TeamStats from "@/components/TeamStats";
import FAQSection from "@/components/FAQSection";
import FAQSchema from "@/components/FAQSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import { contactInfo } from "@/constants/social";

// Top 10 hero images for Polaroid display - Mix of hiking and grooming
// Positioned around edges to create a "donut" layout with clear center for text
const heroImages = [
  // TOP-LEFT QUADRANT
  {
    src: "/Hiking/energetic-english-cream-dog-hiking-sun-prairie-wi-river-paws.jpg",
    alt: "Energetic English Cream building confidence serving Sun Prairie families at professionally supervised wilderness trails",
    caption: "Adventure Awaits",
    rotation: -3,
    size: "large" as const,
    position: { x: "2%", y: "5%" },
    delay: 0
  },
  {
    src: "/Grooming/grooming-transformation-doodle-madison-wi-river-paws.jpg",
    alt: "A happy Poodle mix, first muddy outdoors, then freshly groomed indoors with a bandana by River Paws in Waunakee",
    caption: "Fresh & Clean",
    rotation: 4,
    size: "medium" as const,
    position: { x: "5%", y: "28%" },
    delay: 1.5
  },
  // TOP-RIGHT QUADRANT
  {
    src: "/Hiking/joyful-golden-retriever-wilderness-trails-waunakee-wi-river-paws.jpg",
    alt: "Joyful Golden Retriever thriving on purpose-built wilderness trails at River Paws' exclusive facility in Waunakee, Wisconsin",
    caption: "Pure Joy",
    rotation: -2,
    size: "medium" as const,
    position: { x: "78%", y: "8%" },
    delay: 3
  },
  {
    src: "/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg",
    alt: "Happy Bernesemix dog with a fresh groom and blue bandana looks directly at the camera in a Sun Prairie grooming salon, cared for by River Paws",
    caption: "Pampered Pup",
    rotation: 5,
    size: "large" as const,
    position: { x: "75%", y: "30%" },
    delay: 4.5
  },
  // BOTTOM-LEFT QUADRANT
  {
    src: "/Hiking/energetic-german-shepherd-dog-hiking-madison-wi-river-paws.jpg",
    alt: "German Shepherd experiencing natural enrichment for Madison area dogs at Waunakee's premier adventure park",
    caption: "Best Day Ever",
    rotation: -4,
    size: "small" as const,
    position: { x: "3%", y: "52%" },
    delay: 6
  },
  {
    src: "/Hiking/joyful-mini-aussie-dog-hiking-madison-wi-river-paws.jpg",
    alt: "Mini Aussie experiencing natural enrichment for Madison area dogs at Waunakee's premier adventure park",
    caption: "Our Pack",
    rotation: -5,
    size: "large" as const,
    position: { x: "2%", y: "72%" },
    delay: 9
  },
  // BOTTOM-RIGHT QUADRANT
  {
    src: "/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg",
    alt: "A freshly groomed Pomeranian dog happily poses in a grooming salon, wearing a watermelon bandana, ready for River Paws in Waunakee, WI",
    caption: "Spa Day",
    rotation: 3,
    size: "medium" as const,
    position: { x: "80%", y: "55%" },
    delay: 7.5
  },
  {
    src: "/Grooming/freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg",
    alt: "A freshly groomed Goldendoodle sits calmly on a grooming table at a River Paws salon in Madison, Wisconsin",
    caption: "Looking Good",
    rotation: 2,
    size: "small" as const,
    position: { x: "78%", y: "75%" },
    delay: 10.5
  },
  // BOTTOM CENTER (both pushed to bottom to keep top clear for text)
  {
    src: "/Hiking/confident-mixed-pack-dog-hiking-waunakee-wi-river-paws.jpg",
    alt: "Mixed pack socializing thriving on purpose-built wilderness trails at River Paws' exclusive facility in Waunakee, Wisconsin",
    caption: "Wilderness Fun",
    rotation: -3,
    size: "medium" as const,
    position: { x: "55%", y: "80%" },
    delay: 12
  },
  {
    src: "/Hiking/joyful-pack-social-hiking-madison-wi-river-paws.jpg",
    alt: "Joyful pack socializing experiencing natural enrichment for Madison area dogs at Waunakee's premier adventure park",
    caption: "Best Friends",
    rotation: 4,
    size: "large" as const,
    position: { x: "25%", y: "82%" },
    delay: 13.5
  }
];

export default function HomeClient() {
  const [selectedService, setSelectedService] = useState<'grooming' | 'hiking'>('grooming');
  const [isVisible, setIsVisible] = useState(false);
  const [cardHover, setCardHover] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceSectionRef = useRef<HTMLDivElement>(null);
  const locationGradientRef = useRef<HTMLDivElement>(null);
  const newToRiverPawsRef = useRef<HTMLDivElement>(null);

  const mousePosition = useMouseParallax(heroRef);
  useGradientAnimation(locationGradientRef);
  useGradientAnimation(newToRiverPawsRef);

  // Progressive image loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadedImages((prev) => prev >= 10 ? prev : prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

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
        {/* Enhanced Hero Section with Polaroid Photo Wall */}
        {/* IMAGE_PLACEMENT_START: homepage-hero */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Base background layer - ensures consistent appearance in light/dark mode */}
          <div className="absolute inset-0 hero-base-layer z-0"></div>
          {/* Background Gradient overlay */}
          <div className="absolute inset-0 hero-gradient-overlay z-[1]"></div>
          
          {/* Polaroid Photos Container */}
          <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
            {heroImages.slice(0, loadedImages).map((image, index) => {
              const sizeMap = {
                large: { width: 320, height: 320, mobileWidth: 200, mobileHeight: 200 },
                medium: { width: 280, height: 280, mobileWidth: 180, mobileHeight: 180 },
                small: { width: 240, height: 240, mobileWidth: 160, mobileHeight: 160 }
              };
              const size = sizeMap[image.size];
              const isVisible = index < loadedImages;
              
              return (
                <div
                  key={image.src}
                  className={`polaroid-frame ${isVisible ? 'visible polaroid-enter' : ''} polaroid-float hidden sm:block`}
                  style={{
                    left: image.position.x,
                    top: image.position.y,
                    width: `${size.width}px`,
                    height: `${size.height + 60}px`,
                    '--rotation': `${image.rotation}deg`,
                    '--delay': `${index * 0.2}s`,
                    zIndex: 10 + index,
                    animationDelay: `${index * 1.5}s`
                  } as React.CSSProperties}
                >
                  <div className="polaroid-image" style={{ height: `${size.height}px` }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      style={{ objectPosition: getImageObjectPosition(image.src) }}
                      sizes={`(max-width: 768px) ${size.mobileWidth}px, ${size.width}px`}
                      quality={index === 0 ? 85 : 75}
                    />
                  </div>
                  <div className="polaroid-caption">
                    {image.caption}
                  </div>
                </div>
              );
            })}
            {/* Mobile: Show only 4 small Polaroids at corners - keeps center clear */}
            {heroImages.slice(0, Math.min(loadedImages, 4)).map((image, index) => {
              // Smaller sizes for mobile to not crowd the screen
              const mobileSizeMap = {
                large: { width: 110, height: 110 },
                medium: { width: 100, height: 100 },
                small: { width: 90, height: 90 }
              };
              const mobileSize = mobileSizeMap[image.size];
              // Only 4 positions - corners only, pushed to edges
              const mobilePositions = [
                { x: "3%", y: "8%", rotation: -3 },     // Top-left corner
                { x: "68%", y: "10%", rotation: 4 },    // Top-right corner
                { x: "5%", y: "75%", rotation: -4 },    // Bottom-left corner
                { x: "65%", y: "77%", rotation: 3 },    // Bottom-right corner
              ];
              const mobilePos = mobilePositions[index] || image.position;
              
              return (
                <div
                  key={`mobile-${image.src}`}
                  className={`polaroid-frame ${index < loadedImages ? 'visible polaroid-enter' : ''} block sm:hidden`}
                  style={{
                    left: mobilePos.x,
                    top: mobilePos.y,
                    width: `${mobileSize.width}px`,
                    height: `${mobileSize.height + 35}px`,
                    '--rotation': `${mobilePos.rotation}deg`,
                    zIndex: 10 + index,
                    animationDelay: `${index * 1.5}s`
                  } as React.CSSProperties}
                >
                  <div className="polaroid-image" style={{ height: `${mobileSize.height}px` }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      style={{ objectPosition: getImageObjectPosition(image.src) }}
                      sizes={`${mobileSize.width}px`}
                      quality={index === 0 ? 85 : 75}
                    />
                  </div>
                  <div className="polaroid-caption">
                    {image.caption}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* IMAGE_PLACEMENT_END: homepage-hero */}

          {/* Animated gradient overlay - using custom class to prevent dark mode color shifts */}
          <div className="absolute inset-0 hero-gradient-overlay-secondary"></div>

          {/* Floating elements with parallax */}
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob will-change-transform"
              style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
            ></div>
            <div
              className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2 will-change-transform"
              style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
            ></div>
          </div>

          {/* Content container with higher z-index to stay above Polaroids */}
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            {/* Soft radial backdrop for text readability */}
            <div className="absolute inset-0 -inset-x-8 -inset-y-16 bg-gradient-radial from-slate-900/60 via-slate-900/30 to-transparent blur-xl -z-10 pointer-events-none"></div>
            
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-full px-4 py-2 animate-fadeInUp shadow-lg">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Trusted by 2000+ Local Families Since 2017</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight px-2">
                {/* LCP element - prioritized but animated */}
                <span className="block text-white text-shadow-hero animate-fadeInUp">Every Tail Wags</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent relative inline-block animate-fadeInUp-delay-400">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%] text-shadow-hero-glow">
                    With Joy
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 sm:mt-6 font-medium text-blue-100 text-shadow-md animate-fadeInUp-delay-600">
                  for River Paws Dog Grooming & Hiking
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto animate-fadeInUp-delay-600 px-4 mt-6 text-shadow-md">
                Professional grooming & adventure-filled hiking.
                <span className="block mt-2">Your dog&apos;s happiness is our mission.</span>
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
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
                  <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" style={{ 
                    background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.3), transparent)' 
                  }}></span>
                  <span className="relative z-10 flex items-center justify-center text-blue-700 group-hover:text-white transition-colors duration-300">
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white animate-fadeInUp-delay-1000">
                <GetDirectionsButton
                  label="Minutes from Madison"
                  className="text-sm sm:text-base whitespace-nowrap backdrop-blur-sm"
                />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full font-semibold bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2"
                  aria-label={`Call River Paws at ${contactInfo.phoneDisplay} for hours and availability`}
                >
                  <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call for hours & availability</span>
                </a>
              </div>
              
              <p className="mt-6 text-sm sm:text-base text-yellow-200 font-semibold animate-fadeInUp-delay-1000 drop-shadow-md">
                Find professional dog grooming and hiking services near you!
              </p>
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
                    src="/Hiking/peaceful-pointer-spaniel-pack-hiking-madison-wi-river-paws.jpg"
                    alt="Content mixed pack experiencing natural enrichment for Madison area dogs at Waunakee's premier adventure park"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Hiking/peaceful-pointer-spaniel-pack-hiking-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Serving the local community.</p>
                  </div>
                </div>
                {/* IMAGE_PLACEMENT_END: homepage-local-expertise-card */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 force-bg-white">
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
                    src="/Hiking/joyful-pack-social-hiking-madison-wi-river-paws.jpg"
                    alt="Joyful pack socializing experiencing natural enrichment for Madison area dogs at Waunakee's premier adventure park"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-pack-social-hiking-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">We work around your schedule.</p>
                  </div>
                </div>
                {/* IMAGE_PLACEMENT_END: homepage-flexible-scheduling-card */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 force-bg-white">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Flexible scheduling to accommodate your busy schedule.
                  Call us to discuss availability and appointment times.
                </p>
              </div>

              {/* IMAGE_PLACEMENT_START: homepage-stress-free-card */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg"
                    alt="A happy Bernesemix dog with a fresh groom looks content after grooming at River Paws in Madison, Wisconsin"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition("/Grooming/happy-bernesemix-grooming-madison-wi-river-paws.jpg") }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">Gentle care, happy dogs.</p>
                  </div>
                </div>
                {/* IMAGE_PLACEMENT_END: homepage-stress-free-card */}
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 force-bg-white">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Stress-Free Environment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our experienced groomers work at your dog&apos;s pace, using gentle techniques
                  and positive reinforcement to ensure a comfortable grooming experience.
                </p>
              </div>
            </div>

            {/* Happy Tails Peek - Gallery CTA */}
            <div className="mb-8 sm:mb-12 animate-fadeInUp-delay-800">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Don&apos;t just take our word for it...
                </h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">The wags speak for themselves.</p>
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
                            src="/Grooming/freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg"
                            alt="Happy goldendoodle after grooming"
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
                            src="/Hiking/joyful-golden-retriever-wilderness-trails-waunakee-wi-river-paws.jpg"
                            alt="Joyful golden retriever on trail"
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
                            src="/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg"
                            alt="Fluffy pomeranian freshly groomed"
                            fill
                            className="object-cover"
                            sizes="256px"
                          />
                        </div>
                      </div>
                      <span className="absolute bottom-3 left-0 right-0 text-center text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-kalam), cursive' }}>So fluffy! ✨</span>
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
                  See All the Happy Faces
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">100+ photos of happy pups in our gallery</p>
              </div>
            </div>

            {/* Location Highlight */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center overflow-hidden group">
              {/* Animated Blobs Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
                <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 drop-shadow-lg transform group-hover:scale-105 transition-transform duration-300 px-2">Conveniently Located on the Edge of Waunakee & Madison</h3>
                <p className="text-lg mb-6 max-w-3xl mx-auto drop-shadow-md">
                  We&apos;re perfectly positioned for pet owners throughout the greater Madison area. Whether you&apos;re coming from Middleton, DeForest, Sun Prairie, or anywhere in between, 
                  we offer convenient parking and easy access. Just minutes from downtown Madison, making it easy to fit us into your busy schedule.
                </p>
                <p className="text-base sm:text-lg mb-8 max-w-3xl mx-auto drop-shadow-md bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <strong>Bonus for Active Pups:</strong> We&apos;re located just 500 feet from Yahara Heights Dog Park&apos;s 20-acre off-leash area!
                  Whether your pup just finished playing at the dog park or exploring Cherokee Marsh, we&apos;re the perfect stop for post-adventure grooming and cleanup.
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

            {/* Services Display */}
            {selectedService === 'grooming' ? (
              <div className="space-y-8">
                {/* Pricing Explanation Header */}
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Transparent, Fair Pricing</h3>
                  <p className="text-gray-600">
                    Our base grooming prices are based on <span className="font-semibold text-blue-600">your dog&apos;s weight</span> + <span className="font-semibold text-teal-600">coat type</span>. 
                    This ensures you only pay for the time and care your pup actually needs.
                  </p>
                </div>

                {/* How We Price */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Weight Groups Card */}
                  <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-teal-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-teal-50/30 group-hover:to-blue-50/50 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Step 1: Weight Group</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">First, we determine your dog&apos;s weight category:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "Extra Small", weight: "9-10 lbs" },
                          { name: "Small", weight: "11-30 lbs" },
                          { name: "Medium", weight: "31-60 lbs" },
                          { name: "Large", weight: "61-90 lbs" },
                          { name: "Extra Large", weight: "91-120 lbs" },
                          { name: "Giant", weight: "121+ lbs" }
                        ].map((group, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            <span className="text-gray-700 font-medium">{group.name}</span>
                            <span className="text-gray-500 ml-1">({group.weight})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Coat Types Card */}
                  <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-teal-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-teal-50/30 group-hover:to-blue-50/50 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Step 2: Coat Type</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Then, we factor in your dog&apos;s coat complexity:</p>
                      <div className="space-y-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 border border-blue-200 dark:border-blue-800 shadow-sm">
                          <span className="font-semibold text-blue-900 dark:text-blue-300 text-sm block mb-1">Basic Coat</span>
                          <span className="text-blue-800 dark:text-blue-400 text-sm">Hairless, Smooth, Short, Medium</span>
                        </div>
                        <div className="bg-teal-100 dark:bg-teal-900/30 rounded-lg p-3 border border-teal-200 dark:border-teal-800 shadow-sm">
                          <span className="font-semibold text-teal-900 dark:text-teal-300 text-sm block mb-1">Thick Coat</span>
                          <span className="text-teal-800 dark:text-teal-400 text-sm">Corded, Wire, Double, Curly, Long</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services & Add-ons */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Core Services */}
                  <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-teal-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-teal-50/30 group-hover:to-blue-50/50 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">Core Services</h3>
                      <ul className="space-y-3">
                        {["Bath & Brush", "Full Service Groom"].map((service, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-teal-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-teal-50/30 group-hover:to-blue-50/50 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">Add-Ons & À La Carte</h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Pawdicure",
                          "Nail Trim",
                          "Nail Grind",
                          "Ear Cleaning",
                          "Teeth Brushing",
                          "Anal Gland Expression",
                          "Sanitary Trim",
                          "Extra Handling / Care"
                        ].map((addon, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 flex-shrink-0"></span>
                            {addon}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Specials */}
                  <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 via-orange-50/0 to-yellow-50/0 group-hover:from-yellow-50/50 group-hover:via-orange-50/30 group-hover:to-yellow-50/50 dark:group-hover:from-yellow-900/20 dark:group-hover:via-orange-900/15 dark:group-hover:to-yellow-900/20 transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <span className="text-xl mr-2">✨</span>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Special Packages</h3>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "Monthly Special",
                          "Premium Special",
                          "Deluxe Special",
                          "Supreme Special"
                        ].map((special, idx) => (
                          <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                            <svg className="w-4 h-4 text-yellow-500 dark:text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span className="font-medium text-sm">{special}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Ask about current specials when booking!</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/dog-grooming"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 min-h-[44px]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Check Out Our Grooming Services
                  </Link>
                  <a
                    href="https://booking.moego.pet/ol/RiverPaws/book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 min-h-[44px]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Now
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  { type: "Group Adventure", price: "$45", features: ["1-1.5 hours on trail", "Small group (4-6 dogs)", "Transport included", "Socialization focused"] },
                  { type: "Private Hike", price: "$55", features: ["45 minutes on trail", "One-on-one attention", "Custom pace & route", "Ideal for non-social or recall challenged dogs"] }
                ].map((tier, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
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
                      <Link
                        href="/contact"
                        className="block w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn min-h-[44px] text-center"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-shift"></span>
                          <span className="relative z-10">Join Waitlist</span>
                        </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Offer Banner */}
            <div className="mt-8 sm:mt-12 relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-xl overflow-hidden group">
              {/* Animated Blobs Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[50px] opacity-40 animate-blob-1"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[50px] opacity-40 animate-blob-2"></div>
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-teal-400 rounded-full filter blur-[50px] opacity-40 animate-blob-3"></div>
                <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[50%] bg-green-400 rounded-full filter blur-[50px] opacity-40 animate-blob-1"></div>
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Puppy Play & Socialization</h3>
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    <strong>Limited Availability:</strong> This is a very occasional offering that only happens once or twice a year. No current availability.
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Structured play sessions designed for puppies and young dogs. Learn socialization skills,
                  basic training, and make new friends in a safe environment. Offered on a very limited basis.
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
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

        {/* Meet Our Team Stats */}
        <TeamStats />

        {/* Testimonials Marquee */}
        <TestimonialMarquee />

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