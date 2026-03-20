import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db"; 
import Product from "../../../models/Product"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

// GET: Fetch all products for your client-side collections
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST: Add a new product from your Admin Panel
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Check if SKU already exists to prevent database errors
    const existingProduct = await Product.findOne({ sku: body.sku });
    if (existingProduct) {
      return NextResponse.json({ success: false, message: "SKU already exists" }, { status: 400 });
    }

    const newProduct = await Product.create(body);

    return NextResponse.json({ 
      success: true, 
      message: "Painting added to gallery!", 
      data: newProduct 
    }, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    // const session = await getServerSession(authOptions);
    // if (session?.user?.role !== "admin") return NextResponse.json({ success: false, message: "Admin access required" }, { status: 401 });

    await connectDB();
    await Product.deleteMany({}); 
    return NextResponse.json({ success: true, message: "Catalog cleared for re-upload" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}