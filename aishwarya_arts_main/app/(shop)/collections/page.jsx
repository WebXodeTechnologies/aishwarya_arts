import React from "react";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import CollectionsClient from "./CollectionsClient";

// Comprehensive SEO Metadata for Collections Catalog
export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Exquisite Tanjore Paintings Collection | 22K Gold Foil Art | Aishwarya Arts",
  description: "Browse our exclusive gallery of traditional Tanjore paintings, handcrafted with authentic 22K gold foil, semiprecious Jaipur gemstones, and genuine teakwood frames.",
  keywords: [
    "Tanjore Paintings Collection",
    "Buy Tanjore Paintings Online",
    "22K Gold Foil Paintings",
    "Traditional Thanjavur Art Gallery",
    "Custom Deity Tanjore Portraits",
    "Aishwarya Arts Catalog"
  ],
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    title: "Exquisite Tanjore Paintings Collection | Aishwarya Arts",
    description: "Browse our exclusive gallery of traditional Tanjore paintings, handcrafted with authentic 22K gold foil and teakwood frames.",
    url: "https://www.aishwaryaarts.com/collections",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Tanjore Paintings Collection Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exquisite Tanjore Paintings Collection | Aishwarya Arts",
    description: "Explore authentic handmade 22K gold leaf Tanjore paintings crafted by master artisans.",
    images: ["/assets/og-image.jpg"],
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

export default async function CollectionsPage() {
  await connectDB();

  // Fetch active products
  const rawProducts = await Product.find({ inStock: true })
    .sort({ createdAt: -1 })
    .lean();

  // Serialize product documents for client component passing
  const serializedProducts = rawProducts.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt ? p.createdAt.toISOString() : null,
    updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
    priceMatrix: p.priceMatrix
      ? p.priceMatrix.map((matrix) => ({
        ...matrix,
        _id: matrix._id ? matrix._id.toString() : null,
      }))
      : [],
  }));

  // Structured Data Schema for Google Search Rich Results (CollectionPage & ItemList)
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Tanjore Paintings Collection",
    "url": "https://www.aishwaryaarts.com/collections",
    "description": "Explore exclusive handmade 22K gold leaf traditional Tanjore paintings by Aishwarya Arts.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": serializedProducts.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.aishwaryaarts.com/collections/${product._id}`,
        "name": product.title,
      })),
    },
  };

  return (
    <>
      {/* Injecting Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <CollectionsClient initialProducts={serializedProducts} />
    </>
  );
}