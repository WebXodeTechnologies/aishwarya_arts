"use client";
import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

const Testimonial = () => {
  const testimonials = [
    {
      quote:
        "Aishwarya Arts brings tradition alive! Their Tanjore paintings are breathtaking and steeped in culture.",
      name: "Arul Raj",
      designation: "Tanjore Art Enthusiast",
      src: "/assets/testimonials/img1.webp",
    },
    {
      quote:
        "Each painting feels like it tells a story of heritage. Truly a collector’s dream.",
      name: "Priya Selvan",
      designation: "Collector of Tanjore Paintings",
      src: "/assets/testimonials/img2.webp",
    },
    {
      quote:
        "The intricate details and gold leaf work are unmatched. I’m a lifelong fan!",
      name: "Karthik Subramanian",
      designation: "Art Lover from Chennai",
      src: "/assets/testimonials/img3.webp",
    },
    {
      quote:
        "Aishwarya Arts’ pieces are a perfect blend of tradition and modern elegance.",
      name: "Anitha Ramachandran",
      designation: "Fan of Traditional Art",
      src: "/assets/testimonials/img4.webp",
    },
    {
      quote:
        "Their craftsmanship elevates any space. The attention to detail is incredible.",
      name: "Vignesh Kumar",
      designation: "Patron of Indian Handicrafts",
      src: "/assets/testimonials/img5.webp",
    },
    {
      quote:
        "I love how every painting feels alive. South Indian art at its finest!",
      name: "Divya Reddy",
      designation: "Lover of South Indian Art",
      src: "/assets/testimonials/img6.webp",
    },
  ];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonial-heading"
      className="max-w-7xl mx-auto py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2
          id="testimonial-heading"
          className="text-4xl md:text-4xl font-bold text-black"
        >
          What Our Patrons Say
        </h2>
        <p className="mt-4 text-black max-w-2xl mx-auto text-2xl">
          Hear from those who’ve experienced the artistry and devotion behind
          every Aishwarya Arts Tanjore painting.
        </p>
      </div>

      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
    </section>
  );
};

export default Testimonial;
