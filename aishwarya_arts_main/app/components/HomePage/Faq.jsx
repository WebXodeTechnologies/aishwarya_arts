"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the return policy for Tanjore paintings?",
      answer:
        "You can return paintings within 15 days of delivery if there is any transit damage or description discrepancy.",
    },
    {
      question: "Do you provide custom Tanjore paintings?",
      answer:
        "Yes, we create bespoke Tanjore paintings as per your exact specifications, dimensions, and temple or home decor requirements.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 2-3 weeks depending on your location across India, ensuring careful custom packaging.",
    },
    {
      question: "Are the gold foils used in paintings authentic?",
      answer:
        "We use certified 22K gold foils in our traditional Tanjore paintings to maintain absolute cultural authenticity and lifelong brilliance.",
    },
    {
      question: "Can I visit the studio in person?",
      answer:
        "Yes, we warmly welcome art lovers and collectors by appointment to see our master craftsmanship and select artworks directly.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we primarily ship within India. International shipping can be arranged with prior consultation and custom export handling.",
    },
    {
      question: "How can I place a bulk order?",
      answer:
        "For bulk orders and corporate gifting, please contact us via email or phone for customized pricing and delivery schedules.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept secure credit/debit cards, UPI, and net banking for all online purchases.",
    },
    {
      question: "Is framing included in the price?",
      answer:
        "Traditional teak wood framing is included. For premium customized frames, additional charges may apply based on selection.",
    },
  ];

  // FAQ Schema for Google Rich Snippets / White-hat SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section
      className="w-full max-w-5xl mx-auto py-24 px-4 md:px-8 lg:px-16 bg-white"
      aria-labelledby="faq-section-title"
    >
      {/* Injecting Schema for Google SEO Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
          <span className="h-px w-8 bg-amber-600" />
          <span className="text-amber-800 font-bold tracking-[0.25em] uppercase text-[10px] md:text-[11px]">
            Got Questions?
          </span>
          <span className="h-px w-8 bg-amber-600" />
        </div>

        <h2
          id="faq-section-title"
          className="text-3xl md:text-5xl font-bold text-zinc-900 font-cinzel tracking-wide"
        >
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-zinc-700 max-w-xl mx-auto text-base font-medium">
          Find clear answers regarding our authentic 22K gold Tanjore paintings, custom orders, delivery, and care.
        </p>
      </header>

      <div className="space-y-6">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-zinc-200/80 rounded-2xl shadow-xs hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 md:py-6 text-left focus:outline-hidden focus:ring-2 focus:ring-amber-600 cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg md:text-xl font-bold text-zinc-900 font-cinzel pr-4">
                  {faq.question}
                </h3>
                <span className="ml-4 text-xl text-amber-700 shrink-0" aria-hidden="true">
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-6 md:pb-8 text-zinc-700 text-base md:text-lg leading-relaxed font-medium border-t border-zinc-100 pt-4"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;