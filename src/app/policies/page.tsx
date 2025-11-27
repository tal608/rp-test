import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies | River Paws",
  description: "River Paws policies including grooming policies, cancellation fees, vaccination requirements, and terms of service."
};

export default function Policies() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 mb-4">
          River Paws Policies
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our policies are designed to ensure the best experience for your dog while maintaining fairness for our team and other clients.
        </p>
      </div>

      {/* Timeliness & Scheduling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Importance of Timeliness</h2>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">For the Well-being of Your Dog</h3>
          <p className="text-gray-700 leading-relaxed">
            Timely arrivals for scheduled appointments are crucial for the well-being of your dog. Punctuality ensures that we can maintain a structured and stress-free grooming environment. Dogs thrive in a predictable and calm atmosphere, and unexpected delays can disrupt their experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">For the Groomers&apos; Schedule</h3>
          <p className="text-gray-700 leading-relaxed">
            Our dog groomers operate on a carefully planned schedule, accommodating multiple appointments throughout the day. When clients arrive late or fail to show up without notice, it can disrupt the entire day&apos;s schedule. This not only affects the groomer&apos;s workload but also the well-being of the dogs waiting for their turn.
          </p>
        </div>
      </section>

      {/* Stress Levels */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact on Stress Levels</h2>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">For Your Dog</h3>
          <p className="text-gray-700 leading-relaxed">
            Dogs are sensitive creatures, and any undue delay or irregularity in their grooming experience can cause anxiety and stress. We aim to provide a calm and stress-free environment for every dog under our care. Timely arrivals contribute significantly to achieving this goal.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">For the Groomers</h3>
          <p className="text-gray-700 leading-relaxed">
            Our dog groomers are experienced professionals who take pride in their work. When appointments run late or are canceled without sufficient notice, it can lead to stress and anxiety for our groomers. This stress can affect their ability to provide the best possible service and care for your pets.
          </p>
        </div>
      </section>

      {/* No-Show Fees */}
      <section className="mb-12">
        <div className="bg-red-50 p-8 rounded-lg border border-red-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">No-Show Fees</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To ensure the commitment of our clients and the well-being of our groomers, we have implemented a 50% no-show fee policy. This fee is in place to address the financial impact on our commission-based groomers when clients do not arrive for scheduled appointments. Groomers rely on a steady stream of appointments to make a living, and last-minute cancellations or no-shows can significantly affect their income.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We understand that emergencies and unforeseen circumstances can arise, and we are always willing to consider exceptions on a case-by-case basis. We encourage clients to communicate with us as soon as possible if they encounter difficulties meeting their appointment commitments.
          </p>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Cancellation Policy</h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-emerald-700 mb-4">Last-Minute Cancellation Fee</h3>
            <p className="text-gray-700 leading-relaxed">
              If you need to cancel a grooming appointment with River Paws within 24 hours or less of the scheduled date and time, a cancellation fee equivalent to 50% of the expected bill will be applied.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-emerald-700 mb-4">How to Cancel</h3>
            <p className="text-gray-700 leading-relaxed">
              To cancel a booking or appointment, please contact us as soon as possible by calling 608-571-7297 or emailing riverpawsgrooming@gmail.com. We understand that unforeseen circumstances may arise, and we appreciate your prompt notification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-emerald-700 mb-4">Reasonable Exceptions</h3>
            <p className="text-gray-700 leading-relaxed">
              We understand that emergencies and unexpected situations may occur. In such cases, we will consider exceptions to the cancellation policy on a case-by-case basis. Please contact us immediately to discuss your circumstances.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-emerald-700 mb-4">Refund of Cancellation Fees</h3>
            <p className="text-gray-700 leading-relaxed">
              Cancellation fees are non-refundable unless we make an exception due to extraordinary circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Fees</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-xl font-semibold text-orange-700 mb-4">Late Fee</h3>
            <p className="text-gray-700 leading-relaxed">
              $15 Late Fee for being 10 minutes late or more. At this time it is the groomer&apos;s choice if they can still take the dog depending on how late you arrive.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-xl font-semibold text-orange-700 mb-4">Boarding Fee</h3>
            <p className="text-gray-700 leading-relaxed">
              $15 Boarding fee if your dog is staying 2 or more hours past the completed time of the groom. Please let us know ahead of time if you need your dog to stay late.
            </p>
          </div>
        </div>
      </section>

      {/* Vaccination Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Vaccination Policy</h2>

        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
          <p className="text-gray-700 leading-relaxed mb-6">
            Dog vaccinations are crucial for several reasons, each contributing to the overall health and well-being of the dog as well as the safety of other pets and people. Please read more about Rabies, Distemper, and Bordetella. These resources cover the essential aspects of each disease, including how they are transmitted, symptoms to watch for, treatment options, and preventive measures. Vaccination remains a crucial element in preventing these diseases, with specific schedules and guidelines available for each condition to protect dogs from these serious health threats. Always consult with a veterinarian to get the most appropriate advice and treatment options for your dog.
          </p>

          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <p className="text-blue-800 font-semibold">
              We require all dogs to be up to date on rabies, bordetella, and distemper. We will need a copy of these vaccinations before or at the time of your dog&apos;s appointment.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-emerald-600 text-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Questions About Our Policies?</h2>
        <p className="text-emerald-100 leading-relaxed mb-6">
          If you have any questions or concerns regarding our policies, please don&apos;t hesitate to contact us. We&apos;re here to help ensure the best experience for you and your dog.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <div>
              <p className="font-semibold">(608) 571-7297</p>
              <p className="text-emerald-200 text-sm">Call us anytime</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div>
              <p className="font-semibold">yaharariverpaws@gmail.com</p>
              <p className="text-emerald-200 text-sm">Email us anytime</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
