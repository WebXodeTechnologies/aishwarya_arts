import React from "react";
import CartClient from "./CartClient";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Shopping Cart | Aishwarya Arts Heritage Gallery",
  description: "Review your selected handcrafted Tanjore paintings and custom art masterpieces before secure checkout.",
  robots: {
    index: false, // Prevents private user shopping carts from index bloat
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  const cartSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Shopping Cart | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/cart",
    "description": "Customer shopping cart review and secure checkout gateway.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cartSchema) }}
      />
      <CartClient />
    </>
  );
}