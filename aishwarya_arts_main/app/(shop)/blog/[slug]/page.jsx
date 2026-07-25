import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { blogPosts } from "../../../data/blogdata";

// Enable Incremental Static Regeneration (ISR) or static caching
export const revalidate = 3600;

// Generate Dynamic SEO Metadata for Each Blog Article
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const post = blogPosts.find((p) => p.slug === `/blog/${slug}` || p.slug === slug);

  if (!post) {
    return {
      title: "Blog Not Found | Aishwarya Arts",
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | Aishwarya Arts Art Blog`;
  const description = post.summary || `Explore ${post.title} and learn about traditional Indian art forms, heritage, and history at Aishwarya Arts.`;
  const articleUrl = `https://www.aishwaryaarts.com/blog/${slug}`;
  const imageUrl = post.image || "https://www.aishwaryaarts.com/logo.png";

  return {
    metadataBase: new URL("https://www.aishwaryaarts.com"),
    title,
    description,
    keywords: [
      post.title,
      post.category || "Traditional Art",
      "Tanjore Painting Masterclass",
      "Aishwarya Arts Journal",
      "Indian Heritage Art"
    ],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title,
      description,
      url: articleUrl,
      siteName: "Aishwarya Arts",
      locale: "en_IN",
      type: "article",
      publishedTime: post.date || "2026-06-01T00:00:00.000Z",
      authors: ["Aishwarya Arts Master Artisans"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const post = blogPosts.find((p) => p.slug === `/blog/${slug}` || p.slug === slug);

  if (!post) {
    return notFound();
  }

  const articleUrl = `https://www.aishwaryaarts.com/blog/${slug}`;

  // Rich BlogPosting Structured Data Schema for Google Rich Snippets & Knowledge Graph
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "image": [
      `https://www.aishwaryaarts.com${post.image}`
    ],
    "datePublished": post.date || "2026-06-01T00:00:00.000Z",
    "dateModified": post.date || "2026-06-01T00:00:00.000Z",
    "author": {
      "@type": "Organization",
      "name": "Aishwarya Arts",
      "url": "https://www.aishwaryaarts.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aishwarya Arts",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aishwaryaarts.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    }
  };

  return (
    <>
      {/* Injecting Structured Data JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-white font-outfit pb-24">

        {/* BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-[10px] md:text-[12px] uppercase tracking-wide text-zinc-700 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-900 whitespace-nowrap">
            Home
          </Link>
          <ChevronRight size={10} className="shrink-0" aria-hidden="true" />
          <Link href="/blog" className="hover:text-amber-900 whitespace-nowrap">
            Blog
          </Link>
          <ChevronRight size={10} className="shrink-0" aria-hidden="true" />
          <span className="text-zinc-900 font-semibold truncate" aria-current="page">
            {post.title}
          </span>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">

          <header className="space-y-6 mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-900 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full">
              {post.category || "Heritage Art"}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel leading-tight">
              {post.title}
            </h1>

            {post.date && (
              <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                Published on <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </p>
            )}
          </header>

          {/* FEATURED IMAGE EXHIBIT */}
          <div className="relative w-full aspect-video rounded-4xl md:rounded-[2.5rem] overflow-hidden mb-12 shadow-xl border border-zinc-200 bg-zinc-50">
            <Image
              src={post.image}
              alt={`${post.title} featured illustration`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          {/* ARTICLE CONTENT */}
          <div
            className="prose prose-lg md:prose-xl max-w-none text-zinc-800 leading-relaxed font-medium space-y-6 [&>p]:leading-relaxed [&>h2]:font-cinzel [&>h2]:text-zinc-900 [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ARTICLE FOOTER NAV */}
          <footer className="mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-amber-900 transition-colors inline-flex items-center gap-2"
            >
              &larr; Back to All Journal Articles
            </Link>

            <Link
              href="/collections"
              className="bg-zinc-900 text-white text-xs font-bold uppercase tracking-[0.2em] py-3.5 px-6 rounded-2xl shadow-md hover:bg-amber-900 transition-all"
            >
              Explore Masterpieces
            </Link>
          </footer>

        </article>
      </main>
    </>
  );
}