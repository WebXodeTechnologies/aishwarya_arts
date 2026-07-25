"use client";

import React, { useState } from "react";
import { sendEmail } from "@/app/actions/sendEmail";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success("Inquiry sent! We'll contact you soon.");
        event.target.reset();
      } else {
        toast.error("Error: " + (result.error || "Failed to send"));
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="contact-form-heading">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-start">

        {/* LEFT CONTENT / GALLERY INFO */}
        <div className="xl:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-800 italic block">
              Get in Touch With Us
            </span>
            <h2 id="contact-form-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel leading-tight">
              Connect With Our Studio
            </h2>
            <p className="text-zinc-700 text-base md:text-lg leading-relaxed font-medium pt-2">
              From traditional Tanjore paintings to personalized art commissions, our studio creates timeless pieces that last generations.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-zinc-900 font-cinzel">Aishwarya Arts</h3>
              <p className="text-lg font-bold text-amber-800">Tanjore Art Gallery</p>
            </div>

            <address className="not-italic space-y-2 text-zinc-700 text-sm md:text-base font-medium">
              <p>3/648, Thuraiyur Road, N. Kosavampatti, Namakkal, Tamil Nadu - 637002</p>
              <p>
                Phone: <a href="tel:+919655007661" className="text-zinc-900 font-bold hover:text-amber-800 underline underline-offset-4">+91 9655007661</a>
              </p>
              <p>
                Email: <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-zinc-900 font-bold hover:text-amber-800 underline underline-offset-4">contact.aishwaryaarts@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="xl:col-span-7 bg-zinc-50/50 backdrop-blur-lg border border-zinc-200 shadow-xl rounded-3xl p-6 sm:p-10 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 font-cinzel">
            Send us a message
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
                First Name <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="border border-zinc-300 bg-white p-4 rounded-xl text-base w-full focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none transition-all shadow-xs"
                placeholder="John"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="border border-zinc-300 bg-white p-4 rounded-xl text-base w-full focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none transition-all shadow-xs"
                placeholder="Doe"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="phone" className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Phone Number <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="border border-zinc-300 bg-white p-4 rounded-xl text-base w-full focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none transition-all shadow-xs"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="email" className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Email Address <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border border-zinc-300 bg-white p-4 rounded-xl text-base w-full focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none transition-all shadow-xs"
                placeholder="example@email.com"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="message" className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Message <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="border border-zinc-300 bg-white p-4 rounded-xl text-base w-full focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none transition-all shadow-xs resize-y"
                rows="4"
                placeholder="Write your inquiry or custom painting requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-label={loading ? "Sending your message..." : "Submit contact inquiry"}
              className="bg-zinc-900 text-white py-4 px-10 rounded-2xl md:col-span-2 font-bold uppercase text-xs md:text-sm tracking-[0.2em] shadow-xl hover:bg-amber-950 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} aria-hidden="true" /> Sending Message...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}