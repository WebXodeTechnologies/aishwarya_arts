"use client";

import { CheckCircle } from "lucide-react";

const reasons = [
  {
    title: "Timeless Tradition",
    description:
      "Every Tanjore painting is created using age-old techniques passed down through generations, preserving the soul of South Indian art.",
  },
  {
    title: "Masterful Artisanship",
    description:
      "Our artists, guided by master craftsman Devandran, blend precision, devotion, and years of experience into every brushstroke.",
  },
  {
    title: "Sacred Authenticity",
    description:
      "We use genuine gold foil, natural pigments, and traditional tools to ensure every piece radiates divine brilliance and purity.",
  },
  {
    title: "Custom & Devotional Works",
    description:
      "From personalized deity portraits to grand temple commissions, we bring your spiritual vision to life with reverence and detail.",
  },
  {
    title: "Enduring Quality",
    description:
      "Each artwork is crafted to last for generations, with archival materials that preserve color, texture, and radiance over time.",
  },
  {
    title: "Trusted Legacy",
    description:
      "With years of dedication in Tanjore artistry, Aishwarya Arts has earned the trust of collectors, devotees, and art lovers across India.",
  },
];


export default function WhyChoose() {
  return (
    <section
      className="max-w-7xl mx-auto py-20  text-gray-800"
      aria-labelledby="why-choose-heading"
    >
      <div className="px-6 text-center">
        <h2
          id="why-choose-heading"
          className="text-4xl font-bold mb-5 text-black leading-snug tracking-wider"
        >
          What Makes <span className="text-yellow-700"> Us Unique</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-left"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="text-yellow-600 w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">{reason.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden heading for SEO */}
      <h2 className="sr-only">
        Reasons why Aishwarya Arts is trusted for authentic Tanjore paintings
      </h2>
    </section>
  );
}
