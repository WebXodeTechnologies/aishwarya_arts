import React from "react";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import CollectionsClient from "./CollectionsClient";

export const metadata = {
  title: "Tanjore Paintings Collection | Aishwarya Arts",
  description: "Browse our exclusive gallery of traditional Tanjore paintings, handcrafted with authentic 22K gold foil, precious stones, and teakwood frames.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/collections",
  },
  openGraph: {
    title: "Traditional Tanjore Paintings Collection | Aishwarya Arts",
    description: "Browse our exclusive gallery of traditional Tanjore paintings, handcrafted with authentic 22K gold foil, precious stones, and teakwood frames.",
    url: "https://www.aishwaryaarts.com/collections",
    type: "website",
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

  return <CollectionsClient initialProducts={serializedProducts} />;
}
