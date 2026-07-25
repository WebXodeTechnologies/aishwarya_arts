import React from "react";
import Link from "next/link";
import Image from "next/image";

// Revalidate cache every 1 hour for optimal server performance
export const revalidate = 3600;

const blogPosts = [
  {
    id: 1,
    title: "The Legacy of Tanjore Painting Culture",
    category: "Traditional Art",
    summary: "Discover the intricate beauty, history, and sacred iconography of authentic Tanjore paintings.",
    slug: "/blog/tanjore-paintings",
    image: "/assets/blog/img1.png",
    date: "2026-06-15"
  },
  {
    id: 2,
    title: "Modern Approaches to Custom Art",
    category: "Contemporary Art",
    summary: "How master artists blend centuries-old temple traditions with modern creativity for bespoke artworks.",
    slug: "/blog/custom-art",
    image: "/assets/blog/img2.png",
    date: "2026-06-22"
  },
  {
    id: 3,
    title: "Understanding Indian Heritage Art Forms",
    category: "Heritage Art",
    summary: "Explore various traditional Indian art forms and gold-leaf techniques that have survived generations.",
    slug: "/blog/heritage-art",
    image: "/assets/blog/img3.png",
    date: "2026-07-01"
  },
];

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Art & Heritage Blog | Aishwarya Arts Namakkal",
  description: "Immerse yourself in the legacy of Tanjore paintings, custom spiritual art, and the history of traditional 22K gold foil Indian art forms.",
  keywords: [
    "Tanjore Painting Blog",
    "Indian Heritage Art Articles",
    "Aishwarya Arts News",
    "Traditional Gold Foil Art Guide",
    "Custom Tanjore Paintings Namakkal"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Art & Heritage Blog | Aishwarya Arts",
    description: "Read expert guides on traditional Tanjore paintings and bespoke spiritual gold leaf art.",
    url: "https://www.aishwaryaarts.com/blog",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Art Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art & Heritage Blog | Aishwarya Arts",
    description: "Explore the timeless history of Thanjavur art and custom Indian masterpieces.",
    images: ["/logo.png"],
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

export default function BlogPage() {
  // Schema.org Blog/ItemList Structured Data for Google SEO
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Aishwarya Arts Blog",
    "url": "https://www.aishwaryaarts.com/blog",
    "description": "Articles on Indian heritage art, custom framing, and the sacred history of Tanjore paintings.",
    "publisher": {
      "@type": "Organization",
      "name": "Aishwarya Arts",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aishwaryaarts.com/logo.png"
      }
    },
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.summary,
      "url": `https://www.aishwaryaarts.com${post.slug}`,
      "image": `https://www.aishwaryaarts.com${post.image}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "Aishwarya Arts"
      }
    }))
  };

  return (
    <>
      {/* Injecting Blog Structured Data Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 bg-white font-outfit">

        <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-amber-800 italic block">
            Journal &amp; Masterclasses
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 font-cinzel tracking-tight">
            Our Art Blog
          </h1>
          <p className="text-zinc-700 text-base md:text-lg font-medium leading-relaxed">
            Immerse yourself in the rich history of Thanjavur traditions, expert art care tips, and the sacred craftsmanship behind our gold leaf masterpieces.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" role="feed" aria-label="Aishwarya Arts Blog Posts">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative rounded-[2.5rem] overflow-hidden border border-zinc-200 bg-white shadow-md hover:shadow-2xl hover:border-amber-300 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image with hover zoom */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-zinc-100">
                <Image
                  src={post.image}
                  alt={`${post.title} feature image`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  priority={index === 0} // Optimize LCP for first grid image
                />
              </div>

              {/* Text content - solid white background, removing unwanted grays */}
              <div className="p-6 sm:p-8 bg-white relative -mt-12 rounded-t-4xl z-10 border-t border-zinc-100 flex flex-col grow justify-between shadow-xs">
                <div className="space-y-3">
                  <span className="inline-block bg-amber-900 text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {post.category}
                  </span>

                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-amber-800 transition-colors font-cinzel leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-zinc-700 text-sm md:text-base font-medium leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100">
                  <Link
                    href={post.slug}
                    aria-label={`Read full article: ${post.title}`}
                    className="text-amber-900 font-bold text-sm uppercase tracking-wider hover:text-amber-700 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    Read Article <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

      </main>
    </>
  );
}