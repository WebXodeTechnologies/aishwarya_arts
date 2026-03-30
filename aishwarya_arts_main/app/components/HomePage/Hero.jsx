"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

const staticFallbacks = [
  "/assets/hero/heroimageswebp/AishwarayaArts-3.png",
  "/assets/hero/heroimageswebp/2.png",
  "/assets/hero/heroimageswebp/Aishwaray Arts.png",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const delay = 6000;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/admin/banner", { cache: "no-store" });
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          // 🟢 Reverse order so newest is first
          setBanners([...data]);
        } else {
          setBanners(
            staticFallbacks.map((url, i) => ({
              _id: `static-${i}`,
              imageUrl: url,
            })),
          );
        }
      } catch (error) {
        setBanners(
          staticFallbacks.map((url, i) => ({ _id: `err-${i}`, imageUrl: url })),
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
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

  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 relative group">
        {/* Main Banner Container */}
        <div className="relative aspect-[16/9] md:aspect-21/9 w-full overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-zinc-50 border border-zinc-100">
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
                <Image
                  src={banner.imageUrl}
                  alt="Gallery Masterpiece"
                  fill
                  priority={i === 0}
                  unoptimized={banner.imageUrl.includes("utfs.io")}
                  className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                    index === i ? "scale-110" : "scale-100"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* 🟢 MINIMALIST CONTROLS: Glassmorphism Style */}
          {banners.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 translate-x-[-100%] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 translate-x-[100%] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-500"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* 🟢 LUXURY PAGINATION: Slim Gold Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/10">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className="relative group"
                  >
                    <div
                      className={`h-[3px] rounded-full transition-all duration-700 ${
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
