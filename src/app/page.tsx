import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import SpeakableSchema from "@/components/SpeakableSchema";
import { getLocalBusinessSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Dog Grooming Waunakee & North Madison | River Paws Dog Hikes",
  description:
    "Full-service dog grooming and small-group dog hikes on the Waunakee/Madison border. Serving DeForest, Sun Prairie & Middleton. Book today.",
};

export default function Home() {
  const structuredData = getLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SpeakableSchema
        name="River Paws Dog Grooming & Hiking"
        url="https://www.riverpaws.dog"
        cssSelectors={["h1", ".hero-description", ".service-summary"]}
      />
      <HomeClient />
    </>
  );
}