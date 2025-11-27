/**
 * Generate JSON-LD structured data for SEO with enhanced Service OfferCatalog
 */

export interface AggregateRating {
  "@type": string;
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
  worstRating?: string;
}

export interface ReviewSchema {
  "@context": string;
  "@type": string;
  itemReviewed: {
    "@type": string;
    name: string;
  };
  reviewRating: {
    "@type": string;
    ratingValue: string;
    bestRating?: string;
    worstRating?: string;
  };
  author: {
    "@type": string;
    name: string;
  };
  reviewBody: string;
  datePublished?: string;
}

export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  image: string;
  "@id": string;
  url: string;
  telephone: string;
  priceRange?: string;
  aggregateRating?: AggregateRating;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification: Array<{
    "@type": string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
  areaServed?: Array<{
    "@type": string;
    name: string;
  }>;
  amenityFeature?: Array<{
    "@type": string;
    name: string;
    value: boolean;
  }>;
}

export interface ServiceSchema {
  "@context": string;
  "@type": string;
  "@id"?: string;
  serviceType: string;
  provider: {
    "@type": string;
    "@id"?: string;
    name: string;
    url: string;
  };
  areaServed: Array<{
    "@type": string;
    name: string;
  }>;
  description: string;
  url?: string;
  hasOfferCatalog?: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      name: string;
    }>;
  };
  offers?: {
    "@type": string;
    lowPrice?: string;
    highPrice?: string;
    priceCurrency?: string;
  };
}

export interface FAQPageSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function getLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "River Paws",
    image: "https://www.riverpaws.dog/og-image.jpg",
    "@id": "https://www.riverpaws.dog/#business",
    url: "https://www.riverpaws.dog",
    telephone: "+1-608-571-7297",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50+",
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "5305 River Road",
      addressLocality: "Waunakee",
      addressRegion: "WI",
      postalCode: "53597",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "43.191789",
      longitude: "-89.445123",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:30",
      },
    ],
    sameAs: [
      "https://www.facebook.com/riverpaws",
      "https://www.instagram.com/riverpaws",
      "https://www.tiktok.com/@riverpaws",
      "https://www.yelp.com/biz/river-paws-waunakee",
      "https://www.google.com/maps/place/River+Paws",
    ],
    areaServed: [
      { "@type": "City", name: "Waunakee" },
      { "@type": "City", name: "Madison" },
      { "@type": "City", name: "Middleton" },
      { "@type": "City", name: "DeForest" },
      { "@type": "City", name: "Sun Prairie" },
    ],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Next to Yahara Heights Dog Park",
        value: true,
      },
    ],
  };
}

export function getReviewSchema(
  name: string,
  rating: number,
  reviewText: string,
  authorName: string,
  datePublished?: string
): ReviewSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "River Paws",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(rating),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
    reviewBody: reviewText,
    datePublished: datePublished || new Date().toISOString().split("T")[0],
  };
}

export function getGroomingServiceSchema(): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.riverpaws.dog/#grooming",
    serviceType: "Dog grooming",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.riverpaws.dog/#business",
      name: "River Paws",
      url: "https://www.riverpaws.dog",
    },
    areaServed: [
      { "@type": "City", name: "Waunakee" },
      { "@type": "City", name: "Madison" },
      { "@type": "City", name: "Middleton" },
      { "@type": "City", name: "DeForest" },
      { "@type": "City", name: "Sun Prairie" },
    ],
    description:
      "Professional dog grooming services including full-service grooming, nail trimming, breed-specific styling, and walk-in grooming options.",
    url: "https://www.riverpaws.dog/dog-grooming",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Grooming Services",
      itemListElement: [
        { "@type": "Offer", name: "Full Body Groom" },
        { "@type": "Offer", name: "Bath & Brush" },
        { "@type": "Offer", name: "De-Shedding / Double-Coat" },
        { "@type": "Offer", name: "Puppy Groom" },
        { "@type": "Offer", name: "Nail Trim / Pawdicure" },
        { "@type": "Offer", name: "Walk-In Nail Trim" },
      ],
    },
  };
}

export function getHikingServiceSchema(): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.riverpaws.dog/#dog-hikes",
    serviceType: "Dog hiking (group hikes, off-leash on private trails)",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.riverpaws.dog/#business",
      name: "River Paws",
      url: "https://www.riverpaws.dog",
    },
    areaServed: [
      { "@type": "City", name: "Waunakee" },
      { "@type": "City", name: "Madison" },
      { "@type": "City", name: "Middleton" },
      { "@type": "City", name: "DeForest" },
      { "@type": "City", name: "Sun Prairie" },
    ],
    description:
      "Adventure dog hiking services with small groups, trained guides, pickup and dropoff service. Adventure Out hiking program for active dogs.",
    url: "https://www.riverpaws.dog/dog-hikes",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "37",
      highPrice: "50",
      priceCurrency: "USD",
    },
  };
}

export function getFAQPageSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
