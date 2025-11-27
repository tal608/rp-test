import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming Application | River Paws",
  description:
    "Apply for professional dog grooming services at River Paws in Waunakee, WI. Complete your application to get started with our expert groomers.",
  alternates: {
    canonical: "https://www.riverpaws.dog/grooming-application",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Dog Grooming Application | River Paws",
    description:
      "Apply for professional dog grooming services. Complete your application to get started with our expert groomers in Waunakee, WI.",
    url: "https://www.riverpaws.dog/grooming-application",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dog Grooming Application | River Paws",
    description:
      "Apply for professional dog grooming services at River Paws in Waunakee, WI.",
  },
};

export default function GroomingApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

