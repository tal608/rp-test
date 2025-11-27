import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming Middleton | Dog Grooming in Middleton, WI | River Paws Professional Grooming Services",
  description:
    "Dog grooming Middleton - Professional dog grooming services in Middleton, Wisconsin. Expert groomers serving Middleton families with full-service grooming, breed-specific styling, and walk-in appointments. Located near Yahara Heights Dog Park. Trusted since 2017.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-middleton",
  },
  openGraph: {
    title: "Dog Grooming Middleton | Dog Grooming in Middleton, WI | River Paws",
    description:
      "Dog grooming Middleton - Professional dog grooming services in Middleton, Wisconsin. Expert groomers serving Middleton families with full-service grooming since 2017.",
    url: "https://www.riverpaws.dog/dog-grooming-middleton",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming Middleton | Dog Grooming in Middleton, WI | River Paws",
    description:
      "Dog grooming Middleton - Professional dog grooming services in Middleton, Wisconsin. Expert groomers serving Middleton families.",
  },
};

export default function DogGroomingMiddletonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




