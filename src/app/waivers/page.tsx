"use client";

import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";

const waivers = [
  {
    title: "General Liability Waiver",
    description: "Required waiver for all River Paws services including grooming, hiking, and puppy play.",
    fileName: "general-liability-waiver.pdf",
    required: true,
    icon: "document"
  },
  {
    title: "Dog Hiking Release Form",
    description: "Specific waiver for participation in our Adventure Out hiking program.",
    fileName: "hiking-release-form.pdf",
    required: true,
    icon: "hiking"
  },
  {
    title: "Puppy Play Waiver",
    description: "Waiver for puppy socialization and play group activities.",
    fileName: "puppy-play-waiver.pdf",
    required: true,
    icon: "play"
  },
  {
    title: "Emergency Contact Form",
    description: "Emergency contact information and medical authorization form.",
    fileName: "emergency-contact-form.pdf",
    required: true,
    icon: "contact"
  },
  {
    title: "Vaccination Record Template",
    description: "Template for submitting your pet's vaccination records.",
    fileName: "vaccination-record-template.pdf",
    required: false,
    icon: "medical"
  },
  {
    title: "Service Agreement",
    description: "Terms and conditions for ongoing service agreements.",
    fileName: "service-agreement.pdf",
    required: false,
    icon: "contract"
  }
];

export default function Waivers() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-blue-600 z-0"></div>
        
        {/* Animated Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-teal-400 rounded-full filter blur-[60px] opacity-30 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-20%] w-[50%] h-[50%] bg-emerald-400 rounded-full filter blur-[60px] opacity-30 animate-blob-delay-2"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-400 rounded-full filter blur-[60px] opacity-20 animate-blob-delay-4"></div>
        </div>
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)] z-[2]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="block text-white drop-shadow-lg animate-fadeInUp-delay-200">Waivers & Forms</span>
            </h1>

            <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto animate-fadeInUp-delay-400">
              Download and complete the necessary forms for your pet&apos;s safety and our service records.
              All required documents must be completed before services begin.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="waivers-content" />
      </section>

      {/* Important Notice */}
      <section className="py-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b border-amber-200 dark:border-amber-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300">Important Notice</h3>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                <strong>Required waivers must be completed and signed before any services can begin.</strong>{" "}
                Please download, print, and bring completed forms to your first appointment, or email scanned copies to{" "}
                <a href="mailto:YaharaRiverPaws@gmail.com" className="font-medium underline hover:text-amber-900 dark:hover:text-amber-200">YaharaRiverPaws@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waiver Documents */}
      <section id="waivers-content" className="py-16 sm:py-24 bg-gradient-to-b from-white to-teal-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Available Forms & Waivers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Select the forms you need based on the services you&apos;re interested in.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {waivers.map((waiver) => (
              <div key={waiver.title} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                      waiver.required
                        ? 'bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50'
                        : 'bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50'
                    }`}>
                      {waiver.icon === 'document' && (
                        <svg className={`w-7 h-7 ${waiver.required ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {waiver.icon === 'hiking' && (
                        <svg className={`w-7 h-7 ${waiver.required ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      )}
                      {waiver.icon === 'play' && (
                        <svg className={`w-7 h-7 ${waiver.required ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {waiver.icon === 'contact' && (
                        <svg className={`w-7 h-7 ${waiver.required ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                      {waiver.icon === 'medical' && (
                        <svg className={`w-7 h-7 ${waiver.required ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                      {waiver.icon === 'contract' && (
                        <svg className={`w-7 h-7 ${waiver.required ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{waiver.title}</h3>
                        {waiver.required && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300">
                            Required
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{waiver.description}</p>

                      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white text-sm font-medium rounded-full hover:from-teal-700 hover:to-emerald-700 dark:hover:from-teal-600 dark:hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-12">
              How to Complete Forms
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Download & Print</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Download the required forms from this page and print them out. You can also fill them out digitally if you prefer.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Complete All Fields</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out all required information completely. Please use blue or black ink if filling out by hand.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sign & Date</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sign and date all required signature lines. Both parent/guardian signatures may be required for minors.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Submit Forms</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Bring completed forms to your appointment or email scanned copies to{" "}
                    <a href="mailto:YaharaRiverPaws@gmail.com" className="text-teal-600 dark:text-teal-400 font-medium hover:underline">YaharaRiverPaws@gmail.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-teal-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 dark:from-teal-800 dark:via-emerald-800 dark:to-blue-800 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Need Help with Forms?</h2>
                <p className="text-teal-100 leading-relaxed mb-8 text-lg max-w-2xl mx-auto">
                  Our team is here to help you complete any forms or answer questions about our waiver process.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-white text-teal-600 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Contact Support
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href="tel:608-571-7297"
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (608) 571-PAWS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
