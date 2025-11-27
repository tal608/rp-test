import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming DeForest | Dog Grooming in DeForest, WI | River Paws Professional Grooming Services",
  description:
    "Dog grooming DeForest - Professional dog grooming services in DeForest, Wisconsin. Located near Yahara Heights Dog Park. Expert groomers serving DeForest with stress-free grooming. Book online or call (608) 571-7297!",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming-deforest",
  },
  openGraph: {
    title: "Dog Grooming DeForest | Dog Grooming in DeForest, WI | River Paws",
    description:
      "Dog grooming DeForest - Professional dog grooming services in DeForest, Wisconsin. Located near Yahara Heights Dog Park. Expert groomers serving DeForest families.",
    url: "https://www.riverpaws.dog/dog-grooming-deforest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming DeForest | Dog Grooming in DeForest, WI | River Paws",
    description:
      "Dog grooming DeForest - Professional dog grooming services in DeForest, Wisconsin. Located near Yahara Heights Dog Park. Expert groomers.",
  },
};

export default function DogGroomingDeForestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




