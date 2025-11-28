"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { cityGroomingFaqs, getCityGroomingFaqs } from "@/constants/cityFaqs";
import FAQSection from "@/components/FAQSection";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import SafeHtml from "@/components/SafeHtml";
import { contactInfo } from "@/constants/social";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function DogGroomingSunPrairie() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);
  const sunPrairieFaqs = getCityGroomingFaqs("sunprairie");
  const mainFaq = cityGroomingFaqs.sunPrairie[0];

  return (
    <>
      <ServiceSchema serviceType="grooming" />
      <ArticleSchema
        headline={mainFaq.question}
        description="Expert tips for preparing your dog before and after grooming appointments for Sun Prairie pet owners."
        datePublished="2024-01-15"
        dateModified="2025-01-15"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Grooming", url: "https://www.riverpaws.dog/dog-grooming" },
          { name: "Dog Grooming Sun Prairie", url: "https://www.riverpaws.dog/dog-grooming-sun-prairie" },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Modern Hero Section */}
        {/* IMAGE_PLACEMENT_START: dog-grooming-sun-prairie-hero */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-24 left-6 z-20">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Dog Grooming", href: "/dog-grooming" },
                { name: "Sun Prairie", href: "/dog-grooming-sun-prairie" },
              ]}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
            />
          </div>
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hiking/confident-goldendoodle-dog-bus-sun-prairie-wi-river-paws.jpg"
              alt="Doodle building developing athletic endurance through acres of purpose-built adventure trails serving Sun Prairie community with River Paws"
              fill
              className="object-cover"
              style={{ objectPosition: getImageObjectPosition("/Hiking/confident-goldendoodle-dog-bus-sun-prairie-wi-river-paws.jpg") }}
              priority
              sizes="100vw"
            />
            {/* IMAGE_PLACEMENT_END: dog-grooming-sun-prairie-hero */}
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
                    Sun Prairie
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
                </span>
                <span className="block text-white animate-fadeInUp-delay-600 drop-shadow-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">Professional Grooming Services</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto animate-fadeInUp-delay-800 px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Looking for dog grooming Sun Prairie? Professional dog grooming services for Sun Prairie families. Expert groomers providing
                full-service grooming, breed-specific styling, and compassionate care since 2017. Conveniently located west of Sun Prairie via Highway 19, accessible from Highway 151 corridor, serving Token Creek and Prairie Lakes areas.
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

        {/* Main Content */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Article Content */}
            {mainFaq.fullContent && (
              <div className="max-w-4xl mx-auto mb-12">
                <SafeHtml
                  html={mainFaq.fullContent || `<p>${mainFaq.answer}</p>`}
                  className="article-content text-gray-700 leading-relaxed bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg"
                />
              </div>
            )}

            {/* FAQ Section */}
            <FAQSection
              faqs={sunPrairieFaqs}
              title="Common Questions About Dog Grooming in Sun Prairie"
              description="Answers to frequently asked questions from Sun Prairie pet owners"
              variant="div"
            />
            <FAQSchema faqs={sunPrairieFaqs} />

            {/* Perfect Location for Dog Park Visitors */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 sm:p-8 md:p-12 mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Conveniently Located Next to Yahara Heights Dog Park
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                Located just 500 feet from Yahara Heights Dog Park's 20-acre off-leash area, River Paws offers the perfect solution for Sun Prairie pet owners looking for post-dog park grooming. We're walking distance from the area's most popular dog park, making it easy to clean up your muddy pup after Cherokee Marsh adventures or Yahara River swimming sessions.
              </p>
            </div>

            {/* Why River Paws is the Best Dog Groomer in Sun Prairie */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Why River Paws is the Best Dog Groomer in Sun Prairie
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                Searching for the best dog groomer Sun Prairie? Here's why families choose us as their trusted grooming partner:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-gray-900">Convenient location</strong> - West of Sun Prairie via Highway 19, accessible from Highway 151 corridor, serving Token Creek and Prairie Lakes areas
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
                    <strong className="text-gray-900">Expert care</strong> - 2000+ families trust us as their best dog groomer in Sun Prairie with over 8 years serving the Cherokee Marsh community
                  </div>
                </li>
              </ul>
            </div>

            {/* Related Links */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
                Related Resources
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/dog-grooming-madison"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Madison</h3>
                  <p className="text-sm text-gray-600">Grooming benefits</p>
                </Link>
                <Link
                  href="/dog-grooming-waunakee"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Waunakee</h3>
                  <p className="text-sm text-gray-600">Products guide</p>
                </Link>
                <Link
                  href="/dog-grooming-middleton"
                  className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <h3 className="font-bold text-gray-900 mb-2">Middleton</h3>
                  <p className="text-sm text-gray-600">Home bathing tips</p>
                </Link>
                  <Link
                    href="/dog-grooming-deforest"
                    className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">DeForest</h3>
                    <p className="text-sm text-gray-600">Local services</p>
                  </Link>
                  <Link
                    href="/dog-hikes"
                    className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">Dog Hikes</h3>
                    <p className="text-sm text-gray-600">Adventure services</p>
                  </Link>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Experience Professional Dog Grooming in Sun Prairie?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join the hundreds of Sun Prairie families who trust River Paws with their beloved pets.
                Conveniently located just minutes from Sun Prairie.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="https://booking.moego.pet/ol/RiverPaws/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg min-h-[44px] flex items-center justify-center"
                >
                  Book Appointment
                </a>
                <GetDirectionsButton className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-h-[44px] flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg" />
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
                <p className="text-emerald-100 mb-2 text-sm sm:text-base">
                  Located at <strong>{contactInfo.address.full}</strong>
                </p>
                <p className="text-emerald-100 text-sm sm:text-base">
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
          </div>
        </section>
      </main>
    </>
  );
}
