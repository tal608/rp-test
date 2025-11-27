'use client';

import { useState, useEffect } from 'react';

interface EmbeddedFormProps {
  formUrl: string;
  title: string;
  description: string;
}

/**
 * Embedded form component that wraps an external form in an iframe
 * Matches the site's design while loading the Moego form
 */
export default function EmbeddedForm({ formUrl, title, description }: EmbeddedFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Set loading to false after a delay to allow iframe to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-teal-700/80"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12 mb-8">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Loading form...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 sm:p-12 mb-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unable to load form
                </h3>
                <p className="text-gray-600 mb-6">
                  There was an error loading the application form. Please try again later.
                </p>
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Open form in new window
                </a>
              </div>
            </div>
          )}

          {/* Form Iframe */}
          <div
            className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${
              isLoading || hasError ? 'hidden' : 'block'
            }`}
          >
            <div className="relative w-full" style={{ minHeight: '800px' }}>
              <iframe
                src={formUrl}
                className="w-full h-full absolute inset-0"
                style={{ minHeight: '800px' }}
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="clipboard-read; clipboard-write"
                loading="lazy"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What happens next?
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>We&apos;ll review your application within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>You&apos;ll receive a confirmation email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Our team will contact you to schedule</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>All information is kept confidential and secure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




