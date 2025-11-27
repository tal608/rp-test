"use client";

import { useState } from "react";
import type { FAQ } from "@/types";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  variant?: "section" | "div";
  className?: string;
}

export default function FAQSection({ 
  faqs, 
  title = "Frequently Asked Questions", 
  description,
  variant = "section",
  className = ""
}: FAQSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const content = (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-bold text-gray-800">{title}</h2>
          {description && <p className="text-xl text-gray-600">{description}</p>}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl border border-gray-200/50 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
                style={{
                  transform: isOpen ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
                {/* Gradient accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-emerald-600 to-teal-500 transition-all duration-500 ${
                  isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
                
                {/* Background gradient on hover/open */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/0 via-emerald-50/0 to-teal-50/0 transition-all duration-500 ${
                  isOpen ? 'from-blue-50/30 via-emerald-50/20 to-teal-50/30 group-hover:from-blue-50/40' : 'group-hover:from-blue-50/20 group-hover:via-emerald-50/10 group-hover:to-teal-50/20'
                }`}></div>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="relative w-full px-8 py-6 text-left flex items-center justify-between gap-4 group/button"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon wrapper */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isOpen 
                        ? 'bg-gradient-to-br from-blue-600 to-emerald-600 text-white scale-110' 
                        : 'bg-gradient-to-br from-blue-100 to-emerald-100 text-blue-600 group-hover/button:scale-110 group-hover/button:rotate-6'
                    }`}>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={isOpen 
                            ? "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                            : "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          } 
                        />
                      </svg>
                    </div>
                    
                    <span className={`font-semibold text-lg transition-all duration-300 flex-1 ${
                      isOpen ? 'text-gray-900' : 'text-gray-800 group-hover/button:text-blue-600'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen 
                      ? 'bg-gradient-to-br from-blue-600 to-teal-500 text-white rotate-180 scale-110' 
                      : 'bg-gray-100 text-gray-500 group-hover/button:bg-blue-100 group-hover/button:text-blue-600 group-hover/button:scale-110'
                  }`}>
                    <svg
                      className="w-4 h-4 transform transition-transform duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  aria-labelledby={`faq-question-${index}`}
                  className={`relative overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-6 pl-20">
                    <div className={`prose prose-lg text-gray-700 leading-relaxed transition-all duration-500 ${
                      isOpen ? 'translate-y-0' : '-translate-y-2'
                    }`}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );

  if (variant === "section") {
    return (
      <section className="py-24 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white">
        {content}
      </section>
    );
  }

  return content;
}

