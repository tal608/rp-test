"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cityGroomingFaqs } from "@/constants/cityFaqs";
import ServiceSchema from "@/components/ServiceSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import SafeHtml from "@/components/SafeHtml";
import { contactInfo } from "@/constants/social";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function DogGroomingWaunakee() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);
  // Only show the products FAQ, not the puppy grooming FAQ (that's on its own page)
  const mainFaqs = cityGroomingFaqs.waunakee.filter(
    (faq) => faq.question.toLowerCase().includes("products") || faq.question.toLowerCase().includes("canine")
  );

  return (
    <>
      <ServiceSchema serviceType="grooming" />
      <ArticleSchema
        headline={mainFaqs[0]?.question || "Canine Grooming Products Guide"}
        description="Learn about the best products for canine grooming and professional grooming recommendations."
        datePublished="2024-01-15"
        dateModified="2025-01-15"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Grooming", url: "https://www.riverpaws.dog/dog-grooming" },
          { name: "Dog Grooming Waunakee", url: "https://www.riverpaws.dog/dog-grooming-waunakee" },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Modern Hero Section */}
        {/* IMAGE_PLACEMENT_START: dog-grooming-waunakee-hero */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-24 left-6 z-20">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Dog Grooming", href: "/dog-grooming" },
                { name: "Waunakee", href: "/dog-grooming-waunakee" },
              ]}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
            />
          </div>
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hiking/attentive-gsp-dog-bus-transport-waunakee-wi-river-paws.jpg"
              alt="Attentive GSP becoming a properly challenged athlete via exclusive transport to Waunakee's only privately-built dog park."
              fill
              className="object-cover"
              style={{ objectPosition: getImageObjectPosition("/Hiking/attentive-gsp-dog-bus-transport-waunakee-wi-river-paws.jpg") }}
              priority
              sizes="100vw"
            />
            {/* IMAGE_PLACEMENT_END: dog-grooming-waunakee-hero */}
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

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
                <span className="block text-white animate-fadeInUp-delay-200 drop-shadow-2xl">Dog Grooming</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-400 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                    Waunakee
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
                <span className="block text-white animate-fadeInUp-delay-600 drop-shadow-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">Professional Grooming Services</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Looking for dog grooming Waunakee? Local Waunakee dog grooming services. Expert groomers providing full-service
                grooming, breed-specific styling, and compassionate care since 2017. Located right here in Waunakee at 5305 River Road, on the eastern edge of Waunakee on River Road, minutes from downtown Waunakee via Highway 113, near Six Mile Creek neighborhood, and adjacent to Yahara Heights County Park - just 500 feet from Yahara Heights Dog Park.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
                <Link
                  href="/grooming-application"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
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
                    Book Appointment
                  </span>
                </Link>

                <GetDirectionsButton className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[44px] flex items-center justify-center" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {mainFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header with Image */}
                <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Image
                    src={index === 0 ? "/Grooming/freshcut-doodle-grooming-waunakee-wi-river-paws.jpg" : "/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg"}
                    alt={index === 0 
                      ? "A freshly groomed black and white doodle dog calmly poses in a River Paws grooming salon in Waunakee, Wisconsin."
                      : "A happy, freshly groomed Pomeranian wearing a watermelon bandana at a River Paws grooming salon in Waunakee, Wisconsin."
                    }
                    fill
                    className="object-cover opacity-80"
                    style={{ objectPosition: '50% 40%' }}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-white uppercase tracking-wide">
                        A River Paws Dog Grooming Waunakee Client Asked
                      </p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {faq.question}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  <SafeHtml
                    html={faq.fullContent || `<p>${faq.answer}</p>`}
                    className="article-content text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            ))}

            {/* Perfect Location for Dog Park Visitors */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Conveniently Located Next to Yahara Heights Dog Park
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Located just 500 feet from Yahara Heights Dog Park's 20-acre off-leash area, River Paws offers the perfect solution for Waunakee pet owners looking for post-dog park grooming. We're walking distance from the area's most popular dog park, making it easy to clean up your muddy pup after Cherokee Marsh adventures or Yahara River swimming sessions. Perfect for post-dog park grooming and cleanup!
              </p>
            </div>

            {/* Why River Paws is the Best Dog Groomer in Waunakee */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why River Paws is the Best Dog Groomer in Waunakee
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Searching for the best dog groomer Waunakee? Here's why families choose us as their trusted grooming partner:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-gray-900">Convenient location</strong> - On the eastern edge of Waunakee on River Road, minutes from downtown Waunakee via Highway 113, near Six Mile Creek neighborhood
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-gray-900">Unique advantage</strong> - Only groomer walking distance from Yahara Heights Dog Park, perfect for post-adventure grooming
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-gray-900">Expert care</strong> - 2000+ families trust us as their best dog groomer in Waunakee with over 7 years serving the Cherokee Marsh community
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-gray-900">Perfect location</strong> - Adjacent to Yahara Heights County Park, near The Meadows of Six Mile Creek golf course
                  </div>
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional Dog Grooming Right Here in Waunakee
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                As a locally-owned and operated business in Waunakee, we understand the unique
                needs of our community's pets. Conveniently located at{" "}
                <strong>{contactInfo.address.full}</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://booking.moego.pet/ol/RiverPaws/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg min-h-[44px] flex items-center justify-center"
                >
                  Book Appointment
                </a>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors min-h-[44px]"
                >
                  Contact Us
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-emerald-100">
                  Call us at{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white font-bold hover:underline"
                  >
                    {contactInfo.phoneDisplay}
                  </a>{" "}
                  to schedule your appointment
                </p>
              </div>
            </div>

            {/* Related Links */}
            <div className="space-y-6">
              {/* Link to Main Grooming Page */}
              <div className="text-center">
                <Link
                  href="/dog-grooming"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  View All Dog Grooming Services
                </Link>
              </div>

              {/* Related Location Pages */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Grooming Services in Nearby Areas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link
                    href="/dog-grooming-madison"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Madison
                  </Link>
                  <Link
                    href="/dog-grooming-middleton"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Middleton
                  </Link>
                  <Link
                    href="/dog-grooming-sun-prairie"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Sun Prairie
                  </Link>
                  <Link
                    href="/dog-grooming-deforest"
                    className="text-sm text-emerald-600 hover:text-emerald-700 text-center py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    DeForest
                  </Link>
                  <Link
                    href="/dog-hikes"
                    className="text-sm text-blue-600 hover:text-blue-700 text-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Dog Hikes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

