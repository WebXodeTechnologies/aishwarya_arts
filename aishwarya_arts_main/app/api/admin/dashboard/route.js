import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // 1. Calculate Revenue (Total of all 'Paid' orders)
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // 2. Count Active Orders (Shipped or Processing)
    const activeOrders = await Order.countDocuments({
      orderStatus: { $in: ["Processing", "Shipped"] },
    });

    // 3. Count Total Patrons
    const totalPatrons = await User.countDocuments({ role: "user" });

    // 4. Low Stock Alerts (Products with stock < 5)
    const lowStock = await Product.find({ stock: { $lt: 5 } }).limit(5);

    // 5. Chart Data (Last 7 Days)
    const last7Days = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 6. Fetch Orders for the UI (Latest 10)
    // We fetch one set of data and use it for both the Card and the Table
    const ordersRaw = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // 7. Format for the "Recent Patrons" Card (Right side of chart)
    const formattedOrders = ordersRaw.slice(0, 5).map((order) => {
      return {
        _id: order._id.toString(),
        name: order.shippingAddress?.fullName || "Guest Patron",
        city: order.shippingAddress?.city || "India",
        amount: order.totalAmount || 0,
      };
    });

    // 8. Format for the "Client Table" (Bottom section)
    const tableData = ordersRaw.map((order) => ({
      id: order.orderId || order._id.toString().slice(-6).toUpperCase(),
      name: order.shippingAddress?.fullName || "Guest Patron",
      email: order.userEmail || "N/A",
      phone: order.shippingAddress?.phone || "N/A",
      // Safety: added ?. to map in case orderItems is missing
      painting:
        order.orderItems?.map((item) => item.title).join(", ") || "Artwork",
      amount: `₹${(order.totalAmount || 0).toLocaleString("en-IN")}`,
      status: order.orderStatus || "Pending",
      date: new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

    const lowStockRaw = await Product.find({ stock: { $lt: 5 } })
      .select("title stock category") // Adjust field names to match your Product schema
      .limit(5)
      .lean();

    const lowStockData = lowStockRaw.map((product) => ({
      id: product._id.toString(),
      name: product.title,
      stock: product.stock,
      category: product.category || "General",
    }));

    const logisticsRaw = await Order.find({
      orderStatus: { $in: ["Processing", "Shipped"] },
    })
      .sort({ updatedAt: 1 }) // Show the oldest updates first so they get attention
      .limit(4)
      .lean();

    const logisticsPulse = logisticsRaw.map((order) => {
      const createdDate = new Date(order.createdAt);
      const today = new Date();
      const diffTime = Math.abs(today - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        id: order.orderId || order._id.toString().slice(-6).toUpperCase(),
        patron: order.shippingAddress?.fullName || "Guest",
        location: order.shippingAddress?.city || "India",
        status: order.orderStatus,
        days: diffDays,
        // Logic: If it's been more than 3 days in 'Processing', mark as Delayed
        isDelayed: diffDays > 3 && order.orderStatus === "Processing",
      };
    });

    // --- ONLY ONE RETURN STATEMENT ---
    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        activeOrders,
        totalPatrons,
        artworkSold: await Order.countDocuments({ paymentStatus: "Paid" }),
      },
      lowStock: lowStock || [],
      chartData: last7Days.map((item) => ({
        month: item._id,
        revenue: item.amount,
      })),
      recentOrders: formattedOrders,
      tableData,
      lowStock: lowStockData,
      logisticsPulse
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
