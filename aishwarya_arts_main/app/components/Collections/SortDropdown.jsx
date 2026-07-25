"use client";

import React from "react";

export default function SortDropdown({ currentSort, onSortChange }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="catalog-sort-select"
        className="text-xs font-bold text-zinc-600 uppercase tracking-widest shrink-0"
      >
        Sort By:
      </label>

      <div className="relative">
        <select
          id="catalog-sort-select"
          aria-label="Sort product catalog by"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm font-semibold bg-transparent border border-transparent hover:border-zinc-200 focus:border-amber-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-amber-600 cursor-pointer text-zinc-900 outline-hidden transition-colors"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-az">Name (A-Z)</option>
          <option value="name-za">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}