import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();
    const { cartItems } = await req.json();

    let subtotal = 0;
    for (const item of cartItems) {
      const dbProduct = await Product.findById(item._id || item.id);
      if (dbProduct) {
        // GST INCLUSIVE: No extra math needed
        const activePrice = dbProduct.offerPrice || dbProduct.price;
        subtotal += activePrice * (item.quantity || 1);
      }
    }

    const shippingCost = subtotal > 50000 ? 0 : 650;
    const finalTotal = subtotal + shippingCost;

    const options = {
      amount: Math.round(finalTotal * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
