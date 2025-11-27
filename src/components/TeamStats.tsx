"use client";

import Link from "next/link";

const StatCard = ({
  number,
  label,
  subtext,
  icon,
}: {
  number: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}) => (
  <div className="team-stat-card group relative rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
    <div className="stat-card-hover-overlay-light pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="stat-card-hover-overlay-dark pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="stat-card-decor absolute -right-8 -top-8 opacity-30 group-hover:opacity-15 group-hover:scale-110 transition-all duration-500 transform rotate-12">
      {icon}
    </div>

    <div className="relative z-10">
      <div className="stat-card-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
        <div className="w-8 h-8">
          {icon}
        </div>
      </div>

      <div className="stat-card-number text-4xl md:text-5xl font-bold mb-2 tracking-tight transition-all duration-300">
        {number}
      </div>
      <h3 className="stat-card-title text-xl font-semibold mb-3">
        {label}
      </h3>
      <p className="stat-card-subtext leading-relaxed text-sm">
        {subtext}
      </p>
    </div>
  </div>
);

export default function TeamStats() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 dark:bg-blue-900/50 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our Pack Leaders
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our experienced, trained team of professional groomers and hiking guides are dedicated to your dog's happiness and safety.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <StatCard
            number="2017"
            label="Serving Madison"
            subtext="Established locally and trusted by the community for over 7 years. We aren't just an app; we're your neighbors."
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          
          <StatCard
            number="50+"
            label="Years Combined Experience"
            subtext="Our team brings decades of grooming, veterinary, and professional animal care experience to every appointment."
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
          />

          <StatCard
            number="2k+"
            label="Happy Local Families"
            subtext="Join thousands of satisfied pet parents in Waunakee, Madison, and Sun Prairie who trust us with their best friends."
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />
        </div>

        <div className="text-center">
          <Link
            href="/caretakers"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            Meet the Full Team
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

