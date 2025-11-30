import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming Madison | Dog Grooming in Madison, WI | River Paws Professional Grooming Services",
  description:
    "Dog grooming Madison - Professional dog grooming services in Madison, Wisconsin. Expert groomers serving Madison families with full-service grooming and breed-specific styling. By appointment only. Trusted since 2017.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-madison",
  },
  openGraph: {
    title: "Dog Grooming Madison | Dog Grooming in Madison, WI | River Paws",
    description:
      "Dog grooming Madison - Professional dog grooming services in Madison, Wisconsin. Expert groomers serving Madison families with full-service grooming since 2017.",
    url: "https://www.riverpaws.dog/dog-grooming-madison",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming Madison | Dog Grooming in Madison, WI | River Paws",
    description:
      "Dog grooming Madison - Professional dog grooming services in Madison, Wisconsin. Expert groomers serving Madison families.",
  },
};

export default function DogGroomingMadisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




