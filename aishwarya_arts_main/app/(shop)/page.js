import AboutSection from "../components/HomePage/AboutSection";
import BestSellers from "../components/HomePage/BestSellers";
import Faq from "../components/HomePage/Faq";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import Hero from "../components/HomePage/Hero";
import Shipping from "../components/HomePage/Shipping";
import Story from "../components/HomePage/Story";
import Testimonial from "../components/HomePage/Testimonial";
import Tooltip from "../components/HomePage/Tooltip";
import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";

// Homepage Specific SEO Metadata for High-Intent Rankings
export const metadata = {
  title: {
    absolute: "Buy Authentic Handmade Tanjore Paintings Online | Aishwarya Arts",
  },
  description:
    "Explore exquisite 22K gold leaf handmade Tanjore paintings crafted by master artisans in Tamil Nadu. Certified authentic traditional art for home and office decor.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Buy Authentic Handmade Tanjore Paintings Online | Aishwarya Arts",
    description:
      "Explore exquisite 22K gold leaf handmade Tanjore paintings crafted by master artisans with certified authenticity.",
    url: "https://www.aishwaryaarts.com",
    type: "website",
  },
};

// Caching DB query at the server layer with revalidation tags
const getCachedBanners = unstable_cache(
  async () => {
    try {
      await connectDB();
      const data = await Banner.find({ isActive: true }).sort({
        createdAt: -1,
      });
      return data.map((b) => ({
        _id: b._id.toString(),
        imageUrl: b.imageUrl,
        title: b.title,
        link: b.link,
      }));
    } catch (error) {
      console.error("Failed to fetch banners for caching:", error);
      return [];
    }
  },
  ["hero-banners"],
  { revalidate: 3600, tags: ["banners"] },
);

export default async function Home() {
  const banners = await getCachedBanners();

  // Website and E-commerce structured data for Google Search rich cards
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aishwarya Arts",
    url: "https://www.aishwaryaarts.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.aishwaryaarts.com/collections?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* Injecting Structured Data for Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex flex-col items-center justify-center w-full overflow-hidden">
        <Hero initialBanners={banners} />
        <Tooltip />
        <Story />
        <BestSellers />
        <AboutSection />
        <FeaturedProducts />
        <Shipping />
        <Testimonial />
        <Faq />
      </main>
    </>
  );
}
