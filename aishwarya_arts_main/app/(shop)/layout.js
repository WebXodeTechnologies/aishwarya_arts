import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import Whatsapp from "../components/HomePage/whatsapp";

export default function ShopLayout({ children }) {
  return (
    <>
      {/* Skip to main content link for screen readers and accessibility (SEO booster) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-amber-600 focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
      <Whatsapp />
    </>
  );
}
