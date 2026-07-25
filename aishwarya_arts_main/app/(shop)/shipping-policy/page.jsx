import React from "react";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Shipping & Delivery Policy | Aishwarya Arts Namakkal",
  description: "Read Aishwarya Arts' shipping and delivery policy. Learn about our secure wooden crating packaging, domestic and international shipping times, and tracking details.",
  keywords: [
    "Aishwarya Arts Shipping Policy",
    "Secure Art Delivery",
    "Wooden Crating Tanjore Paintings",
    "International Art Freight Namakkal"
  ],
  alternates: {
    canonical: "/shipping-policy",
  },
  openGraph: {
    title: "Shipping & Delivery Policy | Aishwarya Arts Namakkal",
    description: "Learn about our specialized wooden crating, insured transit, and global delivery timelines for authentic Thanjavur art.",
    url: "https://www.aishwaryaarts.com/shipping-policy",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Shipping and Delivery Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Delivery Policy | Aishwarya Arts",
    description: "Review our shipping policies for secure domestic and global art deliveries.",
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

export default function ShippingPolicyPage() {
  const shippingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Shipping & Delivery Policy | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/shipping-policy",
    "description": "Shipping and delivery guidelines for Aishwarya Arts art gallery.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingSchema) }}
      />

      <main className="min-h-screen bg-white font-outfit py-16 md:py-24 text-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="h-px w-8 bg-amber-900" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-900 font-bold italic">
                Secure Logistics &amp; Care
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
              Shipping &amp; Delivery Policy
            </h1>

            <p className="text-xs sm:text-sm font-bold text-zinc-600 uppercase tracking-widest">
              Last Updated: June 2026
            </p>
          </header>

          <article className="prose prose-zinc prose-lg max-w-none space-y-8 text-base md:text-lg leading-relaxed text-zinc-800 font-medium [&>section>h2]:font-cinzel [&>section>h2]:text-zinc-900 [&>section>h2]:text-2xl [&>section>h2]:font-bold">

            <section className="space-y-3">
              <h2>1. Packaging &amp; Preservation</h2>
              <p>
                Tanjore paintings are delicate masterpieces adorned with 22ct gold leaf and precious stones. To guarantee safe transit, all paintings are wrapped in multiple protective layers of shock-absorbing foam and bubblewrap, then sealed inside custom-made, heavy-duty wooden crates. This packaging ensures the artwork is immune to pressure and moisture during shipment.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. Dispatch &amp; Lead Times</h2>
              <p>
                For standard catalog paintings in stock, items are dispatched within <strong>2 to 4 business days</strong>. For custom or commissioned paintings (made-to-order), please allow <strong>2 to 4 weeks</strong> for the master artists to sketch, embellish, and frame your customized piece. We provide progress updates with photos and videos before final dispatch.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Domestic Shipping (India)</h2>
              <p>
                We provide free insured shipping across India. We partner with premier logistics providers like BlueDart, FedEx, and Delhivery to ensure your shipment arrives securely. Delivery generally takes <strong>3 to 7 business days</strong> post dispatch, depending on the destination city.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. International Shipping</h2>
              <p>
                We offer secure global shipping to the US, UK, Canada, UAE, Singapore, Australia, and other global destinations. International shipping charges are calculated at checkout based on crate dimensions and destination weight. Any custom duties, import taxes, or local clearance fees levied by the destination country remain the responsibility of the recipient.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Shipment Tracking</h2>
              <p>
                Once your shipment is handed over to our courier partner, we will email your tracking ID and secure link immediately. You can monitor your shipment&apos;s journey in real-time. For support regarding delivery schedules, you can contact us at{" "}
                <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-amber-900 font-bold hover:underline underline-offset-4">
                  contact.aishwaryaarts@gmail.com
                </a>.
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