export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/profile/",
        "/orders/",
        "/cart/",
        "/checkout/",
      ],
    },
    sitemap: "https://www.aishwaryaarts.com/sitemap.xml",
  };
}
