import React from "react";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Terms & Conditions | Aishwarya Arts Namakkal",
  description: "Read the terms and conditions for purchasing traditional Tanjore paintings, custom artworks, and utilizing gallery services from Aishwarya Arts.",
  keywords: [
    "Aishwarya Arts Terms and Conditions",
    "Gallery Terms of Service",
    "Tanjore Painting Purchase Agreement",
    "Namakkal Art Gallery Policy"
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Aishwarya Arts Namakkal",
    description: "Read our terms of service governing the purchase of authentic handmade gold foil Tanjore paintings.",
    url: "https://www.aishwaryaarts.com/terms",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Aishwarya Arts",
    description: "Read our terms of service for purchasing traditional Thanjavur masterpieces.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function TermsPage() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms & Conditions | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/terms",
    "description": "Terms and conditions of service for Aishwarya Arts art gallery.",
    "publisher": {
      "@type": "Organization",
      "name": "Aishwarya Arts",
      "url": "https://www.aishwaryaarts.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />

      <main className="min-h-screen bg-white font-outfit py-16 md:py-24 text-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="h-px w-8 bg-amber-900" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-900 font-bold italic">
                Legal Agreement &amp; Policy
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
              Terms &amp; Conditions
            </h1>

            <p className="text-xs sm:text-sm font-bold text-zinc-600 uppercase tracking-widest">
              Last Updated: June 2026
            </p>
          </header>

          <article className="prose prose-zinc prose-lg max-w-none space-y-8 text-base md:text-lg leading-relaxed text-zinc-800 font-medium [&>section>h2]:font-cinzel [&>section>h2]:text-zinc-900 [&>section>h2]:text-2xl [&>section>h2]:font-bold">

            <section className="space-y-3">
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>Aishwarya Arts</strong>. These Terms &amp; Conditions govern your use of our website and the purchase of our traditional Tanjore paintings and bespoke masterclasses. By accessing or using our platform, you agree to be bound by these binding terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Art Authenticity &amp; Variations</h2>
              <p>
                Every artwork listed is painstakingly handcrafted by master artisans using authentic 22K gold foil and semi-precious stones. Because each piece is handmade, slight variations in design, details, and color may occur. These variations are the hallmark of genuine artisanal creations and are not considered defects.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Orders &amp; Customizations</h2>
              <p>
                Customized commissions require detailed specifications provided via our checkout or direct consultations. Once a custom order is confirmed and production begins, it cannot be cancelled or modified. Lead times for creation vary and will be communicated upon order confirmation.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Pricing &amp; Payments</h2>
              <p>
                All prices are listed in Indian Rupees (INR). We accept various secure online payment options including UPI, credit/debit cards, and net banking. Orders will only be processed once payment confirmation is successfully received.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Intellectual Property</h2>
              <p>
                All content on this website, including images of paintings, brand logos, text, and digital layouts, is the intellectual property of Aishwarya Arts and is protected by copyright laws. You may not copy, distribute, or display any artwork images without prior written permission.
              </p>
            </section>

          </article>

          <footer className="mt-16 pt-8 border-t border-zinc-200 flex justify-between items-center">
            <Link
              href="/"
              aria-label="Return to Aishwarya Arts homepage"
              className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-amber-900 transition-colors"
            >
              &larr; Back to Home
            </Link>
          </footer>

        </div>
      </main>
    </>
  );
}