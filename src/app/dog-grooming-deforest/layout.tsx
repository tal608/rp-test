import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming for DeForest Families | River Paws | Southwest of DeForest",
  description:
    "Professional grooming serving DeForest pet owners. Full-service styling, breed-specific care, and stress-free handling. Located southwest of DeForest on River Road. Call (608) 571-7297!",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-deforest",
  },
  openGraph: {
    title: "Dog Grooming for DeForest Families | River Paws",
    description:
      "Professional grooming serving DeForest pet owners. Full-service styling and breed-specific care. Book today!",
    url: "https://www.riverpaws.dog/dog-grooming-deforest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming for DeForest Families | River Paws",
    description:
      "Professional grooming serving DeForest pet owners. Full-service styling and breed-specific care.",
  },
};

export default function DogGroomingDeForestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




