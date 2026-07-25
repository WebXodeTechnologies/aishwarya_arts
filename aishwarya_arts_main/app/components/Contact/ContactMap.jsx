"use client";

import React from "react";

export default function ContactMap() {
  return (
    <section className="py-12 md:py-16 bg-white" aria-labelledby="map-section-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 id="map-section-heading" className="sr-only">
          Aishwarya Arts Gallery Location Map
        </h2>

        <div className="relative w-full h-112.5 md:h-125 rounded-[2.5rem] overflow-hidden border border-zinc-200 shadow-xl bg-zinc-50 touch-pan-y">
          <iframe
            src="https://www.google.com/maps?q=11.218361159525347,78.1802223493099&z=16&output=embed"
            title="Aishwarya Arts Gallery Location Map in Namakkal, Tamil Nadu"
            className="w-full h-full border-0 pointer-events-auto"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}