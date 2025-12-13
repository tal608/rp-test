"use client";

import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";
import { contactInfo } from "@/constants/social";

export default function Policies() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 z-0"></div>
        
        {/* Animated Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-emerald-400 rounded-full filter blur-[60px] opacity-30 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-20%] w-[50%] h-[50%] bg-teal-400 rounded-full filter blur-[60px] opacity-30 animate-blob-delay-2"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-400 rounded-full filter blur-[60px] opacity-20 animate-blob-delay-4"></div>
        </div>
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)] z-[2]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="block text-white drop-shadow-lg animate-fadeInUp-delay-200">River Paws Policies</span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto animate-fadeInUp-delay-400">
              Our policies are designed to ensure the best experience for your dog while maintaining fairness for our team and other clients.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="policies-content" />
      </section>

      {/* Content Section */}
      <section id="policies-content" className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Timeliness & Scheduling */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Importance of Timeliness
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">For the Well-being of Your Dog</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Timely arrivals for scheduled appointments are crucial for the well-being of your dog. Punctuality ensures that we can maintain a structured and stress-free grooming environment. Dogs thrive in a predictable and calm atmosphere, and unexpected delays can disrupt their experience.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">For the Groomers&apos; Schedule</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our dog groomers operate on a carefully planned schedule, accommodating multiple appointments throughout the day. When clients arrive late or fail to show up without notice, it can disrupt the entire day&apos;s schedule. This not only affects the groomer&apos;s workload but also the well-being of the dogs waiting for their turn.
                </p>
              </div>
            </div>
          </div>

          {/* Stress Levels */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>
              Impact on Stress Levels
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">For Your Dog</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Dogs are sensitive creatures, and any undue delay or irregularity in their grooming experience can cause anxiety and stress. We aim to provide a calm and stress-free environment for every dog under our care. Timely arrivals contribute significantly to achieving this goal.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-4">For the Groomers</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our dog groomers are experienced professionals who take pride in their work. When appointments run late or are canceled without sufficient notice, it can lead to stress and anxiety for our groomers. This stress can affect their ability to provide the best possible service and care for your pets.
                </p>
              </div>
            </div>
          </div>

          {/* No-Show Fees */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-red-100 to-orange-100 dark:bg-slate-700 dark:from-slate-700 dark:to-slate-700 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              No-Show Fees
            </h2>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 p-8 rounded-2xl border border-red-200 dark:border-red-500/30 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                To ensure the commitment of our clients and the well-being of our groomers, we have implemented a <strong className="text-red-700 dark:text-red-400">50% no-show fee policy</strong>. This fee is in place to address the financial impact on our commission-based groomers when clients do not arrive for scheduled appointments. Groomers rely on a steady stream of appointments to make a living, and last-minute cancellations or no-shows can significantly affect their income.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We understand that emergencies and unforeseen circumstances can arise, and we are always willing to consider exceptions on a case-by-case basis. We encourage clients to communicate with us as soon as possible if they encounter difficulties meeting their appointment commitments.
              </p>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              Cancellation Policy
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mb-4">Last-Minute Cancellation Fee</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you need to cancel a grooming appointment with River Paws within <strong>24 hours or less</strong> of the scheduled date and time, a cancellation fee equivalent to <strong>50% of the expected bill</strong> will be applied.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mb-4">How to Cancel</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To cancel a booking or appointment, please contact us as soon as possible by calling{" "}
                  <a
                    href="tel:608-571-7297"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    608-571-7297
                  </a>{" "}
                  or emailing{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {contactInfo.email}
                  </a>
                  . We understand that unforeseen circumstances may arise, and we appreciate your prompt notification.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mb-4">Reasonable Exceptions</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We understand that emergencies and unexpected situations may occur. In such cases, we will consider exceptions to the cancellation policy on a case-by-case basis. Please contact us immediately to discuss your circumstances.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mb-4">Refund of Cancellation Fees</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Cancellation fees are non-refundable unless we make an exception due to extraordinary circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Fees */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-orange-100 to-amber-100 dark:bg-slate-700 dark:from-slate-700 dark:to-slate-700 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Additional Fees
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-2xl border border-orange-200 dark:border-orange-500/30 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">$15</span>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400">Late Fee</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For being 10 minutes late or more. At this time it is the groomer&apos;s choice if they can still take the dog depending on how late you arrive.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-2xl border border-orange-200 dark:border-orange-500/30 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">$15</span>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400">Boarding Fee</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If your dog is staying 2 or more hours past the completed time of the groom. Please let us know ahead of time if you need your dog to stay late.
                </p>
              </div>
            </div>
          </div>

          {/* Vaccination Policy */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              Vaccination Policy
            </h2>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Dog vaccinations are crucial for several reasons, each contributing to the overall health and well-being of the dog as well as the safety of other pets and people. Please read more about Rabies, Distemper, and Bordetella. These resources cover the essential aspects of each disease, including how they are transmitted, symptoms to watch for, treatment options, and preventive measures. Vaccination remains a crucial element in preventing these diseases, with specific schedules and guidelines available for each condition to protect dogs from these serious health threats. Always consult with a veterinarian to get the most appropriate advice and treatment options for your dog.
              </p>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-emerald-300 dark:border-emerald-700">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-emerald-800 dark:text-emerald-300 font-semibold">
                    We require all dogs to be up to date on rabies, bordetella, and distemper. We will need a copy of these vaccinations before or at the time of your dog&apos;s appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-emerald-800 dark:via-teal-800 dark:to-blue-800 text-white p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Questions About Our Policies?</h2>
                <p className="text-emerald-100 leading-relaxed mb-8 text-lg max-w-2xl">
                  If you have any questions or concerns regarding our policies, please don&apos;t hesitate to contact us. We&apos;re here to help ensure the best experience for you and your dog.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <a href="tel:608-571-7297" className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg group-hover:underline">(608) 571-7297</p>
                      <p className="text-emerald-200 text-sm">Call us anytime</p>
                    </div>
                  </a>

                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg group-hover:underline">{contactInfo.email}</p>
                      <p className="text-emerald-200 text-sm">Email us anytime</p>
                    </div>
                  </a>
                </div>

                <div className="mt-10 pt-8 border-t border-white/20">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Contact Us
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
