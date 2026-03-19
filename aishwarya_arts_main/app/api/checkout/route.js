import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// Initialize inside or with a check to prevent build-time errors
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();
    const { cartItems } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 },
      );
    }

    // 1. RECALCULATE TOTAL (Server-side Truth)
    let subtotal = 0;
    for (const item of cartItems) {
      // Find the product in DB to prevent price tampering
      const dbProduct = await Product.findById(
        item.product || item.id || item._id,
      );
      if (dbProduct) {
        // Use the price from the DATABASE, not the frontend
        let activePrice = dbProduct.offerPrice || dbProduct.price;
        if (item.price && item.price >= activePrice) {
          activePrice = item.price;
        }
        subtotal += activePrice * (item.quantity || 1);
      }
    }

    // 2. CALCULATE TAXES & SHIPPING
    const gstAmount = Math.round(subtotal * 0.05);
    const shippingCost = subtotal > 50000 ? 0 : 650;
    const finalTotal = subtotal + gstAmount + shippingCost;

    // 3. CREATE RAZORPAY ORDER
    // We use Math.round to ensure 'amount' is an absolute Integer (Paise)
    const options = {
      amount: Math.round(finalTotal * 100),
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    // Return only what the frontend needs
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount, // This is already in Paise
      currency: order.currency,
    });
  } catch (error) {
    console.error("CRITICAL CHECKOUT ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Could not initiate payment. Please try again.",
      },
      { status: 500 },
    );
  }
}
