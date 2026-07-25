import React from "react";
import ProfileClient from "./ProfileClient";

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "My Account Profile | Aishwarya Arts",
  description: "Manage your Aishwarya Arts customer account, update shipping addresses, and track your traditional Tanjore painting orders.",
  robots: {
    index: false, // Prevents private user dashboards from showing up in public search indexes
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/profile",
  },
};

export default function ProfilePage() {
  // WebPage Schema Markup for private user dashboard
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "My Account Profile | Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/profile",
    "description": "Customer dashboard for managing delivery addresses and tracking art orders.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <ProfileClient />
    </>
  );
}