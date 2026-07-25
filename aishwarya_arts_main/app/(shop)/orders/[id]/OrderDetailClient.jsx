"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronLeft, Printer, Package, MapPin,
    CreditCard, Loader2,
    EyeOff,
    Eye
} from "lucide-react";
import PrintableInvoice from "@/app/components/invoice/InvoiceTemplate";
import { useReactToPrint } from 'react-to-print';

const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
    return str;
};

export default function OrderDetailClient({ orderId }) {
    const componentRef = useRef(null);
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Aishwarya_Arts_INV_${order?.orderId || orderId}`,
    });

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) return;
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                const result = await res.json();
                if (result.success) {
                    setOrder(result.data);
                } else {
                    router.push("/orders");
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, router]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white" aria-label="Loading order details">
                <Loader2 className="animate-spin text-amber-900" size={36} aria-hidden="true" />
            </div>
        );
    }

    if (!order) return null;

    const currentTotal = order.totalAmount || 0;
    const shipping = currentTotal > 50000 ? 0 : 650;
    const gst = Math.round(currentTotal * 0.05);
    const subtotal = currentTotal - gst - shipping;
    const wordAmount = numberToWords(currentTotal);
    const displayId = order.orderId || order._id?.slice(-8).toUpperCase();

    return (
        <main className="min-h-screen bg-zinc-50/50 py-12 font-outfit">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* --- TOP NAVIGATION --- */}
                <div className="flex items-center justify-between mb-8 print:hidden">
                    <Link href="/orders" className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-700 hover:text-zinc-900 transition">
                        <ChevronLeft size={18} aria-hidden="true" /> Back to My Orders
                    </Link>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            aria-label={showPreview ? "Close invoice preview" : "Preview invoice"}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-300 text-zinc-900 rounded-xl text-xs font-bold shadow-2xs hover:bg-zinc-50 transition cursor-pointer"
                        >
                            {showPreview ? <><EyeOff size={16} aria-hidden="true" /> Close Preview</> : <><Eye size={16} aria-hidden="true" /> Preview Invoice</>}
                        </button>

                        <button
                            onClick={handlePrint}
                            aria-label="Generate and print tax invoice"
                            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-amber-950 transition cursor-pointer"
                        >
                            <Printer size={16} aria-hidden="true" /> Generate Tax Invoice
                        </button>
                    </div>
                </div>

                {showPreview && (
                    <div className="mb-10 bg-white shadow-2xl rounded-3xl overflow-hidden border border-zinc-200 max-h-125 overflow-y-auto">
                        <div className="scale-[0.6] origin-top transform -translate-y-12">
                            <PrintableInvoice
                                order={order}
                                subtotal={subtotal}
                                gst={gst}
                                shipping={shipping}
                                amountInWords={wordAmount}
                            />
                        </div>
                    </div>
                )}

                {/* --- MAIN ORDER CARD --- */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-200 overflow-hidden">

                    <div className="p-6 sm:p-10 lg:p-12 border-b border-zinc-100 flex flex-wrap justify-between items-start gap-8">
                        <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900 italic">
                                Acquisition Summary
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 font-cinzel">
                                Order Details
                            </h1>
                            <p className="text-xs sm:text-sm font-mono text-amber-900 font-bold uppercase tracking-widest">
                                #{displayId}
                            </p>
                        </div>
                        <div className="flex gap-8 sm:gap-10">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Date</p>
                                <p className="text-xs sm:text-sm font-bold text-zinc-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-bold uppercase border border-amber-200">
                                    {order.orderStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 flex items-center gap-2">
                                <Package size={20} aria-hidden="true" /> Purchased Artworks
                            </h2>
                            <div className="space-y-6" role="feed" aria-label="Purchased Art Items">
                                {order.orderItems?.map((item, idx) => (
                                    <article key={idx} className="flex gap-6 items-center">
                                        <div className="relative h-28 w-24 rounded-2xl overflow-hidden border border-zinc-200 shrink-0 shadow-2xs bg-zinc-100">
                                            <Image src={item.image} alt={item.title || "Tanjore painting item"} fill sizes="96px" className="object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-bold text-zinc-900 text-base sm:text-lg font-cinzel">{item.title}</h3>
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                                {item.size} • {item.frame}
                                            </p>
                                            <div className="flex justify-between items-end pt-2">
                                                <span className="text-xs sm:text-sm font-bold text-zinc-700">Qty: {item.quantity}</span>
                                                <span className="text-base sm:text-lg font-bold text-zinc-900">₹{item.price?.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-zinc-100 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                    <span className="font-bold text-zinc-900">₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">GST (5%)</span>
                                    <span className="font-bold text-zinc-900">₹{gst.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t-2 border-zinc-900">
                                    <span className="font-bold uppercase tracking-widest text-xs text-zinc-900">Total Amount</span>
                                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">₹{currentTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 flex items-center gap-2">
                                    <MapPin size={14} aria-hidden="true" /> Shipping To
                                </h2>
                                <div className="p-6 bg-zinc-50 rounded-4xl border border-zinc-200 space-y-2">
                                    <p className="font-bold text-zinc-900">{order.shippingAddress?.fullName}</p>
                                    <address className="not-italic text-xs sm:text-sm text-zinc-700 leading-relaxed uppercase tracking-wider space-y-1 font-medium">
                                        <p>{order.shippingAddress?.address}</p>
                                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                                    </address>
                                    <p className="text-xs font-bold pt-3 border-t border-zinc-200 mt-3 text-zinc-900">
                                        Phone: <span className="font-medium">{order.shippingAddress?.phone}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 flex items-center gap-2">
                                    <CreditCard size={14} aria-hidden="true" /> Payment Method
                                </h2>
                                <div className="p-6 bg-zinc-50 rounded-4xl border border-zinc-200 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900">{order.paymentMethod}</p>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
                                            Status: <span className="text-emerald-700 font-extrabold">{order.paymentStatus}</span>
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xs border border-zinc-200">
                                        <CheckCircleIcon />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hidden printable invoice reference node */}
                        <div className="hidden">
                            <PrintableInvoice
                                ref={componentRef}
                                order={order}
                                subtotal={subtotal}
                                gst={gst}
                                shipping={shipping}
                                amountInWords={wordAmount}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

const CheckCircleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-700" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);