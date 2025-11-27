import { getFAQPageSchema } from "@/lib/structuredData";
import type { FAQ } from "@/types";

interface FAQSchemaProps {
  faqs: FAQ[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = getFAQPageSchema(faqs);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

