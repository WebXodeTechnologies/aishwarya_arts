import { Poppins, Outfit } from "next/font/google";
import "./globals.css";

// 👇 Choose one font — uncomment the one you want

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-poppins",
//   display: "swap",
// });

const font = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    default:
      "Aishwarya Art Gallery – Buy Handmade Paintings & Art Collections Online",
    template: "%s | Aishwarya Art Gallery",
  },
  description:
    "Discover Aishwarya Art Gallery — a curated space for handmade paintings, sculptures, and modern artworks. Explore exhibitions, shop online, and bring home artistic elegance crafted by talented Indian artists.",
  keywords: [
    "Aishwarya Art Gallery",
    "art gallery Namakkal",
    "buy paintings online",
    "handmade art India",
    "modern art collections",
    "wall paintings for home",
    "Indian art store",
    "sculpture art gallery",
    "Namakkal art exhibitions",
    "original Indian paintings",
  ],
  openGraph: {
    title: "Aishwarya Art Gallery – Handmade Paintings & Sculptures",
    description:
      "Explore and shop curated Indian artworks from Aishwarya Art Gallery. Discover exclusive exhibitions and timeless art collections.",
    url: "https://aishwaryaartgallery.com",
    siteName: "Aishwarya Art Gallery",

    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aishwarya Art Gallery – Buy Art & Paintings Online",
    description:
      "Shop exquisite handmade paintings, modern artworks, and sculptures from Aishwarya Art Gallery, India.",
  },
  alternates: {
    canonical: "https://aishwaryaartgallery.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
