import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waivers & Forms | River Paws",
  description: "Download liability waivers, consent forms, and other important documents for River Paws services."
};

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
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-emerald-600 pb-16 pt-24 text-white sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/80"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Waivers & Forms
            </h1>
            <p className="mt-6 text-lg leading-8 text-emerald-100">
              Download and complete the necessary forms for your pet&apos;s safety and our service records.
              All required documents must be completed before services begin.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-800">Important Notice</h3>
              <p className="mt-1 text-sm text-amber-700">
                <strong>Required waivers must be completed and signed before any services can begin.</strong>
                Please download, print, and bring completed forms to your first appointment, or email scanned copies to
                <a href="mailto:YaharaRiverPaws@gmail.com" className="font-medium underline"> YaharaRiverPaws@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waiver Documents */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Available Forms & Waivers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Select the forms you need based on the services you&apos;re interested in.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {waivers.map((waiver) => (
              <div key={waiver.title} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      waiver.required
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {waiver.icon === 'document' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {waiver.icon === 'hiking' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      )}
                      {waiver.icon === 'play' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {waiver.icon === 'contact' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                      {waiver.icon === 'medical' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                      {waiver.icon === 'contract' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{waiver.title}</h3>
                        {waiver.required && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Required
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{waiver.description}</p>

                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors">
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
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
              How to Complete Forms
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Download & Print</h3>
                  <p className="text-gray-600">
                    Download the required forms from this page and print them out. You can also fill them out digitally if you prefer.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete All Fields</h3>
                  <p className="text-gray-600">
                    Fill out all required information completely. Please use blue or black ink if filling out by hand.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign & Date</h3>
                  <p className="text-gray-600">
                    Sign and date all required signature lines. Both parent/guardian signatures may be required for minors.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Forms</h3>
                  <p className="text-gray-600">
                    Bring completed forms to your appointment or email scanned copies to
                    <a href="mailto:YaharaRiverPaws@gmail.com" className="text-emerald-600 font-medium"> YaharaRiverPaws@gmail.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-emerald-600 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need Help with Forms?
            </h2>
            <p className="mt-6 text-lg leading-8 text-emerald-100">
              Our team is here to help you complete any forms or answer questions about our waiver process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-emerald-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Support
              </a>
              <a
                href="tel:608-571-7297"
                className="text-base font-semibold leading-6 text-emerald-100 hover:text-white"
              >
                Call (608) 571-PAWS <span aria-hidden="true">📞</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
