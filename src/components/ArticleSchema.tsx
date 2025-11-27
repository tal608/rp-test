/**
 * ArticleSchema component for blog articles and resource pages
 * Adds Article structured data for better SEO and rich snippets
 */

interface ArticleSchemaProps {
  headline: string;
  description: string;
  authorName?: string;
  authorUrl?: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  articleBody?: string;
}

export default function ArticleSchema({
  headline,
  description,
  authorName = "River Paws",
  authorUrl = "https://www.riverpaws.dog",
  datePublished,
  dateModified,
  image = "https://www.riverpaws.dog/og-image.jpg",
  articleBody,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
      jobTitle: "Professional Dog Groomer",
      worksFor: {
        "@type": "Organization",
        name: "River Paws",
        url: "https://www.riverpaws.dog",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "River Paws",
      url: "https://www.riverpaws.dog",
      logo: {
        "@type": "ImageObject",
        url: "https://www.riverpaws.dog/og-image.jpg",
      },
    },
    ...(articleBody && {
      articleBody,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

