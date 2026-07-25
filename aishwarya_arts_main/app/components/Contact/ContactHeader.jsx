"use client";

import React from "react";

export default function ContactHeader() {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 my-16 md:my-24 text-center">
      <div className="space-y-4">
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-amber-800 italic block">
          Aishwarya Arts Support Gallery
        </span>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 font-cinzel">
          Get in Touch
        </h2>

        <p className="mt-4 text-base md:text-xl text-zinc-700 max-w-2xl mx-auto font-medium leading-relaxed">
          We&apos;re here to assist you with custom Tanjore paintings, 22K gold foil orders, gallery appointments, and custom sizing inquiries.
        </p>
      </div>

      <div className="mt-12 flex justify-center" aria-hidden="true">
        <div className="h-px w-24 bg-amber-600/30" />
      </div>
    </section>
  );
}