import { Metadata } from "next";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming & Care Blog | River Paws Expert Tips & Advice",
  description:
    "Expert dog grooming tips, breed-specific care guides, and seasonal grooming advice from River Paws professional groomers. Learn how to keep your dog healthy, comfortable, and looking their best.",
  alternates: {
    canonical: "https://www.riverpaws.dog/blog",
  },
  openGraph: {
    title: "Dog Grooming & Care Blog | River Paws",
    description:
      "Expert dog grooming tips, breed-specific care guides, and seasonal grooming advice from professional groomers.",
    url: "https://www.riverpaws.dog/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming & Care Blog | River Paws",
    description: "Expert dog grooming tips and care guides from professional groomers.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Blog", url: "https://www.riverpaws.dog/blog" },
        ]}
      />
      {children}
    </>
  );
}

