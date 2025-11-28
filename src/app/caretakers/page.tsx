"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { teamMembers } from "@/constants/team";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import ScrollIndicator from "@/components/ScrollIndicator";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function Caretakers() {
  const heroRef = useRef<HTMLDivElement>(null);

  const mousePosition = useMouseParallax(heroRef);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Team", url: "https://www.riverpaws.dog/caretakers" },
        ]}
      />

      {/* Enhanced Hero Section */}
      {/* IMAGE_PLACEMENT_START: caretakers-hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-24 left-6 z-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Team", href: "/caretakers" },
            ]}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
          />
        </div>
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <Image
            src="/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg"
            alt="The River Paws team smiles with their dogs after a fun Madison grooming day."
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* IMAGE_PLACEMENT_END: caretakers-hero */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-blue-900/60 to-teal-900/70"></div>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-emerald-600/20"></div>

        {/* Floating elements with parallax */}
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-2"
          style={{ transform: `translate(${-mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp">
              <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Meet Your Pet&apos;s New Best Friends Since 2017</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight px-2">
              <span className="block text-white animate-fadeInUp drop-shadow-2xl">Meet the Team</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-fadeInUp-delay-200 relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  River Paws
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></span>
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl mt-6 font-medium text-blue-100 animate-fadeInUp-delay-400 drop-shadow-md">
                Professional Groomers & Adventure Guides in Waunakee
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto animate-fadeInUp-delay-600 px-4">
              Meet our passionate team of experienced groomers and adventure guides. Each member brings years of expertise, 
              genuine love for animals, and a commitment to making every pet&apos;s experience exceptional. 
              Located in Waunakee, serving Madison, Middleton, DeForest, and Sun Prairie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp-delay-800">
              <Link
                href="/dog-grooming"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-medium text-base sm:text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Our Services
                </span>
              </Link>

              <Link
                href="/contact"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-full font-medium text-base sm:text-lg border-2 border-white hover:border-white/80 transform hover:scale-105 transition-all duration-300 overflow-hidden min-h-[44px] flex items-center justify-center"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Our Team
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="team-members" />
      </section>

      {/* Team Members */}
      <section id="team-members" className="py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {teamMembers.map((member) => (
              <div key={member.name} className="group flex flex-col items-start relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-teal-50/0 group-hover:from-blue-50/40 group-hover:to-teal-50/30 transition-all duration-500 rounded-3xl -m-4 p-4"></div>
                <div className="mb-6 w-full relative z-10">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 relative group-hover:scale-[1.02]">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role} at River Paws dog grooming and hiking service in Waunakee, Wisconsin`}
                        fill
                        className={`object-cover object-center group-hover:scale-105 transition-transform duration-700 ${member.imageClass ?? ""}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-100 to-teal-100">
                        <div className="text-center">
                          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-blue-700">Professional Caretaker</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                <div className="w-full relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-lg font-semibold text-blue-600 mb-2 group-hover:text-teal-600 transition-colors duration-300">{member.role}</p>

                  {/* Credentials Display */}
                  <div className="mb-4 space-y-2">
                    {member.yearsExperience && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{member.yearsExperience} years of experience</span>
                      </div>
                    )}
                    {member.education && (
                      <div className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{member.education}</span>
                      </div>
                    )}
                    {member.certifications && member.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {member.certifications.map((cert, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                    )}
                    {member.specializations && member.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {member.specializations.map((spec, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Our Philosophy
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every member of our team shares a common commitment to providing exceptional care
              with compassion, patience, and professionalism.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="group flex flex-col relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-emerald-50/0 to-teal-50/0 group-hover:from-blue-50/30 group-hover:via-emerald-50/20 group-hover:to-teal-50/30 transition-all duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:via-emerald-600 group-hover:to-teal-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  Compassionate Care
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  <p className="flex-auto">
                    We treat every pet as if they were our own, providing gentle, patient care
                    that prioritizes their comfort and well-being.
                  </p>
                </dd>
              </div>

              <div className="group flex flex-col relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-emerald-50/0 to-teal-50/0 group-hover:from-blue-50/30 group-hover:via-emerald-50/20 group-hover:to-teal-50/30 transition-all duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:via-emerald-600 group-hover:to-teal-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Professional Excellence
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  <p className="flex-auto">
                    Our team maintains the highest standards of professionalism with ongoing training
                    and certification in the latest techniques and safety protocols.
                  </p>
                </dd>
              </div>

              <div className="group flex flex-col relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-emerald-50/0 to-teal-50/0 group-hover:from-blue-50/30 group-hover:via-emerald-50/20 group-hover:to-teal-50/30 transition-all duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:via-emerald-600 group-hover:to-teal-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  Team Collaboration
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  <p className="flex-auto">
                    We work together seamlessly to ensure every pet receives consistent, high-quality
                    care and every client has a positive experience.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-16 sm:py-20 overflow-hidden group rounded-none">
        {/* Animated Blobs Background to match homepage location card */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-25%] w-[80%] h-[80%] bg-blue-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
          <div className="absolute top-[-20%] right-[-25%] w-[80%] h-[80%] bg-teal-400 rounded-full filter blur-[60px] opacity-40 animate-blob-2"></div>
          <div className="absolute bottom-[-20%] left-[-25%] w-[80%] h-[80%] bg-green-400 rounded-full filter blur-[60px] opacity-40 animate-blob-3"></div>
          <div className="absolute bottom-[-35%] right-[-10%] w-[65%] h-[65%] bg-emerald-400 rounded-full filter blur-[60px] opacity-40 animate-blob-1"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-4xl drop-shadow-lg">
              Why Choose River Paws?
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-white/90 drop-shadow-md px-4">
              Our team brings decades of combined experience from veterinary hospitals, private salons, rescue organizations, and business ownership—all dedicated to your pet&apos;s comfort and happiness.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "25+ Years Combined Grooming Experience",
                  description: "Kelly brings 17 years, Stephanie has 8+ years including owning her own salon, plus years of additional team expertise",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )
                },
                {
                  title: "UW Madison Animal Science Background",
                  description: "Owner studied Animal Science with behavior emphasis at UW, plus veterinary hospital experience",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  )
                },
                {
                  title: "Rescue & Veterinary Experience",
                  description: "Team members assist with sick animals and work closely with veterinary clinics and rescue organizations",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  )
                },
                {
                  title: "Personalized Care Philosophy",
                  description: "Every groomer takes time to understand each dog&apos;s personality, building lasting connections with pets and owners",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )
                }
              ].map((item, index) => (
                <div key={index} className="text-center group/item">
                  <div className="mx-auto h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm group-hover/item:bg-white/20 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white drop-shadow-md mb-2">{item.title}</h3>
                  <p className="text-sm text-white/80 drop-shadow-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Ready to Meet Our Team?
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-gray-600 px-4">
              Experience the difference our dedicated, professional team can make for your pet.
              Contact us today to schedule your first visit.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <a
                href="/contact"
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
                  Contact Us
                </span>
              </a>
              <a
                href="/services"
                className="text-base font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-300"
              >
                View Services <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
