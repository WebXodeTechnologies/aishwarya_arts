"use client";
import React from "react";
import AnimatedTooltip from "./ui/animated-tooltip";
import { people } from "./index.js";

const TooltipWithCTA = () => {
  return (
    <section
      className="max-w-4xl mx-auto py-20 px-4 flex flex-col items-center gap-12 text-center"
      aria-label="Showcase of Tanjore art enthusiasts"
    >
      {/* Headline */}
      <h1
        className="text-4xl md:text-5xl font-bold text-gray-900 leading-relaxed tracking-wider font-cinzel animate-pulse"
        data-sb-field-path="heading"
      >
        Explore Our Traditional Tanjore Arts
      </h1>

      {/* Tooltip + CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Animated Tooltip */}
        <div className="flex justify-center" aria-label="Art enthusiasts avatars">
          <AnimatedTooltip items={people} />
        </div>

        {/* CTA Button */}
        <a
          href="/shop"
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-lg shadow-emerald-400/50 transition-transform transform hover:scale-105 hover:shadow-emerald-500/70 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          role="button"
          aria-label="Explore Tanjore art collections"
        >
          Explore Collections
        </a>
      </div>
    </section>
  );
};

export default TooltipWithCTA;
