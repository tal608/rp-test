import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Policies | Dog Grooming & Hiking",
  description:
    "River Paws policies for dog grooming and hiking services in Waunakee, WI. Learn about our cancellation policy, no-show fees, vaccination requirements, and more.",
  alternates: {
    canonical: "https://www.riverpaws.dog/policies",
  },
  openGraph: {
    title: "Policies | River Paws",
    description:
      "Our policies ensure the best experience for your dog while maintaining fairness for our team and other clients.",
    url: "https://www.riverpaws.dog/policies",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary",
    title: "Policies | River Paws",
    description:
      "River Paws policies for dog grooming and hiking services in Waunakee, WI.",
  },
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

