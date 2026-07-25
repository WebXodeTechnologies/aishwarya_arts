"use client";

import React, { useEffect, useMemo, useState } from "react";
import FilterSidebar from "../../components/Collections/FilterSidebar";
import ProductGrid from "../../components/Collections/ProductGrid";
import SortDropdown from "../../components/Collections/SortDropdown";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "../../../store/useCartStore";
import { useWishlistStore } from "../../../store/useWishlistStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useSession } from "next-auth/react";

export default function CollectionsClient({ initialProducts = [] }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [products] = useState(initialProducts);
  const [loading] = useState(false);

  // State for filtering and sorting
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    godName: [],
    workStyle: [],
    dimensions: [],
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by God Name
    if (filters.godName.length > 0) {
      result = result.filter((p) =>
        filters.godName.includes(p.godName?.toLowerCase())
      );
    }

    // 2. Filter by Work Style
    if (filters.workStyle.length > 0) {
      result = result.filter((p) =>
        filters.workStyle.includes(p.workStyle?.toLowerCase())
      );
    }

    // 3. Dimensions Filter
    if (filters.dimensions.length > 0) {
      result = result.filter((p) => {
        if (!p.dimensions) return false;

        const normalize = (str) =>
          str.toLowerCase()
            .replace(/["\s]/g, "")
            .replace(/[*x]/g, "x");

        const productDim = normalize(p.dimensions);
        return filters.dimensions.some(f => normalize(f) === productDim);
      });
    }

    // 4. Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, filters, sortBy]);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  useEffect(() => {
    const checkGoogleUserProfile = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const res = await fetch("/api/users/profile");
          const result = await res.json();

          if (result.success && !result.data.primaryPhone) {
            toast("Complete your profile to enable express checkout!", {
              icon: '🎨',
              duration: 6000,
            });
          }
        } catch (err) {
          console.error("Profile check failed:", err);
        }
      }
    };
    checkGoogleUserProfile();
  }, [status, session]);

  const handleAddToCart = (product) => {
    const absoluteAuth = useAuthStore.getState().isLoggedIn;

    if (!absoluteAuth) {
      toast.error("Please login to add items to cart!");
      router.push("/login");
      return;
    }

    addToCart({
      id: product._id,
      title: product.title,
      sku: product.sku || `AA-${product._id.slice(-5).toUpperCase()}`,
      price: product.offerPrice || product.price,
      image: product.images?.[0] || "/logo.png",
      quantity: 1,
      size: product.dimensions || "Standard",
      frame: product.frameType || "Classic Frame",
      style: product.workStyle || "Flat",
      godName: product.godName
    });

    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    const currentLoginStatus = useAuthStore.getState().isLoggedIn;

    if (!currentLoginStatus) {
      toast.error("Please login to save favorites!");
      router.push("/login");
      return;
    }

    toggleWishlist({
      id: product._id,
      title: product.title,
      sku: product.sku || `AA-${product._id.slice(-5).toUpperCase()}`,
      price: product.offerPrice || product.price,
      image: product.images?.[0] || "/logo.png",
      size: product.dimensions || "Standard",
      frame: product.frameType || "Classic Frame",
      style: product.workStyle || "Flat",
      godName: product.godName,
      inStock: product.inStock
    });
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen font-outfit relative">

      {/* ========================================================================= */}
      {/* --- MOBILE FILTER DRAWER COMPONENT --- */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filter sidebar drawer"
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsMobileFilterOpen(false)}
          aria-hidden="true"
        />
        <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white p-6 shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-cinzel text-zinc-900">Filter Artworks</h2>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              aria-label="Close filter drawer"
              className="p-2 text-zinc-700 hover:text-zinc-900 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-600 rounded-lg"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <FilterSidebar selectedFilters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- PAGE HEADER & BREADCRUMBS --- */}
      {/* ========================================================================= */}
      <header className="border-b border-zinc-100 py-6 lg:py-10 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4 font-semibold">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" className="hover:text-amber-800 transition-colors">Home</a>
              </li>
              <span aria-hidden="true">/</span>
              <li>
                <span className="text-zinc-900 font-bold" aria-current="page">Collections</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-zinc-900 font-cinzel tracking-wide">
              Traditional Tanjore Paintings Collection
            </h1>

            {/* Mobile Filter & Sort Bar */}
            <div className="flex items-center justify-between border-y border-zinc-200 py-4 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                aria-label="Open filter sidebar"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-600 p-2"
              >
                <SlidersHorizontal size={16} aria-hidden="true" /> Filters
              </button>
              <div className="h-4 w-px bg-zinc-200" aria-hidden="true" />
              <SortDropdown currentSort={sortBy} onSortChange={(value) => setSortBy(value)} />
            </div>

            {/* Desktop Count & Sort Bar */}
            <div className="hidden lg:flex items-center justify-between">
              <p className="text-sm md:text-base text-zinc-600 font-medium italic">
                Showing <strong className="text-zinc-900 font-bold">{processedProducts.length}</strong> unique handcrafted masterpieces
              </p>
              <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* --- MAIN CATALOG CONTENT & GRID --- */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 h-fit sticky top-24" aria-label="Catalog Filters">
            <FilterSidebar selectedFilters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:w-3/4 w-full">
            {loading ? (
              <div className="h-96 flex flex-col items-center justify-center text-amber-700 gap-4" aria-label="Loading catalog">
                <Loader2 className="animate-spin" size={32} aria-hidden="true" />
                <p className="font-bold uppercase tracking-wider text-sm">Syncing Art Gallery...</p>
              </div>
            ) : processedProducts.length > 0 ? (
              <ProductGrid
                products={processedProducts}
                onWishlistToggle={handleWishlistToggle}
                onAddToCart={handleAddToCart}
              />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-[2.5rem] p-8 text-center bg-zinc-50/50">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">No masterpieces found</h3>
                <p className="text-sm text-zinc-600">Try adjusting your filters to view more authentic Tanjore artworks.</p>
              </div>
            )}

            {/* Pagination / Load More Trigger */}
            {processedProducts.length > 12 && (
              <div className="mt-16 flex flex-col items-center gap-4">
                <div className="h-px w-16 bg-amber-600/30" aria-hidden="true" />
                <button
                  type="button"
                  aria-label="Load more Tanjore paintings"
                  className="w-full md:w-auto px-12 py-4 border border-zinc-900 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-600 shadow-xs"
                >
                  Load More Masterpieces
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}