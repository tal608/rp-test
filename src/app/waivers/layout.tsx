import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Agreement & Waivers",
  description: "River Paws service agreement and liability waivers for dog grooming and hiking services. Review our terms before your appointment in Waunakee, WI.",
  alternates: {
    canonical: "https://www.riverpaws.dog/waivers",
  },
};

export default function WaiversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

