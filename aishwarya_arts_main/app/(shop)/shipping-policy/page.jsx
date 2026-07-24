import React from "react";

export const metadata = {
  title: "Shipping & Delivery Policy | Aishwarya Arts",
  description: "Read Aishwarya Arts' shipping and delivery policy. Learn about our secure wooden crating packaging, domestic and international shipping times, and tracking details.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-outfit py-16 md:py-24 text-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="h-px w-8 bg-amber-600" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
              Secure Delivery
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
            Shipping & Delivery Policy
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Last Updated: January 2026
          </p>
        </header>

        <main className="prose prose-zinc max-w-none space-y-8 text-base md:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">1. Packaging & Preservation</h2>
            <p>
              Tanjore paintings are delicate masterpieces adorned with 22ct gold leaf and precious stones. 
              To guarantee safe transit, all paintings are wrapped in multiple protective layers of foam and bubblewrap, 
              then sealed inside custom-made, heavy-duty wooden crates. This packaging ensures the artwork is immune 
              to pressure and moisture during shipment.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">2. Dispatch & Lead Times</h2>
            <p>
              For standard catalog paintings in stock, items are dispatched within <strong>2 to 4 business days</strong>. 
              For custom or commissioned paintings (made-to-order), please allow <strong>2 to 4 weeks</strong> for the master 
              artists to sketch, embellish, and frame your customized piece. We will provide updates with photos/videos before dispatch.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">3. Domestic Shipping (India)</h2>
            <p>
              We provide free insured shipping across India. We partner with premier logistics providers like 
              BlueDart, FedEx, and Delhivery to ensure your shipment arrives securely. Delivery generally takes 
              <strong>3 to 7 business days</strong> post dispatch, depending on the destination city.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">4. International Shipping</h2>
            <p>
              We offer secure global shipping to the US, UK, Canada, UAE, Singapore, Australia, and other countries. 
              International shipping charges are calculated at checkout based on crate size and destination weight. 
              Any custom duties, import taxes, or local clearances levied by the destination country are the responsibility of the recipient.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">5. Shipment Tracking</h2>
            <p>
              Once your shipment is handed over to the courier partner, we will email your tracking ID and link immediately. 
              You can monitor your shipment's journey in real-time. For custom support regarding delivery schedules, you can contact 
              us at <a href="mailto:contact.aishwaryaarts@gmail.com" className="text-amber-700 hover:underline">contact.aishwaryaarts@gmail.com</a>.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
