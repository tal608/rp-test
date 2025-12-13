export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageClass?: string;
  yearsExperience?: number;
  certifications?: string[];
  education?: string;
  specializations?: string[];
}

export const teamMembers: TeamMember[] = [
  {
    name: "Amanda Masarik",
    role: "Owner",
    bio: "Amanda is the owner and founder of River Paws. She and her fiance Ben live in DeForest with their two kiddos Evie, Kai, dog Journey, and 2 rescue cats, George, and Monkey. Amanda attended UW Madison where she studied communication and Animal Science with an emphasis on behavior. While in school she worked at the UW Veterinary Medical Teaching Hospital. She enjoys working with many animals but especially loves horses, pigs, cows, monkeys, and of course DOGS! Amanda is fascinated by the communication between us humans and our pets and is continually researching the best way to really understand our dogs.",
    image: "/caretakers/amanda-masarik.jpg",
    imageClass: "object-cover object-[50%_20%] scale-150",
    yearsExperience: 8, // Since 2017
    education: "UW Madison - Animal Science (Behavior Emphasis)",
    certifications: ["UW Veterinary Medical Teaching Hospital Experience"],
    specializations: ["Animal Behavior", "Pet Communication", "Veterinary Care"]
  },
  {
    name: "Kelly Esterholm",
    role: "Dog Groomer",
    bio: "Kelly Esterholm has been a professional groomer for about 17 years. She has worked in a corporate and private salon setting as well as vet supervised grooming. She lives in Oregon with her husband Max, her daughter Amelia, and her four legged kid, Buffy. Animals have always been a big part of her life, whether it be growing up with dogs, cats, rabbits, or rats! Her favorite part about being a groomer is taking the time to make your pup feel comfortable in her presence. She really enjoys getting to know each dog's personality and making an ever-lasting connection with you and your pet!",
    image: "/caretakers/kelly-esterholm.png",
    yearsExperience: 17,
    certifications: ["Professional Dog Groomer Certification", "Veterinary Supervised Grooming Experience"],
    specializations: ["Corporate Salon Experience", "Private Salon Experience", "Veterinary-Supervised Grooming", "Stress-Free Grooming"]
  },
  {
    name: "Stephanie Helt",
    role: "Dog Groomer",
    bio: "Hi there! I'm Steph, and I've enjoyed working as a dog groomer for the past eight years. My journey has included owning and operating my own successful grooming business, Bubbles and Mutts, for a couple of years. I'm thrilled to return that experience to the River Paws team. My love for animals began early on, working with livestock like swine and dairy cows. But when I discovered dog grooming, I knew I'd found my calling, and I haven't looked back since! I genuinely enjoy making your pups look and feel their absolute best, and I'm excited to get to know you and your furry family members.",
    image: "/caretakers/stephanie-helt.jpg",
    imageClass: "object-cover object-[35%_60%]",
    yearsExperience: 7,
    certifications: ["Business Owner Experience", "Livestock Experience"],
    specializations: ["Business Ownership", "Livestock Care Background", "Full-Service Grooming"]
  },
  {
    name: "Chloe Lane",
    role: "Adventure Out Dog Hikes",
    bio: "Hi there! I'm Chloe, and I live in Waunakee with my golden retriever, Bear. I grew up with animals my entire life and have a strong passion for them. During high school, I enjoyed my experience at a local veterinary clinic in boarding and daycare. Most recently, I worked at a local dog daycare for almost two years and learned many helpful training and behavioral strategies that I am excited to bring to River Paws! In addition, I enjoy pet sitting for dogs, cats, hamsters, and sometimes birds! I look forward to working with our staff to bond with each dog and getting to know their personality, as well as helping them grow and succeed at River Paws!",
    image: "/caretakers/chloe-lane.jpg",
    yearsExperience: 4, // 2 years daycare + 2 years at River Paws
    certifications: ["Veterinary Clinic Experience", "Dog Daycare Training"],
    specializations: ["Dog Training & Behavior", "Dog Daycare Management", "Group Dog Activities", "Pet Sitting"]
  },
  {
    name: "Elaina Katzke",
    role: "Dog Groomer",
    bio: "Hello! I'm Elaina. I've been grooming for the last year, but I've been working in private salons, corporate salons, and boarding kennels for the previous 5 years, learning and building my skills. I have loved animals from a very young age. From pet sitting to taking care of my own dogs and reptiles, caring for animals has been a large part of my life. I love forming relationships with every dog I groom and helping them look and feel great!",
    image: "/Hiking/relaxed-terrier-mix-outdoor-enrichment-waunakee-wi-river-paws.jpg",
    yearsExperience: 6, // 5 years in salons + 1 year grooming
    certifications: ["Multi-Environment Experience"],
    specializations: ["Private Salon Experience", "Corporate Salon Experience", "Boarding Kennel Experience", "Reptile Care"]
  },
  {
    name: "France Lozano",
    role: "Dog Groomer",
    bio: "My name is France (yes, like the country), and I am a dedicated animal care professional based in Madison. I have been involved in animal care since 2015, with a focus on grooming beginning in 2023, and have assisted sick animals at Underdog Rescue/Veterinary Service since 2020. In my spare time, I pursue arts and crafts and enjoy listening to spooky podcasts. I currently share my home with a cat named Felix; however, I grew up with two pit bulls and a variety of goldfish. My passion for grooming began at a young age when I had the opportunity to pet-sit for neighbors and developed a deep affection for dogs. I view grooming as a valuable art form, and it brings me great joy to see a dog leave my care looking and feeling their best. I take pride in providing each pet with a spa day experience they truly deserve.",
    image: "/caretakers/france-lozano.jpg",
    yearsExperience: 10, // Animal care since 2015, grooming since 2023
    certifications: ["Underdog Rescue/Veterinary Service Experience", "Sick Animal Care Specialist"],
    specializations: ["Rescue Animal Care", "Sick Animal Assistance", "Veterinary Service", "Grooming Artistry", "Spa Day Experience"]
  }
];

