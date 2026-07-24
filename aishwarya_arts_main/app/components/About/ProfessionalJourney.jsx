"use client";

import React from "react";
import Image from "next/image";
import Img1 from "../../../public/assets/about/final_founder.png";

export default function ProfessionalJourney() {
  return (
    <section
      className="w-full max-w-7xl mx-auto py-24 px-6 md:px-10 grid md:grid-cols-2 gap-16 md:gap-20 items-center bg-white"
      aria-labelledby="professional-journey-title"
    >
      {/* Left: Founder Image Stage */}
      <figure className="relative group order-2 md:order-1 w-full">
        <div className="relative w-full h-100 sm:h-120 lg:h-135 rounded-3xl overflow-hidden shadow-xl border border-zinc-100 bg-zinc-50 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(184,134,11,0.15)]">
          <Image
            src={Img1}
            alt="Portrait of Periyanayagi Devenderan D., founder of Aishwarya Arts Gallery"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
        </div>
        <figcaption className="sr-only">
          Periyanayagi Devenderan D. — Founder and Master Patron of Aishwarya Art Gallery
        </figcaption>
      </figure>

      {/* Right: SEO Rich Narrative Content */}
      <article className="order-1 md:order-2 text-center md:text-left flex flex-col items-center md:items-start">
        {/* Sub-category Pill / Tracker */}
        <div className="flex items-center gap-3 mb-4" aria-hidden="true">
          <span className="h-px w-8 bg-amber-600" />
          <span className="text-amber-800 font-bold tracking-[0.3em] uppercase text-[10px]">
            Founder&apos;s Legacy
          </span>
        </div>

        {/* Semantic H2 Heading */}
        <h2
          id="professional-journey-title"
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 tracking-wide leading-snug font-cinzel"
        >
          Our Professional Journey &amp; Heritage
        </h2>

        <p className="text-zinc-700 leading-relaxed mb-5 text-base md:text-lg font-medium">
          Founded by
          <strong className="font-bold text-zinc-900 ml-1.5 mr-1.5">Periyanayagi Devenderan D.</strong>,
          our gallery began as a dedicated creative studio committed to preserving the intricate temple legacy
          of authentic Tanjore art. From humble beginnings, her path evolved through decades of unwavering devotion,
          meticulous technique refinement, and a relentless passion for artistic excellence.
        </p>

        <p className="text-zinc-700 leading-relaxed text-base md:text-lg font-medium">
          Today, <strong className="font-semibold text-zinc-900">Aishwarya Arts</strong> stands as a benchmark of how traditional
          South Indian craftsmanship harmonizes with modern elegance — carrying the sacred cultural essence
          of 22K gold leaf Tanjore paintings into homes and shrines worldwide.
        </p>

        <div
          className="mt-8 w-24 h-1 bg-linear-to-r from-amber-600 to-yellow-500 rounded-full"
          role="presentation"
        />
      </article>
    </section>
  );
}