import React from "react";

export const metadata = {
  title: "Terms & Conditions | Aishwarya Arts",
  description: "Read the terms and conditions for purchasing traditional Tanjore paintings and custom artworks from Aishwarya Arts.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-outfit py-16 md:py-24 text-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="h-px w-8 bg-amber-600" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
              Legal Agreement
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
            Terms & Conditions
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Last Updated: January 2026
          </p>
        </header>

        <main className="prose prose-zinc max-w-none space-y-8 text-base md:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">1. Introduction</h2>
            <p>
              Welcome to <strong>Aishwarya Arts</strong>. These Terms & Conditions govern your use of our website
              and the purchase of our traditional Tanjore paintings. By accessing or using our website, you agree
              to be bound by these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">2. Art Authenticity & Variation</h2>
            <p>
              Every artwork listed is painstakingly handcrafted by master artisans using 22K gold foil and semi-precious stones.
              Because each piece is handmade, slight variations in design, details, and color may occur. These variations
              are a hallmark of authentic, artisanal creations and are not considered defects.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">3. Orders & Customizations</h2>
            <p>
              Customized orders require detailed specifications provided via our checkout or direct contact.
              Once a custom order is placed and work begins, it cannot be cancelled or modified. Lead times
              for creation vary and will be communicated upon order confirmation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">4. Pricing & Payments</h2>
            <p>
              All prices are listed in Indian Rupees (INR). We accept various online payment options including UPI,
              credit/debit cards, and net banking. Orders will only be processed once payment confirmation is received.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">5. Intellectual Property</h2>
            <p>
              All content on this website, including images of paintings, logo, text, and layout, is the intellectual property
              of Aishwarya Arts and is protected by copyright laws. You may not copy, distribute, or display any artwork
              images without prior written permission.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
