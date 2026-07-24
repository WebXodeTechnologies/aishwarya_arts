import React from "react";

export const metadata = {
  title: "Cancellation Policy | Aishwarya Arts",
  description: "Read the cancellation terms and conditions for orders, custom paintings, and bespoke commissions at Aishwarya Arts Tanjore Gallery.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-outfit py-16 md:py-24 text-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="h-px w-8 bg-amber-600" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
              Order Modifications
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
            Cancellation Policy
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Last Updated: January 2026
          </p>
        </header>

        <main className="prose prose-zinc max-w-none space-y-8 text-base md:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">1. Standard Order Cancellations</h2>
            <p>
              For standard Tanjore paintings ordered from our catalog that are already in stock, you can request a cancellation 
              within <strong>24 hours</strong> of placing the order. To request a cancellation, please email us immediately 
              at <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-amber-700 hover:underline">contact.aishwaryaarts@gmail.com</a> 
              with your Order ID.
            </p>
            <p>
              Once an order has been packed and handed over to our shipping courier partners, the order 
              <strong>cannot be cancelled</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">2. Commissioned & Custom Painting Orders</h2>
            <p>
              Bespoke commissions, custom sizes, personalized subjects, and specific frame customizations require immediate allocation 
              of art materials, sketching outlines, and direct labor from our master artists. Consequently, custom orders 
              <strong>cannot be cancelled or refunded</strong> once the booking deposit is paid or the order is confirmed and 
              work commences.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">3. Processing Refunds for Cancellations</h2>
            <p>
              If a cancellation is approved within the eligible 24-hour window, the full amount will be refunded to your original 
              payment method (UPI, credit/debit card, net banking). The credit typically reflects in your bank statement 
              within <strong>5 to 7 business days</strong>, depending on your banking institution.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
