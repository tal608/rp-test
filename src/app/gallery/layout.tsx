import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Photo Gallery | Happy Dogs | Dog Grooming & Hiking",
  description:
    "View our gallery of happy, beautifully groomed dogs and adventure hiking photos at River Paws. See real results from our professional dog grooming and hiking services in Waunakee and Madison, WI since 2017.",
  alternates: {
    canonical: "https://www.riverpaws.dog/gallery",
  },
  openGraph: {
    title: "Gallery | River Paws Dog Grooming & Hiking",
    description:
      "See the smiles, adventures, and transformations from River Paws professional dog grooming and adventure hiking services in Waunakee and Madison, Wisconsin.",
    url: "https://www.riverpaws.dog/gallery",
    type: "website",
    images: [
      {
        url: "/dog-grooming-bath.jpg",
        width: 1200,
        height: 630,
        alt: "Professional dog grooming gallery at River Paws in Waunakee, Wisconsin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Happy Dogs at River Paws Dog Grooming & Hiking",
    description:
      "View our gallery of happy, beautifully groomed dogs and adventure hiking photos at River Paws. See real results from our professional services.",
    images: ["/dog-grooming-bath.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



