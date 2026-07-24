"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Fallback images remain the same
const staticFallbacks = [
  "/assets/hero/heroimageswebp/AishwarayaArts-3.png",
  "/assets/hero/heroimageswebp/2.png",
  "/assets/hero/heroimageswebp/Aishwaray Arts.png",
];

export default function Hero({ initialBanners }) {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState(initialBanners || []);
  const [loading, setLoading] = useState(!initialBanners);
  // Standardize delay to 5-7 seconds for better UX/CLS
  const delay = 6000;

  useEffect(() => {
    // If banners were fetched on the server, do not fetch again on the client
    if (initialBanners && initialBanners.length > 0) {
      setBanners(initialBanners);
      setLoading(false);
      return;
    }

    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/admin/banner");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        } else {
          setBanners(
            staticFallbacks.map((url, i) => ({
              _id: `static-${i}`,
              imageUrl: url,
              title: "Authentic Tanjore Art",
            }))
          );
        }
      } catch (error) {
        console.error("Banner fetch error:", error);
        setBanners(
          staticFallbacks.map((url, i) => ({
            _id: `err-${i}`,
            imageUrl: url,
            title: "Handmade Indian Painting",
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [initialBanners]);

  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    if (banners.length === 0) return;
    setIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval);
  }, [nextSlide, banners.length]);

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="aspect-21/9 w-full bg-zinc-100 animate-pulse rounded-[2.5rem]" />
      </div>
    );

  // Do not render section if no banners exist
  if (banners.length === 0) return null;

  return (
    <section className="w-full py-8 bg-white" aria-label="Hero Banner Slideshow">
      <div className="max-w-7xl mx-auto px-4 relative group">
        {/* Main Banner Container */}
        <div className="relative aspect-video md:aspect-21/9 w-full overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-zinc-50 border border-zinc-100">
          {/* THE SLIDER TRACK */}
          <div
            className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {banners.map((banner, i) => (
              <div
                key={banner._id || i}
                className="relative min-w-full h-full overflow-hidden"
              >
                {/* SEO H1 Tag per Slide */}
                {index === i && banner.title && (
                  <h1 className="sr-only">{banner.title}</h1>
                )}

                <Image
                  src={banner.imageUrl}
                  alt={banner.title || "Exquisite Handmade Tanjore Painting"}
                  fill
                  priority={i === 0}
                  unoptimized
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className={`object-cover object-center transition-transform duration-8000 ease-out ${index === i ? "scale-110" : "scale-100"
                    }`}
                />
              </div>
            ))}
          </div>

          {/* MINIMALIST CONTROLS: Glassmorphism Style */}
          {banners.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-10">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* LUXURY PAGINATION: Slim Gold Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/10 z-10">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative group py-2"
                  >
                    <div
                      className={`h-0.75 rounded-full transition-all duration-700 ${index === i
                        ? "w-10 bg-amber-500"
                        : "w-3 bg-white/30 hover:bg-white/60"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}