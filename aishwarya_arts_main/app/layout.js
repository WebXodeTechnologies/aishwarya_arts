import { Titillium_Web, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import GoogleAnalyticsWrapper from "./components/GoogleAnalyticsWrapper";

// Limit weights to only what is actively used above-the-fold to reduce font file size
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium",
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cinzel",
  display: "swap",
});

// SEPARATED VIEWPORT EXPORT (Required for Next.js App Router mobile indexing & layout shift prevention)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B4513", // Rich traditional art accent tone
};

export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: {
    default: "Aishwarya Arts | Authentic Tanjore Handmade Paintings Online",
    template: "%s | Aishwarya Arts",
  },
  description:
    "Buy premium handmade Tanjore paintings and traditional 22K gold leaf art. Explore curated collections crafted by expert master artisans at Aishwarya Arts.",
  applicationName: "Aishwarya Arts E-Commerce",
  authors: [{ name: "Aishwarya Arts", url: "https://www.aishwaryaarts.com" }],
  generator: "Next.js",
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
  verification: {
    // Add your Google Search Console verification code here once generated
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }) {
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
      streetAddress: "Namakkal Main Road", // Refined for local business schema accuracy
      addressLocality: "Namakkal",
      addressRegion: "Tamil Nadu",
      postalCode: "637001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.2223,
      longitude: 78.1677,
    },
    priceRange: "₹₹₹",
    sameAs: [
      "https://www.facebook.com/aishwaryaarts",
      "https://www.instagram.com/aishwaryaarts",
      "https://www.youtube.com/@aishwaryaarts",
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
        {/* Preconnect & DNS-Prefetch for CDN */}
        <link rel="preconnect" href="https://utfs.io" />
        <link rel="dns-prefetch" href="https://utfs.io" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${titillium.variable} ${cinzel.variable} antialiased font-sans`}
      >
        <GoogleAnalyticsWrapper />
        <Providers>
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}