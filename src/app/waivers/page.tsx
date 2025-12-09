"use client";

import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Waivers() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-blue-600 z-0"></div>
        
        {/* Animated Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-teal-400 rounded-full filter blur-[60px] opacity-30 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-20%] w-[50%] h-[50%] bg-emerald-400 rounded-full filter blur-[60px] opacity-30 animate-blob-delay-2"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-400 rounded-full filter blur-[60px] opacity-20 animate-blob-delay-4"></div>
        </div>
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)] z-[2]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="block text-white drop-shadow-lg animate-fadeInUp-delay-200">Service Agreement</span>
            </h1>

            <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto animate-fadeInUp-delay-400">
              Review our service agreement, consent for treatment, assumption of risk &amp; release of liability.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetId="waiver-content" />
      </section>

      {/* Important Notice */}
      <section className="py-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 border-b border-blue-200 dark:border-blue-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-blue-800 dark:text-blue-200">How Our Waiver Process Works</h3>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                This waiver will be signed electronically when you book online. The document below is provided for your reference so you can review the terms before booking. 
                By booking services with River Paws, you agree to these terms via e-signature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waiver Content */}
      <section id="waiver-content" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            {/* Document Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">RIVER PAWS LLC</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                SERVICE AGREEMENT, CONSENT FOR TREATMENT,<br />
                ASSUMPTION OF RISK &amp; RELEASE OF LIABILITY
              </p>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-10 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
              {/* Scope & Parties */}
              <div>
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Scope &amp; Parties.</strong> This Agreement is between River Paws LLC (&ldquo;River Paws,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) and the undersigned owner or authorized agent (&ldquo;Client,&rdquo; &ldquo;I,&rdquo; &ldquo;me&rdquo;). This Agreement applies to all of my dogs (current and future) that use any River Paws services (&ldquo;Dogs&rdquo;). &ldquo;Services&rdquo; include grooming, bathing, daycare, training, off-site hikes/&ldquo;Adventure Out,&rdquo; transportation, and related care.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  OWNER&apos;S COVENANTS (Health &amp; Authority)
                </h3>
                <p>
                  I represent and warrant that I am the legal owner or authorized agent of the Dog(s), I am 18+, and I have authority to enter this Agreement. My Dog(s) are current on required vaccinations (rabies, DHPP, and Bordetella per River Paws policy), free of contagious disease/parasites, and I have disclosed all known medical or behavioral issues (including allergies, orthopedic issues, reactivity, and any bite history). I will promptly update River Paws if any information changes.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  TREATMENT AUTHORIZATION &amp; EMERGENCIES
                </h3>
                <div className="space-y-4 pl-11">
                  <p>
                    <strong>Emergency Veterinary Care.</strong> If River Paws reasonably believes a Dog needs evaluation/treatment, I authorize River Paws to obtain veterinary care. River Paws will attempt to contact me and the primary veterinarian on file first; if unavailable, any licensed veterinarian (including UW Veterinary Care) may treat.
                  </p>
                  <p>
                    <strong>Financial Responsibility.</strong> I am solely responsible for all veterinary and related costs, including costs for injuries my Dog inflicts on other animals or people. River Paws may transport a Dog and may pay a veterinarian on my behalf; I will reimburse promptly upon demand.
                  </p>
                  <p>
                    <strong>End-of-Life.</strong> River Paws will not authorize euthanasia; any such decision must be made by me with a licensed veterinarian unless required by law.
                  </p>
                  <p>
                    <strong>Bite/Quarantine.</strong> I understand bites may trigger legally required reporting/quarantine; I must comply and bear associated costs.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  TRANSPORT, ACTIVITIES &amp; HUMANE HANDLING
                </h3>
                <div className="space-y-4 pl-11">
                  <p>
                    <strong>Transportation.</strong> I consent to transport in River Paws vehicles. Dogs may travel crated and/or secured with harnesses/tethers at River Paws&apos; discretion. GPS/telematics may be used as a convenience only and are not guaranteed.
                  </p>
                  <p>
                    <strong>Group/Off-Leash/Outdoor.</strong> I consent to supervised group activities, off-leash play in secured areas, and outdoor hikes/parks/trails (including Cherokee Dog Park and similar locations). Outdoor environments include terrain, weather, water, wildlife, insects, plants, public interactions, and debris.
                  </p>
                  <p>
                    <strong>Water Exposure.</strong> Where applicable, I consent to supervised water access; drowning and water-borne disease risks cannot be eliminated.
                  </p>
                  <p>
                    <strong>Humane Handling Tools.</strong> For safety, River Paws may use crates, gates, tethers, slip leads, muzzles, or time-outs.
                  </p>
                  <p>
                    <strong>Weather/Air Quality.</strong> River Paws may shorten, modify, or cancel Services due to heat, cold, storms, smoke/air quality, or road conditions without liability.
                  </p>
                  <p>
                    <strong>Right to Refuse/Remove.</strong> River Paws may refuse or discontinue Services, or remove a Dog from group activity, if behavior or health poses risk.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  ILLNESS, MEDICATIONS &amp; GROOMING DISCLOSURES
                </h3>
                <div className="space-y-4 pl-11">
                  <p>
                    <strong>Illness/Exposure.</strong> I will not present a Dog if showing signs of illness (e.g., cough, GI upset, lethargy, fever, skin/ear infection, parasites) and will notify River Paws of exposures (kennel cough, giardia, leptospirosis, etc.) and follow return-to-care guidance.
                  </p>
                  <p>
                    <strong>Medications.</strong> I authorize administration of owner-supplied oral/topical meds per my written instructions on file. Injections/prescription changes are veterinarian-only.
                  </p>
                  <p>
                    <strong>Grooming Risks.</strong> Grooming has inherent risks: clipper/razor irritation, skin sensitivity, nicks/cuts, quicked nails, ear/skin irritation, stress reactions, and discovery of pre-existing conditions.
                  </p>
                  <p>
                    <strong>Matting.</strong> Dematting or shave-down may be required and can reveal skin issues; additional fees apply.
                  </p>
                  <p>
                    <strong>Parasites.</strong> If fleas/ticks are found, I authorize immediate parasite management and facility sanitation at my expense; tick removal is not guaranteed.
                  </p>
                  <p className="italic text-gray-600 dark:text-gray-400">
                    River Paws does not provide veterinary services.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                  ACKNOWLEDGMENT OF RISK &amp; ASSUMPTION OF LIABILITY
                </h3>
                <p className="pl-11">
                  I understand animal services involve inherent risks that cannot be eliminated even with reasonable care, including foreseeable and unforeseeable risks such as dog-to-dog/dog-to-human interactions (bites/scratches/sprains), disease transmission despite vaccination, parasites/insect bites, heat/cold exposure, smoke/air-quality issues, water hazards/drowning, environmental hazards (glass/thorns/toxic plants), transportation incidents, equipment-related injuries, and stress-related medical events. <strong>I voluntarily assume all such inherent risks for my Dog(s) and myself.</strong>
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                  RELEASE, WAIVER &amp; LIABILITY LIMITATIONS
                </h3>
                <div className="space-y-4 pl-11">
                  <p>
                    River Paws maintains liability insurance and professional standards of care consistent with industry best practices. We are responsible for damages caused by our failure to meet these professional standards, up to $2,500 per incident, and fully responsible for any gross negligence or willful misconduct.
                  </p>
                  <p>
                    To the fullest extent permitted by Wisconsin law, <strong>I RELEASE, WAIVE, AND DISCHARGE</strong> River Paws and its owners, officers, employees, contractors, and agents from all claims, liabilities, damages, or losses arising out of or related to the inherent risks described in Section 5, except to the extent caused by River Paws&apos; failure to meet professional standards of care, gross negligence, or willful misconduct.
                  </p>
                  <p>
                    <strong>No Guarantees.</strong> Training/socialization outcomes are not guaranteed.
                  </p>
                  <p>
                    <strong>Monetary Cap.</strong> River Paws&apos; total liability for any claim arising from failure to meet professional standards of care is limited to the greater of: (a) amounts paid by Client in the six (6) months preceding the incident, or (b) $2,500. This limitation does not apply to gross negligence or willful misconduct.
                  </p>
                  <p>
                    <strong>Personal Property.</strong> River Paws is not responsible for loss/damage to collars, leashes, tags, clothing, crates, or other personal effects.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                  INDEMNIFICATION
                </h3>
                <p className="pl-11">
                  I agree to <strong>DEFEND, INDEMNIFY, AND HOLD HARMLESS</strong> River Paws from third-party claims, demands, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from: (a) my Dog&apos;s actions, behavior, or condition; (b) my breach of this Agreement or policies; or (c) inaccurate/incomplete information I provided; including injuries or damages my Dog causes to persons, animals, or property.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                  CANCELLATIONS, LATE ARRIVALS &amp; PICK-UP
                </h3>
                <div className="space-y-4 pl-11">
                  <p>
                    <strong>Grooming Cancellations (Discretionary).</strong> If I cancel within 24 hours (or less) of the appointment start, River Paws may, at its discretion, assess up to 50% of the estimated service cost. River Paws may waive or reduce this fee in its sole discretion, including for emergencies.
                  </p>
                  <p>
                    <strong>How to Cancel.</strong> Call 608-571-7297 or email yaharariverpaws@gmail.com. If applied, cancellation fees are non-refundable unless River Paws approves extraordinary circumstances.
                  </p>
                  <p>
                    <strong>Late Arrival.</strong> $15 fee if 10+ minutes late; service may be declined at groomer&apos;s discretion.
                  </p>
                  <p>
                    <strong>Late Pick-Up/Extended Stay.</strong> $15 fee per dog if a Dog remains 2+ hours past groom completion; additional daycare/boarding rates may apply for extended care.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
                  LOST DOG PROTOCOL (RARE EVENT)
                </h3>
                <p className="pl-11">
                  If a Dog is lost despite reasonable care, River Paws will notify the owner immediately, contact local authorities/shelters, and undertake reasonable search efforts. GPS (if used) is not guaranteed. This clause does not waive claims for gross negligence.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">10</span>
                  ABANDONMENT / FAILURE TO PICK UP
                </h3>
                <p className="pl-11">
                  If I fail to pick up or arrange care within 72 hours after the agreed time and River Paws cannot reach me or my emergency contacts on file, the Dog may be deemed abandoned under applicable law; River Paws may transfer the Dog to a shelter/rescue. I remain responsible for accrued fees and reasonable placement costs. River Paws will make reasonable efforts to contact me first.
                </p>
              </div>

              {/* Section 11 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">11</span>
                  PAYMENTS, CARD AUTHORIZATION &amp; COLLECTIONS
                </h3>
                <p className="pl-11">
                  I agree to pay all fees when due. If I have a payment card on file with River Paws, I authorize charges for Services, applicable fees (cancellation/late/boarding), veterinary reimbursements, and taxes. Past-due balances may incur the lesser of 1.5% per month or the maximum allowed by law, plus reasonable collection costs, as permitted.
                </p>
              </div>

              {/* Section 12 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">12</span>
                  PHOTO/VIDEO (DEFAULT OPT-IN)
                </h3>
                <p className="pl-11">
                  I consent to River Paws using my Dog&apos;s image/video for business records, training, and marketing (including social media) without identifying me by full name. I understand I may opt out of future marketing use by written notice; prior uses and non-marketing uses (e.g., safety/training records) may continue as allowed by law.
                </p>
              </div>

              {/* Section 13 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-8 h-8 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full flex items-center justify-center text-sm font-bold mr-3">13</span>
                  COMMUNICATIONS, UPDATES &amp; MISCELLANEOUS
                </h3>
                <div className="space-y-4 pl-11">
                  <p>
                    This Agreement governs current and future Services until revoked in writing. River Paws may update policies; material changes will be posted or communicated. Routine updates may be sent via text, email, phone or posted online either through the owner portal or website.
                  </p>
                  <p>
                    <strong>Force Majeure.</strong> Neither party is liable for delays/failures due to events beyond reasonable control (e.g., severe weather, utility/communications outages, public emergencies, strikes, pandemics, acts of God).
                  </p>
                  <p>
                    <strong>Governing Law &amp; Venue.</strong> Wisconsin law governs; venue in Dane County, Wisconsin courts.
                  </p>
                  <p>
                    <strong>Severability.</strong> If any provision is unenforceable, the remainder remains in effect.
                  </p>
                  <p>
                    <strong>Entire Agreement; E-Sign; Authority.</strong> This Agreement (with incorporated policies) is the entire agreement. Electronic signatures/copies are valid as originals. One signer binds all owners.
                  </p>
                </div>
              </div>

              {/* Electronic Agreement Notice */}
              <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-6 mt-8 border border-gray-200 dark:border-slate-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ELECTRONIC AGREEMENT
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  By submitting the booking form online, I acknowledge that I have read, understood, and agree to all terms; had the opportunity to seek legal counsel; and affirm the accuracy of information provided. This Agreement applies to all of my current and future dogs that use River Paws services unless I revoke it in writing.
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            This document is provided for reference purposes. The binding agreement will be signed electronically when booking services.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 text-white p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Questions About Our Agreement?</h2>
                <p className="text-teal-100 leading-relaxed mb-8 text-lg max-w-2xl mx-auto">
                  We&apos;re happy to answer any questions about our service agreement or policies before you book.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-white text-teal-600 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Contact Us
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href="tel:608-571-7297"
                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (608) 571-PAWS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
