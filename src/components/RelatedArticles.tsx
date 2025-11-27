import Link from "next/link";
import Image from "next/image";
import { blogArticles, type BlogArticle } from "@/constants/blogArticles";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

interface RelatedArticlesProps {
  currentArticle: BlogArticle;
  maxArticles?: number;
}

export default function RelatedArticles({ currentArticle, maxArticles = 3 }: RelatedArticlesProps) {
  // Get related articles (same category, excluding current)
  const relatedArticles = blogArticles
    .filter((article) => article.category === currentArticle.category && article.slug !== currentArticle.slug)
    .slice(0, maxArticles);

  // If not enough in same category, add from other categories
  if (relatedArticles.length < maxArticles) {
    const additionalArticles = blogArticles
      .filter((article) => article.slug !== currentArticle.slug && !relatedArticles.includes(article))
      .slice(0, maxArticles - relatedArticles.length);
    relatedArticles.push(...additionalArticles);
  }

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Related Articles
          </h2>
          <p className="text-gray-600">
            Explore more helpful resources from River Paws
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300"
            >
              {article.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: getImageObjectPosition(article.image) }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                  {article.readTime && (
                    <span className="text-xs text-gray-500">
                      {article.readTime} min read
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Read more
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

