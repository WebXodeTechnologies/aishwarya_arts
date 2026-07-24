"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Shipping = () => {
  const details = [
    {
      icon: "/assets/shipping/delivery.svg",
      title: "Secure Shipping Across India",
      desc: "Enjoy safe, insured, and fast doorstep delivery to every destination nationwide with Aishwarya Arts.",
      alt: "Secure delivery truck representing nationwide shipping for handmade art",
    },
    {
      icon: "/assets/shipping/offer.svg",
      title: "Exclusive Offers &amp; Heritage Deals",
      desc: "Discover special pricing and curated art deals on authentic traditional Tanjore paintings.",
      alt: "Discount tag symbol showing exclusive offers on Tanjore paintings",
    },
    {
      icon: "/assets/shipping/bestprice.svg",
      title: "Guaranteed Masterpiece Pricing",
      desc: "From temple classics to custom royal portraits, we ensure transparent pricing and certified quality.",
      alt: "Price tag symbol representing guaranteed best market value for artwork",
    },
  ];

  return (
    <section
      className="w-full max-w-7xl mx-auto py-20 px-6 md:px-16 bg-white"
      aria-labelledby="shipping-service-title"
    >
      <header className="flex justify-center items-center mb-16 px-4">
        <h2
          id="shipping-service-title"
          className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-center leading-tight text-zinc-900 font-cinzel"
        >
          <span className="inline-block">Secure Delivery</span>
          <span className="mx-3 text-amber-600" aria-hidden="true">|</span>
          <span className="inline-block">Exclusive Offers</span>
          <span className="mx-3 text-amber-600" aria-hidden="true">|</span>
          <span className="inline-block">Best Price Guarantee</span>
        </h2>
      </header>

      <div className="grid md:grid-cols-3 gap-12 text-center">
        {details.map((item, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 shadow-xs transition-transform duration-500 hover:scale-105"
          >
            <div className="mb-5 flex items-center justify-center mt-2 p-4 bg-white rounded-2xl shadow-xs border border-zinc-100">
              <Image
                src={item.icon}
                alt={item.alt}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="object-contain"
              />
            </div>

            <h3 className="font-bold text-zinc-900 text-lg md:text-xl mb-3 font-cinzel">
              {item.title}
            </h3>

            <p className="text-zinc-700 leading-relaxed text-sm md:text-base font-medium">
              {item.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Shipping;