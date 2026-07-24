"use client";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiArrowRight, FiAward } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
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
          // Taking a balanced grid: top 6 best sellers
          const filtered = data.data
            .filter((p) => p.isBestSeller === true)
            .slice(0, 6);
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
      <div className="w-full flex flex-col justify-center items-center h-[60vh] bg-white">
        <div className="w-12 h-12 border-2 border-amber-800 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-outfit text-zinc-400 text-xs tracking-[0.3em] uppercase">Curating Gallery...</p>
      </div>
    );

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-350 mx-auto px-4 md:px-8">

        {/* --- Section Header --- */}
        <header className="max-w-4xl mx-auto mb-12 md:mb-20 flex flex-col items-center text-center">
          {/* 1. Small Badge Above */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-amber-600" />
            <span className="text-amber-700 font-bold tracking-[0.3em] uppercase text-[10px]">
              Legacy Collection
            </span>
            <span className="h-px w-8 bg-amber-600" />
          </motion.div>

          {/* 2. Main H1 Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 leading-[1.1] mb-8"
          >
            Our <span className="font-bold">Best</span> Sellers
          </motion.h1>

          {/* 3. Description Below */}
          <p className="text-zinc-900 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Authentic 22K Gold Tanjore paintings, meticulously hand-curated for
            those who seek divine elegance.
          </p>
        </header>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-y-24">
          {products.map((product, index) => (
            <motion.article
              key={product._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <Link href={`/collections/${product._id}`} className="w-full group/link">
                {/* Image Stage */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-zinc-50 mb-8 rounded-sm">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain p-6 md:p-10 transition-transform duration-[1.5s] ease-out group-hover/link:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Luxury Authenticity Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-zinc-100 shadow-sm">
                      <FiAward className="text-amber-600" size={12} />
                      <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-800">22K Gold</span>
                    </div>
                  </div>

                  {/* Floating Wishlist */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success("Saved to favorites");
                    }}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full text-zinc-900 shadow-lg translate-y-2 opacity-0 group-hover/link:translate-y-0 group-hover/link:opacity-100 transition-all duration-300 hover:bg-zinc-900 hover:text-white"
                  >
                    <FiHeart size={16} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex flex-col items-center px-4">

                  <h3 className="text-xl md:text-2xl font-medium text-zinc-900 mb-3 transition-colors duration-500 group-hover/link:text-amber-800 line-clamp-1">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-xl font-bold text-zinc-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.offerPrice > product.price && (
                      <span className="text-zinc-600 line-through text-xs font-light">
                        ₹{product.offerPrice.toLocaleString("en-IN")}
                      </span>
                    )}

                  </div>

                  {/* --- SASS STYLE GHOST BUTTON --- */}
                  <div className="w-full max-w-50 relative overflow-hidden group/btn">
                    <div className="flex items-center justify-center gap-3 py-3.5 px-6 border border-zinc-900 rounded-full transition-all duration-500 relative z-10 group-hover/btn:border-zinc-900 group-hover/btn:text-white">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">View Masterpiece</span>
                      <FiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-500" />
                    </div>
                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* --- Global Footer CTA --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 md:mt-32 flex justify-center"
        >
          <Link
            href="/collections"
            className="group flex items-center gap-8 py-6 px-10 border border-zinc-200 hover:border-amber-800 transition-all duration-500 relative overflow-hidden"
          >
            <span className="relative z-10 font-outfit text-sm font-bold uppercase tracking-[0.4em] text-zinc-900 group-hover:text-white transition-colors duration-500">
              Explore Entire Gallery
            </span>
            <FiArrowRight className="relative z-10 text-amber-800 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
            <div className="absolute inset-0 bg-amber-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(BestSellers);