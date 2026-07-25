'use client';
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], onWishlistToggle, onAddToCart }) {
  // If no products are found (e.g., after filtering)
  if (!products || products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-200 rounded-[2.5rem] bg-zinc-50/50 text-center px-4"
        role="region"
        aria-label="Empty product catalog state"
      >
        <h3 className="text-xl font-bold text-zinc-900 mb-2 font-cinzel">No Paintings Found</h3>
        <p className="text-zinc-600 text-sm md:text-base font-medium max-w-md">
          No masterpieces match your selected criteria. Try adjusting your filter preferences to explore more authentic Tanjore artworks.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
      role="feed"
      aria-label="Tanjore paintings product catalog feed"
    >
      {products.map((product, index) => (
        <article key={product._id || index} className="flex flex-col h-full">
          <ProductCard
            product={product}
            onWishlistToggle={onWishlistToggle}
            onAddToCart={onAddToCart}
            priority={index < 3} // Optimize LCP for above-the-fold artwork images
          />
        </article>
      ))}
    </div>
  );
}