import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Contact Us | River Paws Dog Grooming & Hiking | Waunakee, WI",
  description:
    "Contact River Paws for dog grooming and hiking services. Located in Waunakee, WI. Call (608) 571-PAWS or email us. Serving Madison, Middleton, DeForest, Sun Prairie.",
  alternates: {
    canonical: "https://www.riverpaws.dog/contact",
  },
  openGraph: {
    title: "Contact River Paws | Waunakee, WI",
    description:
      "Get in touch with River Paws for dog grooming and adventure hiking services. Located in Waunakee, serving Madison and surrounding areas.",
    url: "https://www.riverpaws.dog/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | River Paws Dog Grooming & Hiking",
    description:
      "Contact River Paws for dog grooming and hiking services. Located in Waunakee, WI. Call (608) 571-PAWS or email us.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

