import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming Waunakee | Dog Grooming in Waunakee, WI | River Paws Professional Grooming Services",
  description:
    "Dog grooming Waunakee - Professional dog grooming services in Waunakee, Wisconsin. Expert groomers serving Waunakee families with full-service grooming and breed-specific styling. By appointment only. Located at 5305 River Road.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-waunakee",
  },
  openGraph: {
    title: "Dog Grooming Waunakee | Dog Grooming in Waunakee, WI | River Paws",
    description:
      "Dog grooming Waunakee - Professional dog grooming services in Waunakee, Wisconsin. Expert groomers serving Waunakee families with full-service grooming since 2017.",
    url: "https://www.riverpaws.dog/dog-grooming-waunakee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming Waunakee | Dog Grooming in Waunakee, WI | River Paws",
    description:
      "Dog grooming Waunakee - Professional dog grooming services in Waunakee, Wisconsin. Expert groomers serving Waunakee families.",
  },
};

export default function DogGroomingWaunakeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




