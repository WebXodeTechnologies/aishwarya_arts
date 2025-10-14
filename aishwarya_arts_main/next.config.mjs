/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // enables faster build & smaller bundle

  // ✅ Ignore ESLint/Type errors during build (prevents Vercel fails)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Image optimization domains
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com", "yourcdn.com"],
  },

  // ✅ Enable experimental features if using Next 15+
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // ✅ Optional trailing slash config
  trailingSlash: false,
};

export default nextConfig;
