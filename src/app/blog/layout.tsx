import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Grooming & Care Blog | Expert Tips & Advice",
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
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming & Care Blog | River Paws",
    description: "Expert dog grooming tips and care guides from professional groomers.",
  },
};

/**
 * Blog layout - schema is handled by individual pages:
 * - blog/page.tsx adds its own BreadcrumbSchema for the list page
 * - blog/[slug]/page.tsx adds complete breadcrumb including article name
 * This prevents duplicate BreadcrumbList schemas
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

