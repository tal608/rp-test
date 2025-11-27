import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticles } from "@/constants/blogArticles";
import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GetDirectionsButton from "@/components/GetDirectionsButton";
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
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white overflow-hidden">
          {/* Animated Blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: article.title, href: `/blog/${article.slug}` },
              ]}
              className="mb-6 sm:mb-8 text-white/90"
            />
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap text-xs sm:text-sm">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                <time
                  dateTime={article.datePublished}
                  className="text-white/90"
                >
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {article.readTime && (
                  <>
                    <span className="text-white/70">•</span>
                    <span className="text-white/90">{article.readTime} min read</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
                {article.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 px-4">
                {article.description}
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {article.image && (
              <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <Image
                  src={article.image}
                  alt={`${article.title} - Expert dog grooming tips from River Paws professional groomers`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: getImageObjectPosition(article.image) }}
                  sizes="100vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-sm font-medium">{article.title}</p>
                </div>
              </div>
            )}

            {/* Article Body - sanitized with DOMPurify for XSS protection */}
            <SafeHtml 
              html={article.content}
              className="article-content text-gray-700 leading-relaxed prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Info */}
            {/* Author Bio */}
            <AuthorBio authorName={article.author} className="mt-8" />

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Experience Professional Grooming?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                At River Paws, our experienced groomers use premium products and gentle techniques
                to keep your dog looking and feeling their best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/grooming-application"
                  className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg min-h-[44px]"
                >
                  Book Appointment
                </Link>
                <GetDirectionsButton className="bg-transparent border-2 border-white text-white hover:bg-white/10" />
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-blue-100 mb-2">
                  Located at <strong>{contactInfo.address.full}</strong>
                </p>
                <p className="text-blue-100">
                  Call us at{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-white font-bold hover:underline"
                  >
                    {contactInfo.phoneDisplay}
                  </a>{" "}
                  to schedule your appointment
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <RelatedArticles currentArticle={article} />

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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

