import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Hiking Application | Adventure Out Program | River Paws",
  description:
    "Apply for your dog to join our Adventure Out hiking program. Complete comprehensive application with health and safety information for dog hiking services in Waunakee, WI.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-hike-scheduling",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Dog Hiking Application | River Paws",
    description:
      "Join our Adventure Out hiking program. Complete comprehensive application for dog hiking services in Waunakee, WI.",
    url: "https://www.riverpaws.dog/dog-hike-scheduling",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dog Hiking Application | Adventure Out Program | River Paws",
    description:
      "Apply for your dog to join our Adventure Out hiking program. Complete comprehensive application for dog hiking services in Waunakee, WI.",
  },
};

export default function HikeApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

