"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

export default function ContactAnimation() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-white py-24"
      aria-labelledby="contact-cta-heading"
    >
      {/* Decorative background accent with explicit CSS fallbacks */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-zinc-50 opacity-40 bg-center bg-cover pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <motion.h2
          id="contact-cta-heading"
          className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight tracking-wide font-cinzel"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Preserving the Legacy of{" "}
          <span className="text-amber-800">Tanjore Art</span> — Where Tradition Meets Modern Mastery
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-3xl mx-auto text-zinc-700 text-base md:text-lg leading-relaxed mb-10 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Aishwarya Arts is more than a gallery — it’s a living legacy of devotion, master craftsmanship, and South Indian heritage.
          Each masterpiece carries the grace of centuries-old tradition, fused with premium durability.
          Explore our divine collections or reach out for custom temple and home commissions.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full text-zinc-950 font-bold text-sm uppercase tracking-wider bg-linear-to-tr from-[#B8860B] via-[#FFD700] to-[#B8860B] shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
            aria-label="Contact Aishwarya Arts customer support and commission team"
          >
            Contact Our Studio
          </Link>
          <Link
            href="/collections"
            className="inline-block px-8 py-4 rounded-full border border-zinc-300 bg-white text-zinc-900 font-bold text-sm uppercase tracking-wider hover:bg-zinc-50 hover:border-amber-600 transition-colors duration-300 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
            aria-label="Explore the Aishwarya Arts Tanjore painting catalog"
          >
            Explore Collections
          </Link>
        </motion.div>

        {/* Contact Info Card Section */}
        <div className="mt-20 mb-8 px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full" aria-hidden="true" />

            {/* Section Header */}
            <header className="text-center mb-10 space-y-2">
              <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em]">
                Tailored Masterpieces
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 font-cinzel tracking-wide">
                Enquire Now For Custom Orders
              </h3>
            </header>

            {/* Embossed Card Container */}
            <div className="relative bg-[#fafafa] rounded-[2.5rem] p-1.5 md:p-2 border border-zinc-200/60 shadow-xs">
              <div className="bg-white rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-around gap-10 overflow-hidden shadow-sm">

                {/* Phone Section */}
                <a
                  href="tel:+917550152764"
                  aria-label="Call Aishwarya Arts direct line at +91 75501 52764"
                  className="group flex flex-col items-center gap-4 transition-all hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-amber-600 rounded-xl p-2"
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 shadow-xs flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <Phone size={22} aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Direct Studio Line
                    </span>
                    <span className="text-lg md:text-xl font-black text-zinc-900 tabular-nums">
                      +91 75501 52764
                    </span>
                  </div>
                </a>

                {/* Grand Divider */}
                <div className="hidden md:block h-16 w-px bg-zinc-200" aria-hidden="true" />

                {/* Email Section */}
                <a
                  href="mailto:contact.aishwaryaarts@gmail.com"
                  aria-label="Email Aishwarya Arts support team at contact.aishwaryaarts@gmail.com"
                  className="group flex flex-col items-center gap-4 transition-all hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-amber-600 rounded-xl p-2"
                >
                  <div className="w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 shadow-xs flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <Mail size={22} aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Customer Support
                    </span>
                    <span className="text-sm md:text-base font-bold text-zinc-900 lowercase">
                      contact.aishwaryaarts@gmail.com
                    </span>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}