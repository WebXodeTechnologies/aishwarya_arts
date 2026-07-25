"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountSidebar from "../../components/profile/AccountSidebar";
import { Loader2, PackageOpen, ShoppingBag, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function OrdersClient() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const result = await res.json();
                if (result.success) {
                    setOrders(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-50" aria-label="Loading orders">
                <Loader2 className="animate-spin text-amber-900" size={40} aria-hidden="true" />
            </div>
        );
    }

    return (
        <main className="bg-zinc-50 min-h-screen py-12 font-outfit">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                        <AccountSidebar />
                    </div>

                    <section className="lg:col-span-3 space-y-8">

                        {/* --- ENHANCED DASHBOARD HEADER --- */}
                        <header className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-zinc-200 shadow-sm relative overflow-hidden">
                            <ShoppingBag className="absolute -right-6 -bottom-6 text-zinc-100 size-48 -rotate-12 pointer-events-none" aria-hidden="true" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-amber-50 rounded-2xl text-amber-900">
                                        <ShoppingBag size={32} strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900">
                                            Client Acquisitions
                                        </span>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight font-cinzel mt-1">
                                            Order History
                                        </h1>
                                        <p className="text-zinc-700 font-medium text-sm sm:text-base mt-1">
                                            Manage and track your heritage art acquisitions
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="px-6 py-3 bg-zinc-900 rounded-2xl text-center shadow-md">
                                        <p className="text-[10px] text-white uppercase font-bold tracking-widest">Total Orders</p>
                                        <p className="text-2xl font-black text-amber-400">{orders.length}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats Mini-Row */}
                            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-8">
                                <div className="flex items-center gap-2 text-zinc-700 text-sm font-semibold">
                                    <Clock size={16} className="text-blue-600" aria-hidden="true" />
                                    <span>{orders.filter(o => o.orderStatus !== 'Delivered').length} Active</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-700 text-sm font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-600" aria-hidden="true" />
                                    <span>{orders.filter(o => o.orderStatus === 'Delivered').length} Delivered</span>
                                </div>
                            </div>
                        </header>

                        {/* --- ORDER LISTING --- */}
                        {orders.length === 0 ? (
                            <div className="bg-white rounded-[2.5rem] p-16 sm:p-24 text-center border border-dashed border-zinc-300">
                                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-200">
                                    <PackageOpen className="text-zinc-400" size={40} aria-hidden="true" />
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900 font-cinzel">No orders found</h2>
                                <p className="text-zinc-700 mt-2 max-w-xs mx-auto text-sm sm:text-base">It looks like you haven&apos;t started your collection with us yet.</p>
                                <Link
                                    href="/collections"
                                    aria-label="Start browsing collections"
                                    className="bg-zinc-900 text-white px-8 py-3.5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] mt-8 inline-block hover:bg-amber-900 shadow-md transition-all"
                                >
                                    Start Browsing
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6" role="feed" aria-label="Customer Orders">
                                {orders.map((order) => {
                                    const firstItem = order.orderItems[0];
                                    // FIXED: Removed the invalid .to() syntax throwing runtime errors
                                    const displayId = order.orderId || order._id.slice(-8).toUpperCase();

                                    return (
                                        <article
                                            key={order._id}
                                            className="group bg-white rounded-4xl border border-zinc-200 hover:border-amber-400 transition-all duration-300 overflow-hidden shadow-xs"
                                        >
                                            {/* Top Bar */}
                                            <div className="bg-zinc-50/80 px-6 sm:px-8 py-5 border-b border-zinc-200 flex flex-wrap justify-between items-center gap-6">
                                                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                                                    <div className="space-y-1">
                                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Transaction ID</span>
                                                        <p className="text-base sm:text-lg font-bold uppercase text-zinc-900">#{displayId}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Purchase Date</span>
                                                        <p className="text-base sm:text-lg font-bold text-zinc-900">
                                                            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Investment</span>
                                                        <p className="text-base sm:text-lg font-bold text-amber-900">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                                                    </div>
                                                </div>
                                                <StatusBadge status={order.orderStatus} />
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                                <div className="flex items-center gap-6 w-full md:w-auto">
                                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 shrink-0">
                                                        {firstItem?.image ? (
                                                            <Image
                                                                src={firstItem.image}
                                                                alt={firstItem.title || "Tanjore painting order item"}
                                                                fill
                                                                sizes="96px"
                                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-zinc-200" />
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-tight font-cinzel">
                                                            {firstItem?.title || "Aishwarya Arts Piece"}
                                                            {order.orderItems.length > 1 && (
                                                                <span className="text-amber-800 font-bold ml-2 text-xs">
                                                                    +{order.orderItems.length - 1} More
                                                                </span>
                                                            )}
                                                        </h3>
                                                        <p className="text-zinc-700 text-xs sm:text-sm font-semibold italic">Hand-crafted Tanjore Masterpiece</p>
                                                        <div className="pt-1">
                                                            <Link
                                                                href={`/orders/${order._id}`}
                                                                aria-label={`View tracking details for order #${displayId}`}
                                                                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-amber-900 tracking-widest hover:text-zinc-900 transition-colors"
                                                            >
                                                                Track Detail <ArrowRight size={12} aria-hidden="true" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 w-full md:w-auto">
                                                    <Link href={`/orders/${order._id}`} className="flex-1 md:flex-initial">
                                                        <button
                                                            aria-label={`View invoice for order #${displayId}`}
                                                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 hover:text-white transition-all cursor-pointer"
                                                        >
                                                            Invoice
                                                        </button>
                                                    </Link>
                                                    <Link href="/collections" className="flex-1 md:flex-initial">
                                                        <button
                                                            aria-label="Reorder collection items"
                                                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-900 shadow-md transition-all cursor-pointer"
                                                        >
                                                            Reorder
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

// Reusable Status Badge Component with high-contrast styles
const StatusBadge = ({ status }) => {
    const styles = {
        Delivered: "bg-emerald-50 text-emerald-800 border-emerald-200",
        Processing: "bg-blue-50 text-blue-800 border-blue-200",
        Cancelled: "bg-red-50 text-red-800 border-red-200",
        Shipped: "bg-amber-50 text-amber-900 border-amber-200",
    };
    return (
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[status] || "bg-zinc-100 text-zinc-800 border-zinc-200"}`}>
            {status || "Active"}
        </span>
    );
};