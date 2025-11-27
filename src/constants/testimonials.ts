export interface Testimonial {
  name: string;
  dog: string;
  breed: string;
  service: string;
  text: string;
  rating: number;
  image: string;
  platform?: 'google' | 'facebook';
}

export const testimonials: Testimonial[] = [
  {
    name: "Lindsey Miller",
    dog: "Cooper",
    breed: "Golden Retriever",
    service: "Grooming & Hiking",
    text: "Our dog Cooper absolutely loves his time here! He always comes home tired after a day of play. The team is so friendly and transparent about his day. Best haircut he's ever received!",
    rating: 5,
    image: "/Hiking/joyful-golden-retriever-outdoor-enrichment-waunakee-wi-river-paws.jpg",
    platform: 'google'
  },
  {
    name: "Kathy Mitchell",
    dog: "Luna",
    breed: "Siberian Husky",
    service: "Full Grooming",
    text: "I drive across town just for their groomers - they are fantastic! They do an excellent job with her double coat at a great price. Highly recommend!",
    rating: 5,
    image: "/Grooming/freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg",
    platform: 'facebook'
  },
  {
    name: "Diane Virgin",
    dog: "Schatzi",
    breed: "German Shepherd",
    service: "Full Grooming",
    text: "Schatzi always looks amazing when he gets groomed here. They worked him in at the last minute and were super accommodating. The de-shedding treatment is a miracle.",
    rating: 5,
    image: "/Hiking/focused-german-shepherd-outdoor-enrichment-waunakee-wi-river-paws.jpg",
    platform: 'google'
  },
  {
    name: "Jennifer Marsden",
    dog: "Charlie",
    breed: "Mixed Breed",
    service: "Full Grooming",
    text: "Drop off and pick up was super easy. My dog's coat looks better than it has in months! They really listened to exactly what I wanted.",
    rating: 5,
    image: "/Hiking/happy-alert-brindle-mix-dog-hiking-waunakee-wi-river-paws.jpg",
    platform: 'google'
  },
  {
    name: "Emily Diep",
    dog: "Ralph",
    breed: "Labradoodle",
    service: "Hiking & Training",
    text: "Our puppy absolutely loves this place! The staff is amazing and really works with him individually. We've seen such an improvement in his confidence.",
    rating: 5,
    image: "/Hiking/joyful-goldendoodle-dog-hiking-madison-wi-river-paws.jpg",
    platform: 'facebook'
  },
  {
    name: "Kate Spann",
    dog: "Ruben",
    breed: "Mixed Breed",
    service: "Hiking & Grooming",
    text: "Amazing people who love and know a lot about dogs! They've improved his behavior over the past year. Very understanding and flexible. Thank you!",
    rating: 5,
    image: "/Hiking/joyful-brindle-mix-running-waunakee-wi-river-paws.jpg",
    platform: 'google'
  },
  {
    name: "Michael Chen",
    dog: "Bear",
    breed: "Newfoundland",
    service: "Grooming",
    text: "Finding a groomer who can handle a 150lb dog is hard, but River Paws does it with ease. Bear comes home happy, fluffy, and smelling great.",
    rating: 5,
    image: "/Hiking/peaceful-pointer-spaniel-pack-hiking-madison-wi-river-paws.jpg",
    platform: 'google'
  },
  {
    name: "Sarah Johnson",
    dog: "Bella",
    breed: "Vizsla",
    service: "Adventure Hikes",
    text: "The off-leash hikes are a lifesaver for my high-energy Vizsla. She comes home exhausted and content. The photos they send are the highlight of my day!",
    rating: 5,
    image: "/Hiking/wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg",
    platform: 'facebook'
  },
  {
    name: "David Wilson",
    dog: "Rocky",
    breed: "Boxer Mix",
    service: "Hiking",
    text: "We love the pickup service! It's so convenient. Rocky waits by the window for the River Paws van every Tuesday. Best investment in his happiness.",
    rating: 5,
    image: "/Hiking/confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg",
    platform: 'google'
  },
  {
    name: "Amanda Thomas",
    dog: "Daisy",
    breed: "Cocker Spaniel",
    service: "Grooming",
    text: "They are so gentle with Daisy, who can be nervous at the vet. She wags her tail when we walk in! The cut is always consistent and cute.",
    rating: 5,
    image: "/Grooming/calm-biewer-terrier-grooming-waunakee-wi-river-paws.jpg",
    platform: 'facebook'
  }
];
