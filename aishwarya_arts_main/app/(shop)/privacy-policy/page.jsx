import React from "react";

export const metadata = {
  title: "Privacy Policy | Aishwarya Arts",
  description: "Learn how Aishwarya Arts collects, uses, and protects your personal data when you visit our website or purchase traditional Tanjore paintings.",
  alternates: {
    canonical: "https://www.aishwaryaarts.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-outfit py-16 md:py-24 text-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12 border-b border-zinc-200 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="h-px w-8 bg-amber-600" />
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">
              Data Security
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-cinzel">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Last Updated: January 2026
          </p>
        </header>

        <main className="prose prose-zinc max-w-none space-y-8 text-base md:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you create an account, make a purchase,
              request custom art services, or contact us. This includes your name, email address, delivery address,
              phone number, and payment preferences.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">2. How We Use Your Information</h2>
            <p>
              Your information is used to process your orders, ship paintings safely to your location, communicate
              with you about delivery details, customize your commission pieces, and provide customer support. We do not
              sell or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">3. Security of Your Data</h2>
            <p>
              We prioritize the security of your personal data. We implement appropriate technical security measures
              to prevent unauthorized access, disclosure, modification, or deletion of your personal data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 font-cinzel">4. Cookies & Web Analytics</h2>
            <p>
              We use cookies to analyze web traffic and improve your browsing experience. You can choose to accept
              or decline cookies through your browser settings.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
