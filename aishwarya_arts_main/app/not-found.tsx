"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-16 font-outfit"
      role="main"
      aria-labelledby="not-found-heading"
    >
      {/* Animated Floating Illustration */}
      <motion.figure
        className="w-56 sm:w-64 h-auto mb-6"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 3, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <Image
          src="/assets/notfound/undraw_air-support.svg"
          alt=""
          width={250}
          height={250}
          priority
          className="w-full h-auto object-contain"
        />
      </motion.figure>

      {/* Brand Subtitle */}
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900 mb-5">
        Aishwarya Arts Gallery
      </span>

      {/* Heading */}
      <h1
        id="not-found-heading"
        className="text-4xl sm:text-4xl md:text-5xl font-bold text-zinc-900 font-cinzel text-center tracking-tight"
      >
        404 — Masterpiece Not Found
      </h1>

      {/* Description */}
      <p className="mt-4 text-zinc-700 text-center max-w-sm text-sm sm:text-base font-medium leading-relaxed">
        The traditional art page or exhibition link you are looking for does not exist or has been relocated.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/"
          aria-label="Return to Aishwarya Arts homepage"
          className="px-8 py-4 bg-zinc-900 hover:bg-amber-950 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-2xl shadow-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-800 text-center"
        >
          Return Home
        </Link>
        <Link
          href="/collections"
          aria-label="Explore art collections"
          className="px-8 py-4 border-2 border-zinc-300 hover:border-amber-900 text-zinc-800 font-bold uppercase text-xs tracking-[0.2em] rounded-2xl transition-all hover:bg-zinc-50 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 text-center"
        >
          Explore Collections
        </Link>
      </div>
    </main>
  );
}