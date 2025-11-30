import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming in Madison, WI | River Paws | Trusted Since 2017",
  description:
    "Professional grooming for Madison dogs. Full-service styling, breed-specific care, and compassionate handling. 10 min from Cherokee Marsh via Highway 113. Book your appointment today!",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-madison",
  },
  openGraph: {
    title: "Dog Grooming in Madison, WI | River Paws",
    description:
      "Professional grooming for Madison dogs. Full-service styling, breed-specific care, and compassionate handling. Book your appointment today!",
    url: "https://www.riverpaws.dog/dog-grooming-madison",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming in Madison, WI | River Paws",
    description:
      "Professional grooming for Madison dogs. Full-service styling and breed-specific care. Book today!",
  },
};

export default function DogGroomingMadisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




