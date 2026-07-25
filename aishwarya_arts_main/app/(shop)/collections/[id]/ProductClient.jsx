"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Heart,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  ShieldAlert,
  ShoppingBag,
  ChevronRight,
  Award,
  Zap,
  Lock,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useCartStore } from "../../../../store/useCartStore";
import { useWishlistStore } from "../../../../store/useWishlistStore";
import { useAuthStore } from "../../../../store/useAuthStore";
import { GLOBAL_ASSETS } from "@/lib/constants";

const DIMENSIONS = [
  '15" X 12"',
  '18" X 14"',
  '20" X 16"',
  '24" X 18"',
  '30" X 24"',
  '36" X 24"',
  '48" X 36"',
  '60" X 36"',
  '72" X 48"',
];

const WORK_STYLE_LABELS = {
  flat: "Flat",
  "2d": "2D",
  embossed: "3D Embossed",
};

export default function ProductClient({ initialProduct }) {
  const [mounted, setMounted] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const product = initialProduct;

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.dimensions || "");
  const [selectedFrame, setSelectedFrame] = useState(product.frameType || "Classic Frame");
  const [selectedStyle, setSelectedStyle] = useState(product.workStyle || "flat");
  const [zoomData, setZoomData] = useState({ x: 0, y: 0, show: false });
  const imgRef = useRef(null);

  const normalize = (s) => s?.replace(/["\s]/g, "").toLowerCase() || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  const availableStyles = useMemo(() => {
    if (!product || !product.priceMatrix) return [];
    return [...new Set(product.priceMatrix.map((item) => item.style))];
  }, [product]);

  const allGalleryImages = useMemo(() => {
    if (!product) return [];
    return [...product.images, ...GLOBAL_ASSETS.frames.map((f) => f.url)];
  }, [product]);

  const currentSelection = useMemo(() => {
    if (!product || !product.priceMatrix || !selectedSize) return null;

    const searchSize = normalize(selectedSize);
    const searchStyle = normalize(selectedStyle);

    return product.priceMatrix.find((item) => {
      const itemSize = normalize(item.size);
      const itemStyle = normalize(item.style);

      const basicMatch = itemSize === searchSize && itemStyle === searchStyle;

      if (item.frame) {
        return basicMatch && item.frame === selectedFrame;
      }
      return basicMatch;
    });
  }, [selectedSize, selectedStyle, selectedFrame, product]);

  const displayPrice = currentSelection?.price || product?.price || 0;
  const displayMRP =
    currentSelection?.mrp || product?.offerPrice || product?.price || 0;

  const isSizeAvailable = (sizeString) => {
    if (!product || !product.priceMatrix) return false;
    const search = normalize(sizeString);
    return product.priceMatrix.some((m) => normalize(m.size) === search);
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const isInWishlist = wishlist.some(
    (item) => item.id === product?._id || item._id === product?._id,
  );

  const handleInteraction = (e) => {
    if (!imgRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    let x = ((clientX - left) / width) * 100;
    let y = ((clientY - top) / height) * 100;

    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setZoomData({ x, y, show: true });
  };

  const onAddToCart = () => {
    if (!selectedSize || !selectedFrame) {
      toast.error("Please select a dimension and frame type first.");
      return;
    }

    if (!isLoggedIn) {
      toast.error("Please login to start shopping");
      router.push("/login");
      return;
    }
    addToCart({
      id: product._id,
      title: product.title,
      sku: product.sku || `AA-${product._id.slice(-5).toUpperCase()}`,
      price: displayPrice,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
      frame: selectedFrame,
      style: selectedStyle,
      godName: product.godName,
    });
    toast.success(`${quantity} Item(s) added to cart`);
  };

  const onBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed");
      router.push("/login");
      return;
    }
    onAddToCart();
    router.push("/cart");
  };

  const technicalSpecs = [
    { label: "Divine Subject", value: product.godName },
    { label: "Work Style", value: WORK_STYLE_LABELS[selectedStyle] || selectedStyle },
    { label: "Frame Type", value: selectedFrame },
    { label: "Lead Time", value: product.leadTime },
  ];

  const handleWishlistClick = () => {
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
      price: displayPrice,
      image: activeImage || product.images[0],
      size: selectedSize,
      frame: selectedFrame,
      style: selectedStyle,
      godName: product.godName,
      inStock: product.inStock,
    });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images,
    "description": product.description,
    "sku": product.sku || `AA-${product._id.slice(-5).toUpperCase()}`,
    "brand": {
      "@type": "Brand",
      "name": "Aishwarya Arts"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.aishwaryaarts.com/collections/${product._id}`,
      "priceCurrency": "INR",
      "price": displayPrice,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceValidUntil": "2030-12-31",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white font-outfit pb-20 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="max-w-360 mx-auto px-4 md:px-6 py-6 md:py-8 text-[10px] md:text-[12px] uppercase tracking-wide text-zinc-700 flex items-center gap-2 overflow-hidden">
        <Link href="/" className="hover:text-amber-800 whitespace-nowrap">
          Home
        </Link>
        <ChevronRight size={10} className="shrink-0" aria-hidden="true" />
        <Link
          href="/collections"
          className="hover:text-amber-800 whitespace-nowrap"
        >
          Collections
        </Link>
        <ChevronRight size={10} className="shrink-0" aria-hidden="true" />
        <span className="text-zinc-900 font-semibold truncate" aria-current="page">
          {product.title}
        </span>
      </nav>

      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">

          {/* --- LEFT: IMAGE EXHIBIT --- */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div
              className="relative aspect-4/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-crosshair group touch-none bg-zinc-50 border border-zinc-200"
              onMouseMove={handleInteraction}
              onTouchMove={handleInteraction}
              onMouseEnter={() =>
                setZoomData((prev) => ({ ...prev, show: true }))
              }
              onMouseLeave={() =>
                setZoomData((prev) => ({ ...prev, show: false }))
              }
            >
              <Image
                ref={imgRef}
                src={activeImage}
                alt={`${product.title} - Authentic Tanjore Painting View`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-contain p-4 transition-opacity duration-300 ${zoomData.show ? "xl:opacity-0" : "opacity-100"}`}
                priority
              />
              {zoomData.show && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 w-full h-full pointer-events-none hidden lg:block"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomData.x}% ${zoomData.y}%`,
                    backgroundSize: "280%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 md:p-4 rounded-full bg-white/90 shadow-xl hover:scale-110 active:scale-90 transition-transform cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-800"
              >
                <Heart
                  size={20}
                  className={
                    isInWishlist ? "fill-red-600 text-red-600" : "text-zinc-900"
                  }
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x" role="region" aria-label="Product thumbnail gallery">
              {allGalleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`Show gallery image view ${idx + 1}`}
                  className={`relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 snap-center cursor-pointer border ${activeImage === img ? "border-amber-800 ring-2 ring-amber-800/20" : "border-zinc-300 opacity-70 hover:opacity-100"}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1} of ${product.title}`} fill sizes="96px" className="object-cover bg-zinc-50" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: THE NARRATIVE --- */}
          <div className="lg:col-span-5 flex flex-col space-y-8 md:space-y-10">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 md:w-8 bg-amber-800" aria-hidden="true" />
                <span className="text-sm md:text-md font-semibold uppercase tracking-[0.2em] text-amber-800 italic">
                  Artisan Masterpiece
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight font-cinzel">
                {product.title}
              </h1>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight tabular-nums">
                    ₹{displayPrice.toLocaleString("en-IN")}
                  </span>

                  {displayMRP > displayPrice && (
                    <span className="text-lg md:text-xl text-zinc-600 line-through font-light tabular-nums">
                      ₹{displayMRP.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {displayMRP > displayPrice && (
                  <p className="text-xs md:text-sm font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-200 mt-2">
                    Save ₹{(displayMRP - displayPrice).toLocaleString("en-IN")}{" "}
                    Today
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-amber-900 uppercase tracking-widest bg-amber-50 w-fit px-4 py-1.5 rounded-full border border-amber-200">
                <CheckCircle2 size={14} aria-hidden="true" /> Authentic 22K Gold Foil
              </div>
            </header>

            {/* SIZE CARDS */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-900">
                  Available Dimensions
                </label>
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-tight">
                  Select size to update price
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="group" aria-label="Available dimensions">
                {DIMENSIONS.map((size) => {
                  const isAvailable = isSizeAvailable(size);
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Select size ${size}`}
                      className={`relative py-2.5 px-1 rounded-xl border text-sm md:text-base font-bold transition-all duration-300 cursor-pointer ${!isAvailable
                        ? "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"
                        : isSelected
                          ? "border-amber-900 bg-amber-950 text-white shadow-md ring-2 ring-amber-800/30"
                          : "border-zinc-300 bg-white text-zinc-900 hover:border-amber-700"
                        }`}
                    >
                      {size.replace(/["\s]/g, "").replace("X", "x")}
                      {!isAvailable && (
                        <Lock
                          size={10}
                          className="absolute top-1 right-1 opacity-50"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FRAME PILLS */}
            <div className="space-y-4">
              <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-900 block">
                Frame Selection
              </label>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Frame selection options">
                {GLOBAL_ASSETS.frames.map((frame) => (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => {
                      setSelectedFrame(frame.name);
                      setActiveImage(frame.url);
                    }}
                    aria-label={`Select ${frame.name}`}
                    className={`px-4 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedFrame === frame.name
                      ? "bg-amber-950 text-white border-amber-950 shadow-md scale-105"
                      : "bg-zinc-50 text-zinc-800 border-zinc-300 hover:border-amber-700 hover:text-amber-900 hover:bg-white"
                      }`}
                  >
                    {frame.name.replace(" Frame", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* WORK STYLE SELECTION */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
                  Select Work Style
                </label>
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-tight">
                  {selectedStyle === "embossed" ? "Premium 3D Relief" : "Traditional Finish"}
                </span>
              </div>

              <div className="flex flex-wrap gap-3" role="group" aria-label="Work style options">
                {availableStyles.map((style) => {
                  const isSelected = selectedStyle === style;
                  const is3D = style === "embossed";

                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      aria-label={`Select work style ${WORK_STYLE_LABELS[style] || style}`}
                      className={`px-5 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${isSelected
                        ? "border-amber-900 bg-amber-950 text-white shadow-lg scale-[1.02]"
                        : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-amber-700 hover:bg-white"
                        }`}
                    >
                      <div
                        aria-hidden="true"
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isSelected ? "bg-white animate-pulse" : "bg-zinc-500"}`}
                      />
                      <span>{WORK_STYLE_LABELS[style] || style}</span>
                      {is3D && !isSelected && (
                        <span className="text-[8px] bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded-sm ml-1 font-bold">
                          PRO
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUANTITY & ACTIONS */}
            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <label className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-900 block">
                  Quantity
                </label>
                <div className="flex items-center justify-between bg-zinc-50 border border-zinc-300 rounded-2xl px-6 py-3 max-w-40">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="text-zinc-700 hover:text-amber-800 p-1 cursor-pointer"
                  >
                    <Minus size={16} aria-hidden="true" />
                  </button>
                  <span className="font-bold text-base text-zinc-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="text-zinc-700 hover:text-amber-800 p-1 cursor-pointer"
                  >
                    <Plus size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={onAddToCart}
                  aria-label="Add item to shopping cart"
                  className="group relative w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold uppercase text-xs md:text-sm tracking-[0.25em] overflow-hidden shadow-xl hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Add to Cart <ShoppingBag size={18} aria-hidden="true" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onBuyNow}
                  aria-label="Buy product immediately with express checkout"
                  className="w-full py-5 border-2 border-zinc-900 text-zinc-900 rounded-2xl font-bold uppercase text-xs md:text-sm tracking-[0.25em] hover:bg-amber-600 hover:border-amber-600 hover:text-white active:scale-95 transition-all cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* SHIPPING INFO BOX */}
            <div className="p-5 md:p-6 bg-zinc-50 rounded-3xl border border-zinc-300 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-2.5 text-amber-900 font-bold uppercase text-xs tracking-wide">
                  <div className="p-1.5 bg-white rounded-lg shadow-xs border border-zinc-200">
                    <Truck size={18} strokeWidth={2} aria-hidden="true" />
                  </div>
                  Logistics &amp; Delivery
                </div>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
                  Safe Transit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                    Creation &amp; Lead Time
                  </span>
                  <p className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700" aria-hidden="true" />
                    {product.leadTime || "7-18 Days"}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                    Shipping Fee
                  </span>
                  <p className="text-sm text-zinc-800 font-medium">
                    Calculated based on <strong className="text-zinc-900 underline decoration-amber-600">final weight</strong> after crating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM EXHIBIT --- */}
        <div className="mt-20 md:mt-32 pt-12 md:pt-20 border-t border-zinc-300 grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">

          {/* TECHNICAL SPECS */}
          <section className="lg:col-span-5 space-y-6" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="text-xs font-bold uppercase tracking-[0.2em] text-amber-900">
              Technical Specifications
            </h2>
            <div className="divide-y divide-zinc-200 bg-zinc-50 rounded-3xl px-6 md:px-8 py-2 border border-zinc-300 shadow-xs">
              {technicalSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between items-center py-4 gap-4"
                >
                  <span className="text-xs font-bold text-zinc-700 uppercase tracking-widest shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-sm font-bold uppercase text-zinc-900 italic text-right">
                    {spec.value || "Not Specified"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* PRODUCT STORY */}
          <section className="lg:col-span-7 space-y-6" aria-labelledby="story-heading">
            <h2 id="story-heading" className="text-xs font-bold uppercase tracking-[0.2em] text-amber-900">
              The Artisan Story
            </h2>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 tracking-tight font-cinzel leading-snug">
                {product.storyTitle?.replace(/22ct/gi, "22K") || "Heritage in Every Stroke"}
              </h3>
              <div className="space-y-4">
                <p className="text-zinc-800 text-base md:text-lg leading-relaxed font-medium">
                  {product.description?.replace(/22ct/gi, "22K")}
                </p>
                {product.detailedDescription && (
                  <p className="text-zinc-700 text-sm md:text-base leading-relaxed italic border-l-4 border-amber-700 pl-6 py-2">
                    {product.detailedDescription.replace(/22ct/gi, "22K")}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* ARTISAN HALLMARKS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-20 mt-20 border-t border-zinc-300" aria-label="Aishwarya Arts quality hallmarks">
          {[
            {
              icon: <Award size={24} aria-hidden="true" />,
              title: "25+ Years Legacy",
              desc: "Crafted by master artisans from Thanjavur.",
            },
            {
              icon: <Zap size={24} aria-hidden="true" />,
              title: "22K Gold Foil",
              desc: "Certified original gold leaf used.",
            },
            {
              icon: <ShieldAlert size={24} aria-hidden="true" />,
              title: "Safety & Care",
              desc: "Avoid direct sunlight and moisture.",
            },
            {
              icon: <CheckCircle2 size={24} aria-hidden="true" />,
              title: "Durability",
              desc: "Traditional teak frames and waterproof base.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-300 shadow-xs">
              <div className="h-12 w-12 shrink-0 bg-white border border-zinc-300 rounded-xl flex items-center justify-center text-amber-800 shadow-xs">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-900 font-cinzel">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}