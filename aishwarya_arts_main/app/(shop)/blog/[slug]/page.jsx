import React from "react";
import Image from "next/image";
import { blogPosts } from "../../../data/blogdata";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Not Found | Aishwarya Arts",
    };
  }

  const title = `${post.title} | Aishwarya Arts Art Blog`;
  const description = post.summary || `Explore ${post.title} and learn about traditional Indian art forms, heritage, and history on Aishwarya Arts.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.aishwaryaarts.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.aishwaryaarts.com/blog/${slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          width: 800,
          height: 800,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <p className="text-center py-20 text-red-500">Blog post not found</p>;

  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6 text-zinc-900">{post.title}</h1>
      <span className="text-md text-amber-700 font-semibold mb-4 block uppercase tracking-wider">{post.category}</span>

      <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-md border border-zinc-100 bg-zinc-50">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      <div
        className="prose prose-lg text-zinc-800 leading-relaxed font-medium"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
  );
}
