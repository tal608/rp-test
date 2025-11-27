"use client";

import Image from "next/image";
import { testimonials } from "@/constants/testimonials";

const GoogleIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const ReviewCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="w-[350px] max-w-[85vw] flex-shrink-0 bg-white rounded-2xl p-6 shadow-md mr-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start gap-4 mb-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100">
        {testimonial.image.startsWith("/") ? (
          <Image
            src={testimonial.image}
            alt={testimonial.dog}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 flex items-center justify-center text-xl">
            {testimonial.image}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 text-base">{testimonial.name}</h3>
          {testimonial.platform === 'google' && <GoogleIcon />}
          {testimonial.platform === 'facebook' && <FacebookIcon />}
        </div>
        <p className="text-xs text-gray-500">{testimonial.dog} • {testimonial.breed}</p>
        <div className="flex items-center mt-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">
      "{testimonial.text}"
    </p>
    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
        {testimonial.service}
      </span>
      <div className="flex items-center text-gray-400 text-xs">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Verified
      </div>
    </div>
  </div>
);

export default function TestimonialMarquee() {
  // Split testimonials into two rows
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  // DUPLICATE content to create the seamless loop
  // The animation moves -50%, so we need [Original][Duplicate]
  const marqueeRow1 = [...firstRow, ...firstRow];
  const marqueeRow2 = [...secondRow, ...secondRow];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Our Pack Says
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of happy tails in the Madison & Waunakee area.
        </p>
      </div>

      <div className="relative w-full pause-on-hover flex flex-col gap-8">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-blue-50 to-transparent z-20 pointer-events-none"></div>
        
        {/* Row 1 - Normal Direction */}
        {/* w-max is CRITICAL: ensures the container is as wide as the content, not the screen */}
        <div className="flex animate-marquee w-max will-change-transform">
          {marqueeRow1.map((testimonial, index) => (
            <ReviewCard key={`row1-${index}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Row 2 - Reverse Direction */}
        <div className="flex animate-marquee-reverse w-max will-change-transform">
           {marqueeRow2.map((testimonial, index) => (
            <ReviewCard key={`row2-${index}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <div className="flex -space-x-2">
             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-gray-100 p-1">
               <GoogleIcon />
             </div>
             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-gray-100 p-1">
               <FacebookIcon />
             </div>
          </div>
          <span>Rated 5.0/5.0 on Google & Facebook</span>
        </div>
      </div>
    </section>
  );
}
