"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const staticFallbacks = [
  "/assets/hero/heroimageswebp/1.webp",
  "/assets/hero/heroimageswebp/2.webp",
  "/assets/hero/heroimageswebp/3.webp",
  "/assets/hero/heroimageswebp/4.webp",
];

export default function Hero({ initialBanners }) {
  // Initialize immediately with local WebP banners as primary content for instant paint
  const [banners, setBanners] = useState(() => {
    if (initialBanners && initialBanners.length > 0) return initialBanners;
    return staticFallbacks.map((url, i) => ({
      _id: `static-${i}`,
      imageUrl: url,
      title: "Authentic Tanjore Art",
    }));
  });

  const [index, setIndex] = useState(0);
  const delay = 6000;

  useEffect(() => {
    if (initialBanners && initialBanners.length > 0) return;

    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/admin/banner");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        }
      } catch (error) {
        console.error("Banner fetch error, retaining primary WebP assets:", error);
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

  if (banners.length === 0) return null;

  return (
    <section className="w-full py-8 bg-white" aria-label="Hero Banner Slideshow">
      <div className="max-w-7xl mx-auto px-4 relative group">
        {/* Main Banner Container */}
        <div className="relative aspect-video md:aspect-21/9 w-full overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-zinc-50 border border-zinc-100">
          
          {/* THE SLIDER TRACK - FIXED SYNTAX ERROR HERE */}
          <div
            className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {banners.map((banner, i) => {
              const isFirstSlide = i === 0;

              return (
                <div
                  key={banner._id || i}
                  className="relative min-w-full h-full overflow-hidden"
                >
                  {index === i && banner.title && (
                    <h1 className="sr-only">{banner.title}</h1>
                  )}

                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || "Exquisite Handmade Tanjore Painting"}
                    fill
                    priority={isFirstSlide}
                    loading={isFirstSlide ? "eager" : "lazy"}
                    unoptimized={banner.imageUrl.startsWith("/assets/") ? false : true}
                    sizes="100vw"
                    className={`object-cover object-center transition-transform duration-8000 ease-out ${
                      index === i ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* CONTROLS */}
          {banners.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-10">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500 focus:outline-hidden focus:ring-2 focus:ring-white"
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500 focus:outline-hidden focus:ring-2 focus:ring-white"
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              </div>

              {/* PAGINATION */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/10 z-10">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative group py-2 focus:outline-hidden"
                  >
                    <div
                      className={`h-0.75 rounded-full transition-all duration-700 ${
                        index === i
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