"use client";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          // We filter for Best Sellers and take only the top 3
          const filtered = data.data
            .filter((p) => p.isBestSeller === true)
            .slice(1, 7);
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (loading)
    return (
      <div className="w-full flex justify-center items-center h-100 bg-[#FCFAF7]">
        <div className="animate-pulse font-cinzel text-amber-800 text-xl tracking-widest uppercase">
          Curating Masterpieces...
        </div>
      </div>
    );

  if (products.length === 0) return null;

  return (
    <section className="w-full relative bg-[#ffffff] py-20 lg:py-32 px-6 overflow-hidden">
      {/* Texture Overlay */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-amber-700 font-bold tracking-[0.4em] uppercase text-md  mb-4 block"
          >
            Aishwarya Arts Exclusive
          </motion.span>

          <h1 className="text-4xl md:text-7xl  text-slate-900 mb-6 tracking-wide">
            <span className=" text-zinc-900 font-semibold ">Best Sellers</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-amber-800/30"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-800"></div>
            <div className="h-px w-12 bg-amber-800/30"></div>
          </div>

          <p className="text-slate-800 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-serif  font-medium">
            Authentic 22K Gold Tanjore paintings, meticulously hand-curated for
            those who seek divine elegance.
          </p>
        </header>

        {/* Mapped Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 w-full max-w-7xl mx-auto px-4">
          {products.map((product, index) => (
            <motion.article
              key={product._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col w-full bg-white transition-all duration-500"
            >
              {/* --- Image Stage --- */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F9F9F9] rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                {/* Main Image */}
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />

                {/* Top Right Actions */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                  <button
                    onClick={() => toast.success("Added to Wishlist")}
                    className="p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-amber-800 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 shadow-sm"
                  >
                    <FiHeart size={18} />
                  </button>
                </div>

                {/* Bottom Slide-up Button (Shopify Style) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                  <Link
                    href={`/product/${product.sku}`}
                    className="w-full bg-slate-900 text-white py-4 font-cinzel text-[10px] tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-amber-900 transition-colors shadow-2xl"
                  >
                    QUICK VIEW{" "}
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Subtle Frame Overlay (Inner Shadow) */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
              </div>

              {/* --- Product Info --- */}
              <div className="pt-6 flex flex-col items-center text-center">
                {/* Category Badge */}
                <span className="text-[10px] font-bold tracking-[0.25em] text-amber-700 uppercase mb-2 opacity-80">
                  {product.category || "Tanjore Masterpiece"}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-cinzel font-semibold text-slate-900 mb-3 group-hover:text-amber-800 transition-colors duration-300 line-clamp-1 px-2">
                  {product.title}
                </h3>

                {/* Price Section */}
                <div className="flex items-baseline gap-3">
                  {product.offerPrice && (
                    <span className="text-slate-400 line-through text-sm font-light">
                      ₹{product.offerPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-2xl font-serif font-bold text-slate-800">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* View Details Text (Desktop only underline) */}
                <div className="mt-4 overflow-hidden">
                  <Link
                    href={`/product/${product.sku}`}
                    className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-amber-800 transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-amber-800 after:transition-all group-hover:after:w-full"
                  >
                    Explore Heritage
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Discover More Link */}
        <div className="flex justify-center mt-20 md:mt-32 mb-12 px-4">
          <Link
            href="/collections"
            className="group relative flex flex-col items-center w-full max-w-fit"
          >
            {/* The Main Action Button */}
            <div className="relative flex items-center justify-center gap-4 md:gap-6 px-6 py-4 md:px-12 md:py-5 bg-white border border-slate-200 overflow-hidden transition-all duration-500 group-hover:border-amber-600 group-hover:shadow-[0_20px_40px_-15px_rgba(180,140,80,0.3)]">

              {/* Background Fill Effect (Shopify Style) */}
              <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-amber-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

              {/* Text Label - Adjusted size for responsiveness */}
              <span className="relative z-10 text-slate-900 font-cinzel text-xs sm:text-sm md:text-md tracking-[0.2em] sm:tracking-[0.4em] font-bold group-hover:text-white transition-colors duration-500 uppercase whitespace-nowrap">
                Explore Entire Gallery
              </span>

              {/* The Animated Arrow Container - Hidden on very small screens to save space if needed, or scaled */}
              <div className="relative z-10 hidden sm:block w-6 md:w-8 h-px bg-slate-400 group-hover:bg-white/50 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </div>

              <FiArrowRight
                size={18}
                className="relative z-10 text-slate-900 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 shrink-0"
              />
            </div>

            {/* Secondary "Traditional" Detail */}
            <div className="mt-6 flex flex-col items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              <div className="h-6 md:h-8 w-px bg-linear-to-b from-amber-800 to-transparent"></div>
              <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-amber-900 uppercase">
                Since 2000
              </span>
            </div>

            {/* Subtle Decorative Aura */}
            <div className="absolute -inset-4 bg-amber-100/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100 hidden md:block"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(BestSellers);
