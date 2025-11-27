/**
 * Author data for blog articles
 * Links blog content to team members for E-E-A-T signals
 */

export interface Author {
  name: string;
  role: string;
  bio: string;
  image?: string;
  teamMemberSlug?: string; // Link to team member on caretakers page
  credentials?: string[];
  yearsExperience?: number;
}

export const authors: Record<string, Author> = {
  "River Paws": {
    name: "River Paws Team",
    role: "Professional Dog Groomers",
    bio: "Our experienced team of professional groomers brings decades of combined expertise in dog grooming, animal behavior, and veterinary care. Serving Waunakee, Madison, Middleton, DeForest, and Sun Prairie since 2017.",
    credentials: [
      "25+ Years Combined Grooming Experience",
      "UW Madison Animal Science Background",
      "Veterinary Hospital Experience",
      "Rescue & Veterinary Service Experience"
    ],
    yearsExperience: 8, // Since 2017
  },
};

// Helper function to get author data
export function getAuthor(authorName: string): Author {
  return authors[authorName] || authors["River Paws"];
}




