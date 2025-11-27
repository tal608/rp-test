"use client";

import { useState, useEffect } from "react";
import type { Testimonial } from "@/types";
import { testimonials } from "@/constants/testimonials";
import ReviewSchema from "@/components/ReviewSchema";

export default function TestimonialCarousel({ customTestimonials }: { customTestimonials?: Testimonial[] }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const displayTestimonials = customTestimonials || testimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % displayTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
      {displayTestimonials.map((testimonial, index) => (
        <ReviewSchema
          key={index}
          name="River Paws"
          rating={testimonial.rating}
          reviewText={testimonial.text}
          authorName={testimonial.name}
        />
      ))}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-bold text-gray-800">What Our Pack Says</h2>
          <p className="text-xl text-gray-600">Real stories from our happy customers</p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-teal-50/0 group-hover:from-blue-50/30 group-hover:via-transparent group-hover:to-teal-50/30 transition-all duration-1000"></div>
            <div className="text-center relative z-10">
              <div className="relative inline-block mb-6">
                <div className="text-6xl transform transition-all duration-700 hover:scale-110 hover:rotate-6 relative z-10">
                  {displayTestimonials[activeTestimonial].image}
                </div>
                <div className="absolute inset-0 text-6xl blur-xl opacity-50 animate-pulse">
                  {displayTestimonials[activeTestimonial].image}
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed transform transition-all duration-500">
                &ldquo;{displayTestimonials[activeTestimonial].text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center mb-4" aria-label={`Rating: ${displayTestimonials[activeTestimonial].rating} out of 5 stars`}>
                {[...Array(displayTestimonials[activeTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <div className="text-gray-600">
                <p className="font-semibold">{displayTestimonials[activeTestimonial].name}</p>
                <p className="text-sm">{displayTestimonials[activeTestimonial].dog} • {displayTestimonials[activeTestimonial].breed}</p>
                <p className="text-sm text-blue-600">{displayTestimonials[activeTestimonial].service}</p>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Testimonial navigation">
            {displayTestimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1} of ${displayTestimonials.length}`}
                aria-current={index === activeTestimonial ? 'true' : 'false'}
                role="tab"
                className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                  index === activeTestimonial
                    ? 'bg-blue-600 scale-150 shadow-lg shadow-blue-500/50'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              >
                {index === activeTestimonial && (
                  <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75" aria-hidden="true"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

