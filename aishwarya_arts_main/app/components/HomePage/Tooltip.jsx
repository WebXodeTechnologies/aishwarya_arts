"use client";
import React from "react";
import AnimatedTooltip from "./ui/animated-tooltip";
import { people } from "./index.js";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

const TooltipWithCTA = () => {
  return (
    <section
      className="max-w-4xl mx-auto py-20 px-4 flex flex-col items-center gap-12 text-center"
      aria-label="Showcase of Tanjore art enthusiasts"
    >
      {/* Headline */}
      <h2
        className="text-4xl md:text-5xl font-bold text-gray-900 leading-relaxed tracking-wider font-cinzel"
        data-sb-field-path="heading"
      >
        Explore Our Traditional Tanjore Arts
      </h2>

      {/* Tooltip + CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Animated Tooltip */}
        <div
          className="flex justify-center"
          aria-label="Art enthusiasts avatars"
        >
          <AnimatedTooltip items={people} />
        </div>

        {/* CTA Button */}
        <Button
          href="/collections"
          color="none"
          className="group relative px-10 py-5 bg-zinc-900 overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(184,134,11,0.2)] active:scale-95"
        >
          {/* Subtle Shimmer Background */}
          <div className="absolute inset-0 bg-linear-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] opacity-90 group-hover:opacity-100 transition-opacity" />
          
          {/* Light Flare Animation */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/40 to-transparent" />

          <span className="relative flex items-center gap-3 text-black font-semibold  text-md">
            Explore Collections
          </span>
        </Button>
      </div>
    </section>
  );
};

export default TooltipWithCTA;
