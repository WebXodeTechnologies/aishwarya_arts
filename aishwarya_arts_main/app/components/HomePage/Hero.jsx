"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  "/assets/hero/heroimageswebp/AishwarayaArts-1-cpy.png",
  "/assets/hero/heroimageswebp/1.png",
  "/assets/hero/heroimageswebp/AishwarayaArts-3.png",
  "/assets/hero/heroimageswebp/2.png",
  "/assets/hero/heroimageswebp/3.png",
  "/assets/hero/heroimageswebp/4.png"
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const delay = 5000;

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    // Main Wrapper for centering and max-width
    <section className="w-full py-4 px-2 md:px-0">
      <div className="max-w-7xl mx-auto">
        
        {/* Aspect Ratio Container: 4/3 on mobile, 16/9 on desktop */}
        <div className="relative aspect-4/3 md:aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-transparent">
          
          {/* Slider Wrapper */}
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {heroImages.map((src, i) => (
              <div key={src} className="relative min-w-full h-full">
                <Image
                  src={src}
                  alt={`Hero Image ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover" 
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls - Hidden on tiny screens, visible from 'sm' up */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/90 hover:bg-white text-black transition-all shadow-md active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/90 hover:bg-white text-black transition-all shadow-md active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all rounded-full ${
                  index === i ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}