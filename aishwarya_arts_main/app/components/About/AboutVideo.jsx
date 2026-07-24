"use client";

import React from "react";

export default function AboutVideo() {
  return (
    <section
      className="max-w-7xl mx-auto py-20 flex flex-col items-center text-center px-4"
      aria-labelledby="about-video-heading"
    >
      {/* Accessible & SEO-friendly heading */}
      <h2
        id="about-video-heading"
        className="text-3xl md:text-4xl font-semibold mb-4 text-black"
      >
        A Glimpse Into Our World
      </h2>

      {/* Descriptive paragraph for SEO */}
      <p className="text-black max-w-2xl mb-8 leading-relaxed">
        Step inside <strong>Aishwarya Art Gallery</strong> — where{" "}
        <em>traditional Tanjore art</em> meets modern digital craftsmanship. Our
        unique process blends centuries-old artistry with cutting-edge
        technology, preserving heritage while reaching contemporary audiences.
      </p>

      {/* Responsive, lazy-loaded video container */}
      <div
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg"
        itemScope
        itemType="https://schema.org/VideoObject"
      >
        <meta
          itemProp="name"
          content="About Aishwarya Art Gallery - Traditional Tanjore Art Process"
        />
        <meta
          itemProp="description"
          content="Discover how Aishwarya Art Gallery blends tradition and technology in creating exquisite Tanjore paintings."
        />
        <meta
          itemProp="thumbnailUrl"
          content="https://img.youtube.com/vi/twcD3Y5nTIw/maxresdefault.jpg"
        />
        <meta itemProp="uploadDate" content="2024-01-01" />
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/twcD3Y5nTIw?start=166&autoplay=1&mute=1&loop=1&playlist=twcD3Y5nTIw"
          title="About Aishwarya Art Gallery - Tanjore Painting Process"
          loading="lazy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
