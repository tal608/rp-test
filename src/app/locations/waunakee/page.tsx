"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { contactInfo } from "@/constants/social";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ScrollIndicator from "@/components/ScrollIndicator";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";
import PawCursorTrail from "@/components/PawCursorTrail";
import RotatingBadges from "@/components/RotatingBadges";
import GetDirectionsButton from "@/components/GetDirectionsButton";

export default function WaunakeeLocationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouseParallax(heroRef);

  const benefits = [
    {
      title: "Local Waunakee Business",
      description: "As a locally-owned and operated business, we understand the unique needs of Waunakee pet owners. We're your neighbors, committed to providing the best care for your furry family members.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: "Proven Track Record",
      description: "Since 2017, we've been building trust and relationships with Waunakee families. Our experienced team brings over 50 years of combined experience in pet care.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Steps from Yahara Heights Dog Park",
      description: "Just 500 feet from Yahara Heights Dog Park! We're the perfect solution for post-dog park grooming—the only groomer within walking distance of the area's most popular dog park.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Personalized Care",
      description: "We don't treat your dog like just another appointment. Every pet receives individualized attention and care tailored to their unique needs and personality.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Waunakee Location", url: "https://www.riverpaws.dog/locations/waunakee" },
        ]}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-20 left-4 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Waunakee", href: "/locations/waunakee" },
            ]}
            compact
            className="bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md"
          />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Grooming/joyful-papillon-dog-grooming-sun-prairie-wi-river-paws.jpg"
            alt="Joyful Papillon after professional grooming at River Paws near Waunakee, Wisconsin"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Grooming/joyful-papillon-dog-grooming-sun-prairie-wi-river-paws.jpg") }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 z-[1] hero-spotlight-base"></div>
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

        <PawCursorTrail />

        <div className="relative z-[50] max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-4 sm:space-y-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp drop-shadow-2xl">Your Neighbors in</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-200 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Waunakee, Wisconsin
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl mt-2 font-medium text-blue-100 animate-fadeInUp-delay-400 drop-shadow-md">
                Dog Grooming & Adventure Hiking Since 2017
              </span>
            </h1>

            <div className="animate-fadeInUp-delay-400">
              <RotatingBadges />
            </div>

            <p className="hero-description text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto animate-fadeInUp-delay-600 px-4 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Located at 5305 W River Rd—right on the edge of Waunakee and Madison.
              <span className="block mt-1 text-white/80">Convenient parking, easy access, and just steps from Yahara Heights Dog Park.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fadeInUp-delay-800 pt-2">
              <a
                href="https://booking.moego.pet/ol/RiverPaws/book"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
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
              </a>

              <GetDirectionsButton variant="ghost" className="!bg-transparent !border-2 !border-white hover:!bg-white/10 transform hover:scale-105" />
            </div>
          </div>
        </div>

        <ScrollIndicator targetId="location-details-section" />
      </section>

      {/* Location Details Section */}
      <section id="location-details-section" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Visit Us Today
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Conveniently Located in Waunakee
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Easy to find, plenty of parking, and right where you need us—on the edge of Waunakee and Madison.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-slate-700">
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Our Address</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">{contactInfo.address.full}</p>
                    <GetDirectionsButton className="mt-3 !bg-transparent !shadow-none !px-0 !py-0 !min-h-0 !text-blue-600 dark:!text-white hover:!text-blue-700 dark:hover:!text-blue-300 font-medium text-sm [&>svg]:w-4 [&>svg]:h-4" label="Get Directions →" />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                    >
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday – Friday</p>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">{contactInfo.businessHours.weekdays}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Cards */}
            <div className="space-y-6">
              {/* Grooming Card */}
              <Link href="/dog-grooming" className="group block">
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-56 h-56 sm:h-full min-h-[14rem] flex-shrink-0">
                      <Image
                        src="/Grooming/confident-saint-bernard-dog-grooming-waunakee-wi-river-paws.jpg"
                        alt="Saint Bernard getting groomed at River Paws Waunakee"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: getImageObjectPosition("/Grooming/confident-saint-bernard-dog-grooming-waunakee-wi-river-paws.jpg") }}
                        sizes="(max-width: 640px) 100vw, 224px"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">✂️</span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Dog Grooming</h3>
                      </div>
                      <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1 mb-4">
                        <li>• Full-service grooming & breed-specific styling</li>
                        <li>• Bath & brush, nail trim, ear cleaning</li>
                        <li>• Patient groomers who take their time</li>
                      </ul>
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                        Learn more
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Hiking Card */}
              <Link href="/dog-hikes" className="group block">
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-56 h-56 sm:h-full min-h-[14rem] flex-shrink-0">
                      <Image
                        src="/Hiking/happy-goldendoodle-wilderness-trails-waunakee-wi-river-paws.jpg"
                        alt="Happy Goldendoodle on a River Paws adventure hike in Waunakee"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: getImageObjectPosition("/Hiking/happy-goldendoodle-wilderness-trails-waunakee-wi-river-paws.jpg") }}
                        sizes="(max-width: 640px) 100vw, 224px"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏔️</span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Adventure Hiking</h3>
                      </div>
                      <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1 mb-4">
                        <li>• Small group hikes (4-6 dogs max)</li>
                        <li>• Private trail access, pickup & dropoff</li>
                        <li>• Professional handlers, real adventures</li>
                      </ul>
                      <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium text-sm group-hover:gap-2 transition-all">
                        Learn more
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose River Paws Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4">
              Why Waunakee Families Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              More Than Just a Pet Service
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We&apos;re your neighbors, and we treat every dog like family.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hiking/joyful-mixed-pack-dog-hiking-sun-prairie-wi-river-paws.jpg"
            alt="Happy dogs enjoying an adventure hike near Waunakee Wisconsin"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Hiking/joyful-mixed-pack-dog-hiking-sun-prairie-wi-river-paws.jpg") }}
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Your Dog Deserves This
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto drop-shadow-md">
            Hundreds of Waunakee families already trust River Paws. See why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://booking.moego.pet/ol/RiverPaws/book"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center">
                <Image
                  src="/Logos/paw only 72.png"
                  alt=""
                  width={20}
                  height={20}
                  className="mr-2 w-5 h-5 object-contain"
                />
                Book Your Appointment
              </span>
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
