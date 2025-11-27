import { getReviewSchema } from "@/lib/structuredData";

interface ReviewSchemaProps {
  name: string;
  rating: number;
  reviewText: string;
  authorName: string;
  datePublished?: string;
}

export default function ReviewSchema({
  name,
  rating,
  reviewText,
  authorName,
  datePublished,
}: ReviewSchemaProps) {
  const schema = getReviewSchema(name, rating, reviewText, authorName, datePublished);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

