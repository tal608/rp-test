import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Apply for Services | Dog Grooming & Hiking",
  description:
    "Apply for dog grooming, hiking adventures, and puppy play services at River Paws. Complete your application to get started with professional pet care in Waunakee, WI.",
  alternates: {
    canonical: "https://www.riverpaws.dog/apply",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Apply for Services | River Paws",
    description:
      "Apply for dog grooming, hiking adventures, and puppy play services at River Paws in Waunakee, WI.",
    url: "https://www.riverpaws.dog/apply",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Apply for Services | River Paws",
    description:
      "Apply for dog grooming, hiking adventures, and puppy play services at River Paws.",
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

