import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming in Waunakee, WI | River Paws | Next to Yahara Heights Dog Park",
  description:
    "Professional grooming at 5305 W River Rd in Waunakee. Full-service styling, breed-specific care, and stress-free handling. Walking distance from Yahara Heights Dog Park. Book today!",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-waunakee",
  },
  openGraph: {
    title: "Dog Grooming in Waunakee, WI | River Paws",
    description:
      "Professional grooming at 5305 W River Rd in Waunakee. Full-service styling and breed-specific care. Next to Yahara Heights Dog Park!",
    url: "https://www.riverpaws.dog/dog-grooming-waunakee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming in Waunakee, WI | River Paws",
    description:
      "Professional grooming in Waunakee. Full-service styling and breed-specific care. Book today!",
  },
};

export default function DogGroomingWaunakeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




