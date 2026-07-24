"use client";
import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

const Testimonial = () => {
  const testimonials = [
    {
      quote:
        "Aishwarya Arts brings tradition alive! Their Tanjore paintings are breathtaking, authentic, and deeply steeped in rich culture.",
      name: "Arul Raj",
      designation: "Tanjore Art Enthusiast",
      src: "/assets/testimonials/img1.webp",
    },
    {
      quote:
        "Each painting feels like it tells a magnificent story of heritage. Truly a collector’s dream come true.",
      name: "Priya Selvan",
      designation: "Collector of Tanjore Paintings",
      src: "/assets/testimonials/img2.webp",
    },
    {
      quote:
        "The intricate gold leaf details and mineral pigments are completely unmatched. I’m a lifelong fan of their master craftsmen!",
      name: "Karthik Subramanian",
      designation: "Art Lover from Chennai",
      src: "/assets/testimonials/img3.webp",
    },
    {
      quote:
        "Aishwarya Arts’ masterpieces provide a flawless blend of traditional temple devotion and modern home elegance.",
      name: "Anitha Ramachandran",
      designation: "Fan of Traditional Art",
      src: "/assets/testimonials/img4.webp",
    },
    {
      quote:
        "Their handcrafted woodwork and gold foil detailing elevate any living space. The dedication to quality is extraordinary.",
      name: "Vignesh Kumar",
      designation: "Patron of Indian Handicrafts",
      src: "/assets/testimonials/img5.webp",
    },
    {
      quote:
        "I love how every single painting feels divine and alive. South Indian art and heritage at its absolute finest!",
      name: "Divya Reddy",
      designation: "Lover of South Indian Art",
      src: "/assets/testimonials/img6.webp",
    },
  ];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonial-heading"
      className="w-full max-w-7xl mx-auto py-24 px-6 md:px-16 bg-white"
    >
      <header className="max-w-3xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
          <span className="h-px w-8 bg-amber-600" />
          <span className="text-amber-800 font-bold tracking-[0.25em] uppercase text-[10px] md:text-[11px]">
            Patron Reviews
          </span>
          <span className="h-px w-8 bg-amber-600" />
        </div>

        <h2
          id="testimonial-heading"
          className="text-3xl md:text-5xl font-bold text-zinc-900 font-cinzel tracking-wide"
        >
          What Our Art Patrons Say
        </h2>

        <p className="mt-4 text-zinc-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
          Hear from collectors who have experienced the authentic craftsmanship, 22K gold leaf elegance, and devotion behind every Aishwarya Arts Tanjore painting.
        </p>
      </header>

      <div className="w-full">
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
};

export default Testimonial;