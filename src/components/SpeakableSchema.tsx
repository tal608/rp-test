/**
 * Speakable Schema Component for voice search optimization
 * Helps voice assistants identify content suitable for text-to-speech
 */

import { getSpeakableSchema } from "@/lib/structuredData";

interface SpeakableSchemaProps {
  name: string;
  url: string;
  cssSelectors?: string[];
}

export default function SpeakableSchema({
  name,
  url,
  cssSelectors,
}: SpeakableSchemaProps) {
  const schema = getSpeakableSchema(name, url, cssSelectors);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


