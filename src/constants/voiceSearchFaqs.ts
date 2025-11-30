/**
 * Voice Search Optimized FAQs
 * 
 * These FAQs are specifically designed for voice search optimization.
 * They use natural, conversational language that matches how people
 * actually speak to voice assistants like Siri, Google Assistant, and Alexa.
 * 
 * Key characteristics:
 * - Question-based format matching voice queries
 * - Concise answers (under 30 words for featured snippets)
 * - Natural conversational tone
 * - Location-specific "near me" optimization
 * - Direct answers in first sentence
 */

export interface VoiceFAQ {
  question: string;
  answer: string;
  category: "location" | "services" | "pricing" | "booking" | "general";
}

// General business FAQs - most common voice queries
export const generalVoiceFaqs: VoiceFAQ[] = [
  {
    question: "Where can I get my dog groomed near Waunakee?",
    answer: "River Paws offers professional dog grooming at 5305 River Road in Waunakee, Wisconsin. We're located on the border of Waunakee and Madison, next to Yahara Heights Dog Park.",
    category: "location",
  },
  {
    question: "What is the best dog groomer near Madison Wisconsin?",
    answer: "River Paws is a trusted dog groomer serving Madison and surrounding areas since 2017. We're located just north of Madison in Waunakee and have groomed dogs for over 2,000 local families.",
    category: "location",
  },
  {
    question: "Where is River Paws dog grooming?",
    answer: "River Paws is at 5305 River Road, Waunakee, Wisconsin 53597. We're located next to Yahara Heights Dog Park, on the eastern edge of Waunakee.",
    category: "location",
  },
  {
    question: "What is River Paws phone number?",
    answer: "River Paws phone number is (608) 571-7297. That's 608-571-PAWS.",
    category: "general",
  },
  {
    question: "What time does River Paws open?",
    answer: "River Paws is open Monday through Friday from 8:00 AM to 4:30 PM. We are closed on weekends.",
    category: "general",
  },
  {
    question: "Is River Paws open on weekends?",
    answer: "No, River Paws is closed on weekends. We are open Monday through Friday from 8:00 AM to 4:30 PM.",
    category: "general",
  },
];

// Grooming-specific voice FAQs
export const groomingVoiceFaqs: VoiceFAQ[] = [
  {
    question: "How much does dog grooming cost near me?",
    answer: "Dog grooming at River Paws is priced by your dog's weight and coat type. Prices typically range from $45 to $150 depending on the service and size of your dog.",
    category: "pricing",
  },
  {
    question: "How do I book a dog grooming appointment?",
    answer: "Book online at booking.moego.pet/ol/RiverPaws/book or call (608) 571-7297 to schedule your dog's grooming appointment at River Paws.",
    category: "booking",
  },
  {
    question: "Does River Paws do walk-in grooming?",
    answer: "No, River Paws is by appointment only. We do not accept walk-in services. Please book online or call ahead to schedule.",
    category: "booking",
  },
  {
    question: "What grooming services does River Paws offer?",
    answer: "River Paws offers full service grooms with haircuts, bath and brush packages, nail trims, ear cleaning, teeth brushing, and de-shedding treatments.",
    category: "services",
  },
  {
    question: "Do you groom puppies?",
    answer: "Yes, River Paws grooms puppies starting at 12 weeks old after their initial vaccinations. Puppy grooming helps them get comfortable with the grooming process early.",
    category: "services",
  },
  {
    question: "How long does dog grooming take?",
    answer: "Dog grooming at River Paws typically takes 2 to 3 hours depending on the service, your dog's size, and coat condition.",
    category: "services",
  },
  {
    question: "What should I bring to my dog's grooming appointment?",
    answer: "Just bring your dog! We provide all grooming supplies. If your dog has special needs or preferences, let us know when you check in.",
    category: "services",
  },
];

// Hiking-specific voice FAQs
export const hikingVoiceFaqs: VoiceFAQ[] = [
  {
    question: "Where can I find dog hiking near Madison?",
    answer: "River Paws offers small-group dog hikes on private trails near Waunakee and Madison. Our hikes run Monday through Friday with pickup and dropoff service available.",
    category: "services",
  },
  {
    question: "How much do dog hikes cost?",
    answer: "Dog hikes at River Paws range from $37 to $50 per hike, with discounts for owner pickup. Multi-dog households receive additional discounts.",
    category: "pricing",
  },
  {
    question: "Is River Paws accepting new dogs for hiking?",
    answer: "River Paws hiking program is currently at capacity. You can join our waitlist by contacting us. We'll reach out when space becomes available.",
    category: "booking",
  },
  {
    question: "What vaccinations does my dog need for hiking?",
    answer: "Dogs need current rabies, DHPP, and bordetella vaccinations to join River Paws hikes. Good recall skills are also required for off-leash adventures.",
    category: "services",
  },
];

// "Near me" optimized FAQs for local SEO + voice
export const nearMeFaqs: VoiceFAQ[] = [
  {
    question: "Dog grooming near me in Waunakee",
    answer: "River Paws is Waunakee's professional dog grooming salon at 5305 River Road. We offer full service grooming, bath and brush, and nail trims by appointment.",
    category: "location",
  },
  {
    question: "Dog grooming near me in Madison",
    answer: "River Paws serves Madison families from our Waunakee location, just 10 minutes north of downtown Madison via Highway 113. Call (608) 571-7297 to book.",
    category: "location",
  },
  {
    question: "Dog grooming near me in DeForest",
    answer: "River Paws is conveniently located southwest of DeForest on River Road. We're the closest professional groomer to Yahara Heights Dog Park.",
    category: "location",
  },
  {
    question: "Dog grooming near me in Middleton",
    answer: "River Paws serves Middleton families from our Waunakee location on River Road. We're easily accessible via Highway M and 113.",
    category: "location",
  },
  {
    question: "Dog grooming near me in Sun Prairie",
    answer: "River Paws serves Sun Prairie families from our Waunakee location. We're west of Sun Prairie via Highway 19, about a 20-minute drive.",
    category: "location",
  },
];

// Combined export for all voice FAQs
export const allVoiceFaqs = [
  ...generalVoiceFaqs,
  ...groomingVoiceFaqs,
  ...hikingVoiceFaqs,
  ...nearMeFaqs,
];

// Helper to get FAQs by category
export function getVoiceFaqsByCategory(category: VoiceFAQ["category"]): VoiceFAQ[] {
  return allVoiceFaqs.filter((faq) => faq.category === category);
}

// Format FAQs for FAQ schema (strips category)
export function formatForFAQSchema(faqs: VoiceFAQ[]): Array<{ question: string; answer: string }> {
  return faqs.map(({ question, answer }) => ({ question, answer }));
}

