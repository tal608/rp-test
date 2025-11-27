import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming in Waunakee/Madison — Bath, Brush, Full Groom | River Paws",
  description:
    "Spa-quality dog grooming near Waunakee & North Madison: bath/brush, full groom, de-shedding, puppy grooms & nail trims. Call 608-571-7297.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-grooming",
  },
  openGraph: {
    title: "Dog Grooming Near Me | Professional Grooming Services | River Paws",
    description:
      "Expert dog grooming near you with experienced professionals in Waunakee and Madison, WI. Serving Middleton, DeForest, Sun Prairie. Walk-in grooming available.",
    url: "https://www.riverpaws.dog/dog-grooming",
    type: "website",
    images: [
      {
        url: "/Madison dog grooming 4.jpg",
        width: 1200,
        height: 630,
        alt: "Professional dog grooming services at River Paws",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming Near Me | Professional Grooming Services | River Paws Waunakee, WI",
    description:
      "Expert dog grooming services near you in Waunakee and Madison, WI. Professional groomers serving Middleton, DeForest, Sun Prairie. Walk-in available.",
    images: ["/Madison dog grooming 4.jpg"],
  },
};

export default function DogGroomingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

