import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming Sun Prairie | Dog Grooming in Sun Prairie, WI | River Paws Professional Grooming Services",
  description:
    "Dog grooming Sun Prairie - Professional dog grooming services in Sun Prairie, Wisconsin. Expert groomers serving Sun Prairie families with full-service grooming, breed-specific styling, and walk-in appointments. Located near Yahara Heights Dog Park. Trusted since 2017.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-sun-prairie",
  },
  openGraph: {
    title: "Dog Grooming Sun Prairie | Dog Grooming in Sun Prairie, WI | River Paws",
    description:
      "Dog grooming Sun Prairie - Professional dog grooming services in Sun Prairie, Wisconsin. Expert groomers serving Sun Prairie families with full-service grooming since 2017.",
    url: "https://www.riverpaws.dog/dog-grooming-sun-prairie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming Sun Prairie | Dog Grooming in Sun Prairie, WI | River Paws",
    description:
      "Dog grooming Sun Prairie - Professional dog grooming services in Sun Prairie, Wisconsin. Expert groomers serving Sun Prairie families.",
  },
};

export default function DogGroomingSunPrairieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




