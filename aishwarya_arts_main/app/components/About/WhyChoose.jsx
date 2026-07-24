"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const reasons = [
  {
    title: "Timeless Tradition",
    description:
      "Every Tanjore painting is created using age-old temple techniques passed down through generations, preserving the spiritual soul of South Indian art.",
  },
  {
    title: "Masterful Artisanship",
    description:
      "Our artisans, guided by master craftsman Devandran, blend precision, devotion, and decades of experience into every single brushstroke.",
  },
  {
    title: "Sacred Authenticity",
    description:
      "We use genuine 22K gold foil, natural mineral pigments, and traditional tools to ensure every artwork radiates divine brilliance and purity.",
  },
  {
    title: "Custom & Devotional Works",
    description:
      "From personalized deity portraits to grand temple commissions, we bring your spiritual vision to life with reverence and absolute detail.",
  },
  {
    title: "Enduring Quality",
    description:
      "Each masterpiece is crafted to last for generations, using archival, water-resistant materials that preserve color, texture, and radiance over time.",
  },
  {
    title: "Trusted Legacy",
    description:
      "With years of dedicated craftsmanship in Tanjore artistry, Aishwarya Arts has earned the trust of collectors, devotees, and art lovers across India.",
  },
];

export default function WhyChoose() {
  return (
    <section
      className="w-full max-w-7xl mx-auto py-24 px-6 md:px-10 bg-white"
      aria-labelledby="why-choose-heading"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        {/* Small Decorative Sub-heading */}
        <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
          <span className="h-px w-8 bg-amber-600" />
          <span className="text-amber-800 font-bold tracking-[0.25em] uppercase text-[10px] md:text-[11px]">
            The Aishwarya Difference
          </span>
          <span className="h-px w-8 bg-amber-600" />
        </div>

        {/* Semantic H2 Heading */}
        <h2
          id="why-choose-heading"
          className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight font-cinzel tracking-wide"
        >
          What Makes <span className="text-amber-800">Us Unique</span> for Authentic Tanjore Paintings
        </h2>

        <p className="mt-4 text-zinc-700 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Discover why art collectors and connoisseurs trust Aishwarya Arts for genuine 22K gold foil masterpieces.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, idx) => (
          <article
            key={idx}
            className="bg-zinc-50/50 border border-zinc-100 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-500 p-8 text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-amber-600 w-6 h-6 shrink-0" aria-hidden="true" />
                <h3 className="text-xl font-bold text-zinc-900 font-cinzel">
                  {reason.title}
                </h3>
              </div>
              <p className="text-zinc-700 text-sm md:text-base leading-relaxed font-medium">
                {reason.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}