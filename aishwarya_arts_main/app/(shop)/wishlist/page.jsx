import React from "react";
import WishlistClient from "./WishlistClient";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "My Wishlist & Saved Masterpieces | Aishwarya Arts",
  description: "View and manage your curated collection of favorite handcrafted Tanjore paintings and custom art pieces.",
  robots: {
    index: false, // Prevents private user wishlist pages from index bloat
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/wishlist",
  },
  openGraph: {
    title: "My Wishlist | Aishwarya Arts Namakkal",
    description: "Curated collection of your favorite traditional gold foil Tanjore paintings.",
    url: "https://www.aishwaryaarts.com/wishlist",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Customer Wishlist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Wishlist | Aishwarya Arts",
    description: "View your saved traditional artwork masterpieces.",
    images: ["/logo.png"],
  },
};

export default function WishlistPage() {
  const wishlistSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Customer Wishlist | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/wishlist",
    "description": "Saved favorite art pieces dashboard.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wishlistSchema) }}
      />
      <WishlistClient />
    </>
  );
}