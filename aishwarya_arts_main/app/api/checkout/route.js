import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product"; // To verify prices

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();
    const { cartItems } = await req.json();

    // 1. RECALCULATE TOTAL (Security Step)
    let subtotal = 0;
    for (const item of cartItems) {
      const dbProduct = await Product.findById(item.id || item._id);
      if (dbProduct) {
        subtotal += dbProduct.price * item.quantity;
      }
    }

    const gstAmount = Math.round(subtotal * 0.05);
    const shippingCost = subtotal > 50000 ? 0 : 650;
    const finalTotal = subtotal + gstAmount + shippingCost;

    // 2. CREATE RAZORPAY ORDER
    const options = {
      amount: finalTotal * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      amount: order.amount 
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}