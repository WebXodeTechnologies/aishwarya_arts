import React from "react";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Refund & Return Policy | Aishwarya Arts Namakkal",
  description: "Review Aishwarya Arts' policy on returns, refunds, transit damage replacements, and custom art commissions for handcrafted Tanjore paintings.",
  keywords: [
    "Aishwarya Arts Refund Policy",
    "Return Policy Tanjore Paintings",
    "Transit Damage Replacement",
    "Namakkal Art Gallery Returns"
  ],
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: "Refund & Return Policy | Aishwarya Arts Namakkal",
    description: "Read our return guidelines and transit damage replacement terms for authentic handmade gold foil Tanjore paintings.",
    url: "https://www.aishwaryaarts.com/refund-policy",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Refund and Return Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund & Return Policy | Aishwarya Arts",
    description: "Review our policies regarding returns and replacements for traditional Thanjavur art pieces.",
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

export default function RefundPolicyPage() {
  const refundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Refund & Return Policy | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/refund-policy",
    "description": "Return and refund guidelines for Aishwarya Arts art gallery.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(refundSchema) }}
      />

      <main className="min-h-screen bg-white font-outfit py-16 md:py-24 text-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="h-px w-8 bg-amber-900" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-900 font-bold italic">
                Return Protection &amp; Care
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
              Refund &amp; Return Policy
            </h1>

            <p className="text-xs sm:text-sm font-bold text-zinc-600 uppercase tracking-widest">
              Last Updated: June 2026
            </p>
          </header>

          <article className="prose prose-zinc prose-lg max-w-none space-y-8 text-base md:text-lg leading-relaxed text-zinc-800 font-medium [&>section>h2]:font-cinzel [&>section>h2]:text-zinc-900 [&>section>h2]:text-2xl [&>section>h2]:font-bold">

            <section className="space-y-3">
              <h2>1. Return Eligibility</h2>
              <p>
                We want you to be entirely satisfied with your Tanjore masterpiece. You are eligible to request a return or replacement within <strong>15 days</strong> of delivery if the artwork arrives structurally damaged or differs significantly from the model ordered. To complete your return, the item must be unused, in the same pristine condition that you received it, and housed within its original specialized packaging.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Commissioned &amp; Custom Artworks</h2>
              <p>
                Customized Tanjore paintings made to order with bespoke deity subjects, custom sizing, or specialized framing selections are <strong>not eligible for refunds or returns</strong>. We provide comprehensive photo and video updates of the creation and gold-embossing process prior to shipment to ensure the design completely meets your expectations.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Damage in Transit</h2>
              <p>
                We take extreme care in multi-layer crating and packing our paintings to prevent transit shocks. In the unlikely event that your painting is compromised during transport, please record a continuous unboxing video of the package <em>before and during</em> the opening process and contact our curators immediately at{" "}
                <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-amber-900 font-bold hover:underline underline-offset-4">
                  contact.aishwaryaarts@gmail.com
                </a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Processing Refunds</h2>
              <p>
                Once your return is received and inspected by our gallery team, we will notify you regarding the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5 to 7 business days.
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