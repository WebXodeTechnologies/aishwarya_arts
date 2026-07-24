import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import GoogleAnalyticsWrapper from "./components/GoogleAnalyticsWrapper";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-titillium",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: {
    default: "Aishwarya Arts | Authentic Tanjore Handmade Paintings Online",
    template: "%s | Aishwarya Arts",
  },
  description:
    "Buy premium handmade Tanjore paintings and traditional 22K gold leaf art. Explore curated collections crafted by expert master artisans at Aishwarya Arts.",
  keywords: [
    "Tanjore Paintings",
    "Handmade Indian Art",
    "Aishwarya Arts Namakkal",
    "Traditional Gold Leaf Paintings",
    "Buy Tanjore Art Online",
    "Original Thanjavur Paintings",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aishwarya Arts – Traditional Handmade Tanjore Paintings",
    description:
      "Exquisite handmade Tanjore paintings and traditional artworks with 22K gold foil for your home and office.",
    url: "https://www.aishwaryaarts.com",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts - Authentic Tanjore Paintings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aishwarya Arts | Buy Traditional Art Online",
    description:
      "Authentic 22K gold leaf Tanjore paintings crafted by master artisans.",
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

export default function RootLayout({ children }) {
  // Structured JSON-LD Data for Google Knowledge Graph & Local SEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: "Aishwarya Arts",
    image: "https://www.aishwaryaarts.com/logo.png",
    url: "https://www.aishwaryaarts.com",
    telephone: "+91-96550-07661",
    email: "contact.aishwaryaarts@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Namakkal",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.2223",
      longitude: "78.1677",
    },
    priceRange: "₹₹₹",
    sameAs: [
      "https://www.facebook.com/aishwaryaarts",
      "https://www.instagram.com/aishwaryaarts",
      "https://www.youtube.com/aishwaryaarts",
      "https://www.linkedin.com/company/aishwarya-arts",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-96550-07661",
      contactType: "customer service",
      email: "contact.aishwaryaarts@gmail.com",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* LCP Booster: Preconnect to image CDN domains to reduce load latency */}
        <link rel="preconnect" href="https://utfs.io" />
        <link rel="dns-prefetch" href="https://utfs.io" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${titillium.variable} antialiased font-sans`}>
        <GoogleAnalyticsWrapper />
        <Providers>
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
