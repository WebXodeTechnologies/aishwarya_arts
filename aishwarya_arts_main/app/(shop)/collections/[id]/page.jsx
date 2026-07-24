import React from "react";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

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
    };
  }

  if (!product) {
    return {
      title: "Product Not Found | Aishwarya Arts",
    };
  }

  const title = `${product.title} - Tanjore Painting | Aishwarya Arts`;
  const description = product.description || `Handcrafted Thanjavur Tanjore painting of ${product.title} made with pure 22K gold foil.`;
  const imageUrl = product.images?.[0] || "/logo.png";

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.aishwaryaarts.com/collections/${productId}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.aishwaryaarts.com/collections/${productId}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
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

  return <ProductClient initialProduct={serializedProduct} />;
}
