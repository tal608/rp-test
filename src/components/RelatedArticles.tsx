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
    <section className="mt-16">
      <div className="text-center mb-10">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Keep reading...</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          You Might Also Like
        </h2>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {relatedArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group"
          >
            {/* Polaroid Frame */}
            <div 
              className={`bg-white dark:bg-slate-800 p-3 pb-5 rounded-sm shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                index === 0 ? 'group-hover:-rotate-2' : index === 1 ? 'group-hover:rotate-1' : 'group-hover:-rotate-1'
              } group-hover:scale-[1.02]`}
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: getImageObjectPosition(article.image) }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50"></div>
                )}
                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="px-1">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{article.readTime} min read</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    Read →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Browse All Link */}
      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Browse All Articles
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
