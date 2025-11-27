import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: "Dog Hikes in Waunakee & North Madison | Pack Hikes & Off-Leash Play | River Paws",
  description:
    "Small-group dog hikes on private trails near Waunakee/Madison. Arrival 7:30–8:30, hike 8:45–11:00, owner pickup discount; drop-offs included. Apply now.",
  alternates: {
    canonical: "https://www.riverpaws.dog/dog-hikes",
  },
  openGraph: {
    title: "Dog Hikes in Waunakee & North Madison | Pack Hikes & Off-Leash Play | River Paws",
    description:
      "Small-group dog hikes on private trails near Waunakee/Madison. Arrival 7:30–8:30, hike 8:45–11:00, owner pickup discount; drop-offs included.",
    url: "https://www.riverpaws.dog/dog-hikes",
    type: "website",
    images: [
      {
        url: "/Madison dog hiking5.jpg",
        width: 1200,
        height: 630,
        alt: "Adventure dog hiking services at River Paws",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Hiking Near Me | Adventure Dog Hiking Services | River Paws Waunakee, WI",
    description:
      "Professional dog hiking adventures near you in Waunakee and Madison, WI. Small group hikes, pickup/dropoff, and trained guides.",
    images: ["/Madison dog hiking5.jpg"],
  },
};

export default function DogHikesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

