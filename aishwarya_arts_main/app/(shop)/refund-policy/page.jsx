import React from "react";

export const metadata = {
  title: "Refund & Return Policy | Aishwarya Arts",
  description: "Review Aishwarya Arts' policy on returns, refunds, and replacements for our handcrafted Tanjore paintings.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-outfit py-16 md:py-24 text-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="h-px w-8 bg-amber-600" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
              Return Protection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
            Refund & Return Policy
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Last Updated: January 2026
          </p>
        </header>

        <main className="prose prose-zinc max-w-none space-y-8 text-base md:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">1. Return Eligibility</h2>
            <p>
              We want you to be entirely satisfied with your Tanjore masterpiece. You are eligible to request a return or replacement
              within <strong>15 days</strong> of delivery if the artwork arrives damaged or is different from the model ordered.
              To complete your return, the item must be unused, in the same condition that you received it, and in its original packaging.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">2. Commissioned & Custom Artworks</h2>
            <p>
              Customized Tanjore paintings made to order with bespoke subjects, sizing, or dedicated framing selections
              are <strong>not eligible for refunds or returns</strong>. We provide photo and video updates of the creation
              process before shipment to ensure the design meets your satisfaction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">3. Damage in Transit</h2>
            <p>
              We take extreme care in crating and packing our paintings to prevent damage. In the unlikely event that your painting
              is damaged during transit, please take clear photos/videos of the package *before and during* the opening process
              and contact us immediately at <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-amber-700 hover:underline">contact.aishwaryaarts@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">4. Processing Refunds</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
              If approved, your refund will be processed, and a credit will automatically be applied to your original method
              of payment within 5-7 business days.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
