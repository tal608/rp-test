import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming & Hiking in Waunakee, WI",
  description:
    "Professional dog grooming and adventure hiking services in Waunakee, Wisconsin. Expert groomers and hiking guides serving Waunakee families since 2017. Located at 5305 W River Rd.",
  alternates: {
    canonical: "https://www.riverpaws.dog/locations/waunakee",
  },
  openGraph: {
    title: "Dog Grooming & Hiking in Waunakee, WI | River Paws",
    description:
      "Professional dog grooming and adventure hiking services in Waunakee, Wisconsin. Serving Waunakee families since 2017.",
    url: "https://www.riverpaws.dog/locations/waunakee",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming & Hiking in Waunakee, WI | River Paws",
    description:
      "Professional dog grooming and adventure hiking services in Waunakee, Wisconsin.",
  },
};

export default function WaunakeeLocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

