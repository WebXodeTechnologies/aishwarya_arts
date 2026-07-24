import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";
import { revalidateTag, revalidatePath } from "next/cache";

// GET: Fetch all active banners for the Hero Carousel
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const query = all ? {} : { isActive: true };
    const banners = await Banner.find(query).sort({ createdAt: -1 });
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add a new banner to the carousel collection
export async function POST(req) {
  try {
    await connectDB();
    const { imageUrl, title, link } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const newBanner = await Banner.create({ 
      imageUrl, 
      title: title || "New Masterpiece", 
      link: link || "/shop", 
      isActive: true 
    });

    // Invalidate the cache to ensure instant storefront updates
    revalidateTag("banners");
    revalidatePath("/");

    return NextResponse.json({ success: true, data: newBanner });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Manage your carousel
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Banner.findByIdAndDelete(id);

    // Invalidate cache
    revalidateTag("banners");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Banner removed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, isActive } = await req.json();
    await Banner.findByIdAndUpdate(id, { isActive });

    // Invalidate cache
    revalidateTag("banners");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}