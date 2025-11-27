import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal | River Paws",
  description: "Access your River Paws client portal to manage appointments, view records, and communicate with our team."
};

export default function Portal() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-blue-600 to-teal-500 pb-16 pt-24 text-white sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-teal-700/80"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Client Portal
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Book appointments online, manage your pet&apos;s schedule, and access your client portal.
            </p>
          </div>
        </div>
      </section>

      {/* Portal Access - Booking Embed */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8v4a4 4 0 01-8 0v-4m16 0v4a4 4 0 01-8 0v-4m4-8v4m0 0v4a4 4 0 01-8 0v-4m16 0v4a4 4 0 01-8 0v-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Online Booking</h2>
                  <p className="text-blue-100 text-sm">Schedule your pet&apos;s appointment</p>
                </div>
              </div>
            </div>

            {/* Booking Iframe */}
            <div className="p-6">
              <div style={{ width: '100%', height: '800px' }}>
                <iframe
                  src="https://booking.moego.pet/ol/RiverPaws/book?utm_medium=embed"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Online booking"
                  scrolling="no"
                  className="rounded-lg"
                  allow="payment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need Booking Help?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Our team is here to help you schedule appointments and answer any questions about our services.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="mailto:YaharaRiverPaws@gmail.com"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Email Support
              </a>
              <a
                href="tel:608-571-7297"
                className="text-base font-semibold leading-6 text-blue-100 hover:text-white"
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
