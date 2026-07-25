import React from "react";
import OrdersClient from "./OrdersClient";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "My Orders & Heritage Acquisitions | Aishwarya Arts",
  description: "View and track your traditional Tanjore painting orders, check shipment statuses, and access invoices securely.",
  robots: {
    index: false, // Prevents private user order history from index bloat
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/orders",
  },
};

export default function OrdersPage() {
  const ordersSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Order History | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/orders",
    "description": "Customer order history and tracking dashboard.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ordersSchema) }}
      />
      <OrdersClient />
    </>
  );
}