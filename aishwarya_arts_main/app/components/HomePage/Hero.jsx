"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import Next Image
const NextImage = dynamic(() => import("next/image"));

const heroImages = [
  "/assets/hero/heroimageswebp/img1.webp",
  "/assets/hero/heroimageswebp/paintwithframe.webp",
  "/assets/hero/heroimageswebp/pencilarts.webp",
  "/assets/hero/heroimageswebp/sami.webp",
  "/assets/hero/heroimageswebp/watercolor-elephant-illustration.webp",
  "/assets/hero/heroimageswebp/women.webp",
  "/assets/hero/heroimageswebp/womencelebration.webp",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 4000; 
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, delay);

    return () => resetTimeout();
  }, [index]);

  return (
    <section
      className="relative w-full h-[30vh] sm:h-[80vh] md:h-[85vh] lg:h-[92.5vh] overflow-hidden"
      aria-label="Aishwarya Arts Hero Carousel"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {heroImages.map((src, i) => (
          <div key={i} className="flex-shrink-0 relative w-full h-full">
            <NextImage
              src={src}
              alt={`Aishwarya Arts painting ${i + 1}`}
              fill
              className="object-cover object-center w-full h-full"
              sizes="100vw"
              priority={i === 0} 
              loading={i === 0 ? "eager" : "lazy"} 
            />
          </div>
        ))}
      </div>

      {/* Hidden SEO heading */}
      <h1 className="sr-only">
        Aishwarya Arts - Handcrafted Tanjore and Traditional Indian Paintings
      </h1>
    </section>
  );
}
