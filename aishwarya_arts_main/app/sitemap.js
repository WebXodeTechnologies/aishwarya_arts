import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { blogPosts } from "./data/blogdata";

export default async function sitemap() {
  const baseUrl = "https://www.aishwaryaarts.com";

  // Connect to the DB
  await connectDB();

  // 1. Static Routes
  const routes = [
    "",
    "/about",
    "/collections",
    "/contact",
    "/blog",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
    "/shipping-policy",
    "/cancellation-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Product Routes
  let productRoutes = [];
  try {
    const products = await Product.find({ inStock: true })
      .select("_id updatedAt")
      .lean();

    productRoutes = products.map((product) => ({
      url: `${baseUrl}/collections/${product._id.toString()}`,
      lastModified: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating dynamic product sitemap:", error);
  }

  // 3. Dynamic Blog Routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...blogRoutes];
}
