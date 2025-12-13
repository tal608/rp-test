/**
 * Organization Schema Component for enhanced E-E-A-T signals
 * Provides detailed organization information to search engines
 */

import { getOrganizationSchema } from "@/lib/structuredData";

export default function OrganizationSchema() {
  const schema = getOrganizationSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}



