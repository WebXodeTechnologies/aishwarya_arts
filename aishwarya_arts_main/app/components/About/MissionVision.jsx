"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Globe2, HeartHandshake } from "lucide-react";

export default function MissionVision() {
  const cards = [
    {
      id: 1,
      title: "Our Mission",
      icon: <Target aria-hidden="true" className="text-amber-600 w-12 h-12" />,
      text: "Preserving the sacred soul of traditional Thanjavur art through authentic 22K gold leaf masterpieces crafted for modern sanctuaries and homes.",
    },
    {
      id: 2,
      title: "Our Vision",
      icon: <Globe2 aria-hidden="true" className="text-amber-600 w-12 h-12" />,
      text: "To set the global gold standard in luxury traditional Indian decor, ensuring ancient Tanjore craftsmanship flourishes worldwide.",
    },
    {
      id: 3,
      title: "Our Commitment",
      icon: <HeartHandshake aria-hidden="true" className="text-amber-600 w-12 h-12" />,
      text: "Decades of master craftsmanship in every single stroke. We guarantee certified 22K gold foil, sacred precision, and heirloom longevity.",
    },
  ];

  return (
    <section
      className="w-full max-w-7xl mx-auto py-24 px-6 md:px-8 text-center bg-white"
      aria-labelledby="mission-vision-heading"
    >
      {/* Small Decorative Badge */}
      <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
        <span className="h-px w-8 bg-amber-600" />
        <span className="text-amber-800 font-bold tracking-[0.25em] uppercase text-[10px] md:text-[11px]">
          Core Values
        </span>
        <span className="h-px w-8 bg-amber-600" />
      </div>

      <h2
        id="mission-vision-heading"
        className="text-3xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-wide font-cinzel"
      >
        Our Mission, Vision &amp; Commitment
      </h2>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {cards.map((card, index) => (
          <motion.article
            key={card.id}
            className="bg-zinc-50/50 border border-zinc-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 p-8 md:p-10 flex flex-col items-center text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: "easeOut",
            }}
          >
            <div className="p-4 bg-white rounded-2xl shadow-xs border border-zinc-100 mb-6 group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-4 text-zinc-900 font-cinzel">
              {card.title}
            </h3>

            <p className="text-zinc-700 leading-relaxed text-sm md:text-base font-medium">
              {card.text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}