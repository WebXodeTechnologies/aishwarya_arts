import React from "react";
import ContactHeader from "../../components/Contact/ContactHeader";
import ContactInfoCards from "../../components/Contact/ContactInfoCards";
import ContactForm from "../../components/Contact/ContactForm";
import ContactMap from "../../components/Contact/ContactMap";

// Comprehensive SEO Metadata for Contact Page
export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Contact Us | Aishwarya Arts Namakkal - Traditional Tanjore Paintings",
  description: "Get in touch with Aishwarya Arts Tanjore Art Gallery in Namakkal, Tamil Nadu. Reach out for custom deity paintings, 22K gold foil pricing, and gallery inquiries.",
  keywords: [
    "Contact Aishwarya Arts",
    "Tanjore Painting Gallery Namakkal",
    "Custom Tanjore Portraits Order",
    "Thanjavur Art Gallery Contact Number",
    "Aishwarya Arts Customer Support"
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Aishwarya Arts | Tanjore Art Gallery Namakkal",
    description: "Connect with our master artisans in Namakkal, Tamil Nadu for authentic handcrafted 22K gold foil Tanjore paintings.",
    url: "https://www.aishwaryaarts.com/contact",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts Art Gallery Namakkal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aishwarya Arts | Namakkal",
    description: "Reach out to our traditional Thanjavur art gallery for bespoke temple and deity portraits.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ContactPage() {
  // Rich LocalBusiness and ContactPage Structured Data Schema for Local SEO
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/contact",
    "description": "Contact page for Aishwarya Arts traditional Tanjore painting gallery located in Namakkal, Tamil Nadu.",
    "mainEntity": {
      "@type": "ArtGallery",
      "name": "Aishwarya Arts",
      "image": "https://www.aishwaryaarts.com/logo.png",
      "url": "https://www.aishwaryaarts.com",
      "telephone": "+91-9876543210", // Replace with your active gallery phone number
      "email": "support@aishwaryaarts.com",
      "priceRange": "₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gallery Street, Fort Area",
        "addressLocality": "Namakkal",
        "addressRegion": "Tamil Nadu",
        "postalCode": "637001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.2189,
        "longitude": 78.1674
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      },
      "sameAs": [
        "https://www.facebook.com/aishwaryaarts",
        "https://www.instagram.com/aishwaryaarts",
        "https://www.linkedin.com/company/aishwarya-arts"
      ]
    }
  };

  return (
    <>
      {/* Injecting Local Business & Contact Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main className="min-h-screen bg-white font-outfit">
        <ContactHeader />
        <ContactForm />
        <ContactInfoCards />
        <ContactMap />
      </main>
    </>
  );
}