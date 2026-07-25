import React from "react";
import SignupClient from "./SignupClient";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Create Account & Register | Aishwarya Arts",
  description: "Register for an account on Aishwarya Arts to buy authentic handcrafted Tanjore paintings, save favorite items to your wishlist, and track your orders.",
  keywords: [
    "Aishwarya Arts Sign Up",
    "Create Account",
    "Register Art Gallery Account",
    "Buy Tanjore Paintings Online Account"
  ],
  alternates: {
    canonical: "/signup",
  },
  openGraph: {
    title: "Create Account | Aishwarya Arts Namakkal",
    description: "Register for an Aishwarya Arts account to purchase authentic 22K gold foil Tanjore paintings and manage your wishlist.",
    url: "https://www.aishwaryaarts.com/signup",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Registration Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | Aishwarya Arts",
    description: "Sign up to buy traditional Thanjavur art and track your custom orders.",
    images: ["/logo.png"],
  },
  robots: {
    index: false, // Prevents sensitive user account registration paths from search index bloat
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

export default function SignupLayout() {
  const signupSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Create Account | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/signup",
    "description": "Secure customer registration portal for Aishwarya Arts art gallery.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(signupSchema) }}
      />
      <SignupClient />
    </>
  );
}