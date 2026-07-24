import React from 'react';

import AboutVideo from '../../components/About/AboutVideo';
import ProfessionalJourney from '../../components/About/ProfessionalJourney';
import MissionVision from '../../components/About/MissionVision';
import WhyChoose from '../../components/About/WhyChoose';
import ContactAnimation from '../../components/About/ContactAnimation';

// Comprehensive SEO Metadata for Google Search & Social Sharing
export const metadata = {
  title: "About Us | Master Artisans of Traditional Tanjore Art",
  description: "Discover the 25+ year heritage and master craftsmanship behind Aishwarya Arts. Creating certified authentic 22K gold leaf Tanjore paintings in Tamil Nadu since 2000.",
  keywords: [
    "About Aishwarya Arts",
    "Tanjore Artists Namakkal",
    "Traditional Thanjavur Painting History",
    "22K Gold Leaf Art Creators",
    "Handmade Indian Art Studio"
  ],
  alternates: {
    canonical: "https://www.aishwaryaarts.com/about",
  },
  openGraph: {
    title: "About Aishwarya Arts | Heritage & Master Craftsmanship",
    description: "Learn about our journey preserving the divine soul and 22K gold foil techniques of traditional South Indian Tanjore paintings.",
    url: "https://www.aishwaryaarts.com/about",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.aishwaryaarts.com/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Master artisans crafting authentic Tanjore paintings at Aishwarya Arts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Aishwarya Arts Tanjore Gallery",
    description: "Explore our 25+ year legacy crafting certified authentic 22K gold leaf Tanjore paintings.",
    images: ["https://www.aishwaryaarts.com/assets/og-image.jpg"],
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

export default function Page() {
  // Rich Structured Data Schema for Google Knowledge Graph & Local Art Gallery SEO
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Aishwarya Arts",
    "url": "https://www.aishwaryaarts.com/about",
    "description": "Learn about the heritage, professional journey, mission, and master craftsmanship behind Aishwarya Arts, creating authentic Tanjore gold foil paintings since 2000.",
    "mainEntity": {
      "@type": "ArtGallery",
      "name": "Aishwarya Arts",
      "image": "https://www.aishwaryaarts.com/logo.png",
      "url": "https://www.aishwaryaarts.com",
      "telephone": "+91-96550-07661",
      "email": "contact.aishwaryaarts@gmail.com",
      "foundingDate": "2000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Namakkal",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "11.2223",
        "longitude": "78.1677"
      },
      "priceRange": "₹₹₹"
    }
  };

  return (
    <>
      {/* Injecting Structured Data Schema for Search Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main className="w-full flex flex-col min-h-screen">
        {/* <AboutVideo /> */}
        <ProfessionalJourney />
        <MissionVision />
        <WhyChoose />
        <ContactAnimation />
      </main>
    </>
  );
}