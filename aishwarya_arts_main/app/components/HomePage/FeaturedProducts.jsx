"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiHeart, FiEye, FiShoppingCart, FiX, FiAward, FiGrid, FiPackage } from "react-icons/fi";
import { useCartStore } from "../../../store/useCartStore";
import { useWishlistStore } from "../../../store/useWishlistStore";

// Static premium fallbacks matching database records perfectly in case database is empty or offline
const staticFeaturedProducts = [
  {
    _id: "6a507af1f07e5f5b163653c1",
    title: "Balaji Thayaar",
    price: 179999,
    dimensions: "60\" X 36\"",
    frameType: "Chettinad Teak Wood",
    goldPurity: "Certified 22K Gold Foil",
    materialBase: "Water-resistant Plywood & Cotton Cloth",
    description: "Sacred painting representing Lord Venkateswara (Balaji) and Goddess Padmavathi (Thayaar) in divine union.",
    images: ["https://utfs.io/f/wIfrl1CCrEbxy5R2k0YhmXwJPlDEpos0iHTxvSk2b5aedZj4"]
  },
  {
    _id: "6a48ff5fe4a10c8f5a09e099",
    title: "Vinayagar - Ganesha",
    price: 11999,
    dimensions: "15\" X 12\"",
    frameType: "Genuine Teak Wood",
    goldPurity: "Certified 22K Gold Foil",
    materialBase: "Water-resistant Plywood & Cotton Cloth",
    description: "Traditional Tanjore Vinayagar painting. Exquisite details capturing Lord Ganesha invoking auspiciousness and removing obstacles.",
    images: ["https://utfs.io/f/wIfrl1CCrEbxrdBtTdyEFRsrKoLu5wObze9T6S3A4mtQ8jvC"]
  },
  {
    _id: "6a37dfb974d1d8b911cda9f5",
    title: "Narthana kalinga krishnan",
    price: 11999,
    dimensions: "15\" X 12\"",
    frameType: "Genuine Teak Wood",
    goldPurity: "Certified 22K Gold Foil",
    materialBase: "Water-resistant Plywood & Cotton Cloth",
    description: "The youthful Krishna dancing on the serpent Kalinga, radiating divine charm, energy, and cosmic playfulness.",
    images: ["https://utfs.io/f/wIfrl1CCrEbxgbiy5sOsxNnKTyrAHgjdRPa0wX8eGBIZlvQS"]
  },
  {
    _id: "6a37df1874d1d8b911cd8f82",
    title: "Andal",
    price: 11999,
    dimensions: "15\" X 12\"",
    frameType: "Genuine Teak Wood",
    goldPurity: "Certified 22K Gold Foil",
    materialBase: "Water-resistant Plywood & Cotton Cloth",
    description: "Exquisite Tanjore rendering of Goddess Andal, the manifestation of pure devotion and unconditional love.",
    images: ["https://utfs.io/f/wIfrl1CCrEbxwIHnfZCCrEbx3J1eBtI5Sd6PWnopkh0fYycA"]
  },
  {
    _id: "6a36b1723a2a0bdb9ee15784",
    title: "Lalitha Devi",
    price: 49999,
    dimensions: "24\" X 18\"",
    frameType: "Chettinad Teak Wood",
    goldPurity: "Certified 22K Gold Foil",
    materialBase: "Water-resistant Plywood & Cotton Cloth",
    description: "Goddess Lalitha Tripurasundari, the supreme sovereign deity, seated on her royal throne adorned with precious stones.",
    images: ["https://utfs.io/f/wIfrl1CCrEbx3ryKKZt6ZHPx9NIj5B2g04RAMytmVhOk1sEL"]
  },
  {
    _id: "6a36afd63a2a0bdb9ee12556",
    title: "Annapoorani",
    price: 39999,
    dimensions: "20\" X 16\"",
    frameType: "Genuine Teak Wood",
    goldPurity: "Certified 22K Gold Foil",
    materialBase: "Water-resistant Plywood & Cotton Cloth",
    description: "Goddess Annapoorani, the divine provider of food, nourishment, and infinite satisfaction, holding her golden ladle.",
    images: ["https://utfs.io/f/wIfrl1CCrEbxtex1DC9oneiaBv6kbsRJmgXKfzLDGWcy7IYE"]
  }
];

