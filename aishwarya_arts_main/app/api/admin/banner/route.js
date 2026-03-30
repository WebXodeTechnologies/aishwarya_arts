import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";

// GET: Fetch all active banners for the Hero Carousel
export async function GET() {
  try {
    await connectDB();
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });
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

    // 🟢 CHANGED: We no longer deactivate everything. 
    // This allows you to upload multiple images to build your 6-image carousel.
    const newBanner = await Banner.create({ 
      imageUrl, 
      title: title || "New Masterpiece", 
      link: link || "/shop", 
      isActive: true 
    });

    return NextResponse.json({ success: true, data: newBanner });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: (Optional but recommended) to manage your carousel
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await Banner.findByIdAndDelete(id);
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
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}