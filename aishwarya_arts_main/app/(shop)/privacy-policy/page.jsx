import React from "react";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Privacy Policy | Aishwarya Arts Namakkal",
  description: "Learn how Aishwarya Arts collects, uses, and protects your personal data when you visit our website, manage your account, or purchase traditional Tanjore paintings.",
  keywords: [
    "Aishwarya Arts Privacy Policy",
    "Data Protection Policy",
    "Customer Data Security",
    "Tanjore Art Gallery Privacy"
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Aishwarya Arts Namakkal",
    description: "Read how Aishwarya Arts protects your personal data and ensures secure transactions.",
    url: "https://www.aishwaryaarts.com/privacy-policy",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Aishwarya Arts",
    description: "Understand our data security practices for custom art commissions and online orders.",
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

export default function PrivacyPolicyPage() {
  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/privacy-policy",
    "description": "Privacy and data protection terms for Aishwarya Arts art gallery.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      <main className="min-h-screen bg-white font-outfit py-16 md:py-24 text-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="h-px w-8 bg-amber-900" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] text-amber-900 font-bold italic">
                Data Security &amp; Trust
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
              Privacy Policy
            </h1>

            <p className="text-xs sm:text-sm font-bold text-zinc-600 uppercase tracking-widest">
              Last Updated: June 2026
            </p>
          </header>

          <article className="prose prose-zinc prose-lg max-w-none space-y-8 text-base md:text-lg leading-relaxed text-zinc-800 font-medium [&>section>h2]:font-cinzel [&>section>h2]:text-zinc-900 [&>section>h2]:text-2xl [&>section>h2]:font-bold">

            <section className="space-y-3">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you create an account, make a purchase, request custom art services, or communicate with our curators. This includes your full name, email address, delivery address, primary phone number, and payment transaction references.
              </p>
            </section>

            <section className="space-y-3">
              <h2>2. How We Use Your Information</h2>
              <p>
                Your information is used strictly to process your orders, ship paintings safely to your location, communicate with you regarding delivery updates, customize your bespoke commission pieces, and provide dedicated customer support. We do not sell or trade your personal data to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2>3. Security of Your Data</h2>
              <p>
                We prioritize the security of your personal data through advanced encryption protocols and secure server environments. We implement appropriate technical security measures to prevent unauthorized access, disclosure, modification, or deletion of your records.
              </p>
            </section>

            <section className="space-y-3">
              <h2>4. Cookies &amp; Web Analytics</h2>
              <p>
                We utilize essential cookies to analyze web traffic, maintain your shopping session, and improve your browsing experience. You can choose to accept or decline cookies through your browser settings at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2>5. Contact Our Privacy Team</h2>
              <p>
                If you have questions regarding your data or this privacy policy, please reach out to us at{" "}
                <a href="mailto:support@aishwaryaarts.com" className="text-amber-900 font-bold hover:underline underline-offset-4">
                  support@aishwaryaarts.com
                </a>{" "}
                or visit our gallery in Namakkal, Tamil Nadu.
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