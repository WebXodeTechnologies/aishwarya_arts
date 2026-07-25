import React from "react";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Cancellation Policy | Aishwarya Arts Namakkal",
  description: "Read the cancellation terms and conditions for standard catalog orders, custom paintings, and bespoke art commissions at Aishwarya Arts Tanjore Gallery.",
  keywords: [
    "Aishwarya Arts Cancellation Policy",
    "Order Cancellation Tanjore Paintings",
    "Bespoke Commission Cancellation",
    "Namakkal Art Gallery Policy"
  ],
  alternates: {
    canonical: "/cancellation-policy",
  },
  openGraph: {
    title: "Cancellation Policy | Aishwarya Arts Namakkal",
    description: "Read our order cancellation terms and refund timelines for authentic handcrafted gold foil Tanjore paintings.",
    url: "https://www.aishwaryaarts.com/cancellation-policy",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Cancellation Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation Policy | Aishwarya Arts",
    description: "Review our order modification and cancellation guidelines for traditional art pieces.",
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

export default function CancellationPolicyPage() {
  const cancellationSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cancellation Policy | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/cancellation-policy",
    "description": "Order cancellation and modification guidelines for Aishwarya Arts art gallery.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cancellationSchema) }}
      />

      <main className="min-h-screen bg-white font-outfit py-16 md:py-24 text-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="h-px w-8 bg-amber-900" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-900 font-bold italic">
                Order Modifications &amp; Terms
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
              Cancellation Policy
            </h1>

            <p className="text-xs sm:text-sm font-bold text-zinc-600 uppercase tracking-widest">
              Last Updated: June 2026
            </p>
          </header>

          <article className="prose prose-zinc prose-lg max-w-none space-y-8 text-base md:text-lg leading-relaxed text-zinc-800 font-medium [&>section>h2]:font-cinzel [&>section>h2]:text-zinc-900 [&>section>h2]:text-2xl [&>section>h2]:font-bold">

            <section className="space-y-3">
              <h2>1. Standard Order Cancellations</h2>
              <p>
                For standard Tanjore paintings ordered from our catalog that are already in stock, you can request a cancellation within <strong>24 hours</strong> of placing the order. To request a cancellation, please email us immediately at{" "}
                <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-amber-900 font-bold hover:underline underline-offset-4">
                  contact.aishwaryaarts@gmail.com
                </a>{" "}
                with your official Order ID.
              </p>
              <p>
                Once an order has been packed and handed over to our shipping courier partners, the order <strong>cannot be cancelled</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Commissioned &amp; Custom Painting Orders</h2>
              <p>
                Bespoke commissions, custom sizes, personalized deity subjects, and specific frame customizations require immediate allocation of premium art materials, sketching outlines, and direct manual labor from our master artists. Consequently, custom orders <strong>cannot be cancelled or refunded</strong> once the booking deposit is paid or the order is confirmed and work commences.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Processing Refunds for Cancellations</h2>
              <p>
                If a cancellation is approved within the eligible 24-hour window, the full amount will be refunded to your original payment method (UPI, credit/debit card, or net banking). The credit typically reflects in your bank statement within <strong>5 to 7 business days</strong>, depending on your banking institution.
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