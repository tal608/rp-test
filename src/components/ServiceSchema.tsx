import { getGroomingServiceSchema, getHikingServiceSchema } from "@/lib/structuredData";

interface ServiceSchemaProps {
  serviceType: "grooming" | "hiking";
}

export default function ServiceSchema({ serviceType }: ServiceSchemaProps) {
  const schema = serviceType === "grooming" 
    ? getGroomingServiceSchema() 
    : getHikingServiceSchema();
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

