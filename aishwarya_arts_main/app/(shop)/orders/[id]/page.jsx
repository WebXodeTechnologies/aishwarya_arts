import React from "react";
import OrderDetailClient from "./OrderDetailClient";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const orderId = resolvedParams?.id || "Details";

  return {
    metadataBase: new URL("https://www.aishwaryaarts.com"),
    title: `Order Details #${orderId.slice(-8).toUpperCase()} | Aishwarya Arts`,
    description: "View tracking status, shipping details, and tax invoice for your Aishwarya Arts art acquisition.",
    robots: {
      index: false, // Prevents sensitive user order pages from being indexed by search bots
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: `/orders/${orderId}`,
    },
  };
}

export default async function OrderDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const orderSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Order Tracking Details | Aishwarya Arts",
    "url": `https://www.aishwaryaarts.com/orders/${id}`,
    "description": "Secure customer order and tax invoice management screen.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orderSchema) }}
      />
      <OrderDetailClient orderId={id} />
    </>
  );
}