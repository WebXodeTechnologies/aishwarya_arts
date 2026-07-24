"use client";
import React from "react";
import AnimatedTooltip from "./ui/animated-tooltip";
import { people } from "./index.js";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

const TooltipWithCTA = () => {
  return (
    <section
      className="w-full py-16 px-4 bg-white"
      aria-label="Art Enthusiasts and Collections Showcase"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* SEO H2 Header with Proper Typography & Semantic Weight */}
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-snug tracking-wide font-cinzel">
          Explore Our Traditional Tanjore Arts &amp; Masterpieces
        </h2>

        {/* Tooltip + CTA Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
          {/* Animated Tooltip with Accessible Wrapper */}
          <div
            className="flex justify-center items-center py-2"
            role="region"
            aria-label="Portraits of Tanjore art collectors and master artisans"
          >
            <AnimatedTooltip items={people} />
          </div>

          {/* High-Converting Luxury CTA Button */}
          <Button
            href="/collections"
            color="none"
            aria-label="Explore the Aishwarya Arts Tanjore painting collections catalog"
            className="group relative px-8 py-4 bg-zinc-900 overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(184,134,11,0.25)] active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
          >
            {/* Rich Gold Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] opacity-95 group-hover:opacity-100 transition-opacity" />

            {/* Shimmer Light Flare Animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/40 to-transparent" />

            <span className="relative flex items-center gap-3 text-zinc-950 font-bold text-base tracking-wide">
              Explore Collections
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TooltipWithCTA;