// Tabs for client filtering
const TABS = [
  { id: "all", label: "All Masterpieces" },
  { id: "ganesha", label: "Ganesha" },
  { id: "krishna", label: "Krishna & Balaji" },
  { id: "devis", label: "Lakshmi & Devis" },
  { id: "shiva", label: "Shiva & Others" }
];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Store actions
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          // Curate distinct masterpieces by title to avoid visual duplicates on homepage
          const uniqueMap = new Map();
          json.data.forEach((p) => {
            if (!uniqueMap.has(p.title)) {
              uniqueMap.set(p.title, p);
            }
          });
          setProducts(Array.from(uniqueMap.values()).slice(0, 12));
        } else {
          setProducts(staticFeaturedProducts);
        }
      } catch (err) {
        console.error("Failed fetching featured products:", err);
        setProducts(staticFeaturedProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync filtering based on active tab
  useEffect(() => {
    if (!products.length) return;

    if (activeTab === "all") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((p) => {
      const title = p.title.toLowerCase();
      switch (activeTab) {
        case "ganesha":
          return title.includes("ganesha") || title.includes("vinayagar");
        case "krishna":
          return title.includes("krishna") || title.includes("balaji") || title.includes("thayaar") || title.includes("thayar") || title.includes("andal");
        case "devis":
          return title.includes("lakshmi") || title.includes("devi") || title.includes("annapoorani") || title.includes("amman") || title.includes("kamatchi");
        case "shiva":
          return title.includes("shiva") || title.includes("sivan") || title.includes("murugan") || title.includes("murugar") || title.includes("aiyappan") || title.includes("ayyappan") || title.includes("hanuman") || title.includes("anjaneya");
        default:
          return true;
      }
    });

    setFilteredProducts(filtered);
  }, [activeTab, products]);

  const handleAddToCart = (product, e) => {
    if (e) e.preventDefault();
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      img: product.images?.[0] || product.img,
      size: product.dimensions || '20" X 16"',
      frame: product.frameType || 'Genuine Teak Wood',
      quantity: 1
    });
    toast.success(`${product.title} added to cart`);
  };

  const handleWishlistToggle = (product, e) => {
    if (e) e.preventDefault();
    toggleWishlist(product);
    const isFav = isInWishlist(product._id);
    if (isFav) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Saved to wishlist");
    }
  };

  // Variants for staggered entrance
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="max-w-7xl mx-auto py-24 px-4 md:px-8 border-t border-zinc-100 bg-[#faf8f5]/30">
      
      {/* --- Section Title Header --- */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-amber-600" />
          <span className="text-amber-800 font-bold tracking-[0.25em] uppercase text-[10px] md:text-[11px]">
            Masterpieces on Focus
          </span>
          <span className="h-px w-8 bg-amber-600" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
          Featured Gold Paintings
        </h2>
        <span className="block w-20 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></span>
        <p className="text-zinc-600 text-sm md:text-base mt-4 leading-relaxed">
          Exquisite hand-selected divine creations adorned with genuine 22K gold foil and embedded semiprecious Jaipur gemstones.
        </p>
      </div>

      {/* --- Deity Tabs Filters --- */}
      <div className="flex justify-center mb-12">
        <div className="flex overflow-x-auto pb-4 gap-2 md:gap-3 max-w-full no-scrollbar justify-start md:justify-center px-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-800 to-yellow-600 text-white shadow-md shadow-amber-800/10"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Products Grid / Loading Skeletons --- */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-zinc-100 space-y-4 animate-pulse">
              <div className="aspect-square bg-zinc-100 rounded-sm w-full" />
              <div className="h-4 bg-zinc-100 rounded w-2/3" />
              <div className="h-4 bg-zinc-100 rounded w-1/3" />
              <div className="h-10 bg-zinc-100 rounded-full w-full" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-zinc-100 rounded-2xl p-8 max-w-md mx-auto">
          <FiGrid className="mx-auto text-zinc-300 mb-4" size={40} />
          <h3 className="text-lg font-bold text-zinc-800">No matching paintings found</h3>
          <p className="text-sm text-zinc-500 mt-2">Try clearing your category filter or exploring our entire catalog.</p>
          <button
            onClick={() => setActiveTab("all")}
            className="mt-6 px-5 py-2 bg-zinc-900 text-white text-xs font-bold uppercase rounded-full tracking-wider hover:bg-zinc-800"
          >
            Show All
          </button>
        </div>
      ) : (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => {
            const isFavorite = isInWishlist(product._id);
            const imageSrc = product.images?.[0] || "/logo.png";
            return (
              <motion.article
                key={product._id}
                variants={cardVariants}
                className="group bg-white border border-zinc-200/60 rounded-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-500 relative"
              >
                {/* Image Showcase Frame */}
                <div className="relative aspect-[4/5] bg-zinc-50/50 overflow-hidden border-b border-zinc-100">
                  <Image
                    src={imageSrc}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Decorative Subtle Dark Vignette on Hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 22K Gold Certification Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-amber-800 rounded-sm border border-amber-200 shadow-xs flex items-center gap-1.5">
                      <FiAward className="text-amber-600" size={11} />
                      22K Gold Foil
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-xs text-zinc-900 transition-colors duration-300 hover:bg-amber-800 hover:text-white cursor-pointer"
                  >
                    <FiHeart
                      size={14}
                      className={isFavorite ? "fill-amber-600 stroke-amber-600" : "stroke-current"}
                    />
                  </button>

                  {/* Actions overlay visible on hover */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 px-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white hover:bg-zinc-950 hover:text-white text-zinc-950 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <FiEye size={13} />
                      Quick View
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <FiShoppingCart size={13} />
                      Add
                    </button>
                  </div>
                </div>

                {/* Information block */}
                <div className="p-6 flex flex-col flex-grow text-center items-center">
                  <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase mb-1.5 block">
                    {product.category === "others" ? "Tanjore Painting" : product.category}
                  </span>
                  
                  <Link href={`/collections/${product._id}`} className="block">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 hover:text-amber-800 transition-colors duration-300 mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-zinc-500 mb-4 line-clamp-2 min-h-8">
                    {product.description || "Certified authentic 22K gold leaf work crafted carefully by our master artist."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-100 w-full flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Base Price</span>
                      <span className="text-lg font-black text-zinc-900">
                        ₹{product.price?.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Link
                      href={`/collections/${product._id}`}
                      className="text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 flex items-center gap-1.5 transition-colors"
                    >
                      Details
                      <span className="text-md font-light">→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}

      {/* --- Global Action Footer --- */}
      <div className="mt-20 text-center">
        <Link
          href="/collections"
          className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-900 text-zinc-900 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-300"
        >
          Explore Full Gallery
          <span className="text-md font-normal">→</span>
        </Link>
      </div>

      {/* --- Specification Quick View Modal --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row border border-zinc-100 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-md rounded-full text-zinc-800 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>

              {/* Left: Product Image */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-zinc-50 flex items-center justify-center p-8 relative min-h-80">
                <Image
                  src={selectedProduct.images?.[0] || "/logo.png"}
                  alt={selectedProduct.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8"
                />
              </div>

              {/* Right: Specifications Content */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-700 tracking-widest uppercase block mb-2">
                    {selectedProduct.category === "others" ? "Tanjore Painting" : selectedProduct.category}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 leading-tight mb-4">
                    {selectedProduct.title}
                  </h3>

                  <div className="text-2xl font-black text-amber-900 mb-6">
                    ₹{selectedProduct.price?.toLocaleString("en-IN")}
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                    {selectedProduct.description || "Authentic handmade traditional Tanjore painting adorned with certified 22K Gold foil and hand-embedded gemstones."}
                  </p>

                  {/* Specs Checklist Table */}
                  <div className="space-y-3.5 border-t border-b border-zinc-100 py-6 mb-6">
                    <div className="flex items-center text-xs text-zinc-700">
                      <FiAward className="text-amber-600 mr-3" size={15} />
                      <span className="font-semibold w-28 text-zinc-500 uppercase tracking-wider">Gold Purity:</span>
                      <span className="font-bold text-zinc-900">{selectedProduct.goldPurity || "Certified 22ct Gold Foil"}</span>
                    </div>

                    <div className="flex items-center text-xs text-zinc-700">
                      <FiGrid className="text-amber-600 mr-3" size={15} />
                      <span className="font-semibold w-28 text-zinc-500 uppercase tracking-wider">Base Size:</span>
                      <span className="font-bold text-zinc-900">{selectedProduct.dimensions || '20" X 16"'} (Customizable)</span>
                    </div>

                    <div className="flex items-center text-xs text-zinc-700">
                      <FiPackage className="text-amber-600 mr-3" size={15} />
                      <span className="font-semibold w-28 text-zinc-500 uppercase tracking-wider">Frame:</span>
                      <span className="font-bold text-zinc-900">{selectedProduct.frameType || "Genuine Teak Wood"}</span>
                    </div>

                    <div className="flex items-center text-xs text-zinc-700">
                      <FiGrid className="text-amber-600 mr-3" size={15} />
                      <span className="font-semibold w-28 text-zinc-500 uppercase tracking-wider">Material:</span>
                      <span className="font-bold text-zinc-900 text-left leading-tight max-w-64">{selectedProduct.materialBase || "Water-resistant Plywood & Cotton Cloth"}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-zinc-900 text-white font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
                  >
                    <FiShoppingCart size={15} />
                    Add to Shopping Cart
                  </button>
                  <Link
                    href={`/collections/${selectedProduct._id}`}
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 border border-zinc-300 text-zinc-800 font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
                  >
                    View Details Page
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(FeaturedProducts);
