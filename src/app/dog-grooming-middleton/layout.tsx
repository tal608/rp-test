import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming for Middleton Families | River Paws | Easy Access via Hwy M",
  description:
    "Professional grooming serving Middleton pet owners. Full-service styling, breed-specific care, and compassionate handling. Easy access via Highway M and 113. Book your appointment!",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-middleton",
  },
  openGraph: {
    title: "Dog Grooming for Middleton Families | River Paws",
    description:
      "Professional grooming serving Middleton pet owners. Full-service styling and breed-specific care. Book today!",
    url: "https://www.riverpaws.dog/dog-grooming-middleton",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming for Middleton Families | River Paws",
    description:
      "Professional grooming serving Middleton pet owners. Full-service styling and breed-specific care.",
  },
};

export default function DogGroomingMiddletonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




