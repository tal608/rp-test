import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Puppy Play & Socialization | River Paws | Waunakee, WI",
  description:
    "Professional puppy socialization and play services at River Paws. Safe, supervised play sessions help your puppy develop confidence and social skills. Serving Waunakee, Madison, Middleton, DeForest & Sun Prairie.",
  alternates: {
    canonical: "https://www.riverpaws.dog/puppy-play",
  },
  openGraph: {
    title: "Puppy Play & Socialization | River Paws",
    description:
      "Professional puppy socialization and play services. Safe, supervised play sessions help your puppy develop confidence and social skills in Waunakee, WI.",
    url: "https://www.riverpaws.dog/puppy-play",
    type: "website",
    images: [
      {
        url: "/dog-play-yard.jpg",
        width: 1200,
        height: 630,
        alt: "Puppies playing at River Paws in Waunakee, Wisconsin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puppy Play & Socialization | River Paws",
    description:
      "Professional puppy socialization and play services at River Paws. Safe, supervised play sessions in Waunakee, WI.",
    images: ["/dog-play-yard.jpg"],
  },
};

export default function PuppyPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



