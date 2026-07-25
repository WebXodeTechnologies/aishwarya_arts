import React from "react";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Customer Login & Account Access | Aishwarya Arts",
  description: "Log in to your Aishwarya Arts customer account to securely track handcrafted Tanjore painting orders, manage your wishlist, and check purchase history.",
  keywords: [
    "Aishwarya Arts Login",
    "Customer Account Sign In",
    "Track Tanjore Painting Order",
    "Aishwarya Arts Portal"
  ],
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Customer Login | Aishwarya Arts Namakkal",
    description: "Access your Aishwarya Arts account to manage orders, wishlist items, and custom art inquiries.",
    url: "https://www.aishwaryaarts.com/login",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Customer Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Login | Aishwarya Arts",
    description: "Sign in to your account to view order statuses and saved masterpieces.",
    images: ["/logo.png"],
  },
  robots: {
    index: false, // Recommended for secure login/account pages to prevent indexing sensitive portals
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LoginLayout({ children }) {
  // WebPage Structured Data Schema for Search Engines
  const loginSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Customer Login | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/login",
    "description": "Secure customer authentication portal for Aishwarya Arts art gallery.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loginSchema) }}
      />
      {children}
    </>
  );
}