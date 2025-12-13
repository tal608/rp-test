import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticles } from "@/constants/blogArticles";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import RelatedArticles from "@/components/RelatedArticles";
import AuthorBio from "@/components/AuthorBio";
import SafeHtml from "@/components/SafeHtml";
import { contactInfo } from "@/constants/social";
import { getImageObjectPosition } from "@/lib/imageFocalPoints";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | River Paws",
    };
  }

  return {
    metadataBase: new URL("https://www.riverpaws.dog"),
    title: `${article.title} | River Paws Blog`,
    description: article.description,
    alternates: {
      canonical: `https://www.riverpaws.dog/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.riverpaws.dog/blog/${article.slug}`,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified || article.datePublished,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleSchema
        headline={article.title}
        description={article.description}
        authorName={article.author}
        datePublished={article.datePublished}
        dateModified={article.dateModified || article.datePublished}
        image={article.image || "https://www.riverpaws.dog/og-image.jpg"}
        articleBody={article.content.replace(/<[^>]*>/g, "").substring(0, 2000)}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.riverpaws.dog/" },
          { name: "Blog", url: "https://www.riverpaws.dog/blog" },
          { name: article.title, url: `https://www.riverpaws.dog/blog/${article.slug}` },
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Hero Section with Image Background */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end overflow-hidden">
          {/* Breadcrumb - Positioned like other pages */}
          <div className="absolute top-24 left-6 z-20">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: article.title.length > 25 ? article.title.substring(0, 25) + "..." : article.title, href: `/blog/${article.slug}` },
              ]}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
            />
          </div>

          {/* Background Image */}
          {article.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                style={{ objectPosition: getImageObjectPosition(article.image) }}
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-emerald-800/40 to-teal-900/50 z-[1]"></div>
            </div>
          )}
          
          {/* Fallback gradient if no image */}
          {!article.image && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 z-0"></div>
          )}

          {/* Animated Blobs */}
          <div className="absolute inset-0 pointer-events-none z-[2]">
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full pb-12 sm:pb-16 pt-32 sm:pt-40 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Meta Info */}
              <div className="flex items-center gap-3 mb-4 flex-wrap text-sm">
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full font-medium">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                <time dateTime={article.datePublished} className="text-white/80">
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {article.readTime && (
                  <>
                    <span className="text-white/60">•</span>
                    <span className="text-white/80">{article.readTime} min read</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                {article.title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
                {article.description}
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Article Body */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 border border-gray-100 dark:border-slate-700">
              <SafeHtml 
                html={article.content}
                className="article-content text-gray-700 dark:text-gray-300 leading-relaxed prose prose-lg max-w-none 
                  prose-headings:text-gray-900 dark:prose-headings:text-white 
                  prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-4
                  prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline 
                  prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                  prose-ul:my-4 prose-ul:pl-0 prose-ol:my-4
                  prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400"
              />

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">Topics covered:</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <AuthorBio authorName={article.author} className="mt-8" />

            {/* CTA Section - Polaroid Style */}
            <div className="mt-12 group">
              <div 
                className="bg-white dark:bg-slate-800 p-4 pb-8 rounded-sm shadow-xl transform group-hover:rotate-1 transition-transform duration-500"
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white p-6 text-center">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold mb-2">Like what you read?</p>
                      <p className="text-lg sm:text-xl text-white/90">We&apos;re even better in person.</p>
                    </div>
                  </div>
                </div>
                
                {/* Caption */}
                <div className="text-center px-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our groomers practice what we preach. Book a visit and see for yourself.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/grooming-application"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Book an Appointment
                    </Link>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                  
                  {/* Handwritten note */}
                  <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm" style={{ fontFamily: 'var(--font-kalam), cursive' }}>
                    📍 5305 W River Rd, Waunakee — right by the dog park!
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <RelatedArticles currentArticle={article} />

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to All Articles
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
