/**
 * ImageGallery Schema Component for gallery pages
 * Helps images appear in Google Image search with rich results
 */

import { getImageGallerySchema } from "@/lib/structuredData";

interface ImageGallerySchemaProps {
  name: string;
  description: string;
  url: string;
  images: Array<{ src: string; alt: string; caption?: string }>;
}

export default function ImageGallerySchema({
  name,
  description,
  url,
  images,
}: ImageGallerySchemaProps) {
  const schema = getImageGallerySchema(name, description, url, images);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}



