import React from "react";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";


export const revalidate = 3600;

// Generate Dynamic Metadata for Product Pages
export async function generateMetadata({ params }) {
  await connectDB();
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  let product;
  try {
    product = await Product.findById(productId).lean();
  } catch (err) {
    return {
      title: "Product Not Found | Aishwarya Arts",
      robots: { index: false, follow: false },
    };
  }

  if (!product) {
    return {
      title: "Product Not Found | Aishwarya Arts",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.title} - Authentic Tanjore Painting | Aishwarya Arts`;
  const description = product.description || `Handcrafted traditional Thanjavur Tanjore painting of ${product.title}, made with pure 22K gold foil and genuine teakwood frames.`;
  const imageUrl = product.images?.[0] || "https://www.aishwaryaarts.com/logo.png";
  const productUrl = `https://www.aishwaryaarts.com/collections/${productId}`;

  return {
    metadataBase: new URL("https://www.aishwaryaarts.com"),
    title,
    description,
    keywords: [
      product.title,
      `${product.godName || 'Deity'} Tanjore Painting`,
      "Handmade 22K Gold Foil Painting",
      "Buy Traditional Thanjavur Art Online",
      "Aishwarya Arts Collection"
    ],
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: "Aishwarya Arts",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.title} Handcrafted Tanjore Painting`,
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

export default async function ProductPage({ params }) {
  await connectDB();
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  let rawProduct;
  try {
    rawProduct = await Product.findById(productId).lean();
  } catch (err) {
    return notFound();
  }

  if (!rawProduct) {
    return notFound();
  }

  // Serialize Mongoose document to plain object
  const serializedProduct = {
    ...rawProduct,
    _id: rawProduct._id.toString(),
    createdAt: rawProduct.createdAt ? rawProduct.createdAt.toISOString() : null,
    updatedAt: rawProduct.updatedAt ? rawProduct.updatedAt.toISOString() : null,
    priceMatrix: rawProduct.priceMatrix
      ? rawProduct.priceMatrix.map((matrix) => ({
        ...matrix,
        _id: matrix._id ? matrix._id.toString() : null,
      }))
      : [],
  };

  // Determine pricing context for schema
  const displayPrice = serializedProduct.offerPrice || serializedProduct.price || 10000;
  const productSku = serializedProduct.sku || `AA-${serializedProduct._id.slice(-5).toUpperCase()}`;

  // Rich Product Structured Data Schema for Google Shopping & Rich Snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": serializedProduct.title,
    "image": serializedProduct.images || ["https://www.aishwaryaarts.com/logo.png"],
    "description": serializedProduct.description || "Authentic handmade 22K gold leaf Tanjore painting by Aishwarya Arts.",
    "sku": productSku,
    "mpn": productSku,
    "brand": {
      "@type": "Brand",
      "name": "Aishwarya Arts"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Aishwarya Arts Art Gallery"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.aishwaryaarts.com/collections/${serializedProduct._id}`,
      "priceCurrency": "INR",
      "price": displayPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": serializedProduct.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Aishwarya Arts"
      }
    },
    ...(serializedProduct.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": serializedProduct.rating,
        "reviewCount": serializedProduct.reviewCount || 10
      }
    })
  };

  return (
    <>
      {/* Injecting Rich Product Schema Markup for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <ProductClient initialProduct={serializedProduct} />
    </>
  );
}