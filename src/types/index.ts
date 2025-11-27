export interface Testimonial {
  name: string;
  dog: string;
  breed: string;
  service: string;
  text: string;
  rating: number;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ImageData {
  src: string;
  alt: string;
  title: string;
  priority?: boolean;
}

export interface ServicePricing {
  size: string;
  basic: string;
  full: string;
  premium: string;
}

export interface HikePackage {
  type: string;
  price: string;
  features: string[];
}

export interface MousePosition {
  x: number;
  y: number;
}

