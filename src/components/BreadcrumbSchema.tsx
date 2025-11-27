import { getBreadcrumbSchema } from "@/lib/structuredData";

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = getBreadcrumbSchema(items);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

