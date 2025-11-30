import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cityGroomingFaqs } from "@/constants/cityFaqs";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import SafeHtml from "@/components/SafeHtml";
import { contactInfo } from "@/constants/social";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Professional Grooming Products Guide | River Paws",
  description:
    "Expert guide to grooming products for every coat type. Learn about brushes, shampoos, nail clippers, and professional-grade tools. Tips from experienced groomers at River Paws in Waunakee, WI.",
  alternates: {
    canonical: "https://www.riverpaws.dog/canine-grooming",
  },
  openGraph: {
    title: "Professional Grooming Products Guide | River Paws",
    description:
      "Expert guide to grooming products for every coat type. Learn about brushes, shampoos, and professional-grade tools from experienced groomers.",
    url: "https://www.riverpaws.dog/canine-grooming",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Grooming Products Guide | River Paws",
    description:
      "Expert guide to grooming products for every coat type. Professional-grade tools and tips for all dog breeds.",
  },
};

export default function CanineGrooming() {
  const productsFaq = cityGroomingFaqs.waunakee.find(
    (faq) => faq.question.toLowerCase().includes("products") || faq.question.toLowerCase().includes("canine")
  ) || cityGroomingFaqs.waunakee[0];

  const faqForSchema = [{
    question: productsFaq.question,
    answer: productsFaq.answer
  }];

  return (
    <>
      <ServiceSchema serviceType="grooming" />
      <ArticleSchema
        headline={productsFaq.question}
        description="Expert guide to the best products for canine grooming, including brushes, shampoos, and professional tools."
        datePublished="2024-01-15"
        dateModified="2025-01-15"
      />
      <FAQSchema faqs={faqForSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Dog Grooming", url: "https://www.riverpaws.dog/dog-grooming" },
          { name: "Canine Grooming Products", url: "https://www.riverpaws.dog/canine-grooming" },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Dog Grooming", href: "/dog-grooming" },
                { name: "Canine Grooming Products", href: "/canine-grooming" },
              ]}
              className="mb-6 sm:mb-8 text-white/90"
            />
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Professional Grooming Products Guide
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Looking for the best canine grooming products? Expert guide to choosing the right grooming tools and products for your dog.
                Learn about brushes, shampoos, and professional-grade products used at River Paws for canine grooming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/grooming-application"
                  className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg min-h-[44px]"
                >
                  Book Appointment
                </Link>
                <GetDirectionsButton className="bg-transparent border-2 border-white text-white hover:bg-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Main FAQ Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              {/* Header with Image */}
              <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-teal-500">
                <Image
                  src="/Grooming/freshcut-doodle-grooming-waunakee-wi-river-paws.jpg"
                  alt="A freshly groomed black and white doodle dog calmly poses in a River Paws grooming salon in Waunakee, Wisconsin."
                  fill
                  className="object-cover opacity-80"
                  style={{ objectPosition: '50% 40%' }}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white uppercase tracking-wide">
                      Canine Grooming Products Guide
                    </p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {productsFaq.question}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <SafeHtml
                  html={productsFaq.fullContent || `<p>${productsFaq.answer}</p>`}
                  className="article-content text-gray-700 leading-relaxed"
                />
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Professional Grooming Products at River Paws
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                At River Paws, we use only premium, professional-grade products that are safe
                and effective for all dogs. Located in Waunakee at{" "}
                <strong>{contactInfo.address.full}</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/grooming-application"
                  className="bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg min-h-[44px]"
                >
                  Apply for Services
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors min-h-[44px]"
                >
                  Contact Us
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-emerald-100">
                  Call us at{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white font-bold hover:underline"
                  >
                    {contactInfo.phoneDisplay}
                  </a>{" "}
                  to schedule your appointment
                </p>
              </div>
            </div>

            {/* Link to Main Grooming Page */}
            <div className="text-center mt-8">
              <Link
                href="/dog-grooming"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                View All Dog Grooming Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

