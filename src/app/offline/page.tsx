"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

export default function Offline() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/Hiking/curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg"
            alt="Confused dog wondering where the internet went"
            fill
            className="object-cover"
            style={{ objectPosition: getImageObjectPosition("/Hiking/curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg") }}
            priority
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Dog-gone it!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          You seem to have lost your connection. We&apos;re having trouble fetching that fetch.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Fetching Again
        </button>
        
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

