import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Meet Our Team | Expert Dog Groomers & Hiking Guides | River Paws",
  description:
    "Meet the experienced team at River Paws. Professional dog groomers and adventure hiking guides with decades of combined experience. Serving Waunakee, Madison, and surrounding Wisconsin communities since 2017.",
  alternates: {
    canonical: "https://www.riverpaws.dog/caretakers",
  },
  openGraph: {
    title: "Meet Our Expert Team | River Paws",
    description:
      "Experienced professional dog groomers and hiking guides serving Waunakee, Madison, and surrounding communities.",
    url: "https://www.riverpaws.dog/caretakers",
    type: "website",
    images: [
      {
        url: "/hero-dog-grooming.jpg",
        width: 1200,
        height: 630,
        alt: "River Paws professional team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Team | Expert Dog Groomers & Hiking Guides | River Paws",
    description:
      "Meet the experienced team at River Paws. Professional dog groomers and adventure hiking guides serving Waunakee, Madison, and surrounding communities.",
    images: ["/hero-dog-grooming.jpg"],
  },
};

export default function CaretakersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



