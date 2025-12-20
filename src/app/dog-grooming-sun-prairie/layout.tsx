import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming for Sun Prairie Families | 20 Min via Hwy 19",
  description:
    "Professional grooming serving Sun Prairie pet owners. Full-service styling, breed-specific care, and stress-free handling. Just 20 minutes west via Highway 19. Book your appointment!",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-sun-prairie",
  },
  openGraph: {
    title: "Dog Grooming for Sun Prairie Families | River Paws",
    description:
      "Professional grooming serving Sun Prairie pet owners. Full-service styling and breed-specific care. Book today!",
    url: "https://www.riverpaws.dog/dog-grooming-sun-prairie",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming for Sun Prairie Families | River Paws",
    description:
      "Professional grooming serving Sun Prairie pet owners. Full-service styling and breed-specific care.",
  },
};

export default function DogGroomingSunPrairieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




