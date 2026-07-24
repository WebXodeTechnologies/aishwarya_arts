import React from "react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "The Legacy of Tanjore Painting Culture",
    category: "Traditional Art",
    summary: "Discover the intricate beauty and history of Tanjore paintings.",
    slug: "/blog/tanjore-paintings",
    image: "/assets/blog/img1.png"
  },
  {
    id: 2,
    title: "Modern Approaches to Custom Art",
    category: "Contemporary Art",
    summary: "How artists blend tradition with modern creativity for bespoke artworks.",
    slug: "/blog/custom-art",
    image: "/assets/blog/img2.png"
  },
  {
    id: 3,
    title: "Understanding Indian Heritage Art Forms",
    category: "Heritage Art",
    summary: "Explore various Indian art forms that have survived generations.",
    slug: "/blog/heritage-art",
    image: "/assets/blog/img3.png"
  },
];

export const metadata = {
  title: "Art & Heritage Blog | Aishwarya Arts",
  description: "Immerse yourself in the legacy of Tanjore paintings, custom spiritual art, and the history of traditional gold foil Indian art.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/blog",
  },
};

export default function BlogPage() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      
      <h1 className="text-5xl font-bold text-center mb-12 text-zinc-900">
        Our Art Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-zinc-100 bg-white"
          >
            {/* Image with hover zoom */}
            <div className="relative w-full h-72 md:h-80 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            {/* Text content */}
            <div className="p-6 bg-white relative -mt-16 rounded-t-3xl z-10 ">
              <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                {post.category}
              </span>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 group-hover:text-amber-800 transition-colors">
                {post.title}
              </h2>
              <p className="text-zinc-600 mb-4 font-medium">{post.summary}</p>
              <Link
                href={post.slug}
                className="text-amber-800 font-semibold hover:underline"
              >
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
