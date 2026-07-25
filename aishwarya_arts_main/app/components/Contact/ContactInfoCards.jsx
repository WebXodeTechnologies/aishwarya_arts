"use client";

import { Mail, Phone, MapPin, Sparkles } from "lucide-react";

export default function ContactInfoCards() {
  const items = [
    {
      id: "email",
      icon: <Mail size={22} aria-hidden="true" />,
      title: "Digital Curators",
      value: "contact.aishwaryaarts@gmail.com",
      link: "mailto:contact.aishwaryaarts@gmail.com",
      label: "Inquiry",
      actionText: "Send Email"
    },
    {
      id: "phone",
      icon: <Phone size={22} aria-hidden="true" />,
      title: "Private Studio",
      value: "+91 75501 52764",
      secondary: "+91 96550 07661",
      link: "tel:+917550152764",
      label: "Direct Line",
      actionText: "Call Studio"
    },
    {
      id: "address",
      icon: <MapPin size={22} aria-hidden="true" />,
      title: "Heritage Gallery",
      value: "Namakkal, Tamil Nadu",
      subValue: "3/648, Thuraiyur Road, N. Kosavampatti, Namakkal",
      link: "https://maps.google.com/?q=Aishwarya+Arts+Namakkal",
      label: "Visit Us",
      actionText: "Get Directions"
    }
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white" aria-labelledby="contact-studio-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* --- PREMIUM AMBIENT GLOW (Optimized pointer-events-none) --- */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-200/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-amber-900 animate-pulse" aria-hidden="true" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-amber-900">
                Signature Studio
              </span>
            </div>
            <h2 id="contact-studio-heading" className="text-zinc-900 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight font-cinzel leading-[1.05]">
              Invite the <br />
              Divine to <span className="text-amber-800">your Walls</span>
            </h2>
          </div>
          <p className="text-zinc-700 text-base md:text-lg font-medium md:text-right max-w-sm leading-relaxed">
            Connect directly with the artisans preserving India’s golden heritage. We are here to help you choose your next masterpiece.
          </p>
        </div>

        {/* --- LUXURY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="region" aria-label="Studio contact channels">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between bg-zinc-50/50 border border-zinc-200/80 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(217,119,6,0.1)]"
            >
              {/* HOVER GLOW LAYER */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="w-14 h-14 bg-amber-950 rounded-2xl flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-300 bg-amber-50 px-3.5 py-1.5 rounded-full shadow-2xs">
                    {item.label}
                  </span>
                </div>

                <h3 className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-3">
                  {item.title}
                </h3>

                <div className="space-y-1.5">
                  <p className="text-zinc-900 text-lg md:text-xl font-bold tracking-tight leading-snug group-hover:text-amber-900 transition-colors wrap-break-word">
                    {item.value}
                  </p>
                  {item.secondary && (
                    <p className="text-zinc-900 text-lg md:text-xl font-bold tracking-tight">
                      {item.secondary}
                    </p>
                  )}
                  {item.subValue && (
                    <p className="text-zinc-700 text-sm font-medium tracking-tight pt-1 leading-relaxed">
                      {item.subValue}
                    </p>
                  )}
                </div>
              </div>

              {/* --- ACTION BAR --- */}
              <div className="mt-12 flex items-center gap-3 relative z-10">
                <a
                  href={item.link}
                  aria-label={`${item.actionText} for ${item.title}`}
                  className="flex-1 bg-zinc-900 text-white text-xs font-bold uppercase tracking-[0.2em] py-4 px-6 rounded-2xl text-center shadow-md hover:bg-amber-900 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all duration-300"
                >
                  {item.actionText}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* --- DECORATIVE LINE --- */}
        <div className="mt-20 md:mt-24 flex items-center justify-center" aria-hidden="true">
          <div className="h-px w-20 sm:w-28 bg-linear-to-r from-transparent to-amber-300" />
          <div className="px-4 text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-[0.4em] whitespace-nowrap">
            Authentic Tanjore
          </div>
          <div className="h-px w-20 sm:w-28 bg-linear-to-l from-transparent to-amber-300" />
        </div>

      </div>
    </section>
  );
}