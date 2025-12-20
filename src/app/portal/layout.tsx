import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Online Booking Portal",
  description:
    "Book your dog's grooming or hiking appointment online. Easy scheduling for River Paws services in Waunakee, WI. Select a service and pick a time that works for you.",
  alternates: {
    canonical: "https://www.riverpaws.dog/portal",
  },
  robots: {
    index: false, // Prevent indexing of booking portal
    follow: true, // Allow following links
    noarchive: true, // Don't cache this page
  },
  openGraph: {
    title: "Online Booking Portal | River Paws",
    description:
      "Book your dog's grooming or hiking appointment online. Easy scheduling for River Paws services.",
    url: "https://www.riverpaws.dog/portal",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Online Booking Portal | River Paws",
    description: "Book your dog's appointment online. Easy scheduling for grooming and hiking services.",
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



