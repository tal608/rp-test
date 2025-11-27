import { Metadata } from "next";
import Link from "next/link";
import GetDirectionsButton from "@/components/GetDirectionsButton";
import { contactInfo } from "@/constants/social";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming & Hiking in Waunakee, WI | River Paws",
  description:
    "Professional dog grooming and adventure hiking services in Waunakee, Wisconsin. Expert groomers and hiking guides serving Waunakee families since 2017. Located at 5305 River Road.",
  alternates: {
    canonical: "https://www.riverpaws.dog/locations/waunakee",
  },
  openGraph: {
    title: "Dog Grooming & Hiking in Waunakee, WI | River Paws",
    description:
      "Professional dog grooming and adventure hiking services in Waunakee, Wisconsin. Serving Waunakee families since 2017.",
    url: "https://www.riverpaws.dog/locations/waunakee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming & Hiking in Waunakee, WI | River Paws",
    description:
      "Professional dog grooming and adventure hiking services in Waunakee, Wisconsin.",
  },
};

export default function WaunakeeLocationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Dog Grooming & Hiking Services in Waunakee, Wisconsin
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Located right here in Waunakee at 5305 River Road, River Paws has been serving your
            neighbors since 2017 with professional dog grooming and adventure hiking services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Schedule Appointment
            </Link>
            <GetDirectionsButton />
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Convenient Waunakee Location
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Address</h3>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>{contactInfo.address.full}</strong>
                </p>
                <p className="text-gray-600 mb-6">
                  We&apos;re conveniently located on the edge of Waunakee and Madison, making us
                  easily accessible from throughout the area with convenient parking and easy
                  access. Just 500 feet from Yahara Heights Dog Park, we&apos;re the perfect solution 
                  for post-dog park grooming and cleanup - making us the only groomer walking distance from 
                  the area&apos;s most popular dog park!
                </p>
                <GetDirectionsButton className="w-full sm:w-auto" />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    {contactInfo.phoneDisplay}
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    {contactInfo.email}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Hours:</strong> {contactInfo.businessHours.weekdays} (Monday - Friday)
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Services in Waunakee</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Dog Grooming</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Full-service grooming</li>
                      <li>• Breed-specific styling</li>
                      <li>• Walk-in appointments</li>
                      <li>• Nail trimming & ear cleaning</li>
                    </ul>
                    <Link
                      href="/dog-grooming"
                      className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Learn more →
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Adventure Hiking</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Small group hikes</li>
                      <li>• Private trail access</li>
                      <li>• Pickup & dropoff available</li>
                      <li>• Professional dog handlers</li>
                    </ul>
                    <Link
                      href="/dog-hikes"
                      className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose River Paws in Waunakee */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Waunakee Families Choose River Paws
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Local Waunakee Business
                </h3>
                <p className="text-gray-600">
                  As a locally-owned and operated business, we understand the unique needs of
                  Waunakee pet owners. We&apos;re your neighbors, and we&apos;re committed to
                  providing the best care for your furry family members.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Proven Track Record</h3>
                <p className="text-gray-600">
                  Since 2017, we&apos;ve been building trust and relationships with Waunakee
                  families. Our experienced team brings over 50 years of combined experience in pet
                  care.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Convenient Location</h3>
                <p className="text-gray-600">
                  Our location on River Road makes us easily accessible from anywhere in Waunakee,
                  with convenient parking and flexible scheduling to fit your busy life.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personalized Care</h3>
                <p className="text-gray-600">
                  We don&apos;t treat your dog like just another appointment. Every pet receives
                  individualized attention and care tailored to their unique needs and personality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Best Pet Care in Waunakee?
          </h2>
          <p className="text-xl mb-8">
            Join the hundreds of Waunakee families who trust River Paws with their beloved pets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Apply for Services
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

