/**
 * HowTo Schema Component for structured data
 * Used for step-by-step guides like the grooming journey
 * Helps with rich snippets in Google search results
 */

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
  estimatedCost?: {
    currency: string;
    minValue: number;
    maxValue: number;
  };
  steps: HowToStep[];
  image?: string;
}

export default function HowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
  image,
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: estimatedCost.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: estimatedCost.minValue,
          maxValue: estimatedCost.maxValue,
        },
      },
    }),
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          url: step.image,
        },
      }),
      ...(step.url && { url: step.url }),
    })),
    tool: [
      {
        "@type": "HowToTool",
        name: "Professional grooming equipment",
      },
      {
        "@type": "HowToTool",
        name: "Premium pet-safe shampoos and conditioners",
      },
    ],
    supply: [
      {
        "@type": "HowToSupply",
        name: "Appointment booking",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}



