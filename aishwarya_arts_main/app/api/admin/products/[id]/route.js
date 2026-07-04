import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// Get single product details
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Masterpiece not found in vault" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: product 
    }, { status: 200 });

  } catch (error) {
    console.error("DYNAMIC FETCH ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Database signal failed" },
      { status: 500 }
    );
  }
}

// Update single product details
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const calibratedData = {
      ...body,
      sku: body.sku?.toUpperCase(),
      godName: body.godName?.toLowerCase().trim().replace("lord ", "") || "others",
      priceMatrix: body.priceMatrix || []
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, calibratedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: "Masterpiece not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedProduct 
    }, { status: 200 });

  } catch (error) {
    console.error("PUT PRODUCT ERROR:", error.message);
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: "SKU Conflict: This unique ID already exists in the gallery vault." 
      }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Delete single product
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, error: "Masterpiece not found in vault" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: deletedProduct 
    }, { status: 200 });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to remove product from vault" },
      { status: 500 }
    );
  }
}