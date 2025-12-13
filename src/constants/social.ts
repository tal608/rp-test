export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface DirectoryLink {
  name: string;
  url: string;
  description?: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/yaharariverpaws",
    icon: "/icons/facebook.svg",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/riverpaws.dog",
    icon: "/icons/instagram.svg",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@riverpawsdogs",
    icon: "/icons/tiktok.svg",
  },
  {
    name: "Yelp",
    url: "https://www.yelp.com/biz/river-paws-waunakee",
    icon: "/icons/yelp.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/river-paws",
    icon: "/icons/linkedin.svg",
  },
];

// Directory links - Add URLs as listings are verified/created
// To verify listings, search for "River Paws Waunakee" on each platform
export const directoryLinks: DirectoryLink[] = [
  {
    name: "Google Business Profile",
    url: "https://www.google.com/maps/place/?q=place_id:ChIJKznPS7GqB4gRpU3kZYE4Rb8",
    description: "Find us on Google Maps"
  },
  {
    name: "Yelp",
    url: "https://www.yelp.com/biz/river-paws-waunakee",
    description: "Read reviews on Yelp"
  },
  // Add more as verified:
  // {
  //   name: "Better Business Bureau",
  //   url: "https://www.bbb.org/profile/...",
  //   description: "BBB Accredited Business"
  // },
  // {
  //   name: "Yellow Pages",
  //   url: "https://www.yellowpages.com/...",
  //   description: "Find us on Yellow Pages"
  // },
  // {
  //   name: "Angi",
  //   url: "https://www.angi.com/...",
  //   description: "Angi Verified Business"
  // },
  // {
  //   name: "Manta",
  //   url: "https://www.manta.com/...",
  //   description: "Business Directory Listing"
  // },
];

export const contactInfo = {
  phone: "608-571-7297",
  phoneDisplay: "(608) 571-PAWS",
  email: "YaharaRiverPaws@gmail.com",
  address: {
    street: "5305 W River Rd",
    city: "Waunakee",
    state: "WI",
    zip: "53597",
    full: "5305 W River Rd, Waunakee, WI 53597"
  },
  businessHours: {
    weekdays: "8:00 AM - 4:30 PM",
    saturday: "Closed",
    sunday: "Closed"
  }
};

