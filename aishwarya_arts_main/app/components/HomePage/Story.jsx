"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Button from "./Button";

const images = [
  "/assets/aboutCTA/2.webp",
  "/assets/aboutCTA/about.png",
  "/assets/aboutCTA/4.webp",
  "/assets/aboutCTA/5.webp",
];

const Story = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Rotate every 4 seconds for balanced user readability
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full max-w-7xl mx-auto py-20 px-6 md:px-16 bg-white"
      aria-labelledby="story-title"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Optimized Image slideshow wrapper */}
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full h-112.5 md:h-137.5 lg:h-150 overflow-hidden rounded-3xl shadow-xl bg-zinc-50 border border-zinc-100"
        >
          <Image
            src={images[currentImage]}
            alt={`Master Artisan Crafting Traditional Tanjore Painting - Slide ${currentImage + 1}`}
            fill
            priority={currentImage === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        </motion.div>

        {/* Right: SEO Rich Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left"
        >
          <h2
            id="story-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 font-cinzel tracking-wide"
          >
            Our Story &amp; Heritage in Tanjore Art
          </h2>

          <p className="text-zinc-700 leading-relaxed mb-4 text-base md:text-lg">
            At <strong className="font-semibold text-zinc-900">Aishwarya Arts</strong>,
            we celebrate the timeless spiritual beauty of{" "}
            <span className="text-amber-800 font-semibold">
              Traditional Handmade Tanjore Paintings
            </span>{" "}
            — an exquisite South Indian heritage art form celebrated for vibrant mineral colors,
            intricate relief work, and genuine 22K gold leaf embellishments.
          </p>

          <p className="text-zinc-700 leading-relaxed mb-8 text-base md:text-lg">
            Rooted in Tamil Nadu, our master craftsmen blend ancient temple architecture techniques
            with modern durability. From sacred deities to customized royal portraits,
            every certified artwork reflects profound devotion and unmatched artistic mastery.
          </p>

          <div className="w-full flex justify-start">
            <Button
              href="/about"
              color="none"
              aria-label="Learn more about Aishwarya Arts history and master artisans"
              className="group relative px-8 py-4 bg-zinc-900 overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(184,134,11,0.25)] active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
            >
              {/* Gold Gradient Shimmer Background */}
              <div className="absolute inset-0 bg-linear-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] opacity-95 group-hover:opacity-100 transition-opacity" />

              {/* Light Flare Animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/40 to-transparent" />

              <span className="relative flex items-center gap-3 text-zinc-950 font-bold text-base tracking-wide">
                Know More About Us
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;